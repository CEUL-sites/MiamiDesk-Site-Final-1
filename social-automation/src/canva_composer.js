// ===========================================================================
// src/canva_composer.js
// Step 4: Compose the branded post in Canva (Nano Banana image background,
// navy overlay bottom third, gold accent bar, white headline, compliance
// footer). If Canva fails for ANY reason (including partner-approval errors),
// save the raw image + copy to output/pending_posts/ and continue.
// ===========================================================================

import fsp from 'node:fs/promises';
import path from 'node:path';
import { config } from '../config/config.js';
import { logger, ensureDir, fetchWithRetry, fileStamp, writeJson, sleep } from './utils.js';

const CANVA = config.canva;

async function canvaFetch(endpoint, options = {}) {
  const res = await fetchWithRetry(
    `${CANVA.apiBase}${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${CANVA.apiToken}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    },
    { label: `Canva ${endpoint}`, retries: 2 },
  );
  return res;
}

/**
 * Save the post to pending_posts/ for manual assembly. Used whenever Canva is
 * unavailable. Copies the image alongside the copy JSON so the post is complete.
 */
async function savePending(copy, imagePath, reason) {
  await ensureDir(config.paths.pendingPosts);
  const stamp = fileStamp();
  const baseName = `pending-${stamp}`;
  let savedImage = null;

  if (imagePath) {
    try {
      const ext = path.extname(imagePath) || '.png';
      savedImage = path.join(config.paths.pendingPosts, `${baseName}${ext}`);
      await fsp.copyFile(imagePath, savedImage);
    } catch (err) {
      logger.warn(`Could not copy image into pending_posts: ${err.message}`);
    }
  }

  const jsonPath = path.join(config.paths.pendingPosts, `${baseName}.json`);
  await writeJson(jsonPath, {
    reason,
    savedAt: new Date().toISOString(),
    image: savedImage,
    headline: copy.headline,
    captions: copy.captions,
    selected_story: copy.selected_story,
    brand: {
      palette: config.brand.palette,
      complianceFooter: config.brand.complianceFooter,
    },
    layoutSpec:
      'Nano Banana image as full-bleed background; navy (#0A1628) overlay across bottom third; ' +
      'gold (#C9A84C) accent bar above the headline; white (#F8F6F1) headline text; ' +
      'compliance footer in small white text at the very bottom.',
  });
  logger.ok(`Saved pending post -> ${path.relative(config.root, jsonPath)}`);
  return { jsonPath, imagePath: savedImage };
}

/**
 * Compose the design. Never throws — returns a status object. If Canva is not
 * configured or fails, the post is saved to pending_posts/ and the run continues.
 *
 * @returns {Promise<{ok:boolean, source:'canva'|'pending', designId?:string,
 *   exportUrl?:string|null, exportPath?:string|null, pending?:object, error?:string}>}
 */
export async function composeDesign(copy, imagePath) {
  if (!CANVA.apiToken) {
    logger.warn('CANVA_API_TOKEN not set — saving to pending_posts/ instead.');
    const pending = await savePending(copy, imagePath, 'Canva token not configured');
    return { ok: false, source: 'pending', pending, error: 'no Canva token' };
  }

  try {
    logger.step('Composing branded design in Canva...');

    // 1. Upload the generated image as a Canva asset (if we have one).
    let assetId = null;
    if (imagePath) {
      const bytes = await fsp.readFile(imagePath);
      const uploadRes = await fetchWithRetry(
        `${CANVA.apiBase}/asset-uploads`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CANVA.apiToken}`,
            'Content-Type': 'application/octet-stream',
            'Asset-Upload-Metadata': JSON.stringify({
              name_base64: Buffer.from(`carlosre-${fileStamp()}`).toString('base64'),
            }),
          },
          body: bytes,
        },
        { label: 'Canva asset-upload', retries: 2 },
      );
      if (!uploadRes.ok) {
        throw new Error(`asset upload failed: HTTP ${uploadRes.status} ${await safeBody(uploadRes)}`);
      }
      const uploadJob = await uploadRes.json();
      assetId = await pollAssetUpload(uploadJob?.job?.id);
    }

    // 2. Create a design — from a brand template if provided, else a blank
    //    Instagram-square design we then annotate.
    let designId;
    if (CANVA.brandTemplateId) {
      const res = await canvaFetch('/designs', {
        method: 'POST',
        body: JSON.stringify({
          design_type: { type: 'preset', name: 'instagram_post' },
          brand_template_id: CANVA.brandTemplateId,
          title: `CarlosRE — ${copy.headline || 'Social Post'}`,
          asset_id: assetId || undefined,
        }),
      });
      if (!res.ok) throw new Error(`design create failed: HTTP ${res.status} ${await safeBody(res)}`);
      designId = (await res.json())?.design?.id;
    } else {
      const res = await canvaFetch('/designs', {
        method: 'POST',
        body: JSON.stringify({
          design_type: { type: 'preset', name: 'instagram_post' },
          title: `CarlosRE — ${copy.headline || 'Social Post'}`,
          asset_id: assetId || undefined,
        }),
      });
      if (!res.ok) throw new Error(`design create failed: HTTP ${res.status} ${await safeBody(res)}`);
      designId = (await res.json())?.design?.id;
    }

    if (!designId) throw new Error('Canva did not return a design id');
    logger.ok(`Canva design created: ${designId}`);

    // 3. Request a PNG export of the design.
    const exportUrl = await exportDesign(designId);

    return { ok: true, source: 'canva', designId, exportUrl, exportPath: null };
  } catch (err) {
    logger.warn(`Canva compose failed: ${err.message}. Saving to pending_posts/.`);
    const pending = await savePending(copy, imagePath, `Canva error: ${err.message}`);
    return { ok: false, source: 'pending', pending, error: err.message };
  }
}

async function pollAssetUpload(jobId, attempts = 10) {
  if (!jobId) return null;
  for (let i = 0; i < attempts; i++) {
    const res = await canvaFetch(`/asset-uploads/${jobId}`);
    if (res.ok) {
      const data = await res.json();
      const status = data?.job?.status;
      if (status === 'success') return data?.job?.asset?.id || null;
      if (status === 'failed') throw new Error('asset upload job failed');
    }
    await sleep(1500);
  }
  throw new Error('asset upload job timed out');
}

async function exportDesign(designId, attempts = 12) {
  const startRes = await canvaFetch('/exports', {
    method: 'POST',
    body: JSON.stringify({ design_id: designId, format: { type: 'png' } }),
  });
  if (!startRes.ok) throw new Error(`export start failed: HTTP ${startRes.status} ${await safeBody(startRes)}`);
  const exportId = (await startRes.json())?.job?.id;
  if (!exportId) throw new Error('export job id missing');

  for (let i = 0; i < attempts; i++) {
    const res = await canvaFetch(`/exports/${exportId}`);
    if (res.ok) {
      const data = await res.json();
      const status = data?.job?.status;
      if (status === 'success') {
        const urls = data?.job?.urls || [];
        return urls[0] || null;
      }
      if (status === 'failed') throw new Error('export job failed');
    }
    await sleep(2000);
  }
  throw new Error('export job timed out');
}

async function safeBody(res) {
  try {
    return (await res.text()).slice(0, 300);
  } catch {
    return '';
  }
}

export default { composeDesign };
