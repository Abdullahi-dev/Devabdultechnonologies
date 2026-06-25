import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Target, Globe2, Cpu, Cloud, ShieldCheck, Activity } from "lucide-react";
import { Contact } from "../../components/Contact";

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About Us | Devabdultechnologies";
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const expertise = [
    { icon: Cpu, title: "Enterprise Software Engineering", desc: "Building scalable, secure, and high-performance applications for large organizations." },
    { icon: Activity, title: "AI and Automation Systems", desc: "Integrating intelligent agents and machine learning models to automate complex workflows." },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Designing resilient, distributed cloud architectures on AWS, GCP, and Azure." },
    { icon: ShieldCheck, title: "Fintech Platforms", desc: "Developing secure payment gateways, trading bots, and financial management systems." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">About Devabdultechnologies</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              We Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Digital Excellence</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Devabdultechnologies is a technology company specializing in enterprise software development, AI systems, and scalable digital platforms for businesses and organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn} className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-blue/10 blur-[60px] rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Our Story</h2>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between complex business challenges and innovative technological solutions, Devabdultechnologies began as a small collective of passionate software engineers in Nigeria.
                </p>
                <p>
                  Our journey started with a simple belief: that world-class engineering should be accessible to organizations of all sizes. We saw an opportunity to build more than just applications—we wanted to engineer digital infrastructure that could scale, adapt, and drive real growth.
                </p>
                <p>
                  Over the years, we have evolved into a specialized powerhouse, delivering high-impact solutions across fintech, healthcare, and government sectors. From building multi-tenant SaaS platforms to integrating advanced AI systems, our focus has always remained on technical excellence and client success.
                </p>
                <p>
                  Today, Devabdultechnologies stands as a testament to what happens when deep domain expertise meets a relentless drive for innovation. We continue to push the boundaries of what's possible, engineering the future one line of code at a time.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-purple/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <img 
                src="https://i.imgur.com/6eqCNzr.png" 
                alt="Devabdultechnologies Engineering Team" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 bg-bg-dark/80 backdrop-blur-md border border-white/10 rounded-2xl max-w-xs text-center">
                  <p className="text-3xl font-bold text-white mb-2">100+</p>
                  <p className="text-white/60 text-sm uppercase tracking-widest">Projects Delivered</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div {...fadeIn}>
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-accent-blue" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-white/60 leading-relaxed">
                To engineer innovative digital systems that empower businesses, institutions, and governments to operate efficiently in the digital age. We believe that robust software infrastructure is the foundation of modern organizational success.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-8">
                <Globe2 className="w-8 h-8 text-accent-purple" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-xl text-white/60 leading-relaxed">
                To become a globally recognized engineering company building transformative digital infrastructure. We strive to set the standard for code quality, system architecture, and technological innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Expertise</h2>
            <p className="text-xl text-white/60">We focus on deep technical domains where we can deliver exceptional value and robust engineering.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors flex gap-6"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
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
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Partner with our engineering team to transform your ideas into scalable, production-ready software.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors">
                Start a Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
