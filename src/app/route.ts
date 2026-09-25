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
