import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";

export default function ListingsPage() {
  return (
    <>
      <Helmet>
        <title>South Florida MLS Listings | Active Properties | United Realty Group</title>
        <meta name="description" content="Browse active South Florida MLS listings. Miami-Dade, Broward, and Palm Beach properties updated daily. Full MLS access through United Realty Group · FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/listings" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">MLS Listings · United Realty Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            South Florida Active Listings
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Every active property in Miami-Dade, Broward, and Palm Beach — updated live from the MLS.
            93,000 member agents. 200+ global portals.
          </p>
        </section>
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Buyer Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Access full MLS listings</h2>
            </div>
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
