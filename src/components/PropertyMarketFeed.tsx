import { useEffect, useState, Fragment } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface BridgeListing {
  ListingId?: string;
  ListingKey?: string;
  UnparsedAddress?: string;
  City?: string;
  PostalCode?: string;
  ListPrice?: number;
  BedroomsTotal?: number;
  BathroomsTotalDecimal?: number;
  LivingArea?: number;
  PropertyType?: string;
  StandardStatus?: string;
  DaysOnMarket?: number;
  ListOfficeName?: string;
  Media?: { MediaURL?: string }[];
}

interface MarketFeedResponse {
  value: BridgeListing[];
  lastUpdated: string | null;
  listingCount?: number;
  stale?: boolean;
  message?: string;
  disclaimer?: string;
}

// ── Price formatter ────────────────────────────────────────────────────────────

function formatListPrice(price: number | undefined): string {
  if (price == null) return "—";
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  const k = price / 1_000;
  return `$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace(/\.?0+$/, "")}K`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden border border-gold/15 bg-navy/60" aria-hidden="true">
      <div className="h-48 w-full animate-pulse bg-white/8" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
        <div className="h-7 w-32 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-full animate-pulse rounded bg-white/10" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="mt-2 flex gap-3">
          <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-12 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string | undefined }) {
  const isActive = status?.toLowerCase() === "active";
  const isPending = status?.toLowerCase() === "pending";
  const label = status ?? "Active";
  const colorClass = isPending
    ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
    : isActive
    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    : "bg-white/10 text-white/50 border-white/15";

  return (
    <span
      className={`inline-block border px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.2em] ${colorClass}`}
    >
      {label}
    </span>
  );
}

function ListingCard({ listing }: { listing: BridgeListing }) {
  const key = listing.ListingKey ?? listing.ListingId ?? "";
  const mediaUrl = listing.Media?.[0]?.MediaURL;

  return (
    <div
      key={key}
      className="group flex flex-col overflow-hidden border border-gold/15 bg-navy/60 transition-colors hover:border-gold/30"
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-navy/40">
        {mediaUrl ? (
          <img
            src={mediaUrl}
            alt={listing.UnparsedAddress ?? "Property photo"}
            loading="lazy"
            width="400"
            height="192"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy/30">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
              Photo unavailable
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/80 to-transparent" />
        {listing.PropertyType && (
          <div className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[7px] uppercase tracking-[0.18em] text-navy">
            {listing.PropertyType}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Price + status */}
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-2xl font-semibold text-white leading-none">
            {formatListPrice(listing.ListPrice)}
          </p>
          <StatusBadge status={listing.StandardStatus} />
        </div>

        {/* Address */}
        <div>
          <p className="font-sans text-sm leading-snug text-white/80">
            {listing.UnparsedAddress ?? "Address on request"}
          </p>
          {(listing.City || listing.PostalCode) && (
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mt-1">
              {[listing.City, listing.PostalCode].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        {/* Stats row */}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-3">
          {listing.BedroomsTotal != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">
              {listing.BedroomsTotal} bd
            </span>
          )}
          {listing.BathroomsTotalDecimal != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">
              {listing.BathroomsTotalDecimal} ba
            </span>
          )}
          {listing.LivingArea != null && listing.LivingArea > 0 && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">
              {listing.LivingArea.toLocaleString()} sqft
            </span>
          )}
          {listing.DaysOnMarket != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/35 ml-auto">
              {listing.DaysOnMarket}d on mkt
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PropertyMarketFeed() {
  const [data, setData] = useState<MarketFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/.netlify/functions/market-feed");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: MarketFeedResponse = await res.json();
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setFetchError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const isStale = data?.stale === true || fetchError;
  const listings: BridgeListing[] = data?.value ?? [];

  return (
    <section className="bg-navy-deep py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
            Weekly Feed · Weston, FL · Single-Family Residences
          </p>
          <h2
            className="mt-4 font-serif text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
          >
            Weston Market · Active Listings · $850K–$1.2M
          </h2>

          {/* Last updated */}
          {!loading && data?.lastUpdated && !isStale && (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Last updated: {formatDate(data.lastUpdated)}
            </p>
          )}
        </div>

        {/* Loading: 6 skeleton cards */}
        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Stale / error state */}
        {!loading && isStale && (
          <div className="border border-gold/20 bg-navy/60 px-8 py-10 text-center">
            <p className="font-sans text-base text-white/60">
              Market feed temporarily unavailable. Request a private property review.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 border border-gold/40 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              Request Private Property Review
            </a>
          </div>
        )}

        {/* Listings grid */}
        {!loading && !isStale && listings.length > 0 && (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {listings.slice(0, 12).map((listing, idx) => (
                <Fragment key={listing.ListingKey ?? listing.ListingId ?? listing.UnparsedAddress ?? String(idx)}>
                  <ListingCard listing={listing} />
                </Fragment>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                Showing {listings.length} active listing{listings.length !== 1 ? "s" : ""} ·
                Weston, FL · $850K–$1.2M
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
              >
                Request Private Analysis →
              </a>
            </div>
          </>
        )}

        {/* Empty state (no stale, no error, but 0 results) */}
        {!loading && !isStale && listings.length === 0 && (
          <div className="border border-gold/20 bg-navy/60 px-8 py-10 text-center">
            <p className="font-sans text-sm text-white/50">
              No active listings in this range at the moment.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-gold px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-navy transition-opacity hover:opacity-90"
            >
              Request Private Analysis →
            </a>
          </div>
        )}

        {/* IDX Disclaimer */}
        {data?.disclaimer && (
          <p className="mt-8 font-mono text-[8px] uppercase tracking-[0.12em] leading-relaxed text-white/25">
            {data.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
