import { Helmet } from "react-helmet-async";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Request a Private Listing Review | HomesProfessional.com</title>
        <meta name="description" content="Submit a confidential property positioning review request. South Florida sellers, international property owners, agencies, developers, and cooperating brokers. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="listing review South Florida, Miami MLS listing request, international property exposure, contact Carlos Uzcategui, United Realty Group contact" />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <script type="application/ld+json">{JSON.stringify({
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
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="relative overflow-hidden bg-navy-deep py-16 md:py-20 text-center">
          <AuroraBackground variant="warm" />
          <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential · Private Review</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Request a Private Listing Review
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            For South Florida sellers, international property owners, agencies, developers, and cooperating brokers. Share the essentials — Carlos reviews every submission personally. No listing commitment required.
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
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
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
