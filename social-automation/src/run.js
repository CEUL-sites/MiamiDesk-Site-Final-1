#!/usr/bin/env node
// ===========================================================================
// src/run.js — the orchestrator (Claude Code is the brain that drives this).
//
// Pipeline (one run, in sequence):
//   1. Fetch  -> RSS (+ optional Bridge), score, top 8
//   2. Write  -> Claude (claude-opus-4-5) selects + writes captions (JSON)
//   3. Image  -> Gemini Nano Banana (gemini-2.5-flash-image), fallback on fail
//   4. Design -> Canva; on failure save to pending_posts/ and continue
//   5. Save   -> Google Drive (dated subfolder), report link
//   6. Publish-> Buffer schedules per platform windows
//
// Commands:
//   node --env-file=.env src/run.js                       full run
//   node --env-file=.env src/run.js --dry-run             preview only
//   node --env-file=.env src/run.js --platform=instagram  one platform
//   node --env-file=.env src/run.js --topic="..."         manual topic override
//
// Error handling: no single step crashes the whole run. A timestamped JSON log
// is always written to output/runs/.
// ===========================================================================

import path from 'node:path';
import { config, requireKeys } from '../config/config.js';
import { logger, ensureDir, writeJson, readJson, fileStamp, isoDate, checkAllCompliance } from './utils.js';
import { fetchTopStories } from './fetcher.js';
import { writeCopy } from './copywriter.js';
import { generateImage } from './image_gen.js';
import { composeDesign } from './canva_composer.js';
import { saveToDrive } from './drive_saver.js';
import { publish } from './buffer_publisher.js';

// ---- CLI parsing ----------------------------------------------------------

function parseArgs(argv) {
  const args = { dryRun: false, platforms: null, topic: null, copyFile: null };
  for (const raw of argv.slice(2)) {
    if (raw === '--dry-run') args.dryRun = true;
    else if (raw.startsWith('--platform=')) {
      const p = raw.split('=')[1].trim().toLowerCase();
      if (['instagram', 'linkedin', 'facebook'].includes(p)) args.platforms = [p];
      else logger.warn(`Unknown platform "${p}" — ignoring.`);
    } else if (raw.startsWith('--topic=')) {
      args.topic = raw.slice('--topic='.length).trim();
    } else if (raw.startsWith('--copy-file=')) {
      // Inject pre-written copy (e.g. authored by Claude Code, the brain),
      // bypassing the Claude API call so no ANTHROPIC_API_KEY is needed.
      args.copyFile = raw.slice('--copy-file='.length).trim();
    } else {
      logger.warn(`Unrecognized argument: ${raw}`);
    }
  }
  return args;
}

function banner(args) {
  const mode = args.dryRun ? 'DRY RUN (preview only)' : 'LIVE RUN';
  logger.info('============================================================');
  logger.info(`CarlosRE Social Automation — ${mode}`);
  logger.info(`Date ${isoDate()} · TZ ${config.schedule.timezone}`);
  if (args.platforms) logger.info(`Platform filter: ${args.platforms.join(', ')}`);
  if (args.topic) logger.info(`Topic override: "${args.topic}"`);
  logger.info('============================================================');
}

// ---- Run log --------------------------------------------------------------

async function writeRunLog(runRecord) {
  await ensureDir(config.paths.runs);
  const file = path.join(config.paths.runs, `run-${fileStamp()}.json`);
  await writeJson(file, runRecord);
  logger.ok(`Run log -> ${path.relative(config.root, file)}`);
  return file;
}

// ---- Main -----------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  banner(args);

  const run = {
    startedAt: new Date().toISOString(),
    mode: args.dryRun ? 'dry-run' : 'live',
    platforms: args.platforms || ['instagram', 'linkedin', 'facebook'],
    topicOverride: args.topic || null,
    steps: {},
    fallbacks: [],
  };

  // Validate the minimum keys needed for this mode early, with a clean message.
  // When copy is injected (--copy-file), no Anthropic API key is required —
  // Claude Code (the brain) authored the captions directly.
  try {
    if (!args.copyFile) requireKeys(['anthropic.apiKey']);
    if (!args.dryRun) requireKeys(['gemini.apiKey']);
  } catch (err) {
    logger.error(err.message);
    run.error = err.message;
    run.endedAt = new Date().toISOString();
    await writeRunLog(run);
    process.exitCode = 1;
    return;
  }

  // --- Step 1: Fetch -------------------------------------------------------
  logger.step('[1/6] Fetching and scoring stories...');
  const fetched = await fetchTopStories();
  run.steps.fetch = {
    fetched: fetched.fetched,
    sources: fetched.sources,
    topCandidates: fetched.candidates.map((c) => ({ title: c.title, source: c.source, score: c.score })),
  };

  // With injected copy we proceed even if fetch found nothing (the brain
  // already selected the story); otherwise no stories means a graceful exit.
  if (!fetched.candidates.length && !args.copyFile) {
    logger.warn('No relevant news found across any source. Exiting gracefully.');
    run.steps.fetch.result = 'no-stories';
    run.endedAt = new Date().toISOString();
    await writeRunLog(run);
    logger.info('Nothing to publish today. Try --topic="..." to force a topic.');
    return;
  }
  if (fetched.candidates.length) {
    logger.ok(`Top story: "${fetched.candidates[0].title}" (${fetched.candidates[0].source})`);
  }

  // --- Step 2: Select + Write ---------------------------------------------
  let copy, compliance;
  if (args.copyFile) {
    logger.step(`[2/6] Loading injected copy from ${args.copyFile} ...`);
    try {
      copy = await readJson(args.copyFile);
      compliance = checkAllCompliance(copy.captions || {});
      logger.ok('Injected copy loaded (Claude Code authored — no Anthropic API call).');
    } catch (err) {
      logger.error(`Could not load --copy-file: ${err.message}`);
      run.steps.copy = { ok: false, error: err.message };
      run.endedAt = new Date().toISOString();
      await writeRunLog(run);
      process.exitCode = 1;
      return;
    }
  } else {
    logger.step('[2/6] Selecting story and writing captions...');
    try {
      const result = await writeCopy(fetched.candidates, { topicOverride: args.topic });
      copy = result.copy;
      compliance = result.compliance;
    } catch (err) {
      logger.error(`Copywriting failed: ${err.message}`);
      run.steps.copy = { ok: false, error: err.message };
      run.endedAt = new Date().toISOString();
      await writeRunLog(run);
      process.exitCode = 1;
      return;
    }
  }

  // Final compliance gate (defense in depth on top of the regenerate loop).
  compliance = compliance || checkAllCompliance(copy.captions || {});
  run.steps.copy = {
    ok: true,
    selected_story: copy.selected_story,
    selection_reason: copy.selection_reason,
    headline: copy.headline,
    captions: copy.captions,
    compliance,
  };

  // --- DRY RUN: show the work and stop ------------------------------------
  if (args.dryRun) {
    printDryRun(fetched, copy, compliance, run.platforms);
    const pub = await publish(copy, { platforms: args.platforms, dryRun: true });
    run.steps.schedulePreview = pub.queued;
    run.endedAt = new Date().toISOString();
    await writeRunLog(run);
    logger.info('');
    logger.info('DRY RUN complete. Review the copy above.');
    if (!compliance.ok) logger.warn('NOTE: compliance check flagged issues — see report above.');
    logger.info('Approve to proceed to a LIVE run:  node --env-file=.env src/run.js');
    logger.info('Do you want to run a variation or change the topic?');
    return;
  }

  // --- Step 3: Image -------------------------------------------------------
  logger.step('[3/6] Generating image with Nano Banana...');
  const image = await generateImage(copy.image_brief);
  run.steps.image = { ok: image.ok, source: image.source, model: image.model, path: image.path, error: image.error };
  if (image.source === 'fallback') run.fallbacks.push('image: used fallback image');
  if (image.source === 'none') run.fallbacks.push('image: none available');

  // --- Step 4: Design ------------------------------------------------------
  logger.step('[4/6] Composing branded design in Canva...');
  const design = await composeDesign(copy, image.path);
  run.steps.design = {
    ok: design.ok,
    source: design.source,
    designId: design.designId || null,
    exportUrl: design.exportUrl || null,
    pending: design.pending || null,
    error: design.error || null,
  };
  if (design.source === 'pending') run.fallbacks.push('design: saved to pending_posts/ (Canva unavailable)');

  // --- Step 5: Save to Drive ----------------------------------------------
  logger.step('[5/6] Saving artifacts to Google Drive...');
  const copyJsonPath = path.join(config.paths.runs, `copy-${fileStamp()}.json`);
  await writeJson(copyJsonPath, {
    selected_story: copy.selected_story,
    selection_reason: copy.selection_reason,
    headline: copy.headline,
    image_brief: copy.image_brief,
    captions: copy.captions,
    compliance,
    generatedAt: new Date().toISOString(),
  });
  const drive = await saveToDrive({
    imagePath: image.path,
    exportPath: design.exportPath || null,
    copyJsonPath,
  });
  run.steps.drive = {
    ok: drive.ok,
    folderLink: drive.folderLink || null,
    uploaded: (drive.uploaded || []).map((u) => u.name),
    error: drive.error || null,
  };
  if (!drive.ok) run.fallbacks.push('drive: upload failed, local copies kept in output/');

  // --- Step 6: Publish -----------------------------------------------------
  logger.step('[6/6] Scheduling via Buffer...');
  // Prefer a public image URL: Canva export, else nothing (Buffer can post text).
  const photoUrl = design.exportUrl || null;
  const pub = await publish(copy, { platforms: args.platforms, photoUrl });
  run.steps.publish = {
    ok: pub.ok,
    queued: pub.queued,
    pendingPath: pub.pendingPath || null,
    error: pub.error || null,
  };
  if (!pub.ok) run.fallbacks.push('publish: Buffer issue, post JSON saved to pending_posts/');

  run.endedAt = new Date().toISOString();
  const logFile = await writeRunLog(run);

  // --- Final report --------------------------------------------------------
  printFinalReport({ copy, image, design, drive, pub, logFile });
}

// ---- Reporting ------------------------------------------------------------

function printDryRun(fetched, copy, compliance, platforms) {
  const line = '------------------------------------------------------------';
  console.log(`\n${line}`);
  console.log('SELECTED STORY');
  console.log(line);
  console.log(`Title : ${copy.selected_story?.title || '(n/a)'}`);
  console.log(`Source: ${copy.selected_story?.source || '(n/a)'}`);
  if (copy.selected_story?.link) console.log(`Link  : ${copy.selected_story.link}`);
  console.log(`Why   : ${copy.selection_reason || '(n/a)'}`);
  console.log(`\nHeadline: ${copy.headline || '(n/a)'}`);
  console.log(`Image brief: ${copy.image_brief || '(n/a)'}`);

  for (const platform of platforms) {
    console.log(`\n${line}`);
    const c = compliance.report[platform];
    console.log(`${platform.toUpperCase()}  [compliance: ${c?.ok ? 'PASS' : 'FAIL'}]`);
    console.log(line);
    console.log(copy.captions?.[platform] || '(no caption)');
    if (c && !c.ok) console.log(`\n  ⚠ violations: ${c.violations.join('; ')}`);
  }
  console.log(`\n${line}`);
  console.log(`OVERALL COMPLIANCE: ${compliance.ok ? 'PASS' : 'FAIL'}`);
  console.log(line);
}

function printFinalReport({ copy, image, design, drive, pub, logFile }) {
  const line = '============================================================';
  console.log(`\n${line}`);
  console.log('RUN COMPLETE — REPORT');
  console.log(line);
  console.log(`Story used   : ${copy.selected_story?.title || '(n/a)'} [${copy.selected_story?.source || ''}]`);
  console.log(`Image        : ${image.ok ? `${image.source} (${image.model})` : 'none'}`);
  console.log(`Design       : ${design.source === 'canva' ? `Canva ${design.designId}` : 'pending_posts/ (Canva unavailable)'}`);
  console.log(`Drive folder : ${drive.folderLink || '(upload failed — local copies in output/)'}`);
  console.log('Platforms queued:');
  for (const q of pub.queued) {
    console.log(`  - ${q.platform.padEnd(9)} ${q.status.padEnd(8)} @ ${q.scheduledAtET} ET${q.error ? ` (${q.error})` : ''}`);
  }
  if (pub.pendingPath) console.log(`Pending post : ${path.relative(config.root, pub.pendingPath)}`);
  console.log(`Run log      : ${path.relative(config.root, logFile)}`);
  console.log(line);
  console.log('Do you want to run a variation or change the topic?');
}

// ---- Entry ----------------------------------------------------------------

main().catch(async (err) => {
  logger.error(`Unexpected error: ${err.stack || err.message}`);
  try {
    await writeRunLog({
      startedAt: new Date().toISOString(),
      mode: 'error',
      error: err.message,
      stack: err.stack,
    });
  } catch {
    /* best effort */
  }
  process.exitCode = 1;
});
