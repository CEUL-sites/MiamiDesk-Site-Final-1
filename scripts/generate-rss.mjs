import fs from 'node:fs';
import path from 'node:path';

// Journal RSS feed, generated in prebuild from the published journal index so
// feed readers, aggregators and AI retrieval crawlers get dated, canonical
// entries. Output is deterministic (lastBuildDate = newest post date) so a
// rebuild with no new post produces no diff.
const SITE_URL = 'https://homesprofessional.com';
const MAX_ITEMS = 50;
const posts = JSON.parse(fs.readFileSync('src/data/journalIndex.json', 'utf8'))
  .filter((post) => post.slug && post.title && /^\d{4}-\d{2}-\d{2}$/.test(post.date))
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, MAX_ITEMS);

const escapeXml = (value) =>
  String(value ?? '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
const rfc822 = (isoDate) => new Date(`${isoDate}T12:00:00Z`).toUTCString();

const items = posts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/journal/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/journal/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <category>${escapeXml(post.category || 'Seller Strategy')}</category>
    </item>`).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HomesProfessional.com Journal</title>
    <link>${SITE_URL}/journal</link>
    <description>South Florida seller strategy, dated market reports and transaction guides by Carlos Uzcategui. Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</description>
    <language>en-US</language>
    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join('public', 'rss.xml'), rssXml);
console.log(`Generated public/rss.xml with ${posts.length} latest journal posts.`);
