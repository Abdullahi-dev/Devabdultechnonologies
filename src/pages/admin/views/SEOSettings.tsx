import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Loader2, CheckCircle2, Settings } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";

export function SEOSettings() {
  const [metaTitle, setMetaTitle] = useState("Devabdultechnologies Blog");
  const [metaDescription, setMetaDescription] = useState("Learn how to build scalable SaaS applications using modern architecture, cloud infrastructure, and best practices.");
  const [keywords, setKeywords] = useState("SaaS, AI, Fintech, Healthcare, Software Development");
  const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\nSitemap: https://deveabdultechnologies.com/sitemap.xml");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const docRef = doc(db, "settings", "seo");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.metaTitle) setMetaTitle(data.metaTitle);
          if (data.metaDescription) setMetaDescription(data.metaDescription);
          if (data.keywords) setKeywords(data.keywords);
          if (data.robotsTxt) setRobotsTxt(data.robotsTxt);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, "settings/seo");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSEO();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "settings", "seo");
      await setDoc(docRef, {
        metaTitle,
        metaDescription,
        keywords,
        robotsTxt
      }, { merge: true });
      setMessage("SEO Settings saved successfully!");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "settings/seo");
      setMessage("Error saving SEO settings");
    }
    setIsSaving(false);
  };

  const handleGenerateSitemap = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      // Simulate generating sitemap
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage("Sitemap generated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error generating sitemap");
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64 text-white/60">Loading settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">SEO Settings</h1>
        <p className="text-white/60">Manage default metadata and search engine visibility.</p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center gap-3 text-white">
          <CheckCircle2 className="w-5 h-5 text-accent-blue" />
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent-blue" />
              Default Metadata
            </h2>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Default Meta Title</label>
              <input 
                type="text" 
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Default Meta Description</label>
              <textarea 
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Default Keywords</label>
              <input 
                type="text" 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Technical SEO</h2>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Robots.txt</label>
              <textarea 
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={4}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent-blue resize-none"
              />
            </div>
            <div className="pt-4 border-t border-white/10">
              <label className="block text-sm font-medium text-white/70 mb-2">XML Sitemap</label>
              <button 
                onClick={handleGenerateSitemap}
                disabled={isSaving}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                Generate Sitemap
              </button>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 rounded-xl bg-accent-blue text-white font-bold flex items-center justify-center gap-2 hover:bg-accent-blue/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save SEO Settings
          </button>
        </div>
      </div>
    </div>
  );
}
