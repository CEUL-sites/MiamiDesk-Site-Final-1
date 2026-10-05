import { isMlsFresh } from "../lib/mlsFreshness";
import { fetchMls, isMlsPrerender, watchMlsRefresh } from "../lib/liveMlsRefresh";
import { Fragment, useEffect, useState } from "react";
import { CONTACT } from "../constants";
import { JsonLd } from "./SEO/JsonLd";
import {
  type BridgeListing,
  type ListingsSearchResponse,
  listingKey,
  mostRecentModification,
  formatListingDate,
  IDX_DISCLAIMER,
} from "../lib/listings";
import { ListingCard, ListingSkeletonCard } from "./listings/ListingCard";

const MAX_CARDS = 6;

/**
 * Live sample of a city's active MLS listings, fetched through the
 * listings-search Bridge proxy (server token stays server-side). Renders up to
 * six cards with graceful empty/error states, an ItemList for SEO, and the
 * required IDX disclaimer.
 *
 *  - `city`  display name shown in the heading
 *  - `zone`  Bridge City value to query (defaults to `city`); pass a broader
 *            municipality for neighborhoods Bridge files under a parent city
 *            (e.g. Brickell / Downtown Miami → "Miami")
 */
export function CityListingsSample({
  city,
  zone,
  propertyType,
  sellerContext = false,
}: {
  city: string;
  zone?: string;
  propertyType?: "Residential";
  sellerContext?: boolean;
}) {
  const queryZone = zone ?? city;
  const [listings, setListings] = useState<BridgeListing[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");

  useEffect(() => {
    if (isMlsPrerender()) return;
    let cancelled = false;
    const params = new URLSearchParams({ zone: queryZone, status: "Active" });
    if (propertyType) params.set("type", propertyType);

    const load = () => fetchMls(`/.netlify/functions/listings-search?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ListingsSearchResponse>;
      })
      .then((json) => {
        if (cancelled) return;
        if (!isMlsFresh(json.lastUpdated)) throw new Error("Expired MLS response");
        const value = (json.value ?? []).slice(0, MAX_CARDS);
        setListings(value);
        setStatus(value.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!cancelled) { setListings([]); setStatus("error"); }
      });

    void load();
    const stop = watchMlsRefresh(() => { void load(); }, () => { setListings([]); setStatus("loading"); });
    return () => { cancelled = true; stop(); };
  }, [queryZone, propertyType]);

  // Fail quietly — never show a broken section on a marketing page.
  if (status === "error" || status === "empty") return null;

  const lastUpdated = mostRecentModification(listings);

  const itemListSchema =
    status === "ready"
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: sellerContext ? `Active properties for sale in ${city}` : `Active listings in ${city}`,
          numberOfItems: listings.length,
          itemListElement: listings.map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Residence",
              name: l.UnparsedAddress || `${city} property`,
              address: {
                "@type": "PostalAddress",
                addressLocality: l.City || city,
                postalCode: l.PostalCode,
                addressRegion: l.StateOrProvince || "FL",
              },
              ...(l.ListPrice != null
                ? { offers: { "@type": "Offer", price: l.ListPrice, priceCurrency: "USD" } }
                : {}),
            },
          })),
        }
      : null;

  return (
    <section className="bg-navy-deep py-14 md:py-20">
      {itemListSchema && (
        <JsonLd id={`city-listings-${queryZone.toLowerCase().replace(/\s+/g, "-")}`} data={itemListSchema} />
      )}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Live MLS · {city}</p>
            <h2 className="mt-3 font-serif leading-tight text-white" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}>
              {sellerContext ? `Active properties for sale in ${city}` : `Active listings in ${city} right now`}
            </h2>
          </div>
          <a
            href="/listings"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 transition-colors hover:text-white"
          >
            Search all listings →
          </a>
        </div>

        {status === "loading" ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <ListingSkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((l, i) => (
              <Fragment key={listingKey(l, i)}>
                <ListingCard listing={l} />
              </Fragment>
            ))}
          </div>
        )}

        {/* Distribution argument, tied to this city's seller */}
        {status === "ready" && (
          <p className="mt-8 max-w-3xl font-sans text-sm leading-relaxed text-white/55">
            {sellerContext
              ? `A sample of active residential properties for sale in ${city}; these are not necessarily comparable to your home. We review matching property type, location, condition and terms before recommending a price — `
              : `These are buyers' agents' search results today. To see how your ${city} property compares — `}{" "}
            <a href="/home-value" className="text-gold underline underline-offset-4 hover:text-white">
              find out where your home fits →
            </a>
          </p>
        )}

        <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.12em] leading-relaxed text-white/70">
          {IDX_DISCLAIMER}
          {lastUpdated ? ` Last updated: ${formatListingDate(lastUpdated)}.` : ""}{" "}
          {CONTACT.licenseDisplay} · Equal Housing Opportunity · REALTOR®
        </p>
      </div>
    </section>
  );
}
