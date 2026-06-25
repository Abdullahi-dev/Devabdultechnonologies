import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Award, Newspaper, Download, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Contact } from "../../components/Contact";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { handleFirestoreError, OperationType } from "../../utils/firestoreErrorHandler";

interface PressRelease {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: any;
  category: string;
}

export function PressPage() {
  const [newsItems, setNewsItems] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Press & News | Devabdultechnologies";

    const fetchPressReleases = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          where("category", "==", "Press Release")
        );
        const querySnapshot = await getDocs(q);
        const items: PressRelease[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as PressRelease);
        });
        
        // Sort by publishedAt descending
        items.sort((a, b) => {
          const timeA = a.publishedAt?.toMillis ? a.publishedAt.toMillis() : 0;
          const timeB = b.publishedAt?.toMillis ? b.publishedAt.toMillis() : 0;
          return timeB - timeA;
        });
        
        setNewsItems(items);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, "blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPressReleases();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

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
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Press & News</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Announcements</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Read our latest announcements, product launches, technology breakthroughs, and media coverage from around the industry.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#news" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors inline-block">
                Read Latest News
              </a>
              <a href="#press-kit" className="px-8 py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2">
                <Download className="w-4 h-4" /> Download Press Kit
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-bg-card border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Latest Updates</h2>
            <p className="text-xl text-white/60">Stay informed about our company's progress and innovations.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-accent-blue animate-spin" />
            </div>
          ) : newsItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold uppercase tracking-wider">{item.category}</span>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-8 flex-grow">{item.excerpt}</p>
                  <Link to={`/resources/${item.slug}`} className="inline-flex items-center font-bold text-white/80 group-hover:text-white transition-colors mt-auto">
                    Read Full Story <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-bg-dark rounded-3xl border border-white/5">
              <Newspaper className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Press Releases Yet</h3>
              <p className="text-white/60">Check back later for our latest announcements.</p>
            </div>
          )}
        </div>
      </section>

      {/* Press Kit */}
      <section id="press-kit" className="py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div 
            {...fadeIn}
            className="bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Press Resources</h2>
              <p className="text-xl text-white/60 mb-6">
                Download our official brand assets, logos, executive headshots, and company backgrounder for media use.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/guidelines.pdf" download="guidelines.pdf" className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Brand Guidelines (PDF)
                </a>
                <a href="/Logo pack.zip" download="Logo pack.zip" className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Logo Pack (ZIP)
                </a>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full bg-bg-dark border border-white/10 flex items-center justify-center shrink-0">
              <Newspaper className="w-12 h-12 text-white/50" />
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
