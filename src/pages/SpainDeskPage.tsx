import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { InternationalBridge } from "../components/InternationalBridge";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";

export default function SpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Spain to Miami MLS | List Spanish Property in U.S. | Carlos Uzcategui</title>
        <meta name="description" content="Activate your Spanish or LATAM property in the Miami MLS. Reach 93,000 U.S. Realtors representing the exact LATAM and North American buyers your market depends on." />
        <link rel="canonical" href="https://homesprofessional.com/spain-desk" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Spain Desk", "item": "https://homesprofessional.com/spain-desk" }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <div className="pt-24 pb-10 bg-navy-deep text-white text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">International Activation Bridge</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
            Your Spanish Property.<br />
            <span className="italic text-gold">The Miami MLS. One Licensed U.S. Principal.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-sans text-lg font-light leading-relaxed text-white/65">
            Activate your Spanish or LATAM property in the Miami and South Florida REALTORS® MLS — reaching 93,000 U.S. Realtors who represent the exact LATAM and North American buyers your market depends on.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="text-gold flex-shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              FL Realtor® SL705771 · Madrid Office · Bilingual EN / ES
            </span>
          </div>
        </div>
        <InternationalBridge />
        <CarlosTrust />
        <section id="contact" className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Direct to Carlos · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
