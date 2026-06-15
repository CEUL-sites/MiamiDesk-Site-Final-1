import { useMemo, useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Download, Loader2 } from 'lucide-react';
import { AuroraBackground } from '../components/AuroraBackground';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { getAllPosts } from '../lib/markdown';
import { LEAD_MAGNETS } from '../constants';
import { trackFunnelEvent } from '../lib/analytics';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

// Low-commitment email capture for journal readers. Honest framing: this puts
// the reader on Carlos's market-update list and delivers the Net Sheet now —
// it does not promise automated per-post emails (the blog is a flat-file site
// with no newsletter automation behind it).
function JournalSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'lead-magnet-download',
          'bot-field': '',
          email,
          guide: 'journal-market-updates',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackFunnelEvent('journal_subscribe', { offer: 'market-updates' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-deep">
          <CheckCircle2 size={14} /> You're on the list
        </span>
        <a
          href={LEAD_MAGNETS.sellerNetSheet.url}
          download
          className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
        >
          <Download size={13} />
          Download the Seller's Net Sheet
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        required
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        autoComplete="email"
        inputMode="email"
        aria-label="Email address for market updates"
        className="w-full flex-1 border border-hairline bg-white px-4 py-3 font-sans text-base text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-gold/60"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex items-center justify-center gap-2 bg-navy px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:text-navy-deep disabled:opacity-60"
      >
        {status === 'submitting'
          ? <><Loader2 size={13} className="animate-spin" /> Sending…</>
          : 'Send Me Updates'}
      </button>
      {status === 'error' && (
        <p className="font-sans text-xs text-red-600/80 sm:w-full">Could not send — please try again.</p>
      )}
    </form>
  );
}

export default function JournalListPage() {
  const posts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  // Build the filter list from whatever categories actually exist, newest-usage
  // first preserved by post order, de-duplicated, with "All" leading.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const p of posts) {
      if (p.category && !seen.includes(p.category)) seen.push(p.category);
    }
    return ['All', ...seen];
  }, [posts]);

  const visiblePosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

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
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep pt-20 pb-14 text-center">
          <AuroraBackground />
          <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Market Commentary · United Realty Group
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Market Journal
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Market analysis and seller guides for South Florida real estate — absorption patterns,
            HOA financials, closing cost structure, international capital flows, and what
            current data means for sellers positioning in this market.
          </p>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
            Carlos Uzcategui · FL SL705771 · 25 Years South Florida Market Experience
          </p>
          </div>
        </section>

        {/* Post Grid */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          {/* Category filter — only shown when there's more than one category */}
          {posts.length > 0 && categories.length > 2 && (
            <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter posts by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
                    activeCategory === cat
                      ? 'bg-navy text-white'
                      : 'border border-navy/15 text-navy/55 hover:border-gold/50 hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          {posts.length === 0 ? (
            <div className="py-14 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coming Soon</p>
              <p className="mx-auto mt-4 max-w-md font-serif text-2xl text-navy">
                The first analysis is in preparation. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col border border-bone bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Card top accent */}
                  <div className="h-1 w-full gold-gradient" />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Category badge */}
                    <span className="inline-block self-start border border-gold/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="mt-4 font-serif text-xl leading-snug text-navy group-hover:text-navy-light transition-colors">
                      {post.title}
                    </h2>

                    {/* Date + read time */}
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/40">
                      {formatDate(post.date)}{post.readTime ? ` · ${post.readTime} min read` : ""}
                    </p>

                    {/* Excerpt */}
                    <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-navy/65">
                      {post.excerpt}
                    </p>

                    {/* CTA */}
                    <Link
                      to={`/journal/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-deep"
                    >
                      Read analysis
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Market-updates email capture — low-commitment lead step */}
        <section className="border-t border-hairline bg-ivory py-14">
          <div className="mx-auto max-w-2xl px-5 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep">
              South Florida Market Updates
            </p>
            <h2 className="mx-auto mt-4 max-w-xl font-serif text-2xl leading-snug text-navy">
              Get new market analysis — plus the Seller's Net Sheet today.
            </h2>
            <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-navy/55">
              Join Carlos's market list for periodic South Florida seller insights. No spam, no
              listing commitment — unsubscribe anytime.
            </p>
            <div className="mt-7">
              <JournalSignup />
            </div>
          </div>
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
