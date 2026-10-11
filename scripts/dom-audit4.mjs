// Audit part 4: (a) inner images/urls per bgLayers section, (b) video section
// inner structure (video vs testimonial), (c) exact ticker strings.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');

// (a) for each bgLayers id, look at the following 3000 chars for url( or <img>
const ids = [...new Set([...html.matchAll(/id="(bgLayers_[^"]+)"/g)].map((m) => m[1]))];
for (const id of ids) {
  const i = html.indexOf(`id="${id}"`);
  const win = html.slice(i, i + 3000);
  const urls = [...win.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].slice(0, 70));
  const imgs = [...win.matchAll(/<img\b[^>]*alt="([^"]*)"[^>]*src="([^"]*)"/gi)]
    .map((m) => `${m[1].slice(0, 30)} :: ${m[2].slice(0, 60)}`);
  if (urls.length || imgs.length) {
    console.log('BGSEC', id);
    urls.slice(0, 4).forEach((u) => console.log('   url:', u));
    imgs.slice(0, 4).forEach((t) => console.log('   img:', t));
  }
}

// (b) video section inner structure
const vStart = html.indexOf('<section id="comp-mlau06ju"');
const vEnd = html.indexOf('</section>', html.indexOf('comp-mlau0bjm_video')) + 11;
console.log('\nVIDEO SECTION len:', vEnd - vStart);
// direct children divs with id comp-mlau
for (const m of html.slice(vStart, vStart + 60000).matchAll(/<(div|section)[^>]*id="(comp-mlau[^"]*)"[^>]*>/g)) {
  console.log('  child:', m[2], 'at+', m.index);
}
// where does testimonial text start relative to section start?
const testi = html.indexOf('Megan Brown', vStart);
console.log('testimonial at+:', testi - vStart, 'video at+:', html.indexOf('comp-mlau0bjm_video', vStart) - vStart);
// candidate split markers between video block and testimonial block
const probe = html.slice(vStart, vStart + 60000);
// find ids of comp-mlau0bkp / comp-mlau0bkw6 blocks
for (const kw of ['comp-mlau0bjm', 'comp-mlau0bkp', 'comp-mlau0bkw6']) {
  console.log(kw, 'first at+', html.indexOf(`id="${kw}"`, vStart) - vStart);
}

// (c) ticker strings: all 4 copies identical?
const tickers = [...html.matchAll(/data-testid="marquee-item-text"><span>([\s\S]*?)<\/span>/g)].map((m) => m[1]);
console.log('\nTICKER copies:', tickers.length, 'unique:', new Set(tickers).size);
if (tickers[0]) console.log('TICKER[0]:', JSON.stringify(tickers[0]));
