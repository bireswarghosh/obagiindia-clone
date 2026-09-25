# Obagi India — Master Design Specification & Design Tokens (design.md)
*Generated directly via Chrome DevTools MCP extraction from https://www.obagiindia.com/*

---

## 1. Brand Overview & Theme Palette

### Core Color Tokens
| Token Name | Hex / RGB | CSS Variable / Usage |
| :--- | :--- | :--- |
| `--obagi-navy-primary` | `#21275c` / `rgb(33, 39, 92)` | Main brand accents, primary buttons, tagline titles |
| `--obagi-navy-deep` | `#0e2238` / `rgb(14, 34, 56)` | Section headers, contrast backgrounds |
| `--obagi-text-black` | `#000000` / `rgb(0, 0, 0)` | Primary body copy, heading titles |
| `--obagi-text-muted` | `#86868f` / `rgb(134, 134, 143)` | Numerical badges ("1", "2", "3"), small metadata |
| `--obagi-gold-accent` | `#b1843b` / `rgb(177, 132, 59)` | Product range accents, award subtitle text |
| `--obagi-white` | `#ffffff` / `rgb(255, 255, 255)` | Card backgrounds, sticky header, modal surfaces |
| `--obagi-bg-canvas` | `#f8f7f5` / `rgb(248, 247, 245)` | Universal canvas background tone |
| `--obagi-border-subtle` | `rgba(0, 0, 0, 0.08)` | Card borders, horizontal rules |
| `--obagi-card-shadow` | `0 16px 40px -12px rgba(0, 0, 0, 0.09)` | Card elevation shadow |

---

## 2. Typography Matrix

### Font Families
- **Primary Display & Headings:** `Apex New Book` / `Apex New Medium` (Fallback: `'Cinzel'`, serif or `'Plus Jakarta Sans'`, sans-serif)
  - Wix Internal: `wfont_4833d7_9f90101a45b34ec685d2ceded061777c, wf_9f90101a45b34ec685d2ceded, orig_apex_new_book`
- **Body & Subtitles:** `Apex New Medium` (Fallback: `'Plus Jakarta Sans'`, sans-serif)
  - Wix Internal: `wfont_4833d7_53f0d7f3291a4394a6710942aa17f067, wf_53f0d7f3291a4394a6710942a, orig_apex_new_medium`

### Typography Scale
- **H1 (Hero Brand Title):** `font-size: 90.92px`, `font-weight: 400`, `letter-spacing: -2.73px`, `color: #ffffff`
- **H2 (Section Headings):** `font-size: 45px`, `font-weight: 400`, `letter-spacing: -1.35px`, `color: #ffffff` / `#000000`
- **Hero Subtitle (Winner 2025):** `font-size: 32px`, `font-weight: 400`, `letter-spacing: -0.96px`, `color: #ffffff`
- **Quote Header (#1 Recommended):** `font-size: 45.5px`, `font-weight: 400`, `letter-spacing: -0.45px`, `color: #21275c`
- **Card Numerical Accent:** `font-size: 92px`, `font-weight: 400`, `color: #86868f`, `line-height: 1`
- **Card Product Name (A Tag):** `font-size: 32px`, `font-weight: 400`, `color: #000000`, `line-height: 1.2`
- **Card Subtitle (P Tag):** `font-size: 14px`, `font-weight: 500`, `color: #000000`, `margin-bottom: 8px`
- **Body Text:** `font-size: 14.8px`, `font-weight: 400`, `color: #000000`, `line-height: 1.6`

---

## 3. Layout Grid & Spacing Metrics

- **Max Viewport Width:** `1240px` (Cards and Content Container)
- **Header:** `height: 72px`, `position: sticky`, `top: 0`, `z-index: 1000`
- **Card Grid:** `grid-template-columns: 80px 1.4fr 340px` (Desktop), `1fr` (Mobile < 900px)
- **Card Padding:** `40px 48px` (Desktop), `24px 20px` (Mobile)
- **Card Gap in Flow:** `row-gap: 160px` (Desktop), `110px` (Mobile)
- **Cards Section Padding Bottom:** `260px` (Desktop)

---

## 4. Interactive Animation Specification & Keyframe Timelines

### Animation 1: Hero Video / Image Scroll Morph
- **Trigger Element:** `#comp-kbgaghri`
- **Target Elements:** `#comp-lwz2pnus`, `#comp-lwxgxhly`
- **ScrollTrigger Mode:** `scrub: 1`, `start: "top top"`, `end: "bottom top"`
- **Start State (scrollY = 0):**
  - `clip-path: circle(75% at 50% 50%)`
  - `transform: none`
  - `opacity: 1`
- **End State (scrollY >= 400px - 600px):**
  - `clip-path: circle(0% at 50% 12%)`
  - `transform-origin: center top`
  - `opacity: 0`
- **Text Sync:** `#comp-lxriaddq` opacity fades from `1` to `0` over first 50% of the scrub.

---

### Animation 2: Middle Sticky Pink Serum Bubbles Expanding Circle
- **Trigger Element:** `#comp-lwrl9iel` (Section containing the 3 cards)
- **Sticky Background Element:** `#comp-lwrmnb3j` (`position: sticky`, `top: 0`, `z-index: 1`)
- **Animated Image Element:** `#comp-lwrlbohf`
- **ScrollTrigger Mode:** `scrub: 1.2`, `start: "top 60%"`, `end: "bottom bottom"`
- **Start State:**
  - `clip-path: circle(18% at 50% 50%)`
- **End State:**
  - `clip-path: circle(90% at 50% 50%)`
- **Effect:** The circular microscopic serum droplet smoothly expands to full screen as the user scrolls through the 3 cards.

---

### Animation 3: 3D Perspective Sticky Folding Cards Stack
- **Viewport Container:** `.comp-lwsw0td7-container`
  - `perspective: 1400px`
  - `perspective-origin: center top`
- **Individual Cards:**
  - Card 1: `#comp-lwsw0td95__item1`
  - Card 2: `#comp-lwsw0td95__item-j9ples3e`
  - Card 3: `#comp-lwsw0td95__item-j9plerjk`
- **Transformation Origin:** `transform-origin: center top`
- **Transformation Style:** `transform-style: preserve-3d`, `backface-visibility: hidden`
- **ScrollTrigger Motion per Card:**
  - **Start:** `top: 130px` from viewport top.
  - **End:** `top: -30px`
  - **Transform:** `rotateX: 78deg`, `scale: 0.95`, `opacity: 0`
  - **Easing:** `power1.inOut`
- **Exit Logic:**
  - Card 1 folds and vanishes as Card 2 arrives.
  - Card 2 folds and vanishes as Card 3 arrives.
  - Card 3 completes its fold and smoothly vanishes at the exact same vanishing point, revealing the Newsletter section below.

---

## 5. Offline Inlined Code Implementation (GSAP + ScrollTrigger)

To run without external internet dependencies and avoid RequireJS/AMD interception:

```javascript
(function() {
  // 1. Temporarily neutralize Wix RequireJS/AMD
  var _tempDefine = window.define;
  var _tempExports = window.exports;
  var _tempModule = window.module;
  window.define = undefined;
  window.exports = undefined;
  window.module = undefined;

  // 2. Load GSAP 3.12.5 & ScrollTrigger offline bundle
  // (Injected in Obagi India _ obagi products.html)

  // 3. Restore AMD
  window.define = _tempDefine;
  window.exports = _tempExports;
  window.module = _tempModule;

  // 4. Register Plugin
  if (typeof window.ScrollTrigger === 'undefined' && typeof ScrollTrigger !== 'undefined') {
    window.ScrollTrigger = ScrollTrigger;
  }
  if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }
})();
```
