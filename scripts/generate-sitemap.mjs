#!/usr/bin/env node
/**
 * scripts/generate-sitemap.mjs
 *
 * Generates public/sitemap.xml from:
 *   1. A hardcoded list of static routes (with preserved priority / changefreq / hreflang)
 *   2. All published journal posts in src/content/journal/ (non-_ prefixed .md files)
 *
 * Run automatically via `npm run build` (see package.json).
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const BASE      = 'https://homesprofessional.com';

// ── Static routes ────────────────────────────────────────────────────────────
// Each URL appears exactly once. Priority and changefreq match the original
// hand-maintained sitemap. hreflang arrays use bare paths (BASE is prepended).

const STATIC = [
  // Core
  {
    path: '/',
    lastmod: '2026-06-01',
    changefreq: 'weekly',
    priority: 1.0,
    hreflang: [
      { lang: 'x-default', path: '/' },
      { lang: 'en',        path: '/' },
      { lang: 'es',        path: '/es' },
    ],
  },

  // Seller funnel — main
  {
    path: '/sell-south-florida',
    lastmod: '2026-06-01',
    changefreq: 'weekly',
    priority: 0.97,
    hreflang: [
      { lang: 'en', path: '/sell-south-florida' },
      { lang: 'es', path: '/es/vender' },
    ],
  },
  { path: '/sell-weston',         lastmod: '2026-06-10', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-weston' }, { lang: 'es', path: '/es/vender-weston' }, { lang: 'x-default', path: '/sell-weston' }] },
  { path: '/sell-coral-gables',   lastmod: '2026-06-03', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-coral-gables' }] },
  { path: '/sell-aventura',       lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-aventura' }] },
  { path: '/sell-doral',          lastmod: '2026-06-10', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-doral' }, { lang: 'es', path: '/es/vender-doral' }, { lang: 'x-default', path: '/sell-doral' }] },
  { path: '/sell-brickell',       lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-brickell' }] },
  { path: '/sell-miami',          lastmod: '2026-06-10', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-miami' }, { lang: 'es', path: '/es/vender-miami' }, { lang: 'x-default', path: '/sell-miami' }] },
  { path: '/sell-kendall',        lastmod: '2026-06-10', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-kendall' }, { lang: 'es', path: '/es/vender-kendall' }, { lang: 'x-default', path: '/sell-kendall' }] },
  { path: '/sell-downtown-miami', lastmod: '2026-06-09', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-downtown-miami' }] },
  { path: '/sell-north-miami',    lastmod: '2026-06-09', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-north-miami' }] },
  { path: '/sell-pompano-beach',  lastmod: '2026-06-09', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-pompano-beach' }] },
  { path: '/sell-hallandale-beach', lastmod: '2026-06-09', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-hallandale-beach' }] },
  { path: '/sell-coral-springs',  lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-coral-springs' }] },
  { path: '/sell-pembroke-pines', lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-pembroke-pines' }] },
  { path: '/sell-fort-lauderdale',lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-fort-lauderdale' }] },
  { path: '/sell-plantation',     lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-plantation' }] },
  { path: '/sell-sunrise',        lastmod: '2026-06-04', changefreq: 'monthly', priority: 0.92, hreflang: [{ lang: 'en', path: '/sell-sunrise' }] },
  { path: '/home-value',          lastmod: '2026-06-01', changefreq: 'weekly',  priority: 0.96, hreflang: [{ lang: 'en', path: '/home-value' }] },

  // Buyer funnel
  {
    path: '/buy',
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: 0.88,
    hreflang: [
      { lang: 'en', path: '/buy' },
      { lang: 'es', path: '/es/comprar' },
    ],
  },
  { path: '/new-construction', lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.82 },

  // Markets & intelligence
  { path: '/markets',  lastmod: '2026-06-07', changefreq: 'monthly', priority: 0.87 },
  { path: '/listings', lastmod: '2026-06-01', changefreq: 'daily',   priority: 0.85 },

  // International
  {
    path: '/global-desk',
    lastmod: '2026-06-04',
    changefreq: 'monthly',
    priority: 0.90,
    hreflang: [
      { lang: 'en', path: '/global-desk' },
      { lang: 'es', path: '/es/spain-desk' },
    ],
  },

  // Professionals
  {
    path: '/agents',
    lastmod: '2026-06-03',
    changefreq: 'monthly',
    priority: 0.87,
    hreflang: [
      { lang: 'en', path: '/agents' },
      { lang: 'es', path: '/es/agentes' },
    ],
  },

  // Reviews + About + Contact
  { path: '/reviews', lastmod: '2026-06-02', changefreq: 'monthly', priority: 0.82 },
  { path: '/contact', lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.82 },
  { path: '/about',   lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.78 },

  // Journal index
  { path: '/journal', lastmod: '2026-06-01', changefreq: 'weekly',  priority: 0.86 },

  // Spanish
  { path: '/es',           lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.78, hreflang: [{ lang: 'es', path: '/es' }] },
  {
    path: '/es/vender',
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: 0.75,
    hreflang: [
      { lang: 'en', path: '/sell-south-florida' },
      { lang: 'es', path: '/es/vender' },
    ],
  },
  {
    path: '/es/comprar',
    lastmod: '2026-06-01',
    changefreq: 'monthly',
    priority: 0.72,
    hreflang: [
      { lang: 'en', path: '/buy' },
      { lang: 'es', path: '/es/comprar' },
    ],
  },
  {
    path: '/es/agentes',
    lastmod: '2026-06-05',
    changefreq: 'monthly',
    priority: 0.72,
    hreflang: [
      { lang: 'x-default', path: '/agents' },
      { lang: 'en',        path: '/agents' },
      { lang: 'es',        path: '/es/agentes' },
    ],
  },
  {
    path: '/es/spain-desk',
    lastmod: '2026-06-05',
    changefreq: 'monthly',
    priority: 0.70,
    hreflang: [
      { lang: 'en', path: '/global-desk' },
      { lang: 'es', path: '/es/spain-desk' },
    ],
  },

  // Spanish city seller pages
  {
    path: '/es/vender-doral',
    lastmod: '2026-06-10',
    changefreq: 'monthly',
    priority: 0.82,
    hreflang: [
      { lang: 'en', path: '/sell-doral' },
      { lang: 'es', path: '/es/vender-doral' },
      { lang: 'x-default', path: '/sell-doral' },
    ],
  },
  {
    path: '/es/vender-weston',
    lastmod: '2026-06-10',
    changefreq: 'monthly',
    priority: 0.82,
    hreflang: [
      { lang: 'en', path: '/sell-weston' },
      { lang: 'es', path: '/es/vender-weston' },
      { lang: 'x-default', path: '/sell-weston' },
    ],
  },
  {
    path: '/es/vender-kendall',
    lastmod: '2026-06-10',
    changefreq: 'monthly',
    priority: 0.82,
    hreflang: [
      { lang: 'en', path: '/sell-kendall' },
      { lang: 'es', path: '/es/vender-kendall' },
      { lang: 'x-default', path: '/sell-kendall' },
    ],
  },
  {
    path: '/es/vender-miami',
    lastmod: '2026-06-10',
    changefreq: 'monthly',
    priority: 0.82,
    hreflang: [
      { lang: 'en', path: '/sell-miami' },
      { lang: 'es', path: '/es/vender-miami' },
      { lang: 'x-default', path: '/sell-miami' },
    ],
  },

  // Legal
  { path: '/privacy', lastmod: '2026-06-01', changefreq: 'yearly', priority: 0.40 },
  { path: '/terms',   lastmod: '2026-06-01', changefreq: 'yearly', priority: 0.40 },
];

// ── Frontmatter parser (no dependencies) ────────────────────────────────────
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) meta[kv[1].trim()] = kv[2].trim();
  }
  return meta;
}

// ── Collect journal posts ────────────────────────────────────────────────────
function collectJournalPosts() {
  const dir = join(ROOT, 'src', 'content', 'journal');
  const files = readdirSync(dir).filter(
    f => f.endsWith('.md') && !f.startsWith('_')
  );

  return files.map(file => {
    const raw  = readFileSync(join(dir, file), 'utf8');
    const meta = parseFrontmatter(raw);
    return {
      slug:    meta.slug || basename(file, '.md'),
      lastmod: meta.date || '2026-01-01',
    };
  }).sort((a, b) => b.lastmod.localeCompare(a.lastmod));
}

// ── XML builders ─────────────────────────────────────────────────────────────
function hreflangTags(links = []) {
  return links
    .map(l => `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${BASE}${l.path}"/>`)
    .join('\n');
}

function urlBlock(entry) {
  const tags = hreflangTags(entry.hreflang);
  return [
    '  <url>',
    `    <loc>${BASE}${entry.path}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority.toFixed(2)}</priority>`,
    ...(tags ? [tags] : []),
    '  </url>',
  ].join('\n');
}

function journalBlock(post) {
  return [
    '  <url>',
    `    <loc>${BASE}/journal/${post.slug}</loc>`,
    `    <lastmod>${post.lastmod}</lastmod>`,
    '    <changefreq>monthly</changefreq>',
    '    <priority>0.60</priority>',
    '  </url>',
  ].join('\n');
}

// ── Generate ─────────────────────────────────────────────────────────────────
const posts  = collectJournalPosts();
const static_blocks  = STATIC.map(urlBlock).join('\n\n');
const journal_blocks = posts.map(journalBlock).join('\n\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- ── Static routes ─────────────────────────────────────────────────── -->

${static_blocks}

  <!-- ── Journal posts (auto-generated from src/content/journal/) ────── -->

${journal_blocks}

</urlset>
`;

const out = join(ROOT, 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`✓ sitemap.xml written — ${STATIC.length} static routes + ${posts.length} journal posts`);
