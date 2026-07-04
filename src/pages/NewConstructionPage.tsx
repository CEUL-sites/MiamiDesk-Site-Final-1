import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SellerCtaBand } from "../components/SellerCtaBand";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { NeoEmbed } from "../components/NeoEmbed";
import { CONTACT } from "../constants";

export default function NewConstructionPage() {
  return (
    <>
      <Helmet>
        <title>New Construction | Florida Pre-Construction Inventory | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Florida pre-construction inventory, professionally accessed. Advisory for international buyers and developers. Carlos Uzcategui, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/new-construction" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <main id="main-content" className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ── Positioning hero ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pre-Construction · South Florida</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}>
              Florida pre-construction inventory,<br />
              <em className="italic text-gold">professionally accessed.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/60">
              New-development inventory across South Florida, accessed through United Realty Group and the Miami and
              South Florida REALTORS® network. Advisory representation for international buyers and for Spanish and
              Latin American developers entering the U.S. market.
            </p>
          </div>
        </section>

        {/* ── NEO embed ────────────────────────────────────────── */}
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="w-full overflow-hidden">
              <NeoEmbed lang="en" />
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/70">
              Live pre-construction inventory via NEO · newestateonly.com
            </p>
            <p className="mt-3 text-center font-sans text-[10px] leading-relaxed text-ink-primary/70 max-w-3xl mx-auto">
              Inventory availability, pricing, compensation, project details, and broker participation are subject to change without notice. Information presented is provided by third-party sources and is deemed reliable but not guaranteed. Consult with a licensed professional before making any purchase decision.
            </p>
          </div>
        </section>

        {/* ── Carlos commentary ────────────────────────────────── */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Advisory positioning</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">
              For developers and international buyers.
            </h2>
            <div className="mt-6 space-y-5 font-sans text-[17px] leading-[1.7] text-white/70">
              <p>
                Pre-construction is a different transaction from resale. Deposit structures, delivery timelines, developer
                reputation, and assignment terms determine outcome as much as price. International buyers — particularly
                from Spain and Latin America — need representation that reads those terms, not just a unit list.
              </p>
              <p>
                For Spanish and Latin American developers, Carlos provides a licensed Florida channel into the Miami MLS
                ecosystem and the international referral network — the same structural distribution behind every listing
                represented here.
              </p>
            </div>
            <div className="mt-10">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Request a Pre-Construction Consultation
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                Direct / WhatsApp: {CONTACT.phoneUSDisplay}
              </p>
            </div>
          </div>
        </section>

        <SellerCtaBand />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
