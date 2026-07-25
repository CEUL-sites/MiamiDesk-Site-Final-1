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
  'international-investor-south-florida-income-property-2026': [
    {
      q: 'How does an international investor find good South Florida investment property?',
      a: 'The strongest opportunities are often evaluated first by professionals working the market, not surfaced by public portal alerts. A cross-border investor closes that access gap with local buyer representation inside the professional network — a buyer’s agent who can source, screen, and present opportunities in the investor’s language, then run a disciplined process. Carlos Uzcategui searches through the Miami and South Florida REALTORS® network of roughly 93,000 member agents.',
    },
    {
      q: 'What should a disciplined acquisition process include?',
      a: 'Before any offer: a defined mandate (asset type, target basis, hold horizon, return profile), independent valuation against comparable sales and active inventory, conservative income and cost modeling, financing clarity for a foreign buyer, full due diligence (title, association, condition, restrictions), and an exit view. This does not guarantee a return; it reduces avoidable mistakes.',
    },
    {
      q: 'What extra considerations apply to a cross-border purchase?',
      a: 'A non-U.S. buyer may face entity-structure choices, foreign-national financing terms, currency and transfer logistics, coastal insurance, and specific tax and withholding rules. The professional standard is that an experienced agent coordinates the transaction while a qualified U.S. attorney and CPA handle the legal, tax, and structuring decisions — engaged before the contract is signed.',
    },
    {
      q: 'Does the Global Desk help investors buy as well as sell?',
      a: 'Yes. The Global Desk is two-sided. An investor abroad can acquire South Florida income property through professional representation, and an investor already holding South Florida assets can reach international buyers and opportunities through the same cooperation network — one bilingual point of contact for cross-border acquisition and disposition.',
    },
  ],
  'global-luxury-investment-buyer-agent-network-2026': [
    {
      q: 'How does a luxury or investment seller reach high-net-worth buyers who already have agents?',
      a: 'High-net-worth and investment buyers typically act through a trusted agent rather than public portals. A seller reaches them by listing inside a professional network that routes the property agent-to-agent — including international cooperation channels — so the representatives who hold qualified buyers can find, evaluate, and present it. Carlos Uzcategui positions listings through the Miami and South Florida REALTORS® network of roughly 93,000 member agents.',
    },
    {
      q: 'Does the Global Desk work for a property in Spain as well as Miami?',
      a: 'Yes. The Global Desk is bidirectional. The same cooperation network that carries a South Florida listing to international buyer agents can carry a Spanish prime listing to the Miami, U.S., and Latin American agents whose clients are buying it — and connects international buyer representatives to Miami inventory. It is one point of contact for prime or investment property wherever it sits.',
    },
    {
      q: 'What network does Carlos Uzcategui use to market luxury and investment property?',
      a: 'Listings are positioned through the Miami and South Florida REALTORS® — the world’s largest local REALTOR® association — with roughly 93,000 member agents, 200+ global portals in 19 languages, 437+ international cooperation agreements across 75+ countries, plus United Realty Group’s 3,500+ agents across 20 Florida offices. Network reach does not guarantee a price or timeline.',
    },
    {
      q: 'Why do luxury and investment properties benefit most from a large buyer-agent network?',
      a: 'Their buyer pools are small and specialized. Luxury residences trade to a limited set of capable buyers concentrated inside professional and referral relationships, and investment property sells to representatives evaluating yield and financing. A wider agent-to-agent network raises the odds the right buyers are reached during the launch window while preserving discretion.',
    },
  ],
  'doral-home-prices-may-2026-market-report': [
    {
      q: 'What was the median single-family home price in Doral in May 2026?',
      a: 'The median single-family sale price in Doral was $1,074,000 in May 2026, up about 30% year-over-year, according to Florida REALTORS®/MIAMI REALTORS® City and ZIP statistics released June 16, 2026. Median figures reflect the mix of homes sold in the period, not individual-home appreciation.',
    },
    {
      q: 'Is Doral a seller’s market in 2026?',
      a: 'May 2026 data showed strong demand in Doral single-family homes — closed sales up about 26% year-over-year and new pending sales up about 83% — while active inventory was down about 9%. New listings also rose about 45%, so sellers face more competition even with demand strong. Conditions vary by community and price band.',
    },
    {
      q: 'Why did the Doral median price rise so much year-over-year?',
      a: 'A large move in a citywide median usually reflects a shift in the mix of homes that sold — for example, more higher-end closings — rather than a uniform jump in every home’s value. A property-specific analysis against comparable sales in the same community is the right way to estimate an individual home’s price.',
    },
    {
      q: 'What should a Doral homeowner do before listing?',
      a: 'Start with a property-specific home value review against current MLS comparables, identify the active listings and recent closed sales in the same community and price band, and set a distribution plan that reaches qualified buyers and agents — including Doral’s international buyer segment — before the listing goes public.',
    },
  ],
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
  'downsizing-south-florida-homestead-portability-example-2026': [
    {
      q: 'How much can a married couple exclude from capital gains when selling a primary home?',
      a: 'Under IRC Section 121, a married couple filing jointly can exclude up to $500,000 of gain on the sale of a primary residence if they meet the ownership and use tests — generally owning and living in the home at least two of the five years before the sale. Documented capital improvements add to your cost basis and can further reduce taxable gain. Confirm your situation with a CPA.',
    },
    {
      q: 'How is Florida portability calculated when you downsize?',
      a: 'When you buy a less expensive home, Florida transfers a proportional share of your Save Our Homes benefit: (new market value ÷ old market value) × your accumulated benefit, up to $500,000. For example, moving from a $1.1M home to a $550,000 home transfers 50% of the benefit. Your county property appraiser calculates the exact figure.',
    },
    {
      q: 'Can downsizing eliminate a mortgage payment?',
      a: 'Often, yes. If net sale proceeds exceed the price of the replacement home, a seller can purchase the next home outright and remove the mortgage principal and interest entirely — typically the largest line in a monthly housing budget — while also lowering property taxes through portability and reducing insurance on a smaller home.',
    },
    {
      q: 'Does a higher sale price change the whole downsizing plan?',
      a: 'Yes. Net proceeds drive every later step — the cash available for the next home, the reserve left over, and the monthly cost reset. Because the realized sale price depends heavily on how the home is positioned and distributed, the sale strategy is the most controllable variable in the plan.',
    },
  ],
  'relocating-out-of-south-florida-sequence-the-sale-2026': [
    {
      q: 'Should I sell my South Florida home before or after buying out of state?',
      a: 'It depends on your numbers. Selling first locks in your proceeds and lets you buy with certainty, but may create an interim gap. Buying first means one move but possibly carrying two homes. Concurrent closings are ideal but require disciplined timing. The right sequence depends on your equity, whether the new purchase needs the Florida proceeds, and your moving deadline.',
    },
    {
      q: 'Does Florida portability transfer if I move to another state?',
      a: 'No. The Save Our Homes assessment benefit and portability apply only to a Florida homestead. When you establish residency in another state, that accumulated benefit is left behind. Portability can only be transferred to another home within Florida.',
    },
    {
      q: 'Do I still get the capital gains exclusion if I move out of Florida?',
      a: 'The federal IRC Section 121 exclusion (up to $250,000 single / $500,000 married filing jointly) follows you regardless of where you move, provided you meet the ownership and use tests on the home you are selling. Documented improvements raise your basis and reduce taxable gain. Confirm eligibility with a CPA, especially when changing state residency.',
    },
    {
      q: 'How can I avoid moving twice when relocating?',
      a: 'A post-closing occupancy agreement (a seller leaseback) lets you remain in the home for a defined short period after closing under agreed terms, which can turn two moves into one. It is negotiated as part of the contract and has constraints tied to the buyer’s financing, so plan it early.',
    },
  ],
  'downsizing-lower-housing-costs-south-florida-homestead-playbook-2026': [
    {
      q: 'What housing costs can downsizing actually reduce?',
      a: 'Beyond a smaller mortgage (or none, if you buy the next home outright), downsizing can lower property taxes, homeowner/windstorm/flood insurance, HOA or CDD fees, maintenance and major-system replacement costs, and monthly utilities. It can also free equity that was otherwise sitting idle in an over-large home.',
    },
    {
      q: 'Do I lose my Homestead tax benefits if I downsize?',
      a: 'Not if you stay within Florida. You can claim a new Homestead Exemption on your next permanent residence and use portability to carry up to $500,000 of your accumulated Save Our Homes benefit. When downsizing, the benefit transfers proportionally — (new market value ÷ old market value) × your benefit — as calculated by your county property appraiser.',
    },
    {
      q: 'Can downsizing eliminate my mortgage payment entirely?',
      a: 'Often, yes. If the net proceeds from your sale exceed the price of the replacement home, you may be able to purchase the next home with cash and remove the principal-and-interest payment — typically the largest recurring housing cost — while keeping a cash reserve.',
    },
    {
      q: 'Are lower monthly costs guaranteed after downsizing?',
      a: 'No. Savings depend on choices: high HOA dues can offset reduced maintenance, and a coastal condo may carry insurance comparable to a larger inland home. The goal is a net reduction in predictable monthly cost, which is why a property-specific review of taxes, insurance, dues, and reserves matters before you commit.',
    },
  ],
  'seller-closing-costs-south-florida-2026': [
    {
      q: 'What closing costs does a seller pay in South Florida?',
      a: 'In South Florida, sellers customarily pay the real estate commission, the documentary stamp tax on the deed, the owner’s title insurance policy, prorated property taxes, an HOA estoppel fee where applicable, and a closing/settlement fee. The exact allocation is negotiable in the contract.',
    },
    {
      q: 'How much is the Florida documentary stamp tax when I sell?',
      a: 'Florida charges documentary stamp tax on the deed at $0.70 per $100 of the sale price in most of the state. Miami-Dade County is different: the base rate is $0.60 per $100, plus a $0.45 per $100 surtax that applies to every property type except a single-family residence. So in Miami-Dade a $1,000,000 single-family home is about $6,000, while a $1,000,000 condo, multifamily, land, or commercial transfer is about $10,500. Confirm your figure with the closing agent (source: Florida Department of Revenue).',
    },
    {
      q: 'Is the real estate commission a fixed rate in Florida?',
      a: 'No. Commission is not set by law — it is negotiated as part of the listing agreement. A well-structured agreement addresses both the listing-side fee and compensation that motivates the buyer-agent network to show the property.',
    },
    {
      q: 'How do I estimate my net proceeds?',
      a: 'Start with the expected sale price, then subtract the mortgage payoff, commission, documentary stamp tax, owner’s title insurance, prorated taxes, and any HOA estoppel or settlement fees. A seller net sheet prepared for your specific property gives the most accurate figure; this article is general information, not a guarantee of any amount.',
    },
  ],
  'what-is-my-home-worth-south-florida-2026': [
    {
      q: 'Are online home value estimates accurate in South Florida?',
      a: 'Automated valuation models (AVMs) can be a starting point but often miss condition, floor, view, upgrades, HOA health, and submarket dynamics. Independent analysis has documented AVM median error rates of 7–14% in the Miami-Dade luxury segment, which on a $2M property is a $140,000–$280,000 swing in either direction.',
    },
    {
      q: 'What is a Comparative Market Analysis (CMA)?',
      a: 'A CMA is a professional evaluation prepared by a licensed REALTOR® using current MLS data — active, pending, sold, and expired comparables — adjusted for your property’s specific characteristics to produce a realistic price range and positioning strategy. It is not a public-records pull or a website estimate.',
    },
    {
      q: 'What data is a South Florida home valuation based on?',
      a: 'A property-specific CMA references current Miami and South Florida REALTORS® MLS data. Values vary based on condition, location, improvements, and current market activity, so the analysis produces a range rather than a single guaranteed number.',
    },
    {
      q: 'Is a professional home valuation free?',
      a: 'Carlos Uzcategui (FL SL705771, United Realty Group) prepares property-specific CMAs that are confidential, free, and carry no obligation to list.',
    },
  ],
  'how-to-choose-a-listing-agent-south-florida-2026': [
    {
      q: 'What questions should I ask before signing a listing agreement?',
      a: 'Ask how the price was determined and to see the comparables; whether the listing will be entered into the Miami and South Florida REALTORS® MLS and where it syndicates beyond that; how buyer agents will be made aware of and motivated to show it; and the full terms — commission, agreement length, and how you can exit.',
    },
    {
      q: 'Should I choose the agent who quotes the highest list price?',
      a: 'Be cautious. An inflated list price is a common reason good properties accumulate days on market and then sell below where they should have. Ask for the comparables and the reasoning behind any number, not just the headline figure.',
    },
    {
      q: 'Why does MLS and buyer-agent exposure matter when selling?',
      a: 'Buyer agents represent most of the buyers in the market. Entering the listing into the Miami and South Florida REALTORS® MLS and giving buyer agents a reason to show it is central to generating competitive offers.',
    },
  ],
  'when-to-list-south-florida-home-2026': [
    {
      q: 'Is there a best season to sell a home in South Florida?',
      a: 'South Florida does not follow a single traditional selling season the way colder markets do. Demand is influenced by seasonal residents, international buyers, and interest-rate conditions, so the right timing depends on your property type and submarket rather than a fixed calendar month.',
    },
    {
      q: 'Does waiting to list cost me money?',
      a: 'It can. Carrying costs — taxes, insurance, HOA dues, and maintenance — continue while you wait, and market conditions can shift. The article reviews general South Florida patterns using Miami and South Florida REALTORS® MLS data; it is not a guarantee of price or timeline.',
    },
    {
      q: 'How is the right time to list determined for my property?',
      a: 'Timing is set against current inventory, comparable activity, and demand in your specific submarket — analyzed with current MLS data — rather than a one-size-fits-all rule.',
    },
  ],
  'pre-listing-checklist-south-florida-2026': [
    {
      q: 'What should I do before listing my South Florida home?',
      a: 'Typical pre-listing steps include addressing deferred maintenance and visible repairs, deep cleaning and decluttering, completing required disclosures, gathering HOA or condo documents where applicable, and preparing the property for professional photography ahead of the MLS launch.',
    },
    {
      q: 'Should I make repairs or renovations before selling?',
      a: 'Small, high-visibility fixes often matter more than large renovations. The right scope depends on your price point and submarket — a pre-listing walkthrough with a licensed REALTOR® helps prioritize work that supports the sale rather than over-improving.',
    },
    {
      q: 'What documents do South Florida sellers need to prepare?',
      a: 'Common items include the deed and any survey, mortgage payoff information, property tax records, and — for condos and HOA communities — governing documents and account/estoppel information. Your closing agent will confirm the full list for your transaction.',
    },
  ],
  'hoa-impact-home-sale-south-florida-2026': [
    {
      q: 'What is an HOA estoppel letter and who pays for it?',
      a: 'An estoppel letter (or certificate) is issued by the association certifying the account status and any outstanding balances on a unit. In South Florida the seller customarily obtains it; fees are commonly a few hundred dollars and are regulated under Florida law.',
    },
    {
      q: 'Can an HOA or condo association block my sale?',
      a: 'Associations generally cannot block a standard sale, but unpaid dues, special assessments, or governing-document requirements such as association approval of the buyer can affect timing. Review your documents early so issues are resolved before closing.',
    },
    {
      q: 'How do HOA dues and assessments affect buyers?',
      a: 'High monthly dues, pending special assessments, or reserve shortfalls can affect what buyers will offer and how some lenders underwrite a condo. Disclosing these clearly up front helps avoid renegotiation later in the transaction.',
    },
  ],
  'selling-inherited-home-south-florida-2026': [
    {
      q: 'How do I sell a home I inherited in South Florida?',
      a: 'The home generally must pass through the estate before it can be sold — often via Florida probate — and the personal representative typically signs on behalf of the estate. Confirm title, authority to sell, and any liens with a probate attorney and title company before listing.',
    },
    {
      q: 'What is the stepped-up basis on an inherited home?',
      a: 'For tax purposes, an inherited property’s cost basis is generally “stepped up” to its fair market value as of the date of death, which can significantly reduce taxable gain when you sell. Tax treatment varies by situation — consult a qualified tax professional.',
    },
    {
      q: 'Do all heirs have to agree to sell?',
      a: 'When a property is inherited by multiple heirs, the sale generally requires their cooperation or the authority of the estate’s personal representative. A probate attorney can advise on how decisions are made for your specific estate.',
    },
  ],
  'international-owners-south-florida-mls-2026': [
    {
      q: 'Can a foreign national sell property in South Florida?',
      a: 'Yes. Non-U.S. owners can sell South Florida real estate. The property is marketed through the Miami and South Florida REALTORS® MLS like any other listing, with additional attention to remote signing, funds transfer, and tax-withholding requirements.',
    },
    {
      q: 'What is FIRPTA and how does it affect foreign sellers?',
      a: 'FIRPTA is a federal law requiring the buyer to withhold a percentage of the sale price when purchasing U.S. real property from a foreign person, remitted to the IRS toward the seller’s potential tax. Withholding rates and exemptions depend on the facts — consult a qualified tax professional or attorney.',
    },
    {
      q: 'Do I need to be in Florida to close on my sale?',
      a: 'Not necessarily. Many international sellers close remotely using powers of attorney, mail-away packages, and wire transfers coordinated by the title company. Requirements depend on your situation and should be arranged early in the process.',
    },
  ],
  'latin-american-buyers-south-florida-2026': [
    {
      q: 'Why are Latin American buyers active in South Florida real estate?',
      a: 'South Florida has long attracted Latin American buyers for its location, connectivity, established communities, and the depth of the Miami and South Florida REALTORS® MLS, which distributes listings across a large network of agents and international portals.',
    },
    {
      q: 'How do I market my home to international buyers?',
      a: 'Listings entered into the Miami and South Florida REALTORS® MLS reach a broad buyer-agent network and syndicate to international portals. Bilingual representation and familiarity with cross-border buyers help when offers come from outside the U.S.',
    },
    {
      q: 'Can international buyers get financing for South Florida property?',
      a: 'Some buyers pay cash and others use foreign-national mortgage programs offered by certain lenders. Terms differ from standard domestic loans; buyers should confirm options with a lender experienced in cross-border financing.',
    },
  ],
  'selling-miami-beach-condo-2026': [
    {
      q: 'What affects the value of a Miami Beach condo?',
      a: 'Condo value is driven by line and floor, view, building amenities and condition, monthly dues, any special assessments, reserve health, and recent comparable sales in the same or similar buildings — analyzed using current Miami and South Florida REALTORS® MLS data.',
    },
    {
      q: 'What documents do I need to sell a Miami Beach condo?',
      a: 'Beyond standard seller documents, condo sales typically require the association’s governing documents, financials, and an estoppel certificate, plus disclosure of any pending special assessments. Some buildings also require association approval of the buyer.',
    },
    {
      q: 'How are condos marketed to international buyers in Miami Beach?',
      a: 'Eligible condos are entered into the Miami and South Florida REALTORS® MLS and syndicated to international portals, reaching both local buyer agents and overseas buyers. Pricing and positioning are set against current comparable activity in the building and submarket.',
    },
  ],
};
