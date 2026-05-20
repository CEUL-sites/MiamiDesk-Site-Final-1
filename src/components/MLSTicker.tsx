// BEGIN HTML BLOCK — MLS Live Ticker
import { useEffect, useState } from "react";

const BRIDGE_TOKEN = "1eee5e27f791630e078ee05d6e0ed8f4";
const BRIDGE_API =
  `https://api.bridgedataoutput.com/api/v2/OData/miamire/Property` +
  `?access_token=${BRIDGE_TOKEN}` +
  `&$filter=(StandardStatus eq 'Active' or StandardStatus eq 'Pending') and ListPrice ge 1000000` +
  `&$orderby=ListPrice desc` +
  `&$top=30` +
  `&$select=ListingId,UnparsedAddress,City,PostalCode,ListPrice,BedroomsTotal,BathroomsTotalDecimal,LivingArea,PropertyType,StandardStatus`;

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
  { id: "A11601001", address: "9701 Collins Ave PH-01",         city: "Bal Harbour",  zip: "33154", price: 28_500_000, beds: 5, baths: 6,   sqft: 7_200, type: "Condominium",             status: "Active"  },
  { id: "A11601002", address: "6380 N Bay Rd",                  city: "Miami Beach",  zip: "33141", price: 22_000_000, beds: 7, baths: 8.5, sqft: 9_100, type: "Single Family Residence", status: "Active"  },
  { id: "A11601003", address: "100 S Pointe Dr #PH-A",          city: "Miami Beach",  zip: "33139", price: 18_750_000, beds: 4, baths: 5,   sqft: 5_800, type: "Condominium",             status: "Active"  },
  { id: "A11601004", address: "5292 Fisher Island Dr #6122",    city: "Miami Beach",  zip: "33109", price: 15_900_000, beds: 4, baths: 4.5, sqft: 4_950, type: "Condominium",             status: "Active"  },
  { id: "A11601005", address: "7341 La Gorce Dr",               city: "Miami Beach",  zip: "33141", price: 13_500_000, beds: 6, baths: 7,   sqft: 8_400, type: "Single Family Residence", status: "Active"  },
  { id: "A11601006", address: "3 Indian Creek Dr",              city: "Indian Creek", zip: "33154", price: 11_800_000, beds: 5, baths: 6.5, sqft: 7_800, type: "Single Family Residence", status: "Active"  },
  { id: "A11601007", address: "10203 Collins Ave #1001",        city: "Bal Harbour",  zip: "33154", price:  9_950_000, beds: 3, baths: 3.5, sqft: 3_600, type: "Condominium",             status: "Active"  },
  { id: "A11601008", address: "3300 NE 190th St #PH-5",         city: "Aventura",     zip: "33180", price:  8_200_000, beds: 4, baths: 4.5, sqft: 4_100, type: "Condominium",             status: "Active"  },
  { id: "A11601009", address: "2127 S Bayshore Dr",             city: "Coconut Grove", zip:"33133", price:  7_750_000, beds: 5, baths: 5.5, sqft: 5_300, type: "Single Family Residence", status: "Active"  },
  { id: "A11601010", address: "1643 Brickell Ave #PH4702",      city: "Miami",        zip: "33129", price:  6_900_000, beds: 4, baths: 4,   sqft: 4_400, type: "Condominium",             status: "Active"  },
  { id: "A11601011", address: "4250 Riviera Dr",                city: "Coral Gables", zip: "33146", price:  5_850_000, beds: 6, baths: 6,   sqft: 6_200, type: "Single Family Residence", status: "Active"  },
  { id: "A11601012", address: "801 Brickell Key Blvd #PH-01",   city: "Miami",        zip: "33131", price:  4_990_000, beds: 4, baths: 4.5, sqft: 4_700, type: "Condominium",             status: "Active"  },
  { id: "A11601013", address: "160 Isle Of Venice Dr",          city: "Fort Lauderdale", zip:"33301", price: 4_400_000, beds: 5, baths: 5, sqft: 4_950, type: "Single Family Residence", status: "Pending" },
  { id: "A11601014", address: "400 Alton Rd #3501",             city: "Miami Beach",  zip: "33139", price:  3_950_000, beds: 3, baths: 3.5, sqft: 3_100, type: "Condominium",             status: "Active"  },
  { id: "A11601015", address: "2669 S Bayshore Dr #1400",       city: "Coconut Grove", zip:"33133", price:  3_500_000, beds: 3, baths: 3,   sqft: 2_800, type: "Condominium",             status: "Active"  },
  { id: "A11601016", address: "201 Crandon Blvd #632",          city: "Key Biscayne", zip: "33149", price:  2_950_000, beds: 3, baths: 3,   sqft: 2_400, type: "Condominium",             status: "Active"  },
  { id: "A11601017", address: "7750 SW 86th Ct",                city: "Pinecrest",    zip: "33156", price:  2_650_000, beds: 5, baths: 4.5, sqft: 4_800, type: "Single Family Residence", status: "Active"  },
  { id: "A11601018", address: "1100 Brickell Bay Dr #3501",     city: "Miami",        zip: "33131", price:  2_100_000, beds: 2, baths: 2.5, sqft: 1_950, type: "Condominium",             status: "Active"  },
  { id: "A11601019", address: "10295 Collins Ave #706",         city: "Bal Harbour",  zip: "33154", price:  1_875_000, beds: 2, baths: 2,   sqft: 1_600, type: "Condominium",             status: "Active"  },
  { id: "A11601020", address: "2901 Collins Ave #1201",         city: "Miami Beach",  zip: "33140", price:  1_450_000, beds: 2, baths: 2,   sqft: 1_420, type: "Condominium",             status: "Active"  },
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
        const res = await fetch(BRIDGE_API);
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

      {/* Ticker wrapper — sits immediately below the fixed Navbar (pt = navbar height) */}
      <div className="w-full overflow-hidden bg-[#0A1628] select-none" style={{ paddingTop: "var(--navbar-h, 72px)" }}>

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
                className="flex-shrink-0 flex items-stretch gap-0 border border-white/10 bg-[#111F38] hover:border-[#C9A84C]/60 transition-colors duration-200"
                style={{ minWidth: 280 }}
              >
                {/* Status stripe */}
                <div
                  className="w-1 flex-shrink-0"
                  style={{ background: l.status === "Pending" ? "#f59e0b" : "#10b981" }}
                />

                <div className="flex flex-col gap-1 px-3 py-2.5">
                  {/* Price + status */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-base font-bold text-[#C9A84C] leading-none">
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

        {/* ── Footer attribution bar ── */}
        <div className="bg-[#0A1628] border-t border-white/5 px-6 py-1.5 flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
            Miami Association of REALTORS® · MLS Data powered by Bridge IDX
          </span>
          <span className="font-mono text-[8px] text-white/20">
            ©{new Date().getFullYear()} MIAMI MLS. All Rights Reserved. Information deemed reliable but not guaranteed.
          </span>
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
