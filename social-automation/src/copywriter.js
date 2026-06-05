// ===========================================================================
// src/copywriter.js
// Step 2: Claude (claude-opus-4-5) selects the best story and writes
// Instagram / LinkedIn / Facebook captions per brand rules. Returns
// structured JSON. Regenerates once if compliance checks fail.
// ===========================================================================

import Anthropic from '@anthropic-ai/sdk';
import { config, requireKeys } from '../config/config.js';
import { logger, parseJsonLoose, checkAllCompliance } from './utils.js';

const b = config.brand;

// The brand identity is embedded directly into the Claude system prompt.
const SYSTEM_PROMPT = `You are the institutional content strategist for ${b.principal}, ${b.licenseLabel}, with 25 years in South Florida luxury real estate, affiliated with ${b.company} (${b.figures.urgAgents} agents, ${b.figures.urgOffices} Florida offices).

MISSION: Win listing mandates from high-net-worth owners in South Florida and through the Spain and LATAM referral pipeline.

THE DISTRIBUTION ARGUMENT — lead with this in all seller-facing copy:
When a seller lists with Carlos, their property enters the world's largest local Realtor association's infrastructure: ${b.figures.miamiRealtorMembers} member agents, ${b.figures.globalPortals} global websites publishing simultaneously in ${b.figures.languages} languages, ${b.figures.usMLSsViaRPR} U.S. MLSs via RPR, ${b.figures.internationalAgreements} signed international association agreements, ${b.figures.mlsDataExchanges} MLS data exchanges, and ${b.figures.combined2025Volume} in combined 2025 transaction volume. This is structural access that directly affects the seller's final price.

VERIFIED FIGURES — use exactly, never substitute or invent:
${b.figures.miamiRealtorMembers} Miami REALTORS® members · ${b.figures.globalPortals} global portals · ${b.figures.languages} languages · ${b.figures.usMLSsViaRPR} U.S. MLSs via RPR · ${b.figures.internationalAgreements} international agreements · ${b.figures.mlsDataExchanges} MLS data exchanges · ${b.figures.combined2025Volume} 2025 volume · ${b.figures.urgAgents} URG agents · ${b.figures.urgOffices} URG Florida offices.

TONE: Institutional. Peer-to-peer. Persuasive through precision. No exclamation marks in body copy. Never use the words: dream, passionate, best agent, excited. Every CTA names a specific outcome (e.g. "Schedule a 20-minute listing strategy call" — not "learn more").

COMPLIANCE — hard rules, never break:
- Do not guarantee sale outcomes, prices, or timelines.
- Do not imply Carlos is licensed outside Florida.
- When you cite market data, name the source in the text.
- Do not use "effective [date]" language in the public-facing caption body.
- Every caption MUST end with this exact compliance footer on its own line:
  ${b.complianceFooter}
- Every caption MUST include the license number ${b.licenseNumber} (it is inside the footer).

CONTACTS to weave in where natural (not all at once):
USA WhatsApp ${b.contacts.whatsappUSA} · Spain WhatsApp ${b.contacts.whatsappSpain} · ${b.contacts.email} · ${b.contacts.sites.join(' · ')}.

OUTPUT FORMAT — respond with ONLY a JSON object, no prose, no code fences:
{
  "selected_story": { "title": "...", "source": "...", "link": "..." },
  "selection_reason": "1-2 sentences on why this story best serves South Florida sellers",
  "image_brief": "a vivid art-direction brief for a photorealistic luxury South Florida property image — no text, no people, cinematic light, architectural-photography aesthetic",
  "headline": "<= 70 character headline for the design overlay (no exclamation mark)",
  "captions": {
    "instagram": "caption with tasteful line breaks, 3-6 relevant hashtags, ends with the compliance footer",
    "linkedin": "longer institutional caption leading with the distribution argument, ends with the compliance footer",
    "facebook": "mid-length caption, ends with the compliance footer"
  }
}

Each caption must be self-contained and already include the compliance footer as the final line.`;

function buildUserPrompt(candidates, topicOverride) {
  const list = candidates
    .map(
      (c, i) =>
        `${i + 1}. [${c.source}] (score ${c.score}) ${c.title}\n   ${c.summary}${c.link ? `\n   ${c.link}` : ''}`,
    )
    .join('\n\n');

  const topicLine = topicOverride
    ? `\n\nMANUAL TOPIC OVERRIDE: The user wants this post to focus on "${topicOverride}". Choose the candidate that best fits, or build the post around this topic directly while still grounding it in the distribution argument.`
    : '';

  return `Here are today's top candidate stories, pre-scored for South Florida seller relevance:\n\n${list}${topicLine}\n\nSelect the single best story for a seller-facing post and write the captions per your instructions. Respond with ONLY the JSON object.`;
}

/**
 * Generate post copy. Returns the parsed JSON plus a compliance report.
 * @param {object[]} candidates
 * @param {{topicOverride?: string}} opts
 */
export async function writeCopy(candidates, opts = {}) {
  requireKeys(['anthropic.apiKey']);
  const client = new Anthropic({ apiKey: config.anthropic.apiKey });

  async function generate(extraInstruction = '') {
    const userPrompt = buildUserPrompt(candidates, opts.topicOverride) + extraInstruction;
    const response = await client.messages.create({
      model: config.anthropic.model,
      max_tokens: config.anthropic.maxTokens,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    });
    const text = response.content
      .filter((blk) => blk.type === 'text')
      .map((blk) => blk.text)
      .join('\n');
    return parseJsonLoose(text);
  }

  logger.step('Claude is selecting a story and drafting captions...');
  let copy = await generate();
  let compliance = checkAllCompliance(copy.captions || {});

  if (!compliance.ok) {
    const issues = Object.entries(compliance.report)
      .filter(([, r]) => !r.ok)
      .map(([p, r]) => `${p}: ${r.violations.join('; ')}`)
      .join(' | ');
    logger.warn(`Compliance issues on first draft -> regenerating. (${issues})`);
    copy = await generate(
      `\n\nIMPORTANT: A previous draft violated these brand rules: ${issues}. ` +
        `Fix every one. No exclamation marks, no banned words (dream, passionate, best agent, excited), ` +
        `no guaranteed outcomes, and end EVERY caption with the exact footer: ${b.complianceFooter}`,
    );
    compliance = checkAllCompliance(copy.captions || {});
  }

  return { copy, compliance };
}

export default { writeCopy };
