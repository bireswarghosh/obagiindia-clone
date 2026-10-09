/**
 * Obagi India Dynamic CMS Synchronizer (Updated)
 * Synchronizes CMS edits across Header/Navbar, Hero (4 images), History, About,
 * Pillars, R&D, Featured Systems, Mobile Banner, Quotes, Numbers, Careers, Press, and Footer.
 */
(function () {
  function getCmsData() {
    try {
      var local = localStorage.getItem('obagi_home_cms');
      if (local) {
        var parsed = JSON.parse(local);
        if (parsed && (parsed.hero || parsed.header)) return parsed;
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
    var target = el.querySelector('p, h1, h2, h3, h4, span, blockquote') || el;
    if (text !== undefined && text !== null) {
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
      if (img.hasAttribute('srcset')) {
        img.removeAttribute('srcset');
      }
    }
  }

  function applyCms() {
    // 0. Remove any frozen vibe-annotations-root
    var vibe = document.getElementById('vibe-annotations-root');
    if (vibe) {
      vibe.remove();
    }

    // 1. Mobile Banner Image Visibility Fix for wow-image#comp-mlau0bjm_img > img
    var mobilePoster = document.getElementById('comp-mlau0bjm_img');
    if (mobilePoster) {
      mobilePoster.style.setProperty('opacity', '1', 'important');
      mobilePoster.style.setProperty('visibility', 'visible', 'important');
      mobilePoster.style.setProperty('display', 'block', 'important');
      var mImg = mobilePoster.querySelector('img');
      if (mImg) {
        mImg.style.setProperty('opacity', '1', 'important');
        mImg.style.setProperty('visibility', 'visible', 'important');
        mImg.style.setProperty('display', 'block', 'important');
        if (window.innerWidth <= 768) {
          mImg.style.setProperty('width', '100%', 'important');
          mImg.style.setProperty('max-width', '100%', 'important');
          mImg.style.setProperty('height', 'auto', 'important');
        }
      }
    }

    var data = getCmsData();
    if (!data) return;

    // Section 1: Header / Navbar
    if (data.header) {
      // Custom logo with background remover support
      if (data.header.logoUrl) {
        var logoContainer = document.querySelector('[data-testid="svgRoot-comp-lw3c3n7z_r_comp-lw3c38vb"]');
        if (logoContainer) {
          logoContainer.innerHTML = '<img src="' + data.header.logoUrl + '" alt="' + (data.header.logoAlt || 'Obagi Logo') + '" style="max-height: 44px; width: auto; object-fit: contain; display: block;" />';
        }
      }

      // Brought to you in India by SPECTRA
      if (data.header.broughtByText) {
        var allSpans = document.querySelectorAll('header span, header p, header div');
        for (var i = 0; i < allSpans.length; i++) {
          if (allSpans[i].innerText && allSpans[i].innerText.includes('Brought to you in India')) {
            allSpans[i].innerText = data.header.broughtByText;
            if (data.header.broughtByColor) allSpans[i].style.color = data.header.broughtByColor;
            break;
          }
        }
      }

      // Nav menu items
      var menuLabels = document.querySelectorAll('.wixui-horizontal-menu__item-label');
      menuLabels.forEach(function (lbl) {
        var txt = lbl.innerText.trim();
        if (txt.includes('Why Obagi') && data.header.whyObagiText) {
          lbl.innerText = data.header.whyObagiText;
          if (data.header.whyObagiColor) lbl.style.color = data.header.whyObagiColor;
        } else if (txt.includes('Skin Concern') && data.header.skinConcernTitle) {
          lbl.innerText = data.header.skinConcernTitle;
          if (data.header.skinConcernColor) lbl.style.color = data.header.skinConcernColor;
        } else if (txt.includes('Product Range') && data.header.productRangeTitle) {
          lbl.innerText = data.header.productRangeTitle;
          if (data.header.productRangeColor) lbl.style.color = data.header.productRangeColor;
        } else if (txt.includes('Find Obagi') && data.header.findObagiTitle) {
          lbl.innerText = data.header.findObagiTitle;
          if (data.header.findObagiColor) lbl.style.color = data.header.findObagiColor;
        }
      });
    }

    // Section 2: Hero Section (4 Images)
    if (data.hero) {
      setElementText('comp-lxriadds', data.hero.title, data.hero.titleColor);
      setElementText('comp-lxriaddt', data.hero.awardBadge, data.hero.awardBadgeColor);
      setElementText('comp-lwqgbmmr', data.hero.historyIntroText, data.hero.historyIntroTextColor);

      // Hero 4 Images
      if (data.hero.heroImage1) setImageSrc('img[alt="drop"]', data.hero.heroImage1);
      if (data.hero.heroImage2) setImageSrc('img[alt="aesthetics award winner 2025"]', data.hero.heroImage2);
      if (data.hero.heroImage3) setImageSrc('img[alt="obagi-nu-derm-fx-collection"]', data.hero.heroImage3);
      if (data.hero.heroImage4) {
        var topBannerImg = document.querySelector('section:first-of-type img');
        if (topBannerImg) topBannerImg.src = data.hero.heroImage4;
      }
    }

    // Section 4: History
    if (data.history) {
      setElementText('comp-lwqg9o89', data.history.title, data.history.titleColor);
      setElementText('comp-lwqgbmmr', data.history.body, data.history.bodyColor);
      if (data.history.image) setImageSrc('img[alt="obagi-nu-derm-fx-collection"]', data.history.image);
    }

    // Section 5: About Obagi Medical
    if (data.about) {
      setElementText('comp-lwrl1yoo7', data.about.title, data.about.titleColor);
      setElementText('comp-lwrl46my', data.about.quote, data.about.quoteColor);
      setElementText('comp-ml6km44m', data.about.paragraph, data.about.paragraphColor);
      if (data.about.image) setImageSrc('img[alt="Hydration-HydrateLuxe-DHD"]', data.about.image);
    }

    // Section 6: Trust Banner & 4 Core Pillars
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

    // Section 7: Research & Development
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

    // Section 8: Featured Collections / Systems
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

    // Section 9: Video / Banner
    if (data.videoBanner) {
      if (data.videoBanner.bannerImage) {
        setImageSrc('wow-image#comp-mlau0bjm_img > img', data.videoBanner.bannerImage);
      }
      if (data.videoBanner.videoUrl) {
        var v = document.getElementById('comp-mlau0bjm_video');
        if (v) v.src = data.videoBanner.videoUrl;
      }
    }

    // Section 10: Testimonial Quote & Executive
    if (data.quote) {
      var quoteText = data.quote.author;
      if (data.quote.role) quoteText += '<br class="wixui-rich-text__text">' + data.quote.role;
      setElementText('comp-lwsx7nk7', quoteText, data.quote.authorColor);
      if (data.quote.image) setImageSrc('img[alt="nill"]', data.quote.image);
    }

    // Section 11: Numbers & Key Statistics
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

    // Section 12: Careers
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

    // Section 13: Press
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

    // Section 14: Newsletter
    if (data.newsletter) {
      setElementText('comp-lx8nyczk6', data.newsletter.title, data.newsletter.titleColor);
      setElementText('comp-lx8nzrma', data.newsletter.subtitle, data.newsletter.subtitleColor);
    }

    // Section 15: Footer
    if (data.footer) {
      setElementText('comp-ml6nay6u_r_comp-lx0hp721', data.footer.copyright, data.footer.copyrightColor);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCms);
  } else {
    applyCms();
  }
  setTimeout(applyCms, 500);
  setTimeout(applyCms, 1500);
})();
