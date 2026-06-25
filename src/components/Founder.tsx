import { motion } from "motion/react";
import { Linkedin, Twitter, Mail, Quote } from "lucide-react";

export function Founder() {
  return (
    <section id="founder" className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative z-10 group shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczOkMhS2hembttdHgiYU3gcHmmO11raF4TxYpfhdZtBG7lbhrsT9NgV5aH5YSphxIvk0oEdrX-UGe1ExhutrbMXO1ocYB9IL1lPfVOjFUpirax6CmQ=w800-h1000-p-k" 
                alt="Abdullahi Olaitan Mahmud"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Abdullahi Olaitan Mahmud</h3>
                <p className="text-accent-orange font-semibold text-lg tracking-wide uppercase">Founder & CEO</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-accent-purple/20 rounded-full blur-[60px] -z-10"></div>
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-accent-orange/10 rounded-full blur-[80px] -z-10"></div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-10 -right-10 md:-right-16 bg-bg-card border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md z-20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-orange/20 flex items-center justify-center">
                  <span className="text-accent-orange font-bold text-xl">10+</span>
                </div>
                <div>
                  <p className="text-white font-bold">Years Experience</p>
                  <p className="text-white/60 text-sm">Enterprise Architecture</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple w-fit mb-8">
              <span className="text-sm font-semibold tracking-wide uppercase">Leadership</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-10 leading-tight tracking-tight">
              Driven by Innovation, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-orange">Defined by Excellence</span>
            </h2>
            
            <div className="relative mb-12">
              <Quote className="absolute -top-6 -left-6 w-16 h-16 text-white/5 -rotate-12" />
              <p className="text-2xl text-white/90 leading-relaxed font-medium italic relative z-10">
                "At Devabdultechnologies, we don't just build software; we engineer the future. Our mission is to empower enterprises with transformative digital solutions that drive real, measurable growth."
              </p>
            </div>
            
            <div className="space-y-6 text-lg text-white/60 leading-relaxed mb-12">
              <p>
                With over a decade of experience in software architecture and enterprise solutions, Abdullahi leads a team of world-class engineers dedicated to solving complex business challenges through innovative technology.
              </p>
              <p>
                Under his leadership, the company has successfully delivered high-impact projects across fintech, healthcare, and government sectors, consistently exceeding client expectations and setting new industry standards.
              </p>
            </div>
            
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/devabdul-technologies-84a49a400?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-white hover:bg-accent-purple hover:border-accent-purple hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] group">
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://x.com/aalqutijifawy" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-white hover:bg-accent-purple hover:border-accent-purple hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] group">
                <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:devabdultechnologies@gmail.com" className="w-14 h-14 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-white hover:bg-accent-orange hover:border-accent-orange hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group">
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
