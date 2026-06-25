import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "blogs"),
      where("status", "==", "published"),
      limit(3)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts: any[] = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        
        const getValidDate = (field: any) => {
          if (!field) return null;
          if (typeof field.toDate === 'function') return field.toDate();
          if (field instanceof Date) return field;
          if (typeof field === 'string' || typeof field === 'number') return new Date(field);
          return null;
        };
        
        const publishDateObj = getValidDate(data.publishedAt) || getValidDate(data.createdAt) || new Date();
        const words = data.content ? data.content.split(' ').length : 0;
        const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

        fetchedPosts.push({
          id: doc.id,
          title: data.title,
          category: data.category || "Blog",
          date: publishDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          timestamp: publishDateObj.getTime(),
          readTime: `${readTimeMinutes} min read`,
          image: data.image || `https://picsum.photos/seed/${data.slug}/800/500`,
          description: data.excerpt,
          slug: data.slug
        });
      });

      // Sort by timestamp descending
      fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);

      setPosts(fetchedPosts.slice(0, 3));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching latest posts:", error);
      setPosts([]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -right-40 top-40 w-96 h-96 bg-accent-orange/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-6">
              <span className="text-sm font-semibold tracking-wide uppercase">Insights & Resources</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">Knowledge Center</h2>
            <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
              Technical deep-dives, industry insights, and thought leadership from our engineering and design experts.
            </p>
          </div>
          <Link to="/resources" className="hidden md:flex bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full items-center gap-3 transition-all border border-white/10 hover:border-white/20 group">
            View all articles 
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group h-full"
            >
              <Link to={`/resources/${post.slug}`} className="bg-bg-card border border-white/5 hover:border-accent-purple/30 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(77,163,255,0.1)] flex flex-col h-full block">
                <div className="relative h-[260px] overflow-hidden bg-white/5 flex items-center justify-center">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 p-2"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-80" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-bg-dark/80 backdrop-blur-md text-accent-purple text-xs font-bold tracking-wider uppercase border border-white/10">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-6 text-white/50 text-sm mb-6 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed mb-8 line-clamp-3 flex-1">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-accent-orange font-semibold mt-auto group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link to="/resources" className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all border border-white/10 group">
            View all articles 
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
