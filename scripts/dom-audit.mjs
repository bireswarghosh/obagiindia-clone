// DOM audit helper: counts images/videos/background layers in public/obagi.html
// and lists every <img> alt + every video id + every bgLayers id.
import { readFileSync } from 'fs';

const html = readFileSync('public/obagi.html', 'utf8');
console.log('bytes:', Buffer.byteLength(html, 'utf8'));

const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
console.log('IMG COUNT:', imgs.length);
for (const m of imgs) {
  const alt = (m[0].match(/alt="([^"]*)"/i) || [])[1] || '(no alt)';
  const src = (m[0].match(/src="([^"]*)"/i) || [])[1] || '(no src)';
  console.log('  IMG alt=', JSON.stringify(alt.slice(0, 60)), 'src=', JSON.stringify(src.slice(0, 80)));
}

const vids = [...html.matchAll(/<video\b[^>]*>/gi)];
console.log('VIDEO COUNT:', vids.length);
for (const m of vids) {
  console.log('  VIDEO tag=', JSON.stringify(m[0].slice(0, 220)));
}

const bgs = [...new Set([...html.matchAll(/id="(bgLayers_[^"]+)"/g)].map((m) => m[1]))];
console.log('BGLAYERS COUNT:', bgs.length);
for (const b of bgs) console.log('  BG', b);

// ticker / marquee text candidates
for (const kw of ['CLINICALLY', 'TRANSFORMATIONAL', '35 YEARS', 'TRUSTED BY', 'PROVEN RESULTS', 'marquee', 'ticker']) {
  const idx = html.indexOf(kw);
  console.log(`KW ${kw}:`, idx === -1 ? 'ABSENT' : `found at ${idx} -> ...${JSON.stringify(html.slice(Math.max(0, idx - 120), idx + 120))}...`);
}

// header extra labels
for (const kw of ['Brought to you in India', 'SPECTRA', 'Find Obagi', 'Skip to', 'Why Obagi', 'Need Help?', 'Explore Obagi', 'Address the Signs of Aging', 'Chat with AI', 'Join The OBAGI', 'SUBSCRIBE', 'Subscribe', 'Terms', 'Privacy Policy', 'Accessibility Statement', 'Contact Us', 'Instagram', 'YouTube', 'Facebook']) {
  console.log(`LABEL ${kw}:`, html.includes(kw) ? 'PRESENT' : 'absent');
}
