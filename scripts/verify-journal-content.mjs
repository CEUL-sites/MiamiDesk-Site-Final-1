import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const journalDir = path.join(root, 'src', 'content', 'journal');
const packagePath = path.join(root, 'package.json');

const requiredFrontmatter = ['title', 'date', 'slug', 'excerpt', 'category'];
const complianceFooter = 'Florida Licensed Realtor(R) SL705771 | United Realty Group | Equal Housing Opportunity.';
const verifiedFigureViolations = [
  {
    pattern: /\b21\s+Florida\s+offices\b/i,
    message: 'Use the approved United Realty Group figure: 20 Florida offices.',
  },
];

function fail(errors) {
  console.error('Journal content verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw, hasFrontmatter: false };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) meta[kv[1].trim()] = kv[2].trim();
  }

  return { meta, body: match[2], hasFrontmatter: true };
}

if (!fs.existsSync(journalDir)) {
  fail([`Missing journal directory: ${path.relative(root, journalDir)}`]);
}

const files = fs
  .readdirSync(journalDir)
  .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
  .sort();

const errors = [];
const slugs = new Map();

if (files.length === 0) {
  errors.push('No public journal Markdown posts found in src/content/journal.');
}

for (const file of files) {
  const filePath = path.join(journalDir, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { meta, body, hasFrontmatter } = parseFrontmatter(raw);
  const label = `src/content/journal/${file}`;
  const expectedSlug = file.replace(/\.md$/, '');

  if (!hasFrontmatter) {
    errors.push(`${label}: missing frontmatter block.`);
    continue;
  }

  for (const key of requiredFrontmatter) {
    if (!meta[key]) errors.push(`${label}: missing required frontmatter field "${key}".`);
  }

  if (meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    errors.push(`${label}: date must use YYYY-MM-DD format.`);
  }

  if (meta.slug && meta.slug !== expectedSlug) {
    errors.push(`${label}: slug "${meta.slug}" must match filename "${expectedSlug}".`);
  }

  if (meta.slug) {
    if (slugs.has(meta.slug)) errors.push(`${label}: duplicate slug also used by ${slugs.get(meta.slug)}.`);
    slugs.set(meta.slug, label);
  }

  if (!body.includes(complianceFooter)) {
    errors.push(`${label}: missing required compliance footer.`);
  }

  for (const rule of verifiedFigureViolations) {
    if (rule.pattern.test(raw)) errors.push(`${label}: ${rule.message}`);
  }
}

if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const include = new Set(pkg.reactSnap?.include ?? []);

  if (!include.has('/journal')) {
    errors.push('package.json reactSnap.include is missing /journal.');
  }

  for (const slug of slugs.keys()) {
    const route = `/journal/${slug}`;
    if (!include.has(route)) errors.push(`package.json reactSnap.include is missing ${route}.`);
  }
} else {
  errors.push('Missing package.json; cannot verify prerender route coverage.');
}

if (errors.length > 0) fail(errors);

console.log(`Journal content verification passed for ${files.length} public posts.`);
