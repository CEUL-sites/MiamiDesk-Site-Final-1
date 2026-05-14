import { motion, AnimatePresence } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { CONTACT } from "../constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2000&auto=format&fit=crop"
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={HERO_IMAGES[currentImage]}
            src={HERO_IMAGES[currentImage]} 
            alt="South Florida luxury property prepared for professional seller exposure" 
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 backdrop-blur-md mb-8">
            <BadgeCheck size={14} className="text-gold" />
            <span className="text-[10px] lg:text-xs font-bold text-gold uppercase tracking-[0.24em]">
              Florida Realtor® Since 2001 · United Realty Group
            </span>
          </div>

          <h1 className="text-4xl lg:text-7xl text-white mb-6 leading-[1.1] font-serif">
            Your South Florida Home <br />
            <span className="text-gold font-light italic">Deserves Global-Level Exposure</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/80 mb-4 font-light leading-relaxed max-w-2xl">
            Most sellers never reach the buyers who would pay the most. With 25 years of Florida market expertise, a full United Realty Group MLS infrastructure, and a direct bridge to Spanish-speaking and European buyers — your property gets positioned where serious offers begin.
          </p>

          <p className="text-sm text-gold/70 uppercase tracking-[0.2em] font-bold mb-10">
            Private · Confidential · No Obligation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            <a
              href="#contact"
              className="px-8 py-5 bg-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-300 shadow-xl shadow-navy/20 flex items-center justify-center gap-2 group"
            >
              Get Your Free Strategy Review
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              WhatsApp Now
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "25+ Years", sub: "Florida Licensed" },
              { label: "United Realty Group", sub: "MLS & Brokerage Power" },
              { label: "South Florida", sub: "Precision Seller Strategy" },
              { label: "Madrid + Spain", sub: "International Buyer Reach" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg lg:text-xl font-serif text-white">{stat.label}</span>
                <span className="text-[10px] text-gold/80 uppercase tracking-widest font-bold mt-1">{stat.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
