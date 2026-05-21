import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { PageHero } from "../components/PageHero";
import { CONTACT } from "../constants";

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
        <PageHero
          eyebrow="Direct Access"
          headline="Request Your Free"
          headlineGold="Strategy Review."
          subhead="No listing commitment required. Carlos reviews every property personally before responding. Typical response within one business day."
          ctaLabel="Scroll to the Form Below"
          ctaHref="#contact"
          whatsappHref={CONTACT.whatsappUS}
          badge="Free · Confidential · Direct to Carlos"
        />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
