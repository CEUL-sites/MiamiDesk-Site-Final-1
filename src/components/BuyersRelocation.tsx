import { Compass } from "lucide-react";
import { motion } from "motion/react";

const CARDS = [
  {
    number: "01",
    title: "Strategic Acquisitions",
    desc: "Neighborhood intelligence, offer structure, and local market insight refined by 25 years of institutional-grade Florida real estate experience. The right offer, at the right price, in the right timing window.",
    tag: "MIAMI-DADE · BROWARD · PALM BEACH"
  },
  {
    number: "02",
    title: "Portfolio Positioning",
    desc: "Analytical support for investors comparing asset types, location fundamentals, and long-term capital positioning across South Florida. Investment-grade thinking applied to residential and commercial assets.",
    tag: "RESIDENTIAL · COMMERCIAL · MIXED-USE"
  },
  {
    number: "03",
    title: "Cross-Border Relocation",
    desc: "A bilingual advisory bridge for clients relocating between South Florida and Spain, with professional referrals, market comparison, and transition support tailored to cross-border decisions.",
    tag: "MIAMI ↔ MADRID · BILINGUAL"
  }
];

export function BuyersRelocation() {
  return (
    <section id="buyers" className="bg-bone-warm py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy/55">Buyer Advisory · LATAM Bridge</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-navy lg:text-6xl">
            25 years of LATAM relationships.<br />
            <span className="italic text-gold">Insider Miami access.</span>
          </h2>
          <p className="mt-7 font-sans text-lg leading-relaxed text-navy/65">
            The buyer side of South Florida's luxury market is dominated by Latin American capital. Carlos's client relationships in this segment were built deal by deal over two decades, not through marketing campaigns. If you are buying in Miami, you want representation by someone who already knows your buyer universe.
          </p>
          <a href="#contact" className="group mt-9 inline-flex items-center gap-2 border-b border-gold pb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:text-gold">
            Ask About South Florida or Spain
            <Compass size={16} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {CARDS.map((card, index) => (
            <motion.article key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08, duration: 0.7 }} className="group relative overflow-hidden border border-bone bg-white p-7 transition-all duration-500 hover:border-b-4 hover:border-b-gold hover:shadow-2xl hover:shadow-navy/10">
              <span className="absolute -right-3 -top-2 font-serif text-[5rem] leading-none text-gold/15 transition-colors duration-500 group-hover:text-gold/35">{card.number}</span>
              <div className="relative pt-14">
                <h3 className="font-serif text-2xl text-navy">{card.title}</h3>
                <p className="mt-5 font-sans text-sm leading-relaxed text-navy/62">{card.desc}</p>
                <p className="font-mono mt-8 text-[9px] uppercase tracking-[0.2em] text-gold/80">{card.tag}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
