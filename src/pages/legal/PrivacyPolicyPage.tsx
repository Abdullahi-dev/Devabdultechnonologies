import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "data-collection", title: "2. Data We Collect" },
    { id: "data-usage", title: "3. How We Use Your Data" },
    { id: "data-sharing", title: "4. Data Sharing & Disclosure" },
    { id: "data-security", title: "5. Data Security" },
    { id: "your-rights", title: "6. Your Privacy Rights" },
    { id: "contact", title: "7. Contact Us" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header offset
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-purple text-sm font-medium mb-6">
            Legal Information
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            We are committed to protecting your privacy and ensuring your data is handled securely and transparently. Last updated: March 2026.
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
                    className="text-left text-white/50 hover:text-accent-purple transition-colors text-sm font-medium py-1"
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
              <section id="introduction" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">1. Introduction</h2>
                <p>
                  At Devabdultechnologies, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
                <p>
                  This privacy policy is provided in a layered format so you can click through to the specific areas set out below.
                </p>
              </section>

              <section id="data-collection" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">2. Data We Collect</h2>
                <p>
                  Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
                </p>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong className="text-white">Identity Data</strong> includes first name, maiden name, last name, username or similar identifier, title, date of birth and gender.</li>
                  <li><strong className="text-white">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                  <li><strong className="text-white">Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong className="text-white">Usage Data</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </section>

              <section id="data-usage" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">3. How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section id="data-sharing" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">4. Data Sharing & Disclosure</h2>
                <p>
                  We may share your personal data with the parties set out below for the purposes set out in the table above.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Internal Third Parties as set out in the Glossary.</li>
                  <li>External Third Parties as set out in the Glossary.</li>
                  <li>Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other businesses or merge with them.</li>
                </ul>
                <p className="mt-4">
                  We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
                </p>
              </section>

              <section id="data-security" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">5. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
                <p>
                  They will only process your personal data on our instructions and they are subject to a duty of confidentiality. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                </p>
              </section>

              <section id="your-rights" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">6. Your Privacy Rights</h2>
                <p>
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
              </section>

              <section id="contact" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-white mb-6">7. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager in the following ways:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-6">
                  <p className="mb-2 break-all"><strong className="text-white">Email address:</strong> devabdultechnologies@gmail.com</p>
                  <p className="mb-2"><strong className="text-white">Postal address:</strong> No, 14 offa Road GRA Ilorin</p>
                  <p><strong className="text-white">Telephone number:</strong> +234 802 627 5433</p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
