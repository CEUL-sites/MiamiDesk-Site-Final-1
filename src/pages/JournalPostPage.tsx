import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { getPostBySlug, getAllPosts } from '../lib/markdown';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function JournalPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = post
    ? getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 3)
    : [];

  if (!post) {
    return <Navigate to="/journal" replace />;
  }

  const ogImage = post.image
    ? `https://homesprofessional.com${post.image}`
    : 'https://homesprofessional.com/images/carlos-headshot.png';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: ogImage,
    author: {
      '@type': 'Person',
      '@id': 'https://homesprofessional.com/#agent',
      name: 'Carlos Uzcategui',
      url: 'https://homesprofessional.com/about',
      jobTitle: 'Florida Licensed Realtor®',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://homesprofessional.com/#organization',
      name: 'United Realty Group',
      url: 'https://homesprofessional.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://homesprofessional.com/images/urg-logo-original.png',
      },
    },
    url: `https://homesprofessional.com/journal/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://homesprofessional.com/journal/${post.slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://homesprofessional.com/journal',
      name: 'South Florida Real Estate Journal',
    },
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Carlos Uzcategui · South Florida Real Estate</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://homesprofessional.com/journal/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://homesprofessional.com/journal/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Carlos Uzcategui`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Article header — dark navy band */}
        <header className="bg-navy-deep px-5 pt-32 pb-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                <li>
                  <Link to="/journal" className="hover:text-gold transition-colors">
                    Journal
                  </Link>
                </li>
                <li aria-hidden="true">·</li>
                <li className="text-gold truncate max-w-[240px]">{post.category}</li>
              </ol>
            </nav>

            {/* Category badge */}
            <span className="inline-block border border-gold/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-gold">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="mt-5 font-serif text-3xl leading-snug text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Date + byline + read time */}
            <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">·</span>
              <span>Carlos Uzcategui · FL SL705771</span>
              <span aria-hidden="true">·</span>
              <span>United Realty Group</span>
              {post.readTime > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>

            {/* Excerpt */}
            <p className="mt-7 font-serif text-lg italic leading-relaxed text-white/60 border-l-2 border-gold/40 pl-5">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Article body */}
        <article className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
          <div
            className="prose-journal"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <hr className="border-bone" />
        </div>

        {/* Post-body CTA */}
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
            <Link
              to="/contact"
              className="mt-7 inline-block border border-navy px-7 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Request a private consultation
            </Link>
          </div>
        </section>

        {/* More from the journal */}
        {relatedPosts.length > 0 && (
          <section className="bg-ivory py-12 md:py-16">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">More from the Journal</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/journal/${rp.slug}`}
                    className="block border border-hairline bg-white p-5 hover:border-gold/40 transition-colors"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-2">{rp.category}</p>
                    <h3 className="font-serif text-base text-navy-deep leading-snug">{rp.title}</h3>
                    <p className="mt-2 font-sans text-xs text-ink-primary/50">Read →</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mx-auto max-w-3xl px-5 pb-10 lg:px-8">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/45 transition-colors hover:text-gold"
          >
            <span aria-hidden="true">←</span> Back to Journal
          </Link>
        </div>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
