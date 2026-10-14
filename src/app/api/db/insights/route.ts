import { NextResponse } from 'next/server';
import { getAllInsights, getInsightBySlug, upsertInsight } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (slug) {
      const insight = await getInsightBySlug(slug);
      if (!insight) {
        return NextResponse.json({ success: false, error: 'Insight not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, insight });
    }
    const insights = await getAllInsights();
    return NextResponse.json({ success: true, count: insights.length, insights });
  } catch (error: any) {
    console.error('Error fetching insights:', error);
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
    const updated = await upsertInsight({
      ...body,
      id,
    });
    return NextResponse.json({ success: true, insight: updated });
  } catch (error: any) {
    console.error('Error saving insight:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
