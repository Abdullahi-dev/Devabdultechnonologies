import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Brain, ChevronRight, Bot, LineChart, MessageSquare, Eye, Cpu, Network } from "lucide-react";
import { Contact } from "../../components/Contact";

export function AICapabilities() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "AI Capabilities | Devabdultechnologies";
  }, []);

  const aiSolutions = [
    { icon: Bot, title: "AI Chatbots", desc: "Intelligent conversational agents for customer support and engagement." },
    { icon: LineChart, title: "Predictive Analytics", desc: "Data-driven forecasting to optimize business operations and strategy." },
    { icon: MessageSquare, title: "Natural Language Processing", desc: "Advanced text analysis, sentiment tracking, and automated content generation." },
    { icon: Eye, title: "Computer Vision", desc: "Image recognition, object detection, and visual data processing." },
    { icon: Cpu, title: "Automation Systems", desc: "Smart workflows that reduce manual tasks and increase efficiency." },
    { icon: Network, title: "Recommendation Engines", desc: "Personalized content and product suggestions to boost user engagement." }
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
          <span className="text-white">AI Capabilities</span>
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
              Artificial Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">Solutions</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We build intelligent systems capable of automation, prediction, and advanced data analysis to give your business a competitive edge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Solutions Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiSolutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-purple/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-7 h-7 text-accent-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-white/60 leading-relaxed">{solution.desc}</p>
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
              Ready to Integrate AI?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Partner with Devabdultechnologies to develop powerful AI-driven platforms.
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
