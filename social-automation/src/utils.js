// ===========================================================================
// src/utils.js
// Shared helpers: logging, dates, filesystem, brand compliance, fetch w/retry.
// Uses Node's native fetch (Node 20+). No axios, no node-fetch.
// ===========================================================================

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config/config.js';

// ---- Logging --------------------------------------------------------------

const LEVEL_TAGS = {
  info: 'INFO ',
  warn: 'WARN ',
  error: 'ERROR',
  ok: ' OK  ',
  step: 'STEP ',
};

export function log(level, ...args) {
  const tag = LEVEL_TAGS[level] || 'INFO ';
  const ts = new Date().toISOString();
  const stream = level === 'error' ? process.stderr : process.stdout;
  stream.write(`[${ts}] [${tag}] ${args.join(' ')}\n`);
}

export const logger = {
  info: (...a) => log('info', ...a),
  warn: (...a) => log('warn', ...a),
  error: (...a) => log('error', ...a),
  ok: (...a) => log('ok', ...a),
  step: (...a) => log('step', ...a),
};

// ---- Dates / time ---------------------------------------------------------

/** YYYY-MM-DD for the given date in the configured timezone. */
export function isoDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: config.schedule.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/** Compact timestamp safe for filenames: 2026-06-05T14-30-12-345Z */
export function fileStamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

// ---- Filesystem -----------------------------------------------------------

export async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
  return dir;
}

export async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fsp.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return filePath;
}

export async function readJson(filePath) {
  const raw = await fsp.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// ---- Async helpers --------------------------------------------------------

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * fetch() with exponential-backoff retry on network errors and 429/5xx.
 * @param {string} url
 * @param {RequestInit} options
 * @param {{retries?: number, baseDelayMs?: number, label?: string}} cfg
 */
export async function fetchWithRetry(url, options = {}, cfg = {}) {
  const { retries = 4, baseDelayMs = 2000, label = url } = cfg;
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.status === 429 || res.status >= 500) {
        if (attempt < retries) {
          const delay = baseDelayMs * 2 ** attempt;
          logger.warn(`${label}: HTTP ${res.status}, retrying in ${delay}ms (${attempt + 1}/${retries})`);
          await sleep(delay);
          continue;
        }
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < retries) {
        const delay = baseDelayMs * 2 ** attempt;
        logger.warn(`${label}: ${err.message}, retrying in ${delay}ms (${attempt + 1}/${retries})`);
        await sleep(delay);
        continue;
      }
    }
  }
  throw lastErr || new Error(`${label}: request failed after ${retries} retries`);
}

// ---- Brand compliance -----------------------------------------------------

/**
 * Validate a single caption string against the brand rules.
 * Returns { ok: boolean, violations: string[] }.
 */
export function checkCompliance(text) {
  const violations = [];
  if (!text || !text.trim()) {
    return { ok: false, violations: ['empty caption'] };
  }
  const lower = text.toLowerCase();

  // No exclamation marks in body copy.
  if (text.includes('!')) violations.push('contains exclamation mark');

  // Banned words.
  for (const word of config.brand.forbiddenWords) {
    if (lower.includes(word.toLowerCase())) {
      violations.push(`uses banned word/phrase: "${word}"`);
    }
  }

  // No "effective [date]" front-facing language (the membership figure carries
  // its own as-of note that is kept out of the public caption).
  if (/\beffective\s+\w+\s+\d{1,2},?\s+\d{4}\b/i.test(text)) {
    violations.push('uses "effective [date]" language');
  }

  // Outcome guarantees.
  if (/\b(guarantee|guaranteed|guarantees)\b/i.test(text)) {
    violations.push('implies a guaranteed outcome');
  }

  // Licensed-outside-Florida implication.
  if (/licensed\s+(in|across|throughout)\s+(?!florida)/i.test(text)) {
    violations.push('implies licensure outside Florida');
  }

  // Compliance footer must be present.
  if (!lower.includes('equal housing opportunity')) {
    violations.push('missing compliance footer (Equal Housing Opportunity)');
  }
  if (!text.includes(config.brand.licenseNumber)) {
    violations.push(`missing license number ${config.brand.licenseNumber}`);
  }

  return { ok: violations.length === 0, violations };
}

/** Validate the full {instagram, linkedin, facebook} caption set. */
export function checkAllCompliance(captions) {
  const report = {};
  let ok = true;
  for (const platform of ['instagram', 'linkedin', 'facebook']) {
    const result = checkCompliance(captions[platform]);
    report[platform] = result;
    if (!result.ok) ok = false;
  }
  return { ok, report };
}

/** Strip code fences and parse a JSON object out of an LLM response. */
export function parseJsonLoose(text) {
  if (!text) throw new Error('empty response, no JSON to parse');
  let cleaned = text.trim();
  // Remove ```json ... ``` fences if present.
  const fence = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) cleaned = fence[1].trim();
  // Grab the first {...} block.
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.slice(start, end + 1);
  }
  return JSON.parse(cleaned);
}
