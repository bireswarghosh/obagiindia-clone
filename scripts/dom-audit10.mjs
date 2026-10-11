// Audit part 10: owner-section for every patched target id.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');
const secs = [...html.matchAll(/<section\s+id="([^"]+)"/g)].map((m) => ({ id: m[1], at: m.index }));
const owner = (pos) => secs.filter((s) => s.at < pos).pop().id;
const targets = ['comp-lxriadds', 'comp-lxriaddt', 'comp-lwxgxhly_video', 'comp-lwqgbmmr',
  'comp-lwqg9o89', 'comp-lwrl1yoo7', 'comp-lwrl46my', 'comp-ml6km44m',
  'bgLayers_comp-mlqkez2p', 'comp-mlqmnjp2', 'comp-mlqmnjoy8', 'comp-mlqmnjp310',
  'comp-mlqmnjpf3__item1', 'bgLayers_comp-lwz20kzt', 'comp-mlqlr0fr2', 'comp-mlqlr0fq4',
  'bgLayers_comp-mlqlr0fm', 'comp-mlqlfcyy5__item1', 'comp-lwsw0tdb8__item1',
  'comp-mlau0bjm_video', 'bgLayers_comp-lx8nvywg', 'comp-lx8nyczk6', 'comp-lx8nzrma',
  'comp-lx8nyczl10', 'bgLayers_comp-ml6nay6u_r_comp-ljcmlawf', 'comp-ml6nay6u_r_comp-lx0hp721',
  'comp-lw3c3n7z_r_comp-mlethlmo', 'SKIP_TO_CONTENT_BTN', 'comp-ml6m00og'];
for (const t of targets) {
  const i = html.indexOf(`id="${t}"`);
  if (i === -1) { console.log('ABSENT', t); continue; }
  console.log(`@${i} owner=[${owner(i)}]  ${t}`);
}
