import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download, Globe } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SpainMiamiJourney } from "../components/SpainMiamiJourney";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { InternationalBridge } from "../components/InternationalBridge";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const NETWORK_STATS = [
  { value: "437+", label: "International Agreements", desc: "Signed referral agreements with real estate organizations worldwide through Miami and South Florida REALTORS®." },
  { value: "93,000", label: "Member Agents", desc: "Miami and South Florida REALTORS® — the world's largest local REALTOR® association — for maximum buyer-agent visibility." },
  { value: "70+", label: "Countries", desc: "International referral network of 2 million+ professionals across 70+ countries and 300+ partner associations." },
  { value: "19", label: "Languages", desc: "Property exposure across 500+ global portals in 19 languages — reaching the agents who represent international buyers." },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit Your Property or Project",
    body: "Share the essential details: location, property type, ownership structure, estimated value, and your distribution objective. All submissions are treated as confidential.",
  },
  {
    step: "02",
    title: "Professional Review & Qualification",
    body: "Carlos reviews every submission personally to assess the appropriate exposure pathway — whether that is MLS activation through a licensed Florida principal, cooperating broker coordination, referral representation, or advisory framing.",
  },
  {
    step: "03",
    title: "Compliant Distribution Strategy",
    body: "A clear, documented proposal for how the property will be presented: through which professional channels, to which agent networks, and through what referral or cooperating broker mechanism. No overpromising. No shortcuts.",
  },
  {
    step: "04",
    title: "Broker-to-Broker Coordination",
    body: "Formal broker-to-broker agreements where applicable. Referral fee documentation. Compliant cooperation across jurisdictions. Professional presentation that travels correctly through the South Florida agent network.",
  },
];

export default function MiamiMLSInternationalDeskPage() {
  return (
    <>
      <Helmet>
        <title>Miami MLS International Desk | International Property Exposure & Referral | HomesProfessional.com</title>
        <meta name="description" content="A Florida-based exposure and referral bridge for qualified international property owners, agencies, and developers seeking access to the South Florida real estate network. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="Miami MLS international desk, international property exposure Miami, Spain Miami real estate referral, Latin America Miami property, Madrid real estate referral, cooperating broker South Florida, United Realty Group international" />
        <link rel="canonical" href="https://homesprofessional.com/miami-mls-international-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Miami MLS International Desk",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Referral & Advisory",
          "description": "A Florida-based exposure and referral bridge for qualified international property owners, agencies, and developers seeking access to the South Florida real estate network through compliant professional channels.",
          "areaServed": ["South Florida", "Spain", "Latin America", "Europe"],
          "url": "https://homesprofessional.com/miami-mls-international-desk",
          "availableLanguage": ["English", "Spanish"]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-1.5 mb-6">
            <Globe size={12} className="text-gold" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">Florida · Spain · Latin America · International</span>
          </div>
          <h1
            className="mx-auto max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2.0rem, 5.5vw, 3.4rem)" }}
          >
            Miami MLS International Desk
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            A Florida-based exposure and referral bridge for qualified international property owners, agencies, and developers
            seeking access to the South Florida real estate network. Professional presentation, compliant referral coordination,
            and strategic distribution.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#submit-property"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Submit a Property or Project for Review
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappBroker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp: Broker-to-Broker Conversation
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
        </section>

        {/* Network stats */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center mb-10">Why the Miami network matters</p>
            <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
              {NETWORK_STATS.map((s) => (
                <div key={s.value} className="bg-white p-8">
                  <div className="font-serif text-4xl text-gold">{s.value}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/50">{s.label}</div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-primary/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What this desk handles */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What the international desk handles</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              From South Florida listings to international property introductions.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-white/60">
              The message is not "I am a local agent everywhere." The message is: I coordinate compliant exposure,
              referrals, and professional presentation through the correct licensed and brokerage relationships.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                { title: "International Property Exposure", body: "Qualified properties outside Florida presented to the Miami and South Florida agent network through professional referral and marketing channels." },
                { title: "Referral Coordination", body: "Formal broker-to-broker referral agreements. Documented cooperation. Paid at closing. For licensed agents from any state or country with South Florida clients." },
                { title: "Marketing Representation", body: "Professional presentation packages, MLS-compatible documentation, and compliant positioning for properties seeking Miami-facing distribution." },
                { title: "Cross-Border Distribution", body: "Florida ↔ Spain ↔ Latin America. Structural exposure through 437+ international agreements and the Miami Global Council's partner network." },
                { title: "South Florida Agent Network Visibility", body: "93,000 member agents. 500+ global portals. Buyer-agent activation through the most active MLS footprint in the Southeastern United States." },
                { title: "Compliant Cross-Border Positioning", body: "International property opportunities handled through referral, marketing, cooperating broker, or advisory relationships — depending on jurisdiction, property type, and applicable regulations." },
              ].map((item) => (
                <div key={item.title} className="border border-white/10 p-7">
                  <h3 className="font-serif text-xl text-white">{item.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InternationalBridge />
        <SpainMiamiJourney />
        <GlobalPartnerNetwork />

        {/* How it works */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How it works</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Professional process. No shortcuts. No overpromising.
            </h2>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} className="bg-white p-8">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{step.step}</div>
                  <h3 className="font-serif text-xl text-navy-deep">{step.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral form */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-property">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">International Desk · Submit for Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit a property, project, or referral for review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For property owners, agencies, developers, and cooperating brokers. All submissions are confidential.
                Carlos reviews every submission personally before responding.
              </p>
            </div>
            <ReferralIntakeForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Confidential · Licensed Professionals · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Florida real estate brokerage services are provided through United Realty Group. International property
                opportunities may be handled through referral, marketing, cooperating broker, or advisory relationships
                depending on jurisdiction, property type, and applicable regulations.
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
