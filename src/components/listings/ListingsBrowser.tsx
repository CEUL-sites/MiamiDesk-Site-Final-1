import { Fragment, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { CONTACT } from "../../constants";
import { formatPrice } from "../../lib/format";
import {
  type BridgeListing,
  type ListingsSearchResponse,
  listingKey,
  listingPhoto,
  listingLocality,
  mostRecentModification,
  formatListingDate,
  IDX_DISCLAIMER,
} from "../../lib/listings";
import { ListingCard, ListingSkeletonCard } from "./ListingCard";

// Mirrors the server-side whitelists in netlify/functions/listings-search.ts —
// the proxy rejects anything outside these, so the UI only offers valid values.
const ZONES = [
  "Aventura", "Bal Harbour", "Boca Raton", "Brickell", "Coconut Grove",
  "Coral Gables", "Coral Springs", "Doral", "Fort Lauderdale", "Hallandale Beach",
  "Hialeah", "Hollywood", "Homestead", "Kendall", "Key Biscayne",
  "Miami", "Miami Beach", "Miramar", "North Miami", "Pembroke Pines",
  "Pinecrest", "Plantation", "Pompano Beach", "Sunny Isles Beach", "Sunrise",
  "Weston",
];

const TYPES = [
  { value: "", label: "All property types" },
  { value: "Single Family Residence", label: "Single Family" },
  { value: "Condominium", label: "Condominium" },
  { value: "Residential", label: "Residential" },
];

const PRICE_STEPS = [
  { value: "", label: "No min" },
  { value: "300000", label: "$300K" },
  { value: "500000", label: "$500K" },
  { value: "750000", label: "$750K" },
  { value: "1000000", label: "$1M" },
  { value: "2000000", label: "$2M" },
  { value: "5000000", label: "$5M" },
];

const BEDS = [
  { value: "", label: "Any beds" },
  { value: "1", label: "1+ bd" },
  { value: "2", label: "2+ bd" },
  { value: "3", label: "3+ bd" },
  { value: "4", label: "4+ bd" },
  { value: "5", label: "5+ bd" },
];

interface Filters {
  zone: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
}

const INITIAL: Filters = { zone: "", type: "", minPrice: "", maxPrice: "", beds: "" };

function selectClass() {
  return "w-full appearance-none border border-white/15 bg-navy/60 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 focus:border-gold focus:outline-none";
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{label}</span>
      <span className="text-right font-sans text-sm text-white/85">{value}</span>
    </div>
  );
}

function DetailModal({ listing, onClose }: { listing: BridgeListing; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const photo = listingPhoto(listing);
  const locality = listingLocality(listing);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-deep/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl border border-gold/25 bg-navy-deep shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center bg-navy/70 text-white/70 transition-colors hover:text-gold"
        >
          <X size={18} />
        </button>

        {photo && (
          <img
            src={photo}
            alt={listing.UnparsedAddress ?? "Property photo"}
            className="h-56 w-full object-cover sm:h-64"
          />
        )}

        <div className="p-6 sm:p-8">
          <p className="font-serif text-3xl font-semibold text-white">
            {listing.ListPrice != null ? formatPrice(listing.ListPrice) : "Price on request"}
          </p>
          <p className="mt-2 font-sans text-sm text-white/80">
            {listing.UnparsedAddress ?? "Address on request"}
          </p>
          {locality && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">{locality}</p>
          )}

          <div className="mt-6">
            {listing.PropertyType && <DetailRow label="Type" value={listing.PropertyType} />}
            {listing.StandardStatus && <DetailRow label="Status" value={listing.StandardStatus} />}
            {listing.BedroomsTotal != null && <DetailRow label="Bedrooms" value={String(listing.BedroomsTotal)} />}
            {listing.BathroomsTotalDecimal != null && <DetailRow label="Bathrooms" value={String(listing.BathroomsTotalDecimal)} />}
            {listing.LivingArea != null && listing.LivingArea > 0 && (
              <DetailRow label="Living area" value={`${listing.LivingArea.toLocaleString()} sqft`} />
            )}
            {listing.DaysOnMarket != null && <DetailRow label="Days on market" value={String(listing.DaysOnMarket)} />}
            {listing.ListOfficeName && <DetailRow label="Listing brokerage" value={listing.ListOfficeName} />}
            {listing.ModificationTimestamp && (
              <DetailRow label="Last updated" value={formatListingDate(listing.ModificationTimestamp)} />
            )}
          </div>

          <a
            href={CONTACT.whatsappUS}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
          >
            Ask Carlos About This Property
          </a>
          <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] leading-relaxed text-white/30">
            {listing.ListOfficeName && !/united realty/i.test(listing.ListOfficeName)
              ? "Listed by a cooperating brokerage and displayed via IDX. "
              : ""}
            Information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Searchable live MLS browser for /listings. Filters (zone, type, price, beds)
 * refetch through the listings-search proxy with a 400ms debounce. The Bridge
 * server token stays server-side; this component only ever sees the proxy.
 */
export function ListingsBrowser() {
  const [filters, setFilters] = useState<Filters>(INITIAL);
  const [listings, setListings] = useState<BridgeListing[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [selected, setSelected] = useState<BridgeListing | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const t = window.setTimeout(() => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setStatus("loading");

      const params = new URLSearchParams({ status: "Active" });
      if (filters.zone) params.set("zone", filters.zone);
      if (filters.type) params.set("type", filters.type);
      if (filters.minPrice) params.set("minPrice", filters.minPrice);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
      if (filters.beds) params.set("beds", filters.beds);

      fetch(`/.netlify/functions/listings-search?${params.toString()}`, { signal: ctrl.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json() as Promise<ListingsSearchResponse>;
        })
        .then((json) => {
          const value = json.value ?? [];
          setListings(value);
          setTotal(json.totalCount ?? value.length);
          setStatus(value.length === 0 ? "empty" : "ready");
        })
        .catch((err) => {
          if ((err as { name?: string }).name === "AbortError") return;
          setStatus("error");
        });
    }, 400);

    return () => window.clearTimeout(t);
  }, [filters]);

  const lastUpdated = useMemo(() => mostRecentModification(listings), [listings]);

  return (
    <section className="bg-navy-deep py-12 md:py-16" id="search">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">Live MLS Search</p>
          <h2 className="mt-3 font-serif leading-tight text-white" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Search active South Florida listings
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
            Live from the Miami and South Florida REALTORS® MLS. Filter by area, price, type, and bedrooms.
          </p>
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Area</label>
            <select className={selectClass()} value={filters.zone} onChange={set("zone")}>
              <option value="">All areas</option>
              {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Type</label>
            <select className={selectClass()} value={filters.type} onChange={set("type")}>
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Min price</label>
            <select className={selectClass()} value={filters.minPrice} onChange={set("minPrice")}>
              {PRICE_STEPS.map((p) => <option key={`min-${p.value}`} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Max price</label>
            <select className={selectClass()} value={filters.maxPrice} onChange={set("maxPrice")}>
              <option value="">No max</option>
              {PRICE_STEPS.slice(1).map((p) => <option key={`max-${p.value}`} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Beds</label>
            <select className={selectClass()} value={filters.beds} onChange={set("beds")}>
              {BEDS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
        </div>

        {/* Result count / reset */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            {status === "ready" || status === "empty"
              ? `${total.toLocaleString()} active listing${total !== 1 ? "s" : ""}`
              : "Searching…"}
          </p>
          {(filters.zone || filters.type || filters.minPrice || filters.maxPrice || filters.beds) && (
            <button
              type="button"
              onClick={() => setFilters(INITIAL)}
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline underline-offset-4 transition-colors hover:text-gold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid / states */}
        <div className="mt-6">
          {status === "loading" && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => <ListingSkeletonCard key={i} />)}
            </div>
          )}

          {status === "ready" && (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((l, i) => (
                <Fragment key={listingKey(l, i)}>
                  <ListingCard listing={l} onSelect={setSelected} />
                </Fragment>
              ))}
            </div>
          )}

          {(status === "empty" || status === "error") && (
            <div className="border border-gold/20 bg-navy/60 px-8 py-12 text-center">
              <p className="mx-auto max-w-md font-sans text-base leading-relaxed text-white/60">
                No active listings match these filters. Adjust the criteria or speak with Carlos directly.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
              >
                Speak With Carlos →
              </a>
            </div>
          )}
        </div>

        {/* REQUIRED IDX compliance footer */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] leading-relaxed text-white/30">
            {IDX_DISCLAIMER}
            {lastUpdated ? ` Last updated: ${formatListingDate(lastUpdated)}.` : ""}
          </p>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
            {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Equal Housing Opportunity · REALTOR®
          </p>
        </div>
      </div>

      {selected && <DetailModal listing={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
