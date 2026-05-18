import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SellerSection } from "./components/SellerSection";
import { ReachAdvantage } from "./components/ReachAdvantage";
import { CitiesMarquee } from "./components/CitiesMarquee";
import { PartnersMarquee } from "./components/PartnersMarquee";
import { ExposureSyndication } from "./components/ExposureSyndication";
import { IntelligenceDesk } from "./components/IntelligenceDesk";
import { BuyersRelocation } from "./components/BuyersRelocation";
import { InternationalBridge } from "./components/InternationalBridge";
import { AboutContact } from "./components/AboutContact";
import { Footer } from "./components/Footer";
import { MobileStickyCTA } from "./components/MobileStickyCTA";

export default function App() {
  return (
    <main className="min-h-screen bg-white-soft grain-overlay">
      <Navbar />
      <Hero />
      <SellerSection />
      <ReachAdvantage />
      <CitiesMarquee />
      <PartnersMarquee />
      <ExposureSyndication />
      <IntelligenceDesk />
      <BuyersRelocation />
      <InternationalBridge />
      <AboutContact />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
