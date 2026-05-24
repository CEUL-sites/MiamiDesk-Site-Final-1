import { useEffect, useState } from "react";

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

function parseListing(raw: Record<string, unknown>): Listing {
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

const TICKER_LABEL = "MIAMI MLS · LIVE LISTINGS · 93,000+ REALTORS®";
const HEADER_REPEATS = 6;

export function MLSTicker() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/.netlify/functions/ticker-listings");
        if (!res.ok) return;
        const json = await res.json();
        if (json?.error) return;
        const value: Record<string, unknown>[] = json?.value ?? [];
        if (cancelled || value.length === 0) return;
        setListings(value.map(parseListing));
        setReady(true);
      } catch {
        // no live data — ticker stays hidden
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Hide entirely when no live data
  if (!ready) return null;

  const doubled = [...listings, ...listings];
  const headerText = Array(HEADER_REPEATS).fill(TICKER_LABEL).join("   |   ");

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

      <div className="w-full overflow-hidden bg-[#0A1628] select-none pt-[100px]">

        <div className="relative overflow-hidden border-b border-white/10 bg-[#0A1628] py-2">
          <div className="overflow-hidden">
            <div className="mls-header-track">
              {[0, 1].map((i) => (
                <span key={i} className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/80 whitespace-nowrap px-8">
                  {headerText}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden bg-[#0D1E38] py-3">
          <div className="mls-row-track gap-4 px-2">
            {doubled.map((l, idx) => (
              <div
                key={`${l.id}-${idx}`}
                className="flex-shrink-0 flex items-stretch gap-0 border border-white/10 bg-[#111F38] hover:border-gold/60 transition-colors duration-200"
                style={{ minWidth: 240 }}
              >
                <div className="w-1 flex-shrink-0" style={{ background: l.status === "Pending" ? "#f59e0b" : "#10b981" }} />
                <div className="flex flex-col gap-1 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-base font-bold text-gold leading-none">{formatPrice(l.price)}</span>
                    <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5" style={{
                      background: l.status === "Pending" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                      color:      l.status === "Pending" ? "#f59e0b" : "#10b981",
                    }}>
                      {l.status}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] font-medium text-white leading-tight truncate" style={{ maxWidth: 210 }}>{l.address}</p>
                  <p className="font-mono text-[9px] text-white/45 uppercase tracking-wider">{l.city}, FL {l.zip}</p>
                  <div className="flex items-center gap-3 pt-0.5">
                    <Stat label="bd" value={l.beds} />
                    <Stat label="ba" value={l.baths % 1 === 0 ? l.baths : l.baths.toFixed(1)} />
                    {l.sqft > 0 && <Stat label="sf" value={l.sqft.toLocaleString()} />}
                    <span className="font-mono text-[8px] text-white/30 truncate">{l.type.replace("Single Family Residence", "SFR")}</span>
                  </div>
                  <p className="font-mono text-[8px] text-white/20">MLS# {l.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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
