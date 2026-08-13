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
 * buyer, an owner in Spain and a referring agent all landed on the same wall of
 * text and had to work out for themselves which parts were addressed to them.
 * Most did not. This module asks the two questions that separate those four
 * audiences and then shows one short answer and one destination.
 *
 * The message is composed, not stored twelve times over: an intent supplies the
 * headline, body and destination; the stage supplies the sentence that frames
 * it. Twelve outcomes from seven short strings — the copy volume goes down, not
 * up, which is the point of the exercise.
 *
 * Each answer is a warm-intent signal worth having in the ad accounts, so both
 * steps and the routed click fire funnel events. They go through
 * trackFunnelEvent, which is gated on cookie consent, and are suppressed during
 * react-snap prerendering the same way every other funnel event on the site is.
 */

type IntentId = "seller" | "buyer" | "global" | "agent";
type StageId = "exploring" | "comparing" | "ready";

interface Intent {
  id: IntentId;
  icon: LucideIcon;
  choice: string;
  headline: string;
  body: string;
  ctaLabel: string;
  href: string;
}

const INTENTS: Intent[] = [
  {
    id: "seller",
    icon: Home,
    choice: "Selling a South Florida property",
    headline: "A private read on your property, before any listing decision.",
    body: "Carlos reviews the comparable set, the competitive position and the likely buyer profile for your property, then sends the read back to you.",
    ctaLabel: "Request my property strategy",
    href: "#list-here",
  },
  {
    id: "buyer",
    icon: KeyRound,
    choice: "Buying or relocating here",
    headline: "A buyer's read on a market that moves through agents.",
    body: "Carlos works the MLS from the buying side — inventory that fits the brief, the competitive picture around it, and what the numbers look like before an offer goes in.",
    ctaLabel: "Open the buyer brief",
    href: "/buy",
  },
  {
    id: "global",
    icon: Globe2,
    choice: "I own property outside the U.S.",
    headline: "Property abroad, presented to South Florida buyer agents.",
    body: "The Global Desk prepares selected international prime inventory for South Florida buyer-agent discovery through a licensed brokerage framework, subject to eligibility, MLS rules and platform participation.",
    ctaLabel: "Enter the Global Desk",
    href: "/global-desk",
  },
  {
    id: "agent",
    icon: Handshake,
    choice: "I have a client to refer",
    headline: "A referral handled by a licensed Florida professional.",
    body: "Carlos takes South Florida referrals from agents inside and outside the United States, with cooperation terms agreed in writing before any client introduction.",
    ctaLabel: "Review the referral terms",
    href: "/agents",
  },
];

const STAGES: { id: StageId; choice: string; note: string }[] = [
  {
    id: "exploring",
    choice: "Still deciding",
    note: "You are early, so nothing here carries a commitment.",
  },
  {
    id: "comparing",
    choice: "Comparing my options",
    note: "You are weighing options, so what is useful is evidence you can check yourself.",
  },
  {
    id: "ready",
    choice: "Ready to move",
    note: "You are ready to act, so the direct route is a conversation with Carlos.",
  },
];

function fire(name: string, payload: Record<string, unknown>) {
  if (typeof navigator !== "undefined" && navigator.webdriver) return; // react-snap prerender
  trackFunnelEvent(name, payload);
}

export function SellerPathfinder({
  sellerHref = "#list-here",
  whatsappHref = CONTACT.whatsappUS,
  className = "",
}: {
  /** Where the seller route points. Defaults to the in-page hero form anchor. */
  sellerHref?: string;
  /** Use the Spain line on Spain-market routes; never mix the two. */
  whatsappHref?: string;
  className?: string;
}) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [stage, setStage] = useState<(typeof STAGES)[number] | null>(null);

  const step = intent === null ? 1 : stage === null ? 2 : 3;
  const href = intent?.id === "seller" ? sellerHref : intent?.href;

  const chooseIntent = (next: Intent) => {
    setIntent(next);
    setStage(null);
    fire("pathfinder_intent", { intent: next.id });
  };

  const chooseStage = (next: (typeof STAGES)[number]) => {
    setStage(next);
    fire("pathfinder_result", { intent: intent?.id, stage: next.id });
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
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Two questions
          </p>
          <h2
            id="pathfinder-heading"
            className="mx-auto mt-4 max-w-2xl font-serif text-2xl leading-tight text-white md:text-4xl"
          >
            Tell Carlos what you are deciding. Get the one route that applies.
          </h2>
        </div>

        {/* Answer trail — each answered question stays visible and re-editable,
            so a visitor can correct a mistap without starting over. */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {[
            { on: intent !== null, label: intent?.choice, onClick: reset },
            { on: stage !== null, label: stage?.choice, onClick: () => setStage(null) },
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
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
            Step {step} of 3
          </span>
        </div>

        <div className="pf-stage mt-7 rounded-xl border border-white/12 bg-white/[0.035] p-6 md:mt-9 md:p-9">
          {step === 1 && (
            <div className="pf-fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                What are you deciding?
              </p>
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
                      {option.choice}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="pf-fade">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                Where are you in it?
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {STAGES.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseStage(option)}
                    className="pf-option rounded-lg border border-white/12 bg-navy/40 px-5 py-5 text-left transition-colors hover:border-gold/50 hover:bg-navy/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    <span className="font-serif text-lg text-white">{option.choice}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && intent && stage && (
            <div className="pf-fade" role="status">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Your route
              </p>
              <p className="mt-4 font-serif text-2xl leading-snug text-white md:text-3xl">
                {intent.headline}
              </p>
              <p className="mt-4 max-w-2xl font-sans text-[0.95rem] leading-relaxed text-white/70">
                {stage.note} {intent.body}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={href}
                  onClick={() => fire("pathfinder_cta", { intent: intent.id, stage: stage.id })}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-gold px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  {intent.ctaLabel}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("whatsapp", `pathfinder_${intent.id}`)}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-white/20 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold/60 hover:text-gold"
                >
                  <MessageSquare size={15} aria-hidden="true" />
                  Ask Carlos directly
                </a>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                No listing commitment · Carlos responds personally
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
