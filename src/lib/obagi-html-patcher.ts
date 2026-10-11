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

function patchImgByAlt(html: string, altKeyword: string, newSrc?: string): string {
  if (!newSrc) return html;
  const re = new RegExp(`(<img\\b[^>]*alt="[^"]*${altKeyword}[^"]*"[^>]*>)`, 'i');
  return html.replace(re, (tag) => {
    return tag.replace(/src="[^"]*"/i, `src="${newSrc}"`).replace(/srcset="[^"]*"/i, '');
  });
}

/**
 * Replaces EVERY occurrence of a media URI fragment (both the <img> src and
 * the data-image-info JSON uri Wix embeds). Used for footer social icons,
 * whose fragment appears exactly twice (JSON + img). New URLs are Blob/CDN
 * https URLs — they contain no `"` so JSON stays valid.
 */
function patchUriFragmentAll(html: string, fragment: string, newSrc?: string): string {
  if (!newSrc || !fragment) return html;
  return html.split(fragment).join(newSrc);
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
 * Swaps ONLY the src attribute of a <video> (or its <source>), preserving
 * autoplay/mute/loop/playsinline/preload and all inline sizing.
 */
function patchVideoSrc(html: string, videoId: string, newSrc?: string): string {
  if (!newSrc) return html;
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

  // 1. Header Logo — src-swap ONLY. The layout box (147x85 desktop) is
  // untouched; the image fills its container so size/alignment never change.
  if (data.header?.logoUrl) {
    const logoImgRe = /(<div\s+data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>[\s\S]*?<img\b[^>]*?)(\ssrc="[^"]*")/i;
    if (logoImgRe.test(result)) {
      result = result.replace(
        logoImgRe,
        (_m, head) => `${head} src="${data.header!.logoUrl}"`
      );
    } else {
      const logoRe = /(<div\s+data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>)([\s\S]*?)(<\/div>)/;
      result = result.replace(logoRe, (_m, open, _old, close) => {
        return `${open}<img src="${data.header!.logoUrl}" alt="Logo" style="width:100%;height:100%;object-fit:contain;" />${close}`;
      });
    }
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
    if (data.hero.heroVideoUrl) {
      // Existing hero bg video only — playback attrs untouched.
      result = patchVideoSrc(result, 'comp-lwxgxhly_video', data.hero.heroVideoUrl);
    }
    if (data.hero.heroVideoPoster) {
      result = patchVideoPoster(result, 'comp-lwxgxhly_video', data.hero.heroVideoPoster);
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
      const fHtml = `<p class="font_8 wixui-rich-text__text">${escapeHtml(data.footer.copyright)}</p>`;
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
      result = result.replace(
        /(<wow-image\b[^>]*id="comp-mlau0bjm_img"[^>]*>[\s\S]*?<img\b[^>]*?)(\ssrc="[^"]*")/i,
        (_m, head) => `${head} src="${data.awardVideo!.posterImage}"`
      );
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
  #comp-lw3c3n7z-pinned-layer,
  #comp-lw3c3n7z {
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: transform !important;
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
  }

  /* 2. R&D Science Cards — fill width, no outer side gap, no left margin */
  @media (min-width: 900px) {
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
      align-items: stretch !important;
      gap: 16px !important;
      flex-wrap: nowrap !important;
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 16px !important;
      box-sizing: border-box !important;
    }
    #comp-mlqlfcyn .comp-mlqlfcyn-container > [id^="comp-mlqlfcyr6__"] {
      flex: 1 1 25% !important;
      max-width: 25% !important;
      width: 25% !important;
      min-width: 0 !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
    }
    [id^="comp-mlqlfcyz7__"] img,
    [id^="comp-mlqlfcyt2__"] img {
      width: 100% !important;
      aspect-ratio: 4/3 !important;
      object-fit: cover !important;
      border-radius: 12px !important;
    }
  }

  /* 3a. Award video/poster — full bleed, desktop height locked ~250px, mobile visible */
  #comp-mlau06ju,
  #comp-mlau06ju .max-width-container,
  #comp-mlau06ju-container {
    max-width: 100% !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
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
</style>
`;

  if (result.includes('</head>')) {
    result = result.replace('</head>', `${scopedStyles}</head>`);
  } else {
    result = scopedStyles + result;
  }

  return result;
}
