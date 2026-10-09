/**
 * Obagi India Dynamic CMS Synchronizer
 * Injected automatically on the homepage to sync CMS edits from localStorage or server state
 * without touching or breaking any of the original Obagi website HTML, JS, animations, or styling.
 */
(function () {
  function getCmsData() {
    try {
      var local = localStorage.getItem('obagi_home_cms');
      if (local) {
        var parsed = JSON.parse(local);
        if (parsed && parsed.hero) return parsed;
      }
    } catch (e) {
      console.warn('Could not read local CMS data:', e);
    }
    if (window.__OBAGI_CMS_DATA__) {
      return window.__OBAGI_CMS_DATA__;
    }
    return null;
  }

  function setElementText(id, text, color) {
    if (!text && !color) return;
    var el = document.getElementById(id);
    if (!el) return;
    // Find richText inner container or span/p/h
    var target = el.querySelector('p, h1, h2, h3, h4, span, blockquote') || el;
    if (text !== undefined && text !== null) {
      // If text contains HTML tags, use innerHTML, else innerText
      if (text.indexOf('<') !== -1) {
        target.innerHTML = text;
      } else {
        target.innerText = text;
      }
    }
    if (color) {
      target.style.color = color;
      el.style.color = color;
    }
  }

  function setImageSrc(selector, src) {
    if (!src) return;
    var img = document.querySelector(selector);
    if (img) {
      img.src = src;
      // Also update srcset if present to prevent Wix from overriding
      if (img.hasAttribute('srcset')) {
        img.removeAttribute('srcset');
      }
    }
  }

  function applyCms() {
    var data = getCmsData();
    if (!data) return;

    // Part 1: Hero
    if (data.hero) {
      setElementText('comp-lxriadds', data.hero.title, data.hero.titleColor);
      setElementText('comp-lxriaddt', data.hero.awardBadge, data.hero.awardBadgeColor);
      setElementText('comp-lwqgbmmr', data.hero.historyIntroText, data.hero.historyIntroTextColor);
      if (data.hero.heroImage) setImageSrc('img[alt="drop"]', data.hero.heroImage);
      if (data.hero.awardBadgeImage) setImageSrc('img[alt="aesthetics award winner 2025"]', data.hero.awardBadgeImage);
    }

    // Part 2: Trust Banner & Pillars
    if (data.trustBanner) {
      setElementText('comp-mlqmnjp2', data.trustBanner.recommendedHeading, data.trustBanner.recommendedHeadingColor);
      setElementText('comp-mlqmnjoy8', data.trustBanner.concernsText, data.trustBanner.concernsTextColor);

      if (Array.isArray(data.trustBanner.pillars)) {
        var p = data.trustBanner.pillars;
        if (p[0]) {
          setElementText('comp-mlqmnjpf3__item1', p[0].title, p[0].titleColor);
          setElementText('comp-mlqmnjpd8__item1', p[0].description, p[0].textColor);
        }
        if (p[1]) {
          setElementText('comp-mlqmnjpf3__item-j9ples3e', p[1].title, p[1].titleColor);
          setElementText('comp-mlqmnjpd8__item-j9ples3e', p[1].description, p[1].textColor);
        }
        if (p[2]) {
          setElementText('comp-mlqmnjpf3__item-j9plerjk', p[2].title, p[2].titleColor);
          setElementText('comp-mlqmnjpd8__item-j9plerjk', p[2].description, p[2].textColor);
        }
        if (p[3]) {
          setElementText('comp-mlqmnjpf3__item-mlqnbcvm', p[3].title, p[3].titleColor);
          setElementText('comp-mlqmnjpd8__item-mlqnbcvm', p[3].description, p[3].textColor);
        }
      }
    }

    // Part 3: Story & About
    if (data.story) {
      setElementText('comp-lwqg9o89', data.story.historyTitle, data.story.historyTitleColor);
      setElementText('comp-lwqgbmmr', data.story.historyBody, data.story.historyBodyColor);
      if (data.story.historyImage) setImageSrc('img[alt="obagi-nu-derm-fx-collection"]', data.story.historyImage);

      setElementText('comp-lwrl1yoo7', data.story.aboutTitle, data.story.aboutTitleColor);
      setElementText('comp-lwrl46my', data.story.aboutQuote, data.story.aboutQuoteColor);
      setElementText('comp-ml6km44m', data.story.aboutParagraph, data.story.aboutParagraphColor);
      if (data.story.aboutImage) setImageSrc('img[alt="Hydration-HydrateLuxe-DHD"]', data.story.aboutImage);
    }

    // Part 4: Research & Innovation
    if (data.research) {
      setElementText('comp-mlqlr0fr2', data.research.rdTitle, data.research.rdTitleColor);
      setElementText('comp-mlqlr0fq4', data.research.rdDescription, data.research.rdDescriptionColor);

      if (Array.isArray(data.research.tabs)) {
        var t = data.research.tabs;
        if (t[0]) {
          setElementText('comp-mlqlfcyy5__item1', t[0].title, t[0].titleColor);
          setElementText('comp-mlqlfcyu4__item1', t[0].description, t[0].textColor);
          if (t[0].imageUrl) setImageSrc('img[alt="genome-research-lab-tests_2560x.webp"]', t[0].imageUrl);
        }
        if (t[1]) {
          setElementText('comp-mlqlfcyy5__item-j9ples3e', t[1].title, t[1].titleColor);
          setElementText('comp-mlqlfcyu4__item-j9ples3e', t[1].description, t[1].textColor);
          if (t[1].imageUrl) setImageSrc('img[alt="scientist-pouring-red-liquid_2560x.webp"]', t[1].imageUrl);
        }
        if (t[2]) {
          setElementText('comp-mlqlfcyy5__item-j9plerjk', t[2].title, t[2].titleColor);
          setElementText('comp-mlqlfcyu4__item-j9plerjk', t[2].description, t[2].textColor);
          if (t[2].imageUrl) setImageSrc('img[alt="woman-scientist-doing-experiment_960x.webp"]', t[2].imageUrl);
        }
      }
    }

    // Part 5: Featured Collections / Systems
    if (data.products && Array.isArray(data.products.systems)) {
      var s = data.products.systems;
      if (s[0]) {
        setElementText('comp-lwsw0tdb__item1', s[0].title, s[0].titleColor);
        setElementText('comp-lwsw0tdg__item1', s[0].subtitle, s[0].subtitleColor);
        setElementText('comp-lwsw0tdh5__item1', s[0].description, s[0].textColor);
        if (s[0].imageUrl) setImageSrc('img[alt="obagi-nu-derm-fx-collection-1600x1600.jpg"]', s[0].imageUrl);
      }
      if (s[1]) {
        setElementText('comp-lwsw0tdb__item-j9ples3e', s[1].title, s[1].titleColor);
        setElementText('comp-lwsw0tdg__item-j9ples3e', s[1].subtitle, s[1].subtitleColor);
        setElementText('comp-lwsw0tdh5__item-j9ples3e', s[1].description, s[1].textColor);
        if (s[1].imageUrl) setImageSrc('img[alt="2022Q4WEBSHOOT_Hydrate_DHD_r2_PDPmacro_4400x4400_72dpi.jpg"]', s[1].imageUrl);
      }
      if (s[2]) {
        setElementText('comp-lwsw0tdb__item-j9plerjk', s[2].title, s[2].titleColor);
        setElementText('comp-lwsw0tdg__item-j9plerjk', s[2].subtitle, s[2].subtitleColor);
        setElementText('comp-lwsw0tdh5__item-j9plerjk', s[2].description, s[2].textColor);
        if (s[2].imageUrl) setImageSrc('img[alt="cohley_elastiderm-facial-serum_greta-berzonskiene_727612_RETOUCHED.jpg"]', s[2].imageUrl);
      }
    }

    // Part 6: Numbers & Key Statistics
    if (data.numbers) {
      setElementText('comp-lwt3cjw9', data.numbers.title, data.numbers.titleColor);
      if (Array.isArray(data.numbers.stats)) {
        var st = data.numbers.stats;
        if (st[0]) {
          setElementText('comp-lwsxjtsr', st[0].value, st[0].valueColor);
          setElementText('comp-lwt2rpul', st[0].label, st[0].labelColor);
        }
        if (st[1]) {
          setElementText('comp-lwt3ujks1', st[1].value, st[1].valueColor);
          setElementText('comp-lwt3v7cy', st[1].label, st[1].labelColor);
        }
        if (st[2]) {
          setElementText('comp-lwt68tab', st[2].value, st[2].valueColor);
          setElementText('comp-lwt68tae', st[2].label, st[2].labelColor);
        }
        if (st[3]) {
          setElementText('comp-lwt65rfv', st[3].value, st[3].valueColor);
          setElementText('comp-lwt65rfx12', st[3].label, st[3].labelColor);
        }
      }
    }

    // Part 7: Careers & Press
    if (data.careers) {
      setElementText('comp-lwxn7qhu8', data.careers.title, data.careers.titleColor);
      setElementText('comp-lwxn7qhx8', data.careers.subtitle, data.careers.subtitleColor);
      if (Array.isArray(data.careers.jobs)) {
        var j = data.careers.jobs;
        if (j[0]) {
          setElementText('comp-lwymoozg__item1', j[0].title, j[0].titleColor);
          setElementText('comp-lwyp526j__item1', j[0].location, j[0].locationColor);
        }
        if (j[1]) {
          setElementText('comp-lwymoozg__item-j9ples3e', j[1].title, j[1].titleColor);
          setElementText('comp-lwyp526j__item-j9ples3e', j[1].location, j[1].locationColor);
        }
        if (j[2]) {
          setElementText('comp-lwymoozg__item-j9plerjk', j[2].title, j[2].titleColor);
          setElementText('comp-lwyp526j__item-j9plerjk', j[2].location, j[2].locationColor);
        }
      }
    }
    if (data.press) {
      setElementText('comp-lwyy1hag1', data.press.title, data.press.titleColor);
      if (Array.isArray(data.press.items)) {
        var pr = data.press.items;
        if (pr[0]) {
          setElementText('comp-lwyz0399__item1', pr[0].headline, pr[0].headlineColor);
          setElementText('comp-lwyz039c18__item1', pr[0].source, pr[0].sourceColor);
        }
        if (pr[1]) {
          setElementText('comp-lwyz0399__item-j9ples3e', pr[1].headline, pr[1].headlineColor);
          setElementText('comp-lwyz039c18__item-j9ples3e', pr[1].source, pr[1].sourceColor);
        }
        if (pr[2]) {
          setElementText('comp-lwyz0399__item-j9plerjk', pr[2].headline, pr[2].headlineColor);
          setElementText('comp-lwyz039c18__item-j9plerjk', pr[2].source, pr[2].sourceColor);
        }
      }
    }

    // Part 8: Quote, Newsletter & Footer
    if (data.quote) {
      var quoteText = data.quote.author;
      if (data.quote.role) quoteText += '<br class="wixui-rich-text__text">' + data.quote.role;
      setElementText('comp-lwsx7nk7', quoteText, data.quote.authorColor);
      if (data.quote.image) setImageSrc('img[alt="nill"]', data.quote.image);
    }
    if (data.newsletter) {
      setElementText('comp-lx8nyczk6', data.newsletter.title, data.newsletter.titleColor);
      setElementText('comp-lx8nzrma', data.newsletter.subtitle, data.newsletter.subtitleColor);
    }
    if (data.footer) {
      setElementText('comp-ml6nay6u_r_comp-lx0hp721', data.footer.copyright, data.footer.copyrightColor);
    }
  }

  // Execute on DOM ready and after a short delay for dynamic hydration
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCms);
  } else {
    applyCms();
  }
  setTimeout(applyCms, 500);
  setTimeout(applyCms, 1500);
})();
