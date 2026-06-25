import React from 'react';
import { useState } from "react";
import { motion } from "motion/react";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Play } from "lucide-react";
import Papa from "papaparse";
import { GoogleGenAI, Type } from "@google/genai";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";

interface CsvRow {
  Keyword: string;
  Category?: string;
  Tone?: string;
}

export function BulkGenerate({ user, setView }: { user: any, setView: (view: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<CsvRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<{ keyword: string; status: 'success' | 'error'; errorMsg?: string }[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError("");
    setMessage("");
    setResults([]);
    
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data as any[];
        if (!parsedRows.length) {
          setError("CSV file is empty.");
          setRows([]);
          return;
        }
        
        // Find the actual keyword column name (case insensitive and ignoring BOM)
        const firstRow = parsedRows[0];
        const keywordKey = Object.keys(firstRow).find(k => k.toLowerCase().includes('keyword'));
        
        if (!keywordKey) {
          setError("Invalid CSV format. Ensure you have a 'Keyword' column.");
          setRows([]);
          return;
        }

        const normalizedRows = parsedRows.map(row => {
          const categoryKey = Object.keys(row).find(k => k.toLowerCase().includes('category'));
          const toneKey = Object.keys(row).find(k => k.toLowerCase().includes('tone'));
          return {
            Keyword: row[keywordKey],
            Category: categoryKey ? row[categoryKey] : undefined,
            Tone: toneKey ? row[toneKey] : undefined
          };
        });

        setRows(normalizedRows);
      },
      error: (err) => {
        setError("Error parsing CSV: " + err.message);
      }
    });
  };

  const slugify = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleBulkGenerate = async () => {
    if (!rows.length) return;
    setIsProcessing(true);
    setProgress(0);
    setMessage("");
    setError("");
    setResults([]);

    const newResults: { keyword: string; status: 'success' | 'error'; errorMsg?: string }[] = [];

    try {
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const keyword = row.Keyword;
        const category = row.Category || "General";
        const tone = row.Tone || "Professional";
        
        try {
          const prompt = `
          Write a high-quality SEO optimized article about: ${keyword}
          Category: ${category}
          Tone: ${tone}
          Length: Medium

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

          Make it ${tone} and engaging. ONLY output valid HTML for the content part. Do not wrap in markdown code blocks.
          `;

          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
          
          const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview",
            contents: prompt,
            config: {
              temperature: 0.7,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "The article title" },
                  metaDescription: { type: Type.STRING, description: "SEO meta description" },
                  htmlContent: { type: Type.STRING, description: "The article content in valid HTML format (without the title or meta description)" }
                },
                required: ["title", "metaDescription", "htmlContent"]
              }
            }
          });

          if (response.text) {
            const result = JSON.parse(response.text);
            const title = result.title || `Generated Article: ${keyword}`;
            const content = result.htmlContent || "";
            const excerpt = result.metaDescription || `A comprehensive guide about ${keyword}.`;
            const slug = slugify(title);
            const keywordsStr = keyword.split(' ').join(', ');

            const blogData = {
              title,
              slug,
              content,
              excerpt,
              keywords: keywordsStr,
              category,
              status: "draft",
              authorUid: user.uid,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };

            try {
              await addDoc(collection(db, "blogs"), blogData);
              newResults.push({ keyword, status: 'success' });
            } catch (firestoreError: any) {
              newResults.push({ keyword, status: 'error', errorMsg: firestoreError.message || "Failed to save to Firestore" });
              handleFirestoreError(firestoreError, OperationType.CREATE, "blogs");
            }
          } else {
            newResults.push({ keyword, status: 'error', errorMsg: "No content returned" });
          }
        } catch (err: any) {
          console.error("Error generating row:", row, err);
          if (err.message && err.message.includes("Missing or insufficient permissions")) {
            throw err; // Rethrow so the system can catch it
          }
          newResults.push({ keyword, status: 'error', errorMsg: err.message || "Failed to generate" });
        }

        setResults([...newResults]);
        setProgress(Math.round(((i + 1) / rows.length) * 100));
      }

      setMessage(`Bulk generation complete! Processed ${rows.length} articles.`);
      
      if (user) {
        try {
          await addDoc(collection(db, "notifications"), {
            title: "Bulk Generation Complete",
            message: `Successfully processed ${rows.length} articles.`,
            read: false,
            createdAt: serverTimestamp(),
            userId: user.uid
          });
        } catch (notifError: any) {
          handleFirestoreError(notifError, OperationType.CREATE, "notifications");
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Bulk Generate Articles</h1>
          <p className="text-white/60">Upload a CSV to generate multiple articles at once.</p>
        </div>
        <button 
          onClick={() => setView('all')}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
        >
          View All Articles
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center gap-3 text-white">
          <CheckCircle2 className="w-5 h-5 text-accent-green" />
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-white">
          <AlertCircle className="w-5 h-5 text-red-500" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Upload CSV</h2>
            <p className="text-sm text-white/60 mb-4">
              Your CSV should have a header row. Required column: <strong>Keyword</strong>. Optional columns: <strong>Category</strong>, <strong>Tone</strong>.
            </p>
            
            <div className="w-full h-40 bg-bg-dark border border-white/10 border-dashed rounded-xl flex flex-col items-center justify-center text-white/50 relative hover:bg-white/5 transition-colors cursor-pointer">
              <input 
                type="file" 
                accept=".csv" 
                onChange={(e) => {
                  handleFileUpload(e);
                  e.target.value = '';
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
              />
              <Upload className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm font-medium">{file ? file.name : "Click or drag CSV file here"}</span>
            </div>

            {rows.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/80 mb-4">Found <strong>{rows.length}</strong> rows to process.</p>
                <button 
                  onClick={handleBulkGenerate}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-accent-purple text-white font-bold flex items-center justify-center gap-2 hover:bg-accent-purple/90 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                  {isProcessing ? `Processing... ${progress}%` : "Start Bulk Generation"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
            <h2 className="text-xl font-bold text-white mb-4">Generation Status</h2>
            <div className="flex-1 overflow-y-auto bg-bg-dark rounded-xl border border-white/10 p-4 space-y-3">
              {results.length === 0 && !isProcessing && (
                <div className="h-full flex items-center justify-center text-white/30 text-sm">
                  Results will appear here
                </div>
              )}
              {results.map((res, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    {res.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-accent-green" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-white/80 font-medium">{res.keyword}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${res.status === 'success' ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-500'}`}>
                    {res.status === 'success' ? 'DRAFT SAVED' : 'FAILED'}
                  </span>
                </div>
              ))}
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <Loader2 className="w-4 h-4 text-accent-purple animate-spin" />
                  <span className="text-sm text-white/80 font-medium">Generating next article...</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
