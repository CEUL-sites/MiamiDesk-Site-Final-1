// Renders a branded 1200x630 share card for every journal post into
// public/images/journal/og/<slug>.jpg using scripts/og-journal-card.html.
// Uses the puppeteer already installed for react-snap. Run from repo root:
//   node scripts/render-journal-og.mjs            # only posts missing a card
//   node scripts/render-journal-og.mjs --force    # re-render all
//   node scripts/render-journal-og.mjs --slug=x   # just that post
// Set PUPPETEER_EXECUTABLE_PATH to use a system Chrome instead of the bundled one.
import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contentDir = path.join(root, 'src/content/journal');
const outDir = path.join(root, 'public/images/journal/og');
const force = process.argv.includes('--force');
const slugArg = process.argv.find((arg) => arg.startsWith('--slug='));
const onlySlug = slugArg ? slugArg.slice('--slug='.length) : null;
fs.mkdirSync(outDir, { recursive: true });

function frontmatter(raw) {
  const fm = {};
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return fm;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) fm[kv[1].trim()] = kv[2].trim();
  }
  return fm;
}

function escapeHtml(s) {
  return s.replaceAll(/&/g, '&amp;').replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;');
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const template = fs.readFileSync(path.join(root, 'scripts/og-journal-card.html'), 'utf8');
const allPosts = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
const posts = onlySlug ? allPosts.filter((f) => f.replace(/\.md$/, '') === onlySlug) : allPosts;

if (onlySlug && posts.length === 0) {
  console.error(`No public journal post found for --slug=${onlySlug}`);
  process.exit(1);
}

// Launching Chrome costs seconds, so skip it entirely when every card is present.
// This keeps the publisher's per-post call cheap.
const pending = posts.filter((file) => {
  const slug = frontmatter(fs.readFileSync(path.join(contentDir, file), 'utf8')).slug || file.replace(/\.md$/, '');
  return force || !fs.existsSync(path.join(outDir, `${slug}.jpg`));
});

if (pending.length === 0) {
  console.log(`done — 0 card(s) rendered, ${posts.length} skipped`);
  process.exit(0);
}

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

let rendered = 0;
for (const file of pending) {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const fm = frontmatter(raw);
  const slug = fm.slug || file.replace(/\.md$/, '');
  const out = path.join(outDir, `${slug}.jpg`);

  // Same formula as src/lib/markdown.ts so the card matches the byline.
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const readTime = Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
  const html = template
    .replaceAll('{{CATEGORY}}', escapeHtml(fm.category || 'Journal'))
    .replaceAll('{{TITLE}}', escapeHtml(fm.title || slug))
    .replaceAll('{{DATE}}', fm.date ? formatDate(fm.date) : '')
    .replaceAll('{{READTIME}}', ` <span class="sep">·</span>${readTime} min read`);

  const tmp = path.join(outDir, `.${slug}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto('file://' + tmp, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: out, type: 'jpeg', quality: 85 });
  fs.unlinkSync(tmp);
  rendered++;
  console.log('rendered', `${slug}.jpg`);
}

await browser.close();
console.log(`done — ${rendered} card(s) rendered, ${posts.length - rendered} skipped`);
