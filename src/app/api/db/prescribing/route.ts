import { NextResponse } from 'next/server';
import { getAllPrescribingInfo, upsertPrescribingInfo } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const list = await getAllPrescribingInfo();
    return NextResponse.json({ success: true, count: list.length, prescribing: list });
  } catch (error: any) {
    console.error('Error fetching prescribing info:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.brand_name) {
      return NextResponse.json({ success: false, error: 'Brand name required' }, { status: 400 });
    }
    const id = body.id || `pi_${Date.now()}`;
    const slug = body.slug || id;
    const updated = await upsertPrescribingInfo({
      ...body,
      id,
      slug,
    });
    return NextResponse.json({ success: true, prescribing: updated });
  } catch (error: any) {
    console.error('Error saving prescribing info:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
