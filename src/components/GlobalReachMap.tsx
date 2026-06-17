// Miami-as-hub arc map — Visual 2 "make the argument".
// Equirectangular projection, 800×380 viewBox.
// Continent outlines at 0.06 opacity give geographic context.
// Gold arcs animate draw-in on scroll; fully static under prefers-reduced-motion.
// All verified figures: 437+ international agreements · 75+ countries.

import { useEffect, useRef, useState } from "react";

// ─── Coordinate transform ──────────────────────────────────────────────────
function geoToSvg(lon: number, lat: number): [number, number] {
  return [
    ((lon + 180) / 360) * 800,
    ((90 - lat) / 180) * 380,
  ];
}

// ─── City positions ────────────────────────────────────────────────────────
const MIAMI = geoToSvg(-80.19, 25.77); // [222, 136]

const CITIES: { label: string; lon: number; lat: number; anchor: "start" | "end" | "middle"; dy?: number }[] = [
  { label: "Mexico City",    lon: -99.13, lat: 19.43, anchor: "end",    dy: -6 },
  { label: "Caracas",        lon: -66.88, lat: 10.48, anchor: "start",  dy: -6 },
  { label: "Bogotá",         lon: -74.07, lat:  4.71, anchor: "end",    dy:  8 },
  { label: "Lima",           lon: -77.03, lat: -12.04, anchor: "end",   dy: -6 },
  { label: "Buenos Aires",   lon: -58.38, lat: -34.61, anchor: "middle", dy: 10 },
  { label: "São Paulo",      lon: -46.63, lat: -23.55, anchor: "start", dy: -6 },
  { label: "New York",       lon: -74.01, lat: 40.71, anchor: "end",    dy: -6 },
  { label: "London",         lon:  -0.13, lat: 51.51, anchor: "middle", dy: -8 },
  { label: "Madrid",         lon:  -3.70, lat: 40.42, anchor: "end",    dy:  8 },
  { label: "Zürich",         lon:   8.54, lat: 47.38, anchor: "start",  dy: -6 },
  { label: "Dubai",          lon:  55.27, lat: 25.20, anchor: "start",  dy: -6 },
];

// Quadratic Bézier arc from Miami to a destination.
// Control point lifted above the midpoint (great-circle feel).
function arcPath(destLon: number, destLat: number): string {
  const [mx, my] = MIAMI;
  const [dx, dy] = geoToSvg(destLon, destLat);
  const cpx = (mx + dx) / 2;
  const dist = Math.hypot(dx - mx, dy - my);
  // Longer arcs curve higher; minimum lift of 20px.
  const lift = Math.max(20, dist * 0.38);
  const cpy = (my + dy) / 2 - lift;
  return `M ${mx.toFixed(1)},${my.toFixed(1)} Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${dx.toFixed(1)},${dy.toFixed(1)}`;
}

// ─── Simplified continent outlines (decorative, ~0.06 opacity) ────────────
// Approximate shapes — just enough to orient the viewer. Not geographically perfect.
const CONTINENTS = [
  // North America
  `M 33,62 C 80,48 155,44 278,52 L 268,88 L 253,92 L 244,104
     L 222,136 L 207,146 L 196,160 L 213,170 L 229,174
     L 196,160 L 155,145 L 122,112 L 122,88 C 90,68 60,58 33,62 Z`,
  // South America
  `M 229,174 C 248,176 276,182 296,204 C 322,228 312,262 278,274
     C 252,284 222,268 215,248 C 206,224 214,198 229,174 Z`,
  // Europe
  `M 378,110 C 392,96 418,84 446,92 C 462,100 460,122 440,132
     C 418,140 395,128 385,116 Z`,
  // Africa (northern visible portion)
  `M 388,118 C 430,116 478,132 505,172 C 516,196 495,238 455,250
     C 422,260 398,238 395,210 C 392,182 390,148 388,118 Z`,
];

// ─── Latitude grid lines (subtle context) ────────────────────────────────
const LATITUDES = [60, 40, 20, 0, -20, -40]; // degrees

// ─── Component ────────────────────────────────────────────────────────────
export function GlobalReachMap() {
  const containerRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setActive(true); io.disconnect(); } },
      { rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="mt-14 border-t border-white/[0.07] pt-10">
      {/* Section label */}
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/70">
          Principal International Markets
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
          437+ Agreements · 75+ Countries
        </p>
      </div>

      {/* SVG map */}
      <svg
        ref={containerRef}
        viewBox="0 0 800 380"
        className="w-full"
        aria-label="Miami as hub with arcs to principal international markets"
        role="img"
        style={{ maxHeight: 380 }}
      >
        {/* Latitude grid hairlines */}
        {LATITUDES.map((lat) => {
          const [, y] = geoToSvg(0, lat);
          return (
            <line
              key={lat}
              x1="0" y1={y.toFixed(1)}
              x2="800" y2={y.toFixed(1)}
              stroke="#B08D57"
              strokeWidth="0.4"
              opacity="0.12"
            />
          );
        })}

        {/* Continent outlines */}
        {CONTINENTS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="rgba(176,141,87,0.04)"
            stroke="#B08D57"
            strokeWidth="0.6"
            opacity="0.3"
          />
        ))}

        {/* Arcs — one per destination, staggered animation */}
        {CITIES.map(({ label, lon, lat }, i) => (
          <path
            key={label}
            d={arcPath(lon, lat)}
            fill="none"
            stroke="#C9A870"
            strokeWidth="0.9"
            opacity="0.75"
            pathLength="1000"
            strokeDasharray="1000"
            strokeDashoffset={active && !prefersReduced ? undefined : 1000}
            style={
              active && !prefersReduced
                ? {
                    strokeDashoffset: 0,
                    transition: `stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
                  }
                : active
                ? { strokeDashoffset: 0 }
                : {}
            }
          />
        ))}

        {/* Destination city dots + labels */}
        {CITIES.map(({ label, lon, lat, anchor, dy = 0 }) => {
          const [cx, cy] = geoToSvg(lon, lat);
          return (
            <g key={label}>
              <circle cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="2.5" fill="#C9A870" opacity="0.9" />
              <text
                x={cx.toFixed(1)}
                y={(cy + dy).toFixed(1)}
                textAnchor={anchor}
                fill="#C9A870"
                opacity="0.65"
                fontSize="7"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.08em"
                style={{ textTransform: "uppercase" }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Miami origin — slightly larger dot with outer ring */}
        <circle
          cx={MIAMI[0].toFixed(1)}
          cy={MIAMI[1].toFixed(1)}
          r="5"
          fill="none"
          stroke="#C9A870"
          strokeWidth="0.7"
          opacity="0.4"
        />
        <circle
          cx={MIAMI[0].toFixed(1)}
          cy={MIAMI[1].toFixed(1)}
          r="3"
          fill="#C9A870"
          opacity="1"
        />
        <text
          x={(MIAMI[0] + 8).toFixed(1)}
          y={(MIAMI[1] - 7).toFixed(1)}
          fill="#C9A870"
          opacity="0.9"
          fontSize="8"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
          letterSpacing="0.1em"
          style={{ textTransform: "uppercase" }}
        >
          Miami
        </text>
        <text
          x={(MIAMI[0] + 8).toFixed(1)}
          y={(MIAMI[1] + 2).toFixed(1)}
          fill="#C9A870"
          opacity="0.45"
          fontSize="6"
          fontFamily="'JetBrains Mono', monospace"
          letterSpacing="0.08em"
          style={{ textTransform: "uppercase" }}
        >
          Origin
        </text>
      </svg>

      <p className="mt-4 font-mono text-[7.5px] uppercase tracking-[0.16em] text-white/25">
        Miami and South Florida REALTORS® · 437+ signed international agreements · 75+ countries
      </p>
    </div>
  );
}
