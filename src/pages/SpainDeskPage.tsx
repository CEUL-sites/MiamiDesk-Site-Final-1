import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download, MessageSquare, Check, Shield, FileText } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SpainMiamiJourney } from "../components/SpainMiamiJourney";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { CONTACT, LEAD_MAGNETS, MESSAGING } from "../constants";

const PROCESS_STEPS = [
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

/* "Four ways to engage" service cards — same structure as PROCESS_STEPS */
const SERVICES = PROCESS_STEPS;

const SERVICE_TIERS = [
  {
    tier: "01",
    name: "Listing Activation",
    description: "South Florida channel access for agencies activating one to three properties in the U.S. market.",
    includes: [
      "MLS activation through URG as Florida broker of record",
      "Syndication to 500+ portals in 19 languages",
      "Bilingual property presentation (EN/ES)",
      "Written referral agreement — client relationship protected",
      "Distribution to 93,000 Miami REALTORS® member agents",
    ],
  },
  {
    tier: "02",
    name: "Active Marketing",
    popular: true,
    description: "Full marketing execution with buyer-agent outreach and monthly performance reporting.",
    includes: [
      "Everything in Listing Activation",
      "Targeted outreach to buyer agents with LATAM mandates",
      "Monthly marketing performance report",
      "Custom English buyer dossier",
      "Inquiry management with priority response",
    ],
  },
  {
    tier: "03",
    name: "Full Channel",
    description: "Enterprise structure for agencies with broad inventory or developer mandates.",
    includes: [
      "Everything in Active Marketing",
      "Monthly strategy sessions with Carlos",
      "Support in negotiations with U.S. buyers",
      "Pricing structures for portfolios and developers",
      "Direct access to LATAM investor and South Florida referral network",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Can a Spanish property be listed in the Miami MLS?",
    a: "Yes. As a licensed Florida principal of record, Carlos can activate Spanish properties within the Miami and South Florida REALTORS® MLS — reaching 93,000 member agents. This is a formal MLS listing, not a referral or portal upload. Subject to MLS rules, broker approval, and property eligibility.",
  },
  {
    q: "Does my agency keep the client relationship?",
    a: "Yes, always. The referral agreement is designed to protect your agency's representation with the property owner. You remain the seller's agent. Carlos manages the U.S.-side marketing channel and buyer agent coordination.",
  },
  {
    q: "How is the referral commission paid at closing?",
    a: "All U.S. commission payments flow exclusively through United Realty Group (URG), the Florida-licensed broker of record. At closing, URG disburses the buyer's agent commission per the MLS agreement and remits the referral commission to the partner agency per the signed referral agreement — typically around 1% of the sale price, negotiated and documented in writing before any marketing begins.",
  },
  {
    q: "Is Carlos licensed to practice real estate in Spain?",
    a: "No. Carlos Uzcategui is licensed exclusively in Florida (FL SL705771, United Realty Group). Spanish and international services are provided through referral relationships and cooperating arrangements with local licensed professionals.",
  },
  {
    q: "What does the initial property review cost?",
    a: "The initial review is free and confidential. Carlos assesses the property's positioning potential, the most relevant South Florida buyer profiles, and what a formal MLS activation would look like — with no commitment required.",
  },
  {
    q: "What is the difference between the monthly fee and the referral commission?",
    a: "The monthly marketing services fee is paid by the Spanish agency or property owner for ongoing distribution — MLS coordination, syndication, outreach, and reporting. It is a professional services fee, not contingent on a sale. The referral commission is a separate, contingent payment only triggered at a successful closing, remitted through URG per the written agreement.",
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
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/spain-desk" />
        <meta property="og:title" content="Global Desk | Spanish Property into the South Florida Network | Carlos Uzcategui" />
        <meta property="og:description" content="A Florida-based bridge listing international property into the Miami MLS — 93,000 member agents and a global referral network. Not a referral, a formal listing." />
        <meta property="og:image" content="https://homesprofessional.com/images/urg-hq.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Desk | Spanish Property into the Miami MLS | Carlos Uzcategui" />
        <meta name="twitter:description" content="List international property into the South Florida network through one licensed Florida principal. Free, confidential review." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/urg-hq.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Global Desk — South Florida-Facing Listing Exposure for International Agencies",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "B2B International Real Estate Exposure & Referral",
          "description": "A B2B exposure and referral service for international agencies and developers. Agencies win more seller mandates by offering property owners documented South Florida-facing exposure, where eligible and subject to MLS rules and written agreements, through United Realty Group. The agency keeps the seller relationship and local mandate.",
          "areaServed": ["South Florida", "Spain", "Madrid"],
          "url": "https://homesprofessional.com/spain-desk",
          "availableLanguage": ["English", "Spanish"],
          "offers": {
            "@type": "Offer",
            "description": "Monthly listing exposure packages and selected portfolio promotion. Written referral and cooperation agreements. Subject to MLS rules, broker approval, property eligibility, and platform availability."
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Can a Spanish property be listed in the Miami MLS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. As a licensed Florida principal of record, Carlos can activate Spanish properties within the Miami and South Florida REALTORS® MLS — reaching 93,000 member agents who represent LATAM and North American buyers, the dominant purchasers of luxury Spanish real estate. This is a formal MLS listing, not a referral or portal upload." } },
            { "@type": "Question", "name": "Who are the buyers for Spanish properties in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "The primary buyers for Spanish real estate sourced through South Florida channels are: LATAM-connected investors who understand both markets; European portfolio buyers diversifying into U.S. real estate; and South Florida residents with family and capital ties to Spain. Carlos's referral network directly reaches all three profiles." } },
            { "@type": "Question", "name": "How does the cooperating broker arrangement work for Spanish agencies?", "acceptedAnswer": { "@type": "Answer", "text": "A formal MOU or broker-to-broker referral agreement is established before any client introduction. Compensation is documented, client ownership is clearly defined, and the arrangement is compliant with both Spanish and Florida professional standards. You keep your client. We document the cooperation." } },
            { "@type": "Question", "name": "Is Carlos licensed to practice real estate in Spain?", "acceptedAnswer": { "@type": "Answer", "text": "No. Carlos Uzcategui is licensed exclusively in Florida (FL SL705771, United Realty Group). Spain and international services are provided through referral relationships and cooperating arrangements with local licensed professionals where applicable. The South Florida MLS listing and distribution infrastructure is the Florida-licensed service." } },
            { "@type": "Question", "name": "What does the review of a Spanish property cost?", "acceptedAnswer": { "@type": "Answer", "text": "The initial review is free and confidential. Carlos assesses the property's positioning potential, the most relevant South Florida buyer profiles, and what a formal MLS activation would look like — with no commitment required." } }
          ]
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
            Your property, listed in the U.S. market —<br />
            <em className="not-italic italic text-gold">not just referred to it.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            A Florida-based professional bridge for international property owners, agencies, and developers
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

        {/* ── Win More Seller Mandates (primary promise) ─────────────── */}
        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Mandate Advantage</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Offer sellers more than local portals.<br />
                <em className="not-italic italic">Win more mandates.</em>
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-navy-deep/60">
                When a property owner chooses between agencies, the stronger marketing story wins the listing.
                Most agencies offer the same thing — local portals, a website, social media, a local database.
                A South Florida-facing exposure layer is something your competitors cannot put on the table.
              </p>
            </div>

            <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Differentiate your listing presentation",
                  body: "Bring property owners a South Florida-facing exposure story alongside your local marketing — documented, credible, and tied to a Florida-licensed Realtor® with 25 years in the South Florida market.",
                },
                {
                  number: "02",
                  title: "Use it to win the seller's signature",
                  body: "Your agents present documented Miami exposure inside the listing presentation. Sellers see a market reach local-only agencies cannot offer, and choose you for the mandate.",
                },
                {
                  number: "03",
                  title: "Keep the relationship and the mandate",
                  body: "Your agency keeps the seller relationship, the local mandate, and local execution. Carlos provides the Florida-side exposure layer and U.S.-facing positioning behind the scenes.",
                },
              ].map((c) => (
                <div key={c.number} className="flex flex-col bg-ivory p-8">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{c.number}</div>
                  <h3 className="font-serif text-xl text-navy-deep leading-snug">{c.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy-deep/65 flex-1">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-navy-deep/35">
              South Florida-facing exposure is offered where listings are eligible and is subject to MLS rules, broker approval, and platform availability. No specific result is guaranteed.
            </p>
          </div>
        </section>

        {/* ── How the Partnership Works (the model) ──────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How the Partnership Works</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                A clear B2B model.<br />
                <em className="not-italic italic text-gold">Documented before anything begins.</em>
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
                The partnership runs on monthly listing exposure packages and selected portfolio promotion — the primary engagement —
                with buyer referrals as a secondary upside. Every arrangement is executed through written agreements before any work begins.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              {/* Stream A — Monthly */}
              <div className="bg-navy-deep p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] font-bold text-gold">A</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70">Primary · Per Listing · Monthly</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Monthly Listing Exposure Packages</h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Paid by the agency or property owner · The primary engagement</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  A per-listing monthly agreement covering Miami MLS coordination where eligible, syndication
                  to partner portals where available, buyer-agent outreach, and bilingual marketing materials.
                  Paid as a professional services fee for the exposure layer — not a commission contingency, not dependent on sale outcome.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Miami MLS coordination where the listing is eligible",
                    "Syndication to partner portals where available",
                    "Targeted buyer-agent outreach and U.S.-facing positioning",
                    "Bilingual listing presentation materials (EN/ES)",
                    "Monthly activity reporting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.08] pt-5 mt-auto">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Pricing</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Tiered monthly per-listing fee. See service tiers below or request details.</p>
                </div>
              </div>

              {/* Stream B — At Closing */}
              <div className="bg-navy p-8 md:p-10 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] font-bold text-gold">B</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70">Secondary Upside · At Closing Only</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-white">Referral Commission at Closing</h3>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">A secondary upside · Paid through United Realty Group, the Florida-licensed broker</p>
                </div>

                <div className="h-px w-10 bg-gold/30" />

                <p className="font-sans text-sm leading-relaxed text-white/65">
                  A secondary upside of the partnership. Where a transaction closes through the Miami network, United Realty Group
                  (the Florida-licensed broker) remits a referral commission to the agency per the signed referral agreement —
                  typically around 1% of the sale price, negotiated and documented in writing, subject to broker approval and applicable rules.
                </p>

                <ul className="space-y-2.5">
                  {[
                    "Written referral agreement required before any buyer introduction",
                    "All U.S. commissions disbursed exclusively through URG at closing",
                    "Approximately 1% of sale price — negotiated per listing",
                    "Client ownership stays with Spanish agency throughout",
                    "Compensation structure documented before MLS activation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                      <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.08] pt-5 mt-auto">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">Mechanism</p>
                  <p className="mt-1.5 font-sans text-sm text-white/60">Documented via formal referral agreement with United Realty Group prior to any buyer introduction or MLS activation.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
              Both revenue streams are contracted in writing before any marketing begins. No informal arrangements.
            </p>
          </div>
        </section>

        {/* ── Compliance Architecture ────────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Compliance Architecture</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                The legal mechanism,<br />
                <em className="not-italic italic text-gold">explained plainly.</em>
              </h2>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  label: "Agreements Signed",
                  body: "Marketing services agreement + written referral agreement. Both executed before any MLS entry or buyer introduction. Client ownership and compensation documented.",
                },
                {
                  step: "02",
                  label: "URG Coordinates MLS Entry",
                  body: "Where the listing is eligible, United Realty Group — the licensed Florida broker — coordinates the MLS entry within the Miami and South Florida REALTORS® ecosystem, subject to MLS rules and broker approval.",
                },
                {
                  step: "03",
                  label: "Network Exposure",
                  body: "The listing is made available to the Miami and South Florida REALTORS® ecosystem and partner portals where eligible — the same infrastructure behind South Florida's market. Reach varies by property and platform.",
                },
                {
                  step: "04",
                  label: "Closing & Payment",
                  body: "All U.S.-side commission disbursements flow exclusively through United Realty Group as the Florida-licensed broker of record. At closing, URG pays the buyer's agent per the MLS agreement and remits the referral commission to the partner agency per the signed referral agreement — both documented in writing before marketing begins.",
                },
              ].map(({ step, label, body }) => (
                <div key={step} className="bg-navy-deep p-7 flex flex-col gap-4">
                  <span className="font-mono text-[11px] font-semibold text-gold/60 tracking-[0.22em]">{step}</span>
                  <h3 className="font-serif text-lg text-white leading-snug">{label}</h3>
                  <div className="h-px w-8 bg-gold/25" />
                  <p className="font-sans text-xs leading-relaxed text-white/55 flex-1">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* Network stats */}
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60 mb-4">Network Infrastructure</p>
                <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                  {[
                    { value: "93,000", label: "MLS member agents" },
                    { value: "500+", label: "Portals where eligible" },
                    { value: "4,000+", label: "URG agents · 21 offices" },
                    { value: "75+", label: "Countries · partner network" },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div className="font-serif text-2xl text-white">{value}</div>
                      <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/40 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance notes */}
              <div className="border border-white/10 bg-white/[0.02] p-6">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60 mb-4">Compliance Notes</p>
                <ul className="space-y-3">
                  {[
                    "Carlos Uzcategui is licensed in Florida only (FL SL705771)",
                    "Spanish properties listed through referral and cooperating broker arrangements",
                    "United Realty Group is the Florida broker of record for all MLS entries",
                    "Referral commission paid through URG at closing per signed agreement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/55">
                      <Shield size={11} className="mt-0.5 flex-shrink-0 text-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service Tiers ─────────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Service Structure</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Three tiers. Priced per listing,<br />
                <em className="not-italic italic text-gold">per month.</em>
              </h2>
              <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Every tier coordinates South Florida-facing exposure through URG as the Florida broker, where listings are eligible.
                The difference is the depth of active marketing, outreach, and strategic support.
                The monthly exposure fee is separate from any referral commission earned at closing.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {SERVICE_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={`relative flex flex-col bg-navy-deep p-8 gap-5 ${tier.popular ? "ring-1 ring-inset ring-gold/35" : ""}`}
                >
                  {tier.popular && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-px bg-gold/50" />
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold px-3 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-navy-deep whitespace-nowrap">
                        Most Selected
                      </span>
                    </>
                  )}

                  <span className="font-mono text-[10px] font-semibold text-gold/55 tracking-[0.22em]">{tier.tier}</span>

                  <div>
                    <h3 className="font-serif text-xl text-white">{tier.name}</h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-white/50">{tier.description}</p>
                  </div>

                  <div className="h-px w-8 bg-gold/25" />

                  <ul className="space-y-2.5 flex-1">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 font-sans text-xs text-white/65">
                        <Check size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#submit-listing"
                    className="mt-2 flex items-center justify-center gap-2 border border-gold/35 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/75 transition-colors hover:border-gold hover:text-gold"
                  >
                    Request Pricing
                    <ChevronRight size={12} />
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.15em] text-white/25">
              All tiers include written referral agreement and URG broker-of-record MLS activation.
              Monthly fee does not include the referral commission — that is a separate contingent payment at closing.
            </p>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────── */}
        <section className="bg-navy pt-14 pb-16 md:pt-20 md:pb-24 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How to Engage</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Four steps from inquiry<br />
                <em className="not-italic italic text-gold">to Day One activation.</em>
              </h2>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="bg-navy-deep p-8 flex gap-6">
                  <span className="flex-shrink-0 font-mono text-[13px] font-semibold text-gold/50 tracking-[0.22em] pt-0.5">{step.num}</span>
                  <div>
                    <h3 className="font-serif text-xl text-white">{step.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Schedule an Agency Call
                <ChevronRight size={13} />
              </a>
              <a
                href={CONTACT.whatsappBroker}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                WhatsApp Carlos Directly
              </a>
            </div>
          </div>
        </section>

        {/* ── Who This Serves ───────────────────────────────────────── */}
        <section className="bg-navy-deep py-14 md:py-18 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Ideal For</p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Madrid Luxury Agencies",
                  "Marbella & Costa del Sol",
                  "Barcelona Apartment Portfolios",
                  "Ibiza & Balearic Villas",
                  "Canarias Investment Properties",
                  "Pre-Construction Developers",
                  "Branded Residences",
                  "Family Office Mandates",
                  "Multi-Unit Portfolios",
                  "New Development Projects",
                ].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-white/[0.08] pt-10 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Listing agents with luxury mandates",
                  body: "Add a credible, documented U.S. marketing channel to your listing presentation. Differentiate from local-only agencies with a formal Miami MLS activation.",
                },
                {
                  title: "Agency directors with international inventory",
                  body: "Activate your portfolio into the Miami network through a structured per-listing monthly agreement. One professional relationship opens the full infrastructure.",
                },
                {
                  title: "Developers seeking LATAM and North American buyers",
                  body: "Access 93,000 Miami MLS agents and the South Florida Latin American buyer network — the most internationally connected local REALTORS® association in the world.",
                },
              ].map((card) => (
                <div key={card.title} className="border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-serif text-lg text-white leading-snug mb-3">{card.title}</h3>
                  <p className="font-sans text-xs leading-relaxed text-white/55">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Professional Terms Outline ────────────────────────────── */}
        <section className="bg-navy py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Professional Framework</p>
              <h2 className="mt-4 font-serif text-3xl text-white leading-tight md:text-4xl">
                What is documented.<br />
                <em className="not-italic italic text-gold">What is protected.</em>
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 mb-5">Documented Before Activation</p>
                <ul className="space-y-5">
                  {[
                    {
                      label: "Marketing Services Agreement",
                      detail: "Scope of services, duration, monthly fee, listing details, and performance expectations.",
                    },
                    {
                      label: "Written Referral Agreement",
                      detail: "Client ownership, compensation structure, closing payment terms, and confidentiality provisions.",
                    },
                    {
                      label: "MLS Listing Authorization",
                      detail: "Property details, authorized listing price, and URG designation as Florida broker of record.",
                    },
                    {
                      label: "Compensation Structure",
                      detail: "Monthly services fee and referral commission amount — both documented separately before any marketing begins.",
                    },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex items-start gap-3">
                      <FileText size={14} className="mt-0.5 flex-shrink-0 text-gold/55" />
                      <div>
                        <p className="font-sans text-sm font-medium text-white">{label}</p>
                        <p className="mt-0.5 font-sans text-xs text-white/45 leading-relaxed">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 mb-5">What Your Agency Retains</p>
                <ul className="space-y-5">
                  {[
                    {
                      label: "Your client relationship",
                      detail: "Spanish agency retains representation of the property owner throughout. Not negotiable.",
                    },
                    {
                      label: "Your referral commission",
                      detail: "Documented before any buyer introduction. URG pays at closing per the signed referral agreement.",
                    },
                    {
                      label: "Your listing data",
                      detail: "All submissions are confidential. No sharing of listing data without written consent.",
                    },
                    {
                      label: "Your agency independence",
                      detail: "Monthly agreements are per listing. No site-wide exclusivity requirement unless specifically agreed.",
                    },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Shield size={14} className="mt-0.5 flex-shrink-0 text-gold/55" />
                      <div>
                        <p className="font-sans text-sm font-medium text-white">{label}</p>
                        <p className="mt-0.5 font-sans text-xs text-white/45 leading-relaxed">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Submit Form ────────────────────────────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-listing">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Global Desk · Agency Inquiry</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit a listing or agency inquiry.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For Spanish agencies, developers, and listing professionals. All submissions are treated as confidential.
                Carlos reviews every inquiry personally before responding.
              </p>
            </div>
            <AgencyPartnerForm />
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section className="bg-navy py-16 md:py-20 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-8">Frequently Asked</p>
            <div className="divide-y divide-white/[0.08]">
              {FAQ_ITEMS.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <h3 className="font-serif text-lg text-white leading-snug mb-3">{q}</h3>
                  <p className="font-sans text-sm leading-relaxed text-white/55">{a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 pt-8 border-t border-white/[0.08]">
              <a
                href={CONTACT.whatsappBroker}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                <MessageSquare size={14} />
                WhatsApp Carlos
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 underline-offset-2 hover:text-white hover:underline"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={14} className="text-gold flex-shrink-0" />
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">Licensed · Compliant · Confidential</p>
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Florida real estate brokerage services are provided through United Realty Group (URG). Carlos Uzcategui (FL SL705771) is a Florida Licensed Realtor® affiliated with URG.
                He is not licensed as a real estate broker in Spain. Spanish and international property opportunities are handled through referral, marketing, cooperating broker, or advisory relationships
                depending on jurisdiction, property type, and applicable regulations. Miami MLS exposure, syndication, referral compensation, cooperation, and listing distribution are subject to MLS rules,
                broker approval, written agreements, property eligibility, local law, and platform availability. We do not guarantee buyers, offers, closings, syndication results, or specific platform placement.
                All cross-border engagements are documented through formal written agreements before any engagement. Equal Housing Opportunity.
              </p>
            </div>
          </div>
        </section>

        <GlobalPartnerNetwork />

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
