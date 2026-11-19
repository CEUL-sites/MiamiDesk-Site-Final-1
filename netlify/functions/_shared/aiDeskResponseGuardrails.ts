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
  {
    // The association's transaction volume is never attributed in chat (CLAUDE.md rule 1).
    pattern: /\$\s?69(?:[.,]\d+)?\s?(?:b\b|bn\b|billion\b)|\b69(?:[.,]\d+)?\s?(?:billion|mil millones)\b/gi,
    replacement: "the association network's scale",
  },
  {
    pattern: /\bRealtor\s?\(R\)/gi,
    replacement: "Realtor®",
  },
  {
    // Banned vocabulary (CLAUDE.md rule 5), EN + ES. Removed rather than swapped
    // so no new claim is introduced; whitespace is collapsed afterwards.
    pattern: /\b(?:stunning|amazing|world-class|rare gem|dream)\s*|\s*\bde (?:sus|tus) sueños\b|\b(?:increíble|increíbles|soñada|soñado)\s*/gi,
    replacement: "",
  },
  {
    pattern: /\bpassionate\b/gi,
    replacement: "committed",
  },
  {
    pattern: /\bexcited\b/gi,
    replacement: "glad",
  },
  {
    pattern: /\bbest\b/gi,
    replacement: "most suitable",
  },
  // Spanish "mejor" as a superlative, matched as a phrase to keep gender/number.
  { pattern: /\bel mejor\b/gi, replacement: "el más adecuado" },
  { pattern: /\bla mejor\b/gi, replacement: "la más adecuada" },
  { pattern: /\blos mejores\b/gi, replacement: "los más adecuados" },
  { pattern: /\blas mejores\b/gi, replacement: "las más adecuadas" },
];

/** Exclamation marks are banned in all public copy, including chat. */
const stripExclamations = (s: string) => s.replace(/¡/g, "").replace(/!+/g, ".").replace(/\.{2,}/g, ".");
const tidy = (s: string) => s.replace(/[ \t]{2,}/g, " ").replace(/ +([.,;:])/g, "$1").replace(/[,;:]+\./g, ".");

export const guardAiDeskResponse = (text: string) => {
  let guarded = text;
  for (const { pattern, replacement } of RESTRICTED_PATTERNS) {
    guarded = guarded.replace(pattern, replacement);
  }
  return tidy(stripExclamations(guarded)).trim();
};
