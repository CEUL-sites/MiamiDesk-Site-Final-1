import { useState, type KeyboardEvent } from "react";
import { Building2, FileText, Handshake, Users } from "lucide-react";
import { Tilt3D } from "./Tilt3D";

/**
 * The Global Desk's argument as a route a visitor can drive, instead of a page
 * about Spain.
 *
 * The page used to answer one question — "what if my property is in Spain?" —
 * in its headline, its photography and most of its copy. Owners in São Paulo,
 * Lisbon or Dubai read the same offer and correctly concluded it was not
 * addressed to them. Here the origin is a variable: pick a market, and the same
 * four-stage route reads back with that market in the first position.
 *
 * What the module deliberately does NOT do is describe those markets. Carlos
 * has a genuine Spain line; he does not have a Gulf desk, and inventing
 * market-specific detail would be the sort of unverifiable claim rule 4 exists
 * to stop. So each origin contributes its name and nothing else — the route is
 * identical from anywhere, which is precisely the repositioning. "Another
 * market" is a first-class option for the same reason: it makes the
 * origin-agnostic promise literal rather than implied.
 *
 * The stage copy is passed in from the page's own bilingual dictionary rather
 * than duplicated here, so the EN/ES toggle keeps working and there is one
 * place to review this copy for compliance.
 */

export interface OriginsFlowCopy {
  eyebrow: string;
  title: string;
  lead: string;
  originsLabel: string;
  origins: readonly string[];
  /** Four [label, body] stages, origin-independent. */
  stages: readonly (readonly [string, string])[];
  /** Shown under the route — the eligibility qualifier. */
  note: string;
  /** Accessible name for the origin picker. */
  pickerLabel: string;
}

const STAGE_ICONS = [Building2, FileText, Users, Handshake];

export function GlobalOriginsFlow({ copy }: { copy: OriginsFlowCopy }) {
  const [origin, setOrigin] = useState(0);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = copy.origins.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = origin === last ? 0 : origin + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = origin === 0 ? last : origin - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setOrigin(next);
  };

  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-navy-deep px-6 py-16 text-white md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(176,141,87,0.10), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{copy.eyebrow}</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-white md:text-4xl">{copy.title}</h2>
          <p className="mt-5 font-sans text-base leading-[1.85] text-white/70 md:text-lg">{copy.lead}</p>
        </div>

        <div className="mt-10 md:mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            {copy.originsLabel}
          </p>
          <div
            role="tablist"
            aria-label={copy.pickerLabel}
            onKeyDown={onKeyDown}
            className="mt-4 flex flex-wrap gap-2.5"
          >
            {copy.origins.map((name, i) => {
              const on = i === origin;
              return (
                <button
                  key={name}
                  role="tab"
                  id={`origin-tab-${i}`}
                  aria-selected={on}
                  aria-controls="origin-route"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setOrigin(i)}
                  className={`origin-chip rounded-full border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${
                    on
                      ? "border-gold/60 bg-gold/15 text-gold"
                      : "border-white/15 text-white/55 hover:border-white/35 hover:text-white/80"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* The route. Stage one takes the selected origin's name; the rest are
            identical from anywhere, which is the whole point. */}
        <Tilt3D maxTilt={2} className="mt-9">
          <div
            id="origin-route"
            role="tabpanel"
            aria-labelledby={`origin-tab-${origin}`}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {copy.stages.map(([label, body], i) => {
              const Icon = STAGE_ICONS[i] ?? Building2;
              const first = i === 0;
              return (
                <div
                  key={label}
                  className="origin-stage relative rounded-xl border p-6"
                  style={{
                    borderColor: first ? "rgba(176,141,87,0.45)" : "rgba(255,255,255,0.12)",
                    background: first
                      ? "linear-gradient(155deg, rgba(176,141,87,0.14), rgba(11,30,63,0.55))"
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
                      <Icon size={14} className="text-gold" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-4 font-serif text-lg leading-snug text-white">
                    {first ? `${label} — ${copy.origins[origin]}` : label}
                  </p>
                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/65">{body}</p>

                  {i < copy.stages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-3 bg-gradient-to-r from-gold/40 to-transparent lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </Tilt3D>

        <p className="mt-7 max-w-3xl font-sans text-[12px] leading-relaxed text-white/50">{copy.note}</p>
      </div>

      <style>{`
        .origin-chip, .origin-stage { transition: transform .35s cubic-bezier(.22,1,.36,1), border-color .35s ease, background-color .35s ease; }
        @media (hover: hover) and (pointer: fine) {
          .origin-chip:hover { transform: translateY(-2px); }
          .origin-stage:hover { transform: translateY(-3px); border-color: rgba(176,141,87,0.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .origin-chip, .origin-stage { transition: none; }
          .origin-chip:hover, .origin-stage:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
