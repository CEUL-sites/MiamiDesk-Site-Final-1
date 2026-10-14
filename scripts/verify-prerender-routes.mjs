import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const origin = 'https://homesprofessional.com';
const routes = JSON.parse(fs.readFileSync('package.json', 'utf8')).reactSnap.include;
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const titles = new Map();
for (const route of routes) {
  const html = fs.readFileSync(path.join('dist', route === '/' ? '' : route, 'index.html'), 'utf8');
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
  assert(title && !title.startsWith('404'), `${route}: missing route-specific rendered title`);
  assert(html.includes('<h1'), `${route}: empty SPA shell`);
  const indexable = !route.startsWith('/thanks/') && route !== '/es/gracias/agente';
  if (indexable) {
  const canonicals = [...html.matchAll(/<link(?=[^>]*rel="canonical")[^>]*>/g)].map(match => match[0].match(/href="([^"]+)"/));
  assert.equal(canonicals.length, 1, `${route}: needs exactly one canonical`);
  assert.equal(canonicals[0][1], origin + (route === '/' ? '/' : route), `${route}: wrong canonical`);
  assert.match(html, /<meta(?=[^>]*name="description")(?=[^>]*content="[^"\s][^"]+")[^>]*>/);
  }
  assert(html.includes('SL705771') && html.includes('Equal Housing Opportunity'), `${route}: missing compliance`);
  if (!route.startsWith('/thanks/') && route !== '/es/gracias/agente') {
    assert(sitemap.includes(`<loc>${origin}${route}</loc>`), `${route}: missing sitemap URL`);
    assert(!titles.has(title), `${route}: duplicate title with ${titles.get(title)}`);
    titles.set(title, route);
  }
}
console.log(`Verified fully rendered HTML, unique titles, descriptions, canonical tags, sitemap and compliance for ${routes.length} routes.`);
