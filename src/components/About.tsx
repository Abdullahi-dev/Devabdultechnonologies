import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="cta" className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-orange/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-bg-card to-bg-dark border border-white/10 rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-accent-orange/10 flex items-center justify-center mb-8 border border-accent-orange/20"
          >
            <Sparkles className="w-10 h-10 text-accent-orange" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight max-w-4xl relative z-10 tracking-tight"
          >
            Ready to build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-purple">next big thing?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl relative z-10 leading-relaxed"
          >
            Let's collaborate to transform your vision into a powerful, scalable reality. Our team of enterprise experts is ready to help you innovate.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 relative z-10"
          >
            <Link 
              to="/#contact"
              className="bg-accent-orange hover:bg-[#b8952b] text-white font-bold py-5 px-10 rounded-full flex items-center justify-center gap-3 transition-all text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:-translate-y-1 group"
            >
              Start Your Project 
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link 
              to="/#portfolio"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-5 px-10 rounded-full flex items-center justify-center gap-3 transition-all text-lg hover:-translate-y-1"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Decorative background elements inside the card */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[100px]"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsLCAyNTUsIDAuMDUpIi8+PC9zdmc+')] opacity-50 mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)" />
          </div>
        </div>
      </div>
    </section>
  );
}
