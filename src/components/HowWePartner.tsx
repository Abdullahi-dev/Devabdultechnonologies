import { motion } from "motion/react";
import { ArrowUpRight, Users, Briefcase, Target } from "lucide-react";

const partners = [
  {
    icon: Users,
    title: "Staff Augmentation",
    description: "Seamlessly integrate our elite developers into your existing teams. We adapt to your workflows and culture to accelerate your development velocity.",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10"
  },
  {
    icon: Briefcase,
    title: "Dedicated Agile Teams",
    description: "Deploy fully managed, cross-functional Agile teams. We provide end-to-end product development with guaranteed scalability and rapid iteration cycles.",
    color: "text-accent-orange",
    bg: "bg-accent-orange/10"
  },
  {
    icon: Target,
    title: "Outcome-Based Delivery",
    description: "Partner with us for fixed-scope, milestone-driven projects. We take full ownership of delivery, ensuring your strategic objectives are met on time and budget.",
    color: "text-white",
    bg: "bg-white/10"
  }
];

export function HowWePartner() {
  return (
    <section className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-accent-purple/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-6 mx-auto">
            <span className="text-sm font-semibold tracking-wide uppercase">Engagement Models</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">How We Partner</h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Flexible, enterprise-grade collaboration models designed to integrate seamlessly with your organization and accelerate your digital initiatives.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-bg-card border border-white/5 hover:border-white/20 rounded-3xl p-10 relative group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-10 right-10 text-white/20 group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
                
                <div className={`w-16 h-16 rounded-2xl ${partner.bg} flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-8 h-8 ${partner.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-purple transition-colors duration-300">{partner.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg relative z-10">
                  {partner.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
