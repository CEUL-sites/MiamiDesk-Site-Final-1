import { Home, Users, Globe2, Languages } from "lucide-react";
import { ASSOCIATION_STATS } from "../constants";

/**
 * The distribution story as a staged flow instead of three paragraphs.
 *
 * "Your listing reaches 93,000 agents, who carry it to 200+ portals in 19
 * languages, reaching buyers across 75+ countries" was body copy nobody
 * finished reading. Here each hop is a card in a connected chain, so the shape
 * of the path is legible before any of it is read.
 *
 * Layout is ordinary flex/grid — no absolute 3D positioning to drift out of
 * alignment. Depth comes from a lift-and-tilt on hover, which is decoration:
 * every figure and label is plain DOM text, so crawlers, screen readers, and
 * reduced-motion visitors lose nothing.
 *
 * Figures come from ASSOCIATION_STATS (the verified set) so this can never
 * drift from the numbers cited elsewhere on the site, and the component prints
 * their sources itself. It must stay self-sufficient that way: it renders
 * figures — 75+ countries among them — that no surrounding section necessarily
 * cites, and rule 9 requires a source next to a statistic as displayed. Do not
 * move this line out to the host section.
 */

/** Sources for every figure this component displays, per figures.json. */
const FIGURE_SOURCES =
  "Sources: Miami and South Florida REALTORS®; MIAMI International Referral Network — Partner Associations sheet; MIAMI Association of REALTORS® Global Council.";

const STAGES = [
  {
    icon: Home,
    value: "Your listing",
    label: "MLS-activated",
    origin: true,
  },
  {
    icon: Users,
    value: ASSOCIATION_STATS.memberCount.toLocaleString("en-US"),
    // "Association members", not "member agents" — the same distinction the
    // homepage conversion contract enforces on Hero, Distribution and Footer.
    label: "Association members",
  },
  {
    icon: Globe2,
    value: `${ASSOCIATION_STATS.globalWebsites}+`,
    label: `Global portals · ${ASSOCIATION_STATS.languages} languages`,
  },
  {
    icon: Languages,
    value: `${ASSOCIATION_STATS.countries}+`,
    label: `Countries · ${ASSOCIATION_STATS.internationalAgreements}+ agreements`,
  },
];

export function ReachFlow3D({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-4xl ${className}`}>
      <style>{`
        @keyframes rf-rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        .rf-card { animation: rf-rise 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .rf-card-inner {
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s ease, box-shadow 0.45s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .rf-card:hover .rf-card-inner {
            transform: perspective(700px) rotateX(6deg) translateY(-5px);
            border-color: rgba(176,141,87,0.55);
            box-shadow: 0 16px 40px rgba(0,0,0,0.32);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-card { animation: none; }
          .rf-card-inner { transition: none; }
        }
      `}</style>

      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
        {STAGES.map((s, i) => (
          <div key={s.value} className="contents">
            <div className="rf-card" style={{ animationDelay: `${i * 0.11}s` }}>
              <div
                className="rf-card-inner flex flex-col items-center gap-2 rounded-lg border px-4 py-5 text-center"
                style={{
                  borderColor: s.origin ? "rgba(176,141,87,0.5)" : "rgba(255,255,255,0.12)",
                  background: s.origin
                    ? "linear-gradient(160deg, rgba(176,141,87,0.16), rgba(11,30,63,0.5))"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                <s.icon
                  size={18}
                  aria-hidden="true"
                  className={s.origin ? "text-gold" : "text-gold/60"}
                />
                <div
                  className={`font-serif leading-none ${s.origin ? "text-white" : "text-gold"}`}
                  style={{ fontSize: s.origin ? "clamp(0.95rem,2.4vw,1.1rem)" : "clamp(1.35rem,3.4vw,1.9rem)" }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[9px] uppercase leading-snug tracking-[0.14em] text-white/65">
                  {s.label}
                </div>
              </div>
            </div>

            {/* A static connector — horizontal on desktop, vertical once the row
                stacks. This rail deliberately carries no travelling pulse.
                A dot repeatedly moving from "Your listing" into a card labelled
                "93,000" is the visual grammar of a notification being delivered,
                which is exactly the framing rule 3 prohibits — and a signal
                arriving at every stage on a loop also implies the universal
                reach the eligibility terms below explicitly disclaim. A static
                chain still says "these are stages of one path", which is the
                only thing this figure needs to say. Do not re-add motion that
                travels between cards. */}
            {i < STAGES.length - 1 && (
              <div aria-hidden="true" className="relative mx-auto my-1 h-7 w-px sm:my-0 sm:h-px sm:w-10">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10 sm:bg-gradient-to-r" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-gold/60">
        {FIGURE_SOURCES}
      </p>
    </div>
  );
}
