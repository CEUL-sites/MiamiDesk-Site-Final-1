import { useEffect, useRef, useState } from "react";
import { Home, Users, Globe2, Languages } from "lucide-react";
import { ASSOCIATION_STATS } from "../constants";

/**
 * The distribution story as a staged flow instead of three paragraphs.
 *
 * "Your listing reaches 93,000 agents, who carry it to 200+ portals in 19
 * languages, reaching buyers across 75+ countries" was body copy nobody
 * finished reading. Here each hop is a card, a pulse travels the connecting
 * rail on a loop, and the visitor sees the propagation in about a second.
 *
 * Layout is ordinary flex/grid — no absolute 3D positioning to drift out of
 * alignment. Depth comes from a lift-and-tilt on hover, which is decoration:
 * every figure and label is plain DOM text, so crawlers, screen readers, and
 * reduced-motion visitors lose nothing.
 *
 * Figures come from ASSOCIATION_STATS (the verified set) so this can never
 * drift from the numbers cited elsewhere on the site.
 */

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
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  // Only run the travelling pulse while the figure is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setLive(true); return; }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`mx-auto w-full max-w-4xl ${className}`}>
      <style>{`
        @keyframes rf-travel-x {
          0%   { left: 0; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes rf-travel-y {
          0%   { top: 0; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
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
        .rf-dot-x { animation: rf-travel-x 3.6s linear infinite; }
        .rf-dot-y { animation: rf-travel-y 3.6s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rf-card { animation: none; }
          .rf-dot-x, .rf-dot-y { animation: none; opacity: 0.5; }
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

            {/* Connector rail with a travelling pulse — horizontal on desktop,
                vertical once the row stacks. */}
            {i < STAGES.length - 1 && (
              <div aria-hidden="true" className="relative mx-auto my-1 h-7 w-px sm:my-0 sm:h-px sm:w-10">
                <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/40 to-gold/10 sm:bg-gradient-to-r" />
                {live && (
                  <>
                    <span
                      className="rf-dot-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_8px_rgba(176,141,87,0.9)] sm:hidden"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                    <span
                      className="rf-dot-x absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_8px_rgba(176,141,87,0.9)] sm:block"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
