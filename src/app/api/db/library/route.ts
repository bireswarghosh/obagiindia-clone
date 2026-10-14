import { NextResponse } from 'next/server';
import { getReferenceLibraryItems, upsertReferenceItem } from '@/lib/postgres';
import { requestHasValidPin } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'category' | 'topic' | undefined;
    const items = await getReferenceLibraryItems(type);
    return NextResponse.json({ success: true, count: items.length, items });
  } catch (error: any) {
    console.error('Error fetching reference library items:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!requestHasValidPin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized PIN' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.title || !body.slug || !body.item_type) {
      return NextResponse.json({ success: false, error: 'Title, slug and item_type required' }, { status: 400 });
    }
    const id = body.id || `${body.item_type}_${body.slug}`;
    const updated = await upsertReferenceItem({
      ...body,
      id,
    });
    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error('Error saving library item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
