import { motion } from "motion/react";
import { Server, LayoutTemplate, Cloud, Bot, Shield } from "lucide-react";

const techCategories = [
  {
    category: "Frontend & Mobile",
    icon: <LayoutTemplate className="w-6 h-6 text-accent-purple" />,
    techs: ["React", "Next.js", "Vue.js", "React Native", "Flutter", "Swift", "Kotlin"]
  },
  {
    category: "Backend & API",
    icon: <Server className="w-6 h-6 text-accent-orange" />,
    techs: ["Node.js", "Python", "Go", "Java Spring", "GraphQL", "REST", "gRPC"]
  },
  {
    category: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6 text-emerald-400" />,
    techs: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]
  },
  {
    category: "Data & AI",
    icon: <Bot className="w-6 h-6 text-blue-400" />,
    techs: ["TensorFlow", "PyTorch", "OpenAI", "PostgreSQL", "MongoDB", "Redis", "Kafka"]
  },
  {
    category: "Security & Blockchain",
    icon: <Shield className="w-6 h-6 text-rose-400" />,
    techs: ["OAuth 2.0", "JWT", "Solidity", "Web3.js", "Zero Trust", "End-to-End Encryption"]
  }
];

export function Technologies() {
  return (
    <section id="technologies" className="py-32 bg-bg-dark relative overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 pointer-events-none" />
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-20 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple w-fit mb-6">
            <span className="text-sm font-semibold tracking-wide uppercase">Technology Stack</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
            Enterprise-Grade <br/> Infrastructure
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            We leverage cutting-edge technologies to architect scalable, secure, and high-performance solutions. Our engineering teams are experts in modern frameworks and cloud-native infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-card rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech, tIndex) => (
                  <span 
                    key={tIndex}
                    className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
