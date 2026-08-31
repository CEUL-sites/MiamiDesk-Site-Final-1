import assert from "node:assert/strict";
import test from "node:test";
import { MAX_PRICE, selectTickerListings, TtlResponseCache, type RawTickerListing } from "../netlify/functions/_shared/tickerInventory";
import { loadTickerPayload } from "../netlify/functions/ticker-listings";

const valid: RawTickerListing = {
  ListingId: "A100", ListingKey: "key-a100", UnparsedAddress: "123 Main Street", City: "Weston", PostalCode: "33326",
  ListPrice: 1_200_000, BedroomsTotal: 4, BathroomsTotalDecimal: 3, LivingArea: 2_400,
  PropertyType: "Residential", PropertySubType: "Single Family Residence", StandardStatus: "Active",
  ModificationTimestamp: "2026-08-31T12:00:00.000Z", ListOfficeName: "Cooperating Brokerage",
};

test("keeps valid South Florida single-family, condominium and townhome records", () => {
  const condo = { ...valid, ListingId: "A101", ListingKey: "key-a101", City: "Miami", PropertySubType: "Condominium" };
  const townhome = { ...valid, ListingId: "A102", ListingKey: "key-a102", City: "Boca Raton", PropertySubType: "Townhouse" };
  assert.deepEqual(selectTickerListings([valid, condo, townhome]).map((l) => l.ListingId).sort(), ["A100", "A101", "A102"]);
});

test("excludes commercial, land, residential-income and unsupported residential subtypes", () => {
  const records = [
    { ...valid, PropertyType: "Commercial Sale" }, { ...valid, PropertyType: "Land/Boat Docks" },
    { ...valid, PropertyType: "Residential Income" }, { ...valid, PropertySubType: "Mobile Home" },
  ];
  assert.equal(selectTickerListings(records).length, 0);
});

test("excludes missing city, unusable address and cities outside the approved counties", () => {
  assert.equal(selectTickerListings([{ ...valid, City: "" }]).length, 0);
  assert.equal(selectTickerListings([{ ...valid, UnparsedAddress: "Address unavailable" }]).length, 0);
  assert.equal(selectTickerListings([{ ...valid, City: "Marathon" }]).length, 0);
});

test("excludes non-positive, over-cap and implausible price-per-square-foot values", () => {
  assert.equal(selectTickerListings([{ ...valid, ListPrice: 0 }]).length, 0);
  assert.equal(selectTickerListings([{ ...valid, ListPrice: MAX_PRICE + 1 }]).length, 0);
  assert.equal(selectTickerListings([{ ...valid, ListPrice: 20_000_000, LivingArea: 500 }]).length, 0);
});

test("excludes non-active or invalid-status records", () => {
  assert.equal(selectTickerListings([{ ...valid, StandardStatus: "Pending" }]).length, 0);
  assert.equal(selectTickerListings([{ ...valid, StandardStatus: "Closed" }]).length, 0);
});

test("deduplicates by stable MLS identity", () => {
  assert.equal(selectTickerListings([valid, { ...valid, UnparsedAddress: "999 Duplicate Ave" }]).length, 1);
});

test("balances deterministically instead of sorting by price-band ceilings", () => {
  const records = [
    { ...valid, ListingId: "MIA", ListingKey: "mia", City: "Miami", ListPrice: 900_000 },
    { ...valid, ListingId: "BRO", ListingKey: "bro", City: "Weston", ListPrice: 800_000 },
    { ...valid, ListingId: "PALM", ListingKey: "palm", City: "Boca Raton", ListPrice: 700_000 },
  ];
  assert.deepEqual(selectTickerListings(records, 3).map((l) => l.ListingId), ["MIA", "PALM", "BRO"]);
});

test("uses the newest listing ModificationTimestamp as data freshness", async () => {
  const response = new Response(JSON.stringify({ value: [valid, { ...valid, ListingId: "A200", ListingKey: "key-a200", ModificationTimestamp: "2026-08-30T12:00:00.000Z" }] }));
  const payload = await loadTickerPayload(async () => response, "2026-09-01T00:00:00.000Z");
  assert.equal(payload.dataFreshness, "2026-08-31T12:00:00.000Z");
  assert.notEqual(payload.dataFreshness, payload.fetchedAt);
});

test("returns an honest empty payload and propagates failed IDX requests", async () => {
  const empty = await loadTickerPayload(async () => new Response(JSON.stringify({ value: [] })), "2026-09-01T00:00:00.000Z");
  assert.equal(empty.live, false);
  assert.deepEqual(empty.value, []);
  await assert.rejects(() => loadTickerPayload(async () => new Response("failure", { status: 502 })));
});

test("suppresses inventory when the newest MLS modification is stale", async () => {
  const stale = { ...valid, ModificationTimestamp: "2026-08-20T12:00:00.000Z" };
  const payload = await loadTickerPayload(async () => new Response(JSON.stringify({ value: [stale] })), "2026-09-01T00:00:00.000Z");
  assert.equal(payload.live, false);
  assert.deepEqual(payload.value, []);
  assert.equal(payload.error, "stale_inventory");
});

test("cache expires at the configured boundary", () => {
  const cache = new TtlResponseCache();
  cache.set("payload", 1_000, 10_000);
  assert.equal(cache.get(10_999), "payload");
  assert.equal(cache.get(11_000), null);
});
