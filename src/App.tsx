import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SellerSection } from "./components/SellerSection";
import { ReachAdvantage } from "./components/ReachAdvantage";
import { ExposureSyndication } from "./components/ExposureSyndication";
import { PartnersMarquee } from "./components/PartnersMarquee";
import { InternationalBridge } from "./components/InternationalBridge";
import { BuyersRelocation } from "./components/BuyersRelocation";
import { IntelligenceDesk } from "./components/IntelligenceDesk";
import { AboutContact } from "./components/AboutContact";
import { Footer } from "./components/Footer";
import { MobileStickyCTA } from "./components/MobileStickyCTA";

export default function App() {
  // Force scroll to Hero on every fresh page load — runs after React mounts,
  // overriding any browser back/forward cache or Google deep-link restoration
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    // pb-20 lg:pb-0 — reserves space so the mobile floating CTA never covers content
    <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <SellerSection />
      <ReachAdvantage />
      <ExposureSyndication />
      <PartnersMarquee />
      <InternationalBridge />
      <BuyersRelocation />
      <IntelligenceDesk />
      <AboutContact />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
