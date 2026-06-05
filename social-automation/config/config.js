// ===========================================================================
// config/config.js
// Single source of truth for configuration. EVERY secret is read from
// process.env here — nothing is hardcoded. Import `config` everywhere else.
// ===========================================================================

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/**
 * Resolve a path that may be relative to the project root.
 * @param {string|undefined} p
 * @param {string} fallback
 */
function resolveFromRoot(p, fallback) {
  const value = p && p.trim() ? p.trim() : fallback;
  return path.isAbsolute(value) ? value : path.join(ROOT, value);
}

export const config = {
  root: ROOT,

  // ---- Brand identity (embedded into copy + design + CLAUDE.md) ----------
  brand: {
    principal: 'Carlos Uzcategui',
    licenseLabel: 'Florida Licensed Realtor® SL705771',
    licenseNumber: 'SL705771',
    company: 'United Realty Group',
    complianceFooter:
      'Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.',
    palette: {
      navy: '#0A1628',
      gold: '#C9A84C',
      white: '#F8F6F1',
    },
    contacts: {
      whatsappUSA: '+1 954-865-6622',
      whatsappSpain: '+34 646 85 30 78',
      email: 'contact@carlosre.com',
      sites: ['homesprofessional.com', 'carlosre.com'],
      office: '15951 SW 41 St. #700, Weston, FL 33331',
    },
    // VERIFIED FIGURES — use exactly, never substitute or invent.
    figures: {
      miamiRealtorMembers: '93,000',
      miamiRealtorMembersAsOf: 'effective May 11, 2026',
      globalPortals: '200+',
      languages: '19',
      usMLSsViaRPR: '260+',
      internationalAgreements: '437+',
      mlsDataExchanges: '11',
      combined2025Volume: '$69B',
      urgAgents: '3,500+',
      urgOffices: '20',
    },
    forbiddenWords: ['dream', 'passionate', 'best agent', 'excited'],
  },

  // ---- Claude (copywriting) ---------------------------------------------
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    // Per project spec — exact string, no date suffix.
    model: 'claude-opus-4-5',
    maxTokens: 4096,
  },

  // ---- Gemini Nano Banana (image generation) ----------------------------
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    // Canonical model name lives in src/image_gen.js (NANO_BANANA_MODEL).
  },

  // ---- Google Drive (storage) -------------------------------------------
  drive: {
    credentialsPath: resolveFromRoot(
      process.env.GOOGLE_OAUTH_CREDENTIALS,
      'credentials/google_oauth_client.json',
    ),
    tokenPath: resolveFromRoot(
      process.env.GOOGLE_TOKEN_PATH,
      'credentials/google_token.json',
    ),
    rootFolderName: 'CarlosRE Social Automation',
    rootFolderId: process.env.DRIVE_ROOT_FOLDER_ID || '',
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  },

  // ---- Canva (design assembly) ------------------------------------------
  canva: {
    apiToken: process.env.CANVA_API_TOKEN || '',
    brandTemplateId: process.env.CANVA_BRAND_TEMPLATE_ID || '',
    apiBase: 'https://api.canva.com/rest/v1',
  },

  // ---- Buffer (publishing) ----------------------------------------------
  buffer: {
    accessToken: process.env.BUFFER_ACCESS_TOKEN || '',
    apiBase: 'https://api.bufferapp.com/1',
    profiles: {
      instagram: process.env.BUFFER_PROFILE_ID_INSTAGRAM || '',
      linkedin: process.env.BUFFER_PROFILE_ID_LINKEDIN || '',
      facebook: process.env.BUFFER_PROFILE_ID_FACEBOOK || '',
    },
  },

  // ---- Bridge IDX (optional MLS source) ---------------------------------
  bridge: {
    apiKey: process.env.BRIDGE_API_KEY || '',
    apiBase: process.env.BRIDGE_API_BASE || 'https://api.bridgedataoutput.com/api/v2',
  },

  // ---- Data sources (priority order) ------------------------------------
  rssFeeds: [
    { name: 'Miami REALTORS®', url: 'https://www.miamirealtors.com/feed/', weight: 3 },
    { name: 'NAR Newsroom', url: 'https://www.nar.realtor/blogs/economists-outlook/feed', weight: 2 },
    { name: 'Zillow Research', url: 'https://www.zillow.com/research/feed/', weight: 2 },
  ],

  // ---- Scheduling (all times Eastern) -----------------------------------
  schedule: {
    timezone: process.env.SCHEDULE_TIMEZONE || 'America/New_York',
    windows: {
      instagram: { hoursET: [7, 12, 18], weekdaysOnly: false },
      linkedin: { hoursET: [8, 17], weekdaysOnly: true },
      facebook: { hoursET: [9, 15], weekdaysOnly: false },
    },
  },

  // ---- Local output paths ------------------------------------------------
  paths: {
    images: path.join(ROOT, 'output', 'images'),
    runs: path.join(ROOT, 'output', 'runs'),
    pendingPosts: path.join(ROOT, 'output', 'pending_posts'),
    fallbackImages: path.join(ROOT, 'config', 'fallback_images'),
  },
};

/**
 * Throw a clean, actionable error if a required key is missing at runtime.
 * @param {string[]} keys  dot-paths into config, e.g. 'anthropic.apiKey'
 */
export function requireKeys(keys) {
  const urls = {
    'anthropic.apiKey': 'https://console.anthropic.com/keys (ANTHROPIC_API_KEY)',
    'gemini.apiKey': 'https://aistudio.google.com/app/apikey (GEMINI_API_KEY)',
    'canva.apiToken': 'https://www.canva.com/developers (CANVA_API_TOKEN)',
    'buffer.accessToken': 'https://buffer.com/developers (BUFFER_ACCESS_TOKEN)',
  };
  const missing = [];
  for (const key of keys) {
    const value = key.split('.').reduce((o, k) => (o ? o[k] : undefined), config);
    if (!value) missing.push(key);
  }
  if (missing.length) {
    const lines = missing.map((k) => `  - ${k}  ->  ${urls[k] || 'see .env.example'}`);
    const err = new Error(
      `Missing required key(s):\n${lines.join('\n')}\n\nAdd them to .env and re-run.`,
    );
    err.code = 'MISSING_KEY';
    err.missing = missing;
    throw err;
  }
}

export default config;
