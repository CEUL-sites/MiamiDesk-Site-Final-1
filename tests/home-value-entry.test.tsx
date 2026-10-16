import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFile } from 'node:fs/promises';

test('the homepage offers address entry in place of the city price grid', async () => {
  const home = await readFile(new URL('../src/pages/HomePage.tsx', import.meta.url), 'utf8');
  assert(!home.includes('<MarketPulse'), 'the nine-city price grid must leave the homepage');
  assert(home.includes('<HomeValueEntry'), 'the compact valuation entry must replace it');
});

test('valuation entry is address-first, with no initial map request or price claim', async () => {
  const { HomeValueEntry } = await import('../src/components/HomeValueEntry');
  const html = renderToStaticMarkup(<HomeValueEntry />);
  assert.match(html, /What could your home sell for\?/);
  assert.match(html, /name="propertyAddress"/);
  assert.match(html, /Request My Home Value Review/);
  assert.match(html, /Prepared by our team/);
  assert.match(html, /href="\/market-data"/);
  assert(!html.includes('<iframe'));
  assert(!html.includes('Median sale price'));
});

test('the Spanish address entry has the same honest valuation offer', async () => {
  const { HomeValueEntry } = await import('../src/components/HomeValueEntry');
  const html = renderToStaticMarkup(<HomeValueEntry lang="es" />);
  assert.match(html, /¿Por cuánto podría vender su casa\?/);
  assert.match(html, /Solicitar revisión del valor de mi casa/);
  assert.match(html, /no es una tasación/);
});

test('a valuation request carries the address and uses the existing contact intake', async () => {
  const { HeroSellerForm } = await import('../src/components/HeroSellerForm');
  const html = renderToStaticMarkup(<HeroSellerForm compact progressiveDesktop valuation initialAddress="15951 SW 41 St, Weston, FL" sourcePage="homepage-valuation-en" />);
  assert.match(html, /name="propertyAddress"[^>]*value="15951 SW 41 St, Weston, FL"/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="phone"/);
  assert.match(html, /Request My Home Value Review/);
  assert.match(html, /name="form-name" value="seller-hero"/);
});

test('the confirmed-address map does not depend on the restricted API key', async () => {
  const module = await import('../src/components/HomeValueEntry');
  assert.equal(typeof module.AddressMapEmbed, 'function', 'a key-independent map preview must exist');
  const html = renderToStaticMarkup(<module.AddressMapEmbed address="15951 SW 41 St #700, Weston, FL" title="Address preview" />);
  assert.match(html, /title="Address preview"/);
  assert.match(html, /https:\/\/www.google.com\/maps\?q=15951%20SW%2041%20St%20%23700%2C%20Weston%2C%20FL/);
  assert.match(html, /output=embed/);
  assert(!html.includes('key='));
});
