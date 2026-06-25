import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GraduationCap, ChevronRight, BookOpen, BrainCircuit, Video, Users, Award } from "lucide-react";
import { Contact } from "../../components/Contact";

export function EducationPlatforms() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Education Platforms | Devabdultechnologies";
  }, []);

  const systems = [
    { icon: BookOpen, title: "Learning Management Systems", desc: "Comprehensive platforms for course creation, student tracking, and grading." },
    { icon: BrainCircuit, title: "AI Teaching Platforms", desc: "Intelligent tutoring systems that adapt to individual student learning paces." },
    { icon: Video, title: "Online Course Platforms", desc: "Scalable video streaming and interactive content delivery for e-learning." },
    { icon: Users, title: "Student Management Systems", desc: "Administrative tools for enrollment, attendance, and student records." },
    { icon: Award, title: "Certification Portals", desc: "Secure platforms for issuing and verifying digital certificates and credentials." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 pt-8 relative z-10">
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link to="/" className="hover:text-accent-blue transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/solutions" className="hover:text-accent-blue transition-colors">Solutions</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Education Platforms</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple mb-8">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm font-medium">Education Solutions</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">Learning Platforms</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We build learning management systems, AI teaching tools, and digital education platforms to transform the way people learn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-purple/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <system.icon className="w-7 h-7 text-accent-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{system.title}</h3>
                <p className="text-white/60 leading-relaxed">{system.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-accent-purple">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Partner with Devabdultechnologies to build innovative learning platforms.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-bg-dark text-white font-bold hover:bg-black transition-colors">
                Start a Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
