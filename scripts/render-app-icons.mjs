// Rasterizes public/icon-master.svg into the PNG app icons that SVG can't
// cover: iOS apple-touch-icon (180) and the Android/Chrome PWA manifest icons
// (192, 512). Uses the Chromium that ships with react-snap's puppeteer, so it
// needs no extra image tooling. Re-run after editing icon-master.svg:
//
//   node scripts/render-app-icons.mjs
//
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import puppeteer from "puppeteer";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "icon-master.svg"), "utf8");

const SIZES = [
  { size: 180, file: "apple-touch-icon.png" },
  { size: 192, file: "icon-192.png" },
  { size: 512, file: "icon-512.png" },
];

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  for (const { size, file } of SIZES) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    // Inline the SVG scaled to the exact pixel box; no margins, no scrollbars.
    const html = `<!doctype html><html><head><style>
      html,body{margin:0;padding:0}
      svg{display:block;width:${size}px;height:${size}px}
    </style></head><body>${svg}</body></html>`;
    await page.setContent(html, { waitUntil: "networkidle0" });
    const out = join(root, "public", file);
    await page.screenshot({ path: out, type: "png", omitBackground: false });
    console.log(`rendered ${file} (${size}x${size})`);
  }
} finally {
  await browser.close();
}
