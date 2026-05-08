import { motion } from "motion/react";
import { Globe, Building2, UserCheck, Share2 } from "lucide-react";

const CARDS = [
  {
    icon: Building2,
    title: "For Spanish Agencies",
    desc: "Introduce selected inventory to a South Florida-facing advisory and referral channel."
  },
  {
    icon: Globe,
    title: "For Developers",
    desc: "Position new development opportunities for international buyer and investor conversations."
  },
  {
    icon: UserCheck,
    title: "For Private Sellers",
    desc: "Explore discreet international exposure strategies through a professional real estate advisor."
  },
  {
    icon: Share2,
    title: "For Referral Partners",
    desc: "Coordinate qualified introductions between Florida, Spain, and international markets."
  }
];

export function InternationalBridge() {
  return (
    <section id="spain" className="py-24 bg-navy text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop" 
            alt="Madrid Architecture" 
            className="h-full object-cover grayscale"
          />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <h2 className="text-3xl lg:text-5xl mb-6 leading-tight">
            Spain Inventory. South Florida Visibility. <br />
            <span className="text-gold">One Cross-Border Advisory Desk.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            For selected sellers, developers, and agencies in Spain, Carlos helps create 
            a professional bridge into South Florida’s real estate network, Miami-facing 
            agent relationships, and international referral channels.
          </p>
          <div className="h-1 w-24 bg-gold"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {CARDS.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-navy hover:bg-navy/80 transition-all group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform origin-left duration-500">
                <card.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col lg:flex-row lg:items-center gap-10">
            <a 
              href="#contact"
              className="px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all duration-300 text-center"
            >
                Discuss Spain / International Exposure
            </a>
            <p className="text-[10px] uppercase tracking-widest text-white/40 max-w-md leading-loose">
                International property promotion is subject to brokerage, MLS, advertising, and local legal compliance. Strategy is defined after professional review.
            </p>
        </div>
      </div>
    </section>
  );
}
