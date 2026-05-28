import { Helmet } from "react-helmet-async";
import { ArrowRight, Building2, Globe2, Handshake, MessageCircle } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT } from "../constants";

const SITE_URL = "https://homesprofessional.com";

const miamiDadeAreas = ["Miami", "Miami Beach", "Coral Gables", "Brickell", "Coconut Grove", "Aventura", "Key Biscayne", "Doral", "Pinecrest", "South Miami", "Kendall", "Miami Lakes", "Bal Harbour", "Sunny Isles Beach", "Homestead"];
const browardPalmBeachAreas = ["Weston", "Fort Lauderdale", "Parkland", "Plantation", "Coral Springs", "Pembroke Pines", "Hollywood", "Miramar", "Davie", "Southwest Ranches", "Hallandale Beach", "Pompano Beach", "Boca Raton", "Delray Beach", "West Palm Beach"];
const madridAreas = ["Salamanca", "Recoletos", "Castellana", "Jerónimos", "Retiro", "Justicia", "Chueca", "Chamberí", "Almagro", "Chamartín", "El Viso", "La Moraleja", "Las Tablas", "La Latina", "Argüelles", "Moncloa", "Pozuelo", "Aravaca", "Valdebebas", "Tetuán"];
const professionalNetwork = ["Local real estate agents", "Real estate attorneys", "Mortgage professionals", "Title agents", "Inspectors", "Insurance advisors", "Vendor and relocation resources"];

const pathways = [
  {
    title: "Selling in South Florida",
    copy: "Private property positioning, listing strategy, MLS exposure, agent network distribution, pricing intelligence, negotiation support, and transaction coordination.",
    cta: "Discuss Selling",
    href: "/sell",
  },
  {
    title: "Buying in South Florida",
    copy: "Neighborhood guidance, property search, financing coordination, inspections, title, insurance, and closing support.",
    cta: "Start Buyer Search",
    href: "/buy",
  },
  {
    title: "Exploring Madrid",
    copy: "Madrid area guidance, agency coordination, property introductions, buyer process orientation, and cross-border advisory.",
    cta: "Explore Madrid",
    href: "/spain-desk",
  },
];

function AreaMarquee({ areas, reverse = false }: { areas: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-container" aria-label={areas.join(", ")}>
      <div className={reverse ? "marquee-track-reverse" : "marquee-track-slow"}>
        {[...areas, ...areas].map((area, index) => (
          <span key={`${area}-${index}`} className="mr-3 whitespace-nowrap border border-gold/20 bg-white/[0.03] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/62">
            {area}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarketPage() {
  const pageTitle = "Markets | South Florida & Madrid Real Estate Advisory | Carlos Uzcategui";
  const pageDescription = "Strategic real estate advisory across South Florida and Madrid, connecting sellers, buyers, and investors with local professionals, listing exposure, and cross-border market guidance.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/markets`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/markets`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-navy-deep pb-20 text-white grain-overlay lg:pb-0">
        <Navbar />

        <section className="relative overflow-hidden bg-navy-deep pt-32 pb-18 md:pt-40 md:pb-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gold/30" />
          <div className="pointer-events-none absolute right-0 top-20 h-[540px] w-[540px] rounded-full bg-gold/[0.05] blur-[140px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-serif leading-[1.02] text-white" style={{ fontSize: "clamp(3rem, 8vw, 6.8rem)" }}>
                One Advisory Desk. Two Strategic Markets.
              </h1>
              <p className="mt-7 max-w-3xl font-sans text-lg leading-relaxed text-white/68 md:text-xl">
                South Florida and Madrid real estate guidance supported by local professionals, international exposure, and transaction-level coordination.
              </p>
              <p className="mt-7 max-w-3xl font-sans text-base leading-[1.9] text-white/52">
                HomesProfessional.com connects South Florida and Madrid real estate opportunities through advisory, professional coordination, and market-specific execution. Whether you are selling a luxury home in South Florida, exploring a purchase in Madrid, or coordinating a cross-border real estate decision, the objective is the same: position the opportunity correctly, connect it with the right professionals, and move with clarity.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="/contact" className="inline-flex items-center justify-center gap-3 bg-gold px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90">
                  Request Market Guidance <ArrowRight size={14} />
                </a>
                <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 border border-gold/45 px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy">
                  <MessageCircle size={14} /> WhatsApp Carlos
                </a>
              </div>
            </div>

            <div className="border-l border-gold/30 pl-6 lg:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">Markets We Serve</p>
              <p className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">
                Real estate is local, but strong outcomes require more than local visibility.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["South Florida", "United Realty Group coordination"],
                  ["Madrid", "Local agency and market specialist access"],
                  ["International", "Owners, buyers, investors, referrals"],
                ].map(([label, copy]) => (
                  <div key={label} className="border-t border-white/10 pt-4">
                    <p className="font-serif text-xl text-gold">{label}</p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/48">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-gold/15 bg-[#071525] py-16 md:py-22">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <h2 className="font-serif text-3xl text-white md:text-5xl">South Florida Market Coverage</h2>
                <p className="mt-6 font-sans text-base leading-[1.9] text-white/58">
                  From Miami-Dade to Broward and Palm Beach, the objective is not simply to publish a property online. The objective is to position the property correctly, expose it through the right professional channels, and coordinate the transaction with experienced local support.
                </p>
                <p className="mt-5 font-sans text-base leading-[1.9] text-white/58">
                  Carlos Uzcategui operates through United Realty Group in South Florida and can coordinate with experienced professionals including local agents, real estate attorneys, mortgage professionals, title agents, inspectors, insurance advisors, and transaction resources.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {professionalNetwork.map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/[0.025] px-4 py-4">
                    <Building2 size={16} className="shrink-0 text-gold" />
                    <span className="font-sans text-sm text-white/62">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 space-y-5">
              <AreaMarquee areas={miamiDadeAreas} />
              <AreaMarquee areas={browardPalmBeachAreas} reverse />
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-16 md:py-22">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl text-white md:text-5xl">Madrid Market Access</h2>
              <p className="mt-6 font-sans text-base leading-[1.9] text-white/58">
                For clients exploring Madrid, Carlos provides cross-border guidance and coordinates with established local real estate professionals and agencies. The goal is to help international buyers, sellers, and investors understand the local market, identify qualified opportunities, and connect with the right professionals on the ground.
              </p>
              <p className="mt-5 font-sans text-base leading-[1.9] text-white/58">
                Carlos can coordinate opportunities through respected Madrid real estate firms and local specialists, including agency networks such as Lucas Fox, Sotheby's International Realty Madrid, RE/MAX Madrid, and other qualified local operators when appropriate.
              </p>
            </div>
            <div className="border border-gold/20 bg-[#071525] p-6 md:p-8">
              <div className="mb-7 flex items-center gap-4">
                <Globe2 size={24} className="text-gold" />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Madrid Areas</p>
              </div>
              <AreaMarquee areas={madridAreas} />
            </div>
          </div>
        </section>

        <section className="bg-bone-warm py-16 text-navy md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <h2 className="font-serif text-3xl md:text-5xl">Local Expertise. Broader Distribution. Better Coordination.</h2>
              <p className="mt-7 font-sans text-base leading-[1.9] text-navy/70">
                Real estate value is shaped by local knowledge, but strong outcomes often depend on distribution, positioning, negotiation, and the quality of the professional network behind the transaction.
              </p>
            </div>
            <div className="mt-11 grid gap-0 border border-gold/30 md:grid-cols-3">
              {[
                "For sellers, the goal is to expose the property to the right agents, buyers, and referral channels.",
                "For buyers, the goal is to identify qualified opportunities, understand the market, and avoid navigating unfamiliar areas alone.",
                "For international clients, the goal is to bridge legal, financial, cultural, and transaction differences between South Florida, Madrid, and Latin America.",
              ].map((copy, index) => (
                <div key={copy} className={`p-7 ${index < 2 ? "border-b border-gold/30 md:border-b-0 md:border-r" : ""}`}>
                  <p className="font-sans text-base leading-relaxed text-navy/70">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <h2 className="font-serif text-3xl text-white md:text-5xl">Client Pathways</h2>
                <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/52">
                  Choose the path that matches the decision in front of you. Each conversation begins with market context, professional coordination, and a clear next step.
                </p>
              </div>
              <Handshake size={32} className="hidden text-gold md:block" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {pathways.map((pathway) => (
                <article key={pathway.title} className="flex min-h-[300px] flex-col border border-gold/20 bg-white/[0.025] p-7">
                  <h3 className="font-serif text-2xl text-white">{pathway.title}</h3>
                  <p className="mt-5 font-sans text-sm leading-[1.85] text-white/58">{pathway.copy}</p>
                  <a href={pathway.href} className="mt-auto inline-flex items-center gap-3 pt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-white">
                    {pathway.cta} <ArrowRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gold py-14 text-navy">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">Need guidance in South Florida or Madrid?</h2>
              <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-navy/75">
                Whether you are preparing to sell, exploring a purchase, or coordinating a cross-border real estate decision, start with a private market conversation.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex items-center justify-center gap-3 bg-navy px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90">
                Request Market Guidance <ArrowRight size={14} />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 border border-navy/35 px-7 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-navy/10">
                <MessageCircle size={14} /> WhatsApp Carlos
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
