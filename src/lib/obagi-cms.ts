import fs from 'fs';
import path from 'path';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';
import {
  loadContentJsonFromBlob,
  saveContentJsonToBlob,
} from './obagi-blob-store';

const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'obagi-home-content.json');

import { deepMerge } from './deep-merge';
export { deepMerge };

let memoryCache: ObagiHomeContent | null = null;
let blobCheckedThisBoot = false;
let blobAvailable: boolean | null = null;
// Timestamp of last failed Blob write — saves pause Blob attempts for 60s
// after a failure so a downed Blob never slows every save.
let lastBlobErrorAt = 0;
// Serializes read-modify-write so two section saves can never interleave.
let writeQueue: Promise<unknown> = Promise.resolve();

function ensureLocalFile(): void {
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    // Seed ONLY when the record truly does not exist — never overwrite.
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      fs.writeFileSync(
        LOCAL_DATA_FILE,
        JSON.stringify({ ...defaultObagiHomeContent, meta: freshMeta(1) }, null, 2),
        'utf8'
      );
    }
  } catch {
    // Read-only serverless FS — Blob/memory carry the truth.
  }
}

function freshMeta(version: number) {
  return {
    version,
    updatedAt: new Date().toISOString(),
  };
}

function parseAndMerge(raw: string): ObagiHomeContent | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return deepMerge(defaultObagiHomeContent, parsed);
    }
  } catch (err) {
    console.error('[obagi-cms] corrupt content JSON, using defaults:', err);
  }
  return null;
}

/**
 * Canonical read. Truth order: memory -> Vercel Blob -> local file -> defaults.
 * Blob is consulted once per boot (then memory carries it) to keep TTFB <1ms.
 */
export async function getObagiHomeContent(): Promise<ObagiHomeContent> {
  if (memoryCache) return memoryCache;

  // 1. Durable cloud copy (survives Vercel deploys / /tmp wipes).
  // Absent blob = empty store (the first save creates it) — only a real
  // transport failure marks blob unavailable for this boot.
  if (!blobCheckedThisBoot && process.env.BLOB_READ_WRITE_TOKEN) {
    blobCheckedThisBoot = true;
    try {
      const blobJson = await loadContentJsonFromBlob();
      if (blobJson) {
        const merged = parseAndMerge(blobJson);
        if (merged) {
          blobAvailable = true;
          memoryCache = merged;
          // Warm the local file cache (best-effort, ignored on serverless)
          try {
            ensureLocalFile();
            fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(merged, null, 2), 'utf8');
          } catch {}
          return merged;
        }
      }
    } catch (err) {
      console.warn('[obagi-cms] blob unavailable this boot:', err);
      blobAvailable = false;
    }
  }

  // 2. Local file
  try {
    ensureLocalFile();
    if (fs.existsSync(LOCAL_DATA_FILE)) {
      const merged = parseAndMerge(fs.readFileSync(LOCAL_DATA_FILE, 'utf8'));
      if (merged) {
        memoryCache = merged;
        return merged;
      }
    }
  } catch (err) {
    console.error('[obagi-cms] local read failed:', err);
  }

  if (memoryCache) return memoryCache;
  return deepMerge(defaultObagiHomeContent, {});
}

/**
 * Section-scoped save. `patch` must contain ONLY the section(s) being saved —
 * every other section is carried over untouched from the latest canonical read.
 */
export function saveObagiHomeContent(
  newContent: Partial<ObagiHomeContent>
): Promise<ObagiHomeContent> {
  const task = writeQueue.then(async () => {
    const current = await getObagiHomeContent();
    const merged = deepMerge(current, newContent);
    const nextVersion = (current.meta?.version || 0) + 1;
    merged.meta = freshMeta(nextVersion);

    const json = JSON.stringify(merged, null, 2);

    // Durable write first (Blob), then local cache — both best-effort.
    // Always attempted when a token exists: an absent blob is CREATED here
    // (this is what breaks the empty-store deadlock). Paused 60s after a
    // failure so a downed Blob doesn't slow every save.
    if (process.env.BLOB_READ_WRITE_TOKEN && Date.now() - lastBlobErrorAt > 60_000) {
      const url = await saveContentJsonToBlob(json).catch(() => null);
      if (url) {
        blobAvailable = true;
        lastBlobErrorAt = 0;
      } else {
        lastBlobErrorAt = Date.now();
      }
    }
    try {
      ensureLocalFile();
      const tmp = `${LOCAL_DATA_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tmp, json, 'utf8');
      fs.renameSync(tmp, LOCAL_DATA_FILE);
    } catch (err) {
      console.warn('[obagi-cms] filesystem write failed, kept in memory:', err);
    }

    memoryCache = merged;
    return merged;
  });
  // Keep the queue alive even if one save fails.
  writeQueue = task.catch(() => undefined);
  return task;
}

/** Test/debug helper — never exposed to the browser. */
export function _resetMemoryCacheForTests(): void {
  memoryCache = null;
  blobCheckedThisBoot = false;
}
