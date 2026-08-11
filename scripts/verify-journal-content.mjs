import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const journalDir = path.join(root, 'src', 'content', 'journal');
const packagePath = path.join(root, 'package.json');

const requiredFrontmatter = ['title', 'date', 'slug', 'excerpt', 'category'];
// Canonical rule-7 compliance line. The site Footer component injects the full
// compliance footer on every journal page, so posts are NOT required to embed
// it in the body — but any body line that looks like a compliance footer must
// match this exact form (no "(R)", no pipe separators).
const complianceFooter = 'Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.';
const footerLikePattern = /Licensed\s+Realtor.*Equal\s+Housing/i;
const verifiedFigureViolations = [
  {
    pattern: /\b21\s+Florida\s+offices\b/i,
    message: 'Use the approved United Realty Group figure: 20 Florida offices.',
  },
  {
    pattern: /\$\s*69\s*B\b|69\s*billion/i,
    message: 'The $69B / $69 billion network-volume figure is banned from all public copy. Use approved United Realty Group facts (3,500+ agents, 20 Florida offices) instead.',
  },
  {
    pattern: /Realtor\s*\(\s*[Rr]\s*\)/,
    message: 'Use the "®" symbol, not "(R)": write "Realtor®".',
  },
];

// Rule 5 — banned vocabulary in public-facing copy. Previously this rule was
// enforced only by human/agent review, which is fine for hand-written posts
// but not for the daily automated publisher: it ships a post most mornings
// with no human in the loop, so an unreviewed superlative could go live and
// sit there indefinitely. Checked against the body AND the title/excerpt,
// since those become the <title> and meta description.
const bannedVocabulary = [
  { pattern: /\bdreams?\b/i, word: 'dream' },
  { pattern: /\bpassionate(ly)?\b/i, word: 'passionate' },
  { pattern: /\bbest\b/i, word: 'best' },
  { pattern: /\bstunning(ly)?\b/i, word: 'stunning' },
  { pattern: /\bamazing(ly)?\b/i, word: 'amazing' },
  { pattern: /\brare gem\b/i, word: 'rare gem' },
  { pattern: /\bworld[- ]class\b/i, word: 'world-class' },
  { pattern: /\bexcit(ed|ing|ement)\b/i, word: 'excited' },
];

// Exclamation marks are banned too, but markdown image syntax "![alt](url)"
// is documented as supported — strip those before checking so a post with a
// legitimate inline image isn't failed for punctuation it never wrote.
const withoutImageSyntax = (text) => text.replace(/!\[/g, '[');

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

  // A post pointing at a card that isn't there ships a broken og:image to every
  // scraper that reads the page.
  if (meta.image?.startsWith('/') && !fs.existsSync(path.join(root, 'public', meta.image))) {
    errors.push(`${label}: image "${meta.image}" has no file at public${meta.image}.`);
  }

  for (const line of body.split(/\r?\n/)) {
    if (footerLikePattern.test(line) && line.trim() !== complianceFooter) {
      errors.push(`${label}: malformed compliance footer "${line.trim()}" — must be exactly "${complianceFooter}".`);
    }
  }

  for (const rule of verifiedFigureViolations) {
    if (rule.pattern.test(raw)) errors.push(`${label}: ${rule.message}`);
  }

  // Rule 5 — banned vocabulary across body copy and the two frontmatter
  // fields that render publicly.
  const publicCopy = [body, meta.title ?? '', meta.excerpt ?? ''].join('\n');
  for (const { pattern, word } of bannedVocabulary) {
    const hit = publicCopy.match(pattern);
    if (hit) {
      errors.push(
        `${label}: banned word "${hit[0]}" (rule 5 bans "${word}"). Rewrite without it — ` +
          `e.g. "best" → "right"/"strongest", "best planned" → "better planned".`,
      );
    }
  }
  if (withoutImageSyntax(publicCopy).includes('!')) {
    errors.push(`${label}: exclamation marks are banned in public copy (rule 5).`);
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
