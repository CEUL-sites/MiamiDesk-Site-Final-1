import { Helmet } from "react-helmet-async";
import { BadgeCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { MLSTicker } from "../components/MLSTicker";
import { NeoListingsEmbed } from "../components/NeoListingsEmbed";
import { PropertyMarketFeed } from "../components/PropertyMarketFeed";
import { ListingsBrowser } from "../components/listings/ListingsBrowser";
import { CONTACT } from "../constants";

export default function ListingsPage() {
  return (
    <>
      <Helmet>
        <title>South Florida Listings — New Developments + Active MLS | United Realty Group</title>
        <meta
          name="description"
          content="Browse pre-construction developments and active MLS listings across Miami-Dade, Broward & Palm Beach. Carlos Uzcategui, FL SL705771, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/listings" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta property="og:title" content="South Florida Listings — New Developments + Active MLS" />
        <meta property="og:url" content="https://homesprofessional.com/listings" />
      </Helmet>

      <main className="min-h-screen bg-navy-deep grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Page header ───────────────────────────────────────── */}
        <section className="bg-navy-deep px-6 pt-28 pb-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Property Search · United Realty Group
          </p>
          <h1
            className="mx-auto mt-5 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5vw, 4rem)" }}
          >
            Search Live South Florida MLS Listings
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Search the live Miami and South Florida REALTORS® MLS, plus new
            pre-construction developments — Miami-Dade, Broward, and Palm Beach.
          </p>
          <div className="mt-8">
            <a
              href="#search"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Search Active Listings
            </a>
          </div>
          <div className="mt-7 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="flex-shrink-0 text-gold" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              {CONTACT.licenseDisplay} · Equal Housing Opportunity
            </span>
          </div>
        </section>

        {/* ── Live MLS ticker strip ─────────────────────────────── */}
        <MLSTicker />

        {/* ── Searchable live MLS browser (Bridge IDX proxy) ─────── */}
        <ListingsBrowser />

        {/* ── Weston market feed (weekly-cached Bridge API data) ── */}
        <PropertyMarketFeed />

        {/* ── NEO new developments iframe ──────────────────────── */}
        <section className="bg-white">
          {/* Section header band */}
          <div className="border-b border-gold/20 bg-navy-deep px-6 py-5">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                  New Pre-Construction Developments
                </p>
                <p className="mt-1 font-sans text-xs text-white/40">
                  Miami Realtor Association · Powered by New Estate Only
                </p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                FL SL705771 · {CONTACT.brokerage}
              </span>
            </div>
          </div>

          {/* NEO iframe — loads asynchronously, targets the iframe by id */}
          <NeoListingsEmbed />
        </section>

        {/* ── Buyer CTA ─────────────────────────────────────────── */}
        <section className="bg-navy-deep px-6 py-12 text-center md:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Buyer Representation
          </p>
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl text-white">
            Found something worth exploring?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/55">
            Our team arranges private showings, negotiates on your behalf, and guides
            you through every step. Buyer representation at no additional cost to you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/buy"
              className="inline-flex items-center bg-gold px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-gold-soft"
            >
              Start Buyer Process
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/25 px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              WhatsApp Our Team
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Equal Housing Opportunity
          </p>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
