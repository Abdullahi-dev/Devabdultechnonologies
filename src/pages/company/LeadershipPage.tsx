import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Users, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Contact } from "../../components/Contact";

export function LeadershipPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Leadership | Devabdultechnologies";
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const leaders = [
    {
      name: "Abdullahi Mahmud",
      role: "Founder & Lead Engineer",
      bio: "Specializes in AI systems, enterprise platforms, and digital infrastructure. Abdullahi drives the technical vision and architectural decisions for Devabdultechnologies' most complex projects.",
      image: "https://lh3.googleusercontent.com/pw/AP1GczOkMhS2hembttdHgiYU3gcHmmO11raF4TxYpfhdZtBG7lbhrsT9NgV5aH5YSphxIvk0oEdrX-UGe1ExhutrbMXO1ocYB9IL1lPfVOjFUpirax6CmQ=w800-h1000-p-k",
      linkedin: "#"
    },
    // Add more leaders as needed
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple mb-8">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Our Leadership</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              The Minds Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">Engineering</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              Meet the strategic thinkers and technical experts guiding Devabdultechnologies' vision to build transformative digital infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Profiles */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {leaders.map((leader, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-white/20 transition-all duration-300 group flex flex-col md:flex-row shadow-2xl"
              >
                <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/5 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">{leader.name}</h3>
                    <p className="text-accent-purple font-semibold text-lg tracking-wide uppercase mb-6">{leader.role}</p>
                    <p className="text-white/60 text-lg leading-relaxed mb-10">
                      {leader.bio}
                    </p>
                    <div className="flex items-center gap-4">
                      <a href={leader.linkedin} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white text-white/60 transition-colors shadow-lg">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Team Note */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Backed by Exceptional Talent</h2>
            <p className="text-xl text-white/60 mb-10">
              Our leadership is supported by a global team of senior software engineers, AI researchers, UI/UX designers, and cloud architects dedicated to delivering excellence.
            </p>
            <Link to="/company/careers" className="inline-flex items-center font-bold text-accent-purple hover:text-white transition-colors">
              Join our engineering team <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
