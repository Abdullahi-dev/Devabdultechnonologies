import React from 'react';
import { ArrowRight, Mail, MapPin, Phone, MessageSquare, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Save to Firestore First
      await addDoc(collection(db, "project_inquiries"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp()
      });
    } catch (dbError) {
      console.error("Firestore Error:", dbError);
      setSubmitStatus({ type: 'error', text: "Database error: Please check your Firestore rules." });
      setIsSubmitting(false);
      return;
    }

    // Send Email Notification via EmailJS (Removed as per request)
    
    setSubmitStatus({ type: 'success', text: "Message sent successfully! We'll be in touch soon." });
    setTimeout(() => setSubmitStatus(null), 5000);
    setFormData({ name: "", email: "", company: "", budget: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="bg-bg-dark py-32 border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-purple/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange w-fit mb-8">
              <span className="text-sm font-semibold tracking-wide uppercase">Get in Touch</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight break-words">
              Let's discuss your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-accent-purple">enterprise project</span>
            </h2>
            
            <p className="text-xl text-white/60 mb-16 max-w-lg leading-relaxed">
              Ready to transform your business? Our team of experts is here to help you build scalable, secure, and innovative solutions.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent-orange group-hover:bg-accent-orange/10 transition-all duration-300 shadow-lg">
                  <Phone className="w-6 h-6 text-accent-orange" />
                </div>
                <div>
                  <h4 className="text-white/50 text-xs sm:text-sm font-bold mb-2 uppercase tracking-widest">Book a call</h4>
                  <a href="https://calendly.com/devabdultechnologies" target="_blank" rel="noreferrer" className="text-white text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-accent-orange transition-colors break-words">
                    Schedule a meeting
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent-purple group-hover:bg-accent-purple/10 transition-all duration-300 shadow-lg">
                  <Mail className="w-6 h-6 text-accent-purple" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white/50 text-xs sm:text-sm font-bold mb-2 uppercase tracking-widest">Email us</h4>
                  <a href="mailto:devabdultechnologies@gmail.com" className="text-white text-lg sm:text-xl md:text-2xl font-semibold group-hover:text-accent-purple transition-colors break-all">
                    devabdultechnologies@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300 shadow-lg">
                  <MapPin className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h4 className="text-white/50 text-xs sm:text-sm font-bold mb-2 uppercase tracking-widest">Visit us</h4>
                  <p className="text-white text-lg sm:text-xl font-medium leading-relaxed break-words">
                    No, 14 offa Road GRA Ilorin
                  </p>
                </div>
              </div>
            </div>

            {/* Team / Talent Section */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <div className="flex -space-x-4 mb-6">
                <img src="https://lh3.googleusercontent.com/pw/AP1GczOK7DKwHhSc2yIBah7soWbS6TXAxLRwueuJ74mHzBQ16De_K77V5S1vp_-9Z5pzUcdvJMEG8O1HUNsKW5tXtsE_0_zmyw54HOe4O8DiEqjeQ8Ryiw=w500-h315-p-k" alt="Team member" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full border-2 border-[#4a2b4d] object-cover shadow-lg" />
                <img src="https://lh3.googleusercontent.com/pw/AP1GczOi2_tME822Sc49hWyKJHwkaxUeEUZCdosQkYT1ZXbEvBVpSBuvHQuwe9JVvWes_bryFuBxU-0E0PyNHPQ8uPEXAL5Az9N7eQDdifi7jOByncNEkw=w477-h315-p-k" alt="Team member" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full border-2 border-[#4a2b4d] object-cover shadow-lg" />
                <img src="https://lh3.googleusercontent.com/pw/AP1GczO_BlWVsQwx-tNApw5LttsA3RnvXB3qblA6dV1oRM59utQsmKD3YSOU2NN1m-0v5qIm6FWKvcMw3dqEsqVV-UjnHW8JdiO8EYtyXU691BXayMnHoA=w600-h315-p-k" alt="Team member" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full border-2 border-[#4a2b4d] object-cover shadow-lg" />
                <img src="https://lh3.googleusercontent.com/pw/AP1GczNk1fPdoXu5CVAj_zKXH_DwQbb9H6AtP0ExikDpTutic4L9guAgVnIwGdl_2P_RGgUGTq_hDqbvQCW3bAFa3NeYvAi_r8l6DfjBAL_3fb-JOKGZxg=w600-h315-p-k" alt="Team member" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full border-2 border-[#4a2b4d] object-cover shadow-lg" />
                <img src="https://lh3.googleusercontent.com/pw/AP1GczNH78t5Oj-AF9A1Qw7gO5OhxxF6-pNQ0qbBKcPd-ZM13ETs9vg5Vcxebz6lR1KwgZdQaczI4xldgnd7KYVuwMup82u4rGhD4w_LP_KOsoR93x5zPw=w446-h315-p-k" alt="Team member" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full border-2 border-[#4a2b4d] object-cover shadow-lg" />
              </div>
              <p className="text-white font-bold text-lg sm:text-xl max-w-md leading-snug">
                Your trusted technology partner, delivering scalable software solutions and enterprise engineering powered by top-tier global talent.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-bg-card rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Form Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8 sm:mb-10 relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Send a Message</h3>
            </div>

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-semibold ml-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} className="w-full bg-bg-dark border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-all placeholder:text-white/20" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-semibold ml-2">Work Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className="w-full bg-bg-dark border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-all placeholder:text-white/20" placeholder="john@company.com" required />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-semibold ml-2">Company</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="w-full bg-bg-dark border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-all placeholder:text-white/20" placeholder="Your Company" />
                </div>
                <div className="space-y-2">
                  <label className="text-white/70 text-sm font-semibold ml-2">Project Budget</label>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} disabled={isSubmitting} className="w-full bg-bg-dark border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-all placeholder:text-white/20" placeholder="e.g. $50,000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-white/70 text-sm font-semibold ml-2">Project Details *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} disabled={isSubmitting} rows={5} className="w-full bg-bg-dark border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange transition-all resize-none placeholder:text-white/20" placeholder="Tell us about your goals, timeline, and technical requirements..." required />
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                  {submitStatus.text}
                </div>
              )}
              
              <button type="submit" disabled={isSubmitting} className="w-full py-5 rounded-2xl bg-accent-orange text-white font-bold text-lg hover:bg-[#b8952b] transition-all flex items-center justify-center gap-3 mt-8 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] disabled:opacity-50 group">
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Send Message
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
