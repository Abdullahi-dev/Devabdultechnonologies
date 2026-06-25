import { motion } from "motion/react";
import { Database, Server, Smartphone, Globe, Cloud, Shield, Cpu, Network } from "lucide-react";

export function Architecture() {
  return (
    <section className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-6 mx-auto">
            <span className="text-sm font-semibold tracking-wide uppercase">System Design</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">Enterprise Architecture</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            We design scalable, secure, and high-performance system architectures tailored to your specific business requirements.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto h-[600px] md:h-[500px] flex items-center justify-center">
          {/* Central Hub */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute z-20 w-36 h-36 rounded-full bg-gradient-to-br from-accent-purple to-accent-purple/80 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(77,163,255,0.4)] border-4 border-bg-dark"
          >
            <Cpu className="w-12 h-12 text-white mb-2" />
            <span className="text-white font-bold text-sm tracking-widest uppercase">Core API</span>
          </motion.div>

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              d="M 500 250 L 200 100 M 500 250 L 800 100 M 500 250 L 200 400 M 500 250 L 800 400 M 500 250 L 100 250 M 500 250 L 900 250" 
              stroke="url(#line-gradient)" 
              strokeWidth="2" 
              strokeDasharray="6,6"
            />
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#4DA3FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes */}
          <div className="absolute inset-0 z-10">
            {/* Top Left */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-[10%] left-16 md:top-[15%] md:left-[20%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group -translate-x-1/2 -translate-y-1/2 shadow-lg"
            >
              <Globe className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Web App</span>
            </motion.div>

            {/* Top Right */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute top-[10%] right-16 md:top-[15%] md:right-[20%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group translate-x-1/2 -translate-y-1/2 shadow-lg"
            >
              <Smartphone className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Mobile App</span>
            </motion.div>

            {/* Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-[10%] left-16 md:bottom-[15%] md:left-[20%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group -translate-x-1/2 translate-y-1/2 shadow-lg"
            >
              <Database className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Database</span>
            </motion.div>

            {/* Bottom Right */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute bottom-[10%] right-16 md:bottom-[15%] md:right-[20%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group translate-x-1/2 translate-y-1/2 shadow-lg"
            >
              <Cloud className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Cloud Storage</span>
            </motion.div>

            {/* Far Left */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute top-1/2 -translate-y-1/2 left-16 md:left-[5%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group -translate-x-1/2 shadow-lg"
            >
              <Shield className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">Security</span>
            </motion.div>

            {/* Far Right */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="absolute top-1/2 -translate-y-1/2 right-16 md:right-[5%] w-28 h-28 rounded-2xl bg-bg-card border border-white/10 flex flex-col items-center justify-center hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 cursor-pointer group translate-x-1/2 shadow-lg"
            >
              <Network className="w-10 h-10 text-white/50 group-hover:text-accent-purple mb-3 transition-colors duration-300" />
              <span className="text-white/70 group-hover:text-white text-xs font-semibold tracking-wide uppercase transition-colors duration-300">3rd Party APIs</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
