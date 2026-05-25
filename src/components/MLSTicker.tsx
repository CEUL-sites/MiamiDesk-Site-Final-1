import { Fragment, useEffect, useRef, useState } from "react";

const TICKER_API = "/.netlify/functions/ticker-listings";

interface Listing {
  id: string;
  address: string;
  city: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: string;
}

function formatPrice(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

function parseBridgeListing(raw: Record<string, unknown>): Listing {
  return {
    id:      String(raw["ListingId"] ?? ""),
    address: String(raw["UnparsedAddress"] ?? ""),
    city:    String(raw["City"] ?? ""),
    zip:     String(raw["PostalCode"] ?? ""),
    price:   Number(raw["ListPrice"] ?? 0),
    beds:    Number(raw["BedroomsTotal"] ?? 0),
    baths:   Number(raw["BathroomsTotalDecimal"] ?? 0),
    sqft:    Number(raw["LivingArea"] ?? 0),
    type:    String(raw["PropertyType"] ?? ""),
    status:  String(raw["StandardStatus"] ?? "Active"),
  };
}

const TICKER_LABEL = "MIAMI MLS · LIVE INVENTORY · SOUTH FLORIDA MARKET TAPE";
const HEADER_REPEATS = 6;

export function MLSTicker() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [ready, setReady] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(TICKER_API);
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        if (json?.live === true && Array.isArray(json.value) && json.value.length > 0) {
          setListings(json.value.map(parseBridgeListing));
          setReady(true);
        }
      } catch {
        // no live data — stay hidden
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (!ready) return null;

  const headerText = Array(HEADER_REPEATS).fill(TICKER_LABEL).join("   |   ");

  if (reducedMotion.current) {
    return (
      <div className="w-full bg-[#0A1628] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60 mb-3">
            {TICKER_LABEL} · <span className="text-emerald-400">● Live</span>
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            role="region"
            aria-label="Live MLS listings"
          >
            {listings.map((l) => (
              <div
                key={l.id}
                className="flex-shrink-0 border border-white/10 bg-[#111F38] px-3 py-2"
                style={{ minWidth: 220 }}
              >
                <div className="font-serif text-sm font-bold text-gold">{formatPrice(l.price)}</div>
                <div className="font-sans text-[11px] text-white/70 truncate">{l.address}</div>
                <div className="font-mono text-[9px] text-white/35 uppercase">{l.city}, FL</div>
                <div className="font-mono text-[9px] text-white/35">
                  {l.beds}bd · {l.baths}ba{l.sqft > 0 ? ` · ${l.sqft.toLocaleString()} sf` : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const doubled = [...listings, ...listings];

  return (
    <>
      <style>{`
        @keyframes mls-header-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mls-row-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .mls-header-track {
          display: flex;
          width: max-content;
          animation: mls-header-scroll 40s linear infinite;
          will-change: transform;
        }
        .mls-row-track {
          display: flex;
          width: max-content;
          animation: mls-row-scroll 100s linear infinite;
          will-change: transform;
        }
        .mls-row-track:hover { animation-play-state: paused; }
      `}</style>

      <div
        className="w-full overflow-hidden bg-[#0A1628] select-none"
        role="region"
        aria-label="Live MLS market tape"
      >
        {/* Header band */}
        <div className="relative overflow-hidden border-b border-white/10 bg-[#0A1628] py-2">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 z-10 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 bg-emerald-500/15 text-emerald-400">
            ● Live
          </span>
          <div className="overflow-hidden">
            <div className="mls-header-track" aria-hidden="true">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 whitespace-nowrap px-8"
                >
                  {headerText}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Property row */}
        <div className="overflow-hidden bg-[#0D1E38] py-3">
          <div className="mls-row-track gap-4 px-2">
            {/* First set — readable by screen readers */}
            {listings.map((l) => (
              <Fragment key={l.id}><ListingCard l={l} /></Fragment>
            ))}
            {/* Duplicate for seamless CSS loop — hidden from assistive tech */}
            <div aria-hidden="true" className="contents">
              {doubled.slice(listings.length).map((l, idx) => (
                <Fragment key={`dup-${l.id}-${idx}`}><ListingCard l={l} /></Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ListingCard({ l }: { l: Listing }) {
  return (
    <div
      className="flex-shrink-0 flex items-stretch border border-white/10 bg-[#111F38] hover:border-gold/60 transition-colors duration-200"
      style={{ minWidth: 240 }}
    >
      <div
        className="w-1 flex-shrink-0"
        style={{ background: l.status === "Pending" ? "#f59e0b" : "#10b981" }}
      />
      <div className="flex flex-col gap-1 px-3 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-serif text-base font-bold text-gold leading-none">
            {formatPrice(l.price)}
          </span>
          <span
            className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5"
            style={{
              background: l.status === "Pending" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
              color:      l.status === "Pending" ? "#f59e0b" : "#10b981",
            }}
          >
            {l.status}
          </span>
        </div>
        <p className="font-sans text-[11px] font-medium text-white leading-tight truncate" style={{ maxWidth: 210 }}>
          {l.address}
        </p>
        <p className="font-mono text-[9px] text-white/45 uppercase tracking-wider">
          {l.city}, FL {l.zip}
        </p>
        <div className="flex items-center gap-3 pt-0.5">
          <Stat label="bd" value={l.beds} />
          <Stat label="ba" value={l.baths % 1 === 0 ? l.baths : l.baths.toFixed(1)} />
          {l.sqft > 0 && <Stat label="sf" value={l.sqft.toLocaleString()} />}
          <span className="font-mono text-[8px] text-white/30 truncate">
            {l.type.replace("Single Family Residence", "SFR")}
          </span>
        </div>
        <p className="font-mono text-[8px] text-white/20">MLS# {l.id}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="font-sans text-[11px] font-semibold text-white/80">{value}</span>
      <span className="font-mono text-[8px] uppercase text-white/35">{label}</span>
    </span>
  );
}
