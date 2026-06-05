// ===========================================================================
// src/fetcher.js
// Step 1 of the pipeline: pull RSS (+ optional Bridge MLS), score each story
// for South Florida seller relevance, return the top 8 candidates.
// Native fetch only. A small dependency-free RSS/XML reader is included.
// ===========================================================================

import { config } from '../config/config.js';
import { fetchWithRetry, logger } from './utils.js';

// ---- Minimal RSS/Atom parsing (no external deps) --------------------------

function decodeEntities(str = '') {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();
}

function stripTags(html = '') {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

function pickTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? decodeEntities(m[1]) : '';
}

/** Parse an RSS 2.0 or Atom feed string into an array of normalized items. */
function parseFeed(xml, sourceName) {
  const items = [];
  const isAtom = /<feed[\s>]/i.test(xml) && !/<rss[\s>]/i.test(xml);
  const blocks = isAtom
    ? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || []
    : xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];

  for (const block of blocks) {
    const title = pickTag(block, 'title');
    let link = pickTag(block, 'link');
    if (isAtom && !link) {
      const lm = block.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
      link = lm ? lm[1] : '';
    }
    const description =
      pickTag(block, 'description') ||
      pickTag(block, 'summary') ||
      pickTag(block, 'content') ||
      pickTag(block, 'content:encoded');
    const pubDate =
      pickTag(block, 'pubDate') ||
      pickTag(block, 'published') ||
      pickTag(block, 'updated') ||
      pickTag(block, 'dc:date');

    if (title) {
      items.push({
        source: sourceName,
        title: stripTags(title),
        link: link.trim(),
        summary: stripTags(description).slice(0, 600),
        publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
      });
    }
  }
  return items;
}

// ---- Relevance scoring ----------------------------------------------------

// Weighted keyword buckets oriented toward South Florida seller relevance.
const SCORE_TERMS = [
  { weight: 6, terms: ['miami', 'south florida', 'fort lauderdale', 'broward', 'palm beach', 'miami-dade'] },
  { weight: 4, terms: ['luxury', 'high-end', 'waterfront', 'penthouse', 'mansion', 'estate'] },
  { weight: 4, terms: ['seller', 'listing', 'list price', 'home prices', 'inventory', 'days on market'] },
  { weight: 3, terms: ['international', 'foreign buyer', 'latam', 'latin america', 'spain', 'cross-border'] },
  { weight: 3, terms: ['new construction', 'pre-construction', 'condo', 'development'] },
  { weight: 2, terms: ['mortgage rates', 'interest rates', 'affordability', 'demand', 'sales volume'] },
  { weight: 2, terms: ['florida', 'sunbelt', 'relocation', 'migration'] },
];

const FRESHNESS_HALF_LIFE_DAYS = 21;

function scoreStory(story) {
  const haystack = `${story.title} ${story.summary}`.toLowerCase();
  let score = 0;
  const matched = [];
  for (const bucket of SCORE_TERMS) {
    for (const term of bucket.terms) {
      if (haystack.includes(term)) {
        score += bucket.weight;
        matched.push(term);
      }
    }
  }
  // Source weighting (Miami REALTORS® outranks national feeds).
  const sourceCfg = config.rssFeeds.find((f) => f.name === story.source);
  if (sourceCfg) score += sourceCfg.weight;

  // Freshness decay.
  if (story.publishedAt) {
    const ageDays = (Date.now() - new Date(story.publishedAt).getTime()) / 86400000;
    if (Number.isFinite(ageDays) && ageDays >= 0) {
      score += 5 * Math.pow(0.5, ageDays / FRESHNESS_HALF_LIFE_DAYS);
    }
  }
  return { ...story, score: Math.round(score * 100) / 100, matchedTerms: [...new Set(matched)] };
}

// ---- Optional Bridge IDX MLS source ---------------------------------------

async function fetchBridgeListings() {
  if (!config.bridge.apiKey) return [];
  try {
    const url =
      `${config.bridge.apiBase}/OData/test/Property?` +
      `access_token=${encodeURIComponent(config.bridge.apiKey)}` +
      `&$top=10&$orderby=ModificationTimestamp desc` +
      `&$filter=StandardStatus eq 'Active'`;
    const res = await fetchWithRetry(url, {}, { label: 'Bridge IDX', retries: 2 });
    if (!res.ok) {
      logger.warn(`Bridge IDX returned HTTP ${res.status}; skipping MLS source.`);
      return [];
    }
    const data = await res.json();
    const records = Array.isArray(data.value) ? data.value : [];
    return records.map((r) => ({
      source: 'Bridge IDX MLS',
      title: `${r.City || 'South Florida'} listing: ${r.UnparsedAddress || r.ListingId || 'Active property'}`,
      link: '',
      summary:
        `Active MLS listing${r.ListPrice ? ` at $${Number(r.ListPrice).toLocaleString()}` : ''}` +
        `${r.PropertyType ? `, ${r.PropertyType}` : ''}${r.City ? ` in ${r.City}, FL` : ''}.`,
      publishedAt: r.ModificationTimestamp || null,
    }));
  } catch (err) {
    logger.warn(`Bridge IDX fetch failed: ${err.message}; continuing without it.`);
    return [];
  }
}

// ---- Public entry point ---------------------------------------------------

/**
 * Fetch all sources, score, and return the top 8 candidate stories.
 * @returns {Promise<{candidates: object[], fetched: number, sources: object[]}>}
 */
export async function fetchTopStories() {
  const all = [];
  const sourceStatus = [];

  for (const feed of config.rssFeeds) {
    try {
      const res = await fetchWithRetry(
        feed.url,
        { headers: { 'User-Agent': 'CarlosRE-Social-Automation/1.0 (+homesprofessional.com)' } },
        { label: feed.name, retries: 3 },
      );
      if (!res.ok) {
        logger.warn(`${feed.name}: HTTP ${res.status}`);
        sourceStatus.push({ name: feed.name, ok: false, count: 0, error: `HTTP ${res.status}` });
        continue;
      }
      const xml = await res.text();
      const items = parseFeed(xml, feed.name);
      all.push(...items);
      sourceStatus.push({ name: feed.name, ok: true, count: items.length });
      logger.ok(`${feed.name}: ${items.length} stories`);
    } catch (err) {
      logger.warn(`${feed.name}: ${err.message}`);
      sourceStatus.push({ name: feed.name, ok: false, count: 0, error: err.message });
    }
  }

  const bridge = await fetchBridgeListings();
  if (bridge.length) {
    all.push(...bridge);
    sourceStatus.push({ name: 'Bridge IDX MLS', ok: true, count: bridge.length });
  }

  // Score, de-duplicate by title, sort, take top 8.
  const seen = new Set();
  const scored = all
    .map(scoreStory)
    .filter((s) => {
      const key = s.title.toLowerCase().slice(0, 80);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.score - a.score);

  return {
    candidates: scored.slice(0, 8),
    fetched: all.length,
    sources: sourceStatus,
  };
}

export default { fetchTopStories };
