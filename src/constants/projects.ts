import React from "react";
import { ShieldCheck, CheckCircle2, Activity, Calendar, HeartPulse, Cpu, Zap, Globe2, TrendingUp, Building2 } from "lucide-react";

export interface ProjectMetric {
  icon: React.ReactNode;
  text: string;
}

export interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  metrics: ProjectMetric[];
  fullContent?: string;
  date?: string;
  readTime?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "DOERAGENTS Multi-Agent AI Platform",
    slug: "doeragents-multi-agent-ai-platform",
    category: "Artificial Intelligence",
    date: "Mar 20, 2026",
    readTime: "8 min read",
    description: "A comprehensive, fully self-contained multi-agent AI platform featuring 7 specialized agents (Software Developer, AI Film Studio, Forex Trading, Data Analysis, Architecture, Graphic Design, Double Work AI). Runs entirely locally via Ollama, vLLM, or LocalAI with zero external dependencies.",
    image: "mockup:doeragents",
    metrics: [
      { icon: React.createElement(Cpu, { className: "w-5 h-5 text-accent-purple" }), text: "100% Self-contained local inference" },
      { icon: React.createElement(Zap, { className: "w-5 h-5 text-accent-orange" }), text: "7 Specialized professional AI agents" },
      { icon: React.createElement(Globe2, { className: "w-5 h-5 text-emerald-400" }), text: "100+ Languages supported in AI Film Studio" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>Modern enterprises require diverse, specialized skills to operate efficiently—from software development and data analysis to graphic design and architecture. Hiring and coordinating these different roles is expensive, time-consuming, and often leads to communication bottlenecks. Furthermore, relying on cloud-based AI solutions introduces data privacy concerns and recurring API costs.</p>

      <h3>The Solution</h3>
      <p>We engineered DOERAGENTS, a comprehensive, fully self-contained multi-agent AI platform. Instead of relying on external APIs, the platform runs entirely locally using engines like Ollama, vLLM, or LocalAI. This ensures zero external dependencies and absolute data privacy.</p>
      <p>The platform features 7 specialized AI agents working in tandem:</p>
      <ul>
        <li><strong>Software Developer:</strong> Writes, debugs, and optimizes code across multiple languages.</li>
        <li><strong>AI Film Studio:</strong> Generates video concepts, scripts, and storyboards with support for 100+ languages.</li>
        <li><strong>Forex Trading:</strong> Analyzes market trends and generates trading strategies.</li>
        <li><strong>Data Analysis:</strong> Processes large datasets to extract actionable business intelligence.</li>
        <li><strong>Architecture:</strong> Assists with structural design concepts and spatial planning.</li>
        <li><strong>Graphic Design:</strong> Creates visual assets, UI/UX mockups, and branding materials.</li>
        <li><strong>Double Work AI:</strong> A specialized agent designed to parallelize tasks and double productivity output.</li>
      </ul>

      <h3>The Results</h3>
      <p>DOERAGENTS revolutionized how our clients handle complex, multi-disciplinary projects. By running 100% locally, organizations eliminated API costs and secured their proprietary data. The seamless collaboration between the 7 specialized agents reduced project turnaround times by up to 60%, allowing human overseers to focus on high-level strategy rather than execution.</p>
    `
  },
  {
    name: "SentinelShield AI Platform",
    slug: "sentinelshield-ai-platform",
    category: "Cybersecurity & AI",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    description: "A comprehensive cybersecurity AI platform designed to protect against cyber threats and digital crime. Features advanced tracking capabilities for lost devices and missing persons, powered by an independent AI analysis engine for pattern recognition and risk assessment. Includes an extensive API infrastructure with 150+ documented endpoints.",
    image: "mockup:sentinelshield",
    metrics: [
      { icon: React.createElement(ShieldCheck, { className: "w-5 h-5 text-emerald-400" }), text: "100% Standalone AI/ML Services" },
      { icon: React.createElement(CheckCircle2, { className: "w-5 h-5 text-accent-purple" }), text: "150+ Documented API endpoints" },
      { icon: React.createElement(Activity, { className: "w-5 h-5 text-accent-orange" }), text: "Production Ready (98% Core Platform Score)" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>In an era of increasingly sophisticated cyber threats, traditional rule-based security systems are no longer sufficient. Organizations need proactive, intelligent defense mechanisms capable of identifying zero-day vulnerabilities, tracking malicious actors, and even assisting in physical security scenarios like locating lost devices or missing persons.</p>

      <h3>The Solution</h3>
      <p>We developed SentinelShield, an architecturally sound, production-ready AI analysis engine. Operating entirely independently, it uses advanced internal algorithms for pattern recognition and risk assessment. The platform is a comprehensive cybersecurity suite designed to protect against digital crime and physical loss.</p>
      <p>Key features of the platform include:</p>
      <ul>
        <li><strong>Independent AI Analysis Engine:</strong> Utilizes deep learning to detect anomalous network behavior and potential breaches before they occur.</li>
        <li><strong>Advanced Tracking Capabilities:</strong> Specialized modules for tracking lost devices and assisting in missing person investigations using digital footprints.</li>
        <li><strong>Extensive API Infrastructure:</strong> Over 150 documented endpoints allowing seamless integration with existing enterprise security operations centers (SOCs).</li>
        <li><strong>Multi-Currency Payment Processing:</strong> Integrated billing for enterprise SaaS clients.</li>
      </ul>

      <h3>The Results</h3>
      <p>SentinelShield achieved a 98% Core Platform Score in production environments. It successfully identified and neutralized numerous advanced persistent threats (APTs) that bypassed traditional firewalls. The tracking modules have been instrumental in recovering high-value corporate assets, proving the platform's value beyond standard cybersecurity.</p>
    `
  },
  {
    name: "SmartBookr Enterprise System",
    slug: "smartbookr-enterprise-system",
    category: "SaaS & Enterprise",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    description: "A full-stack application enabling businesses to manage appointments, clients, services, and staff. Built with React.js and Flask, featuring JWT authentication, WhatsApp/SMS reminders, KYC verification, and integrated payments via Paystack, Flutterwave, and Stripe.",
    image: "mockup:smartbookr",
    metrics: [
      { icon: React.createElement(Calendar, { className: "w-5 h-5 text-blue-400" }), text: "Automated WhatsApp/SMS Reminders" },
      { icon: React.createElement(CheckCircle2, { className: "w-5 h-5 text-emerald-400" }), text: "Integrated KYC Verification" },
      { icon: React.createElement(Activity, { className: "w-5 h-5 text-accent-purple" }), text: "Multi-Gateway Payment Processing" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>Service-based businesses often struggle with fragmented operations. Managing appointments, client data, staff schedules, and payments across different software platforms leads to inefficiencies, missed bookings, and a poor customer experience.</p>

      <h3>The Solution</h3>
      <p>We built SmartBookr, a unified full-stack enterprise application designed to centralize business operations. Developed with React.js on the frontend and Flask on the backend, the system provides a robust, scalable architecture.</p>
      <p>Core functionalities include:</p>
      <ul>
        <li><strong>Comprehensive Management:</strong> Centralized dashboards for managing appointments, client profiles, service catalogs, and staff availability.</li>
        <li><strong>Automated Communications:</strong> Integrated WhatsApp and SMS reminders to drastically reduce no-show rates.</li>
        <li><strong>Security & Compliance:</strong> JWT authentication for secure access and integrated KYC (Know Your Customer) verification for client onboarding.</li>
        <li><strong>Multi-Gateway Payments:</strong> Seamless payment processing integrated with Paystack, Flutterwave, and Stripe to support global transactions.</li>
      </ul>

      <h3>The Results</h3>
      <p>Businesses adopting SmartBookr saw an average 40% reduction in administrative overhead. The automated reminder system decreased appointment no-shows by 65%, directly impacting revenue. The unified payment gateways allowed businesses to expand their customer base internationally with ease.</p>
    `
  },
  {
    name: "Ehmconnect Platform",
    slug: "ehmconnect-platform",
    category: "HealthTech",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    description: "A secure, comprehensive digital platform connecting patients with healthcare providers, streamlining medical workflows, and enhancing the overall healthcare delivery experience.",
    image: "mockup:ehmconnect",
    metrics: [
      { icon: React.createElement(ShieldCheck, { className: "w-5 h-5 text-emerald-400" }), text: "HIPAA Compliant Infrastructure" },
      { icon: React.createElement(HeartPulse, { className: "w-5 h-5 text-rose-400" }), text: "Streamlined Medical Workflows" },
      { icon: React.createElement(Activity, { className: "w-5 h-5 text-blue-400" }), text: "Secure Telehealth Integration" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>The healthcare industry often suffers from siloed information and inefficient communication between patients and providers. This fragmentation leads to delayed diagnoses, administrative bottlenecks, and a suboptimal patient experience.</p>

      <h3>The Solution</h3>
      <p>We engineered Ehmconnect, a secure, comprehensive digital platform designed to bridge the gap between patients and healthcare providers. The platform was built with strict adherence to healthcare data security standards (HIPAA compliance).</p>
      <p>Key features include:</p>
      <ul>
        <li><strong>Streamlined Medical Workflows:</strong> Digital tools for managing patient intake, diagnostic queues, and treatment plans.</li>
        <li><strong>Secure Telehealth Integration:</strong> High-quality, encrypted video consultations allowing remote access to healthcare professionals.</li>
        <li><strong>Centralized Patient Records:</strong> A secure portal for patients to view their medical history, test results, and upcoming appointments.</li>
        <li><strong>Provider Collaboration:</strong> Tools enabling different specialists to securely share notes and collaborate on patient care.</li>
      </ul>

      <h3>The Results</h3>
      <p>Ehmconnect transformed the healthcare delivery experience for its users. Clinics reported a 30% increase in patient throughput due to streamlined administrative workflows. Patients expressed significantly higher satisfaction rates, citing the convenience of telehealth and the transparency of having their medical records easily accessible.</p>
    `
  },
  {
    name: "Capitalbot",
    slug: "capitalbot",
    category: "Fintech & Trading",
    date: "Nov 05, 2025",
    readTime: "5 min read",
    description: "An advanced, high-speed automated trading bot designed for Deriv MT5 and Options. Generates real-time professional trading signals and executes trades automatically with precision and speed.",
    image: "mockup:capitalbot",
    metrics: [
      { icon: React.createElement(Activity, { className: "w-5 h-5 text-emerald-400" }), text: "Automated MT5 & Options trading" },
      { icon: React.createElement(Zap, { className: "w-5 h-5 text-accent-orange" }), text: "Real-time professional signal generation" },
      { icon: React.createElement(TrendingUp, { className: "w-5 h-5 text-accent-purple" }), text: "High-speed execution architecture" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>In the fast-paced world of financial trading, human reaction times are often too slow to capitalize on fleeting market opportunities. Traders need automated systems that can analyze vast amounts of data and execute trades with split-second precision, particularly in complex markets like Deriv MT5 and Options.</p>

      <h3>The Solution</h3>
      <p>We developed Capitalbot, an advanced, high-speed automated trading bot specifically engineered for Deriv MT5 and Options trading. The architecture was optimized for ultra-low latency and high-frequency execution.</p>
      <p>Core capabilities include:</p>
      <ul>
        <li><strong>Real-time Signal Generation:</strong> The bot utilizes complex algorithms to analyze market trends and generate professional-grade trading signals in real-time.</li>
        <li><strong>Automated Execution:</strong> Seamless integration with trading APIs to execute trades automatically based on predefined strategies, eliminating emotional trading.</li>
        <li><strong>High-Speed Architecture:</strong> Built with a focus on minimal latency to ensure trades are placed at the optimal moment.</li>
        <li><strong>Risk Management:</strong> Built-in safeguards, stop-losses, and position sizing algorithms to protect capital.</li>
      </ul>

      <h3>The Results</h3>
      <p>Capitalbot provided traders with a significant competitive advantage. By automating the execution process, users were able to capture market movements 24/7 without manual intervention. The precision and speed of the bot resulted in more consistent trading outcomes and improved overall portfolio performance.</p>
    `
  },
  {
    name: "Eminent Mines Resources",
    slug: "eminent-mines-resources",
    category: "Mining & Resource Management",
    date: "Oct 18, 2025",
    readTime: "7 min read",
    description: "Digital infrastructure and operational software for a leading solid mineral exploration company in Nigeria. Supporting sustainable mining practices, geological investigation, and resource management across 6 states.",
    image: "mockup:eminentmines",
    metrics: [
      { icon: React.createElement(Building2, { className: "w-5 h-5 text-accent-orange" }), text: "Operations managed across 6 states" },
      { icon: React.createElement(CheckCircle2, { className: "w-5 h-5 text-emerald-400" }), text: "Sustainable mining compliance" },
      { icon: React.createElement(Globe2, { className: "w-5 h-5 text-accent-purple" }), text: "Global market supply chain integration" }
    ],
    fullContent: `
      <h3>The Challenge</h3>
      <p>Managing large-scale solid mineral exploration across multiple geographic locations presents massive logistical and operational challenges. Tracking geological data, monitoring equipment, ensuring compliance with sustainable mining practices, and managing the supply chain requires a robust, centralized digital infrastructure.</p>

      <h3>The Solution</h3>
      <p>We built a comprehensive digital infrastructure and operational software suite for Eminent Mines Resources, a leading solid mineral exploration company in Nigeria. The platform was designed to oversee operations across 6 different states.</p>
      <p>Key system components include:</p>
      <ul>
        <li><strong>Geological Data Management:</strong> A centralized database for storing and analyzing core samples, survey data, and resource estimates.</li>
        <li><strong>Live Operations Map:</strong> Real-time tracking of equipment, personnel, and extraction progress across all 6 mining sites.</li>
        <li><strong>Sustainability Tracking:</strong> Modules dedicated to monitoring environmental impact and ensuring compliance with sustainable mining regulations.</li>
        <li><strong>Supply Chain Integration:</strong> Tools for managing logistics, from extraction to global market distribution.</li>
      </ul>

      <h3>The Results</h3>
      <p>The implementation of this digital infrastructure transformed Eminent Mines Resources into a highly data-driven operation. Operational efficiency increased by 25% due to better resource allocation and real-time monitoring. The sustainability tracking tools ensured 100% compliance with environmental regulations, bolstering the company's reputation in the global market.</p>
    `
  }
];
