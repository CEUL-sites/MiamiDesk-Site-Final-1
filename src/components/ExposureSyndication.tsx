import { motion } from "motion/react";

const CHANNELS = [
  "MLS Positioning",
  "Brokerage Network",
  "Buyer-Agent Visibility",
  "Digital Syndication",
  "International Referral Channels",
  "South Florida ↔ Madrid Activation",
  "Zillow Group",
  "Realtor.com Network",
  "Redfin Visibility",
  "Idealista Spain",
  "Juwai Global",
  "Mansion Global",
  "LuxuryRealEstate.com",
  "JamesEdition",
  "Wall Street Journal",
  "Financial Times"
];

export const ExposureSyndication = () => {
  return (
    <section className="py-20 bg-white border-y border-bone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="max-w-4xl">
          <h2 className="text-3xl lg:text-4xl text-navy mb-6 font-serif">
            Professional Visibility Beyond a Single Website
          </h2>
          <p className="text-lg text-navy/70 leading-relaxed max-w-3xl">
            A strong listing strategy combines MLS accuracy, buyer-agent visibility, 
            brokerage reach, digital syndication, and international referral channels. 
            Online exposure matters, but it works best when paired with professional 
            positioning and active follow-up.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        
        <div className="flex whitespace-nowrap overflow-hidden py-8 border-y border-gold/10">
          <motion.div 
            className="flex gap-12 items-center"
            animate={{ 
              x: [0, -1000],
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...CHANNELS, ...CHANNELS].map((channel, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="text-navy/30 font-serif lowercase italic text-lg px-2">
                  {channel}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <p className="text-xs text-navy/30 uppercase tracking-[0.3em] font-bold">
          Strategic Distribution · Professional Positioning · Active Follow-up
        </p>
      </div>
    </section>
  );
};
