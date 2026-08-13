import { useState, type KeyboardEvent } from "react";
import { Film, Layers, Map, Plane } from "lucide-react";
import { LazyVideo } from "./LazyVideo";
import { Tilt3D } from "./Tilt3D";

/**
 * What the property presentation actually looks like, shown instead of described.
 *
 * The pages that talked about presentation talked about it in prose — a list of
 * services a seller has to imagine. The site already ships the footage; it was
 * only ever used as low-opacity wash behind headings. Here each capability is a
 * clip a visitor can play, in a tilted frame with real depth, with the rail
 * carrying still frames rather than bullet points.
 *
 * Only the selected clip is mounted, so the section costs one video rather than
 * four. Every still is a poster already generated for that clip, so the frame is
 * never empty — before playback, on data-saver connections, and for visitors who
 * asked for reduced motion, the still is the whole experience and it still reads.
 *
 * Scope copy is deliberately conditional: media coverage varies by property and
 * syndication depends on eligibility. Nothing here promises a specific package.
 */

const REEL = [
  {
    id: "film",
    icon: Film,
    label: "Property film",
    clip: "/videos/luxury_home_walkthrough.mp4",
    copy: "A walkthrough cut to the way a buyer actually moves through the property, coordinated with the property media team.",
  },
  {
    id: "aerial",
    icon: Plane,
    label: "Aerial and setting",
    clip: "/videos/luxury_waterfront_drone.mp4",
    copy: "Aerial coverage that places the property in its setting — frontage, approach, and the streets and water around it.",
  },
  {
    id: "tour",
    icon: Layers,
    label: "3D tour",
    clip: "/videos/matterport_tour_2.mp4",
    copy: "A navigable 3D tour and floor plan, so an out-of-state or overseas buyer can walk the property before booking a showing.",
  },
  {
    id: "global",
    icon: Map,
    label: "Global presentation",
    clip: "/videos/waterfront_house_global_reach.mp4",
    copy: "The same media set travels with the listing into eligible syndication, where the property is presented to buyers searching in other languages.",
  },
] as const;

function posterFor(clip: string) {
  return clip.replace("/videos/", "/images/posters/").replace(".mp4", ".jpg");
}

export function MarketingReel3D() {
  const [active, setActive] = useState(0);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = REEL.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
  };

  const current = REEL[active];

  return (
    <section className="relative overflow-hidden bg-[#081733] py-14 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Property presentation
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">
            How the property is presented to the market.
          </h2>
        </div>

        <div className="mt-9 grid gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
          <div
            role="tablist"
            aria-label="Property presentation formats"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="scrollbar-hide -mx-6 flex gap-3 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:px-0"
          >
            {REEL.map((item, i) => {
              const on = i === active;
              return (
                <button
                  key={item.id}
                  role="tab"
                  id={`reel-tab-${item.id}`}
                  aria-selected={on}
                  aria-controls="reel-stage"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`reel-chip flex w-56 shrink-0 items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 lg:w-full ${
                    on
                      ? "border-gold/50 bg-gold/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <img
                    src={posterFor(item.clip)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={40}
                    className={`h-10 w-14 shrink-0 rounded object-cover transition-opacity ${on ? "opacity-100" : "opacity-55"}`}
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <item.icon
                        size={12}
                        aria-hidden="true"
                        className={on ? "text-gold" : "text-white/45"}
                      />
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${on ? "text-gold" : "text-white/60"}`}
                      >
                        {item.label}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <Tilt3D maxTilt={4}>
            <div
              id="reel-stage"
              role="tabpanel"
              aria-labelledby={`reel-tab-${current.id}`}
              className="overflow-hidden rounded-xl border border-white/12 bg-black/40"
            >
              <div className="relative aspect-[16/9] w-full">
                {/* Keyed so switching formats remounts the player and swaps the
                    source cleanly, rather than leaving the previous clip's
                    buffered frame behind the new poster. */}
                <div key={current.clip} className="absolute inset-0">
                  <LazyVideo src={current.clip} className="h-full w-full object-cover" />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081733]/85 via-transparent to-transparent"
                />
                <p className="absolute inset-x-0 bottom-0 max-w-2xl p-5 font-sans text-sm leading-relaxed text-white/85 md:p-7 md:text-base">
                  {current.copy}
                </p>
              </div>
            </div>
          </Tilt3D>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/45">
          Media scope varies by property and is agreed before launch · Syndication subject to eligibility, MLS rules and platform participation
        </p>
      </div>

      <style>{`
        .reel-chip { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease, background-color 0.35s ease; }
        @media (hover: hover) and (pointer: fine) {
          .reel-chip:hover { transform: translateX(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reel-chip { transition: none; }
          .reel-chip:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
