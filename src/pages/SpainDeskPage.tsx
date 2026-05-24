import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { InternationalBridge } from "../components/InternationalBridge";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

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

        {/* ── Hero ── */}
        <section className="bg-navy-deep py-24 text-center">
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
              Submit an Agency Inquiry →
            </a>
          </div>
        </section>

        {/* ── Spain Desk Cinematic Video Feature ── */}
        <section className="relative bg-navy-deep overflow-hidden">
          {/* Full-bleed video */}
          <div className="relative w-full overflow-hidden" style={{ maxHeight: "82vh", minHeight: "420px" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={{ maxHeight: "82vh", minHeight: "420px", display: "block" }}
              src="/videos/spain-desk.mp4"
            />

            {/* Gradient overlays — depth + legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/75 via-transparent to-navy-deep/40" />

            {/* Content overlay — bottom-left anchor */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full px-6 pb-10 md:pb-14 md:px-14 lg:px-20">
                <div className="max-w-2xl">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold"
                  >
                    For Spain Agencies · Developers · Sellers
                  </motion.p>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl lg:text-6xl"
                  >
                    Your inventory.<br />
                    <span className="italic text-gold">The U.S. market.</span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-5 font-sans text-base leading-relaxed text-white/70 max-w-lg"
                  >
                    A licensed Florida principal of record. Bilingual representation. Direct MLS placement into a 93,000-agent professional network. The formal channel Spanish agencies, developers, and sellers need to access North and Latin American buyers — no intermediaries, no referral workarounds.
                  </motion.p>

                  {/* Stats strip */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-8 flex flex-wrap gap-x-8 gap-y-4"
                  >
                    {[
                      { v: "93K", l: "MLS member agents" },
                      { v: "200+", l: "Global portals" },
                      { v: "25", l: "Years licensed" },
                      { v: "Day 1", l: "Full activation" },
                    ].map((s) => (
                      <div key={s.l} className="flex flex-col">
                        <span className="font-serif text-2xl text-gold">{s.v}</span>
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/45 mt-0.5">{s.l}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    <a
                      href={CONTACT.whatsappSpain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
                    >
                      WhatsApp España
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 border border-white/30 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-gold hover:text-gold"
                    >
                      Agency Inquiry →
                    </a>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-5 font-mono text-[8px] uppercase tracking-[0.22em] text-white/30"
                  >
                    Madrid · Marbella · Costa del Sol · Miami · Brickell · Coral Gables
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom border accent */}
          <div className="h-px w-full bg-gold/20" />
        </section>

        <InternationalBridge />

        {/* ── Madrid Network Proof Block (Task 1.10) ── */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Principal of Record · U.S. Framework</p>
              <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">The formal U.S. channel.</h2>
              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/65">
                Carlos Uzcategui acts as the licensed Florida principal of record for Spanish agencies, developers, and sellers entering the U.S. market. Buyer-side representation in Spain is handled by local professional agencies within the affiliated Madrid network. Both sides are credentialed — this is not a workaround.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="border border-bone bg-white p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-4">U.S. Principal of Record</p>
                <h3 className="font-serif text-xl text-navy">Florida-Licensed Representation</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy/60">
                  Your property enters the Miami and South Florida REALTORS® MLS under a Florida-licensed principal — the legal requirement for U.S. MLS activation. No unlicensed workarounds. No grey channels.
                </p>
              </div>

              <div className="border border-bone bg-white p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-4">Madrid Affiliate Network</p>
                <h3 className="font-serif text-xl text-navy">Established Agency Relationships</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy/60">
                  Active referral relationships with established Madrid agencies for clients who need pre-move support in Spain before acquiring in Florida.
                  {/* TODO: Confirm with specific agencies before publishing named counterparties — currently rendering as generic "Madrid affiliate network" */}
                </p>
                <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-navy/35">
                  Madrid · Marbella · Costa del Sol
                </p>
              </div>

              <div className="border border-bone bg-white p-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-4">What This Means in Practice</p>
                <h3 className="font-serif text-xl text-navy">437+ Signed Agreements</h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-navy/60">
                  Miami and South Florida REALTORS® maintains 437+ signed referral agreements with real estate associations worldwide. Spanish developers and agencies activate into an existing formal cross-border infrastructure — not an ad hoc arrangement.
                </p>
              </div>
            </div>

            <div className="mt-12 border border-gold/20 bg-navy-deep p-8">
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  { v: "93,000", l: "Member Agents" },
                  { v: "385", l: "U.S. MLSs via RPR" },
                  { v: "437+", l: "International Agreements" },
                  { v: "Day 1", l: "MLS Activation" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-serif text-3xl text-gold">{s.v}</div>
                    <div className="font-mono mt-1 text-[8px] uppercase tracking-[0.2em] text-white/45">{s.l}</div>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-sans text-sm text-center leading-relaxed text-white/45 max-w-2xl mx-auto">
                Source: Miami and South Florida REALTORS® — post-merger association data effective May 11, 2026. 385 U.S. MLSs via RPR as of April 1, 2026.
              </p>
            </div>
          </div>
        </section>

        {/* ── Lead Form ── */}
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Spain Desk · Consulta Privada</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Start your South Florida search</h2>
            </div>
            <LeadForm />
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
