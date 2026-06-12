// Renders scripts/og-card.html to public/images/og-default.png (1200x630).
// Uses the puppeteer already installed for react-snap. Run from repo root:
//   node scripts/render-og-image.mjs
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(root, 'scripts/og-card.html'), { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: path.join(root, 'public/images/og-default.png'), type: 'png' });
await browser.close();
console.log('rendered public/images/og-default.png');
