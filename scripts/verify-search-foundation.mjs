import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Check released HTML, not just TSX strings. Every journal article must be
// discoverable and prerendered before unknown journal URLs can return 404.
const origin = 'https://homesprofessional.com';
const posts = JSON.parse(fs.readFileSync('src/data/journalIndex.json', 'utf8'));
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const config = fs.readFileSync('netlify.toml', 'utf8');
const include = JSON.parse(fs.readFileSync('package.json', 'utf8')).reactSnap.include;
const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
for (const post of posts) {
  const route = `/journal/${post.slug}`;
  assert(include.includes(route), `${route} missing from react-snap include`);
  assert(urls.has(origin + route), `${route} missing from sitemap`);
  assert(fs.existsSync(path.join('dist', route, 'index.html')), `${route} missing from built output`);
}
assert(!config.includes('from = "/journal/*"'), 'Unknown journal URLs must reach the real 404 rule');
assert.match(config, /from = "\/\*"\s+to = "\/404\.html"\s+status = 404/);
const routes = ['/', '/sell', '/sell-weston', '/home-value', '/about', '/contact', '/global-desk', '/es', '/es/vender', `/journal/${posts[0].slug}`];
for (const route of routes) {
  const html = fs.readFileSync(path.join('dist', route === '/' ? '' : route, 'index.html'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  assert(!/[\uFFFD\x00-\x08\x0B\x0C\x0E-\x1F]/.test(html), `${route} contains damaged text`);
  assert(!/REALTORS?r|Realtorr/.test(html), `${route} contains a damaged professional title`);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${route} needs one H1`);
  assert.equal([...html.matchAll(/<link\b[^>]*rel="canonical"/gi)].length, 1, `${route} needs one canonical`);
  assert(!/<meta\b[^>]*content="noindex/.test(html), `${route} must remain indexable`);
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(m => JSON.parse(m[1]));
  const visibleText = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ')
    .replace(/&#(?:x([a-f\d]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ');
  const agent = schemas.find(s => s['@id'] === `${origin}/#agent`);
  assert.equal(agent?.name, 'Carlos Uzcategui', `${route} missing stable agent identity`);
  assert(!agent.sameAs.includes('https://www.urgfl.com/office-locations/'), 'An office directory is not an agent profile');
  assert(!schemas.some(s => s['@type'] === 'WebSite' && s.potentialAction), 'Do not advertise an unavailable site search');
  for (const schema of schemas.filter(s => s['@type'] === 'Person')) {
    assert.equal(schema['@id'], `${origin}/#person`, 'Person and business need distinct identities');
  }
  for (const schema of schemas.filter(s => s['@type'] === 'FAQPage')) {
    for (const question of schema.mainEntity) {
      assert(html.includes(question.name.replace(/&/g,'&amp;')), `${route} FAQ question absent from HTML: ${question.name}`);
      assert(visibleText.includes(question.acceptedAnswer.text.replace(/\s+/g,' ')), `${route} FAQ answer absent from body HTML: ${question.name}`);
    }
  }
}
for (const name of ['llms.txt', 'llms-full.txt']) {
  const text = fs.readFileSync(path.join('dist', name), 'utf8');
  assert(!/[\uFFFD\x00-\x08\x0B\x0C\x0E-\x1F]/.test(text), `${name} contains damaged text`);
  assert(text.includes('Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.'));
}
console.log(`Search foundation verified: ${routes.length} key pages, ${posts.length} journal routes, sitemap coverage, JSON-LD identity, text encoding and unknown-journal routing.`);
