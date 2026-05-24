import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACT } from "../constants";

interface Listing {
  ListingId: string;
  UnparsedAddress: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  ListPrice: number;
  BedroomsTotal: number;
  BathroomsTotalDecimal: number;
  LivingArea: number;
  PropertyType: string;
  StandardStatus: string;
  DaysOnMarket: number;
  ListOfficeName: string;
  Media?: Array<{ MediaURL?: string; MediaKey?: string }>;
}

const ZONES = [
  "", "Miami", "Brickell", "Coral Gables", "Coconut Grove", "Key Biscayne",
  "Miami Beach", "Bal Harbour", "Sunny Isles Beach", "Aventura", "Weston",
  "Pinecrest", "Doral", "Fort Lauderdale", "Hollywood", "Boca Raton",
];
const ZONE_LABELS: Record<string, string> = { "": "All Neighborhoods" };

const PRICE_OPTIONS = [
  { value: "", label: "Any Price" },
  { value: "1000000-2000000", label: "$1M – $2M" },
  { value: "2000000-5000000", label: "$2M – $5M" },
  { value: "5000000-10000000", label: "$5M – $10M" },
  { value: "10000000-0", label: "$10M+" },
];

const BED_OPTIONS = [
  { value: "0", label: "Any Beds" },
  { value: "2", label: "2+ Beds" },
  { value: "3", label: "3+ Beds" },
  { value: "4", label: "4+ Beds" },
  { value: "5", label: "5+ Beds" },
];

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "Condominium", label: "Condo" },
  { value: "Single Family Residence", label: "Single Family" },
];

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

function ListingCard({ listing, key: _k }: { listing: Listing; key?: string }) {
  const photo = listing.Media?.[0]?.MediaURL;
  const isActive = listing.StandardStatus === "Active";

  return (
    <article className="group border border-bone bg-white transition-all duration-300 hover:border-b-4 hover:border-b-gold hover:shadow-xl">
      {/* Photo */}
      <div className="relative h-52 bg-navy/10 overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={listing.UnparsedAddress}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy/5">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/25">Photo Pending</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className="px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em]"
            style={{
              background: isActive ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
              color: isActive ? "#10b981" : "#f59e0b",
            }}
          >
            {listing.StandardStatus}
          </span>
          <span className="bg-navy/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.15em] text-white/70">
            {listing.PropertyType?.replace("Single Family Residence", "SFR")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="font-serif text-xl text-gold">{formatPrice(listing.ListPrice)}</p>
        <p className="mt-1 font-sans text-sm font-medium text-navy leading-tight truncate">{listing.UnparsedAddress}</p>
        <p className="font-mono text-[9px] uppercase tracking-wider text-navy/40 mt-0.5">
          {listing.City}, FL {listing.PostalCode}
        </p>
        <div className="mt-3 flex flex-wrap gap-3 border-t border-bone pt-3">
          {listing.BedroomsTotal > 0 && (
            <span className="font-mono text-[10px] text-navy/65">{listing.BedroomsTotal} <span className="text-navy/35">bd</span></span>
          )}
          {listing.BathroomsTotalDecimal > 0 && (
            <span className="font-mono text-[10px] text-navy/65">
              {listing.BathroomsTotalDecimal % 1 === 0 ? listing.BathroomsTotalDecimal : listing.BathroomsTotalDecimal.toFixed(1)} <span className="text-navy/35">ba</span>
            </span>
          )}
          {listing.LivingArea > 0 && (
            <span className="font-mono text-[10px] text-navy/65">{listing.LivingArea.toLocaleString()} <span className="text-navy/35">sf</span></span>
          )}
          {listing.DaysOnMarket > 0 && (
            <span className="ml-auto font-mono text-[9px] text-navy/30">{listing.DaysOnMarket}d</span>
          )}
        </div>
        {listing.ListOfficeName && (
          <p className="mt-2 font-mono text-[8px] text-navy/25 truncate">{listing.ListOfficeName}</p>
        )}
        <a
          href={`/contact?listing=${listing.ListingId}`}
          className="mt-4 block w-full border border-gold/40 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy"
        >
          Request Information →
        </a>
      </div>
    </article>
  );
}

export default function ListingsPage() {
  const [zone, setZone] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [beds, setBeds] = useState("0");
  const [propType, setPropType] = useState("");
  const [page, setPage] = useState(1);

  const [listings, setListings] = useState<Listing[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [noApi, setNoApi] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const fetchListings = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);

    const params = new URLSearchParams({ status: "Active", page: String(page) });
    if (zone) params.set("zone", zone);
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      if (min && parseInt(min) > 0) params.set("minPrice", min);
      if (max && parseInt(max) > 0) params.set("maxPrice", max);
    }
    if (beds !== "0") params.set("beds", beds);
    if (propType) params.set("type", propType);

    try {
      const res = await fetch(`/.netlify/functions/listings-search?${params}`, {
        signal: abortRef.current.signal,
      });
      if (res.status === 503) { setNoApi(true); setLoading(false); return; }
      const data = await res.json();
      if (data.error) { setNoApi(true); setLoading(false); return; }
      setListings(data.value ?? []);
      setTotalCount(data.totalCount ?? 0);
      setLastUpdated(data.lastUpdated ?? "");
      setNoApi(false);
    } catch (e: unknown) {
      if ((e as { name?: string }).name !== "AbortError") setNoApi(true);
    } finally {
      setLoading(false);
    }
  }, [zone, priceRange, beds, propType, page]);

  useEffect(() => {
    setPage(1);
  }, [zone, priceRange, beds, propType]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const totalPages = Math.ceil(totalCount / 24);
  const lastUpdatedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
    : "";

  return (
    <>
      <Helmet>
        <title>South Florida Active MLS Listings | Brickell · Coral Gables · Miami Beach | Carlos Uzcategui</title>
        <meta name="description" content="Active South Florida MLS listings — Brickell, Coral Gables, Miami Beach, Aventura, Weston, Sunny Isles Beach. Updated daily from the Miami and South Florida REALTORS® MLS. United Realty Group · FL SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/listings" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        <section className="bg-navy-deep py-20 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Miami MLS · Active Listings</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight text-white md:text-5xl">
            South Florida Active Properties
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
            Sourced directly from the Miami and South Florida REALTORS® MLS. Updated continuously. Contact Carlos directly to arrange a showing or discuss any listing.
          </p>
        </section>

        {/* Filter bar */}
        <div className="sticky top-0 z-30 border-b border-bone bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-4">
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="border border-bone bg-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-navy focus:border-gold focus:outline-none"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>{ZONE_LABELS[z] ?? z}</option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border border-bone bg-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-navy focus:border-gold focus:outline-none"
            >
              {PRICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="border border-bone bg-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-navy focus:border-gold focus:outline-none"
            >
              {BED_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              className="border border-bone bg-white px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-navy focus:border-gold focus:outline-none"
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <div className="ml-auto flex items-center gap-4">
              {!loading && !noApi && (
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-navy/40">
                  {totalCount.toLocaleString()} results
                </span>
              )}
              <a
                href={`${CONTACT.whatsappUS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gold px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                Schedule a Showing
              </a>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          {noApi && (
            <div className="py-20 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/40">Live MLS Connection Pending</p>
              <p className="mt-3 font-sans text-sm text-navy/55 max-w-md mx-auto">
                The live MLS feed is being configured. Contact Carlos directly to access the full inventory of active South Florida properties.
              </p>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy">
                Request a Buyer Brief →
              </a>
            </div>
          )}

          {loading && !noApi && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse border border-bone bg-white">
                  <div className="h-52 bg-navy/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 w-24 bg-navy/5 rounded" />
                    <div className="h-4 w-full bg-navy/5 rounded" />
                    <div className="h-3 w-32 bg-navy/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !noApi && listings.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/40">No Listings Found</p>
              <p className="mt-3 font-sans text-sm text-navy/55">Try adjusting the filters or contact Carlos for a custom buyer search.</p>
            </div>
          )}

          {!loading && !noApi && listings.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.map((l) => (
                <ListingCard listing={l} key={l.ListingId} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !noApi && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="flex items-center gap-1 border border-bone px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-navy/60 disabled:opacity-30 hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={13} /> Prev
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">
                {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 border border-bone px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-navy/60 disabled:opacity-30 hover:border-gold hover:text-gold"
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          )}

          {/* IDX Disclaimer */}
          <div className="mt-14 border-t border-bone pt-8">
            <div className="flex items-start gap-2">
              <BadgeCheck size={14} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="font-mono text-[9px] leading-relaxed text-navy/35">
                Listing information is provided in part by the Miami and South Florida REALTORS® and the BeachesMLS via IDX (Internet Data Exchange). Information is deemed reliable but not guaranteed and is subject to change without notice. All listings are subject to prior sale, change, or withdrawal. Neither Carlos Uzcategui nor United Realty Group shall be liable for any inaccuracy in listing data. {CONTACT.licenseDisplay} · Associate in United Realty Group · Equal Housing Opportunity.
                {lastUpdatedDate && ` Last updated: ${lastUpdatedDate}.`}
              </p>
            </div>
          </div>
        </div>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
