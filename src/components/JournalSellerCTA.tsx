import { Link } from 'react-router-dom';
import { CONTACT } from '../constants';
import { pushEvent } from '../lib/analytics';
import { getAttribution } from '../lib/attribution';
import type { PostMeta } from '../lib/markdown';

interface Props {
  post: PostMeta;
  variant: 'top' | 'mid' | 'bottom';
}

interface JournalOffer {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaType: string;
  topic: string;
  whatsappMessage: string;
}

const DEFAULT_OFFER: JournalOffer = {
  eyebrow: 'Private Seller Desk · South Florida',
  heading: "Request a property-level seller strategy review",
  body: 'Carlos will review the property, its immediate competition, preparation priorities, and launch position before recommending a listing strategy.',
  ctaLabel: 'Request a Seller Strategy Review',
  ctaType: 'seller_strategy_review',
  topic: 'seller-strategy',
  whatsappMessage: 'Hello Carlos, I am considering selling a property in South Florida and would like a private seller strategy review.',
};

const OFFERS_BY_SLUG: Record<string, JournalOffer> = {
  'seller-positioning-south-florida-2026-august': {
    eyebrow: 'Private Position Analysis · South Florida',
    heading: 'Request a private property position analysis',
    body: 'Receive a property-level view of the likely buyer, competing inventory, preparation sequence, and defensible pricing range before you list.',
    ctaLabel: 'Request a Private Property Position Analysis',
    ctaType: 'property_position_analysis',
    topic: 'property-positioning',
    whatsappMessage: 'Hello Carlos, I read your South Florida positioning analysis and would like a private property position analysis before I list.',
  },
  'seller-closing-costs-south-florida-2026': {
    eyebrow: 'Seller Net Proceeds · South Florida',
    heading: 'Request a seller net proceeds review',
    body: 'Carlos will model property-specific sale-price scenarios, transaction costs, loan payoff, and estimated net proceeds for an informed listing decision.',
    ctaLabel: 'Request a Seller Net Proceeds Review',
    ctaType: 'seller_net_proceeds_review',
    topic: 'net-proceeds',
    whatsappMessage: 'Hello Carlos, I read your South Florida seller-cost guide and would like a property-specific net proceeds review.',
  },
  'hoa-impact-home-sale-south-florida-2026': {
    eyebrow: 'Pre-Listing HOA Review · South Florida',
    heading: 'Request a pre-listing HOA risk review',
    body: 'Carlos will identify the association documents, financing concerns, assessments, and buyer-diligence issues that may affect your property’s position.',
    ctaLabel: 'Request a Pre-Listing HOA Risk Review',
    ctaType: 'prelisting_hoa_risk_review',
    topic: 'hoa-risk',
    whatsappMessage: 'Hello Carlos, I read your HOA financials guide and would like a pre-listing HOA risk review for my property.',
  },
  'south-florida-may-2026-market-report-home-sellers': {
    eyebrow: 'Current-Market Review · South Florida',
    heading: 'Request a current-market property position review',
    body: 'Carlos will translate the regional data into the relevant submarket, competing inventory, buyer profile, and launch position for your property.',
    ctaLabel: 'Request a Current-Market Property Position Review',
    ctaType: 'current_market_position_review',
    topic: 'current-market-position',
    whatsappMessage: 'Hello Carlos, I read your South Florida market report and would like a current-market position review for my property.',
  },
};

function offerFor(post: PostMeta): JournalOffer {
  return OFFERS_BY_SLUG[post.slug] ?? DEFAULT_OFFER;
}

// Map a post's market to its dedicated city seller page when one exists, so a
// city-specific article passes topical relevance to the matching money page
// instead of only the generic hub. Markets without a page fall back to the hub.
const SELL_PAGE_BY_MARKET: Record<string, string> = {
  'Miami': '/sell-miami',
  'Brickell': '/sell-brickell',
  'Downtown Miami': '/sell-downtown-miami',
  'Coral Gables': '/sell-coral-gables',
  'Doral': '/sell-doral',
  'Kendall': '/sell-kendall',
  'Aventura': '/sell-aventura',
  'North Miami': '/sell-north-miami',
  'Hallandale Beach': '/sell-hallandale-beach',
  'Weston': '/sell-weston',
  'Fort Lauderdale': '/sell-fort-lauderdale',
  'Pompano Beach': '/sell-pompano-beach',
  'Coral Springs': '/sell-coral-springs',
  'Pembroke Pines': '/sell-pembroke-pines',
  'Plantation': '/sell-plantation',
  'Sunrise': '/sell-sunrise',
};

function sellPageFor(post: PostMeta): string {
  return (post.market && SELL_PAGE_BY_MARKET[post.market]) || '/sell-south-florida';
}

function track(ctaType: string, location: string, post: PostMeta, offer: JournalOffer) {
  if (navigator.webdriver) return;
  pushEvent('journal_cta_click', {
    cta_type: ctaType,
    cta_location: location,
    journal_slug: post.slug,
    category: post.category,
    market: post.market ?? 'South Florida',
    funnel_stage: post.funnel_stage ?? 'awareness',
    content_goal: post.content_goal ?? 'seller_lead',
    offer_topic: offer.topic,
    offer_name: offer.ctaLabel,
    ...getAttribution(),
  });
}

function offerHref(post: PostMeta, variant: Props['variant'], offer: JournalOffer): string {
  const params = new URLSearchParams({
    utm_source: 'journal',
    utm_medium: 'internal',
    utm_campaign: post.slug,
    utm_content: variant,
    journal_origin: post.slug,
    journal_offer: offer.topic,
    journal_cta: variant,
  });
  return `${sellPageFor(post)}?${params.toString()}#contact`;
}

function whatsappHref(offer: JournalOffer): string {
  return `${CONTACT.whatsappUS.split('?')[0]}?text=${encodeURIComponent(offer.whatsappMessage)}`;
}

export function JournalSellerCTA({ post, variant }: Props) {
  // Every variant routes to the same market-matched page. Previously only the
  // 'top' variant did, and the two more prominent variants below sent every
  // reader to /contact — so a reader who finished an article about selling in
  // Brickell and clicked "Request a Seller Strategy Review" landed on a generic
  // contact form instead of /sell-brickell. That broke the promise the button
  // makes, dropped them onto LeadForm instead of the two-step address-first
  // SellerIntakeForm the city pages use, and withheld from the money pages the
  // topical relevance this map was written to pass them.
  const offer = offerFor(post);
  const sellHref = offerHref(post, variant, offer);
  const whatsapp = whatsappHref(offer);

  if (variant === 'top') {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-8 pb-2 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-bone bg-ivory px-6 py-3.5">
          <p className="font-sans text-sm text-navy/70">
            <span className="font-semibold text-navy">
              {post.market && SELL_PAGE_BY_MARKET[post.market]
                ? `Thinking about selling in ${post.market}?`
                : offer.heading}
            </span>{' '}
            Carlos reviews every request personally.
          </p>
          <Link
            to={sellHref}
            onClick={() => track(offer.ctaType, 'post_top', post, offer)}
            className="shrink-0 inline-block border border-navy px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:text-gold"
          >
            {offer.ctaLabel} →
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'mid') {
    return (
      <section className="mx-auto max-w-3xl px-5 py-8 lg:px-8">
        <div className="border-l-4 border-gold/60 bg-ivory px-7 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{offer.eyebrow}</p>
          <h3 className="mt-3 font-serif text-xl text-navy leading-snug">
            {offer.heading}
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">{offer.body}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              to={sellHref}
              onClick={() => track(offer.ctaType, 'post_mid', post, offer)}
              className="inline-block border border-navy bg-navy px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:border-gold"
            >
              {offer.ctaLabel}
            </Link>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_us', 'post_mid', post, offer)}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
            >
              Or WhatsApp →
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
      <div className="border border-bone bg-ivory p-8 md:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          {offer.eyebrow} · United Realty Group
        </p>
        <h2 className="mt-4 font-serif text-2xl leading-snug text-navy">
          {offer.heading}
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">
          {offer.body} No listing commitment is required.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to={sellHref}
            onClick={() => track(offer.ctaType, 'post_bottom', post, offer)}
            className="inline-block border border-navy bg-navy px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:border-gold"
          >
            {offer.ctaLabel}
          </Link>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_us', 'post_bottom', post, offer)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
          >
            Or message on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
