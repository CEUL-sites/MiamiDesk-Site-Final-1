import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const journalDir = path.join(root, 'src', 'content', 'journal');
const outputFile = path.join(root, 'src', 'data', 'journalIndex.json');

const files = fs.readdirSync(journalDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
const posts = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(journalDir, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) continue;

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) meta[kv[1].trim()] = kv[2].trim();
  }

  if (!meta.slug || !meta.title) continue;

  const wordCount = match[2].trim().split(/\s+/).length;

  posts.push({
    title: meta.title,
    seoTitle: meta.seoTitle || '',
    date: meta.date || '',
    updated: meta.updated || '',
    slug: meta.slug,
    excerpt: meta.excerpt || '',
    category: meta.category || 'General',
    image: meta.image || '',
    readTime: Math.max(1, Math.ceil(wordCount / 200)),
    created_by: meta.created_by || 'unknown',
    content_goal: meta.content_goal || 'seller_lead',
    market: meta.market || 'South Florida',
    funnel_stage: meta.funnel_stage || 'awareness',
    filename: file,
  });
}

posts.sort((a, b) => b.date.localeCompare(a.date));

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf8');
console.log(`Generated ${outputFile} with ${posts.length} posts.`);
