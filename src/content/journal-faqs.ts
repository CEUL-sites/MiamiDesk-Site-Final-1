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
  'weston-to-boca-downsizing': [
    {
      q: 'Can I buy a Boca Raton condo with the equity from selling my Weston home?',
      a: 'Often, yes. In a June 2026 example, a Weston home sold for $1,170,000; after a $520,000 mortgage payoff and roughly 6% in seller closing costs, net proceeds were about $579,800 — enough to cover roughly 98% of a $580,000 Boca Raton condo plus closing costs, with a small balance brought from savings at closing and no new mortgage. Your numbers depend on your sale price, payoff, and the home you buy.',
    },
    {
      q: 'How much can downsizing from a South Florida house to a condo save each month?',
      a: 'In this case study, monthly housing cost fell from about $6,623 in Weston to about $2,019 in Boca Raton — roughly $4,604 a month, or about $55,000 a year. The savings come from eliminating the mortgage, lower property taxes with homestead portability, and replacing pool, lawn, insurance, and utility line items with a single condo maintenance fee. Actual figures vary by property.',
    },
    {
      q: 'How does Florida homestead portability work when you downsize?',
      a: 'When you downsize to a home of lower just value, the transferable Save Our Homes benefit is prorated: SOH differential multiplied by (new value divided by old value). In this example a $291,842 differential became about $144,674 of benefit transferred to the new homestead, lowering its taxable value from day one. Portability is requested on form DR-501T with your county property appraiser. Confirm your figures with the appraiser and a tax professional.',
    },
    {
      q: 'Does a Boca Raton condo maintenance fee replace a house\'s separate bills?',
      a: 'Largely, yes. The Boca Grand maintenance fee of $1,253 per month in this example includes building insurance, water, sewer, trash, pest control, security, parking, pool, and recreation — costs that appear as separate line items for a single-family home such as pool service, lawn care, flood and homeowner\'s insurance, and several utilities.',
    },
    {
      q: 'How long do I have to apply for portability after selling my Weston home?',
      a: 'Florida law gives you up to three tax years after the year you abandon your prior homestead to establish a new Florida homestead and apply for portability. Because the window is fixed, the sale date, purchase date, and county filing deadline should be coordinated before you list. Verify timing with your county property appraiser.',
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
