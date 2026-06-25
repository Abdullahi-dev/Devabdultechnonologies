import React from 'react';
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Zap, ShieldCheck, Activity, HeartPulse, Cpu, Globe2, TrendingUp, Building2, Calendar } from "lucide-react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { PROJECTS } from "../constants/projects";
import { DoerAgentsMockup } from "./mockups/DoerAgentsMockup";
import { SentinelShieldMockup } from "./mockups/SentinelShieldMockup";
import { SmartBookrMockup } from "./mockups/SmartBookrMockup";
import { EhmconnectMockup } from "./mockups/EhmconnectMockup";
import { CapitalbotMockup } from "./mockups/CapitalbotMockup";
import { EminentMinesMockup } from "./mockups/EminentMinesMockup";

const ICON_MAP: Record<string, React.ReactNode> = {
  'CheckCircle2': <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  'Zap': <Zap className="w-5 h-5 text-accent-orange" />,
  'ShieldCheck': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  'Activity': <Activity className="w-5 h-5 text-accent-purple" />,
  'HeartPulse': <HeartPulse className="w-5 h-5 text-rose-400" />,
  'Cpu': <Cpu className="w-5 h-5 text-accent-purple" />,
  'Globe2': <Globe2 className="w-5 h-5 text-emerald-400" />,
  'TrendingUp': <TrendingUp className="w-5 h-5 text-accent-purple" />,
  'Building2': <Building2 className="w-5 h-5 text-accent-orange" />,
  'Calendar': <Calendar className="w-5 h-5 text-blue-400" />
};

function MockupWrapper({ children }: { children: React.ReactNode }) {
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
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
      <div 
        className="w-[1280px] h-[800px] origin-center flex-shrink-0"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "portfolio"),
          limit(50)
        );
        const querySnapshot = await getDocs(q);
        const fetchedProjects = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .sort((a: any, b: any) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
          });

        if (fetchedProjects.length > 0) {
          setProjects(fetchedProjects.slice(0, 6));
        } else {
          setProjects(PROJECTS.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching portfolio projects, using fallbacks:", error);
        setProjects(PROJECTS.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="portfolio" className="py-32 bg-bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple w-fit mb-6">
              <span className="text-sm font-semibold tracking-wide uppercase">Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Proven Enterprise Results</h2>
          </div>
        </div>

        <div className="flex flex-col gap-12 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col lg:flex-row gap-12 items-center bg-bg-card p-8 md:p-10 rounded-3xl border border-white/5 hover:border-accent-purple/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(77,163,255,0.1)]"
            >
              <div className="w-full lg:w-[60%] aspect-[4/3] xl:aspect-[16/11] rounded-2xl overflow-hidden relative shadow-2xl bg-[#0f172a] flex items-center justify-center">
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
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/5 p-4">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title || project.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-90"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-white/20 text-4xl font-bold uppercase tracking-widest">{project.category}</div>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 pointer-events-none">
                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wide uppercase">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="w-full lg:w-[40%] flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {(project.projectStatus === 'live' || !project.projectStatus) ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5 uppercase tracking-wide">
                      <Activity className="w-3.5 h-3.5" /> Live Project
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-bold border border-accent-orange/20 flex items-center gap-1.5 uppercase tracking-wide">
                      <svg className="w-3.5 h-3.5 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Under Development
                    </span>
                  )}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-accent-purple transition-colors duration-300">
                  {project.title || project.name}
                </h3>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8 line-clamp-4">
                  {project.excerpt || project.description}
                </p>

                <div className="grid sm:grid-cols-1 gap-4 mb-10 w-full">
                  {(project.metrics || []).slice(0, 3).map((metric: any, mIndex: number) => (
                    <div key={mIndex} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center border border-white/5 shrink-0">
                        {typeof metric.icon === 'string' ? (ICON_MAP[metric.icon] || <CheckCircle2 className="w-5 h-5 text-emerald-400" />) : metric.icon}
                      </div>
                      <span className="text-white font-medium">{metric.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-6 mt-auto">
                  <Link to={`/case-studies/${project.slug}`} className="inline-flex items-center gap-2 text-accent-purple font-bold text-lg hover:text-accent-purple/80 transition-colors group/link">
                    Read Full Case Study 
                    <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-bold text-sm transition-colors group/external">
                      Visit Live App
                      <ArrowUpRight className="w-4 h-4 group-hover/external:translate-x-0.5 group-hover/external:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-20">
          <Link to="/case-studies" className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-lg">
            View All Case Studies 
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
