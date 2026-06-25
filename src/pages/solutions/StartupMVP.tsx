import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Rocket, ChevronRight, Target, PenTool, Code, HeadphonesIcon, Zap } from "lucide-react";
import { Contact } from "../../components/Contact";

export function StartupMVP() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Startup MVP Development | Devabdultechnologies";
  }, []);

  const services = [
    { icon: Target, title: "Product Strategy", desc: "Defining core features, target audience, and go-to-market strategy for your MVP." },
    { icon: PenTool, title: "UI/UX Design", desc: "Creating intuitive and engaging user interfaces that validate your product concept." },
    { icon: Code, title: "MVP Development", desc: "Rapid, agile development of your core product features to get to market quickly." },
    { icon: Zap, title: "Scalable Architecture", desc: "Building a foundation that can grow with your user base and future feature additions." },
    { icon: HeadphonesIcon, title: "Startup Technical Support", desc: "Ongoing technical guidance, maintenance, and iteration based on user feedback." }
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
          <span className="text-white">Startup MVP Development</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Startup Solutions</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Launch Faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">MVP Development</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We provide rapid development of minimum viable products to help startups validate ideas, attract investors, and launch faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-blue/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-accent-blue" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-accent-blue">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-bg-dark mb-6 tracking-tight">
              Ready to Build Your MVP?
            </h2>
            <p className="text-xl text-bg-dark/80 mb-10">
              Partner with Devabdultechnologies to turn your startup vision into a reality.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/#contact" className="px-8 py-4 rounded-xl bg-bg-dark text-white font-bold hover:bg-black transition-colors">
                Start Your MVP
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
