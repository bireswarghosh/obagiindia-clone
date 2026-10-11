import { NextResponse } from 'next/server';
import { requestHasValidPin } from '@/lib/cms-auth';
import { createClientUploadToken } from '@/lib/obagi-blob-store';

export const dynamic = 'force-dynamic';

/**
 * Issues a short-lived, single-pathname Blob client-upload token for large
 * files (esp. videos) that exceed the ~4.5 MB serverless body limit.
 * The BLOB_READ_WRITE_TOKEN never leaves the server.
 * Body: { "filename": "clip.mp4" }
 */
export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized — valid admin PIN required.' },
      { status: 401 }
    );
  }
  let filename = '';
  try {
    const body = await request.json();
    filename = String((body as any)?.filename || '');
  } catch {}
  const clean = filename.replace(/[^a-zA-Z0-9.\-]/g, '_').slice(-120) || 'upload.bin';
  const pathname = `cms-media/home/${Date.now()}-${clean}`;
  const clientToken = await createClientUploadToken(pathname);
  if (!clientToken) {
    return NextResponse.json(
      { success: false, error: 'Blob store not configured (BLOB_READ_WRITE_TOKEN missing).' },
      { status: 503 }
    );
  }
  return NextResponse.json({ success: true, clientToken, pathname });
}
