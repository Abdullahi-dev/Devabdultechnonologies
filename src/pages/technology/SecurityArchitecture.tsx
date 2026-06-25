import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Shield, ChevronRight, Lock, Key, Eye, FileCheck, ServerCrash } from "lucide-react";
import { Contact } from "../../components/Contact";

export function SecurityArchitecture() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Security Architecture | Devabdultechnologies";
  }, []);

  const securityFeatures = [
    { icon: Lock, title: "End-to-End Encryption", desc: "Data is encrypted both in transit and at rest using industry-standard protocols." },
    { icon: Key, title: "Secure Authentication", desc: "Multi-factor authentication (MFA) and OAuth2 integrations for robust identity verification." },
    { icon: Shield, title: "Role-Based Access Control", desc: "Granular permission systems to ensure users only access what they need." },
    { icon: Eye, title: "API Security", desc: "Rate limiting, payload validation, and secure token management to protect endpoints." },
    { icon: FileCheck, title: "Compliance Standards", desc: "Adherence to GDPR, HIPAA, and ISO security principles for data protection." },
    { icon: ServerCrash, title: "Vulnerability Management", desc: "Continuous scanning, penetration testing, and automated security patching." }
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
          <span className="text-white">Security Architecture</span>
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
              Security-First <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-purple">Engineering</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              We implement strong security standards and best practices from day one to protect your systems, data, and users against modern threats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-orange/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-accent-orange">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Secure Your Digital Assets
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Partner with Devabdultechnologies to build impenetrable software systems.
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
