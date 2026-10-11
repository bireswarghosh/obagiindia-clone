import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requestHasValidPin } from '@/lib/cms-auth';

const BLOB_PATH = 'cms/obagi-enquiries.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'enquiries.json');
const MAX_ENQUIRIES = 500;

function hasBlobToken(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readLocal(): Promise<unknown[]> {
  try {
    if (!fs.existsSync(LOCAL_FILE)) return [];
    const parsed = JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(list: unknown[]): Promise<void> {
  try {
    const dir = path.dirname(LOCAL_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[enquiry] local write failed:', err);
  }
}

async function loadAll(): Promise<unknown[]> {
  if (hasBlobToken()) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
      const hit = blobs.find((b) => b.pathname === BLOB_PATH) || blobs[0];
      if (hit?.url) {
        const res = await fetch(hit.url, { cache: 'no-store' });
        if (res.ok) {
          const parsed = await res.json();
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (err) {
      console.warn('[enquiry] blob load failed:', err);
    }
  }
  return readLocal();
}

async function saveAll(list: unknown[]): Promise<boolean> {
  const trimmed = list.slice(0, MAX_ENQUIRIES);
  await writeLocal(trimmed);
  if (hasBlobToken()) {
    try {
      const { put } = await import('@vercel/blob');
      await put(BLOB_PATH, JSON.stringify(trimmed), {
        access: 'public',
        contentType: 'application/json',
        allowOverwrite: true,
      });
      return true;
    } catch (err) {
      console.warn('[enquiry] blob save failed:', err);
      return false;
    }
  }
  return true;
}

function sanitizeBody(body: Record<string, unknown>): Record<string, string> {
  const allowed = [
    'name',
    'designation',
    'organization',
    'city',
    'state',
    'enquiryType',
    'message',
    'email',
    'phone',
    'source',
  ];
  const out: Record<string, string> = {};
  for (const key of allowed) {
    const raw = body[key];
    if (typeof raw === 'string') {
      out[key] = raw.trim().slice(0, 2000);
    }
  }
  return out;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const clean = sanitizeBody(body || {});
    if (!clean.name || !clean.organization || !clean.city || !clean.enquiryType || !clean.message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields', success: false },
        { status: 400 }
      );
    }
    if (!clean.state) {
      return NextResponse.json(
        { error: 'State is required', success: false },
        { status: 400 }
      );
    }

    const enquiryRecord: Record<string, string> = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      ...clean,
    };

    const current = await loadAll();
    current.unshift(enquiryRecord);
    const persisted = await saveAll(current);

    if (!persisted && hasBlobToken()) {
      // Blob is the production store — do not claim success if it failed.
      return NextResponse.json(
        { error: 'Could not persist enquiry. Please try again.', success: false },
        { status: 500 }
      );
    }

    console.log('[ENQUIRY] Saved:', enquiryRecord.id, enquiryRecord.enquiryType, enquiryRecord.name);

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been saved successfully. Our team will contact you shortly.',
      id: enquiryRecord.id,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('[ENQUIRY] Error processing enquiry:', error);
    return NextResponse.json(
      { error: message, success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  if (!requestHasValidPin(req)) {
    return NextResponse.json(
      { error: 'Unauthorized', success: false },
      { status: 401 }
    );
  }
  try {
    const enquiries = await loadAll();
    return NextResponse.json({ success: true, enquiries });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message, success: false }, { status: 500 });
  }
}
