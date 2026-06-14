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
};
