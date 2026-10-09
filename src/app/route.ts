import fs from 'fs';
import path from 'path';
import { getObagiHomeContent } from '@/lib/obagi-cms';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let htmlPath = path.join(process.cwd(), 'public', 'obagi.html');
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'Obagi India _ obagi products.html');
    }
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Fetch active CMS content
    const cmsData = getObagiHomeContent();

    // Inject CMS data and synchronizer script before </body>
    const injection = `
      <script id="__OBAGI_CMS_DATA__" type="application/json">${JSON.stringify(cmsData)}</script>
      <script src="/obagi-cms-sync.js"></script>
    `;

    if (html.includes('</body>')) {
      html = html.replace('</body>', `${injection}</body>`);
    } else {
      html += injection;
    }

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error serving Obagi homepage:', error);
    return new Response(`<h1>Failed to load Obagi page</h1><p>${error?.message}</p>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}
