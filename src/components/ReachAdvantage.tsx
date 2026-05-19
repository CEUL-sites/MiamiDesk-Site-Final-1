import { BarChart3, Globe, Handshake, MessageSquare, Network, Users } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../constants";

const STATS = [
  { value: 200, suffix: "+", label: "Global Portals", desc: "Websites and apps worldwide publishing every active listing in the buyer's language.", icon: Globe },
  { value: 19, suffix: "", label: "Languages", desc: "Every listing publishes in 19 languages simultaneously. No buyer is unreachable by language.", icon: MessageSquare },
  { value: 260, suffix: "+", label: "U.S. MLSs", desc: "National MLS data exchanges via RPR, the broadest domestic professional reach available.", icon: Network },
  { value: 437, suffix: "+", label: "Intl. Agreements", desc: "Signed referral agreements with real estate associations across the world, creating active deal flow.", icon: Handshake },
  { value: 93000, suffix: "", label: "Member Agents", desc: "Miami and South Florida REALTORS®, the world's largest local Realtor association.", icon: Users },
  { value: 69, suffix: "B", label: "2025 Volume", desc: "Combined transaction volume of the association in 2025. The infrastructure behind every listing.", icon: BarChart3 }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        window.clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => window.clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export const ReachAdvantage = () => {
  return (
    <section id="reach" className="border-t border-gold/20 bg-navy-deep py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Seller Distribution Advantage</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-white lg:text-6xl">
            This is not just an online posting.<br />
            <span className="italic text-gold">It is a distribution strategy.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-sans text-lg leading-relaxed text-white/60">
            Listing with Carlos means entering a professional distribution infrastructure — MLS visibility, global publication, broker cooperation, referral networks, and buyer-agent access across South Florida and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 border border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: index * 0.06 }} className="group border-b border-r border-white/10 p-8 transition-colors duration-300 hover:bg-white/[0.035] lg:p-10">
              <stat.icon className="mb-10 text-gold/65 transition-colors group-hover:text-gold" size={30} />
              <div className="font-serif text-5xl text-gold lg:text-6xl"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
              <h3 className="font-sans mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">{stat.label}</h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-white/50">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border-t border-gold/40 pt-10 text-center">
          <blockquote className="font-serif text-3xl italic text-white lg:text-5xl">Features describe a property. Distribution determines its price.</blockquote>
          <p className="font-mono mt-6 text-[10px] uppercase tracking-[0.22em] text-gold/60">— {CONTACT.shortLicense}</p>
        </div>
      </div>
    </section>
  );
};
