import { motion } from "framer-motion";

export function CookiePolicyPage() {
  const sections = [
    { id: "what-are-cookies", title: "1. What Are Cookies" },
    { id: "how-we-use", title: "2. How We Use Cookies" },
    { id: "types-of-cookies", title: "3. Types of Cookies We Use" },
    { id: "third-party", title: "4. Third-Party Cookies" },
    { id: "managing-cookies", title: "5. Managing Cookies" },
    { id: "updates", title: "6. Updates to This Policy" },
    { id: "contact", title: "7. Contact Us" },
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
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-blue text-sm font-medium mb-6">
            Legal Information
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            This Cookie Policy explains how Devabdultechnologies uses cookies and similar technologies to recognize you when you visit our website. Last updated: March 2026.
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
                    className="text-left text-white/50 hover:text-accent-blue transition-colors text-sm font-medium py-1"
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
              <section id="what-are-cookies" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">1. What Are Cookies</h2>
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
                <p>
                  Cookies set by the website owner (in this case, Devabdultechnologies) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., like advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                </p>
              </section>

              <section id="how-we-use" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">2. How We Use Cookies</h2>
                <p>
                  We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
                </p>
              </section>

              <section id="types-of-cookies" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">3. Types of Cookies We Use</h2>
                <div className="space-y-8 mt-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-2">Essential Cookies</h4>
                    <p className="text-sm">These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-2">Performance and Functionality Cookies</h4>
                    <p className="text-sm">These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-2">Analytics and Customization Cookies</h4>
                    <p className="text-sm">These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-2">Advertising Cookies</h4>
                    <p className="text-sm">These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.</p>
                  </div>
                </div>
              </section>

              <section id="third-party" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">4. Third-Party Cookies</h2>
                <p>
                  In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                </p>
              </section>

              <section id="managing-cookies" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">5. Managing Cookies</h2>
                <p>
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
                </p>
                <p>
                  You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
                </p>
              </section>

              <section id="updates" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">6. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
                <p>
                  The date at the top of this Cookie Policy indicates when it was last updated.
                </p>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">7. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies or other technologies, please email us at:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-6">
                  <p className="mb-2 break-all"><strong className="text-white">Email address:</strong> devabdultechnologies@gmail.com</p>
                  <p><strong className="text-white">Postal address:</strong> No, 14 offa Road GRA Ilorin</p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
