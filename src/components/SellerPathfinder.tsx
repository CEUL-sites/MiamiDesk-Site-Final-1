import { useState } from "react";
import {
  ArrowRight,
  Globe2,
  Handshake,
  Home,
  KeyRound,
  MessageSquare,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { CONTACT } from "../constants";
import { trackContact, trackFunnelEvent } from "../lib/analytics";

/**
 * Two taps instead of a page of copy: the visitor says what they are deciding
 * and roughly where they are in it, and the panel answers with the one route
 * that applies to them.
 *
 * The site's problem was never a missing paragraph — it was that a seller, a
 * buyer, an owner abroad and a referring agent all landed on the same wall of
 * text and had to work out for themselves which parts were addressed to them.
 * Most did not. This module asks the two questions that separate those four
 * audiences and then shows one short answer and one destination.
 *
 * The message is composed, not stored twelve times over: an intent supplies the
 * headline, body and destination; the stage supplies the sentence that frames
 * it. Twelve outcomes from seven short strings — the copy volume goes down, not
 * up, which is the point of the exercise.
 *
 * Bilingual by `lang`, the same prop HeroSellerForm, DesktopStickyCTA and
 * ExitIntentModal take. Destinations differ per language because the Spanish
 * routes are real pages, not translations layered over the English ones — a
 * Spanish visitor sent to /buy would land back in English mid-decision.
 *
 * Each answer is a warm-intent signal worth having in the ad accounts, so both
 * steps and the routed click fire funnel events. They go through
 * trackFunnelEvent, which is gated on cookie consent, and are suppressed during
 * react-snap prerendering the same way every other funnel event on the site is.
 */

type Lang = "en" | "es";
type IntentId = "seller" | "buyer" | "global" | "agent";

interface IntentCopy {
  choice: string;
  headline: string;
  body: string;
  ctaLabel: string;
}

interface Intent {
  id: IntentId;
  icon: LucideIcon;
  href: Record<Lang, string>;
  en: IntentCopy;
  es: IntentCopy;
}

const INTENTS: Intent[] = [
  {
    id: "seller",
    icon: Home,
    href: { en: "#list-here", es: "#list-here" },
    en: {
      choice: "Selling a South Florida property",
      headline: "A private read on your property, before any listing decision.",
      body: "Carlos reviews the comparable set, the competitive position and the likely buyer profile for your property, then sends the read back to you.",
      ctaLabel: "Request my property strategy",
    },
    es: {
      choice: "Vender una propiedad en el Sur de Florida",
      headline: "Una lectura privada de su propiedad, antes de cualquier decisión de venta.",
      body: "Carlos revisa los comparables, la posición competitiva y el perfil probable de comprador de su propiedad, y le devuelve esa lectura.",
      ctaLabel: "Solicitar mi estrategia de venta",
    },
  },
  {
    id: "buyer",
    icon: KeyRound,
    href: { en: "/buy", es: "/es/comprar" },
    en: {
      choice: "Buying or relocating here",
      headline: "A buyer's read on a market that moves through agents.",
      body: "Carlos works the MLS from the buying side — inventory that fits the brief, the competitive picture around it, and what the numbers look like before an offer goes in.",
      ctaLabel: "Open the buyer brief",
    },
    es: {
      choice: "Comprar o mudarse aquí",
      headline: "La lectura de un comprador en un mercado que se mueve a través de agentes.",
      body: "Carlos trabaja el MLS desde el lado del comprador: inventario que encaja con el encargo, el panorama competitivo a su alrededor y qué dicen los números antes de presentar una oferta.",
      ctaLabel: "Abrir la guía del comprador",
    },
  },
  {
    id: "global",
    icon: Globe2,
    href: { en: "/global-desk", es: "/es/spain-desk" },
    en: {
      choice: "I own property outside the U.S.",
      headline: "Property abroad, presented to South Florida buyer agents.",
      body: "The Global Desk prepares selected international prime inventory for South Florida buyer-agent discovery through a licensed brokerage framework, subject to eligibility, MLS rules and platform participation.",
      ctaLabel: "Enter the Global Desk",
    },
    es: {
      choice: "Tengo una propiedad fuera de EE. UU.",
      headline: "Propiedad en el extranjero, presentada a agentes compradores del Sur de Florida.",
      body: "El Global Desk prepara inventario prime internacional seleccionado para su descubrimiento por agentes compradores del Sur de Florida, dentro de un marco de corretaje con licencia y sujeto a elegibilidad, normas del MLS y participación de las plataformas.",
      ctaLabel: "Entrar al Global Desk",
    },
  },
  {
    id: "agent",
    icon: Handshake,
    href: { en: "/agents", es: "/es/agentes" },
    en: {
      choice: "I have a client to refer",
      headline: "A referral handled by a licensed Florida professional.",
      body: "Carlos takes South Florida referrals from agents inside and outside the United States, with cooperation terms agreed in writing before any client introduction.",
      ctaLabel: "Review the referral terms",
    },
    es: {
      choice: "Tengo un cliente para referir",
      headline: "Un referral gestionado por un profesional con licencia en Florida.",
      body: "Carlos recibe, de agentes dentro y fuera de Estados Unidos, referrals para el Sur de Florida, con los términos de cooperación acordados por escrito antes de cualquier presentación de cliente.",
      ctaLabel: "Ver los términos del referral",
    },
  },
];

interface StageCopy {
  choice: string;
  note: string;
}

const STAGES: { id: string; en: StageCopy; es: StageCopy }[] = [
  {
    id: "exploring",
    en: { choice: "Still deciding", note: "You are early, so nothing here carries a commitment." },
    es: { choice: "Aún decidiendo", note: "Está en una fase temprana, así que nada de esto conlleva un compromiso." },
  },
  {
    id: "comparing",
    en: {
      choice: "Comparing my options",
      note: "You are weighing options, so what is useful is evidence you can check yourself.",
    },
    es: {
      choice: "Comparando opciones",
      note: "Está sopesando opciones, así que lo útil es evidencia que usted mismo pueda comprobar.",
    },
  },
  {
    id: "ready",
    en: { choice: "Ready to move", note: "You are ready to act, so the direct route is a conversation with Carlos." },
    es: { choice: "Listo para actuar", note: "Está listo para actuar, así que la vía directa es una conversación con Carlos." },
  },
];

const SHELL = {
  en: {
    eyebrow: "Two questions",
    heading: "Tell Carlos what you are deciding. Get the one route that applies.",
    step: (n: number) => `Step ${n} of 3`,
    q1: "What are you deciding?",
    q2: "Where are you in it?",
    result: "Your route",
    whatsapp: "Ask Carlos directly",
    footnote: "No listing commitment · Carlos responds personally",
  },
  es: {
    eyebrow: "Dos preguntas",
    heading: "Dígale a Carlos qué está decidiendo. Reciba la vía que le corresponde.",
    step: (n: number) => `Paso ${n} de 3`,
    q1: "¿Qué está decidiendo?",
    q2: "¿En qué punto está?",
    result: "Su vía",
    whatsapp: "Preguntar a Carlos directamente",
    footnote: "Sin compromiso de listado · Carlos responde personalmente",
  },
} as const;

function fire(name: string, payload: Record<string, unknown>) {
  if (typeof navigator !== "undefined" && navigator.webdriver) return; // react-snap prerender
  trackFunnelEvent(name, payload);
}

export function SellerPathfinder({
  lang = "en",
  sellerHref,
  whatsappHref,
  className = "",
}: {
  lang?: Lang;
  /** Overrides the seller route. Defaults to the in-page hero form anchor. */
  sellerHref?: string;
  /**
   * Spain-market routes must answer on +34 and US routes on +1 — never the
   * other way round. Defaults to the US line; pass CONTACT.whatsappSpain on
   * any route isSpainMarketRoute() covers.
   */
  whatsappHref?: string;
  className?: string;
}) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [stage, setStage] = useState<(typeof STAGES)[number] | null>(null);

  const t = SHELL[lang];
  const wa = whatsappHref ?? CONTACT.whatsappUS;
  const step = intent === null ? 1 : stage === null ? 2 : 3;
  const href = intent ? (intent.id === "seller" && sellerHref ? sellerHref : intent.href[lang]) : undefined;

  const chooseIntent = (next: Intent) => {
    setIntent(next);
    setStage(null);
    fire("pathfinder_intent", { intent: next.id, lang });
  };

  const chooseStage = (next: (typeof STAGES)[number]) => {
    setStage(next);
    fire("pathfinder_result", { intent: intent?.id, stage: next.id, lang });
  };

  const reset = () => {
    setIntent(null);
    setStage(null);
  };

  return (
    <section
      className={`relative overflow-hidden border-y border-gold/20 bg-navy-deep py-14 text-white md:py-20 ${className}`}
      aria-labelledby="pathfinder-heading"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(176,141,87,0.12), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.eyebrow}</p>
          <h2
            id="pathfinder-heading"
            className="mx-auto mt-4 max-w-2xl font-serif text-2xl leading-tight text-white md:text-4xl"
          >
            {t.heading}
          </h2>
        </div>

        {/* Answer trail — each answered question stays visible and re-editable,
            so a visitor can correct a mistap without starting over. */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {[
            { on: intent !== null, label: intent?.[lang].choice, onClick: reset },
            { on: stage !== null, label: stage?.[lang].choice, onClick: () => setStage(null) },
          ].map((chip, i) =>
            chip.on ? (
              <button
                key={i}
                type="button"
                onClick={chip.onClick}
                className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                {chip.label}
                <RotateCcw size={11} aria-hidden="true" />
              </button>
            ) : null,
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
            {t.step(step)}
          </span>
        </div>

        <div className="pf-stage mt-7 rounded-xl border border-white/12 bg-white/[0.035] p-6 md:mt-9 md:p-9">
          {step === 1 && (
            <div className="pf-fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">{t.q1}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {INTENTS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseIntent(option)}
                    className="pf-option group flex items-center gap-3.5 rounded-lg border border-white/12 bg-navy/40 px-5 py-4 text-left transition-colors hover:border-gold/50 hover:bg-navy/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/10">
                      <option.icon size={16} className="text-gold" aria-hidden="true" />
                    </span>
                    <span className="font-sans text-[0.95rem] leading-snug text-white/85">
                      {option[lang].choice}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pf-fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">{t.q2}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {STAGES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseStage(option)}
                    className="pf-option rounded-lg border border-white/12 bg-navy/40 px-5 py-5 text-left transition-colors hover:border-gold/50 hover:bg-navy/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    <span className="font-serif text-lg text-white">{option[lang].choice}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && intent && stage && (
            <div className="pf-fade" role="status">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t.result}</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-white md:text-3xl">
                {intent[lang].headline}
              </p>
              <p className="mt-4 max-w-2xl font-sans text-[0.95rem] leading-relaxed text-white/70">
                {stage[lang].note} {intent[lang].body}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={href}
                  onClick={() => fire("pathfinder_cta", { intent: intent.id, stage: stage.id, lang })}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-gold px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  {intent[lang].ctaLabel}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp", `pathfinder_${intent.id}`)}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-white/20 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  {t.whatsapp}
                </a>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                {t.footnote}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .pf-stage { transition: box-shadow 0.4s ease; }
        @keyframes pf-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .pf-fade { animation: pf-in 0.42s cubic-bezier(0.22,1,0.36,1) both; }
        .pf-option { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, background-color 0.35s ease, box-shadow 0.35s ease; }
        @media (hover: hover) and (pointer: fine) {
          .pf-option:hover {
            transform: perspective(700px) rotateX(4deg) translateY(-3px);
            box-shadow: 0 14px 32px -12px rgba(0,0,0,0.55);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-fade { animation: none; }
          .pf-option { transition: none; }
          .pf-option:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
