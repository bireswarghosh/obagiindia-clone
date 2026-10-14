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
    const heroPosterUrl = cmsData.hero?.heroVideoPoster || cmsData.hero?.backgroundImage || 'https://static.wixstatic.com/media/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg/v1/fill/w_1265,h_585,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg';
    const heroPreload = `<link rel="preload" as="image" href="${heroPosterUrl}" fetchpriority="high">`;
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
