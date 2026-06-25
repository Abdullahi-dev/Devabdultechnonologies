import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight, CheckCircle2, Zap, ShieldCheck, Activity, HeartPulse, Cpu, Globe2, TrendingUp, Building2, ExternalLink } from "lucide-react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PROJECTS } from "../constants/projects";
import { DoerAgentsMockup } from "../components/mockups/DoerAgentsMockup";
import { SentinelShieldMockup } from "../components/mockups/SentinelShieldMockup";
import { SmartBookrMockup } from "../components/mockups/SmartBookrMockup";
import { EhmconnectMockup } from "../components/mockups/EhmconnectMockup";
import { CapitalbotMockup } from "../components/mockups/CapitalbotMockup";
import { EminentMinesMockup } from "../components/mockups/EminentMinesMockup";

const ICON_MAP: Record<string, React.ReactNode> = {
  'CheckCircle2': <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  'Zap': <Zap className="w-5 h-5 text-accent-orange" />,
  'ShieldCheck': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  'Activity': <Activity className="w-5 h-5 text-accent-purple" />,
  'HeartPulse': <HeartPulse className="w-5 h-5 text-rose-400" />,
  'Cpu': <Cpu className="w-5 h-5 text-accent-purple" />,
  'Globe2': <Globe2 className="w-5 h-5 text-emerald-400" />,
  'TrendingUp': <TrendingUp className="w-5 h-5 text-accent-purple" />,
  'Building2': <Building2 className="w-5 h-5 text-accent-orange" />
};

function ThumbnailMockupWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setScale(width / 1280);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-[#0f172a]">
      <div 
        className="w-[1280px] h-[800px] origin-center flex-shrink-0 transition-transform duration-700 group-hover:scale-105"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

function MockupWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-[600px] sm:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden relative shadow-2xl bg-[#0f172a] border border-white/10 isolate">
      <div className="absolute inset-0">
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f172a]/80 to-transparent pointer-events-none rounded-b-3xl z-50"></div>
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        // 1. Try Firestore first
        const q = query(
          collection(db, "portfolio"),
          where("slug", "==", slug)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setProject({
            id: querySnapshot.docs[0].id,
            name: data.title || data.name,
            title: data.title || data.name,
            category: data.category || "Case Study",
            description: data.description || data.excerpt || "",
            fullContent: data.fullContent || data.content,
            image: data.image || `https://picsum.photos/seed/${slug}/1200/600`,
            slug: data.slug,
            date: data.createdAt ? data.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "2026",
            readTime: "5 min read",
            metrics: data.metrics || [],
            features: data.features || [],
            tech: data.tech || [],
            challenge: data.challenge,
            solution: data.solution,
            results: data.results,
            projectStatus: data.projectStatus,
            liveUrl: data.liveUrl || ""
          });

          // Fetch related projects from Firestore
          const relatedQ = query(
            collection(db, "portfolio"),
            where("slug", "!=", slug),
            limit(2)
          );
          const relatedSnap = await getDocs(relatedQ);
          const fetchedRelated = relatedSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          
          if (fetchedRelated.length > 0) {
            setRelatedProjects(fetchedRelated.map((r: any) => ({
              title: r.title || r.name,
              excerpt: r.description,
              image: r.image,
              slug: r.slug
            })));
          } else {
            // Fallback related from PROJECTS
            setRelatedProjects(PROJECTS.filter(p => p.slug !== slug).slice(0, 2).map(p => ({
              title: p.name,
              excerpt: p.description,
              image: p.image,
              slug: p.slug
            })));
          }
        } else {
          // 2. Fallback to local PROJECTS
          const localProject = PROJECTS.find(p => p.slug === slug);
          if (localProject) {
            setProject({
              name: localProject.name,
              title: localProject.name,
              category: localProject.category,
              description: localProject.description,
              fullContent: localProject.fullContent,
              image: localProject.image,
              slug: localProject.slug,
              date: localProject.date,
              readTime: localProject.readTime,
              metrics: localProject.metrics,
              features: localProject.metrics.map(m => m.text),
              tech: localProject.category.split('&').map(s => s.trim()),
              results: ["Production Ready", "Scalable Architecture", "Enterprise Grade"]
            });

            // Related from PROJECTS
            setRelatedProjects(PROJECTS.filter(p => p.slug !== slug).slice(0, 2).map(p => ({
              title: p.name,
              excerpt: p.description,
              image: p.image,
              slug: p.slug
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
        // Fallback on error
        const localProject = PROJECTS.find(p => p.slug === slug);
        if (localProject) {
          setProject({
            name: localProject.name,
            title: localProject.name,
            category: localProject.category,
            description: localProject.description,
            fullContent: localProject.fullContent,
            image: localProject.image,
            slug: localProject.slug,
            date: localProject.date,
            readTime: localProject.readTime,
            metrics: localProject.metrics,
            features: localProject.metrics.map(m => m.text),
            tech: localProject.category.split('&').map(s => s.trim()),
            results: ["Production Ready", "Scalable Architecture", "Enterprise Grade"]
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading case study...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">Case Study Not Found</h1>
          <Link to="/#portfolio" className="text-accent-purple hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white selection:bg-accent-purple/30">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <Link to="/#portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-accent-purple font-medium truncate">{project.name}</span>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold tracking-widest uppercase">
                {project.category}
              </span>
              
              {(project.projectStatus === 'live' || !project.projectStatus) ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
                  <Activity className="w-4 h-4" /> Live Project
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-bold border border-accent-orange/20 uppercase tracking-widest">
                  <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Under Development
                </span>
              )}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight"
            >
              {project.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-white/60 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-purple" />
                <span>{project.date || "2026"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-purple" />
                <span>{project.readTime || "5 min read"}</span>
              </div>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent-blue hover:underline transition-colors font-bold"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Visit Platform</span>
                </a>
              )}
              <button onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: project.title,
                      url: window.location.href,
                    });
                  }
                }} className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </motion.div>
          </div>

          {/* Featured Mockup/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            {project.image && project.image.startsWith('mockup:') ? (
              <MockupWrapper>
                {project.image === 'mockup:doeragents' && <DoerAgentsMockup />}
                {project.image === 'mockup:sentinelshield' && <SentinelShieldMockup />}
                {project.image === 'mockup:smartbookr' && <SmartBookrMockup />}
                {project.image === 'mockup:ehmconnect' && <EhmconnectMockup />}
                {project.image === 'mockup:capitalbot' && <CapitalbotMockup />}
                {project.image === 'mockup:eminentmines' && <EminentMinesMockup />}
              </MockupWrapper>
            ) : (
              <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-white/20 text-4xl font-bold uppercase tracking-widest">{project.category}</div>
                )}
              </div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose prose-invert prose-purple max-w-none 
                  prose-h3:text-2xl prose-h3:font-bold prose-h3:text-white prose-h3:mt-12 prose-h3:mb-6
                  prose-p:text-white/70 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-li:text-white/70 prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: project.fullContent || project.description }}
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 sticky top-32"
              >
                <h4 className="text-xl font-bold text-white mb-6">Project Highlights</h4>
                
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium mb-6 transition-colors font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live Platform
                  </a>
                )}

                <div className="space-y-4">
                  {project.metrics.map((metric: any, index: number) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="mt-1">
                        {typeof metric.icon === 'string' ? (ICON_MAP[metric.icon] || <CheckCircle2 className="w-5 h-5 text-emerald-400" />) : metric.icon}
                      </div>
                      <span className="text-white/80 text-sm font-medium leading-tight">{metric.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-10 border-t border-white/5">
                  <h4 className="text-lg font-bold text-white mb-4">Need a similar solution?</h4>
                  <p className="text-white/60 text-sm mb-6">Let's discuss how we can help you achieve similar results for your business.</p>
                  <Link 
                    to="/contact"
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl bg-accent-purple text-white font-bold hover:bg-accent-purple/90 transition-all shadow-lg shadow-accent-purple/20"
                  >
                    Start a Project
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="mt-32 pt-20 border-t border-white/5">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-white tracking-tight">More Case Studies</h2>
                <Link to="/case-studies" className="text-accent-purple font-bold hover:underline">View All</Link>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedProjects.map((otherProject, index) => (
                  <Link 
                    key={index}
                    to={`/case-studies/${otherProject.slug}`}
                    className="group bg-bg-card border border-white/5 rounded-3xl p-6 hover:border-accent-purple/30 transition-all"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-bg-dark relative">
                      {otherProject.image && otherProject.image.startsWith('mockup:') ? (
                        <div className="opacity-50 group-hover:opacity-100 transition-opacity w-full h-full">
                          <ThumbnailMockupWrapper>
                            {otherProject.image === 'mockup:doeragents' && <DoerAgentsMockup />}
                            {otherProject.image === 'mockup:sentinelshield' && <SentinelShieldMockup />}
                            {otherProject.image === 'mockup:smartbookr' && <SmartBookrMockup />}
                            {otherProject.image === 'mockup:ehmconnect' && <EhmconnectMockup />}
                            {otherProject.image === 'mockup:capitalbot' && <CapitalbotMockup />}
                            {otherProject.image === 'mockup:eminentmines' && <EminentMinesMockup />}
                          </ThumbnailMockupWrapper>
                        </div>
                      ) : (
                        <img 
                          src={otherProject.image || `https://picsum.photos/seed/${otherProject.slug}/800/500`} 
                          alt={otherProject.title} 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" 
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">{otherProject.title}</h3>
                    <p className="text-white/50 text-sm line-clamp-2">{otherProject.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
