import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CHUNK_SIZE = 1024 * 1024; // 1 MB chunks

/**
 * Progressive chunk-by-chunk video streaming API route.
 * Handles HTTP Range requests (206 Partial Content) so that videos
 * are pulled and streamed chunk-by-chunk instead of loading the entire
 * file into memory or waiting for full buffering.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get('url');

    if (!videoUrl) {
      return new NextResponse('Missing url parameter', { status: 400 });
    }

    // Determine target URL
    const targetUrl = decodeURIComponent(videoUrl);

    // Get client's requested byte range
    const rangeHeader = req.headers.get('range');

    // First do a HEAD or initial probe to get content length and content type
    const headRes = await fetch(targetUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
      },
    });

    const contentType = headRes.headers.get('content-type') || 'video/mp4';
    const totalLengthStr = headRes.headers.get('content-length');
    const totalLength = totalLengthStr ? parseInt(totalLengthStr, 10) : 0;

    if (!rangeHeader || !totalLength) {
      // If no range requested or total length unknown, pipe stream directly with chunked transfer
      const fullRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
        },
      });

      return new NextResponse(fullRes.body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Parse Range header (e.g., "bytes=0-", "bytes=1000-2000")
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : start + CHUNK_SIZE - 1;

    if (end >= totalLength) {
      end = totalLength - 1;
    }

    const chunkLength = end - start + 1;

    // Fetch only the requested chunk from upstream
    const chunkRes = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers.get('user-agent') || 'Mozilla/5.0',
        Range: `bytes=${start}-${end}`,
      },
    });

    const headers = new Headers();
    headers.set('Content-Range', `bytes ${start}-${end}/${totalLength}`);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Content-Length', chunkLength.toString());
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(chunkRes.body, {
      status: 206,
      statusText: 'Partial Content',
      headers,
    });
  } catch (err: any) {
    console.error('Error in video streaming API:', err);
    return new NextResponse(`Video streaming error: ${err.message}`, { status: 500 });
  }
}
