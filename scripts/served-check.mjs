// Check the SERVED page (not source) for which CMS targets actually render.
import { readFileSync } from 'fs';
const html = readFileSync('C:/Users/LENOVO/AppData/Local/Temp/opencode/served-home.html', 'utf8');
console.log('served bytes:', Buffer.byteLength(html, 'utf8'));
const keys = [
  'partner-section', 'enquiry-section', 'obagi-dynamic-cms-styles',
  'comp-mlau0bjm_video', 'comp-lx8nyczk6', 'comp-lx8nzrma', 'SUBSCRIBE',
  'Yes, subscribe me to your newsletter', 'minimizedChatButton',
  'BGS in Numbers', 'Megan Brown', 'comp-lwryj83c',
  'bgLayers_comp-lx8nvywg', 'comp-lx8nvywg',
  'comp-ml6nay6u_r_comp-ljcmlawf', 'comp-ml6nay6u_r_comp-lx0hp721',
  'marquee-item-text', 'comp-lwxgxhly_video', 'SKIP_TO_CONTENT_BTN',
  'Brought to you in India', 'alt="Instagram"', 'CEO.jpg',
];
for (const kw of keys) console.log((html.includes(kw) ? 'PRESENT ' : 'absent  ') + kw);
// count marquee copies on served page
console.log('served marquee-item-text count:', (html.match(/data-testid="marquee-item-text"/g) || []).length);
