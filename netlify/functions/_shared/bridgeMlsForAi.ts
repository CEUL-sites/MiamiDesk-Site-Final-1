import type { AiDeskIntent } from "./aiDeskIntentRouter";

const getBridgeToken = () => (process.env.BRIDGE_API_TOKEN ?? "").trim();
const getBridgeBase = () => {
  const dataset = (process.env.BRIDGE_DATASET ?? "miamire").trim();
  return (process.env.BRIDGE_BASE_URL ?? `https://api.bridgedataoutput.com/api/v2/OData/${dataset}/Property`).trim();
};

type BridgeRecord = Record<string, unknown>;

export type SafeMlsRecord = {
  mlsNumber?: string;
  address?: string;
  city?: string;
  subdivision?: string;
  propertyType?: string;
  status?: string;
  listPrice?: number;
  soldPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  yearBuilt?: number;
  daysOnMarket?: number;
  publicRemarks?: string;
  listingPhotoUrl?: string;
  listingPageUrl?: string;
};

export type AiMlsContext = {
  used: boolean;
  available: boolean;
  contextType: AiDeskIntent["mlsNeed"];
  city?: string;
  records: SafeMlsRecord[];
  summary: string;
  disclaimer: string;
};

const DISCLAIMER =
  "MLS information is deemed reliable but not guaranteed and is subject to change, prior sale, withdrawal, price change, correction, or MLS update. Carlos can verify the details directly.";

const NO_DATA =
  "I do not have confirmed MLS data for that request at this moment. Carlos can review the MLS directly and respond with verified information.";

const escapeOData = (value: string) => value.replace(/'/g, "''");

const numericFilter = (field: string, value?: number, operator: "ge" | "le" = "ge") =>
  value && Number.isFinite(value) ? `${field} ${operator} ${Math.round(value)}` : undefined;

const buildFilters = (intent: AiDeskIntent, status: string) => {
  const filters = [`StandardStatus eq '${escapeOData(status)}'`];

  if (intent.city) filters.push(`City eq '${escapeOData(intent.city)}'`);
  if (intent.propertyType) filters.push(`PropertyType eq '${escapeOData(intent.propertyType)}'`);

  const min = numericFilter("ListPrice", intent.budgetMin, "ge");
  const max = numericFilter("ListPrice", intent.budgetMax, "le");
  if (min) filters.push(min);
  if (max) filters.push(max);

  return filters.join(" and ");
};

const pickPhotoUrl = (media: unknown) => {
  if (!Array.isArray(media)) return undefined;
  const first = media.find((item) => item && typeof item === "object") as BridgeRecord | undefined;
  const url = first?.MediaURL ?? first?.MediaUrl ?? first?.ThumbnailURL ?? first?.ThumbnailUrl;
  return typeof url === "string" ? url : undefined;
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toStringValue = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

const sanitizeRecord = (record: BridgeRecord): SafeMlsRecord => ({
  mlsNumber: toStringValue(record.ListingId) ?? toStringValue(record.MlsStatus),
  address: toStringValue(record.UnparsedAddress),
  city: toStringValue(record.City),
  subdivision: toStringValue(record.SubdivisionName) ?? toStringValue(record.MLSAreaMajor),
  propertyType: toStringValue(record.PropertyType),
  status: toStringValue(record.StandardStatus),
  listPrice: toNumber(record.ListPrice),
  soldPrice: toNumber(record.ClosePrice),
  bedrooms: toNumber(record.BedroomsTotal),
  bathrooms: toNumber(record.BathroomsTotalInteger) ?? toNumber(record.BathroomsTotalDecimal),
  squareFeet: toNumber(record.LivingArea),
  lotSize: toNumber(record.LotSizeSquareFeet),
  yearBuilt: toNumber(record.YearBuilt),
  daysOnMarket: toNumber(record.DaysOnMarket),
  publicRemarks: toStringValue(record.PublicRemarks),
  listingPhotoUrl: pickPhotoUrl(record.Media),
  listingPageUrl: toStringValue(record.ListingURL) ?? toStringValue(record.VirtualTourURLUnbranded),
});

const describeRecords = (records: SafeMlsRecord[]) => {
  if (records.length === 0) return NO_DATA;

  return records
    .map((record, index) => {
      const facts = [
        `${index + 1}. ${record.status ?? "Status not shown"}`,
        record.address ? `address: ${record.address}` : undefined,
        record.city ? `city: ${record.city}` : undefined,
        record.subdivision ? `subdivision: ${record.subdivision}` : undefined,
        record.propertyType ? `type: ${record.propertyType}` : undefined,
        record.listPrice ? `list price: $${record.listPrice.toLocaleString()}` : undefined,
        record.soldPrice ? `sold price: $${record.soldPrice.toLocaleString()}` : undefined,
        record.bedrooms ? `${record.bedrooms} beds` : undefined,
        record.bathrooms ? `${record.bathrooms} baths` : undefined,
        record.squareFeet ? `${record.squareFeet.toLocaleString()} sq ft` : undefined,
        record.daysOnMarket ? `${record.daysOnMarket} days on market` : undefined,
      ].filter(Boolean);
      return facts.join("; ");
    })
    .join("\n");
};

const statusesForIntent = (intent: AiDeskIntent) => {
  if (intent.mlsNeed === "seller_context") return ["Active", "Pending", "Closed"];
  if (intent.mlsNeed === "buyer_search" || intent.mlsNeed === "investor_context") return ["Active"];
  if (intent.mlsNeed === "general_market") return ["Active"];
  return [];
};

export const getBridgeMlsContextForAi = async (intent: AiDeskIntent): Promise<AiMlsContext> => {
  if (intent.mlsNeed === "none" || !intent.city) {
    return { used: false, available: false, contextType: intent.mlsNeed, city: intent.city, records: [], summary: "No MLS lookup needed yet.", disclaimer: DISCLAIMER };
  }

  const token = getBridgeToken();
  if (!token) {
    return { used: true, available: false, contextType: intent.mlsNeed, city: intent.city, records: [], summary: NO_DATA, disclaimer: DISCLAIMER };
  }

  const selectedFields = [
    "ListingId",
    "UnparsedAddress",
    "City",
    "SubdivisionName",
    "MLSAreaMajor",
    "PropertyType",
    "StandardStatus",
    "ListPrice",
    "ClosePrice",
    "BedroomsTotal",
    "BathroomsTotalInteger",
    "BathroomsTotalDecimal",
    "LivingArea",
    "LotSizeSquareFeet",
    "YearBuilt",
    "DaysOnMarket",
    "PublicRemarks",
    "Media",
    "ListingURL",
    "VirtualTourURLUnbranded",
  ].join(",");

  const records: SafeMlsRecord[] = [];

  for (const status of statusesForIntent(intent)) {
    const params = new URLSearchParams({
      access_token: token,
      $filter: buildFilters(intent, status),
      $orderby: status === "Closed" ? "CloseDate desc" : "ListPrice desc",
      $top: intent.mlsNeed === "seller_context" ? "4" : "6",
      $select: selectedFields,
    });

    try {
      const response = await fetch(`${getBridgeBase()}?${params.toString()}`);
      if (!response.ok) {
        console.error(`[ai-desk] Bridge MLS lookup failed with status ${response.status}`);
        continue;
      }

      const data = await response.json();
      const value = Array.isArray(data?.value) ? data.value : [];
      records.push(...value.map((record: BridgeRecord) => sanitizeRecord(record)));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Bridge lookup error";
      console.error("[ai-desk] Bridge MLS lookup error:", message);
    }
  }

  const limitedRecords = records.slice(0, 10);
  const summary = describeRecords(limitedRecords);

  return {
    used: true,
    available: limitedRecords.length > 0,
    contextType: intent.mlsNeed,
    city: intent.city,
    records: limitedRecords,
    summary,
    disclaimer: DISCLAIMER,
  };
};
