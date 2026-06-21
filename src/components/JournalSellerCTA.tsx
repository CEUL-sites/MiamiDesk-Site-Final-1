import { Link } from 'react-router-dom';
import { CONTACT } from '../constants';
import { pushEvent } from '../lib/analytics';
import { getAttribution } from '../lib/attribution';
import type { PostMeta } from '../lib/markdown';

interface Props {
  post: PostMeta;
  variant: 'top' | 'mid' | 'bottom';
}

function track(ctaType: string, location: string, post: PostMeta) {
  if (navigator.webdriver) return;
  pushEvent('journal_cta_click', {
    cta_type: ctaType,
    cta_location: location,
    journal_slug: post.slug,
    category: post.category,
    market: post.market ?? 'South Florida',
    funnel_stage: post.funnel_stage ?? 'awareness',
    content_goal: post.content_goal ?? 'seller_lead',
    ...getAttribution(),
  });
}

export function JournalSellerCTA({ post, variant }: Props) {
  if (variant === 'top') {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-8 pb-2 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-bone bg-ivory px-6 py-3.5">
          <p className="font-sans text-sm text-navy/70">
            <span className="font-semibold text-navy">Thinking about selling?</span>{' '}
            Carlos reviews every submission personally.
          </p>
          <Link
            to="/sell-south-florida"
            onClick={() => track('seller_strategy_review', 'post_top', post)}
            className="shrink-0 inline-block border border-navy px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:text-gold"
          >
            Get started →
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'mid') {
    return (
      <section className="mx-auto max-w-3xl px-5 py-8 lg:px-8">
        <div className="border-l-4 border-gold/60 bg-ivory px-7 py-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">Private Seller Desk · South Florida</p>
          <h3 className="mt-3 font-serif text-xl text-navy leading-snug">
            Your property's position in the current market — analyzed by Carlos, not an algorithm.
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              onClick={() => track('seller_strategy_review', 'post_mid', post)}
              className="inline-block border border-navy bg-navy px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:border-gold"
            >
              Request a Strategy Review
            </Link>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_us', 'post_mid', post)}
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
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
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
          Private Seller Desk · United Realty Group
        </p>
        <h2 className="mt-4 font-serif text-2xl leading-snug text-navy">
          Request a strategy review for your South Florida property
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">
          A property-level analysis requires specific data. If you are evaluating your
          position in the current market, a private consultation with Carlos Uzcategui
          is the appropriate starting point — no obligation, no generic scripts.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            onClick={() => track('seller_strategy_review', 'post_bottom', post)}
            className="inline-block border border-navy bg-navy px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:border-gold"
          >
            Request a Seller Strategy Review
          </Link>
          <a
            href={CONTACT.whatsappUS}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('whatsapp_us', 'post_bottom', post)}
            className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
          >
            Or message on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
