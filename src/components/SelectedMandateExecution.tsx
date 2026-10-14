const CAMPAIGNS = [
  {
    address: '815 NW 126th Ct, Miami',
    focus: 'Lakefront single-family positioning',
    strategy: 'Position the lakefront setting and outdoor living as the core property story, supported by a price review against competing single-family homes.',
    execution: 'Present the lake views and waterfront deck through the listing photography and property narrative; adjust the asking price as the campaign develops.',
    outcome: 'Closed April 3, 2026 at $670,000. The public MLS history records the completed sale and Carlos Uzcategui / United Realty Group as listing representation.',
    source: 'MLS A11917748 · Public listing and sale history',
    url: 'https://www.compass.com/homedetails/815-NW-126th-Ct-Miami-FL-33182/1CVT8F_pid/',
  },
  {
    address: '5542 NW 190th Ln, Miami Gardens',
    focus: 'Monterrey · Open house and pricing campaign',
    strategy: 'Position the home in gated Monterrey around its layout, presentation and price relative to competing Miami Gardens properties.',
    execution: 'Market the property at a campaign asking price of $624,900 and promote an open house scheduled for August 23, 2026, from 2–4 p.m.',
    outcome: 'Closed September 21, 2026 at $610,000, as recorded in the public MLS sale history. The $624,900 figure was the campaign asking price; no individual marketing action is presented as the cause of the sale.',
    source: 'MLS A12045304 · Public sale history',
    url: 'https://www.redfin.com/FL/Miami-Gardens/5542-NW-190th-Ln-33055/home/42984705',
  },
];

export function SelectedMandateExecution() {
  return <section aria-labelledby="mandate-execution-heading" className="bg-ivory px-6 py-12 md:py-20">
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-ink">South Florida · Campaign evidence</p>
      <h2 id="mandate-execution-heading" className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">Selected Mandate Execution</h2>
      <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-navy/75">The property story, the actions taken, and the result the record supports.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {CAMPAIGNS.map(campaign => <article key={campaign.address} className="rounded-xl border border-bone bg-white p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-ink">{campaign.focus}</p>
          <h3 className="mt-3 font-serif text-2xl text-navy-deep">{campaign.address}</h3>
          <dl className="mt-6 space-y-5 font-sans text-sm leading-relaxed text-navy/80">
            {(['Strategy', 'Execution', 'Verified Outcome'] as const).map((label, i) => <div key={label}>
              <dt className="font-semibold text-navy-deep">{label}</dt>
              <dd className="mt-1">{[campaign.strategy, campaign.execution, campaign.outcome][i]}</dd>
            </div>)}
          </dl>
          {campaign.address.startsWith('5542') && <a className="mt-4 block text-xs text-gold-ink underline" href="https://www.facebook.com/sfloridahome/posts/upcoming-open-house/1475726504573164/" target="_blank" rel="noopener noreferrer">Source: Published open-house and pricing campaign</a>}
          <a className="mt-6 inline-block text-xs text-gold-ink underline underline-offset-4" href={campaign.url} target="_blank" rel="noopener noreferrer">Source: {campaign.source}</a>
        </article>)}
      </div>
      <p className="mt-5 font-sans text-xs text-navy/70">Historical campaigns, reviewed October 14, 2026. Campaign asking prices are not sale prices. Individual results vary; no future sale outcome is guaranteed.</p>
      <a className="mt-6 inline-flex min-h-11 items-center rounded-md bg-navy-deep px-6 py-3 text-sm text-white" href="#list-here">Discuss the strategy for your property →</a>
    </div>
  </section>;
}
