// ===========================================================================
// src/buffer_publisher.js
// Step 6: Schedule the post via the Buffer API.
//   Instagram  7am / 12pm / 6pm ET   (every day)
//   LinkedIn   8am / 5pm ET          (weekdays only)
//   Facebook   9am / 3pm ET          (every day)
// Outside a platform's windows, queue the next available slot.
// On Buffer failure, save the full post JSON to output/pending_posts/.
// ===========================================================================

import path from 'node:path';
import { config } from '../config/config.js';
import { logger, fetchWithRetry, ensureDir, fileStamp, writeJson } from './utils.js';

// ---- Timezone-aware slot math (no external deps) --------------------------

/** Offset (ms) between the given instant's wall-clock in `tz` and real UTC. */
function tzOffsetMs(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const map = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  const asUTC = Date.UTC(map.year, map.month - 1, map.day, map.hour, map.minute, map.second);
  return asUTC - date.getTime();
}

/** Convert a wall-clock (Y-M-D H:00 in `tz`) into a real UTC Date. */
function zonedWallClockToUtc(y, m, d, h, tz) {
  const guess = Date.UTC(y, m - 1, d, h, 0, 0);
  const offset = tzOffsetMs(new Date(guess), tz);
  return new Date(guess - offset);
}

/** Wall-clock parts (year, month, day, weekday) for an instant in `tz`. */
function zonedParts(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });
  const map = {};
  for (const p of dtf.formatToParts(date)) map[p.type] = p.value;
  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    weekday: map.weekday, // Mon, Tue, ...
  };
}

const WEEKEND = new Set(['Sat', 'Sun']);

/**
 * Compute the next available scheduling slot (UTC Date) for a platform.
 * @param {{hoursET:number[], weekdaysOnly:boolean}} window
 * @param {Date} now
 */
export function nextSlot(window, now = new Date()) {
  const tz = config.schedule.timezone;
  for (let dayOffset = 0; dayOffset <= 8; dayOffset++) {
    const dayInstant = new Date(now.getTime() + dayOffset * 86400000);
    const { year, month, day } = zonedParts(dayInstant, tz);
    for (const hour of [...window.hoursET].sort((a, b) => a - b)) {
      const slotUtc = zonedWallClockToUtc(year, month, day, hour, tz);
      if (slotUtc.getTime() <= now.getTime()) continue;
      if (window.weekdaysOnly) {
        const wd = zonedParts(slotUtc, tz).weekday;
        if (WEEKEND.has(wd)) continue;
      }
      return slotUtc;
    }
  }
  // Fallback: 24h out (should never be reached).
  return new Date(now.getTime() + 86400000);
}

// ---- Buffer API -----------------------------------------------------------

async function createBufferUpdate({ profileId, text, scheduledAt, photoUrl }) {
  const body = new URLSearchParams();
  body.set('profile_ids[]', profileId);
  body.set('text', text);
  body.set('scheduled_at', String(Math.floor(scheduledAt.getTime() / 1000)));
  if (photoUrl) body.set('media[photo]', photoUrl);

  const res = await fetchWithRetry(
    `${config.buffer.apiBase}/updates/create.json?access_token=${encodeURIComponent(config.buffer.accessToken)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    },
    { label: 'Buffer create', retries: 3 },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    throw new Error(`Buffer HTTP ${res.status}: ${data.message || JSON.stringify(data).slice(0, 200)}`);
  }
  return data;
}

async function savePendingPublish(copy, platforms, reason, photoUrl) {
  await ensureDir(config.paths.pendingPosts);
  const jsonPath = path.join(config.paths.pendingPosts, `buffer-pending-${fileStamp()}.json`);
  await writeJson(jsonPath, {
    reason,
    savedAt: new Date().toISOString(),
    photoUrl: photoUrl || null,
    headline: copy.headline,
    captions: copy.captions,
    intendedSlots: platforms,
  });
  logger.warn(`Buffer unavailable — saved post JSON -> ${path.relative(config.root, jsonPath)}`);
  return jsonPath;
}

// ---- Public entry point ---------------------------------------------------

/**
 * Schedule the post on the requested platforms.
 * @param {object} copy        copywriter output (has .captions, .headline)
 * @param {object} opts
 * @param {string[]} [opts.platforms]  subset of ['instagram','linkedin','facebook']
 * @param {string|null} [opts.photoUrl]  public image URL (Canva export or Drive link)
 * @param {boolean} [opts.dryRun]
 * @returns {Promise<{ok:boolean, queued:object[], pendingPath?:string, error?:string}>}
 */
export async function publish(copy, opts = {}) {
  const platforms = opts.platforms && opts.platforms.length
    ? opts.platforms
    : ['instagram', 'linkedin', 'facebook'];
  const now = new Date();

  // Compute slots for every requested platform up front (used in dry-run too).
  const queued = platforms.map((platform) => {
    const slot = nextSlot(config.schedule.windows[platform], now);
    return {
      platform,
      profileId: config.buffer.profiles[platform] || null,
      scheduledAtUTC: slot.toISOString(),
      scheduledAtET: new Intl.DateTimeFormat('en-US', {
        timeZone: config.schedule.timezone,
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(slot),
      caption: copy.captions ? copy.captions[platform] : null,
      status: 'planned',
    };
  });

  if (opts.dryRun) {
    return { ok: true, queued };
  }

  if (!config.buffer.accessToken) {
    const pendingPath = await savePendingPublish(copy, queued, 'BUFFER_ACCESS_TOKEN not set', opts.photoUrl);
    return { ok: false, queued, pendingPath, error: 'no Buffer token' };
  }

  logger.step('Scheduling posts via Buffer...');
  let anyFailed = false;
  for (const item of queued) {
    if (!item.profileId) {
      item.status = 'skipped';
      item.error = `no Buffer profile ID configured for ${item.platform}`;
      logger.warn(item.error);
      anyFailed = true;
      continue;
    }
    try {
      const result = await createBufferUpdate({
        profileId: item.profileId,
        text: item.caption || '',
        scheduledAt: new Date(item.scheduledAtUTC),
        photoUrl: opts.photoUrl || null,
      });
      item.status = 'queued';
      item.bufferUpdateId = result?.updates?.[0]?.id || result?.id || null;
      logger.ok(`${item.platform}: queued for ${item.scheduledAtET} ET`);
    } catch (err) {
      item.status = 'failed';
      item.error = err.message;
      anyFailed = true;
      logger.warn(`${item.platform}: ${err.message}`);
    }
  }

  let pendingPath;
  if (anyFailed) {
    pendingPath = await savePendingPublish(copy, queued, 'one or more Buffer updates failed', opts.photoUrl);
  }

  return { ok: !anyFailed, queued, pendingPath };
}

export default { publish, nextSlot };
