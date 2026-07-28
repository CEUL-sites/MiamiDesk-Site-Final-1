// Applies an approved set of <title> rewrites produced by the page-title
// review tool.
//
// The review tool exports a JSON array of
//   { route, journal, from, to }
// where `from` is the title the page renders TODAY and `to` is the approved
// replacement. This script maps each route back to the file that owns its
// title and rewrites it — but only when the file still says exactly what the
// export claims it says. A stale export (someone edited a title in between)
// is reported and skipped rather than silently overwritten.
//
// Journal posts own their title in markdown frontmatter. Every other route
// owns it as a literal inside a <title> tag in its page component; routes
// whose title is built from a variable or template expression cannot be
// rewritten safely and are reported for hand editing.
//
// Usage:
//   node scripts/apply-title-fixes.mjs approved.json            # dry run
//   node scripts/apply-title-fixes.mjs approved.json --apply    # write
//
// Journal titles are rendered with a 46-character brand suffix appended in
// JournalPostPage.tsx. Approved journal titles are complete titles, so with
// --apply that suffix is removed as well (pass --keep-suffix to leave it,
// though that reintroduces the length problem this script exists to fix).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
const payloadPath = args.find((a) => !a.startsWith('--'));
const APPLY = args.includes('--apply');
const KEEP_SUFFIX = args.includes('--keep-suffix');

const JOURNAL_SUFFIX = ' | Carlos Uzcategui · South Florida Real Estate';
const POST_PAGE = path.join(root, 'src/pages/JournalPostPage.tsx');

if (!payloadPath) {
  console.error('usage: node scripts/apply-title-fixes.mjs <approved.json> [--apply]');
  process.exit(1);
}
if (!fs.existsSync(payloadPath)) {
  console.error(`payload not found: ${payloadPath}`);
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
} catch (err) {
  console.error(`payload is not valid JSON: ${err.message}`);
  process.exit(1);
}
if (!Array.isArray(payload)) {
  console.error('payload must be a JSON array of {route, from, to}');
  process.exit(1);
}

// ── route → page component, parsed from the router ────────────────────────
function buildRouteMap() {
  const src = fs.readFileSync(path.join(root, 'src/main.tsx'), 'utf8');
  const comps = new Map();
  for (const m of src.matchAll(/(?:const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(|import\s+(\w+)\s+from\s+)['"]([^'"]+)['"]/g)) {
    const name = m[1] || m[2];
    if (name && m[3].includes('/pages/')) comps.set(name, m[3]);
  }
  const routes = new Map();
  for (const m of src.matchAll(/<Route\s+path=["']([^"']+)["']\s+element=\{<(\w+)\s*\/>\}/g)) {
    const rel = comps.get(m[2]);
    if (!rel) continue;
    const file = path.join(root, 'src', rel.replace(/^\.\//, '') + '.tsx');
    if (fs.existsSync(file)) routes.set(m[1], file);
  }
  return routes;
}

const routeMap = buildRouteMap();
const results = { changed: [], stale: [], manual: [], missing: [], noop: [] };

// ── journal frontmatter ───────────────────────────────────────────────────
function applyJournal(entry) {
  const slug = entry.route.replace('/journal/', '');
  const file = path.join(root, 'src/content/journal', `${slug}.md`);
  if (!fs.existsSync(file)) return results.missing.push({ ...entry, why: 'no markdown file' });

  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return results.missing.push({ ...entry, why: 'no frontmatter' });

  const titleLine = fmMatch[1].match(/^title:\s*"?(.*?)"?\s*$/m);
  if (!titleLine) return results.missing.push({ ...entry, why: 'no title field' });

  const currentPost = titleLine[1];
  const expectedPost = entry.from.endsWith(JOURNAL_SUFFIX)
    ? entry.from.slice(0, -JOURNAL_SUFFIX.length)
    : entry.from;

  if (currentPost !== expectedPost) {
    return results.stale.push({ ...entry, why: `file says "${currentPost}"` });
  }

  // `title` is the on-page H1 and is deliberately left alone — only the
  // <title> tag is shortened, via the seoTitle field.
  const existingSeo = fmMatch[1].match(/^seoTitle:\s*"?(.*?)"?\s*$/m);
  if (existingSeo && existingSeo[1] === entry.to) return results.noop.push(entry);
  if (currentPost === entry.to && !existingSeo) return results.noop.push(entry);

  const line = `seoTitle: ${JSON.stringify(entry.to)}`;
  const next = existingSeo
    ? raw.replace(/^seoTitle:.*$/m, line)
    : raw.replace(/^(title:.*)$/m, `$1\n${line}`);

  if (next === raw) return results.missing.push({ ...entry, why: 'seoTitle not written' });
  if (APPLY) fs.writeFileSync(file, next);
  results.changed.push({ ...entry, file: path.relative(root, file) });
}

// ── page component <title> ────────────────────────────────────────────────
function applyPage(entry) {
  const file = routeMap.get(entry.route);
  if (!file) return results.missing.push({ ...entry, why: 'route not in router' });

  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/<title>([\s\S]*?)<\/title>/);
  if (!m) return results.missing.push({ ...entry, why: 'no <title> tag' });

  // A <title> may be wrapped across lines by the formatter; compare on the
  // single-line form the page actually renders.
  const inner = m[1].replace(/\s+/g, ' ').trim();
  if (inner.startsWith('{')) {
    return results.manual.push({
      ...entry,
      file: path.relative(root, file),
      why: 'title is a JSX expression',
    });
  }
  if (inner !== entry.from) {
    return results.stale.push({ ...entry, why: `file says "${inner}"` });
  }
  if (inner === entry.to) return results.noop.push(entry);

  const next = raw.replace(m[0], `<title>${entry.to}</title>`);
  if (APPLY) fs.writeFileSync(file, next);
  results.changed.push({ ...entry, file: path.relative(root, file) });
}

for (const entry of payload) {
  if (!entry || typeof entry.route !== 'string' || typeof entry.to !== 'string') {
    results.missing.push({ route: String(entry && entry.route), why: 'malformed entry' });
    continue;
  }
  if (!entry.to.trim()) {
    results.missing.push({ ...entry, why: 'empty replacement title' });
    continue;
  }
  if (entry.route.startsWith('/journal/')) applyJournal(entry);
  else applyPage(entry);
}

// ── drop the brand suffix so approved journal titles render verbatim ──────
let suffixNote = 'not needed';
if (results.changed.some((c) => c.route.startsWith('/journal/'))) {
  const raw = fs.readFileSync(POST_PAGE, 'utf8');
  // Match the whole tag, braces included — replacing only the inner template
  // literal would leave `<title>{{post.title}}</title>`, which JSX reads as an
  // object literal rather than an expression.
  const needle =
    '<title>{`${post.title} | Carlos Uzcategui · South Florida Real Estate`}</title>';
  if (!raw.includes(needle)) {
    suffixNote = 'already removed (or changed shape — check by hand)';
  } else if (KEEP_SUFFIX) {
    suffixNote = 'LEFT IN PLACE (--keep-suffix) — titles will still overflow';
  } else {
    if (APPLY)
      fs.writeFileSync(POST_PAGE, raw.replace(needle, '<title>{post.title}</title>'));
    suffixNote = 'removed from JournalPostPage.tsx';
  }
}

// ── report ────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(3);
console.log(`\n${APPLY ? 'APPLIED' : 'DRY RUN — nothing written'} · payload: ${payloadPath}\n`);
console.log(`${pad(results.changed.length)} titles rewritten`);
console.log(`${pad(results.noop.length)} already correct`);
console.log(`${pad(results.stale.length)} skipped — file no longer matches the export`);
console.log(`${pad(results.manual.length)} need hand editing (dynamic title)`);
console.log(`${pad(results.missing.length)} could not be resolved`);
console.log(`    journal brand suffix: ${suffixNote}`);

for (const [label, list] of [
  ['SKIPPED (stale)', results.stale],
  ['HAND EDIT', results.manual],
  ['UNRESOLVED', results.missing],
]) {
  if (!list.length) continue;
  console.log(`\n${label}:`);
  for (const e of list) console.log(`  ${e.route}\n      ${e.why}`);
}

if (!APPLY && results.changed.length) {
  console.log('\nre-run with --apply to write these changes.');
}

const blocked = results.stale.length + results.missing.length;
process.exit(blocked > 0 ? 2 : 0);
