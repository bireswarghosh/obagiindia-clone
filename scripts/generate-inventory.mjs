/**
 * Generates OBAGI_CMS_FIELD_INVENTORY.md from the manifest + DOM audit evidence.
 * Usage: node scripts/generate-inventory.mjs
 * Re-run whenever obagi-field-manifest.ts changes. No dependencies.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'src/data/obagi-field-manifest.ts'), 'utf8');

// Parse manifest rows: { key, label, section, target, type, annotation, note? }
const rows = [];
const rowRe = /\{\s*key:\s*'([^']+)'\s*,\s*label:\s*'([^']+)'\s*,\s*section:\s*'([^']+)'\s*,\s*target:\s*'([^']+)'\s*,\s*type:\s*'([^']+)'\s*,\s*annotation:\s*'([^']+)'\s*(?:,\s*note:\s*'([^']+)')?\s*\}/g;
let m;
while ((m = rowRe.exec(src))) {
  rows.push({ key: m[1], label: m[2], section: m[3], target: m[4], type: m[5], annotation: m[6], note: m[7] || '' });
}

// Audit evidence (scripts/dom-audit*.mjs): responsive duplicate groups.
const DUP = {
  'home.header.menuLabel': 'aria ×2 (desktop + mobile hamburger)',
  'home.header.broughtToIndiaByText': 'aria + visible span ×2',
  'home.marquee.tickerText': 'loop copies ×4 (inner span + data-text ×3)',
  'home.newsletter.consentText': 'label + aria + config ×3 (same string)',
  'home.footer.socialIcons.instagram': 'data-image-info uri + <img> src ×2',
  'home.footer.socialIcons.youtube': 'data-image-info uri + <img> src ×2',
  'home.footer.socialIcons.facebook': 'data-image-info uri + <img> src ×2',
  'home.footer.socialIcons.x': 'data-image-info uri + <img> src ×2',
  'home.story.image2': 'shared file slot with hero drop (gallery wins)',
  'home.story.image3': 'shared file slot with about side image',
  'home.story.image4': 'shared file slot with hero award badge (gallery wins)',
  'home.hero.primaryImage': 'compat fallback — same slot as gallery image 2',
  'home.hero.badgeImage': 'compat fallback — same slot as gallery image 4',
  'home.collections.backgroundImage': 'compat fallback — same slot as gallery image 1',
  'home.research.mainImage': 'fg + blurred bg are ONE <img> (single occurrence)',
};

// Original text/asset labels (approved source values seen in DOM audit).
const ORIG = {
  'home.header.nav[].label': 'Wix nav replaced by approved server-rendered labels (destinations frozen)',
  'home.hero.title': 'Obagi® Medical India (#comp-lxriadds)',
  'home.hero.awardBadge': 'WINNER 2025 / Skin Product / Range of the Year / -Aesthetic Awards',
  'home.hero.videoSource': 'Wix bg video comp-lwxgxhly (4833d7_49dc6fa…)',
  'home.marquee.tickerText': 'CLINICALLY-TESTED | TRANSFORMATIONAL SKINCARE | 35 YEARS OF EXPERTISE | TRUSTED BY PHYSICIANS | PROVEN RESULTS',
  'home.story.introText': '35+ years Ryan Dermaceutics paragraph (#comp-lwqgbmmr)',
  'home.story.historyTitle': 'Our History',
  'home.about.heading': 'About Obagi Medical',
  'home.trust.heading': '#1 Leading U.S. Physician Recommended Brand*',
  'home.research.title': 'Obagi Research & Development',
  'home.newsletter.title': 'Join The OBAGI Newsletter',
  'home.newsletter.consentText': 'Yes, subscribe me to your newsletter.',
  'home.newsletter.subscribeLabel': 'SUBSCRIBE',
  'home.footer.copyright': '©2026 Obagi … physician dispensed …',
  'home.floating.chatLabel': 'Chat with AI',
  'home.seo.pageTitle': 'Obagi India | obagi products',
};

const status = (r) => {
  if (r.annotation === 'REMOVED') return ['REMOVED', 'recorded (BGS placeholder, no target)'];
  if (r.annotation.includes('BLOCKED')) return ['BLOCKED', 'evidence in report §5'];
  return ['mapped', 'verify-obagi-cms.mjs (static + live served-reflection)'];
};

const esc = (s) => String(s).replace(/\|/g, '\\|');
let md = `# OBAGI CMS — Field Inventory (generated — do not hand-edit)
\n_Source: \`src/data/obagi-field-manifest.ts\` (${rows.length} rows) · DOM: \`public/obagi.html\` (19 \\<img\\>, 2 \\<video\\>, 21 \\bgLayers_\\*) · Generator: \`scripts/generate-inventory.mjs\`_\n`;
md += `\n| fieldKey | adminSection | adminLabel | contentType | originalTextOrAssetLabel | exactSelectorOrElementID | responsiveDuplicateGroup | mapped? | verified? |\n`;
md += `|---|---|---|---|---|---|---|---|---|\n`;
for (const r of rows) {
  const [mapped, verified] = status(r);
  md += `| ${esc(r.key)} | ${esc(r.section)} | ${esc(r.label)} | ${r.type} | ${esc(ORIG[r.key] || (r.note || 'approved source asset'))} | ${esc(r.target)} | ${esc(DUP[r.key] || '—')} | ${mapped} | ${esc(verified)} |\n`;
}
md += `\n## Out-of-scope background layers (recorded with reason)\n`;
md += `\nEmpty \`bgLayers_*\` divs (no inner \\<img\\>/uri: header, hero, history, about, pillars-inner, R&D-cards, products, social strip) carry only color/gradient underlays — not image/video assets, so no CMS field (spec §3: record with reason). Styling is design-locked and never exposed.\n`;
md += `\n## Removed template sections (no public target)\n`;
md += `\nSections [12..16] (testimonial “Megan Brown”, “BGS in Numbers”, San-Francisco jobs, BGS press 2035, CEO.jpg) were BGS-template placeholders with zero genuine Obagi visible content (audit3/6). Replaced by Partner + Enquiry (approved). CMS editors removed; keys retained in DB for history. Genuine video [11] + newsletter [17] restored verbatim.\n`;

fs.writeFileSync(path.join(ROOT, 'OBAGI_CMS_FIELD_INVENTORY.md'), md);
console.log(`Wrote OBAGI_CMS_FIELD_INVENTORY.md (${rows.length} rows)`);
