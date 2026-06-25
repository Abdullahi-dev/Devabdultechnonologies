import React from 'react';
import { ArrowRight, Mail, Phone, Linkedin, Twitter, Github, Instagram, Facebook, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Logo } from "./Logo";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        createdAt: serverTimestamp()
      });
      setMessage({ type: 'success', text: "Thanks for subscribing!" });
      setEmail("");
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage({ type: 'error', text: "Failed to subscribe. Please try again." });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#0f0c1b] pt-24 pb-8 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Top Section: Newsletter & Mini CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-white/10">
          <div>
            <h3 className="text-3xl font-bold text-white mb-4">Stay updated with engineering insights</h3>
            <p className="text-white/60 mb-6 max-w-md">Join our newsletter to receive the latest in AI, cloud architecture, and enterprise software development.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-purple transition-colors"
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-accent-purple text-white font-bold hover:bg-accent-purple/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Subscribe"}
                </button>
              </div>
              {message && (
                <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
          
          <div className="bg-bg-card border border-white/5 rounded-3xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6 lg:ml-auto w-full max-w-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Have a project idea?</h3>
              <p className="text-white/60">Let's build something extraordinary together.</p>
            </div>
            <button 
              onClick={() => window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank')}
              className="shrink-0 px-8 py-4 rounded-xl bg-accent-orange text-white font-bold hover:bg-[#b8952b] transition-colors flex items-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 text-white">
              <Logo className="h-16 md:h-24" darkVariant={true} />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Engineering the future of<br />
              enterprise digital infrastructure.
            </p>
            <div className="space-y-4">
              <p className="text-white/80 text-sm mb-4">
                No, 14 offa Road GRA Ilorin
              </p>
              <a href="mailto:devabdultechnologies@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-accent-purple transition-colors text-sm break-all">
                <Mail className="w-4 h-4 shrink-0" />
                devabdultechnologies@gmail.com
              </a>
              <a href="tel:+2348026275433" className="flex items-center gap-3 text-white/80 hover:text-accent-purple transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +234 802 627 5433
              </a>
              <div className="flex items-center gap-4 pt-4">
                <a href="https://www.linkedin.com/in/devabdul-technologies-84a49a400?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-accent-purple hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://x.com/Devabdultechnol" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-accent-purple hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://github.com/Abdullahi-dev" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-accent-purple hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/devabdultechnologies?igsh=MWZkMGhyMDlyYmkwZw==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-accent-purple hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/devabdulHQ" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-accent-purple hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services/custom-software-development" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Custom Software Development</Link></li>
              <li><Link to="/services/ai-machine-learning" className="text-white/60 hover:text-accent-purple transition-colors text-sm">AI & Machine Learning</Link></li>
              <li><Link to="/services/mobile-app-development" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Mobile Applications</Link></li>
              <li><Link to="/services/web-application-development" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Web Development</Link></li>
              <li><Link to="/services/cloud-devops" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Cloud & DevOps</Link></li>
              <li><Link to="/services/fintech-infrastructure" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Fintech Systems</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/solutions/healthcare-technology" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Healthcare</Link></li>
              <li><Link to="/solutions/fintech-platforms" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Fintech</Link></li>
              <li><Link to="/solutions/government-digital-systems" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Government</Link></li>
              <li><Link to="/solutions/education-platforms" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Education</Link></li>
              <li><Link to="/solutions/logistics-platforms" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Logistics</Link></li>
              <li><Link to="/solutions/startup-mvp-development" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Startups</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/resources?category=Blog" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Blog</Link></li>
              <li><Link to="/resources?category=Engineering Insights" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Engineering Insights</Link></li>
              <li><Link to="/technology" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Technology Stack</Link></li>
              <li><Link to="/case-studies" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Case Studies</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/company/about" className="text-white/60 hover:text-accent-purple transition-colors text-sm">About</Link></li>
              <li><Link to="/company/leadership" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Leadership</Link></li>
              <li><Link to="/company/careers" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Careers</Link></li>
              <li><Link to="/#contact" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Contact</Link></li>
              <li><Link to="/company/press" className="text-white/60 hover:text-accent-purple transition-colors text-sm">Press</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Devabdultechnologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/legal/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/legal/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
