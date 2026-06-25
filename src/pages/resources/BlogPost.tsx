import React from 'react';
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, CheckCircle2, Cloud, LayoutDashboard, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, MessageSquare, Send, Image as ImageIcon } from "lucide-react";
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { marked } from "marked";
import { handleFirestoreError, OperationType } from "../../utils/firestoreErrorHandler";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  content: string;
  keywords?: string;
  allowComments?: boolean;
  pdfUrl?: string;
}

interface Comment {
  id: string;
  text: string;
  authorName: string;
  createdAt: any;
}

export function BlogPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [copied, setCopied] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          where("status", "in", ["published", "scheduled"])
        );
        const querySnapshot = await getDocs(q);
        
        let validDoc = null;
        const now = new Date();

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          if (data.status === "scheduled") {
            if (!data.publishedAt || data.publishedAt.toDate() > now) {
              continue; // Skip future scheduled articles
            }
          }
          validDoc = doc;
          break;
        }
        
        if (validDoc) {
          const data = validDoc.data();
          
          const words = data.content ? data.content.split(' ').length : 0;
          const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

          const getValidDate = (field: any) => {
            if (!field) return null;
            if (typeof field.toDate === 'function') return field.toDate();
            if (field instanceof Date) return field;
            if (typeof field === 'string' || typeof field === 'number') return new Date(field);
            return null;
          };

          const publishDateObj = getValidDate(data.publishedAt) || getValidDate(data.createdAt) || new Date();

          let htmlContent = data.content || "";
          if (htmlContent && !htmlContent.trim().startsWith('<')) {
            try {
              htmlContent = await marked.parse(htmlContent);
            } catch (e) {
              console.error("Error parsing markdown", e);
            }
          }

          setArticle({
            id: validDoc.id,
            title: data.title,
            category: data.category || "Uncategorized",
            date: publishDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            readTime: `${readTimeMinutes} min read`,
            image: data.image || `https://picsum.photos/seed/${data.slug}/1200/600?blur=2`,
            slug: data.slug,
            content: htmlContent,
            keywords: data.keywords,
            allowComments: data.allowComments !== false,
            pdfUrl: data.pdfUrl
          });

          document.title = `${data.title} | Devabdultechnologies`;
          
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', data.excerpt || data.title);

          // Fetch related articles
          try {
            const relatedQ = query(
              collection(db, "blogs"),
              where("status", "==", "published"),
              where("slug", "!=", slug),
              limit(3)
            );
            const relatedSnap = await getDocs(relatedQ);
            const related = relatedSnap.docs.map(d => ({
              title: d.data().title,
              category: d.data().category || "Blog",
              slug: d.data().slug,
              image: d.data().image || `https://picsum.photos/seed/${d.data().slug}/800/500`
            }));
            setRelatedArticles(related);
          } catch (err) {
            console.error("Error fetching related articles:", err);
          }
        } else {
          setArticle(null);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
        handleFirestoreError(error, OperationType.GET, `blogs/${slug}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (!article?.id) return;

    const q = query(
      collection(db, `blogs/${article.id}/comments`),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(fetchedComments);
    }, (error) => {
      console.error("Error fetching comments:", error);
      handleFirestoreError(error, OperationType.LIST, `blogs/${article.id}/comments`);
    });

    return () => unsubscribe();
  }, [article?.id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "Check out this article from Devabdultechnologies";

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !article?.id) return;

    setSubmittingComment(true);
    setCommentError("");
    try {
      const authorName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "Anonymous Reader";
      
      await addDoc(collection(db, `blogs/${article.id}/comments`), {
        text: newComment.trim(),
        authorName,
        createdAt: serverTimestamp(),
        authorId: auth.currentUser?.uid || "anonymous"
      });
      setNewComment("");
    } catch (error: any) {
      setCommentError(error.message || "Failed to post comment.");
      handleFirestoreError(error, OperationType.CREATE, `blogs/${article.id}/comments`);
    } finally {
      setSubmittingComment(false);
    }
  };

  const relatedArticlesSection = relatedArticles.length > 0 && (
    <div>
      <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Related Articles</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <Link 
            to={`/resources/${article.slug}`}
            key={article.title}
            className="group cursor-pointer bg-bg-card rounded-2xl border border-white/5 overflow-hidden hover:border-white/20 transition-colors"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-white/5 flex items-center justify-center">
              <img 
                src={article.image} 
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                {article.category}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-accent-blue transition-colors line-clamp-2">
                {article.title}
              </h4>
              <div className="inline-flex items-center gap-2 text-white/60 font-medium text-xs group-hover:text-white transition-colors">
                Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-bg-dark relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10 animate-pulse">
          <div className="h-4 w-48 bg-white/5 rounded mb-12"></div>
          <div className="mb-12">
            <div className="h-6 w-24 bg-white/10 rounded-full mb-6"></div>
            <div className="h-12 md:h-16 w-3/4 bg-white/10 rounded mb-4"></div>
            <div className="h-12 md:h-16 w-1/2 bg-white/10 rounded mb-8"></div>
            <div className="flex gap-6 border-b border-white/10 pb-8">
              <div className="h-4 w-32 bg-white/5 rounded"></div>
              <div className="h-4 w-24 bg-white/5 rounded"></div>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white/5 border border-white/10 mb-16 aspect-[2/1]"></div>
          <div className="space-y-6">
            <div className="h-4 w-full bg-white/5 rounded"></div>
            <div className="h-4 w-full bg-white/5 rounded"></div>
            <div className="h-4 w-5/6 bg-white/5 rounded"></div>
            <div className="h-4 w-full bg-white/5 rounded mt-8"></div>
            <div className="h-4 w-4/5 bg-white/5 rounded"></div>
            <div className="h-4 w-full bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-bg-dark flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-white/60 mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link to="/resources" className="px-6 py-3 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors">
          Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg-dark relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="flex items-center gap-2 text-sm text-white/50 mb-12">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
          <span>&gt;</span>
          <span className="text-white/80">Article</span>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-6 text-sm font-bold">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm border-b border-white/10 pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[2rem] overflow-hidden border border-white/10 mb-16 relative bg-gradient-to-br from-slate-900 via-[#0a0a0a] to-accent-purple/20 flex items-center justify-center min-h-[300px]"
        >
          {article.image ? (
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto max-h-[600px] object-contain"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-white/40 flex flex-col items-center justify-center">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>Image not available</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
        >
          <div 
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {article.pdfUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 p-8 rounded-3xl bg-accent-purple/10 border border-accent-purple/20 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                <Cloud className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Download Full Whitepaper</h3>
                <p className="text-white/60 text-sm">Get the complete technical documentation in PDF format.</p>
              </div>
            </div>
            <a 
              href={article.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-accent-purple text-white font-bold hover:bg-accent-purple/90 transition-colors flex items-center gap-3 whitespace-nowrap"
            >
              Download PDF
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        )}

        <div className="flex items-center gap-4 py-8 border-y border-white/10 mb-16">
          <span className="text-white/60 font-medium">Share this article:</span>
          <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white/5 hover:bg-[#1DA1F2]/20 text-white/60 hover:text-[#1DA1F2] transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white/5 hover:bg-[#0A66C2]/20 text-white/60 hover:text-[#0A66C2] transition-colors">
            <Linkedin className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2]/20 text-white/60 hover:text-[#1877F2] transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('copy')} className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white/60 hover:text-white transition-colors relative group">
            <LinkIcon className="w-5 h-5" />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-xs rounded font-medium whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>

        {article.allowComments && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="w-6 h-6 text-accent-blue" />
              <h3 className="text-3xl font-bold text-white">Comments ({comments.length})</h3>
            </div>

            <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full min-h-[120px] p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-accent-blue/50 focus:bg-white/10 transition-all resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim()}
                  className="absolute bottom-4 right-4 p-2 bg-accent-blue hover:bg-accent-blue/90 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {commentError && (
                <p className="mt-2 text-red-400 text-sm">{commentError}</p>
              )}
            </form>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-white">{comment.authorName}</div>
                    <div className="text-sm text-white/40">
                      {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                    </div>
                  </div>
                  <p className="text-white/70 whitespace-pre-wrap">{comment.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-8 text-white/40">
                  No comments yet. Be the first to share your thoughts!
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-bg-card rounded-[2.5rem] p-12 md:p-20 border border-white/10 text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to build a scalable SaaS platform?</h2>
          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Partner with Devabdultechnologies to design and develop high-performance applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent-orange text-white font-bold text-lg hover:bg-[#b8952b] transition-colors shadow-lg shadow-accent-orange/20 w-full sm:w-auto justify-center"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-colors w-full sm:w-auto justify-center"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {relatedArticlesSection}

      </div>
    </div>
  );
}
