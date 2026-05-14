import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ASSOCIATION_STATS, CONTACT } from "../constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2000&auto=format&fit=crop"
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stats = [
  { value: "25", label: "Years Licensed" },
  { value: "93K", label: "Member Agents" },
  { value: "$69B", label: "2025 Volume" },
  { value: "200+", label: "Global Portals" }
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(176,141,87,0.22),transparent_28%),radial-gradient(circle_at_75%_75%,rgba(16,43,87,0.7),transparent_40%)]" />
      <div className="relative grid min-h-screen lg:grid-cols-[60%_40%]">
        <div className="relative z-10 flex min-h-screen items-center px-6 py-32 sm:px-10 lg:px-[8vw]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p variants={itemVariants} className="font-mono mb-7 text-[10px] uppercase tracking-[0.28em] text-gold">
              Carlos Uzcategui · FL Realtor® SL705771 · Est. 2001
            </motion.p>

            <motion.h1 variants={itemVariants} className="font-serif text-[clamp(3.4rem,8vw,7rem)] font-normal leading-[1.02] tracking-tight">
              South Florida.<br />
              Madrid.<br />
              <span className="italic text-gold">One principal.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-8 max-w-xl font-sans text-[1.08rem] font-light leading-[1.8] text-white/70">
              Twenty-five years of Greater Miami transactions. Locally present in Miami and Madrid, simultaneously. Every listing activates inside the world's largest local Realtor association, {ASSOCIATION_STATS.memberCount.toLocaleString()} member agents.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft">
                Request Seller Strategy Review
                <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#spain" className="group inline-flex items-center justify-center gap-3 border border-white/35 px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold">
                España · Madrid Desk
                <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-4xl text-white">{stat.value}</div>
                  <div className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-gold/75">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }} className="relative hidden min-h-screen overflow-hidden lg:block" style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0 100%)" }}>
          <AnimatePresence mode="wait">
            <motion.img key={HERO_IMAGES[currentImage]} src={HERO_IMAGES[currentImage]} alt="Luxury property photography representing South Florida and Madrid real estate" className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8, ease: "easeInOut" }} />
          </AnimatePresence>
          <div className="absolute inset-0 bg-navy/25" />
          <div className="absolute left-[7.6%] top-0 h-full w-[2px] bg-gold/60" />
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-8 right-8 hidden max-w-xs border border-gold/20 bg-navy/40 p-5 backdrop-blur-xl lg:block">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-1 text-gold" size={22} />
          <div>
            <p className="font-serif text-lg text-white">United Realty Group</p>
            <p className="font-mono mt-1 text-[9px] uppercase tracking-[0.18em] text-white/45">Florida brokerage infrastructure</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: hasScrolled ? 0 : 1 }} transition={{ delay: 2, duration: 0.4 }} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-white/10"><motion.span className="block h-7 w-px bg-gold" animate={{ y: [-28, 48] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} /></span>
      </motion.div>
    </section>
  );
}
