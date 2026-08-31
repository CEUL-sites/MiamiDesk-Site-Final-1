import { Fragment, useEffect, useState } from "react";
import { CONTACT } from "../constants";
import { formatPrice } from "../lib/format";
import { IDX_DISCLAIMER } from "../lib/listings";

const TICKER_API = "/.netlify/functions/ticker-listings";

export interface OpportunityListing {
  ListingId: string;
  ListingKey: string;
  UnparsedAddress: string;
  City: string;
  PostalCode: string;
  ListPrice: number;
  BedroomsTotal: number | null;
  BathroomsTotalDecimal: number | null;
  LivingArea: number | null;
  PropertySubType: string;
  StandardStatus: "Active";
  ModificationTimestamp: string;
  ListOfficeName: string;
}

interface TickerResponse {
  value?: OpportunityListing[];
  live?: boolean;
  dataFreshness?: string | null;
}

function formatFreshness(iso: string): string {
  const value = Date.parse(iso);
  if (Number.isNaN(value)) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(value));
}

function OpportunityCard({ listing }: { listing: OpportunityListing }) {
  const type = listing.PropertySubType === "Single Family Residence" ? "Single-family" : listing.PropertySubType;
  return (
    <article className="flex min-w-0 flex-col border border-white/10 bg-[#111F38] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="font-serif text-xl font-semibold text-gold">{formatPrice(listing.ListPrice)}</p>
        <span className="bg-emerald-500/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300">Active</span>
      </div>
      <p className="mt-3 font-sans text-sm font-medium leading-snug text-white">{listing.UnparsedAddress}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
        {listing.City}, FL {listing.PostalCode}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
        {listing.BedroomsTotal != null && <span>{listing.BedroomsTotal} bd</span>}
        {listing.BathroomsTotalDecimal != null && <span>{listing.BathroomsTotalDecimal} ba</span>}
        {listing.LivingArea != null && <span>{listing.LivingArea.toLocaleString()} sf</span>}
        <span>{type}</span>
      </div>
      <p className="mt-3 font-mono text-[10px] leading-relaxed text-white/60">
        MLS #{listing.ListingId || listing.ListingKey}
        {listing.ListOfficeName ? ` · Listed by ${listing.ListOfficeName}` : " · Listing brokerage available on request"}
      </p>
    </article>
  );
}

export function CurrentOpportunitiesView({ status, listings, dataFreshness }: {
  status: "loading" | "ready" | "unavailable";
  listings: OpportunityListing[];
  dataFreshness: string | null;
}) {
  return (
    <section className="w-full bg-[#0A1628] py-8 sm:py-10" aria-labelledby="current-opportunities-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Residential IDX sample</p>
            <h2 id="current-opportunities-title" className="mt-2 font-serif text-2xl text-white sm:text-3xl">Current South Florida Opportunities</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              A concise sample of active single-family, condominium and townhome opportunities across Miami-Dade, Broward and Palm Beach.
            </p>
          </div>
          <a href="/listings" className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 hover:text-white">
            Search all South Florida listings →
          </a>
        </div>
        {status === "loading" && (
          <p className="mt-6 border border-white/10 bg-[#111F38] px-5 py-8 text-sm text-white/70" role="status">Checking current MLS inventory…</p>
        )}
        {status === "ready" && (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Fragment key={listing.ListingKey || listing.ListingId}>
                  <OpportunityCard listing={listing} />
                </Fragment>
              ))}
            </div>
            {dataFreshness && (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                Most recent MLS record modification: {formatFreshness(dataFreshness)}
              </p>
            )}
          </>
        )}
        {status === "unavailable" && (
          <div className="mt-6 border border-gold/20 bg-[#111F38] px-6 py-8 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="max-w-2xl text-sm leading-relaxed text-white/70">
              Current MLS inventory is temporarily unavailable. No sample addresses or prices are being displayed.
            </p>
            <a href="/contact" className="mt-5 inline-flex bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.17em] text-navy sm:mt-0">
              Request a Private South Florida Property Search
            </a>
          </div>
        )}
        <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] leading-relaxed text-white/60">
          {IDX_DISCLAIMER} {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Equal Housing Opportunity.
        </p>
      </div>
    </section>
  );
}

export function MLSTicker() {
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [listings, setListings] = useState<OpportunityListing[]>([]);
  const [dataFreshness, setDataFreshness] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(TICKER_API)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<TickerResponse>;
      })
      .then((json) => {
        if (cancelled) return;
        const value = Array.isArray(json.value) ? json.value : [];
        if (json.live !== true || value.length === 0 || !json.dataFreshness) {
          setStatus("unavailable");
          return;
        }
        setListings(value);
        setDataFreshness(json.dataFreshness);
        setStatus("ready");
      })
      .catch(() => { if (!cancelled) setStatus("unavailable"); });
    return () => { cancelled = true; };
  }, []);
  return <CurrentOpportunitiesView status={status} listings={listings} dataFreshness={dataFreshness} />;
}
