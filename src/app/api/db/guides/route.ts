import { NextResponse } from 'next/server';
import { getAllGuides, getGuideBySlug, upsertGuide } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const guide = await getGuideBySlug(slug);
      if (!guide) {
        return NextResponse.json({ success: false, error: 'Guide not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, guide });
    }
    const guides = await getAllGuides();
    return NextResponse.json({ success: true, count: guides.length, guides });
  } catch (error: any) {
    console.error('Error fetching guides:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: 'Title and Slug required' }, { status: 400 });
    }
    const id = body.id || body.slug;
    const updated = await upsertGuide({
      ...body,
      id,
    });
    return NextResponse.json({ success: true, guide: updated });
  } catch (error: any) {
    console.error('Error saving guide:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
