import { Fragment, useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react";
import { CONTACT } from "../../constants";
import { formatPrice } from "../../lib/format";
import {
  type BridgeListing,
  type ListingsSearchResponse,
  listingKey,
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

const STATUSES = [
  { value: "Active", label: "For sale" },
  { value: "Pending", label: "Under contract" },
];

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
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
  q: string;
  zone: string;
  type: string;
  status: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  sort: string;
}

const DEFAULTS: Filters = {
  q: "", zone: "", type: "", status: "Active", minPrice: "", maxPrice: "", beds: "", sort: "newest",
};

const PER_PAGE = 24;

// ── URL <-> filter state (shareable, bookmarkable searches) ────────────────
function filtersFromUrl(): Filters {
  if (typeof window === "undefined") return { ...DEFAULTS };
  const p = new URLSearchParams(window.location.search);
  const next = { ...DEFAULTS };
  (Object.keys(DEFAULTS) as (keyof Filters)[]).forEach((k) => {
    const v = p.get(k);
    if (v != null) next[k] = v;
  });
  return next;
}

function syncUrl(filters: Filters) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  (Object.keys(filters) as (keyof Filters)[]).forEach((k) => {
    if (filters[k] && filters[k] !== DEFAULTS[k]) p.set(k, filters[k]);
  });
  const qs = p.toString();
  // Only anchor to #search when an actual search is active, so a clean
  // /listings load (and reloads) don't jump past the hero.
  const url = `${window.location.pathname}${qs ? `?${qs}#search` : ""}`;
  window.history.replaceState(null, "", url);
}

function buildQuery(filters: Filters, page: number): string {
  const p = new URLSearchParams({ status: filters.status, sort: filters.sort, page: String(page) });
  if (filters.q.trim()) p.set("q", filters.q.trim());
  if (filters.zone) p.set("zone", filters.zone);
  if (filters.type) p.set("type", filters.type);
  if (filters.minPrice) p.set("minPrice", filters.minPrice);
  if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
  if (filters.beds) p.set("beds", filters.beds);
  return p.toString();
}

function selectClass() {
  return "w-full appearance-none border border-white/15 bg-navy/60 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 focus:border-gold focus:outline-none";
}

// ── Detail modal with photo gallery ────────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{label}</span>
      <span className="text-right font-sans text-sm text-white/85">{value}</span>
    </div>
  );
}

function DetailModal({ listing, onClose }: { listing: BridgeListing; onClose: () => void }) {
  const photos = (listing.Media ?? []).map((m) => m.MediaURL).filter(Boolean).slice(0, 12) as string[];
  const [idx, setIdx] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && photos.length > 1) setIdx((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft" && photos.length > 1) setIdx((i) => (i - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    // Lock background scroll + move focus into the dialog.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, photos.length]);

  const locality = listingLocality(listing);
  const psf =
    listing.ListPrice && listing.LivingArea && listing.LivingArea > 0
      ? `${formatPrice(Math.round(listing.ListPrice / listing.LivingArea))}/sqft`
      : null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-deep/85 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={listing.UnparsedAddress ?? "Listing detail"}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl border border-gold/25 bg-navy-deep shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center bg-navy/80 text-white/70 transition-colors hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <X size={18} />
        </button>

        {/* Gallery */}
        {photos.length > 0 && (
          <div className="relative h-64 w-full bg-navy/40 sm:h-80">
            <img src={photos[idx]} alt={`${listing.UnparsedAddress ?? "Property"} — photo ${idx + 1}`} className="h-full w-full object-cover" />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-navy/70 text-white/80 transition-colors hover:text-gold"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setIdx((i) => (i + 1) % photos.length)}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-navy/70 text-white/80 transition-colors hover:text-gold"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-navy/70 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-white/70">
                  {idx + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-serif text-3xl font-semibold text-white">
              {listing.ListPrice != null ? formatPrice(listing.ListPrice) : "Price on request"}
            </p>
            {psf && <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70">{psf}</p>}
          </div>
          <p className="mt-2 font-sans text-sm text-white/80">{listing.UnparsedAddress ?? "Address on request"}</p>
          {locality && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70">{locality}</p>}

          <div className="mt-6">
            {listing.PropertyType && <DetailRow label="Type" value={listing.PropertyType} />}
            {listing.StandardStatus && <DetailRow label="Status" value={listing.StandardStatus} />}
            {listing.BedroomsTotal != null && <DetailRow label="Bedrooms" value={String(listing.BedroomsTotal)} />}
            {listing.BathroomsTotalDecimal != null && <DetailRow label="Bathrooms" value={String(listing.BathroomsTotalDecimal)} />}
            {listing.LivingArea != null && listing.LivingArea > 0 && (
              <DetailRow label="Living area" value={`${listing.LivingArea.toLocaleString()} sqft`} />
            )}
            {listing.DaysOnMarket != null && <DetailRow label="Days on market" value={String(listing.DaysOnMarket)} />}
            {listing.ListingId && <DetailRow label="MLS #" value={listing.ListingId} />}
            {listing.ListOfficeName && <DetailRow label="Listing brokerage" value={listing.ListOfficeName} />}
            {listing.ModificationTimestamp && <DetailRow label="Last updated" value={formatListingDate(listing.ModificationTimestamp)} />}
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

// ── Main browser ───────────────────────────────────────────────────────────
type Status = "loading" | "loadingMore" | "ready" | "empty" | "error";

export function ListingsBrowser() {
  const [filters, setFilters] = useState<Filters>(filtersFromUrl);
  const [listings, setListings] = useState<BridgeListing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<Status>("loading");
  const [selected, setSelected] = useState<BridgeListing | null>(null);
  const reqId = useRef(0);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setFilters((f) => ({ ...f, [k]: e.target.value }));

  const run = useCallback(async (f: Filters, nextPage: number, append: boolean) => {
    const id = ++reqId.current;
    setStatus(append ? "loadingMore" : "loading");
    try {
      const res = await fetch(`/.netlify/functions/listings-search?${buildQuery(f, nextPage)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as ListingsSearchResponse;
      if (id !== reqId.current) return; // a newer request superseded this one
      const value = json.value ?? [];
      setTotal(json.totalCount ?? value.length);
      setPage(nextPage);
      setListings((prev) => (append ? [...prev, ...value] : value));
      setStatus(!append && value.length === 0 ? "empty" : "ready");
    } catch {
      if (id !== reqId.current) return;
      if (!append) setStatus("error");
      else setStatus("ready"); // keep what we have; a failed "load more" is non-fatal
    }
  }, []);

  // Debounced fresh search whenever filters change; also keep the URL in sync.
  useEffect(() => {
    syncUrl(filters);
    const t = window.setTimeout(() => run(filters, 1, false), 400);
    return () => window.clearTimeout(t);
  }, [filters, run]);

  const hasMore = status === "ready" && listings.length < total;
  const hasActiveFilters = (Object.keys(DEFAULTS) as (keyof Filters)[]).some((k) => filters[k] !== DEFAULTS[k]);
  const lastUpdated = mostRecentModification(listings);

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

        {/* Keyword search */}
        <div className="relative mb-3">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gold/70" />
          <input
            type="search"
            value={filters.q}
            onChange={set("q")}
            placeholder="Search by address, building, or city…"
            aria-label="Search listings by address, building, or city"
            className="w-full border border-white/15 bg-navy/60 py-3 pl-10 pr-4 font-sans text-sm text-white placeholder:text-white/35 focus:border-gold focus:outline-none"
          />
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
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
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Status</label>
            <select className={selectClass()} value={filters.status} onChange={set("status")}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
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
          <div>
            <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">Sort</label>
            <select className={selectClass()} value={filters.sort} onChange={set("sort")}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Result summary / reset */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
            {status === "loading"
              ? "Searching…"
              : status === "empty" || status === "error"
              ? "0 listings"
              : `Showing ${listings.length.toLocaleString()} of ${total.toLocaleString()} listing${total !== 1 ? "s" : ""}`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => setFilters({ ...DEFAULTS })}
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

          {(status === "ready" || status === "loadingMore") && (
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

          {/* Load more */}
          {(hasMore || status === "loadingMore") && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                disabled={status === "loadingMore"}
                onClick={() => run(filters, page + 1, true)}
                className="inline-flex items-center gap-2 border border-gold/40 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy disabled:opacity-60"
              >
                {status === "loadingMore" ? <Loader2 size={15} className="animate-spin" /> : null}
                {status === "loadingMore" ? "Loading…" : "Load more listings"}
              </button>
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
