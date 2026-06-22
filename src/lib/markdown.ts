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
  /** Optional `updated:` frontmatter (YYYY-MM-DD). Drives schema dateModified. */
  updated: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: number;
  body: string;
  /** Who produced this post — used for attribution reporting. */
  created_by?: "claude" | "codex" | "manual" | "unknown";
  /** Primary conversion goal — used for GA4 event context. */
  content_goal?: "seller_lead" | "buyer_lead" | "agent_referral" | "international_listing" | "credibility" | "market_report";
  /** Primary geographic market targeted by this post. */
  market?: string;
  /** Funnel position of this content. */
  funnel_stage?: "awareness" | "consideration" | "bottom_funnel";
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

  // Splits a pipe-delimited table row into trimmed cells, ignoring the
  // optional leading/trailing pipes.
  const splitRow = (row: string): string[] =>
    row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();

    // Blank line — close current block
    if (t === '') { close(); continue; }

    // Horizontal rule (--- or ***) — must check before list detection
    if (/^[-*]{3,}$/.test(t)) {
      close();
      html.push('<hr class="border-bone my-12" />');
      continue;
    }

    // Table: a | cell | cell | header row directly followed by a
    // | --- | --- | separator row. Cells support inline formatting.
    if (t.startsWith('|') && i + 1 < lines.length) {
      const sep = lines[i + 1].trim();
      if (/^\|?[\s:|-]+\|?$/.test(sep) && sep.includes('-')) {
        close();
        const head = splitRow(t);
        const headerEmpty = head.every((c) => c === '');
        const rows: string[][] = [];
        i += 1; // consume separator row
        while (i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
          i += 1;
          rows.push(splitRow(lines[i].trim()));
        }
        const thead = headerEmpty
          ? ''
          : `<thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${rows
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
          .join('')}</tbody>`;
        html.push(`<div class="prose-table"><table>${thead}${tbody}</table></div>`);
        continue;
      }
    }

    // H3 ###
    if (t.startsWith('### ')) {
      close();
      html.push(`<h3 class="font-serif text-xl text-navy mt-11 mb-3.5">${inline(t.slice(4))}</h3>`);
      continue;
    }

    // H2 ##
    if (t.startsWith('## ')) {
      close();
      html.push(`<h2 class="font-serif text-2xl text-navy mt-14 mb-5 border-b border-bone pb-3">${inline(t.slice(3))}</h2>`);
      continue;
    }

    // Blockquote >
    if (t.startsWith('> ')) {
      if (state !== 'blockquote') {
        close();
        html.push('<blockquote class="border-l-2 border-gold/50 pl-6 italic text-lg leading-relaxed text-navy/60 my-9 space-y-2">');
        state = 'blockquote';
      }
      html.push(`<p>${inline(t.slice(2))}</p>`);
      continue;
    }

    // Unordered list: - or *
    if (/^[-*] /.test(t)) {
      if (state !== 'ul') {
        close();
        html.push('<ul class="list-disc pl-6 mb-7 space-y-3 text-navy/85 marker:text-gold/60">');
        state = 'ul';
      }
      html.push(`<li class="leading-relaxed pl-1.5">${inline(t.slice(2))}</li>`);
      continue;
    }

    // Ordered list: 1.
    if (/^\d+\. /.test(t)) {
      if (state !== 'ol') {
        close();
        html.push('<ol class="list-decimal pl-6 mb-7 space-y-3 text-navy/85 marker:text-gold/60">');
        state = 'ol';
      }
      html.push(`<li class="leading-relaxed pl-1.5">${inline(t.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // Image: ![alt](src)
    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      close();
      html.push(`<img src="${img[2]}" alt="${img[1]}" loading="lazy" class="w-full my-10 border border-bone" />`);
      continue;
    }

    // Paragraph text
    if (state !== 'p') {
      close();
      html.push('<p class="leading-relaxed text-navy/85 mb-6">');
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
      title:        meta.title,
      date:         meta.date         ?? '',
      updated:      meta.updated      ?? '',
      slug:         meta.slug,
      excerpt:      meta.excerpt      ?? '',
      category:     meta.category     ?? 'General',
      image:        meta.image        ?? '',
      readTime:     Math.max(1, Math.ceil(wordCount / 200)),
      body:         markdownToHtml(body),
      created_by:   (meta.created_by  as PostMeta['created_by'])   ?? 'unknown',
      content_goal: (meta.content_goal as PostMeta['content_goal']) ?? 'seller_lead',
      market:       meta.market       ?? 'South Florida',
      funnel_stage: (meta.funnel_stage as PostMeta['funnel_stage']) ?? 'awareness',
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
