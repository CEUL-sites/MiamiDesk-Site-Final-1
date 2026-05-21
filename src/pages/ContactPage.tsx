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
        <title>Free South Florida Real Estate Strategy Review | United Realty Group | Weston & Madrid</title>
        <meta name="description" content="Request a free South Florida seller strategy review — no listing commitment. WhatsApp: +1 954-865-6622 (U.S.) or +34 646 853 078 (Madrid). United Realty Group. Response within one business day." />
        <meta name="keywords" content="contact South Florida realtor, free real estate strategy review, sell home consultation Miami, United Realty Group contact, WhatsApp real estate Miami, real estate agent Weston FL" />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Free Strategy Review", "item": "https://homesprofessional.com/contact" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact United Realty Group — South Florida Real Estate",
          "url": "https://homesprofessional.com/contact",
          "description": "Request a free South Florida seller strategy review. No listing commitment required. Contact by WhatsApp, email, or form.",
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui — United Realty Group",
            "telephone": "+1-954-865-6622",
            "email": "contact@carlosre.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "15951 SW 41 St #700",
              "addressLocality": "Weston",
              "addressRegion": "FL",
              "postalCode": "33331",
              "addressCountry": "US"
            },
            "contactPoint": [
              { "@type": "ContactPoint", "telephone": "+1-954-865-6622", "contactType": "sales", "areaServed": "US", "availableLanguage": ["English", "Spanish"] },
              { "@type": "ContactPoint", "telephone": "+34-646-853-078", "contactType": "sales", "areaServed": "ES", "availableLanguage": "Spanish" }
            ]
          }
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <PageHero
          eyebrow="Direct Access"
          headline="Request Your Free"
          headlineGold="Strategy Review."
          subhead="No listing commitment required. Our licensed team reviews every property personally before responding. Typical response within one business day."
          ctaLabel="Scroll to the Form Below"
          ctaHref="#contact"
          whatsappHref={CONTACT.whatsappUS}
          badge="Free · Confidential · Licensed Professionals"
        />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
