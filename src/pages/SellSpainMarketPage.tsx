import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SpainSellerForm } from "../components/forms/SpainSellerForm";
import { FaqAccordion } from "../components/FaqAccordion";
import { CONTACT } from "../constants";
import { getSpainMarket, SPAIN_MARKETS, SPAIN_STRUCTURE } from "../data/spainMarkets";

// ──────────────────────────────────────────────────────────────────────────
// Spanish-language /vender-<market> landing pages — the Spain-side
// counterpart to the English /sell-<city> South Florida pages. One template,
// driven entirely by a SpainMarket record (src/data/spainMarkets.ts).
//
// COMPLIANCE — do not add to this file without re-reading CLAUDE.md:
//   · The ONLY figures allowed anywhere on this page are NETWORK_FIGURES
//     below, verbatim. No prices, no percentages, no "days on market", no
//     invented market statistics of any kind.
//   · Carlos is licensed in FLORIDA ONLY — never state or imply Spanish
//     licensure. SPAIN_STRUCTURE (rendered verbatim in its own section) is
//     the compliance spine of this page and is not optional.
//   · No guarantee of sale, price, buyer, or timeline anywhere in this file.
// ──────────────────────────────────────────────────────────────────────────

/** Verified network figures — src/data/figures.json is the source of truth.
 *  These are the ONLY numbers permitted on this page. Do not add, remove, or
 *  reword any of them without checking figures.json first. */
const NETWORK_FIGURES: { value: string; label: string }[] = [
  { value: "93.000", label: "agentes miembros" },
  { value: "200+", label: "portales globales" },
  { value: "19", label: "idiomas" },
  { value: "260+", label: "MLS de EE. UU. vía RPR" },
  { value: "437+", label: "acuerdos internacionales" },
  { value: "3.500+", label: "agentes de United Realty Group" },
];

/** Market-agnostic — same four steps regardless of which SpainMarket renders this page. */
const HOW_IT_WORKS: { title: string; text: string }[] = [
  {
    title: "Envíe la propiedad",
    text: "Una sola propiedad o una cartera. Sin compromiso — Carlos revisa cada solicitud personalmente.",
  },
  {
    title: "Propuesta por escrito",
    text: "Vía de representación — exclusiva o plan de activación — con alcance y términos detallados en propuesta privada.",
  },
  {
    title: "Preparación bilingüe",
    text: "Ficha técnica y materiales en español e inglés, listos para que un agente comprador los evalúe y reenvíe a su cliente.",
  },
  {
    title: "Cooperación profesional",
    text: "La cooperación se estructura operación por operación, a través de United Realty Group, preservando su representación local en España.",
  },
];

export default function SellSpainMarketPage({ slug }: { slug: string }) {
  const market = getSpainMarket(slug);
  if (!market) return null;

  const pageUrl = `https://homesprofessional.com/${market.slug}`;
  const otherMarkets = SPAIN_MARKETS.filter((m) => m.slug !== market.slug);

  return (
    <>
      <Helmet>
        <title>{market.title}</title>
        <meta name="description" content={market.description} />
        <meta name="keywords" content={market.keywords} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={market.title} />
        <meta property="og:description" content={market.description} />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={market.title} />
        <meta name="twitter:description" content={market.description} />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="es" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      </Helmet>

      <JsonLd
        id={`${market.slug}-breadcrumb`}
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Miami Global Listing Desk",
              item: "https://homesprofessional.com/global-desk",
            },
            { "@type": "ListItem", position: 3, name: market.name, item: pageUrl },
          ],
        }}
      />
      <JsonLd
        id={`${market.slug}-faq`}
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: market.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
      <JsonLd
        id={`${market.slug}-service`}
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Preparación y activación internacional de propiedad — ${market.name}`,
          serviceType: "International property distribution and buyer-agent activation",
          // The service is delivered from South Florida. The Spanish market
          // is named in `name` and throughout the visible copy, which is where
          // it belongs — a structured City/addressCountry:"ES" claimed a
          // Spanish service area for a Florida-only licensee.
          areaServed: "South Florida",
          provider: {
            "@type": "RealEstateAgent",
            name: "Carlos Uzcategui",
            url: pageUrl,
          },
          url: pageUrl,
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo
            idle
            src="/videos/madrid_piso_entrance.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {market.name} · {market.region}
            </p>
            <h1
              className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
            >
              Presente su propiedad de {market.name}
              <br />
              <em className="italic text-gold">{market.heroTitle}</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">{market.heroSub}</p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Carlos Uzcategui · Florida Realtor® SL705771 · United Realty Group
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#consulta"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Solicitar valoración de encaje
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                WhatsApp España
              </a>
            </div>
          </div>
        </section>

        {/* Why this market */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {market.name} · {market.region}
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              {market.whyHeading}
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">{market.whyBody}</p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {market.cards.map((card) => (
                <div key={card.label} className="bg-white p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{card.label}</p>
                  <p className="mt-3 font-serif text-2xl text-navy-deep">{card.value}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Submarkets */}
        <section className="bg-ivory pb-14 md:pb-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cobertura local</p>
            <h3 className="mt-3 font-serif text-xl text-navy-deep md:text-2xl">
              Zonas de {market.name} que preparamos
            </h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {market.submarkets.map((sub) => (
                <span
                  key={sub}
                  className="border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-primary/60"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Miami link */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">La conexión con Miami</p>
            <blockquote className="mt-6 max-w-3xl border-l-2 border-gold/30 pl-6">
              <p className="font-serif text-2xl leading-snug text-white md:text-3xl">{market.miamiLink}</p>
            </blockquote>
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-3 md:grid-cols-6">
              {NETWORK_FIGURES.map((f) => (
                <div key={f.label}>
                  <p className="font-serif text-2xl text-gold md:text-3xl">{f.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/60">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="bg-white-soft py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cómo funciona</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              El proceso, en cuatro pasos.
            </h2>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="bg-white p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Paso {i + 1}</p>
                  <p className="mt-3 font-serif text-lg text-navy-deep">{step.title}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Structure & compliance — mandatory on every Spain page */}
        <section className="bg-ivory py-12 md:py-16 border-y border-hairline">
          <div className="mx-auto max-w-4xl px-6">
            <div className="border border-gold/30 bg-white p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Estructura y cumplimiento</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink-primary/70">{SPAIN_STRUCTURE}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gold/20 bg-navy py-12 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Preguntas de propietarios en {market.name}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Preguntas frecuentes.</h2>
            </div>
            <FaqAccordion faqs={market.faqs} />
          </div>
        </section>

        {/* Confidential intake */}
        <section id="consulta" className="bg-navy-deep py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Consulta confidencial</p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Solicite una valoración de encaje para su propiedad en {market.name}.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Sin compromiso. Carlos revisa cada consulta personalmente antes de responder.
              </p>
            </div>
            <div className="mx-auto max-w-xl">
              <SpainSellerForm lang="es" sourcePage={market.slug} presetLocation={market.name} />
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="bg-ivory py-10 md:py-14 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Más recursos</p>
            <a href="/global-desk" className="inline-flex items-center gap-1.5 font-serif text-lg text-navy-deep hover:text-gold">
              Miami Global Listing Desk — el marco completo
              <ChevronRight size={16} />
            </a>
            {otherMarkets.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {otherMarkets.map((m) => (
                  <a
                    key={m.slug}
                    href={`/${m.slug}`}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-primary/60 hover:text-gold"
                  >
                    {m.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/70">
              <a href="/" className="hover:text-gold">Home</a>
              {" · "}
              <a href="/global-desk" className="hover:text-gold">Miami Global Listing Desk</a>
              {" · "}
              {market.name}
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
