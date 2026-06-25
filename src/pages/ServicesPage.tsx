import { useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Code2, Brain, Globe, Smartphone, Wallet, Cloud, 
  Network, Palette, ArrowRight, CheckCircle2, 
  ChevronRight, ArrowUpRight
} from "lucide-react";
import { Contact } from "../components/Contact";

const services = [
  {
    id: "custom-software-development",
    icon: Code2,
    title: "Custom Software Development",
    shortDesc: "We design and build scalable, secure, and high-performance software solutions tailored to business needs.",
    description: "We build scalable, secure, and high-performance software platforms for enterprises and startups.",
    features: [
      "Enterprise software systems",
      "Business automation platforms",
      "SaaS applications",
      "Internal tools and dashboards",
      "API-first architectures"
    ]
  },
  {
    id: "ai-machine-learning",
    icon: Brain,
    title: "AI & Machine Learning",
    shortDesc: "Intelligent systems that automate processes, analyze data, and deliver predictive insights.",
    description: "Our AI engineers develop intelligent systems that automate processes, analyze data, and deliver predictive insights.",
    features: [
      "AI chatbots",
      "Computer vision",
      "Natural language processing",
      "Predictive analytics",
      "Automation systems"
    ]
  },
  {
    id: "web-application-development",
    icon: Globe,
    title: "Web Application Development",
    shortDesc: "Enterprise-grade web platforms, customer portals, and marketplace systems.",
    description: "We build robust, scalable web applications that deliver exceptional user experiences and drive business growth.",
    features: [
      "Enterprise web platforms",
      "Customer portals",
      "Admin dashboards",
      "Marketplace systems",
      "Progressive Web Apps (PWAs)"
    ]
  },
  {
    id: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    shortDesc: "Native and cross-platform mobile applications for iOS and Android.",
    description: "We create intuitive, high-performance mobile applications that engage users and extend your digital reach.",
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform apps (React Native, Flutter)",
      "Mobile UI/UX design",
      "App store optimization"
    ]
  },
  {
    id: "fintech-infrastructure",
    icon: Wallet,
    title: "Fintech Infrastructure",
    shortDesc: "Secure payment gateways, digital wallets, and banking APIs.",
    description: "We engineer secure, compliant, and scalable financial technology infrastructure for modern financial services.",
    features: [
      "Payment gateway integration",
      "Digital wallet systems",
      "Trading platforms",
      "Banking APIs",
      "Fraud detection systems"
    ]
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    shortDesc: "Scalable cloud infrastructure, CI/CD pipelines, and container orchestration.",
    description: "We optimize your software delivery lifecycle and ensure high availability with modern cloud and DevOps practices.",
    features: [
      "AWS infrastructure",
      "Google Cloud deployment",
      "CI/CD pipelines",
      "Docker containerization",
      "Kubernetes orchestration"
    ]
  },
  {
    id: "api-development",
    icon: Network,
    title: "API Development",
    shortDesc: "Robust REST and GraphQL APIs, third-party integrations, and microservices.",
    description: "We design and implement secure, high-performance APIs that connect your systems and enable seamless data exchange.",
    features: [
      "REST APIs",
      "GraphQL APIs",
      "Third-party integrations",
      "Microservices architecture",
      "API documentation & testing"
    ]
  },
  {
    id: "ui-ux-product-design",
    icon: Palette,
    title: "UI/UX Product Design",
    shortDesc: "User-centric product strategy, wireframing, and interactive prototyping.",
    description: "We craft intuitive, engaging, and beautiful user interfaces that solve real problems and delight users.",
    features: [
      "Product strategy",
      "UX research",
      "Wireframing",
      "Design systems",
      "Figma prototyping"
    ]
  }
];

const techStack = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "Vue.js", "Tailwind CSS"]
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Python", "Django", "FastAPI"]
  },
  {
    category: "Mobile",
    technologies: ["Flutter", "React Native", "Swift", "Kotlin"]
  },
  {
    category: "Cloud",
    technologies: ["AWS", "Google Cloud", "Azure"]
  },
  {
    category: "DevOps",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Terraform"]
  },
  {
    category: "AI",
    technologies: ["OpenAI", "TensorFlow", "PyTorch", "LangChain"]
  }
];

const processSteps = [
  { title: "Discovery", desc: "Understanding your business goals, requirements, and technical constraints." },
  { title: "Architecture", desc: "Designing scalable system architecture and selecting the right tech stack." },
  { title: "UI/UX Design", desc: "Creating intuitive user interfaces and seamless user experiences." },
  { title: "Development", desc: "Writing clean, efficient, and maintainable code using agile methodologies." },
  { title: "Testing", desc: "Rigorous QA testing, automated testing, and security audits." },
  { title: "Deployment", desc: "Smooth rollout to production environments with zero downtime." },
  { title: "Support", desc: "Ongoing maintenance, monitoring, and continuous improvement." }
];

const industries = [
  "Healthcare", "Fintech", "Government", "Education", "Logistics", "SaaS"
];

const caseStudies = [
  {
    title: "Smartbulk",
    desc: "A powerful platform designed to send bulk SMS, email, and WhatsApp messages for comprehensive communication campaigns.",
    results: "Achieved 99.9% delivery rates and scaled to millions of messages per day.",
    image: "https://picsum.photos/seed/smartbulk/600/400"
  },
  {
    title: "SmartBookr Booking System",
    desc: "A scalable enterprise booking platform handling thousands of concurrent reservations.",
    results: "Zero downtime during peak hours, 40% increase in booking conversion rate.",
    image: "https://picsum.photos/seed/booking/600/400"
  },
  {
    title: "EhmConnect Healthcare Platform",
    desc: "A secure, HIPAA-compliant telemedicine and patient management system.",
    results: "Connected 10,000+ patients with doctors, reduced administrative overhead by 60%.",
    image: "https://picsum.photos/seed/healthcare/600/400"
  },
  {
    title: "Capitalbot",
    desc: "A high-frequency algorithmic trading platform with real-time market data analysis and automated execution.",
    results: "Sub-millisecond latency, processed over $1B in transaction volume.",
    image: "https://picsum.photos/seed/trading/600/400"
  }
];

export function ServicesPage() {
  useEffect(() => {
    document.title = "Software Development Services | Devabdultechnologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Enterprise software development, AI solutions, web and mobile applications built for startups, enterprises, and government organizations.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Enterprise software development, AI solutions, web and mobile applications built for startups, enterprises, and government organizations.";
      document.head.appendChild(meta);
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 bg-bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              Enterprise Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-orange">Engineering Services</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl">
              Devabdultechnologies delivers enterprise-grade software, AI solutions, and scalable digital infrastructure for startups, enterprises, and government organizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank')}
                className="px-8 py-4 rounded-full bg-accent-orange text-white font-bold hover:bg-[#b8952b] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                Start a Project
              </button>
              <a 
                href="tel:+2348026275433"
                className="px-8 py-4 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all"
              >
                Talk to an Engineer
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-full bg-gradient-to-tr from-accent-purple/20 to-accent-orange/20 border border-white/10 flex items-center justify-center relative shadow-2xl">
              <div className="absolute inset-10 rounded-full border border-white/5 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-20 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
              <Code2 className="w-32 h-32 text-white/80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="py-24 px-6 bg-bg-card/30 border-y border-white/5 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Capabilities</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Comprehensive digital solutions engineered for scale and performance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link 
                  to={`/services/${service.id}`}
                  className="block h-full bg-bg-card border border-white/10 rounded-3xl p-8 hover:bg-accent-blue/5 hover:border-accent-blue/30 transition-all duration-300 group hover:-translate-y-2 shadow-lg hover:shadow-accent-blue/10"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-accent-blue/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-white group-hover:text-accent-blue transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">{service.shortDesc}</p>
                  <div className="mt-auto flex items-center text-accent-blue font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1440px] mx-auto space-y-32">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              <div className={idx % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white mb-8">
                  <service.icon className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wide uppercase">{service.title}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{service.title}</h2>
                <p className="text-xl text-white/70 mb-10 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-4 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-accent-orange shrink-0" />
                      <span className="text-white/80 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-all"
                >
                  Request {service.title}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className={`relative ${idx % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                <div className="aspect-[4/3] rounded-3xl bg-bg-card border border-white/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-orange/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon className="w-32 h-32 text-white/20 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 px-6 bg-bg-card/50 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technology Stack</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">We use modern, battle-tested technologies to build scalable and secure solutions.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-dark border border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">{stack.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {stack.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="px-4 py-2 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Development Process</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">A proven, agile methodology that ensures quality, transparency, and timely delivery.</p>
          </div>
          
          <div className="relative">
            {/* Horizontal Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
            
            <div className="grid md:grid-cols-7 gap-6 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-bg-dark border-2 border-white/20 flex items-center justify-center text-white font-bold mb-6 group-hover:border-accent-orange group-hover:bg-accent-orange/10 transition-colors relative z-10">
                    {idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 px-6 bg-bg-card/30 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Industries We Serve</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-bg-dark border border-white/10 rounded-2xl p-6 text-center hover:bg-white/5 hover:border-white/20 transition-all cursor-default"
              >
                <span className="text-white font-semibold">{industry}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Case Studies</h2>
              <p className="text-xl text-white/60 max-w-2xl">Real-world examples of how we've helped organizations transform their digital capabilities.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-bg-card border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent opacity-90" />
                </div>
                <div className="p-8 relative -mt-20 z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-orange transition-colors">{study.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{study.desc}</p>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <p className="text-sm font-semibold text-accent-orange mb-1 uppercase tracking-wider">Key Results</p>
                    <p className="text-white font-medium">{study.results}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-orange/20 opacity-30" />
        <div className="max-w-[1000px] mx-auto bg-bg-card border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative z-10 shadow-2xl backdrop-blur-sm">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Ready to build your next digital platform?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Partner with us to engineer scalable, secure, and innovative software solutions that drive your business forward.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/#contact" className="px-10 py-5 rounded-full bg-accent-orange text-white font-bold text-lg hover:bg-[#b8952b] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              Start a Project
            </Link>
            <Link to="/#contact" className="px-10 py-5 rounded-full bg-white/5 text-white font-bold text-lg border border-white/10 hover:bg-white/10 transition-all">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
