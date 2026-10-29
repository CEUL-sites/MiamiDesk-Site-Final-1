export const FEATURED_JOURNAL_SLUG = 'international-luxury-properties-miami-buyer-agents-global-desk';

/** Journal-only presentation order; publication dates and source order stay intact. */
export function getJournalListPosts<T extends { slug: string }>(posts: readonly T[]): T[] {
  return [
    ...posts.filter(post => post.slug === FEATURED_JOURNAL_SLUG),
    ...posts.filter(post => post.slug !== FEATURED_JOURNAL_SLUG),
  ];
}
