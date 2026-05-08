import { motion, AnimatePresence } from "motion/react";
import { Shield, ChevronRight, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { CONTACT } from "../constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop", // Miami Waterfront
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop", // Luxury Mansion
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2000&auto=format&fit=crop", // Madrid Detail
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2000&auto=format&fit=crop", // Modern Terrace
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop", // Poolside
  "https://images.unsplash.com/photo-1600607687940-47de406d4e21?q=80&w=2000&auto=format&fit=crop", // High-end Interior
  "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2000&auto=format&fit=crop", // Coastal View
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Cinematic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={HERO_IMAGES[currentImage]}
            src={HERO_IMAGES[currentImage]} 
            alt="Luxury Real Estate" 
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent" />
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
            <Shield size={14} className="text-gold" />
            <span className="text-[10px] lg:text-xs font-bold text-gold uppercase tracking-[0.3em]">
              Licensed Florida Professional Since 2001
            </span>
          </div>

          <h1 className="text-4xl lg:text-7xl text-white mb-6 leading-[1.1] leading-tight">
            Your Home Deserves More Than Exposure. <br />
            <span className="text-gold">It Deserves Strategic Distribution.</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/80 mb-10 font-light leading-relaxed max-w-2xl">
            Carlos Uzcategui helps South Florida homeowners list with strategic positioning, 
            MLS visibility, buyer-agent reach, and local-to-international advisory 
            between Miami and Madrid.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            <a 
              href="#contact"
              className="px-8 py-5 bg-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-300 shadow-xl shadow-navy/20 flex items-center justify-center gap-2 group"
            >
              Request a Property strategy call
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-5 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Connect on WhatsApp
            </a>
          </div>

          {/* Proof Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "25+ Years", sub: "Experience" },
              { label: "United Realty", sub: "Group Network" },
              { label: "CLHMS", sub: "Luxury Specialist" },
              { label: "Miami ↔ Madrid", sub: "International Desk" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl lg:text-2xl font-serif text-white">{stat.label}</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">{stat.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
