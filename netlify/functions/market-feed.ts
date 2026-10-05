import type { Context } from '@netlify/functions';
import { mlsStore } from './_shared/mlsStore';
import { isMlsFresh, mlsAge, mlsCacheControl, MLS_MAX_DISPLAY_AGE_MS } from '../../src/lib/mlsFreshness';
import { IDX_DISCLAIMER } from '../../src/lib/listings';

export const MARKET_FEED_KEY = 'weston-sfr-850k-1200k';
interface Feed { value?: unknown[]; lastSuccessfulRefresh?: string; lastUpdated?: string }
interface Reader { get(key: string, options: { type: 'json' }): Promise<unknown> }

export async function readMarketFeed(store: Reader, now = Date.now()) {
  const data = await store.get(MARKET_FEED_KEY, { type: 'json' }) as Feed | null;
  const timestamp = data?.lastSuccessfulRefresh ?? data?.lastUpdated ?? null;
  const fresh = isMlsFresh(timestamp, now) && Array.isArray(data?.value);
  if (!fresh) console.warn('[market-feed] inventory suppressed', { ageMs: mlsAge(timestamp, now), lastSuccessfulRefresh: timestamp });
  const value = fresh ? data!.value! : [];
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': fresh ? mlsCacheControl(timestamp, now) : 'no-store' },
    body: JSON.stringify({
      value, lastUpdated: timestamp, lastSuccessfulRefresh: timestamp,
      listingCount: value.length, ageMs: mlsAge(timestamp, now), maxDisplayAgeMs: MLS_MAX_DISPLAY_AGE_MS,
      stale: !fresh,
      ...(!fresh ? { message: 'Market feed temporarily unavailable. Request a private property review.' } : {}),
      disclaimer: IDX_DISCLAIMER,
    }),
  };
}

export default async (request: Request, context: Context) => {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405, headers: { 'Cache-Control': 'no-store' } });
  try {
    const result = await readMarketFeed(mlsStore('market-feed', context.deploy.context));
    return new Response(result.body, { status: result.statusCode, headers: result.headers });
  } catch {
    console.error('[market-feed] storage unavailable');
    return new Response(JSON.stringify({ value: [], stale: true, error: 'feed_unavailable' }), { status: 503, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  }
};
