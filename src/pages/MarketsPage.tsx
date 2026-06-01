import { Helmet } from "react-helmet-async";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { NewConstructionTicker } from "../components/NewConstructionTicker";
import { CONTACT } from "../constants";

// Consolidated Markets advisory page (replaces the per-city /market/[city] pages).
const COUNTIES = [
  { name: "Miami-Dade", note: "Brickell, Coral Gables, Aventura, Doral, Miami Beach, Coconut Grove and the urban core — the entry point for international capital." },
  { name: "Broward", note: "Fort Lauderdale, Weston, Plantation, Parkland and the coastal corridor — domestic relocation and move-up demand." },
  { name: "Palm Beach", note: "Boca Raton, Delray Beach, West Palm Beach — financial-sector migration and seasonal luxury." },
  { name: "St. Lucie & Martin", note: "The northern edge of the merged MLS footprint — emerging value and new construction." },
];

const PILLARS = [
  {
    title: "Pricing discipline",
    body: "Comparable analysis and absorption data set the number. Overpriced inventory accumulates days on market and ultimately closes below a correctly set initial ask.",
  },
  {
    title: "Structural distribution",
    body: "Listing through a Miami and South Florida REALTORS® member places the property inside the third-largest MLS in the United States — 93,000 member agents, 200+ global websites in 19 languages.",
  },
  {
    title: "International demand",
    body: "An international referral network of 1 million+ professionals across 300+ partner associations in 70+ countries reaches the agents who represent Latin American, European, and Spanish buyers.",
  },
];

export default function MarketsPage() {
  return (
    <>
      <Helmet>
        <title>South Florida Market Intelligence | Miami, Broward, Palm Beach | Carlos Uzcategui</title>
        <meta
          name="description"
          content="South Florida market positioning across Miami-Dade, Broward, Palm Beach, St. Lucie and Martin — pricing discipline, MLS distribution, and international demand. Carlos Uzcategui, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/markets" />
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida · Madrid · International</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}>
              Market intelligence,<br />
              <em className="not-italic italic text-gold">read for the seller.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/60">
              Senior seller representation across the Miami and South Florida REALTORS® footprint — Miami-Dade, Broward,
              Palm Beach, St. Lucie and parts of Martin counties — with the structural distribution and international
              demand behind every listing.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Request a Private Seller Strategy Review
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
                <MessageSquare size={15} /> WhatsApp Carlos directly
              </a>
            </div>
            <div className="mt-12"><MiamiRealtorsBadge variant="dark" /></div>
          </div>
        </section>

        {/* Counties */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The footprint</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              One MLS. Five counties. A single seller strategy.
            </h2>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {COUNTIES.map((c) => (
                <div key={c.name} className="bg-white p-8">
                  <h3 className="font-serif text-2xl text-navy-deep">{c.name}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-primary/70">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How the strategy works</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Price, distribute, reach the right buyer.
            </h2>
            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-navy-deep p-8">
                  <h3 className="font-serif text-xl text-white">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              Live MLS market data available on request as part of every seller strategy review.
            </p>
          </div>
        </section>

        {/* New Construction */}
        <section className="bg-[#080F1C] py-0">
          <div className="mx-auto max-w-5xl px-6 pt-14 pb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">New Construction · Florida</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">
                  Florida's new buildings.
                </h2>
                <p className="mt-3 max-w-xl font-sans text-[15px] leading-[1.6] text-white/55">
                  Branded towers. Boutique oceanfront. Golf estates. Across South Florida — with representation that reads deposit structures, timelines, and assignment terms.
                </p>
              </div>
              <a
                href="/new-construction"
                className="group inline-flex shrink-0 items-center gap-2 border border-gold/50 px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Full Inventory
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <NewConstructionTicker />
          <div className="h-6" />
        </section>

        {/* Spain bridge */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cross-border</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Selling from Spain into the Miami market.
            </h2>
            <p className="mt-6 font-sans text-[17px] leading-[1.7] text-ink-primary/80">
              Spanish luxury owners list into the Miami MLS through a licensed Florida principal of record, while local buyer access continues through affiliated Madrid agencies. Both channels run simultaneously.
            </p>
            <a href="/spain-desk" className="group mt-8 inline-flex items-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep">
              Spain Desk
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
