# OBAGI CONTACT MODAL FIX REPORT

**Task:** Fix ONLY the "Become a Distributor" button → contact modal flow (from `OPENCODE_FIX_DISTRIBUTOR_CONTACT_MODAL.md`).
**Scope lock:** No changes to unrelated homepage sections, their CSS, layout, images, cards, video, animations, or business logic.
**Date:** 2026-10-11 · **Verified on:** `http://localhost:3002` (Next dev, PID 26620)

---

## 1. ROOT CAUSE

The Wix archive's inline stylesheet contains:

```css
#c1dmp .c1dmp-container { pointer-events: none; }
```

Our injected homepage sections (`#partner-section`, `#enquiry-section`) sat inside that container, so they **inherited `pointer-events: none`** — clicks/pointer events passed through them and the CTA felt "dead" (root-cause test: `document.elementFromPoint()` at the CTA centre returned `null`). The popup `#obagi-distributor-popup` is injected before `</body>` (outside that container), so it was unaffected — but the surrounding flow had additional issues fixed in the same pass (see §2).

## 2. WHAT CHANGED

| File | Change |
|---|---|
| `src/lib/obagi-html-patcher.ts` | 1. Scoped fix: `#partner-section, #enquiry-section { pointer-events: auto !important; }` (does NOT touch Wix's `pointer-events: none`, which is required by other components). |
| | 2. `#enquiry-section { display: none !important; }` — contact panel is hidden by default (it opens only via the modal). |
| | 3. Inline validation-error + focus-ring CSS (static literals only — no template interpolation, `patcher:no-color-writes` still passes). |
| | 4. Mobile modal: panel `max-height: calc(100vh - 54px) !important` (was `none`) → panel fits viewport and scrolls internally (`overflow-y: auto` base style). |
| | 5. Both forms carry `novalidate` so our JS validation renders the styled inline errors. |
| `public/obagi-cms-sync.js` | 1. **`setEnquiryTypeSelect` fix:** skip empty (`value=""`) placeholder options — previously `'distributor partnership'.includes('')` matched the placeholder first, leaving Enquiry Type empty → required-validation blocked every submit silently (old success text stayed on screen, no POST fired). |
| | 2. Real form validation: `validateRequired` + `fieldErrorEl/setFieldError/clearFieldError` + `bindLiveValidation` (errors clear as you type). |
| | 3. Submit handlers: `preventDefault()`, disable button + `SUBMITTING...` while in flight, success → server-confirmed feedback + auto-close 1.8s + focus restore; failure → `Could not save your enquiry: …`, modal stays open, **all entered values preserved**. |
| | 4. Focus management: `popupTriggerEl` remembered on open; focus returns to the CTA on Escape / backdrop / close / auto-close. |

Nothing else was modified for this task. Pre-existing session files (CMS work) untouched by this task.

## 3. WHAT THE MODAL NOW DOES (verified)

- **Closed by default** on page load; opens **only** on a real click of the real `<button>BECOME A DISTRIBUTOR</button>` (keyboard accessible, `elementFromPoint` hit-test passes).
- `role="dialog"`, `aria-modal="true"`, focus moves to first field, background scroll locked.
- **Editable form:** name, designation, organization, city, state (select), enquiry type (select), message — no `disabled`/`readOnly`, Tab order works.
- **Real links:** `tel:+911234567890`, `mailto:info@ryandermaceutics.com`, Google Maps link.
- **Minimum secure backend:** `POST /api/enquiry` (field whitelist + sanitisation, 200-char… ≤2000-char caps, required-field server check) → saved to **Neon Postgres** (`enquiries` table; Blob + local JSON kept as live mirrors). Read via **PIN-protected** `GET /api/enquiry` (`x-cms-pin`, default `1234`).
- **Admin Panel → Home Page CMS → Enquiry Inbox** lists the saved enquiry (table, "11 entries loaded", row `Playwright Desktop User · distributor-popup · BUSINESS ENQUIRY`).

## 4. VERIFICATION RESULTS

### A. Task E2E test — `modal-verify.mjs` (real Chromium, real mouse clicks)

```
RESULT: PASS=46  FAIL=0  BLOCKED=0  TOTAL=46
```

| Area | Checks | Result |
|---|---|---|
| Desktop modal lifecycle (closed→click→open→close×4, focus, scroll-lock, aria) | 12 | ✅ |
| Fields editable + Tab + tel/mailto/maps links | 3 | ✅ |
| Empty-submit inline errors, values preserved | 1 | ✅ |
| Real POST → 200 `success:true`, `SUBMITTING...`, success feedback after confirm | 4 | ✅ |
| DB: persisted & listed via PIN GET (retry ≤20×1s — blob read-after-write lag ~7.5s) | 1 | ✅ |
| Failed submit: POST fired → simulated 500 → `Could not save your enquiry: Simulated DB failure`, values preserved, Enquiry Type auto-selected | 4 | ✅ |
| Console errors / failed requests (pre-existing noise filtered) | 2 | ✅ |
| Unrelated Wix sections still present | 1 | ✅ |
| Tablet 834×1112 + Mobile 390×844 (fits viewport, inputs visible, editable, links, close) | 16 | ✅ |
| Admin → Enquiry Inbox shows the new enquiry (async wait, no fixed timeouts) | 1 | ✅ |
| `pointer-events` root-cause hit-test (`elementFromPoint` → `SPAN` inside CTA) | 1 | ✅ |

### B. Regression gates

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | ✅ TSC_OK (clean) |
| `node scripts/verify-obagi-cms.mjs --live http://localhost:3002 --pin 1234` | ✅ **125 PASS, 0 FAIL** (incl. `sync:popup-open`, `sync:keeps-enquiry`, `patcher:partner-single-cta`, `patcher:has-popup`, `patcher:no-color-writes`, `patcher:no-bg-forcing`, `live:served-partner-kept`) |
| Task scope (git) | ✅ This task touched only `src/lib/obagi-html-patcher.ts`, `public/obagi-cms-sync.js`, this report |

### C. Browser evidence (screenshots, final 46/46 run)

| File | Shows |
|---|---|
| `.playwright-mcp/modal-desktop-open.png` | Desktop modal open |
| `.playwright-mcp/modal-desktop-success.png` | Server-confirmed success feedback |
| `.playwright-mcp/modal-desktop-failure.png` | Simulated 500 → error, values kept |
| `.playwright-mcp/modal-tablet-open.png` | Tablet fits viewport |
| `.playwright-mcp/modal-mobile-open.png` | Mobile: panel inside 390×844, close button visible, Enquiry Type = "Distributor Partnership" |
| `.playwright-mcp/admin-enquiry-inbox.png` | Inbox: "11 entries loaded" + `Playwright Desktop User` row (`distributor-popup`) |

## 5. FAILURES FOUND & FIXED DURING VERIFICATION (self-critique loop)

1. **Empty placeholder stole Enquiry Type** → `setEnquiryTypeSelect` now skips `value=""` options (`public/obagi-cms-sync.js`).
2. **Mobile panel overflow** (`bottom=901 > vh=844`) → `max-height: calc(100vh - 54px)` in the ≤899px media query.
3. **DB GET stale after POST** → measured blob read-after-write lag ≈ 7.5s; test now retries with backoff. API itself returns 200 (no rate limit in our code).
4. **Test harness bugs fixed** (not product): instant-scroll hit-test, console-error URL capture, admin flow uses `waitForFunction` (initial "0 entries loaded" state no longer matches), Wix noise filters.

## 6. PRE-EXISTING NOISE (not caused by this task, filtered in tests)

- `404` → `/Obagi India _ obagi products_files/v/4.19.1/WebSdk.lib.8e67814b.js` (archive references a directory that doesn't exist in `public/`).
- `429` → `https://sentry-next.wixpress.com/api/68/envelope/…` (Wix Sentry telemetry from the archived page).
- `chrome-extension://…/audio-devices.js` `ERR_UNKNOWN_URL_SCHEME` (loaded by the browser environment, not the page).
- `blob:https://www.obagiindia.com/...` "Not allowed to load local resource" (Wix archive blob references).

## 7. OPTIONAL CLEANUP (user decision — not done automatically)

`data/enquiries.json` / blob currently contains debug rows from verification runs: **`Canary`**, **`Blob Probe`**, **`Stale Probe …`**, plus two **`Playwright Desktop User`** rows. They prove the flow works but you may want to delete them before going live. **Note:** the production blob is shared with local dev — anything posted locally appears in the same store.

## 8. STATUS

| Item | Status |
|---|---|
| Code fixes | ✅ Done (scoped, design-locked) |
| E2E verification (desktop/tablet/mobile + DB + admin) | ✅ 46/46 |
| Regression (tsc + 125 CMS checks) | ✅ Clean |
| Report | ✅ This file |
| Deploy / git push | ⛔ Not performed (user-owned; forbidden by task rules) |
