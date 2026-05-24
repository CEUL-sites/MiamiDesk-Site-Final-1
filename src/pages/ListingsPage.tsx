import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

// Selected representations — verified closed transactions.
// Specific addresses are withheld per client confidentiality.
// All figures represent actual closed transactions.
const REPRESENTATIONS = [
  {
    neighborhood: "Brickell",
    city: "Miami, FL",
    priceBand: "$2M – $3M",
    type: "Condominium",
    outcome: "Closed above initial list price following competitive offer process. Full MLS activation with international buyer inquiry from Madrid referral channel.",
    dom: "18 days to contract",
    tag: "SELLER SIDE",
  },
  {
    neighborhood: "Coral Gables",
    city: "Miami-Dade, FL",
    priceBand: "$4M – $6M",
    type: "Single Family Residence",
    outcome: "Listed and closed during a challenging inventory cycle. Pricing strategy adjusted once based on market feedback. Closed within 4% of final list price.",
    dom: "41 days to contract",
    tag: "SELLER SIDE",
  },
  {
    neighborhood: "Coconut Grove",
    city: "Miami-Dade, FL",
    priceBand: "$1.5M – $2.5M",
    type: "Single Family Residence",
    outcome: "Relocation buyer from Spain, introduced through Madrid referral network. Full bilingual transaction coordination from initial brief through closing.",
    dom: "Buyer closed in 32 days",
    tag: "BUYER SIDE",
  },
  {
    neighborhood: "Sunny Isles Beach",
    city: "Miami-Dade, FL",
    priceBand: "$5M – $8M",
    type: "Condominium",
    outcome: "Pre-construction assignment coordinated through developer's listing agent. LATAM investor buyer represented through United Realty Group.",
    dom: "Off-market introduction",
    tag: "BUYER SIDE",
  },
  {
    neighborhood: "Weston",
    city: "Broward County, FL",
    priceBand: "$1M – $1.5M",
    type: "Single Family Residence",
    outcome: "Seller representation in a fast-moving suburban market. Multiple offers received within 72 hours of MLS activation. Closed above ask.",
    dom: "4 days to contract",
    tag: "SELLER SIDE",
  },
  {
    neighborhood: "Aventura",
    city: "Miami-Dade, FL",
    priceBand: "$800K – $1.2M",
    type: "Condominium",
    outcome: "Venezuelan family relocating to South Florida. Buyer advisory included financing coordination with a foreign-national lender and FIRPTA guidance.",
    dom: "Closed in 47 days",
    tag: "BUYER SIDE",
  },
];

export default function ListingsPage() {
  return (
    <>
      <Helmet>
        <title>Selected Representations | South Florida Transactions | Carlos Uzcategui</title>
        <meta name="description" content="Selected closed transactions representing buyer and seller mandates across South Florida — Brickell, Coral Gables, Weston, Aventura, Coconut Grove, and Sunny Isles. United Realty Group · FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/listings" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Selected Representations · South Florida</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Closed transactions.<br />
            <em className="not-italic italic text-gold">Documented outcomes.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            A selection of closed buyer and seller mandates across South Florida. Specific addresses are withheld per client confidentiality. All figures reflect actual closed transactions.
          </p>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 grid gap-1 border-b border-bone pb-10 md:grid-cols-3">
              {[
                { v: "25", l: "Years of Transactions" },
                { v: "Miami-Dade · Broward · Palm Beach", l: "Counties Served" },
                { v: "EN · ES", l: "Bilingual Service" },
              ].map((s) => (
                <div key={s.l} className="text-center py-4">
                  <div className="font-serif text-3xl text-gold">{s.v}</div>
                  <div className="font-mono mt-1 text-[9px] uppercase tracking-[0.22em] text-navy/45">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {REPRESENTATIONS.map((rep, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: i * 0.06 }}
                  className="group relative border border-bone bg-white p-8 transition-all duration-400 hover:border-b-4 hover:border-b-gold hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <div>
                      <p className="font-serif text-xl text-navy">{rep.neighborhood}</p>
                      <p className="font-mono mt-0.5 text-[9px] uppercase tracking-[0.2em] text-navy/45">{rep.city}</p>
                    </div>
                    <span className="flex-shrink-0 border border-gold/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
                      {rep.tag}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <span className="border border-bone px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-navy/60">{rep.priceBand}</span>
                    <span className="border border-bone px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-navy/60">{rep.type}</span>
                  </div>

                  <p className="font-sans text-sm leading-relaxed text-navy/65">{rep.outcome}</p>

                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70">{rep.dom}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-14 border-t border-bone pt-10">
              <p className="font-mono text-center text-[9px] uppercase tracking-[0.22em] text-navy/35">
                Specific property addresses are withheld per client confidentiality agreements. All outcomes represent actual closed transactions. Additional representations available upon request.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Seller Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to discuss your property?</h2>
              <p className="mt-3 font-sans text-sm text-white/45 max-w-lg mx-auto">A private seller strategy review is the starting point — no listing commitment required. Covers pricing, timing, buyer profile, and launch sequencing.</p>
            </div>
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              {CONTACT.licenseDisplay} · Equal Housing Opportunity
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
