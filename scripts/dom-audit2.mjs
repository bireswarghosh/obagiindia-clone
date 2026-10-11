// Deep DOM audit part 2: contexts for unmapped slots + served-page check.
import { readFileSync } from 'fs';

const html = readFileSync('public/obagi.html', 'utf8');
const ctx = (idx, n = 300) => JSON.stringify(html.slice(Math.max(0, idx - n), idx + n));

// 1. marquee-item-text spans: how many copies?
const mt = [...html.matchAll(/data-testid="marquee-item-text"/g)];
console.log('MARQUEE_TEXT_SPANS:', mt.length);
const munit = html.indexOf('data-testid="marquee-unit"');
console.log('marquee-unit ctx:', ctx(munit, 200));

// 2. bgLayers divs that actually contain a background-image url(
const bgs = [...html.matchAll(/<div\s+id="(bgLayers_[^"]+)"[^>]*>/g)];
console.log('BGLAYERS_WITH_BGURL:');
for (const m of bgs) {
  const tag = m[0];
  const hasUrl = /url\(/i.test(tag);
  // also check inner style tag? just report tag
  if (hasUrl) console.log('  HAS-URL', m[1], '::', JSON.stringify(tag.slice(0, 300)));
}
console.log('(only HAS-URL lines shown above)');

// 3. unmapped images context
for (const kw of ['49dc6fa64d1d4175a6c782c81c6b7a60', '958d8b59c22f449990b3c2a75c660389', 'CEO.jpg', 'Hydration-HydrateLuxe']) {
  const i = html.indexOf(kw);
  console.log(`IMGCTX ${kw}:`, i === -1 ? 'ABSENT' : ctx(i, 400));
}

// 4. social icons context (first one)
console.log('SOCIALCTX:', ctx(html.indexOf('11062b_ca1d837ce7194421b781ee7384061a8e'), 500));

// 5. SUBSCRIBE button + consent text candidates
const si = html.indexOf('SUBSCRIBE');
console.log('SUBSCRIBECTX:', ctx(si, 400));
for (const kw of ['consent', 'agree to receive', 'opt-in', 'opt in', 'unsubscribe']) {
  console.log(`CONSENTKW ${kw}:`, html.toLowerCase().includes(kw.toLowerCase()) ? 'PRESENT' : 'absent');
}

// 6. header strip labels
for (const kw of ['Brought to you in India', 'Find Obagi', 'Skip to', 'id="comp-lw3c3n7z_r_comp-lw3c38vb"']) {
  const i = html.indexOf(kw);
  console.log(`HDR ${kw}:`, i === -1 ? 'ABSENT' : ctx(i, 350));
}
// search / menu buttons
const sm = [...html.matchAll(/aria-label="([^"]*(?i:search|menu)[^"]*)"/g)].slice(0, 10);
console.log('SEARCH/MENU aria-labels:', sm.map((m) => m[1]));

// 7. legal links labels context
const li = html.indexOf('Privacy Policy');
console.log('LEGALCTX:', ctx(li, 500));

// 8. is award video inside the patcher-replaced obsolete range?
const startObs = html.indexOf('<section id="comp-mlau06ju"');
const endObs = html.indexOf('<section id="comp-ml6nay6u_r_comp-ljcmlawf"');
const vidIdx = html.indexOf('comp-mlau0bjm_video');
console.log('OBSOLETE_RANGE:', startObs, '->', endObs, 'VIDEO_AT:', vidIdx,
  vidIdx > startObs && vidIdx < endObs ? 'VIDEO INSIDE REPLACED RANGE (patcher no-op risk!)' : 'video outside range');
const nlBg = html.indexOf('bgLayers_comp-lx8nvywg');
console.log('NEWSLETTER_BG_AT:', nlBg, nlBg > startObs && nlBg < endObs ? 'INSIDE REPLACED RANGE!' : 'outside range');
