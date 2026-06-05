// ===========================================================================
// src/image_gen.js
// Step 3: Generate a photorealistic luxury South Florida property image with
// Google's "Nano Banana" model via the Gemini API. On any failure, fall back
// to config/fallback_images/ and continue (never crash the run).
//
// NOTE: Google occasionally renames this model. The model name is isolated in
// the single constant below so it is trivial to swap.
// ===========================================================================

import fsp from 'node:fs/promises';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { config, requireKeys } from '../config/config.js';
import { logger, ensureDir, fileStamp } from './utils.js';

// >>> If Google renames the model, change ONLY this line. <<<
export const NANO_BANANA_MODEL = 'gemini-2.5-flash-image';

/** Build the full image prompt from the copywriter's art-direction brief. */
function buildImagePrompt(imageBrief) {
  const base =
    'Photorealistic luxury South Florida real estate photograph. ' +
    'Architectural-photography aesthetic, cinematic natural light, golden-hour or ' +
    'soft dusk tones, ultra-sharp, high dynamic range, professionally composed. ' +
    'No text, no logos, no watermarks, no people, no visible faces. ' +
    'Tasteful, institutional, high-net-worth feel.';
  return imageBrief ? `${imageBrief.trim()}\n\n${base}` : base;
}

/** Pick the first usable fallback image, if any. */
async function findFallbackImage() {
  try {
    const files = await fsp.readdir(config.paths.fallbackImages);
    const image = files.find((f) => /\.(jpe?g|png|webp)$/i.test(f));
    return image ? path.join(config.paths.fallbackImages, image) : null;
  } catch {
    return null;
  }
}

/**
 * Generate an image. Returns metadata; never throws — on failure it falls back.
 * @param {string} imageBrief  art-direction brief from the copywriter
 * @returns {Promise<{ok:boolean, path:string|null, source:'nano-banana'|'fallback'|'none', model:string, error?:string}>}
 */
export async function generateImage(imageBrief) {
  await ensureDir(config.paths.images);
  const outPath = path.join(config.paths.images, `listing-${fileStamp()}.png`);

  try {
    requireKeys(['gemini.apiKey']);
    const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey });
    const prompt = buildImagePrompt(imageBrief);

    logger.step(`Nano Banana (${NANO_BANANA_MODEL}) generating image...`);
    const response = await ai.models.generateContent({
      model: NANO_BANANA_MODEL,
      contents: prompt,
    });

    // Extract the first inline image part across the response candidates.
    const parts = response?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData && p.inlineData.data);
    if (!imagePart) {
      throw new Error('no image data returned by the model');
    }

    const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
    await fsp.writeFile(outPath, buffer);
    logger.ok(`Image saved -> ${path.relative(config.root, outPath)}`);
    return { ok: true, path: outPath, source: 'nano-banana', model: NANO_BANANA_MODEL };
  } catch (err) {
    logger.warn(`Nano Banana failed: ${err.message}. Trying fallback image...`);
    const fallback = await findFallbackImage();
    if (fallback) {
      logger.ok(`Using fallback image -> ${path.relative(config.root, fallback)}`);
      return {
        ok: true,
        path: fallback,
        source: 'fallback',
        model: NANO_BANANA_MODEL,
        error: err.message,
      };
    }
    logger.warn('No fallback image available in config/fallback_images/. Continuing without an image.');
    return { ok: false, path: null, source: 'none', model: NANO_BANANA_MODEL, error: err.message };
  }
}

export default { generateImage, NANO_BANANA_MODEL };
