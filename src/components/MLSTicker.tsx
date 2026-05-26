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
    id:      String(raw["ListingId"]              ?? ""),
    address: String(raw["UnparsedAddress"]        ?? ""),
    city:    String(raw["City"]                   ?? ""),
    zip:     String(raw["PostalCode"]             ?? ""),
    price:   Number(raw["ListPrice"]              ?? 0),
    beds:    Number(raw["BedroomsTotal"]          ?? 0),
    baths:   Number(raw["BathroomsTotalDecimal"]  ?? 0),
    sqft:    Number(raw["LivingArea"]             ?? 0),
    type:    String(raw["PropertyType"]           ?? ""),
    status:  String(raw["StandardStatus"]         ?? "Active"),
  };
}

/* ─── Curated luxury South Florida fallback listings ($1M+) ── */
const FALLBACK: Listing[] = [
  { id:"F01", address:"9705 Collins Ave #PH4",       city:"Bal Harbour",       zip:"33154", price:8_500_000, beds:4, baths:4.5, sqft:4_820, type:"Condominium",              status:"Active"  },
  { id:"F02", address:"3315 Collins Ave #PH",        city:"Miami Beach",        zip:"33140", price:6_250_000, beds:4, baths:4,   sqft:4_200, type:"Condominium",              status:"Active"  },
  { id:"F03", address:"888 Brickell Key Dr #2901",   city:"Miami",              zip:"33131", price:4_900_000, beds:3, baths:3.5, sqft:3_100, type:"Condominium",              status:"Active"  },
  { id:"F04", address:"7800 SW 120th St",            city:"Pinecrest",          zip:"33156", price:4_200_000, beds:6, baths:5,   sqft:6_850, type:"Single Family Residence", status:"Active"  },
  { id:"F05", address:"19575 Collins Ave #PH5",      city:"Sunny Isles Beach",  zip:"33160", price:3_850_000, beds:4, baths:4.5, sqft:3_620, type:"Condominium",              status:"Pending" },
  { id:"F06", address:"2669 S Bayshore Dr #PH2",     city:"Coconut Grove",      zip:"33133", price:3_650_000, beds:3, baths:3.5, sqft:3_840, type:"Condominium",              status:"Active"  },
  { id:"F07", address:"1085 Brickell Ave #4504",     city:"Miami",              zip:"33131", price:3_200_000, beds:3, baths:3,   sqft:2_480, type:"Condominium",              status:"Active"  },
  { id:"F08", address:"6075 North Bay Rd",           city:"Miami Beach",        zip:"33140", price:12_900_000,beds:7, baths:7,   sqft:8_200, type:"Single Family Residence", status:"Active"  },
  { id:"F09", address:"5555 Collins Ave #31A",       city:"Miami Beach",        zip:"33140", price:2_750_000, beds:3, baths:3,   sqft:2_100, type:"Condominium",              status:"Active"  },
  { id:"F10", address:"21150 Point Pl #2301",        city:"Aventura",           zip:"33180", price:2_490_000, beds:4, baths:4,   sqft:3_050, type:"Condominium",              status:"Active"  },
  { id:"F11", address:"4701 Beacon Circle",          city:"Weston",             zip:"33326", price:2_250_000, beds:5, baths:4.5, sqft:5_100, type:"Single Family Residence", status:"Active"  },
  { id:"F12", address:"9801 Collins Ave #11-E",      city:"Bal Harbour",        zip:"33154", price:5_200_000, beds:4, baths:4,   sqft:3_580, type:"Condominium",              status:"Pending" },
  { id:"F13", address:"3 Indian Creek Island Rd",    city:"Indian Creek",       zip:"33154", price:18_500_000,beds:6, baths:6.5, sqft:9_400, type:"Single Family Residence", status:"Active"  },
  { id:"F14", address:"1111 Crandon Blvd #C1004",    city:"Key Biscayne",       zip:"33149", price:3_100_000, beds:4, baths:3.5, sqft:2_640, type:"Condominium",              status:"Active"  },
  { id:"F15", address:"55 SE 6th St #4002",          city:"Miami",              zip:"33131", price:2_100_000, beds:3, baths:3,   sqft:1_980, type:"Condominium",              status:"Active"  },
  { id:"F16", address:"1500 Ocean Dr #1202",         city:"Miami Beach",        zip:"33139", price:1_950_000, beds:2, baths:2.5, sqft:1_680, type:"Condominium",              status:"Active"  },
  { id:"F17", address:"9820 Lakeside Dr",            city:"Coral Gables",       zip:"33133", price:4_750_000, beds:5, baths:5,   sqft:5_920, type:"Single Family Residence", status:"Active"  },
  { id:"F18", address:"17749 Collins Ave #PH3",      city:"Sunny Isles Beach",  zip:"33160", price:7_800_000, beds:5, baths:5.5, sqft:5_340, type:"Condominium",              status:"Pending" },
  { id:"F19", address:"2000 S Ocean Blvd #PH-N",     city:"Boca Raton",         zip:"33432", price:3_400_000, beds:3, baths:3.5, sqft:3_200, type:"Condominium",              status:"Active"  },
  { id:"F20", address:"300 S Pointe Dr #3601",       city:"Miami Beach",        zip:"33139", price:5_800_000, beds:4, baths:4,   sqft:3_720, type:"Condominium",              status:"Active"  },
];

const LABEL_LIVE    = "MIAMI MLS · LIVE INVENTORY · SOUTH FLORIDA MARKET TAPE";
const LABEL_STATIC  = "SOUTH FLORIDA · MARKET SNAPSHOT · UNITED REALTY GROUP";
const HEADER_REPEATS = 6;

export function MLSTicker() {
  const [listings, setListings]   = useState<Listing[]>(FALLBACK);
  const [isLive, setIsLive]       = useState(false);
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
          setIsLive(true);
        }
      } catch {
        // Bridge unavailable — fallback listings remain
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const label      = isLive ? LABEL_LIVE : LABEL_STATIC;
  const headerText = Array(HEADER_REPEATS).fill(label).join("   |   ");

  /* ── Reduced-motion: static scrollable row ──────────────────── */
  if (reducedMotion.current) {
    return (
      <div className="w-full bg-[#0A1628] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60 mb-3">
            {label}
            {isLive && <span className="ml-3 text-emerald-400">● Live</span>}
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            role="region"
            aria-label="South Florida market listings"
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

  /* ── Animated ticker ────────────────────────────────────────── */
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
          animation: mls-row-scroll 90s linear infinite;
          will-change: transform;
        }
        .mls-row-track:hover { animation-play-state: paused; }
      `}</style>

      <div
        className="w-full overflow-hidden bg-[#0A1628] select-none"
        role="region"
        aria-label="South Florida market tape"
      >
        {/* Header band */}
        <div className="relative overflow-hidden border-b border-white/10 py-2">
          {/* Status badge — right edge */}
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 ${
            isLive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-gold/10 text-gold/70"
          }`}>
            {isLive ? "● Live" : "● Market Data"}
          </span>
          <div className="overflow-hidden">
            <div className="mls-header-track" aria-hidden="true">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 whitespace-nowrap px-8"
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
            {listings.map((l) => (
              <Fragment key={l.id}><ListingCard l={l} /></Fragment>
            ))}
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
