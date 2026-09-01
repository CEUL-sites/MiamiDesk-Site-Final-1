import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileSearch,
  Gavel,
  KeyRound,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { scalePoint } from "d3-scale";
import { curveCatmullRom, line } from "d3-shape";

interface BuyerStage {
  number: string;
  verb: string;
  title: string;
  summary: string;
  deliverable: string;
  protection: string;
  icon: LucideIcon;
}

const BUYER_STAGES: BuyerStage[] = [
  {
    number: "01",
    verb: "Define",
    title: "Acquisition brief",
    summary:
      "Budget, intended use, location, property type, timing, financing, and non-negotiables become one written search mandate.",
    deliverable: "A decision-ready brief that governs every property reviewed.",
    protection: "Prevents wasted showings, budget drift, and a search built around portal alerts.",
    icon: ClipboardList,
  },
  {
    number: "02",
    verb: "Source",
    title: "Professional search",
    summary:
      "Eligible inventory is reviewed across Miami-Dade, Broward, and Palm Beach through the applicable MLS and brokerage framework.",
    deliverable: "A qualified shortlist with fit, tradeoffs, and next-action priorities.",
    protection: "Separates relevant opportunities from inventory that merely matches filters.",
    icon: Search,
  },
  {
    number: "03",
    verb: "Underwrite",
    title: "Property intelligence",
    summary:
      "Comparable sales, pricing history, competition, HOA health, insurance context, and property-specific constraints are reviewed before commitment.",
    deliverable: "A property decision memo: pursue, reprice, investigate, or pass.",
    protection: "Keeps the asking price and listing narrative from becoming the buyer's analysis.",
    icon: FileSearch,
  },
  {
    number: "04",
    verb: "Structure",
    title: "Offer & negotiation",
    summary:
      "Price, deposit, contingencies, inspection, financing, appraisal, timing, and seller priorities are structured as one negotiating position.",
    deliverable: "An offer designed around both acceptance probability and buyer protection.",
    protection: "Avoids winning the property by conceding the terms that matter most.",
    icon: Gavel,
  },
  {
    number: "05",
    verb: "Verify",
    title: "Due diligence",
    summary:
      "Inspection, association records, insurance, lender, title, escrow, and specialist questions are coordinated within the contract timeline.",
    deliverable: "A documented go-forward decision before critical deadlines expire.",
    protection: "Surfaces condition, cost, financing, and ownership issues while remedies remain available.",
    icon: ShieldCheck,
  },
  {
    number: "06",
    verb: "Close",
    title: "Closing & possession",
    summary:
      "Final walkthrough, closing coordination, funds, documents, keys, and possession are tracked through completion.",
    deliverable: "A controlled handoff from contract to ownership.",
    protection: "Keeps last-mile details from becoming closing-day surprises.",
    icon: KeyRound,
  },
];

const ROUTE_HEIGHT = 190;
const ROUTE_Y = [76, 48, 88, 52, 84, 48];

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(960);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const update = () => setWidth(Math.round(node.getBoundingClientRect().width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

export function FloridaBuyerJourney() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const { ref: routeRef, width } = useContainerWidth();

  const points = useMemo(() => {
    const x = scalePoint<number>()
      .domain(BUYER_STAGES.map((_, index) => index))
      .range([64, Math.max(64, width - 64)])
      .padding(0.18);

    return BUYER_STAGES.map((_, index) => [x(index) ?? 64, ROUTE_Y[index]] as [number, number]);
  }, [width]);

  const route = useMemo(
    () => line<[number, number]>().x((point) => point[0]).y((point) => point[1]).curve(curveCatmullRom.alpha(0.55)),
    [],
  );

  const fullPath = route(points) ?? "";
  const completedPath = route(points.slice(0, active + 1)) ?? "";

  const choose = (index: number) => setActive(index);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % BUYER_STAGES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active - 1 + BUYER_STAGES.length) % BUYER_STAGES.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = BUYER_STAGES.length - 1;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    buttons.current[next]?.focus();
  };

  return (
    <section className="relative overflow-hidden bg-bone-warm py-16 md:py-24" aria-labelledby="florida-buyer-service-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Service One · Buying in Florida</p>
            <h2 id="florida-buyer-service-heading" className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-5xl">
              A six-stage acquisition mandate—<br className="hidden sm:block" />
              <span className="font-light italic text-gold-ink">from brief to keys.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/65">
              Carlos remains the accountable buyer representative throughout the search, analysis, offer, due diligence, and closing—supported by United Realty Group's Florida brokerage framework.
            </p>
          </div>
          <div className="border-l-2 border-gold/60 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">The operating standard</p>
            <p className="mt-2 font-serif text-xl leading-snug text-navy-deep">
              Every stage ends with a decision or a documented deliverable.
            </p>
          </div>
        </div>

        <div className="mt-12 hidden lg:block" ref={routeRef}>
          <div className="relative" style={{ height: ROUTE_HEIGHT }}>
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox={`0 0 ${width} ${ROUTE_HEIGHT}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="buyer-route-gold" x1="0" x2="1">
                  <stop offset="0" stopColor="#8f6d3c" />
                  <stop offset="1" stopColor="#c9a96a" />
                </linearGradient>
              </defs>
              <path
                d={fullPath}
                fill="none"
                stroke="rgba(11,30,63,0.15)"
                strokeWidth="1"
                strokeDasharray="4 7"
                vectorEffect="non-scaling-stroke"
              />
              {active > 0 ? (
                <path
                  d={completedPath}
                  fill="none"
                  stroke="url(#buyer-route-gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="buyer-route-progress"
                />
              ) : null}
            </svg>

            <div role="tablist" aria-label="Florida buyer service stages" onKeyDown={onKeyDown}>
              {BUYER_STAGES.map((stage, index) => {
                const selected = index === active;
                const [left, top] = points[index];
                return (
                  <button
                    key={stage.number}
                    ref={(node) => { buttons.current[index] = node; }}
                    type="button"
                    role="tab"
                    id={`buyer-stage-tab-${stage.number}`}
                    aria-selected={selected}
                    aria-controls={`buyer-stage-panel-${stage.number}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => choose(index)}
                    className="group absolute w-[150px] -translate-x-1/2 text-center focus-visible:outline-none"
                    style={{ left, top: top - 21 }}
                  >
                    <span
                      className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border font-serif text-sm tabular-nums transition-[background-color,border-color,color,transform,box-shadow] duration-300 motion-reduce:transition-none ${
                        selected
                          ? "scale-110 border-gold bg-navy-deep text-gold shadow-lg shadow-navy/20"
                          : index < active
                            ? "border-gold/60 bg-gold text-navy-deep"
                            : "border-navy/20 bg-white text-navy/55 group-hover:border-gold/60 group-hover:text-navy-deep"
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span className={`mt-3 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${selected ? "text-gold-ink" : "text-navy/55"}`}>
                      {stage.verb}
                    </span>
                    <span className={`mt-1 block font-serif text-[15px] leading-tight ${selected ? "text-navy-deep" : "text-navy/60"}`}>
                      {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 lg:hidden" role="tablist" aria-label="Florida buyer service stages" onKeyDown={onKeyDown}>
          {BUYER_STAGES.map((stage, index) => {
            const selected = index === active;
            return (
              <button
                key={stage.number}
                ref={(node) => { buttons.current[index] = node; }}
                type="button"
                role="tab"
                id={`buyer-mobile-stage-tab-${stage.number}`}
                aria-selected={selected}
                aria-controls={`buyer-stage-panel-${stage.number}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => choose(index)}
                className={`flex min-h-14 items-center gap-4 border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                  selected ? "border-gold/55 bg-navy-deep text-white" : "border-navy/10 bg-white text-navy-deep"
                }`}
              >
                <span className={`font-serif text-xl tabular-nums ${selected ? "text-gold" : "text-gold-ink"}`}>{stage.number}</span>
                <span>
                  <span className={`block font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${selected ? "text-gold" : "text-navy/45"}`}>{stage.verb}</span>
                  <span className="mt-0.5 block font-serif text-lg leading-none">{stage.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 md:mt-9">
          {BUYER_STAGES.map((stage, index) => {
            const selected = index === active;
            return (
              <article
                key={stage.number}
                data-sticky-cta-guard
                role="tabpanel"
                id={`buyer-stage-panel-${stage.number}`}
                aria-labelledby={`buyer-stage-tab-${stage.number} buyer-mobile-stage-tab-${stage.number}`}
                hidden={!selected}
                className="buyer-stage-panel overflow-hidden border border-navy/10 bg-white shadow-[0_24px_70px_-38px_rgba(11,30,63,0.55)]"
              >
                <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative overflow-hidden bg-navy-deep p-7 text-white md:p-10">
                    <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/10 blur-2xl" aria-hidden="true" />
                    <div className="relative flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/10">
                        <stage.icon size={18} className="text-gold" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Stage {stage.number} · {stage.verb}</span>
                    </div>
                    <h3 className="relative mt-6 font-serif text-3xl leading-tight text-white">{stage.title}</h3>
                    <p className="relative mt-4 font-sans text-[15px] leading-relaxed text-white/70">{stage.summary}</p>
                  </div>

                  <div className="grid gap-px bg-navy/10 sm:grid-cols-2">
                    <div className="bg-white p-7 md:p-9">
                      <BadgeCheck size={19} className="text-gold-ink" aria-hidden="true" />
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">What you receive</p>
                      <p className="mt-3 font-serif text-xl leading-snug text-navy-deep">{stage.deliverable}</p>
                    </div>
                    <div className="bg-white p-7 md:p-9">
                      <ShieldCheck size={19} className="text-gold-ink" aria-hidden="true" />
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">What this controls</p>
                      <p className="mt-3 font-serif text-xl leading-snug text-navy-deep">{stage.protection}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-navy/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-sans text-xs leading-relaxed text-ink-primary/55">
            Carlos coordinates the transaction as your licensed Florida buyer representative. Legal, tax, lending, inspection, insurance, title, and other specialist advice remains with the appropriately qualified professional.
          </p>
          <a
            href="#buyer-mandate"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-navy-deep px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            Define your buyer mandate
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      <style>{`
        .buyer-route-progress {
          animation: buyer-route-reveal 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .buyer-stage-panel {
          animation: buyer-stage-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes buyer-route-reveal {
          from { opacity: 0.35; }
          to { opacity: 1; }
        }
        @keyframes buyer-stage-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .buyer-route-progress,
          .buyer-stage-panel { animation: none; }
        }
      `}</style>
    </section>
  );
}
