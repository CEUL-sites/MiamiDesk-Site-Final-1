import { Helmet } from "react-helmet-async";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { MLSTicker } from "../components/MLSTicker";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import { BadgeCheck, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { LazyVideo } from "../components/LazyVideo";
import { NeoEmbed } from "../components/NeoEmbed";

export default function BuyersPage() {
  return (
    <>
      <Helmet>
        <title>Buy in South Florida or Spain With the Right Local Professional | HomesProfessional.com</title>
        <meta name="description" content="Buyer representation across Miami-Dade, Broward & Palm Beach — full MLS access, negotiation, closing. Bilingual EN/ES. United Realty Group · FL SL705771." />
        <meta name="keywords" content="buy home South Florida, Miami real estate buyer, Coral Gables homes for sale, Brickell condos, Miami Beach real estate, South Florida buyer agent, relocation Miami" />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/comprar" />
        <meta property="og:title" content="Buy in South Florida | Full MLS Access | Carlos Uzcategui" />
        <meta property="og:description" content="Buyer representation across Miami-Dade, Broward, and Palm Beach — full MLS access, negotiation, and closing. Bilingual English/Spanish. United Realty Group · FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/buy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy in South Florida | Full MLS Access | Carlos Uzcategui" />
        <meta name="twitter:description" content="Full MLS access, negotiation, and closing across Miami-Dade, Broward, and Palm Beach. Bilingual English/Spanish." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "South Florida Buyer Representation",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Buyer Representation",
          "description": "Full-service buyer representation including full MLS access, neighborhood analysis, offer strategy, and closing coordination across Miami-Dade, Broward, and Palm Beach counties.",
          "areaServed": "South Florida",
          "url": "https://homesprofessional.com/buy",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "description": "Free buyer consultation — no commitment required."
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Do I need a buyer's agent in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "A buyer's agent costs you nothing — the seller pays the commission. You get full MLS access, negotiation support, market analysis, and closing coordination at no cost to you." } },
            { "@type": "Question", "name": "Can I buy a home in South Florida from abroad?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in serving international buyers, particularly from Spain and Latin America. Bilingual English/Spanish representation and remote transaction management are available." } },
            { "@type": "Question", "name": "What is the buying process in Miami?", "acceptedAnswer": { "@type": "Answer", "text": "The process includes buyer consultation, property search via full MLS access, offer submission, inspection period, financing coordination, and closing. Timeline is typically 30–60 days from accepted offer to close." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="relative overflow-hidden bg-navy-deep px-6 py-16 md:py-20 text-center sm:px-10">
          <LazyVideo
            src="/videos/south_florida_showcase.mp4"
            eager
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/80" />
          <AuroraBackground />
          <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Buyer Representation · Spain Buyer Introductions</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3rem)" }}>
            Buy in South Florida or Spain<br />
            <em className="not-italic italic text-gold">with the right local professional.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Full MLS access and direct buyer representation across Miami-Dade, Broward, and Palm Beach — plus
            formal referral introductions for Spain-based buyers to trusted local partners.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Request a Buyer Consultation
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp Carlos
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            <a
              href={LEAD_MAGNETS.buyerBrief.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Download Miami Buyer Brief Q3 2026
            </a>
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · CLHMS · FL SL705771 · Buyer representation across Miami-Dade, Broward &amp; Palm Beach
          </p>
          </div>
        </section>
        {/* Active market bridge — Miami-Dade & Broward ~$1M listings */}
        <MLSTicker />
        <BuyersRelocation />

        {/* ── New Construction Feed ──────────────────────────── */}
        <section className="bg-white py-12 md:py-16 border-t border-hairline">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">New Construction · South Florida</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Pre-construction inventory — live feed.
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/60">
                New-development projects across South Florida, accessed through the NEO platform. Carlos provides
                advisory representation for buyers navigating deposit structures, delivery timelines, and developer terms.
              </p>
              <a
                href="/new-construction"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
              >
                Full pre-construction advisory →
              </a>
            </div>
            <div className="w-full overflow-hidden">
              <NeoEmbed lang="en" />
            </div>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-ink-primary/35 text-center">
              Live pre-construction inventory via NEO · newestateonly.com · Subject to change without notice. Not a guarantee of availability or pricing.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy-deep py-14 md:py-20">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Buyer Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to start your search?</h2>
            </div>
            <BuyerMandateForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
