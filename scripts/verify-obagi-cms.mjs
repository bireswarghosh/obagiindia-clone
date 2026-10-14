/**
 * OBAGI CMS acceptance checks (no dependencies, runs with plain node).
 * Usage:
 *   node scripts/verify-obagi-cms.mjs                # static DOM + code checks
 *   node scripts/verify-obagi-cms.mjs --live http://localhost:3002 --pin 1234
 * Exit 0 = all PASS, 2 = FAIL/BLOCKED present (see OBAGI_CMS_IMPLEMENTATION_REPORT.md).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const liveIdx = args.indexOf('--live');
const LIVE = liveIdx >= 0 ? args[liveIdx + 1] : null;
const pinIdx = args.indexOf('--pin');
const PIN = pinIdx >= 0 ? args[pinIdx + 1] : '';

let pass = 0;
let fail = 0;
const rows = [];
function check(id, ok, note = '') {
  if (ok) pass++;
  else fail++;
  rows.push({ id, status: ok ? 'PASS' : 'FAIL', note });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}${note ? ' — ' + note : ''}`);
}

const htmlPath = path.join(ROOT, 'public', 'obagi.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// ── 1. Manifest target existence in source DOM ──────────────────────
const mustExistIds = [
  'comp-lwqgbmmr', 'comp-lwrl1yoo7', 'comp-lwrl46my', 'comp-ml6km44m',
  'comp-mlqlr0fr2', 'comp-mlqlr0fq4', 'comp-lxriadds', 'comp-lxriaddt',
  'comp-mlqmnjp2', 'comp-mlqmnjoy8', 'comp-mlqmnjp310', 'comp-mlqmnjp410',
  'comp-mlqmnjpf3__item1', 'comp-mlqmnjpf3__item-j9ples3e',
  'comp-mlqmnjpf3__item-j9plerjk', 'comp-mlqmnjpf3__item-mlqnbcvm',
  'comp-mlqmnjpd8__item-mlqnbcvm',
  'comp-mlqlfcyy5__item1', 'comp-mlqlfcyy5__item-j9ples3e', 'comp-mlqlfcyy5__item-j9plerjk',
  'comp-mlqlfcyy5__item-rdcard4',
  'comp-mlqlfcyu4__item1', 'comp-mlqlfcyu4__item-j9ples3e', 'comp-mlqlfcyu4__item-j9plerjk',
  'comp-mlqlfcyu4__item-rdcard4',
  'comp-mlqlfcyr6__item-rdcard4',
  'comp-lwsw0tdf__item1', 'comp-lwsw0tdb8__item1', 'comp-lwsw0tdg__item1', 'comp-lwsw0tdh5__item1',
  'comp-mlau0bjm_video', 'comp-mlau0bjm_img', 'comp-lwxgxhly_video',
  'bgLayers_comp-mlqkez2p', 'bgLayers_comp-lwz20kzt', 'bgLayers_comp-mlqlr0fm',
  'bgLayers_comp-lx8nvywg', 'bgLayers_comp-ml6nay6u_r_comp-ljcmlawf',
  'comp-ml6nay6u_r_comp-lx0hp721', 'comp-lx8nyczk6', 'comp-lx8nzrma',
];
for (const id of mustExistIds) {
  check(`dom:${id}`, html.includes(`id="${id}"`) || html.includes(`id='${id}'`));
}
// 10.4: DOM now holds 4 research item-suffixes (card 4 cloned per TASK).
const rdSuffixes = new Set(
  [...html.matchAll(/comp-mlqlfcyy5__([A-Za-z0-9\-_]+)/g)].map((m) => m[1])
);
check('dom:research-4-cards (10.4 unblocked)', rdSuffixes.size === 4, `found: ${[...rdSuffixes].join(',')}`);
check('dom:has-title', /<title[^>]*>[\s\S]*?<\/title>/i.test(html));
check('dom:has-meta-description', /<meta[^>]*name="description"/i.test(html));
check('dom:newsletter-email-input', html.includes('comp-lx8nyczl10'));
check('dom:chat-widget', html.includes('minimizedChatButton'));

// ── 2. Design-lock: patcher must not write styles ───────────────────
const patcher = fs.readFileSync(path.join(ROOT, 'src/lib/obagi-html-patcher.ts'), 'utf8');
const patcherCodeOnly = patcher.split('\n').filter((l) => !l.trim().startsWith('//') && !l.trim().startsWith('*')).join('\n');
// No CMS-data-driven color: no single-line ${...Color} interpolation, no color args.
check('patcher:no-color-writes', !/\$\{[^\n}]*Color[^\n}]*\}/.test(patcherCodeOnly) && !/patch(Div|Bg)\([^)]*Color/.test(patcherCodeOnly));
const bgForce = (patcher.match(/background-size:\s*cover/g) || []).length;
check('patcher:no-bg-forcing', bgForce === 0, `occurrences=${bgForce}`);
check('patcher:escapes-text', patcher.includes('escapeHtml('));
const patcherCode = patcher.split('\n').filter((l) => !l.trim().startsWith('//')).join('\n');
const linkUrlUses = (patcherCode.match(/\.linkUrl/g) || []).length;
check('patcher:linkUrl-frozen', linkUrlUses === 0, `live .linkUrl reads=${linkUrlUses}`);
check('patcher:no-bgcolor-writes', !/background-color:\s*\$\{/.test(patcher));

// ── 3. sync.js must be interactivity-only ───────────────────────────
const syncRaw = fs.readFileSync(path.join(ROOT, 'public/obagi-cms-sync.js'), 'utf8');
const sync = syncRaw.split('\n').filter((l) => {
  const t = l.trim();
  return !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
}).join('\n');
for (const banned of ['localStorage', 'applyCms', 'MutationObserver', 'setText(', 'setImg(', 'setBg(', 'syncLogo', '__OBAGI_CMS_DATA__']) {
  check(`sync:no-${banned}`, !sync.includes(banned));
}
check('sync:keeps-carousel', sync.includes('initPillarsCarousel'));
check('sync:keeps-enquiry', sync.includes('initPartnerEnquiryInteractivity'));
check('sync:popup-open', sync.includes('openDistributorPopup') && sync.includes('data-open-distributor-popup'));
check('sync:success-after-db', sync.includes("if (!res.ok || !json.success)"));
check('sync:no-localstorage-enquiry', !/localStorage\.(get|set)Item\(['"]enquir/i.test(sync));
// Partner + popup + single CTA (TASK).
check('patcher:partner-single-cta', patcher.includes('data-open-distributor-popup') && !patcher.includes("secondaryButtonText || 'BUSINESS ENQUIRY'"));
check('patcher:has-popup', patcher.includes('obagi-distributor-popup') && patcher.includes('distributor-popup-form'));
check('patcher:hides-newsletter-form', patcher.includes('#comp-lx8nyczl10'));
// Enquiry API: Blob + PIN-protected GET.
const enquiryApi = fs.readFileSync(path.join(ROOT, 'src/app/api/enquiry/route.ts'), 'utf8');
check('api:enquiry-blob', enquiryApi.includes('obagi-enquiries.json') && enquiryApi.includes('@vercel/blob'));
check('api:enquiry-pin-get', enquiryApi.includes('requestHasValidPin'));
// Admin inbox tab (homeCms loaded below — move those checks after its load).
const inboxSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionEnquiryInbox.tsx'), 'utf8');
check('cms:enquiry-inbox-uses-pin', inboxSec.includes('cmsHeaders'));

// ── 4. CMS UI must not expose colors/links/global-save ──────────────
const richColor = fs.readFileSync(path.join(ROOT, 'src/components/admin/RichColorTextEditor.tsx'), 'utf8');
check('cms:no-color-picker', !richColor.includes('type="color"') && !richColor.includes('PRESET_COLORS'));
const homeCms = fs.readFileSync(path.join(ROOT, 'src/components/admin/ObagiHomeCms.tsx'), 'utf8');
check('cms:enquiry-inbox-tab', homeCms.includes('enquiry-inbox') && homeCms.includes('SectionEnquiryInbox'));
check('cms:no-save-all', !homeCms.includes('handleSaveAll') && !homeCms.includes('Save All Sections'));
check('cms:no-reset-all', !homeCms.includes('handleResetAll') && !homeCms.includes('Reset Defaults'));
check('cms:no-localstorage-truth', !homeCms.includes("localStorage.setItem('obagi_home_cms'") && !homeCms.includes("localStorage.getItem('obagi_home_cms'"));
check('cms:has-pin-gate', homeCms.includes('/api/cms-auth') && homeCms.includes('x-cms-pin'));
const header = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionHeader.tsx'), 'utf8');
check('cms:header-no-link-edit', !header.includes('Target Link URL') && !header.includes('Add Item'));
const products = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionProducts.tsx'), 'utf8');
check('cms:products-no-link-edit', !products.includes('Link URL'));
const pillars = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionPillars.tsx'), 'utf8');
check('cms:pillars-no-color-no-timing', !pillars.includes('type="color"') && !pillars.includes('autoCarouselInterval'));
const footerSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionFooter.tsx'), 'utf8');
check('cms:footer-has-floating', footerSec.includes('Chat Button Label'));
check('cms:footer-has-email-label', footerSec.includes('emailLabel'));
const heroSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionHero.tsx'), 'utf8');
check('cms:hero-has-video', heroSec.includes('heroVideoUrl') && heroSec.includes('mediaType="video"'));
check('cms:hero-has-poster', heroSec.includes('heroVideoPoster'));
check('cms:hero-leaf-only', !heroSec.includes('historyIntroText') && !heroSec.includes('historyImage'));
const gallerySec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionGallery.tsx'), 'utf8');
check('cms:gallery-has-4-images', ['historyImage2', 'historyImage3', 'historyImage4'].every((k) => gallerySec.includes(k)));
const videoSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionVideo.tsx'), 'utf8');
check('cms:video-has-uploader', videoSec.includes('mediaType="video"') && videoSec.includes('overlayTitle'));
const marqueeSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionMarquee.tsx'), 'utf8');
check('cms:marquee-leaf-only', marqueeSec.includes('trustBanner: { tickerText: ticker, marqueeBgImage: bg }'));
const seoSec = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionSeo.tsx'), 'utf8');
check('cms:seo-tab', seoSec.includes('pageTitle') && seoSec.includes('metaDescription'));
const footerSec2 = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionFooter.tsx'), 'utf8');
check('cms:footer-consent-subscribe', footerSec2.includes('consentText') && footerSec2.includes('subscribeLabel'));
check('cms:footer-socials', footerSec2.includes('socialIcons'));
const shell = fs.readFileSync(path.join(ROOT, 'src/components/admin/sections/SectionShell.tsx'), 'utf8');
check('cms:unsaved-indicator', shell.includes('Unsaved changes'));
// Dead BGS-junk tabs must stay unmounted (files retained for history only).
for (const dead of ['SectionStory', 'SectionResearch', 'SectionCareersPress', 'SectionNumbers']) {
  check(`cms:unmounted-${dead}`, !homeCms.includes(`from './sections/${dead}'`) && !homeCms.includes(`<${dead} `));
}
check('patcher:hero-poster-mapped', patcher.includes('patchVideoPoster'));
check('patcher:award-video-mapped', patcher.includes('comp-mlau0bjm_video'));
check('patcher:seo-mapped', patcher.includes('<title>') && patcher.includes('metaDescription'));
check('patcher:floating-mapped', patcher.includes('patchChatAriaLabel'));
check('patcher:newsletter-mapped', patcher.includes('comp-lx8nyczk6') && patcher.includes('comp-lx8nzrma'));
check('patcher:ticker-mapped', patcher.includes('patchTicker') && patcher.includes('CLINICALLY-TESTED'));
check('patcher:header-labels-mapped', patcher.includes('SKIP_TO_CONTENT_BTN') && patcher.includes('Brought to you in India by SPECTRA'));
check('patcher:consent-subscribe-mapped', patcher.includes('Yes, subscribe me to your newsletter.') && patcher.includes('patchExactText'));
check('patcher:socials-mapped', patcher.includes('11062b_ca1d837ce7194421b781ee7384061a8e') && patcher.includes('socialIcons'));
// Restore must be junk-only: video [11] + newsletter [17] kept, BGS [12..16] replaced.
check('patcher:restore-junk-only',
  patcher.includes('<section id="comp-lwryj83c"') && patcher.includes('<section id="comp-lx8nvywg"') &&
  !patcher.includes("indexOf('<section id=\"comp-mlau06ju\"')"));
// Invisible bg-layering removed: collections [4]-bg IS the nu-derm <img>,
// R&D genome is a single <img> — layering under them never showed.
check('patcher:no-invisible-collections-bg', !patcher.includes("patchBg(result, 'bgLayers_comp-lwz20kzt'"));
check('patcher:no-invisible-rd-bg', !patcher.includes("patchBg(result, 'bgLayers_comp-mlqlr0fm'"));
const manifest = fs.readFileSync(path.join(ROOT, 'src/data/obagi-field-manifest.ts'), 'utf8');
check('manifest:has-new-fields', manifest.includes('tickerText') && manifest.includes('socialIcons') && manifest.includes('subscribeLabel') && manifest.includes('skipToContentLabel'));

// ── 5. Live server checks (only with --live) ────────────────────────
if (LIVE) {
  const base = LIVE.replace(/\/$/, '');
  const get = async (p, opts = {}) => {
    const r = await fetch(base + p, { cache: 'no-store', ...opts });
    return r;
  };
  const live = async () => {
    try {
      const home = await get('/');
      const text = await home.text();
      check('live:serves-html', home.ok && text.includes('comp-lxriadds'), `status=${home.status}`);
      check('live:no-cms-data-blob', !text.includes('__OBAGI_CMS_DATA__'));
      check('live:no-localstorage-cms', !text.includes('obagi_home_cms'));
      check('live:single-sync-include', (text.match(/obagi-cms-sync\.js/g) || []).length === 1);

      // Unauthorized mutation must fail.
      const unauth = await get('/api/obagi-cms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero: { title: 'HACK' } }),
      });
      check('live:patch-requires-pin', unauth.status === 401, `status=${unauth.status}`);
      const unauthUp = await get('/api/upload', { method: 'POST', body: 'x' });
      check('live:upload-requires-pin', unauthUp.status === 401, `status=${unauthUp.status}`);

      if (PIN) {
        // Capture originals FIRST so the test is non-destructive.
        const before = await (await get('/api/obagi-cms', { cache: 'no-store' })).json();
        const origHeroTitle = before?.data?.hero?.title || '';
        const origHistoryTitle = before?.data?.story?.historyTitle || '';
        const origTicker = before?.data?.trustBanner?.tickerText || '';
        const origNlTitle = before?.data?.newsletter?.title || '';
        const origVideo =
          before?.data?.awardVideo?.videoUrl && !before.data.awardVideo.videoUrl.includes('example.com')
            ? before.data.awardVideo.videoUrl
            : 'https://video.wixstatic.com/video/4833d7_958d8b59c22f449990b3c2a75c660389/720p/mp4/file.mp4';
        const origChat = before?.data?.floating?.chatLabel || '';
        // Section isolation: save hero, then story — hero must survive.
        const H1 = `FLASH-CHECK-${Date.now()}`;
        const S1 = `STORY-CHECK-${Date.now()}`;
        const h1 = await (await get('/api/obagi-cms', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-cms-pin': PIN },
          body: JSON.stringify({ hero: { title: H1 } }),
        })).json();
        check('live:patch-hero-ok', h1?.success === true);
        const s1 = await (await get('/api/obagi-cms', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-cms-pin': PIN },
          body: JSON.stringify({ story: { historyTitle: S1 } }),
        })).json();
        check('live:patch-story-ok', s1?.success === true);
        check('live:hero-survives-story-save', s1?.data?.hero?.title === H1, `got=${s1?.data?.hero?.title}`);
        // First-paint flash test: the INITIAL HTML bytes must already contain
        // the saved value (server-painted). Combined with no client-side
        // CMS-apply script, a default-then-swap flash is impossible.
        const fresh = await (await get('/')).text();
        const idxNew = fresh.indexOf(H1);
        check('live:first-paint-has-saved', idxNew >= 0, `idx=${idxNew}, bytes=${fresh.length}`);
        // Served-reflection for restored + new slots (proves restore + patches).
        const T1 = `TICKER-CHECK-${Date.now()}`;
        const N1 = `NEWSLETTER-CHECK-${Date.now()}`;
        const V1 = `https://example.com/VIDEO-CHECK-${Date.now()}.mp4`;
        const C1 = `CHAT-CHECK-${Date.now()}`;
        await get('/api/obagi-cms', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-cms-pin': PIN },
          body: JSON.stringify({
            trustBanner: { tickerText: T1 },
            newsletter: { title: N1 },
            awardVideo: { videoUrl: V1 },
            floating: { chatLabel: C1 },
          }),
        });
        const fresh2 = await (await get('/')).text();
        check('live:served-ticker', fresh2.includes(T1));
        check('live:served-newsletter', fresh2.includes(N1), 'restored section [17] renders');
        check('live:served-award-video', fresh2.includes(V1), 'restored section [11] renders');
        check('live:served-floating', fresh2.includes(C1 + ', false, '));
        check('live:served-partner-kept', fresh2.includes('partner-section') && fresh2.includes('enquiry-section'));
        check('live:served-junk-gone', !fresh2.includes('Megan Brown') && !fresh2.includes('BGS in Numbers'));
        // Restore the captured originals (never defaults).
        await get('/api/obagi-cms', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'x-cms-pin': PIN },
          body: JSON.stringify({
            hero: { title: origHeroTitle },
            story: { historyTitle: origHistoryTitle },
            trustBanner: { tickerText: origTicker },
            newsletter: { title: origNlTitle },
            awardVideo: { videoUrl: origVideo },
            floating: { chatLabel: origChat },
          }),
        });
        const restored = await (await get('/')).text();
        check('live:restore-ok', restored.includes(origHeroTitle) && !restored.includes(H1) && !restored.includes(T1));
      } else {
        console.log('SKIP  live:mutation tests (no --pin given)');
      }
    } catch (e) {
      check('live:reachable', false, String(e?.message || e));
    }
  };
  await live();
} else {
  console.log('SKIP  live checks (pass --live http://localhost:3002 --pin <PIN>)');
}

console.log(`\nRESULT: ${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 2 : 0);
