import { useEffect, useState } from "react";
import "../components/advisory-heroes.css";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm, type ContactIntent } from "../components/LeadForm";
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

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const deskParam = searchParams.get("desk") ?? "";
  const validDesk = Object.hasOwn(DESK_CONTEXT, deskParam) ? deskParam : "";
  const requestedIntent = searchParams.get("intent");
  const urlIntent: ContactIntent = validDesk ? "international" : requestedIntent === "buyer" || requestedIntent === "referral" || requestedIntent === "international" ? requestedIntent : "seller";
  const [intent, setIntent] = useState<ContactIntent>(urlIntent);
  useEffect(() => { setIntent(urlIntent); }, [urlIntent, deskParam]);
  const deskCtx = intent === "international" ? DESK_CONTEXT[validDesk] : undefined;

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
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="advisory-contact">
          <div className="advisory-contact-intro">
            <p className="advisory-eyebrow">{deskCtx?.eyebrow ?? "Direct access · Personal accountability"}</p>
            <h1>{deskCtx?.heading ?? "Let’s Discuss Your Property and Your Next Move."}</h1>
            <p className="advisory-summary">{deskCtx?.intro ?? "Selling, buying, referring a client or exploring an international partnership? Share your objectives for a private conversation with Carlos."}</p>
            <div className="principal-signature"><img src={CONTACT.headshot} alt="Carlos Uzcategui" width="80" height="80" /><p><strong>Carlos Uzcategui, REALTOR®</strong><span>Florida licensed since 2001<br />United Realty Group · English / Spanish</span></p></div>
          </div>
          <div id="listing-request" className="advisory-contact-form">
            <fieldset className="inquiry-intents"><legend>I’d like to discuss</legend>
              {([['seller','Selling'],['buyer','Buying'],['international','International partnership'],['referral','A referral']] as const).map(([value,label]) => <label key={value}><input type="radio" name="inquiry-intent" value={value} checked={intent === value} onChange={() => setIntent(value)} />{label}</label>)}
            </fieldset>
            <LeadForm desk={intent === "international" ? validDesk || "global" : undefined} intent={intent} compactHeading />
          </div>
        </section>
        <AboutContact showForm={false} compact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
