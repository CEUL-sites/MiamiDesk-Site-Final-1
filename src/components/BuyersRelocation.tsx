import { Compass } from "lucide-react";
import { motion } from "motion/react";

const CARDS = [
  {
    number: "01",
    title: "LATAM Buyer Awareness",
    desc: "South Florida's luxury segment draws significant demand from Latin American markets. Carlos's professional relationships in this buyer universe, built through two decades of active transactions, benefit sellers who need the right buyers to find their listing.",
    tag: "MIAMI-DADE · BROWARD · PALM BEACH"
  },
  {
    number: "02",
    title: "International Referral Network",
    desc: "Active professional connections in Madrid and Latin American markets create referral pathways that extend the visibility of South Florida listings well beyond local buyer pools.",
    tag: "MIAMI ↔ MADRID · INTERNATIONAL"
  },
  {
    number: "03",
    title: "Cross-Border Positioning",
    desc: "Bilingual advisory support and cross-market intelligence for listings with international appeal — contextualized for buyers from Spain, Latin America, and global relocation markets.",
    tag: "BILINGUAL · ENGLISH · ESPAÑOL"
  }
];

export function BuyersRelocation() {
  return (
    <section id="buyers" className="relative overflow-hidden bg-bone-warm py-14 md:py-24">
      {/* Background — subtle texture via gradient, photo fades in on top when available */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(176,141,87,0.06),transparent_60%)]" />
      <div className="absolute inset-0">
        <img
          src="/images/brickell-aerial.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-0 transition-opacity duration-700"
          onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.10"; }}
        />
        <div className="absolute inset-0 bg-bone-warm/80" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy/55">Seller Advantage · International Demand</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-navy lg:text-5xl">
            Your South Florida Property.<br />
            <span className="italic text-gold">The Broadest Buyer Reach.</span>
          </h2>
          <p className="mt-7 font-sans text-lg leading-relaxed text-navy/65">
            South Florida's luxury market draws buyers from Latin America, Europe, and global relocation markets. Carlos's 25 years of market presence include the buyer-side relationships that make listings visible to the right audiences — not just the nearest ones.
          </p>
          <a href="#contact" className="group mt-9 inline-flex items-center gap-2 border-b border-gold pb-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:text-gold">
            Ask About International Reach
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
