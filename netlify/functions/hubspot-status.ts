import type { HandlerEvent } from '@netlify/functions';
import { syncConfigured, inquiryStore } from './_shared/hubspotQueue.mjs';
import { rateLimit } from './_shared/requestGuard';

export default async (request: Request) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (request.method !== 'GET') return new Response('{}', { status: 405, headers });
  const state: Record<string, unknown> = {
    configured: syncConfigured(), processing: 'scheduled', marketingEnrollment: false,
  };
  // Optional operational check: no contact data, submission IDs, or credentials.
  if (new URL(request.url).searchParams.get('check') === 'delivery') {
    const retry = rateLimit({ headers: Object.fromEntries(request.headers) } as HandlerEvent, 'hubspot-delivery-status', 5, 60_000);
    if (retry !== null) return new Response('{}', { status: 429, headers: { ...headers, 'Retry-After': String(retry) } });
    let phase = 'store_configuration';
    try {
      const store = inquiryStore();
      phase = 'store_read';
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
    } catch (error) {
      state.delivery = { storage: 'unavailable', phase, errorType: error instanceof Error ? error.name : 'UnknownError' };
    }
  }
  return new Response(JSON.stringify(state), { status: 200, headers });
};
