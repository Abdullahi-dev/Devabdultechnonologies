import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  HeartPulse, Wallet, Building2, GraduationCap, Truck, Rocket, 
  ArrowRight, Layers, Shield, Brain, CheckCircle2 
} from "lucide-react";
import { Contact } from "../components/Contact";

export function SolutionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Industry Solutions | Devabdultechnologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover digital solutions built by Devabdultechnologies for healthcare, fintech, government, education, logistics, and startups.");
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const industries = [
    {
      title: "Healthcare Technology",
      icon: HeartPulse,
      desc: "Digital platforms for hospitals, clinics, telemedicine systems, and healthcare data management.",
      href: "/solutions/healthcare-technology",
      color: "text-accent-blue"
    },
    {
      title: "Fintech Platforms",
      icon: Wallet,
      desc: "Secure financial technology systems including payment platforms, trading systems, and digital banking infrastructure.",
      href: "/solutions/fintech-platforms",
      color: "text-accent-orange"
    },
    {
      title: "Government Digital Systems",
      icon: Building2,
      desc: "Secure and scalable digital infrastructure for government agencies and public services.",
      href: "/solutions/government-digital-systems",
      color: "text-accent-blue"
    },
    {
      title: "Education Platforms",
      icon: GraduationCap,
      desc: "Learning management systems, AI teaching tools, and digital education platforms.",
      href: "/solutions/education-platforms",
      color: "text-accent-purple"
    },
    {
      title: "Logistics Platforms",
      icon: Truck,
      desc: "Supply chain management systems, fleet tracking platforms, and logistics automation tools.",
      href: "/solutions/logistics-platforms",
      color: "text-accent-orange"
    },
    {
      title: "Startup MVP Development",
      icon: Rocket,
      desc: "Rapid development of minimum viable products to help startups launch faster.",
      href: "/solutions/startup-mvp-development",
      color: "text-accent-blue"
    }
  ];

  const caseStudies = [
    {
      title: "SmartBookr Booking System",
      desc: "A comprehensive booking and scheduling platform with real-time availability and payment integration.",
      result: "Increased booking efficiency by 40% and reduced no-shows by 25%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Smartbulk",
      desc: "A powerful platform designed to send bulk SMS, email, and WhatsApp messages for comprehensive communication campaigns.",
      result: "Achieved 99.9% delivery rates and scaled to millions of messages per day.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Healthcare Data Platform",
      desc: "A secure, HIPAA-compliant platform for managing electronic health records and patient data.",
      result: "Streamlined data access for 500+ medical professionals, reducing administrative time by 30%.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Capitalbot",
      desc: "A high-frequency algorithmic trading platform with real-time market data analysis and automated execution.",
      result: "Processed over $10M in daily transaction volume with sub-millisecond latency.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Subtle network grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Digital Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Modern Industries</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
                Devabdultechnologies designs and builds scalable digital platforms for industries including healthcare, fintech, government, education, logistics, and startups.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#industries" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors">
                  Explore Solutions
                </a>
                <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10">
                  Start a Project
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-full border border-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%]" />
              <div className="aspect-square rounded-full border border-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%]" />
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  <div className="bg-bg-card border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <HeartPulse className="w-8 h-8 text-accent-blue mb-4" />
                    <div className="h-2 w-1/2 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                  </div>
                  <div className="bg-bg-card border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <Wallet className="w-8 h-8 text-accent-orange mb-4" />
                    <div className="h-2 w-2/3 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="space-y-4 -translate-y-8">
                  <div className="bg-bg-card border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <Building2 className="w-8 h-8 text-accent-blue mb-4" />
                    <div className="h-2 w-3/4 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                  </div>
                  <div className="bg-bg-card border border-white/10 p-6 rounded-2xl shadow-2xl">
                    <GraduationCap className="w-8 h-8 text-accent-purple mb-4" />
                    <div className="h-2 w-1/2 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Grid */}
      <section id="industries" className="py-24 bg-bg-card border-y border-white/5 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Industry Solutions</h2>
            <p className="text-white/60 text-lg">
              We deliver tailored digital solutions designed to meet the unique challenges and regulatory requirements of your industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className={`w-7 h-7 ${industry.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{industry.title}</h3>
                <p className="text-white/60 leading-relaxed mb-8 flex-grow">{industry.desc}</p>
                <Link to={industry.href} className={`inline-flex items-center gap-2 ${industry.color} hover:opacity-80 font-semibold transition-opacity mt-auto`}>
                  Explore Solution <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Advantage Section */}
      <section className="py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Technology Advantage</h2>
            <p className="text-white/60 text-lg max-w-2xl">
              Why leading organizations choose Devabdultechnologies to build their mission-critical systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layers, title: "Scalable Architecture", desc: "Platforms built to handle millions of users and process massive amounts of data without performance degradation." },
              { icon: Shield, title: "Security-first Engineering", desc: "Industry-grade security practices, end-to-end encryption, and compliance with global data protection standards." },
              { icon: Brain, title: "AI-powered Systems", desc: "Integration of automation, predictive analytics, and intelligent decision systems to give your business a competitive edge." }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  <pillar.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-white/60 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Proven Success</h2>
            <p className="text-white/60 text-lg">
              Explore how we've helped organizations across industries achieve their digital transformation goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-bg-dark"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 relative z-20 bg-bg-dark">
                  <h3 className="text-2xl font-bold text-white mb-3">{study.title}</h3>
                  <p className="text-white/60 mb-6">{study.desc}</p>
                  
                  <div className="flex items-start gap-3 p-4 bg-accent-blue/5 border border-accent-blue/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold text-white block mb-1">Result</span>
                      <span className="text-sm text-white/80">{study.result}</span>
                    </div>
                  </div>
                </div>
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
              Let's Build a Solution for Your Industry
            </h2>
            <p className="text-xl text-bg-dark/80 mb-10">
              Partner with Devabdultechnologies to develop powerful digital platforms tailored to your specific needs.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank')}
                className="px-8 py-4 rounded-xl bg-bg-dark text-white font-bold hover:bg-black transition-colors"
              >
                Start a Project
              </button>
              <a href="https://wa.me/2348026275433" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-transparent border-2 border-bg-dark text-bg-dark font-bold hover:bg-bg-dark/10 transition-colors">
                Schedule Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
