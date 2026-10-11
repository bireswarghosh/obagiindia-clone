import fs from 'fs';
import path from 'path';
import { getObagiHomeContent } from '@/lib/obagi-cms';
import { patchHtmlWithCms } from '@/lib/obagi-html-patcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let htmlPath = path.join(process.cwd(), 'public', 'obagi.html');
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join(process.cwd(), 'Obagi India _ obagi products.html');
    }
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Canonical CMS content is painted on the SERVER before first byte —
    // the browser receives final text/image/video attributes in the initial
    // HTML, so saved values can never flash from hard-coded defaults.
    const cmsData = await getObagiHomeContent();
    html = patchHtmlWithCms(html, cmsData);

    // Preload the hero poster for a sub-second first viewport (non-visual).
    const heroPreload = cmsData.hero?.heroImage
      ? `<link rel="preload" as="image" href="${cmsData.hero.heroImage}" fetchpriority="high">`
      : '';
    // Interactivity only (carousel + enquiry flow). Contains ZERO CMS-apply
    // logic by design — it can never overwrite server-painted content.
    const tail = `${heroPreload}<script src="/obagi-cms-sync.js" defer></script>`;

    if (html.includes('</head>')) {
      html = html.replace('</head>', `${tail}</head>`);
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', `${tail}</body>`);
    } else {
      html += tail;
    }

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, max-age=0, must-revalidate',
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
