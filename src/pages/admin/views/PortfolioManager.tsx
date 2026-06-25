import React from 'react';
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileEdit, Trash2, Plus, ExternalLink, Activity, Clock } from "lucide-react";
import { PROJECTS } from "../../../constants/projects";

// Default seed function
const seedDefaults = async () => {
  for (const proj of PROJECTS) {
    const docRef = doc(db, "portfolio", proj.slug);
    await setDoc(docRef, {
      title: proj.name,
      slug: proj.slug,
      category: proj.category,
      description: proj.description,
      image: proj.image,
      metrics: proj.metrics.map(m => ({ text: m.text, icon: 'CheckCircle2' })), // Simplify icon mapping
      fullContent: proj.fullContent || "",
      projectStatus: "development", // default
      liveUrl: "",
      createdAt: serverTimestamp()
    }, { merge: true });
  }
};

export function PortfolioManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const docRef = doc(db, "portfolio", editingProject.slug || editingProject.id);
      await setDoc(docRef, {
        ...editingProject,
        updatedAt: serverTimestamp(),
        createdAt: editingProject.createdAt || serverTimestamp()
      }, { merge: true });
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, "portfolio", id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const initDefaults = async () => {
    if (!window.confirm("This will merge default hardcoded projects into the database. Continue?")) return;
    setLoading(true);
    await seedDefaults();
    setLoading(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  if (editingProject) {
    return (
      <div className="bg-bg-card p-6 rounded-3xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {editingProject.id ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={() => setEditingProject(null)} className="text-white/50 hover:text-white">Cancel</button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Title</label>
              <input type="text" required value={editingProject.title || ''} onChange={e => setEditingProject({...editingProject, title: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Slug (URL)</label>
              <input type="text" required value={editingProject.slug || ''} onChange={e => setEditingProject({...editingProject, slug: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Category</label>
              <input type="text" required value={editingProject.category || ''} onChange={e => setEditingProject({...editingProject, category: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Image (URL or mockup:name)</label>
              <input type="text" value={editingProject.image || ''} onChange={e => setEditingProject({...editingProject, image: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
              <select value={editingProject.projectStatus || 'development'} onChange={e => setEditingProject({...editingProject, projectStatus: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue appearance-none">
                <option value="development" className="bg-bg-dark text-white">Under Development</option>
                <option value="live" className="bg-bg-dark text-white">Live Project</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1">Live URL (if applicable)</label>
              <input type="url" value={editingProject.liveUrl || ''} onChange={e => setEditingProject({...editingProject, liveUrl: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue" placeholder="https://" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1">Brief Description</label>
              <textarea required value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue h-24"></textarea>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white/70 mb-1">Full HTML Content</label>
              <textarea value={editingProject.fullContent || ''} onChange={e => setEditingProject({...editingProject, fullContent: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-accent-blue h-64 font-mono text-sm"></textarea>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 mt-8">
            <button type="button" onClick={() => setEditingProject(null)} className="px-6 py-2 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-accent-blue text-white font-bold hover:bg-accent-blue/90">Save Project</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio Projects</h1>
          <p className="text-white/60">Manage your success stories, case studies, and live projects.</p>
        </div>
        <div className="flex gap-4">
          {projects.length === 0 && (
            <button onClick={initDefaults} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
              Initialize Defaults
            </button>
          )}
          <button onClick={() => setEditingProject({ slug: '', title: '', projectStatus: 'development' })} className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-xl hover:bg-accent-blue/90 transition-colors font-bold">
            <Plus className="w-5 h-5" /> Add Project
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {projects.map(project => (
          <div key={project.id} className="bg-bg-card border border-white/10 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {project.projectStatus === 'live' ? (
                  <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Live
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-md bg-accent-orange/10 text-accent-orange text-xs font-bold border border-accent-orange/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Under Development
                  </span>
                )}
              </div>
              <p className="text-white/60 text-sm">{project.category} • {project.slug}</p>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-accent-blue text-xs flex items-center gap-1 mt-2 hover:underline">
                  {project.liveUrl} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setEditingProject(project)}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title="Edit"
              >
                <FileEdit className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-white/60">No projects found. Click "Initialize Defaults" or add a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
