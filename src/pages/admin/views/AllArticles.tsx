import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Edit, Trash2, Eye, Send, FileText, Database, XCircle } from "lucide-react";
import { collection, query, getDocs, where, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";
import { seedDatabase } from "../../../utils/seedDatabase";

export function AllArticles({ setView, filterStatus, searchQuery = "" }: { setView: (view: string) => void, filterStatus?: string, searchQuery?: string }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    await seedDatabase();
    await fetchArticles();
    setSeeding(false);
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let q = query(collection(db, "blogs"));
      if (filterStatus) {
        q = query(collection(db, "blogs"), where("status", "==", filterStatus));
      }
      const snapshot = await getDocs(q);
      const fetched: any[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() });
      });
      fetched.sort((a, b) => {
        const getMillis = (field: any) => {
          if (!field) return 0;
          if (typeof field.toMillis === 'function') return field.toMillis();
          if (field instanceof Date) return field.getTime();
          if (typeof field === 'string' || typeof field === 'number') return new Date(field).getTime();
          return 0;
        };
        const timeA = getMillis(a.createdAt);
        const timeB = getMillis(b.createdAt);
        return timeB - timeA;
      });
      setArticles(fetched);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, "blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterStatus]);

  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (article.title && article.title.toLowerCase().includes(query)) ||
      (article.category && article.category.toLowerCase().includes(query)) ||
      (article.keywords && article.keywords.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `blogs/${id}`);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await updateDoc(doc(db, "blogs", id), {
        status: "published",
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      fetchArticles(); // Refresh list
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `blogs/${id}`);
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await updateDoc(doc(db, "blogs", id), {
        status: "draft",
        updatedAt: serverTimestamp()
      });
      fetchArticles(); // Refresh list
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `blogs/${id}`);
    }
  };

  const getTitle = () => {
    if (filterStatus === "draft") return "Drafts";
    if (filterStatus === "published") return "Published Articles";
    return "All Articles";
  };

  const getValidDate = (field: any) => {
    if (!field) return null;
    if (typeof field.toDate === 'function') return field.toDate();
    if (field instanceof Date) return field;
    if (typeof field === 'string' || typeof field === 'number') return new Date(field);
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{getTitle()}</h1>
          <p className="text-white/60">Manage your blog content.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSeed}
            disabled={seeding}
            className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            {seeding ? "Seeding..." : "Seed Demo Content"}
          </button>
          <button 
            onClick={() => setView('generate')}
            className="px-4 py-2 rounded-xl bg-accent-blue text-white font-bold flex items-center gap-2 hover:bg-accent-blue/90 transition-colors"
          >
            <FileText className="w-4 h-4" />
            New Article
          </button>
        </div>
      </div>

      <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-white/5 border-b border-white/10 text-white/50 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/50">Loading articles...</td>
                </tr>
              ) : filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/50">
                    {searchQuery ? "No articles match your search." : "No articles found."}
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{article.title}</div>
                      <div className="text-sm text-white/50 mt-1">{article.category || 'Uncategorized'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        article.status === 'published' ? 'bg-accent-green/20 text-accent-green' : 
                        article.status === 'scheduled' ? 'bg-accent-blue/20 text-accent-blue' : 
                        'bg-accent-purple/20 text-accent-purple'
                      }`}>
                        {article.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">
                      {getValidDate(article.publishedAt) ? getValidDate(article.publishedAt)?.toLocaleDateString() : 
                       getValidDate(article.createdAt) ? getValidDate(article.createdAt)?.toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(article.status === 'published' || article.status === 'scheduled') && (
                          <>
                            <a 
                              href={`/resources/${article.slug}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                              title="View Live"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <button 
                              onClick={() => handleUnpublish(article.id)}
                              className="p-2 rounded-lg bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 transition-colors"
                              title="Unpublish"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {article.status === 'draft' && (
                          <button 
                            onClick={() => handlePublish(article.id)}
                            className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                            title="Publish"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => setView(`edit:${article.id}`)}
                          className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(article.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
