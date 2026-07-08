import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { useSearchParams } from "react-router-dom";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

// Contextual framing for Global Desk arrivals. The ?desk= param carried by the
// Global Desk CTAs is read here so the request lands pre-segmented rather than
// dropping the visitor onto the generic seller desk.
const DESK_CONTEXT: Record<string, { eyebrow: string; heading: string; intro: string }> = {
  "spain-developer": {
    eyebrow: "Miami Global Listing Desk · Developer Brief",
    heading: "Request a Developer Activation Brief",
    intro: "For Spanish developers evaluating South Florida buyer-agent activation for selected new-build or prime units through Carlos Uzcategui, Florida Realtor®, and United Realty Group. Share the development, market, and unit count — Carlos reviews every submission personally.",
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
  const deskCtx = DESK_CONTEXT[deskParam];

  return (
    <>
      <Helmet>
        <title>Request a Private Listing Review | HomesProfessional.com</title>
        <meta name="description" content="Request a confidential property positioning review. South Florida sellers, international owners, agencies, and brokers. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="listing review South Florida, Miami MLS listing request, international property exposure, contact Carlos Uzcategui, United Realty Group contact" />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <meta property="og:title" content="Request a Private Listing Review | HomesProfessional.com" />
        <meta property="og:description" content="Submit a confidential property positioning review. South Florida sellers, international property owners, agencies, and developers. Carlos Uzcategui, FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Request a Private Listing Review | HomesProfessional.com" />
        <meta name="twitter:description" content="Submit a confidential property review. South Florida sellers and international property owners. Carlos Uzcategui, FL SL705771." />
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
        <section className="relative overflow-hidden bg-navy-deep py-16 md:py-20 text-center">
          <AuroraBackground variant="warm" />
          <div className="relative z-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{deskCtx?.eyebrow ?? "Confidential · Private Review"}</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            {deskCtx?.heading ?? "Request a Private Listing Review"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            {deskCtx?.intro ?? "For South Florida sellers, international property owners, agencies, developers, and cooperating brokers. Share the essentials — Carlos reviews every submission personally. No listing commitment required."}
          </p>
          </div>
        </section>
        <section className="relative overflow-hidden bg-navy-deep py-14 md:py-20">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential · Private Review Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit your listing for private review</h2>
            </div>
            <LeadForm desk={deskParam || undefined} />
            <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
