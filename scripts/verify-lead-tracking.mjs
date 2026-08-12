import fs from 'node:fs';
import path from 'node:path';

// Lead conversion tracking integrity.
//
// Two defects this locks out, both of which failed silently — the forms kept
// working, the leads kept arriving, and only the *count* was wrong. That is the
// worst failure mode to leave unguarded, because the number it corrupts is the
// one used to decide whether the site is working.
//
//  1. `trackLead(...); window.location.href = "/thanks/x"` on one line. The
//     dataLayer push is synchronous but GTM's dispatch is not, so the browser
//     could start unloading before the GA4/Meta beacons left. Navigation must
//     go through navigateAfterTracking(), which waits for GTM's eventCallback
//     and still navigates on a hard timer if GTM is absent or blocked.
//
//  2. A form that redirects to a thank-you page without firing trackLead at
//     all. AgencyPartnerForm did this — it pushed only a custom form_submit
//     event, so agency partner leads never registered as conversions and were
//     invisible in every report, while the near-identical ReferralIntakeForm
//     counted correctly.

const root = process.cwd();
const errors = [];

function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

// analytics.ts is the one sanctioned place to assign window.location.href — it
// is the implementation of the safe helper, and its doc comment quotes the bad
// pattern as the example of what not to do. Both would otherwise self-trip
// checks 1 and 2. Check 3 below still inspects it, and that is the check that
// matters for this file.
const HELPER = path.join('src', 'lib', 'analytics.ts');
const sourceFiles = walk(path.join(root, 'src'), ['.tsx', '.ts']).filter(
  (f) => path.relative(root, f) !== HELPER,
);

// ── 1. No track-then-navigate race ──────────────────────────────────────────
const racePattern = /(?:trackLead|pushEvent|trackFunnelEvent)\([^;]*\);\s*window\.location\.href\s*=/;
for (const file of sourceFiles) {
  const rel = path.relative(root, file);
  const src = fs.readFileSync(file, 'utf8');
  if (racePattern.test(src)) {
    errors.push(
      `${rel}: fires an analytics event and then assigns window.location.href immediately. ` +
        `The beacon can be cancelled by the unload — use navigateAfterTracking(url) instead.`,
    );
  }
}

// ── 2. Anything redirecting to a thank-you page must count the lead ─────────
const THANKS = /["'](\/thanks\/[a-z]+|\/es\/gracias\/[a-z]+)["']/;
for (const file of sourceFiles) {
  const rel = path.relative(root, file);
  const src = fs.readFileSync(file, 'utf8');

  // Only components that actually send the visitor there on submit.
  const redirects = /navigateAfterTracking\(\s*["'](\/thanks\/|\/es\/gracias\/)/.test(src)
    || /window\.location\.href\s*=\s*["'](\/thanks\/|\/es\/gracias\/)/.test(src);
  if (!redirects) continue;
  if (!THANKS.test(src)) continue;

  if (!/\btrackLead\s*\(/.test(src)) {
    errors.push(
      `${rel}: redirects to a thank-you page but never calls trackLead(), so its submissions ` +
        `are never counted as a lead conversion in GA4 or Meta.`,
    );
  }
  if (/window\.location\.href\s*=\s*["'](\/thanks\/|\/es\/gracias\/)/.test(src)) {
    errors.push(
      `${rel}: navigates to a thank-you page with a raw window.location.href assignment. ` +
        `Use navigateAfterTracking(url) so the conversion beacon is not cut off.`,
    );
  }
}

// ── 3. The helper itself must never be able to strand a visitor ─────────────
const analyticsPath = path.join(root, 'src', 'lib', 'analytics.ts');
if (!fs.existsSync(analyticsPath)) {
  errors.push('src/lib/analytics.ts is missing.');
} else {
  const analytics = fs.readFileSync(analyticsPath, 'utf8');
  const fn = analytics.slice(analytics.indexOf('export function navigateAfterTracking'));
  if (!fn) {
    errors.push('analytics.ts: navigateAfterTracking is missing.');
  } else {
    const body = fn.slice(0, fn.indexOf('\n}\n') + 3);
    if (!/setTimeout\(/.test(body)) {
      errors.push(
        'analytics.ts: navigateAfterTracking has no hard timeout fallback. Without it a blocked ' +
          'or missing GTM would strand the visitor on the form instead of the thank-you page.',
      );
    }
    if (!/isTrackingAllowed\(\)/.test(body)) {
      errors.push(
        'analytics.ts: navigateAfterTracking must short-circuit when tracking is declined — ' +
          'nothing is queued, so the visitor should not be made to wait out the timeout.',
      );
    }
  }
}

if (errors.length) {
  console.error(`Lead tracking verification FAILED (${errors.length}):`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}

console.log('lead conversion tracking verified');
