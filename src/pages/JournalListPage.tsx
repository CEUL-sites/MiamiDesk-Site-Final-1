import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { JsonLd } from '../components/SEO/JsonLd';
import { Link } from 'react-router-dom';
import { Search, X, BookOpen, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { getAllPosts, type PostMeta } from '../lib/markdown';
import { FEATURED_JOURNAL_SLUG, getJournalListPosts } from './journalListModel';

const INITIAL_VISIBLE_COUNT = 12;

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getSeriesKey(slug: string): string | null {
  if (slug.startsWith('post-occupancy-')) return 'post-occupancy';
  if (slug.startsWith('downsizing-sequence-')) return 'downsizing-sequence';
  if (slug.startsWith('net-proceeds-')) return 'net-proceeds';
  if (slug.startsWith('international-owner-')) return 'international-owner';
  if (slug.startsWith('buyer-discipline-')) return 'buyer-discipline';
  if (slug.startsWith('seller-positioning-')) return 'seller-positioning';
  return null;
}

/**
 * Diversifies the default feed so the initial 12 cards showcase distinct
 * strategic topics rather than 10 consecutive city variants of the same series,
 * while preserving every post in the full list.
 */
function diversifyPostsForFeed(posts: PostMeta[]): PostMeta[] {
  const seenSeries = new Set<string>();
  const primary: PostMeta[] = [];
  const secondary: PostMeta[] = [];

  for (const post of posts) {
    const series = getSeriesKey(post.slug);
    if (!series) {
      primary.push(post);
    } else if (!seenSeries.has(series)) {
      seenSeries.add(series);
      primary.push(post);
    } else {
      secondary.push(post);
    }
  }

  return [...primary, ...secondary];
}

export default function JournalListPage() {
  const posts = useMemo(() => getJournalListPosts(getAllPosts()), []);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  const categories = useMemo(() => {
    const set = new Set<string>();
    getAllPosts().forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, []);

  const featuredPost = useMemo(
    () => posts.find((p) => p.slug === FEATURED_JOURNAL_SLUG) ?? posts[0],
    [posts],
  );

  const isDefaultUnfilteredView = activeCategory === 'All' && !searchQuery.trim();

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const matching = posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (activeCategory === 'All' && !q) {
      const withoutFeatured = matching.filter((p) => p.slug !== featuredPost?.slug);
      return diversifyPostsForFeed(withoutFeatured);
    }

    return matching;
  }, [posts, activeCategory, searchQuery, featuredPost]);

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount],
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://homesprofessional.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Market Journal',
        item: 'https://homesprofessional.com/journal',
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Market Journal — Carlos Uzcategui',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: post.title,
      url: `https://homesprofessional.com/journal/${post.slug}`,
    })),
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://homesprofessional.com/journal',
    name: 'South Florida Real Estate Market Journal',
    description:
      'Market analysis and seller insights for South Florida real estate by Carlos Uzcategui, FL SL705771.',
    url: 'https://homesprofessional.com/journal',
    author: { '@type': 'Person', '@id': 'https://homesprofessional.com/#agent' },
    publisher: { '@type': 'Organization', '@id': 'https://homesprofessional.com/#organization' },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `https://homesprofessional.com/journal/${post.slug}`,
      ...(post.image && { image: `https://homesprofessional.com${post.image}` }),
    })),
  };

  return (
    <>
      <Helmet>
        <title>Market Journal | South Florida Real Estate | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Market analysis and seller guides for South Florida real estate — HOA financials, closing costs, timing strategy, international capital flows. Carlos Uzcategui, FL SL705771."
        />
        <link rel="canonical" href="https://homesprofessional.com/journal" />
        <meta property="og:title" content="Market Journal | South Florida Real Estate | Carlos Uzcategui" />
        <meta
          property="og:description"
          content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy."
        />
        <meta property="og:url" content="https://homesprofessional.com/journal" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Market Journal | South Florida Real Estate | Carlos Uzcategui" />
        <meta
          name="twitter:description"
          content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="journal-list-breadcrumb" data={breadcrumbSchema} />
      <JsonLd id="journal-list-itemlist" data={itemListSchema} />
      <JsonLd id="journal-list-blog" data={blogSchema} />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* ── SECTION 1: Editorial Hero ─────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep pt-24 pb-16 text-center">
          <AuroraBackground />
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Market Commentary · United Realty Group
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-6xl tracking-tight">
              South Florida Market Journal
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/75">
              Property-level intelligence on pricing, net proceeds, timing, market risk, and cross-border demand —
              written from 25 years of transaction experience, not recycled headlines.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                Carlos Uzcategui, REALTOR® · FL SL705771 · Since 2001 · {posts.length} Published Analyses
              </span>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Three Foundational Seller Guides ───────────── */}
        <section className="border-b border-hairline bg-ivory py-10" aria-labelledby="owner-guides-title">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink font-semibold">
                  Foundational Seller Briefings
                </p>
                <h2 id="owner-guides-title" className="mt-2 font-serif text-3xl text-navy-deep">
                  Three decisions to make before you list.
                </h2>
              </div>
              <a
                href="/sell#contact"
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline underline-offset-4 hover:text-gold-ink"
              >
                Request Your Private Seller Strategy Review →
              </a>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: '01 · Market Activation',
                  title: 'Position the property',
                  slug: 'listing-online-vs-activating-the-market-south-florida-2026',
                  detail: 'Understand professional MLS visibility and cooperating buyer-agent discovery across 93,000 members.',
                },
                {
                  step: '02 · Net Sheet Clarity',
                  title: 'Estimate what you keep',
                  slug: 'seller-closing-costs-south-florida-2026',
                  detail: 'Review documentary stamp taxes, title charges, municipal liens, and payoff factors before pricing.',
                },
                {
                  step: '03 · Transition Timing',
                  title: 'Plan the next move',
                  slug: 'relocating-out-of-south-florida-sequence-the-sale-2026',
                  detail: 'Coordinate sale contingencies, post-occupancy terms, and relocation timelines without double moves.',
                },
              ].map((guide) => (
                <article key={guide.slug} className="rounded-lg border border-hairline bg-white p-6 shadow-2xs">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink font-semibold">
                    {guide.step}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep">{guide.title}</h3>
                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-navy/75">{guide.detail}</p>
                  <Link
                    to={`/journal/${guide.slug}`}
                    className="mt-4 inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold-ink hover:text-gold"
                  >
                    Read the guide <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Search, Filter & Paginated Intelligence Feed ─ */}
        <section className="border-b border-hairline bg-white py-6 shadow-xs sticky top-16 z-30 backdrop-blur-md bg-white/95">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/70" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by city or topic (e.g. Weston, Brickell, Net Proceeds, Post-Occupancy, Spain)..."
                aria-label="Search market journal articles"
                className="w-full rounded-full border border-bone bg-ivory/60 pl-11 pr-10 py-3 font-sans text-sm text-navy placeholder:text-navy/65 outline-none transition-all focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/70 hover:text-navy"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-200 ${
                      active
                        ? 'bg-gold text-navy-deep font-bold shadow-sm'
                        : 'border border-bone bg-ivory/50 text-navy/70 hover:border-gold/60 hover:text-navy'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          {/* Featured Flagship Briefing Banner (shown on default All view) */}
          {isDefaultUnfilteredView && featuredPost && (
            <article className="mb-10 overflow-hidden rounded-xl border border-gold/40 bg-navy-deep text-white shadow-md">
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-navy-deep">
                      Featured Briefing
                    </span>
                    <span className="rounded border border-gold/35 bg-white/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                      {featuredPost.category || 'International'}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                      {formatDate(featuredPost.date)}
                      {featuredPost.readTime ? ` · ${featuredPost.readTime} min read` : ''}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-snug text-white sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/75 sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Miami Global Desk · Bilateral Mandate Structure
                  </p>
                  <p className="font-sans text-xs leading-relaxed text-white/65">
                    How foreign property owners, developers, and local listing agencies connect selected international
                    inventory with Greater Miami’s 93,000-member REALTOR® ecosystem while retaining the local mandate.
                  </p>
                  <Link
                    to={`/journal/${featuredPost.slug}`}
                    className="inline-flex min-h-11 items-center gap-2 bg-gold px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-white"
                  >
                    Read Featured Briefing
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Filter status bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy/65">
              {isDefaultUnfilteredView
                ? `Showing ${visiblePosts.length} curated analyses (+1 featured briefing) of ${posts.length} published`
                : `Showing ${visiblePosts.length} of ${filteredPosts.length} matching analyses`}
            </p>
            {(activeCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold-ink underline hover:text-gold"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-bone bg-white py-16 text-center shadow-xs">
              <BookOpen size={32} className="mx-auto text-gold/60 mb-3" />
              <p className="font-serif text-2xl text-navy">No matching analyses found</p>
              <p className="mx-auto mt-2 max-w-md font-sans text-sm text-navy/60">
                Try searching for another neighborhood or resetting the category filter.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-navy px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white hover:bg-gold hover:text-navy transition-colors"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col rounded-xl border border-bone/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_28px_rgba(6,17,31,0.08)] overflow-hidden"
                  >
                    <div className="h-1 w-full gold-gradient" />

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        {post.slug === FEATURED_JOURNAL_SLUG && (
                          <span className="rounded-md bg-navy px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                            Featured
                          </span>
                        )}
                        <span className="inline-block self-start rounded-md border border-gold/30 bg-gold/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold">
                          {post.category || 'Market Insight'}
                        </span>
                      </div>

                      <h2 className="mt-3.5 font-serif text-xl leading-snug text-navy-deep group-hover:text-gold-deep transition-colors">
                        {post.title}
                      </h2>

                      <div className="mt-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/55">
                        <span>{formatDate(post.date)}</span>
                        {post.readTime && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} className="text-gold" />
                              {post.readTime} min read
                            </span>
                          </>
                        )}
                      </div>

                      <p className="mt-3.5 flex-1 font-sans text-sm leading-relaxed text-navy/70 line-clamp-4">
                        {post.excerpt}
                      </p>

                      <Link
                        to={`/journal/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold-ink transition-colors group-hover:text-gold"
                      >
                        Read Full Analysis
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Progressive Pagination Controls */}
              {visibleCount < filteredPosts.length && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT)}
                    className="inline-flex min-h-12 items-center gap-2 bg-navy-deep px-7 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
                  >
                    Load 12 More Analyses ({filteredPosts.length - visibleCount} remaining)
                    <ChevronDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredPosts.length)}
                    className="inline-flex min-h-12 items-center gap-2 border border-navy/25 bg-white px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-navy-deep transition-colors hover:border-gold hover:text-gold-ink"
                  >
                    View All ({filteredPosts.length})
                  </button>
                </div>
              )}
            </>
          )}

          {/* Collapsible Complete SEO Archive Directory (keeps all 123 internal links in static DOM) */}
          <details className="group mt-12 rounded-xl border border-bone bg-white p-6 shadow-2xs">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-navy-deep marker:hidden">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink block">
                  Complete Publication Index
                </span>
                <span className="mt-1 block font-serif text-xl text-navy-deep">
                  Browse All {posts.length} Published Market Analyses &amp; City Guides
                </span>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone text-navy transition-transform group-open:rotate-180">
                <ChevronDown size={16} />
              </span>
            </summary>
            <div className="mt-6 border-t border-bone pt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/journal/${post.slug}`}
                  className="font-sans text-xs leading-snug text-navy/75 hover:text-gold-ink hover:underline py-1"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </details>
        </section>

        {/* ── SECTION 4: Bottom Consultation CTA Band ───────────────── */}
        <section className="bg-navy-deep py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              South Florida · Private Seller Desk
            </p>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
              Request a confidential strategy review for your South Florida property.
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/70">
              Pricing calibration, net proceeds modeling, and MLS positioning reviewed directly with Carlos Uzcategui.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/sell#contact"
                className="inline-flex min-h-12 items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-white"
              >
                Request a Strategy Review
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/home-value"
                className="inline-flex min-h-12 items-center border border-gold/60 px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Home Valuation
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
