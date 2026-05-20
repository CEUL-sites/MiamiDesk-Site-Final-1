import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SellerSection } from "./components/SellerSection";
import { PropertyShowcase3D } from "./components/PropertyShowcase3D";
import { ReachAdvantage } from "./components/ReachAdvantage";
import { ExposureSyndication } from "./components/ExposureSyndication";
import { PartnersMarquee } from "./components/PartnersMarquee";
import { CarlosTrust } from "./components/CarlosTrust";
import { InternationalBridge } from "./components/InternationalBridge";
import { BuyersRelocation } from "./components/BuyersRelocation";
import { AgentReferral } from "./components/AgentReferral";
import { IntelligenceDesk } from "./components/IntelligenceDesk";
import { FAQ } from "./components/FAQ";
import { AboutContact } from "./components/AboutContact";
import { Footer } from "./components/Footer";
import { MobileStickyCTA } from "./components/MobileStickyCTA";
import { MLSTicker } from "./components/MLSTicker";

export default function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
      <Navbar />
      <MLSTicker />
      <Hero />
      <SellerSection />
      <PropertyShowcase3D />
      <ReachAdvantage />
      <ExposureSyndication />
      <PartnersMarquee />
      <CarlosTrust />
      <InternationalBridge />
      <BuyersRelocation />
      <AgentReferral />
      <IntelligenceDesk />
      <FAQ />
      <AboutContact />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
