import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { MLSTicker } from "../components/MLSTicker";
import { Hero } from "../components/Hero";
import { AdvisorBrand } from "../components/AdvisorBrand";
import { SellerSection } from "../components/SellerSection";
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
        <title>South Florida Listing Agent | Seller Strategy &amp; MLS Exposure | Carlos Uzcategui</title>
        <meta name="description" content="Sell your South Florida property with Carlos Uzcategui, Florida Licensed Realtor® since 2001, United Realty Group. Strategic listing representation, MLS exposure, agent-network distribution, and private seller strategy reviews." />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Agent | Seller Strategy | Carlos Uzcategui" />
        <meta property="og:description" content="Sell your South Florida property with strategic MLS exposure — 93,000 member agents, 200+ global portals, 19 languages. Private seller strategy reviews. United Realty Group." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/spain-desk" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay">
        <Navbar />
        <MLSTicker />
        <Hero />
        <SellerSection />
        <AdvisorBrand />
        <ReachAdvantage />
        <PartnersMarquee />
        <ExposureSyndication />
        <InternationalBridge />
        <BuyersRelocation />
        <IntelligenceDesk />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
