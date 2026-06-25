import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Download, FileText, ArrowRight } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface WhitePaper {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  excerpt?: string;
  pdfUrl?: string;
  timestamp: number;
}

export function WhitePapersPage() {
  const [papers, setPapers] = useState<WhitePaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "White Papers | Devabdultechnologies";

    const q = query(
      collection(db, "blogs"),
      where("status", "in", ["published", "scheduled"]),
      where("category", "==", "Whitepapers")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: WhitePaper[] = [];
      const now = new Date();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.status === "scheduled") {
          if (!data.publishedAt || data.publishedAt.toDate() > now) return;
        }

        const getValidDate = (field: any) => {
          if (!field) return null;
          if (typeof field.toDate === 'function') return field.toDate();
          if (field instanceof Date) return field;
          if (typeof field === 'string' || typeof field === 'number') return new Date(field);
          return null;
        };
        
        const publishDateObj = getValidDate(data.publishedAt) || getValidDate(data.createdAt) || new Date();

        fetched.push({
          id: doc.id,
          title: data.title,
          category: data.category,
          date: publishDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          timestamp: publishDateObj.getTime(),
          image: data.image || `https://picsum.photos/seed/${data.slug}/800/500`,
          slug: data.slug,
          excerpt: data.excerpt,
          pdfUrl: data.pdfUrl,
        });
      });

      fetched.sort((a, b) => b.timestamp - a.timestamp);
      setPapers(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching white papers:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">White Papers</h1>
          <p className="text-xl text-white/60">
            In-depth research, technical specifications, and strategic insights for enterprise architecture.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-orange"></div>
          </div>
        ) : papers.length === 0 ? (
          <div className="text-center text-white/60 py-20 bg-white/5 rounded-2xl border border-white/10">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No white papers available yet.</p>
            <p className="mt-2">Check back soon for our latest research.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {papers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent z-10" />
                  <img 
                    src={paper.image} 
                    alt={paper.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-xs font-medium text-white/80">
                    <span className="px-2 py-1 rounded-full bg-accent-orange/20 border border-accent-orange/30 text-accent-orange">
                      {paper.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-white/40 mb-3">{paper.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-orange transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-white/60 mb-6 line-clamp-3 flex-grow">
                    {paper.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <Link 
                      to={`/resources/${paper.slug}`}
                      className="text-white hover:text-accent-orange transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      Read Online <ArrowRight className="w-4 h-4" />
                    </Link>
                    {paper.pdfUrl ? (
                      <a 
                        href={paper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-orange text-white text-sm font-medium hover:bg-accent-orange/90 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    ) : (
                      <button 
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Print
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
