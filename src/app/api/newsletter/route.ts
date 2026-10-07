import { NextResponse } from 'next/server';
import { addSubscriber, getSiteData } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const result = addSubscriber(email);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Subscription failed.' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get('format');
  const data = getSiteData();
  const subscribers = data.newsletter.subscribers || [];

  if (format === 'csv') {
    const headers = 'ID,Email,Subscribed Date\n';
    const rows = subscribers
      .map(s => `"${s.id}","${s.email}","${s.date}"`)
      .join('\n');
    const csv = headers + rows;

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="ryan-dermaceutics-subscribers.csv"',
      },
    });
  }

  return NextResponse.json({ count: subscribers.length, subscribers });
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const { deleteSubscriber } = await import('@/lib/db');
    const result = deleteSubscriber(id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete subscriber.' },
      { status: 400 }
    );
  }
}
