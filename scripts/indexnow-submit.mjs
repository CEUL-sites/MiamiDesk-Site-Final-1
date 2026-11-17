#!/usr/bin/env node
// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver and other participating engines).
// Usage: node scripts/indexnow-submit.mjs https://homesprofessional.com/journal/<slug> [more URLs]
// Run only after the URLs are live in production. The key is public by design: IndexNow
// verifies ownership by fetching https://homesprofessional.com/<key>.txt, which ships in public/.

const KEY = 'f6e8142dda54bc414cbe709b16827bba';
const HOST = 'homesprofessional.com';

const urls = process.argv.slice(2);
if (!urls.length || urls.some((u) => !u.startsWith('https://' + HOST + '/'))) {
  console.error('Usage: node scripts/indexnow-submit.mjs https://' + HOST + '/<path> [...]');
  process.exit(2);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls }),
});
// 200 = accepted, 202 = accepted pending key validation; anything else is a failure.
console.log('IndexNow ' + res.status + ' ' + res.statusText + ' for ' + urls.length + ' URL(s)');
process.exit(res.status === 200 || res.status === 202 ? 0 : 1);
