import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { LeadForm } from '../src/components/LeadForm';
import { Footer } from '../src/components/Footer';
import { HeroSellerForm } from '../src/components/HeroSellerForm';
import { MarketPulse } from '../src/components/MarketPulse';
import { Distribution } from '../src/components/Distribution';
import { MarketingReel3D } from '../src/components/MarketingReel3D';
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

test('homepage distribution exposes the complete approved infrastructure in both languages', () => {
 for (const lang of ['en', 'es'] as const) {
  const html = renderToStaticMarkup(<Distribution lang={lang} />);
  for (const metric of ['93,000', '200+', '260+', '437+', '3,500+', '$69 Billion']) {
   assert(html.includes(metric), `${lang}: missing visible distribution figure ${metric}`);
  }
  assert(html.includes(lang === 'en' ? '19 Florida office locations' : '19 ubicaciones en Florida'));
  assert(html.includes(lang === 'en' ? 'combined association' : 'asociación combinada'));
 }
});

test('homepage distribution and media CTAs return to the unified seller form', () => {
 for (const lang of ['en', 'es'] as const) {
  for (const component of [<Distribution lang={lang} />, <MarketingReel3D lang={lang} />]) {
   const html = renderToStaticMarkup(component);
   assert.match(html, /href="#list-here" class="story-cta/);
   assert(!html.includes('/sell#contact') && !html.includes('/es/vender#contact'));
  }
 }
});

test('shared media supports a page-specific contact target', () => {
 const html = renderToStaticMarkup(<MarketingReel3D ctaHref="#contact" />);
 assert.match(html, /href="#contact" class="story-cta/);
 assert(!html.includes('href="#list-here" class="story-cta'));
});


test('contact inquiry uses a section heading directly below the page h1', () => {
 const html = renderToStaticMarkup(<LeadForm intent="buyer" compactHeading />);
 assert.match(html, /<h2[^>]*>Buyer Consultation<\/h2>/);
});
