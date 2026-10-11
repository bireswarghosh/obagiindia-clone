// Audit part 5: (a) all 4 marquee copies' inner HTML, (b) video/testimonial
// sibling check, (c) loose bg image search per section.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');

// (a) marquee copies
let idx = 0, n = 0;
while ((idx = html.indexOf('data-testid="marquee-item-text"', idx)) !== -1 && n < 6) {
  console.log(`--- marquee copy ${n} at ${idx}:`);
  console.log(JSON.stringify(html.slice(idx, idx + 700)));
  idx += 10; n++;
}

// (b) sibling check: div balance between vidStart and testiStart
const vSec = html.indexOf('<section id="comp-mlau06ju"');
const idVid = html.indexOf('id="comp-mlau0bjm"', vSec);
const vidStart = html.lastIndexOf('<div', idVid);
const idTesti = html.indexOf('id="comp-mlau0bkp"', vSec);
const testiStart = html.lastIndexOf('<div', idTesti);
const slice = html.slice(vidStart, testiStart);
const opens = (slice.match(/<div[\s>]/g) || []).length;
const closes = (slice.match(/<\/div>/g) || []).length;
console.log('\nvid slice div opens:', opens, 'closes:', closes, '(equal=siblings, safe to cut)');
console.log('vidStart tag:', JSON.stringify(html.slice(vidStart, vidStart + 160)));
console.log('testiStart tag:', JSON.stringify(html.slice(testiStart, testiStart + 160)));
// section opening tag
const secTagEnd = html.indexOf('>', html.indexOf('<section id="comp-mlau06ju"')) + 1;
console.log('section open tag:', JSON.stringify(html.slice(vSec, secTagEnd)));
// what closes the section? find matching </section> for comp-mlau06ju
const secClose = html.indexOf('</section>', vSec);
console.log('section byte span:', vSec, '->', secClose + 11, 'contains testimonial Megan Brown:',
  html.slice(vSec, secClose).includes('Megan Brown'));

// (c) loose: any 'background-image' occurrences at all?
const bis = [...html.matchAll(/background-image\s*:\s*url\(([^)]{0,80})/g)];
console.log('\nbackground-image url( count:', bis.length);
[...new Set(bis.map((m) => m[1].slice(0, 60)))].slice(0, 10).forEach((u) => console.log('  ', u));
// data-image-info uris near bgLayers ids (bg via wix imageInfo JSON)
for (const m of html.matchAll(/id="(bgLayers_[^"]+)"[\s\S]{0,1500}?imageData&quot;:&quot;uri&quot;:&quot;([^&"]+)/g)) {
  console.log('BGMEDIA', m[1], '->', m[2].slice(0, 60));
}
