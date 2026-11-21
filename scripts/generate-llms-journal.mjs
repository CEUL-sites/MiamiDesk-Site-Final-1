import fs from 'node:fs';
import path from 'node:path';

// Adds a "Journal guides" section to dist/llms.txt, generated from the
// published journal index, so AI retrieval crawlers see every dated guide and
// not only the /journal index link. It runs in postbuild and only touches
// dist/, so public/llms.txt (hand-written, compliance-reviewed) stays the
// source and a journal PR still touches exactly its five files.
//
// Titles and excerpts come from post frontmatter, which already passes
// verify:journal and compliance review; nothing new is written here.
const SITE_URL = 'https://homesprofessional.com';
const target = path.join('dist', 'llms.txt');
const HEADING = '## Journal guides';
const ANCHOR = '## Brokerage and association context';

if (!fs.existsSync(target)) {
  console.error(`generate-llms-journal: ${target} not found (run after vite build)`);
  process.exit(1);
}

const posts = JSON.parse(fs.readFileSync('src/data/journalIndex.json', 'utf8'))
  .filter((post) => post.slug && post.title && /^\d{4}-\d{2}-\d{2}$/.test(post.date))
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

const oneLine = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const lines = posts.map((post) => {
  const excerpt = oneLine(post.excerpt);
  return `- [${oneLine(post.title)}](${SITE_URL}/journal/${post.slug}) (${post.date})${excerpt ? `: ${excerpt}` : ''}`;
});

const section = [
  HEADING,
  'Dated seller and transaction guides, newest first. Each guide cites its own sources and reporting period; figures describe the period and geography named in the guide.',
  ...lines,
  '',
  '',
].join('\n');

let text = fs.readFileSync(target, 'utf8');
// Replace a section left by an earlier run on the same dist/ (up to the
// next heading), otherwise insert it ahead of the brokerage section.
const existing = new RegExp(`${HEADING}\\n[\\s\\S]*?(?=\\n## )\\n`);
if (existing.test(text)) {
  text = text.replace(existing, section);
} else if (text.includes(ANCHOR)) {
  text = text.replace(ANCHOR, `${section}${ANCHOR}`);
} else {
  console.error(`generate-llms-journal: anchor "${ANCHOR}" missing from llms.txt`);
  process.exit(1);
}

fs.writeFileSync(target, text);
console.log(`llms.txt: ${posts.length} journal guides listed`);
