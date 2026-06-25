import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";
import { Mail, Calendar, Trash2, Download } from "lucide-react";

export function SubscribersList() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "newsletter_subscribers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscribers(data);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "newsletter_subscribers");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      await deleteDoc(doc(db, "newsletter_subscribers", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `newsletter_subscribers/${id}`);
    }
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Subscribed At\n"
      + subscribers.map(s => `${s.email},${s.createdAt?.toDate ? s.createdAt.toDate().toISOString() : 'Unknown'}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div className="p-8 text-white/70">Loading subscribers...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Newsletter Subscribers</h1>
          <p className="text-white/60">Manage your email list and export for campaigns.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
            <Mail className="w-5 h-5 text-accent-blue" />
            <span className="text-white font-bold">{subscribers.length} Subscribers</span>
          </div>
          {subscribers.length > 0 && (
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {subscribers.length === 0 ? (
        <div className="bg-bg-card border border-white/10 rounded-2xl p-12 text-center">
          <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No subscribers yet</h3>
          <p className="text-white/50">When someone subscribes to your newsletter, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-4 text-sm font-semibold text-white/70">Email Address</th>
                  <th className="p-4 text-sm font-semibold text-white/70">Subscribed Date</th>
                  <th className="p-4 text-sm font-semibold text-white/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-white font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                          {subscriber.email.charAt(0).toUpperCase()}
                        </div>
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="p-4 text-white/60 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/40" />
                        {subscriber.createdAt?.toDate ? subscriber.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors inline-block"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
