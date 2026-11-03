import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { Link } from "react-router-dom";
import {
  Building2,
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
import { CONTACT, PUBLIC_COMPLIANCE } from "../constants";

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
    icon: Scale,
    title: "Direct Seller Mandates & Valuation Strategy",
    description:
      "Precision comparative market analysis, target absorption modeling, contract structuring, post-occupancy leaseback negotiation, and escrow defense across South Florida prime corridors.",
    badge: "Seller Representation",
  },
  {
    icon: TrendingUp,
    title: "Structural MLS Distribution Engine",
    description:
      "Over 90% of buyers and winning offers originate through cooperating buyer agents in the MLS. Direct syndication to 93,000 member agents, 260+ U.S. MLSs via RPR, 200+ global portals in 19 languages, and 437+ bilateral agreements.",
    badge: "93,000 MLS Network",
  },
  {
    icon: Building2,
    title: "Institutional Brokerage Platform",
    description:
      "Personal advisory grounded in the Weston branch of United Realty Group, powered by 3,500+ Florida licensed agents and 19 Florida office locations across the state.",
    badge: "3,500+ URG Agents",
  },
  {
    icon: Globe2,
    title: "Transatlantic Spain & LATAM Desk",
    description:
      "Direct Miami MLS representation of prime Spanish and Latin American properties for American dollar exposure, with vetted local advisory teams managing on-the-ground viewings in Madrid and Costa del Sol.",
    badge: "Bilateral Bridge",
  },
] as const;

export default function AboutPage() {
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
                <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/75 md:text-lg">
                  Twenty-five years of direct representation across South Florida residential, luxury, and commercial
                  transactions. Personal accountability from valuation and MLS positioning through contract execution and
                  escrow defense.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "CLHMS Luxury Specialist",
                    "Certified Seller Rep",
                    "Licensed Since 2001",
                    "3,500+ URG Network",
                    "Miami REALTORS® (93k)",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="border border-gold/40 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold"
                    >
                      {badge}
                    </span>
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

        {/* Section 2: Four Core Advisory Disciplines */}
        <section className="border-b border-bone bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">
                Institutional Practice · Scope of Representation
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl lg:text-5xl">
                Direct Principal Advisory Across Four Corridors
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-navy/70">
                Every mandate is managed personally by Carlos as Florida principal of record—never delegated to an intake
                pool or junior licensees.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ADVISORY_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="flex flex-col justify-between border border-bone bg-ivory/40 p-6 transition-colors hover:border-gold/60"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-none border border-gold/30 bg-gold/10 text-gold-ink">
                          <Icon size={20} />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold-ink">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-xl leading-snug text-navy">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-navy/70">
                        {pillar.description}
                      </p>
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
                  Whether preparing a South Florida luxury property for sale, evaluating portfolio acquisition, or coordinating
                  a cross-border referral, share your objectives directly with Carlos.
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
