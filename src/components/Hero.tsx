import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Activity, Database, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[850px] flex items-center pt-20 overflow-hidden bg-bg-dark">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Enterprise Solutions</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight text-white">
              Engineering the <br className="hidden md:block" />
              Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-orange">Digital Innovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed font-medium">
              We build enterprise software, AI systems, fintech platforms, and scalable digital infrastructure for businesses and governments.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <button 
                onClick={() => window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank')}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-purple text-white font-bold hover:bg-accent-purple/90 transition-all text-lg shadow-[0_0_30px_rgba(77,163,255,0.3)]"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <a 
                href="tel:+2348026275433"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-lg"
              >
                Talk to an Engineer
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Tech Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[600px] w-full perspective-1000"
          >
            {/* 3D Floating Dashboard Elements */}
            <div className="absolute inset-0 transform-style-3d rotate-y-[-10deg] rotate-x-[5deg]">
              
              {/* Main Dashboard Panel */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-[450px] h-[300px] bg-bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-accent-purple" />
                    <span className="text-white font-semibold">System Analytics</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                </div>
                
                {/* Animated Chart */}
                <div className="flex items-end gap-2 h-[150px] mt-4">
                  {[40, 70, 45, 90, 65, 100, 80, 120, 95, 110].map((height, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(height / 120) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="flex-1 bg-gradient-to-t from-accent-purple/20 to-accent-purple rounded-t-sm"
                    />
                  ))}
                </div>
              </motion.div>

              {/* AI Data Card */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 w-[280px] bg-bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 z-20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center">
                    <Database className="w-6 h-6 text-accent-orange" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">AI Model Processing</h4>
                    <p className="text-white/50 text-xs">Real-time data stream</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-accent-orange"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Processing...</span>
                    <span className="text-accent-orange font-mono">98.4%</span>
                  </div>
                </div>
              </motion.div>

              {/* Security Node */}
              <motion.div 
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-40 -left-10 w-[220px] bg-bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5 z-10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold text-sm">Security Node Active</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Zero-trust architecture</span>
                </div>
              </motion.div>

              {/* Connecting Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-30" style={{ filter: 'drop-shadow(0 0 8px rgba(77,163,255,0.5))' }}>
                <motion.path 
                  d="M 100,250 C 200,250 250,150 350,150" 
                  fill="none" 
                  stroke="#4DA3FF" 
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, -50] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 150,450 C 250,450 300,300 400,300" 
                  fill="none" 
                  stroke="#D4AF37" 
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, 50] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
