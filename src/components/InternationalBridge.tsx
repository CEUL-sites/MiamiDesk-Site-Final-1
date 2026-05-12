import { motion } from "motion/react";
import { Plane, ChevronRight, Globe, Building2 } from "lucide-react";
import { CONTACT } from "../constants";

const OWNER_FEATURES = [
  "Strategic listing positioning",
  "International buyer awareness",
  "Bilingual advisory",
  "Referral and relocation pathways",
  "South Florida ↔ Madrid perspective"
];

const SPAIN_FEATURES = [
  "Miami / South Florida MLS strategy",
  "Agent-facing exposure",
  "U.S. and Latin America referral channels",
  "Bilingual presentation support",
  "Cross-border advisory coordination"
];

export function InternationalBridge() {
  return (
    <section id="spain" className="py-24 bg-navy text-white overflow-hidden relative">
      {/* Background Imagery Split */}
      <div className="absolute inset-0 flex opacity-20 pointer-events-none">
        <div className="w-1/2 h-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=1500&auto=format&fit=crop" 
            alt="Miami skyline representing South Florida real estate reach" 
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="w-1/2 h-full relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1543783230-27838501e02c?q=80&w=1500&auto=format&fit=crop" 
            alt="Madrid architecture representing international real estate advisory" 
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
      </div>

      {/* Route Line Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px z-0 hidden lg:block overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Plane size={24} className="text-gold opacity-30 transform rotate-90" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h2 className="text-3xl lg:text-5xl mb-8 leading-tight font-serif italic text-white">
            South Florida. Madrid. <br />
            <span className="text-gold font-light not-italic">International Buyer Pathways.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-3xl">
            For South Florida homeowners, international visibility can become part of a broader listing strategy. 
            For Spain-based sellers, developers, and agencies, our advisory desk creates a bridge into 
            South Florida’s professional real estate ecosystem, including MLS positioning, 
            agent-facing exposure, and referral-driven conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Column 1: Owners */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-white/5 border-l-4 border-gold backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <Globe className="text-gold" size={28} />
              <h3 className="text-2xl font-serif">For South Florida Owners</h3>
            </div>
            <ul className="space-y-4">
              {OWNER_FEATURES.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Spain Developers */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 bg-white/5 border-r-4 border-gold backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <Building2 className="text-gold" size={28} />
              <h3 className="text-2xl font-serif">For Spain Sellers & Agencies</h3>
            </div>
            <ul className="space-y-4">
              {SPAIN_FEATURES.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center">
            <a 
              href={CONTACT.whatsappSpain}
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-gold text-navy font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300 shadow-2xl shadow-gold/20 flex items-center gap-2 group"
            >
                Ask About South Florida or Spain
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="mt-8 text-[10px] uppercase tracking-widest text-white/30 max-w-xl text-center leading-loose">
              Cross-border marketing is subject to local brokerage regulations, tax laws, and MLS compliance. 
              Strategy is tailored to individual asset profiles and legal jurisdiction requirements.
            </p>
        </div>
      </div>
    </section>
  );
}
