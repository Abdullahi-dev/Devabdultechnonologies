import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Workflow, ChevronRight, Search, PenTool, Code, TestTube, Rocket, Wrench } from "lucide-react";
import { Contact } from "../../components/Contact";

export function DevelopmentProcess() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Development Process | Devabdultechnologies";
  }, []);

  const processSteps = [
    { icon: Search, title: "Discovery & Planning", desc: "We start by understanding your business goals, target audience, and technical requirements to define a clear roadmap." },
    { icon: PenTool, title: "UI/UX Design", desc: "Our design team crafts intuitive, user-centric interfaces and interactive prototypes to visualize the final product." },
    { icon: Code, title: "Agile Development", desc: "We build your software in iterative sprints, ensuring transparency, flexibility, and continuous feedback." },
    { icon: TestTube, title: "QA & Testing", desc: "Rigorous automated and manual testing guarantees performance, security, and a bug-free user experience." },
    { icon: Rocket, title: "Deployment", desc: "Seamless rollout to production environments using modern CI/CD pipelines for zero-downtime releases." },
    { icon: Wrench, title: "Maintenance & Support", desc: "Ongoing monitoring, updates, and optimization to ensure your software scales and performs flawlessly." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 pt-8 relative z-10">
        <nav className="flex items-center gap-2 text-sm text-white/50">
          <Link to="/" className="hover:text-accent-blue transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/technology" className="hover:text-accent-blue transition-colors">Technology</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Development Process</span>
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
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Our Agile <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Development Process</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We follow a structured, transparent, and iterative approach to deliver high-quality software solutions on time and within budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-blue/30 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-6xl font-black text-white/[0.03] select-none pointer-events-none">
                  0{idx + 1}
                </div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <step.icon className="w-7 h-7 text-accent-blue" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                <p className="text-white/60 leading-relaxed relative z-10">{step.desc}</p>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Partner with Devabdultechnologies to turn your vision into reality.
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
