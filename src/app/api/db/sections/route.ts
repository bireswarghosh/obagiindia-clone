import { NextResponse } from 'next/server';
import { getPageSections, upsertPageSection } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';
    const sections = await getPageSections(page);
    return NextResponse.json({ success: true, page, sections });
  } catch (error: any) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { pageSlug, sectionKey, ...data } = body;
    if (!pageSlug || !sectionKey) {
      return NextResponse.json({ success: false, error: 'pageSlug and sectionKey required' }, { status: 400 });
    }
    const updated = await upsertPageSection(pageSlug, sectionKey, data);
    return NextResponse.json({ success: true, section: updated });
  } catch (error: any) {
    console.error('Error upserting section:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
