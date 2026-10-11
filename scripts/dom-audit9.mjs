// Audit part 9: locate the story/history gallery — which <img> tags surround
// historyTitle (comp-lwqg9o89)? List sections 3-10 imgs with positions.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');

const ht = html.indexOf('id="comp-lwqg9o89"');
console.log('historyTitle comp-lwqg9o89 at', ht);
// nearest section start before it
const secs = [...html.matchAll(/<section\s+id="([^"]+)"/g)].map((m) => ({ id: m[1], at: m.index }));
console.log('owner section:', secs.filter((s) => s.at < ht).pop().id);
// all imgs within +-12KB
console.log('--- imgs near historyTitle:');
for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  if (Math.abs(m.index - ht) < 12000) {
    const alt = (m[0].match(/alt="([^"]*)"/) || [])[1] || '(no alt)';
    const src = (m[0].match(/src="([^"]*)"/) || [])[1] || '?';
    console.log(`  @${m.index} (d${m.index - ht >= 0 ? '+' : ''}${m.index - ht}) alt=${alt.slice(0, 40)} src=...${src.slice(-50)}`);
  }
}
// all comp ids with lwqg / lwrl1yo / ml6khg near
console.log('--- comp ids in [1608000..1635000]:');
for (const m of html.matchAll(/\sid="(comp-(?:lwqg|lwrl1yo|ml6khg)[^"]*)"/g)) {
  if (m.index > 1608000 && m.index < 1636000) console.log('  @' + m.index, m[1]);
}
