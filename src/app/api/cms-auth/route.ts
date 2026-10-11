import { NextResponse } from 'next/server';
import { verifyPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

/** Verifies the admin PIN without ever revealing it to the browser. */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (verifyPin((body as any)?.pin)) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { success: false, error: 'Incorrect PIN.' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ success: false, error: 'Auth failed.' }, { status: 500 });
  }
}
