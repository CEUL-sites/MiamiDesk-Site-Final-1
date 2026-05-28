import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MLSTicker } from "../components/MLSTicker";
import { SellerStrategySection } from "../components/SellerStrategySection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { PartnersMarquee } from "../components/PartnersMarquee";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { IntelligenceDesk } from "../components/IntelligenceDesk";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { InternationalBridge } from "../components/InternationalBridge";
import { AboutContact } from "../components/AboutContact";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT } from "../constants";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>South Florida Seller Strategy | Carlos Uzcategui · FL SL705771 | HomesProfessional.com</title>
        <meta name="description" content="Carlos Uzcategui, REALTOR® FL SL705771, United Realty Group — South Florida seller advisory. Pricing discipline, professional MLS positioning, buyer-agent visibility, and international market context between South Florida and Madrid." />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Seller Strategy | Carlos Uzcategui · United Realty Group" />
        <meta property="og:description" content="25 years licensed. Senior seller advisory built around pricing discipline, professional MLS positioning, and expanded exposure infrastructure across South Florida and international markets." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="HomesProfessional.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Seller Strategy | Carlos Uzcategui · United Realty Group" />
        <meta name="twitter:description" content="25 years licensed. Senior seller advisory built around pricing discipline, professional MLS positioning, and expanded exposure infrastructure across South Florida and international markets." />
        <meta name="twitter:image" content="https://homesprofessional.com/og-image.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://homesprofessional.com/#agent",
          "name": CONTACT.name,
          "image": CONTACT.headshot,
          "description": "Florida Licensed REALTOR® with 25 years of South Florida market experience. Seller advisory, buyer representation, and international connectivity. 93,000-member association network. Licensed since 2001.",
          "url": "https://homesprofessional.com",
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "15951 SW 41 St #700",
            "addressLocality": "Weston",
            "addressRegion": "FL",
            "postalCode": "33331",
            "addressCountry": "US"
          },
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "license",
              "name": "Florida Real Estate Salesperson License SL705771"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "Certified Luxury Home Marketing Specialist (CLHMS)"
            }
          ],
          "memberOf": { "@type": "Organization", "name": "Miami and South Florida REALTORS®" },
          "worksFor": { "@type": "RealEstateOrganization", "name": "United Realty Group" },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Miami-Dade County" },
            { "@type": "AdministrativeArea", "name": "Broward County" },
            { "@type": "AdministrativeArea", "name": "Palm Beach County" }
          ],
          "knowsLanguage": ["en", "es"],
          "sameAs": [CONTACT.linkedin]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://homesprofessional.com/#website",
          "url": "https://homesprofessional.com",
          "name": "HomesProfessional.com",
          "description": "South Florida real estate advisory — seller strategy, buyer representation, and international market connectivity.",
          "publisher": { "@id": "https://homesprofessional.com/#agent" }
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <Hero />
        <MLSTicker />
        <SellerStrategySection />
        <ReachAdvantage />
        <PartnersMarquee />
        <ExposureSyndication />
        <IntelligenceDesk />
        <BuyersRelocation />
        <InternationalBridge />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
