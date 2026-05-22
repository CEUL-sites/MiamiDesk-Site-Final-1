import { useEffect, useState } from "react";
import type { CityConfig } from "../config/cityMarkets";

export interface FeaturedListing {
  ListingKey: string;
  ListPrice: number;
  UnparsedAddress: string;
  City: string;
  BedroomsTotal: number | null;
  BathroomsTotalInteger: number | null;
  LivingArea: number | null;
  MediaURL: string | null;
  PropertyType: string;
}

export interface CityMarketData {
  activeListings: number | null;
  medianListPrice: number | null;
  avgDaysOnMarket: number | null;
  avgPricePerSqft: number | null;
  residentialCount: number | null;
  condoCount: number | null;
  featuredListings: FeaturedListing[];
  lastUpdated: string | null;
}

interface RawListing {
  ListingKey?: string;
  ListingId?: string;
  ListPrice?: number;
  UnparsedAddress?: string;
  City?: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  PropertyType?: string;
  DaysOnMarket?: number;
  Media?: { MediaURL?: string }[];
}

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

const EMPTY: CityMarketData = {
  activeListings: null,
  medianListPrice: null,
  avgDaysOnMarket: null,
  avgPricePerSqft: null,
  residentialCount: null,
  condoCount: null,
  featuredListings: [],
  lastUpdated: null,
};

export function useCityMarket(config: CityConfig | undefined): {
  data: CityMarketData;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<CityMarketData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!config) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(EMPTY);

    (async () => {
      try {
        const params = new URLSearchParams({
          city: config.bridgeCity,
          top: "50",
          status: "Active",
        });
        if (config.bridgeMlsArea) {
          params.set("mlsArea", config.bridgeMlsArea);
        }

        const res = await fetch(`/.netlify/functions/bridge-listings?${params.toString()}`);
        if (!res.ok) throw new Error(`API ${res.status}`);

        const json = await res.json();
        if (cancelled) return;

        const listings: RawListing[] = json?.value ?? [];
        const lastUpdated: string = json?.lastUpdated ?? null;

        if (listings.length === 0) {
          setData({ ...EMPTY, lastUpdated });
          setLoading(false);
          return;
        }

        const prices = listings
          .map((l) => l.ListPrice)
          .filter((p): p is number => typeof p === "number" && p > 0);

        const dom = listings
          .map((l) => l.DaysOnMarket)
          .filter((d): d is number => typeof d === "number");

        const psf = listings
          .filter((l) => typeof l.ListPrice === "number" && typeof l.LivingArea === "number" && (l.LivingArea ?? 0) > 0)
          .map((l) => (l.ListPrice as number) / (l.LivingArea as number));

        const residentialCount = listings.filter(
          (l) => l.PropertyType?.toLowerCase().includes("residential") || l.PropertyType?.toLowerCase().includes("single")
        ).length;

        const condoCount = listings.filter(
          (l) => l.PropertyType?.toLowerCase().includes("condo") || l.PropertyType?.toLowerCase().includes("condominium")
        ).length;

        const sortedByPrice = [...listings]
          .filter((l) => typeof l.ListPrice === "number")
          .sort((a, b) => (b.ListPrice as number) - (a.ListPrice as number));

        const featuredListings: FeaturedListing[] = sortedByPrice.slice(0, 3).map((l) => ({
          ListingKey: l.ListingKey ?? l.ListingId ?? String(Math.random()),
          ListPrice: l.ListPrice ?? 0,
          UnparsedAddress: l.UnparsedAddress ?? "",
          City: l.City ?? config.name,
          BedroomsTotal: l.BedroomsTotal ?? null,
          BathroomsTotalInteger: l.BathroomsTotalInteger ?? null,
          LivingArea: l.LivingArea ?? null,
          MediaURL: l.Media?.[0]?.MediaURL ?? null,
          PropertyType: l.PropertyType ?? "",
        }));

        setData({
          activeListings: listings.length,
          medianListPrice: prices.length ? Math.round(median(prices)) : null,
          avgDaysOnMarket: dom.length ? Math.round(average(dom)) : null,
          avgPricePerSqft: psf.length ? Math.round(average(psf)) : null,
          residentialCount,
          condoCount,
          featuredListings,
          lastUpdated,
        });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          setData(EMPTY);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [config?.slug]);

  return { data, loading, error };
}
