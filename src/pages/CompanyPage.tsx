import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, Target, Award, Globe2, Briefcase } from "lucide-react";
import { Contact } from "../components/Contact";

export function CompanyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Company | Devabdultechnologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Devabdultechnologies is a technology company specializing in enterprise software development, AI systems, and scalable digital platforms.");
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const stats = [
    { value: "20+", label: "Projects Delivered" },
    { value: "10+", label: "Digital Platforms Built" },
    { value: "5+", label: "Industries Served" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  return (
    <div className="pt-24 min-h-screen bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">Our Company</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Engineering Digital Innovation for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Future</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
              We are a premier technology company specializing in enterprise software development, AI systems, and scalable digital platforms for businesses and organizations worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/company/about" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-accent-blue/90 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-bg-card relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-wider font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              {...fadeIn}
              className="bg-bg-card border border-white/5 rounded-3xl p-10 hover:border-accent-blue/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-8">
                <Target className="w-8 h-8 text-accent-blue" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-white/60 leading-relaxed">
                To engineer innovative digital systems that empower businesses, institutions, and governments to operate efficiently in the digital age. We build technology that solves real-world problems.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-bg-card border border-white/5 rounded-3xl p-10 hover:border-accent-purple/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-8">
                <Globe2 className="w-8 h-8 text-accent-purple" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-xl text-white/60 leading-relaxed">
                To become a globally recognized engineering company building transformative digital infrastructure. We aim to be the trusted partner for organizations navigating complex digital transformations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 bg-bg-card border-t border-white/5 relative z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Discover Devabdultechnologies</h2>
            <p className="text-xl text-white/60">Learn more about our team, our culture, and our latest updates.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/company/leadership" className="group block bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
              <Users className="w-10 h-10 text-accent-blue mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">Leadership</h3>
              <p className="text-white/60 mb-8">Meet the engineering minds and strategic thinkers guiding our company's vision and execution.</p>
              <div className="flex items-center text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                Meet the Team <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/company/careers" className="group block bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
              <Briefcase className="w-10 h-10 text-accent-purple mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors">Careers</h3>
              <p className="text-white/60 mb-8">Join our team of exceptional engineers and designers building the future of digital infrastructure.</p>
              <div className="flex items-center text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                View Openings <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link to="/company/press" className="group block bg-bg-dark border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
              <Award className="w-10 h-10 text-accent-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-orange transition-colors">Press & News</h3>
              <p className="text-white/60 mb-8">Read our latest announcements, product launches, and media coverage from around the industry.</p>
              <div className="flex items-center text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                Read News <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
