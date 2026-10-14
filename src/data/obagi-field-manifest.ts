/**
 * OBAGI HOME — CENTRAL CONTENT MANIFEST (spec §3 authority file)
 * One row per independently-editable text/image/video slot, verified against
 * public/obagi.html by scripts/dom-audit*.mjs.
 * `section` = the CMS tab that owns the editor. `target` is the STABLE
 * selector patched server-side (never nth-child).
 * Shared-slot rows name the single DOM element + the tab that wins ties.
 * Status is verified by scripts/verify-obagi-cms.mjs against served output.
 */

export type FieldType = 'text' | 'image' | 'video' | 'seo-text';

export interface FieldEntry {
  key: string; // CMS key, e.g. home.hero.title
  label: string; // human-readable CMS label
  section: string; // CMS section tab
  target: string; // stable DOM target (id / alt-key / aria-hook)
  type: FieldType;
  annotation: string; // 01..15 (+sweep ids)
  note?: string; // shared-slot / fallback / blocked reason
}

export const OBAGI_FIELD_MANIFEST: FieldEntry[] = [
  // ── 01 Header/nav + logo (tab: header) ──────────────────────────────
  { key: 'home.header.logoImage', label: 'Header brand logo', section: 'header', target: 'svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb > img[src]', type: 'image', annotation: '01' },
  { key: 'home.header.nav[].label', label: 'Nav item labels (each)', section: 'header', target: 'nav.obagi-clean-desktop-nav (server-rendered from labels)', type: 'text', annotation: '01', note: 'Custom server-rendered nav (approved); destinations frozen' },
  { key: 'home.header.skipToContentLabel', label: 'Skip-to-content label', section: 'header', target: '#SKIP_TO_CONTENT_BTN (inner text)', type: 'text', annotation: '01' },
  { key: 'home.header.broughtToIndiaByText', label: 'SPECTRA strip label', section: 'header', target: '#comp-lw3c3n7z_r_comp-mlethlmo (aria + span, synced)', type: 'text', annotation: '01' },
  { key: 'home.header.searchLabel', label: 'Search button label', section: 'header', target: 'aria-label="Search"', type: 'text', annotation: '01' },
  { key: 'home.header.menuLabel', label: 'Menu button label', section: 'header', target: 'aria-label="Menu" ×2 (desktop+mobile, synced)', type: 'text', annotation: '01' },
  // ── 02 Hero (tab: hero) ─────────────────────────────────────────────
  { key: 'home.hero.title', label: 'Hero main title', section: 'hero', target: '#comp-lxriadds', type: 'text', annotation: '02' },
  { key: 'home.hero.awardBadge', label: 'Aesthetic Awards badge text', section: 'hero', target: '#comp-lxriaddt', type: 'text', annotation: '02' },
  { key: 'home.hero.videoSource', label: 'Hero background video', section: 'hero', target: '#comp-lwxgxhly_video[src]', type: 'video', annotation: '02' },
  { key: 'home.hero.videoPoster', label: 'Hero video poster', section: 'hero', target: '#comp-lwxgxhly_video[poster]', type: 'image', annotation: '02' },
  { key: 'home.hero.backgroundImage', label: 'Hero band background photo', section: 'hero', target: '#bgLayers_comp-lwxgxhly first img (no alt)', type: 'image', annotation: '02', note: 'Empty = keep original' },
  // ── 03 Marquee (tab: marquee) ───────────────────────────────────────
  { key: 'home.marquee.tickerText', label: 'Ticker text (all segments)', section: 'marquee', target: 'data-testid="marquee-item-text" ×4 (inner + data-text)', type: 'text', annotation: '03', note: 'One text node; per-segment impossible (design lock)' },
  { key: 'home.marquee.backgroundImage', label: 'Marquee strip background', section: 'marquee', target: '#bgLayers_comp-mlqkez2p', type: 'image', annotation: '03', note: 'No inner img — URL layer shows' },
  // ── 04 History intro (tab: history-intro) ───────────────────────────
  { key: 'home.story.historyTitle', label: 'History section title', section: 'history-intro', target: '#comp-lwqg9o89', type: 'text', annotation: '04' },
  { key: 'home.story.introText', label: 'History intro paragraph', section: 'history-intro', target: '#comp-lwqgbmmr', type: 'text', annotation: '05' },
  // ── 05 Gallery band [4] (tab: gallery) ──────────────────────────────
  { key: 'home.story.image1', label: 'Gallery image 1 = band background (Nu-Derm)', section: 'gallery', target: 'img[alt="obagi-nu-derm-fx-collection"] (single tag, bgMedia)', type: 'image', annotation: '06' },
  { key: 'home.story.image2', label: 'Gallery image 2 (Dropper)', section: 'gallery', target: 'img[alt="drop"] — SHARED with hero drop slot (gallery wins ties)', type: 'image', annotation: '06', note: 'Shared slot' },
  { key: 'home.story.image3', label: 'Gallery image 3 (Hydration)', section: 'gallery', target: 'img[alt="Hydration-HydrateLuxe-DHD"] — SHARED with about side image', type: 'image', annotation: '06', note: 'Shared slot' },
  { key: 'home.story.image4', label: 'Gallery image 4 (Award)', section: 'gallery', target: 'img[alt*="aesthetics award winner"] — SHARED with hero badge slot (gallery wins ties)', type: 'image', annotation: '06', note: 'Shared slot' },
  { key: 'home.hero.primaryImage', label: 'Hero drop image (compat)', section: 'gallery', target: 'img[alt="drop"] — same slot as gallery image 2', type: 'image', annotation: '02', note: 'Compat fallback; gallery tab owns the editor' },
  { key: 'home.hero.badgeImage', label: 'Award badge image (compat)', section: 'gallery', target: 'img[alt*="aesthetics award winner"] — same slot as gallery image 4', type: 'image', annotation: '02', note: 'Compat fallback; gallery tab owns the editor' },
  { key: 'home.collections.backgroundImage', label: 'Band background (compat)', section: 'gallery', target: 'same nu-derm tag as gallery image 1', type: 'image', annotation: '04', note: 'Compat fallback; old bg-layer call was invisible, removed' },
  // ── 06 About (tab: about) ───────────────────────────────────────────
  { key: 'home.about.heading', label: 'About Obagi Medical heading', section: 'about', target: '#comp-lwrl1yoo7', type: 'text', annotation: '07.1' },
  { key: 'home.about.quote', label: 'About quote (emphasis preserved)', section: 'about', target: '#comp-lwrl46my', type: 'text', annotation: '07.2' },
  { key: 'home.about.paragraph', label: 'About paragraph', section: 'about', target: '#comp-ml6km44m', type: 'text', annotation: '07.3' },
  { key: 'home.about.image', label: 'About side image (obagi product slot)', section: 'about', target: 'img[alt="obagi product"]', type: 'image', annotation: '07' },
  // ── 07 Pillars (tab: pillars) ───────────────────────────────────────
  { key: 'home.trust.heading', label: 'Recommendation heading', section: 'pillars', target: '#comp-mlqmnjp2', type: 'text', annotation: '08.1' },
  { key: 'home.trust.concerns', label: 'Concerns copy', section: 'pillars', target: '#comp-mlqmnjoy8', type: 'text', annotation: '08.2-heading' },
  { key: 'home.trust.sliderBackground', label: 'Trust slider background', section: 'pillars', target: '#comp-mlqmnjp310', type: 'image', annotation: '08.1', note: 'No inner img — URL layer shows' },
  { key: 'home.trust.pillar1.title', label: 'Pillar 1 title', section: 'pillars', target: '#comp-mlqmnjpf3__item1', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar1.description', label: 'Pillar 1 description', section: 'pillars', target: '#comp-mlqmnjpd8__item1', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar2.title', label: 'Pillar 2 title', section: 'pillars', target: '#comp-mlqmnjpf3__item-j9ples3e', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar2.description', label: 'Pillar 2 description', section: 'pillars', target: '#comp-mlqmnjpd8__item-j9ples3e', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar3.title', label: 'Pillar 3 title', section: 'pillars', target: '#comp-mlqmnjpf3__item-j9plerjk', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar3.description', label: 'Pillar 3 description', section: 'pillars', target: '#comp-mlqmnjpd8__item-j9plerjk', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar4.title', label: 'Pillar 4 title', section: 'pillars', target: '#comp-mlqmnjpf3__item-mlqnbcvm', type: 'text', annotation: '08.2' },
  { key: 'home.trust.pillar4.description', label: 'Pillar 4 description', section: 'pillars', target: '#comp-mlqmnjpd8__item-mlqnbcvm', type: 'text', annotation: '08.2' },
  // ── 08 R&D intro (tab: rd-intro) ────────────────────────────────────
  { key: 'home.research.mainImage', label: 'R&D lab image (single fg/bg slot)', section: 'rd-intro', target: 'img[alt*="genome-research-lab-tests"] (only occurrence)', type: 'image', annotation: '09', note: 'fg+bg are one file (spec: separate only IF separate)' },
  { key: 'home.research.title', label: 'R&D title', section: 'rd-intro', target: '#comp-mlqlr0fr2', type: 'text', annotation: '09.1' },
  { key: 'home.research.description', label: 'R&D description', section: 'rd-intro', target: '#comp-mlqlr0fq4', type: 'text', annotation: '09.2' },
  // ── 09 R&D cards (tab: rd-cards) ────────────────────────────────────
  { key: 'home.research.card1.image', label: 'R&D card 1 image', section: 'rd-cards', target: 'img[alt*="scientist-pouring-red-liquid"]', type: 'image', annotation: '10.1' },
  { key: 'home.research.card1.title', label: 'R&D card 1 title', section: 'rd-cards', target: '#comp-mlqlfcyy5__item1', type: 'text', annotation: '10.1' },
  { key: 'home.research.card1.description', label: 'R&D card 1 description', section: 'rd-cards', target: '#comp-mlqlfcyu4__item1', type: 'text', annotation: '10.1' },
  { key: 'home.research.card2.image', label: 'R&D card 2 image', section: 'rd-cards', target: 'img[alt*="woman-scientist-doing-experiment"]', type: 'image', annotation: '10.2' },
  { key: 'home.research.card2.title', label: 'R&D card 2 title', section: 'rd-cards', target: '#comp-mlqlfcyy5__item-j9ples3e', type: 'text', annotation: '10.2' },
  { key: 'home.research.card2.description', label: 'R&D card 2 description', section: 'rd-cards', target: '#comp-mlqlfcyu4__item-j9ples3e', type: 'text', annotation: '10.2' },
  { key: 'home.research.card3.image', label: 'R&D card 3 image', section: 'rd-cards', target: 'img[alt*="science-research-lab-microscope"]', type: 'image', annotation: '10.3' },
  { key: 'home.research.card3.title', label: 'R&D card 3 title', section: 'rd-cards', target: '#comp-mlqlfcyy5__item-j9plerjk', type: 'text', annotation: '10.3' },
  { key: 'home.research.card3.description', label: 'R&D card 3 description', section: 'rd-cards', target: '#comp-mlqlfcyu4__item-j9plerjk', type: 'text', annotation: '10.3' },
  { key: 'home.research.card4.image', label: 'R&D card 4 image', section: 'rd-cards', target: 'img[alt*="rd-card4-innovation-pipeline"]', type: 'image', annotation: '10.4', note: 'DOM cloned from card 3 (item-rdcard4) per TASK' },
  { key: 'home.research.card4.title', label: 'R&D card 4 title', section: 'rd-cards', target: '#comp-mlqlfcyy5__item-rdcard4', type: 'text', annotation: '10.4' },
  { key: 'home.research.card4.description', label: 'R&D card 4 description', section: 'rd-cards', target: '#comp-mlqlfcyu4__item-rdcard4', type: 'text', annotation: '10.4' },
  // ── 10 Product cards (tab: products) ────────────────────────────────
  { key: 'home.products.card1.image', label: 'Product card 1 image', section: 'products', target: 'img[alt*="obagi-nu-derm-fx-collection-1600x1600"]', type: 'image', annotation: '11.1' },
  { key: 'home.products.card1.title', label: 'Product card 1 title', section: 'products', target: '#comp-lwsw0tdf__item1', type: 'text', annotation: '11.1', note: 'H3 title (clipping fix); number slot #comp-lwsw0tdb8__item1 stays frozen' },
  { key: 'home.products.card1.subtitle', label: 'Product card 1 subtitle', section: 'products', target: '#comp-lwsw0tdg__item1', type: 'text', annotation: '11.1' },
  { key: 'home.products.card1.description', label: 'Product card 1 description', section: 'products', target: '#comp-lwsw0tdh5__item1', type: 'text', annotation: '11.1' },
  { key: 'home.products.card2.image', label: 'Product card 2 image', section: 'products', target: 'img[alt*="PDPmacro_4400x4400"]', type: 'image', annotation: '11.2' },
  { key: 'home.products.card2.title', label: 'Product card 2 title', section: 'products', target: '#comp-lwsw0tdf__item-j9ples3e', type: 'text', annotation: '11.2', note: 'H3 title (clipping fix); number slot frozen' },
  { key: 'home.products.card2.subtitle', label: 'Product card 2 subtitle', section: 'products', target: '#comp-lwsw0tdg__item-j9ples3e', type: 'text', annotation: '11.2' },
  { key: 'home.products.card2.description', label: 'Product card 2 description', section: 'products', target: '#comp-lwsw0tdh5__item-j9ples3e', type: 'text', annotation: '11.2' },
  { key: 'home.products.card3.image', label: 'Product card 3 image', section: 'products', target: 'img[alt*="elastiderm-facial-serum"]', type: 'image', annotation: '11.3' },
  { key: 'home.products.card3.title', label: 'Product card 3 title', section: 'products', target: '#comp-lwsw0tdf__item-j9plerjk', type: 'text', annotation: '11.3', note: 'H3 title (clipping fix); number slot frozen' },
  { key: 'home.products.card3.subtitle', label: 'Product card 3 subtitle', section: 'products', target: '#comp-lwsw0tdg__item-j9plerjk', type: 'text', annotation: '11.3' },
  { key: 'home.products.card3.description', label: 'Product card 3 description', section: 'products', target: '#comp-lwsw0tdh5__item-j9plerjk', type: 'text', annotation: '11.3' },
  { key: 'home.products.sectionTitle', label: 'Collections section title (NO TARGET)', section: 'products', target: '— absent in section [10] —', type: 'text', annotation: '12', note: 'BLOCKED: no title element in served section; editor removed, key retained' },
  // ── 11 Orphan audit (tab: orphan-audit, read-only) ──────────────────
  { key: 'home.galleryAudit.orphans', label: 'Orphan servable slots', section: 'orphan-audit', target: 'full sweep: 19 img + 2 video + 21 bgLayers', type: 'text', annotation: '12', note: '0 orphans — every slot owned; empty bgLayers out of scope with reason' },
  // ── 12 Video (tab: video) ───────────────────────────────────────────
  { key: 'home.video.primarySource', label: 'Award video source', section: 'video', target: '#comp-mlau0bjm_video[src]', type: 'video', annotation: '13' },
  { key: 'home.video.poster', label: 'Award video poster', section: 'video', target: '#comp-mlau0bjm_img img[src]', type: 'image', annotation: '13' },
  { key: 'home.video.title', label: 'Award video accessible title', section: 'video', target: '#comp-mlau0bjm_video[aria-label]', type: 'text', annotation: '13' },
  // ── 13 Slot-14 bg (tab: bg14) ───────────────────────────────────────
  { key: 'home.newsletter.backgroundImage', label: 'Newsletter band background (slot 14)', section: 'bg14', target: '#bgLayers_comp-lx8nvywg', type: 'image', annotation: '14', note: 'No inner img — URL layer shows' },
  // ── 14 Footer bg (tab: footer-bg) ───────────────────────────────────
  { key: 'home.footer.backgroundImage', label: 'Footer background', section: 'footer-bg', target: '#bgLayers_comp-ml6nay6u_r_comp-ljcmlawf', type: 'image', annotation: '15', note: 'No inner img — URL layer shows' },
  // ── 15 Footer/newsletter/floating/socials (tab: footer) ─────────────
  { key: 'home.footer.copyright', label: 'Footer legal/copyright', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx0hp721', type: 'text', annotation: '15' },
  { key: 'home.footer.logoImage', label: 'Footer logo image (replaces vector SVG)', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx02zbs6 a (innerHTML img swap)', type: 'image', annotation: '15', note: 'Empty = keep original SVG' },
  { key: 'home.footer.logoHref', label: 'Footer logo link target', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx02zbs6 a[href]', type: 'text', annotation: '15' },
  { key: 'home.footer.leftText', label: 'Footer left brand text (instead of logo)', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx02zbs6 a (span text)', type: 'text', annotation: '15', note: 'Wins over logoImage when both set' },
  { key: 'home.footer.logoImage', label: 'Footer logo image (replaces vector SVG)', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx02zbs6 a (innerHTML img swap)', type: 'image', annotation: '15', note: 'Empty = keep original SVG' },
  { key: 'home.footer.logoHref', label: 'Footer logo link target', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx02zbs6 a[href]', type: 'text', annotation: '15' },
  { key: 'home.footer.links[0].label', label: 'Footer link 1 label', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03t9a4 a (text)', type: 'text', annotation: '15' },
  { key: 'home.footer.links[0].href', label: 'Footer link 1 URL', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03t9a4 a[href]', type: 'text', annotation: '15' },
  { key: 'home.footer.links[1].label', label: 'Footer link 2 label', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03ty71 a (text)', type: 'text', annotation: '15' },
  { key: 'home.footer.links[1].href', label: 'Footer link 2 URL', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03ty71 a[href]', type: 'text', annotation: '15' },
  { key: 'home.footer.links[2].label', label: 'Footer link 3 label', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03uzo5 a (text)', type: 'text', annotation: '15' },
  { key: 'home.footer.links[2].href', label: 'Footer link 3 URL', section: 'footer', target: '#comp-ml6nay6u_r_comp-lx03uzo5 a[href]', type: 'text', annotation: '15' },
  { key: 'home.footer.links[3].label', label: 'Footer link 4 label', section: 'footer', target: '#comp-ml6nay6u_r_comp-mmiuuv9f a (text)', type: 'text', annotation: '15' },
  { key: 'home.footer.links[3].href', label: 'Footer link 4 URL', section: 'footer', target: '#comp-ml6nay6u_r_comp-mmiuuv9f a[href]', type: 'text', annotation: '15' },
  { key: 'home.newsletter.title', label: 'Newsletter heading', section: 'footer', target: '#comp-lx8nyczk6', type: 'text', annotation: '15' },
  { key: 'home.newsletter.subtitle', label: 'Newsletter description', section: 'footer', target: '#comp-lx8nzrma', type: 'text', annotation: '15' },
  { key: 'home.newsletter.emailLabel', label: 'Email input label', section: 'footer', target: 'label#form-field-label-*-comp-lx8nyczl10 (+aria fallback)', type: 'text', annotation: '15' },
  { key: 'home.newsletter.consentText', label: 'Consent line', section: 'footer', target: '"Yes, subscribe me to your newsletter." (exact text)', type: 'text', annotation: '15' },
  { key: 'home.newsletter.subscribeLabel', label: 'Subscribe button label', section: 'footer', target: '>SUBSCRIBE< (single occurrence)', type: 'text', annotation: '15' },
  { key: 'home.footer.socialIcons.instagram', label: 'Instagram icon file', section: 'footer', target: 'uri 11062b_ca1d83… (JSON+img synced)', type: 'image', annotation: '15', note: 'File only; profile link frozen' },
  { key: 'home.footer.socialIcons.youtube', label: 'YouTube icon file', section: 'footer', target: 'uri 11062b_30de4e… (JSON+img synced)', type: 'image', annotation: '15', note: 'File only; profile link frozen' },
  { key: 'home.footer.socialIcons.facebook', label: 'Facebook icon file', section: 'footer', target: 'uri 11062b_362ef8… (JSON+img synced)', type: 'image', annotation: '15', note: 'File only; profile link frozen' },
  { key: 'home.footer.socialIcons.x', label: 'X icon file', section: 'footer', target: 'uri 11062b_e82f42… (JSON+img synced)', type: 'image', annotation: '15', note: 'File only; profile link frozen' },
  { key: 'home.floating.chatLabel', label: 'Floating: Chat with AI', section: 'footer', target: '[data-hook="minimizedChatButton"][aria-label]', type: 'text', annotation: '15' },
  { key: 'home.floating.needHelp', label: 'Floating: Need Help?', section: 'footer', target: 'chat popover text node', type: 'text', annotation: '15' },
  { key: 'home.floating.explore', label: 'Floating: Explore Obagi', section: 'footer', target: 'chat quick-reply text node', type: 'text', annotation: '15' },
  { key: 'home.floating.aging', label: 'Floating: Address the Signs of Aging Skin', section: 'footer', target: 'chat quick-reply text node', type: 'text', annotation: '15' },
  // ── Site Metadata (tab: seo) ────────────────────────────────────────
  { key: 'home.seo.pageTitle', label: 'SEO <title>', section: 'seo', target: '<title>', type: 'seo-text', annotation: '15' },
  { key: 'home.seo.metaDescription', label: 'SEO meta description', section: 'seo', target: '<meta name="description">', type: 'seo-text', annotation: '15' },
  // ── Removed (no public target — BGS template placeholders) ──────────
  { key: 'home.numbers.*', label: 'Numbers/stats (REMOVED)', section: '—', target: 'section [12] replaced (BGS junk)', type: 'text', annotation: 'REMOVED', note: 'Editors removed; no genuine content lost' },
  { key: 'home.careers.*', label: 'Jobs (REMOVED)', section: '—', target: 'section [13/14] replaced (BGS junk)', type: 'text', annotation: 'REMOVED', note: 'Editors removed; San-Francisco placeholder jobs' },
  { key: 'home.press.*', label: 'Press (REMOVED)', section: '—', target: 'sections [15/16] replaced (BGS junk)', type: 'text', annotation: 'REMOVED', note: 'Editors removed; fake 2035 articles' },
  { key: 'home.quote.*', label: 'Executive quote (REMOVED)', section: '—', target: 'section [12] replaced (Megan Brown/BGS)', type: 'text', annotation: 'REMOVED', note: 'Editors removed; template placeholder' },
];
