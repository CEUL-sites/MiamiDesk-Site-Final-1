import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { Testimonials } from "../components/Testimonials";
import { LeadMagnetStrip } from "../components/LeadMagnetStrip";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { ProofStrip } from "../components/ProofStrip";
import { SellerCtaBand } from "../components/SellerCtaBand";

// Below-the-fold sections — split out of the initial bundle. With
// hydrateRoot + Suspense, React keeps the prerendered HTML visible and
// hydrates these progressively once their chunks arrive.
const IntelligenceDesk = lazy(() => import("../components/IntelligenceDesk").then((m) => ({ default: m.IntelligenceDesk })));
const BuyersRelocation = lazy(() => import("../components/BuyersRelocation").then((m) => ({ default: m.BuyersRelocation })));
const InternationalReachStrip = lazy(() => import("../components/InternationalReachStrip").then((m) => ({ default: m.InternationalReachStrip })));
const HowCarlosWorks = lazy(() => import("../components/HowCarlosWorks").then((m) => ({ default: m.HowCarlosWorks })));
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
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="keywords" content="south florida listing agent, miami listing agent, sell home miami, sell home coral gables, sell home weston florida, miami beach listing agent, brickell condo listing agent, south florida realtor, miami mls listing, united realty group miami" />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Agent · Sell Your Home | HomesProfessional.com" />
        <meta property="og:description" content="Local representation. Professional distribution. Global buyer reach. MLS exposure plus buyer-agent activation across 93,000 member agents — South Florida and international markets." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
        <script type="application/ld+json">{JSON.stringify({
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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "15",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            { "@type": "Review", "author": { "@type": "Person", "name": "Andres P." }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Our house went under contract 10 days after we put it on the market at 12% over asking price. Carlos was incredibly friendly and helpful and walked us through every step of the closing process." },
            { "@type": "Review", "author": { "@type": "Person", "name": "Maria Isabel Onate" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Carlos demonstrated a deep understanding of the local housing market and provided invaluable insights. His professionalism, attention to detail, and superb communication skills made the entire process smooth and stress-free." },
            { "@type": "Review", "author": { "@type": "Person", "name": "Diego Tolotto" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Carlos was exceptional in selling our home swiftly at a great price. His professionalism and skillful negotiation made the entire process seamless." }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <Hero />
        <ProofStrip />
        <ReachAdvantage />
        <Testimonials />
        <SellerCtaBand />
        <LeadMagnetStrip />
        <Suspense fallback={null}>
          <IntelligenceDesk />
          <BuyersRelocation />
          <InternationalReachStrip />
          <HowCarlosWorks />
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
