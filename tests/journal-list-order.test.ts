import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { getJournalListPosts } from '../src/pages/journalListModel';

const slug = 'international-luxury-properties-miami-buyer-agents-global-desk';
const posts = [
  { slug: 'newest-seller-guide', date: '2026-10-16', category: 'Seller Strategy' },
  { slug: 'next-seller-guide', date: '2026-10-15', category: 'Seller Strategy' },
  { slug, date: '2026-09-07', category: 'International' },
  { slug: 'older-guide', date: '2026-09-01', category: 'International' },
];

test('the Global Desk article is first even when newer posts exist', () => {
  assert.deepEqual(getJournalListPosts(posts).map(post => post.slug), [
    slug, 'newest-seller-guide', 'next-seller-guide', 'older-guide',
  ]);
});

test('featuring does not mutate input, dates or the other articles', () => {
  const snapshot = structuredClone(posts);
  const ordered = getJournalListPosts(posts);
  assert.deepEqual(posts, snapshot);
  assert.equal(ordered.find(post => post.slug === slug)?.date, '2026-09-07');
  assert.deepEqual(ordered.filter(post => post.slug !== slug), posts.filter(post => post.slug !== slug));
  assert.equal(ordered.length, posts.length);
  assert.equal(new Set(ordered.map(post => post.slug)).size, posts.length);
});

test('missing featured article and empty lists preserve normal results', () => {
  const otherPosts = posts.filter(post => post.slug !== slug);
  assert.deepEqual(getJournalListPosts(otherPosts), otherPosts);
  assert.deepEqual(getJournalListPosts([]), []);
});

test('category filtering retains the featured article only in matching categories', () => {
  const ordered = getJournalListPosts(posts);
  assert.equal(ordered.filter(post => post.category === 'International')[0].slug, slug);
  assert.deepEqual(ordered.filter(post => post.category === 'Seller Strategy').map(post => post.slug), [
    'newest-seller-guide', 'next-seller-guide',
  ]);
});

test('the real journal index leads with Global Desk without losing other posts', () => {
  const index = JSON.parse(fs.readFileSync('src/data/journalIndex.json', 'utf8'));
  const ordered = getJournalListPosts<{ slug: string; date: string }>(index);
  assert.equal(ordered[0].slug, slug);
  assert.equal(ordered[0].date, '2026-09-07');
  assert.equal(ordered.length, index.length);
  assert.deepEqual(ordered.filter(post => post.slug !== slug), index.filter(post => post.slug !== slug));
});
