import {
  ObagiHomeContent,
  ObagiPartnerSection,
  ObagiEnquirySection,
  defaultObagiHomeContent,
} from '../data/obagi-home-content';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * DESIGN LOCK: text/media values only. This patcher NEVER writes colors,
 * sizes, positions, or any other style — the `color` argument was removed.
 * innerHtml is always built from escapeHtml()'d CMS text upstream.
 */
function patchDiv(html: string, id: string, innerHtml: string): string {
  const re = new RegExp(`(<div\\s+id="${id}"[^>]*>)([\\s\\S]*?)(<\\/div>)`);
  return html.replace(re, (_m, open, _old, close) => {
    return open + innerHtml + close;
  });
}

function stripPictureSourcesForAlt(html: string, altKeyword: string): string {
  const picRe = new RegExp(
    `(<picture\\b[^>]*>)([\\s\\S]*?<img\\b[^>]*alt="[^"]*${altKeyword}[^"]*"[\\s\\S]*?)(<\\/picture>)`,
    'i'
  );
  return html.replace(picRe, (_m, open, inner, close) => {
    const cleanedInner = inner.replace(/<source\b[^>]*\/?>/gi, '');
    return open + cleanedInner + close;
  });
}

function patchImgByAlt(html: string, altKeyword: string, newSrc?: string): string {
  if (!newSrc) return html;
  const tagRe = new RegExp(`(<img\\b[^>]*alt="[^"]*${altKeyword}[^"]*"[^>]*>)`, 'i');
  const tagMatch = tagRe.exec(html);
  if (!tagMatch) return html;
  const oldSrc = (tagMatch[1].match(/\ssrc="([^"]*)"/i) || [])[1] || '';
  html = syncOldUri(html, oldSrc, newSrc);
  html = html.replace(tagRe, (tag) => {
    return tag.replace(/\ssrc="[^"]*"/i, ` src="${newSrc}"`).replace(/\ssrcset="[^"]*"/i, '');
  });
  html = stripPictureSourcesForAlt(html, altKeyword);
  return normalizeSwappedImgs(html, newSrc);
}

/**
 * Swaps the first <img> inside a container div (bg-layer photos carry no
 * alt text). Fragment-synced like patchImgByAlt, then normalized.
 * No-op when the layer holds no image nearby (never touches other images).
 */
function patchImgInLayer(html: string, layerId: string, newSrc?: string): string {
  if (!newSrc) return html;
  const probe = new RegExp(`id="${layerId}"[\\s\\S]{0,4000}?<img\\b[^>]*?\\ssrc="([^"]*)"`, 'i').exec(html);
  if (!probe) return html;
  html = syncOldUri(html, probe[1] || '', newSrc);
  return normalizeSwappedImgs(html, newSrc);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Extracts the bare Wix media URI stem (no ~mv2 suffix) from any URL. */
function wixFragOf(url: string): string {
  const m = (url || '').match(/([a-f0-9]{6,}_[a-f0-9]{20,}|11062b_[A-Za-z0-9~]+)/);
  return m ? (m[1] || '').replace(/~.*$/, '') : '';
}

/**
 * Fragment-syncs a replaced media URL across the whole document (see
 * replaceUriFragment). Returns html unchanged when there is nothing to sync.
 */
function syncOldUri(html: string, oldUrl: string, newSrc: string): string {
  const frag = wixFragOf(oldUrl);
  if (!frag || newSrc.indexOf(frag) !== -1) return html;
  return replaceUriFragment(html, frag, newSrc);
}

/**
 * Replaces a Wix media URI fragment EVERYWHERE it occurs — bare, with an
 * extension (`.jpg`), with `~mv2` suffixes, and with `/v1/...` crop params
 * (which repeat the URI at the end). Without full-suffix consumption,
 * remnants like `blob-url + .jpg/v1/...` survive in srcset/data-info/JSON,
 * and client-side Wix code picks them up (Vercel Blob 403s the suffixed
 * path → image never paints).
 */
function replaceUriFragment(html: string, frag: string, newSrc: string): string {
  const re = new RegExp(
    escapeRegExp(frag) + '(\\.[a-z0-9]+)?(~mv2(\\.[a-z0-9]+)?)?(\\/v1\\/[^"\'\\s<>]*)?',
    'g'
  );
  return html.replace(re, () => newSrc);
}

/**
 * Normalizes every <img> whose src merely CONTAINS newSrc (sync remnants
 * with wixstatic prefixes or /v1 suffixes) to exactly newSrc, minus srcset.
 * Also normalizes <source srcset="..."> to clean newSrc.
 * Belt-and-braces after any image swap — a remnant src 403s on Vercel Blob.
 */
function normalizeSwappedImgs(html: string, newSrc: string): string {
  html = html.replace(/<img\b[^>]*>/gi, (tag) => {
    const m = tag.match(/\ssrc="([^"]*)"/i);
    if (!m || m[1] === newSrc || m[1].indexOf(newSrc) === -1) return tag;
    return tag.replace(/\ssrc="[^"]*"/i, ` src="${newSrc}"`).replace(/\ssrcset="[^"]*"/i, '');
  });
  html = html.replace(/<source\b[^>]*>/gi, (tag) => {
    const m = tag.match(/\ssrcset="([^"]*)"/i);
    if (!m || m[1] === newSrc || m[1].indexOf(newSrc) === -1) return tag;
    return tag.replace(/\ssrcset="[^"]*"/i, ` srcset="${newSrc}"`);
  });
  return html;
}

/**
 * Replaces EVERY occurrence of a media URI fragment (both the <img> src and
 * the data-image-info JSON uri Wix embeds). Used for footer social icons,
 * whose fragment appears exactly twice (JSON + img). New URLs are Blob/CDN
 * https URLs — they contain no `"` so JSON stays valid.
 */
function patchUriFragmentAll(html: string, fragment: string, newSrc?: string): string {
  if (!newSrc || !fragment) return html;
  html = replaceUriFragment(html, fragment, newSrc);
  return normalizeSwappedImgs(html, newSrc);
}

/**
 * Spec 03 — the marquee ticker is ONE text node rendered 4× (copy 0 as inner
 * <span> text, copies 1–3 via data-text attrs). The literal ticker string is
 * globally unique, so one literal replace updates all copies + attrs.
 */
const TICKER_DEFAULT =
  'CLINICALLY-TESTED          |          TRANSFORMATIONAL SKINCARE          |          35 YEARS OF EXPERTISE          |          TRUSTED BY PHYSICIANS          |          PROVEN RESULTS';

function patchTicker(html: string, newTicker?: string): string {
  if (!newTicker || newTicker === TICKER_DEFAULT) return html;
  return html.split(TICKER_DEFAULT).join(escapeHtml(newTicker));
}

/** Replaces visible text inside a <button id="...">…</button> — text only. */
function patchButtonText(html: string, id: string, newText?: string): string {
  if (!newText) return html;
  const re = new RegExp(`(<button\\b[^>]*id="${id}"[^>]*>)([^<]*)(<)`, 'i');
  return html.replace(re, (_m, open, _old, lt) => `${open}${escapeHtml(newText)}${lt}`);
}

const FOOTER_LOGO_DIV = 'comp-ml6nay6u_r_comp-lx02zbs6';
const FOOTER_LINK_DIVS = [
  'comp-ml6nay6u_r_comp-lx03t9a4',
  'comp-ml6nay6u_r_comp-lx03ty71',
  'comp-ml6nay6u_r_comp-lx03uzo5',
  'comp-ml6nay6u_r_comp-mmiuuv9f',
];

/**
 * Footer logo — the Wix original is an inline vector SVG inside an anchor.
 * Priority: leftText (explicit wording) > logoImage > original SVG.
 * An uploaded image replaces the SVG (anchor + sizing container untouched);
 * empty everything = keep original. Href updates when logoHref is set.
 */
function patchFooterLogo(html: string, logoImage?: string, logoHref?: string, leftText?: string): string {
  const footerLogo = logoImage?.trim() || '/ryan/ryan-logo.png';
  const targetHref = (!logoHref || logoHref.includes('obagiindia.com')) ? '/' : logoHref.trim();
  const re = new RegExp(`(<div\\s+id="${FOOTER_LOGO_DIV}"[^>]*>\\s*<a\\b[^>]*>)([\\s\\S]*?)(<\\/a>)`, 'i');
  return html.replace(re, (_m, open, _old, close) => {
    const newOpen = open.replace(/href="[^"]*"/i, `href="${escapeHtml(targetHref)}"`);
    if (leftText) {
      return `${newOpen}<span class="font_9 wixui-rich-text__text">${escapeHtml(leftText)}</span>${close}`;
    }
    const img = `<img src="${escapeHtml(footerLogo)}" alt="Ryan Dermaceutics" class="ryan-footer-logo-img" style="width:100%;max-width:280px;height:auto;display:block;object-fit:contain;" />`;
    return newOpen + img + close;
  });
}

/**
 * Footer nav links — 4 fixed Wix anchors, label + href. Empty label keeps
 * the original slot; empty href keeps the original destination.
 */
function patchFooterLink(html: string, divId: string, label?: string, href?: string): string {
  if (!label && !href) return html;
  const re = new RegExp(`(<div\\s+id="${divId}"[^>]*>[\\s\\S]*?<a\\b[^>]*>)([\\s\\S]*?)(<\\/a>)`, 'i');
  return html.replace(re, (_m, open, old, close) => {
    const newOpen = href ? open.replace(/href="[^"]*"/i, `href="${escapeHtml(href)}"`) : open;
    return newOpen + (label ? escapeHtml(label) : old) + close;
  });
}

/**
 * Replaces the text of the newsletter email <label id="…comp-lx8nyczl10…">.
 * Precise (label id), so enquiry-form "Email" text elsewhere is untouched.
 */
function patchNewsletterEmailLabel(html: string, newLabel?: string): string {
  if (!newLabel) return html;
  return html.replace(
    /(<label\b[^>]*comp-lx8nyczl10[^>]*>)([^<]*)(<)/i,
    (_m, open, _old, lt) => `${open}${escapeHtml(newLabel)}${lt}`
  );
}

/**
 * DESIGN LOCK: swaps ONLY the background-image URL. Original
 * background-size/position/blur/overlay styles are never touched.
 */
function patchBg(html: string, id: string, newBgUrl?: string): string {
  if (!newBgUrl) return html;
  const re = new RegExp(`(<div\\s+id="${id}"[^>]*)(>)`, 'i');
  return html.replace(re, (_m, open, close) => {
    const styleAdditions = `background-image: url('${newBgUrl}'); `;
    if (open.includes('style="')) {
      return open.replace('style="', `style="${styleAdditions}`) + close;
    }
    return `${open} style="${styleAdditions}"${close}`;
  });
}

/**
 * Removes an entire <div> subtree by a data-hook marker, balancing nested
 * divs (regex alone can't). Returns html unchanged when not found.
 */
function removeDivByHook(html: string, hook: string): string {
  const openRe = new RegExp(`<div\\b[^>]*data-hook="${hook}"[^>]*>`, 'i');
  const openMatch = openRe.exec(html);
  if (!openMatch || openMatch.index === undefined) return html;
  let depth = 0;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = openMatch.index;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(html)) !== null) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0 && tagRe.lastIndex > openMatch.index) {
      return html.slice(0, openMatch.index) + html.slice(tagRe.lastIndex);
    }
  }
  return html;
}

/**
 * Swaps ONLY the src attribute of a <video> (or its <source>), preserving
 * autoplay/mute/loop/playsinline/preload and all inline sizing.
 */
function patchVideoSrc(html: string, videoId: string, newSrc?: string): string {
  if (!newSrc) return html;
  // Fragment-sync first: the old video URI may live in data attrs/JSON that
  // client players re-resolve (same flip class as images).
  const tagSrc = (html.match(new RegExp(`<video\\b[^>]*id="${videoId}"[^>]*?\\ssrc="([^"]*)"`, 'i')) || [])[1] || '';
  html = syncOldUri(html, tagSrc, newSrc);
  const re = new RegExp(`(<video\\b[^>]*id="${videoId}"[^>]*)(>)`, 'i');
  let out = html.replace(re, (_m, open, close) => {
    let tag = open.replace(/\ssrc="[^"]*"/i, '');
    tag += ` src="${newSrc}"`;
    return tag + close;
  });
  const srcRe = new RegExp(
    `(<video\\b[^>]*id="${videoId}"[^>]*>[\\s\\S]*?<source\\b[^>]*?)(\\ssrc="[^"]*")`,
    'i'
  );
  out = out.replace(srcRe, (_m, head) => head.replace(/\ssrc="[^"]*"/i, ` src="${newSrc}"`));
  return out;
}

/**
 * Sets/replaces the poster attribute of a <video> — visual slot only,
 * playback and sizing attributes untouched. No-op when URL is empty.
 */
function patchVideoPoster(html: string, videoId: string, newPoster?: string): string {
  if (!newPoster) return html;
  const oldPoster = (html.match(new RegExp(`<video\\b[^>]*id="${videoId}"[^>]*?\\sposter="([^"]*)"`, 'i')) || [])[1] || '';
  html = syncOldUri(html, oldPoster, newPoster);
  const re = new RegExp(`(<video\\b[^>]*id="${videoId}"[^>]*?)(\\s*>)`, 'i');
  return html.replace(re, (_m, open, close) => {
    const without = open.replace(/\sposter="[^"]*"/i, '');
    return `${without} poster="${newPoster}"${close}`;
  });
}

/**
 * Swaps the chat-button aria-label prefix ("Chat with AI, false, ").
 * Text only — the ", false, " state suffix is preserved verbatim.
 */
function patchChatAriaLabel(html: string, newLabel?: string): string {
  if (!newLabel) return html;
  return html.replace(
    /(data-hook="minimizedChatButton"[^>]*aria-label=")[^"]*(")/i,
    (_m, head, tail) => `${head}${escapeHtml(newLabel)}, false, ${tail}`
  );
}

/** Replaces an exact visible string inside a span/p (floating labels) — text only. */
function patchExactText(html: string, needle: string, replacement?: string): string {
  if (!replacement || needle === replacement) return html;
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.replace(
    new RegExp(`(>)(\\s*${esc}\\s*)(<)`, 'g'),
    (_m, gt, _t, lt) => `${gt}${escapeHtml(replacement)}${lt}`
  );
}

function renderPartnerSection(partner: ObagiPartnerSection): string {
  const p = partner || defaultObagiHomeContent.partner!;
  return `
<!-- PARTNER WITH RYAN DERMACEUTICS SECTION (Screenshot 2026-10-10 002225.jpg) -->
<section id="partner-section" class="obagi-ryan-partner-section" style="background: linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 40%, #ffffff 100%); padding: 80px 24px; border-top: 1px solid rgba(0,118,138,0.12); border-bottom: 1px solid rgba(0,118,138,0.12); font-family: 'Montserrat', system-ui, -apple-system, sans-serif;">
  <div style="max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px;">
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center;">
      
      <!-- Left Column: Copy, Features, Buttons -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <span style="display: inline-block; width: fit-content; padding: 6px 16px; border-radius: 9999px; background: rgba(0, 118, 138, 0.1); border: 1px solid rgba(0, 118, 138, 0.25); color: #00768a; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
          ${escapeHtml(p.tag || 'PARTNER WITH RYAN DERMACEUTICS')}
        </span>
        <h2 style="font-size: clamp(26px, 3.2vw, 42px); font-weight: 900; line-height: 1.15; color: #003d4d; text-transform: uppercase; margin: 0;">
          ${escapeHtml(p.title || 'BUILD THE FUTURE OF')} <span style="color: #00768a;">${escapeHtml(p.titleHighlight || 'DERMATOLOGY TOGETHER')}</span>
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0; max-width: 540px;">
          ${escapeHtml(p.subtitle || '')}
        </p>

        <!-- 4 Grid Features -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 8px;">
          ${(p.features || []).map(f => `
            <div style="display: flex; gap: 12px; align-items: flex-start; padding: 14px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); border: 1px solid rgba(0, 118, 138, 0.15); border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
              <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(0, 118, 138, 0.1); display: flex; align-items: center; justify-content: center; color: #00768a; flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <h4 style="font-size: 12px; font-weight: 800; color: #003d4d; text-transform: uppercase; margin: 0 0 4px 0;">${escapeHtml(f.title)}</h4>
                <p style="font-size: 11px; line-height: 1.45; color: #64748b; margin: 0;">${escapeHtml(f.description)}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Buttons — SINGLE bottom CTA: BECOME A DISTRIBUTOR opens the popup -->
        <div style="display: flex; flex-wrap: wrap; gap: 14px; margin-top: 12px;">
          <button type="button" id="obagi-become-distributor-btn" class="obagi-btn-primary" data-open-distributor-popup onclick="if(window.obagiOpenDistributorPopup){window.obagiOpenDistributorPopup('Distributor Partnership');}else if(window.openDistributorPopup){window.openDistributorPopup('Distributor Partnership');}" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 9999px; background: #00768a; color: #ffffff; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; box-shadow: 0 4px 14px rgba(0, 118, 138, 0.25); transition: all 0.2s ease; cursor: pointer; border: none; font-family: inherit;">
            <span>${escapeHtml(p.buttonText || 'BECOME A DISTRIBUTOR')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          ${p.secondaryButtonText && p.secondaryButtonText.trim() ? `
          <a href="#enquiry-section" class="obagi-btn-secondary" data-open-enquiry="Business Enquiry" onclick="if(window.obagiOpenDistributorPopup){event.preventDefault();window.obagiOpenDistributorPopup('Business Enquiry');}else if(window.openDistributorPopup){event.preventDefault();window.openDistributorPopup('Business Enquiry');}" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 9999px; background: #ffffff; border: 1.5px solid #00768a; color: #00768a; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; text-decoration: none; transition: all 0.2s ease; cursor: pointer;">
            <span>${escapeHtml(p.secondaryButtonText)}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>` : ''}
        </div>
      </div>

      <!-- Right Column: Pure CSS panel (NO image) + 4 Action Cards -->
      <div style="position: relative; border-radius: 24px; overflow: hidden; padding: 32px; background: linear-gradient(145deg, #003d4d 0%, #005a6e 45%, #00768a 100%); box-shadow: 0 16px 36px rgba(0,61,77,0.25); min-height: 440px; display: flex; flex-direction: column; justify-content: center; align-items: flex-end;">
        <!-- Pure CSS decorative layers — no external image -->
        <div aria-hidden="true" style="position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 85% 80%, rgba(0,229,255,0.14) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 40%);"></div>
        <div aria-hidden="true" style="position: absolute; width: 280px; height: 280px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.12); top: -60px; left: -40px; background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);"></div>
        <div aria-hidden="true" style="position: absolute; width: 180px; height: 180px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); bottom: -30px; right: 30%; background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);"></div>
        <div aria-hidden="true" style="position: absolute; width: 90px; height: 90px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.1); top: 18%; right: 12%; transform: rotate(18deg); background: rgba(255,255,255,0.04);"></div>
        <div aria-hidden="true" style="position: absolute; width: 48px; height: 48px; border-radius: 50%; background: rgba(0,229,255,0.15); top: 55%; left: 18%; filter: blur(2px);"></div>
        <div aria-hidden="true" style="position: absolute; width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.35); top: 28%; left: 42%;"></div>
        <div aria-hidden="true" style="position: absolute; width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.25); top: 42%; left: 28%;"></div>
        <div aria-hidden="true" style="position: absolute; width: 16px; height: 16px; border-radius: 50%; background: rgba(0,229,255,0.3); bottom: 30%; left: 38%;"></div>
        <!-- Subtle grid pattern -->
        <div aria-hidden="true" style="position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.6;"></div>
        <div style="position: relative; z-index: 2; width: 100%; max-width: 390px; display: flex; flex-direction: column; gap: 12px;">
          ${(p.actionCards || []).map(card => {
            const cardType = escapeHtml(card.enquiryType || card.title);
            const openTag = `a href="#enquiry-section" data-open-enquiry="${cardType}" onclick="if(window.obagiOpenDistributorPopup){event.preventDefault();window.obagiOpenDistributorPopup('${cardType}');}else if(window.openDistributorPopup){event.preventDefault();window.openDistributorPopup('${cardType}');}"`;
            const closeTag = 'a';
            return `
            <${openTag} class="obagi-action-card" style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.7); border-radius: 16px; text-decoration: none; box-shadow: 0 4px 16px rgba(0,0,0,0.1); transition: all 0.2s ease; cursor: pointer; width: 100%; text-align: left; font-family: inherit; color: inherit;">
              <div>
                <h4 style="font-size: 13px; font-weight: 900; color: #003d4d; text-transform: uppercase; margin: 0 0 2px 0;">${escapeHtml(card.title)}</h4>
                <p style="font-size: 11px; color: #64748b; margin: 0;">${escapeHtml(card.description)}</p>
              </div>
              <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(0, 118, 138, 0.1); display: flex; align-items: center; justify-content: center; color: #00768a; flex-shrink: 0; margin-left: 12px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </${closeTag}>
          `;
          }).join('')}
        </div>
      </div>

    </div>
  </div>
</section>
`;
}

function telHref(phone: string): string {
  return 'tel:' + String(phone || '').replace(/[^\d+]/g, '');
}

function renderDistributorPopup(enquiry: ObagiEnquirySection): string {
  const e = enquiry || defaultObagiHomeContent.enquiry!;
  const types = e.enquiryTypes || ['Distributor Partnership', 'Business Enquiry', 'Product Enquiry', 'Medical Information', 'Other Support'];
  return `
<!-- DISTRIBUTOR ENQUIRY POPUP (modal) — full GET IN TOUCH (contact + form), CMS-driven; opens only from BECOME A DISTRIBUTOR; success only after API confirms DB save -->
<div id="obagi-distributor-popup" class="obagi-popup-overlay" style="display:none; position:fixed; inset:0; z-index:2147483647; background: rgba(0, 30, 40, 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 20px; font-family: 'Montserrat', system-ui, -apple-system, sans-serif; box-sizing: border-box;">
  <div id="obagi-distributor-popup-panel" role="dialog" aria-modal="true" aria-labelledby="obagi-popup-title" style="background: #ffffff; border-radius: 20px; width: 100%; max-width: 880px; max-height: 92vh; overflow-y: auto; box-shadow: 0 24px 64px rgba(0,0,0,0.35); position: relative; box-sizing: border-box;">
    <button type="button" id="obagi-popup-close" aria-label="Close popup" onclick="if(window.obagiCloseDistributorPopup){window.obagiCloseDistributorPopup();}else if(window.closeDistributorPopup){window.closeDistributorPopup();}" style="position: absolute; top: 14px; right: 14px; width: 38px; height: 38px; border-radius: 50%; border: 1px solid #cbd5e1; background: #ffffff; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #334155; z-index: 10; padding: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: all 0.2s ease;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <div style="padding: 36px 32px 28px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 32px; align-items: flex-start;">

      <!-- LEFT: GET IN TOUCH contact block (same as enquiry section, CMS-driven) -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <span style="display: inline-block; width: fit-content; padding: 5px 12px; border-radius: 9999px; background: rgba(0, 118, 138, 0.1); border: 1px solid rgba(0, 118, 138, 0.25); color: #00768a; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
          ${escapeHtml(e.tag || 'GET IN TOUCH')}
        </span>
        <h3 id="obagi-popup-title" style="font-size: clamp(18px, 2vw, 24px); font-weight: 900; color: #003d4d; text-transform: uppercase; margin: 0; line-height: 1.15;">
          ${escapeHtml(e.title || 'CONNECT WITH RYAN DERMACEUTICS')}
        </h3>
        <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin: 0;">
          ${escapeHtml(e.subtitle || '')}
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <span style="display:block; font-size: 10px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Phone</span>
              <a href="${telHref(e.phone || '+91 12345 67890')}" style="font-size: 12px; font-weight: 600; color: #475569; text-decoration: none;">${escapeHtml(e.phone || '+91 12345 67890')}</a>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div>
              <span style="display:block; font-size: 10px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Email</span>
              <a href="mailto:${escapeHtml(e.email || 'info@ryandermaceutics.com')}" style="font-size: 12px; font-weight: 600; color: #475569; text-decoration: none; word-break: break-all;">${escapeHtml(e.email || 'info@ryandermaceutics.com')}</a>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <span style="display:block; font-size: 10px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Address</span>
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.address || 'Ahmedabad, Gujarat, India')}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; font-weight: 600; color: #00768a; text-decoration: underline;" title="View on Google Maps">${escapeHtml(e.address || 'Ahmedabad, Gujarat, India')}</a>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <span style="display:block; font-size: 10px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Working Hours</span>
              <span style="font-size: 12px; font-weight: 600; color: #475569;">${escapeHtml(e.workingHours || 'Mon – Sat 9:00 AM – 6:00 PM')}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: SEND US AN ENQUIRY form -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 8px 24px rgba(0,0,0,0.05);">
        <h4 style="font-size: 16px; font-weight: 900; color: #003d4d; text-transform: uppercase; margin: 0 0 16px 0; letter-spacing: -0.01em;">
          SEND US AN ENQUIRY
        </h4>
        <form id="distributor-popup-form" novalidate style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label for="dp-name" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Name <span style="color: #ef4444;">*</span></label>
              <input id="dp-name" type="text" name="name" required placeholder="Your Name" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
            </div>
            <div>
              <label for="dp-designation" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Designation</label>
              <input id="dp-designation" type="text" name="designation" placeholder="e.g. Doctor / Distributor" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
            </div>
          </div>
          <div>
            <label for="dp-organization" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Organization <span style="color: #ef4444;">*</span></label>
            <input id="dp-organization" type="text" name="organization" required placeholder="Hospital / Clinic / Company" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label for="dp-city" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">City <span style="color: #ef4444;">*</span></label>
              <input id="dp-city" type="text" name="city" required placeholder="Your City" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
            </div>
            <div>
              <label for="dp-state" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">State <span style="color: #ef4444;">*</span></label>
              <select id="dp-state" name="state" required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; background: #ffffff;">
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Other">Other State / UT</option>
              </select>
            </div>
          </div>
          <div>
            <label for="dp-enquiry-type" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Enquiry Type <span style="color: #ef4444;">*</span></label>
            <select id="dp-enquiry-type" name="enquiryType" required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; background: #ffffff;">
              <option value="">Select Enquiry Type</option>
              ${types.map(t => `<option value="${escapeHtml(t)}"${t === 'Distributor Partnership' ? ' selected' : ''}>${escapeHtml(t)}</option>`).join('')}
            </select>
          </div>
          <div>
            <label for="dp-message" style="display: block; font-size: 11px; font-weight: 700; color: #1e293b; margin-bottom: 4px;">Message <span style="color: #ef4444;">*</span></label>
            <textarea id="dp-message" name="message" required rows="2" placeholder="Your Message" style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; resize: vertical;"></textarea>
          </div>
          <button type="submit" id="distributor-popup-submit" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 13px; border-radius: 9999px; background: #00768a; border: none; color: #ffffff; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; font-family: inherit; transition: background 0.2s ease;">
            <span>SUBMIT ENQUIRY</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <div id="distributor-popup-feedback" style="display: none; padding: 12px 14px; border-radius: 10px; font-size: 12px; text-align: center;"></div>
        </form>
      </div>
    </div>
  </div>
</div>
`;
}

function renderEnquirySection(enquiry: ObagiEnquirySection): string {
  const e = enquiry || defaultObagiHomeContent.enquiry!;
  return `
<!-- CONNECT WITH RYAN DERMACEUTICS & SEND US AN ENQUIRY FORM (Screenshot 2026-10-10 002514.jpg) -->
<section id="enquiry-section" class="obagi-ryan-enquiry-section" style="background: #ffffff; padding: 80px 24px; font-family: 'Montserrat', system-ui, -apple-system, sans-serif;">
  <div style="max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: flex-start;">
    
    <!-- Left Column: Contact Details -->
    <div style="display: flex; flex-direction: column; gap: 28px;">
      <span style="display: inline-block; width: fit-content; padding: 6px 16px; border-radius: 9999px; background: rgba(0, 118, 138, 0.08); border: 1px solid rgba(0, 118, 138, 0.2); color: #00768a; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;">
        ${escapeHtml(e.tag || 'GET IN TOUCH')}
      </span>
      <h2 style="font-size: clamp(26px, 3.2vw, 42px); font-weight: 900; line-height: 1.15; color: #003d4d; text-transform: uppercase; margin: 0;">
        ${escapeHtml(e.title || 'CONNECT WITH RYAN DERMACEUTICS')}
      </h2>
      <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin: 0; max-width: 500px;">
        ${escapeHtml(e.subtitle || '')}
      </p>

      <!-- 4 Icons Row: Phone, Email, Address, Hours -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 20px; margin-top: 12px;">
        <!-- Phone -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Phone</span>
          <a href="${telHref(e.phone || '+91 12345 67890')}" style="font-size: 12px; font-weight: 600; color: #475569; text-decoration: none;">${escapeHtml(e.phone || '+91 12345 67890')}</a>
        </div>
        <!-- Email -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Email</span>
          <a href="mailto:${escapeHtml(e.email || 'info@ryandermaceutics.com')}" style="font-size: 12px; font-weight: 600; color: #475569; word-break: break-all; text-decoration: none;">${escapeHtml(e.email || 'info@ryandermaceutics.com')}</a>
        </div>
        <!-- Address -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Address</span>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.address || 'Ahmedabad, Gujarat, India')}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; font-weight: 600; color: #00768a; text-decoration: underline;" title="View on Google Maps">${escapeHtml(e.address || 'Ahmedabad, Gujarat, India')}</a>
        </div>
        <!-- Working Hours -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: #0284c7;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: #003d4d; text-transform: uppercase;">Working Hours</span>
          <span style="font-size: 12px; font-weight: 600; color: #475569;">${escapeHtml(e.workingHours || 'Mon – Sat 9:00 AM – 6:00 PM')}</span>
        </div>
      </div>
    </div>

    <!-- Right Column: SEND US AN ENQUIRY Card -->
    <div id="enquiry-card-container" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 36px; box-shadow: 0 12px 32px rgba(0,0,0,0.06); width: 100%; box-sizing: border-box; transition: box-shadow 0.3s ease, border-color 0.3s ease;">
      <h3 style="font-size: 20px; font-weight: 900; color: #003d4d; text-transform: uppercase; margin: 0 0 24px 0; letter-spacing: -0.01em;">
        SEND US AN ENQUIRY
      </h3>
      <form id="enquiry-form" novalidate style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Name <span style="color: #ef4444;">*</span></label>
            <input type="text" name="name" required placeholder="Your Name" style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Designation</label>
            <input type="text" name="designation" placeholder="e.g. Doctor / Distributor" style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Organization <span style="color: #ef4444;">*</span></label>
            <input type="text" name="organization" required placeholder="Hospital / Clinic / Company" style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">City <span style="color: #ef4444;">*</span></label>
            <input type="text" name="city" required placeholder="Your City" style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">State <span style="color: #ef4444;">*</span></label>
            <select name="state" required style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; background: #ffffff;">
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Delhi">Delhi</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Other">Other State / UT</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Enquiry Type <span style="color: #ef4444;">*</span></label>
            <select name="enquiryType" id="enquiry-type-select" required style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; background: #ffffff;">
              <option value="">Select Enquiry Type</option>
              ${(e.enquiryTypes || ['Distributor Partnership', 'Business Enquiry', 'Product Enquiry', 'Medical Information', 'Other Support']).map(t => `
                <option value="${escapeHtml(t)}">${escapeHtml(t)}</option>
              `).join('')}
            </select>
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">Message <span style="color: #ef4444;">*</span></label>
          <textarea name="message" required rows="3" placeholder="Your Message" style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 13px; font-family: inherit; box-sizing: border-box; outline: none; resize: vertical;"></textarea>
        </div>

        <button type="submit" id="enquiry-submit-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 9999px; background: #00768a; border: none; color: #ffffff; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: all 0.2s ease; margin-top: 8px;">
          <span>SUBMIT ENQUIRY</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <div id="enquiry-feedback" style="display: none; padding: 12px 16px; border-radius: 10px; font-size: 13px; text-align: center; margin-top: 8px;"></div>
      </form>
    </div>

  </div>
</section>
`;
}

export function patchHtmlWithCms(html: string, data: ObagiHomeContent): string {
  let result = html;

  // Base brand migration on static Wix template HTML (runs first so CMS-edited values are never mutated)
  {
    const MIRROR_PH = '__RYAN_MIRROR_PATH__';
    const INIT_PH = '__RYAN_INIT_FN__';
    result = result.split('./Obagi India _ obagi products_files/').join(MIRROR_PH);
    result = result.split('initObagi').join(INIT_PH);
    result = result.split('Obagi India').join('Ryan');
    result = result.split('Obagi').join('Ryan');
    result = result.split('OBAGI® MEDICAL IS THE ORIGINAL').join('RYAN® MEDICAL IS THE ORIGINAL');
    result = result.split('Join The OBAGI Newsletter').join('Join The RYAN Newsletter');
    result = result.split('https://www.obagiindia.com').join('https://ryandarma.com');
    result = result.split('https://obagiindia.com').join('https://ryandarma.com');
    result = result.split('http://www.obagiindia.com').join('https://ryandarma.com');
    result = result.split(INIT_PH).join('initObagi');
    result = result.split(MIRROR_PH).join('./Obagi India _ obagi products_files/');
  }

  // 1. Header Logo — replaces the Wix vector inside
  // .comp-lw3c3n7z_r_comp-lwqc45m1-container with /ryan/ryan-logo.png.
  // Layout box (147x85 desktop) is untouched; the image fills its container
  // so size/alignment never change. Falls back to the Ryan logo when CMS
  // logoUrl is empty so the header can never render the old Obagi mark.
  // NOTE: use site-relative "/ryan/ryan-logo.png" (resolves to
  // http://localhost:3000/ryan/ryan-logo.png locally) — never hard-code
  // localhost, which breaks production.
  // IMPORTANT: the <img>-swap pattern MUST NOT span past the svgRoot
  // </div> — an unbounded [\s\S]*? previously matched a distant hero
  // <img> and corrupted it while leaving this SVG untouched.
  {
    const logoSrc =
      data.header?.logoUrl?.trim() ||
      defaultObagiHomeContent.header?.logoUrl?.trim() ||
      '/ryan/ryan-logo.png';
    const logoImgRe = /(<div\s+data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>(?:(?!<\/div>)[\s\S])*?<img\b[^>]*?)(\ssrc="[^"]*")/i;
    if (logoImgRe.test(result)) {
      result = result.replace(
        logoImgRe,
        (_m, head) => `${head} src="${logoSrc}"`
      );
    } else {
      const logoRe = /(<div\s+data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>)([\s\S]*?)(<\/div>)/;
      if (logoRe.test(result)) {
        // No nested <a>: the vector node already sits inside the header
        // link anchor — just swap the SVG for the Ryan <img>.
        result = result.replace(logoRe, (_m, open, _old, close) => {
          return `${open}<img src="${logoSrc}" alt="Ryan Dermaceutics logo" width="148" height="85" fetchpriority="high" style="width:100%;height:100%;object-fit:contain;display:block;" />${close}`;
        });
      } else {
        // Last resort: swap the whole vector-image node inside
        // .comp-lw3c3n7z_r_comp-lwqc45m1-container (user-requested slot).
        const vectorRe = /(<div\s+id="comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>)[\s\S]*?(<\/div>\s*<\/a>\s*<\/div>)/i;
        if (vectorRe.test(result)) {
          result = result.replace(vectorRe, (_m, open, close) => {
            return `${open}<a data-testid="linkElement" href="/" target="_self" class="IT88M3"><div data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb" class="iL7Pq5 gx51wo"><img src="${logoSrc}" alt="Ryan Dermaceutics logo" width="148" height="85" fetchpriority="high" style="width:100%;height:100%;object-fit:contain;display:block;" /></div></a>${close}`;
          });
        }
      }
    }
    // Point the header logo link at our homepage, not obagiindia.com.
    result = result.replace(
      /(<div\s+id="comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>\s*<a\b[^>]*?)href="[^"]*"/i,
      (_m, head) => `${head}href="/"`
    );
  }

  // 1b. Header utility labels (Spec 01) — in-place text patches on stable
  // hooks. Destinations, order and behavior are never touched.
  if (data.header?.skipToContentLabel) {
    result = patchButtonText(result, 'SKIP_TO_CONTENT_BTN', data.header.skipToContentLabel);
  }
  if (data.header?.broughtToIndiaByText) {
    // Appears twice (button aria-label + visible label span) — same logical
    // label, so both copies stay in sync via one literal replace.
    result = result
      .split('Brought to you in India by SPECTRA')
      .join(escapeHtml(data.header.broughtToIndiaByText));
  }
  if (data.header?.searchLabel) {
    result = result.replace(
      /aria-label="Search"/g,
      `aria-label="${escapeHtml(data.header.searchLabel)}"`
    );
  }
  if (data.header?.menuLabel) {
    // Desktop + mobile hamburger share one logical label (sync rule).
    result = result.replace(
      /aria-label="Menu"/g,
      `aria-label="${escapeHtml(data.header.menuLabel)}"`
    );
  }

  // 1c. Header CTA — the SPECTRA anchor (#comp-lw3c3n7z_r_comp-mlethlmo)
  // is removed entirely (was retargeted to Explore Products before).
  result = result.replace(
    /<a\b[^>]*id="comp-lw3c3n7z_r_comp-mlethlmo"[^>]*>[\s\S]*?<\/a>/gi,
    ''
  );

  // 1d. Header search — retired: the Wix <search> slot is dropped with
  // nothing in its place (trigger + overlay + index all removed per
  // request). The <search> element itself is removed so no dead Wix
  // search UI remains.
  result = result.replace(/<search\b[^>]*>[\s\S]*?<\/search>/i, '');

  // 2. Header Nav Menu with Dropdown Children & Carets (Annotation 1)
  const navItems = (data.header?.navMenu && Array.isArray(data.header.navMenu) && data.header.navMenu.length > 0)
    ? data.header.navMenu
    : (defaultObagiHomeContent.header?.navMenu || []);

  const caretSvg = `<svg class="obagi-nav-caret" width="9" height="6" viewBox="0 0 16 11" fill="currentColor" style="display:inline-block; margin-left:6px; transition:transform 0.2s ease;"><path d="M8 10.5L16 1.86193L14.7387 0.5L8 7.77613L1.26133 0.499999L-5.95321e-08 1.86193L8 10.5Z"/></svg>`;

  const desktopNavItemsHtml = navItems.map((item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const subMenuHtml = hasChildren
      ? `
      <ul class="obagi-sub-menu">
        ${item.children!.map((ch) => `
          <li class="obagi-sub-item">
            <a href="${escapeHtml(ch.link || '#')}">${escapeHtml(ch.label)}</a>
          </li>
        `).join('')}
      </ul>
    `
      : '';

    return `
      <li class="obagi-menu-item ${hasChildren ? 'obagi-has-dropdown' : ''}" style="position:relative; display:inline-flex; align-items:center; height:100%;">
        <a href="${escapeHtml(item.link || '#')}" class="obagi-top-link" style="display:inline-flex; align-items:center; text-decoration:none; color:#000000; font-family:'Montserrat', sans-serif, system-ui; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; padding:10px 4px; transition:color 0.2s ease;">
          <span>${escapeHtml(item.label)}</span>
          ${hasChildren ? caretSvg : ''}
        </a>
        ${subMenuHtml}
      </li>
    `;
  }).join('');

  const desktopNavHtml = `
<nav class="obagi-clean-desktop-nav" aria-label="Site Navigation" style="display:flex; align-items:center; height:100%;">
  <ul class="obagi-clean-nav-list" style="display:flex; align-items:center; list-style:none; margin:0; padding:0; gap:28px;">
    ${desktopNavItemsHtml}
  </ul>
</nav>
`;

  const mobileNavItemsHtml = navItems.map((item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    return `
      <li style="display:flex; flex-direction:column; gap:8px;">
        <a href="${escapeHtml(item.link || '#')}" style="display:flex; align-items:center; justify-content:space-between; font-family:'Montserrat', sans-serif, system-ui; font-size:16px; font-weight:700; color:#003d4d; text-decoration:none; text-transform:uppercase;">
          <span>${escapeHtml(item.label)}</span>
        </a>
        ${hasChildren ? `
          <ul style="display:flex; flex-direction:column; list-style:none; margin:0; padding:4px 0 6px 16px; gap:8px; border-left:2px solid #00768a;">
            ${item.children!.map((ch) => `
              <li>
                <a href="${escapeHtml(ch.link || '#')}" style="font-family:'Montserrat', sans-serif, system-ui; font-size:13px; font-weight:600; color:#475569; text-decoration:none;">${escapeHtml(ch.label)}</a>
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </li>
    `;
  }).join('');

  const mobileNavHtml = `
<nav class="obagi-clean-mobile-nav" aria-label="Mobile Site Navigation" style="display:flex; flex-direction:column; padding:24px 20px;">
  <ul style="display:flex; flex-direction:column; list-style:none; margin:0; padding:0; gap:18px;">
    ${mobileNavItemsHtml}
  </ul>
</nav>
`;

  let navReplaceIndex = 0;
  const navRe = /<nav\s+class="[^"]*wixui-horizontal-menu[\s\S]*?<\/nav>/g;
  result = result.replace(navRe, () => {
    navReplaceIndex++;
    if (navReplaceIndex === 1) {
      return desktopNavHtml;
    }
    return mobileNavHtml;
  });

  // 2c. Mobile hamburger button (m8oie6mg: "Menu" label + three-bar
  // icon) becomes a compact horizontal nav bar; the orphan two-bar icon
  // in the header hamburger (m8mvebw9) is dropped (text button stays and
  // still opens the drawer).
  result = result.replace(
    /<svg\b[^>]*data-bbox="26\.7 74\.6 146\.6 50\.8"[^>]*>[\s\S]*?<\/svg>/i,
    ''
  );
  const ryanMobileBarHtml = `
<div class="ryan-mobile-wrap">
  <button type="button" id="ryan-mobile-toggle" aria-expanded="false" aria-label="Open menu">
    <svg width="22" height="22" viewBox="0 0 200 200" aria-hidden="true"><g fill="currentColor"><path d="M173.3 74.6v14.1H26.7V74.6h146.6z"></path><path d="M173.3 111.3v14.1H26.7v-14.1h146.6z"></path><path d="M173.3 148v14.1H26.7V148h146.6z"></path></g></svg>
  </button>
  <div class="ryan-mobile-popup" hidden>
    <div class="ryan-mobile-backdrop" data-ryan-mobile-close></div>
    <div class="ryan-mobile-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="ryan-mobile-panel-head">
        <span>Menu</span>
        <button type="button" data-ryan-mobile-close aria-label="Close menu">✕</button>
      </div>
      <nav class="ryan-mobile-bar" aria-label="Mobile">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/products">Products</a>
        <a href="/for-doctors">Doctors</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
  </div>
</div>`;
  result = result.replace(
    /<div\s+id="comp-lw3c3n7z_r_comp-m8oie6mg"[^>]*>[\s\S]*?<\/nav>\s*<!--\/\$-->\s*<\/div>/i,
    ryanMobileBarHtml
  );
  // 2b. Hamburger overlay menu — the Wix panel (m8mvebwi) ships EMPTY
  // (items render client-side via the neutered runtime) and a second
  // portal duplicate (m8oie6li) exists. Inject the Ryan drawer menu
  // (same links as RyanHeader's Toggle Navigation drawer) after the
  // overlay close button; the duplicate is hidden in §14 CSS. Toggle
  // lives in obagi-cms-sync.js (initMobileMenu).
  const ryanDrawerLink = (href: string, label: string, strong = false) => `
    <a href="${href}" style="display:block; padding:10px 12px; border-radius:10px; font-family:'Montserrat', sans-serif, system-ui; font-size:13px; ${strong ? 'font-weight:700; color:#00768a; background:#ffffff; border:1px solid rgba(0,118,138,0.18);' : 'font-weight:600; color:#004f5e; background:#ffffff;'} text-decoration:none;">${escapeHtml(label)}</a>`;
  const ryanDrawerHtml = `
<nav class="ryan-drawer-nav" aria-label="Site navigation" style="display:flex; flex-direction:column; gap:16px; padding:20px;">
  <div style="padding:12px; background:rgba(0,118,138,0.07); border:1px solid rgba(0,118,138,0.15); border-radius:14px; display:flex; flex-direction:column; gap:8px;">
    <span style="font-family:'Montserrat', sans-serif, system-ui; font-size:11px; font-weight:800; letter-spacing:0.08em; color:#006070;">FOR DOCTORS PORTAL</span>
    ${ryanDrawerLink('/for-doctors', 'Doctor Portal Overview & Directory', true)}
    ${ryanDrawerLink('/for-doctors/therapeutic-resources', 'Therapeutic Resources Hub')}
    ${ryanDrawerLink('/products', 'Product Monographs (53 Products)')}
    ${ryanDrawerLink('/for-doctors/prescribing-information', 'Prescribing Information')}
    ${ryanDrawerLink('/for-doctors/reference-library', 'Dermatology Reference Library')}
    ${ryanDrawerLink('/for-doctors/medical-information', 'Medical Information Service')}
  </div>
  <div style="display:flex; flex-direction:column; font-family:'Montserrat', sans-serif, system-ui; font-size:14px; font-weight:600;">
    ${[
      ['/', 'Home'],
      ['/about', 'About Ryan'],
      ['/products', 'Products'],
      ['/#therapeutic-areas', 'Therapeutic Areas'],
      ['/#contact', 'Contact'],
    ]
      .map(
        ([href, label]) =>
          `<a href="${href}" style="padding:10px 12px; border-radius:10px; color:#334155; text-decoration:none;">${label}</a>`
      )
      .join('')}
  </div>
  <a href="/products" style="display:flex; align-items:center; justify-content:center; gap:8px; padding:12px 16px; border-radius:12px; background:#00768a; color:#ffffff; font-family:'Montserrat', sans-serif, system-ui; font-size:12px; font-weight:800; letter-spacing:0.06em; text-decoration:none;">Explore Products →</a>
</nav>`;
  result = result.replace(
    /(<div\s+id="comp-lw3c3n7z_r_comp-m8mvebwp"[\s\S]*?<\/button>\s*<\/div>)/i,
    (_m, closeDiv) => `${closeDiv}${ryanDrawerHtml}`
  );

  // 3. Hero Section (annotation 02 — text + image + video, each independent)
  if (data.hero) {
    const heroTitleHtml = `<h1 class="font_0 wixui-rich-text__text"><span class="wixui-rich-text__text">${escapeHtml(data.hero.title)}</span></h1>`;
    result = patchDiv(result, 'comp-lxriadds', heroTitleHtml);

    const badgeLines = (data.hero.awardBadge || '')
      .split('\n')
      .map((l) => escapeHtml(l))
      .join('<br class="wixui-rich-text__text">');
    const badgeHtml = `<h2 class="font_3 wixui-rich-text__text">${badgeLines}</h2>`;
    result = patchDiv(result, 'comp-lxriaddt', badgeHtml);

    if (data.hero.heroImage) {
      result = patchImgByAlt(result, 'drop', data.hero.heroImage);
    }
    const heroVid = data.hero.heroVideoUrl || (data.hero as any).heroVideo;
    if (heroVid) {
      // Existing hero bg video only — playback attrs untouched.
      result = patchVideoSrc(result, 'comp-lwxgxhly_video', heroVid);
    }
    const heroPoster = data.hero.heroVideoPoster || data.hero.backgroundImage || 'https://static.wixstatic.com/media/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg/v1/fill/w_1265,h_585,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg';
    result = patchVideoPoster(result, 'comp-lwxgxhly_video', heroPoster);
    const oldPoster = (result.match(/<wow-image\b[^>]*id="comp-lwxgxhly_img"[^>]*>[\s\S]*?<img\b[^>]*?\ssrc="([^"]*)"/i) || [])[1] || '';
    if (oldPoster && oldPoster !== heroPoster) {
      result = syncOldUri(result, oldPoster, heroPoster);
    }
    result = result.replace(
      /(<wow-image\b[^>]*id="comp-lwxgxhly_img"[^>]*>[\s\S]*?<img\b[^>]*?)(\ssrc="[^"]*")/i,
      (_m, head) => `${head} src="${heroPoster}"`
    );
    result = normalizeSwappedImgs(result, heroPoster);
    // Unconditionally make poster image visible on initial load (prevents black screen flash)
    result = result.replace(
      /(<wow-image\b[^>]*id="comp-lwxgxhly_img"[^>]*style=")[^"]*(")/i,
      (_m, head, tail) => `${head}opacity: 1; display: block;${tail}`
    );
    if (data.hero.backgroundImage) {
      // Hero band background photo (bg-layer inner img, no alt text).
      result = patchBg(result, 'comp-lwxgxhly', data.hero.backgroundImage);
      result = patchBg(result, 'bgLayers_comp-lwxgxhly', data.hero.backgroundImage);
      result = patchImgInLayer(result, 'bgLayers_comp-lwxgxhly', data.hero.backgroundImage);
      if (!data.hero.heroVideoUrl) {
        result = result.replace(
          /(<video\b[^>]*id="comp-lwxgxhly_video"[^>]*style=")[^"]*(")/i,
          (_m, head, tail) => `${head}display: none !important; opacity: 0;${tail}`
        );
      }
    }
    if (data.hero.awardBadgeImage) {
      result = patchImgByAlt(result, 'aesthetics award winner', data.hero.awardBadgeImage);
    }

    if (data.hero.historyIntroText) {
      const historyIntroHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(data.hero.historyIntroText)}</p>`;
      result = patchDiv(result, 'comp-lwqgbmmr', historyIntroHtml);
    }
  }

  // 4. Trust Banner & Brand Pillars (all 4 pillars incl. item-mlqnbcvm)
  if (data.trustBanner) {
    if (data.trustBanner.tickerText) {
      result = patchTicker(result, data.trustBanner.tickerText);
    }
    if (data.trustBanner.marqueeBgImage) {
      // bgLayers_comp-mlqkez2p has NO inner <img> (audit7) — layering shows.
      result = patchBg(result, 'bgLayers_comp-mlqkez2p', data.trustBanner.marqueeBgImage);
    }
    if (data.trustBanner.recommendedHeading) {
      const recHtml = `<p class="font_2 wixui-rich-text__text">${escapeHtml(data.trustBanner.recommendedHeading)}</p>`;
      result = patchDiv(result, 'comp-mlqmnjp2', recHtml);
    }
    if (data.trustBanner.concernsText) {
      const concernsHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(data.trustBanner.concernsText)}</p>`;
      result = patchDiv(result, 'comp-mlqmnjoy8', concernsHtml);
    }
    if (data.trustBanner.sliderBgImage) {
      result = patchBg(result, 'comp-mlqmnjp310', data.trustBanner.sliderBgImage);
    }

    if (Array.isArray(data.trustBanner.pillars)) {
      const pIds = ['item1', 'item-j9ples3e', 'item-j9plerjk', 'item-mlqnbcvm'];
      data.trustBanner.pillars.forEach((p, idx) => {
        if (p && idx < pIds.length) {
          const tId = `comp-mlqmnjpf3__${pIds[idx]}`;
          const dId = `comp-mlqmnjpd8__${pIds[idx]}`;
          if (p.title) {
            const titleHtml = `<p class="font_5 wixui-rich-text__text">${escapeHtml(p.title)}</p>`;
            result = patchDiv(result, tId, titleHtml);
          }
          if (p.description) {
            const descHtml = `<blockquote class="font_8 wixui-rich-text__text">${escapeHtml(p.description)}</blockquote>`;
            result = patchDiv(result, dId, descHtml);
          }
        }
      });
    }
  }

  // 5. Story & History Section (Unified: History + 4 Images + About Story)
  if (data.story) {
    if (data.story.historyTitle) {
      const hTitleHtml = `<h2 class="font_2 wixui-rich-text__text">${escapeHtml(data.story.historyTitle)}</h2>`;
      result = patchDiv(result, 'comp-lwqg9o89', hTitleHtml);
    }
    if (data.story.aboutTitle) {
      const aTitleHtml = `<h2 class="font_2 wixui-rich-text__text">${escapeHtml(data.story.aboutTitle)}</h2>`;
      result = patchDiv(result, 'comp-lwrl1yoo7', aTitleHtml);
    }
    if (data.story.aboutQuote) {
      const aQuoteHtml = `<p class="font_7 wixui-rich-text__text"><span class="wixui-rich-text__text">${escapeHtml(data.story.aboutQuote)}</span></p>`;
      result = patchDiv(result, 'comp-lwrl46my', aQuoteHtml);
    }
    if (data.story.aboutParagraph) {
      const aParaHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(data.story.aboutParagraph)}</p>`;
      result = patchDiv(result, 'comp-ml6km44m', aParaHtml);
    }

    // DOM truth (audit9/10): each gallery file renders in ONE <img> tag.
    // historyImage2/3/4 share their tag with the hero drop / Hydration /
    // hero award-badge slots respectively (same file, one render). This block
    // runs AFTER the hero block, so gallery values win ties when both are set
    // (documented shared slots — last-save-wins, never a cross-section wipe).
    const bandBg = data.story.historyImage || data.collectionsBg?.backgroundImage;
    if (bandBg) result = patchImgByAlt(result, 'obagi-nu-derm-fx-collection', bandBg);
    if (data.story.historyImage2) result = patchImgByAlt(result, 'drop', data.story.historyImage2);
    if (data.story.historyImage3) result = patchImgByAlt(result, 'Hydration-HydrateLuxe-DHD', data.story.historyImage3);
    if (data.story.historyImage4) result = patchImgByAlt(result, 'aesthetics award winner', data.story.historyImage4);
    if (data.story.aboutImage) result = patchImgByAlt(result, 'obagi product', data.story.aboutImage);
  }

  // 6. Research & Development Section (R&D Header + science cards;
  // DOM now holds 4 cards — card 4 was cloned from card 3 as item-rdcard4)
  if (data.research) {
    if (data.research.rdTitle) {
      const rdTitleHtml = `<p class="font_0 wixui-rich-text__text">${escapeHtml(data.research.rdTitle)}</p>`;
      result = patchDiv(result, 'comp-mlqlr0fr2', rdTitleHtml);
    }
    if (data.research.rdDescription) {
      const rdDescHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(data.research.rdDescription)}</p>`;
      result = patchDiv(result, 'comp-mlqlr0fq4', rdDescHtml);
    }
    if (data.research.rdBackgroundImage) {
      // DOM truth (audit8): the genome file renders in exactly ONE <img>
      // (inside the R&D bg layer) — foreground/background are NOT separate
      // slots (spec §8 asks to separate only IF separate). The old patchBg
      // call layered an invisible duplicate underneath it, so it is removed.
      result = patchImgByAlt(result, 'genome-research-lab-tests', data.research.rdBackgroundImage);
    }

    if (Array.isArray(data.research.tabs)) {
      // 4 DOM-backed slots (item-rdcard4 cloned from card 3 for TASK 10.4).
      const tIds = ['item1', 'item-j9ples3e', 'item-j9plerjk', 'item-rdcard4'];
      data.research.tabs.slice(0, 4).forEach((tab, idx) => {
        if (tab && idx < tIds.length) {
          const tId = `comp-mlqlfcyy5__${tIds[idx]}`;
          const dId = `comp-mlqlfcyu4__${tIds[idx]}`;
          if (tab.title) {
            const tabTitleHtml = `<p class="font_5 wixui-rich-text__text">${escapeHtml(tab.title)}</p>`;
            result = patchDiv(result, tId, tabTitleHtml);
          }
          if (tab.description) {
            const tabDescHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(tab.description)}</p>`;
            result = patchDiv(result, dId, tabDescHtml);
          }
          if (tab.imageUrl) {
            if (idx === 0) result = patchImgByAlt(result, 'scientist-pouring-red-liquid', tab.imageUrl);
            else if (idx === 1) result = patchImgByAlt(result, 'woman-scientist-doing-experiment', tab.imageUrl);
            else if (idx === 2) result = patchImgByAlt(result, 'science-research-lab-microscope', tab.imageUrl);
            else if (idx === 3) result = patchImgByAlt(result, 'rd-card4-innovation-pipeline', tab.imageUrl);
          }
        }
      });
    }
  }

  // 7. Featured Product Systems (section [10] comp-lwrl9iel).
  // NOTE: bgLayers_comp-lwz20kzt belongs to the hero/gallery band [4], whose
  // background IS the nu-derm <img> — handled in the story block above
  // (collectionsBg.backgroundImage kept as a compat fallback there). The old
  // patchBg call layered an invisible duplicate under that <img>, removed.
  // products.sectionTitle has NO target element in section [10] (audit11) —
  // the key is retained for compat but never rendered (see report).
  if (data.products && Array.isArray(data.products.systems)) {
    const sIds = ['item1', 'item-j9ples3e', 'item-j9plerjk'];
    // CLIPPING FIX (audit v2): `comp-lwsw0tdb8__*` is the big NUMBER slot
    // ("1"/"2"/"3", font_0, width:max-content). Writing the product title
    // there made the card ~2.5x wider than its absolute-positioned parent
    // (overflow:hidden) -> clipped left+right on desktop. The real H3 title
    // lives in `comp-lwsw0tdf__*` (font_3, wrapped <a> to the frozen
    // destination URL). The number slot is NEVER written.
    const titleHrefs: Record<string, string> = {
      item1: 'https://www.obagiindia.com/obaginu-dermfx',
      'item-j9ples3e': 'https://www.obagiindia.com/obagi-hydrate',
      'item-j9plerjk': 'https://www.obagiindia.com/obaginu-cil-1',
    };
    data.products.systems.forEach((sys, idx) => {
      if (sys && idx < sIds.length) {
        const tId = `comp-lwsw0tdf__${sIds[idx]}`;
        const subId = `comp-lwsw0tdg__${sIds[idx]}`;
        const descId = `comp-lwsw0tdh5__${sIds[idx]}`;
        // NOTE: sys.linkUrl is intentionally never written �?" destinations stay frozen.

        if (sys.title) {
          const href = titleHrefs[sIds[idx]] || '';
          const sTitleHtml = `<h3 class="font_3 wixui-rich-text__text"><a href="${href}" target="_self" class="wixui-rich-text__text">${escapeHtml(sys.title)}</a></h3>`;
          result = patchDiv(result, tId, sTitleHtml);
        }
        if (sys.subtitle) {
          const sSubHtml = `<p class="font_7 wixui-rich-text__text">${escapeHtml(sys.subtitle)}</p>`;
          result = patchDiv(result, subId, sSubHtml);
        }
        if (sys.description) {
          const sDescHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(sys.description)}</p>`;
          result = patchDiv(result, descId, sDescHtml);
        }
        if (sys.imageUrl) {
          if (idx === 0) result = patchImgByAlt(result, 'obagi-nu-derm-fx-collection-1600x1600', sys.imageUrl);
          else if (idx === 1) result = patchImgByAlt(result, 'PDPmacro_4400x4400', sys.imageUrl);
          else if (idx === 2) result = patchImgByAlt(result, 'elastiderm-facial-serum', sys.imageUrl);
        }
      }
    });
  }

  // 8. JUNK-ONLY REPLACEMENT: the served page keeps the genuine Obagi video
  // section [11] and newsletter section [17] verbatim. Only the BGS-template
  // placeholder sections [12..16] (testimonial "Megan Brown", "BGS in
  // Numbers", San-Francisco jobs, BGS press — audit3/6, zero genuine Obagi
  // visible content) are replaced by Partner + Enquiry. Served order:
  // video → partner → enquiry → newsletter → footer.
  const startObsoleteIdx = result.indexOf('<section id="comp-lwryj83c"');
  const endObsoleteIdx = result.indexOf('<section id="comp-lx8nvywg"');

  if (startObsoleteIdx !== -1 && endObsoleteIdx !== -1 && endObsoleteIdx > startObsoleteIdx) {
    const partnerHtml = renderPartnerSection(data.partner || defaultObagiHomeContent.partner!);
    const enquiryHtml = renderEnquirySection(data.enquiry || defaultObagiHomeContent.enquiry!);
    result = result.substring(0, startObsoleteIdx) + partnerHtml + enquiryHtml + result.substring(endObsoleteIdx);
  }

  // Distributor Enquiry Popup Modal — placed directly before </body> to escape any Wix overflow/clipping containers
  const popupHtml = renderDistributorPopup(data.enquiry || defaultObagiHomeContent.enquiry!);
  if (result.includes('</body>')) {
    result = result.replace('</body>', `${popupHtml}</body>`);
  } else {
    result += popupHtml;
  }

  // 9. Footer Section (annotation 15)
  if (data.footer) {
    if (data.footer.copyright) {
      let cleanCopyright = data.footer.copyright;
      if (cleanCopyright.includes('Obagi')) {
        cleanCopyright = cleanCopyright.replace(/Obagi®?\s*Systems\s*and\s*Products/gi, 'Ryan Dermaceutics and Products').replace(/Obagi®?/gi, 'Ryan Dermaceutics');
      }
      const fHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(cleanCopyright)}</p>`;
      result = patchDiv(result, 'comp-ml6nay6u_r_comp-lx0hp721', fHtml);
    }
    if (data.footer.backgroundImage) {
      // bgLayers_comp-ml6nay6u… has NO inner <img> (audit7) — layering shows.
      result = patchBg(result, 'bgLayers_comp-ml6nay6u_r_comp-ljcmlawf', data.footer.backgroundImage);
    }
    // Spec 15 — social icon files, src-swap only (hrefs/destinations frozen).
    // Fragments are unique per icon (audit8); JSON uri + <img> src both sync.
    const si = data.footer.socialIcons;
    if (si) {
      if (si.instagram) result = patchUriFragmentAll(result, '11062b_ca1d837ce7194421b781ee7384061a8e', si.instagram);
      if (si.youtube) result = patchUriFragmentAll(result, '11062b_30de4e7217e64dfdadc3ea03beea7b94', si.youtube);
      if (si.facebook) result = patchUriFragmentAll(result, '11062b_362ef89dec51403eb0ee59a21bde967c', si.facebook);
      if (si.x) result = patchUriFragmentAll(result, '11062b_e82f42804b3546dfa8e426e752b24542', si.x);
    }
    // Footer social profile links (Instagram/YouTube/Facebook/X, class
    // FvIvPq) point to Obagi accounts — neutralize to "#" until Ryan
    // profiles exist. Lookahead keeps it order-independent (href may
    // precede class). Icon artwork untouched.
    result = result.replace(
      /(<a\b(?=[^>]*class="FvIvPq")[^>]*href=")[^"]*(")/gi,
      (_m, head, tail) => `${head}#${tail}`
    );
    // Full footer branding — logo image swap + 4 nav links (label + href).
    const footerLogoSrc = data.footer.logoImage?.trim() || data.header?.logoUrl?.trim() || '/ryan/ryan-logo.png';
    const footerLogoHref = data.footer.logoHref?.trim() || '/';
    result = patchFooterLogo(result, footerLogoSrc, footerLogoHref, data.footer.leftText);
    if (data.footer.logoImage) result = normalizeSwappedImgs(result, data.footer.logoImage);
    const footerLinks = data.footer.links;
    if (footerLinks) {
      for (let i = 0; i < FOOTER_LINK_DIVS.length; i += 1) {
        const slot = footerLinks[i];
        if (slot) result = patchFooterLink(result, FOOTER_LINK_DIVS[i], slot.label, slot.href);
      }
    }
  }

  // 10. Newsletter copy (annotation 15 sweep) — text only, links stay frozen.
  if (data.newsletter) {
    if (data.newsletter.title) {
      result = patchDiv(
        result,
        'comp-lx8nyczk6',
        `<h2 class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">${escapeHtml(data.newsletter.title)}</span></h2>`
      );
    }
    if (data.newsletter.subtitle) {
      result = patchDiv(
        result,
        'comp-lx8nzrma',
        `<p class="font_2 wixui-rich-text__text"><span class="wixui-rich-text__text">${escapeHtml(data.newsletter.subtitle)}</span></p>`
      );
    }
    if (data.newsletter.emailLabel) {
      // SSR label text (precise, label-id scoped) + input aria-label fallback.
      result = patchNewsletterEmailLabel(result, data.newsletter.emailLabel);
      result = result.replace(
        /(<input\b[^>]*id="form-field-input-[^"]*comp-lx8nyczl10[^"]*"[^>]*?aria-label=")[^"]*(")/i,
        (_m, head, tail) => `${head}${escapeHtml(data.newsletter!.emailLabel!)}${tail}`
      );
    }
    if (data.newsletter.consentText) {
      // "Yes, subscribe me to your newsletter." — text only, checkbox kept.
      result = patchExactText(result, 'Yes, subscribe me to your newsletter.', data.newsletter.consentText);
    }
    if (data.newsletter.subscribeLabel) {
      // SUBSCRIBE button — label text only, submit action untouched.
      result = patchExactText(result, 'SUBSCRIBE', data.newsletter.subscribeLabel);
    }
    if (data.newsletter.backgroundImage) {
      // Annotation 14 — newsletter section background layer, URL swap only.
      result = patchBg(result, 'bgLayers_comp-lx8nvywg', data.newsletter.backgroundImage);
    } else if (data.mediaSlots?.slot14BackgroundImage) {
      result = patchBg(result, 'bgLayers_comp-lx8nvywg', data.mediaSlots.slot14BackgroundImage);
    }
  } else if (data.mediaSlots?.slot14BackgroundImage) {
    result = patchBg(result, 'bgLayers_comp-lx8nvywg', data.mediaSlots.slot14BackgroundImage);
  }

  // 11. Award video (annotation 13) — existing player only, behavior untouched.
  if (data.awardVideo) {
    if (data.awardVideo.videoUrl) {
      result = patchVideoSrc(result, 'comp-mlau0bjm_video', data.awardVideo.videoUrl);
    }
    if (data.awardVideo.posterImage) {
      result = patchVideoPoster(result, 'comp-mlau0bjm_video', data.awardVideo.posterImage);
      const oldPoster = (result.match(/<wow-image\b[^>]*id="comp-mlau0bjm_img"[^>]*>[\s\S]*?<img\b[^>]*?\ssrc="([^"]*)"/i) || [])[1] || '';
      result = syncOldUri(result, oldPoster, data.awardVideo.posterImage);
      result = result.replace(
        /(<wow-image\b[^>]*id="comp-mlau0bjm_img"[^>]*>[\s\S]*?<img\b[^>]*?)(\ssrc="[^"]*")/i,
        (_m, head) => `${head} src="${data.awardVideo!.posterImage}"`
      );
      result = result.replace(
        /(<wow-image\b[^>]*id="comp-mlau0bjm_img"[^>]*style=")[^"]*(")/i,
        (_m, head, tail) => `${head}opacity: 1; display: block;${tail}`
      );
      result = normalizeSwappedImgs(result, data.awardVideo.posterImage);
    }
    if (data.awardVideo.overlayTitle) {
      result = result.replace(
        /(<video\b[^>]*id="comp-mlau0bjm_video"[^>]*?aria-label=")[^"]*(")/i,
        (_m, head, tail) => `${head}${escapeHtml(data.awardVideo!.overlayTitle!)}${tail}`
      );
    }
  }

  // 12. SEO text metadata — <title> + meta description only (never canonical/href).
  if (data.seo?.pageTitle) {
    result = result.replace(
      /<title[^>]*>[\s\S]*?<\/title>/i,
      `<title>${escapeHtml(data.seo.pageTitle)}</title>`
    );
  }
  if (data.seo?.metaDescription) {
    result = result.replace(
      /(<meta\s[^>]*name="description"[^>]*content=")[^"]*(")/i,
      (_m, head, tail) => `${head}${escapeHtml(data.seo!.metaDescription!)}${tail}`
    );
  }

  // 12b. Favicon — point every icon link (icon, shortcut, apple-touch,
  // mask) at the Ryan logo. Href + type swapped; sizes/rel untouched.
  result = result.replace(
    /(<link\b[^>]*rel="[^"]*icon[^"]*"[^>]*href=")[^"]*(")/gi,
    (_m, head, tail) => `${head}/ryan/ryan-logo.png${tail}`
  );
  result = result.replace(
    /(<link\b[^>]*rel="[^"]*icon[^"]*"[^>]*type=")[^"]*(")/gi,
    (_m, head, tail) => `${head}image/png${tail}`
  );

  // 12c. Social/SEO identity — Ryan domain + logo everywhere.
  result = result.replace(
    /(<link\b[^>]*rel="canonical"[^>]*href=")[^"]*(")/i,
    (_m, head, tail) => `${head}https://ryandarma.com/${tail}`
  );
  const OG_TITLE = 'Ryan Dermaceutics | Ryan Products';
  const OG_DESC = 'Explore Ryan Dermaceutics official site for transformative Products';
  const OG_IMG = 'https://ryandarma.com/ryan/ryan-logo.png';
  const ogSwaps: Array<[RegExp, string]> = [
    [/(<meta\b[^>]*property="og:title"[^>]*content=")[^"]*(")/gi, OG_TITLE],
    [/(<meta\b[^>]*property="og:description"[^>]*content=")[^"]*(")/gi, OG_DESC],
    [/(<meta\b[^>]*property="og:image"[^>]*content=")[^"]*(")/gi, OG_IMG],
    [/(<meta\b[^>]*property="og:url"[^>]*content=")[^"]*(")/gi, 'https://ryandarma.com/'],
    [/(<meta\b[^>]*property="og:site_name"[^>]*content=")[^"]*(")/gi, 'Ryan Dermaceutics'],
    [/(<meta\b[^>]*name="twitter:title"[^>]*content=")[^"]*(")/gi, OG_TITLE],
    [/(<meta\b[^>]*name="twitter:description"[^>]*content=")[^"]*(")/gi, OG_DESC],
    [/(<meta\b[^>]*name="twitter:image"[^>]*content=")[^"]*(")/gi, OG_IMG],
  ];
  for (const [re, val] of ogSwaps) {
    result = result.replace(re, (_m, head, tail) => `${head}${val}${tail}`);
  }
  result = result.replace(
    /(<meta\b[^>]*property="og:image:width"[^>]*content=")[^"]*(")/gi,
    (_m, head, tail) => `${head}1200${tail}`
  );
  result = result.replace(
    /(<meta\b[^>]*property="og:image:height"[^>]*content=")[^"]*(")/gi,
    (_m, head, tail) => `${head}630${tail}`
  );
  // 13. Floating chat labels — visible text only, widget behavior untouched.
  if (data.floating) {
    result = patchChatAriaLabel(result, data.floating.chatLabel);
    if (data.floating.needHelpText && data.floating.needHelpText !== 'Need Help?') {
      result = patchExactText(result, 'Need Help?', data.floating.needHelpText);
    }
    if (data.floating.exploreText && data.floating.exploreText !== 'Explore Obagi') {
      result = patchExactText(result, 'Explore Obagi', data.floating.exploreText);
    }
    if (data.floating.agingText && data.floating.agingText !== 'Address the Signs of Aging Skin') {
      result = patchExactText(result, 'Address the Signs of Aging Skin', data.floating.agingText);
    }
  }

  // 13b. Remove Wix minimized-chat quick-reply popover
  // (<div class="sQ58pJn ou1JQyw--right"> with the Obagi Nu-Derm /
  // Explore Obagi / Aging Skin buttons). The chat button itself
  // (.suyLqA9) is untouched — only the suggestion-bubble list is dropped.
  result = result.replace(
    /<div\s+class="sQ58pJn ou1JQyw--right">\s*<ul\s+class="srmuh7I">[\s\S]*?<\/ul>\s*<\/div>/,
    ''
  );

  // 13b2. Remove the Wix chat "Need Help?" notification popover
  // (<div data-hook="popover-content">…popover_62ytzm0ch…). The toast
  // always ends with </button></div></div></div>, which bounds the match
  // despite nested divs inside the buttons.
  result = result.replace(
    /<div\b[^>]*data-hook="popover-content"[^>]*>[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/,
    ''
  );

  // 13d. Ryan "Chat with AI" widget — RETIRED per request (markup no
  // longer injected; initRyanChat exits silently without its nodes).
  // 13c. Remove the rainbow-globe header SVG icon
  // (<svg data-bbox="0 0 184.83 181.33">, the SPECTRA-button vector art).
  // Only the icon is dropped — the button label/link stays functional.
  result = result.replace(
    /<svg\b[^>]*data-bbox="0 0 184\.83 181\.33"[^>]*>[\s\S]*?<\/svg>/,
    ''
  );
  // 13e. Section 5 & motion clip cleanup — clear any 0-width clip-path values
  result = result.replaceAll('--motion-clip-start: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);', '--motion-clip-start: none;');

  // 14. Scoped CSS (existing approved behavior — static, never CMS-editable).
  // Preserved verbatim: navbar dropdowns, carousel transitions, R&D widths,
  // partner/enquiry interactivity styles.
  const scopedStyles = `
<style id="obagi-dynamic-cms-styles">
  /* Smooth Scroll */
  html {
    scroll-behavior: smooth;
  }

  /* 1. Navbar Dropdowns */
  /* Mobile hamburger menu floats in from the LEFT (vanilla toggle in
     sync.js adds body.obagi-menu-open; panel starts
     off-canvas). Backdrop fades with it. */
  #comp-lw3c3n7z_r_comp-m8mvebwi {
    justify-self: start !important;
    margin-right: auto !important;
    transform: translateX(-110%) !important;
    transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform !important;
  }
  body.obagi-menu-open #comp-lw3c3n7z_r_comp-m8mvebwi {
    transform: translateX(0) !important;
  }
  /* Wix hides the overlay root via visibility + an opacity var until its
     (dead) runtime adds --isMenuOpen — force both with our open class. */
  body.obagi-menu-open #comp-lw3c3n7z_r_comp-m8mvebwf {
    visibility: visible !important;
    opacity: 1 !important;
  }
  [data-hook="hamburger-overlay-dialog"] {
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
  }
  body.obagi-menu-open [data-hook="hamburger-overlay-dialog"] {
    opacity: 1 !important;
  }
  @media (prefers-reduced-motion: reduce) {
    #comp-lw3c3n7z_r_comp-m8mvebwi,
    [data-hook="hamburger-overlay-dialog"] {
      transition: none !important;
    }
  }
  /* Ryan mobile hamburger (replaces m8oie6mg button) — opens the link
     list in a slide-in popup panel; mobile only. Open/close behavior in
     sync.js (initRyanMobileBar). */
  .ryan-mobile-wrap {
    display: none !important;
  }
  @media (max-width: 999px) {
    .ryan-mobile-wrap {
      display: block !important;
    }
    #ryan-mobile-toggle {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 10px !important;
      border: 1px solid rgba(0, 118, 138, 0.25) !important;
      background: #ffffff !important;
      color: #004f5e !important;
      cursor: pointer !important;
    }
    #ryan-mobile-toggle:hover {
      background: #f0f9fa !important;
    }
    .ryan-mobile-popup[hidden] {
      display: none !important;
    }
    .ryan-mobile-popup {
      position: fixed !important;
      inset: 0 !important;
      z-index: 1000002 !important;
    }
    .ryan-mobile-backdrop {
      position: absolute !important;
      inset: 0 !important;
      background: rgba(0, 37, 48, 0.55) !important;
    }
    .ryan-mobile-panel {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      bottom: 0 !important;
      width: 300px !important;
      max-width: 86vw !important;
      background: #ffffff !important;
      box-shadow: 24px 0 64px rgba(0, 37, 48, 0.3) !important;
      display: flex !important;
      flex-direction: column !important;
      animation: ryanMobileIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    @keyframes ryanMobileIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .ryan-mobile-panel-head {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 14px 16px !important;
      border-bottom: 1px solid #e2e8f0 !important;
      font-size: 12px !important;
      font-weight: 800 !important;
      letter-spacing: 0.08em !important;
      text-transform: uppercase !important;
      color: #004f5e !important;
    }
    .ryan-mobile-panel-head button {
      border: 0 !important;
      background: #f1f5f9 !important;
      border-radius: 8px !important;
      width: 30px !important;
      height: 30px !important;
      cursor: pointer !important;
      color: #475569 !important;
      font-size: 14px !important;
    }
    .ryan-mobile-bar {
      display: flex !important;
      flex-direction: column !important;
      gap: 4px !important;
      padding: 12px !important;
      overflow-y: auto !important;
    }
    .ryan-mobile-bar a {
      display: block !important;
      font-family: 'Montserrat', sans-serif, system-ui !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      color: #004f5e !important;
      padding: 12px !important;
      border-radius: 10px !important;
      text-decoration: none !important;
    }
    .ryan-mobile-bar a:hover {
      background: #f0f9fa !important;
      color: #00768a !important;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .ryan-mobile-panel {
      animation: none !important;
    }
  }
  /* Duplicate portal hamburger overlay (empty menu shell) — the
     m8mvebwf panel above carries the real injected nav. */
  #portal-comp-lw3c3n7z_r_comp-m8oie6li {
    display: none !important;
  }
  /* Header search trigger — docked in-flow beside the desktop nav as one
     centered group (injected by §2; never overlaps). The old search slot
     keeps only the fixed overlay + index script, so it takes no space. */
  #comp-lw3c3n7z_r_comp-m8mtvgm3 {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 26px !important;
  }
  /* Mobile header: logo, search + hamburger share ONE centered row.
     lwqc45ul stacks its children (search box, hamburger) vertically by
     default — force a centered flex row; vertically center the top-bar
     boxes so nothing floats high/low. Inline menu row below untouched. */
  @media (max-width: 999px) {
    .comp-lw3c3n7z_r_comp-lw3c3mu6-container {
      align-items: center !important;
    }
    #comp-lw3c3n7z_r_comp-lwqc45m1,
    #comp-lw3c3n7z_r_comp-lwqc45ul {
      align-self: center !important;
    }
    .comp-lw3c3n7z_r_comp-lwqc45ul-container {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: 6px !important;
    }
    /* Hamburger (two-bar) button hidden on mobile — inline nav serves it */
    #comp-lw3c3n7z_r_comp-m8mvebvo,
    #comp-lw3c3n7z_r_comp-m8mvebw9 {
      display: none !important;
    }
  }
  /* Single search trigger (docked beside the desktop nav; visible in the
     menu row on mobile too). Small teal icon + larger logo on mobile. */
  @media (max-width: 999px) {
    #ryan-search-trigger svg {
      width: 16px !important;
      height: 16px !important;
      color: #00768a !important;
    }
    #comp-lw3c3n7z_r_comp-m8mvebw9 svg {
      width: 18px !important;
      height: 18px !important;
      color: #00768a !important;
    }
    #comp-lw3c3n7z_r_comp-lw3c38vb {
      width: 110px !important;
      height: auto !important;
    }
    #comp-lw3c3n7z_r_comp-lw3c38vb img {
      width: 100% !important;
      height: auto !important;
      object-fit: contain !important;
    }
  }
  /* NOTE: the old search slot keeps only the fixed overlay + index
     script — zero in-flow footprint, so it needs no hiding. */
  /* Header underlay (.LNYVZi.ayCf9D) stays transparent at all times —
     top, scrolled, and pinned/sticky. Scoped to the header bgLayers
     node only; the other 18 page underlays are untouched. */
  #bgLayers_comp-lw3c3n7z_r_comp-lw3c3mu6 .LNYVZi.ayCf9D,
  #comp-lw3c3n7z .LNYVZi.ayCf9D {
    background: transparent !important;
    background-color: transparent !important;
    background-image: none !important;
    opacity: 1 !important;
  }
  /* While the Ryan search popup is open the header goes solid white —
     see-through content behind the panel looks broken. Higher
     specificity + later order beats the transparent rule above. */
  body.ryan-search-open #bgLayers_comp-lw3c3n7z_r_comp-lw3c3mu6 .LNYVZi.ayCf9D,
  body.ryan-search-open #comp-lw3c3n7z .LNYVZi.ayCf9D {
    background: #ffffff !important;
    background-color: #ffffff !important;
    background-image: none !important;
  }
  /* 1c. Footer logo — Ryan Dermaceutics large branding matching official site layout */
  #comp-ml6nay6u_r_comp-lx02zbs6 {
    width: auto !important;
    max-width: 280px !important;
    min-width: 180px !important;
    height: auto !important;
    aspect-ratio: auto !important;
    margin: 0 !important;
    padding: 8px 0 0 !important;
    display: block !important;
    align-self: start !important;
    justify-self: start !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6 .IT88M3 {
    position: static !important;
    display: block !important;
    width: auto !important;
    height: auto !important;
    inset: auto !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6 .iL7Pq5,
  #comp-ml6nay6u_r_comp-lx02zbs6 div[data-testid^="svgRoot"] {
    width: 100% !important;
    height: auto !important;
    display: block !important;
    position: static !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6 img {
    width: 260px !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: 95px !important;
    display: block !important;
    object-fit: contain !important;
  }
  @media (max-width: 750px) {
    #comp-ml6nay6u_r_comp-lx02zbs6 {
      max-width: 220px !important;
      margin: 0 auto 16px auto !important;
      justify-self: center !important;
    }
    #comp-ml6nay6u_r_comp-lx02zbs6 img {
      width: 220px !important;
      margin: 0 auto !important;
    }
  }
  .comp-ml6nay6u_r_comp-ljckoxjc-container {
    padding: 16px 0 !important;
  }
  /* 1b. Ryan site search (trigger + overlay, markup from §1d) */  .ryan-search-trigger {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    background: transparent !important;
    border: 0 !important;
    cursor: pointer !important;
    color: #003d4d !important;
    font-family: 'Montserrat', sans-serif, system-ui !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
    padding: 10px 4px !important;
  }
  .ryan-search-trigger:hover { color: #00768a !important; }
  .ryan-search-overlay[hidden] { display: none !important; }
  .ryan-search-overlay {
    position: fixed !important;
    inset: 0 !important;
    z-index: 1000000 !important;
  }
  .ryan-search-backdrop {
    position: absolute !important;
    inset: 0 !important;
    background: transparent !important;
  }
  .ryan-search-panel {
    position: relative !important;
    max-width: 620px !important;
    margin: 12vh auto 0 !important;
    background: #ffffff !important;
    border-radius: 16px !important;
    box-shadow: 0 24px 64px rgba(0,0,0,0.25) !important;
    overflow: hidden !important;
  }
  .ryan-search-bar {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 14px 16px !important;
    border-bottom: 1px solid rgba(0, 118, 138, 0.15) !important;
    color: #00768a !important;
  }
  #ryan-search-input {
    flex: 1 !important;
    border: 0 !important;
    outline: none !important;
    font-size: 15px !important;
    color: #0f172a !important;
    background: transparent !important;
  }
  .ryan-search-close {
    border: 0 !important;
    background: #f1f5f9 !important;
    border-radius: 8px !important;
    width: 28px !important;
    height: 28px !important;
    cursor: pointer !important;
    color: #475569 !important;
  }
  .ryan-search-results {
    max-height: 46vh !important;
    overflow-y: auto !important;
    padding: 8px !important;
  }
  .ryan-search-group-label {
    font-size: 10px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    color: #00768a !important;
    padding: 10px 10px 4px !important;
  }
  .ryan-search-item {
    display: block !important;
    padding: 8px 10px !important;
    border-radius: 10px !important;
    text-decoration: none !important;
  }
  .ryan-search-item:hover { background: #f0f9fa !important; }
  .ryan-search-item-title {
    display: block !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #003d4d !important;
  }
  .ryan-search-item-sub {
    display: block !important;
    font-size: 11px !important;
    color: #64748b !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .ryan-search-empty, .ryan-search-hint {
    padding: 18px 12px !important;
    font-size: 13px !important;
    color: #64748b !important;
    text-align: center !important;
  }
  .ryan-search-popular {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    align-items: center !important;
    padding: 12px 16px !important;
    border-top: 1px solid rgba(0, 118, 138, 0.15) !important;
    font-size: 12px !important;
    color: #64748b !important;
  }
  .ryan-search-popular a {
    padding: 4px 10px !important;
    background: #f1f5f9 !important;
    border-radius: 999px !important;
    color: #004f5e !important;
    text-decoration: none !important;
    font-weight: 600 !important;
  }
  /* 1d. Ryan Chat with AI (markup from §13d; only chat UI — the dead
     Wix launcher subtree is removed in §13b3) */
  #ryan-chat-root {
    position: fixed !important;
    right: 20px !important;
    bottom: 20px !important;
    z-index: 1000001 !important;
    font-family: system-ui, -apple-system, sans-serif !important;
  }
  #ryan-chat-trigger {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    background: #002530 !important;
    color: #ffffff !important;
    border: 0 !important;
    border-radius: 999px !important;
    padding: 12px 18px !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
    cursor: pointer !important;
    box-shadow: 0 12px 32px rgba(0, 37, 48, 0.35) !important;
    position: relative !important;
    transition: transform 0.2s ease !important;
  }
  #ryan-chat-trigger:hover { transform: scale(1.05) !important; }
  #ryan-chat-trigger svg { color: #fbbf24 !important; }
  .ryan-chat-ping {
    position: absolute !important;
    top: 6px !important;
    right: 8px !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 999px !important;
    background: #34d399 !important;
    animation: ryan-chat-ping 1.6s ease-out infinite !important;
  }
  @keyframes ryan-chat-ping {
    0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6); }
    100% { box-shadow: 0 0 0 9px rgba(52, 211, 153, 0); }
  }
  #ryan-chat-panel[hidden] { display: none !important; }
  #ryan-chat-panel {
    width: 320px !important;
    max-width: calc(100vw - 40px) !important;
    height: 480px !important;
    max-height: calc(100vh - 120px) !important;
    background: #ffffff !important;
    border-radius: 20px !important;
    border: 1px solid rgba(0, 118, 138, 0.18) !important;
    box-shadow: 0 24px 64px rgba(0, 37, 48, 0.3) !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    margin-bottom: 12px !important;
  }
  .ryan-chat-head {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    background: #002530 !important;
    color: #ffffff !important;
    padding: 12px 14px !important;
  }
  .ryan-chat-avatar {
    width: 32px !important;
    height: 32px !important;
    border-radius: 999px !important;
    background: rgba(255,255,255,0.12) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #fbbf24 !important;
    flex-shrink: 0 !important;
  }
  .ryan-chat-titles { flex: 1 !important; }
  .ryan-chat-titles strong {
    display: block !important;
    font-size: 13px !important;
  }
  .ryan-chat-titles small {
    display: block !important;
    font-size: 10px !important;
    color: rgba(255,255,255,0.7) !important;
  }
  .ryan-chat-close {
    border: 0 !important;
    background: transparent !important;
    color: rgba(255,255,255,0.8) !important;
    cursor: pointer !important;
    font-size: 14px !important;
    padding: 4px 8px !important;
  }
  .ryan-chat-messages {
    flex: 1 !important;
    overflow-y: auto !important;
    background: #f8fafc !important;
    padding: 12px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    font-size: 12px !important;
  }
  .ryan-chat-msg-ai, .ryan-chat-msg-user { display: flex !important; }
  .ryan-chat-msg-ai { justify-content: flex-start !important; }
  .ryan-chat-msg-user { justify-content: flex-end !important; }
  .ryan-chat-bubble {
    max-width: 85% !important;
    padding: 9px 12px !important;
    border-radius: 14px !important;
    line-height: 1.5 !important;
  }
  .ryan-chat-msg-ai .ryan-chat-bubble {
    background: #ffffff !important;
    color: #1e293b !important;
    border: 1px solid #e2e8f0 !important;
    border-top-left-radius: 4px !important;
  }
  .ryan-chat-msg-user .ryan-chat-bubble {
    background: #003d4d !important;
    color: #ffffff !important;
    border-top-right-radius: 4px !important;
  }
  .ryan-chat-links { margin-top: 6px !important; }
  .ryan-chat-links a {
    display: block !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    color: #00768a !important;
    text-decoration: none !important;
    padding: 3px 0 !important;
  }
  .ryan-chat-typing { color: #94a3b8 !important; }
  .ryan-chat-chips {
    display: flex !important;
    gap: 6px !important;
    flex-wrap: wrap !important;
    padding: 8px 12px !important;
    background: #ffffff !important;
    border-top: 1px solid #f1f5f9 !important;
  }
  .ryan-chat-chips button {
    font-size: 11px !important;
    font-weight: 600 !important;
    padding: 5px 10px !important;
    border-radius: 999px !important;
    border: 1px solid rgba(0, 118, 138, 0.25) !important;
    background: #f0f9fa !important;
    color: #004f5e !important;
    cursor: pointer !important;
  }
  .ryan-chat-form {
    display: flex !important;
    gap: 8px !important;
    padding: 10px 12px !important;
    background: #ffffff !important;
    border-top: 1px solid #e2e8f0 !important;
  }
  #ryan-chat-input {
    flex: 1 !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 999px !important;
    padding: 8px 14px !important;
    font-size: 12px !important;
    outline: none !important;
    color: #0f172a !important;
  }
  #ryan-chat-input:focus { border-color: #00768a !important; }
  .ryan-chat-form button[type="submit"] {
    width: 34px !important;
    height: 34px !important;
    border-radius: 999px !important;
    border: 0 !important;
    background: #003d4d !important;
    color: #ffffff !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
  }
  #comp-lw3c3n7z-pinned-layer,
  #comp-lw3c3n7z {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
    /* NOTE: no will-change:transform here — it would become the
       containing block for the fixed search/menu popups inside the
       header, clipping them to the 88px bar instead of the viewport. */
  }
  #comp-lw3c3n7z-pinned-layer.obagi-nav-hidden,
  #comp-lw3c3n7z.obagi-nav-hidden {
    transform: translateY(-110%) !important;
    pointer-events: none !important;
  }
  .obagi-has-dropdown {
    position: relative !important;
  }
  .obagi-has-dropdown:hover .obagi-sub-menu,
  .obagi-has-dropdown:focus-within .obagi-sub-menu {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
    pointer-events: auto !important;
  }
  .obagi-has-dropdown:hover .obagi-nav-caret {
    transform: rotate(180deg) !important;
  }
  .obagi-sub-menu {
    position: absolute !important;
    top: calc(100% + 8px) !important;
    left: 0 !important;
    min-width: 230px !important;
    background: #ffffff !important;
    border-radius: 12px !important;
    box-shadow: 0 16px 36px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.06) !important;
    border: 1px solid rgba(0, 118, 138, 0.18) !important;
    padding: 8px 0 !important;
    margin: 0 !important;
    list-style: none !important;
    opacity: 0;
    visibility: hidden;
    transform: translateY(6px);
    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
    z-index: 999999 !important;
    pointer-events: none;
  }
  .obagi-sub-item {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .obagi-sub-item a {
    display: block !important;
    padding: 10px 18px !important;
    font-family: inherit !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #1e293b !important;
    text-decoration: none !important;
    transition: all 0.15s ease !important;
    white-space: nowrap !important;
  }
  .obagi-sub-item a:hover {
    background: rgba(0, 118, 138, 0.08) !important;
    color: #00768a !important;
    padding-left: 22px !important;
  }
  .obagi-top-link:hover {
    color: #00768a !important;
  }

  /* Hide hamburger button on desktop (min-width: 1000px) */
  @media (min-width: 1000px) {
    #comp-lw3c3n7z_r_comp-m8mvebvo,
    #comp-lw3c3n7z_r_comp-m8mvebw9,
    .HamburgerOpenButton3537389287__root,
    .wixui-hamburger-open-button {
      display: none !important;
    }
    .obagi-clean-desktop-nav {
      display: flex !important;
    }
  }

  /* On mobile screens (max-width: 999px), hide desktop nav and show hamburger */
  @media (max-width: 999px) {
    .obagi-clean-desktop-nav {
      display: none !important;
    }
    #comp-lw3c3n7z_r_comp-m8mvebvo,
    #comp-lw3c3n7z_r_comp-m8mvebw9 {
      display: block !important;
    }
    /* Hide the header Explore Products CTA on mobile (hamburger serves nav) */
    #comp-lw3c3n7z_r_comp-mlethlmo {
      display: none !important;
    }
  }

  /* 1e. Section 5 — 4-Image Mosaic Gallery Panel: ensure fully visible, remove dark blue box, clear motion clips */
  #comp-lwz20kzt,
  #comp-lwz20kzt *,
  #comp-lwz20l0d11,
  #comp-lwz20l0e14,
  #comp-lwz20l0g2,
  #comp-lwz20l0g6,
  #comp-lwz20l0f16,
  #comp-ml6lwrwb,
  #comp-lwz23869,
  #comp-ml6m00og,
  [data-motion-enter="done"],
  [style*="--motion-clip-start"] {
    clip-path: none !important;
    -webkit-clip-path: none !important;
    animation: none !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  #comp-lwz20kzt [data-testid="imageX"],
  #comp-lwz20kzt wow-image,
  #comp-lwz20kzt wow-image img,
  #comp-lwz20kzt picture,
  #comp-lwz20kzt img {
    opacity: 1 !important;
    visibility: visible !important;
    display: block !important;
  }
  /* Remove any solid dark blue box under the Section 5 image (Annotation 2) */
  #comp-lwz20l0d11,
  #comp-lwz20l0d11 .inner-box,
  #comp-lwz20l0d11 [class*="inner-box"],
  #comp-lwz20l0d11-container,
  .comp-lwz20l0d11-container,
  #comp-lwz20kzt .inner-box,
  #comp-lwz20kzt [class*="inner-box"] {
    background: transparent !important;
    background-color: transparent !important;
    --bg: transparent !important;
    --alpha-bg: 0 !important;
  }
  #comp-lwz20l0e14,
  #comp-lwz20l0e14 .YX2qkL,
  #comp-lwz20l0e14 [data-motion-part^="BG_MEDIA"],
  #comp-lwz20l0e14 wow-image,
  #comp-lwz20l0e14 picture,
  #comp-lwz20l0e14 img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  /* 1f. Hero Section Background Image & Video Poster Visibility */
  #comp-lwxgxhly {
    background-color: #002530 !important;
  }
  #comp-lwxgxhly_img {
    transition: opacity 0.6s ease-in-out !important;
  }
  #comp-lwxgxhly.video-playing #comp-lwxgxhly_img,
  #comp-lwxgxhly.video-playing #comp-lwxgxhly_img img,
  body.hero-video-playing #comp-lwxgxhly_img,
  body.hero-video-playing #comp-lwxgxhly_img img {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* 1g. Completely remove / hide Chat with AI floating elements per Vibe Annotation 1 */
  [data-hook="minimizedChat"],
  [data-hook="minimizedChatButton"],
  [data-hook="tpa-components-provider"],
  #popover_62ytzm0ch,
  [data-hook="popover-content"],
  #ryan-chat-root,
  #ryan-chat-trigger,
  #ryan-chat-panel,
  button[aria-label*="Chat with AI"] {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
    opacity: 0 !important;
  }

  /* 1h. Section 3 (4 Pillars Carousel) & Section 4 (Beyond Visible Symptoms) Mobile Flow & Contrast */
  @media (max-width: 768px) {
    #comp-mlqmnjor {
      padding-bottom: 24px !important;
      margin-bottom: 0 !important;
      position: relative !important;
      z-index: 2 !important;
    }
  }

  #comp-mlqlr0fm {
    position: relative !important;
    background-color: #002530 !important;
    overflow: hidden !important;
    padding: 50px 20px !important;
    box-sizing: border-box !important;
  }
  #comp-mlqlr0fm #bgLayers_comp-mlqlr0fm,
  #comp-mlqlr0fm #bgMedia_comp-mlqlr0fm,
  #comp-mlqlr0fm #img_comp-mlqlr0fm {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
  }
  #comp-mlqlr0fm #img_comp-mlqlr0fm img {
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
  }
  #comp-mlqlr0fm [data-testid="colorUnderlay"] {
    background: linear-gradient(180deg, rgba(0, 32, 43, 0.75) 0%, rgba(0, 32, 43, 0.88) 100%) !important;
    display: block !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 1 !important;
  }
  #comp-mlqlr0fm .comp-mlqlr0fm-container {
    position: relative !important;
    z-index: 2 !important;
    max-width: 900px !important;
    margin: 0 auto !important;
    padding: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  #comp-mlqlr0fp {
    width: 100% !important;
    max-width: 800px !important;
    margin: 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  #comp-mlqlr0fr2 {
    width: 100% !important;
    margin-bottom: 16px !important;
  }
  #comp-mlqlr0fr2 :is(p,h1,h2,h3,span) {
    color: #ffffff !important;
    font-size: clamp(22px, 4vw, 36px) !important;
    line-height: 1.3 !important;
    font-weight: 700 !important;
    text-align: center !important;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
  }
  #comp-mlqlr0fq4 {
    width: 100% !important;
  }
  #comp-mlqlr0fq4 :is(p,span) {
    color: rgba(255, 255, 255, 0.94) !important;
    font-size: clamp(13px, 2.5vw, 16px) !important;
    line-height: 1.65 !important;
    font-weight: 400 !important;
    text-align: center !important;
    text-shadow: 0 1px 4px rgba(0,0,0,0.5) !important;
  }

  /* 1i. Section 6 Product Cards - 3D Perspective Flip Cards on Desktop & Mobile */
  #comp-lwsw0td95__item1 {
    z-index: 30 !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  #comp-lwsw0td95__item-j9ples3e {
    z-index: 20 !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  #comp-lwsw0td95__item-j9plerjk {
    z-index: 10 !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  @media (max-width: 768px) {
    #comp-lwsw0td7 {
      width: min(340px, 92vw) !important;
      max-width: 340px !important;
      height: min(520px, 75vh) !important;
      margin: 0 auto !important;
      transform-style: preserve-3d !important;
    }
    #comp-lwsw0td7 [data-testid="imageX"] img,
    #comp-lwsw0td7 wow-image img,
    #comp-lwsw0td7 .comp-lwtcg9jk img {
      max-width: 260px !important;
      max-height: 160px !important;
      object-fit: contain !important;
      margin: 0 auto !important;
    }
    #comp-lwsw0td95__item1,
    #comp-lwsw0td95__item-j9ples3e,
    #comp-lwsw0td95__item-j9plerjk {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: 16px !important;
      box-shadow: 0 12px 30px -6px rgba(0, 0, 0, 0.18) !important;
      background: #ffffff !important;
      overflow: hidden !important;
      transform-style: preserve-3d !important;
      transform-origin: top center !important;
      backface-visibility: hidden !important;
      -webkit-backface-visibility: hidden !important;
      will-change: transform, opacity !important;
    }
  }

  /* Prevent image blanking / flickering / disappearing on scroll */
  img:not(#comp-lwxgxhly_img img):not(#comp-mlau0bjm_img img),
  wow-image:not(#comp-lwxgxhly_img):not(#comp-mlau0bjm_img):not(.bgVideoposter),
  picture,
  picture img {
    opacity: 1 !important;
    visibility: visible !important;
    content-visibility: visible !important;
  }
  #comp-lwxgxhly.video-playing #comp-lwxgxhly_img,
  #comp-lwxgxhly.video-playing #comp-lwxgxhly_img img,
  body.hero-video-playing #comp-lwxgxhly_img,
  body.hero-video-playing #comp-lwxgxhly_img img,
  #comp-mlau0bjm.video-playing #comp-mlau0bjm_img,
  #comp-mlau0bjm.video-playing #comp-mlau0bjm_img img,
  .bgVideoposter[style*="opacity: 0"],
  .bgVideoposter.is-hidden,
  .video-playing .bgVideoposter {
    opacity: 0 !important;
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  #comp-lwxgxhly_video,
  #comp-mlau0bjm_video,
  video {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  [data-motion-enter]:not(#comp-lwrlbohf):not(#comp-lwz2pnus):not(#comp-lwxgxhly),
  [style*="--motion-clip-start"]:not(#comp-lwrlbohf):not(#comp-lwz2pnus):not(#comp-lwxgxhly) {
    clip-path: none !important;
    -webkit-clip-path: none !important;
    animation: none !important;
  }
  html, body {
    -webkit-overflow-scrolling: touch;
  }

  /* 2. R&D Science Cards — Clean column layout matching official site (no double card, no box-shadows) */
  #comp-mlqlfcyi .max-width-container,
  #comp-mlqlfcyi-container {
    max-width: 100% !important;
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  #comp-mlqlfcyn,
  #comp-mlqlfcyn-container {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    box-sizing: border-box !important;
  }
  #comp-mlqlfcyn .comp-mlqlfcyn-container {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: flex-start !important;
    gap: 24px !important;
    flex-wrap: nowrap !important;
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 10px 16px 30px !important;
    box-sizing: border-box !important;
  }
  #comp-mlqlfcyn .comp-mlqlfcyn-container > [id^="comp-mlqlfcyr6__"] {
    flex: 1 1 0 !important;
    max-width: none !important;
    width: 0 !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
    transition: none !important;
  }
  #comp-mlqlfcyn .inner-box {
    display: none !important;
  }
  #comp-mlqlfcyn [class*="comp-mlqlfcyt2__"] {
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }
  #comp-mlqlfcyn [class*="comp-mlqlfcyz7__"] {
    width: 100% !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    box-shadow: none !important;
    border: none !important;
    margin: 0 0 16px 0 !important;
    background: transparent !important;
  }
  #comp-mlqlfcyn [id^="comp-mlqlfcyz7__"] img,
  #comp-mlqlfcyn [id^="comp-mlqlfcyt2__"] img {
    width: 100% !important;
    aspect-ratio: 16/10 !important;
    object-fit: cover !important;
    border-radius: 4px !important;
    box-shadow: none !important;
    display: block !important;
  }
  /* Typography for R&D cards matching official site */
  #comp-mlqlfcyn [id^="comp-mlqlfcyy5__"] {
    margin: 12px 0 8px 0 !important;
  }
  #comp-mlqlfcyn [id^="comp-mlqlfcyy5__"] p,
  #comp-mlqlfcyn [id^="comp-mlqlfcyy5__"] .font_5,
  #comp-mlqlfcyn [id^="comp-mlqlfcyy5__"] .font_7 {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111827 !important;
    line-height: 1.3 !important;
    letter-spacing: -0.01em !important;
    margin: 0 !important;
  }
  #comp-mlqlfcyn [id^="comp-mlqlfcyu4__"] p,
  #comp-mlqlfcyn [id^="comp-mlqlfcyu4__"] .font_8 {
    font-size: 13px !important;
    font-weight: 400 !important;
    color: #475569 !important;
    line-height: 1.6 !important;
    margin: 0 !important;
  }

  /* Responsive: tablet & mobile layout */
  @media (max-width: 900px) {
    #comp-mlqlfcyn .comp-mlqlfcyn-container {
      flex-wrap: wrap !important;
      gap: 20px !important;
    }
    #comp-mlqlfcyn .comp-mlqlfcyn-container > [id^="comp-mlqlfcyr6__"] {
      flex: 1 1 calc(50% - 10px) !important;
      max-width: calc(50% - 10px) !important;
      width: auto !important;
    }
  }
  @media (max-width: 600px) {
    #comp-mlqlfcyn .comp-mlqlfcyn-container > [id^="comp-mlqlfcyr6__"] {
      flex: 1 1 100% !important;
      max-width: 100% !important;
      width: 100% !important;
    }
  }

  /* 3a. Award video/poster — full bleed, desktop height locked ~250px, mobile visible */
  #comp-mlau06ju {
    position: relative !important;
    z-index: 20 !important;
    margin-top: 0 !important;
    display: block !important;
    width: 100% !important;
    min-height: 250px !important;
  }
  #comp-mlau06ju,
  #comp-mlau06ju .max-width-container,
  #comp-mlau06ju-container {
    max-width: 100% !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 0 !important;
  }
  #comp-mlau0bjm,
  #bgLayers_comp-mlau0bjm,
  #comp-mlau0bjm_img,
  #videoContainer_comp-mlau0bjm,
  #comp-mlau0bjm video,
  #comp-mlau06ju video {
    position: relative !important;
    left: 0 !important;
    top: auto !important;
    right: auto !important;
    transform: none !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  #comp-mlau0bjm_img img,
  #comp-mlau0bjm video,
  #comp-mlau06ju video {
    width: 100% !important;
    max-width: 100% !important;
    object-fit: cover !important;
  }
  @media (min-width: 900px) {
    #comp-mlau06ju {
      height: 250px !important;
      max-height: 250px !important;
      overflow: hidden !important;
    }
    #comp-mlau0bjm,
    #videoContainer_comp-mlau0bjm,
    #comp-mlau0bjm_img,
    #comp-mlau0bjm_img img,
    #comp-mlau0bjm video,
    #comp-mlau06ju video {
      height: 250px !important;
      max-height: 250px !important;
    }
  }
  @media (max-width: 899px) {
    #comp-mlau06ju {
      height: auto !important;
      max-height: none !important;
      overflow: hidden !important;
      min-height: 180px !important;
      position: relative !important;
      display: block !important;
    }
    #comp-mlau0bjm,
    #videoContainer_comp-mlau0bjm {
      display: block !important;
      width: 100% !important;
      min-height: 180px !important;
      height: 200px !important;
      max-height: 280px !important;
      overflow: hidden !important;
      --aspect-ratio: auto !important;
      position: relative !important;
      left: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }
    /* poster fills wrap as background layer */
    #comp-mlau0bjm_img {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 1 !important;
      overflow: hidden !important;
      margin: 0 !important;
    }
    #comp-mlau0bjm_img img {
      width: 100% !important;
      height: 100% !important;
      max-width: 100% !important;
      object-fit: cover !important;
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
    }
    /* video on top, full size of wrap */
    #comp-mlau0bjm video,
    #comp-mlau06ju video {
      display: block !important;
      opacity: 1 !important;
      visibility: visible !important;
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      height: 100% !important;
      max-height: 280px !important;
      object-fit: cover !important;
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      right: 0 !important;
      z-index: 2 !important;
      margin: 0 !important;
    }
  }

  /* 3b. Partner / enquiry — Wix parent (display:contents) collapses injected
        sections; force real flow height + kill auto side margins on inner. */
  #PAGE_SECTIONSc1dmp {
    display: block !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
  }
  #partner-section,
  #enquiry-section {
    height: auto !important;
    min-height: max-content !important;
    min-height: fit-content !important;
    position: relative !important;
    width: 100% !important;
    box-sizing: border-box !important;
    overflow: visible !important;
    display: block !important;
    z-index: 2;
  }
  #partner-section > *,
  #enquiry-section > * {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 0 !important;
  }

  /* CONTACT MODAL FIX (scoped): the Wix #c1dmp .c1dmp-container rule sets
     pointer-events:none; our injected raw sections inherited it, so real mouse
     clicks/typing never reached the BECOME A DISTRIBUTOR button or the form
     controls (JS .click() bypassed it, which hid the bug). Re-enable
     pointer-events ONLY inside our two injected sections. */
  #partner-section,
  #partner-section *,
  #enquiry-section,
  #enquiry-section * {
    pointer-events: auto !important;
  }
  /* Contact panel hidden by default — it opens only from the BECOME A
     DISTRIBUTOR modal (never a permanent page section). */
  #enquiry-section {
    display: none !important;
  }
  /* Inline required-field errors (popup + inline contact forms). */
  .obagi-field-error {
    color: #b91c1c !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    margin-top: 4px !important;
  }
  input.obagi-field-error-active,
  select.obagi-field-error-active,
  textarea.obagi-field-error-active {
    border-color: #dc2626 !important;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15) !important;
  }
  #distributor-popup-form input:focus,
  #distributor-popup-form select:focus,
  #distributor-popup-form textarea:focus {
    border-color: #00768a !important;
    box-shadow: 0 0 0 3px rgba(0, 118, 138, 0.18) !important;
  }

  /* 3c. Empty newsletter husk (form/title retired) — hide so the band is not a
         black/empty gap. Shell stays in DOM for CMS BG-14 field mapping. */
  #comp-lx8nvywg {
    display: none !important;
  }

  /* 3d. Footer — full-bleed, content columns fill width (no 1600px inset) */
  #comp-ml6nay6u,
  #comp-ml6nay6u_r_comp-ljcmlawf,
  #bgLayers_comp-ml6nay6u_r_comp-ljcmlawf,
  #c1dmp-container,
  #c1dmp-overflow-wrapper {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  #comp-ml6nay6u_r_comp-ljckoxjc,
  #comp-ml6nay6u_r_comp-lx034ymr,
  #comp-ml6nay6u_r_comp-ljckoxjc > *,
  #comp-ml6nay6u_r_comp-lx034ymr > * {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    box-sizing: border-box !important;
  }
  /* content grid parent (anonymous DIV inside ljcmlawf) — kill 1600px + 388px margin */
  #comp-ml6nay6u_r_comp-ljcmlawf > div {
    max-width: 100% !important;
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    grid-template-columns: 1fr 1fr !important;
    box-sizing: border-box !important;
  }
  #comp-ml6nay6u_r_comp-ljcmlawf > div > * {
    min-width: 0 !important;
  }

  /* 3e. Brand Pillars Auto-Carousel Transitions */
  #comp-mlqmnjp410 .p9hNc1 {
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }
  #comp-mlqmnjp410 .p9hNc1.xjQkF3 {
    opacity: 1 !important;
    visibility: visible !important;
  }

  /* 4. Partner & Enquiry Interactive Styles */
  #obagi-become-distributor-btn:hover {
    background: #005f70 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 118, 138, 0.35) !important;
  }
  .obagi-btn-primary:hover {
    background: #005f70 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 118, 138, 0.35) !important;
  }
  .obagi-btn-secondary:hover {
    background: rgba(0, 118, 138, 0.06) !important;
    transform: translateY(-2px);
  }
  .obagi-action-card:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 10px 24px rgba(0, 118, 138, 0.16) !important;
    border-color: #00768a !important;
  }
  #enquiry-form input:focus,
  #enquiry-form select:focus,
  #enquiry-form textarea:focus,
  #distributor-popup-form input:focus,
  #distributor-popup-form select:focus,
  #distributor-popup-form textarea:focus {
    border-color: #00768a !important;
    box-shadow: 0 0 0 3px rgba(0, 118, 138, 0.15) !important;
  }
  #enquiry-submit-btn:hover,
  #distributor-popup-submit:hover {
    background: #005f70 !important;
    box-shadow: 0 6px 18px rgba(0, 118, 138, 0.3) !important;
    transform: translateY(-1px);
  }
  /* Newsletter form area is retired — partnership section owns the bottom CTA.
     Section shell (bgLayers_comp-lx8nvywg) stays for CMS BG-14 editing. */
  #comp-lx8nyczl10,
  #comp-lx8nzrma,
  [id^="comp-lx8nyczk6"] {
    display: none !important;
  }

  /* Mobile (≤768px): footer content grid must STACK (1 column) — 1fr 1fr on
     a ~360px screen squeezes both columns so text clips at the left edge.
     Popup + enquiry grids also collapse to single column. */
  @media (max-width: 768px) {
    #comp-ml6nay6u_r_comp-ljcmlawf > div {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }
    #comp-ml6nay6u_r_comp-ljckoxjc,
    #comp-ml6nay6u_r_comp-lx034ymr {
      overflow: visible !important;
    }
    #comp-ml6nay6u_r_comp-ljcmlawf > div > * {
      overflow-wrap: anywhere !important;
      word-break: break-word !important;
    }
    #obagi-distributor-popup {
      z-index: 2147483647 !important;
      position: fixed !important;
      inset: 0 !important;
      padding: 10px !important;
      align-items: flex-start !important;
      overflow-y: auto !important;
    }
    #obagi-distributor-popup-panel {
      max-width: 100% !important;
      max-height: calc(100vh - 54px) !important;
      margin: 10px auto 24px auto !important;
      border-radius: 16px !important;
    }
    #obagi-distributor-popup-panel > div {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
      padding: 44px 16px 20px !important;
    }
    #enquiry-section > div {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
  }
  #obagi-distributor-popup {
    z-index: 2147483647 !important;
    position: fixed !important;
    inset: 0 !important;
  }

  /* Footer Logo Pop-up / Scale Effect on Hover & Click (User Requested) */
  #comp-ml6nay6u_r_comp-lx02zbs6,
  #comp-ml6nay6u_r_comp-ljckoxjc,
  .comp-ml6nay6u_r_comp-ljckoxjc-container {
    display: inline-block !important;
    overflow: visible !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6 a {
    display: inline-block !important;
    text-decoration: none !important;
    overflow: visible !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6 img,
  #comp-ml6nay6u_r_comp-lx02zbs6 .ryan-footer-logo-img {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease !important;
    transform-origin: left center !important;
    cursor: pointer !important;
    will-change: transform !important;
    transform: scale(1) translateY(0) !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6:hover img,
  #comp-ml6nay6u_r_comp-lx02zbs6 a:hover img,
  #comp-ml6nay6u_r_comp-lx02zbs6:focus-within img {
    transform: scale(1.12) translateY(-2px) !important;
    filter: drop-shadow(0 10px 24px rgba(0, 118, 138, 0.35)) !important;
  }
  #comp-ml6nay6u_r_comp-lx02zbs6:active img,
  #comp-ml6nay6u_r_comp-lx02zbs6 a:active img {
    transform: scale(0.96) translateY(0) !important;
    transition-duration: 0.12s !important;
  }
  @media (max-width: 750px) {
    #comp-ml6nay6u_r_comp-lx02zbs6 img,
    #comp-ml6nay6u_r_comp-lx02zbs6 .ryan-footer-logo-img {
      transform-origin: center center !important;
    }
  }
</style>
`;

  if (result.includes('</head>')) {
    result = result.replace('</head>', `${scopedStyles}</head>`);
  } else {
    result = scopedStyles + result;
  }

  // 15. Neuter the Wix Thunderbolt runtime. It cannot boot off-origin
  // (hardcoded production origin everywhere): cross-origin Worker,
  // blob: URLs minted for obagiindia.com, obagiindia.com/_api calls,
  // sentry/frog telemetry. Its bundles throw during init (React
  // externals, loader 404s, workers) — that throw-flood IS the console
  // noise in this task. SSR markup + styles are untouched, so first
  // paint/design is identical; every behavior the page needs is covered
  // elsewhere: custom SSR+CSS navs (§2), Ryan search (§1d) + chat (§13d),
  // carousel/enquiry/nav-hide/mobile-menu in obagi-cms-sync.js, native
  // <video> autoplay + anchor scrolling.
  // A. HTTrack mirror runtime scripts: thunderbolt bundles, requirejs,
  //    loader, sentry, form/chat widgets (img/css mirror refs kept —
  //    they render fine).
  result = result.replace(
    /<script\b[^>]*src="[^"]*(?:obagi products_files|Obagi%20India)[^"]*"[^>]*>\s*<\/script>/gi,
    ''
  );
  // B. blob: script minted for the production origin — blocked locally.
  result = result.replace(
    /<script\b[^>]*src="blob:[^"]*"[^>]*>\s*<\/script>/gi,
    ''
  );
  // C. Inline inits that throw/phone home: cross-origin Worker builder,
  //    sentry SDK + beacons, frog beacons. Matched per single <script>
  //    block (non-greedy, never spans blocks) with a predicate.
  //    application/json data blocks are excluded outright — the viewer
  //    model legitimately mentions clientWorkerUrl/sentry DSNs as data,
  //    and its parse scripts must keep finding it (else new errors).
  result = result.replace(
    /<script(?![^>]*\bsrc=)(?![^>]*type="application\/json")[^>]*>[\s\S]*?<\/script>/gi,
    (m) =>
      /clientWorker|sentry-next\.wixpress\.com|sentry_key|frog\.wix\.com/.test(m)
        ? ''
        : m
  );
  // D. Strip Wix custom elements bundles that re-resolve & overwrite native <img> and <video>
  result = result.replace(
    /<script\b[^>]*data-url="[^"]*(?:initCustomElements|custom-element-utils)[^"]*"[^>]*>[\s\S]*?<\/script>/gi,
    ''
  );

  // E. Eager-load and asynchronously decode all images to prevent mobile scroll-flicker / blank frames
  result = result.replace(/\sloading=["']lazy["']/gi, ' loading="eager" decoding="async"');

  return result;
}
