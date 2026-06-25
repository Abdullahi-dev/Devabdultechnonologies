import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    label: "Discovery",
    title: "Consultation & Vision",
    description: "We analyze your enterprise requirements, technical constraints, and strategic business objectives."
  },
  {
    number: "02",
    label: "Planning",
    title: "Architecture & Scope",
    description: "Our architects design scalable system blueprints and define clear project milestones."
  },
  {
    number: "03",
    label: "Design",
    title: "UI/UX Prototyping",
    description: "We create intuitive, user-centric interfaces backed by comprehensive user journey mapping."
  },
  {
    number: "04",
    label: "Engineering",
    title: "Agile Development",
    description: "Iterative sprints deliver robust, secure code integrated with your existing infrastructure."
  },
  {
    number: "05",
    label: "Validation",
    title: "QA & Security Testing",
    description: "Rigorous automated and manual testing ensures enterprise-grade reliability and compliance."
  },
  {
    number: "06",
    label: "Launch",
    title: "Deployment & Scale",
    description: "Seamless production deployment followed by continuous monitoring and optimization."
  }
];

export function WorkProcess() {
  return (
    <section className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-6">
            <span className="text-sm font-semibold tracking-wide uppercase">Methodology</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">Enterprise Delivery Process</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center group-hover:border-accent-purple/50 group-hover:bg-accent-purple/10 transition-all duration-500 z-10 relative">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 group-hover:from-accent-purple group-hover:to-accent-orange transition-all duration-500">
                      {step.number}
                    </span>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-accent-purple/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="flex-1">
                  <span className="text-accent-purple text-sm font-bold tracking-widest uppercase mb-1 block">
                    {step.label}
                  </span>
                  <div className="h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 pr-4 group-hover:text-accent-purple transition-colors duration-300">{step.title}</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
