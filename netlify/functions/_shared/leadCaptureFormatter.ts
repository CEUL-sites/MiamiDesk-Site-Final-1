import type { AiDeskIntent } from "./aiDeskIntentRouter";
import type { AiMlsContext } from "./bridgeMlsForAi";

export const formatLeadCaptureSummary = (intent: AiDeskIntent, mlsContext?: AiMlsContext) => {
  const lines = [
    "Internal lead organization for Carlos:",
    `- Visitor type: ${intent.visitorType}`,
    `- Intent confidence: ${intent.confidence}`,
    `- Language: ${intent.language}`,
    `- Market/city detected: ${intent.city ?? "not yet provided"}`,
    `- Budget minimum detected: ${intent.budgetMin ? `$${intent.budgetMin.toLocaleString()}` : "not yet provided"}`,
    `- Budget maximum detected: ${intent.budgetMax ? `$${intent.budgetMax.toLocaleString()}` : "not yet provided"}`,
    `- Property type detected: ${intent.propertyType ?? "not yet provided"}`,
    `- MLS context used: ${mlsContext?.used ? "yes" : "no"}`,
  ];

  if (mlsContext?.used) {
    lines.push(`- MLS context type: ${mlsContext.contextType}`);
    lines.push(`- MLS records summarized: ${mlsContext.records.length}`);
  }

  lines.push("- Recommended follow-up: collect missing contact information and route to Carlos for personal review when the user is serious.");

  return lines.join("\n");
};
