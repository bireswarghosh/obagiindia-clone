import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSiteData } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = getSiteData();
    const filePath = path.join(process.cwd(), 'Obagi India _ obagi products.html');
    let html = fs.readFileSync(filePath, 'utf8');

    // =========================================================================
    // NAVBAR / HEADER (SCREEN 0)
    // =========================================================================
    const header = data.header || {};

    // 1. Logo
    if (header.logoImageUrl) {
      // Replace SVG logo with custom uploaded/provided Image Logo
      html = html.replace(
        /(<div data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"[^>]*>)([\s\S]*?)(<\/div><\/a>)/,
        `$1<img src="${header.logoImageUrl}" alt="${header.logoText || 'Obagi'}" style="max-height: 48px; object-fit: contain; display: inline-block;">$3`
      );
    }

    // 2. Brought to you in India by SPECTRA
    if (header.broughtByText) {
      html = html.replace(
        /(<span class="nb2UT3 GxMh7V wixui-button__label" data-testid="stylablebutton-label">)([\s\S]*?)(<\/span>)/,
        `$1${renderRichText(header.broughtByText)}$3`
      );
    }

    if (header.broughtByLinkUrl) {
      html = html.replace(
        /(href=")[^"]*("\s+rel="noreferrer noopener"\s+target="_blank"[^>]*id="comp-lw3c3n7z_r_comp-mlethlmo")/,
        `$1${header.broughtByLinkUrl}$2`
      );
    }

    // 3. Nav Items (Top level labels)
    if (header.navItems && header.navItems.length > 0) {
      const nav1 = header.navItems[0];
      const nav2 = header.navItems[1];
      const nav3 = header.navItems[2];
      const nav4 = header.navItems[3];

      if (nav1?.title) {
        html = html.replace(/(<div class="ijO_Jr wixui-horizontal-menu__item-label wixui-menu__item-label GPIJZi" data-part="label">)(Why Obagi \?)(<\/div>)/, `$1${renderRichText(nav1.title)}$3`);
      }
      if (nav2?.title) {
        html = html.replace(/(<div class="ijO_Jr wixui-horizontal-menu__item-label wixui-menu__item-label GPIJZi" data-part="label">)(\s*Skin Concern)(<\/div>)/, `$1 ${renderRichText(nav2.title)}$3`);
      }
      if (nav3?.title) {
        html = html.replace(/(<div class="ijO_Jr wixui-horizontal-menu__item-label wixui-menu__item-label GPIJZi" data-part="label">)(Product Range)(<\/div>)/, `$1${renderRichText(nav3.title)}$3`);
      }
      if (nav4?.title) {
        html = html.replace(/(<div class="ijO_Jr wixui-horizontal-menu__item-label wixui-menu__item-label GPIJZi" data-part="label">)(Find Obagi)(<\/div>)/, `$1${renderRichText(nav4.title)}$3`);
      }
    }

    // =========================================================================
    // TRUST MARQUEE TICKER (Between Hero and History)
    // =========================================================================
    const marquee = data.marquee;
    if (marquee?.text) {
      const tickerText = renderRichText(marquee.text);
      // Replace text inside marquee unit
      html = html.replace(
        /(<span class="WhVia0 zO_haP wixui-text-marquee__text" data-testid="marquee-item-text"><span>)([\s\S]*?)(<\/span><\/span>)/g,
        `$1${tickerText}$3`
      );
      // Replace data-text attributes
      html = html.replace(
        /data-text="CLINICALLY-TESTED[^"]*"/g,
        `data-text="${tickerText.replace(/"/g, '&quot;')}"`
      );
    }

    // =========================================================================
    // SCREEN 1: HERO VIDEO SECTION
    // =========================================================================
    const hero = data.hero || {};

    if (hero.heading) {
      const headingColorStyle = hero.headingColor ? `style="color: ${hero.headingColor};"` : '';
      const headingHtml = `<div id="comp-lxriadds" class="N8MGzv _v6ohL AWXfZq PO9MfV comp-lxriadds wixui-rich-text" data-testid="richTextElement"><h1 class="font_0 wixui-rich-text__text" ${headingColorStyle}><span class="wixui-rich-text__text" ${headingColorStyle}>${renderRichText(hero.heading)}</span></h1></div><!--/$-->`;
      html = html.replace(/<div id="comp-lxriadds"[\s\S]*?<\/div><!--\/\$-->/, headingHtml);
    }

    if (hero.subtitle || hero.awardBadge || hero.awardText) {
      const rawSub = hero.subtitle || `${hero.awardBadge || ''}\n${hero.awardText || ''}`.trim();
      const formattedLines = rawSub
        .split('\n')
        .map((line: string) => renderRichText(line))
        .join('<br class="wixui-rich-text__text">\n');
      const subtitleColorStyle = hero.subtitleColor ? `style="color: ${hero.subtitleColor};"` : '';
      const subHtml = `<div id="comp-lxriaddt" class="N8MGzv _v6ohL AWXfZq PO9MfV comp-lxriaddt wixui-rich-text" data-testid="richTextElement"><h2 class="font_3 wixui-rich-text__text" ${subtitleColorStyle}>${formattedLines}</h2></div><!--/$-->`;
      html = html.replace(/<div id="comp-lxriaddt"[\s\S]*?<\/div><!--\/\$-->/, subHtml);
    }

    if (hero.mediaUrl) {
      html = html.replace(
        /(<video id="comp-lwxgxhly_video"[^>]*?\ssrc=")[^"]*(")/,
        `$1${hero.mediaUrl}$2`
      );
    }

    if (hero.posterUrl) {
      html = html.replace(
        /(<wow-image id="comp-lwxgxhly_img"[^>]*?>\s*<img\s+src=")[^"]*(")/,
        `$1${hero.posterUrl}$2`
      );
    }

    // =========================================================================
    // SCREEN 2: FIMAGE / IMAGE FEATURE (Our History & Gallery)
    // =========================================================================
    const history = data.history || {};

    if (history.title) {
      const titleColorStyle = history.titleColor ? `style="color: ${history.titleColor};"` : '';
      const titleHtml = `<div id="comp-lwqg9o89" class="N8MGzv _v6ohL AWXfZq PO9MfV comp-lwqg9o89 wixui-rich-text" data-testid="richTextElement" style="--motion-rotate-x: -90deg; --motion-rotate-y: 0deg;" data-motion-enter="done"><h2 class="font_2 wixui-rich-text__text" ${titleColorStyle}>${renderRichText(history.title)}</h2></div><!--/$-->`;
      html = html.replace(/<div id="comp-lwqg9o89"[\s\S]*?<\/div><!--\/\$-->/, titleHtml);
    }

    if (history.description) {
      const textColorStyle = history.textColor ? `style="color: ${history.textColor};"` : '';
      const descHtml = `<div id="comp-lwqgbmmr" class="N8MGzv _v6ohL AWXfZq PO9MfV comp-lwqgbmmr wixui-rich-text" data-testid="richTextElement"><p class="font_8 wixui-rich-text__text" ${textColorStyle}>${renderRichText(history.description)}</p></div><!--/$-->`;
      html = html.replace(/<div id="comp-lwqgbmmr"[\s\S]*?<\/div><!--\/\$-->/, descHtml);
    }

    if (history.primaryImage) {
      html = html.replace(
        /(<wow-image id="img-comp-lwz20l0e14"[\s\S]*?<img[^>]+src=")[^">]+(")/,
        `$1${history.primaryImage}$2`
      );
    }

    if (history.badgeImage) {
      html = html.replace(
        /(<wow-image id="img-comp-lwz20l0g6"[\s\S]*?<img[^>]+src=")[^">]+(")/,
        `$1${history.badgeImage}$2`
      );
    }

    if (history.dropperImage) {
      html = html.replace(
        /(<wow-image id="img-comp-ml6lwrwb"[\s\S]*?<img[^>]+src=")[^">]+(")/,
        `$1${history.dropperImage}$2`
      );
    }

    if (history.portraitImage) {
      html = html.replace(
        /(<wow-image id="img-comp-ml6m00og"[\s\S]*?<img[^>]+src=")[^">]+(")/,
        `$1${history.portraitImage}$2`
      );
    }

    // =========================================================================
    // SCREEN 3: ABOUT OBAGI
    // =========================================================================
    const about = data.about || {};

    if (about.title) {
      html = html.replace(
        /(<section id="comp-lwrl1yo4"[\s\S]*?<h2[^>]*>)([\s\S]*?)(<\/h2>)/,
        `$1${renderRichText(about.title)}$3`
      );
    }

    if (about.quote) {
      html = html.replace(
        /(<section id="comp-lwrl1yo4"[\s\S]*?<p[^>]*>“)([\s\S]*?)(”<\/p>)/,
        `$1${renderRichText(about.quote.replace(/^[“"]|[”"]$/g, ''))}$3`
      );
    }

    if (about.paragraph) {
      html = html.replace(
        /(<section id="comp-ml6khg9g"[\s\S]*?<p[^>]*>)([\s\S]*?)(<\/p>)/,
        `$1${renderRichText(about.paragraph)}$3`
      );
    }

    // =========================================================================
    // SCREEN 4: #1 PHYSICIAN RECOMMENDED BRAND (Trust Banner / Repeater)
    // =========================================================================
    const trustBanner = data.trustBanner;
    if (trustBanner?.heading) {
      html = html.replace(
        /(<div id="comp-mlqmnjp2"[^>]*><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/,
        `$1${renderRichText(trustBanner.heading)}$3`
      );
    }

    if (trustBanner?.tagline) {
      html = html.replace(
        /(<div id="comp-mlqmnjoy8"[^>]*><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/,
        `$1${renderRichText(trustBanner.tagline)}$3`
      );
    }

    if (trustBanner?.items && trustBanner.items.length > 0) {
      // Item 1
      if (trustBanner.items[0]?.title) {
        html = html.replace(/(<div id="comp-mlqmnjpf3__item1"[^>]*><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/, `$1${renderRichText(trustBanner.items[0].title)}$3`);
      }
      if (trustBanner.items[0]?.description) {
        html = html.replace(/(<div id="comp-mlqmnjpd8__item1"[^>]*><blockquote[^>]*>)([\s\S]*?)(<\/blockquote><\/div>)/, `$1${renderRichText(trustBanner.items[0].description)}$3`);
      }
      // Item 2
      if (trustBanner.items[1]?.title) {
        html = html.replace(/(<div id="comp-mlqmnjpf3__item-j9ples3e"[^>]*><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/, `$1${renderRichText(trustBanner.items[1].title)}$3`);
      }
      if (trustBanner.items[1]?.description) {
        html = html.replace(/(<div id="comp-mlqmnjpd8__item-j9ples3e"[^>]*><blockquote[^>]*>)([\s\S]*?)(<\/blockquote><\/div>)/, `$1${renderRichText(trustBanner.items[1].description)}$3`);
      }
      // Item 3
      if (trustBanner.items[2]?.title) {
        html = html.replace(/(<div id="comp-mlqmnjpf3__item-j9plerjk"[^>]*>)([\s\S]*?)(<\/div><!--\/\$-->)/, `$1<p class="font_5 wixui-rich-text__text">${renderRichText(trustBanner.items[2].title)}</p>$3`);
      }
      if (trustBanner.items[2]?.description) {
        html = html.replace(/(<div id="comp-mlqmnjpd8__item-j9plerjk"[^>]*><blockquote[^>]*>)([\s\S]*?)(<\/blockquote><\/div>)/, `$1${renderRichText(trustBanner.items[2].description)}$3`);
      }
      // Item 4
      if (trustBanner.items[3]?.title) {
        html = html.replace(/(<div id="comp-mlqmnjpf3__item-mlqnbcvm"[^>]*><p[^>]*>)([\s\S]*?)(<\/p><\/div>)/, `$1${renderRichText(trustBanner.items[3].title)}$3`);
      }
      if (trustBanner.items[3]?.description) {
        html = html.replace(/(<div id="comp-mlqmnjpd8__item-mlqnbcvm"[^>]*><blockquote[^>]*><span[^>]*>)([\s\S]*?)(<\/span><\/blockquote><\/div>)/, `$1${renderRichText(trustBanner.items[3].description)}$3`);
      }
    }

    // =========================================================================
    // SCREEN 5: RESEARCH & DEVELOPMENT & OUR APPROACH
    // =========================================================================
    const research = data.research || {};

    if (research.title) {
      html = html.replace(
        /(<section id="comp-mlqlr0fm"[\s\S]*?<h2[^>]*>)([\s\S]*?)(<\/h2>)/,
        `$1${renderRichText(research.title)}$3`
      );
    }

    if (research.description) {
      html = html.replace(
        /(<section id="comp-mlqlr0fm"[\s\S]*?<p[^>]*>)([\s\S]*?)(<\/p>)/,
        `$1${renderRichText(research.description)}$3`
      );
    }

    if (research.backgroundImage) {
      html = html.replace(
        /(<section id="comp-mlqlr0fm"[\s\S]*?<img[^>]+src=")[^">]+(")/,
        `$1${research.backgroundImage}$2`
      );
    }

    const approach = data.approach;
    if (approach?.tabs && approach.tabs.length > 0) {
      // Approach tab 1
      if (approach.tabs[0]) {
        if (approach.tabs[0].title) {
          html = html.replace(
            /(Our Approach to Innovation)/g,
            renderRichText(approach.tabs[0].title)
          );
        }
        if (approach.tabs[0].image) {
          html = html.replace(
            /(https:\/\/static\.wixstatic\.com\/media\/4833d7_8df05a975c034ffe9ab6011eff353dc0~mv2\.webp\/[^\"]+)/,
            approach.tabs[0].image
          );
        }
      }
      // Process tab 2
      if (approach.tabs[1]) {
        if (approach.tabs[1].title) {
          html = html.replace(
            /(Our Process)/g,
            renderRichText(approach.tabs[1].title)
          );
        }
        if (approach.tabs[1].image) {
          html = html.replace(
            /(https:\/\/static\.wixstatic\.com\/media\/4833d7_89f2940aeb7f44dd80b03fba406941b4~mv2\.webp\/[^\"]+)/,
            approach.tabs[1].image
          );
        }
      }
      // Standards tab 3
      if (approach.tabs[2]) {
        if (approach.tabs[2].title) {
          html = html.replace(
            /(Our Standards)/g,
            renderRichText(approach.tabs[2].title)
          );
        }
        if (approach.tabs[2].image) {
          html = html.replace(
            /(https:\/\/static\.wixstatic\.com\/media\/4833d7_58d317fb587b4fe99de2c8ee9ed76531~mv2\.webp\/[^\"]+)/,
            approach.tabs[2].image
          );
        }
      }
    }

    // =========================================================================
    // SCREEN 6: CARD SYSTEM (3D STICKY PIN) & UNDER-CARD VIDEO
    // =========================================================================
    const cardsSection = data.cardsSection || {};

    if (cardsSection.pinkSerumImage) {
      html = html.replace(
        /(https:\/\/static\.wixstatic\.com\/media\/c837a6_297eb5ebbb894e709a4ae04906201fa2~mv2\.jpg\/[^\"]+)/,
        cardsSection.pinkSerumImage
      );
    }

    if (cardsSection.cards && cardsSection.cards.length >= 3) {
      // Card 1
      if (cardsSection.cards[0].title) {
        html = html.replace(/(Obagi Nu-Derm Fx™ Systems)/, renderRichText(cardsSection.cards[0].title));
      }
      if (cardsSection.cards[0].subtitle) {
        html = html.replace(/(Reveal Younger, Healthier-Looking Skin)/, renderRichText(cardsSection.cards[0].subtitle));
      }
      if (cardsSection.cards[0].imageUrl) {
        html = html.replace(
          /(https:\/\/static\.wixstatic\.com\/media\/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2\.jpg\/v1\/fill\/w_446,h_446[^\"]+)/,
          cardsSection.cards[0].imageUrl
        );
      }

      // Card 2
      if (cardsSection.cards[1].title) {
        html = html.replace(/(Obagi Daily Hydro-Drops)/, renderRichText(cardsSection.cards[1].title));
      }
      if (cardsSection.cards[1].subtitle) {
        html = html.replace(/(Radiance in every drop)/, renderRichText(cardsSection.cards[1].subtitle));
      }
      if (cardsSection.cards[1].imageUrl) {
        html = html.replace(
          /(https:\/\/static\.wixstatic\.com\/media\/4833d7_0e709d6bf09f449a95982e60334a21d0~mv2\.jpg\/v1\/fill\/w_446,h_446[^\"]+)/,
          cardsSection.cards[1].imageUrl
        );
      }

      // Card 3
      if (cardsSection.cards[2].title) {
        html = html.replace(/(Nu-Cil® Hair & Lash)/, renderRichText(cardsSection.cards[2].title));
      }
      if (cardsSection.cards[2].imageUrl) {
        html = html.replace(
          /(https:\/\/static\.wixstatic\.com\/media\/4833d7_e37f8725511940928a31982f09cceeeb~mv2\.jpg\/v1\/fill\/w_446,h_446[^\"]+)/,
          cardsSection.cards[2].imageUrl
        );
      }
    }

    // Video underneath 3D cards
    if (cardsSection.awardVideoUrl) {
      html = html.replace(
        /(<video id="comp-mlau0bjm_video"[^>]*?\ssrc=")[^"]*(")/,
        `$1${cardsSection.awardVideoUrl}$2`
      );
    }
    if (cardsSection.awardVideoPoster) {
      html = html.replace(
        /(<wow-image id="comp-mlau0bjm_img"[^>]*?>\s*<img\s+src=")[^"]*(")/,
        `$1${cardsSection.awardVideoPoster}$2`
      );
    }

    // =========================================================================
    // SCREEN 7: QUOTE + NEWSLETTER + FOOTER
    // =========================================================================
    const quote = data.quote;
    if (quote?.quoteText) {
      html = html.replace(
        /(Use this space to share a testimonial quote about the business[^\.<]+[\.]?)/,
        renderRichText(quote.quoteText)
      );
    }
    if (quote?.quoteAuthor) {
      html = html.replace(/(Megan Brown)/, renderRichText(quote.quoteAuthor));
    }
    if (quote?.quoteRole) {
      html = html.replace(/(CEO and Co-Founder of BGS)/, renderRichText(quote.quoteRole));
    }

    const newsletter = data.newsletter || {};
    if (newsletter.newsletterTitle) {
      html = html.replace(/(Join The OBAGI Newsletter)/, renderRichText(newsletter.newsletterTitle));
    }
    if (newsletter.newsletterDesc) {
      html = html.replace(/(Be the first to receive the latest news and updates\.)/, renderRichText(newsletter.newsletterDesc));
    }

    // =========================================================================
    // FLOATING AI / HELP WIDGET
    // =========================================================================
    const floating = data.floatingWidget;
    if (floating) {
      if (floating.mainButtonText) {
        html = html.replace(/(<div class="s__9quLEI">)(Chat with AI)(<\/div>)/, `$1${renderRichText(floating.mainButtonText)}$3`);
      }
      if (floating.unreadBadgeText) {
        html = html.replace(/(<div class="snxoHLB"><p>)(Need Help\?)(<\/p><\/div>)/, `$1${renderRichText(floating.unreadBadgeText)}$3`);
      }
      if (floating.prompts && floating.prompts.length >= 3) {
        html = html.replace(/(Want to know about Obagi Nu-Derm Fx™ Systems\?)/, renderRichText(floating.prompts[0]));
        html = html.replace(/(Explore Obagi)/, renderRichText(floating.prompts[1]));
        html = html.replace(/(Address the Signs of Aging Skin)/, renderRichText(floating.prompts[2]));
      }
    }

    // Dynamic styles across all sections
    const dynamicStyles = `
  <!-- DYNAMIC STYLES & DATA BRIDGE (ALL SECTIONS) -->
  <style id="obagi-dynamic-all-screens-styles">
    /* Header & Logo */
    ${header.logoColor ? `#comp-lw3c3n7z_r_comp-lw3c38vb svg path { fill: ${header.logoColor} !important; }` : ''}
    ${header.logoPosition === 'center' ? `#comp-lw3c3n7z_r_comp-lwqc45m1 { margin-left: auto !important; margin-right: auto !important; }` : ''}
    ${header.searchEnabled === false ? `#comp-lw3c3n7z search { display: none !important; }` : ''}

    /* Trust Marquee Ticker */
    ${marquee?.enabled === false ? `#comp-mlqkez2p { display: none !important; }` : ''}
    ${marquee?.speedSeconds ? `#comp-mlqkgv7u { --marquee-duration: ${marquee.speedSeconds}s !important; }` : ''}
    ${marquee?.backgroundColor ? `#comp-mlqkez2p { background-color: ${marquee.backgroundColor} !important; }` : ''}
    ${marquee?.textColor ? `#comp-mlqkgv7u span, #comp-mlqkgv7u p { color: ${marquee.textColor} !important; }` : ''}

    /* Hero */
    ${hero.backgroundColor ? `#comp-kbgaghri { background-color: ${hero.backgroundColor} !important; }` : ''}
    ${hero.headingColor ? `#comp-lxriadds h1, #comp-lxriadds span { color: ${hero.headingColor} !important; }` : ''}
    ${hero.subtitleColor ? `#comp-lxriaddt h2, #comp-lxriaddt span { color: ${hero.subtitleColor} !important; }` : ''}

    /* History */
    ${history.backgroundColor ? `#comp-lwqg8022 { background-color: ${history.backgroundColor} !important; }` : ''}
    ${history.titleColor ? `#comp-lwqg9o89 h2, #comp-lwqg9o89 span { color: ${history.titleColor} !important; }` : ''}
    ${history.textColor ? `#comp-lwqgbmmr p, #comp-lwqgbmmr span { color: ${history.textColor} !important; }` : ''}

    /* About */
    ${about.backgroundColor ? `#comp-lwrl1yo4, #comp-ml6khg9g { background-color: ${about.backgroundColor} !important; }` : ''}
    ${about.titleColor ? `#comp-lwrl1yo4 h2 { color: ${about.titleColor} !important; }` : ''}
    ${about.quoteColor ? `#comp-lwrl1yo4 p { color: ${about.quoteColor} !important; }` : ''}
    ${about.paragraphColor ? `#comp-ml6khg9g p { color: ${about.paragraphColor} !important; }` : ''}

    /* Physician Heritage */
    ${trustBanner?.backgroundColor ? `#comp-mlqmnjor { background-color: ${trustBanner.backgroundColor} !important; }` : ''}
    ${trustBanner?.headingColor ? `#comp-mlqmnjp2 p { color: ${trustBanner.headingColor} !important; }` : ''}
    ${trustBanner?.taglineColor ? `#comp-mlqmnjoy8 p { color: ${trustBanner.taglineColor} !important; }` : ''}

    /* Research & Development */
    ${research.backgroundColor ? `#comp-mlqlr0fm { background-color: ${research.backgroundColor} !important; }` : ''}
    ${research.textColor ? `#comp-mlqlr0fm h2, #comp-mlqlr0fm p { color: ${research.textColor} !important; }` : ''}

    /* Quote */
    ${quote?.backgroundColor ? `#comp-lwryj83c { background-color: ${quote.backgroundColor} !important; }` : ''}
    ${quote?.textColor ? `#comp-lwryj83c p, #comp-lwryj83c h3 { color: ${quote.textColor} !important; }` : ''}

    /* Floating Widget */
    ${floating?.enabled === false ? `.sprWvfu, #popover_62ytzm0ch, [data-hook="minimizedChat"] { display: none !important; }` : ''}
    ${floating?.accentColor ? `.sRspiB9, .s__8hpF9q { background-color: ${floating.accentColor} !important; }` : ''}
  </style>
  <script id="obagi-server-data-bridge">
    window.__OBAGI_DATA__ = ${JSON.stringify(data)};
  </script>
`;
    html = html.replace('</head>', `${dynamicStyles}\n</head>`);

    // =========================================================================
    // CARD STACK SCROLL ANIMATION — Injected HTML + Script at </body>
    // =========================================================================
    const cardsSectionData = data.cardsSection || {};
    const visibleCards = (cardsSectionData.cards || []).filter((c: any) => c.visible !== false).slice(0, 3);
    const serumBg = cardsSectionData.pinkSerumImage || 'https://static.wixstatic.com/media/c837a6_297eb5ebbb894e709a4ae04906201fa2~mv2.jpg/v1/fill/w_1898,h_353,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-luu-thanh-truc-335871-9085814.jpg';
    const approachTabs = (data.approach?.tabs || []) as any[];

    const renderedCards = visibleCards.map((card: any, i: number) => `
<div class="obagi-deck-card" id="obagi-deck-card-${i}" style="position:absolute;left:50%;bottom:0;transform:translateX(-50%) translateY(100%);width:90%;max-width:1100px;background:#fff;border-radius:24px 24px 0 0;box-shadow:0 -8px 60px rgba(0,0,0,0.18);z-index:${20 + i};will-change:transform;overflow:hidden;display:grid;grid-template-columns:72px 1fr 320px;min-height:360px;">
  <div style="display:flex;align-items:center;justify-content:center;padding:40px 16px;border-right:1px solid #f0f0f0;">
    <span style="font-family:'Georgia',serif;font-size:5rem;font-weight:300;color:#e0e0e6;line-height:1;">${card.number || (i + 1)}</span>
  </div>
  <div style="padding:48px 40px;display:flex;flex-direction:column;justify-content:center;gap:14px;">
    <span style="display:inline-block;padding:4px 14px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:#21275c;color:#fff;width:fit-content;">Medical System</span>
    <h3 style="font-family:'Georgia',serif;font-size:2.2rem;font-weight:700;color:#0e2238;line-height:1.2;margin:0;">${card.title || ''}</h3>
    <p style="font-size:.9rem;font-weight:600;color:#b1843b;margin:0;">${card.subtitle || ''}</p>
    <p style="font-size:.85rem;color:#555;line-height:1.7;margin:0;max-width:520px;">${card.description || ''}</p>
    <a href="${card.linkUrl || '#'}" style="display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#21275c;text-decoration:none;margin-top:4px;">Explore Formulation Science &rarr;</a>
  </div>
  <div style="background:#f8f7f5;display:flex;align-items:center;justify-content:center;padding:28px;border-left:1px solid #f0f0f0;">
    <img src="${card.imageUrl || ''}" alt="${card.title || ''}" style="max-height:240px;max-width:100%;object-fit:contain;" loading="lazy">
  </div>
</div>`).join('\n');

    const tab0 = approachTabs[0] || {};
    const tab1 = approachTabs[1] || {};
    const tab2 = approachTabs[2] || {};

    const cardAnimBlock = `
<style>
  #comp-mlqlfcyi,#comp-lwrl9iel{display:none!important}
  #obagi-card-stage{background:#f8f7f5}
  #obagi-approach-cols{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid rgba(0,0,0,.08);background:#f8f7f5;position:relative;z-index:2}
  #obagi-approach-cols .oa-col{padding:56px 40px;border-right:1px solid rgba(0,0,0,.08)}
  #obagi-approach-cols .oa-col:last-child{border-right:none}
  #obagi-approach-cols .oa-col img{width:100%;height:280px;object-fit:cover;border-radius:12px;margin-bottom:24px}
  #obagi-approach-cols .oa-col h3{font-family:'Georgia',serif;font-size:1.45rem;font-weight:700;color:#0e2238;margin:0 0 12px;line-height:1.3}
  #obagi-approach-cols .oa-col p{font-size:.875rem;color:#666;line-height:1.7;margin:0}
  #obagi-sticky-scene{height:400vh;position:relative}
  #obagi-sticky-vp{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;align-items:flex-end;justify-content:center}
  #obagi-pink-pill{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);overflow:hidden;will-change:width,height,border-radius,top;z-index:1}
  #obagi-pink-pill img{width:100%;height:100%;object-fit:cover;display:block}
  #obagi-cards-wrap{position:absolute;bottom:0;left:0;right:0;height:100%;pointer-events:none}
  .obagi-deck-card{pointer-events:auto}
  @media(max-width:800px){
    #obagi-approach-cols{grid-template-columns:1fr}
    .oa-col{border-right:none!important;border-bottom:1px solid rgba(0,0,0,.08);padding:32px 24px!important}
    .obagi-deck-card{grid-template-columns:1fr!important}
    .obagi-deck-card>div:first-child,.obagi-deck-card>div:last-child{display:none!important}
  }
</style>
<div id="obagi-card-stage">
  <div id="obagi-approach-cols">
    <div class="oa-col">
      <img src="${tab0.image || 'https://static.wixstatic.com/media/4833d7_8df05a975c034ffe9ab6011eff353dc0~mv2.webp/v1/fill/w_564,h_728,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/scientist-pouring-red-liquid_2560x.webp'}" alt="Approach" loading="lazy">
      <h3>${tab0.title || 'Our Approach to Innovation'}</h3>
      <p>${tab0.desc || 'At Obagi, breakthrough innovation begins with a deep understanding of skin biology.'}</p>
    </div>
    <div class="oa-col">
      <img src="${tab1.image || 'https://static.wixstatic.com/media/4833d7_89f2940aeb7f44dd80b03fba406941b4~mv2.webp/v1/fill/w_496,h_640,al_c,q_80,enc_avif,quality_auto/woman-scientist-doing-experiment_960x.webp'}" alt="Process" loading="lazy">
      <h3>${tab1.title || 'Our Process'}</h3>
      <p>${tab1.desc || 'Our rigorous product development process leaves no stone left unturned.'}</p>
    </div>
    <div class="oa-col">
      <img src="${tab2.image || 'https://static.wixstatic.com/media/4833d7_58d317fb587b4fe99de2c8ee9ed76531~mv2.webp/v1/fill/w_496,h_640,al_c,q_80,enc_avif,quality_auto/science-research-lab-microscope_960x.webp'}" alt="Standards" loading="lazy">
      <h3>${tab2.title || 'Our Standards'}</h3>
      <p>${tab2.desc || 'Genuine Obagi — committed to the highest product testing standards.'}</p>
    </div>
  </div>
  <div id="obagi-sticky-scene">
    <div id="obagi-sticky-vp">
      <div id="obagi-pink-pill"><img src="${serumBg}" alt="Serum" loading="lazy"></div>
      <div id="obagi-cards-wrap">${renderedCards}</div>
    </div>
  </div>
</div>
<script>
(function(){
  function loadScript(src,cb){var s=document.createElement('script');s.src=src;s.async=true;s.onload=cb;document.head.appendChild(s);}
  function run(){
    var gsap=window.gsap,ST=window.ScrollTrigger;
    gsap.registerPlugin(ST);
    var pill=document.getElementById('obagi-pink-pill');
    var scene=document.getElementById('obagi-sticky-scene');
    var cards=[].slice.call(document.querySelectorAll('.obagi-deck-card'));
    if(!pill||!scene||!cards.length)return;
    var vw=window.innerWidth,vh=window.innerHeight;
    gsap.set(pill,{width:Math.round(vw*0.40),height:120,borderRadius:100,xPercent:-50,yPercent:-50,left:'50%',top:'50%'});
    cards.forEach(function(c){gsap.set(c,{y:'100%'});});
    var tl=gsap.timeline({scrollTrigger:{trigger:scene,start:'top top',end:'bottom bottom',scrub:0.8,anticipatePin:1}});
    tl.to(pill,{width:vw,height:vh,borderRadius:0,top:'0%',yPercent:0,ease:'power2.inOut',duration:3},0);
    tl.to(cards[0],{y:0,ease:'power3.out',duration:2},2.5);
    if(cards[1])tl.to(cards[1],{y:0,ease:'power3.out',duration:2},4.5);
    if(cards[2])tl.to(cards[2],{y:0,ease:'power3.out',duration:2},6.5);
    window.addEventListener('resize',function(){vw=window.innerWidth;vh=window.innerHeight;ST.refresh();});
  }
  function boot(){
    if(window.gsap&&window.ScrollTrigger){run();return;}
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',function(){
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',run);
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);}else{boot();}
})();
</script>`;

    html = html.replace('</body>', `${cardAnimBlock}\n</body>`);

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Error rendering dynamic clone:', error);
    return new Response(`<h1>Internal Server Error</h1><pre>${error?.stack || error}</pre>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function renderRichText(input: string | undefined): string {
  if (!input) return '';
  // Sanitize potentially harmful tags while allowing formatting tags
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}
