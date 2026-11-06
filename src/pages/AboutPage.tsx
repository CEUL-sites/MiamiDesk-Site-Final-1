import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm } from "../components/LeadForm";
import { FaqAccordion, type FaqItem } from "../components/FaqAccordion";
import { CONTACT } from "../constants";

const ABOUT_FAQS: readonly FaqItem[] = [
  {
    q: "Who is Carlos Uzcategui and what are his professional credentials?",
    a: "Carlos Uzcategui is a Florida Licensed REALTOR® (License SL705771, licensed since 2001) with 25 years of continuous South Florida transaction experience. He holds the Certified Luxury Home Marketing Specialist (CLHMS) and Certified Seller Representative designations and is an Associate in United Realty Group.",
  },
  {
    q: "Does Carlos personally manage client assignments or delegate to junior agents?",
    a: "Every mandate is directed personally by Carlos as Florida principal of record. From initial valuation modeling and pricing strategy to MLS positioning, showings coordination, contract negotiation, post-occupancy structuring, and escrow defense, clients work directly with Carlos.",
  },
  {
    q: "What is Carlos Uzcategui's relationship with United Realty Group and Miami REALTORS®?",
    a: "Carlos operates out of United Realty Group's Weston advisory branch. United Realty Group provides institutional statewide platform infrastructure with 3,500+ licensed Florida agents and 19 Florida office locations (Headquarters in Plantation, FL). He is an active member of Miami and South Florida REALTORS®, the largest local Realtor association in the world with 93,000 member agents.",
  },
  {
    q: "How does Carlos structure international and transatlantic transactions?",
    a: "Through the Miami Global Desk, Carlos represents eligible prime Spanish and Latin American properties directly on the Miami MLS for exposure to American dollar capital, while partnering with vetted, licensed on-the-ground advisory teams in Madrid, Costa del Sol, and regional markets to conduct physical viewings and local negotiations.",
  },
];

const ADVISORY_PILLARS = [
  {
    id: "seller-mandates",
    num: "01",
    icon: Scale,
    shortLabel: "01 · Seller Mandates",
    title: "Direct Seller Mandates & Valuation Strategy",
    headline: "100% Principal-Led Pricing, Positioning & Contract Defense",
    description:
      "Precision comparative market analysis, target absorption modeling, contract structuring, post-occupancy leaseback negotiation, and escrow defense across South Florida prime corridors.",
    badge: "Seller Representation",
    metrics: [
      { value: "25 Yrs", label: "Licensed FL Principal" },
      { value: "CLHMS", label: "Luxury Specialist" },
      { value: "Direct", label: "Zero Junior Delegation" },
    ],
    deliverables: [
      "Verified MLS CMA & submarket absorption modeling",
      "Post-closing occupancy & transition timing terms",
      "Inspection, appraisal & escrow risk defense",
    ],
    ctaLabel: "Explore Seller Representation",
    ctaHref: "/sell",
  },
  {
    id: "mls-engine",
    num: "02",
    icon: TrendingUp,
    shortLabel: "02 · 93,000 MLS Engine",
    title: "Structural MLS Distribution Engine",
    headline: "Built for the >90% Cooperating Buyer-Agent Reality",
    description:
      "Over 90% of buyers and winning offers originate through cooperating buyer agents in the MLS. Direct syndication to 93,000 member agents, 260+ U.S. MLSs via RPR, 200+ global portals in 19 languages, and 437+ bilateral agreements.",
    badge: "93,000 MLS Network",
    metrics: [
      { value: "93,000", label: "Member Agents" },
      { value: "260+", label: "U.S. MLSs via RPR" },
      { value: "200+", label: "Global Portals (19 Langs)" },
    ],
    deliverables: [
      "Complete seller disclosure & HOA/condo packet readiness",
      "MLS Reverse Prospecting to active buyer searches",
      "11 direct North American MLS data exchanges",
    ],
    ctaLabel: "Request Property Valuation",
    ctaHref: "/home-value",
  },
  {
    id: "urg-platform",
    num: "03",
    icon: Building2,
    shortLabel: "03 · 3,500+ URG Platform",
    title: "Institutional Brokerage Platform",
    headline: "Personal Advisory Backed by Statewide Scale",
    description:
      "Personal advisory grounded in the Weston branch of United Realty Group, powered by 3,500+ Florida licensed agents and 19 Florida office locations across the state.",
    badge: "3,500+ URG Agents",
    metrics: [
      { value: "3,500+", label: "FL Licensed Agents" },
      { value: "19", label: "FL Office Locations" },
      { value: "Weston", label: "Primary Advisory Desk" },
    ],
    deliverables: [
      "Tri-county coverage across Miami-Dade, Broward & Palm Beach",
      "Statewide internal broker & relocation network",
      "Institutional compliance & transaction governance",
    ],
    ctaLabel: "Explore Tri-County Markets",
    ctaHref: "/markets",
  },
  {
    id: "global-desk",
    num: "04",
    icon: Globe2,
    shortLabel: "04 · Spain & LATAM Desk",
    title: "Transatlantic Spain & LATAM Desk",
    headline: "U.S. Dollar Exposure With Vetted Local Execution",
    description:
      "Direct Miami MLS representation of prime Spanish and Latin American properties for American dollar exposure, with vetted local advisory teams managing on-the-ground viewings in Madrid and Costa del Sol.",
    badge: "Bilateral Bridge",
    metrics: [
      { value: "437+", label: "Bilateral Partners" },
      { value: "EN / ES", label: "Bilingual Execution" },
      { value: "U.S. MLS", label: "Principal of Record" },
    ],
    deliverables: [
      "Direct Miami MLS syndication for eligible international assets",
      "Co-brokering with established Madrid & Marbella agencies",
      "Protected written referral & co-listing agreements",
    ],
    ctaLabel: "Open Miami Global Desk",
    ctaHref: "/global-desk",
  },
] as const;

export default function AboutPage() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  return (
    <>
      <Helmet>
        <title>About Carlos Uzcategui | South Florida REALTOR® | United Realty Group</title>
        <meta
          name="description"
          content="Carlos Uzcategui, FL SL705771 — South Florida REALTOR® with United Realty Group. 25 years across Miami-Dade, Broward, and Palm Beach. CLHMS certified."
        />
        <link rel="canonical" href="https://homesprofessional.com/about" />
        <meta property="og:title" content="About Carlos Uzcategui | United Realty Group | South Florida REALTOR®" />
        <meta
          property="og:description"
          content="Carlos Uzcategui, REALTOR® · Florida License SL705771. 25 years in South Florida real estate. CLHMS certified. United Realty Group — Miami-Dade, Broward, and Palm Beach."
        />
        <meta property="og:url" content="https://homesprofessional.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Carlos Uzcategui | South Florida REALTOR® | United Realty Group" />
        <meta
          name="twitter:description"
          content="Carlos Uzcategui, REALTOR® · Florida License SL705771. 25 years in South Florida real estate. CLHMS certified. Bilingual English/Spanish."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="about-person"
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://homesprofessional.com/#person",
          name: "Carlos Uzcategui",
          jobTitle: "REALTOR®, CLHMS",
          description:
            "South Florida REALTOR® and Certified Luxury Home Marketing Specialist (CLHMS) with 25 years of market experience. Florida License SL705771. United Realty Group.",
          image: "https://homesprofessional.com/images/carlos-headshot.jpg",
          url: "https://homesprofessional.com/about",
          telephone: CONTACT.phoneUS,
          email: CONTACT.email,
          knowsLanguage: ["en", "es"],
          worksFor: {
            "@type": "Organization",
            "@id": "https://homesprofessional.com/#organization",
            name: "United Realty Group",
          },
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "license",
              name: "Florida Real Estate License SL705771",
              recognizedBy: { "@type": "Organization", name: "Florida DBPR" },
            },
            {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: "certification",
              name: "Certified Luxury Home Marketing Specialist (CLHMS)",
            },
          ],
          areaServed: ["Miami-Dade County", "Broward County", "Palm Beach County"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "15951 SW 41 St #700",
            addressLocality: "Weston",
            addressRegion: "FL",
            postalCode: "33331",
            addressCountry: "US",
          },
          sameAs: [CONTACT.linkedin],
        }}
      />

      <JsonLd
        id="about-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://homesprofessional.com/about" },
          ],
        }}
      />

      <JsonLd
        id="about-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ABOUT_FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* Hero: Editorial Principal Profile Header */}
        <section className="border-b border-bone/20 bg-navy-deep px-6 pt-32 pb-16 sm:px-10 lg:pt-36 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-gold">About</li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Principal &amp; Florida Licensed REALTOR® · Since 2001
                </p>
                <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                  Carlos Uzcategui
                </h1>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  License SL705771 · United Realty Group · Weston Advisory Branch
                </p>
                <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/75 md:text-lg">
                  Twenty-five years of direct representation across South Florida residential, luxury, and commercial
                  transactions—from valuation and MLS positioning through contract execution and escrow defense.
                </p>

                {/* Executive At-a-Glance Metrics Strip */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { k: "25 Yrs", v: "Licensed Since 2001" },
                    { k: "CLHMS", v: "Luxury Specialist" },
                    { k: "93,000", v: "Miami REALTORS®" },
                    { k: "3,500+", v: "URG FL Agents" },
                  ].map((stat) => (
                    <div
                      key={stat.k}
                      className="border border-gold/35 bg-white/[0.04] px-3.5 py-2.5"
                    >
                      <p className="font-serif text-xl text-gold">{stat.k}</p>
                      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/65">
                        {stat.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex min-h-12 items-center justify-center bg-gold px-7 py-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-navy transition-colors hover:bg-gold-light"
                  >
                    Request Private Consultation
                  </a>
                  <a
                    href={CONTACT.whatsappUS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    Direct &amp; WhatsApp ({CONTACT.phoneUS})
                  </a>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative overflow-hidden border border-gold/40 bg-navy p-3 shadow-2xl">
                  <img
                    src={CONTACT.headshot}
                    alt="Carlos Uzcategui, REALTOR®, Florida License SL705771, with United Realty Group, serving South Florida and Madrid since 2001"
                    className="h-80 w-80 object-cover sm:h-96 sm:w-96"
                    width="384"
                    height="384"
                  />
                  <div className="border-t border-gold/30 bg-navy-deep px-4 py-3 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                      Carlos Uzcategui · SL705771
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/60">
                      United Realty Group · Bilingual EN / ES
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Four-Corridor Advisory Command Deck */}
        <section className="border-b border-bone bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">
                  Institutional Practice · Scope of Representation
                </p>
                <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl lg:text-5xl">
                  Direct Principal Advisory Across Four Corridors
                </h2>
              </div>
              <p className="max-w-md font-sans text-sm leading-relaxed text-navy/70">
                Select a corridor below to inspect how every mandate is managed personally by Carlos as Florida principal of record.
              </p>
            </div>

            {/* 4-Corridor Selector Tabs */}
            <div
              role="tablist"
              aria-label="Four Core Advisory Corridors"
              className="mt-10 grid grid-cols-2 gap-2.5 lg:grid-cols-4"
            >
              {ADVISORY_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = activePillarIndex === idx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    id={`tab-${pillar.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${pillar.id}`}
                    onClick={() => setActivePillarIndex(idx)}
                    className={`flex flex-col justify-between border p-4 text-left transition-all ${
                      isSelected
                        ? "border-navy-deep bg-navy-deep text-white shadow-md"
                        : "border-bone bg-ivory/50 text-navy hover:border-gold/60 hover:bg-ivory"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                          isSelected ? "text-gold" : "text-gold-ink"
                        }`}
                      >
                        {pillar.shortLabel}
                      </span>
                      <Icon size={16} className={isSelected ? "text-gold" : "text-gold-ink"} />
                    </div>
                    <p
                      className={`mt-3 font-serif text-base leading-snug ${
                        isSelected ? "text-white" : "text-navy"
                      }`}
                    >
                      {pillar.badge}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Prerender-Safe Corridor Panels */}
            <div className="mt-6">
              {ADVISORY_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = activePillarIndex === idx;
                return (
                  <div
                    key={pillar.id}
                    id={`panel-${pillar.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${pillar.id}`}
                    hidden={!isSelected}
                    className="border border-bone bg-ivory/40 p-6 md:p-10"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                      <div>
                        <div className="inline-flex items-center gap-2.5 border border-gold/40 bg-white px-3.5 py-1.5">
                          <Icon size={15} className="text-gold-ink" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl text-navy md:text-3xl">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-ink">
                          {pillar.headline}
                        </p>
                        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/75 md:text-base">
                          {pillar.description}
                        </p>

                        <ul className="mt-5 space-y-2.5 border-t border-bone pt-4">
                          {pillar.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-navy/80">
                              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-gold-ink" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6">
                          <Link
                            to={pillar.ctaHref}
                            className="inline-flex items-center gap-2 bg-navy-deep px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy"
                          >
                            {pillar.ctaLabel}
                            <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>

                      {/* Key Metrics Tile Grid */}
                      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                        {pillar.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center justify-between border border-bone bg-white px-5 py-4"
                          >
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/65">
                              {m.label}
                            </span>
                            <span className="font-serif text-2xl text-navy-deep">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Professional Background & Institutional Brokerage Proof */}
        <AboutContact
          showForm={false}
          compact
          title="Professional Background & Infrastructure"
          eyebrow="Institutional Governance"
        />

        {/* Section 4: Private Consultation & Direct Advisory Desk */}
        <section id="contact" className="border-t border-bone bg-navy-deep px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                  Direct Access · Private Review
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Schedule a Private Consultation With Carlos Uzcategui
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                  Selling a South Florida property, evaluating an acquisition, or coordinating a cross-border referral? Connect directly with Carlos.
                </p>

                {/* Direct Channels Ledger */}
                <div className="mt-8 space-y-3.5 border border-white/15 bg-white/[0.03] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                    Direct Advisory Channels
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={CONTACT.whatsappUS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 border border-white/10 bg-navy/60 p-3.5 transition-colors hover:border-gold/60"
                    >
                      <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                      <div className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                          Direct &amp; WhatsApp (U.S.)
                        </span>
                        <span className="mt-1 block font-sans text-sm font-medium text-white">
                          {CONTACT.phoneUS}
                        </span>
                      </div>
                    </a>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-start gap-3 border border-white/10 bg-navy/60 p-3.5 transition-colors hover:border-gold/60"
                    >
                      <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                      <div className="min-w-0">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-white/55">
                          Direct Email
                        </span>
                        <span className="mt-1 block break-all font-sans text-sm font-medium text-white">
                          {CONTACT.email}
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="grid gap-3 pt-1 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5 text-xs text-white/75">
                      <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <span className="font-medium text-white">Weston Advisory Office:</span>{" "}
                        15951 SW 41 St #700, Weston, FL 33331
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-white/75">
                      <Clock size={15} className="mt-0.5 shrink-0 text-gold" />
                      <div>
                        <span className="font-medium text-white">Consultation Hours:</span>{" "}
                        Mon–Fri 9:00 AM – 6:00 PM EST (EN / ES)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/70">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-gold" />
                    <span>
                      Every inquiry is reviewed directly by Carlos Uzcategui as Florida principal of record—never routed to an
                      intake call center.
                    </span>
                  </div>
                </div>
              </div>

              <div id="listing-request">
                <LeadForm compactHeading />
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Principal Advisory FAQ */}
        <section className="border-t border-bone bg-ivory px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">
              Principal Governance · FAQ
            </p>
            <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">
              Frequently Asked Advisory Questions
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-navy/70">
              Clear answers regarding licensing, credentials, principal representation, and consultation scheduling.
            </p>
            <div className="mt-8 border-t border-bone">
              <FaqAccordion faqs={ABOUT_FAQS} tone="light" defaultOpen={0} />
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
