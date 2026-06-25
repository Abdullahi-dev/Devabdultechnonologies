import { motion } from "framer-motion";

export function TermsOfServicePage() {
  const sections = [
    { id: "agreement", title: "1. Agreement to Terms" },
    { id: "intellectual-property", title: "2. Intellectual Property Rights" },
    { id: "user-representations", title: "3. User Representations" },
    { id: "prohibited-activities", title: "4. Prohibited Activities" },
    { id: "user-generated-contributions", title: "5. User Generated Contributions" },
    { id: "site-management", title: "6. Site Management" },
    { id: "term-and-termination", title: "7. Term and Termination" },
    { id: "modifications", title: "8. Modifications and Interruptions" },
    { id: "governing-law", title: "9. Governing Law" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-6 mb-20 relative">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-orange text-sm font-medium mb-6">
            Legal Information
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            These Terms of Service constitute a legally binding agreement made between you and Devabdultechnologies. Last updated: March 2026.
          </p>
        </motion.div>
      </div>

      {/* Content Layout */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Sidebar */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Table of Contents</h3>
              <nav className="flex flex-col gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left text-white/50 hover:text-accent-orange transition-colors text-sm font-medium py-1"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3 prose prose-invert prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-16 text-white/70"
            >
              <section id="agreement" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">1. Agreement to Terms</h2>
                <p>
                  These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Devabdultechnologies ("Company", "we", "us", or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                </p>
                <p>
                  You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
              </section>

              <section id="intellectual-property" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">2. Intellectual Property Rights</h2>
                <p>
                  Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
                </p>
                <p>
                  The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </p>
              </section>

              <section id="user-representations" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">3. User Representations</h2>
                <p>
                  By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (6) you will not use the Site for any illegal or unauthorized purpose; and (7) your use of the Site will not violate any applicable law or regulation.
                </p>
              </section>

              <section id="prohibited-activities" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">4. Prohibited Activities</h2>
                <p>
                  You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                </p>
                <p>As a user of the Site, you agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                  <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
                  <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                  <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                </ul>
              </section>

              <section id="user-generated-contributions" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">5. User Generated Contributions</h2>
                <p>
                  The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
                </p>
                <p>
                  Contributions may be viewable by other users of the Site and through third-party websites. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary.
                </p>
              </section>

              <section id="site-management" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">6. Site Management</h2>
                <p>
                  We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Site or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
                </p>
              </section>

              <section id="term-and-termination" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">7. Term and Termination</h2>
                <p>
                  These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
                </p>
              </section>

              <section id="modifications" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">8. Modifications and Interruptions</h2>
                <p>
                  We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
                </p>
              </section>

              <section id="governing-law" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">9. Governing Law</h2>
                <p>
                  These Terms shall be governed by and defined following the laws of Nigeria. Devabdultechnologies and yourself irrevocably consent that the courts of Nigeria shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
