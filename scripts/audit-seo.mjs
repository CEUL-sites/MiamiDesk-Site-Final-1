import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.tsx')) results.push(full);
  });
  return results;
}

const pages = walk('src/pages');
console.log('Auditing ' + pages.length + ' pages for SEO metadata...');

let issuesCount = 0;
pages.forEach((p) => {
  const content = fs.readFileSync(p, 'utf8');
  const hasHelmet = content.includes('<Helmet>') || content.includes('<Helmet ');
  const hasTitle = content.includes('<title>');
  const hasDesc = content.includes('name="description"');
  const hasCanonical = content.includes('rel="canonical"');
  const isNoIndex = content.includes('content="noindex');
  const isThankYou = p.includes('thanks') || p.includes('gracias') || p.includes('NotFoundPage');

  const issues = [];
  if (!hasHelmet && !isThankYou) issues.push('Missing Helmet');
  if (hasHelmet && !hasTitle && !isThankYou) issues.push('Missing Title');
  if (hasHelmet && !hasDesc && !isThankYou) issues.push('Missing Description');
  if (hasHelmet && !hasCanonical && !isNoIndex && !isThankYou) issues.push('Missing Canonical');

  if (issues.length > 0) {
    issuesCount++;
    console.log(p + ': ' + issues.join(', '));
  }
});

if (issuesCount === 0) {
  console.log('All pages passed basic SEO metadata audit.');
}
