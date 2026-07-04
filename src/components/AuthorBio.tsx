import { Link } from 'react-router-dom';
import { CONTACT } from '../constants';

/**
 * AuthorBio — E-E-A-T author card for Carlos Uzcategui.
 * Rendered on every journal post after the article body and FAQ.
 * No props required; all data sourced from CONTACT constants.
 */
export function AuthorBio() {
  return (
    <aside
      aria-label="About the author"
      className="border border-hairline bg-ivory p-7 md:p-9"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Headshot */}
        <div className="shrink-0">
          <img
            src={CONTACT.headshot}
            alt="Carlos Uzcategui, Florida Licensed Realtor SL705771"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover border border-bone"
            loading="lazy"
          />
        </div>

        {/* Text block */}
        <div className="min-w-0">
          {/* Label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
            About the Author
          </p>

          {/* Name */}
          <h3 className="font-serif text-xl text-navy-deep leading-snug">
            Carlos Uzcategui
          </h3>

          {/* Credential line */}
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-navy/70 leading-relaxed">
            Florida Licensed Realtor® since 2001 · SL705771 · CLHMS · Certified Seller Representative · United Realty Group
          </p>

          {/* E-E-A-T bio */}
          <p className="mt-4 font-sans text-sm leading-relaxed text-navy/70">
            Carlos Uzcategui has been active in South Florida residential real estate
            since 2001, accumulating transactional experience across Miami-Dade, Broward,
            and Palm Beach Counties on the Miami and South Florida REALTORS® MLS. His
            bilingual English and Spanish practice serves both domestic clients and
            internationally based owners — including those evaluating their position in
            the current market before deciding to list. As an associate of United Realty
            Group (full-service brokerage, founded 2002), Carlos coordinates directly
            with the buyer-agent community throughout South Florida.
          </p>

          {/* Internal links */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/about"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
            >
              More about Carlos →
            </Link>
            <Link
              to="/contact"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
            >
              Request a private seller strategy review →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
