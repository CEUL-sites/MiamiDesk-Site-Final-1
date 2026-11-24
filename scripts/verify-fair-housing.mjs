// Fails when area-facing public copy describes a place by the national origin,
// ethnicity or religion of its buyers or residents. Rules: scripts/fair-housing.mjs.
//
// Scope: per-city seller pages (EN + ES), the Spanish buyer page, the markets
// page, the county explorer, and every published journal post except the
// Global Desk service posts listed in SERVICE_POSTS, which describe the
// Spain/LATAM cooperation service rather than any South Florida area.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { findFairHousingIssues } from './fair-housing.mjs';

const root = process.cwd();
const SERVICE_POSTS = new Set([
  'international-luxury-properties-miami-buyer-agents-global-desk.md',
  'miami-listing-desk-spanish-prime-real-estate.md',
  'spain-american-investors-2026.md',
  'global-luxury-investment-buyer-agent-network-2026.md',
]);

const files = [];
const pages = path.join(root, 'src/pages');
for (const name of fs.readdirSync(pages)) if (/^Sell.*Page\.tsx$/.test(name)) files.push(path.join(pages, name));
const es = path.join(pages, 'es');
for (const name of fs.readdirSync(es)) if (/^EsVender.*Page\.tsx$/.test(name) || name === 'EsComprarPage.tsx') files.push(path.join(es, name));
files.push(path.join(pages, 'MarketsPage.tsx'), path.join(root, 'src/components/CountyExplorer.tsx'));
const journal = path.join(root, 'src/content/journal');
for (const e of fs.readdirSync(journal, { withFileTypes: true })) {
  if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_') && !SERVICE_POSTS.has(e.name)) files.push(path.join(journal, e.name));
}
assert.ok(files.length > 40, `fair-housing scope looks broken: only ${files.length} files`);

const failures = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const issue of findFairHousingIssues(text)) {
    const line = text.slice(0, issue.index).split('\n').length;
    failures.push(`${path.relative(root, file)}:${line}  [${issue.rule}]  "${issue.match}"`);
  }
}

if (failures.length) {
  console.error(`Fair housing check failed — ${failures.length} hit(s). Describe the property and the place, not the people:\n` + failures.join('\n'));
  process.exit(1);
}
console.log(`Fair housing check passed for ${files.length} files.`);
