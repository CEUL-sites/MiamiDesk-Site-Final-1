import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { CONTACT } from "../constants";

type Lang = "en" | "es";

// Section 7 — Madrid seller landing (EN) and its ES-ES counterpart (/es/madrid).
// ES copy is peninsular Spanish, formal usted; flagged for native ES-ES editor
// review per Section 13 before launch sign-off.
const COPY = {
  en: {
    eyebrow: "Madrid · Marbella · Costa del Sol → Miami",
    h1a: "Your Spanish property. The U.S. market.",
    h1b: "One licensed Florida principal of record.",
    sub: "Carlos lists Spanish luxury property into the Miami MLS as a Florida Licensed Realtor® — the third-largest MLS in the United States. Your property reaches 93,000 member agents and 2 million+ international professionals while local Spain buyer access continues through affiliated Madrid agencies. Both channels run simultaneously. Not a referral. A formal listing.",
    waCta: "WhatsApp España",
    formCta: "Solicite una conversación con el principal",
    argEyebrow: "The structural argument",
    argTitle: "Structural distribution, not marketing.",
    argBody: "The Miami and South Florida REALTORS® MLS is the third-largest MLS in the United States — 93,000 member agents across Miami-Dade, Broward, Palm Beach, St. Lucie and parts of Martin counties, syndicated to 200+ global websites in 19 languages, with an international referral network reaching 2 million+ professionals across 300+ partner associations in 70+ countries.",
    stats: [
      { v: "3rd", l: "Largest MLS in the U.S." },
      { v: "93,000", l: "Member agents" },
      { v: "2M+", l: "Professionals" },
      { v: "70+", l: "Countries" },
    ],
    mechEyebrow: "How it actually works",
    mechTitle: "Two channels, running in parallel.",
    mechanism: [
      { step: "01", title: "What the seller signs", body: "A formal listing agreement with Carlos as the Florida Licensed Realtor® of record. The property is entered into the Miami and South Florida REALTORS® MLS as a listed asset — not referred, listed." },
      { step: "02", title: "Who handles showings in Spain", body: "Affiliated Madrid agencies within Carlos's network continue local buyer qualification, viewings, and on-the-ground negotiation in Spain. The seller keeps full local market access." },
      { step: "03", title: "How the Miami MLS exposure activates", body: "On entry, the listing reaches 93,000 member agents, syndicates to 200+ global websites in 19 languages, and enters the international referral network of 2 million+ professionals across 300+ partner associations in 70+ countries. Both channels run simultaneously." },
    ],
    proofEyebrow: "Madrid proof anchors",
    proofTitle: "The data behind the demand.",
    proof: [
      { title: "Top Countries Searching South Florida", body: "MIAMI Realtors international search data — where global demand for South Florida property originates.", pending: "MIAMI co-branded flyer — pending asset integration" },
      { title: "Miami International Airport — Direct Flights", body: "Direct connectivity between Madrid and Miami International Airport, the access layer behind cross-border ownership.", pending: "MIA statistics sheet — pending asset integration" },
      { title: "MIAMI International Magazine — Spanish Edition", body: "The association's Spanish-language editorial reaching the international buyer audience.", pending: "Latest Spanish edition — pending asset integration" },
    ],
  },
  es: {
    eyebrow: "Madrid · Marbella · Costa del Sol → Miami",
    h1a: "Su propiedad española. El mercado de EE. UU.",
    h1b: "Un principal con licencia de Florida como responsable.",
    sub: "Carlos lista propiedad de lujo española en el MLS de Miami como Realtor® con licencia de Florida — el tercer MLS más grande de Estados Unidos. Su propiedad llega a 93.000 agentes miembros y a más de 1 millón de profesionales internacionales, mientras el acceso al comprador local en España continúa a través de agencias colaboradoras en Madrid. Ambos canales operan de forma simultánea. No es una derivación. Es un listado formal.",
    waCta: "WhatsApp España",
    formCta: "Solicite una conversación con el principal",
    argEyebrow: "El argumento estructural",
    argTitle: "Distribución estructural, no marketing.",
    argBody: "El MLS de Miami and South Florida REALTORS® es el tercer MLS más grande de Estados Unidos — 93.000 agentes miembros en los condados de Miami-Dade, Broward, Palm Beach, St. Lucie y parte de Martin, con sindicación a más de 200 sitios web globales en 19 idiomas y una red internacional de referidos que alcanza a más de 1 millón de profesionales en más de 300 asociaciones socias de más de 70 países. La fusión que lo creó entró en vigor el 11 de mayo de 2026.",
    stats: [
      { v: "3.º", l: "Mayor MLS de EE. UU." },
      { v: "93.000", l: "Agentes miembros" },
      { v: "1M+", l: "Profesionales" },
      { v: "70+", l: "Países" },
    ],
    mechEyebrow: "Cómo funciona realmente",
    mechTitle: "Dos canales, en paralelo.",
    mechanism: [
      { step: "01", title: "Lo que firma el vendedor", body: "Un contrato de listado formal con Carlos como Realtor® con licencia de Florida y responsable del registro. La propiedad se introduce en el MLS de Miami and South Florida REALTORS® como activo listado — no derivado, listado." },
      { step: "02", title: "Quién gestiona las visitas en España", body: "Las agencias colaboradoras de Madrid dentro de la red de Carlos continúan con la cualificación del comprador local, las visitas y la negociación sobre el terreno en España. El vendedor conserva el acceso pleno al mercado local." },
      { step: "03", title: "Cómo se activa la exposición en el MLS de Miami", body: "Al registrarse, el listado llega a 93.000 agentes miembros, se sindica a más de 200 sitios web globales en 19 idiomas y entra en la red internacional de referidos de más de 1 millón de profesionales en más de 300 asociaciones socias de más de 70 países. Ambos canales operan de forma simultánea." },
    ],
    proofEyebrow: "Anclas de prueba — Madrid",
    proofTitle: "Los datos detrás de la demanda.",
    proof: [
      { title: "Principales países que buscan el Sur de Florida", body: "Datos de búsqueda internacional de MIAMI Realtors — de dónde procede la demanda global de propiedad en el Sur de Florida.", pending: "Folleto co-marca MIAMI — pendiente de integración" },
      { title: "Aeropuerto Internacional de Miami — Vuelos directos", body: "Conectividad directa entre Madrid y el Aeropuerto Internacional de Miami, la capa de acceso tras la propiedad transfronteriza.", pending: "Hoja de estadísticas MIA — pendiente de integración" },
      { title: "MIAMI International Magazine — Edición en español", body: "La publicación en español de la asociación que llega al público comprador internacional.", pending: "Última edición en español — pendiente de integración" },
    ],
  },
} as const;

export default function MadridPage({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const canonical = lang === "es" ? "https://homesprofessional.com/es/madrid" : "https://homesprofessional.com/madrid";

  return (
    <>
      <Helmet>
        <title>{lang === "es" ? "Mesa Madrid | Propiedad española en el MLS de Miami | Carlos Uzcategui" : "Madrid Desk | Spanish Property into the Miami MLS | Carlos Uzcategui"}</title>
        <meta name="description" content={t.sub.slice(0, 155)} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en-US" href="https://homesprofessional.com/madrid" />
        <link rel="alternate" hrefLang="es-ES" href="https://homesprofessional.com/es/madrid" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/madrid" />
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              {t.eyebrow}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mx-auto mt-6 max-w-4xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}>
              {t.h1a}<br />
              <em className="not-italic italic text-gold">{t.h1b}</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/60">
              {t.sub}
            </motion.p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                <MessageSquare size={15} /> {t.waCta}
              </a>
              <a href="/contact" className="group inline-flex items-center gap-2 border border-white/25 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
                {t.formCta}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-12"><MiamiRealtorsBadge variant="dark" lang={lang} /></div>
          </div>
        </section>

        {/* ── 1. Structural argument ───────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.argEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.argTitle}</h2>
            <p className="mt-6 max-w-3xl font-sans text-[17px] leading-[1.7] text-ink-primary/80">{t.argBody}</p>
            <div className="mt-12 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
              {t.stats.map((s) => (
                <div key={s.l} className="bg-white px-6 py-8 text-center">
                  <div className="font-serif text-3xl text-navy-deep">{s.v}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. Dual-market mechanism ─────────────────────────── */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.mechEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">{t.mechTitle}</h2>
            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {t.mechanism.map((m) => (
                <div key={m.step} className="bg-navy-deep p-8">
                  <div className="font-serif text-2xl text-gold">{m.step}</div>
                  <h3 className="mt-4 font-serif text-xl text-white">{m.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/60">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Proof anchors ─────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.proofEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.proofTitle}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {t.proof.map((a) => (
                <article key={a.title} className="border border-hairline p-7">
                  <h3 className="font-serif text-xl text-navy-deep">{a.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">{a.body}</p>
                  <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.2em] text-gold/60">{a.pending}</p>
                </article>
              ))}
            </div>
            <div className="mt-14 text-center">
              <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep">
                <MessageSquare size={15} /> {t.waCta} · {CONTACT.phoneSpainDisplay}
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
