import { motion } from "motion/react";

const GigsVersityLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 240 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      {/* Head */}
      <circle cx="35" cy="28" r="8" />
      {/* Shoulders */}
      <path d="M 22 42 C 22 36 28 34 35 34 C 42 34 48 36 48 42 C 48 46 42 48 35 48 C 28 48 22 46 22 42 Z" />
      {/* Top curve */}
      <path d="M 35 12 C 22 12 14 18 12 26 C 16 18 24 16 35 16 C 42 16 48 18 50 22 C 46 14 40 12 35 12 Z" />
      {/* Left curve */}
      <path d="M 10 32 C 10 24 14 16 20 12 C 14 18 12 24 12 32 C 12 40 14 46 20 52 C 14 46 10 40 10 32 Z" />
    </g>
    <text x="60" y="40" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="600" fill="currentColor" letterSpacing="-1">Gigsversity</text>
  </svg>
);

const logos = [
  { image: "/eminet.png", name: "Eminent mine" },
  { component: GigsVersityLogo, name: "Gigsversity" },
  { image: "/secure.jpg", name: "SecureYourFuture" },
  { image: "/logo_ehmcare.jpeg", name: "Ehmcare" },
  { image: "/CAPITALBOT.png", name: "Capitalbot" },
  { image: "/otabel.png", name: "Otabelbiomedical" },
];

export function TrustLogos() {
  // Duplicate logos to create a seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-bg-dark border-y border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 mb-10">
        <p className="text-center text-white/40 text-sm font-semibold uppercase tracking-[0.2em]">
          Trusted by innovative companies worldwide
        </p>
      </div>
      
      <div className="relative flex overflow-hidden w-full group">
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {duplicatedLogos.map((logo, index) => {
            if (logo.image) {
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 grayscale hover:grayscale-0"
                >
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="h-10 md:h-12 w-auto object-contain max-w-[160px]" 
                  />
                </div>
              );
            }

            const Icon = logo.component;
            return (
              <div 
                key={index}
                className="flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 grayscale hover:grayscale-0"
              >
                {Icon && <Icon className="h-10 md:h-12 w-auto" />}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
