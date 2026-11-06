import { useEffect, useState } from "react";
import "../components/advisory-heroes.css";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm, type ContactIntent } from "../components/LeadForm";
import { FaqAccordion, type FaqItem } from "../components/FaqAccordion";
import { CONTACT } from "../constants";

// Contextual framing for Global Desk arrivals. The ?desk= param carried by the
// Global Desk CTAs is read here so the request lands pre-segmented rather than
// dropping the visitor onto the generic seller desk.
const DESK_CONTEXT: Record<string, { eyebrow: string; heading: string; intro: string }> = {
  "spain-developer": {
    eyebrow: "Miami Global Listing Desk · Developer Brief",
    heading: "Request a Developer Activation Brief",
    intro: "For Spanish developers evaluating South Florida buyer-agent activation for selected new-build or prime units through Carlos Uzcategui, REALTOR® and Florida real estate licensee SL705771, and United Realty Group. Share the development, market, and unit count — Carlos reviews every submission personally.",
  },
  "spain-agency": {
    eyebrow: "Miami Global Listing Desk · Agency Cooperation Proposal",
    heading: "Request an Agency Cooperation Proposal",
    intro: "For established Spanish agencies seeking South Florida-facing buyer-agent activation while keeping the local mandate. Written cooperation is subject to brokerage, platform, and compliance requirements. Carlos reviews every submission personally.",
  },
  global: {
    eyebrow: "Global Desk · Distribution Assessment",
    heading: "Request a Distribution Assessment",
    intro: "A written read on whether selected international inventory fits the South Florida buyer-agent ecosystem, which activation path is appropriate, and which compliance requirements apply.",
  },
};

const INTENT_BRIEFINGS: Record<
  ContactIntent,
  { badge: string; headline: string; points: readonly string[] }
> = {
  seller: {
    badge: "01 · Private Seller Strategy Review",
    headline: "MLS Valuation, 93,000-Agent Distribution & Net Proceeds Brief",
    points: [
      "Verified closed & active MLS comparables for your submarket",
      "Post-closing occupancy & synchronized next-move options",
    ],
  },
  buyer: {
    badge: "02 · Buyer & Relocation Mandate",
    headline: "Tri-County Property Underwriting & Contract Representation",
    points: [
      "HOA/condo reserve, insurance & flood-zone underwriting",
      "Access to active MLS inventory across Miami-Dade, Broward & Palm Beach",
    ],
  },
  international: {
    badge: "03 · Miami Global Desk Partnership",
    headline: "Bilateral U.S. MLS Exposure for Spain & LATAM Assets",
    points: [
      "Direct Miami MLS positioning with Carlos as FL principal of record",
      "Protected local agency mandate & written cooperation structure",
    ],
  },
  referral: {
    badge: "04 · Cooperating Broker Referral",
    headline: "Written Referral Fee Protection & Principal Execution",
    points: [
      "Documented referral agreement executed prior to client introduction",
      "Direct representation by Carlos (25 years licensed FL experience)",
    ],
  },
};

const CONTACT_FAQS: readonly FaqItem[] = [
  {
    q: "Who reviews my inquiry when I submit this form?",
    a: "Every submission is reviewed personally by Carlos Uzcategui, REALTOR® (Florida License SL705771). Inquiries are never routed to an unlicensed call center, automated chatbot queue, or junior intake team.",
  },
  {
    q: "What should I include when requesting a Private Seller Strategy Review?",
    a: "Share your property address or community, target timeline, and whether you require post-occupancy flexibility or cross-border coordination. Knowing these parameters allows Carlos to prepare recent MLS comparables, inventory absorption metrics, and cooperating buyer-agent demand data prior to your conversation.",
  },
  {
    q: "How do cooperating brokers and international agencies initiate a referral or partnership?",
    a: "Select 'A referral' or 'International partnership' above to route your inquiry directly with the appropriate desk attribution, or use the dedicated intake desks on the Agents & Referrals and Miami Global Desk pages. All referral and bilateral arrangements are documented in writing prior to client introduction.",
  },
  {
    q: "Are consultations available in Spanish and across European or Latin American time zones?",
    a: "Yes. Consultations are conducted with native fluency in English and Spanish via direct telephone, WhatsApp, or private video conference, scheduled across U.S. Eastern, European (CET), and Latin American business hours.",
  },
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const deskParam = searchParams.get("desk") ?? "";
  const validDesk = Object.prototype.hasOwnProperty.call(DESK_CONTEXT, deskParam) ? deskParam : "";
  const requestedIntent = searchParams.get("intent");
  const urlIntent: ContactIntent = validDesk ? "international" : requestedIntent === "buyer" || requestedIntent === "referral" || requestedIntent === "international" ? requestedIntent : "seller";
  const [intent, setIntent] = useState<ContactIntent>(urlIntent);
  useEffect(() => { setIntent(urlIntent); }, [urlIntent, deskParam]);
  const deskCtx = intent === "international" ? DESK_CONTEXT[validDesk] : undefined;
  const activeBrief = INTENT_BRIEFINGS[intent];

  return (
    <>
      <Helmet>
        <title>Contact Carlos Uzcategui | Private Real Estate Consultation</title>
        <meta name="description" content="Discuss selling, buying, a professional referral or an international partnership with Carlos Uzcategui, Florida licensed REALTOR® SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <meta property="og:title" content="Contact Carlos Uzcategui | Private Real Estate Consultation" />
        <meta property="og:description" content="Discuss selling, buying, a professional referral or an international partnership with Carlos Uzcategui, Florida licensed REALTOR® SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Carlos Uzcategui | Private Real Estate Consultation" />
        <meta name="twitter:description" content="Discuss your real estate objectives privately with Carlos Uzcategui, Florida licensed REALTOR® SL705771." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="contact-contactpage" data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Carlos Uzcategui — United Realty Group",
          "url": "https://homesprofessional.com/contact",
          "mainEntity": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "telephone": CONTACT.phoneUS,
            "email": CONTACT.email,
            "availableLanguage": ["English", "Spanish"],
            "areaServed": "South Florida",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          }
        }} />
      <JsonLd id="contact-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://homesprofessional.com/contact" },
          ],
        }} />
      <JsonLd id="contact-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": CONTACT_FAQS.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />
        <section className="advisory-contact">
          <div className="advisory-contact-intro">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-gold">Contact</li>
              </ol>
            </nav>
            <p className="advisory-eyebrow">{deskCtx?.eyebrow ?? "Direct access · Personal accountability"}</p>
            <h1>{deskCtx?.heading ?? "Let’s Discuss Your Property and Your Next Move."}</h1>
            <p className="advisory-summary">{deskCtx?.intro ?? "Selling, buying, referring a client or exploring an international partnership? Share your objectives for a private conversation with Carlos."}</p>
            <div className="principal-signature">
              <img src={CONTACT.headshot} alt="Carlos Uzcategui" width="80" height="80" />
              <p>
                <strong>Carlos Uzcategui, REALTOR®</strong>
                <span>Florida licensed since 2001 · SL705771<br />United Realty Group · English / Spanish</span>
              </p>
            </div>

            {/* Dynamic Intent Briefing Card (updates live with form selection) */}
            <div className="mt-5 border border-gold/35 bg-white/[0.04] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {activeBrief.badge}
              </p>
              <p className="mt-1.5 font-serif text-lg text-white">
                {activeBrief.headline}
              </p>
              <ul className="mt-2.5 space-y-1.5">
                {activeBrief.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-white/75">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-gold" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Advisory Channels Ledger */}
            <div className="mt-5 space-y-3 border border-white/15 bg-white/[0.03] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Direct Advisory Channels
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={CONTACT.whatsappUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 border border-white/10 bg-navy-deep/60 p-3.5 transition-colors hover:border-gold/60"
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
                  className="flex items-start gap-3 border border-white/10 bg-navy-deep/60 p-3.5 transition-colors hover:border-gold/60"
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
                  Every inquiry is reviewed directly by Carlos Uzcategui as Florida principal of record — never routed to an intake call center.
                </span>
              </div>
            </div>
          </div>

          <div id="listing-request" className="advisory-contact-form">
            <fieldset className="inquiry-intents"><legend>I’d like to discuss</legend>
              {([['seller','Selling'],['buyer','Buying'],['international','International partnership'],['referral','A referral']] as const).map(([value,label]) => <label key={value}><input type="radio" name="inquiry-intent" value={value} checked={intent === value} onChange={() => setIntent(value)} />{label}</label>)}
            </fieldset>
            <LeadForm desk={intent === "international" ? validDesk || "global" : undefined} intent={intent} compactHeading />
          </div>
        </section>

        <AboutContact showForm={false} compact />

        {/* Private Consultation & Engagement FAQ */}
        <section className="border-t border-bone bg-navy-deep px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              Consultation Protocol · FAQ
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
              Private Consultation &amp; Engagement Questions
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/70">
              How private seller strategy reviews, buyer consultations, broker referrals, and international inquiries are handled.
            </p>
            <div className="mt-8 border-t border-white/10">
              <FaqAccordion faqs={CONTACT_FAQS} tone="dark" defaultOpen={0} />
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
