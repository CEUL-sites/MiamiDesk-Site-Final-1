import { timingSafeEqual } from 'node:crypto';
import type { Context } from '@netlify/functions';
import { mlsStore } from './_shared/mlsStore';
import { MARKET_FEED_KEY } from './market-feed';
import { isMlsFresh, mlsAge, MLS_MAX_DISPLAY_AGE_MS } from '../../src/lib/mlsFreshness';

export function authorizedHealthRequest(incoming: string | null, secret: string): boolean {
  if (!secret || !incoming) return false;
  const actual = Buffer.from(incoming);
  const expected = Buffer.from(secret);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export default async (request: Request, context: Context) => {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  if (request.method !== 'GET') return new Response('{}', { status: 405, headers });
  if (!authorizedHealthRequest(request.headers.get('x-refresh-secret'), process.env.MARKET_FEED_REFRESH_SECRET ?? '')) {
    return new Response('{"error":"unauthorized"}', { status: 401, headers });
  }
  try {
    const store = mlsStore('market-feed', context.deploy.context);
    const data = await store.get(MARKET_FEED_KEY, { type: 'json' });
    const attempt = await store.get(`${MARKET_FEED_KEY}:health`, { type: 'json' });
    const timestamp = data?.lastSuccessfulRefresh ?? data?.lastUpdated ?? null;
    const fresh = isMlsFresh(timestamp) && Array.isArray(data?.value);
    return new Response(JSON.stringify({
      ok: fresh, feed: MARKET_FEED_KEY, lastSuccessfulRefresh: timestamp,
      ageMs: mlsAge(timestamp), maxDisplayAgeMs: MLS_MAX_DISPLAY_AGE_MS,
      listingCount: Array.isArray(data?.value) ? data.value.length : 0,
      lastAttempt: attempt?.lastAttempt ?? null, lastAttemptOk: attempt?.ok ?? null,
      refreshError: attempt?.ok === false ? 'refresh_failed' : null,
    }), { status: fresh ? 200 : 503, headers });
  } catch {
    return new Response('{"ok":false,"error":"storage_unavailable"}', { status: 503, headers });
  }
};
