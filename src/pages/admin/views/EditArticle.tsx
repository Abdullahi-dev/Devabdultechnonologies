import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, Send, Loader2, CheckCircle2, ArrowLeft, Eye, Image as ImageIcon, Sparkles, Code, Edit3 } from "lucide-react";
import { doc, getDoc, updateDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { FontSize } from '../../../utils/fontSizeExtension';
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";
import { RichTextToolbar } from '../../../components/RichTextToolbar';

export function EditArticle({ articleId, setView }: { articleId: string, setView: (view: string) => void }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  
  // Case Study specific fields
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");
  const [metrics, setMetrics] = useState("");
  const [features, setFeatures] = useState("");
  const [tech, setTech] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  
  const [activeTab, setActiveTab] = useState<"compose" | "html" | "preview">("compose");
  
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      FontFamily,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      FontSize,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6 bg-bg-dark rounded-b-xl',
      },
    },
  });

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setContent(newHtml);
    if (editor && editor.getHTML() !== newHtml) {
      editor.commands.setContent(newHtml);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, "blogs", articleId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setCategory(data.category || "");
          setKeywords(data.keywords || "");
          setExcerpt(data.excerpt || "");
          setStatus(data.status || "draft");
          setImageUrl(data.image || "");
          setPdfUrl(data.pdfUrl || "");
          setAllowComments(data.allowComments !== false); // Default to true if undefined
          
          // Case Study fields
          setChallenge(data.challenge || "");
          setSolution(data.solution || "");
          setResults(data.results || "");
          
          if (data.metrics && Array.isArray(data.metrics)) {
            setMetrics(data.metrics.map((m: any) => typeof m === 'string' ? m : (m.text || "")).join('\n'));
          } else {
            setMetrics("");
          }

          if (data.features && Array.isArray(data.features)) {
            setFeatures(data.features.join(', '));
          } else {
            setFeatures("");
          }

          if (data.tech && Array.isArray(data.tech)) {
            setTech(data.tech.join(', '));
          } else {
            setTech("");
          }
          
          setWebsiteUrl(data.websiteUrl || "");
          
          if (data.publishedAt) {
            const date = data.publishedAt.toDate();
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
            setPublishDate(localISOTime);
          }
          
          if (editor) {
            let htmlContent = data.content || "";
            // If it looks like markdown (not starting with <), parse it
            if (htmlContent && !htmlContent.trim().startsWith('<')) {
              try {
                htmlContent = await marked.parse(htmlContent);
              } catch (e) {
                console.error("Error parsing markdown", e);
              }
            }
            setContent(htmlContent);
            editor.commands.setContent(htmlContent);
          }
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `blogs/${articleId}`);
      } finally {
        setLoading(false);
      }
    };

    if (editor) {
      fetchArticle();
    }
  }, [articleId, editor]);

  const handleSaveDraft = async () => {
    if (!title || !editor) return;
    setIsSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "blogs", articleId);
      
      let finalTitle = title;
      if (finalTitle.length > 250) finalTitle = finalTitle.substring(0, 250);
      
      let finalSlug = slug;
      if (finalSlug.length > 250) finalSlug = finalSlug.substring(0, 250);

      let finalExcerpt = excerpt;
      if (finalExcerpt.length > 1000) finalExcerpt = finalExcerpt.substring(0, 1000);
      
      let finalKeywords = keywords;
      if (finalKeywords.length > 1000) finalKeywords = finalKeywords.substring(0, 1000);

      const typeMap: Record<string, string> = {
        "Blog": "blog",
        "Engineering Insights": "insight",
        "Technology Guides": "insight",
        "Whitepapers": "whitepaper",
        "Case Studies": "case-study",
        "Press Release": "press-release"
      };

      const updateData: any = {
        title: finalTitle,
        slug: finalSlug,
        category,
        type: typeMap[category] || "blog",
        keywords: finalKeywords,
        excerpt: finalExcerpt,
        image: imageUrl,
        pdfUrl: pdfUrl,
        content: content,
        allowComments: allowComments,
        updatedAt: serverTimestamp()
      };

      if (category === "Case Studies") {
        updateData.challenge = challenge;
        updateData.solution = solution;
        updateData.results = results;
        updateData.metrics = metrics.split('\n').filter(m => m.trim()).map(m => ({ text: m.trim(), icon: 'CheckCircle2' }));
        updateData.features = features.split(',').map(f => f.trim()).filter(f => f);
        updateData.tech = tech.split(',').map(t => t.trim()).filter(t => t);
        updateData.websiteUrl = websiteUrl;
      }

      await updateDoc(docRef, updateData);
      setMessage("Draft updated successfully!");
    } catch (error: any) {
      setMessage(error.message || "Error updating draft");
      try {
        handleFirestoreError(error, OperationType.UPDATE, `blogs/${articleId}`);
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async (action: "publish") => {
    setIsPublishing(true);
    setMessage("");
    try {
      const docRef = doc(db, "blogs", articleId);
      
      let finalStatus = "published";
      let publishedAtDate: Date | any = serverTimestamp();
      
      if (action === "publish") {
        if (publishDate) {
          const selectedDate = new Date(publishDate);
          const minDate = new Date(Date.now() + 10 * 60000); // 10 minutes from now
          
          if (selectedDate < minDate) {
            setMessage("Scheduled publish time must be at least 10 minutes from now.");
            setIsPublishing(false);
            return;
          }
          finalStatus = "scheduled";
          publishedAtDate = selectedDate;
        }
      }

      let finalTitle = title;
      if (finalTitle.length > 250) finalTitle = finalTitle.substring(0, 250);
      
      let finalSlug = slug;
      if (finalSlug.length > 250) finalSlug = finalSlug.substring(0, 250);

      let finalExcerpt = excerpt;
      if (finalExcerpt.length > 1000) finalExcerpt = finalExcerpt.substring(0, 1000);
      
      let finalKeywords = keywords;
      if (finalKeywords.length > 1000) finalKeywords = finalKeywords.substring(0, 1000);

      const typeMap: Record<string, string> = {
        "Blog": "blog",
        "Engineering Insights": "insight",
        "Technology Guides": "insight",
        "Whitepapers": "whitepaper",
        "Case Studies": "case-study",
        "Press Release": "press-release"
      };

      const updateData: any = {
        title: finalTitle,
        slug: finalSlug,
        category,
        type: typeMap[category] || "blog",
        keywords: finalKeywords,
        excerpt: finalExcerpt,
        image: imageUrl,
        pdfUrl: pdfUrl,
        content: content,
        allowComments: allowComments,
        status: finalStatus,
        publishedAt: publishedAtDate,
        updatedAt: serverTimestamp()
      };

      if (category === "Case Studies") {
        updateData.challenge = challenge;
        updateData.solution = solution;
        updateData.results = results;
        updateData.metrics = metrics.split('\n').filter(m => m.trim()).map(m => ({ text: m.trim(), icon: 'CheckCircle2' }));
        updateData.features = features.split(',').map(f => f.trim()).filter(f => f);
        updateData.tech = tech.split(',').map(t => t.trim()).filter(t => t);
        updateData.websiteUrl = websiteUrl;
      }

      await updateDoc(docRef, updateData);
      
      if (auth.currentUser) {
        await addDoc(collection(db, "notifications"), {
          title: "Article Updated",
          message: `Article "${finalTitle}" has been updated and saved as ${finalStatus}.`,
          read: false,
          createdAt: serverTimestamp(),
          userId: auth.currentUser.uid
        });
      }

      setStatus(finalStatus);
      setMessage(`Article ${finalStatus} successfully!`);
    } catch (error: any) {
      setMessage(error.message || `Error publishing article`);
      try {
        handleFirestoreError(error, OperationType.UPDATE, `blogs/${articleId}`);
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!title) {
      setMessage("Please enter a title first to generate an image.");
      return;
    }
    setIsGeneratingImage(true);
    setMessage("");
    try {
      const prompt = `A professional, high-quality blog thumbnail image for an article titled: "${title}". The image should be modern, abstract, and suitable for a tech or business blog. No text in the image.`;
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          // Do not set responseMimeType or responseSchema for image models
        }
      });

      let base64Image = null;
      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64Image = part.inlineData.data;
            break;
          }
        }
      }

      if (base64Image) {
        setImageUrl(`data:image/jpeg;base64,${base64Image}`);
        setMessage("Image generated successfully!");
      } else {
        setMessage("Failed to generate image");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error generating image. " + (error as Error).message);
    }
    setIsGeneratingImage(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/60">Loading article...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('all')}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Article</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                status === 'published' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-purple/20 text-accent-purple'
              }`}>
                {status.toUpperCase()}
              </span>
              <span className="text-white/50">ID: {articleId}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {status === 'published' && (
            <a 
              href={`/resources/${slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Live
            </a>
          )}
          <button 
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          {(status === 'draft' || status === 'scheduled') && (
            <>
              <button 
                onClick={() => handlePublish("publish")}
                disabled={isPublishing}
                className="px-4 py-2 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-purple/90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {publishDate ? "Schedule Post" : "Publish Now"}
              </button>
            </>
          )}
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center gap-3 text-white">
          <CheckCircle2 className="w-5 h-5 text-accent-blue" />
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Editor Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title..."
              className="w-full bg-transparent text-3xl font-bold text-white placeholder-white/30 focus:outline-none mb-6"
            />
            
            {/* Editor Tabs */}
            <div className="border border-white/10 rounded-xl overflow-hidden flex flex-col">
              <div className="flex items-center bg-white/5 border-b border-white/10">
                <button
                  onClick={() => setActiveTab("compose")}
                  className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === "compose" ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  <Edit3 className="w-4 h-4" /> Compose
                </button>
                <button
                  onClick={() => setActiveTab("html")}
                  className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === "html" ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  <Code className="w-4 h-4" /> HTML
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${activeTab === "preview" ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>

              {/* Editor Content */}
              <div className="min-h-[500px] bg-bg-dark">
                {activeTab === "compose" && (
                  <div className="flex flex-col h-full">
                    <RichTextToolbar editor={editor} />
                    <EditorContent editor={editor} />
                  </div>
                )}
                {activeTab === "html" && (
                  <textarea
                    value={content}
                    onChange={handleHtmlChange}
                    className="w-full h-[500px] bg-transparent p-6 text-white/80 font-mono text-sm focus:outline-none resize-none"
                    placeholder="<p>Write your HTML here...</p>"
                  />
                )}
                {activeTab === "preview" && (
                  <div 
                    className="p-6 prose prose-invert max-w-none min-h-[500px]"
                    dangerouslySetInnerHTML={{ __html: content || "<p class='text-white/40'>Preview will appear here...</p>" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Publish Settings</h3>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white/70">Schedule Date & Time</label>
                {publishDate && (
                  <button 
                    onClick={() => setPublishDate("")}
                    className="text-xs text-accent-purple hover:text-accent-purple/80 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input 
                type="datetime-local" 
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
              />
              <p className="text-xs text-white/40 mt-1">Must be at least 10 mins from now.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Slug</label>
              <input 
                type="text" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Resource Type</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
              >
                <option>Blog</option>
                <option>Engineering Insights</option>
                <option>Technology Guides</option>
                <option>Whitepapers</option>
                <option>Case Studies</option>
                <option>Press Release</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Cover Image URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
              {imageUrl ? (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10 relative">
                  <img src={imageUrl} alt="Cover" className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setImageUrl("")}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded-lg text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-32 bg-bg-dark border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center text-white/50 mt-2">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm">No image selected</span>
                </div>
              )}
              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImage || !title}
                className="w-full mt-3 py-2 rounded-xl bg-accent-purple/20 text-accent-purple font-medium flex items-center justify-center gap-2 hover:bg-accent-purple/30 transition-colors disabled:opacity-50"
              >
                {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate Cover Image with AI
              </button>
            </div>

            {category === "Whitepapers" && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">PDF Download URL (Optional)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://.../file.pdf"
                    className="flex-1 bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>
            )}

            {category === "Case Studies" && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold text-accent-blue uppercase tracking-wider">Case Study Details</h4>
                
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">The Challenge</label>
                  <textarea 
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    rows={3}
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">The Solution</label>
                  <textarea 
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    rows={3}
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">The Results</label>
                  <textarea 
                    value={results}
                    onChange={(e) => setResults(e.target.value)}
                    rows={3}
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Metrics (one per line)</label>
                  <textarea 
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    rows={2}
                    placeholder="30% increase in efficiency&#10;99.9% uptime"
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Features (comma separated)</label>
                  <input 
                    type="text" 
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="Real-time tracking, AI analysis"
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Tech Stack (comma separated)</label>
                  <input 
                    type="text" 
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    placeholder="React, Node.js, Firebase"
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1">Platform URL / Website (Optional)</label>
                  <input 
                    type="text" 
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Excerpt</label>
              <textarea 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Keywords (comma separated)</label>
              <input 
                type="text" 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <label className="text-sm font-medium text-white/70">Allow Comments</label>
              <button
                type="button"
                onClick={() => setAllowComments(!allowComments)}
                className={`w-12 h-6 rounded-full transition-colors relative ${allowComments ? 'bg-accent-blue' : 'bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${allowComments ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

