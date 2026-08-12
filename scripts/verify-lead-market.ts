import assert from "node:assert/strict";
import {
  getLeadMarketContext,
  shouldFetchMarketContext,
} from "../netlify/functions/_shared/leadMarketContext";

// Covers _shared/leadMarketContext.ts: the async, Bridge-fetching half of the
// market-context feature. scripts/verify-lead-score.ts covers the synchronous
// render contract (a context — or none — rendering correctly into the alert)
// and the source-level wiring check that both handlers call this module the
// same way. Nothing here makes a network call — every scenario below injects
// a stub `fetchImpl` (or, for the missing-token case, a real deleted env var)
// so the whole suite runs in well under a second with zero Bridge credentials.
//
// The property this file exists to prove, above any individual number: an
// MLS hiccup of any shape — timeout, thrown error, non-200, missing token,
// unresolvable city — resolves to `null` and never throws. See the module's
// own header comment for why that's non-negotiable.

// ── Stub helpers ──────────────────────────────────────────────────────────

type StubResult = { ok: boolean; status?: number; json?: unknown };

/** A fetchImpl stub that returns a canned Bridge-shaped response and counts
 *  how many times it was actually invoked (so caching can be asserted on). */
function makeStub(handler: () => StubResult | Promise<StubResult>) {
  const calls = { count: 0 };
  const fetchImpl = (async () => {
    calls.count++;
    const result = await handler();
    return {
      ok: result.ok,
      status: result.status ?? (result.ok ? 200 : 500),
      statusText: result.ok ? "OK" : "Bridge Error",
      json: async () => result.json ?? {},
    };
  }) as unknown as typeof fetch;
  return { fetchImpl, calls };
}

/** Never settles — simulates a Bridge request that hangs. */
function hangingFetch(): typeof fetch {
  return (async () => new Promise(() => {})) as unknown as typeof fetch;
}

/** Rejects immediately — simulates a network-level failure. */
function throwingFetch(message: string): typeof fetch {
  return (async () => {
    throw new Error(message);
  }) as unknown as typeof fetch;
}

/** n synthetic active-listing rows, every field present, distinct values. */
function fullRows(n: number, basePrice = 500_000) {
  return Array.from({ length: n }, (_, i) => ({
    ListPrice: basePrice + i * 10_000,
    DaysOnMarket: 20 + i,
    LivingArea: 1_000 + i * 10,
  }));
}

const TOKEN = "test-bridge-token";

// ── shouldFetchMarketContext: the tier gate itself ────────────────────────
assert.equal(shouldFetchMarketContext("P1"), true, "P1 warrants the lookup");
assert.equal(shouldFetchMarketContext("P2"), true, "P2 warrants the lookup");
assert.equal(shouldFetchMarketContext("P3"), false, "P3 is nurture-track — never spend quota on it");

// ── Populated context: exact numbers, hand-computed ────────────────────────
// 8 rows (== MIN_SAMPLE exactly, proving the boundary is ">=" not ">"):
// prices 500k..570k step 10k -> median of the middle two (540k,550k) = 545k.
// DOM 20..27 step 1 -> avg = 23.5 -> rounds to 24. LivingArea 1000..1070 step
// 10 -> ppsf = price/area, median of the middle two = (540000/1050 rounds to
// 514, 550000/1060 rounds to 519) -> hand-checked below instead of assumed.
{
  const rows = fullRows(8);
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 233 } }));
  const ctx = await getLeadMarketContext({ city: "Weston" }, { fetchImpl, bridgeToken: TOKEN });

  assert.ok(ctx, "an 8-row sample (== MIN_SAMPLE) must be accepted, not just a 9+ sample");
  assert.equal(ctx!.city, "Weston");
  assert.equal(ctx!.requestedAs, null, "Weston's own input already is the MLS city — no submarket note");
  assert.equal(ctx!.activeCount, 233, "activeCount reports the Bridge total, not the sampled row count");
  assert.equal(ctx!.source, "Miami and South Florida REALTORS® MLS");
  assert.match(ctx!.disclaimer, /not guaranteed/);

  const prices = rows.map((r) => r.ListPrice).sort((a, b) => a - b);
  const expectedMedianPrice = Math.round((prices[3] + prices[4]) / 2);
  assert.equal(ctx!.medianListPrice, expectedMedianPrice);

  const doms = rows.map((r) => r.DaysOnMarket);
  const expectedAvgDom = Math.round(doms.reduce((a, b) => a + b, 0) / doms.length);
  assert.equal(ctx!.avgDaysOnMarket, expectedAvgDom);

  const ppsf = rows.map((r) => Math.round(r.ListPrice / r.LivingArea)).sort((a, b) => a - b);
  const expectedMedianPpsf = Math.round((ppsf[3] + ppsf[4]) / 2);
  assert.equal(ctx!.medianPricePerSqft, expectedMedianPpsf);
}

// ── MIN_SAMPLE floor, field-level: healthy price sample, thin DOM/sqft ─────
// Never interpolates or borrows a number from a different sample — a figure
// with too few underlying rows is null, even when a sibling figure isn't.
{
  const rows = [
    { ListPrice: 400_000, DaysOnMarket: 15, LivingArea: 900 },
    { ListPrice: 410_000, DaysOnMarket: 25 },
    { ListPrice: 420_000 },
    { ListPrice: 430_000 },
    { ListPrice: 440_000 },
    { ListPrice: 450_000 },
    { ListPrice: 460_000 },
    { ListPrice: 470_000, LivingArea: 950 },
    { ListPrice: 480_000 },
    { ListPrice: 490_000 },
  ];
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 41 } }));
  const ctx = await getLeadMarketContext({ city: "Sunrise" }, { fetchImpl, bridgeToken: TOKEN });

  assert.ok(ctx, "10 priced rows clears MIN_SAMPLE for the price figure");
  assert.equal(ctx!.medianListPrice, 445_000, "median of the 10 prices");
  assert.equal(ctx!.avgDaysOnMarket, null, "only 2 rows report DOM — below MIN_SAMPLE even though price isn't");
  assert.equal(ctx!.medianPricePerSqft, null, "only 2 rows report sqft — below MIN_SAMPLE even though price isn't");
}

// ── MIN_SAMPLE floor, whole-context: too few priced listings to say anything ──
{
  const rows = fullRows(5); // < MIN_SAMPLE (8)
  const { fetchImpl, calls } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 5 } }));
  const ctx = await getLeadMarketContext({ city: "Doral" }, { fetchImpl, bridgeToken: TOKEN });
  assert.equal(ctx, null, "a 5-listing sample is too thin to publish a median at all — the whole context is withheld");
  assert.equal(calls.count, 1);
}

// ── Timeout: a hung Bridge request must resolve near timeoutMs, not hang ──
{
  const t0 = Date.now();
  const result = await getLeadMarketContext(
    { city: "Aventura" },
    { fetchImpl: hangingFetch(), bridgeToken: TOKEN, timeoutMs: 40 },
  );
  const elapsed = Date.now() - t0;
  assert.equal(result, null, "a hung fetch must resolve to null, never left pending");
  assert.ok(elapsed < 500, `expected to settle near the 40ms timeout, took ${elapsed}ms`);
}

// ── Thrown / rejected fetch — never propagates ─────────────────────────────
{
  const result = await getLeadMarketContext(
    { city: "Boca Raton" },
    { fetchImpl: throwingFetch("simulated network failure"), bridgeToken: TOKEN },
  );
  assert.equal(result, null, "a rejected fetch must be caught, not thrown out of getLeadMarketContext");
}

// ── Non-OK Bridge response — never propagates ──────────────────────────────
{
  const { fetchImpl } = makeStub(() => ({ ok: false, status: 500 }));
  const result = await getLeadMarketContext({ city: "Hollywood" }, { fetchImpl, bridgeToken: TOKEN });
  assert.equal(result, null, "a Bridge 500 must resolve to null, not throw");
}

// ── Missing token — the real process.env path, not just the deps override ──
{
  const saved = process.env.BRIDGE_API_TOKEN;
  delete process.env.BRIDGE_API_TOKEN;
  try {
    const result = await getLeadMarketContext({ city: "Homestead" });
    assert.equal(result, null, "no BRIDGE_API_TOKEN configured -> null, and never attempts a fetch");
  } finally {
    if (saved === undefined) delete process.env.BRIDGE_API_TOKEN;
    else process.env.BRIDGE_API_TOKEN = saved;
  }
}

// ── Unknown city — resolved before any network attempt is made ────────────
{
  let called = false;
  const spy = (async () => {
    called = true;
    throw new Error("must not be called for an unresolvable city");
  }) as unknown as typeof fetch;
  const result = await getLeadMarketContext({ city: "Atlantis" }, { fetchImpl: spy, bridgeToken: TOKEN });
  assert.equal(result, null);
  assert.equal(called, false, "an unresolvable city must never reach the network");
}

// ── City resolution falls back to propertyAddress when city is blank ──────
// HeroSellerForm's own "city" field is a broad market label ("Greater Miami /
// S. Florida"), not a specific city — the real city usually only appears in
// the free-typed address. Both the direct match and an alias reached through
// the address must resolve exactly like a direct city-field match would.
{
  const rows = fullRows(8);
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 40 } }));
  const ctx = await getLeadMarketContext(
    { city: "", propertyAddress: "123 Main St, Pembroke Pines" },
    { fetchImpl, bridgeToken: TOKEN },
  );
  assert.ok(ctx, "a city-less lead with a resolvable trailing address segment must still get context");
  assert.equal(ctx!.city, "Pembroke Pines");
  assert.equal(ctx!.requestedAs, null);
}
{
  const rows = fullRows(8);
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 55 } }));
  const ctx = await getLeadMarketContext(
    { city: "", propertyAddress: "Icon Brickell Unit 4102, Brickell" },
    { fetchImpl, bridgeToken: TOKEN },
  );
  assert.ok(ctx);
  assert.equal(ctx!.city, "Miami", "Brickell's MLS City field is Miami");
  assert.equal(ctx!.requestedAs, "Brickell", "the submarket is still surfaced separately from the MLS city");
}

// ── Regression: alias labels must not survive in the city cache ──────────
// The block above just cached a *Brickell* lookup, and the cache key is the
// resolved MLS city — "miami". Caching the finished context meant the next
// genuine Miami lead read "Miami (Brickell)" in Carlos's alert, and, warmed
// in the other order, a Brickell lead lost its submarket entirely. Both of
// these run against that already-warm entry on purpose.
{
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: fullRows(8), "@odata.count": 55 } }));
  const ctx = await getLeadMarketContext({ city: "Miami" }, { fetchImpl, bridgeToken: TOKEN });
  assert.ok(ctx);
  assert.equal(ctx!.city, "Miami");
  assert.equal(ctx!.requestedAs, null, "a genuine Miami lead must not inherit the cached Brickell label");
}
{
  const { fetchImpl } = makeStub(() => ({ ok: true, json: { value: fullRows(8), "@odata.count": 55 } }));
  const ctx = await getLeadMarketContext({ city: "Brickell" }, { fetchImpl, bridgeToken: TOKEN });
  assert.ok(ctx);
  assert.equal(ctx!.city, "Miami");
  assert.equal(
    ctx!.requestedAs,
    "Brickell",
    "a Brickell lead must not lose its submarket label to a warm Miami cache entry",
  );
}

// ── Cache: a second lookup for the same city within 24h must not re-fetch,
//    and must expire past the 24h TTL (clock injected — no real waiting) ───
{
  const rows = fullRows(8);
  const { fetchImpl, calls } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 12 } }));
  let clock = Date.parse("2026-08-11T12:00:00.000Z");
  const now = () => clock;

  const first = await getLeadMarketContext({ city: "Hallandale Beach" }, { fetchImpl, bridgeToken: TOKEN, now });
  assert.ok(first);
  assert.equal(calls.count, 1);

  const second = await getLeadMarketContext({ city: "Hallandale Beach" }, { fetchImpl, bridgeToken: TOKEN, now });
  assert.equal(calls.count, 1, "a second lookup inside the 24h TTL must be served from cache, not re-fetched");
  assert.deepEqual(second, first);

  clock += 25 * 60 * 60 * 1000; // past the 24h TTL
  const third = await getLeadMarketContext({ city: "Hallandale Beach" }, { fetchImpl, bridgeToken: TOKEN, now });
  assert.equal(calls.count, 2, "past the 24h TTL the cache must be treated as expired, not served forever");
  assert.ok(third);
}

// ── Cache: a thin-sample (null) outcome is cached too — a chronically thin
//    city shouldn't be re-queried on every single lead that lands in it ────
{
  const rows = fullRows(3); // thin
  const { fetchImpl, calls } = makeStub(() => ({ ok: true, json: { value: rows, "@odata.count": 3 } }));
  const first = await getLeadMarketContext({ city: "Pompano Beach" }, { fetchImpl, bridgeToken: TOKEN });
  assert.equal(first, null);
  assert.equal(calls.count, 1);
  const second = await getLeadMarketContext({ city: "Pompano Beach" }, { fetchImpl, bridgeToken: TOKEN });
  assert.equal(second, null);
  assert.equal(calls.count, 1, "a thin-sample null is cached — not re-fetched on the very next lead");
}

// ── Cache: a transient error is NOT cached — the next lead should retry ───
{
  let attempt = 0;
  const fetchImpl = (async () => {
    attempt++;
    if (attempt === 1) throw new Error("transient failure");
    return { ok: true, status: 200, statusText: "OK", json: async () => ({ value: fullRows(8), "@odata.count": 20 }) };
  }) as unknown as typeof fetch;

  const first = await getLeadMarketContext({ city: "Miramar" }, { fetchImpl, bridgeToken: TOKEN });
  assert.equal(first, null, "the first, failing attempt resolves to null, not thrown");
  assert.equal(attempt, 1);

  const second = await getLeadMarketContext({ city: "Miramar" }, { fetchImpl, bridgeToken: TOKEN });
  assert.ok(second, "a transient failure must not be memoized for 24h — the next lead should retry Bridge");
  assert.equal(attempt, 2);
}

// ── P3 never triggers a lookup — the exact call-site shape used in both
//    lead-notify.ts and submission-created.ts (see also the source-level
//    wiring check in scripts/verify-lead-score.ts) ────────────────────────
{
  let called = false;
  const spy = (async () => {
    called = true;
    throw new Error("must not be called for a P3 lead");
  }) as unknown as typeof fetch;

  const tier = "P3" as const;
  const ctx = shouldFetchMarketContext(tier)
    ? await getLeadMarketContext({ city: "Weston" }, { fetchImpl: spy, bridgeToken: TOKEN })
    : null;

  assert.equal(ctx, null);
  assert.equal(called, false, "a P3 lead must never spend Bridge quota on a market-context lookup");
}

console.log("lead market context verified");
