import { motion } from "motion/react";
import { SOURCES } from "../constants";

const CHANNELS = [
  {
    number: "01",
    title: "Public Exposure",
    body: "MLS activation, portal syndication to 500+ websites in 19 languages, search visibility, and professional media that earns attention from buyers actively looking in your market.",
  },
  {
    number: "02",
    title: "Professional Distribution",
    body: "Buyer agents, broker networks, referral partners, relocation advisors, and international professionals who interpret, recommend, and actively move qualified buyers toward the right property.",
  },
  {
    number: "03",
    title: "Transaction Management",
    body: "Fast response to buyer-agent inquiries, showing coordination, offer strategy, negotiation, and closing discipline — through one point of contact, from listing to keys.",
  },
];

export function BuyerAgentThesis() {
  return (
    <section className="bg-ivory py-20 md:py-28 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            How Real Estate Actually Moves
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
            Built for both markets —<br />
            <em className="not-italic italic">the public and the professional.</em>
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/65">
            Buyers may discover properties on a portal. But serious transactions move through people:
            buyer agents, brokers, relocation advisors, attorneys, lenders, and referral partners
            who interpret the listing, build buyer confidence, and execute the deal. A listing strategy
            that only generates views is incomplete.
          </p>
          <div className="mt-5 border-l-2 border-gold/40 pl-5">
            <p className="font-sans text-sm leading-relaxed text-ink-primary/60 italic">
              {SOURCES.buyerAgentStatement} That makes buyer-agent distribution
              one of the most important — and most overlooked — parts of a serious listing strategy.
            </p>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-primary/35">
              Source: {SOURCES.nar}
            </p>
          </div>
        </div>

        {/* Three channel cards */}
        <div className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <motion.div
              key={c.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-8"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-5">
                {c.number}
              </div>
              <h3 className="font-serif text-xl text-navy-deep">{c.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Anchor quote */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <p className="font-serif text-xl text-navy-deep italic leading-relaxed max-w-xl">
            "Features describe the property. Distribution determines who competes for it."
          </p>
          <a
            href="/sell-south-florida"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-navy/20 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold"
          >
            See the Listing Strategy →
          </a>
        </div>

      </div>
    </section>
  );
}
