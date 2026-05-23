import { motion } from "motion/react";
import { CONTACT } from "../constants";

const CARDS = [
  {
    number: "01",
    title: "Active Market Coverage",
    desc: "Every active listing across Miami-Dade, Broward, and Palm Beach — residential, condo, new construction, and off-market — accessible from day one of your search.",
    tag: "MIAMI-DADE · BROWARD · PALM BEACH"
  },
  {
    number: "02",
    title: "Local Agent Network",
    desc: "United Realty Group's 3,500+ agents across 19 offices operate on the ground across South Florida. They know the inventory, the sellers, and the neighborhoods — before listings hit the public portals.",
    tag: "19 OFFICES · 3,500+ AGENTS"
  },
  {
    number: "03",
    title: "25 Years of Relationships",
    desc: "Buyer representation backed by 25 years of active South Florida transactions. The right property is identified faster when the agent knows the market — and the people inside it.",
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-navy/55">Buyer Advisory · South Florida</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-navy lg:text-5xl">
            The right property.<br />
            <span className="italic text-gold">The right representation.</span>
          </h2>
          <p className="mt-7 font-sans text-lg leading-relaxed text-navy/65">
            South Florida's active inventory spans Miami-Dade, Broward, and Palm Beach — three counties, thousands of listings, and a market that moves fast. Carlos provides buyer representation backed by 25 years of local relationships and United Realty Group's 3,500+ agents across 19 offices — agents on the ground who know the inventory, the sellers, and the neighborhoods. Every active MLS listing across the region is accessible from day one.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 bg-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90">
              Brief Your Search →
            </a>
            <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-navy/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-colors hover:border-gold hover:text-gold">
              WhatsApp Carlos →
            </a>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-center opacity-40 mt-4">United Realty Group · CLHMS · FL SL705771 · Buyer representation across Miami-Dade, Broward &amp; Palm Beach</p>
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
