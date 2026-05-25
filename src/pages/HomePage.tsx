import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { MLSTicker } from "../components/MLSTicker";
import { Hero } from "../components/Hero";
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
        <title>South Florida Real Estate | United Realty Group | HomesProfessional.com</title>
        <meta name="description" content="Carlos Uzcategui, REALTOR® FL SL705771, United Realty Group — #1 transaction volume real estate company in Florida. Expert buyer and seller representation in Miami, Coral Gables, Brickell, Aventura, Weston and all of South Florida." />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Real Estate | United Realty Group" />
        <meta property="og:description" content="Full MLS access · 93,000 member agents · 200+ global portals · 19 languages. Expert buyer and seller representation across South Florida." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <MLSTicker />
        <Hero />
        <SellerSection />
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
