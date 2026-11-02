import assert from 'node:assert/strict';
import test, {after} from 'node:test';
import {buildSync} from 'esbuild';
import {mkdtempSync, writeFileSync, rmSync, statSync, existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {createRequire} from 'node:module';

const temporary = mkdtempSync(join(tmpdir(), 'association-playback-'));
after(() => rmSync(temporary, {recursive: true}));
const source = `import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {EmbeddedFilm, SiteVideoPreview, SITE_PREVIEW} from './src/components/EmbeddedFilm';
import {GlobalResearchLinks} from './src/components/GlobalResearchLinks';
export {SITE_PREVIEW};
export const renderResearch = lang => renderToStaticMarkup(<GlobalResearchLinks lang={lang}/>);
export const renderFilm = () => renderToStaticMarkup(<EmbeddedFilm videoId="SgqCKBQykVs" title="MIAMI Global City of the Future" duration="0:35" onPreviewChange={()=>{}}/>);
export const renderPreview = lang => renderToStaticMarkup(<SiteVideoPreview lang={lang}/>);`;
const output = buildSync({stdin: {contents: source, resolveDir: process.cwd(), loader: 'tsx'}, bundle: true, platform: 'node', format: 'cjs', write: false, loader: {'.css': 'empty'}});
const compiled = join(temporary, 'components.cjs');
writeFileSync(compiled, output.outputFiles[0].contents);
const {renderResearch, renderFilm, renderPreview, SITE_PREVIEW} = createRequire(import.meta.url)(compiled);

test('association films do not load a third-party player before a visitor chooses it', () => {
  for (const html of [renderResearch('en'), renderResearch('es'), renderFilm()]) {
    assert.ok(!html.includes('<iframe'));
    assert.ok(!html.includes('i.ytimg.com'));
    assert.match(html, /0:10/);
  }
  assert.match(renderResearch('en'), /Play association film/);
  assert.match(renderResearch('es'), /Reproducir vídeo de la asociación/);
});

test('the recovery preview is a native on-site video with real controls, not a renamed association film', () => {
  const html = renderPreview('en');
  assert.match(html, /<video/);
  assert.match(html, /controls=""/);
  assert.match(html, /playsInline=""/i);
  assert.match(html, /HomesProfessional property presentation preview/);
  assert.ok(html.includes(`src="${SITE_PREVIEW.src}"`));
  assert.ok(!html.includes('youtube') && !html.includes('<iframe') && !html.includes('<a '));
  for (const asset of [SITE_PREVIEW.src, SITE_PREVIEW.poster]) {
    const local = resolve('public', asset.slice(1));
    assert.ok(existsSync(local) && statSync(local).size > 1000, `Missing preview asset: ${asset}`);
  }
});

test('English and Spanish explain the provider restriction and offer recovery on the current page', () => {
  const en = renderResearch('en');
  const es = renderResearch('es');
  assert.match(en, /If YouTube asks you to sign in/);
  assert.match(en, /Play our on-site preview/);
  assert.match(es, /Si YouTube solicita iniciar sesión/);
  assert.match(es, /Ver nuestra vista previa/);
  assert.match(es, /2026-09-16/);
  assert.match(renderPreview('es'), /Vista previa ilustrativa/);
});
