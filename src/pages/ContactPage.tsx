import { useEffect } from "react";
import { motion } from "motion/react";
import { Contact } from "../components/Contact";

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Contact Us | Devabdultechnologies";
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-purple">Incredible</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Whether you need a custom enterprise platform, an AI integration, or a scalable SaaS product, our engineering team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* We reuse the existing Contact component which has the form and info */}
      <Contact />
    </div>
  );
}
