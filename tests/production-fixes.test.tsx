import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../src/components/Footer';
import { HeroSellerForm } from '../src/components/HeroSellerForm';
import { MarketPulse } from '../src/components/MarketPulse';
import { isSpainMarketRoute } from '../src/constants';

test('Florida footer excludes Spain contact while Spain desk retains it', () => {
 for (const route of ['/', '/sell-weston', '/es/vender-doral']) {
  const html = renderToStaticMarkup(<MemoryRouter initialEntries={[route]}><Footer /></MemoryRouter>);
  assert(!html.includes('34646853078'), route);
  assert(html.includes('SL705771') && html.includes('Equal Housing Opportunity'));
 }
 const html = renderToStaticMarkup(<MemoryRouter initialEntries={['/global-desk']}><Footer /></MemoryRouter>);
 assert(html.includes('34646853078'));
 assert(!isSpainMarketRoute('/es/vender-brickell'));
});

test('honeypot has no instruction text or keyboard focus', () => {
 const html = renderToStaticMarkup(<HeroSellerForm compact progressiveDesktop />);
 assert(!html.includes("Don&#x27;t fill this out"));
 assert.match(html, /<input(?=[^>]*name="bot-field")(?=[^>]*tabindex="-1")[^>]*>/);
});

test('market pulse labels each segment period and provides pricing advice', () => {
 const html = renderToStaticMarkup(<MemoryRouter><MarketPulse /></MemoryRouter>);
 assert.match(html, /May 2026|Q2 2026/);
 assert.match(html, /Seller strategy/);
 assert.match(html, /Source review/);
});
