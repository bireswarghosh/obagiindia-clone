// Strict served-page check: real TAGS, not substring mentions inside JSON blobs.
import { readFileSync } from 'fs';
const served = readFileSync('C:/Users/LENOVO/AppData/Local/Temp/opencode/served-home.html', 'utf8');
const src = readFileSync('public/obagi.html', 'utf8');
const tags = [
  '<section id="comp-mlau06ju"', '<video', 'id="comp-mlau0bjm_video"',
  '<div id="comp-lx8nyczk6"', '<div id="comp-lx8nzrma"', 'id="bgLayers_comp-lx8nvywg"',
  '<section id="comp-lx8nvywg"', 'data-hook="minimizedChatButton"',
  '<section id="partner-section"', '<section id="enquiry-section"',
  '<section id="comp-lwryj83c"', '<section id="comp-lwt3cjvx"',
  '<section id="comp-ml6nay6u_r_comp-ljcmlawf"',
  '<div id="comp-ml6nay6u_r_comp-lx0hp721"',
  'id="SKIP_TO_CONTENT_BTN"', 'alt="Instagram"',
  'Yes, subscribe me to your newsletter',
];
for (const t of tags) {
  const inServed = served.includes(t), inSrc = src.includes(t);
  console.log(`${inServed ? 'SERVED ' : 'served-'}${inSrc ? 'SOURCE' : 'source-'}  ${t}`);
}
