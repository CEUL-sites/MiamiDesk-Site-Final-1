import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CurrentOpportunitiesView, type OpportunityListing } from "../src/components/MLSTicker";

const listing: OpportunityListing = {
  ListingId: "A100", ListingKey: "key-a100", UnparsedAddress: "123 Main Street", City: "Weston", PostalCode: "33326",
  ListPrice: 1_200_000, BedroomsTotal: 4, BathroomsTotalDecimal: 3, LivingArea: 2_400,
  PropertySubType: "Single Family Residence", StandardStatus: "Active", ModificationTimestamp: "2026-08-31T12:00:00.000Z",
  ListOfficeName: "Cooperating Brokerage",
};

test("unavailable state contains no static property address or price and has the private-search CTA", () => {
  const html = renderToStaticMarkup(<CurrentOpportunitiesView status="unavailable" listings={[]} dataFreshness={null} />);
  assert.match(html, /Request a Private South Florida Property Search/);
  assert.match(html, /No sample addresses or prices are being displayed/);
  assert.doesNotMatch(html, /123 Main Street|\$1,200,000/);
});

test("ready state exposes MLS identity, listing-office attribution and honest freshness", () => {
  const html = renderToStaticMarkup(<CurrentOpportunitiesView status="ready" listings={[listing]} dataFreshness={listing.ModificationTimestamp} />);
  assert.match(html, /MLS #A100/);
  assert.match(html, /Listed by Cooperating Brokerage/);
  assert.match(html, /Most recent MLS record modification/);
});

test("module is responsive and static for mobile and reduced-motion users", () => {
  const html = renderToStaticMarkup(<CurrentOpportunitiesView status="ready" listings={[listing]} dataFreshness={listing.ModificationTimestamp} />);
  assert.match(html, /sm:grid-cols-2/);
  assert.match(html, /lg:grid-cols-3/);
  assert.doesNotMatch(html, /animation|marquee|aria-label="Pause"/i);
});
