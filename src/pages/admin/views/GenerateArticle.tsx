import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Save, Send, Loader2, CheckCircle2, Image as ImageIcon, Code, Eye, Edit3 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
import { GoogleGenAI, Type } from "@google/genai";
import { RichTextToolbar } from '../../../components/RichTextToolbar';

export function GenerateArticle({ user, setView }: { user: any, setView: (view: string) => void }) {
  const [title, setTitle] = useState(() => localStorage.getItem("draft_title") || "");
  const [content, setContent] = useState(() => localStorage.getItem("draft_content") || ""); // HTML content
  const [excerpt, setExcerpt] = useState(() => localStorage.getItem("draft_excerpt") || "");
  const [keywords, setKeywords] = useState(() => localStorage.getItem("draft_keywords") || "");
  const [category, setCategory] = useState(() => localStorage.getItem("draft_category") || "General");
  const [publishDate, setPublishDate] = useState(() => localStorage.getItem("draft_publishDate") || "");
  const [imageUrl, setImageUrl] = useState(() => localStorage.getItem("draft_imageUrl") || "");
  const [pdfUrl, setPdfUrl] = useState(() => localStorage.getItem("draft_pdfUrl") || "");
  const [allowComments, setAllowComments] = useState(() => localStorage.getItem("draft_allowComments") !== "false");
  
  // Case Study specific fields
  const [challenge, setChallenge] = useState(() => localStorage.getItem("draft_challenge") || "");
  const [solution, setSolution] = useState(() => localStorage.getItem("draft_solution") || "");
  const [results, setResults] = useState(() => localStorage.getItem("draft_results") || "");
  const [metrics, setMetrics] = useState(() => localStorage.getItem("draft_metrics") || "");
  const [features, setFeatures] = useState(() => localStorage.getItem("draft_features") || "");
  const [tech, setTech] = useState(() => localStorage.getItem("draft_tech") || "");
  const [websiteUrl, setWebsiteUrl] = useState(() => localStorage.getItem("draft_websiteUrl") || "");
  
  const [activeTab, setActiveTab] = useState<"compose" | "html" | "preview">("compose");
  
  // AI Settings
  const [aiKeyword, setAiKeyword] = useState(() => localStorage.getItem("draft_aiKeyword") || "");
  const [aiTone, setAiTone] = useState(() => localStorage.getItem("draft_aiTone") || "Professional");
  const [aiLength, setAiLength] = useState(() => localStorage.getItem("draft_aiLength") || "Medium (~1000 words)");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("draft_title", title);
    localStorage.setItem("draft_content", content);
    localStorage.setItem("draft_excerpt", excerpt);
    localStorage.setItem("draft_keywords", keywords);
    localStorage.setItem("draft_category", category);
    localStorage.setItem("draft_publishDate", publishDate);
    localStorage.setItem("draft_imageUrl", imageUrl);
    localStorage.setItem("draft_pdfUrl", pdfUrl);
    localStorage.setItem("draft_allowComments", allowComments.toString());
    localStorage.setItem("draft_challenge", challenge);
    localStorage.setItem("draft_solution", solution);
    localStorage.setItem("draft_results", results);
    localStorage.setItem("draft_metrics", metrics);
    localStorage.setItem("draft_features", features);
    localStorage.setItem("draft_tech", tech);
    localStorage.setItem("draft_websiteUrl", websiteUrl);
    localStorage.setItem("draft_aiKeyword", aiKeyword);
    localStorage.setItem("draft_aiTone", aiTone);
    localStorage.setItem("draft_aiLength", aiLength);
  }, [title, content, excerpt, keywords, category, publishDate, imageUrl, pdfUrl, allowComments, aiKeyword, aiTone, aiLength]);

  const clearDraft = () => {
    localStorage.removeItem("draft_title");
    localStorage.removeItem("draft_content");
    localStorage.removeItem("draft_excerpt");
    localStorage.removeItem("draft_keywords");
    localStorage.removeItem("draft_category");
    localStorage.removeItem("draft_publishDate");
    localStorage.removeItem("draft_imageUrl");
    localStorage.removeItem("draft_pdfUrl");
    localStorage.removeItem("draft_allowComments");
    localStorage.removeItem("draft_challenge");
    localStorage.removeItem("draft_solution");
    localStorage.removeItem("draft_results");
    localStorage.removeItem("draft_metrics");
    localStorage.removeItem("draft_features");
    localStorage.removeItem("draft_tech");
    localStorage.removeItem("draft_websiteUrl");
    localStorage.removeItem("draft_aiKeyword");
    localStorage.removeItem("draft_aiTone");
    localStorage.removeItem("draft_aiLength");
  };

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
    content: localStorage.getItem("draft_content") || '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6 bg-bg-dark rounded-b-xl',
      },
    },
  });

  // Sync HTML textarea changes back to editor
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    setContent(newHtml);
    if (editor && editor.getHTML() !== newHtml) {
      editor.commands.setContent(newHtml);
    }
  };

  const slugify = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleGenerateText = async () => {
    if (!aiKeyword) {
      setMessage("Please enter a keyword/topic for AI generation.");
      return;
    }
    setIsGenerating(true);
    setMessage("");
    try {
      const prompt = `
      Write a high-quality SEO optimized article about: ${aiKeyword}
      Category: ${category}
      Tone: ${aiTone}
      Length: ${aiLength}

      Structure the content based on the Category:
      - If "Blog": Use standard blog format with engaging introduction, body paragraphs, and conclusion.
      - If "Insight": Format as a data-driven insight report with "Key Takeaways" at the beginning.
      - If "White Paper": Format as a formal white paper with an "Executive Summary" and deep technical analysis.
      - If "Case Study": Format with "The Challenge", "The Solution", and "The Results" sections.

      Include:
      - Title
      - Meta description (150-160 characters)
      - Headings (<h2>, <h3>)
      - Well-structured content with <p>, <ul>, <li>
      - Internal linking suggestions (use <a> tags with href="#")
      - CTA for a software development company

      Make it ${aiTone} and engaging. ONLY output valid HTML for the content part. Do not wrap in markdown code blocks.
      `;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const isCaseStudy = category === "Case Studies";
      
      let responseSchema: any = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The article title" },
          metaDescription: { type: Type.STRING, description: "SEO meta description" },
          htmlContent: { type: Type.STRING, description: "The article content in valid HTML format (without the title or meta description)" }
        },
        required: ["title", "metaDescription", "htmlContent"]
      };

      if (isCaseStudy) {
        responseSchema.properties.challenge = { type: Type.STRING, description: "The challenge faced in the case study" };
        responseSchema.properties.solution = { type: Type.STRING, description: "The solution provided" };
        responseSchema.properties.results = { type: Type.STRING, description: "The results achieved" };
        responseSchema.properties.metrics = { type: Type.STRING, description: "Key metrics achieved (e.g. '30% increase in efficiency')" };
        responseSchema.properties.features = { type: Type.STRING, description: "Key features implemented (comma separated)" };
        responseSchema.properties.tech = { type: Type.STRING, description: "Technologies used (comma separated)" };
        responseSchema.required = [...responseSchema.required, "challenge", "solution", "results"];
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
          responseSchema
        }
      });

      if (!response.text) {
        throw new Error("Failed to generate article content");
      }
      
      const data = JSON.parse(response.text);
      
      let htmlOutput = data.htmlContent;
      // Clean up markdown code blocks if AI still adds them
      htmlOutput = htmlOutput.replace(/^```html\n/, '').replace(/\n```$/, '');
      
      setTitle(data.title || `Generated Article: ${aiKeyword}`);
      setExcerpt(data.metaDescription || `A comprehensive guide about ${aiKeyword}.`);

      if (isCaseStudy) {
        setChallenge(data.challenge || "");
        setSolution(data.solution || "");
        setResults(data.results || "");
        setMetrics(data.metrics || "");
        setFeatures(data.features || "");
        setTech(data.tech || "");
        
        // Construct content from sections if it's a case study
        const combinedContent = `
          <h3>The Challenge</h3>
          <p>${data.challenge}</p>
          <h3>The Solution</h3>
          <p>${data.solution}</p>
          <h3>The Results</h3>
          <p>${data.results}</p>
        `;
        htmlOutput = combinedContent;
      }

      setContent(htmlOutput);
      if (editor) {
        editor.commands.setContent(htmlOutput);
      }
      
      setKeywords(aiKeyword.split(' ').join(', '));
      setMessage("Article generated successfully! You can now edit it.");
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Error generating article.");
    }
    setIsGenerating(false);
  };

  const handleGenerateImage = async () => {
    const promptBase = title || aiKeyword;
    if (!promptBase) {
      setMessage("Please enter a title or AI keyword first to generate an image.");
      return;
    }
    setIsGeneratingImage(true);
    setMessage("");
    try {
      const prompt = `A professional, high-quality blog thumbnail image for an article titled: "${promptBase}". The image should be modern, abstract, and suitable for a tech or business blog. No text in the image.`;
      
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
        setMessage("Cover image generated successfully!");
      } else {
        setMessage("Failed to generate image");
      }
    } catch (error: any) {
      console.error(error);
      setMessage("Error generating image. " + error.message);
    }
    setIsGeneratingImage(false);
  };

  const handleSave = async (action: "draft" | "publish") => {
    if (!title || !content || !user) {
      setMessage("Title, content, and authentication are required");
      return;
    }
    
    let finalStatus = "draft";
    let publishedAtDate: Date | any = null;
    
    if (action === "publish") {
      if (publishDate) {
        const selectedDate = new Date(publishDate);
        const minDate = new Date(Date.now() + 10 * 60000); // 10 minutes from now
        
        if (selectedDate < minDate) {
          setMessage("Scheduled publish time must be at least 10 minutes from now.");
          return;
        }
        finalStatus = "scheduled";
        publishedAtDate = selectedDate;
      } else {
        finalStatus = "published";
        publishedAtDate = serverTimestamp();
      }
    }

    setIsSaving(true);
    setMessage("");
    try {
      let slug = slugify(title);
      if (slug.length > 250) slug = slug.substring(0, 250);
      
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
      
      const blogData: any = {
        title,
        slug,
        content,
        excerpt: finalExcerpt,
        keywords: finalKeywords,
        category,
        type: typeMap[category] || "blog",
        image: imageUrl,
        pdfUrl: pdfUrl,
        status: finalStatus,
        allowComments,
        authorUid: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (category === "Case Studies") {
        blogData.challenge = challenge;
        blogData.solution = solution;
        blogData.results = results;
        blogData.metrics = metrics.split('\n').filter(m => m.trim()).map(m => ({ text: m.trim(), icon: 'CheckCircle2' }));
        blogData.features = features.split(',').map(f => f.trim()).filter(f => f);
        blogData.tech = tech.split(',').map(t => t.trim()).filter(t => t);
        blogData.websiteUrl = websiteUrl;
      }
      
      if (publishedAtDate) {
        blogData.publishedAt = publishedAtDate;
      }

      const docRef = await addDoc(collection(db, "blogs"), blogData);
      
      await addDoc(collection(db, "notifications"), {
        title: "New Article Created",
        message: `Article "${title}" has been saved as ${finalStatus}.`,
        read: false,
        createdAt: serverTimestamp(),
        userId: user.uid
      });

      clearDraft();
      setMessage(`Article ${finalStatus} successfully!`);
      setTimeout(() => setView(`edit:${docRef.id}`), 1000);
    } catch (error: any) {
      setMessage(error.message || `Error saving article`);
      try {
        handleFirestoreError(error, OperationType.CREATE, "blogs");
      } catch (e) {
        console.error(e);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Article</h1>
          <p className="text-white/60">Write manually or use AI to generate content.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => handleSave("draft")}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button 
            onClick={() => handleSave("publish")}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-accent-purple text-white font-medium hover:bg-accent-purple/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {publishDate ? "Schedule Post" : "Publish Now"}
          </button>
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

        {/* Sidebar Settings & AI */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Settings */}
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
              {imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10">
                  <img src={imageUrl} alt="Cover" className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
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

          {/* AI Assistant */}
          <div className="bg-bg-card border border-accent-purple/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 blur-3xl rounded-full pointer-events-none" />
            
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-purple" />
              AI Assistant
            </h3>
            <p className="text-sm text-white/60">Generate content or images using AI.</p>
            
            <div className="pt-2">
              <label className="block text-sm font-medium text-white/70 mb-2">Topic / Keyword</label>
              <input 
                type="text" 
                value={aiKeyword}
                onChange={(e) => setAiKeyword(e.target.value)}
                placeholder="e.g. Future of AI"
                className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Tone</label>
                <select 
                  value={aiTone}
                  onChange={(e) => setAiTone(e.target.value)}
                  className="w-full bg-bg-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
                >
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Authoritative</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1">Length</label>
                <select 
                  value={aiLength}
                  onChange={(e) => setAiLength(e.target.value)}
                  className="w-full bg-bg-dark border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-purple"
                >
                  <option>Short</option>
                  <option>Medium</option>
                  <option>Long</option>
                </select>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                onClick={handleGenerateText}
                disabled={isGenerating || !aiKeyword}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit3 className="w-4 h-4" />}
                Generate Article
              </button>
              
              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImage || (!title && !aiKeyword)}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                {isGeneratingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                Generate Cover Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

