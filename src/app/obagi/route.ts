import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let htmlPath = path.join(process.cwd(), 'public', 'obagi.html');
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'Obagi India _ obagi products.html');
    }
    const html = fs.readFileSync(htmlPath, 'utf8');

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    console.error('Error serving untouched Obagi page:', error);
    return new Response(`<h1>Failed to load Obagi page</h1><p>${error?.message}</p>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
