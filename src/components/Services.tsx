import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, BrainCircuit, Globe, Smartphone, Landmark, Palette } from "lucide-react";

const services = [
  {
    id: "custom-software-development",
    icon: Code2,
    title: "Custom Software Development",
    description: "Enterprise-grade software solutions tailored to your unique business processes and operational requirements."
  },
  {
    id: "ai-machine-learning",
    icon: BrainCircuit,
    title: "AI Solutions",
    description: "Intelligent automation, machine learning models, and predictive analytics to drive data-backed decisions."
  },
  {
    id: "web-application-development",
    icon: Globe,
    title: "Web Applications",
    description: "Scalable, high-performance web platforms built with modern frameworks for optimal user experience."
  },
  {
    id: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices."
  },
  {
    id: "fintech-infrastructure",
    icon: Landmark,
    title: "Fintech Infrastructure",
    description: "Secure payment gateways, trading platforms, and financial systems compliant with global standards."
  },
  {
    id: "ui-ux-product-design",
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centric design systems and intuitive interfaces that maximize engagement and conversion rates."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-bg-dark relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-6">
              <span className="text-sm font-semibold tracking-wide uppercase">Our Expertise</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Enterprise Services</h2>
            <p className="text-lg text-white/70 max-w-2xl">
              We engineer robust digital solutions that transform complex business challenges into scalable competitive advantages.
            </p>
          </div>
          <Link to="/services" className="hidden md:flex items-center gap-2 text-accent-purple font-bold hover:text-accent-purple/80 transition-colors">
            View all services
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-10 rounded-3xl bg-bg-card border border-white/5 hover:border-accent-purple/30 transition-all duration-500 cursor-pointer overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(77,163,255,0.1)]"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Link to={`/services/${service.id}`} className="relative z-10 block">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-accent-purple/10 group-hover:border-accent-purple/20 transition-colors duration-500">
                    <Icon className="w-8 h-8 text-white/80 group-hover:text-accent-purple group-hover:scale-110 transition-all duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-purple transition-colors duration-300">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-accent-orange transition-colors duration-300 mt-auto">
                    Learn more
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
