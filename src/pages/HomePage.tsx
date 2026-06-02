import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MLSTicker } from "../components/MLSTicker";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { BuyerAgentThesis } from "../components/BuyerAgentThesis";
import { IntelligenceDesk } from "../components/IntelligenceDesk";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { InternationalBridge } from "../components/InternationalBridge";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { Testimonials } from "../components/Testimonials";
import { AboutContact } from "../components/AboutContact";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>South Florida Listing Agent · Sell Your Home | Carlos Uzcategui | HomesProfessional.com</title>
        <meta name="description" content="Carlos Uzcategui, FL SL705771 — South Florida listing agent, United Realty Group. MLS exposure, buyer-agent activation, and professional distribution across Miami-Dade, Broward, and Palm Beach. Most buyers purchase through an agent — the listing strategy must reach both markets." />
        <meta name="keywords" content="south florida listing agent, miami listing agent, sell home miami, sell home coral gables, sell home weston florida, miami beach listing agent, brickell condo listing agent, south florida realtor, miami mls listing, united realty group miami" />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Agent · Sell Your Home | HomesProfessional.com" />
        <meta property="og:description" content="Local representation. Professional distribution. Global buyer reach. MLS exposure plus buyer-agent activation across 93,000 member agents — South Florida and international markets." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/urg-hq.jpg" />
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
          "email": "carlos@homesprofessional.com",
          "image": "https://homesprofessional.com/images/urg-hq.jpg",
          "address": { "@type": "PostalAddress", "addressLocality": "Plantation", "addressRegion": "FL", "postalCode": "33324", "addressCountry": "US" },
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
        {/* Home value entry strip */}
        <div className="bg-gold/10 border-t border-b border-gold/20 py-4">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70 text-center sm:text-left">
              Thinking about selling? Get a free, professional South Florida home valuation — no commitment required.
            </p>
            <a
              href="/home-value"
              className="flex-shrink-0 border border-gold px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy whitespace-nowrap"
            >
              What's My Home Worth?
            </a>
          </div>
        </div>
        <MLSTicker />
        <ReachAdvantage />
        <BuyerAgentThesis />
        <IntelligenceDesk />
        <BuyersRelocation />
        <InternationalBridge />
        <GlobalPartnerNetwork />
        <Testimonials />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
