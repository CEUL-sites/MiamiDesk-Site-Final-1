const RESTRICTED_PATTERNS: Array<{ pattern: RegExp; replacement: string }> = [
  {
    pattern: /\b(this is legal advice|as legal advice|you should sue|you should file a lawsuit)\b/gi,
    replacement: "This is general information only and should be reviewed with a qualified attorney",
  },
  {
    pattern: /\b(this is tax advice|you will pay exactly|your tax will be)\b/gi,
    replacement: "A qualified tax professional should review the tax result",
  },
  {
    pattern: /\b(guaranteed return|guaranteed roi|risk-free|safe investment|guaranteed appreciation|guaranteed rental income)\b/gi,
    replacement: "investment outcome that requires independent due diligence",
  },
  {
    pattern: /\b(your home is worth exactly|guaranteed value|this is an appraisal|you should list at|will sell for)\b/gi,
    replacement: "Carlos can review MLS context before any pricing recommendation",
  },
  {
    pattern: /\b(guaranteed commission|referral fee is guaranteed|commission will be)\b/gi,
    replacement: "referral or compensation terms require a written agreement",
  },
  {
    pattern: /\b(good for venezuelans|family neighborhood|young professionals|safe area for women|mostly\s+[a-z]+\s+people)\b/gi,
    replacement: "area details should be evaluated through property features, budget, commute, amenities, and independent third-party sources",
  },
  {
    pattern: /\b(#\s?1|number one|top producer|best agent|top agent|highest[- ]rated agent)\b/gi,
    replacement: "an experienced Florida-licensed listing agent",
  },
  {
    pattern: /\b(from day one|on day one|within 24 hours|within \d+ hours|same[- ]day|instant(?:ly)?)\b/gi,
    replacement: "as part of the listing process",
  },
];

export const guardAiDeskResponse = (text: string) => {
  let guarded = text;
  for (const { pattern, replacement } of RESTRICTED_PATTERNS) {
    guarded = guarded.replace(pattern, replacement);
  }
  return guarded.trim();
};
