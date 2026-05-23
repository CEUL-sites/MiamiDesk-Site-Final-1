import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { ASSOCIATION_STATS, CONTACT } from "../constants";

const proofPoints = [
  {
    value: "25",
    label: "Years licensed",
    detail: "Florida real estate license SL705771. Active South Florida residential, luxury, and commercial advisory since 2001.",
  },
  {
    value: "93,000",
    label: "Member agents",
    detail: `Market exposure through ${ASSOCIATION_STATS.associationName}, referenced as the world's largest local Realtor association.`,
  },
  {
    value: "200+",
    label: "Global portals",
    detail: "Listing syndication channels positioned for domestic, LATAM, European, and relocation buyer discovery.",
  },
  {
    value: "19",
    label: "Languages",
    detail: "International distribution support for multilingual buyer visibility and cross-border inquiries.",
  },
];

const mediaAngles = [
  "How South Florida sellers can use MLS infrastructure, not just public portals, to reach buyer-agent demand.",
  "Why Madrid, Latin America, and Miami remain connected buyer corridors for luxury and relocation real estate.",
  "What sellers should know before pricing property in Weston, Brickell, Coral Gables, Aventura, and Miami Beach.",
];

const sourceNotes = [
  "Association statistics on this website are attributed to Miami and South Florida REALTORS® published data.",
  "Live MLS listing data is deemed reliable but not guaranteed and should be verified before publication.",
  "Carlos Uzcategui is a Florida Licensed Realtor® SL705771 and an associate with United Realty Group.",
];

export default function PressPage() {
  const canonicalUrl = "https://homesprofessional.com/press";
  const title = "Press & Market Proof | Carlos Uzcategui | HomesProfessional.com";
  const description =
    "Press background, quote-ready facts, and source notes for Carlos Uzcategui, United Realty Group, South Florida MLS exposure, and Miami-Madrid-LATAM real estate advisory.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    url: canonicalUrl,
    description,
    mainEntity: { "@id": "https://homesprofessional.com/#agent" },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        <section className="bg-navy-deep px-6 pb-16 pt-28 text-white md:pb-24 md:pt-36">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Press · Proof · Market Background</p>
              <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
                South Florida real estate context for editors, agencies, and referral partners.
              </h1>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
                Quote-ready background on Carlos Uzcategui, United Realty Group, Miami MLS exposure, and the Miami-Madrid-LATAM advisory bridge.
              </p>
            </div>

            <aside className="border border-gold/25 bg-white/[0.03] p-7">
              <p className="font-serif text-2xl text-gold">Media contact</p>
              <div className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-white/65">
                <p>{CONTACT.name}</p>
                <p>{CONTACT.licenseDisplay}</p>
                <p>{CONTACT.brokerage}</p>
                <p>{CONTACT.email}</p>
                <p>{CONTACT.phoneUS}</p>
              </div>
              <a
                href="/contact"
                className="mt-7 inline-flex bg-gold px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy"
              >
                Request background
              </a>
            </aside>
          </div>
        </section>

        <section className="bg-bone-warm px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-3xl text-navy md:text-4xl">Quote-ready proof points</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {proofPoints.map((item) => (
                <article key={item.label} className="border border-gold/25 bg-white p-7">
                  <p className="font-serif text-4xl text-gold">{item.value}</p>
                  <h3 className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-navy/60">{item.label}</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-navy/65">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Story angles</p>
              <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">Useful angles for PR, partners, and local market coverage.</h2>
            </div>
            <div className="space-y-5">
              {mediaAngles.map((angle, index) => (
                <article key={angle} className="border-l border-gold/40 pl-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">0{index + 1}</p>
                  <p className="mt-2 font-sans text-base leading-relaxed text-navy/70">{angle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl md:text-4xl">Source notes</h2>
            <div className="mt-8 space-y-4">
              {sourceNotes.map((note) => (
                <p key={note} className="border-b border-white/10 pb-4 font-sans text-sm leading-relaxed text-white/55">
                  {note}
                </p>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
