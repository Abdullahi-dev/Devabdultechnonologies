import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Code2, Server, Smartphone, Brain, Cloud, Terminal, ArrowRight, ChevronRight } from "lucide-react";
import { Contact } from "../../components/Contact";

export function TechnologyStack() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Technology Stack | Devabdultechnologies";
  }, []);

  const techStack = [
    {
      category: "Frontend Technologies",
      icon: Code2,
      description: "We build fast, responsive, and modern user interfaces using the latest frontend frameworks.",
      techs: ["React", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript"]
    },
    {
      category: "Backend Technologies",
      icon: Server,
      description: "Our backend architecture ensures performance, scalability, and secure data processing.",
      techs: ["Node.js", "Python", "Django", "FastAPI", "Express.js"]
    },
    {
      category: "Mobile Development",
      icon: Smartphone,
      description: "We build cross-platform and native mobile applications for iOS and Android devices.",
      techs: ["Flutter", "React Native", "Swift", "Kotlin"]
    },
    {
      category: "AI & Machine Learning",
      icon: Brain,
      description: "We build intelligent systems capable of automation, prediction, and advanced data analysis.",
      techs: ["OpenAI", "TensorFlow", "PyTorch", "LangChain", "HuggingFace"]
    },
    {
      category: "Cloud Infrastructure",
      icon: Cloud,
      description: "Our cloud architecture ensures global scalability, reliability, and high availability.",
      techs: ["Amazon Web Services (AWS)", "Google Cloud Platform", "Microsoft Azure"]
    },
    {
      category: "DevOps & Infrastructure",
      icon: Terminal,
      description: "We implement modern DevOps pipelines to automate testing, deployment, and monitoring.",
      techs: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "NGINX"]
    }
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
          <span className="text-white">Technology Stack</span>
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Technology Stack</span>
            </h1>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Explore the modern programming frameworks, cloud infrastructure, and AI technologies we use to build secure, scalable, and high-performance digital platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-card border border-white/5 rounded-3xl p-8 hover:border-accent-blue/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stack.icon className="w-7 h-7 text-accent-blue" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{stack.category}</h3>
                <p className="text-white/60 mb-8 min-h-[80px]">{stack.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-bg-dark border border-white/10 rounded-lg text-sm text-white/80 hover:border-accent-blue/50 hover:text-white transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
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
              Ready to Build Scalable Software?
            </h2>
            <p className="text-xl text-bg-dark/80 mb-10">
              Partner with Devabdultechnologies to develop powerful digital platforms.
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
