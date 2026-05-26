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

/* ─── Curated South Florida fallback listings ──────────────── */
const FALLBACK: Listing[] = [
  { id:"F01", address:"2740 SW 27th Ave",          city:"Coral Gables",      zip:"33133", price:1_450_000, beds:3, baths:2.5, sqft:2_850, type:"Single Family Residence", status:"Active"  },
  { id:"F02", address:"1000 Brickell Plaza #3201", city:"Miami",             zip:"33131", price:  895_000, beds:2, baths:2,   sqft:1_220, type:"Condominium",              status:"Active"  },
  { id:"F03", address:"19370 Collins Ave #1502",   city:"Sunny Isles Beach", zip:"33160", price:1_620_000, beds:3, baths:2,   sqft:1_680, type:"Condominium",              status:"Active"  },
  { id:"F04", address:"456 Buttonwood Ln",         city:"Weston",            zip:"33326", price:  865_000, beds:4, baths:3,   sqft:3_100, type:"Single Family Residence", status:"Active"  },
  { id:"F05", address:"400 Alton Rd #1506",        city:"Miami Beach",       zip:"33139", price:1_795_000, beds:2, baths:2,   sqft:1_430, type:"Condominium",              status:"Pending" },
  { id:"F06", address:"2660 NE 14th St Cswy #204", city:"Fort Lauderdale",   zip:"33304", price:  625_000, beds:3, baths:2,   sqft:1_540, type:"Condominium",              status:"Active"  },
  { id:"F07", address:"10800 SW 77th Ave",         city:"Pinecrest",         zip:"33156", price:2_150_000, beds:5, baths:4,   sqft:4_420, type:"Single Family Residence", status:"Active"  },
  { id:"F08", address:"8300 NW 107th Ct",          city:"Doral",             zip:"33178", price:  780_000, beds:4, baths:3,   sqft:2_680, type:"Single Family Residence", status:"Active"  },
  { id:"F09", address:"3625 N Country Club Dr #611",city:"Aventura",         zip:"33180", price:1_185_000, beds:3, baths:3,   sqft:1_960, type:"Condominium",              status:"Active"  },
  { id:"F10", address:"3300 NE 188th St #422",     city:"Aventura",          zip:"33180", price:  745_000, beds:2, baths:2,   sqft:1_340, type:"Condominium",              status:"Pending" },
  { id:"F11", address:"3800 S Ocean Dr #1405",     city:"Hollywood",         zip:"33019", price:  495_000, beds:2, baths:2,   sqft:1_180, type:"Condominium",              status:"Active"  },
  { id:"F12", address:"3400 SW 112th Ave",         city:"Miami",             zip:"33165", price:  545_000, beds:3, baths:2,   sqft:1_720, type:"Single Family Residence", status:"Active"  },
  { id:"F13", address:"2900 NE 7th Ave #2204",     city:"Miami",             zip:"33137", price:  835_000, beds:1, baths:1.5, sqft:  940, type:"Condominium",              status:"Active"  },
  { id:"F14", address:"301 174th St #516",         city:"Sunny Isles Beach", zip:"33160", price:  468_000, beds:2, baths:2,   sqft:1_080, type:"Condominium",              status:"Active"  },
  { id:"F15", address:"7865 SW 189th Ter",         city:"Palmetto Bay",      zip:"33157", price:1_340_000, beds:4, baths:3,   sqft:3_320, type:"Single Family Residence", status:"Active"  },
  { id:"F16", address:"9801 Collins Ave #14E",     city:"Bal Harbour",       zip:"33154", price:2_895_000, beds:3, baths:3,   sqft:2_140, type:"Condominium",              status:"Pending" },
  { id:"F17", address:"1400 S Ocean Blvd #506",    city:"Boca Raton",        zip:"33432", price:1_095_000, beds:3, baths:2,   sqft:1_820, type:"Condominium",              status:"Active"  },
  { id:"F18", address:"15105 SW 82nd Ter",         city:"Miami",             zip:"33193", price:  625_000, beds:4, baths:2.5, sqft:2_240, type:"Single Family Residence", status:"Active"  },
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
