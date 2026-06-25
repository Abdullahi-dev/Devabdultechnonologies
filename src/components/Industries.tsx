import { motion } from "motion/react";
import { ArrowUpRight, HeartPulse, Landmark, Building2, GraduationCap, Truck, ShoppingCart } from "lucide-react";

const industries = [
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "HIPAA-compliant platforms, telemedicine apps, and patient management systems.",
    bgClass: "from-rose-500/10 to-transparent",
    iconColor: "text-rose-400"
  },
  {
    icon: Landmark,
    title: "FinTech",
    description: "Secure trading platforms, digital wallets, and blockchain infrastructure.",
    bgClass: "from-emerald-500/10 to-transparent",
    iconColor: "text-emerald-400"
  },
  {
    icon: Building2,
    title: "Government",
    description: "Scalable public sector portals, secure data systems, and smart city tech.",
    bgClass: "from-blue-500/10 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "E-learning platforms, student management systems, and virtual classrooms.",
    bgClass: "from-amber-500/10 to-transparent",
    iconColor: "text-amber-400"
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Supply chain tracking, fleet management, and automated routing systems.",
    bgClass: "from-cyan-500/10 to-transparent",
    iconColor: "text-cyan-400"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "High-conversion marketplaces, inventory systems, and payment integrations.",
    bgClass: "from-purple-500/10 to-transparent",
    iconColor: "text-purple-400"
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple w-fit mb-6">
            <span className="text-sm font-semibold tracking-wide uppercase">Industries We Serve</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Transforming Every Sector</h2>
          <p className="text-lg text-white/70">
            We deliver the right mix of experience, creativity, and technical resources to turn your industry-specific challenges into digital opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-bg-card border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className={`w-7 h-7 ${industry.iconColor}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{industry.title}</h3>
                  <p className="text-white/60 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
