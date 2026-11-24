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
  'south-florida-condo-warrantability-fannie-mae-full-review-2026': [
    {
      q: 'Why do so few South Florida condos qualify for FHA or conventional loans in 2026?',
      a: 'According to MIAMI REALTORS® and HUD data, only 21 of 2,397 condo buildings (0.9%) across Miami-Dade, Broward, and Palm Beach hold active FHA approval. For conventional loans, Fannie Mae retired Limited Review on most projects over 10 units, requiring a Full Review of reserves, master insurance, HOA delinquencies, litigation, and critical repairs.',
    },
    {
      q: 'What is the December 31, 2026 Florida condo SIRS deadline under HB 913?',
      a: 'Associations with three or more habitable stories that coordinate their Structural Integrity Reserve Study (SIRS) with a required Milestone Inspection must complete the SIRS no later than December 31, 2026. HB 913 raised the structural reserve-item cost threshold to $25,000 and allows a temporary reserve-contribution pause of up to two consecutive annual budgets by majority owner vote following a milestone inspection to prioritize urgent repairs.',
    },
    {
      q: 'How can a condo seller close cleanly if a building is non-warrantable?',
      a: 'Sellers in non-warrantable buildings should disclose Milestone Inspection, SIRS, and assessment status upfront, price accurately against competing cash-closing inventory, and leverage global MLS syndication to reach all-cash domestic and international buyers—who already account for nearly half of Miami-Dade condo closings and 82% at $1 million and above.',
    },
    {
      q: 'What documents should a South Florida condo buyer review before waiving contingencies?',
      a: 'Buyers should obtain the completed Phase 1 and Phase 2 Milestone Inspection reports, the current SIRS study, adopted annual budget, reserve balances, master insurance declaration page, recent board meeting minutes, and a pre-offer lender check against Fannie Mae Form 1076 requirements. Legal review of association documents belongs with a Florida real estate attorney.',
    },
  ],
  'sell-south-florida-home-now-or-wait-until-2027': [
    {
      q: 'Should a South Florida homeowner sell in late 2026 or wait until spring 2027?',
      a: 'If your property is single-family or a reserve-compliant condo, listing during the late-2026 winter arrival window captures cash and relocation buyers before spring inventory rises further and while 7.28% mortgage rates sideline competing leveraged listings.',
    },
    {
      q: 'Why are condo prices softening while single-family medians hold firm?',
      a: 'Miami-Dade condo supply sits at 12.7 months versus 5.4 months for single-family homes, driven by stricter agency lending reviews and December 31, 2026 SIRS reserve deadlines that shift leverage toward cash buyers.',
    },
    {
      q: 'Do lower Citizens insurance rates help home sellers right now?',
      a: 'Yes. Approved 2026 Citizens rate reductions (-8.7% HO-3 and -10.4% HO-6) alongside private-market depopulation reduce buyer carrying-cost friction when paired with current wind-mitigation documentation.',
    },
  ],
  'florida-listing-agreement-what-sellers-sign-2026': [
    {
      q: 'What must a Florida listing agreement include?',
      a: 'Section 475.25(1)(r) of the Florida Statutes requires a written listing agreement to include a definite expiration date, a description of the property, the price and terms, the fee or commission, and the proper signature of each owner. The owner must receive a legible, signed copy, and the agreement may not require the owner to notify the broker of an intention to cancel after the expiration date. The commercial terms beyond those minimums are negotiated between the owner and the brokerage.',
    },
    {
      q: 'Can a Florida listing agreement renew automatically?',
      a: 'The statute says a written listing agreement may contain no provision requiring the owner to notify the broker of an intention to cancel the listing after its definite expiration date. In practice, that rules out a clause that keeps the listing alive unless the owner objects in writing. An owner who wants to continue after expiration can sign an extension; one who does not simply lets the date pass. Specific contract questions belong with a Florida real estate attorney.',
    },
    {
      q: 'Is my listing agreement with the agent or with the brokerage?',
      a: 'With the brokerage. Under section 475.42(1)(d) of the Florida Statutes, a sales associate may not collect a commission, deposit or other money in a brokerage transaction except in the name of the employing broker and with the broker\'s express consent. The agreement therefore names the brokerage, and the brokerage\'s supervision and escrow practices stand behind the sale, even though the owner usually works day to day with an individual agent.',
    },
    {
      q: 'What is the difference between a transaction broker and a single agent in Florida?',
      a: 'Under section 475.278, a transaction broker provides limited, nonfiduciary representation and may assist the buyer, the seller or both, with duties such as honest dealing, accounting for funds and limited confidentiality. A single agent represents only one party as a fiduciary and adds loyalty, full confidentiality, obedience and full disclosure. Florida presumes transaction brokerage unless a single agent relationship is established in writing, and dual agency is prohibited.',
    },
  ],
  'sell-and-buy-house-same-time-florida-2026': [
    {
      q: 'What Florida taxes apply to a bridge loan or a HELOC?',
      a: 'Two state taxes apply when a mortgage is recorded in Florida. Documentary stamp tax under section 201.08 is 35 cents on each $100 of the debt, and the nonrecurring intangible tax under section 199.133 is 2 mills per dollar. On a $500,000 closed-end bridge loan that is $1,750 plus $1,000, or $2,750, before lender fees. A line of credit is handled differently: intangible tax is paid on the maximum line at recording, while documentary stamp tax is paid on the initial debt and then on each advance. Your lender\'s closing disclosure shows the exact charges.',
    },
    {
      q: 'Does a bridge loan count against my debt-to-income ratio when I buy before selling?',
      a: 'Under the Fannie Mae Selling Guide, a bridge or swing loan used to buy a new principal residence before the current one is sold is a contingent liability that must be included in the debt-to-income ratio. Fannie Mae waives that requirement only when the lender has a fully executed sales contract for the current residence and confirmation that its financing contingencies have been cleared. Other loan programs and lenders apply their own rules, so the answer for a specific purchase should come from your lender.',
    },
    {
      q: 'Is an extended closing safer than a post-closing occupancy agreement for Florida sellers?',
      a: 'They protect different things. With an extended closing, the seller keeps ownership, insurance and risk until the later closing date, but the buyer must agree to wait and the longer contract period leaves more time for a financing or appraisal problem. With a post-closing occupancy, the sale closes on schedule and the seller stays under a separate written agreement, so occupancy terms, insurance and any escrowed funds must be settled before closing. Both should be drafted or reviewed by a Florida real estate attorney.',
    },
    {
      q: 'What is the cheapest way to buy and sell a house at the same time in Florida without moving twice?',
      a: 'Selling first usually adds the least cost, because it requires no new financing and so no interest or recording taxes on gap borrowing. The seller then negotiates an extended closing or a post-closing occupancy to stay in the home until the next purchase closes. Whether that is available depends on demand for the current home and the buyer\'s flexibility. Buying first with a bridge loan or a HELOC adds interest and Florida\'s taxes on the new mortgage, which on a $500,000 closed-end bridge loan total $2,750 before lender fees.',
    },
  ],
  'how-to-price-single-family-home-broward-county-2026': [
    {
      q: 'What is the median single-family home price in Broward County in late 2026?',
      a: 'The most recent figure is October 2026. MIAMI REALTORS® + RWorld reported a Broward County single-family median sale price of $610,000, compared with $611,250 in October 2025, a decrease of 0.20%. A county median blends very different neighborhoods and property sizes, so it shows the direction of the market rather than the value of any one home. A pricing analysis for a specific property should rely on recent closed sales in the same subdivision or immediate area.',
    },
    {
      q: 'How many months of single-family housing supply does Broward County have right now?',
      a: 'Broward County had 4.4 months of single-family supply in October 2026, which the association\'s report describes as a seller\'s market. The same report describes a balanced market as six to nine months of supply. Single-family active listings fell 16.72% from a year earlier, to 4,467 from 5,364. Supply varies by price band and neighborhood, so an owner should also count the listings that would compete directly with their home.',
    },
    {
      q: 'Are Broward County home sellers still getting near asking price at 7% mortgage rates?',
      a: 'Broward single-family sellers received a median 96% of their original list price in October 2026, and the median home went under contract in 41 days, down from 55 days a year earlier. Mortgage rates remain elevated: the Freddie Mac 30-year fixed average was 7.11% on November 12, 2026, against 6.24% a year earlier. Homes priced in line with recent comparable sales are the ones closing near list; overpriced homes tend to need reductions.',
    },
    {
      q: 'How should I set the list price for a Broward single-family home?',
      a: 'Start from recent closed sales in the same subdivision, weighting the newest most heavily, because the county median has been flat and the FHFA repeat-sales index for the Fort Lauderdale metropolitan division rose only 0.77% in the year to Q2 2026. Adjust for size, condition, roof age and insurance readiness, then check the active listings in your price band. Agree before launch on the showing and feedback level that would confirm the price. A licensed agent can prepare the comparable-sales analysis; tax questions belong with an accountant.',
    },
  ],
  'selling-florida-condo-special-assessment-2026': [
    {
      q: 'Who pays the special assessment when you sell a condo in Florida?',
      a: 'Florida law settles who the association can collect from, not how the seller and buyer split the cost. Under section 718.116 of the Florida Statutes, a new owner is jointly and severally liable with the previous owner for unpaid assessments that came due up to the transfer of title. How an approved assessment that is not yet due is divided is negotiated in the purchase contract: the seller may pay it at closing, the buyer may assume the remaining installments, or the parties may agree on a credit or a price adjustment. Have a Florida real estate attorney review that contract language.',
    },
    {
      q: 'Can I sell my Florida condo if there is a special assessment?',
      a: 'Yes. Nothing in the Florida condominium statute prevents an owner from selling a unit while a special assessment is pending or being paid in installments. The assessment will appear in the association\'s estoppel certificate, which must itemize special assessments owed and those scheduled to come due, and the association holds a lien on the unit to secure payment. The practical work is documenting the assessment early, deciding how it will be allocated, and pricing the unit against comparable sales in the same building.',
    },
    {
      q: 'What does a condo estoppel certificate show about special assessments?',
      a: 'Under section 718.116, the estoppel certificate must give an itemized list of all assessments, special assessments and other moneys owed on the date it is issued, and an itemized list of additional assessments and special assessments scheduled to become due during its effective period. The association must issue it within 10 business days after a written or electronic request. A certificate delivered by hand or electronically has a 30-day effective period, and one sent by regular mail has a 35-day effective period.',
    },
    {
      q: 'What documents must a Florida condo seller give the buyer?',
      a: 'Under section 718.503, as published in the 2025 Florida Statutes, a buyer from an owner who is not the developer is entitled, at the seller\'s expense, to current copies of the declaration, articles, bylaws and rules, the annual financial statement and budget, the milestone inspection summary where applicable, the latest structural integrity reserve study or a statement that none has been completed, the turnover inspection report where applicable, and the Frequently Asked Questions document, plus a governance form. If they are not delivered in time, the buyer may void the contract during a 7-day period, excluding weekends and legal holidays.',
    },
  ],
  'selling-house-vs-condo-south-florida-2026': [
    {
      q: 'Why are South Florida single-family homes holding value better than condos in late 2026?',
      a: 'Supply is the main reason. In October 2026, Miami-Dade single-family homes had 5.4 months of supply and Broward 4.4 months, which the association\'s reports describe as seller\'s markets, while condos had 12.7 months in Miami-Dade and 10.6 months in Broward, described as buyer\'s markets. The Miami-Dade single-family median rose 3.52% to $706,000, while the Broward condo median fell 7.22%. Higher association costs, reserve requirements and narrower conventional financing weigh on many condo buildings.',
    },
    {
      q: 'How do Florida milestone inspections and SIRS reserves affect selling a condo?',
      a: 'Florida requires a milestone structural inspection for condominium buildings three habitable stories or more by December 31 of the year the building reaches 30 years of age, and every 10 years after that, and a structural integrity reserve study at least every 10 years. Buildings that need critical repairs, failed a mandatory inspection or face certain litigation can be ineligible for Fannie Mae financing, which removes many financed buyers. Sellers in those buildings should expect more cash buyers and should prepare the association\'s documents before pricing.',
    },
    {
      q: 'What preparation helps South Florida single-family homeowners avoid price cuts?',
      a: 'Obtain a current four-point inspection and a wind-mitigation report before listing, so buyers can secure insurance quotes early, and set the asking price from recent comparable sales and current neighborhood absorption rather than from the highest past sale. With 30-year mortgage rates averaging 7.11% in mid-November 2026, financed buyers are price-sensitive, and listings priced above the evidence tend to sit.',
    },
    {
      q: 'Should I sell my South Florida home now?',
      a: 'It depends on the property type and your plans. Single-family owners are selling into short supply, so the main risk is overpricing. Condo owners in buildings with completed inspections and funded reserves can compete on documentation, while owners in buildings with work still ahead should understand those costs before pricing. Tax position, the next purchase and personal timing matter as much as the market; discuss those with a tax adviser and attorney, and use a pricing analysis built on your own street or building.',
    },
  ],
  'private-listing-vs-mls-south-florida-sellers-2026': [
    {
      q: 'What is a pocket listing or private listing in South Florida?',
      a: 'A pocket listing or private listing is a property marketed without full exposure on the MLS. In South Florida, the Miami MLS rules call the formal version an office exclusive: the owner, advised in writing of the benefits of the MLS, instructs the listing broker in writing not to distribute the listing publicly or to other MLS participants. The listing is still filed with the MLS, showings are permitted, and the seller signs an authorization form acknowledging the exposure being waived.',
    },
    {
      q: 'Should I sell my house off-market or list it on the MLS?',
      a: 'It depends on the objective. Limited exposure can fit an owner with a security, privacy or access concern, or a property that is not ready to show. When the objective is price, the Miami MLS seller form for office exclusive listings is direct: restricting marketing limits broad access to information and may affect the sale price, and it may reduce the number of potential buyers. Ask the listing agent which status is proposed and read the form first. This is general information, not legal or financial advice.',
    },
    {
      q: 'Does a private listing sell for more or less than an MLS listing?',
      a: 'Published studies disagree. A national brokerage\'s own study found privately pre-marketed homes sold for more, while a listing portal\'s study released in May 2026 and an MLS-sponsored analysis found off-MLS sales brought less. An academic study of Dallas–Fort Worth sales found a premium in older data that was no longer statistically significant after the Clear Cooperation Policy took effect. None of these measures a specific South Florida property, and none predicts the outcome of a sale. A pricing analysis of current comparables is the relevant evidence.',
    },
    {
      q: 'Can I keep my home off public websites and still have it in the MLS?',
      a: 'Under the Miami MLS, yes. The association\'s seller form describes an option labeled Active – Internet N, in which information about the property is not publicly displayed or distributed on the internet or third-party websites but is still shared with other MLS participants and subscribers, who can share it with their own customers. An owner may also ask in the listing agreement that the address be withheld from online publication to third parties. Confirm the current rule with the listing agent before signing.',
    },
    {
      q: 'Can I switch from an office exclusive to a full MLS listing later?',
      a: 'Yes. The Miami MLS seller authorization form for office exclusive listings states that the seller may, at any time, instruct the listing broker to enter the listing into the MLS. While a property is held as an office exclusive, days on market do not accrue under the MLS rules. Owners should agree in advance, in writing, on the point at which the property moves to full distribution if the private period does not produce an acceptable offer. Contract questions belong with a Florida real estate attorney.',
    },
  ],
  'florida-amendment-3-home-sellers-homestead-portability-2026': [
    {
      q: 'Does Amendment 3 change Save Our Homes or portability in Florida?',
      a: 'County property appraisers say it does not. The Volusia County and Leon County offices both state that Amendment 3 does not eliminate or replace Save Our Homes and does not change Florida\'s portability provisions. Annual increases in a homestead\'s assessment remain limited to the lower of 3% or the change in the Consumer Price Index, and portability still allows up to $500,000 of the Save Our Homes difference to move to a new homestead established inside the three-year window. Ask your county property appraiser how the rules apply to your parcel.',
    },
    {
      q: 'If I sell my Florida home and buy another, which homestead exemption applies under Amendment 3?',
      a: 'The amendment\'s smaller, newcomer tier is written for a person who had not maintained a permanent residence in Florida as of December 31, 2026. County appraisers say permanent Florida residents as of that date are eligible for the larger amounts, including residents who buy later and apply for homestead. The text has no sentence addressing an owner who sells one homestead and establishes another, and implementing legislation is still required. Confirm your situation with the property appraiser in the county of the next home before you close.',
    },
    {
      q: 'Will I need to wait five years for the larger homestead exemption?',
      a: 'The five-year rule is aimed at newcomers. Under the text, a person who had not maintained a permanent residence in Florida as of December 31, 2026 is exempt up to $50,000 for non-school levies and reaches the larger amount beginning with the fifth year of exemption. County appraisers describe this as four years of homestead exemption, with eligibility on January 1 of the fifth year. Owners who were permanent Florida residents by that date are described by the same offices as eligible for the larger amounts beginning in 2027.',
    },
    {
      q: 'Do I need to do anything to qualify for the Amendment 3 exemption in 2027?',
      a: 'It depends on your situation, and guidance is still developing. The Leon County Property Appraiser says additional guidance may be necessary to determine whether owners will need to provide documentation or take other steps for the increased exemption. A newly purchased home always needs its own homestead application; the Broward County Property Appraiser lists March 1, 2027 as the end of the timely filing period for a 2027 homestead exemption. Check your own county property appraiser\'s site for current instructions.',
    },
    {
      q: 'When does Amendment 3 show up on a Florida property tax bill?',
      a: 'Not on the 2026 bill. Amendment 3 takes effect on January 1, 2027. The Leon County Property Appraiser states that it does not affect 2026 property tax bills and that the changes will first be reflected on the August 2027 notices of proposed property taxes and the tax bills mailed in November 2027. The non-school homestead exemption is up to $150,000 of assessed value for 2027 and up to $250,000 beginning in 2028, while the school-levy exemption stays at up to $25,000.',
    },
  ],
  'florida-flood-disclosure-home-sellers-2026': [
    {
      q: 'Do you have to disclose flooding when selling a house in Florida?',
      a: 'Yes. Section 689.302 of the Florida Statutes requires a seller of residential real property to complete and provide a flood disclosure to the purchaser at or before the time the sales contract is executed. The statutory form asks whether the seller knows of flooding that damaged the property during the seller\'s ownership, whether the seller filed a flood insurance claim, and whether the seller received assistance for flood damage. Questions about how the law applies to a specific property belong with a Florida real estate attorney.',
    },
    {
      q: 'What does the Florida flood disclosure form ask a seller?',
      a: 'The form opens with a statement that homeowners\' insurance policies do not include coverage for damage resulting from floods. The seller then checks boxes stating whether they have knowledge of flooding that damaged the property during their ownership, whether they filed a flood damage claim with an insurance provider, including the National Flood Insurance Program, and whether they received assistance for flood damage, including from the Federal Emergency Management Agency. The form also defines flooding for the purpose of those answers.',
    },
    {
      q: 'When must a Florida seller give the buyer the flood disclosure?',
      a: 'The statute requires the disclosure at or before the time the sales contract is executed. In practice, sellers prepare it with the listing file so a buyer reads it before making an offer. A buyer who reads the answers early prices them into the offer, while information that surfaces after a contract is signed tends to reopen the negotiation. The exact sequence for a given sale is worth confirming with the closing attorney or title agent.',
    },
    {
      q: 'Does homeowners insurance cover flood damage in Florida?',
      a: 'The statutory flood disclosure form states that homeowners\' insurance policies do not include coverage for damage resulting from floods, and it encourages the buyer to discuss separate flood insurance with the buyer\'s own insurance agent. Whether a particular property has flood coverage, and what it costs, depends on the policy in force and the insurer. Sellers should keep the declarations page of any current flood policy in the listing file, because buyers and their insurers routinely ask for it.',
    },
  ],
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
      a: 'Listings are positioned through the Miami and South Florida REALTORS® — the world’s largest local REALTOR® association — with roughly 93,000 member agents, 200+ global portals in 19 languages, 437+ international cooperation agreements across 75+ countries, plus United Realty Group’s 3,500+ agents across 19 Florida office locations. Network reach does not guarantee a price or timeline.',
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
      a: 'A property listed through the Miami and South Florida REALTORS® enters the infrastructure of the world’s largest local REALTOR® association — roughly 93,000 member agents, 200+ global portals in 19 languages, 437+ international agreements, and syndication across 260+ U.S. MLSs — plus United Realty Group’s 3,500+ agents across 19 Florida office locations. This widens the pool of qualified buyer agents who can present the property.',
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
      a: 'With pricing discipline, strong presentation, and active distribution. With over a year of supply, homes priced to the current comparable set and exposed to the widest pool of qualified buyers and buyer agents tend to compete most effectively. No approach guarantees a price or timeline.',
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
      a: 'A CMA is a professional evaluation prepared by a licensed real estate professional using current MLS data — active, pending, sold, and expired comparables — adjusted for your property’s specific characteristics to produce a realistic price range and positioning strategy. It is not a public-records pull or a website estimate.',
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
      q: 'Is there a peak season to sell a home in South Florida?',
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
      a: 'Small, high-visibility fixes often matter more than large renovations. The right scope depends on your price point and submarket — a pre-listing walkthrough with a licensed real estate professional helps prioritize work that supports the sale rather than over-improving.',
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
  'international-buyers-south-florida-2026': [
    {
      q: 'Why do buyers from other states and abroad shop in South Florida?',
      a: 'South Florida draws relocating, second-home and international buyers for its location, connectivity, established communities, and the depth of the Miami and South Florida REALTORS® MLS, which distributes listings across a large network of agents and international portals.',
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
