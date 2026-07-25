import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const JOURNAL_DIR = path.join(ROOT, 'src', 'content', 'journal');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const SITE_URL = 'https://homesprofessional.com';
const YEAR = '2026';

// Two posts sharing more than this share of their 6-word shingles are treated as
// duplicates of each other. See assertDistinct.
const MAX_SIMILARITY = 0.5;

const now = new Date();
const today = now.toISOString().slice(0, 10);
const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'America/New_York' }).format(now);

// Each market carries the details that actually differ between these places:
// what the housing stock is, which documents and conditions decide a deal there,
// and what a buyer is really comparing. Angles below build their prose from
// these fields, so two posts on the same angle read differently because the
// underlying market facts differ — not because the wording was shuffled.
// Everything here is qualitative and observable. No statistics live in this file
// except the verified network figures in distributionVariants.
const markets = [
  {
    name: 'Weston',
    focus: 'the community, not the city',
    hook:
      'Weston reads as one market from the outside and behaves as a dozen from the inside. The community line matters more than the city line.',
    risk: 'an association document set that arrives late and contradicts what the listing implied',
    type: 'single-family home',
    sellerPage: '/sell-weston',
    buyers: 'relocation, school-driven, and executive-family buyers',
    setting: 'master-planned communities where most homes sit under an association and were built in a compressed window',
    diligence: [
      'the community association budget, rules, and any assessment history',
      'roof and impact-window condition on original construction',
      'permit history for pools, patio enclosures, and window upgrades'
    ],
    pricing: [
      'the specific community rather than the city',
      'lot position and whether it backs to water or preserve',
      'how completely the interior has actually been updated'
    ],
    competition:
      'Buyers here compare a handful of near-identical floor plans across several communities at once, so condition, updates, and lot position carry more weight than square footage alone.'
  },
  {
    name: 'Coral Gables',
    focus: 'the lot, the block, and permit history',
    hook:
      'In Coral Gables the lot and the block frequently carry more value than the structure standing on them.',
    risk: "a past renovation that was never permitted surfacing in the buyer's municipal and title search",
    type: 'luxury home',
    sellerPage: '/sell-coral-gables',
    buyers: 'estate, executive, and international buyers',
    setting: 'an older architectural housing stock where renovations and additions have accumulated over decades',
    diligence: [
      'permit history and closed-out municipal records for past renovations',
      'any architectural or historic review obligation attached to the property',
      'roof, plumbing, and electrical condition typical of older construction'
    ],
    pricing: [
      'the block and the lot before the house itself',
      'architectural provenance and the quality of past renovation work',
      'how the property reads against a rebuild on a comparable lot'
    ],
    competition:
      'A buyer at this price point is usually deciding between a renovated older home and tearing down for new construction. The listing either makes that comparison easy or loses it by default.'
  },
  {
    name: 'Aventura',
    focus: 'the building, the line, and the documents',
    hook:
      'An Aventura buyer is acquiring a share of a building as much as a set of rooms.',
    risk: 'a reserve or assessment question landing after the inspection period has already run',
    type: 'condominium or waterfront home',
    sellerPage: '/sell-aventura',
    buyers: 'international, downsizing, and second-home buyers',
    setting: 'high-rise buildings where the association governs most of what a buyer is actually acquiring',
    diligence: [
      'the association budget, reserves, and assessment history',
      "the building's structural inspection and reserve funding status",
      'leasing rules and any restriction on renting the unit out'
    ],
    pricing: [
      'the line and floor within the building',
      'exposure, view corridor, and light',
      'parking and storage that convey with the unit'
    ],
    competition:
      'Several units in the same building often compete at the same time. What separates them is line, view, condition, and whether the document package is ready when the buyer asks.'
  },
  {
    name: 'Doral',
    focus: 'identical models and what separates them',
    hook:
      'Doral inventory repeats itself. The same models list again and again, which makes small differences decisive.',
    risk: 'competing directly against an identical model listed the same week at a lower number',
    type: 'single-family home',
    sellerPage: '/sell-doral',
    buyers: 'LATAM, corporate relocation, and family buyers',
    setting: 'newer construction where much of the inventory shares a small set of builder floor plans',
    diligence: [
      'association documents and any community development district assessment that applies',
      'builder warranty items that are still open',
      'permit records for pools, extensions, and impact upgrades'
    ],
    pricing: [
      'the community and the specific builder model',
      'lot position and water frontage where it exists',
      'upgrades that go beyond the builder standard'
    ],
    competition:
      'When several identical models list at once, the floor plan stops being a differentiator. Presentation, upgrades, and terms are what remain.'
  },
  {
    name: 'Brickell',
    focus: 'the building underwriting, not just the unit',
    hook:
      'Brickell trades like a securities market: same building, same line, different numbers depending on who is selling and why.',
    risk: 'a lender or insurance carrier taking issue with the building rather than the unit',
    type: 'condominium',
    sellerPage: '/sell-brickell',
    buyers: 'financial-district, international, and investor buyers',
    setting: 'a dense high-rise market where the buyer is underwriting the building as much as the unit',
    diligence: [
      'association financials, reserves, and assessment history',
      'structural inspection and reserve funding status',
      "the building's policy on short-term and seasonal leasing"
    ],
    pricing: [
      'line, floor, and view corridor',
      'finish level relative to the building standard',
      'parking and whether the unit is currently leased'
    ],
    competition:
      'Investor buyers price the unit off what it can carry. Owner-occupants price it off how it lives. A listing that addresses only one of those is competing for half the market.'
  },
  {
    name: 'Fort Lauderdale',
    focus: 'clearance, dockage, and seawall condition',
    hook:
      'On the water, the specification a seller never mentions is often the one that decides whether the right buyer books a showing at all.',
    risk: 'seawall or dock condition discovered at inspection and priced by the buyer instead of the seller',
    type: 'waterfront or urban home',
    sellerPage: '/sell-fort-lauderdale',
    buyers: 'boating, executive, and Northeast relocation buyers',
    setting: 'a market where water access is a measurable specification rather than a description',
    diligence: [
      'seawall condition and any repair history',
      'dock and lift condition, capacity, and permit status',
      'bridge clearance and the actual route to the ocean',
      'flood zone and elevation documentation'
    ],
    pricing: [
      'usable water frontage rather than total frontage',
      'whether access is ocean-access or restricted by a fixed bridge',
      "dockage capacity measured against the buyer's vessel"
    ],
    competition:
      'Two homes on the same canal can serve completely different buyers depending on clearance and dockage. A listing that omits those specifics gets filtered out by the buyers it should be attracting.'
  },
  {
    name: 'Plantation',
    focus: 'uneven updates and system age',
    hook:
      "Plantation's housing stock has aged unevenly, and buyers price that unevenness precisely.",
    risk: 'roof or system age turning into an insurability problem late in the contract',
    type: 'single-family home',
    sellerPage: '/sell-plantation',
    buyers: 'Broward family and move-up buyers',
    setting: 'established neighborhoods with mature lots and a housing stock that has been updated unevenly',
    diligence: [
      'permit history for additions, enclosures, and system replacements',
      'roof and HVAC age measured against what insurers now expect',
      'any open or unrecorded municipal items'
    ],
    pricing: [
      'the specific neighborhood rather than the city average',
      'lot size and mature landscaping',
      'how much of the home has genuinely been updated versus refreshed'
    ],
    competition:
      'Buyers weigh an updated home against one they would have to renovate themselves. The distance between those two positions is where most of the negotiation happens.'
  },
  {
    name: 'Pompano Beach',
    focus: 'which audience the listing is written for',
    hook:
      'Pompano Beach asks a seller to choose an audience before choosing a price.',
    risk: 'pricing to an investor buyer while presenting to a lifestyle buyer, and convincing neither',
    type: 'coastal home or condominium',
    sellerPage: '/sell-pompano-beach',
    buyers: 'coastal, investor, and second-home buyers',
    setting: 'a mixed coastal market where condominium and single-family inventory compete for overlapping buyers',
    diligence: [
      'association financial and structural status for condominium units',
      'roof, opening protection, and coastal exposure for single-family homes',
      'any leasing restriction that changes what an investor can do'
    ],
    pricing: [
      'distance and actual access to the water',
      'building or home condition relative to the rest of the block',
      'whether the property can be rented, and on what terms'
    ],
    competition:
      'Investor buyers and lifestyle buyers value the same property on different arithmetic. The listing has to be explicit about which case it is making.'
  },
  {
    name: 'Kendall',
    focus: 'the neighborhood, not the wider area',
    hook:
      'Kendall is not one market. The difference between neighborhoods a few streets apart is real, and buyers know it.',
    risk: 'unpermitted enclosed space counted as living area in the listing and removed by the appraiser',
    type: 'single-family home',
    sellerPage: '/sell-kendall',
    buyers: 'Miami family, multigenerational, and local move-up buyers',
    setting: 'a large suburban market where neighborhoods a few blocks apart trade on different terms',
    diligence: [
      'permit history for additions, enclosed spaces, and in-law conversions',
      'association rules where the home sits inside one',
      'roof, HVAC, and plumbing age'
    ],
    pricing: [
      'the specific neighborhood rather than the wider area',
      'lot size and genuinely usable outdoor space',
      'whether additions were permitted and count as living area'
    ],
    competition:
      'Multigenerational buyers place real value on space that other buyers discount. How the floor plan is described changes which of them shows up.'
  },
  {
    name: 'Sunny Isles Beach',
    focus: 'exposure, line, and the document package',
    hook:
      'In an oceanfront tower, the line and the exposure do most of the pricing work before anyone considers the interior.',
    risk: 'a cross-border buyer stalling on documents that were never assembled in advance',
    type: 'condominium',
    sellerPage: '/contact',
    buyers: 'international, luxury, and second-home buyers',
    setting: 'oceanfront towers where the building, the line, and the exposure carry most of the value',
    diligence: [
      'association reserves, assessment history, and structural inspection status',
      "the building's leasing policy",
      'how oceanfront exposure affects maintenance and insurance on the unit'
    ],
    pricing: [
      'direct versus partial ocean exposure',
      'line and floor within the tower',
      'finish level and whether furnishings convey'
    ],
    competition:
      'Cross-border buyers frequently evaluate the building before they evaluate the unit, which makes a complete and readable document package part of the pricing strategy rather than paperwork.'
  },
  {
    name: 'Boca Raton',
    focus: 'community, club obligation, and condition',
    hook:
      'Boca Raton contains several distinct markets that share a postal address and very little else.',
    risk: 'a club or membership obligation surfacing after the buyer has already formed a price expectation',
    type: 'single-family or luxury home',
    sellerPage: '/contact',
    buyers: 'executive, downsizing, and Northeast relocation buyers',
    setting: 'a market split between association-governed communities, club communities, and open neighborhoods',
    diligence: [
      'community association documents and any mandatory club obligation attached to the property',
      'roof and impact-opening condition',
      'permit records for renovations and additions'
    ],
    pricing: [
      'the community, and any membership obligation that transfers with it',
      'lot position and frontage',
      'renovation level measured against the community standard'
    ],
    competition:
      'A mandatory club obligation changes the buyer pool outright. A listing that leaves it ambiguous attracts the wrong showings and invites renegotiation late.'
  },
  {
    name: 'South Florida',
    focus: 'the submarket, not the county average',
    hook:
      'There is no single South Florida market, and pricing off the regional headline is how sellers end up correcting later.',
    risk: 'a strategy built on county-level averages rather than the specific competing inventory',
    type: 'property',
    sellerPage: '/sell-south-florida',
    buyers: 'local, national, Spain, and LATAM buyer channels',
    setting: 'markets that change block by block across Miami-Dade, Broward, and Palm Beach',
    diligence: [
      'association documents where the property sits under one',
      'permit history and any open municipal items',
      'roof, systems, and the documentation a buyer needs to insure the property'
    ],
    pricing: [
      'the immediate submarket rather than the county',
      'condition relative to the specific competing inventory',
      'terms and timing flexibility'
    ],
    competition:
      'A regional average tells an owner very little. The comparison that decides the sale is the handful of properties a buyer will walk through in the same week.'
  }
];

const angles = [
  {
    key: 'seller-positioning',
    audience: 'seller',
    category: 'Seller Strategy',
    title: (m) => `Selling ${article(m.name)} ${m.name} ${titleCase(m.type)} in ${YEAR}: Positioning Before Price`,
    excerpt: (m) => `Positioning ${article(m.name)} ${m.name} ${m.type} before pricing it: ${m.focus}, and what buyers verify first.`,
    sections: (m) => [
      [
        `What ${m.name} Buyers Are Actually Comparing`,
        `${m.hook}\n\n${m.competition} The likely buyer here is drawn from ${m.buyers}, and the property is being read against ${m.setting}. A list price set without knowing which comparison the property will lose is a guess wearing a number.`
      ],
      [
        `The Diligence That Decides a ${m.name} Deal`,
        `The items that most often stall a sale here:\n\n${bullets(m.diligence)}\n\nNone of them improve by waiting, and each is cheaper to resolve on the seller's own schedule than under a contract deadline with a buyer holding the calendar. The specific failure to plan around is ${m.risk}.`
      ],
      [
        'Where the Price Actually Comes From',
        `Pricing should be built from ${list(m.pricing)} — not from a per-square-foot figure applied across the city. Overpricing does not create negotiating room. It removes the property from the searches of the buyers most likely to pay full value, and the correction costs more than the original discipline would have.`
      ],
      [
        'Recommended Seller Action',
        `Before naming a price on a ${m.name} ${m.type}, request a Private Seller Strategy Review. The output should be a defensible pricing range, the preparation sequence, and the launch plan — in that order.`
      ]
    ],
    faq: (m) => [
      [
        `How long should preparation take on a ${m.name} ${m.type}?`,
        `It depends on what the property needs and what the documents show — here that usually starts with ${m.diligence[0]}. The sequence matters more than the calendar: resolve what a buyer will discover, then launch. A listing only goes live for the first time once.`
      ]
    ]
  },
  {
    key: 'buyer-discipline',
    audience: 'buyer',
    category: 'Buyer Strategy',
    title: (m) => `Buying in ${m.name} in ${YEAR}: Compete Without Losing Discipline`,
    excerpt: (m) => `Buying in ${m.name}: define the mandate, then verify ${m.focus} before you compete for anything.`,
    sections: (m) => [
      [
        'Define the Mandate Before You Tour',
        `${m.hook}\n\nA serious buyer should settle property type, timing, financing strength, inspection tolerance, ongoing ownership costs, and a maximum price justified by their own objectives — before the first showing. The goal is not to see everything. It is to recognize the right property quickly and negotiate with control.`
      ],
      [
        `What to Verify in ${m.name}`,
        `The items worth verifying early here:\n\n${bullets(m.diligence)}\n\n${m.competition} The recurring dynamic here is ${m.risk}, and spotting it early is what separates a disciplined offer from a reactive one.`
      ],
      [
        'What Actually Moves Price Here',
        `Value in this market tracks ${list(m.pricing)}. A strong offer is not automatically the highest one — it is the offer matched to the asset, to the seller's likely priorities, and to the buyer's own limits. Buyers who understand the local price drivers stop bidding against imaginary competition.`
      ],
      [
        'Recommended Buyer Action',
        `Request a South Florida Buyer Strategy Review before making offers in ${m.name}. It should produce acquisition criteria, a financing posture, negotiation boundaries, and a shortlist worth real review.`
      ]
    ],
    faq: (m) => [
      [
        `How many properties should I see in ${m.name} before making an offer?`,
        `There is no correct number. What matters is whether you have seen enough of the current competing inventory to recognize value when it appears — and in this market that means understanding ${m.pricing[0]}. Buyers who have defined their criteria usually need fewer showings, not more.`
      ]
    ]
  },
  {
    key: 'international-owner',
    audience: 'seller',
    category: 'International Seller Strategy',
    title: (m) => `${m.name} Owners With Spain or LATAM Buyer Profiles: The Exposure Question`,
    excerpt: (m) => `Selling ${article(m.name)} ${m.name} ${m.type} to buyers abroad: ${m.focus}, settled before the listing goes live.`,
    sections: (m) => [
      [
        'Decide the Buyer Channel Before the Launch',
        `International exposure is usually treated as decoration added after a listing is already public. For a ${m.name} ${m.type} that is backwards. ${m.hook} If Spain, LATAM, relocation, or investor buyers form part of the likely demand pool, the buyer narrative and the distribution plan should exist before the property goes live.`
      ],
      [
        `What a Cross-Border Buyer Verifies in ${m.name}`,
        `A buyer reviewing from abroad cannot walk the property on a weekend. They rely on documentation, and here that means:\n\n${bullets(m.diligence)}\n\nIncomplete documents do not merely slow the process — they get the property skipped in favor of one that answers the question immediately. The common casualty is ${m.risk}.`
      ],
      [
        'The Two Directions of the Desk',
        'For Spanish and LATAM owners, Carlos can evaluate Miami MLS exposure through a licensed U.S. principal-of-record structure, while local professional agencies handle buyer representation, showings, and qualification in their own market. For South Florida sellers, he coordinates with affiliated Madrid agencies to reach buyers relocating or investing into Florida. Carlos is licensed in Florida; work in other markets runs through licensed local professionals there.'
      ],
      [
        `How ${m.name} Value Reads From Abroad`,
        `A buyer who cannot visit prices what they can verify: ${list(m.pricing)}. ${m.competition} The listing has to make that case in documents and media, because nobody is walking the block on the buyer's behalf.`
      ],
      [
        'Recommended Seller Action',
        `Request a confidential listing-positioning review for the ${m.name} property. The first decision is whether the asset should be marketed primarily to local, national, international, or mixed buyer channels — everything else follows from it.`
      ]
    ],
    faq: (m) => [
      [
        `Can you work with my agent abroad on a ${m.name} sale?`,
        'Yes. The referral model is built for exactly that. Carlos is licensed in Florida and represents the Florida side of the transaction; the agent in the other market represents theirs.'
      ]
    ]
  },
  {
    key: 'downsizing-sequence',
    audience: 'seller',
    category: 'Downsizing Strategy',
    title: (m) => `Downsizing From ${article(m.name)} ${m.name} Home in ${YEAR}: Sequence the Sale Before the Move`,
    excerpt: (m) => `Downsizing in ${m.name}: sequence the sale around ${m.focus}, then time the move.`,
    sections: (m) => [
      [
        'The Question Is Sequence, Not Price',
        `For most ${m.name} owners the sale is not primarily about the number. It is about timing, replacement housing, portability questions, preparation decisions, family coordination, and whether occupancy is needed after closing. Those decisions constrain each other, and taken out of order they get expensive.`
      ],
      [
        `What to Settle Before a ${m.name} Listing Goes Live`,
        `Review the expected net, the likely buyer profile, and the preparation priorities — which here means:\n\n${bullets(m.diligence)}\n\nDecide the timing of the next purchase and what closing-date flexibility is worth to you. The avoidable surprise in this market is ${m.risk}. Legal, tax, and homestead questions belong with the appropriate licensed professionals before any contract decision, not after one.`
      ],
      [
        `Where the Value Sits in ${m.name}`,
        `${m.hook}\n\nPricing tracks ${list(m.pricing)}. ${m.competition} An owner who understands that comparison can decide what is worth preparing and what is not — which is the difference between spending on presentation and spending out of anxiety.`
      ],
      [
        'Recommended Seller Action',
        'Request a Private Seller Strategy Review focused on downsizing. The output should be a sale sequence, not a suggested list price.'
      ]
    ],
    faq: (m) => [
      [
        `Should I buy the next property before selling in ${m.name}?`,
        'That depends on your financing position and your tolerance for carrying two properties. It is a sequencing decision with real cost either way, and it should be modeled with your lender and financial adviser before you commit to an order.'
      ]
    ]
  },
  {
    key: 'post-occupancy',
    audience: 'seller',
    category: 'Negotiation Strategy',
    title: (m) => `Post-Occupancy When Selling in ${m.name}: Negotiate It Before You Need It`,
    excerpt: (m) => `Staying in ${article(m.name)} ${m.name} property after closing: negotiate it alongside ${m.focus}, before the offer.`,
    sections: (m) => [
      [
        'Decide Early Whether You Need Time',
        'Some sellers need to stay in the property after closing. That is often workable, but it should not be improvised once a buyer has already submitted an offer. Post-occupancy touches buyer confidence, lender timing, insurance, escrow, walkthrough expectations, and leverage all at once.'
      ],
      [
        `What Else Is Already on the Table in ${m.name}`,
        `A buyer weighing a possession request weighs it alongside everything else the property is asking them to accept. Here that usually includes:\n\n${bullets(m.diligence)}\n\nA clean file on those items buys credibility for the possession conversation; an unresolved one spends it — particularly where the open question is ${m.risk}.`
      ],
      [
        'Prepare the Terms Before the Offer',
        `${m.hook}\n\nBefore listing, decide whether flexibility is genuinely required, how much time is needed, what terms are acceptable, and which points need legal review. ${m.competition} The listing strategy should anticipate the buyer's risk questions instead of meeting them as objections.`
      ],
      [
        'Recommended Seller Action',
        'If post-closing occupancy may be needed, request a confidential listing-positioning review before going public. The objective is protecting price and terms while removing avoidable friction from the closing.'
      ]
    ],
    faq: (m) => [
      [
        `Is post-occupancy common in ${m.name} transactions?`,
        'It appears regularly, particularly where a seller is coordinating a second purchase. It is negotiable rather than standard, and the terms — duration, escrow, insurance, condition at handover — should be documented and reviewed with a licensed professional.'
      ]
    ]
  },
  {
    key: 'net-proceeds',
    audience: 'seller',
    category: 'Seller Net Proceeds',
    title: (m) => `${m.name} Seller Net Proceeds in ${YEAR}: Price Is Only One Line`,
    excerpt: (m) => `What a ${m.name} seller keeps depends on ${m.focus} — not on the list price alone.`,
    sections: (m) => [
      [
        'A List Price Is Not a Net Result',
        `The number on the listing is the first line of an arithmetic problem, not the answer to it. A ${m.name} owner should review the likely sale range, preparation costs, closing costs, possible credits, association items where they apply, mortgage payoff, timing risk, and the tax questions that belong with a qualified adviser.`
      ],
      [
        `Where the Net Leaks in ${m.name}`,
        `Most of the erosion between list price and net proceeds happens in negotiation, and here it usually traces back to:\n\n${bullets(m.diligence)}\n\nAn item the buyer discovers is worth more to them than the same item disclosed up front, and that difference comes straight out of the seller's net. The recurring cost in this market is ${m.risk}.`
      ],
      [
        'What Holds Value Here',
        `${m.hook}\n\nValue follows ${list(m.pricing)}. ${m.competition} Understanding that lets a seller spend preparation money where it returns something and skip the work that does not move the comparison.`
      ],
      [
        'Recommended Seller Action',
        'Request a Seller Net Review before listing. The output should be a pricing range, an estimated net framework, the launch plan, and the negotiation posture — assembled before the property is public.'
      ]
    ],
    faq: (m) => [
      [
        `Can you estimate my net proceeds on a ${m.name} sale before I list?`,
        'A working framework, yes — sale range, expected costs, and the variables that move it. It is an estimate, not a settlement statement: the final figure depends on the contract terms, the closing date, payoff figures, and prorations.'
      ]
    ]
  }
];

// Every figure below is mirrored from src/data/figures.json. assertVerifiedFigures
// treats this as a closed allowlist: any other number reaching a published post
// fails the build. Change these only alongside figures.json and the source library.
const VERIFIED_FIGURE_PHRASES = [
  '93,000 member agents',
  '200+ global portals',
  '19 languages',
  '260+ U.S. MLSs',
  '437+ international agreements',
  '11 MLS data exchanges',
  '3,500+ agents',
  '20 Florida offices',
  'SL705771',
  'since 2001',
  '25 years',
  '+1 954-865-6622',
  '+34 646 85 30 78',
  // Dates, not statistics: today's date reaches the body through the utm_campaign
  // slug on the fallback path, when a month's whole angle x market matrix is used up.
  today,
  YEAR
];

function distributionVariants(m) {
  return [
    `A ${m.name} listing placed through Carlos enters the distribution infrastructure of the world's largest local Realtor association: 93,000 member agents, and 200+ global portals publishing in 19 languages. Where the likely buyer may not live in Florida, that reach is part of the pricing case rather than decoration. It does not guarantee price or timing.`,
    `Exposure for a ${m.name} ${m.type} runs well past the local portal. 260+ U.S. MLSs syndicated via RPR and 437+ international agreements put the property in front of agents whose clients are relocating or buying across borders. None of that guarantees price or timing. It determines how many qualified agents ever see the listing at all.`,
    `Behind a ${m.name} listing sit 11 MLS data exchanges, the association's 93,000 member agents, and United Realty Group's 3,500+ agents across 20 Florida offices. Reach is not a result and does not guarantee price or timing. It is the precondition for a competitive offer, and it only counts once pricing, preparation, and the document package hold up.`,
    `Most ${m.name} sellers overestimate what a portal listing does and underestimate what agent-to-agent reach does. The property is published into 200+ global portals in 19 languages and syndicated to 260+ U.S. MLSs via RPR, but none of that guarantees price or timing. It decides how many of the right agents ever open the file.`
  ];
}

function bioVariants() {
  return [
    'Carlos Uzcategui has been a Florida Licensed Realtor®, SL705771, since 2001 — 25 years in this market — working through United Realty Group. He is a Certified Luxury Home Marketing Specialist and a Certified Seller Representative, and works in English and Spanish with owners and buyers connected to Spain and LATAM.',
    'Carlos Uzcategui is a Florida Licensed Realtor®, SL705771, licensed since 2001 and affiliated with United Realty Group. The relevant background here is 25 years of South Florida transactions, Certified Luxury Home Marketing Specialist and Certified Seller Representative credentials, and bilingual English-Spanish representation for cross-border owners and buyers.',
    'Florida Licensed Realtor® SL705771, licensed since 2001, affiliated with United Realty Group, Certified Luxury Home Marketing Specialist and Certified Seller Representative. Carlos Uzcategui works in English and Spanish across South Florida with established Spain and LATAM referral channels, and has 25 years in this market.',
    'Carlos Uzcategui works South Florida as a Florida Licensed Realtor®, SL705771, licensed since 2001 and affiliated with United Realty Group. Beyond the 25 years and the Certified Luxury Home Marketing Specialist and Certified Seller Representative credentials, the practical difference is a bilingual process that treats Spain and LATAM buyers as a channel rather than an afterthought.',
    'A Florida Licensed Realtor® since 2001 under license SL705771, Carlos Uzcategui practices through United Realty Group and holds the Certified Luxury Home Marketing Specialist and Certified Seller Representative designations. What 25 years in this market buys an owner is not marketing volume but a sequence: position, prepare, launch, activate, negotiate.'
  ];
}

function generalFaq() {
  return [
    [
      'Is this a property valuation?',
      'No. This is general market and strategy information. A property-specific valuation requires address-level review of condition, comparable sales, current competition, terms, and timing.'
    ],
    [
      'Does wider distribution guarantee a higher sale price?',
      'No. Distribution does not guarantee price or timing. It widens the pool of agents and buyers who see the property, which only converts into price when the pricing, presentation, and negotiation hold up.'
    ],
    [
      'Should legal, tax, or association questions be handled separately?',
      'Yes. Legal, tax, financing, insurance, association, and homestead questions belong with the appropriate licensed professionals before any binding decision is made.'
    ],
    [
      'Does this article use current market statistics?',
      'No. It covers process and positioning rather than monthly data. Market reports on this site cite their source in the text, and figures there trace back to the published association release.'
    ],
    [
      'What does a strategy review actually produce?',
      'A written position: the likely buyer, the pricing range and the evidence behind it, the preparation sequence, and the negotiation posture. It is a working document, not a listing presentation.'
    ],
    [
      'Is there any obligation to list after a review?',
      'No. Plenty of owners use a review to decide the timing is wrong, or that the property should be prepared over a longer horizon. That is a legitimate outcome of the exercise.'
    ],
    [
      'Can this be handled in Spanish?',
      'Yes. The review, the documents, and the negotiation can all run in Spanish or English, which matters when family or advisers abroad are part of the decision.'
    ]
  ];
}

function sourceNoteVariants() {
  return [
    'Source basis: Carlos Uzcategui verified professional profile; United Realty Group affiliation; MIAMI REALTORS distribution references maintained in the HomesProfessional source library. This article does not use live MLS statistics, mortgage rates, tax calculations, legal conclusions, or property-specific valuation data.',
    'Source basis: verified professional profile and United Realty Group affiliation for credentials; the HomesProfessional source library for MIAMI REALTORS distribution figures. Market characteristics described here are qualitative. No live MLS statistics, rates, tax calculations, or property-specific valuations are used.',
    'Source basis: the HomesProfessional source library for association and distribution figures, and Carlos Uzcategui\'s verified professional profile and United Realty Group affiliation for credentials. Nothing here constitutes a valuation, a legal conclusion, or a tax calculation.'
  ];
}

// Deterministic and stable: the same market and angle always yield the same
// variant, so regenerating a post never silently rewrites what was published.
function cycle(options, index) {
  return options[((index % options.length) + options.length) % options.length];
}

function marketIndex(market) {
  return markets.findIndex((entry) => entry.name === market.name);
}

function angleIndex(angle) {
  return angles.findIndex((entry) => entry.key === angle.key);
}

// Three or four diligence items read as an unscannable mouthful inline, so the
// long lists render as bullets and the short ones stay in the sentence.
function bullets(items) {
  return items.map((item) => `- ${item.charAt(0).toUpperCase()}${item.slice(1)}`).join('\n');
}

function list(items) {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

const MINOR_WORDS = new Set(['a', 'an', 'and', 'in', 'of', 'or', 'the']);

function titleCase(value) {
  return value
    .split(' ')
    .map((word, index) => (index > 0 && MINOR_WORDS.has(word) ? word : word.replace(/^\w/, (c) => c.toUpperCase())))
    .join(' ');
}

// "a Aventura condominium" reads wrong; only vowel-initial market names need 'an'.
function article(name) {
  return /^[aeiou]/i.test(name) ? 'an' : 'a';
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

// `overrides.date` and `overrides.image` exist for regeneratePost: a rewrite of
// an already-published post must keep its original publish date and share-card
// path, since both are load-bearing (indexed date, an og:image that already
// exists on disk) and neither should move just because the prose did.
function buildPost(topic, overrides = {}) {
  const { angle, market, slug } = topic;
  const title = angle.title(market);
  const excerpt = angle.excerpt(market);
  const ctaPath = angle.audience === 'buyer' ? '/buy' : market.sellerPage;
  const ctaUrl = `${ctaPath}?utm_source=journal&utm_medium=seo&utm_campaign=${slug}`;
  const reviewName = angle.audience === 'buyer' ? 'South Florida Buyer Strategy Review' : 'Private Seller Strategy Review';

  const body = angle
    .sections(market)
    .map(([heading, text]) => `## ${heading}\n\n${text}`)
    .join('\n\n');

  // The supporting blocks — distribution, bio, FAQ, source note — are the parts
  // every post must carry, so they are the parts most likely to make two posts
  // look alike. Selecting them by market index with a different stride per block
  // means two posts sharing an angle systematically land on different variants
  // instead of colliding whenever a hash happens to agree.
  const m = marketIndex(market);
  const a = angleIndex(angle);
  const general = generalFaq();
  const faqOffset = (m + a * 3) % general.length;
  const faq = [
    ...angle.faq(market),
    general[faqOffset],
    general[(faqOffset + 1 + (a % 2)) % general.length]
  ]
    .map(([question, answer]) => `### ${question}\n\n${answer}`)
    .join('\n\n');

  const frontmatterLines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${overrides.date ?? today}"`,
    `slug: "${slug}"`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `category: "${angle.category}"`
  ];
  if (overrides.image) frontmatterLines.push(`image: "${overrides.image}"`);
  frontmatterLines.push(
    'created_by: "github-actions"',
    `market: "${market.name}"`,
    'funnel_stage: "consideration"',
    'content_goal: "lead_generation"',
    '---'
  );
  const frontmatter = frontmatterLines.join('\n');

  return `${frontmatter}

${excerpt}

${body}

## Why Distribution Matters

${cycle(distributionVariants(market), m + a)}

## Why Carlos Uzcategui

${cycle(bioVariants(), m + a * 2)}

## First Step

Request a ${reviewName} before making a public decision.

[Start the strategy review](${ctaUrl})

USA WhatsApp: +1 954-865-6622

Spain WhatsApp: +34 646 85 30 78

Email: contact@carlosre.com

## FAQ

${faq}

## Source and Compliance Notes

${cycle(sourceNoteVariants(), m + a)}

Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.

Information is for general informational purposes only and does not constitute legal, tax, financial, insurance, or investment advice. Market data and association information are deemed reliable but not guaranteed and are subject to change without notice.
`;
}

// Any number in a published post has to be one we can source. Strip the approved
// phrases, and whatever digits remain are unverified claims.
function assertVerifiedFigures(content) {
  const body = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  let stripped = body;
  for (const phrase of [...VERIFIED_FIGURE_PHRASES].sort((a, b) => b.length - a.length)) {
    stripped = stripped.split(phrase).join(' ');
  }
  const leftovers = stripped.match(/[^\s]*\d[^\s]*/g);
  if (leftovers) {
    throw new Error(
      `Quality gate failed: unverified figure(s) ${[...new Set(leftovers)].join(', ')}. ` +
        'Every number must trace to src/data/figures.json and be listed in VERIFIED_FIGURE_PHRASES.'
    );
  }
}

function assertQuality(content, meta) {
  const required = [
    'Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.',
    'Source basis:',
    'Request a'
  ];
  const missing = required.filter((needle) => !content.includes(needle));
  if (missing.length) throw new Error(`Quality gate failed. Missing: ${missing.join(', ')}`);

  // Every post has to disclaim the guarantee somewhere, but the wording varies by
  // variant, so match the meaning rather than one fixed sentence.
  const disclaimers = ['does not guarantee price or timing', 'guarantees price or timing', 'does not guarantee'];
  if (!disclaimers.some((phrase) => content.includes(phrase))) {
    throw new Error('Quality gate failed: no explicit "does not guarantee price or timing" disclaimer.');
  }

  if (/guarantee[^.?]*\?\s*\n\s*\n\s*Yes/i.test(content)) {
    throw new Error('Quality gate failed: guarantee language detected.');
  }
  if (meta.excerpt.length > 160) {
    throw new Error(`Quality gate failed: excerpt is ${meta.excerpt.length} characters, over the 160 limit.`);
  }

  assertVerifiedFigures(content);
}

function shingles(text) {
  const words = text
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 6 <= words.length; i += 1) set.add(words.slice(i, i + 6).join(' '));
  return set;
}

// The failure this guards against is the one that produced a dozen 93%-identical
// posts: a template that varies only by city name still generates, still passes
// every other check, and quietly publishes duplicate content.
function assertDistinct(content, { excludeFile } = {}) {
  const candidate = shingles(content);
  let worst = { slug: null, similarity: 0 };

  for (const file of fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== excludeFile)) {
    const existing = shingles(fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf8'));
    let intersection = 0;
    for (const item of candidate) if (existing.has(item)) intersection += 1;
    const similarity = intersection / (candidate.size + existing.size - intersection);
    if (similarity > worst.similarity) worst = { slug: file.replace(/\.md$/, ''), similarity };
  }

  if (worst.similarity > MAX_SIMILARITY) {
    throw new Error(
      `Quality gate failed: ${(100 * worst.similarity).toFixed(1)}% shingle overlap with ${worst.slug} ` +
        `(limit ${(100 * MAX_SIMILARITY).toFixed(0)}%). The templates need more market-specific content before this angle repeats.`
    );
  }
  return worst;
}

// Renders the post's share card and points its frontmatter at it. The renderer
// reads the post's own frontmatter, so this must run after the file is written.
// The image field is only set once the card exists on disk — a post that claims
// an image it does not have would publish a broken og:image tag.
function renderShareCard(slug, postPath) {
  const cardPath = path.join(ROOT, 'public', 'images', 'journal', 'og', `${slug}.jpg`);
  const result = spawnSync(
    process.execPath,
    [path.join(ROOT, 'scripts', 'render-journal-og.mjs'), `--slug=${slug}`],
    { cwd: ROOT, stdio: 'inherit' }
  );

  if (result.status !== 0 || !fs.existsSync(cardPath)) {
    console.warn(
      `Warning: could not render the share card for ${slug}. The post is still published, ` +
        'but without an og:image. Run "node scripts/render-journal-og.mjs" to backfill it.'
    );
    return;
  }

  const raw = fs.readFileSync(postPath, 'utf8');
  if (/^image:/m.test(raw)) return;
  fs.writeFileSync(postPath, raw.replace(/^(category:.*)$/m, `$1\nimage: "/images/journal/og/${slug}.jpg"`));
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

// Slug format is "<angle-key>-<market-slug>-<year>-<month>". Angle keys never
// prefix one another, so the first match is unambiguous; the market is then
// whatever's left after stripping it.
function resolveRegenerationTarget(slug) {
  const angle = angles.find((a) => slug.startsWith(`${a.key}-`));
  if (!angle) throw new Error(`Cannot regenerate "${slug}": no angle key is a prefix of this slug.`);

  const rest = slug.slice(angle.key.length + 1);
  const market = markets.find((m) => rest.startsWith(`${slugify(m.name)}-`));
  if (!market) throw new Error(`Cannot regenerate "${slug}": no market slug is a prefix of "${rest}".`);

  return { angle, market };
}

// Rewrites an already-published post from the current templates without moving
// its live URL or its indexed publish date. Used to fix posts that predate
// assertDistinct and were generated back when the templates varied only by
// city name.
function regeneratePost(slug) {
  const postPath = path.join(JOURNAL_DIR, `${slug}.md`);
  if (!fs.existsSync(postPath)) throw new Error(`Cannot regenerate "${slug}": ${postPath} does not exist.`);

  const existingRaw = fs.readFileSync(postPath, 'utf8');
  const fmMatch = existingRaw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fmMatch) throw new Error(`Cannot regenerate "${slug}": existing file has no frontmatter block.`);

  const existingMeta = {};
  for (const line of fmMatch[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*"?([^"]*)"?\s*$/);
    if (kv) existingMeta[kv[1].trim()] = kv[2].trim();
  }
  if (!existingMeta.date) throw new Error(`Cannot regenerate "${slug}": existing frontmatter has no date.`);
  if (existingMeta.slug !== slug) {
    throw new Error(`Cannot regenerate "${slug}": frontmatter slug "${existingMeta.slug}" does not match the filename.`);
  }

  const { angle, market } = resolveRegenerationTarget(slug);
  const topic = { angle, market, slug };
  const content = buildPost(topic, { date: existingMeta.date, image: existingMeta.image });

  assertQuality(content, { excerpt: angle.excerpt(market) });
  // The post being rewritten still exists on disk mid-comparison, so exclude it —
  // otherwise every regeneration would "collide" with the copy it's replacing.
  const closest = assertDistinct(content, { excludeFile: `${slug}.md` });

  fs.writeFileSync(postPath, content);
  console.log(
    `Regenerated journal post: ${slug} ` +
      `(closest other post: ${closest.slug ?? 'none'} at ${(100 * closest.similarity).toFixed(1)}%)`
  );
}

const regenerateArg = process.argv.find((arg) => arg.startsWith('--regenerate='));

if (regenerateArg) {
  regeneratePost(regenerateArg.slice('--regenerate='.length));
} else {
  const existingSlugs = readExistingSlugs();
  const topic = chooseTopic(existingSlugs);
  if (!topic) {
    console.log('No publishable journal topic available today. Skipping.');
    process.exit(0);
  }

  const content = buildPost(topic);
  assertQuality(content, { excerpt: topic.angle.excerpt(topic.market) });
  const closest = assertDistinct(content);
  const postPath = path.join(JOURNAL_DIR, `${topic.slug}.md`);
  if (fs.existsSync(postPath)) {
    console.log(`Post already exists: ${topic.slug}. Skipping.`);
    process.exit(0);
  }
  fs.writeFileSync(postPath, content);
  renderShareCard(topic.slug, postPath);
  updatePackage(topic.slug);
  updateSitemap(topic.slug);
  console.log(
    `Published scheduled journal draft: ${topic.slug} ` +
      `(closest existing post: ${closest.slug ?? 'none'} at ${(100 * closest.similarity).toFixed(1)}%)`
  );
}
