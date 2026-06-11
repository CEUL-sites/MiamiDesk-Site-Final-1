import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, BadgeCheck, Building2, ChevronRight, Download, Globe2, Handshake, Landmark, TrendingUp } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

type Lang = "en" | "es";

const COPY = {
  en: {
    eyebrow: "Spain → Miami MLS · Agency & Developer Partnerships",
    h1a: "Your Spanish listings,",
    h1b: "in front of 93,000 Miami agents.",
    heroSub:
      "Most buyers of Spanish luxury property are Latin American and U.S. investors — and those buyers already keep Realtor® relationships in Miami. A formal MLS listing puts your inventory in their agents' hands.",
    ctaPrimary: "Request a Partnership Conversation",
    ctaWhatsApp: "WhatsApp — Spain Desk",
    ctaBrief: "Download the MLS Activation Methodology Brief",
    twoSidedEyebrow: "The Two-Sided Case",
    twoSidedH2: "Sell more. Win more mandates.",
    sellTitle: "Sell more — through agents, not portals",
    sellBody:
      "Your inventory reaches the buyer's own Realtor®: 93,000 member agents, with buyer-agent referral cooperation offered through United Realty Group as the licensed Florida broker. A financially motivated distribution network — not another listing site.",
    winTitle: "Win more mandates — in your own listing presentations",
    winBody:
      "\"Your property will also be activated on the Miami MLS international section\" is an exposure claim competing agencies cannot make. Use it to win the seller before you ever need to find the buyer.",
    whyEyebrow: "Why Miami",
    whyH2: "The largest local agent network in the world — built on Latin American demand.",
    stats: [
      { v: "93,000", l: "Member agents — Miami & South Florida REALTORS®" },
      { v: "437+", l: "International agreements — most of any local association" },
      { v: "200+", l: "Global portals · 19 languages — eligible syndication" },
      { v: "LATAM", l: "The buyer pool Miami agents already represent" },
    ],
    howEyebrow: "How It Works",
    howH2: "Four steps. Your client stays yours.",
    steps: [
      { t: "Agreement", d: "Written cooperation agreement — your agency remains the client-facing agent in Spain." },
      { t: "Activation", d: "Formal MLS listing through United Realty Group as the licensed Florida principal of record — not a referral note." },
      { t: "Distribution", d: "Buyer-agent referral compensation offered broker-to-broker, per written agreement." },
      { t: "Coordination", d: "Inquiries, showings, and offers coordinated with your team. Your client relationship stays yours." },
    ],
    whoEyebrow: "Who This Is For",
    whoH2: "Built for professional inventory.",
    who: [
      { icon: Building2, t: "Luxury Agencies", d: "Prime residential portfolios seeking U.S. and LATAM buyer exposure." },
      { icon: Landmark, t: "Developers", d: "New-construction inventory positioned for international distribution." },
      { icon: Handshake, t: "Family Offices & Private Owners", d: "Significant assets handled confidentially, broker-to-broker." },
    ],
    commercialEyebrow: "Commercial Structure",
    commercialH2: "Structured per agreement. Documented in writing.",
    commercialBody:
      "Portfolio programs are typically structured as a listing program for the agency's selected inventory, with referral cooperation through United Realty Group. Terms are discussed broker-to-broker and documented in writing before any activation.",
    faqEyebrow: "Common Questions",
    faqH2: "What agency principals ask first.",
    contactEyebrow: "Partnership Desk — Agencies & Developers",
    contactH2: "Start the conversation.",
    contactSub: "Confidential. Broker-to-broker. A written agreement precedes any client introduction.",
    calendly: "Book 30 minutes",
  },
  es: {
    eyebrow: "España → MLS de Miami · Alianzas con Agencias y Promotores",
    h1a: "Sus propiedades en España,",
    h1b: "ante 93.000 agentes de Miami.",
    heroSub:
      "La mayoría de los compradores de propiedad de lujo en España son inversores latinoamericanos y estadounidenses — y esos compradores ya mantienen relaciones con Realtors® en Miami. Un listado formal en el MLS pone su inventario en manos de sus agentes.",
    ctaPrimary: "Solicitar una Conversación de Alianza",
    ctaWhatsApp: "WhatsApp — Mesa de España",
    ctaBrief: "Descargar el informe metodológico de activación MLS",
    twoSidedEyebrow: "El Argumento de Doble Vía",
    twoSidedH2: "Venda más. Gane más mandatos.",
    sellTitle: "Venda más — a través de agentes, no de portales",
    sellBody:
      "Su inventario llega al Realtor® del comprador: 93.000 agentes miembros, con cooperación de referidos para agentes de compradores ofrecida a través de United Realty Group como broker licenciado de Florida. Una red de distribución con incentivo económico — no otro portal.",
    winTitle: "Gane más mandatos — en sus propias presentaciones de captación",
    winBody:
      "\"Su propiedad también será activada en la sección internacional del MLS de Miami\" es un argumento de exposición que las agencias competidoras no pueden ofrecer. Úselo para ganar al vendedor antes de necesitar al comprador.",
    whyEyebrow: "Por Qué Miami",
    whyH2: "La mayor red local de agentes del mundo — construida sobre demanda latinoamericana.",
    stats: [
      { v: "93.000", l: "Agentes miembros — Miami & South Florida REALTORS®" },
      { v: "437+", l: "Acuerdos internacionales — más que cualquier asociación local" },
      { v: "200+", l: "Portales globales · 19 idiomas — sindicación elegible" },
      { v: "LATAM", l: "El grupo comprador que los agentes de Miami ya representan" },
    ],
    howEyebrow: "Cómo Funciona",
    howH2: "Cuatro pasos. Su cliente sigue siendo suyo.",
    steps: [
      { t: "Acuerdo", d: "Acuerdo de cooperación por escrito — su agencia sigue siendo el agente del cliente en España." },
      { t: "Activación", d: "Listado formal en el MLS a través de United Realty Group como principal licenciado de Florida — no una nota de referido." },
      { t: "Distribución", d: "Compensación de referidos para agentes de compradores, broker a broker, según acuerdo escrito." },
      { t: "Coordinación", d: "Consultas, visitas y ofertas coordinadas con su equipo. La relación con su cliente sigue siendo suya." },
    ],
    whoEyebrow: "Para Quién Es",
    whoH2: "Diseñado para inventario profesional.",
    who: [
      { icon: Building2, t: "Agencias de Lujo", d: "Carteras residenciales prime que buscan exposición a compradores de EE. UU. y LATAM." },
      { icon: Landmark, t: "Promotores", d: "Obra nueva posicionada para distribución internacional." },
      { icon: Handshake, t: "Family Offices y Propietarios Privados", d: "Activos significativos gestionados confidencialmente, broker a broker." },
    ],
    commercialEyebrow: "Estructura Comercial",
    commercialH2: "Estructurado por acuerdo. Documentado por escrito.",
    commercialBody:
      "Los programas de cartera se estructuran típicamente como un programa de listado del inventario seleccionado por la agencia, con cooperación de referidos a través de United Realty Group. Los términos se conversan broker a broker y se documentan por escrito antes de cualquier activación.",
    faqEyebrow: "Preguntas Frecuentes",
    faqH2: "Lo que los directores de agencia preguntan primero.",
    contactEyebrow: "Mesa de Alianzas — Agencias y Promotores",
    contactH2: "Inicie la conversación.",
    contactSub: "Confidencial. Broker a broker. Un acuerdo escrito precede a cualquier presentación de cliente.",
    calendly: "Reservar 30 minutos",
  },
} as const;

const FAQS: Record<Lang, { q: string; a: string }[]> = {
  en: [
    {
      q: "Is this a formal MLS listing or just a referral?",
      a: "A formal listing. Eligible Spanish properties are activated on the Miami MLS international property section through United Realty Group as the licensed Florida principal of record — visible to the member agent network, subject to MLS rules.",
    },
    {
      q: "Do we lose the client relationship?",
      a: "No. The written cooperation agreement keeps your agency as the agent of record in Spain. All client-facing work in Spain remains yours; the U.S.-side activation and agent distribution is what we add.",
    },
    {
      q: "How is buyer-agent compensation handled?",
      a: "Referral cooperation is offered to buyer agents through United Realty Group per written broker-to-broker agreement. No terms are published publicly; everything is documented before activation.",
    },
    {
      q: "What inventory qualifies?",
      a: "Prime and luxury residential and investment-grade property. Eligibility is subject to Miami MLS rules for international listings, reviewed property by property before activation.",
    },
    {
      q: "Who is legally responsible for the U.S.-side listing?",
      a: "Carlos Uzcategui, Florida licensed REALTOR® SL705771, through United Realty Group, the licensed Florida broker. Your agency remains the licensed party in Spain — that division is the point of the structure.",
    },
  ],
  es: [
    {
      q: "¿Es un listado formal en el MLS o solo un referido?",
      a: "Un listado formal. Las propiedades españolas elegibles se activan en la sección internacional del MLS de Miami a través de United Realty Group como principal licenciado de Florida — visibles para la red de agentes miembros, sujeto a las reglas del MLS.",
    },
    {
      q: "¿Perdemos la relación con el cliente?",
      a: "No. El acuerdo de cooperación por escrito mantiene a su agencia como agente del cliente en España. Todo el trabajo de cara al cliente en España sigue siendo suyo; lo que añadimos es la activación en EE. UU. y la distribución entre agentes.",
    },
    {
      q: "¿Cómo se gestiona la compensación del agente del comprador?",
      a: "La cooperación de referidos se ofrece a los agentes de compradores a través de United Realty Group según acuerdo escrito broker a broker. No se publican términos; todo se documenta antes de la activación.",
    },
    {
      q: "¿Qué inventario califica?",
      a: "Propiedad residencial prime y de lujo, y activos de grado de inversión. La elegibilidad está sujeta a las reglas del MLS de Miami para listados internacionales, revisada propiedad por propiedad antes de la activación.",
    },
    {
      q: "¿Quién es legalmente responsable del listado en EE. UU.?",
      a: "Carlos Uzcategui, REALTOR® licenciado de Florida SL705771, a través de United Realty Group, el broker licenciado de Florida. Su agencia sigue siendo la parte licenciada en España — esa división es precisamente el sentido de la estructura.",
    },
  ],
};

export default function SpainMlsListingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];
  const faqs = FAQS[lang];

  return (
    <>
      <Helmet>
        <title>List Spanish Luxury Property on the Miami MLS | Agency & Developer Partnerships — Carlos Uzcategui</title>
        <meta name="description" content="Formal Miami MLS activation for Spanish prime inventory — agencies, developers, and family offices. LATAM and U.S. buyer-agent reach through United Realty Group." />
        <meta name="keywords" content="list Spanish property Miami MLS, Spain real estate Miami exposure, luxury agency partnership Miami, Spanish developer US buyers, Miami MLS international listings, referral commission buyer agents Miami" />
        <link rel="canonical" href="https://homesprofessional.com/spain-mls-listing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/spain-mls-listing" />
        <meta property="og:title" content="Your Spanish Listings, in Front of 93,000 Miami Agents" />
        <meta property="og:description" content="Formal Miami MLS activation for Spanish prime inventory. Sell more through buyer agents — and win more mandates with exposure competing agencies cannot offer." />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="List Spanish Luxury Property on the Miami MLS" />
        <meta name="twitter:description" content="Agency & developer partnerships — LATAM and U.S. buyer-agent reach through United Realty Group, the licensed Florida broker." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Global Desk", "item": "https://homesprofessional.com/global-desk" },
            { "@type": "ListItem", "position": 3, "name": "Spain MLS Listing", "item": "https://homesprofessional.com/spain-mls-listing" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Spanish Inventory Activation on the Miami MLS",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate Listing Cooperation",
          "description": "Formal Miami MLS activation of eligible Spanish prime residential and investment-grade property for agencies, developers, and family offices, with buyer-agent referral cooperation through United Realty Group.",
          "areaServed": ["Spain", "South Florida"],
          "availableLanguage": ["English", "Spanish"],
          "url": "https://homesprofessional.com/spain-mls-listing"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.en.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#060D18] px-6 pt-24 pb-14 md:pt-32 md:pb-20 text-white">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-4xl">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.26em] text-gold">{t.eyebrow}</p>
              <div className="flex flex-shrink-0 items-center border border-white/15 font-mono text-[10px] uppercase">
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`px-3 py-1.5 tracking-[0.18em] transition-colors ${lang === l ? "bg-gold text-navy-deep" : "text-white/55 hover:text-white"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <h1 className="mt-8 font-serif leading-tight" style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)" }}>
              {t.h1a}<br />
              <em className="not-italic italic text-gold">{t.h1b}</em>
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">{t.heroSub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                {t.ctaPrimary}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappBroker} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white">
                {t.ctaWhatsApp}
              </a>
            </div>
            <a href={LEAD_MAGNETS.spainActivation.url} download className="mt-6 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
              <Download size={11} />
              {t.ctaBrief}
            </a>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              {CONTACT.licenseDisplay} · United Realty Group · Madrid Desk +34 646 853 078
            </p>
          </div>
        </section>

        {/* ── Two-sided value ── */}
        <section className="bg-ivory py-14 md:py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.twoSidedEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.twoSidedH2}</h2>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              <div className="bg-white p-8">
                <TrendingUp size={22} className="text-gold" />
                <h3 className="mt-4 font-serif text-2xl text-navy-deep">{t.sellTitle}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{t.sellBody}</p>
              </div>
              <div className="bg-white p-8">
                <Globe2 size={22} className="text-gold" />
                <h3 className="mt-4 font-serif text-2xl text-navy-deep">{t.winTitle}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{t.winBody}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Miami stats ── */}
        <section className="bg-navy-deep py-14 md:py-20 px-6 text-white">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.whyEyebrow}</p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight md:text-4xl">{t.whyH2}</h2>
            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {t.stats.map((s) => (
                <div key={s.l} className="bg-navy p-7">
                  <p className="font-serif text-3xl text-gold">{s.v}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-white/55">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
              Source: Miami and South Florida REALTORS® · Eligible syndication subject to MLS rules and platform participation
            </p>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-white py-14 md:py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.howEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.howH2}</h2>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {t.steps.map((s, i) => (
                <div key={s.t} className="bg-white p-7">
                  <p className="font-serif text-3xl text-gold/40">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-serif text-xl text-navy-deep">{s.t}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who this is for ── */}
        <section className="bg-ivory py-14 md:py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.whoEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.whoH2}</h2>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
              {t.who.map(({ icon: Icon, ...w }) => (
                <div key={w.t} className="bg-white p-7">
                  <Icon size={20} className="text-gold" />
                  <h3 className="mt-4 font-serif text-xl text-navy-deep">{w.t}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Commercial structure ── */}
        <section className="bg-navy py-14 md:py-18 px-6 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.commercialEyebrow}</p>
            <h2 className="mt-4 font-serif text-2xl leading-tight md:text-3xl">{t.commercialH2}</h2>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/60">{t.commercialBody}</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white py-14 md:py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.faqEyebrow}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.faqH2}</h2>
            <div className="mt-8 divide-y divide-hairline">
              {faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <p className="font-serif text-lg leading-snug text-navy-deep">{f.q}</p>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="bg-navy-deep py-16 md:py-24 px-6" id="contact">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.contactEyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl text-white">{t.contactH2}</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">{t.contactSub}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                <a href={CONTACT.whatsappBroker} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">WhatsApp ES +34 646 85 30 78</a>
                <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold hover:text-white transition-colors">{t.calendly} <ArrowRight size={11} /></a>
              </div>
            </div>
            <AgencyPartnerForm />
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
