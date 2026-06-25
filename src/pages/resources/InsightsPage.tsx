import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Lightbulb, ArrowRight, Clock } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface Insight {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  excerpt?: string;
  timestamp: number;
  readTime: string;
}

export function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Engineering Insights | Devabdultechnologies";

    const q = query(
      collection(db, "blogs"),
      where("status", "in", ["published", "scheduled"]),
      where("category", "==", "Engineering Insights")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Insight[] = [];
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
        const words = data.content ? data.content.split(' ').length : 0;
        const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

        fetched.push({
          id: doc.id,
          title: data.title,
          category: data.category,
          date: publishDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          timestamp: publishDateObj.getTime(),
          image: data.image || `https://picsum.photos/seed/${data.slug}/800/500`,
          slug: data.slug,
          excerpt: data.excerpt,
          readTime: `${readTimeMinutes} min read`,
        });
      });

      fetched.sort((a, b) => b.timestamp - a.timestamp);
      setInsights(fetched);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching insights:", error);
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
          <div className="inline-flex items-center justify-center p-3 bg-accent-purple/20 rounded-2xl mb-6">
            <Lightbulb className="w-8 h-8 text-accent-purple" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Engineering Insights</h1>
          <p className="text-xl text-white/60">
            Technical deep-dives, architectural decisions, and lessons learned from building scalable enterprise software.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center text-white/60 py-20 bg-white/5 rounded-2xl border border-white/10">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No insights available yet.</p>
            <p className="mt-2">Check back soon for our latest engineering articles.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
              >
                <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden relative">
                  <img 
                    src={insight.image} 
                    alt={insight.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="p-6 md:w-3/5 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-medium text-white/40 mb-3">
                    <span className="text-accent-purple">{insight.category}</span>
                    <span>•</span>
                    <span>{insight.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                    {insight.title}
                  </h3>
                  
                  <p className="text-white/60 mb-6 line-clamp-3 flex-grow">
                    {insight.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-white/40">
                      <Clock className="w-4 h-4" />
                      {insight.readTime}
                    </div>
                    <Link 
                      to={`/resources/${insight.slug}`}
                      className="text-white hover:text-accent-purple transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      Read Insight <ArrowRight className="w-4 h-4" />
                    </Link>
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
