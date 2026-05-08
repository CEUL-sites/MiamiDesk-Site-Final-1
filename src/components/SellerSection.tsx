import { motion } from "motion/react";
import { Target, Eye, Users, Gavel } from "lucide-react";

const CARDS = [
  {
    icon: Target,
    title: "Strategic Listing Positioning",
    desc: "Carlos helps define pricing, timing, presentation, and launch strategy around your property, your equity, your timeline, and current market conditions."
  },
  {
    icon: Eye,
    title: "MLS + Buyer-Agent Visibility",
    desc: "Your listing is positioned for the professional agent ecosystem where serious buyers are often advised, guided, and introduced to opportunities."
  },
  {
    icon: Users,
    title: "United Realty Group Network",
    desc: "Carlos operates within United Realty Group's broad Florida brokerage environment, with thousands of agents supporting professional cooperation."
  },
  {
    icon: Gavel,
    title: "25+ Years of Negotiation",
    desc: "Experience matters when offers, inspections, appraisals, timing, emotions, and closing terms need structure and professional protection."
  }
];

export function SellerSection() {
  return (
    <section id="sellers" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl lg:text-5xl text-navy mb-6 leading-tight">
            Selling in South Florida Is No Longer Just About Exposure. <br />
            <span className="italic text-gold font-light">It Is About Strategy.</span>
          </h2>
          <p className="text-lg text-navy/70 leading-relaxed">
            Before your property reaches the market, it needs the right strategy: 
            pricing, timing, presentation, MLS positioning, and a distribution plan 
            aligned with your objectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CARDS.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-bone shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-ivory flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                <card.icon size={24} className="text-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">{card.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
            <a 
              href="#contact"
              className="inline-block px-10 py-5 bg-navy text-white font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300"
            >
                Find Out How to Position Your Home
            </a>
            <p className="mt-6 text-xs text-navy/40 uppercase tracking-widest text-center max-w-lg">
                A private property strategy call is a professional review of timing, positioning, exposure, and next-step options.
            </p>
        </div>
      </div>
    </section>
  );
}
