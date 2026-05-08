import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SellerSection } from "./components/SellerSection";
import { BuyersRelocation } from "./components/BuyersRelocation";
import { InternationalBridge } from "./components/InternationalBridge";
import { AboutContact } from "./components/AboutContact";
import { Footer } from "./components/Footer";
import { MobileStickyCTA } from "./components/MobileStickyCTA";

export default function App() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SellerSection />
      <BuyersRelocation />
      <InternationalBridge />
      <AboutContact />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}
