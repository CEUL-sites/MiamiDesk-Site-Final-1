import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT, NEO } from "../constants";

// Section 9 — NEO (New Estate Only) pre-construction embed.
// NEO uses a script loader that populates #NEOiframe (newestateonly.com).
function NeoEmbed({ lang = "en" }: { lang?: "en" | "es" }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = NEO.loader;
    script.setAttribute("data-neokey", NEO.key);
    script.setAttribute("data-neolang", lang);
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [lang]);

  return (
    <iframe
      id="NEOiframe"
      title="MIAMI NEO — New Estate Only pre-construction inventory"
      loading="lazy"
      style={{ width: "100%", height: "200vh", border: "none" }}
    />
  );
}

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
            <div className="w-full overflow-hidden">
              <NeoEmbed lang="en" />
            </div>
            <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-ink-primary/40">
              Live pre-construction inventory via NEO · newestateonly.com
            </p>
          </div>
        </section>

        {/* ── Advisory CTA ─────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Advisory</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">
              Deposit structures. Timelines. Assignment terms.
            </h2>
            <p className="mt-5 font-sans text-[17px] leading-[1.7] text-white/65">
              Pre-construction is a different transaction from resale. International buyers need representation that reads the terms — not just the unit list.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Request a Consultation
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                WhatsApp: {CONTACT.phoneUSDisplay}
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
