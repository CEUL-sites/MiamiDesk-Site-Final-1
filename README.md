<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/80cbc0fa-624b-4927-a8e3-dd45e975e4e8

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Bridge API & Market Feed

### Architecture

| Function | Calls Bridge API? | Cache strategy |
|---|---|---|
| `netlify/functions/refresh-market-feed.ts` | **Yes** — weekly pull only | Writes to Netlify Blobs |
| `netlify/functions/market-feed.ts` | No — read-only | Reads from Netlify Blobs; sets `Cache-Control: public, max-age=3600` |
| `netlify/functions/bridge-listings.ts` | Yes — per city page load | In-memory Map (1-hour TTL, ephemeral per cold start) |
| `netlify/functions/listings-search.ts` | Yes — per search query | In-memory Map (30-min TTL, ephemeral per cold start) |
| `netlify/functions/ticker-listings.ts` | Yes — MLS ticker | In-memory Map (1-hour TTL, ephemeral per cold start) |

### How to manually refresh the market feed

```bash
curl -X POST https://homesprofessional.com/.netlify/functions/refresh-market-feed \
  -H "x-refresh-secret: YOUR_SECRET"
```

Replace `YOUR_SECRET` with the value of `MARKET_FEED_REFRESH_SECRET` set in Netlify environment variables.

### Environment variables required

| Variable | Description |
|---|---|
| `BRIDGE_API_TOKEN` | Bridge API bearer token (server-side only, never expose in frontend) |
| `BRIDGE_DATASET` | Bridge dataset identifier (default: `miamire`) |
| `BRIDGE_BASE_URL` | Bridge OData base URL (default: `https://api.bridgedataoutput.com/api/v2/OData/{BRIDGE_DATASET}/Property`) |
| `MARKET_FEED_REFRESH_SECRET` | Secret header value for manual POST refresh of the market feed |

### How to add more cities

Add new entries to the `FEED_CONFIGS` array in `netlify/functions/refresh-market-feed.ts`:

```typescript
const FEED_CONFIGS: FeedConfig[] = [
  {
    blobKey: "weston-sfr-850k-1200k",
    city: "Weston",
    extraFilter:
      "PropertyType eq 'Residential' and StandardStatus eq 'Active' and ListPrice ge 850000 and ListPrice le 1200000",
  },
  // Add new city configs here:
  // {
  //   blobKey: "coral-gables-sfr-1m-2m",
  //   city: "Coral Gables",
  //   extraFilter:
  //     "PropertyType eq 'Residential' and StandardStatus eq 'Active' and ListPrice ge 1000000 and ListPrice le 2000000",
  // },
];
```

Each new `blobKey` should be read by a corresponding endpoint or by extending `market-feed.ts` to accept a `?feed=` query parameter.

### Compliance items Carlos must verify before publishing

- [ ] **MLS display rules**: Confirm with Miami and South Florida REALTORS® IDX display requirements (attribution text, logo placement, required fields).
- [ ] **Address masking**: Verify whether MLS rules require partial address masking for Active listings displayed on public IDX pages.
- [ ] **Image usage rights**: Confirm that MLS listing photos are licensed for display via IDX on this site.
- [ ] **Attribution requirements**: The IDX disclaimer is included in all API responses and displayed on all feed components. Verify the exact wording required by the MLS board.
- [ ] **Listing data freshness disclosure**: The weekly feed badge ("Weekly Feed") accurately describes the refresh cadence. Confirm this meets IDX rules (some boards require daily minimum refresh).
- [ ] **FL Real Estate Commission compliance**: Ensure all required disclosures (license number, brokerage name, Equal Housing) are displayed alongside listing data.
- [ ] **Sold/Off-market listings**: The current feed filters `StandardStatus eq 'Active'` only. If Pending or Sold listings are added in future, confirm MLS rules on their display.
