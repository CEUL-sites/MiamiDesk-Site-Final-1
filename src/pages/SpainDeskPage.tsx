import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SpainMiamiJourney } from "../components/SpainMiamiJourney";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const WHY_MIAMI = [
  { value: "93,000", label: "Member Agents", desc: "The Miami and South Florida REALTORS® MLS — the world's largest local REALTOR® association — puts your property in front of the agents who represent active buyers." },
  { value: "437+", label: "International Agreements", desc: "Miami holds more signed international real estate agreements than any other REALTOR® association in the world. Your property enters a global professional network." },
  { value: "500+", label: "Global Websites", desc: "Eligible listings may be distributed across 500+ websites in 19 languages where available — reaching international buyers actively searching in South Florida." },
  { value: "2M+", label: "Professionals Worldwide", desc: "An international referral network of 2 million+ real estate professionals across 70+ countries. The agents representing Latin American and European buyers are in this network." },
];

const SERVICES = [
  {
    title: "Spanish Property Exposure to Miami Agents",
    body: "Qualified Spanish properties introduced to the South Florida agent network through professional referral and marketing channels. Compliant. Documented. Structured.",
  },
  {
    title: "Cooperating Broker Coordination",
    body: "Formal broker-to-broker agreements between Spanish agencies and United Realty Group. Your property presented through the correct licensed professional relationship.",
  },
  {
    title: "Marketing to South Florida Buyers",
    body: "Professional presentation packages in English targeting Miami-facing buyer demand — investor profiles, relocation buyers, and LATAM-connected buyers who know the Spanish market.",
  },
  {
    title: "MLS-Compatible Documentation",
    body: "Property documentation structured to travel correctly through the South Florida agent network. Compliant positioning that meets MLS and brokerage presentation standards.",
  },
  {
    title: "Agencies & Developer Representation",
    body: "For Spanish agencies and developers entering the Miami market: a licensed Florida channel into 93,000 member agents and the full international distribution infrastructure.",
  },
  {
    title: "Referral Pathway for Spain Buyers",
    body: "Spain-based clients seeking South Florida properties can be introduced through a formal referral relationship. Bilingual English/Spanish advisory through the full transaction.",
  },
];

export default function SpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Spain Desk | Expose Spanish Property to the South Florida Real Estate Network | HomesProfessional.com</title>
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
        <section className="overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-1.5 mb-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">Spain · Madrid · South Florida · Miami MLS</span>
          </div>
          <h1
            className="mx-auto max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2.0rem, 5.5vw, 3.4rem)" }}
          >
            Expose Spanish Property to the<br />
            <em className="not-italic italic text-gold">South Florida Real Estate Network.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            A Florida-based professional bridge for Spanish property owners, agencies, and developers
            seeking structured access to 93,000 Miami MLS member agents and the international referral network
            behind one of the world's most active real estate markets.
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
        </section>

        {/* Why Miami Exposure Matters */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center mb-3">Why Miami Exposure Matters</p>
            <h2 className="text-center font-serif text-3xl leading-tight text-navy-deep md:text-4xl mb-10 max-w-3xl mx-auto">
              The South Florida network is the entry point for international capital.
            </h2>
            <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
              {WHY_MIAMI.map((s) => (
                <div key={s.value} className="bg-white p-8">
                  <div className="font-serif text-4xl text-gold">{s.value}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/50">{s.label}</div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-primary/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Six Service Cards */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What the Spain Desk handles</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Professional exposure pathways. Compliant by design.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/60">
              Carlos Uzcategui is a Florida-licensed Realtor® — not a Spanish broker. Spanish properties are handled
              through referral, marketing, cooperating broker, or advisory relationships. The mechanism is professional
              and fully documented.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SERVICES.map((item) => (
                <div key={item.title} className="border border-white/10 p-7">
                  <h3 className="font-serif text-xl text-white">{item.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{item.body}</p>
                </div>
              ))}
            </div>
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
