import React from 'react';
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Brain, Cloud, Shield, Code, Database, Server, Zap, Globe, Cpu, Activity } from "lucide-react";
import { Contact } from "../components/Contact";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";
import { handleFirestoreError, OperationType } from "../utils/firestoreErrorHandler";
import { PROJECTS } from "../constants/projects";
import { DoerAgentsMockup } from "../components/mockups/DoerAgentsMockup";
import { SentinelShieldMockup } from "../components/mockups/SentinelShieldMockup";
import { SmartBookrMockup } from "../components/mockups/SmartBookrMockup";
import { EhmconnectMockup } from "../components/mockups/EhmconnectMockup";
import { CapitalbotMockup } from "../components/mockups/CapitalbotMockup";
import { EminentMinesMockup } from "../components/mockups/EminentMinesMockup";

function MockupWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setScale(Math.min(width / 1280, 1));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl bg-[#0f172a] flex items-center justify-center border border-white/10 group">
      <div 
        className="w-[1280px] h-[800px] origin-center flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-700"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f172a]/80 to-transparent pointer-events-none rounded-b-3xl z-50"></div>
    </div>
  );
}

export function CaseStudiesPage() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [moreProjects, setMoreProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Case Studies | Devabdultechnologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore real software projects, AI platforms, and digital systems developed by Devabdultechnologies.");
    }

    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "portfolio"),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedProjects: any[] = [];
        
        querySnapshot.docs.forEach(doc => {
          const data = doc.data();
          fetchedProjects.push({
            id: doc.id,
            title: data.title || data.name,
            desc: data.description || data.excerpt,
            image: data.image,
            features: (data.metrics || []).map((m: any) => m.text),
            tech: data.category ? data.category.split('&').map((s: string) => s.trim()) : ["React", "Cloud"],
            results: ["Improved Efficiency", "Enhanced User Experience", "Scalable Solution"],
            link: `/case-studies/${data.slug}`,
            slug: data.slug,
            projectStatus: data.projectStatus,
            liveUrl: data.liveUrl,
            timestamp: data.createdAt ? data.createdAt.toMillis() : Date.now()
          });
        });

        // Sort by timestamp descending
        fetchedProjects.sort((a, b) => b.timestamp - a.timestamp);

        if (fetchedProjects.length > 0) {
          setFeaturedProjects(fetchedProjects.slice(0, 3));
          setMoreProjects(fetchedProjects.slice(3));
        } else {
          // Fallback to original PROJECTS
          const fallbackProjects = PROJECTS.map(p => ({
            title: p.name,
            desc: p.description,
            image: p.image,
            features: p.metrics.map(m => m.text),
            tech: p.category.split('&').map(s => s.trim()),
            results: ["Production Ready", "Scalable Architecture", "Enterprise Grade"],
            link: `/case-studies/${p.slug}`,
            slug: p.slug,
            timestamp: Date.now()
          }));
          setFeaturedProjects(fallbackProjects.slice(0, 3));
          setMoreProjects(fallbackProjects.slice(3));
        }
      } catch (error) {
        console.error("Error fetching case studies, using fallbacks:", error);
        const fallbackProjects = PROJECTS.map(p => ({
          title: p.name,
          desc: p.description,
          image: p.image,
          features: p.metrics.map(m => m.text),
          tech: p.category.split('&').map(s => s.trim()),
          results: ["Production Ready", "Scalable Architecture", "Enterprise Grade"],
          link: `/case-studies/${p.slug}`,
          slug: p.slug,
          timestamp: Date.now()
        }));
        setFeaturedProjects(fallbackProjects.slice(0, 3));
        setMoreProjects(fallbackProjects.slice(3));
        handleFirestoreError(error, OperationType.LIST, "blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const capabilities = [
    {
      icon: Brain,
      title: "AI Systems",
      items: ["AI assistants", "Automation systems", "Predictive analytics", "Natural language processing"]
    },
    {
      icon: Cloud,
      title: "SaaS Platforms",
      items: ["Multi-tenant applications", "Subscription systems", "Business automation", "Scalable architecture"]
    },
    {
      icon: Server,
      title: "Enterprise Software",
      items: ["Large-scale systems", "Secure infrastructure", "API ecosystems", "Legacy modernization"]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Subtle network grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Our Portfolio</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Real Projects. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Real Results.</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
                Explore the digital platforms, AI systems, and enterprise software solutions engineered by Devabdultechnologies for startups, businesses, and organizations.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors">
                  Start a Project
                </a>
                <a href="#featured" className="px-8 py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10">
                  View Case Studies
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] bg-bg-card border border-white/10 rounded-3xl p-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5" />
                
                {/* Mockup UI Elements */}
                <div className="h-full flex flex-col gap-4 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="h-4 w-32 bg-white/5 rounded-full" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                        <div className="h-4 w-24 bg-white/10 rounded-full" />
                        <div className="h-8 w-3/4 bg-gradient-to-r from-accent-blue/20 to-transparent rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                          <div className="h-3 w-16 bg-white/10 rounded-full" />
                          <div className="h-6 w-1/2 bg-accent-purple/20 rounded-full" />
                        </div>
                        <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
                          <div className="h-3 w-16 bg-white/10 rounded-full" />
                          <div className="h-6 w-1/2 bg-accent-orange/20 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                      <div className="h-full bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                        <div className="h-4 w-20 bg-white/10 rounded-full mb-2" />
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" />
                            <div className="h-2 w-full bg-white/5 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section id="featured" className="py-24 bg-bg-card border-y border-white/5 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Featured Case Studies</h2>
            <p className="text-white/60 text-lg">
              Deep dives into our most impactful enterprise solutions and digital platforms.
            </p>
          </motion.div>

          <div className="space-y-16">
            {featuredProjects.length === 0 && !loading && (
              <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-white/80 text-xl font-medium">Please wait for other case studies for now.</p>
                <p className="text-white/50 mt-2">Admin will post more case studies soon, and they will display here.</p>
              </div>
            )}
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2">
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
                    <div className="rounded-3xl overflow-hidden border border-white/10 relative group bg-white/5 flex items-center justify-center aspect-[4/3]">
                      <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-auto max-h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-white/20 text-4xl font-bold uppercase tracking-widest">Case Study</div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
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
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-lg text-white/60 leading-relaxed">{project.desc}</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent-orange" /> Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-1.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-accent-blue" /> Technology
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-purple" /> Results
                    </h4>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/80 font-medium">
                          <ArrowRight className="w-4 h-4 text-accent-purple" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to={project.link} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                      View Case Study <ArrowRight className="w-5 h-5" />
                    </Link>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-bold transition-colors">
                        Visit Live App <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">More Projects</h2>
            <p className="text-white/60 text-lg">A selection of our recent digital solutions.</p>
          </motion.div>

          {moreProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {moreProjects.map((project, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative bg-white/5 flex items-center justify-center border-b border-white/10 overflow-hidden aspect-video">
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
                      <>
                        <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 p-2"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-white/20 text-2xl font-bold uppercase tracking-widest">Case Study</div>
                        )}
                      </>
                    )}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white">
                        {project.tech[0] || "Software"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-6 flex-grow">{project.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech: string, i: number) => (
                        <span key={i} className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <Link to={project.link} className="mt-auto flex items-center text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      View Details 
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {moreProjects.length === 0 && featuredProjects.length > 0 && !loading && (
            <div className="text-center py-12 text-white/60 text-lg">
              Please wait for other case studies for now. Admin will post more soon.
            </div>
          )}
        </div>
      </section>

      {/* Project Results / Metrics */}
      <section className="py-24 bg-accent-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "20+", label: "Software Projects Built" },
              { number: "10+", label: "Digital Platforms Launched" },
              { number: "5+", label: "Industries Served" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8"
              >
                <div className="text-5xl md:text-7xl font-black text-bg-dark mb-4 tracking-tighter">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-bg-dark/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Capabilities */}
      <section className="py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineering Capabilities</h2>
            <p className="text-white/60 text-lg">
              Our technical expertise spans across modern paradigms to build robust, future-proof systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <cap.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{cap.title}</h3>
                <ul className="space-y-4">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-bg-card border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Let's Build Your Next Digital Platform
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Partner with Devabdultechnologies to design and develop powerful software systems for your organization.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors">
                Start a Project
              </a>
              <a href="https://wa.me/2348026275433" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-transparent border-2 border-white/10 text-white font-bold hover:bg-white/5 transition-colors">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
