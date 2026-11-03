import { Fragment, useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search, Sparkles, X } from "lucide-react";
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

const QUICK_ZONES = ["Weston", "Coral Gables", "Brickell", "Miami Beach", "Fort Lauderdale", "Aventura", "Boca Raton", "Doral"] as const;

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
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{label}</span>
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
        className="relative my-8 w-full max-w-3xl border border-gold/35 bg-navy-deep shadow-2xl"
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
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-navy/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
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
            {psf && <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{psf}</p>}
          </div>
          <p className="mt-2 font-sans text-sm text-white/80">{listing.UnparsedAddress ?? "Address on request"}</p>
          {locality && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">{locality}</p>}

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
            className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
          >
            Ask Carlos About This Property
          </a>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] leading-relaxed text-white/70">
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

export function ListingsBrowser({
  compact = false,
  eyebrow = "Live Bridge IDX · Miami & South Florida MLS",
  heading = "Search Active South Florida MLS Listings",
  subtitle = "Live feed from the Miami and South Florida REALTORS® MLS via Bridge IDX. Filter by city, property type, price band, and bedrooms—click any property card to inspect the multi-photo gallery and underwriting details.",
}: {
  compact?: boolean;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
} = {}) {
  const [filters, setFilters] = useState<Filters>(filtersFromUrl);
  const [listings, setListings] = useState<BridgeListing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [visibleLimit, setVisibleLimit] = useState(compact ? 6 : 24);
  const [status, setStatus] = useState<Status>("loading");
  const [selected, setSelected] = useState<BridgeListing | null>(null);
  const reqId = useRef(0);
  const isFirstLoad = useRef(true);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setFilters((f) => ({ ...f, [k]: e.target.value }));

  const run = useCallback(async (f: Filters, nextPage: number, append: boolean) => {
    const id = ++reqId.current;
    setStatus(append ? "loadingMore" : "loading");
    try {
      const res = await fetch(`/.netlify/functions/listings-search?${buildQuery(f, nextPage)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as ListingsSearchResponse;
      if (id !== reqId.current) return;
      let value = json.value ?? [];
      let totalCount = json.totalCount ?? value.length;

      // Fallback to bridge-listings if default search returns empty
      if (!append && value.length === 0 && !f.q.trim()) {
        const fallbackCity = f.zone || "Weston";
        const fbRes = await fetch(`/.netlify/functions/bridge-listings?city=${encodeURIComponent(fallbackCity)}&top=24&status=${encodeURIComponent(f.status)}`);
        if (fbRes.ok) {
          const fbJson = (await fbRes.json()) as ListingsSearchResponse;
          if (fbJson.value && fbJson.value.length > 0) {
            value = fbJson.value;
            totalCount = fbJson.totalCount ?? value.length;
          }
        }
      }

      if (id !== reqId.current) return;
      setTotal(totalCount);
      setPage(nextPage);
      setListings((prev) => (append ? [...prev, ...value] : value));
      setStatus(!append && value.length === 0 ? "empty" : "ready");
    } catch {
      if (id !== reqId.current) return;
      if (!append) setStatus("error");
      else setStatus("ready");
    }
  }, []);

  useEffect(() => {
    syncUrl(filters);
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      run(filters, 1, false);
      return;
    }
    const t = window.setTimeout(() => run(filters, 1, false), 300);
    return () => window.clearTimeout(t);
  }, [filters, run]);

  const displayedListings = listings.slice(0, visibleLimit);
  const canRevealMoreInLoadedBatch = status === "ready" && visibleLimit < listings.length;
  const hasMoreFromServer = status === "ready" && listings.length < total;
  const hasActiveFilters = (Object.keys(DEFAULTS) as (keyof Filters)[]).some((k) => filters[k] !== DEFAULTS[k]);
  const lastUpdated = mostRecentModification(listings);

  return (
    <section className="scroll-mt-20 border-y border-gold/20 bg-navy-deep py-14 md:py-20" id="search">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              <Sparkles size={12} />
              {eyebrow}
            </div>
            <h2 className="mt-4 font-serif leading-tight text-white" style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.8rem)" }}>
              {heading}
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/65">
              {subtitle}
            </p>
          </div>

          {/* Quick-Select Submarket Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilters((f) => ({ ...f, zone: "" }))}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                filters.zone === ""
                  ? "border-gold bg-gold text-navy-deep font-bold"
                  : "border-white/15 bg-navy/60 text-white/75 hover:border-gold/50 hover:text-white"
              }`}
            >
              All South Florida
            </button>
            {QUICK_ZONES.map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setFilters((f) => ({ ...f, zone: f.zone === z ? "" : z }))}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  filters.zone === z
                    ? "border-gold bg-gold text-navy-deep font-bold"
                    : "border-white/15 bg-navy/60 text-white/75 hover:border-gold/50 hover:text-white"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Keyword search + Filter Console */}
        <div className="border border-white/12 bg-white/[0.03] p-4 shadow-xl backdrop-blur-sm sm:p-6">
          <div className="relative mb-4">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gold" />
            <input
              type="search"
              value={filters.q}
              onChange={set("q")}
              placeholder="Search live MLS by street address, building name, or city…"
              aria-label="Search by street address, building name, or city"
              className="w-full border border-white/15 bg-navy/70 py-3 pl-10 pr-4 font-sans text-sm text-white placeholder-white/55 focus:border-gold focus:outline-none"
            />
          </div>

          {/* Filter bar */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Area</span>
              <select value={filters.zone} onChange={set("zone")} className={selectClass()}>
                <option value="">All areas</option>
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Type</span>
              <select value={filters.type} onChange={set("type")} className={selectClass()}>
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Status</span>
              <select value={filters.status} onChange={set("status")} className={selectClass()}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Min price</span>
              <select value={filters.minPrice} onChange={set("minPrice")} className={selectClass()}>
                {PRICE_STEPS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Max price</span>
              <select value={filters.maxPrice} onChange={set("maxPrice")} className={selectClass()}>
                <option value="">No max</option>
                {PRICE_STEPS.slice(1).map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Beds</span>
              <select value={filters.beds} onChange={set("beds")} className={selectClass()}>
                {BEDS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </label>

            <label className="block col-span-2 sm:col-span-1">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-gold">Sort</span>
              <select value={filters.sort} onChange={set("sort")} className={selectClass()}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Result header */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
            {status === "loading" && "Searching live MLS…"}
            {(status === "ready" || status === "loadingMore") &&
              `${total.toLocaleString()} listing${total === 1 ? "" : "s"} matched${filters.zone ? ` in ${filters.zone}` : " across South Florida"}`}
            {status === "empty" && "0 listings matched"}
            {status === "error" && "Live MLS feed"}
            {lastUpdated && (status === "ready" || status === "loadingMore") && (
              <span className="text-white/55"> · Data current as of {lastUpdated}</span>
            )}
          </p>
          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => setFilters({ ...DEFAULTS })}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-opacity hover:opacity-75"
              >
                Reset filters
              </button>
            )}
            {compact && (
              <a
                href="/listings#search"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline decoration-gold/50 underline-offset-4 hover:text-white"
              >
                Full MLS Search Desk →
              </a>
            )}
          </div>
        </div>

        {/* Grid */}
        {status === "loading" && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ListingSkeletonCard key={i} />
            ))}
          </div>
        )}

        {(status === "ready" || status === "loadingMore") && (
          <>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayedListings.map((l, idx) => (
                <Fragment key={listingKey(l, idx)}>
                  <ListingCard listing={l} onSelect={setSelected} />
                </Fragment>
              ))}
            </div>

            {(canRevealMoreInLoadedBatch || hasMoreFromServer || status === "loadingMore") && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={status === "loadingMore"}
                  onClick={() => {
                    if (canRevealMoreInLoadedBatch) {
                      setVisibleLimit((prev) => prev + 12);
                    } else {
                      setVisibleLimit((prev) => prev + 24);
                      run(filters, page + 1, true);
                    }
                  }}
                  className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold transition-colors hover:border-gold hover:bg-gold hover:text-navy-deep disabled:opacity-50"
                >
                  {status === "loadingMore" && <Loader2 size={14} className="animate-spin" />}
                  {status === "loadingMore"
                    ? "Loading…"
                    : canRevealMoreInLoadedBatch
                      ? `Show More Listings (${displayedListings.length} of ${total.toLocaleString()})`
                      : `Load More from MLS (${listings.length} of ${total.toLocaleString()})`}
                </button>
                {compact && (
                  <a
                    href="/listings#search"
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85 transition-colors hover:border-gold hover:text-gold"
                  >
                    Open Dedicated Search Page →
                  </a>
                )}
              </div>
            )}
          </>
        )}

        {status === "empty" && (
          <div className="mt-6 border border-white/10 bg-navy/40 p-10 text-center">
            <p className="font-sans text-sm text-white/70">
              No active listings match these filters right now. Adjust your search criteria or request a custom MLS property brief directly from Carlos.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...DEFAULTS })}
                  className="border border-gold/40 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold"
                >
                  Clear filters
                </button>
              )}
              <a
                href="/buy#buyer-mandate"
                className="bg-gold px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
              >
                Request Custom MLS Property Brief →
              </a>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 border border-white/10 bg-navy/40 p-10 text-center">
            <p className="font-sans text-sm text-white/70">
              Live MLS search is refreshing — browse the Weston feed below or message Carlos on WhatsApp for a custom MLS search.
            </p>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-gold px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
            >
              WhatsApp Carlos
            </a>
          </div>
        )}

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.14em] leading-relaxed text-white/70">
          {IDX_DISCLAIMER}
          {lastUpdated && ` · Data current as of ${lastUpdated}.`}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Equal Housing Opportunity · REALTOR®
        </p>
      </div>

      {selected && <DetailModal listing={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
