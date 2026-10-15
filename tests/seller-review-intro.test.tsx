import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Proof } from '../src/components/Proof';

test('the seller introduction starts with the post-occupancy client experience', () => {
  const html = renderToStaticMarkup(<Proof />);
  assert.match(html, /Sell your home\./);
  assert.match(html, /Plan what comes next\./);
  const firstReview = html.match(/<article[^>]*aria-live="polite"[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(firstReview, /Diego Tolotto/);
  assert.match(firstReview, /7-month post-occupancy/);
  assert(!html.includes('5.0 Average'));
  assert.match(html, /href="#list-here"/);
  assert.match(html, /Pause rotating reviews/);
});

test('the Spanish seller introduction localizes controls and preserves the original review', () => {
  const html = renderToStaticMarkup(<Proof lang="es" />);
  assert.match(html, /Venda su casa\./);
  assert.match(html, /Planifique su próxima etapa\./);
  assert.match(html, /Pausar reseñas/);
  assert.match(html, /Carlos was exceptional/);
  assert.match(html, /Diego Tolotto/);
  assert.match(html, /href="#list-here"/);
});
