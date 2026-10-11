// Audit part 3: what lives inside the patcher-replaced obsolete range?
import { readFileSync } from 'fs';

const html = readFileSync('public/obagi.html', 'utf8');
const startObs = html.indexOf('<section id="comp-mlau06ju"');
const endObs = html.indexOf('<section id="comp-ml6nay6u_r_comp-ljcmlawf"');
console.log('RANGE:', startObs, '->', endObs, 'len:', endObs - startObs);

const range = html.slice(startObs, endObs);
// every <section id=...>
for (const m of range.matchAll(/<section\s+id="([^"]+)"/g)) console.log('  SECTION:', m[1]);
// every element id="comp-..."
const ids = [...new Set([...range.matchAll(/\sid="(comp-[^"]+)"/g)].map((m) => m[1]))];
console.log('COMP IDS IN RANGE (' + ids.length + '):');
for (const id of ids) console.log('   ', id);
// headings/paragraphs text in range (first 1500 chars of visible text)
const text = range.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('VISIBLE TEXT SAMPLE:', JSON.stringify(text.slice(0, 1500)));
// videos / iframes / forms in range
console.log('videos:', (range.match(/<video\b/g) || []).length,
  'iframes:', (range.match(/<iframe\b/g) || []).length,
  'forms:', (range.match(/<form\b/g) || []).length,
  'imgs:', (range.match(/<img\b/g) || []).length);
