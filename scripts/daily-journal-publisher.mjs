import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const JOURNAL_DIR = path.join(ROOT, 'src', 'content', 'journal');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const SITE_URL = 'https://homesprofessional.com';
const YEAR = '2026';

const now = new Date();
const today = now.toISOString().slice(0, 10);
const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'America/New_York' }).format(now);

const markets = [
  { name: 'Weston', type: 'single-family home', buyerProfile: 'relocation, school-driven, and executive-family buyers', sellerPage: '/sell-weston' },
  { name: 'Coral Gables', type: 'luxury home', buyerProfile: 'estate, executive, and international buyers', sellerPage: '/sell-coral-gables' },
  { name: 'Aventura', type: 'condo or waterfront home', buyerProfile: 'international, downsizing, and second-home buyers', sellerPage: '/sell-aventura' },
  { name: 'Doral', type: 'single-family home', buyerProfile: 'LATAM, corporate relocation, and family buyers', sellerPage: '/sell-doral' },
  { name: 'Brickell', type: 'condominium', buyerProfile: 'financial-district, international, and investor buyers', sellerPage: '/sell-brickell' },
  { name: 'Fort Lauderdale', type: 'waterfront or urban home', buyerProfile: 'boating, executive, and Northeast relocation buyers', sellerPage: '/sell-fort-lauderdale' },
  { name: 'Plantation', type: 'single-family home', buyerProfile: 'Broward family and move-up buyers', sellerPage: '/sell-plantation' },
  { name: 'Pompano Beach', type: 'coastal home or condo', buyerProfile: 'coastal, investor, and second-home buyers', sellerPage: '/sell-pompano-beach' },
  { name: 'Kendall', type: 'single-family home', buyerProfile: 'Miami family, multigenerational, and local move-up buyers', sellerPage: '/sell-kendall' },
  { name: 'Sunny Isles Beach', type: 'condominium', buyerProfile: 'international, luxury, and second-home buyers', sellerPage: '/contact' },
  { name: 'Boca Raton', type: 'single-family or luxury home', buyerProfile: 'executive, downsizing, and Northeast relocation buyers', sellerPage: '/contact' },
  { name: 'South Florida', type: 'property', buyerProfile: 'local, national, Spain, and LATAM buyer channels', sellerPage: '/sell-south-florida' }
];

const angles = [
  {
    key: 'seller-positioning',
    audience: 'seller',
    title: (m) => `Selling a ${m.name} ${titleCase(m.type)} in ${YEAR}: Positioning Before Price`,
    excerpt: (m) => `For ${m.name} owners, the first decision is not just asking price. It is how the property is positioned, prepared, exposed, and negotiated before the public launch.`,
    category: 'Seller Strategy',
    sections: (m) => [
      ['The Seller Question', `A ${m.name} owner should not enter the market with only a number. The stronger question is whether the property is ready to create qualified demand from ${m.buyerProfile}. That requires pricing discipline, preparation, clean MLS data, media, buyer-agent exposure, and a negotiation plan before the listing is public.`],
      ['What Should Happen Differently', `The launch should be sequenced. Position the property narrative first, prepare the details that affect buyer confidence, publish with accurate listing data, activate the agent network, and then negotiate from evidence rather than reaction. A casual listing can be seen. A structured listing can be competed for.`],
      ['Why Distribution Matters', distributionParagraph()],
      ['Recommended Seller Action', `Before choosing a list price for a ${m.name} ${m.type}, request a Private Seller Strategy Review. The review should identify the likely buyer profile, the property's launch risks, the preparation sequence, and the distribution plan that should be in place before the listing becomes public.`]
    ]
  },
  {
    key: 'buyer-discipline',
    audience: 'buyer',
    title: (m) => `Buying in ${m.name} in ${YEAR}: Compete Without Losing Discipline`,
    excerpt: (m) => `${m.name} buyers need more than property alerts. They need market context, offer discipline, and a clear acquisition strategy before competing for the right property.`,
    category: 'Buyer Strategy',
    sections: (m) => [
      ['The Buyer Question', `A serious ${m.name} buyer should define the mandate before touring: property type, timing, financing strength, inspection tolerance, ownership costs, and the maximum price justified by the buyer's own objectives. The goal is not to chase every listing. The goal is to recognize the right opportunity quickly and negotiate with control.`],
      ['How Buyers Avoid Overpaying', `Disciplined buyers compare active competition, recent comparable sales, condition, association costs where relevant, insurance considerations, and resale audience. A strong offer is not automatically the highest offer. It is the offer that matches the asset, the seller's likely priorities, and the buyer's risk limits.`],
      ['Why Representation Matters', `Carlos Uzcategui brings 25 years of South Florida market experience, bilingual English-Spanish capability, and a dual-market perspective for buyers connected to Spain and LATAM. That matters when buyer motivation, local terms, and cross-border timing all affect the acquisition strategy.`],
      ['Recommended Buyer Action', `Request a South Florida Buyer Strategy Review before making offers in ${m.name}. The review should clarify acquisition criteria, financing posture, negotiation boundaries, and the first set of properties worth serious review.`]
    ]
  },
  {
    key: 'international-owner',
    audience: 'seller',
    title: (m) => `${m.name} Owners With Spain or LATAM Buyer Profiles: The MLS Exposure Question`,
    excerpt: (m) => `For owners whose buyer pool may include Spain or LATAM, the listing strategy should connect local preparation with institutional U.S. market exposure.`,
    category: 'International Seller Strategy',
    sections: (m) => [
      ['The Cross-Border Problem', `International exposure is often treated as decoration after the listing is already public. For a ${m.name} ${m.type}, that is backwards. If Spain, LATAM, relocation, or investor buyers are part of the likely demand pool, the buyer narrative and distribution plan should be built before launch.`],
      ['The Miami MLS Advantage', `For Spanish and LATAM property owners, Carlos can evaluate Miami MLS exposure through a licensed U.S. principal-of-record structure, while local professional agencies support buyer-side representation, showings, negotiation, and buyer qualification in the local market. For South Florida sellers, he can coordinate with affiliated Madrid agencies to reach qualified buyers relocating or investing into Florida.`],
      ['Why Distribution Matters', distributionParagraph()],
      ['Recommended Seller Action', `Request a confidential listing-positioning review for the ${m.name} property. The first step is to determine whether the asset should be marketed primarily to local, national, international, or mixed buyer channels.`]
    ]
  },
  {
    key: 'downsizing-sequence',
    audience: 'seller',
    title: (m) => `Downsizing From a ${m.name} Home in ${YEAR}: Sequence the Sale Before the Move`,
    excerpt: (m) => `Downsizing owners should coordinate valuation, timing, homestead portability questions, purchase planning, and post-closing occupancy before going public.`,
    category: 'Downsizing Strategy',
    sections: (m) => [
      ['The Downsizing Question', `For many ${m.name} owners, the sale is not only about price. It is about timing, replacement housing, tax portability questions, furniture and preparation decisions, family coordination, and whether post-occupancy may be needed after closing.`],
      ['What To Decide Before Listing', `The owner should review expected net proceeds, likely buyer profile, repair and presentation priorities, timing of the next purchase, closing date flexibility, and whether a post-occupancy agreement may become part of negotiation. Legal and tax questions should be reviewed with the appropriate licensed professionals before contract decisions are made.`],
      ['Why Distribution Matters', distributionParagraph()],
      ['Recommended Seller Action', `Request a Private Seller Strategy Review focused on downsizing. The outcome should be a sale sequence, not just a suggested list price.`]
    ]
  },
  {
    key: 'post-occupancy',
    audience: 'seller',
    title: (m) => `Post-Occupancy When Selling a ${m.name} Property: Negotiate It Before You Need It`,
    excerpt: (m) => `A post-occupancy request can affect leverage, buyer confidence, insurance, deposits, and closing risk. It should be planned before the offer stage.`,
    category: 'Negotiation Strategy',
    sections: (m) => [
      ['The Timing Problem', `Some sellers need time in the property after closing. That may be manageable, but it should not be improvised after a buyer has already submitted an offer. Post-occupancy can affect buyer confidence, lender timing, insurance, escrow, walkthrough expectations, and negotiation leverage.`],
      ['How To Prepare The Negotiation', `Before listing a ${m.name} ${m.type}, the seller should decide whether possession flexibility is required, how much time is needed, what terms may be acceptable, and which issues require legal review. The listing strategy should anticipate the buyer's risk questions before they become objections.`],
      ['Why Distribution Matters', distributionParagraph()],
      ['Recommended Seller Action', `If you may need post-closing occupancy, request a confidential listing-positioning review before going public. The objective is to protect price and terms while reducing avoidable closing friction.`]
    ]
  },
  {
    key: 'net-proceeds',
    audience: 'seller',
    title: (m) => `${m.name} Seller Net Proceeds in ${YEAR}: Price Is Only One Line`,
    excerpt: (m) => `A serious seller should evaluate net proceeds, timing, preparation costs, concessions, closing costs, and negotiation exposure before choosing a list price.`,
    category: 'Seller Net Proceeds',
    sections: (m) => [
      ['The Net Proceeds Question', `A list price is not a net result. A ${m.name} owner should review likely sale range, preparation costs, closing costs, possible credits, association items where applicable, mortgage payoff, timing risk, and tax questions with the appropriate professional advisers.`],
      ['Why The Launch Affects The Net', `Weak presentation, inaccurate listing data, unclear buyer narrative, or poor timing can create negotiation pressure later. A stronger launch can help the seller defend value with cleaner evidence and broader buyer-agent awareness.`],
      ['Why Distribution Matters', distributionParagraph()],
      ['Recommended Seller Action', `Request a Seller Net Review before listing. The outcome should be a pricing range, estimated net framework, launch plan, and negotiation posture.`]
    ]
  }
];

function distributionParagraph() {
  return 'When a seller lists with Carlos Uzcategui, the property enters the world\'s largest local Realtor association\'s distribution infrastructure: 93,000 member agents, 200+ global portals publishing in 19 languages, 260+ U.S. MLSs syndicated via RPR, 437+ international agreements, 11 MLS data exchanges, and $69B in combined 2025 network transaction volume. This does not guarantee a result. It creates a structural exposure advantage when combined with disciplined positioning, preparation, and negotiation.';
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function titleCase(value) {
  return value.replace(/\b\w/g, (m) => m.toUpperCase());
}

function readExistingSlugs() {
  if (!fs.existsSync(JOURNAL_DIR)) fs.mkdirSync(JOURNAL_DIR, { recursive: true });
  return new Set(
    fs.readdirSync(JOURNAL_DIR)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, ''))
  );
}

function chooseTopic(existingSlugs) {
  const dayIndex = Math.floor(now.getTime() / 86400000);
  const combinations = [];
  for (const angle of angles) {
    for (const market of markets) combinations.push({ angle, market });
  }

  for (let offset = 0; offset < combinations.length; offset += 1) {
    const combo = combinations[(dayIndex + offset) % combinations.length];
    const base = `${combo.angle.key}-${combo.market.name}-${YEAR}-${monthName}`;
    const slug = slugify(base);
    if (!existingSlugs.has(slug)) return { ...combo, slug };
  }

  const fallback = combinations[dayIndex % combinations.length];
  const slug = slugify(`${fallback.angle.key}-${fallback.market.name}-${today}`);
  if (!existingSlugs.has(slug)) return { ...fallback, slug };
  return null;
}

function buildPost(topic) {
  const { angle, market, slug } = topic;
  const title = angle.title(market);
  const excerpt = angle.excerpt(market);
  const sections = angle.sections(market);
  const ctaPath = angle.audience === 'buyer' ? '/buy' : market.sellerPage;
  const campaign = slug;
  const ctaUrl = `${ctaPath}?utm_source=journal&utm_medium=seo&utm_campaign=${campaign}`;

  const body = sections.map(([heading, text]) => `## ${heading}\n\n${text}`).join('\n\n');

  return `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndate: "${today}"\nslug: "${slug}"\nexcerpt: "${excerpt.replace(/"/g, '\\"')}"\ncategory: "${angle.category}"\ncreated_by: "github-actions"\nmarket: "${market.name}"\nfunnel_stage: "consideration"\ncontent_goal: "lead_generation"\n---\n\n${excerpt}\n\n${body}\n\n## Why Carlos Uzcategui\n\nCarlos Uzcategui is a Florida Licensed Realtor(R) SL705771, licensed since 2001, with 25 years of South Florida market experience. He is a Certified Luxury Home Marketing Specialist, a Certified Seller Representative, bilingual in English and Spanish, and affiliated with United Realty Group, which has 3,500+ agents and 21 Florida offices.\n\nThe advantage for an owner is not generic marketing. It is a structured process: position, prepare, launch, activate, and negotiate with the support of institutional MLS distribution and a bilingual South Florida, Spain, and LATAM referral model.\n\n## First Step\n\nRequest a ${angle.audience === 'buyer' ? 'South Florida Buyer Strategy Review' : 'Private Seller Strategy Review'} before making a public decision.\n\n[Start the strategy review](${ctaUrl})\n\nUSA WhatsApp: +1 954-865-6622\n\nSpain WhatsApp: +34 646 85 30 78\n\nEmail: contact@carlosre.com\n\n## FAQ\n\n### Is this a property valuation?\n\nNo. This article is general market and strategy information. A property-specific valuation requires address-level review, condition, comparable sales, competition, terms, and timing.\n\n### Does MLS and global distribution guarantee a higher sale price?\n\nNo. Distribution does not guarantee price or timing. It can improve exposure when paired with correct pricing, presentation, launch sequencing, and negotiation.\n\n### Should legal, tax, homestead, or post-occupancy questions be reviewed separately?\n\nYes. Legal, tax, financing, insurance, association, and homestead questions should be reviewed with the appropriate licensed professionals before a seller or buyer makes a binding decision.\n\n## Source And Compliance Notes\n\nSource basis: Carlos Uzcategui verified professional profile; United Realty Group affiliation; MIAMI REALTORS distribution and merger source references maintained in the HomesProfessional source library. This article does not use live MLS statistics, mortgage rates, tax calculations, legal conclusions, or property-specific valuation data.\n\nFlorida Licensed Realtor(R) SL705771 | United Realty Group | Equal Housing Opportunity.\n\nInformation is for general informational purposes only and does not constitute legal, tax, financial, insurance, or investment advice. Market data and association information are deemed reliable but not guaranteed and are subject to change without notice.\n`;
}

function assertQuality(content) {
  const required = [
    'Florida Licensed Realtor(R) SL705771 | United Realty Group | Equal Housing Opportunity.',
    '93,000 member agents',
    '200+ global portals',
    '19 languages',
    '260+ U.S. MLSs',
    '437+ international agreements',
    '11 MLS data exchanges',
    '$69B in combined 2025 network transaction volume',
    'Request a',
    'Source basis:'
  ];
  const missing = required.filter((needle) => !content.includes(needle));
  if (missing.length) throw new Error(`Quality gate failed. Missing: ${missing.join(', ')}`);
  if (content.includes('guarantee a higher sale price?\n\nYes')) throw new Error('Quality gate failed: guarantee language detected.');
}

function updatePackage(slug) {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  const route = `/journal/${slug}`;
  pkg.reactSnap ||= {};
  pkg.reactSnap.include ||= [];
  if (!pkg.reactSnap.include.includes(route)) {
    const journalIndex = pkg.reactSnap.include.indexOf('/journal');
    if (journalIndex >= 0) pkg.reactSnap.include.splice(journalIndex + 1, 0, route);
    else pkg.reactSnap.include.push('/journal', route);
    fs.writeFileSync(PACKAGE_JSON, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}

function updateSitemap(slug) {
  if (!fs.existsSync(SITEMAP)) return;
  const loc = `${SITE_URL}/journal/${slug}`;
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  if (xml.includes(`<loc>${loc}</loc>`)) return;
  const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.70</priority>\n  </url>\n`;
  xml = xml.replace('</urlset>', `${entry}</urlset>`);
  fs.writeFileSync(SITEMAP, xml);
}

const existingSlugs = readExistingSlugs();
const topic = chooseTopic(existingSlugs);
if (!topic) {
  console.log('No publishable journal topic available today. Skipping.');
  process.exit(0);
}

const content = buildPost(topic);
assertQuality(content);
const postPath = path.join(JOURNAL_DIR, `${topic.slug}.md`);
if (fs.existsSync(postPath)) {
  console.log(`Post already exists: ${topic.slug}. Skipping.`);
  process.exit(0);
}
fs.writeFileSync(postPath, content);
updatePackage(topic.slug);
updateSitemap(topic.slug);
console.log(`Published scheduled journal draft: ${topic.slug}`);
