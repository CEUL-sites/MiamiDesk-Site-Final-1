import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SellerSection } from "./components/SellerSection";
import { ReachAdvantage } from "./components/ReachAdvantage";
import { IntelligenceDesk } from "./components/IntelligenceDesk";
import { BuyersRelocation } from "./components/BuyersRelocation";
import { InternationalBridge } from "./components/InternationalBridge";
import { PartnersMarquee } from "./components/PartnersMarquee";
import { CitiesMarquee } from "./components/CitiesMarquee";
import { FAQ } from "./components/FAQ";
import { AboutContact } from "./components/AboutContact";
import { Footer } from "./components/Footer";
import { MobileStickyCTA } from "./components/MobileStickyCTA";
import { MLSTicker } from "./components/MLSTicker";

export default function App() {
  // Force scroll to Hero on every fresh page load — runs after React mounts,
  // overriding any browser back-forward cache or Google deep-link restoration
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="min-h-screen bg-white-soft grain-overlay">
      <Navbar />
      <MLSTicker />
      <Hero />
      <SellerSection />
      <ReachAdvantage />
      <IntelligenceDesk />
      <BuyersRelocation />
      <InternationalBridge />
      <PartnersMarquee />
      <CitiesMarquee />
      <FAQ />
      <AboutContact />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
