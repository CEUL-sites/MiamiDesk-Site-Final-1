// BEGIN HTML BLOCK — MLS Live Ticker
import { useEffect, useState } from "react";

// Route through Netlify function — Bridge API token stays server-side
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

const MOCK_LISTINGS: Listing[] = [
  { id: "A11501234", address: "1000 Brickell Ave #4200",       city: "Miami",        zip: "33131", price: 2_850_000, beds: 3, baths: 3.5, sqft: 2_840, type: "Condominium",             status: "Active"  },
  { id: "A11502847", address: "19999 E Country Club Dr #702",  city: "Aventura",     zip: "33180", price: 1_195_000, beds: 2, baths: 2,   sqft: 1_650, type: "Condominium",             status: "Active"  },
  { id: "A11503112", address: "7771 SW 62nd Ave",              city: "South Miami",  zip: "33143", price: 1_875_000, beds: 4, baths: 3,   sqft: 2_520, type: "Single Family Residence", status: "Active"  },
  { id: "A11498765", address: "101 SE 1st St #2200",           city: "Miami",        zip: "33131", price:   975_000, beds: 1, baths: 1.5, sqft: 1_012, type: "Condominium",             status: "Active"  },
  { id: "A11499021", address: "3301 NE 183rd St #1508",        city: "Aventura",     zip: "33160", price:   625_000, beds: 2, baths: 2,   sqft: 1_150, type: "Condominium",             status: "Active"  },
  { id: "A11500345", address: "400 Alton Rd #2501",            city: "Miami Beach",  zip: "33139", price: 4_200_000, beds: 3, baths: 3,   sqft: 2_990, type: "Condominium",             status: "Active"  },
  { id: "A11501889", address: "5825 SW 89th Ct",               city: "Miami",        zip: "33173", price:   785_000, beds: 3, baths: 2,   sqft: 1_820, type: "Single Family Residence", status: "Active"  },
  { id: "A11497532", address: "2901 Collins Ave #1004",        city: "Miami Beach",  zip: "33140", price: 1_450_000, beds: 2, baths: 2,   sqft: 1_380, type: "Condominium",             status: "Active"  },
  { id: "A11503789", address: "9703 NW 41st St",               city: "Doral",        zip: "33178", price: 1_125_000, beds: 5, baths: 4,   sqft: 3_210, type: "Single Family Residence", status: "Active"  },
  { id: "A11498231", address: "848 Brickell Key Dr #PH5",      city: "Miami",        zip: "33131", price: 3_500_000, beds: 4, baths: 4.5, sqft: 4_100, type: "Condominium",             status: "Pending" },
  { id: "A11502001", address: "6330 N Bay Rd",                 city: "Miami Beach",  zip: "33141", price: 8_750_000, beds: 6, baths: 6.5, sqft: 6_400, type: "Single Family Residence", status: "Active"  },
  { id: "A11500987", address: "1080 Brickell Ave #2101",       city: "Miami",        zip: "33131", price: 1_680_000, beds: 2, baths: 2,   sqft: 1_520, type: "Condominium",             status: "Active"  },
  { id: "A11504101", address: "888 Brickell Key Dr #1205",     city: "Miami",        zip: "33131", price: 1_290_000, beds: 2, baths: 2,   sqft: 1_400, type: "Condominium",             status: "Active"  },
  { id: "A11504502", address: "10245 Collins Ave #803",        city: "Bal Harbour",  zip: "33154", price: 5_400_000, beds: 3, baths: 3.5, sqft: 3_050, type: "Condominium",             status: "Active"  },
  { id: "A11505011", address: "12650 SW 25th St",              city: "Miramar",      zip: "33027", price:   675_000, beds: 4, baths: 3,   sqft: 2_180, type: "Single Family Residence", status: "Active"  },
  { id: "A11505388", address: "1060 Brickell Ave #3301",       city: "Miami",        zip: "33131", price: 2_100_000, beds: 3, baths: 3,   sqft: 2_200, type: "Condominium",             status: "Pending" },
];

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

const TICKER_LABEL = "MIAMI MLS · LIVE LISTINGS · 93,000+ REALTORS®";
// Repeat enough times to fill the viewport width for a seamless loop
const HEADER_REPEATS = 6;

// BEGIN JS BLOCK — Bridge IDX fetch + animation logic
export function MLSTicker() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(TICKER_API);
        if (!res.ok) return;
        const json = await res.json();
        const value: Record<string, unknown>[] = json?.value ?? [];
        if (cancelled || value.length === 0) return;
        setListings(value.map(parseBridgeListing));
        setIsLive(true);
      } catch {
        // silently fall back to mock data
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Duplicate listings so the CSS marquee loops seamlessly
  const doubled = [...listings, ...listings];

  const headerText = Array(HEADER_REPEATS).fill(TICKER_LABEL).join("   |   ");

  return (
    <>
      {/* Inject keyframe animations once */}
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
        .mls-row-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ticker wrapper — live MLS feed strip below hero */}
      <div className="w-full overflow-hidden bg-[#0A1628] select-none">

        {/* ── Header band: "MIAMI MLS · LIVE LISTINGS · 93,000+ REALTORS®" ── */}
        <div className="relative overflow-hidden border-b border-white/10 bg-[#0A1628] py-2">
          {/* Live / Demo badge — top-right overlay */}
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5"
            style={{ background: isLive ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)", color: isLive ? "#34d399" : "#fbbf24" }}
          >
            {isLive ? "● Live" : "● Demo"}
          </span>

          <div className="overflow-hidden">
            <div className="mls-header-track">
              {/* Two copies for seamless loop */}
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

        {/* ── Property data row ── */}
        <div className="overflow-hidden bg-[#0D1E38] py-3">
          <div className="mls-row-track gap-4 px-2">
            {doubled.map((l, idx) => (
              <div
                key={`${l.id}-${idx}`}
                className="flex-shrink-0 flex items-stretch gap-0 border border-white/10 bg-[#111F38] hover:border-gold/60 transition-colors duration-200"
                style={{ minWidth: 240 }}
              >
                {/* Status stripe */}
                <div
                  className="w-1 flex-shrink-0"
                  style={{ background: l.status === "Pending" ? "#f59e0b" : "#10b981" }}
                />

                <div className="flex flex-col gap-1 px-3 py-2.5">
                  {/* Price + status */}
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

                  {/* Address */}
                  <p className="font-sans text-[11px] font-medium text-white leading-tight truncate" style={{ maxWidth: 210 }}>
                    {l.address}
                  </p>

                  {/* City + zip */}
                  <p className="font-mono text-[9px] text-white/45 uppercase tracking-wider">
                    {l.city}, FL {l.zip}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 pt-0.5">
                    <Stat label="bd" value={l.beds} />
                    <Stat label="ba" value={l.baths % 1 === 0 ? l.baths : l.baths.toFixed(1)} />
                    {l.sqft > 0 && <Stat label="sf" value={l.sqft.toLocaleString()} />}
                    <span className="font-mono text-[8px] text-white/30 truncate">{l.type.replace("Single Family Residence", "SFR")}</span>
                  </div>

                  {/* MLS ID */}
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
// END JS BLOCK

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="flex items-baseline gap-0.5">
      <span className="font-sans text-[11px] font-semibold text-white/80">{value}</span>
      <span className="font-mono text-[8px] uppercase text-white/35">{label}</span>
    </span>
  );
}
// END HTML BLOCK
