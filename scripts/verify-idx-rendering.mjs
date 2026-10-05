// Run after npm run build with IDX_TEST_BROWSER=/path/to/current/chromium.
// The bundled ReactSnap Chromium predates the site's Tailwind CSS.
// Uses only local fixture data: no MLS credentials,
// Netlify writes, lead submissions or third-party requests.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import puppeteer from 'puppeteer';

if (!process.env.IDX_TEST_BROWSER) throw new Error('Set IDX_TEST_BROWSER to a current Chromium executable.');

let mode = 'fresh';
let price = 950000;
let status = 'Active';
const fixture = (name) => ({
  ListingKey: name, ListingId: name, UnparsedAddress: `Audit Weston ${name} home`,
  City: 'Weston', PostalCode: '33326', ListPrice: price, StandardStatus: status,
  PropertyType: 'Residential', PropertySubType: 'Single Family Residence',
  BedroomsTotal: 4, BathroomsTotalDecimal: 3, LivingArea: 2500,
  ListOfficeName: 'Audit Listing Brokerage', ModificationTimestamp: '2026-09-01T12:00:00Z',
});
const root = resolve('dist');
const server = createServer(async (req, res) => {
  if (req.url.startsWith('/.netlify/functions/')) {
    if (mode === 'failure') { res.writeHead(503); res.end('{}'); return; }
    const name = req.url.includes('ticker') ? 'ticker' : req.url.includes('market-feed') ? 'feed' : 'search';
    const time = new Date(Date.now() - (mode === 'stale' ? 12 * 3600000 : 0)).toISOString();
    const value = mode === 'empty' ? [] : [fixture(name)];
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ value, lastUpdated: time, lastSuccessfulRefresh: time, fetchedAt: time,
      dataFreshness: '2026-09-01T12:00:00Z', totalCount: value.length, live: true, stale: mode === 'stale' }));
    return;
  }
  try {
    let file = resolve(root, `.${new URL(req.url, 'http://localhost').pathname}`);
    if (!file.startsWith(`${root}/`) && file !== root) throw new Error('Invalid path');
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); }
    catch { file = resolve(root, 'index.html'); }
    res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' })[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await puppeteer.launch({ executablePath: process.env.IDX_TEST_BROWSER, headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
try {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 Chrome/78.0.3904.0 Safari/537.36');
  await page.setRequestInterception(true);
  page.on('request', req => req.url().startsWith(origin) || req.url().startsWith('data:') ? req.continue() : req.abort());
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const text = () => page.evaluate(() => document.body.innerText);
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewport(viewport);
    for (const path of ['/listings?zone=Weston', '/sell-weston', '/buy']) {
      mode = 'fresh';
      await page.goto(origin + path, { waitUntil: 'networkidle0' });
      await page.waitForFunction(() => document.body.innerText.includes('Audit Weston'));
      const content = await text();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path}: horizontal overflow at ${viewport.width}`);
      console.log(`PASS: ${viewport.width}px ${path}`);
    }
    for (const scenario of ['empty', 'stale', 'failure']) {
      mode = scenario;
      await page.goto(origin + '/listings?zone=Weston', { waitUntil: 'networkidle0' });
      assert(!(await text()).includes('Audit Weston'), `${scenario}: inventory hidden`);
    }
  }
  mode = 'fresh'; price = 950000; status = 'Active';
  await page.goto(origin + '/listings?zone=Weston', { waitUntil: 'networkidle0' });
  assert((await text()).includes('950,000'));
  price = 900000; status = 'Pending';
  await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
  await page.waitForFunction(() => [...document.querySelectorAll('#search button')].some(e => e.textContent.includes('Audit Weston search home') && e.textContent.includes('900,000') && /pending/i.test(e.textContent)));
  assert(!(await text()).includes('950,000'), 'waking page removes obsolete price');
  mode = 'failure';
  await page.evaluate(() => window.dispatchEvent(new Event('pageshow')));
  await page.waitForFunction(() => !document.body.innerText.includes('Audit Weston'));
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: desktop/mobile listings, Weston sample, ticker, no overflow, empty/stale/failure suppression, wake refresh, price/status propagation.');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
