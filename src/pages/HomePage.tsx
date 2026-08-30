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
import { SellerAuthorityStrip } from "../components/SellerAuthorityStrip";
import { SellerExecutionSystem } from "../components/SellerExecutionSystem";

// Below-the-fold sections — split out of the initial bundle. With
// hydrateRoot + Suspense, React keeps the prerendered HTML visible and
// hydrates these progressively once their chunks arrive.
const AboutContact = lazy(() => import("../components/AboutContact").then((m) => ({ default: m.AboutContact })));
const MarketingReel3D = lazy(() => import("../components/MarketingReel3D").then((m) => ({ default: m.MarketingReel3D })));
const SellerPathfinder = lazy(() => import("../components/SellerPathfinder").then((m) => ({ default: m.SellerPathfinder })));

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>South Florida Listing Strategist | Carlos Uzcategui</title>
        <meta name="description" content="Request a private South Florida property strategy from Carlos Uzcategui: MLS-based pricing, positioning, buyer-agent activation, and 93,000-member reach." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Listing Strategist | Carlos Uzcategui" />
        <meta name="twitter:description" content="Request a private South Florida property strategy: MLS-based pricing, positioning, buyer-agent activation, and 93,000-member distribution reach." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Strategist | Carlos Uzcategui" />
        <meta property="og:description" content="Request a private South Florida property strategy: MLS-based pricing, positioning, buyer-agent activation, and 93,000-member distribution reach." />
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
          "jobTitle": "REALTOR® · Florida License SL705771",
          "description": "Carlos Uzcategui is a REALTOR® and Florida real estate licensee SL705771 with United Realty Group. Licensed in Florida since 2001, with seller representation across Miami-Dade, Broward, and Palm Beach.",
          "url": "https://homesprofessional.com/",
          "telephone": "+19548656622",
          "email": "contact@carlosre.com",
          "image": "https://homesprofessional.com/images/carlos-headshot.jpg",
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
        <SellerAuthorityStrip />
        <SellerExecutionSystem />
        <Distribution />
        <Proof />
        <Suspense fallback={null}>
          <MarketingReel3D />
        </Suspense>
        <GlobalDeskTeaser />
        <MarketPulse />
        <Suspense fallback={null}>
          <SellerPathfinder />
        </Suspense>
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
