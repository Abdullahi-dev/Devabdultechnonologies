import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FileText, Edit3, CheckCircle, TrendingUp, Plus, Clock, Database, XCircle } from "lucide-react";
import { collection, query, getDocs, where, doc, setDoc, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { handleFirestoreError, OperationType } from "../../../utils/firestoreErrorHandler";

const FALLBACK_ARTICLES = [
  {
    id: "fallback-1",
    title: "The Future of AI in Enterprise Software Development",
    category: "Artificial Intelligence",
    slug: "the-future-of-ai-in-enterprise-software-development",
    excerpt: "Explore how generative AI is reshaping the landscape of custom software development and what it means for enterprise architecture.",
    content: `<h2>Introduction to the Next Era of Artificial Intelligence</h2>
<p>Artificial Intelligence (AI) has dramatically transitioned from a theoretical concept to a foundational pillar of modern enterprise technology. As we look toward the future of AI, the conversation is no longer about whether machines can learn, but rather how rapidly they will evolve and how profoundly they will disrupt existing business models. The future of AI promises unprecedented advancements in efficiency, decision-making, and innovation across every sector. Navigating this landscape requires a deep understanding of emerging trends, ethical challenges, and the strategic foresight to integrate these technologies effectively.</p>

<h3>Key Trends Shaping the Future of AI</h3>
<p>The trajectory of artificial intelligence is being guided by several critical trends that are pushing the boundaries of what is computationally possible. These trends are not operating in silos; rather, they are converging to create highly sophisticated, autonomous systems.</p>

<h4>The Evolution of Generative AI</h4>
<p>Generative AI models, such as large language models (LLMs) and diffusion models, have already demonstrated remarkable capabilities in creating text, images, and code. The future will see these models become even more multimodal, capable of seamlessly processing and generating combinations of text, audio, video, and 3D environments. This evolution will transform creative industries, software development, and personalized education, moving from simple assistance to collaborative co-creation.</p>

<h4>AI at the Edge</h4>
<p>As the Internet of Things (IoT) expands, the need for real-time processing without the latency of cloud computing is driving the growth of Edge AI. By processing data locally on devices—from autonomous vehicles to smart manufacturing sensors—Edge AI reduces bandwidth usage, enhances privacy, and enables immediate decision-making. This trend is crucial for applications where milliseconds matter.</p>

<h4>Explainable AI (XAI)</h4>
<p>As AI systems take on more critical roles in healthcare, finance, and criminal justice, the "black box" nature of deep learning models becomes a significant liability. The push for Explainable AI (XAI) aims to make AI decision-making processes transparent and understandable to humans. This is not just a technical requirement but a regulatory and ethical imperative to ensure trust and accountability.</p>

<h3>The Impact on Enterprise Architecture</h3>
<p>Integrating advanced AI into enterprise systems requires a fundamental rethinking of IT architecture. Traditional monolithic systems are giving way to agile, data-centric architectures designed to support continuous learning and deployment of AI models.</p>

<ul>
<li><strong>Data Infrastructure:</strong> The lifeblood of AI is data. Enterprises must invest in robust data pipelines, data lakes, and real-time streaming platforms to ensure high-quality, accessible data for model training and inference.</li>
<li><strong>MLOps Integration:</strong> Machine Learning Operations (MLOps) will become as standard as DevOps. Establishing rigorous practices for model versioning, testing, deployment, and monitoring is essential to manage the lifecycle of AI applications in production.</li>
<li><strong>Security and Privacy:</strong> AI introduces new attack vectors, such as adversarial attacks and data poisoning. Enterprise architecture must incorporate advanced security protocols and privacy-preserving techniques, like federated learning and differential privacy, from the ground up.</li>
</ul>

<h3>Conclusion</h3>
<p>The next era of artificial intelligence is not just a technological upgrade; it is a paradigm shift that will redefine how businesses operate and compete. By understanding the key trends, investing in the right architecture, and prioritizing ethical considerations, organizations can harness the transformative power of AI to drive unprecedented growth and innovation.</p>`,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    status: "published",
    author: "Devabdultechnologies Team"
  },
  {
    id: "fallback-2",
    title: "Building Scalable Microservices Architecture for Fintech",
    category: "Engineering Insights",
    slug: "building-scalable-microservices-architecture-for-fintech",
    excerpt: "A deep dive into the patterns and practices we use to build highly available, fault-tolerant financial systems.",
    content: "<h2>Building Scalable Microservices Architecture for Fintech</h2><p>In the fast-paced world of financial technology (Fintech), the ability to scale rapidly, deploy updates seamlessly, and maintain absolute system reliability is not just an advantage—it's a necessity. Traditional monolithic architectures often struggle to meet these demands, leading to bottlenecks, slow release cycles, and increased risk of system-wide failures. Enter microservices architecture: a paradigm that breaks down complex applications into smaller, independent, and loosely coupled services.</p><h3>Why Microservices for Fintech?</h3><p>Fintech applications handle sensitive data, process high volumes of transactions, and must comply with stringent regulatory requirements. Microservices offer several compelling benefits tailored to these challenges:</p><ul><li><strong>Independent Scalability:</strong> Different parts of a financial application have varying load profiles. For instance, a payment processing service might experience massive spikes during Black Friday, while the user profile service remains relatively stable. Microservices allow you to scale only the services that need it, optimizing resource utilization and costs.</li><li><strong>Fault Isolation:</strong> In a monolith, a memory leak or crash in one module can bring down the entire system. With microservices, a failure in the reporting service won't prevent users from executing trades or transferring funds. This fault isolation is critical for maintaining the high availability expected in finance.</li><li><strong>Technology Agnosticism:</strong> Different problems require different tools. A fraud detection service might be best written in Python using machine learning libraries, while a high-throughput transaction engine might be built with Go or Rust. Microservices allow teams to choose the best technology stack for each specific task.</li><li><strong>Accelerated Delivery:</strong> Smaller, focused teams can own individual microservices, developing, testing, and deploying them independently. This reduces dependencies and significantly speeds up the time-to-market for new features.</li></ul><h3>Core Architectural Patterns</h3><p>Building a robust microservices architecture requires careful planning and the adoption of proven patterns.</p><h4>1. The API Gateway</h4><p>An API Gateway acts as the single entry point for all client requests. Instead of clients communicating directly with dozens of individual microservices, they send requests to the gateway, which routes them to the appropriate service. In Fintech, the API Gateway is crucial for:</p><ul><li><strong>Authentication and Authorization:</strong> Centralizing security checks before requests reach backend services.</li><li><strong>Rate Limiting:</strong> Protecting services from abuse and ensuring fair usage.</li><li><strong>Protocol Translation:</strong> Converting external REST or GraphQL requests into internal gRPC calls.</li></ul><h4>2. Event-Driven Architecture (EDA)</h4><p>Synchronous communication (like HTTP REST) between microservices can lead to tight coupling and cascading failures. Event-Driven Architecture (EDA) uses asynchronous messaging (via message brokers like Apache Kafka or RabbitMQ) to decouple services.</p><p>For example, when a user initiates a fund transfer, the 'Transfer Service' publishes a 'TransferRequested' event. The 'Fraud Detection Service' and 'Ledger Service' independently consume this event and process it asynchronously. This improves responsiveness and resilience.</p><h4>3. The Saga Pattern for Distributed Transactions</h4><p>In a monolith, maintaining data consistency across multiple tables is easy using ACID transactions. In a microservices environment, a single business operation (like processing a loan application) might span multiple services, each with its own database. Traditional distributed transactions (like Two-Phase Commit) are often too slow and complex.</p><p>The Saga pattern solves this by breaking the distributed transaction into a sequence of local transactions. Each service updates its database and publishes an event to trigger the next step. If a step fails, the Saga executes compensating transactions to undo the previous steps, ensuring eventual consistency.</p><h3>Security and Compliance Considerations</h3><p>Security is paramount in Fintech. A microservices architecture expands the attack surface, requiring a \"zero-trust\" approach.</p><ul><li><strong>Mutual TLS (mTLS):</strong> Encrypt all communication between microservices to prevent eavesdropping and man-in-the-middle attacks.</li><li><strong>Centralized Logging and Auditing:</strong> Aggregate logs from all services into a centralized system (like ELK stack or Splunk) to monitor system health, detect anomalies, and maintain compliance trails.</li><li><strong>Data Privacy:</strong> Implement strict data access controls and ensure sensitive data (like PII) is encrypted both at rest and in transit.</li></ul><h3>Conclusion</h3><p>Transitioning to a microservices architecture is a significant undertaking, requiring organizational alignment, robust DevOps practices, and a deep understanding of distributed systems. However, for Fintech companies aiming to build scalable, resilient, and agile platforms, the benefits far outweigh the complexities. By embracing these patterns and prioritizing security, organizations can build the foundation for the next generation of financial services.</p>",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    status: "published",
    author: "Devabdultechnologies Team"
  },
  {
    id: "fallback-3",
    title: "UX Design Principles for Complex B2B SaaS Platforms",
    category: "Technology Guides",
    slug: "ux-design-principles-for-complex-b2b-saas-platforms",
    excerpt: "Learn how to simplify complex workflows and create intuitive user experiences for enterprise-grade applications.",
    content: "<h2>UX Design Principles for Complex B2B SaaS Platforms</h2><p>Designing user experiences (UX) for Business-to-Business (B2B) Software as a Service (SaaS) platforms presents unique challenges. Unlike consumer apps, which often prioritize engagement and delight, B2B platforms are tools for work. They deal with dense data, intricate workflows, and diverse user roles. The primary goal is to empower users to be efficient, accurate, and productive. This article outlines key principles for creating effective and intuitive UX for complex enterprise applications.</p><h3>Understanding the B2B User</h3><p>B2B users are typically professionals using the software to accomplish specific tasks efficiently. They value productivity, accuracy, and clarity over flashy aesthetics. Understanding their workflows, pain points, and goals is the foundation of good B2B UX design. They are often \"power users\" who spend hours in the application daily, making efficiency paramount.</p><h3>Key Design Principles</h3><h4>1. Prioritize Clarity and Information Hierarchy</h4><p>Complex platforms often display vast amounts of information. Effective UX relies on a clear information hierarchy to prevent cognitive overload.</p><ul><li><strong>Progressive Disclosure:</strong> Don't show everything at once. Reveal advanced features or detailed data only when the user requests it or when it becomes relevant to their current task.</li><li><strong>Visual Hierarchy:</strong> Use typography (size, weight), color, and spacing strategically to guide the user's eye to the most critical data and primary actions. Avoid clutter and ensure the interface is easy to scan.</li><li><strong>Data Visualization:</strong> Transform dense tables of numbers into clear, actionable charts and graphs. Allow users to easily filter and drill down into the data.</li></ul><h4>2. Simplify Complex Workflows</h4><p>B2B tasks often involve multiple steps and dependencies. The UX should guide users through these processes seamlessly.</p><ul><li><strong>Wizards and Steppers:</strong> Break down complex configurations or multi-step processes into manageable, logical steps. Show progress indicators so users know where they are.</li><li><strong>Contextual Help:</strong> Provide inline help, tooltips, and links to documentation exactly where users might need them, reducing the need to leave the workflow to find answers.</li><li><strong>Clear Error Handling:</strong> When errors occur, provide clear, actionable messages explaining what went wrong and how to fix it, rather than generic error codes.</li></ul><h4>3. Design for Efficiency and Speed</h4><p>For users who spend hours in a platform, small inefficiencies compound quickly.</p><ul><li><strong>Keyboard Shortcuts:</strong> Implement comprehensive keyboard shortcuts for common actions to allow power users to navigate and act quickly without relying on the mouse.</li><li><strong>Bulk Actions:</strong> Allow users to select multiple items (e.g., users, invoices, tickets) and apply actions simultaneously (e.g., delete, approve, export).</li><li><strong>Smart Defaults and Templates:</strong> Pre-fill forms with the most likely values and offer templates for common tasks to save time and reduce repetitive data entry.</li></ul><h4>4. Design for Different User Roles</h4><p>B2B platforms often serve multiple user types (e.g., administrators, managers, end-users), each with different needs and permissions.</p><ul><li><strong>Role-Based Interfaces:</strong> Design interfaces that surface the most relevant tools and information for each specific user type. An administrator needs different dashboards and controls than a standard user.</li><li><strong>Customization:</strong> Allow users to customize their workspaces, such as rearranging dashboard widgets or saving custom data filters, to suit their specific workflows.</li></ul><h3>Conclusion</h3><p>Designing UX for complex B2B SaaS platforms requires a deep understanding of user needs and a commitment to clarity, simplicity, and efficiency. By applying these principles, designers can create enterprise applications that are not only powerful but also intuitive, reducing training time and increasing user satisfaction and productivity.</p>",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
    status: "published",
    author: "Devabdultechnologies Team"
  }
];

const CASE_STUDIES = [
  {
    id: "cs-1",
    title: "SmartBookr Booking Platform",
    category: "Case Studies",
    slug: "smartbookr",
    excerpt: "A multi-business booking system designed for African service providers including clinics, salons, and consultants.",
    content: `<h2>SmartBookr Booking Platform</h2>
<h3>The Challenge</h3>
<p>Service providers across Africa, from healthcare clinics to beauty salons, often struggle with inefficient booking processes, leading to missed appointments, double bookings, and lost revenue. Existing solutions were often too complex, expensive, or not tailored to the specific needs and communication habits of the local market, where WhatsApp is the primary mode of interaction.</p>

<h3>The Solution</h3>
<p>Devabdultechnologies developed SmartBookr, a comprehensive, multi-tenant SaaS booking platform. The system was designed with a mobile-first approach, ensuring accessibility for both business owners and their clients. Key features included:</p>
<ul>
<li><strong>Intuitive Dashboard:</strong> A centralized hub for business owners to manage appointments, staff schedules, and customer data.</li>
<li><strong>WhatsApp Integration:</strong> Automated appointment confirmations, reminders, and rescheduling options delivered directly via WhatsApp, significantly reducing no-show rates.</li>
<li><strong>Flexible Scheduling:</strong> Support for various service types, durations, and staff availability, accommodating diverse business models.</li>
<li><strong>Integrated Payments:</strong> Secure online payment gateways to facilitate deposits and full payments at the time of booking.</li>
</ul>

<h3>The Results</h3>
<p>SmartBookr transformed the operations of numerous service providers. Businesses reported a 40% reduction in no-shows thanks to the WhatsApp reminders. The automated scheduling freed up significant administrative time, allowing staff to focus on service delivery. The platform's scalability enabled businesses to easily add new services and staff members as they grew, resulting in a 25% average increase in monthly bookings within the first six months of adoption.</p>`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    status: "published",
    author: "Devabdultechnologies Team"
  },
  {
    id: "cs-2",
    title: "Smartbulk",
    category: "Case Studies",
    slug: "smartbulk",
    excerpt: "A powerful platform designed to send bulk SMS, email, and WhatsApp messages for comprehensive communication campaigns.",
    content: `<h2>Smartbulk</h2>
<h3>The Challenge</h3>
<p>Organizations frequently need to execute large-scale communication campaigns across multiple channels (SMS, Email, WhatsApp) to reach their audience effectively. Managing these campaigns through disparate systems was time-consuming, prone to errors, and made it difficult to track overall engagement and ROI.</p>

<h3>The Solution</h3>
<p>We engineered Smartbulk, a unified omnichannel communication platform. The system provides a single interface for creating, scheduling, and analyzing campaigns across SMS, Email, and WhatsApp. Key technical implementations included:</p>
<ul>
<li><strong>High-Throughput Message Routing:</strong> A robust backend architecture capable of processing and delivering millions of messages concurrently with minimal latency.</li>
<li><strong>Dynamic Personalization:</strong> Tools to easily insert dynamic variables (names, dates, custom fields) into message templates for highly personalized communication.</li>
<li><strong>Comprehensive Analytics:</strong> Real-time dashboards tracking delivery rates, open rates, click-through rates, and bounce rates across all channels.</li>
<li><strong>API Integration:</strong> Seamless integration with existing CRM and ERP systems to automate message triggering based on customer actions or events.</li>
</ul>

<h3>The Results</h3>
<p>Smartbulk empowered organizations to streamline their communication strategies. Clients experienced a 30% increase in campaign engagement due to the ability to coordinate messaging across preferred channels. The unified analytics provided actionable insights, allowing marketers to optimize their campaigns in real-time. The platform's reliability and scalability ensured that critical communications, such as emergency alerts or time-sensitive promotions, were delivered promptly and successfully.</p>`,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    status: "published",
    author: "Devabdultechnologies Team"
  },
  {
    id: "cs-3",
    title: "EhmConnect Healthcare Platform",
    category: "Case Studies",
    slug: "ehmconnect-healthcare",
    excerpt: "A healthcare system designed to connect patients with modern and traditional medicine services.",
    content: `<h2>EhmConnect Healthcare Platform</h2>
<h3>The Challenge</h3>
<p>Accessing healthcare services, particularly integrating traditional and modern medical practices, presented a significant challenge for many patients. The lack of a centralized platform made it difficult to find qualified practitioners, schedule appointments, and securely manage health records across different care providers.</p>

<h3>The Solution</h3>
<p>Devabdultechnologies partnered with healthcare stakeholders to build EhmConnect, a secure, integrated healthcare platform. The solution bridged the gap between patients and diverse medical practitioners. Core features included:</p>
<ul>
<li><strong>Unified Practitioner Directory:</strong> A searchable database of verified modern and traditional medicine practitioners, complete with profiles, specialties, and patient reviews.</li>
<li><strong>Telemedicine Capabilities:</strong> Secure video consultation features integrated directly into the platform, expanding access to care for remote patients.</li>
<li><strong>Electronic Health Records (EHR):</strong> A secure, patient-centric EHR system allowing users to store, manage, and share their medical history with authorized providers.</li>
<li><strong>Secure Communication:</strong> Encrypted messaging channels for secure communication between patients and practitioners.</li>
</ul>

<h3>The Results</h3>
<p>EhmConnect significantly improved healthcare accessibility and coordination. The platform facilitated thousands of successful consultations within its first year. Patients reported higher satisfaction due to the convenience of telemedicine and the ability to easily manage their health records. Practitioners benefited from a streamlined appointment system and secure access to patient history, leading to more informed and effective care delivery.</p>`,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    status: "published",
    author: "Devabdultechnologies Team"
  },
  {
    id: "cs-4",
    title: "Capitalbot",
    category: "Case Studies",
    slug: "capitalbot",
    excerpt: "High-frequency algorithmic trading platform.",
    content: `<h2>Capitalbot</h2>
<h3>The Challenge</h3>
<p>Building a high-frequency trading platform requires ultra-low latency, high throughput, and absolute reliability. Traditional web architectures are too slow for the demands of algorithmic trading.</p>
<h3>The Solution</h3>
<p>We developed Capitalbot using a combination of Python for the trading algorithms, WebSockets for real-time market data streaming, and Redis for high-speed caching and message brokering. The system architecture was optimized for minimal latency.</p>
<h3>The Results</h3>
<p>Capitalbot successfully executes trades within milliseconds, providing a significant competitive advantage in the market. The robust architecture ensures continuous operation even during periods of high market volatility.</p>`,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
    status: "published",
    author: "Devabdultechnologies Team",
    keywords: "Python, WebSockets, Redis"
  },
  {
    id: "cs-5",
    title: "Trustalink",
    category: "Case Studies",
    slug: "trustalink",
    excerpt: "Dual-sided real estate marketplace connecting property seekers and agents.",
    content: `<h2>Trustalink</h2>
<h3>The Challenge</h3>
<p>The real estate market often suffers from a lack of transparency and trust between property seekers and agents. Existing platforms were clunky and didn't provide adequate verification mechanisms.</p>
<h3>The Solution</h3>
<p>Trustalink was built as a modern, dual-sided marketplace using React, Node.js, and MongoDB. We implemented robust user verification, secure messaging, and an intuitive search interface with advanced filtering options.</p>
<h3>The Results</h3>
<p>The platform significantly improved the property search experience, leading to higher engagement rates and successful connections between verified agents and genuine seekers.</p>`,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    status: "published",
    author: "Devabdultechnologies Team",
    keywords: "React, Node.js, MongoDB"
  },
  {
    id: "cs-6",
    title: "Digital Marketplace",
    category: "Case Studies",
    slug: "digital-marketplace",
    excerpt: "B2B e-commerce platform with escrow payments.",
    content: `<h2>Digital Marketplace</h2>
<h3>The Challenge</h3>
<p>B2B transactions often involve large sums of money and require secure, trustless payment mechanisms to protect both buyers and sellers.</p>
<h3>The Solution</h3>
<p>We engineered a comprehensive B2B e-commerce platform using Next.js and PostgreSQL, integrated with Stripe for secure escrow payments. The platform handles complex product catalogs, bulk ordering, and automated invoicing.</p>
<h3>The Results</h3>
<p>The escrow payment system increased transaction security and user trust, resulting in a significant increase in high-value B2B transactions on the platform.</p>`,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    status: "published",
    author: "Devabdultechnologies Team",
    keywords: "Next.js, Stripe, PostgreSQL"
  }
];

export function DashboardHome({ setView }: { setView: (view: string) => void }) {
  const [stats, setStats] = useState({ total: 0, drafts: 0, published: 0, scheduled: 0 });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, "blogs"));
        const snapshot = await getDocs(q);
        
        let drafts = 0;
        let published = 0;
        let scheduled = 0;
        const recent: any[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.status === "draft") drafts++;
          if (data.status === "published") published++;
          if (data.status === "scheduled") scheduled++;
          recent.push({ id: doc.id, ...data });
        });

        // Sort by date desc
        recent.sort((a, b) => {
          const timeA = a.createdAt ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setStats({ total: snapshot.size, drafts, published, scheduled });
        setRecentArticles(recent.slice(0, 5));
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, "blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [seeding]);

  const handleSeedDatabase = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in as an admin to seed the database.");
      return;
    }

    setSeeding(true);
    try {
      const allContent = [...FALLBACK_ARTICLES, ...CASE_STUDIES];
      
      for (const item of allContent) {
        const docRef = doc(db, "blogs", item.slug);
        const docSnap = await getDoc(docRef);
        
        const data: any = {
          title: item.title,
          slug: item.slug,
          category: item.category,
          excerpt: item.excerpt,
          content: item.content,
          image: item.image,
          status: item.status,
          authorName: item.author || "Devabdultechnologies Team",
          authorUid: auth.currentUser.uid,
          updatedAt: serverTimestamp(),
          publishedAt: serverTimestamp(),
          allowComments: true,
          keywords: item.category.toLowerCase().split(' ').join(', ')
        };

        if (!docSnap.exists()) {
          data.createdAt = serverTimestamp();
          await setDoc(docRef, data);
        } else {
          // Don't overwrite createdAt on update to satisfy security rules
          await setDoc(docRef, data, { merge: true });
        }
      }
      alert("Database seeded successfully with fallback articles and case studies!");
    } catch (error) {
      console.error("Error seeding database:", error);
      alert("Failed to seed database. Check console for details.");
    } finally {
      setSeeding(false);
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await updateDoc(doc(db, "blogs", id), {
        status: "draft",
        updatedAt: serverTimestamp()
      });
      // Refresh stats
      setSeeding(prev => !prev); 
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `blogs/${id}`);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/60">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-white/60">Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="px-4 py-2 rounded-xl bg-accent-orange/20 border border-accent-orange/30 text-accent-orange hover:bg-accent-orange/30 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            {seeding ? "Seeding..." : "Seed Database"}
          </button>
          <button 
            onClick={() => setView('all')}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            View All Articles
          </button>
          <button 
            onClick={() => setView('generate')}
            className="px-4 py-2 rounded-xl bg-accent-blue text-white font-bold flex items-center gap-2 hover:bg-accent-blue/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Generate New
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bg-card border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">Total Articles</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
        </div>
        <div className="bg-bg-card border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center">
            <Edit3 className="w-6 h-6 text-accent-purple" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">Drafts</p>
            <p className="text-2xl font-bold text-white">{stats.drafts}</p>
          </div>
        </div>
        <div className="bg-bg-card border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-green/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-accent-green" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">Published</p>
            <p className="text-2xl font-bold text-white">{stats.published}</p>
          </div>
        </div>
        <div className="bg-bg-card border border-white/10 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-accent-blue" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">Scheduled</p>
            <p className="text-2xl font-bold text-white">{stats.scheduled}</p>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Recent Articles</h2>
        </div>
        <div className="divide-y divide-white/5">
          {recentArticles.length === 0 ? (
            <div className="p-6 text-center text-white/50">No articles found. Generate one!</div>
          ) : (
            recentArticles.map((article) => (
              <div key={article.id} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <h3 className="text-white font-medium mb-1">{article.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      article.status === 'published' ? 'bg-accent-green/20 text-accent-green' : 
                      article.status === 'scheduled' ? 'bg-accent-blue/20 text-accent-blue' :
                      'bg-accent-purple/20 text-accent-purple'
                    }`}>
                      {article.status.toUpperCase()}
                    </span>
                    <span>{article.category || 'Uncategorized'}</span>
                    <span>{article.createdAt ? new Date(article.createdAt.toDate()).toLocaleDateString() : 'Unknown'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(article.status === 'published' || article.status === 'scheduled') && (
                    <button 
                      onClick={() => handleUnpublish(article.id)}
                      className="p-2 rounded-lg bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 transition-colors"
                      title="Unpublish"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => setView(`edit:${article.id}`)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
