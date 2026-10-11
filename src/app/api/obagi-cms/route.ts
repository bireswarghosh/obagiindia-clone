import { NextResponse } from 'next/server';
import { getObagiHomeContent, saveObagiHomeContent } from '@/lib/obagi-cms';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Public read stays open — page content itself is public.
    // Admin mutations below always require the PIN.
    const data = await getObagiHomeContent();
    return NextResponse.json(
      { success: true, data },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

function unauthorized() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized — valid admin PIN required.' },
    { status: 401 }
  );
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) return unauthorized();
  try {
    const body = await request.json();
    if (body && typeof body === 'object' && (body as any)._verifyOnly) {
      return NextResponse.json({ success: true });
    }
    const updated = await saveObagiHomeContent(body);
    return NextResponse.json(
      { success: true, data: updated },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH: section-scoped upsert — only the keys present in the body are merged.
// Saving section 2 can never reset section 1: absent keys are left untouched.
export async function PATCH(request: Request) {
  if (!requestHasValidPin(request)) return unauthorized();
  try {
    const patch = await request.json();
    if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
      return NextResponse.json(
        { success: false, error: 'PATCH body must be a section object.' },
        { status: 400 }
      );
    }
    if ((patch as any).meta) delete (patch as any).meta; // version is server-owned
    const updated = await saveObagiHomeContent(patch);
    return NextResponse.json(
      { success: true, data: updated },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
