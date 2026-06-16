import { formatPrice } from "../../lib/format";
import {
  type BridgeListing,
  listingPhoto,
  listingLocality,
} from "../../lib/listings";

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
    <span className={`inline-block border px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.2em] ${colorClass}`}>
      {label}
    </span>
  );
}

/**
 * Live MLS listing card — navy theme, lazy photo, price via Intl USD.
 * When `onSelect` is provided the whole card becomes a button that opens the
 * detail view (broker + last-updated).
 */
export function ListingCard({
  listing,
  onSelect,
}: {
  listing: BridgeListing;
  onSelect?: (listing: BridgeListing) => void;
}) {
  const photo = listingPhoto(listing);
  const locality = listingLocality(listing);
  const interactive = typeof onSelect === "function";

  const inner = (
    <div className="group flex h-full flex-col overflow-hidden border border-gold/15 bg-navy/60 text-left transition-colors hover:border-gold/40">
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-navy/40">
        {photo ? (
          <img
            src={photo}
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
        <div className="flex items-start justify-between gap-2">
          <p className="font-serif text-2xl font-semibold leading-none text-white">
            {listing.ListPrice != null ? formatPrice(listing.ListPrice) : "Price on request"}
          </p>
          <StatusBadge status={listing.StandardStatus} />
        </div>

        <div>
          <p className="font-sans text-sm leading-snug text-white/80">
            {listing.UnparsedAddress ?? "Address on request"}
          </p>
          {locality && (
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70">
              {locality}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-3">
          {listing.BedroomsTotal != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">{listing.BedroomsTotal} bd</span>
          )}
          {listing.BathroomsTotalDecimal != null && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">{listing.BathroomsTotalDecimal} ba</span>
          )}
          {listing.LivingArea != null && listing.LivingArea > 0 && (
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50">{listing.LivingArea.toLocaleString()} sqft</span>
          )}
          {interactive && (
            <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.15em] text-gold/70 transition-colors group-hover:text-gold">
              Details →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (interactive) {
    return (
      <button type="button" onClick={() => onSelect!(listing)} className="block w-full">
        {inner}
      </button>
    );
  }
  return inner;
}

export function ListingSkeletonCard() {
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
