import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { JsonLd } from '../components/SEO/JsonLd';
import { Link } from 'react-router-dom';
import { Search, X, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { getAllPosts } from '../lib/markdown';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function JournalListPage() {
  const posts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => { if (p.category) set.add(p.category); });
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return posts.filter(post => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

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
    description: 'Market analysis and seller insights for South Florida real estate by Carlos Uzcategui, FL SL705771.',
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
        <meta property="og:description" content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy." />
        <meta property="og:url" content="https://homesprofessional.com/journal" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Market Journal | South Florida Real Estate | Carlos Uzcategui" />
        <meta name="twitter:description" content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="journal-list-itemlist" data={itemListSchema} />
      <JsonLd id="journal-list-blog" data={blogSchema} />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep pt-24 pb-16 text-center">
          <AuroraBackground />
          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Market Commentary · United Realty Group
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-6xl tracking-tight">
              South Florida Market Journal
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70">
              Data-backed market analysis, seller strategy playbooks, HOA financial assessments, and international buyer flows — curated by Carlos Uzcategui.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                Carlos Uzcategui · FL REALTOR® Since 2001 · {posts.length} Published Analyses
              </span>
            </div>
          </div>
        </section>

        {/* Search & Category Filter Section */}
        <section className="border-b border-hairline bg-white py-8 shadow-xs sticky top-16 z-30 backdrop-blur-md bg-white/95">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-5">
            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. Brickell, Net Sheet, Coral Gables, Downsizing)..."
                className="w-full rounded-full border border-bone bg-ivory/60 pl-11 pr-10 py-3 font-sans text-sm text-navy placeholder:text-navy/40 outline-none transition-all focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 ${
                      active
                        ? "bg-gold text-navy-deep font-bold shadow-sm"
                        : "border border-bone bg-ivory/50 text-navy/70 hover:border-gold/60 hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Post Grid */}
        <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy/60">
              Showing {filteredPosts.length} of {posts.length} articles
            </p>
            {(activeCategory !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold hover:underline"
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
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-5 rounded-full bg-navy px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white hover:bg-gold hover:text-navy transition-colors"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col rounded-xl border border-bone/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_28px_rgba(6,17,31,0.08)] overflow-hidden"
                >
                  {/* Card top gold accent line */}
                  <div className="h-1 w-full gold-gradient" />

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Category badge */}
                    <span className="inline-block self-start rounded-md border border-gold/30 bg-gold/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold">
                      {post.category || "Market Insight"}
                    </span>

                    {/* Title */}
                    <h2 className="mt-3.5 font-serif text-xl leading-snug text-navy-deep group-hover:text-gold-deep transition-colors">
                      {post.title}
                    </h2>

                    {/* Date + read time */}
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

                    {/* Excerpt */}
                    <p className="mt-3.5 flex-1 font-sans text-sm leading-relaxed text-navy/70 line-clamp-4">
                      {post.excerpt}
                    </p>

                    {/* CTA */}
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
          )}
        </section>

        {/* Bottom CTA band */}
        <section className="bg-navy-deep py-14">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              South Florida · Private Seller Desk
            </p>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug text-white">
              Request a confidential strategy review for your South Florida property
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-block border border-gold px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy"
            >
              Request a Strategy Review
            </Link>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
