// ===========================================================================
// src/drive_saver.js
// Step 5: Upload every final image, design export, and post-copy JSON into a
// Google Drive folder named "CarlosRE Social Automation" (created if missing),
// organized into dated YYYY-MM-DD subfolders. Uses the official googleapis
// package with OAuth2. The root folder ID is persisted to .env after the first
// run so it is reused. On any Drive failure, keep local copies and continue.
// ===========================================================================

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { google } from 'googleapis';
import { config } from '../config/config.js';
import { logger, isoDate, fileExists } from './utils.js';

// ---- OAuth2 client --------------------------------------------------------

async function loadOAuthClient() {
  if (!fileExists(config.drive.credentialsPath)) {
    throw new Error(
      `Google OAuth credentials not found at ${config.drive.credentialsPath}. ` +
        'Download an OAuth client JSON from https://console.cloud.google.com/apis/credentials ' +
        'and place it there (or set GOOGLE_OAUTH_CREDENTIALS).',
    );
  }
  const raw = JSON.parse(await fsp.readFile(config.drive.credentialsPath, 'utf8'));
  const creds = raw.installed || raw.web;
  if (!creds) throw new Error('OAuth credentials JSON missing "installed"/"web" block.');

  const redirectUri = (creds.redirect_uris && creds.redirect_uris[0]) || 'urn:ietf:wg:oauth:2.0:oob';
  const client = new google.auth.OAuth2(creds.client_id, creds.client_secret, redirectUri);

  if (fileExists(config.drive.tokenPath)) {
    const token = JSON.parse(await fsp.readFile(config.drive.tokenPath, 'utf8'));
    client.setCredentials(token);
    return client;
  }

  // One-time interactive consent flow.
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: config.drive.scopes,
  });
  logger.warn('Google Drive needs one-time authorization.');
  output.write(
    `\n  1. Open this URL in your browser and approve access:\n\n     ${authUrl}\n\n` +
      '  2. Copy the authorization code Google gives you and paste it below.\n\n',
  );
  const rl = readline.createInterface({ input, output });
  const code = (await rl.question('  Authorization code: ')).trim();
  rl.close();

  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);
  await fsp.mkdir(path.dirname(config.drive.tokenPath), { recursive: true });
  await fsp.writeFile(config.drive.tokenPath, JSON.stringify(tokens, null, 2), 'utf8');
  logger.ok(`Saved Drive token -> ${path.relative(config.root, config.drive.tokenPath)}`);
  return client;
}

// ---- Folder helpers -------------------------------------------------------

async function findOrCreateFolder(drive, name, parentId = null) {
  const safeName = name.replace(/'/g, "\\'");
  const q =
    `mimeType='application/vnd.google-apps.folder' and trashed=false and name='${safeName}'` +
    (parentId ? ` and '${parentId}' in parents` : '');
  const res = await drive.files.list({ q, fields: 'files(id,name)', spaces: 'drive' });
  if (res.data.files && res.data.files.length) return res.data.files[0].id;

  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      ...(parentId ? { parents: [parentId] } : {}),
    },
    fields: 'id',
  });
  return created.data.id;
}

/** Persist DRIVE_ROOT_FOLDER_ID back into .env so it is reused next run. */
async function persistRootFolderId(folderId) {
  const envPath = path.join(config.root, '.env');
  if (!fileExists(envPath)) return;
  try {
    let text = await fsp.readFile(envPath, 'utf8');
    if (/^DRIVE_ROOT_FOLDER_ID=.*$/m.test(text)) {
      text = text.replace(/^DRIVE_ROOT_FOLDER_ID=.*$/m, `DRIVE_ROOT_FOLDER_ID=${folderId}`);
    } else {
      text += `\nDRIVE_ROOT_FOLDER_ID=${folderId}\n`;
    }
    await fsp.writeFile(envPath, text, 'utf8');
    logger.ok(`Persisted DRIVE_ROOT_FOLDER_ID to .env (${folderId})`);
  } catch (err) {
    logger.warn(`Could not persist folder ID to .env: ${err.message}`);
  }
}

function guessMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.json': 'application/json',
    }[ext] || 'application/octet-stream'
  );
}

async function uploadFile(drive, filePath, folderId) {
  const name = path.basename(filePath);
  const res = await drive.files.create({
    requestBody: { name, parents: [folderId] },
    media: { mimeType: guessMime(filePath), body: fs.createReadStream(filePath) },
    fields: 'id,name,webViewLink',
  });
  return res.data;
}

// ---- Public entry point ---------------------------------------------------

/**
 * Upload artifacts to Drive. Never throws — returns a status object so the run
 * continues even if Drive is unavailable.
 *
 * @param {object} args
 * @param {string|null} args.imagePath
 * @param {string|null} args.exportPath  local Canva export, if downloaded
 * @param {string} args.copyJsonPath     local post-copy JSON
 * @returns {Promise<{ok:boolean, folderId?:string, dateFolderId?:string,
 *   folderLink?:string, uploaded:object[], error?:string}>}
 */
export async function saveToDrive({ imagePath, exportPath, copyJsonPath }) {
  try {
    logger.step('Uploading artifacts to Google Drive...');
    const auth = await loadOAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    // Root folder — reuse the cached ID if we have one.
    let rootId = config.drive.rootFolderId;
    if (rootId) {
      try {
        await drive.files.get({ fileId: rootId, fields: 'id' });
      } catch {
        rootId = '';
      }
    }
    if (!rootId) {
      rootId = await findOrCreateFolder(drive, config.drive.rootFolderName);
      await persistRootFolderId(rootId);
    }

    // Dated subfolder.
    const dateFolderId = await findOrCreateFolder(drive, isoDate(), rootId);

    const uploaded = [];
    for (const filePath of [imagePath, exportPath, copyJsonPath].filter(Boolean)) {
      if (!fileExists(filePath)) continue;
      const meta = await uploadFile(drive, filePath, dateFolderId);
      uploaded.push(meta);
      logger.ok(`Uploaded ${meta.name}`);
    }

    const folderLink = `https://drive.google.com/drive/folders/${dateFolderId}`;
    logger.ok(`Drive folder: ${folderLink}`);
    return { ok: true, folderId: rootId, dateFolderId, folderLink, uploaded };
  } catch (err) {
    logger.warn(`Google Drive save failed: ${err.message}. Local copies kept in output/.`);
    return { ok: false, uploaded: [], error: err.message };
  }
}

export default { saveToDrive };
