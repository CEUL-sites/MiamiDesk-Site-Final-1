import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SpainMiamiJourney } from "../components/SpainMiamiJourney";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT, LEAD_MAGNETS, MESSAGING } from "../constants";

const SERVICES = [
  {
    num: "01",
    tag: "Property Owners",
    title: "Spanish Property Into the Miami MLS",
    body: "Your property enters the Miami & South Florida REALTORS® MLS as a listed asset — not a referral, not a portal upload. 93,000 member agents, 500+ global websites in 19 languages, and an international referral network reaching 2 million+ professionals.",
    outcome: "Structural distribution. The same infrastructure behind South Florida's $69B annual sales volume.",
    stat: "93,000 agents · Day One",
  },
  {
    num: "02",
    tag: "Spanish Agencies",
    title: "Cooperating Broker Agreements",
    body: "Formal MOU or broker-to-broker referral agreement before any introduction. Compensation is documented. Client ownership is clear from the first conversation. The relationship is professional, protected, and repeatable — not a one-time favor between contacts.",
    outcome: "You keep your client. We document the cooperation. Both sides close with clarity.",
    stat: "Compliant · Documented · Repeatable",
  },
  {
    num: "03",
    tag: "Agencies & Developers",
    title: "Marketing to U.S. Buyer Profiles",
    body: "Professional presentation packages in English targeting the three dominant buyer profiles: LATAM-connected investors who understand both markets, European portfolio buyers diversifying into U.S. assets, and South Florida residents with family and capital in Spain.",
    outcome: "Your listing speaks the language, format, and price expectations of serious U.S. buyers.",
    stat: "3 buyer profiles · Bilingual execution",
  },
  {
    num: "04",
    tag: "Developers · Large Portfolios",
    title: "Full Network Distribution Channel",
    body: "One professional relationship opens the entire South Florida infrastructure: 93,000 MLS member agents, United Realty Group's 3,500+ agents across 20 Florida offices, 300+ international partner associations in 75+ countries, and direct access to the LATAM referral pipeline.",
    outcome: "Not a marketing package. A licensed Florida channel into the world's most internationally connected local REALTOR® network.",
    stat: "300+ partner associations · 75+ countries",
  },
];

export default function SpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Global Desk | Expose International Properties to the South Florida Real Estate Network | HomesProfessional.com</title>
        <meta name="description" content="A Florida-based exposure and referral bridge for Spanish property owners, agencies, and developers seeking access to the South Florida real estate network. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="Spain Miami real estate, Spanish property Miami exposure, Madrid MLS referral, Spain to Florida property, Spanish property South Florida, cooperating broker Spain Florida, United Realty Group Spain" />
        <link rel="canonical" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Spain Desk — Spanish Property to South Florida Network",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Referral & Advisory",
          "description": "A Florida-based exposure and referral bridge for Spanish property owners, agencies, and developers seeking access to the South Florida real estate network through compliant professional channels.",
          "areaServed": ["South Florida", "Spain", "Madrid"],
          "url": "https://homesprofessional.com/spain-desk",
          "availableLanguage": ["English", "Spanish"]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          {/* Miami ↔ Madrid cinematic transition backdrop */}
          <LazyVideo
            eager
            src="/videos/miami_madrid_transition.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/30 to-navy-deep/80 pointer-events-none" />
          <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-1.5 mb-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">Spain · Madrid · South Florida · Miami MLS</span>
          </div>
          <h1
            className="mx-auto max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2.0rem, 5.5vw, 3.4rem)" }}
          >
            Expose International Properties to the<br />
            <em className="not-italic italic text-gold">South Florida Real Estate Network.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            A Florida-based professional bridge for Spanish property owners, agencies, and developers
            seeking structured access to 93,000 Miami MLS member agents and the international referral network.
            Buyer demand is often created online — but transactions are executed through professional relationships.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#submit-spain-property"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Submit a Spanish Property for Review
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappBroker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <MessageSquare size={14} />
              WhatsApp: Agency-to-Agency
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href={LEAD_MAGNETS.spainActivation.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Download: MLS Activation Methodology Brief
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · FL SL705771 · Miami and South Florida REALTORS® · Equal Housing Opportunity
          </p>
          </div>{/* end relative */}
        </section>

        {/* Service Cards */}
        <section className="bg-navy-deep pt-12 pb-16 md:pt-16 md:pb-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What the Spain Desk handles</p>
                <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-white md:text-4xl">
                  Four ways to engage.<br />
                  <em className="not-italic italic text-gold">One compliant professional relationship.</em>
                </h2>
              </div>
              <p className="max-w-xs font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 sm:text-right leading-relaxed">
                Carlos is a Florida-licensed Realtor® — not a Spanish broker. Every engagement is documented before any introduction.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              {SERVICES.map((item) => (
                <div key={item.num} className="relative bg-navy-deep p-7 md:p-8 flex flex-col gap-4">
                  {/* Number + tag row */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] font-semibold text-gold/60 tracking-[0.22em]">{item.num}</span>
                    <span className="rounded-full border border-gold/25 bg-gold/[0.06] px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-gold/70">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl leading-snug text-white">{item.title}</h3>

                  {/* Divider */}
                  <div className="h-px w-10 bg-gold/30" />

                  {/* Body */}
                  <p className="font-sans text-sm leading-relaxed text-white/60 flex-1">{item.body}</p>

                  {/* Outcome */}
                  <div className="flex items-start gap-2 border-t border-white/8 pt-4 mt-1">
                    <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    <p className="font-sans text-xs leading-relaxed text-white/50 italic">{item.outcome}</p>
                  </div>

                  {/* Stat */}
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/50">{item.stat}</p>
                </div>
              ))}
            </div>

            {/* Bottom trust line */}
            <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              United Realty Group · FL SL705771 · All cross-border engagements are documented through formal referral or cooperating broker agreements before any introduction.
            </p>
          </div>
        </section>

        {/* Agent Cooperation Where the Market Lacks an MLS */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Cross-Border Cooperation
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Agent cooperation where the market<br />
              <em className="not-italic italic text-gold">lacks a single MLS.</em>
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/65">
              {MESSAGING.spainCooperation}
            </p>

            {/* Featured video — Miami ↔ Madrid cinematic transition */}
            <div className="mt-10 relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
              <LazyVideo
                src="/videos/miami_madrid_transition.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 0.82 }}
              />
              {/* Edge fade for cinematic feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30 pointer-events-none" />
              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-6 pb-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">Miami · South Florida</span>
                <span className="h-px w-10 bg-gold/50" />
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">Madrid · Spain</span>
              </div>
            </div>

            <p className="mt-8 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
              Spain does not operate like the U.S. MLS system. Cooperation between agencies is
              less standardized, and buyer demand can remain fragmented across portals and private
              relationships. My role is to bring professional structure to that gap: identify
              qualified buyer demand, coordinate with serious local agencies, protect referral
              relationships, and connect international clients to inventory through trusted professionals.
            </p>

            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                {
                  title: "What this means for Spanish agencies",
                  items: [
                    "Connect U.S. and international buyers with trusted local professionals",
                    "Structure referral relationships clearly before any introduction",
                    "Help agencies understand Miami and South Florida buyer expectations",
                    "Share qualified buyer demand with serious local professionals",
                    "Maintain transparency on representation, compensation, and client ownership",
                  ],
                },
                {
                  title: "What this means for international property owners",
                  items: [
                    "A Florida-licensed Realtor® active between South Florida and Madrid",
                    "Professional cooperation with established Spanish agencies",
                    "Compliant documentation before any cross-border engagement",
                    "Bilingual service in English and Spanish throughout the process",
                    "No confusion over who represents whom — clarity from the first conversation",
                  ],
                },
              ].map((col) => (
                <div key={col.title} className="bg-navy-deep p-8">
                  <h3 className="font-serif text-lg text-white mb-5">{col.title}</h3>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/65">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
              Carlos Uzcategui is licensed as a real estate professional in Florida only.
              Spanish properties are handled through referral, cooperating broker, or advisory relationships.
            </p>
          </div>
        </section>

        <SpainMiamiJourney />
        <GlobalPartnerNetwork />

        {/* Submit form */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-spain-property">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Spain Desk · Submit for Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit a Spanish property, agency referral, or introduction.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For property owners, Spanish agencies, developers, and cooperating professionals.
                All submissions are treated as confidential. Carlos reviews every submission personally.
              </p>
            </div>
            <ReferralIntakeForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Confidential · Licensed Professionals · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Florida real estate brokerage services are provided through United Realty Group. Spanish and international
                property opportunities are handled through referral, marketing, cooperating broker, or advisory relationships
                depending on jurisdiction, property type, and applicable regulations. Carlos Uzcategui is licensed as a
                real estate professional in Florida only.
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
