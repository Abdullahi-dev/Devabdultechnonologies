import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Contact } from "../components/Contact";

const serviceDetails: Record<string, any> = {
  "custom-software-development": {
    title: "Custom Software Development",
    description: "We build scalable, secure, and high-performance software platforms for enterprises and startups.",
    features: [
      "Enterprise software systems",
      "Business automation platforms",
      "SaaS applications",
      "Internal tools and dashboards",
      "API-first architectures"
    ]
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    description: "Our AI engineers develop intelligent systems that automate processes, analyze data, and deliver predictive insights.",
    features: [
      "AI chatbots",
      "Computer vision",
      "Natural language processing",
      "Predictive analytics",
      "Automation systems"
    ]
  },
  "web-application-development": {
    title: "Web Application Development",
    description: "We build robust, scalable web applications that deliver exceptional user experiences and drive business growth.",
    features: [
      "Enterprise web platforms",
      "Customer portals",
      "Admin dashboards",
      "Marketplace systems",
      "Progressive Web Apps (PWAs)"
    ]
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    description: "We create intuitive, high-performance mobile applications that engage users and extend your digital reach.",
    features: [
      "iOS app development",
      "Android app development",
      "Cross-platform apps (React Native, Flutter)",
      "Mobile UI/UX design",
      "App store optimization"
    ]
  },
  "fintech-infrastructure": {
    title: "Fintech Infrastructure",
    description: "We engineer secure, compliant, and scalable financial technology infrastructure for modern financial services.",
    features: [
      "Payment gateway integration",
      "Digital wallet systems",
      "Trading platforms",
      "Banking APIs",
      "Fraud detection systems"
    ]
  },
  "cloud-devops": {
    title: "Cloud & DevOps",
    description: "We optimize your software delivery lifecycle and ensure high availability with modern cloud and DevOps practices.",
    features: [
      "AWS infrastructure",
      "Google Cloud deployment",
      "CI/CD pipelines",
      "Docker containerization",
      "Kubernetes orchestration"
    ]
  },
  "api-development": {
    title: "API Development",
    description: "We design and implement secure, high-performance APIs that connect your systems and enable seamless data exchange.",
    features: [
      "REST APIs",
      "GraphQL APIs",
      "Third-party integrations",
      "Microservices architecture",
      "API documentation & testing"
    ]
  },
  "ui-ux-product-design": {
    title: "UI/UX Product Design",
    description: "We craft intuitive, engaging, and beautiful user interfaces that solve real problems and delight users.",
    features: [
      "Product strategy",
      "UX research",
      "Wireframing",
      "Design systems",
      "Figma prototyping"
    ]
  }
};

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Devabdultechnologies`;
    }
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-accent-orange hover:underline">
            Return to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-bg-dark min-h-screen">
      <section className="py-20 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
              {service.title}
            </h1>
            <p className="text-2xl text-white/70 mb-16 leading-relaxed">
              {service.description}
            </p>
            
            <div className="bg-bg-card border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-10">Key Features & Capabilities</h3>
              <ul className="grid md:grid-cols-2 gap-6">
                {service.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-7 h-7 text-accent-orange shrink-0" />
                    <span className="text-white/90 text-xl">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
