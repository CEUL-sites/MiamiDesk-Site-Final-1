import type { Handler, HandlerEvent } from '@netlify/functions';
import { connectLambda } from '@netlify/blobs';
import { syncConfigured, inquiryStore } from './_shared/hubspotQueue.mjs';
import { rateLimit } from './_shared/requestGuard';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers, body: '{}' };
  const state: Record<string, unknown> = {
    configured: syncConfigured(), processing: 'scheduled', marketingEnrollment: false,
  };
  // Optional operational check: no contact data, submission IDs, or credentials.
  if (event.queryStringParameters?.check === 'delivery') {
    const retry = rateLimit(event, 'hubspot-delivery-status', 5, 60_000);
    if (retry !== null) return { statusCode: 429, headers: { ...headers, 'Retry-After': String(retry) }, body: '{}' };
    try {
      connectLambda(event as HandlerEvent & Parameters<typeof connectLambda>[0]);
      const store = inquiryStore();
      const [pending, done] = await Promise.all([
        store.list({ prefix: 'pending/' }), store.list({ prefix: 'done/' }),
      ]);
      const jobs = await Promise.all(pending.blobs.slice(0, 50).map(b => store.get(b.key, { type: 'json' })));
      const codes = [...new Set(jobs.map(j => j?.lastError?.match(/HubSpot HTTP (\d{3})/)?.[1]).filter(Boolean))];
      state.delivery = {
        pending: pending.blobs.length > 0, synced: done.blobs.length > 0,
        attempted: jobs.some(j => j?.attempts > 0),
        needsReview: jobs.some(j => j?.status === 'review'),
        upstreamStatusCodes: codes,
      };
    } catch {
      state.delivery = { storage: 'unavailable' };
    }
  }
  return { statusCode: 200, headers, body: JSON.stringify(state) };
};
