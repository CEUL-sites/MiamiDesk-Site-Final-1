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

## Bridge API & MLS freshness

See [the October 2026 IDX audit and operations guide](docs/IDX-FRESHNESS-AUDIT-2026-10-05.md) for every data pathway, authoritative rules, release gates, costs and verification.

The Weston live feed refreshes every six hours (`0 */6 * * *`, UTC). Public Blob readers suppress datasets at 11 hours, retain valid prior data on refresh failure, and disclose retrieval timestamps. Search and ticker retain their short direct Bridge query caches. Visible browser inventory refreshes every 30 minutes and on tab restoration; live listings are excluded from build-time prerendered HTML.

Manual refresh: Netlify published production deploy → Functions → refresh-market-feed → **Run now**. Scheduled functions cannot be invoked through a public POST URL. Verify `lastSuccessfulRefresh` and `stale` in market-feed afterward. Protected `mls-feed-health` accepts the existing server-only `x-refresh-secret` credential and reports age/count/last-attempt health without listing payloads.

Server variable names: `BRIDGE_API_TOKEN`, `BRIDGE_DATASET_ID`, `BRIDGE_DATASET`, `BRIDGE_BASE_URL`, `MARKET_FEED_REFRESH_SECRET`. Never expose their values in frontend bundles or repository files. Confirm dataset aliases agree across endpoints before release. Preview Blob storage is isolated from production.

**Release gate:** the audit records missing account-specific license, display-permission and deployed integration evidence. Do not treat passing local tests as certification of the MLS agreement.
