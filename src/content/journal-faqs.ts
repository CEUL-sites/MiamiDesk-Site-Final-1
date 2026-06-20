// Optional FAQ data for journal posts, keyed by slug.
// When a post has entries here, JournalPostPage renders an accessible FAQ
// section and emits FAQPage structured data so the Q&As are eligible for
// Google rich results. Keep answers concise, factual, and route tax/legal
// questions to a qualified professional (compliance).
export interface JournalFaq {
  q: string;
  a: string;
}

export const JOURNAL_FAQS: Record<string, JournalFaq[]> = {
  'florida-homestead-portability-benefits-2026': [
    {
      q: 'What is the Florida Homestead Exemption worth?',
      a: 'Under Florida Statute §196.031, the Homestead Exemption removes up to $50,000 from the assessed value of your permanent residence — the first $25,000 applies to all property taxes, and an additional $25,000 (on assessed value between $50,000 and $75,000) applies to non-school taxes. You must apply with your county property appraiser, generally by March 1.',
    },
    {
      q: 'What is the Save Our Homes cap?',
      a: 'Save Our Homes limits how much the assessed value of a homesteaded property can rise each year to 3% or the change in the Consumer Price Index, whichever is lower. Over time this can keep your taxable value well below market value.',
    },
    {
      q: 'Can I transfer my Save Our Homes benefit to a new home?',
      a: 'Yes. Portability lets you transfer up to $500,000 of your accumulated Save Our Homes benefit to a new homestead within Florida, using form DR-501T filed alongside the new Homestead Exemption application.',
    },
    {
      q: 'How long do I have to establish a new homestead for portability?',
      a: 'A 2020 constitutional amendment extended the window to three tax years following the year you abandoned your prior homestead. Confirm timing with your county property appraiser.',
    },
  ],
  'home-sale-capital-gains-exclusion-500k-2026': [
    {
      q: 'How much capital gain can I exclude when I sell my home?',
      a: 'Under IRC Section 121, a single filer may exclude up to $250,000 of gain on the sale of a primary residence, and a married couple filing jointly may exclude up to $500,000, if the ownership and use tests are met.',
    },
    {
      q: 'What are the requirements to qualify?',
      a: 'Generally, during the five years ending on the sale date you must have owned the home for at least two years and lived in it as your main home for at least two years. The periods need not be continuous.',
    },
    {
      q: 'Does the exclusion apply to a rental or second home?',
      a: 'No. The exclusion is for a primary residence. Property used as a rental may have depreciation that must be recaptured, and second homes are treated differently. Consult a tax professional.',
    },
    {
      q: 'Can I use the home-sale exclusion more than once?',
      a: 'Generally you cannot claim the exclusion if you used it on the sale of another home within the two years before the current sale.',
    },
  ],
  '1031-exchange-south-florida-investment-property-2026': [
    {
      q: 'What is a 1031 exchange?',
      a: 'A 1031 exchange (IRC Section 1031) lets an investor defer capital gains tax by reinvesting the proceeds from the sale of investment or business real property into like-kind real property.',
    },
    {
      q: 'Does a 1031 exchange apply to my primary residence?',
      a: 'No. Section 1031 applies only to real property held for investment or business use. The sale of a primary residence is instead governed by the Section 121 exclusion.',
    },
    {
      q: 'What are the 1031 exchange deadlines?',
      a: 'You have 45 calendar days from the sale to identify replacement property in writing, and 180 calendar days to close on it. These periods run concurrently and are not routinely extended.',
    },
    {
      q: 'Does a 1031 exchange eliminate capital gains tax?',
      a: 'No. It defers the tax — potentially indefinitely if you keep exchanging — but does not erase it. A qualified intermediary must hold the proceeds for the exchange to qualify.',
    },
  ],
  'post-occupancy-agreement-south-florida-2026': [
    {
      q: 'What is a post-closing occupancy agreement?',
      a: 'It is a written addendum to the purchase contract under which the buyer takes ownership at closing but the seller remains in the property for an agreed short period afterward, governed by terms such as duration, an occupancy fee, and a security deposit.',
    },
    {
      q: 'How long can a seller stay after closing?',
      a: 'These arrangements are meant to be short. Because owner-occupant buyers’ lenders typically expect the buyer to move in within about 60 days, longer periods must be checked against the buyer’s mortgage terms.',
    },
    {
      q: 'Does the seller pay to stay after closing?',
      a: 'Usually yes — the addendum commonly sets a daily or monthly occupancy fee, often approximating the buyer’s carrying costs, plus a refundable security deposit. The terms are negotiated as part of the contract.',
    },
  ],
  'listing-online-vs-activating-the-market-south-florida-2026': [
    {
      q: 'What is the difference between listing a home online and activating the market?',
      a: 'Listing online makes a property findable by buyers already searching that price band and starts the days-on-market clock. Activating the market is the deliberate work of positioning a correctly priced property in front of qualified buyers and the agents who represent them — through MLS distribution, buyer-agent outreach, and international and relocation channels — before days-on-market begins to work against the seller.',
    },
    {
      q: 'Does more online exposure guarantee a higher sale price?',
      a: 'No. No agent can guarantee a price or timeline. Broad distribution creates a structural advantage — more qualified buyers and agents become aware of the property — but the result still depends on pricing supported by current MLS data, condition, presentation, timing, and negotiation.',
    },
    {
      q: 'What questions should a South Florida seller ask before listing?',
      a: 'Beyond "what is my home worth," a seller should ask who will actually see the property, how it will be positioned against current competition, which buyers and agents will be activated, what market data supports the price, and what the plan is after the sale — for example downsizing, relocating, a 1031 exchange, or porting a homestead benefit.',
    },
    {
      q: 'How does MLS distribution help a South Florida seller reach more buyers?',
      a: 'A property listed through the Miami and South Florida REALTORS® enters the infrastructure of the world’s largest local REALTOR® association — roughly 93,000 member agents, 200+ global portals in 19 languages, 437+ international agreements, and syndication across 260+ U.S. MLSs — plus United Realty Group’s 3,500+ agents across 20 offices. This widens the pool of qualified buyer agents who can present the property.',
    },
  ],
  'review-equity-before-selling-south-florida-2026': [
    {
      q: 'Why should I review my equity before listing my home?',
      a: 'Because sale price is not what you keep. A short equity review estimates your net proceeds after commissions, closing costs, loan payoff, and prorations — the number that actually shapes whether you can downsize, relocate, or reinvest comfortably.',
    },
    {
      q: 'What is a seller net sheet?',
      a: 'A seller net sheet is an itemized estimate of what a seller would keep from a sale after typical costs are deducted from the sale price. It is illustrative, not a guarantee; actual proceeds vary by lender payoff and negotiated terms.',
    },
    {
      q: 'Is a home value review the same as an online estimate?',
      a: 'No. An online estimate compares your property to broad datasets. A professional home value review uses current Miami and South Florida REALTORS® MLS data and adjusts for condition, location, view, and submarket dynamics that automated models miss.',
    },
  ],
  'south-florida-may-2026-market-report-home-sellers': [
    {
      q: 'What did South Florida single-family inventory do in May 2026?',
      a: 'Per Florida REALTORS® and MIAMI REALTORS® data released June 16, 2026, single-family active inventory fell about 19.1% year-over-year in Miami-Dade (to 4,599 listings) and about 22.2% in Broward (to 4,560 listings). Months’ supply dropped to 5.2 in Miami-Dade and 4.5 in Broward.',
    },
    {
      q: 'What was the median single-family sale price in Miami-Dade and Broward in May 2026?',
      a: 'The median single-family sale price was $680,000 in Miami-Dade (up 0.7% year-over-year) and $630,000 in Broward (up 0.8%), according to Florida REALTORS®/MIAMI REALTORS® May 2026 statistics.',
    },
    {
      q: 'Does lower inventory mean every South Florida seller can raise their price?',
      a: 'No. Lower months’ supply strengthens conditions for well-prepared, correctly priced homes, but a property’s defensible price still depends on its submarket, condition, lot, and active competition. Median figures reflect the mix of homes sold, not individual-home appreciation.',
    },
    {
      q: 'How fast were homes going under contract in May 2026?',
      a: 'Median time to contract was about 41 days in Miami-Dade and 35 days in Broward, with sellers receiving roughly 95–96% of original list price — a signal that correctly priced single-family homes were transacting close to ask.',
    },
  ],
  'miami-dade-condo-sellers-may-2026-market': [
    {
      q: 'Is the Miami-Dade condo market a buyer’s market in 2026?',
      a: 'By the conventional months-of-supply measure, yes. May 2026 data from Florida REALTORS®/MIAMI REALTORS® showed about 12.9 months of condo and townhouse supply in Miami-Dade — well above the roughly six-month threshold generally used to define a buyer’s market.',
    },
    {
      q: 'What was the median Miami-Dade condo sale price in May 2026?',
      a: 'The median townhouse/condo sale price was $415,000, down 2.4% year-over-year, with the average sale price down 9.1%, per May 2026 statistics released June 16, 2026. Median time to sale was about 106 days.',
    },
    {
      q: 'How should a condo seller approach a high-supply market?',
      a: 'With pricing discipline, strong presentation, and active distribution. With over a year of supply, homes priced to the current comparable set and exposed to the widest pool of qualified buyers and buyer agents tend to compete best. No approach guarantees a price or timeline.',
    },
    {
      q: 'Why does distribution matter more when condo inventory is high?',
      a: 'When inventory is scarce, almost any listing is seen. With 12,000-plus active condos, visibility is not automatic — the property must be carried to the right buyers through MLS, buyer-agent, relocation, and international referral channels rather than published and left to wait.',
    },
  ],
};
