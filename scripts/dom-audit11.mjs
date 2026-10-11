// Audit part 11: products title target, about img full src, SUBSCRIBE/button,
// email input, Search/Menu aria counts, obagi-product img position/owner.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');
const secs = [...html.matchAll(/<section\s+id="([^"]+)"/g)].map((m) => ({ id: m[1], at: m.index }));
const owner = (pos) => { const s = secs.filter((x) => x.at < pos).pop(); return s ? s.id : '(pre-sections)'; };

// products section [10] headings: any h1/h2/p with title-like text?
const s10 = html.slice(1635300, 1650744);
console.log('--- [10] candidate title texts:');
for (const m of s10.matchAll(/<(h1|h2|p)[^>]*>([^<>]{8,120})<\/(h1|h2|p)>/g)) {
  console.log(`  <${m[1]}> ${JSON.stringify(m[2].slice(0, 100))}`);
}
// obagi product img full tag + owner
const op = html.indexOf('alt="obagi product"');
const opTagStart = html.lastIndexOf('<img', op);
console.log('\nobagi-product img owner:', owner(opTagStart), '@' + opTagStart);
console.log('full tag:', JSON.stringify(html.slice(opTagStart, op).slice(0, 400)));
// SUBSCRIBE between-tags count
console.log('\n>SUBSCRIBE< count:', (html.match(/>SUBSCRIBE</g) || []).length);
// consent exact
console.log('consent exact count:', html.split('Yes, subscribe me to your newsletter.').length - 1);
// email input
const em = html.indexOf('comp-lx8nyczl10');
console.log('email input near:', JSON.stringify(html.slice(em - 200, em + 200)));
// Search / Menu aria
console.log('\naria Search count:', (html.match(/aria-label="Search"/g) || []).length);
console.log('aria Menu count:', (html.match(/aria-label="Menu"/g) || []).length);
console.log('brought-to-india string count:', html.split('Brought to you in India by SPECTRA').length - 1);
console.log('skip btn:', JSON.stringify((html.match(/<button id="SKIP_TO_CONTENT_BTN"[^>]*>[^<]*</) || ['ABSENT'])[0]));
