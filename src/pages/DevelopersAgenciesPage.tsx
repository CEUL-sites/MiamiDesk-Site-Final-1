import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { LeadForm } from "../components/LeadForm";
import { CONTACT, LEAD_MAGNETS, SOURCES } from "../constants";

const PROPERTY_TYPES = [
  {
    title: "Residential Resale",
    body: "Luxury homes, waterfront estates, and investment-grade residences seeking Miami-facing exposure through professional MLS activation and buyer-agent network visibility.",
  },
  {
    title: "Luxury Properties",
    body: "High-value homes and estates requiring institutional presentation, discreet marketing, and access to the qualified buyer networks that serve this segment.",
  },
  {
    title: "New Developments",
    body: "Pre-construction and newly completed developments seeking South Florida buyer and investor attention through the agent network, portal distribution, and referral pipelines.",
  },
  {
    title: "Investment Property",
    body: "Income-producing assets, multifamily, or portfolio holdings positioned to attract investor-profile buyers through the correct professional channels.",
  },
  {
    title: "Condo-Hotel & Branded Residential",
    body: "Mixed-use, fractional, and branded residential opportunities requiring specialized positioning and access to the UHNW and family office buyer segment.",
  },
  {
    title: "Portfolio Opportunities",
    body: "Multi-property or development portfolio introductions for agencies and developers seeking a structured Miami-facing presentation rather than individual asset marketing.",
  },
];

const WHO_THIS_IS_FOR = [
  { label: "Spanish Real Estate Agencies", desc: "Agencies in Madrid, Barcelona, and across Spain seeking a compliant Miami referral, marketing, and exposure bridge for clients with South Florida objectives." },
  { label: "Madrid Developers", desc: "Developers of luxury and branded residential projects seeking investor and buyer visibility through the Miami and South Florida real estate ecosystem." },
  { label: "Latin American Brokers", desc: "Brokers in Colombia, Venezuela, Argentina, Brazil, Mexico, and Panama with clients selling locally and buying in South Florida — or seeking cross-market exposure." },
  { label: "International Family Offices", desc: "Family offices seeking discreet, professional presentation of real estate assets across South Florida or through the Miami referral network." },
  { label: "Cooperating Brokers & Listing Holders", desc: "International listing holders seeking a licensed Florida principal of record, compliant cooperating broker agreement, or structured referral pathway into the Miami market." },
];

export default function DevelopersAgenciesPage() {
  return (
    <>
      <Helmet>
        <title>For Agencies, Developers & International Listing Holders | HomesProfessional.com</title>
        <meta name="description" content="If your property or project deserves exposure beyond its local market, HomesProfessional can structure a Miami-facing presentation, referral pathway, and distribution strategy. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="Miami real estate for developers, Spain agency Miami exposure, international listing holder Miami, cooperating broker South Florida, Madrid developer Miami MLS, Latin American property Miami" />
        <link rel="canonical" href="https://homesprofessional.com/developers-agencies" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "HomesProfessional — Developers & Agencies",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Advisory & Distribution",
          "description": "Miami-facing exposure and referral coordination for international agencies, developers, and listing holders seeking access to the South Florida real estate network.",
          "areaServed": ["South Florida", "Spain", "Latin America", "Europe"],
          "url": "https://homesprofessional.com/developers-agencies"
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">For Agencies · Developers · International Listing Holders</p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
          >
            For Agencies, Developers,<br />
            <em className="not-italic italic text-gold">and International Listing Holders.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            If your property or project deserves exposure beyond its local market, HomesProfessional can help structure
            a Miami-facing presentation, referral pathway, and distribution strategy through compliant professional channels.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#property-review"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Submit Your Property or Project
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

        {/* Who this is for */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Who submits to the international desk</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Miami-facing exposure for qualified international properties and projects.
            </h2>
            <div className="mt-12 space-y-0 divide-y divide-hairline border border-hairline">
              {WHO_THIS_IS_FOR.map((w) => (
                <div key={w.label} className="flex flex-col gap-2 p-7 sm:flex-row sm:items-start sm:gap-8">
                  <h3 className="shrink-0 font-serif text-lg text-navy-deep sm:w-56">{w.label}</h3>
                  <p className="font-sans text-sm leading-relaxed text-ink-primary/65">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property types */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Property types handled</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              From single luxury assets to multi-property portfolio introductions.
            </h2>
            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
              {PROPERTY_TYPES.map((p) => (
                <div key={p.title} className="bg-navy-deep p-8">
                  <h3 className="font-serif text-xl text-white">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agent Activation — not just portal exposure */}
        <section className="bg-white py-20 md:py-28 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Distribution Strategy
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Distribution is not only portal exposure.<br />
              <em className="not-italic italic">It is agent activation.</em>
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/65">
              For developers and agencies, getting a property onto portals is step one — not the strategy.
              {" "}{SOURCES.buyerAgentStatement} Buyer agents and referral partners need the right facts,
              pricing logic, high-quality visuals, availability clarity, and a professional who responds quickly.
              A listing that reaches the right agents, prepared correctly, moves. A listing that only exists
              on portals waits.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                {
                  title: "Facts & Positioning",
                  body: "Accurate data, clear pricing logic, and a property narrative that buyer agents can explain to their clients with confidence.",
                },
                {
                  title: "Agent-Ready Materials",
                  body: "Professional media, broker remarks, showing instructions, and documentation packages built for the professional receiving the listing, not just the consumer.",
                },
                {
                  title: "Response & Follow-Through",
                  body: "Fast response to buyer-agent inquiries, showing coordination, and active follow-up after agent visits — because momentum in the professional network drives offers.",
                },
              ].map((c) => (
                <div key={c.title} className="bg-ivory p-7">
                  <h3 className="font-serif text-lg text-navy-deep">{c.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-primary/35">
              Source: {SOURCES.nar}
            </p>
          </div>
        </section>

        {/* What to expect */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What to expect</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Compliant. Documented. Professional.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { n: "01", h: "Professional Review", b: "Every property or project is reviewed personally for exposure fit, compliance pathway, and positioning strategy before any commitment is made." },
                { n: "02", h: "Structured Pathway", b: "Referral agreements, cooperating broker documentation, and marketing representation proposals are structured before activation. No ambiguity." },
                { n: "03", h: "Miami Network Activation", b: "Distribution into the 93,000-agent Miami and South Florida REALTORS® network, 500+ global portals, and 437+ international referral channels." },
              ].map((item) => (
                <div key={item.n} className="border border-hairline p-8">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{item.n}</div>
                  <h3 className="font-serif text-xl text-navy-deep">{item.h}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{item.b}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 border-l-2 border-gold/40 pl-6">
              <p className="font-sans text-sm leading-relaxed text-ink-primary/60">
                <strong className="font-medium text-ink-primary/80">A note on compliance:</strong>{" "}
                Florida real estate brokerage services are provided through United Realty Group. International property
                opportunities are handled through referral, marketing, cooperating broker, or advisory relationships
                depending on jurisdiction, property type, and applicable regulations. HomesProfessional does not
                imply licensure in any jurisdiction other than the State of Florida.
              </p>
            </div>
          </div>
        </section>

        <GlobalPartnerNetwork />

        {/* Lead form */}
        <section className="bg-navy-deep py-16 md:py-24" id="property-review">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential · Private Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit your property, project, or portfolio for review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For agencies, developers, cooperating brokers, and international listing holders.
                Share the essentials — Carlos reviews every submission personally before responding.
              </p>
            </div>
            <LeadForm />
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
            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-white/45 mb-3">Prefer to speak directly?</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:border-gold hover:text-gold transition-colors">
                  WhatsApp US: {CONTACT.phoneUSDisplay}
                </a>
                <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:border-gold hover:text-gold transition-colors">
                  WhatsApp España: {CONTACT.phoneSpainDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
