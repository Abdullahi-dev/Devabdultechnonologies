import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";
import { Mail, Calendar, User, Building, DollarSign, Trash2, CheckCircle, Clock } from "lucide-react";

export function InquiriesList() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "project_inquiries"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(data);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "project_inquiries");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "project_inquiries", id), { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `project_inquiries/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await deleteDoc(doc(db, "project_inquiries", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `project_inquiries/${id}`);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white/70">Loading inquiries...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Project Inquiries</h1>
          <p className="text-white/60">Manage messages and project requests from your contact form.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
          <Mail className="w-5 h-5 text-accent-blue" />
          <span className="text-white font-bold">{inquiries.length} Total</span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-bg-card border border-white/10 rounded-2xl p-12 text-center">
          <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No inquiries yet</h3>
          <p className="text-white/50">When someone fills out your contact form, it will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-bg-card border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white">{inquiry.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      inquiry.status === 'read' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                    }`}>
                      {inquiry.status === 'read' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {inquiry.status === 'read' ? 'Read' : 'New'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Mail className="w-4 h-4 text-white/40" />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-accent-blue transition-colors">{inquiry.email}</a>
                    </div>
                    {inquiry.company && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Building className="w-4 h-4 text-white/40" />
                        {inquiry.company}
                      </div>
                    )}
                    {inquiry.budget && (
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <DollarSign className="w-4 h-4 text-white/40" />
                        {inquiry.budget}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Calendar className="w-4 h-4 text-white/40" />
                      {inquiry.createdAt?.toDate ? inquiry.createdAt.toDate().toLocaleString() : 'Just now'}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-white/80 whitespace-pre-wrap text-sm leading-relaxed">{inquiry.message}</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 shrink-0">
                  {inquiry.status !== 'read' && (
                    <button
                      onClick={() => handleStatusChange(inquiry.id, 'read')}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
