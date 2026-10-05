import test from 'node:test';
import assert from 'node:assert/strict';
import * as market from '../netlify/functions/market-feed';
import * as refresh from '../netlify/functions/refresh-market-feed';
import { loadTickerPayload } from '../netlify/functions/ticker-listings';

const now = Date.parse('2026-10-05T12:00:00Z');
const row = { ListingId: 'A1', ListPrice: 950000, StandardStatus: 'Active' };
const feed = (time: string) => ({ value: [row], lastSuccessfulRefresh: time, lastUpdated: time, listingCount: 1 });
const response = async (data: unknown) => {
  assert.equal(typeof (market as any).readMarketFeed, 'function', 'public feed must enforce cache age');
  return (market as any).readMarketFeed({ get: async () => data }, now);
};

test('public Weston inventory is suppressed at 11h, including invalid, missing and future timestamps', async () => {
  for (const data of [feed('2026-10-05T01:00:00Z'), feed('2026-10-04T12:00:00Z'), feed('invalid'), feed('2026-10-05T13:00:00Z'), { value: [row] }, null]) {
    const r = await response(data);
    const body = JSON.parse(r.body);
    assert.deepEqual(body.value, []);
    assert.equal(body.stale, true);
    assert.equal(r.headers['Cache-Control'], 'no-store');
  }
});

test('public cache lifetime shrinks to remaining permitted age and retains original refresh time', async () => {
  const r = await response(feed('2026-10-05T01:00:30Z'));
  const body = JSON.parse(r.body);
  assert.equal(body.value[0].ListPrice, 950000);
  assert.equal(body.lastSuccessfulRefresh, '2026-10-05T01:00:30Z');
  assert.equal(r.headers['Cache-Control'], 'public, max-age=30, must-revalidate');
});

test('legacy cache uses lastUpdated without re-dating the inventory; valid empty results are not stale', async () => {
  const r = await response({ value: [], lastUpdated: '2026-10-05T06:00:00Z' });
  assert.equal(JSON.parse(r.body).stale, false);
  assert.equal(JSON.parse(r.body).lastSuccessfulRefresh, '2026-10-05T06:00:00Z');
});

test('successful scheduled refresh updates price and timestamp in storage', async () => {
  assert.equal(typeof (refresh as any).refreshMarketFeeds, 'function');
  const blobs = new Map<string, unknown>();
  const store = { setJSON: async (key: string, data: unknown) => { blobs.set(key, data); } };
  const result = await (refresh as any).refreshMarketFeeds(store, async () => new Response(JSON.stringify({ value: [{ ...row, ListPrice: 900000 }] })), now);
  assert.equal(result.ok, true);
  const saved = blobs.get('weston-sfr-850k-1200k') as any;
  assert.equal(saved.value[0].ListPrice, 900000);
  assert.equal(saved.lastSuccessfulRefresh, '2026-10-05T12:00:00.000Z');
});

test('Bridge failure or malformed data preserves last successful dataset and records failed attempt', async () => {
  assert.equal(typeof (refresh as any).refreshMarketFeeds, 'function');
  for (const upstream of [new Response('bad', { status: 429 }), new Response(JSON.stringify({ error: 'bad' }))]) {
    const blobs = new Map<string, unknown>([['weston-sfr-850k-1200k', feed('2026-10-05T06:00:00Z')]]);
    const result = await (refresh as any).refreshMarketFeeds({ setJSON: async (key: string, data: unknown) => { blobs.set(key, data); } }, async () => upstream, now);
    assert.equal(result.ok, false);
    assert.equal((blobs.get('weston-sfr-850k-1200k') as any).value[0].ListPrice, 950000);
    assert.equal((blobs.get('weston-sfr-850k-1200k:health') as any).ok, false);
  }
});

test('fresh Bridge retrieval remains current even when a valid listing has not changed for weeks', async () => {
  const listing = { ListingId: 'A1', ListingKey: 'A1', UnparsedAddress: '123 Main Street', City: 'Weston', ListPrice: 950000, LivingArea: 2500, PropertyType: 'Residential', PropertySubType: 'Single Family Residence', StandardStatus: 'Active', ModificationTimestamp: '2026-09-01T12:00:00Z', ListOfficeName: 'Broker' };
  const payload = await loadTickerPayload(async () => new Response(JSON.stringify({ value: [listing] })), '2026-10-05T12:00:00Z');
  assert.equal(payload.live, true);
  assert.equal(payload.value.length, 1);
});

import { loadCitySnapshot } from '../netlify/functions/city-stats';
import { watchMlsRefresh } from '../src/lib/liveMlsRefresh';

test('city stats outage suppresses expired snapshots but retains permitted previous statistics', async () => {
  for (const [time, available] of [['2026-10-05T01:00:00Z', false], ['2026-10-05T05:00:00Z', true]]) {
    const store = { get: async () => ({ available: true, city: 'Weston', activeCount: 20, lastUpdated: time }), setJSON: async () => {} };
    const r = await loadCitySnapshot('Weston', store, async () => new Response('outage', { status: 502 }), now);
    const body = JSON.parse(r.body);
    assert.equal(body.available, available);
    assert.equal(body.stale, true);
    if (!available) assert.equal(body.activeCount, undefined);
  }
});

test('browser refresh clears sleeping-tab inventory before fetching and releases event listeners', () => {
  const callbacks = new Map<string, () => void>();
  let interval: () => void;
  const calls: string[] = [];
  const target = { visibilityState: 'visible', addEventListener: (key: string, fn: () => void) => callbacks.set(key, fn), removeEventListener: (key: string) => callbacks.delete(key) };
  const stop = watchMlsRefresh(() => calls.push('refresh'), () => calls.push('clear'), {
    document: target as any, window: target as any,
    setInterval: ((fn: () => void, ms: number) => { assert.equal(ms, 1800000); interval = fn; return 1; }) as any,
    clearInterval: (() => calls.push('stop')) as any,
  });
  interval!();
  assert.deepEqual(calls, ['clear', 'refresh']);
  target.visibilityState = 'hidden'; interval!();
  assert.equal(calls.length, 2);
  target.visibilityState = 'visible'; callbacks.get('visibilitychange')!();
  assert.deepEqual(calls, ['clear', 'refresh', 'clear', 'refresh']);
  stop(); assert.equal(callbacks.size, 0);
});

import health, { authorizedHealthRequest } from '../netlify/functions/mls-feed-health';

test('diagnostics deny missing, wrong and unset credentials before opening storage', async () => {
  assert.equal(authorizedHealthRequest(null, 'fixture-secret'), false);
  assert.equal(authorizedHealthRequest('wrong', 'fixture-secret'), false);
  assert.equal(authorizedHealthRequest('fixture-secret', ''), false);
  assert.equal(authorizedHealthRequest('fixture-secret', 'fixture-secret'), true);
  const r = await health(new Request('https://example.test/.netlify/functions/mls-feed-health'), {} as any);
  assert.equal(r.status, 401);
  assert.equal(r.headers.get('Cache-Control'), 'no-store');
});


test('a fresh Active-only pull removes inventory that no longer matches status or price filters', async () => {
  const blobs = new Map<string, unknown>([['weston-sfr-850k-1200k', feed('2026-10-05T06:00:00Z')]]);
  const store = { get: async (key: string) => blobs.get(key), setJSON: async (key: string, value: unknown) => { blobs.set(key, value); } };
  const result = await refresh.refreshMarketFeeds(store, async (url) => {
    const filter = new URL(String(url)).searchParams.get('$filter');
    assert.ok(filter?.includes("StandardStatus eq 'Active'"));
    assert.ok(filter?.includes('ListPrice ge 850000 and ListPrice le 1200000'));
    return Response.json({ value: [] });
  }, now);
  assert.equal(result.ok, true);
  const publicRead = await market.readMarketFeed(store, now);
  assert.deepEqual(JSON.parse(publicRead.body).value, []);
  assert.equal(JSON.parse(publicRead.body).stale, false);
});
