import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 150, suffix: "+", label: "Projects delivered", description: "Successfully delivered globally" },
  { value: 50, suffix: "+", label: "Clients served", description: "Trusted by industry leaders" },
  { value: 15, suffix: "+", label: "Countries", description: "Global reach and impact" },
  { value: 50, suffix: "+", label: "Tech Experts", description: "Dedicated to your success" }
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = value / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          // For decimals like 99.9
          if (value % 1 !== 0) {
            setCount(Number(start.toFixed(1)));
          } else {
            setCount(Math.floor(start));
          }
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-24 bg-bg-dark border-b border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300"
            >
              <h3 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tighter mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-white font-semibold text-lg mb-2">{stat.label}</p>
              <p className="text-white/50 text-sm">{stat.description}</p>
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-purple/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
