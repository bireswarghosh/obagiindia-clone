import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requestHasValidPin } from '@/lib/cms-auth';
import {
  classifyMedia,
  magicBytesOk,
  putMediaToBlob,
} from '@/lib/obagi-blob-store';

export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
// Vercel serverless request-body ceiling — larger files must use /api/upload/token.
const SERVER_BODY_LIMIT = Math.floor(4.2 * 1024 * 1024);

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized — valid admin PIN required.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { success: false, error: 'Invalid upload payload.' },
        { status: 400 }
      );
    }
    const file = formData.get('file') as File | null;
    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const kind = classifyMedia(file.type, file.name);
    if (!kind) {
      return NextResponse.json(
        { success: false, error: `Unsupported file type (${file.type || 'unknown'}). Use JPEG/PNG/WebP/AVIF/GIF or MP4/WebM.` },
        { status: 415 }
      );
    }

    const limit = kind === 'video' ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (file.size > limit) {
      return NextResponse.json(
        { success: false, error: `File too large (${(file.size / 1048576).toFixed(1)} MB). Max ${limit / 1048576} MB for ${kind}.` },
        { status: 413 }
      );
    }
    // Route large files to the direct-to-Blob flow (bypasses the 4.5 MB body cap).
    if (file.size > SERVER_BODY_LIMIT) {
      return NextResponse.json(
        {
          success: false,
          error: 'USE_CLIENT_UPLOAD',
          message: 'File exceeds the secure server-upload size — retry via direct Blob upload.',
        },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!magicBytesOk(buffer, file.type)) {
      return NextResponse.json(
        { success: false, error: 'File content does not match its declared type.' },
        { status: 422 }
      );
    }

    // 1. Durable Blob store (survives deploys; CDN-served for speed)
    const blobUrl = await putMediaToBlob(file.name, buffer, file.type);
    if (blobUrl) {
      return NextResponse.json({
        success: true,
        provider: 'vercel-blob',
        url: blobUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        kind,
      });
    }

    // 2. Local fallback (dev / no Blob token) — real file, never a data-URL.
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const cleanName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '_');
      const filename = `${Date.now()}-${cleanName}`;
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
      return NextResponse.json({
        success: true,
        provider: 'local',
        url: `/uploads/${filename}`,
        name: file.name,
        size: file.size,
        type: file.type,
        kind,
      });
    } catch (writeErr: any) {
      return NextResponse.json(
        { success: false, error: `Upload failed on this host (${writeErr?.message || 'storage unavailable'}). Configure BLOB_READ_WRITE_TOKEN for durable uploads.` },
        { status: 507 }
      );
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
