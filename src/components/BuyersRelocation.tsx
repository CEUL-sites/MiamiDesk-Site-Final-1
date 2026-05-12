import { motion } from "motion/react";
import { Compass, BarChart3, PlaneLanding } from "lucide-react";

const CARDS = [
  {
    icon: Compass,
    title: "Strategic Acquisitions",
    desc: "Neighborhood intelligence, offer structure, and local market insight refined by 25 years of institutional-grade Florida real estate experience."
  },
  {
    icon: BarChart3,
    title: "Portfolio Positioning",
    desc: "Analytical support for investors comparing asset types, location fundamentals, and long-term capital positioning across South Florida and Madrid."
  },
  {
    icon: PlaneLanding,
    title: "International Relocation",
    desc: "A bilingual advisory bridge for clients moving between South Florida and Spain, offering professional referrals tailored to cross-border transitions."
  }
];

export function BuyersRelocation() {
  return (
    <section id="buyers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl lg:text-5xl text-navy mb-6 leading-tight font-serif">
            Advisory for Acquisitions, Portfolios, <br />
            <span className="text-gold italic font-light">& Global Relocation.</span>
          </h2>
          <p className="text-lg text-navy/70 leading-relaxed max-w-2xl">
            Your purchase strategy is as important as your listing strategy. Carlos provides 
             the local intelligence needed to navigate neighborhood shifts, investment 
            fundamentals, and international transitions across South Florida and Spain.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {CARDS.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              <div className="text-gold mb-6 border-b-2 border-gold/10 pb-4 w-full">
                <card.icon size={32} />
              </div>
              <h3 className="text-2xl font-serif text-navy mb-4 italic">{card.title}</h3>
              <p className="text-navy/60 leading-relaxed mb-6">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-navy font-bold uppercase tracking-widest group border-b-2 border-gold/30 pb-1 hover:border-gold transition-all"
            >
                Ask About South Florida or Spain
                <Compass size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  );
}
