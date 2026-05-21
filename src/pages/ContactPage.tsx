import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Carlos Uzcategui | Weston FL & Madrid | Free Strategy Review</title>
        <meta name="description" content="Reach Carlos Uzcategui by WhatsApp, email, or form. U.S.: +1 954-865-6622. Madrid: +34 646 853 078. Weston, FL office. United Realty Group. No commitment required." />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://homesprofessional.com/contact" }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <div className="pt-24 pb-10 bg-navy text-white text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Free · No Commitment Required</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
            Request Your Free Strategy Review
          </h1>
          <p className="mt-5 mx-auto max-w-xl font-sans text-base font-light leading-relaxed text-white/65">
            WhatsApp, email, or form — Carlos responds personally within one business day.
          </p>
        </div>
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
