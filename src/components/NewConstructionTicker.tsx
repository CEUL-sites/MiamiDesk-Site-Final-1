import { Fragment, useRef } from "react";

interface Development {
  name: string;
  developer: string;
  city: string;
  neighborhood: string;
  startingPrice: number;
  units: number;
  type: string;
  tags: string[];
  accent: string; // CSS hex for the card's top color band
}

function formatPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

// Curated South Florida pre-construction pipeline — major branded and
// institutional developments currently in pre-sale or early delivery.
const DEVELOPMENTS: Development[] = [
  {
    name: "Waldorf Astoria Residences",
    developer: "TOLD Development",
    city: "Miami",
    neighborhood: "Brickell",
    startingPrice: 900_000,
    units: 360,
    type: "Supertall · 100 Floors",
    tags: ["Branded", "City Views", "Sky Amenities"],
    accent: "#B08D57",
  },
  {
    name: "Bentley Residences",
    developer: "Dezer Development",
    city: "Sunny Isles Beach",
    neighborhood: "Oceanfront",
    startingPrice: 4_900_000,
    units: 216,
    type: "Oceanfront Tower",
    tags: ["Car Lifts", "Branded", "Oceanfront"],
    accent: "#1C3F5E",
  },
  {
    name: "Cipriani Residences Miami",
    developer: "Mast Capital",
    city: "Miami",
    neighborhood: "Brickell",
    startingPrice: 1_200_000,
    units: 397,
    type: "Luxury Tower",
    tags: ["Italian Brand", "Sky Club", "Full Service"],
    accent: "#7C4B2A",
  },
  {
    name: "St. Regis Residences",
    developer: "Related Group",
    city: "Miami",
    neighborhood: "Brickell",
    startingPrice: 2_000_000,
    units: 149,
    type: "Ultra-Luxury",
    tags: ["Butler Service", "Bayfront", "Branded"],
    accent: "#0B1E3F",
  },
  {
    name: "Aria Reserve",
    developer: "Melo Group",
    city: "Miami",
    neighborhood: "Edgewater",
    startingPrice: 700_000,
    units: 1_018,
    type: "Twin Tower",
    tags: ["Waterfront", "1,018 Residences", "Edgewater"],
    accent: "#1A4A3A",
  },
  {
    name: "Aston Martin Residences",
    developer: "G&G Business Developments",
    city: "Miami",
    neighborhood: "Downtown",
    startingPrice: 900_000,
    units: 391,
    type: "Supertall · 66 Floors",
    tags: ["Branded", "Marina Access", "Downtown"],
    accent: "#3D2B0A",
  },
  {
    name: "Edition Residences Miami",
    developer: "Related Group",
    city: "Miami",
    neighborhood: "Edgewater",
    startingPrice: 2_200_000,
    units: 185,
    type: "Boutique Tower",
    tags: ["Hotel Brand", "Rooftop Pool", "Bayfront"],
    accent: "#162535",
  },
  {
    name: "Five Park",
    developer: "Terra",
    city: "Miami Beach",
    neighborhood: "South Beach",
    startingPrice: 2_100_000,
    units: 280,
    type: "Landmark Tower",
    tags: ["Tallest MB Tower", "Park Access", "South Beach"],
    accent: "#0E2018",
  },
  {
    name: "Shell Bay — Auberge Residences",
    developer: "Auberge Resorts Collection",
    city: "Hallandale Beach",
    neighborhood: "Shell Bay",
    startingPrice: 3_500_000,
    units: 108,
    type: "Golf & Beach Estate",
    tags: ["Private Club", "Golf Course", "Auberge Brand"],
    accent: "#1A2E10",
  },
  {
    name: "Vita at Grove Isle",
    developer: "CMC Group",
    city: "Miami",
    neighborhood: "Coconut Grove",
    startingPrice: 5_000_000,
    units: 65,
    type: "Boutique Island",
    tags: ["65 Residences Only", "Private Island", "Waterfront"],
    accent: "#0F2A1A",
  },
  {
    name: "Una Residences",
    developer: "OKO Group",
    city: "Miami",
    neighborhood: "Brickell",
    startingPrice: 1_100_000,
    units: 135,
    type: "Luxury Waterfront",
    tags: ["Private Pools", "45 Floors", "Brickell"],
    accent: "#18183A",
  },
  {
    name: "Nexo Residences",
    developer: "Fortune International Group",
    city: "North Miami Beach",
    neighborhood: "Golden Shores",
    startingPrice: 590_000,
    units: 254,
    type: "Beachfront Tower",
    tags: ["Short-Term OK", "Direct Beach", "Flexible Use"],
    accent: "#0A2230",
  },
  {
    name: "Selene Oceanfront Residences",
    developer: "Fort Partners",
    city: "Fort Lauderdale",
    neighborhood: "A1A Oceanfront",
    startingPrice: 2_500_000,
    units: 30,
    type: "Boutique Oceanfront",
    tags: ["Only 30 Homes", "Oceanfront", "Fort Lauderdale"],
    accent: "#102038",
  },
  {
    name: "Ritz-Carlton Residences",
    developer: "Saad Group",
    city: "Palm Beach Gardens",
    neighborhood: "Palm Beach County",
    startingPrice: 1_200_000,
    units: 128,
    type: "Branded Golf Club",
    tags: ["Golf Access", "Branded", "Palm Beach County"],
    accent: "#2A1208",
  },
  {
    name: "Casa Bella Residences",
    developer: "Belle Investments",
    city: "Miami",
    neighborhood: "Arts & Entertainment",
    startingPrice: 800_000,
    units: 312,
    type: "Italian-Branded Tower",
    tags: ["Roberto Cavalli", "Designed Interiors", "Arts District"],
    accent: "#3A1A0A",
  },
];

function DevCard({ dev }: { dev: Development }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col overflow-hidden border border-white/10 bg-[#0D1E38] hover:border-gold/50 transition-colors duration-200 cursor-default"
      style={{ width: 268 }}
    >
      {/* Colour band — stands in for a photo */}
      <div
        className="relative h-[6px] w-full flex-shrink-0"
        style={{ background: dev.accent }}
      />

      <div className="flex flex-col gap-2 px-4 py-3">
        {/* Type pill + city */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-mono text-[8px] uppercase tracking-[0.18em] px-2 py-0.5 text-gold/80"
            style={{ background: "rgba(176,141,87,0.08)", border: "1px solid rgba(176,141,87,0.2)" }}
          >
            {dev.type}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-wider text-white/35 whitespace-nowrap">
            {dev.city}, FL
          </span>
        </div>

        {/* Project name */}
        <p className="font-serif text-[15px] font-normal leading-tight text-white" style={{ maxWidth: 240 }}>
          {dev.name}
        </p>

        {/* Developer */}
        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35 truncate">
          {dev.developer}
        </p>

        {/* Price + units */}
        <div className="flex items-baseline gap-3 pt-0.5">
          <span className="font-serif text-sm font-bold text-gold leading-none">
            From {formatPrice(dev.startingPrice)}
          </span>
          <span className="font-mono text-[8px] text-white/30 uppercase">
            {dev.units.toLocaleString()} res.
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {dev.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/40 border border-white/10 px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewConstructionTicker() {
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const doubled = [...DEVELOPMENTS, ...DEVELOPMENTS];

  if (reducedMotion.current) {
    return (
      <div className="w-full overflow-hidden bg-[#0A1628] border-t border-b border-white/10">
        <div
          className="flex gap-3 overflow-x-auto px-4 py-4 pb-4"
          role="region"
          aria-label="Florida pre-construction developments"
        >
          {DEVELOPMENTS.map((dev) => (
            <DevCard key={dev.name} dev={dev} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes neo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .neo-track {
          display: flex;
          width: max-content;
          animation: neo-scroll 80s linear infinite;
          will-change: transform;
          gap: 12px;
          padding: 12px 6px;
        }
        .neo-track:hover { animation-play-state: paused; }
      `}</style>

      <div
        className="w-full overflow-hidden bg-[#0A1628] border-t border-b border-white/10 select-none"
        role="region"
        aria-label="Florida pre-construction developments"
      >
        <div className="overflow-hidden">
          <div className="neo-track">
            {DEVELOPMENTS.map((dev) => (
              <Fragment key={dev.name}>
                <DevCard dev={dev} />
              </Fragment>
            ))}
            <div aria-hidden="true" className="contents">
              {doubled.slice(DEVELOPMENTS.length).map((dev, i) => (
                <Fragment key={`dup-${dev.name}-${i}`}>
                  <DevCard dev={dev} />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <p className="border-t border-white/5 px-4 py-1.5 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
          Pre-construction developments referenced for informational purposes · Prices and availability subject to change · Contact Carlos for current inventory
        </p>
      </div>
    </>
  );
}
