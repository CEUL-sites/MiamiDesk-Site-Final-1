import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { JournalSellerCTA } from '../components/JournalSellerCTA';
import { AuthorBio } from '../components/AuthorBio';
import { getPostBySlug, getAllPosts } from '../lib/markdown';
import { JOURNAL_FAQS } from '../content/journal-faqs';
import { pushEvent } from '../lib/analytics';
import { getAttribution } from '../lib/attribution';
import { CONTACT } from '../constants';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function JournalPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // journal_view — fires once per slug, suppressed during react-snap prerender
  useEffect(() => {
    if (!post || navigator.webdriver) return;
    pushEvent("journal_view", {
      journal_slug: post.slug,
      page_title: post.title,
      category: post.category,
      market: post.market ?? "South Florida",
      funnel_stage: post.funnel_stage ?? "awareness",
      created_by: post.created_by ?? "unknown",
      content_goal: post.content_goal ?? "seller_lead",
      ...getAttribution(),
    });
  }, [post?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Same-category posts first (already newest-first), padded with recent ones.
  const relatedPosts = post
    ? (() => {
        const others = getAllPosts().filter((p) => p.slug !== post.slug);
        const sameCategory = others.filter((p) => p.category === post.category);
        const rest = others.filter((p) => p.category !== post.category);
        return [...sameCategory, ...rest].slice(0, 3);
      })()
    : [];

  if (!post) {
    return <Navigate to="/journal" replace />;
  }

  const ogImage = post.image
    ? `https://homesprofessional.com${post.image}`
    : 'https://homesprofessional.com/images/og-default.png';
  const ogImageType = ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const dateModified = post.updated || post.date;
  const faqs = JOURNAL_FAQS[post.slug] ?? [];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified,
    image: ogImage,
    author: {
      '@type': ['Person', 'RealEstateAgent'],
      '@id': 'https://homesprofessional.com/#agent',
      name: 'Carlos Uzcategui',
      url: 'https://homesprofessional.com/about',
      jobTitle: 'Florida Licensed Realtor®',
      knowsLanguage: ['en', 'es'],
      knowsAbout: [
        'South Florida real estate',
        'Miami MLS',
        'seller representation',
        'international buyers',
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Florida Real Estate License',
          identifier: 'SL705771',
          credentialCategory: 'license',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Florida Department of Business and Professional Regulation',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certified Luxury Home Marketing Specialist (CLHMS)',
          credentialCategory: 'designation',
        },
      ],
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://homesprofessional.com/#organization',
        name: 'United Realty Group',
      },
      sameAs: [
        'https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51',
        CONTACT.linkedin,
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://homesprofessional.com/#organization',
      name: 'United Realty Group',
      url: 'https://homesprofessional.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://homesprofessional.com/images/urg-logo-original.webp',
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

  const faqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

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
        name: 'Journal',
        item: 'https://homesprofessional.com/journal',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://homesprofessional.com/journal/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        {/* react-helmet-async needs a single string child in <title>;
            mixed JSX children render an empty tag. */}
        <title>{`${post.title} | Carlos Uzcategui · South Florida Real Estate`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://homesprofessional.com/journal/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://homesprofessional.com/journal/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={post.title} />
        <meta property="og:image:type" content={ogImageType} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="article:author" content="Carlos Uzcategui" />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Carlos Uzcategui`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={post.title} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
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
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
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
            <p className="mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-white/65 border-l-2 border-gold/40 pl-6">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Top CTA — compact strip visible before reading */}
        <JournalSellerCTA variant="top" post={post} />

        {/* Article body */}
        <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
          <div
            className="prose-journal"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>

        {/* Mid CTA — catches readers who finished the article */}
        <JournalSellerCTA variant="mid" post={post} />

        {/* Frequently asked questions — eligible for FAQ rich results */}
        {faqs.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 pb-6 lg:px-8">
            <h2 className="font-serif text-2xl text-navy mt-2 mb-7 border-b border-bone pb-3">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-bone border-t border-bone">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-5 font-serif text-lg leading-snug text-navy marker:content-['']">
                    <span>{faq.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 font-mono text-gold transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-navy/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <hr className="border-bone" />
        </div>

        {/* Author bio — E-E-A-T signal, rendered after article body and FAQ */}
        <div className="mx-auto max-w-3xl px-5 py-10 lg:px-8">
          <AuthorBio />
        </div>

        {/* Internal links — money pages */}
        <section className="mx-auto max-w-3xl px-5 pb-10 lg:px-8">
          <div className="border border-bone bg-ivory p-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-5">
              Continue Your Research
            </p>
            <ul className="divide-y divide-bone">
              <li className="py-3">
                <Link
                  to="/home-value"
                  className="group flex items-start justify-between gap-4"
                >
                  <span className="font-serif text-[15px] leading-snug text-navy group-hover:text-gold transition-colors">
                    Get a no-cost home valuation for your South Florida property
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/60 group-hover:text-gold transition-colors mt-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li className="py-3">
                <Link
                  to="/sell-south-florida"
                  className="group flex items-start justify-between gap-4"
                >
                  <span className="font-serif text-[15px] leading-snug text-navy group-hover:text-gold transition-colors">
                    How professional MLS positioning works for sellers
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/60 group-hover:text-gold transition-colors mt-0.5">
                    →
                  </span>
                </Link>
              </li>
              <li className="py-3">
                <Link
                  to="/global-desk"
                  className="group flex items-start justify-between gap-4"
                >
                  <span className="font-serif text-[15px] leading-snug text-navy group-hover:text-gold transition-colors">
                    International owners: list South Florida property through a licensed U.S. principal
                  </span>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/60 group-hover:text-gold transition-colors mt-0.5">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <JournalSellerCTA variant="bottom" post={post} />

        {/* More from the journal */}
        {relatedPosts.length > 0 && (
          <section className="bg-ivory py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-5 lg:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-8">More from the Journal</p>
              <div className="grid gap-5 sm:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/journal/${rp.slug}`}
                    className="flex flex-col border border-hairline bg-white p-6 hover:border-gold/40 hover:shadow-sm transition-all"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">{rp.category}</p>
                    <h3 className="font-serif text-base text-navy-deep leading-snug">{rp.title}</h3>
                    <p className="mt-4 font-sans text-xs uppercase tracking-[0.14em] text-gold/70">Read →</p>
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
