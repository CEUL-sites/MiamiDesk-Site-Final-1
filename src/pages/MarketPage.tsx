import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";

const CITY_META: Record<string, { title: string; description: string; display: string }> = {
  "miami": {
    display: "Miami",
    title: "Miami Real Estate | Homes & Condos for Sale | United Realty Group",
    description: "Browse Miami real estate listings. Condos, homes, and investment properties with full MLS access. Free buyer and seller consultations. United Realty Group.",
  },
  "brickell": {
    display: "Brickell",
    title: "Brickell Miami Real Estate | Luxury Condos for Sale | United Realty Group",
    description: "Brickell luxury condos and high-rise residences. Access every active listing in Miami's financial district. United Realty Group · FL SL705771.",
  },
  "coral-gables": {
    display: "Coral Gables",
    title: "Coral Gables Real Estate | Homes for Sale | United Realty Group",
    description: "Coral Gables homes, estates, and condos for sale. Expert local knowledge, full MLS access, international buyer network. United Realty Group.",
  },
  "miami-beach": {
    display: "Miami Beach",
    title: "Miami Beach Real Estate | Luxury Condos & Homes | United Realty Group",
    description: "Miami Beach luxury condos, waterfront homes, and South Beach residences. Full MLS + global portal exposure. United Realty Group · FL SL705771.",
  },
  "aventura": {
    display: "Aventura",
    title: "Aventura Real Estate | Condos & Homes for Sale | United Realty Group",
    description: "Aventura condos and homes with waterfront access. Full MLS listings, international buyer exposure, expert guidance. United Realty Group.",
  },
  "weston": {
    display: "Weston",
    title: "Weston FL Real Estate | Homes for Sale | United Realty Group",
    description: "Weston Florida single-family homes, gated communities, and estates. Expert South Florida representation. United Realty Group · FL SL705771.",
  },
  "doral": {
    display: "Doral",
    title: "Doral FL Real Estate | Homes & Condos for Sale | United Realty Group",
    description: "Doral homes, townhomes, and new construction. Serving buyers and sellers in Miami-Dade's fastest-growing market. United Realty Group.",
  },
  "fort-lauderdale": {
    display: "Fort Lauderdale",
    title: "Fort Lauderdale Real Estate | Homes & Condos | United Realty Group",
    description: "Fort Lauderdale waterfront homes, condos, and luxury estates. Full Broward County MLS access. United Realty Group · FL SL705771.",
  },
  "boca-raton": {
    display: "Boca Raton",
    title: "Boca Raton Real Estate | Luxury Homes & Golf Communities | United Realty Group",
    description: "Boca Raton luxury homes, golf communities, and waterfront estates. Expert Palm Beach County representation. United Realty Group.",
  },
  "west-palm-beach": {
    display: "West Palm Beach",
    title: "West Palm Beach Real Estate | Homes for Sale | United Realty Group",
    description: "West Palm Beach homes, condos, and waterfront properties. Full Palm Beach County MLS access. United Realty Group · FL SL705771.",
  },
  "downtown-miami": {
    display: "Downtown Miami",
    title: "Downtown Miami Real Estate | Condos for Sale | United Realty Group",
    description: "Downtown Miami condos, urban lofts, and new developments. Full MLS access, global buyer network. United Realty Group.",
  },
  "edgewater": {
    display: "Edgewater",
    title: "Edgewater Miami Real Estate | Condos for Sale | United Realty Group",
    description: "Edgewater Miami waterfront condos and luxury residences. Biscayne Bay views and modern high-rises. United Realty Group · FL SL705771.",
  },
  "wynwood": {
    display: "Wynwood",
    title: "Wynwood Miami Real Estate | Condos & Lofts for Sale | United Realty Group",
    description: "Wynwood condos, lofts, and mixed-use properties in Miami's arts district. United Realty Group.",
  },
  "coconut-grove": {
    display: "Coconut Grove",
    title: "Coconut Grove Real Estate | Homes & Waterfront Properties | United Realty Group",
    description: "Coconut Grove homes, waterfront estates, and luxury condos. Expert Miami representation. United Realty Group · FL SL705771.",
  },
  "key-biscayne": {
    display: "Key Biscayne",
    title: "Key Biscayne Real Estate | Waterfront Homes & Condos | United Realty Group",
    description: "Key Biscayne luxury waterfront homes, condos, and island estates. Full MLS access. United Realty Group.",
  },
  "pinecrest": {
    display: "Pinecrest",
    title: "Pinecrest FL Real Estate | Luxury Homes for Sale | United Realty Group",
    description: "Pinecrest luxury estates, gated communities, and family homes in South Miami-Dade. United Realty Group · FL SL705771.",
  },
  "kendall": {
    display: "Kendall",
    title: "Kendall FL Real Estate | Homes for Sale | United Realty Group",
    description: "Kendall homes, townhomes, and condos in Southwest Miami-Dade. Expert local guidance. United Realty Group.",
  },
  "homestead": {
    display: "Homestead",
    title: "Homestead FL Real Estate | Homes for Sale | United Realty Group",
    description: "Homestead homes and new construction in South Miami-Dade. Affordable housing market expertise. United Realty Group · FL SL705771.",
  },
  "north-miami": {
    display: "North Miami",
    title: "North Miami Real Estate | Homes & Condos for Sale | United Realty Group",
    description: "North Miami homes, condos, and investment properties. Full MLS access, expert South Florida guidance. United Realty Group.",
  },
  "hallandale": {
    display: "Hallandale Beach",
    title: "Hallandale Beach Real Estate | Condos & Homes | United Realty Group",
    description: "Hallandale Beach condos, oceanfront residences, and homes. Broward/Miami-Dade border market expertise. United Realty Group · FL SL705771.",
  },
  "pembroke-pines": {
    display: "Pembroke Pines",
    title: "Pembroke Pines FL Real Estate | Homes for Sale | United Realty Group",
    description: "Pembroke Pines homes, townhomes, and family communities in Broward County. United Realty Group.",
  },
};

export default function MarketPage() {
  const { city } = useParams<{ city: string }>();
  const meta = CITY_META[city ?? ""] ?? {
    display: city ? city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "South Florida",
    title: "South Florida Real Estate | United Realty Group",
    description: "South Florida real estate listings. Expert buyer and seller representation. United Realty Group · FL SL705771.",
  };

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://homesprofessional.com/market/${city}`} />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-16 md:py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Market Desk · United Realty Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            {meta.display} Real Estate
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Full MLS access. 93,000 member agents. 200+ global portals. Your{" "}
            {meta.display} property strategy starts here.
          </p>
        </section>
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{meta.display} · Confidential Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Start your {meta.display} strategy</h2>
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
