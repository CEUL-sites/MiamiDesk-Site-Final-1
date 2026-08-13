import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Crosshair, LineChart, Radio, SlidersHorizontal } from "lucide-react";
import { Tilt3D } from "./Tilt3D";
import {
  deckLayer,
  deckPosition,
  nextStage,
  previousStage,
  shouldAutoAdvance,
} from "./listingStageDeckModel";

/**
 * What happens after the listing goes live, as a deck a visitor moves through
 * rather than four paragraphs they scroll past.
 *
 * The four stages were previously an ordered list: four rows of 20px serif copy,
 * all on screen at once, all weighted the same. Nothing marked where a reader
 * was, so the section read as a block of text and got treated as one. Here the
 * stages are cards in a physical stack — one in front, the rest fanned behind
 * with real depth — and a rail on the left names them so the reader can see the
 * shape of the whole process before reading any of it.
 *
 * The copy is unchanged. This is a delivery change, not a message change: same
 * four stages, same four sentences, in a form that gets read.
 *
 * Every card is in the DOM at all times, so the prerendered HTML and crawlers
 * see all four stages regardless of which is in front. Cards that are not in
 * front are marked `inert` so their content cannot take focus while it sits
 * behind another card.
 */

const EXECUTION_STEPS = [
  {
    number: "01",
    label: "POSITION",
    icon: Crosshair,
    copy: "Price strategy, presentation, buyer profile, property narrative and launch timing.",
  },
  {
    number: "02",
    label: "ACTIVATE",
    icon: Radio,
    copy: "Identify and reach agents working with relevant buyers by location, property type and price range.",
  },
  {
    number: "03",
    label: "REPORT",
    icon: LineChart,
    copy: "Provide structured updates on showing activity, online engagement, buyer-agent response and competing inventory.",
  },
  {
    number: "04",
    label: "ADJUST",
    icon: SlidersHorizontal,
    copy: "Recommend changes from market evidence, property response and competitive movement—not guesswork.",
  },
] as const;

const ADVANCE_MS = 6200;

export function SellerExecutionSystem() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = EXECUTION_STEPS.length;

  useEffect(() => {
    if (typeof window.matchMedia === "function") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldAutoAdvance({ inView, engaged, reducedMotion })) return;
    const t = window.setInterval(() => setActive((a) => nextStage(a, total)), ADVANCE_MS);
    return () => window.clearInterval(t);
  }, [inView, engaged, reducedMotion, total]);

  // Any deliberate pick hands control over for good — an auto-advance that
  // resumes and moves the card out from under a reader is worse than none.
  const pick = (i: number) => {
    setEngaged(true);
    setActive(i);
  };

  const onRailKeyDown = (e: KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = nextStage(active, total);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = previousStage(active, total);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    railRefs.current[next]?.focus();
  };

  return (
    <section className="bg-white-soft py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">
            Listing execution
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-5xl">
            What Carlos Does After the Listing Goes Live
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/70">
            Distribution creates the opportunity. Execution determines how the market sees, tests and responds to the property.
          </p>
        </div>

        <div
          ref={stageRef}
          className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-[290px_1fr] lg:gap-12"
          onPointerDown={() => setEngaged(true)}
        >
          {/* Stage rail — names the whole process before any one stage is read. */}
          <div
            role="tablist"
            aria-label="Listing execution stages"
            aria-orientation="vertical"
            onKeyDown={onRailKeyDown}
            className="scrollbar-hide -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {EXECUTION_STEPS.map((step, i) => {
              const on = i === active;
              return (
                <button
                  key={step.label}
                  ref={(el) => { railRefs.current[i] = el; }}
                  role="tab"
                  id={`exec-tab-${step.label}`}
                  aria-selected={on}
                  aria-controls={`exec-panel-${step.label}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(i)}
                  className={`group relative flex shrink-0 items-center gap-3 whitespace-nowrap border-navy/12 px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 lg:w-full lg:border-b lg:px-0 lg:py-5 ${
                    on ? "text-navy-deep" : "text-navy/45 hover:text-navy/75"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`font-serif text-2xl tabular-nums transition-colors ${on ? "text-gold" : "text-navy/25"}`}
                  >
                    {step.number}
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em]">
                    {step.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-4 right-4 h-[2px] overflow-hidden bg-navy/10 lg:left-0 lg:right-0"
                    style={{ opacity: on ? 1 : 0 }}
                  >
                    <span
                      key={`${active}-${engaged}`}
                      className={on && !engaged && !reducedMotion && inView ? "exec-progress" : ""}
                      style={{
                        display: "block",
                        height: "100%",
                        background: "#B08D57",
                        transformOrigin: "left",
                        transform: on && (engaged || reducedMotion || !inView) ? "scaleX(1)" : undefined,
                      }}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* The deck. Cards share one grid cell so the stack sizes itself to the
              tallest card — no fixed height to fall out of sync with the copy. */}
          <Tilt3D maxTilt={3} className="pt-4">
            <div className="grid" style={{ perspective: "1200px" }}>
              {EXECUTION_STEPS.map((step, i) => {
                const d = deckPosition(i, active, total);
                const { lift, scale, opacity, z } = deckLayer(d);
                const front = d === 0;
                return (
                  <div
                    key={step.label}
                    role="tabpanel"
                    id={`exec-panel-${step.label}`}
                    aria-labelledby={`exec-tab-${step.label}`}
                    aria-hidden={!front}
                    {...(front ? {} : { inert: true })}
                    className="exec-card"
                    style={{
                      gridArea: "1 / 1",
                      zIndex: z,
                      opacity,
                      transform: `translate3d(0, ${lift}px, ${-d * 46}px) scale(${scale})`,
                      pointerEvents: front ? "auto" : "none",
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-xl border border-white/10 px-7 py-8 md:px-10 md:py-11"
                      style={{
                        background:
                          "linear-gradient(150deg, #12294E 0%, #0B1E3F 52%, #081733 100%)",
                        boxShadow: front
                          ? "0 26px 60px -18px rgba(11,30,63,0.45)"
                          : "0 12px 30px -14px rgba(11,30,63,0.35)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(176,141,87,0.16), transparent 70%)" }}
                      />

                      <div className="relative flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
                          <step.icon size={16} className="text-gold" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">
                          Stage {step.number} of {String(total).padStart(2, "0")} · {step.label}
                        </span>
                      </div>

                      <p className="relative mt-6 max-w-2xl font-serif text-xl leading-relaxed text-white/90 md:text-[1.7rem] md:leading-[1.45]">
                        {step.copy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tilt3D>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/45">
          Select a stage to read it
        </p>
      </div>

      <style>{`
        .exec-card {
          transition: transform 0.62s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.62s cubic-bezier(0.22,1,0.36,1);
          will-change: transform, opacity;
        }
        @keyframes exec-progress-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .exec-progress { animation: exec-progress-fill ${ADVANCE_MS}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) {
          .exec-card { transition: none; }
          .exec-progress { animation: none; transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
