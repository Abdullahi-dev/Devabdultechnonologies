import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Server, Shield, Zap, Layers, Cpu, Code2, Database, 
  Cloud, Lock, CheckCircle2, ArrowRight, Terminal, 
  Workflow, Wrench, Smartphone, Brain, Network
} from "lucide-react";
import { Contact } from "../components/Contact";

export function TechnologyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Technology Stack | Devabdultechnologies";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore the modern technology stack used by Devabdultechnologies to build scalable software, AI systems, and cloud infrastructure.");
    }
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

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

  const workflowSteps = [
    { num: "01", title: "Discovery", desc: "Understanding requirements and business goals." },
    { num: "02", title: "System Architecture", desc: "Designing scalable and secure technical foundations." },
    { num: "03", title: "UI/UX Design", desc: "Creating intuitive and engaging user experiences." },
    { num: "04", title: "Development", desc: "Writing clean, efficient, and maintainable code." },
    { num: "05", title: "Testing", desc: "Comprehensive QA for reliability and performance." },
    { num: "06", title: "Deployment", desc: "Smooth rollout to production environments." },
    { num: "07", title: "Maintenance", desc: "Ongoing support, monitoring, and updates." }
  ];

  const tools = ["Figma", "GitHub", "VS Code", "Jira", "Slack", "Postman", "Docker"];

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue mb-8">
                <Cpu className="w-4 h-4" />
                <span className="text-sm font-medium">Technology Stack</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                Technology That Powers <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Scalable Digital Systems</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl">
                We leverage modern programming frameworks, cloud infrastructure, and AI technologies to build secure, scalable, and high-performance digital platforms.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/services" className="px-8 py-4 rounded-xl bg-accent-blue text-bg-dark font-bold hover:bg-[#3b8ee6] transition-colors flex items-center gap-2 group">
                  View Our Services
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10">
                  Start a Project
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 blur-3xl rounded-full" />
              <div className="relative bg-bg-card border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Animated Tech Graphic */}
                <div className="relative z-10 aspect-square flex items-center justify-center">
                  <div className="relative w-full max-w-md">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border border-dashed border-accent-blue/30 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 border border-dashed border-accent-purple/30 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-bg-dark border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(77,163,255,0.2)] z-20">
                        <Network className="w-10 h-10 text-accent-blue" />
                      </div>
                    </div>
                    
                    {/* Floating Nodes */}
                    {[Database, Cloud, Lock, Cpu].map((Icon, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -15, 0],
                          x: [0, i % 2 === 0 ? 10 : -10, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                        className={`absolute w-12 h-12 bg-bg-card border border-white/10 rounded-xl flex items-center justify-center shadow-lg
                          ${i === 0 ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                          ${i === 1 ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' : ''}
                          ${i === 2 ? 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
                          ${i === 3 ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2' : ''}
                        `}
                      >
                        <Icon className="w-5 h-5 text-white/70" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Philosophy */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Engineering Philosophy</h2>
            <p className="text-white/60 text-lg">
              We believe modern software should be scalable, secure, and maintainable. Our engineers follow industry best practices, clean architecture patterns, and automated development pipelines to ensure reliable software delivery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Layers, title: "Scalability", desc: "Our systems are built to support millions of users and large data processing." },
              { icon: Shield, title: "Security", desc: "We implement strong security standards and best practices to protect systems and users." },
              { icon: Zap, title: "Performance", desc: "Applications are optimized for speed, efficiency, and reliability." }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-dark border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
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

      {/* Technology Stack */}
      <section className="py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Technology Stack</h2>
              <p className="text-white/60 text-lg max-w-2xl">
                We utilize a comprehensive suite of modern technologies to build robust and future-proof digital solutions.
              </p>
            </div>
            <Link to="/technology/technology-stack" className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 font-semibold transition-colors">
              Explore Full Stack <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

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

      {/* Architecture & Infrastructure */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Enterprise Architecture Design</h2>
                  <p className="text-white/60 text-lg mb-8">
                    Our engineers design systems using modern architecture principles to ensure scalability, resilience, and maintainability.
                  </p>
                </div>
                <Link to="/technology/cloud-infrastructure" className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 font-semibold transition-colors shrink-0">
                  Explore Cloud Infra <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {["Microservices Architecture", "API-First Systems", "Event-Driven Architecture", "Serverless Architecture"].map((arch, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-bg-dark border border-white/5 p-4 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                    </div>
                    <span className="text-white font-medium">{arch}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square md:aspect-[4/3] bg-bg-dark border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                <div className="relative z-10 flex justify-center mb-8">
                  <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium">Client Applications</div>
                </div>
                
                <div className="relative z-10 flex justify-center gap-4 mb-8">
                  <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                  <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                  <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
                
                <div className="relative z-10 flex justify-between gap-4">
                  <div className="flex-1 p-4 bg-accent-blue/10 border border-accent-blue/20 rounded-xl text-center text-accent-blue text-sm font-medium">API Gateway</div>
                </div>
                
                <div className="relative z-10 flex justify-center gap-8 my-8">
                  <div className="w-px h-12 bg-gradient-to-b from-accent-blue/20 to-transparent" />
                  <div className="w-px h-12 bg-gradient-to-b from-accent-blue/20 to-transparent" />
                </div>
                
                <div className="relative z-10 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-white/80 text-sm">Auth Service</div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-white/80 text-sm">Data Service</div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center text-white/80 text-sm">AI Engine</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & AI Capabilities */}
      <section className="py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Security */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card border border-white/5 rounded-3xl p-10"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-7 h-7 text-accent-orange" />
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <h2 className="text-3xl font-bold text-white">Security-First Engineering</h2>
                <Link to="/technology/security-architecture" className="inline-flex items-center gap-2 text-accent-orange hover:text-accent-orange/80 font-semibold transition-colors shrink-0">
                  Explore Security <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-4">Security Features</h4>
                  <ul className="space-y-3">
                    {["End-to-end encryption", "Secure authentication", "Role-based access control", "API security", "Data protection practices"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70">
                        <Lock className="w-4 h-4 text-accent-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-4">Compliance</h4>
                  <div className="flex flex-wrap gap-2">
                    {["GDPR", "ISO security principles", "Data protection best practices"].map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-bg-dark border border-white/10 rounded-lg text-sm text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Capabilities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-bg-card border border-white/5 rounded-3xl p-10"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                <Brain className="w-7 h-7 text-accent-purple" />
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <h2 className="text-3xl font-bold text-white">Artificial Intelligence Solutions</h2>
                <Link to="/technology/ai-capabilities" className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-purple/80 font-semibold transition-colors shrink-0">
                  Explore AI <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "AI chatbots", 
                  "Predictive analytics", 
                  "Natural language processing", 
                  "Computer vision", 
                  "Automation systems", 
                  "Recommendation engines"
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-bg-dark border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-purple" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="py-24 bg-bg-card border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Development Workflow</h2>
              <p className="text-white/60 text-lg">
                Our proven methodology ensures transparent, efficient, and high-quality software delivery from concept to deployment.
              </p>
            </div>
            <Link to="/technology/development-process" className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/80 font-semibold transition-colors shrink-0">
              Explore Process <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
              {workflowSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-dark border border-white/10 rounded-2xl p-6 relative group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="text-4xl font-black text-white/5 mb-4 group-hover:text-accent-blue/20 transition-colors">
                    {step.num}
                  </div>
                  <h4 className="text-white font-bold mb-2">{step.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Tools */}
      <section className="py-32 relative">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Engineering Tools & Environment</h2>
            <p className="text-white/60">We use industry-standard tools to ensure seamless collaboration and efficient development.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-3 bg-bg-card border border-white/10 rounded-xl text-white/80 font-medium hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-white/40" />
                {tool}
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
              <Link to="/#contact" className="px-8 py-4 rounded-xl bg-transparent border border-bg-dark text-bg-dark font-bold hover:bg-bg-dark/5 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
