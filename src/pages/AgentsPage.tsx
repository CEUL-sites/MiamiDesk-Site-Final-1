import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, MessageSquare, Globe2, Languages, Building2, Handshake, UserPlus, BookOpen, Star, Users } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT } from "../constants";

const ADVANTAGES = [
  {
    number: "01",
    title: "Win more listing mandates",
    body: "When you can offer a Miami-facing exposure layer, your listing presentation stands apart from agencies relying only on Idealista, Fotocasa, Kyero, or their own website. Sellers in premium segments want proof that their property reaches further.",
  },
  {
    number: "02",
    title: "Strengthen seller confidence",
    body: "Sellers increasingly ask: 'What else will you do?' A documented international channel through a Florida-licensed Realtor® partner answers that question with credibility — not a vague promise.",
  },
  {
    number: "03",
    title: "Defend your professional fees",
    body: "A stronger service offering justifies a stronger fee. The agent who brings a South Florida exposure layer to the table is not competing on the same terms as an agent whose pitch ends at local portals.",
  },
  {
    number: "04",
    title: "No U.S. office required",
    body: "You keep the mandate, the client relationship, and the local authority. The Miami Desk handles the U.S.-facing layer — bilingual packaging, South Florida agent-network presentation, and referral coordination.",
  },
  {
    number: "05",
    title: "Access South Florida buyer channels",
    body: "South Florida is the primary gateway for U.S., Latin American, and European capital targeting Spanish and Mediterranean real estate. A Florida-licensed channel creates a legitimate connection to that buyer pool.",
  },
  {
    number: "06",
    title: "Create referral opportunities",
    body: "Qualified buyer inquiries from South Florida, U.S., or Latin American networks are coordinated back through you — creating structured referral opportunities with professional documentation.",
  },
];

const SERVICES = [
  {
    title: "Miami-facing listing review",
    body: "Selected properties reviewed for positioning fit, buyer profile alignment, and international presentation suitability.",
  },
  {
    title: "Bilingual property positioning",
    body: "English and Spanish property narrative development for U.S. and international buyer-agent presentation.",
  },
  {
    title: "South Florida agent-network reach",
    body: "Introduction to the 93,000-member Miami and South Florida REALTORS® agent network — the world's largest local REALTOR® association.",
  },
  {
    title: "U.S. and LATAM buyer-channel access",
    body: "Exposure to Florida-based buyer agents representing U.S., Latin American, and international buyers actively seeking European real estate.",
  },
  {
    title: "Professional listing packaging",
    body: "Property landing page or structured presentation document designed for U.S. buyer-agent distribution — beyond a portal link.",
  },
  {
    title: "Referral inquiry coordination",
    body: "Any buyer inquiry or referral opportunity is coordinated through documented professional channels — no ambiguity, no surprises.",
  },
  {
    title: "Exposure reporting",
    body: "Periodic reporting on presentation activity, referral pipeline, and buyer-channel engagement where applicable.",
  },
  {
    title: "Agency partnership structure",
    body: "Formal cooperation agreements available for agencies with ongoing international inventory — structured for professional compliance.",
  },
];

const IDEAL_FOR = [
  "Madrid luxury apartments and penthouses",
  "Marbella and Costa del Sol villas",
  "Ibiza and Mallorca premium residences",
  "Branded residences and new developments",
  "Agencies with international sellers",
  "Developers seeking U.S. and LatAm visibility",
  "Properties with price points that attract U.S. capital",
  "Listing teams competing for premium mandates",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Submit your listing or agency",
    body: "Submit the property details, portfolio overview, or agency profile using the form below. Carlos reviews every submission personally.",
  },
  {
    number: "02",
    title: "Miami Desk reviews fit",
    body: "Carlos evaluates positioning suitability, buyer profile alignment, referral structure, and the most appropriate collaboration model for the specific inventory.",
  },
  {
    number: "03",
    title: "Exposure strategy agreed and packaged",
    body: "Approved listings are packaged for Miami-facing presentation. Scope, channels, documentation, and professional terms are agreed in writing before activation.",
  },
  {
    number: "04",
    title: "Inquiries and reporting coordinated",
    body: "Buyer inquiries, referral opportunities, and exposure reporting are handled professionally and coordinated directly with you throughout the engagement.",
  },
];

const SOUTH_FL_PATHWAYS = [
  {
    number: "01",
    title: "Refer a South Florida Seller",
    body: "Your client needs representation in Miami-Dade, Broward, or Palm Beach. Carlos takes the listing, handles the full transaction, and pays your referral fee at closing under a formal written agreement.",
  },
  {
    number: "02",
    title: "Refer a South Florida Buyer",
    body: "Your buyer is relocating to or investing in South Florida. Full MLS access, neighborhood-level advisory, offer strategy, and closing coordination. Documented referral fee at closing.",
  },
];

// Careers-specific WhatsApp deep link — the generic CONTACT.whatsappUS opens with
// seller copy, which misframes a recruiting conversation. This pre-fills the intent.
const WA_CAREERS =
  "https://wa.me/19548656622?text=" +
  encodeURIComponent(
    "Hi Carlos, I'm a real estate agent (or getting licensed) and I'd like to learn about building my career with you at United Realty Group.",
  );

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>For Real Estate Agents | Referrals, Miami Exposure & Careers | HomesProfessional.com</title>
        <meta
          name="description"
          content="Three ways agents work with Carlos: refer a buyer or seller for a fee at closing, add Miami-facing exposure to a listing, or join URG with 25-year mentorship. Florida-licensed Realtor®, 93,000 Miami REALTORS®."
        />
        <meta
          name="keywords"
          content="international real estate exposure, Miami real estate network, Miami REALTORS, South Florida buyer network, Spain luxury real estate, Madrid luxury properties, Marbella luxury real estate, international listing exposure, real estate referral network, U.S. buyer exposure Spanish properties, Miami Desk, Florida Realtor partner, cross-border real estate referrals"
        />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/agentes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/agents" />
        <meta property="og:title" content="Win More Seller Mandates With a South Florida Exposure Strategy" />
        <meta property="og:description" content="Give your agency a listing-presentation advantage local competitors cannot match: documented South Florida-facing exposure for your sellers, where eligible. You keep the mandate." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Miami Desk — International Listing Exposure & Agent Referral",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Listing Exposure & Referral",
          "description": "A Miami-facing exposure and referral coordination service for international real estate agents, agencies, and developers seeking access to the South Florida real estate network and U.S. buyer channels.",
          "areaServed": ["South Florida", "Spain", "Latin America", "Europe"],
          "url": "https://homesprofessional.com/agents",
          "availableLanguage": ["English", "Spanish"]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Does the local agent keep the client relationship?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. The local agent retains the seller mandate, the client relationship, and all local market authority. The Miami Desk supports only the international exposure layer. Any buyer inquiry or referral is coordinated back through the local agent." }
            },
            {
              "@type": "Question",
              "name": "What markets does the Miami Desk serve for international agents?",
              "acceptedAnswer": { "@type": "Answer", "text": "Spain (Madrid, Marbella, Costa del Sol, Barcelona, Mallorca, Ibiza), Latin America, and other international markets. Properties are reviewed individually for positioning suitability and buyer profile alignment." }
            },
            {
              "@type": "Question",
              "name": "What is the Miami and South Florida REALTORS® network?",
              "acceptedAnswer": { "@type": "Answer", "text": "Miami and South Florida REALTORS® is the world's largest local REALTOR® association, with 93,000 member agents across 385 MLSs. It has over 437 signed international agreements, providing a professional referral infrastructure across 70+ countries." }
            }
          ]
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep px-6 py-24 md:py-36 text-center sm:px-10">
          {/* Cinematic video backdrop */}
          <LazyVideo
            src="/videos/split_miami_spain_mls.mp4"
            eager
            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.92),rgba(5,13,30,0.97))]" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.10),transparent_55%)]" />
          <div className="relative mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-gold/25 bg-gold/[0.06] px-4 py-1.5 mb-7 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">
                For Agents · Referrals · International Exposure · Careers
              </span>
            </div>
            <h1
              className="mx-auto max-w-4xl font-serif leading-[1.08] text-white"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
            >
              Three Ways Agents<br />
              <em className="not-italic italic text-gold">Work With Carlos.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/65">
              Refer a buyer or seller and get paid at closing. Give a listing serious U.S. and
              international reach. Or build your own career alongside a Florida-licensed Realtor® with
              25 years inside South Florida's network. Pick your path below.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#choose-path"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                See How It Works
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappBroker}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <MessageSquare size={14} />
                Message Carlos Directly
              </a>
            </div>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              Carlos Uzcategui · FL SL705771 · United Realty Group · Miami and South Florida REALTORS® · 25 Years Licensed
            </p>
          </div>
        </section>

        {/* ── Proof strip ─────────────────────────────────────────── */}
        <div className="border-b border-hairline bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-hairline border-x border-hairline md:grid-cols-4">
            {[
              { icon: Globe2,    value: "93,000",  label: "MIAMI REALTORS® member agents" },
              { icon: Handshake, value: "437+",    label: "International agreements · 70+ countries" },
              { icon: Languages, value: "19",      label: "Languages · 200+ global portals" },
              { icon: Building2, value: "25 yrs",  label: "Florida licensed · bilingual" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4 py-7 text-center">
                <s.icon size={18} className="text-gold" strokeWidth={1.5} />
                <span className="mt-3 font-serif text-2xl text-navy-deep md:text-3xl">{s.value}</span>
                <span className="mt-1.5 font-mono text-[8.5px] uppercase leading-snug tracking-[0.16em] text-navy/45">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Choose Your Path ─────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28" id="choose-path">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How Agents Work With Carlos</p>
              <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                One desk. Three ways to win.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-sans text-[15px] leading-relaxed text-ink-primary/60">
                Wherever you are in your business, there is a structured, documented way to work together —
                and a personal response from Carlos, not a call center.
              </p>
            </div>
            <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-3">
              {[
                {
                  icon: Handshake,
                  tag: "Path 01 · Referrals",
                  title: "Refer a buyer or seller",
                  body: "Have a client buying or selling in South Florida — or a U.S./international buyer looking abroad? Send the referral, keep the relationship, and get paid at closing under a written agreement.",
                  points: ["Both directions — buyers and sellers", "Local + cross-border", "Documented fee at closing"],
                  cta: "Submit a referral",
                  href: "#south-florida-referral",
                },
                {
                  icon: Globe2,
                  tag: "Path 02 · Exposure",
                  title: "Give a listing international reach",
                  body: "International or premium listing agents can add a Miami-facing exposure layer — bilingual packaging into the South Florida network and U.S./LATAM buyer channels. You keep the mandate.",
                  points: ["You keep the mandate & client", "93,000-agent network access", "Bilingual U.S./LATAM channels"],
                  cta: "Submit a listing",
                  href: "#submit-listing",
                },
                {
                  icon: UserPlus,
                  tag: "Path 03 · Careers",
                  title: "Join URG or get mentored",
                  body: "New to real estate, or an experienced agent ready for a change? Build your career alongside an active 25-year agent who runs live seller, buyer, and cross-border desks on the same MLS you'll work.",
                  points: ["New agents — start strong", "Switching from another agency", "Mentorship from an active producer"],
                  cta: "Explore joining",
                  href: "#join-urg",
                },
              ].map((p) => (
                <div key={p.title} className="flex flex-col bg-white p-8">
                  <p.icon size={22} className="text-gold" strokeWidth={1.5} />
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-gold/80">{p.tag}</p>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep leading-snug">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{p.body}</p>
                  <ul className="mt-5 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <BadgeCheck size={13} className="mt-0.5 flex-shrink-0 text-gold/70" />
                        <span className="font-sans text-[13px] leading-snug text-ink-primary/70">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.href}
                    className="group mt-7 inline-flex items-center gap-1.5 self-start border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:text-gold"
                  >
                    {p.cta}
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────────────── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-14 md:grid-cols-2 md:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Competitive Gap</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Your listing presentation should not end at local portals.
                </h2>
                <div className="mt-6 space-y-4 font-sans text-[15px] leading-[1.8] text-ink-primary/70">
                  <p>
                    Most agencies competing for the same mandates offer the same visibility: Idealista, Fotocasa, Kyero,
                    Habitaclia, their agency website, and perhaps one or two international portals. Sellers at the premium
                    level see through undifferentiated exposure promises.
                  </p>
                  <p>
                    Luxury sellers increasingly want to know whether their property is being positioned in front of the
                    right international buyer channels — not simply listed on the same platforms as every other agency.
                    The agent who can explain a stronger, documented exposure strategy has a meaningful advantage in
                    winning the mandate.
                  </p>
                </div>

                {/* Cinematic video accent — landscape property walkthrough fills the
                    wide frame cleanly. The panel is a designed navy gradient so it
                    still reads as an intentional luxury frame when the decorative
                    video is skipped (data-saver / reduce-motion) or still loading,
                    rather than collapsing to a dead black box. */}
                <div
                  className="luxury-gradient mt-8 relative overflow-hidden border border-gold/25"
                  style={{ paddingBottom: "52%" }}
                >
                  <LazyVideo
                    src="/videos/luxury_home_walkthrough.mp4"
                    poster="/images/miami-realtors-rworld.jpg"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                  {/* Soft vignette: dark only at the bottom for caption legibility,
                      letting the imagery read clearly through the rest of the frame. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent pointer-events-none" />
                  {/* Thin inset gold rule — luxury framing that holds the composition
                      together even with no video playing. */}
                  <div className="absolute inset-3 border border-gold/15 pointer-events-none" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2.5">
                    <span className="h-px w-6 flex-shrink-0 bg-gold/70" />
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-soft">
                      International listing exposure · South Florida network
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-hairline bg-white p-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-navy/40 mb-6">What sellers increasingly ask</p>
                <div className="space-y-5">
                  {[
                    "Where exactly will my property be presented?",
                    "Who will actually see it — and can they buy it?",
                    "Do you have access to U.S. or international buyer networks?",
                    "How is your exposure different from other agencies?",
                    "What proof can you give me of international demand access?",
                  ].map((q) => (
                    <div key={q} className="flex items-start gap-3">
                      <ChevronRight size={12} className="mt-1 flex-shrink-0 text-gold" />
                      <p className="font-sans text-sm leading-relaxed text-ink-primary/75">{q}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-hairline pt-6">
                  <p className="font-sans text-xs italic leading-relaxed text-ink-primary/50">
                    "The better question is not only 'Where will my property be advertised?' It is 'Who will actually
                    see it, present it, and connect it to potential buyers?'"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Seller Psychology ─────────────────────────────────────── */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Seller Psychology</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              What sellers really want to know.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-[1.8] text-white/60">
              Premium sellers are not simply looking for the most portals. They are looking for evidence that
              their property will reach serious, qualified buyers — including buyers they may not find through local
              channels alone. The agent who delivers a credible international story earns the mandate.
            </p>
            <div className="mt-14 divide-y divide-white/10 border border-white/10">
              {[
                {
                  q: "Where?",
                  a: "Not just local portals — a documented Miami-facing exposure layer with a Florida-licensed Realtor® partner connected to the South Florida real estate network.",
                },
                {
                  q: "Who sees it?",
                  a: "South Florida buyer agents. U.S. and Latin American buyers with capital for European real estate. International buyer networks reached through 437+ MIAMI Association referral agreements in 70+ countries.",
                },
                {
                  q: "How is it different?",
                  a: "Not a generic portal subscription. A professional listing relationship with a licensed Florida Realtor® — documented exposure, bilingual packaging, professional referral coordination.",
                },
              ].map((item) => (
                <div key={item.q} className="grid md:grid-cols-[200px_1fr] md:items-start gap-6 p-8 md:p-10">
                  <div className="font-serif text-5xl text-gold leading-none">{item.q}</div>
                  <p className="font-sans text-[15px] leading-relaxed text-white/65 md:pt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Agent Advantage ───────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Agent Advantage</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Six reasons international agents work with the Miami Desk.
            </h2>
            <div className="mt-12">
              {/* Featured first advantage */}
              <div className="border border-hairline bg-ivory p-8 md:p-10 mb-px">
                <div className="grid md:grid-cols-[auto_1fr] md:gap-10 md:items-start">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-3 md:mb-0 md:mt-1">{ADVANTAGES[0].number}</div>
                  <div>
                    <h3 className="font-serif text-2xl text-navy-deep">{ADVANTAGES[0].title}</h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-ink-primary/65">{ADVANTAGES[0].body}</p>
                  </div>
                </div>
              </div>
              {/* Remaining advantages */}
              <div className="grid gap-px border border-hairline border-t-0 bg-hairline md:grid-cols-2 lg:grid-cols-3">
                {ADVANTAGES.slice(1).map((a) => (
                  <div key={a.number} className="bg-white p-8">
                    <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{a.number}</div>
                    <h3 className="font-serif text-lg text-navy-deep">{a.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cinematic pull-quote band ─────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-24 md:py-32">
          <LazyVideo
            src="/videos/miami_madrid_transition.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-navy-deep/40" />
          <div className="relative mx-auto max-w-4xl px-6">
            <Globe2 size={28} className="text-gold/70" strokeWidth={1.25} />
            <blockquote className="mt-6 font-serif text-2xl leading-[1.4] text-white md:text-[2.1rem] md:leading-[1.35]">
              "The internet creates visibility. <span className="text-gold">Agent networks create movement.</span>
              A listing is not fully marketed until buyer agents know how to present it."
            </blockquote>
            <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
              Carlos Uzcategui · Florida Licensed Realtor® · United Realty Group
            </p>
          </div>
        </section>

        {/* ── What the Miami Desk Provides ──────────────────────────── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Service Coverage</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              What the Miami Desk provides.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60">
              Scope varies by property type, market, and collaboration model. Every engagement is reviewed individually
              and documented in a professional written agreement before activation.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="flex gap-5 border-l-2 border-gold/40 pl-5 py-1">
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-navy-deep">{s.title}</h3>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/60">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Collaboration Model ───────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-white">
          <LazyVideo
            src="/videos/luxury_listing_showcase.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.10] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/90 to-navy-deep/70 pointer-events-none" />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How Collaboration Works</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              You keep the mandate. We support the international layer.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-[1.8] text-white/60">
              The Miami Desk is designed to complement local market representation — not replace it. The local agent
              maintains full authority over the seller relationship, the mandate, and local market operations.
            </p>
            {/* Visual flow diagram */}
            <div className="mt-10 mb-10">
              <svg viewBox="0 0 800 80" className="w-full max-w-3xl mx-auto" aria-hidden="true">
                {/* Flow line */}
                <line x1="160" y1="40" x2="380" y2="40" stroke="#B08D57" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
                <line x1="420" y1="40" x2="640" y2="40" stroke="#B08D57" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
                {/* Arrowheads */}
                <polygon points="376,35 386,40 376,45" fill="#B08D57" opacity="0.5" />
                <polygon points="636,35 646,40 636,45" fill="#B08D57" opacity="0.5" />
                {/* Node 1: Local Agent */}
                <rect x="0" y="20" width="158" height="40" rx="2" fill="#B08D5712" stroke="#B08D57" strokeWidth="0.75" opacity="0.7" />
                <text x="79" y="36" textAnchor="middle" fill="#B08D57" fontSize="9" fontFamily="monospace" letterSpacing="2">LOCAL AGENT</text>
                <text x="79" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">Mandate · Client · Fee</text>
                {/* Node 2: Miami Desk */}
                <rect x="390" y="16" width="120" height="48" rx="2" fill="#B08D5720" stroke="#B08D57" strokeWidth="1.25" />
                <text x="450" y="36" textAnchor="middle" fill="#B08D57" fontSize="9" fontFamily="monospace" letterSpacing="2">MIAMI DESK</text>
                <text x="450" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">FL SL705771</text>
                {/* Node 3: Buyers */}
                <rect x="642" y="20" width="158" height="40" rx="2" fill="#B08D5712" stroke="#B08D57" strokeWidth="0.75" opacity="0.7" />
                <text x="721" y="36" textAnchor="middle" fill="#B08D57" fontSize="9" fontFamily="monospace" letterSpacing="2">U.S. · LATAM</text>
                <text x="721" y="50" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">93,000 Agents</text>
              </svg>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                {
                  role: "Local Agent",
                  keeps: ["The seller relationship", "The local mandate", "All local market authority", "Local fee and commission"],
                  highlight: true,
                },
                {
                  role: "Miami Desk",
                  keeps: ["Miami-facing exposure layer", "U.S. and LATAM channel access", "Bilingual positioning support", "Referral inquiry coordination"],
                  highlight: false,
                },
                {
                  role: "Professional Terms",
                  keeps: ["Written cooperation agreement", "Documented referral structure", "Transparent scope and fees", "Compliance with applicable law"],
                  highlight: false,
                },
              ].map((col) => (
                <div key={col.role} className={`p-10 ${col.highlight ? "bg-gold/[0.07] border border-gold/20" : "bg-navy-deep"}`}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold mb-5">{col.role}</p>
                  <ul className="space-y-3">
                    {col.keeps.map((k) => (
                      <li key={k} className="flex items-start gap-2.5">
                        <BadgeCheck size={13} className="mt-0.5 flex-shrink-0 text-gold/70" />
                        <span className="font-sans text-sm text-white/70">{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ideal For ─────────────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Ideal For</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Selected listings and agencies.
                </h2>
                <p className="mt-5 font-sans text-sm leading-relaxed text-ink-primary/60">
                  The Miami Desk reviews every submission individually. Not every property qualifies — positioning
                  for U.S. and LATAM buyers requires the right product type, price point, and market context.
                </p>
                <div className="mt-8 space-y-5">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/80 mb-3">Property types</p>
                    <div className="flex flex-wrap gap-2">
                      {IDEAL_FOR.slice(0, 4).map((item) => (
                        <span key={item} className="inline-flex items-center gap-2 border border-gold/20 bg-gold/5 px-4 py-2 font-sans text-sm text-navy-deep">
                          <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-navy/35 mb-3">Agencies &amp; teams</p>
                    <div className="flex flex-wrap gap-2">
                      {IDEAL_FOR.slice(4).map((item) => (
                        <span key={item} className="inline-flex items-center gap-2 border border-navy/10 bg-ivory px-4 py-2 font-sans text-sm text-navy-deep">
                          <span className="h-1 w-1 flex-shrink-0 rounded-full bg-navy/30" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-8 font-sans text-xs italic text-ink-primary/40">
                  Every submission is reviewed personally.
                </p>
              </div>

              {/* Right: cinematic property visual */}
              <div className="relative overflow-hidden bg-navy-deep" style={{ paddingBottom: "70%" }}>
                <LazyVideo
                  src="/videos/gemini_property_vision.mp4"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/80 mb-1">Miami Desk</p>
                  <p className="font-serif text-lg text-white leading-snug">
                    Premium properties.<br />International buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Network Stats ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-white">
          <LazyVideo
            src="/videos/dollhouse_global_reach.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/85 to-navy-deep pointer-events-none" />
          <div className="relative mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center mb-3">
              The network behind the Miami Desk
            </p>
            <h2 className="mx-auto mb-12 max-w-2xl text-center font-serif text-3xl leading-tight text-white md:text-4xl">
              Infrastructure, not adjectives.
            </h2>
            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                {
                  value: "93,000",
                  label: "Member Agents",
                  desc: "Miami and South Florida REALTORS® — the world's largest local REALTOR® association and the primary buyer-agent network behind South Florida real estate.",
                },
                {
                  value: "437+",
                  label: "International Agreements",
                  desc: "Signed referral agreements with real estate organizations across 70+ countries, creating a professional infrastructure for cross-border introductions.",
                },
                {
                  value: "25 yrs",
                  label: "South Florida Experience",
                  desc: "Carlos Uzcategui has been licensed in Florida since 2001. Bilingual English/Spanish. Physically connected to South Florida and Madrid markets.",
                },
              ].map((s) => (
                <div key={s.value} className="bg-navy-deep p-10">
                  <div className="font-serif text-4xl text-gold md:text-5xl">{s.value}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/60">{s.label}</div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-16 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Collaboration Process</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Four steps.<br />No ambiguity.
                </h2>
                <p className="mt-5 font-sans text-sm leading-relaxed text-ink-primary/60">
                  Every engagement is reviewed, scoped, documented, and activated in a defined sequence.
                  No surprises on structure or professional terms.
                </p>
              </div>
              {/* Vertical timeline */}
              <div className="space-y-0">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.number} className="relative flex gap-7 items-start pb-10 last:pb-0">
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="absolute left-[20px] top-11 bottom-0 w-px bg-navy/10" />
                    )}
                    <div className="relative z-10 flex-shrink-0 h-10 w-10 border border-gold/50 bg-white flex items-center justify-center">
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold">{step.number}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-serif text-lg text-navy-deep">{step.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/65">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Agency / Listing Submission Form ──────────────────────── */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-listing">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Miami Desk · Listing & Agency Inquiry</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Give your sellers a stronger international story.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Submit a listing, portfolio, or agency profile for review. Carlos evaluates every submission personally
                and responds to every serious submission directly.
              </p>
            </div>
            <AgencyPartnerForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Confidential · No Obligation · Professional Review · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Exposure, marketing, and referral coordination do not guarantee a buyer, offer, sale, or closing.
                All collaborations are subject to professional review, property suitability, local law, broker
                compliance, MLS/platform rules where applicable, and written agreement. Florida real estate
                brokerage services are provided through United Realty Group. International property opportunities
                are handled through referral, cooperating broker, or advisory relationships depending on
                jurisdiction and applicable regulations.
              </p>
            </div>
          </div>
        </section>

        {/* ── WhatsApp / Calendar CTA ───────────────────────────────── */}
        <section className="bg-gold/5 border-y border-gold/15 py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">Prefer to speak directly?</p>
                <p className="mt-2 font-serif text-2xl text-navy-deep">Request an agency partnership call.</p>
                <p className="mt-2 font-sans text-sm text-ink-primary/60 max-w-md">
                  For agency directors and developer sales teams exploring ongoing collaboration. Carlos is bilingual
                  English/Spanish and available for a structured 30-minute introduction.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row">
                <a
                  href={CONTACT.whatsappBroker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep whitespace-nowrap"
                >
                  <MessageSquare size={14} />
                  WhatsApp Carlos
                </a>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-navy/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy hover:bg-navy hover:text-white whitespace-nowrap"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── South Florida Cross-Border Referral Desk (secondary) ──── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Also Available · South Florida</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  South Florida cross-border referral desk.
                </h2>
                <p className="mt-5 font-sans text-sm leading-relaxed text-ink-primary/60">
                  Licensed real estate professionals with clients buying or selling in South Florida can refer
                  those transactions through a documented professional channel. Formal written agreement. Paid at closing.
                </p>
                <div className="mt-8 divide-y divide-hairline border border-hairline">
                  {SOUTH_FL_PATHWAYS.map((p) => (
                    <div key={p.number} className="flex flex-col bg-white p-7">
                      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-3">{p.number}</div>
                      <h3 className="font-serif text-lg text-navy-deep leading-snug">{p.title}</h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65 flex-1">{p.body}</p>
                      <a href="#south-florida-referral" className="mt-5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold hover:underline underline-offset-2">
                        Submit a referral →
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: cinematic video accent */}
              <div className="relative overflow-hidden bg-navy-deep" style={{ paddingBottom: "85%" }}>
                <LazyVideo
                  src="/videos/cinematic_house_reach.mp4"
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/80 mb-2">South Florida</p>
                  <p className="font-serif text-xl text-white leading-snug">
                    Miami-Dade · Broward<br />Palm Beach
                  </p>
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/40">
                    Full MLS · Bilingual · 25 years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* South Florida Referral Form */}
        <section className="bg-navy-deep py-16 md:py-24" id="south-florida-referral">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Referral Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit a South Florida cross-border referral.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For agencies, developers, and listing agents. Submit a portfolio or a single listing for review.
                Carlos reviews every inquiry personally and responds with partnership terms.
              </p>
            </div>
            <ReferralIntakeForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Licensed Professionals Only · Written Agreements · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Referral fee compensation is subject to a written referral agreement executed prior to client engagement.
                Florida real estate brokerage services are provided through United Realty Group. International referral
                opportunities may be handled through formal broker-to-broker agreements depending on jurisdiction
                and applicable regulations.
              </p>
            </div>
          </div>
        </section>

        {/* ── Join United Realty Group ──────────────────────────────── */}
        <section className="relative overflow-hidden bg-ivory py-20 md:py-28" id="join-urg">
          <LazyVideo
            src="/videos/ceul_team_dollhouse.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.07] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ivory via-ivory/95 to-ivory/80 pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-6">

            {/* Section header */}
            <div className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Career Opportunity · South Florida</p>
              <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Don't just join a brokerage.<br />
                <span className="text-gold">Join a desk that already moves business.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/65">
                United Realty Group is a full-service brokerage founded in 2002 — {CONTACT.stats.urgAgents} agents
                across {CONTACT.stats.urgOffices} Florida offices, with an in-house title company. Whatever stage you
                are at, you work directly with Carlos — an active 25-year agent on the same MLS, not a branch manager
                reviewing paperwork.
              </p>
            </div>

            {/* Featured United Realty brand film — the recruiting "ad" + the business case */}
            <div className="mb-14 grid gap-px overflow-hidden border border-gold/25 bg-gold/10 md:grid-cols-[1.15fr_0.85fr]">
              {/* Brand film */}
              <div className="relative min-h-[300px] overflow-hidden bg-navy-deep md:min-h-[440px]">
                <LazyVideo
                  src="/videos/advisor-brand.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-navy-deep/20 pointer-events-none" />
                <div className="absolute left-6 top-6">
                  <span className="inline-flex items-center gap-2 border border-gold/40 bg-navy-deep/60 px-3 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    United Realty Group · Brand Film
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-serif text-xl leading-snug text-white md:text-2xl">
                    See what working inside the brokerage looks like.
                  </p>
                  <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-white/45">
                    Founded 2002 · {CONTACT.stats.urgAgents} agents · {CONTACT.stats.urgOffices} Florida offices · In-house title
                  </p>
                </div>
              </div>

              {/* The business case for why agents grow here */}
              <div className="flex flex-col justify-center bg-navy-deep p-8 md:p-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold/80">Why agents grow here</p>
                <p className="mt-4 font-sans text-[15px] leading-[1.8] text-white/70">
                  The agents who build the fastest are the ones who plug into demand that already exists instead of
                  generating every lead alone. Carlos runs active seller, buyer, and cross-border desks on the same
                  MLS you will work — and brings 25 years of in-market relationships to the agents around him.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Mentorship from an active producer — not a back-office manager",
                    "A bilingual, international niche most local agents cannot serve",
                    "Where appropriate, qualified overflow inquiries are routed to affiliated agents",
                    "Full-service infrastructure: listing marketing, MLS reach, and in-house title",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                      <span className="font-sans text-sm leading-snug text-white/75">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Two audiences — new vs. experienced */}
            <div className="mb-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {[
                {
                  icon: UserPlus,
                  tag: "New to real estate",
                  title: "Start your career the right way.",
                  body: "From licensing to your first closing, you get a clear path and a mentor who has done it for 25 years — instead of a desk and a login. Learn the MLS, listing strategy, and how to build a pipeline from zero in a competitive, international market.",
                },
                {
                  icon: Handshake,
                  tag: "Experienced · switching agency",
                  title: "Ready for a change and real guidance.",
                  body: "Already licensed but underserved by your current brokerage? Bring your book, keep your independence, and gain a hands-on partner working the same market. For agents who want mentorship and growth — not just a lower split and silence.",
                },
              ].map((a) => (
                <div key={a.tag} className="bg-white p-8">
                  <a.icon size={20} className="text-gold" strokeWidth={1.5} />
                  <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-gold/80">{a.tag}</p>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep leading-snug">{a.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{a.body}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

              {/* Left — join reasons + CTA */}
              <div>
                <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
                  {[
                    {
                      icon: Building2,
                      title: "A platform that closes, not just lists",
                      body: "United Realty Group has operated since 2002 across 20 South Florida offices, with an in-house title company. Fewer deals stall at closing, and the ancillary side of every transaction stays under one roof.",
                    },
                    {
                      icon: Globe2,
                      title: "Reach from day one",
                      body: "Every affiliated agent enters the Miami and South Florida REALTORS® ecosystem — a 93,000-member association, 200+ global portals in 19 languages, and 437+ international referral agreements. You present like a luxury team without building one yourself.",
                    },
                    {
                      icon: Users,
                      title: "Built for a bilingual market",
                      body: "South Florida runs on English and Spanish — and so does the international buyer pool. An agent who can work both markets fluently competes for mandates and clients that monolingual agents simply can't reach.",
                    },
                    {
                      icon: Star,
                      title: "A mentor who is still in the game",
                      body: "Carlos has worked this market since 2001 and is closing deals on the same MLS today. You learn current strategy from someone doing the work now — not a branch manager reviewing paperwork.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-white p-7">
                      <item.icon size={18} className="text-gold" strokeWidth={1.5} />
                      <h3 className="mt-4 font-serif text-base text-navy-deep">{item.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">{item.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={WA_CAREERS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-navy-deep px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
                  >
                    <UserPlus size={14} />
                    Ask About Joining URG
                  </a>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/35">
                    Personal response from Carlos
                  </p>
                </div>

                <p className="mt-5 font-sans text-xs italic text-ink-primary/40">
                  All license affiliations are subject to United Realty Group's standard broker requirements, Florida DBPR licensing,
                  and applicable MLS membership rules. Contact Carlos directly for current availability and affiliate terms.
                </p>
              </div>

              {/* Right — booklet teaser card */}
              <div className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden border border-gold/30 bg-navy-deep shadow-2xl shadow-navy/20">
                  {/* Coming-soon badge */}
                  <div className="absolute right-4 top-4 z-10">
                    <span className="bg-gold px-3 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-navy-deep">
                      Coming Soon
                    </span>
                  </div>

                  {/* Visual header */}
                  <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_30%_40%,rgba(176,141,87,0.18),rgba(6,17,31,1))] px-8 pt-10 pb-8">
                    <div className="mb-6">
                      <BookOpen size={36} className="text-gold" strokeWidth={1.25} />
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/70 mb-3">
                      The South Florida Career Guide
                    </p>
                    <h3 className="font-serif text-2xl leading-snug text-white">
                      How to Become a Successful<br />
                      <em className="not-italic italic text-gold">Real Estate Agent in South Florida</em>
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-white/60">
                      A practical guide to starting and building a real estate career in one of the most
                      competitive and internationally connected markets in the United States — from
                      licensing, to your first transaction, to working inside a professional network.
                    </p>
                  </div>

                  {/* What's inside */}
                  <div className="border-t border-white/10 px-8 py-6">
                    <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.22em] text-gold/60">What's inside</p>
                    <ul className="space-y-2.5">
                      {[
                        "Florida real estate licensing — step by step",
                        "Choosing the right brokerage for your career",
                        "Building a pipeline from zero in South Florida",
                        "Working with international and Latin American buyers",
                        "MLS, listing strategy, and the agent network",
                        "What 25 years in this market actually teaches you",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                          <span className="font-sans text-[13px] leading-snug text-white/65">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-white/10 px-8 py-6">
                    <a
                      href="/la-comision-secreta"
                      className="group flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                    >
                      <BookOpen size={13} />
                      Preview the Book
                    </a>
                    <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                      By Carlos Uzcategui · FL SL705771 · United Realty Group
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-navy-deep py-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30 mb-3">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
            <p className="font-sans text-[10px] leading-relaxed text-white/25">
              Carlos Uzcategui is a Florida Licensed Realtor® (SL705771) affiliated with United Realty Group. He is not licensed as a real estate broker in Spain.
              Miami MLS exposure, syndication, referral compensation, cooperation, and listing distribution are subject to MLS rules, broker approval, written agreements,
              property eligibility, local law, and platform availability. Network figures are provided for context. We do not guarantee buyers, offers, closings, syndication
              results, or specific platform placement. All partnerships and referrals are documented through written agreements executed before engagement.
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
