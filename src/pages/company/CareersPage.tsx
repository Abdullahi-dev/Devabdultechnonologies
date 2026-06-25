import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Briefcase, Globe2, Cpu, Users, Zap, ArrowRight } from "lucide-react";

export function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers | Devabdultechnologies";
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const benefits = [
    { icon: Globe2, title: "Remote Work Opportunities", desc: "Work from anywhere in the world with our fully distributed engineering team." },
    { icon: Cpu, title: "Cutting-Edge Technology", desc: "Build with the latest AI models, cloud infrastructure, and modern frameworks." },
    { icon: Users, title: "Collaborative Environment", desc: "Learn from and build with some of the brightest minds in software engineering." },
    { icon: Zap, title: "Continuous Learning", desc: "Dedicated time and resources for professional development and skill acquisition." }
  ];

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "AI/ML Researcher",
      department: "Artificial Intelligence",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Cloud Solutions Architect",
      department: "DevOps",
      location: "Remote",
      type: "Contract"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange mb-8">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">Careers</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-purple">Future</span> With Us
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Join a team of exceptional engineers and designers building the next generation of enterprise software and AI systems.
            </p>
            <a href="#open-positions" className="px-8 py-4 rounded-xl bg-accent-orange text-bg-dark font-bold hover:bg-accent-orange/90 transition-colors inline-block">
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Work With Us</h2>
            <p className="text-xl text-white/60">We provide an environment where top engineering talent can thrive and do their best work.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-xl text-white/60">Find your next role at Devabdultechnologies.</p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {openPositions.map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-bg-card border border-white/5 rounded-2xl p-6 md:p-8 hover:border-accent-orange/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-orange transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                    <span className="px-3 py-1 rounded-full bg-white/5">{job.department}</span>
                    <span className="flex items-center gap-1"><Globe2 className="w-4 h-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <a 
                    href={`https://wa.me/2348026275433?text=${encodeURIComponent(`Hi, I want to apply for the ${job.title} position.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2 group-hover:bg-accent-orange group-hover:text-bg-dark group-hover:border-accent-orange inline-flex"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div {...fadeIn} className="mt-12 p-8 border border-white/10 rounded-2xl bg-bg-card/50 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Don't see a perfect fit?</h3>
            <p className="text-white/60 mb-6">We're always looking for talented engineers. Send us your resume.</p>
            <a href="mailto:devabdultechnologies@gmail.com" className="inline-flex items-center font-bold text-accent-orange hover:text-white transition-colors break-all">
              devabdultechnologies@gmail.com <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
