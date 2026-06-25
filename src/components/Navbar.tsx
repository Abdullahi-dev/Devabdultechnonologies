import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, ChevronDown, PhoneCall } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  {
    name: "Services",
    href: "/services",
    megaMenu: {
      left: [
        { name: "Custom Software Development", href: "/services/custom-software-development" },
        { name: "AI & Machine Learning", href: "/services/ai-machine-learning" },
        { name: "Web Application Development", href: "/services/web-application-development" },
        { name: "Mobile App Development", href: "/services/mobile-app-development" },
        { name: "Fintech Infrastructure", href: "/services/fintech-infrastructure" },
        { name: "Cloud & DevOps", href: "/services/cloud-devops" },
        { name: "API Development", href: "/services/api-development" },
        { name: "UI/UX Product Design", href: "/services/ui-ux-product-design" }
      ],
      right: {
        title: "Build scalable enterprise software for your organization.",
        cta: "Start a Project"
      }
    }
  },
  {
    name: "Solutions",
    href: "/solutions",
    megaMenu: {
      left: [
        { name: "Healthcare Technology", href: "/solutions/healthcare-technology" },
        { name: "Fintech Platforms", href: "/solutions/fintech-platforms" },
        { name: "Government Digital Systems", href: "/solutions/government-digital-systems" },
        { name: "Education Platforms", href: "/solutions/education-platforms" },
        { name: "Logistics Platforms", href: "/solutions/logistics-platforms" },
        { name: "Startup MVP Development", href: "/solutions/startup-mvp-development" }
      ]
    }
  },
  {
    name: "Technology",
    href: "/technology",
    megaMenu: {
      left: [
        { name: "Technology Stack", href: "/technology/technology-stack" },
        { name: "AI Capabilities", href: "/technology/ai-capabilities" },
        { name: "Cloud Infrastructure", href: "/technology/cloud-infrastructure" },
        { name: "Security Architecture", href: "/technology/security-architecture" },
        { name: "Development Process", href: "/technology/development-process" }
      ]
    }
  },
  {
    name: "Case Studies",
    href: "/case-studies",
  },
  {
    name: "Resources",
    href: "/resources",
    megaMenu: {
      left: [
        { name: "Blog", href: "/resources?category=Blog" },
        { name: "Engineering Insights", href: "/insights" },
        { name: "Technology Guides", href: "/resources?category=Technology Guides" },
        { name: "Whitepapers", href: "/white-papers" },
        { name: "Case Studies", href: "/case-studies" }
      ]
    }
  },
  {
    name: "Company",
    href: "/company",
    megaMenu: {
      left: [
        { name: "About Us", href: "/company/about" },
        { name: "Leadership", href: "/company/leadership" },
        { name: "Careers", href: "/company/careers" },
        { name: "Press", href: "/company/press" },
        { name: "Contact", href: "/contact" }
      ]
    }
  }
];

import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMobileMenu = (name: string) => {
    setExpandedMobileMenu(expandedMobileMenu === name ? null : name);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isOpen 
            ? "bg-bg-dark text-white border-b border-white/10" 
            : scrolled 
              ? "bg-white text-bg-dark shadow-md" 
              : "bg-bg-dark/90 backdrop-blur-md border-b border-white/5 text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-[90px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center shrink-0 relative z-50">
            <Logo className="h-16 md:h-20" onClick={() => setIsOpen(false)} darkVariant={!scrolled || isOpen} />
          </div>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center justify-center flex-1 px-8">
            <ul className="flex items-center gap-6 text-[15px] font-medium">
              {navLinks.map((link) => (
                <li 
                  key={link.name}
                  className="relative group desktop-nav-item"
                >
                  <button 
                    onClick={(e) => {
                      if (link.megaMenu) {
                        setActiveMenu(activeMenu === link.name ? null : link.name);
                      } else {
                        navigate(link.href);
                        setActiveMenu(null);
                      }
                    }}
                    className={`flex items-center gap-1 py-6 transition-colors relative ${
                      (scrolled && !isOpen) ? "hover:text-accent-purple" : "text-white/80 hover:text-white"
                    } ${
                      (activeMenu === link.name || location.pathname.startsWith(link.href) && link.href !== "/") 
                        ? ((scrolled && !isOpen) ? "text-accent-purple font-semibold" : "text-white font-semibold") 
                        : ""
                    }`}
                  >
                    {link.name}
                    {link.megaMenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === link.name ? 'rotate-180' : 'opacity-50 group-hover:opacity-100'}`} />
                    )}
                    
                    {/* Underline animation */}
                    <span className={`absolute bottom-4 left-0 h-0.5 transition-all duration-300 ${activeMenu === link.name ? 'w-full' : 'w-0 group-hover:w-full'} ${(scrolled && !isOpen) ? "bg-accent-purple" : "bg-white"}`}></span>
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {link.megaMenu && activeMenu === link.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[90px] left-1/2 -translate-x-1/2 w-[600px] bg-white text-bg-dark shadow-2xl rounded-2xl border border-gray-100 overflow-hidden flex transform origin-top"
                      >
                        <div className="flex-1 p-8">
                          <Link 
                            to={link.href} 
                            onClick={() => setActiveMenu(null)}
                            className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block hover:text-accent-purple transition-colors"
                          >
                            {link.name}
                          </Link>
                          <ul className="grid grid-cols-1 gap-3">
                            {link.megaMenu.left.map((item) => {
                              const isActive = location.pathname === item.href;
                              return (
                                <li key={item.name}>
                                  <Link 
                                    to={item.href} 
                                    onClick={() => setActiveMenu(null)} 
                                    className={`text-[15px] transition-colors block py-1 ${
                                      isActive 
                                        ? "text-accent-blue font-semibold" 
                                        : "font-medium text-gray-700 hover:text-accent-purple"
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        
                        {link.megaMenu.right && (
                          <div className="w-[250px] bg-gray-50 p-8 flex flex-col justify-between border-l border-gray-100">
                            <div>
                              <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-4">
                                <ArrowUpRight className="w-5 h-5 text-accent-purple" />
                              </div>
                              <p className="text-[15px] font-medium text-gray-900 leading-snug mb-6">
                                {link.megaMenu.right.title}
                              </p>
                            </div>
                            <Link to="/#contact" onClick={() => setActiveMenu(null)} className="text-sm font-bold text-accent-purple hover:text-accent-purple/80 flex items-center gap-1">
                              {link.megaMenu.right.cta}
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="hidden xl:flex items-center gap-4 shrink-0 relative z-50">
            <a 
              href="tel:+2348026275433"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors font-semibold text-sm ${
                (scrolled && !isOpen)
                  ? "bg-accent-orange/10 border-accent-orange/20 text-accent-orange hover:bg-accent-orange/20" 
                  : "bg-accent-orange/10 border-accent-orange/20 text-accent-orange hover:bg-accent-orange/20"
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              Live Call
            </a>
            <button 
              onClick={() => window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors font-semibold text-sm shadow-lg shadow-accent-purple/20"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`xl:hidden relative z-50 p-2 -mr-2 ${isOpen ? "text-white" : scrolled ? "text-bg-dark" : "text-white"}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav (Full Screen) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden fixed inset-0 top-[90px] bg-bg-dark text-white z-40 overflow-y-auto pb-24"
            >
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name} 
                    className="border-b border-white/10"
                  >
                    <button 
                      onClick={() => {
                        if (link.megaMenu) {
                          toggleMobileMenu(link.name);
                        } else {
                          setIsOpen(false);
                          navigate(link.href);
                        }
                      }} 
                      className={`w-full py-5 text-xl font-bold flex items-center justify-between text-left ${
                        (location.pathname === link.href) ? "text-accent-blue" : ""
                      }`}
                    >
                      {link.name}
                      {link.megaMenu && (
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileMenu === link.name ? 'rotate-180 text-accent-orange' : 'opacity-50'}`} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {link.megaMenu && expandedMobileMenu === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l-2 border-accent-purple/30 mb-6 mt-2">
                            <Link 
                              to={link.href} 
                              onClick={() => setIsOpen(false)}
                              className="text-sm font-bold text-accent-orange uppercase tracking-wider mb-4 block hover:text-white transition-colors"
                            >
                              {link.name} Overview
                            </Link>
                            <ul className="flex flex-col gap-4">
                              {link.megaMenu.left.map((item) => {
                              const isActive = location.pathname === item.href;
                              return (
                                <li key={item.name}>
                                  <Link 
                                    to={item.href} 
                                    onClick={() => setIsOpen(false)}
                                    className={`hover:translate-x-2 transition-all text-lg block ${
                                      isActive 
                                        ? "text-accent-blue font-semibold" 
                                        : "text-white/70 hover:text-white"
                                    }`}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              );
                            })}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-4 mt-8"
                >
                  <a 
                    href="tel:+2348026275433"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-orange/10 border border-accent-orange/20 text-accent-orange font-bold text-lg hover:bg-accent-orange/20 transition-colors"
                  >
                    <PhoneCall className="w-5 h-5" />
                    Live Call
                  </a>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      window.open('https://wa.me/2348026275433?text=I%20want%20to%20start%20a%20project', '_blank');
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent-purple text-white font-bold text-lg hover:bg-accent-purple/90 transition-colors shadow-lg shadow-accent-purple/20 w-full"
                  >
                    Start a Project
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
