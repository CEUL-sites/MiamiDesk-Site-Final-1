// Loads all journal posts from /src/content/journal/*.md at build time via Vite's import.meta.glob.
// Files prefixed with _ (e.g. _template.md) are excluded — use them as drafts or starters.

const modules = import.meta.glob('../content/journal/[^_]*.md', {
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
  image: string;
  readTime: number;
  body: string;
}

// ---------------------------------------------------------------------------
// Frontmatter parser
// Extracts key: "value" pairs between the first pair of --- delimiters.
// ---------------------------------------------------------------------------
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const fm: Record<string, string> = {};

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: fm, body: raw };

  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) fm[kv[1].trim()] = kv[2].trim();
  }

  return { meta: fm, body: match[2] };
}

// ---------------------------------------------------------------------------
// Inline formatter — runs on text within block elements
// ---------------------------------------------------------------------------
function inline(text: string): string {
  // Links: [text](url) — external links open in new tab, internal links navigate in-place
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, label: string, href: string) => {
      const isExternal = href.startsWith('http');
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}" class="text-gold underline underline-offset-2 hover:text-gold/70 transition-colors"${attrs}>${label}</a>`;
    },
  );
  // Bold: **text**
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>');
  // Italic: *text*
  text = text.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  // Inline code: `code`
  text = text.replace(/`([^`]+)`/g, '<code class="font-mono text-[0.85em] bg-gold/10 px-1.5 py-0.5 rounded">$1</code>');
  return text;
}

// ---------------------------------------------------------------------------
// Block-level Markdown → HTML converter
// Supports: ##, ###, -, *, 1., >, ---, ![img](), paragraphs
// ---------------------------------------------------------------------------
function markdownToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const html: string[] = [];

  type State = 'none' | 'p' | 'ul' | 'ol' | 'blockquote';
  let state: State = 'none';

  const close = () => {
    if (state === 'p') html.push('</p>');
    else if (state === 'ul') html.push('</ul>');
    else if (state === 'ol') html.push('</ol>');
    else if (state === 'blockquote') html.push('</blockquote>');
    state = 'none';
  };

  for (const line of lines) {
    const t = line.trim();

    // Blank line — close current block
    if (t === '') { close(); continue; }

    // Horizontal rule (--- or ***) — must check before list detection
    if (/^[-*]{3,}$/.test(t)) {
      close();
      html.push('<hr class="border-bone my-8" />');
      continue;
    }

    // H3 ###
    if (t.startsWith('### ')) {
      close();
      html.push(`<h3 class="font-serif text-xl text-navy mt-8 mb-3">${inline(t.slice(4))}</h3>`);
      continue;
    }

    // H2 ##
    if (t.startsWith('## ')) {
      close();
      html.push(`<h2 class="font-serif text-2xl text-navy mt-10 mb-4 border-b border-bone pb-2">${inline(t.slice(3))}</h2>`);
      continue;
    }

    // Blockquote >
    if (t.startsWith('> ')) {
      if (state !== 'blockquote') {
        close();
        html.push('<blockquote class="border-l-2 border-gold/50 pl-5 italic text-navy/60 my-6 space-y-2">');
        state = 'blockquote';
      }
      html.push(`<p>${inline(t.slice(2))}</p>`);
      continue;
    }

    // Unordered list: - or *
    if (/^[-*] /.test(t)) {
      if (state !== 'ul') {
        close();
        html.push('<ul class="list-disc pl-6 mb-5 space-y-1.5 text-navy/85">');
        state = 'ul';
      }
      html.push(`<li class="leading-relaxed">${inline(t.slice(2))}</li>`);
      continue;
    }

    // Ordered list: 1.
    if (/^\d+\. /.test(t)) {
      if (state !== 'ol') {
        close();
        html.push('<ol class="list-decimal pl-6 mb-5 space-y-1.5 text-navy/85">');
        state = 'ol';
      }
      html.push(`<li class="leading-relaxed">${inline(t.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // Image: ![alt](src)
    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      close();
      html.push(`<img src="${img[2]}" alt="${img[1]}" loading="lazy" class="w-full my-8 border border-bone" />`);
      continue;
    }

    // Paragraph text
    if (state !== 'p') {
      close();
      html.push('<p class="leading-relaxed text-navy/85 mb-5">');
      state = 'p';
    } else {
      html.push(' ');
    }
    html.push(inline(t));
  }

  close();
  return html.join('');
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

    const wordCount = body.trim().split(/\s+/).length;

    posts.push({
      title:    meta.title,
      date:     meta.date     ?? '',
      slug:     meta.slug,
      excerpt:  meta.excerpt  ?? '',
      category: meta.category ?? 'General',
      image:    meta.image    ?? '',
      readTime: Math.max(1, Math.ceil(wordCount / 200)),
      body:     markdownToHtml(body),
    });
  }

  posts.sort((a, b) => b.date.localeCompare(a.date));
  return posts;
}

let _cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (!_cache) _cache = parseAll();
  return _cache;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

// Branded cover images generated per category in public/images/journal/covers/.
// Posts without an explicit `image` frontmatter field fall back to their
// category's cover, so future posts get covers automatically.
const CATEGORY_COVERS = new Set([
  'market-analysis',
  'seller-strategy',
  'international',
  'new-construction',
  'buyer-guide',
  'buyer-intelligence',
  'weston-market-report',
  'south-florida-market-intelligence',
]);

export function getPostCover(post: PostMeta): string {
  if (post.image) return post.image;
  const slug = (post.category ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (CATEGORY_COVERS.has(slug)) return `/images/journal/covers/${slug}.jpg`;
  return '/images/social/og-default.jpg';
}
