import { readFileSync } from 'fs';
const h = readFileSync('public/obagi.html', 'utf8');
console.log('form-field-input- count:', h.split('form-field-input-').length - 1);
const i = h.indexOf('form-field-input-');
if (i !== -1) console.log(JSON.stringify(h.slice(Math.max(0, i - 160), i + 200)));
const m = h.match(/aria-label="Email[^"]*"/g);
console.log('email aria in source:', m ? m.length : 0, m ? m[0] : '');
