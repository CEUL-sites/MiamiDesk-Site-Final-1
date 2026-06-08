import { motion } from "motion/react";
import { Users, Globe2, BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

// Block 6 — Carlos in his own voice as the listing principal. Two ideas:
// (1) the open multi-agency / team model as a trust differentiator, and
// (2) the dual role of local listing agent + international distribution partner.
// No hard percentages (use "the vast majority"), no referral-fee figures.

const CREDENTIALS = [
  "25 Years · Licensed Since 2001",
  "CLHMS · Luxury Certified",
  "Certified Seller Representative",
  "Bilingual · English & Spanish",
  "United Realty Group Principal",
];

export function HowCarlosWorks() {
  return (
    <section id="how-i-work" className="bg-navy-deep py-16 md:py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            How I Work
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">
            A listing principal who works in teams —{" "}
            <em className="not-italic italic text-gold">and across two markets.</em>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* 1 — Team / multi-agency model */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col border border-white/10 bg-white/[0.03] p-8"
          >
            <Users size={22} className="text-gold" />
            <h3 className="mt-5 font-serif text-2xl text-white">
              The strongest offer usually arrives with the buyer's own agent.
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/65">
              Twenty-five years representing South Florida sellers taught me a simple lesson: you
              work in teams with other agents. The vast majority of strong offers come through a
              buyer's own agent — so cooperating openly with agents across many agencies, not only
              United Realty Group, is part of delivering professional service to a homeowner. It
              widens the qualified-buyer field instead of narrowing it.
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/45">
              That is the opposite of keeping a listing in-house. The objective is the best outcome
              for the seller, and the best outcome lives in the widest professional network.
            </p>
          </motion.div>

          {/* 2 — Dual role */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col border border-white/10 bg-white/[0.03] p-8"
          >
            <Globe2 size={22} className="text-gold" />
            <h3 className="mt-5 font-serif text-2xl text-white">
              Local listing agent — and international distribution partner.
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/65">
              I am an active listing agent in South Florida, representing homeowners directly since
              2001. I also represent prime properties under agreement with international real estate
              agencies and developers, placing their inventory on the Miami MLS, with referral
              cooperation coordinated through United Realty Group as the licensed Florida broker.
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/45">
              The bilateral role is the point: it widens reach for my South Florida sellers and for
              the international partners whose inventory I bring into the American market.
            </p>
          </motion.div>
        </div>

        {/* First-person pull quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 max-w-3xl border-l-2 border-gold pl-6"
        >
          <p className="font-serif text-xl italic leading-relaxed text-white/85 md:text-2xl">
            "My job is not to hold a listing. It is to put it in front of every agent who might
            represent the right buyer — here in South Florida and abroad."
          </p>
          <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
            Carlos Uzcategui · United Realty Group
          </footer>
        </motion.blockquote>

        {/* Credentials row */}
        <div className="mt-12 flex flex-wrap gap-3">
          {CREDENTIALS.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 border border-gold/25 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65"
            >
              <BadgeCheck size={13} className="flex-shrink-0 text-gold" />
              {c}
            </span>
          ))}
        </div>

        {/* CTA + compliance */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/sell-south-florida#contact"
            className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Request a seller strategy review →
          </a>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
            {CONTACT.shortLicense} · United Realty Group · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </section>
  );
}
