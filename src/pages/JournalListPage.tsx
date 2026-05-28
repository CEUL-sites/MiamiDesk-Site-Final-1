import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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

  return (
    <>
      <Helmet>
        <title>Market Journal | South Florida Real Estate | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy by Carlos Uzcategui, United Realty Group."
        />
        <link rel="canonical" href="https://homesprofessional.com/journal" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/journal" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/journal" />
        <meta property="og:title" content="Market Journal | South Florida Real Estate | Carlos Uzcategui" />
        <meta property="og:description" content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy by Carlos Uzcategui, United Realty Group." />
        <meta property="og:url" content="https://homesprofessional.com/journal" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="HomesProfessional.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Market Journal | South Florida Real Estate | Carlos Uzcategui" />
        <meta name="twitter:description" content="Quarterly market analysis and seller insights for South Florida real estate. Absorption rates, international capital flows, and positioning strategy by Carlos Uzcategui, United Realty Group." />
        <meta name="twitter:image" content="https://homesprofessional.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep pt-20 pb-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Market Commentary · United Realty Group
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Market Journal
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Quarterly analysis of South Florida real estate conditions — absorption patterns,
            international capital flows, and what current data means for sellers positioning
            in this market.
          </p>
          <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
            Carlos Uzcategui · FL SL705771 · 25 Years South Florida Market Experience
          </p>
        </section>

        {/* Post Grid */}
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          {posts.length === 0 ? (
            <div className="py-14 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coming Soon</p>
              <p className="mx-auto mt-4 max-w-md font-serif text-2xl text-navy">
                The first analysis is in preparation. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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

                    {/* Date */}
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/40">
                      {formatDate(post.date)}
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
              Start the conversation
            </Link>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
