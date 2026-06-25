import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BookOpen, Code2, FileText, BookMarked, Briefcase, Calendar, User, Search, Image as ImageIcon } from "lucide-react";
import { Contact } from "../components/Contact";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { handleFirestoreError, OperationType } from "../utils/firestoreErrorHandler";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  excerpt?: string;
  timestamp: number;
  author: string;
}

export function ResourcesPage() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Resources & Engineering Insights | Devabdultechnologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore articles, technical guides, engineering insights, and industry research from the Devabdultechnologies team.");
    }

    const q = query(
      collection(db, "blogs"),
      where("status", "in", ["published", "scheduled"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const fetchedArticles: Article[] = [];
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        
        // Filter out categories that have their own dedicated pages
        if (["Case Studies", "Whitepapers", "Engineering Insights"].includes(data.category)) {
          return;
        }

        // Filter out scheduled articles that are in the future
        if (data.status === "scheduled") {
          if (!data.publishedAt || data.publishedAt.toDate() > now) {
            return; // Skip this one
          }
        }

        // Calculate read time roughly
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
        
        fetchedArticles.push({
          id: doc.id,
          title: data.title,
          category: data.category || "Blog",
          date: publishDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          timestamp: publishDateObj.getTime(),
          readTime: `${readTimeMinutes} min read`,
          image: data.image || `https://picsum.photos/seed/${data.slug}/800/500`, // Placeholder image based on slug
          slug: data.slug,
          excerpt: data.excerpt,
          author: data.author || "Devabdultechnologies Team"
        });
      });
      
      // Sort by timestamp descending
      fetchedArticles.sort((a, b) => b.timestamp - a.timestamp);
      
      setArticles(fetchedArticles);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setLoading(false);
      handleFirestoreError(error, OperationType.LIST, "blogs");
    });

    return () => unsubscribe();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const categories = [
    {
      title: "All",
      icon: BookOpen,
      color: "text-white"
    },
    {
      title: "Blog",
      icon: BookOpen,
      color: "text-accent-blue"
    },
    {
      title: "Technology Guides",
      icon: FileText,
      color: "text-accent-orange"
    },
    {
      title: "Artificial Intelligence",
      icon: Code2,
      color: "text-accent-purple"
    },
    {
      title: "Design",
      icon: ImageIcon,
      color: "text-emerald-400"
    }
  ];

  const filteredArticles = articles.filter(article => {
    // Map fallback categories to the filter categories if needed
    let articleCategory = article.category;
    if (articleCategory === "Artificial Intelligence" || articleCategory === "Engineering") {
      articleCategory = "Engineering Insights";
    } else if (articleCategory === "Design") {
      articleCategory = "Technology Guides";
    }

    const matchesCategory = activeCategory === "All" || articleCategory === activeCategory || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Knowledge Hub</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Insights, Guides, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Engineering Knowledge</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Explore articles, technical guides, engineering insights, and industry research from the Devabdultechnologies team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-12 border-y border-white/5 bg-bg-card relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(category.title)}
                  className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.title 
                      ? 'bg-white text-bg-dark' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <category.icon className={`w-4 h-4 ${activeCategory === category.title ? 'text-bg-dark' : category.color}`} />
                  {category.title}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input 
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-white/40 focus:outline-none focus:border-accent-blue transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles" className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, idx) => (
                <motion.div 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card hover:border-white/20 transition-all duration-300 flex flex-col h-full"
                >
                  <Link to={`/resources/${article.slug}`} className="block relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/40 transform group-hover:scale-105 transition-transform duration-700">
                        <ImageIcon className="w-12 h-12 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white">
                        {article.category}
                      </span>
                    </div>
                  </Link>
                  <div className="p-8 flex flex-col flex-grow">
                    <Link to={`/resources/${article.slug}`}>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">{article.title}</h3>
                    </Link>
                    <p className="text-white/60 text-sm mb-6 flex-grow line-clamp-3">{article.excerpt}</p>
                    
                    <div className="mt-auto flex items-center justify-between text-xs text-white/50 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-white mb-4">No resources found</h3>
              <p className="text-white/60">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      <Contact />
    </div>
  );
}
