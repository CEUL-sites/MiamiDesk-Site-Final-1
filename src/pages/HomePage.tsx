import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { AGGREGATE_RATING, VERIFIED_REVIEWS, buildReviewSchema } from "../data/reviews";
import { JsonLd } from "../components/SEO/JsonLd";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Proof } from "../components/Proof";
import { Distribution } from "../components/Distribution";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { MarketPulse } from "../components/MarketPulse";
import { GlobalDeskTeaser } from "../components/GlobalDeskTeaser";

// Below-the-fold sections — split out of the initial bundle. With
// hydrateRoot + Suspense, React keeps the prerendered HTML visible and
// hydrates these progressively once their chunks arrive.
const AboutContact = lazy(() => import("../components/AboutContact").then((m) => ({ default: m.AboutContact })));

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>South Florida Listing Agent · Sell Your Home | Carlos Uzcategui | HomesProfessional.com</title>
        <meta name="description" content="Carlos Uzcategui, FL SL705771 · South Florida listing agent · MLS exposure and buyer-agent activation across Miami-Dade, Broward & Palm Beach." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Listing Agent · Sell Your Home | HomesProfessional.com" />
        <meta name="twitter:description" content="Local representation. Professional distribution. Global buyer reach — 93,000 Miami REALTORS® member agents." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="keywords" content="south florida listing agent, miami listing agent, sell home miami, sell home coral gables, sell home weston florida, miami beach listing agent, brickell condo listing agent, south florida realtor, miami mls listing, united realty group miami" />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Agent · Sell Your Home | HomesProfessional.com" />
        <meta property="og:description" content="Local representation. Professional distribution. Global buyer reach. MLS exposure plus buyer-agent activation across 93,000 member agents — South Florida and international markets." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
      </Helmet>
      <JsonLd
        id="home-agent"
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://homesprofessional.com/#agent",
          "name": "Carlos Uzcategui",
          "jobTitle": "Licensed REALTOR®",
          "description": "South Florida listing agent and REALTOR® with United Realty Group. 25 years licensed in Florida. Seller representation across Miami-Dade, Broward, and Palm Beach.",
          "url": "https://homesprofessional.com/",
          "telephone": "+19548656622",
          "email": "contact@carlosre.com",
          "image": "https://homesprofessional.com/images/carlos-headshot.png",
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "areaServed": ["Miami-Dade County", "Broward County", "Palm Beach County"],
          "memberOf": { "@type": "Organization", "name": "Miami and South Florida REALTORS®" },
          "worksFor": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING,
          "review": buildReviewSchema(VERIFIED_REVIEWS.slice(0, 3)),
        }}
      />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <Hero />
        <Proof />
        <Distribution />
        <GlobalDeskTeaser />
        <MarketPulse />
        <Suspense fallback={null}>
          <AboutContact />
        </Suspense>
        <Footer />
        <MobileStickyCTA />
        <DesktopStickyCTA />
        <ExitIntentModal />
      </main>
    </>
  );
}
