import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT } from "../constants";

// Section 9 — NEO (New Estate Only) pre-construction page.
// The NEO iframe URL is provided by MIAMI; set VITE_NEO_EMBED_URL at build time.
// Until configured, a labeled placeholder renders in its place.
const NEO_EMBED_URL = import.meta.env.VITE_NEO_EMBED_URL as string | undefined;

export default function NewConstructionPage() {
  return (
    <>
      <Helmet>
        <title>New Construction | Florida Pre-Construction Inventory | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Florida pre-construction inventory, professionally accessed. Advisory positioning for Spanish and Latin American developers and international buyers via Carlos Uzcategui, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/new-construction" />
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ── Positioning hero ─────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pre-Construction · South Florida</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}>
              Florida pre-construction inventory,<br />
              <em className="not-italic italic text-gold">professionally accessed.</em>
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
            {NEO_EMBED_URL ? (
              <div className="relative w-full overflow-hidden border border-hairline" style={{ minHeight: "70vh" }}>
                <iframe
                  src={NEO_EMBED_URL}
                  title="MIAMI NEO — New Estate Only pre-construction inventory"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="h-[70vh] w-full"
                  style={{ border: "0" }}
                />
              </div>
            ) : (
              <div className="flex min-h-[40vh] flex-col items-center justify-center border border-dashed border-hairline bg-bg-primary p-10 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold/70">NEO Embed</p>
                <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-ink-primary/60">
                  The MIAMI NEO (New Estate Only) inventory embed activates once the provided NEO URL is configured
                  (<span className="font-mono text-ink-primary/70">VITE_NEO_EMBED_URL</span>). Until then, pre-construction
                  inquiries are handled directly.
                </p>
              </div>
            )}
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
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                Direct / WhatsApp: {CONTACT.phoneUSDisplay}
              </p>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
