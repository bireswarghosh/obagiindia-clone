import { NextResponse } from 'next/server';
import { getSiteData, updateSiteData } from '@/lib/db';

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSiteData(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}
