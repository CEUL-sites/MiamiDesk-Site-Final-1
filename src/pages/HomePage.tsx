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
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
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
