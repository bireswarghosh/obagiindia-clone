// Audit part 6: full section map with positions + locate testimonial container.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');
const sections = [...html.matchAll(/<section\s+id="([^"]+)"/g)].map((m) => ({ id: m[1], at: m.index }));
console.log('TOTAL SECTIONS:', sections.length);
sections.forEach((s, i) => {
  const end = i + 1 < sections.length ? sections[i + 1].at : html.length;
  console.log(`  [${i}] ${s.id} at ${s.at} len ${end - s.at}`);
});
// where is Megan Brown exactly?
const mb = html.indexOf('Megan Brown');
console.log('\nMegan Brown at', mb);
// nearest section start before it
let owner = null;
for (const s of sections) if (s.at < mb) owner = s;
console.log('owner section:', owner.id, 'at', owner.at);
// what element holds the testimonial? nearest id= before mb
const idBefore = html.lastIndexOf('id="comp-', mb);
console.log('nearest comp id:', JSON.stringify(html.slice(idBefore, idBefore + 80)));
// video element block
const vv = html.indexOf('id="comp-mlau0bjm_video"');
console.log('\nvideo tag at', vv, 'owner section check:', sections.filter((s) => s.at < vv).pop().id);
// testimonial container: find <div id="comp-mlau0bkp" .. matching close via balance
function balancedClose(from) {
  const tagRe = /<\/?div[\s>]/g;
  tagRe.lastIndex = from;
  let depth = 0, m;
  while ((m = tagRe.exec(html))) {
    if (m[0][1] === '/') { depth--; if (depth === 0) return m.index + 6; }
    else depth++;
  }
  return -1;
}
const bkpOpen = html.indexOf('<div id="comp-mlau0bkp"');
const bkpClose = balancedClose(bkpOpen);
console.log('bkp block:', bkpOpen, '->', bkpClose, 'len', bkpClose - bkpOpen);
console.log('bkp text sample:', JSON.stringify(html.slice(bkpOpen, bkpOpen + 200).replace(/<[^>]+>/g, ' ').slice(0, 120)));
const bkw6Open = html.indexOf('<div id="comp-mlau0bkw6"');
console.log('bkw6 block:', bkw6Open, '->', balancedClose(bkw6Open));
