'use client';

/**
 * Browser-side CMS helpers: PIN plumbing + upload with direct-to-Blob
 * fallback for files that exceed the serverless body limit.
 * Draft preview values are NEVER treated as published truth — only a
 * successful section PATCH publishes.
 */

const PIN_KEY = 'obagi_cms_pin';

export function getCmsPin(): string {
  try {
    return sessionStorage.getItem(PIN_KEY) || '';
  } catch {
    return '';
  }
}

export function setCmsPin(pin: string): void {
  try {
    if (pin) sessionStorage.setItem(PIN_KEY, pin);
    else sessionStorage.removeItem(PIN_KEY);
  } catch {}
}

export function cmsHeaders(extra?: Record<string, string>): Record<string, string> {
  return { 'x-cms-pin': getCmsPin(), ...(extra || {}) };
}

export async function uploadCmsFile(
  file: File,
  provider?: string
): Promise<{ url: string; kind: string }> {
  const formData = new FormData();
  formData.append('file', file);
  if (provider) formData.append('provider', provider);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: cmsHeaders(),
    body: formData,
  });
  const json = await res.json().catch(() => ({} as any));

  if (res.ok && json?.success && json.url) {
    return { url: json.url as string, kind: (json.kind as string) || '' };
  }

  // Large files: direct browser → Blob upload (token stays server-side).
  if (json?.error === 'USE_CLIENT_UPLOAD' || res.status === 413) {
    const direct = await uploadDirectToBlob(file);
    if (direct) return direct;
  }

  throw new Error(json?.error || json?.message || `Upload failed (${res.status}).`);
}

async function uploadDirectToBlob(file: File): Promise<{ url: string; kind: string } | null> {
  const tokRes = await fetch('/api/upload/token', {
    method: 'POST',
    headers: cmsHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ filename: file.name }),
  });
  const tokJson = await tokRes.json().catch(() => ({} as any));
  if (!tokRes.ok || !tokJson?.success || !tokJson.clientToken || !tokJson.pathname) {
    throw new Error(tokJson?.error || 'Direct upload unavailable — configure BLOB_READ_WRITE_TOKEN.');
  }
  const { upload } = await import('@vercel/blob/client');
  const blob = await upload(tokJson.pathname as string, file, {
    access: 'public',
    contentType: file.type || 'application/octet-stream',
    clientToken: tokJson.clientToken as string,
  } as any);
  if (!blob?.url) return null;
  const kind = (file.type || '').startsWith('video/') ? 'video' : 'image';
  return { url: blob.url, kind };
}
