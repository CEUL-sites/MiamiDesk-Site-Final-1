import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SpainMiamiJourney } from "../components/SpainMiamiJourney";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../constants";

export default function SpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Spain to South Florida Real Estate | Bilingual Advisory | United Realty Group</title>
        <meta name="description" content="Bilingual (English/Spanish) real estate advisory for buyers from Spain and Latin America relocating to or investing in South Florida. Private consultations. United Realty Group · FL SL705771." />
        <meta name="keywords" content="Spain Miami real estate, comprar casa Miami, Spain to Florida property, Spain buyer Miami, bilingual realtor South Florida, Spanish speaking realtor Miami" />
        <link rel="canonical" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/spain-desk" />
        <meta property="og:title" content="Spain to South Florida Real Estate | Bilingual Advisory | United Realty Group" />
        <meta property="og:description" content="Bilingual advisory for Spain and LATAM owners activating U.S. MLS listings. Reach 93,000+ South Florida agents from day one. Carlos Uzcategui · FL SL705771 · United Realty Group." />
        <meta property="og:url" content="https://homesprofessional.com/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Spain to South Florida Real Estate | Bilingual Advisory | United Realty Group" />
        <meta name="twitter:description" content="Bilingual advisory for Spain and LATAM owners activating U.S. MLS listings. Reach 93,000+ South Florida agents from day one." />
        <meta name="twitter:image" content="https://homesprofessional.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Spain to South Florida Real Estate Advisory",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Advisory",
          "description": "Bilingual real estate advisory for Spain-based buyers and investors relocating to or investing in South Florida. Private consultations in English and Spanish.",
          "areaServed": ["South Florida", "Spain"],
          "url": "https://homesprofessional.com/spain-desk",
          "availableLanguage": ["English", "Spanish"]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "¿Puedo comprar una propiedad en Miami desde España?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Los compradores españoles pueden adquirir propiedades en Florida sin restricciones. Ofrecemos consultoría bilingüe completa, coordinación de hipotecas para no residentes, y gestión del proceso desde España." } },
            { "@type": "Question", "name": "What neighborhoods in Miami are popular with Spanish buyers?", "acceptedAnswer": { "@type": "Answer", "text": "Brickell, Coral Gables, Miami Beach, and Aventura are the top markets for Spain-based buyers. Each offers a distinct lifestyle profile — we provide neighborhood-specific analysis as part of the advisory." } },
            { "@type": "Question", "name": "Can I invest in South Florida real estate from Spain?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. South Florida is one of the top markets for Spanish and Latin American investment buyers. We advise on primary residence, vacation, and investment-grade acquisitions with full bilingual support." } },
            { "@type": "Question", "name": "Do you have contacts in Spain for selling before relocating?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our Spain desk has referral relationships with major Madrid agencies including Engel & Völkers, Lucas Fox, and Knight Frank for clients who need to sell in Spain before purchasing in Florida." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Spain Desk · Mesa España · United Realty Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            From Madrid to Miami.<br />
            <em className="not-italic italic text-gold">Bilingual. Private. Expert.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Confidential advisory for buyers from Spain and Latin America. Private consultations in English and Spanish. Madrid referral network for pre-move transactions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT.whatsappSpain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              WhatsApp España
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Contact Us
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            <a
              href={LEAD_MAGNETS.spainActivation.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Download MLS Activation Methodology — PDF
            </a>
          </div>
        </section>
        <SpainMiamiJourney />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Spain Desk · Consulta Privada</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Start your South Florida search</h2>
            </div>
            <LeadForm leadSource="spain-desk-page" />
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
