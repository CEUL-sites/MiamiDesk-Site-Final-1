// Loads all journal posts from /src/content/journal/*.md at build time via Vite's import.meta.glob.
// Vite 6 supports `{ eager: true, query: '?raw', import: 'default' }` to get raw string content.

const modules = import.meta.glob('../content/journal/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  category: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Frontmatter parser
// Extracts key: "value" pairs between the first pair of --- delimiters.
// ---------------------------------------------------------------------------
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const fm: Record<string, string> = {};

  // Require file to start with ---
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: fm, body: raw };
  }

  const fmBlock = match[1];
  const bodyRaw = match[2];

  // Parse lines like:  key: "value"  or  key: value
  for (const line of fmBlock.split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) {
      fm[kv[1].trim()] = kv[2].trim();
    }
  }

  return { meta: fm, body: bodyRaw };
}

// ---------------------------------------------------------------------------
// Minimal Markdown → HTML converter
// Handles: h2 (##), h3 (###), bold (**text**), italic (*text*), paragraphs.
// ---------------------------------------------------------------------------
function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const htmlLines: string[] = [];
  let inParagraph = false;

  const closeParagraph = () => {
    if (inParagraph) {
      htmlLines.push('</p>');
      inParagraph = false;
    }
  };

  const inlineFormat = (text: string): string => {
    // Bold: **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text* (not already part of **)
    text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    return text;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      closeParagraph();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      closeParagraph();
      htmlLines.push(`<h3 class="font-serif text-xl text-navy mt-8 mb-3">${inlineFormat(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      closeParagraph();
      htmlLines.push(`<h2 class="font-serif text-2xl text-navy mt-10 mb-4 border-b border-bone pb-2">${inlineFormat(trimmed.slice(3))}</h2>`);
      continue;
    }

    // Regular text — accumulate into paragraph
    if (!inParagraph) {
      htmlLines.push('<p class="leading-relaxed text-navy/85 mb-5">');
      inParagraph = true;
    } else {
      // Line continuation within paragraph — add a space
      htmlLines.push(' ');
    }
    htmlLines.push(inlineFormat(trimmed));
  }

  closeParagraph();
  return htmlLines.join('');
}

// ---------------------------------------------------------------------------
// Parse all loaded modules into PostMeta[]
// ---------------------------------------------------------------------------
function parseAll(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const [, raw] of Object.entries(modules)) {
    if (typeof raw !== 'string') continue;

    const { meta, body } = parseFrontmatter(raw);
    if (!meta.slug || !meta.title) continue;

    posts.push({
      title: meta.title,
      date: meta.date ?? '',
      slug: meta.slug,
      excerpt: meta.excerpt ?? '',
      category: meta.category ?? 'General',
      body: markdownToHtml(body),
    });
  }

  // Sort descending by date string (ISO 8601 sorts lexicographically)
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

// Cache result — modules are static at build time so no need to re-parse.
let _cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (!_cache) _cache = parseAll();
  return _cache;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
