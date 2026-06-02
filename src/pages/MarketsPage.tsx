import { Helmet } from "react-helmet-async";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { Testimonials } from "../components/Testimonials";
import { CONTACT } from "../constants";

// Consolidated Markets advisory page (replaces the per-city /market/[city] pages).
const COUNTIES = [
  { name: "Miami-Dade", note: "Brickell, Coral Gables, Aventura, Doral, Miami Beach, Coconut Grove and the urban core — the entry point for international capital." },
  { name: "Broward", note: "Fort Lauderdale, Weston, Plantation, Parkland and the coastal corridor — domestic relocation and move-up demand." },
  { name: "Palm Beach", note: "Boca Raton, Delray Beach, West Palm Beach — financial-sector migration and seasonal luxury." },
  { name: "St. Lucie & Martin", note: "The northern edge of the merged MLS footprint — emerging value and new construction." },
];

const SF_NEIGHBORHOODS = [
  "Weston", "Miami", "Coral Gables", "Pinecrest", "Brickell", "Coconut Grove",
  "Fort Lauderdale", "Las Olas", "Parkland", "Boca Raton", "Aventura",
  "Sunny Isles Beach", "Bal Harbour", "Key Biscayne", "Miami Beach", "Doral",
  "Hialeah", "Hollywood", "Hallandale Beach", "Kendall", "West Palm Beach",
];

const MADRID_NEIGHBORHOODS = [
  "Salamanca", "Recoletos", "Justicia", "Retiro", "Chamberí", "Chamartín",
  "La Moraleja", "Las Tablas", "El Viso", "Almagro", "Castellana", "Chueca",
  "La Latina", "Jerónimos", "Pozuelo de Alarcón",
];

const INTL_MARKETS = [
  { region: "Spain & Portugal", note: "Madrid, Barcelona, Marbella, Lisbon — direct referral relationships with agencies and family offices." },
  { region: "Latin America", note: "Colombia, Venezuela, Argentina, Brazil, Mexico, Panama — active buyer and seller pipelines across South Florida." },
  { region: "United Kingdom & Europe", note: "London, Monaco, Zürich — UHNW and family office introductions through MIAMI Global Council associations." },
  { region: "Middle East & Gulf", note: "Dubai, Abu Dhabi, Riyadh — MIAMI Association's 437+ international agreements include Gulf-region real estate organizations." },
];

const PILLARS = [
  {
    title: "Pricing discipline",
    body: "Comparable analysis and absorption data set the number. Overpriced inventory accumulates days on market and ultimately closes below a correctly set initial ask.",
  },
  {
    title: "Structural distribution",
    body: "Listing through a Miami and South Florida REALTORS® member places the property inside the world's largest local REALTOR® association — 93,000 member agents, eligible listings on 500+ global websites in 19 languages.",
  },
  {
    title: "International demand",
    body: "An international referral network of 2 million+ professionals across 300+ partner associations in 70+ countries reaches the agents who represent Latin American, European, and Spanish buyers.",
  },
];

export default function MarketsPage() {
  return (
    <>
      <Helmet>
        <title>Markets: South Florida · Madrid · International Referral | HomesProfessional.com</title>
        <meta
          name="description"
          content="South Florida, Madrid, and international referral markets served directly, through brokerage affiliation, or through cooperating professional relationships. Carlos Uzcategui, FL SL705771, United Realty Group."
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida · Madrid & Spain · International Referral Markets</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}>
              Markets served directly,<br />
              <em className="not-italic italic text-gold">through affiliation, or referral.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/60">
              South Florida's full MLS footprint. Madrid and Spain market introductions. International referral and
              cooperating broker relationships across Latin America, Europe, and the Gulf. Distribution determines demand.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Request a Private Listing Review
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Markets</p>
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
            {/* South Florida neighborhood chips */}
            <div className="mt-12">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-navy/40 mb-5">Key markets served</p>
              <div className="flex flex-wrap gap-2">
                {SF_NEIGHBORHOODS.map((n) => (
                  <span key={n} className="inline-block border border-navy/10 bg-ivory px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/60">{n}</span>
                ))}
              </div>
              <p className="mt-5 font-sans text-xs text-ink-primary/45 italic">Markets served directly, through brokerage affiliation, or through cooperating professional relationships.</p>
            </div>
          </div>
        </section>

        {/* Madrid & Spain Markets */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Madrid & Spain Markets</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Spain introductions through professional referral and cooperating agency relationships.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Spanish property owners, developers, and agencies seeking Miami-facing exposure are handled through compliant referral, marketing, and cooperating broker channels — not a direct sales claim in Spain. The mechanism is professional and documented.
            </p>
            {/* Madrid neighborhood chips */}
            <div className="mt-10">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 mb-5">Madrid markets referenced</p>
              <div className="flex flex-wrap gap-2">
                {MADRID_NEIGHBORHOODS.map((n) => (
                  <span key={n} className="inline-block border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">{n}</span>
                ))}
              </div>
            </div>
            <div className="mt-10 flex gap-4 flex-wrap">
              <a href="/miami-mls-international-desk" className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Miami MLS International Desk
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/developers-agencies" className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
                For Agencies & Developers
              </a>
            </div>
          </div>
        </section>

        {/* International Referral Markets */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">International Referral Markets</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Referral and cooperating broker reach into the markets that drive South Florida demand.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60">
              The Miami and South Florida REALTORS® network holds 437+ signed international agreements. Buyer-side referral introductions flow through professional brokerage coordination — not marketing promises.
            </p>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {INTL_MARKETS.map((m) => (
                <div key={m.region} className="bg-white p-8">
                  <h3 className="font-serif text-xl text-navy-deep">{m.region}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{m.note}</p>
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

        {/* International cross-border CTA */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cross-Border Distribution</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              International property owners seeking Miami-facing exposure.
            </h2>
            <p className="mt-6 font-sans text-[17px] leading-[1.7] text-ink-primary/70">
              From Spanish luxury assets to Latin American investment portfolios — if a property deserves exposure
              beyond its local market, HomesProfessional can structure a Miami-facing presentation, referral pathway,
              and distribution strategy through compliant professional channels.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="/miami-mls-international-desk" className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep">
                Miami MLS International Desk
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/developers-agencies" className="group inline-flex items-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy hover:bg-navy hover:text-white">
                For Agencies & Developers
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        <Testimonials />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
