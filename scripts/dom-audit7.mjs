// Audit part 7: how does each mapped BG target actually render its background?
// And: does the junk span 1659539->1697613 contain any genuine 'Obagi' content?
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');

for (const id of ['bgLayers_comp-mlqkez2p', 'bgLayers_comp-lwz20kzt', 'comp-mlqmnjp310',
  'bgLayers_comp-mlqlr0fm', 'bgLayers_comp-lx8nvywg', 'bgLayers_comp-ml6nay6u_r_comp-ljcmlawf',
  'bgLayers_comp-lwxgxhly', 'bgLayers_comp-lw3c3n7z_r_comp-lw3c3mu6']) {
  const i = html.indexOf(`id="${id}"`);
  if (i === -1) { console.log(id, 'ABSENT'); continue; }
  const win = html.slice(i, i + 2500);
  const hasBgMedia = win.includes('bgMedia_');
  const imgs = [...win.matchAll(/<img\b[^>]*>/g)].map((m) => {
    const alt = (m[0].match(/alt="([^"]*)"/) || [])[1] || '?';
    const src = (m[0].match(/src="([^"]*)"/) || [])[1] || '?';
    return `${alt.slice(0, 30)} :: ${src.slice(0, 50)}`;
  });
  const uris = [...win.matchAll(/uri&quot;:&quot;([^&"]{0,60})/g)].map((m) => m[1]);
  console.log(`\n${id}: bgMedia=${hasBgMedia} imgs=${imgs.length}`);
  imgs.slice(0, 3).forEach((t) => console.log('   img:', t));
  uris.slice(0, 3).forEach((u) => console.log('   uri:', u));
}

// junk span genuine-content check
const junk = html.slice(1659539, 1697613);
const obagiHits = [...junk.matchAll(/obagi/gi)].length;
console.log('\nJUNK SPAN: "obagi" (any case) occurrences:', obagiHits);
const visText = junk.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('JUNK VISIBLE TEXT:', JSON.stringify(visText.slice(0, 800)));
