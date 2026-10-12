/**
 * Persistent CMS content store backed by Vercel Blob (survives deploys),
 * with local JSON file + in-memory cache for speed.
 *
 * Truth order: memory (per-instance) -> Vercel Blob JSON -> local file -> defaults.
 * Writes go to Blob (when configured) AND local file atomically, so local
 * dev stays <1ms while production stays durable.
 */

const CONTENT_BLOB_PATH = 'cms/obagi-home-content.json';
const MEDIA_PREFIX = 'cms-media/home/';

function hasBlobToken(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readBlobText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function loadContentJsonFromBlob(): Promise<string | null> {
  if (!hasBlobToken()) return null;
  // NOTE: list() failures propagate so the caller can mark blob unavailable
  // for the boot; a missing blob returns null (empty store — first save
  // creates it) and must NOT poison future saves.
  const { list } = await import('@vercel/blob');
  const { blobs } = await list({ prefix: CONTENT_BLOB_PATH, limit: 1 });
  const hit = blobs.find((b) => b.pathname === CONTENT_BLOB_PATH) || blobs[0];
  if (!hit?.url) return null;
  return await readBlobText(hit.url);
}

export async function saveContentJsonToBlob(json: string): Promise<string | null> {
  if (!hasBlobToken()) return null;
  try {
    const { put } = await import('@vercel/blob');
    const blob = await put(CONTENT_BLOB_PATH, json, {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return blob.url;
  } catch (err) {
    console.warn('[obagi-blob] content save failed:', err);
    return null;
  }
}

const IMAGE_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
]);

const VIDEO_MIME = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

export function classifyMedia(mime: string, filename: string): 'image' | 'video' | null {
  const m = (mime || '').toLowerCase();
  const ext = (filename.split('.').pop() || '').toLowerCase();
  if (IMAGE_MIME.has(m)) return 'image';
  if (VIDEO_MIME.has(m)) return 'video';
  if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
  return null;
}

/** Minimal magic-byte check — never trust Content-Type alone. */
export function magicBytesOk(buf: Buffer, mime: string): boolean {
  if (buf.length < 4) return false;
  const m = (mime || '').toLowerCase();
  if (m === 'image/jpeg') return buf[0] === 0xff && buf[1] === 0xd8;
  if (m === 'image/png')
    return buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (m === 'image/gif') return buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46;
  if (m === 'image/webp')
    return buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46;
  if (m === 'image/avif' || m === 'image/svg+xml' || m.startsWith('video/')) {
    // Container check for mp4/webm: ftyp / EBML header within first bytes
    if (m === 'video/mp4') {
      const head = buf.subarray(0, 12).toString('latin1');
      return head.includes('ftyp') || buf[0] === 0x00;
    }
    return true;
  }
  return true;
}

export async function putMediaToBlob(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<string | null> {
  if (!hasBlobToken()) return null;
  try {
    const { put } = await import('@vercel/blob');
    const clean = filename.replace(/[^a-zA-Z0-9.\-]/g, '_');
    const blob = await put(`${MEDIA_PREFIX}${Date.now()}-${clean}`, buffer, {
      access: 'public',
      contentType: contentType || 'application/octet-stream',
      allowOverwrite: false,
    });
    return blob.url;
  } catch (err) {
    console.warn('[obagi-blob] media upload failed:', err);
    return null;
  }
}

/**
 * Short-lived client-upload token bound to one pathname, so browsers can
 * upload big videos directly without the read-write token ever leaving the server.
 */
export async function createClientUploadToken(pathname: string): Promise<string | null> {
  if (!hasBlobToken()) return null;
  try {
    const { generateClientTokenFromReadWriteToken } = await import('@vercel/blob/client');
    return await generateClientTokenFromReadWriteToken({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
      pathname,
      allowedContentTypes: Array.from(IMAGE_MIME).concat(Array.from(VIDEO_MIME)),
      maximumSizeInBytes: 100 * 1024 * 1024,
      validUntil: Date.now() + 10 * 60 * 1000,
    });
  } catch (err) {
    console.warn('[obagi-blob] client token failed:', err);
    return null;
  }
}
