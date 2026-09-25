const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'Obagi India _ obagi products.html');
const bakFile = path.join(__dirname, 'Obagi India _ obagi products.html.bak');

// Read from clean backup if exists, or current
let content = fs.existsSync(bakFile) ? fs.readFileSync(bakFile, 'utf8') : fs.readFileSync(targetFile, 'utf8');

const gsapCode = fs.readFileSync(path.join(__dirname, 'gsap.min.js'), 'utf8');
const stCode = fs.readFileSync(path.join(__dirname, 'ScrollTrigger.min.js'), 'utf8');

const injection = `
<!-- =========================================================================
     OBAGI INDIA 1:1 INTERACTIVE GSAP + SCROLLTRIGGER OFFLINE BUNDLE
     ========================================================================= -->
<script>
(function() {
  // Prevent Wix RequireJS / AMD loader from intercepting GSAP & ScrollTrigger
  var _tempDefine = window.define;
  var _tempExports = window.exports;
  var _tempModule = window.module;
  window.define = undefined;
  window.exports = undefined;
  window.module = undefined;

  try {
    ${gsapCode}
  } catch(e) {
    console.error("GSAP load error:", e);
  }

  try {
    ${stCode}
  } catch(e) {
    console.error("ScrollTrigger load error:", e);
  }

  // Restore AMD / loader
  window.define = _tempDefine;
  window.exports = _tempExports;
  window.module = _tempModule;

  if (typeof window.ScrollTrigger === 'undefined' && typeof ScrollTrigger !== 'undefined') {
    window.ScrollTrigger = ScrollTrigger;
  }
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
})();
</script>

<style id="obagi-custom-interactive-styles">
  /* 1. Hero Morph Section */
  #comp-lwz2pnus, #comp-lwxgxhly {
    will-change: transform, clip-path, border-radius !important;
    transform-origin: center top !important;
  }

  /* 2. Middle Section: Sticky Pink Bubbles Circle Background */
  #comp-lwrmnb3j {
    position: sticky !important;
    top: 0 !important;
    z-index: 1 !important;
  }
  #comp-lwrlbohf {
    will-change: clip-path !important;
    clip-path: circle(18% at 50% 50%);
  }

  /* 3. Cards Section: 3D Perspective Flow with Distinct Spacing */
  #comp-lwrmnbmd {
    position: relative !important;
    z-index: 10 !important;
  }
  .comp-lwsw0td7-container {
    perspective: 1400px !important;
    perspective-origin: center top !important;
    row-gap: 160px !important;
    padding-bottom: 260px !important;
  }

  /* Each Card Wrapper: 3D perspective fold on X-axis & smooth vanish */
  [id^="comp-lwsw0td95__"] {
    position: relative !important;
    transform-origin: center top !important;
    transform-style: preserve-3d !important;
    will-change: transform, opacity !important;
    backface-visibility: hidden !important;
    transition: box-shadow 0.3s ease !important;
  }

  [id^="comp-lwsw0td95__"]:hover {
    box-shadow: 0 24px 50px -10px rgba(14, 34, 56, 0.12) !important;
  }

  @media (max-width: 900px) {
    .comp-lwsw0td7-container {
      row-gap: 110px !important;
      padding-bottom: 180px !important;
    }
  }
</style>

<script id="obagi-custom-interactive-script">
(function() {
  function initObagi() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) {
      setTimeout(initObagi, 50);
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Morph (Shrink & Circle towards top)
    var heroBox = document.querySelector('#comp-lwz2pnus') || document.querySelector('#comp-lwxgxhly');
    var heroSec = document.querySelector('#comp-kbgaghri');
    if (heroBox && heroSec) {
      var d = window.__OBAGI_DATA__;
      var enabled = !d || !d.hero || d.hero.morphEnabled !== false;
      var speed = (d && d.hero && d.hero.morphSpeed) || 1;
      if (enabled) {
        gsap.fromTo(heroBox,
          { clipPath: 'circle(75% at 50% 50%)' },
          {
            clipPath: 'circle(0% at 50% 12%)',
            ease: 'none',
            scrollTrigger: {
              trigger: heroSec,
              start: 'top top',
              end: 'bottom top',
              scrub: speed
            }
          }
        );
      }
    }

    // 2. Middle Section: Sticky Pink Bubbles Expanding Circle
    var pinkImg = document.querySelector('#comp-lwrlbohf');
    var cardSec = document.querySelector('#comp-lwrl9iel');
    if (pinkImg && cardSec) {
      gsap.fromTo(pinkImg,
        { clipPath: 'circle(18% at 50% 50%)' },
        {
          clipPath: 'circle(90% at 50% 50%)',
          ease: 'none',
          scrollTrigger: {
            trigger: cardSec,
            start: 'top 60%',
            end: 'bottom bottom',
            scrub: 1.2
          }
        }
      );
    }

    // 3. The 3 Cards 3D Fold & Smooth Vanish
    var cards = [
      document.querySelector('#comp-lwsw0td95__item1'),
      document.querySelector('#comp-lwsw0td95__item-j9ples3e'),
      document.querySelector('#comp-lwsw0td95__item-j9plerjk')
    ].filter(Boolean);

    cards.forEach(function(card, index) {
      gsap.fromTo(card,
        { rotateX: 0, scale: 1, opacity: 1 },
        {
          rotateX: 78,
          scale: 0.95,
          opacity: 0,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: card,
            start: 'top 130px',
            end: 'top -30px',
            scrub: 1
          }
        }
      );
    });

    ScrollTrigger.refresh();
    console.log('[OBAGI] Successfully loaded GSAP and initialized', ScrollTrigger.getAll().length, 'ScrollTriggers.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObagi);
  } else {
    initObagi();
  }
})();
</script>
`;

// Crucial: Use function replacer () => ... to prevent $& being interpreted as matched string!
content = content.replace('</body>', () => injection + '</body>');
fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully injected offline-bundled GSAP into Obagi India _ obagi products.html');
