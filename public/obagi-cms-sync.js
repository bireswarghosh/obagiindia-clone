/**
 * Obagi India — public-page interactivity ONLY.
 *
 * DESIGN LOCK / NO-FLASH CONTRACT:
 * - All CMS content is painted on the SERVER (src/app/route.ts +
 *   obagi-html-patcher.ts) before first paint.
 * - This script intentionally contains ZERO CMS-apply logic: no fetching,
 *   no localStorage reads, no setText/setImg/setBg, no MutationObserver.
 *   It can never overwrite server-rendered content with stale defaults.
 * - Preserved behaviors only: brand-pillars auto-carousel + Partner→Enquiry flow
 *   + nav hide-on-scroll + Wix chat force-close + Ryan site-search overlay.
 */
(function () {
  'use strict';

  // ── Auto-Carousel for Brand Pillars (comp-mlqmnjp410 / comp-mlqmnjp310) ────
  var carouselTimer = null;
  var isCarouselPaused = false;

  function initPillarsCarousel(intervalMs) {
    var interval = intervalMs || 3800;
    var container = document.getElementById('comp-mlqmnjp410') || document.getElementById('comp-mlqmnjp310');
    if (!container) return;

    var slides = container.querySelectorAll('.comp-mlqmnjp99-container > .p9hNc1');
    if (!slides || slides.length <= 1) return;

    if (!container.dataset.carouselBound) {
      container.dataset.carouselBound = 'true';
      container.addEventListener('mouseenter', function() { isCarouselPaused = true; });
      container.addEventListener('mouseleave', function() { isCarouselPaused = false; });
      container.addEventListener('touchstart', function() { isCarouselPaused = true; }, { passive: true });
      container.addEventListener('touchend', function() { isCarouselPaused = false; });
    }

    if (carouselTimer) clearInterval(carouselTimer);

    var currentIdx = 0;
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('xjQkF3') || slides[i].classList.contains('fABPvj')) {
        currentIdx = i;
        break;
      }
    }

    carouselTimer = setInterval(function() {
      if (isCarouselPaused) return;
      if (!document.body.contains(slides[currentIdx])) return;
      slides[currentIdx].classList.remove('xjQkF3', 'fABPvj');
      currentIdx = (currentIdx + 1) % slides.length;
      slides[currentIdx].classList.add('xjQkF3', 'fABPvj');
    }, interval);
  }

  // ── Interactivity: Partner -> Enquiry Form + Distributor Popup ──────────
  function setEnquiryTypeSelect(selectId, enquiryType) {
    var select = document.getElementById(selectId);
    if (!select || !enquiryType) return;
    var wanted = enquiryType.toLowerCase();
    for (var i = 0; i < select.options.length; i++) {
      var val = select.options[i].value;
      if (!val) continue; // never match the empty placeholder option
      var lv = val.toLowerCase();
      if (lv.indexOf(wanted) !== -1 || wanted.indexOf(lv) !== -1) {
        select.selectedIndex = i;
        return;
      }
    }
  }

  var popupTriggerEl = null;

  function openDistributorPopup(enquiryType) {
    var popup = document.getElementById('obagi-distributor-popup');
    if (!popup) return;
    var wasOpen = getComputedStyle(popup).display !== 'none';
    if (!wasOpen) {
      // Remember the real trigger so focus can return to it on close.
      var ae = document.activeElement;
      if (ae && (ae.tagName === 'BUTTON' || ae.tagName === 'A') && ae !== document.body) {
        popupTriggerEl = ae;
      } else {
        popupTriggerEl = document.getElementById('obagi-become-distributor-btn');
      }
    }
    setEnquiryTypeSelect('dp-enquiry-type', enquiryType || 'Distributor Partnership');
    var panel = document.getElementById('obagi-distributor-popup-panel');
    if (panel) panel.scrollTop = 0;
    popup.style.setProperty('display', 'flex', 'important');
    popup.style.setProperty('visibility', 'visible', 'important');
    popup.style.setProperty('opacity', '1', 'important');
    document.body.style.overflow = 'hidden';
    var first = document.getElementById('dp-name');
    if (first) setTimeout(function() { first.focus(); }, 120);
  }

  function closeDistributorPopup() {
    var popup = document.getElementById('obagi-distributor-popup');
    if (!popup) return;
    if (getComputedStyle(popup).display === 'none') return;
    popup.style.setProperty('display', 'none', 'important');
    document.body.style.overflow = '';
    var trigger = popupTriggerEl;
    popupTriggerEl = null;
    if (trigger && typeof trigger.focus === 'function' && document.contains(trigger)) {
      trigger.focus();
    }
  }

  // Expose popup functions globally so inline button handlers work immediately
  window.openDistributorPopup = openDistributorPopup;
  window.closeDistributorPopup = closeDistributorPopup;
  window.obagiOpenDistributorPopup = openDistributorPopup;
  window.obagiCloseDistributorPopup = closeDistributorPopup;

  function showFeedback(id, ok, message) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'block';
    el.style.background = ok ? '#dcfce7' : '#fef2f2';
    el.style.color = ok ? '#15803d' : '#b91c1c';
    el.style.border = ok ? '1px solid #bbf7d0' : '1px solid #fecaca';
    el.innerText = message;
  }

  // ── Inline required-field validation (clear errors, never lose values) ──
  function fieldErrorEl(field) {
    var id = (field.id || field.name || 'field') + '-error';
    return document.getElementById(id);
  }

  function setFieldError(field, message) {
    field.classList.add('obagi-field-error-active');
    field.setAttribute('aria-invalid', 'true');
    var err = fieldErrorEl(field);
    if (!err) {
      err = document.createElement('div');
      err.className = 'obagi-field-error';
      err.id = (field.id || field.name || 'field') + '-error';
      err.setAttribute('role', 'alert');
      field.parentNode.insertBefore(err, field.nextSibling);
    }
    err.innerText = message;
  }

  function clearFieldError(field) {
    field.classList.remove('obagi-field-error-active');
    field.removeAttribute('aria-invalid');
    var err = fieldErrorEl(field);
    if (err && err.parentNode) err.parentNode.removeChild(err);
  }

  function fieldLabelText(field) {
    var wrap = field.parentNode;
    var label = wrap ? wrap.querySelector('label') : null;
    if (!label) return field.name || 'This field';
    return (label.innerText || '').replace(/\*/g, '').trim();
  }

  function validateRequired(form) {
    var invalid = null;
    var fields = form.querySelectorAll('[required]');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var v = (f.value || '').trim();
      if (!v) {
        setFieldError(f, fieldLabelText(f) + ' is required.');
        if (!invalid) invalid = f;
      } else {
        clearFieldError(f);
      }
    }
    if (invalid) {
      invalid.focus();
      return false;
    }
    return true;
  }

  function bindLiveValidation(form) {
    if (!form || form.dataset.validationBound) return;
    form.dataset.validationBound = 'true';
    var fields = form.querySelectorAll('[required]');
    for (var i = 0; i < fields.length; i++) {
      (function(f) {
        var handler = function() {
          if ((f.value || '').trim()) clearFieldError(f);
        };
        f.addEventListener('input', handler);
        f.addEventListener('change', handler);
      })(fields[i]);
    }
  }

  async function postEnquiry(data) {
    var res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    var json = {};
    try { json = await res.json(); } catch (_) { json = {}; }
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Save failed');
    }
    return json;
  }

  function initPartnerEnquiryInteractivity() {
    function handleGlobalClick(e) {
      var popupTrigger = e.target && e.target.closest ? e.target.closest('[data-open-distributor-popup], #obagi-become-distributor-btn') : null;
      if (popupTrigger) {
        e.preventDefault();
        e.stopPropagation();
        openDistributorPopup('Distributor Partnership');
        return;
      }

      var closeBtn = e.target && e.target.closest ? e.target.closest('#obagi-popup-close') : null;
      if (closeBtn) {
        e.preventDefault();
        e.stopPropagation();
        closeDistributorPopup();
        return;
      }

      var overlay = (e.target && e.target.id === 'obagi-distributor-popup') ? e.target : null;
      if (overlay) {
        e.preventDefault();
        closeDistributorPopup();
        return;
      }

      var target = e.target && e.target.closest ? e.target.closest('[data-open-enquiry], .obagi-action-card, .obagi-btn-secondary') : null;
      if (!target) return;
      if (target.hasAttribute('data-open-distributor-popup') || target.id === 'obagi-become-distributor-btn') return;

      var enquiryType = target.getAttribute('data-open-enquiry') || 'Distributor Partnership';
      var popup = document.getElementById('obagi-distributor-popup');
      if (popup) {
        e.preventDefault();
        openDistributorPopup(enquiryType);
        return;
      }

      setEnquiryTypeSelect('enquiry-type-select', enquiryType);
      var formSec = document.getElementById('enquiry-section');
      if (formSec) {
        e.preventDefault();
        formSec.scrollIntoView({ behavior: 'smooth', block: 'start' });

        var card = document.getElementById('enquiry-card-container');
        if (card) {
          card.style.boxShadow = '0 0 0 4px rgba(0, 118, 138, 0.35), 0 16px 36px rgba(0,0,0,0.1)';
          setTimeout(function() {
            card.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)';
          }, 1800);
        }

        var firstInput = formSec.querySelector('input[name="name"]');
        if (firstInput) {
          setTimeout(function() { firstInput.focus(); }, 600);
        }
      }
    }

    // Capture listeners run before framework scripts can call stopPropagation
    window.addEventListener('click', handleGlobalClick, true);
    document.addEventListener('click', handleGlobalClick, true);
    document.addEventListener('click', handleGlobalClick, false);

    // Direct bindings
    var btn = document.getElementById('obagi-become-distributor-btn');
    if (btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        openDistributorPopup('Distributor Partnership');
      };
    }
    var closeBtn = document.getElementById('obagi-popup-close');
    if (closeBtn) {
      closeBtn.onclick = function(e) {
        e.preventDefault();
        closeDistributorPopup();
      };
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeDistributorPopup();
    });

    // Inline enquiry form — success ONLY after API confirms DB save.
    var form = document.getElementById('enquiry-form');
    if (form && !form.dataset.submitBound) {
      form.dataset.submitBound = 'true';
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateRequired(form)) return;
        var submitBtn = document.getElementById('enquiry-submit-btn');

        var formData = new FormData(form);
        var data = {};
        formData.forEach(function(v, k) { data[k] = v; });
        data.source = 'inline-form';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Submitting...';
        }

        postEnquiry(data)
          .then(function() {
            showFeedback('enquiry-feedback', true, 'Thank you! Your enquiry has been saved. Our team will contact you shortly.');
            form.reset();
          })
          .catch(function(err) {
            showFeedback('enquiry-feedback', false, 'Could not save your enquiry: ' + (err && err.message ? err.message : 'Please try again.'));
          })
          .finally(function() {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<span>SUBMIT ENQUIRY</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            }
          });
      });
      bindLiveValidation(form);
    }

    // Distributor popup form — success ONLY after API confirms DB save.
    var popupForm = document.getElementById('distributor-popup-form');
    if (popupForm && !popupForm.dataset.submitBound) {
      popupForm.dataset.submitBound = 'true';
      popupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateRequired(popupForm)) return;
        var submitBtn = document.getElementById('distributor-popup-submit');

        var formData = new FormData(popupForm);
        var data = {};
        formData.forEach(function(v, k) { data[k] = v; });
        data.source = 'distributor-popup';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Submitting...';
        }

        postEnquiry(data)
          .then(function() {
            showFeedback('distributor-popup-feedback', true, 'Thank you! Your enquiry has been saved. Our partnership team will contact you shortly.');
            popupForm.reset();
            setEnquiryTypeSelect('dp-enquiry-type', 'Distributor Partnership');
            setTimeout(closeDistributorPopup, 1800);
          })
          .catch(function(err) {
            showFeedback('distributor-popup-feedback', false, 'Could not save your enquiry: ' + (err && err.message ? err.message : 'Please try again.'));
          })
          .finally(function() {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<span>SUBMIT ENQUIRY</span> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            }
          });
      });
      bindLiveValidation(popupForm);
    }
  }

  // ── Navbar: hide when scrolling down, show when scrolling up ─────────────
  function initNavHideOnScroll() {
    var header = document.getElementById('comp-lw3c3n7z-pinned-layer') ||
      document.getElementById('comp-lw3c3n7z');
    if (!header || header.dataset.navScrollBound) return;
    header.dataset.navScrollBound = 'true';
    var lastY = window.scrollY || document.documentElement.scrollTop || 0;
    var hidden = false;
    var setHidden = function(next) {
      if (next === hidden) return;
      hidden = next;
      if (hidden) {
        header.classList.add('obagi-nav-hidden');
      } else {
        header.classList.remove('obagi-nav-hidden');
      }
    };
    var onScroll = function() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > lastY + 4 && y > 90) setHidden(true);
      else if (y < lastY - 4 || y <= 90) setHidden(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    // rAF poll fallback (Wix sometimes swallows synthetic scroll events)
    var poll = function() {
      onScroll();
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  }

  // ── Wix chat "Need Help?" popup — force-close (archive JS close is broken)
  function closeWixChatPanels(root) {
    var scope = root || document;
    var panels = scope.querySelectorAll
      ? scope.querySelectorAll('.clickOutside854, [class*="ChatPopup"], [id*="chat"] [class*="open"]')
      : [];
    var closed = false;
    for (var i = 0; i < panels.length; i++) {
      var p = panels[i];
      if (getComputedStyle(p).display !== 'none') {
        p.style.setProperty('display', 'none', 'important');
        closed = true;
      }
      var pop = p.parentElement;
      if (pop && (pop.id || '').indexOf('popover_') === 0) {
        pop.style.setProperty('display', 'none', 'important');
      }
    }
    return closed;
  }

  function initChatPopupClose() {
    document.addEventListener('click', function(e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var closeBtn = t.closest(
        '[aria-label="Close notification"], [aria-label="Close chat"], .s__0Mgxoe, [class*="closeButton"], [class*="CloseButton"]'
      );
      if (closeBtn) {
        var panel = closeBtn.closest('.clickOutside854, [class*="popover"], [class*="Popover"]');
        if (panel) {
          panel.style.setProperty('display', 'none', 'important');
          var host = panel.parentElement;
          if (host && (host.id || '').indexOf('popover_') === 0) {
            host.style.setProperty('display', 'none', 'important');
          }
          e.stopPropagation();
        }
        return;
      }
      // Click outside the chat panel should also dismiss it.
      var chatPanel = t.closest('.clickOutside854');
      if (!chatPanel && document.querySelector('.clickOutside854')) {
        var openPanel = document.querySelector('.clickOutside854');
        if (openPanel && getComputedStyle(openPanel).display !== 'none' &&
            !t.closest('[id*="chat"], [class*="Chat"], [class*="bubble"], [class*="Bubble"]')) {
          // Only force-close the expanded notification panel, not the launcher bubble.
          if (openPanel.getBoundingClientRect().height > 80) {
            closeWixChatPanels();
          }
        }
      }
    }, true);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeWixChatPanels();
    });
  }

  // ── Ryan site search (trigger + overlay injected by patcher §1d) ──────
  // Reads #ryan-search-index JSON, filters client-side, groups results.
  // No fetching, no CMS writes — pure interactivity.
  var SEARCH_GROUPS = [
    ['product', 'Products'],
    ['guide', 'Therapeutic Guides'],
    ['insight', 'Clinical Insights'],
    ['library', 'Reference Library'],
    ['page', 'Pages']
  ];

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getSearchIndex() {
    try {
      var el = document.getElementById('ryan-search-index');
      if (!el) return [];
      var data = JSON.parse(el.textContent || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) { return []; }
  }

  function renderSearchResults(query) {
    var box = document.getElementById('ryan-search-results');
    if (!box) return;
    var q = (query || '').trim().toLowerCase();
    if (q.length < 2) {
      box.innerHTML = '<div class="ryan-search-hint">Type at least 2 characters to search products, guides, insights &amp; library.</div>';
      return;
    }
    var index = getSearchIndex();
    var words = q.split(/\s+/);
    var hits = [];
    for (var i = 0; i < index.length; i++) {
      var e = index[i];
      var hay = ((e.title || '') + ' ' + (e.keys || '')).toLowerCase();
      var ok = true;
      for (var w = 0; w < words.length; w++) {
        if (hay.indexOf(words[w]) === -1) { ok = false; break; }
      }
      if (ok) hits.push(e);
      if (hits.length >= 40) break;
    }
    if (!hits.length) {
      box.innerHTML = '<div class="ryan-search-empty">No matches for &ldquo;' + escHtml(query.trim()) +
        '&rdquo;. Try a product, ingredient or condition.</div>';
      return;
    }
    var html = '';
    for (var g = 0; g < SEARCH_GROUPS.length; g++) {
      var type = SEARCH_GROUPS[g][0], label = SEARCH_GROUPS[g][1];
      var items = [];
      for (var k = 0; k < hits.length; k++) {
        if (hits[k].t === type) items.push(hits[k]);
        if (items.length >= 8) break;
      }
      if (!items.length) continue;
      html += '<div class="ryan-search-group-label">' + label + '</div>';
      for (var j = 0; j < items.length; j++) {
        html += '<a class="ryan-search-item" href="' + escHtml(items[j].url) + '">' +
          '<span class="ryan-search-item-title">' + escHtml(items[j].title) + '</span>' +
          '<span class="ryan-search-item-sub">' + escHtml(items[j].sub || '') + '</span></a>';
      }
    }
    box.innerHTML = html;
  }

  function openRyanSearch() {
    var overlay = document.getElementById('ryan-search-overlay');
    var input = document.getElementById('ryan-search-input');
    if (!overlay || !input) return;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('ryan-search-open');
    input.value = '';
    renderSearchResults('');
    setTimeout(function() { input.focus(); }, 30);
  }

  function closeRyanSearch() {
    var overlay = document.getElementById('ryan-search-overlay');
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    document.body.classList.remove('ryan-search-open');
  }

  function initRyanSearch() {
    var input = document.getElementById('ryan-search-input');
    // Both trigger copies (desktop-in-nav + mobile slot) open the overlay.
    var triggers = document.querySelectorAll('#ryan-search-trigger, #ryan-search-trigger-mobile');
    if (!triggers.length) return;
    for (var i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener('click', function(e) {
        e.preventDefault();
        openRyanSearch();
      });
    }
    // Delegated opener for repurposed buttons (e.g. hamburger → search).
    document.addEventListener('click', function(e) {
      var t = e.target;
      if (t && t.closest && t.closest('[data-ryan-search-open]')) {
        e.preventDefault();
        openRyanSearch();
      }
    });
    document.addEventListener('click', function(e) {
      var t = e.target;
      if (t && t.closest && t.closest('[data-ryan-search-close]')) closeRyanSearch();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeRyanSearch();
    });
    if (input) {
      input.addEventListener('input', function() { renderSearchResults(input.value); });
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var q = input.value.trim();
          if (q) window.location.href = '/products?q=' + encodeURIComponent(q);
        }
      });
    }
  }

  // ── Ryan Chat with AI (popup injected by patcher §13d) ──────────────
  var RYAN_CHAT_GREETING = 'Hello! I am the Ryan Dermaceutics Clinical Assistant. Ask me about our formulations, therapeutic guides or product monographs.';

  function ryanChatTopLinks(query, n) {
    var out = [];
    try {
      var el = document.getElementById('ryan-search-index');
      if (!el) return out;
      var index = JSON.parse(el.textContent || '[]');
      var words = query.trim().toLowerCase().split(/\s+/);
      for (var i = 0; i < index.length && out.length < (n || 3); i++) {
        var hay = ((index[i].title || '') + ' ' + (index[i].keys || '')).toLowerCase();
        var ok = true;
        for (var w = 0; w < words.length; w++) {
          if (hay.indexOf(words[w]) === -1) { ok = false; break; }
        }
        if (ok) out.push(index[i]);
      }
    } catch (e) {}
    return out;
  }

  function ryanChatReplyText(q) {
    var t = q.toLowerCase();
    if (/^(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/.test(t) && t.length < 24) {
      return 'Hello! Ask me about acne, hair fall, antifungals, allergy care, corticosteroids or any Ryan formulation.';
    }
    if (t.indexOf('pigment') !== -1 || t.indexOf('melasma') !== -1 || t.indexOf('dark spot') !== -1 || t.indexOf('dark ') !== -1) {
      return 'For hyperpigmentation and uneven tone, Ryan Dermaceutics offers specialized topical depigmenting and exfoliation formulations designed to restore barrier integrity. See the closest matches below.';
    }
    if (t.indexOf('hair') !== -1 || t.indexOf('alopecia') !== -1 || t.indexOf('minoxidil') !== -1 || t.indexOf('tressicle') !== -1 || t.indexOf('bald') !== -1) {
      return 'For hair loss and androgenetic alopecia, our TRESSICLE portfolio includes TRESSICLE 5 (Minoxidil 5% Solution), TRESSICLE FORTE (Minoxidil 5% + Finasteride 0.1%) and oral TRESSICLE tablets.';
    }
    if (t.indexOf('steroid') !== -1 || t.indexOf('corticosteroid') !== -1 || t.indexOf('tenorium') !== -1 || t.indexOf('momerium') !== -1 || t.indexOf('psoriasis') !== -1 || t.indexOf('eczema') !== -1) {
      return 'We provide a structured corticosteroid potency ladder — TENORIUM (Clobetasol Propionate), MOMERIUM (Mometasone Furoate), FLUTIRIUM (Fluticasone Propionate) — plus steroid-sparing ROLITAS (Tacrolimus).';
    }
    if (t.indexOf('allerg') !== -1 || t.indexOf('pruritus') !== -1 || t.indexOf('itch') !== -1 || t.indexOf('urticaria') !== -1 || t.indexOf('blismin') !== -1 || t.indexOf('hivozin') !== -1) {
      return 'For acute and chronic pruritus and urticaria, our second-generation non-sedating H1 antihistamines include BLISMIN 20 (Bilastine 20 mg), BLISMIN M and HIVOZIN 5 (Levocetirizine 5 mg).';
    }
    if (t.indexOf('acne') !== -1 || t.indexOf('pimple') !== -1 || t.indexOf('isotretinoin') !== -1) {
      return 'Our acne portfolio combines targeted topicals (benzoyl peroxide, adapalene, clindamycin) with systemic options aligned to global dermatology guidelines.';
    }
    if (t.indexOf('fungal') !== -1 || t.indexOf('fungus') !== -1 || t.indexOf('keto') !== -1 || t.indexOf('itraconazole') !== -1 || t.indexOf('dandruff') !== -1 || t.indexOf('kefin') !== -1 || t.indexOf('itfin') !== -1) {
      return 'For fungal infections and scalp care, explore KEFIN (Ketoconazole) topicals and ITFIN (Itraconazole) oral capsules — full 19-section monographs included.';
    }
    if (t.indexOf('bacterial') !== -1 || t.indexOf('mupirocin') !== -1 || t.indexOf('doxy') !== -1) {
      return 'Our antibacterial range includes CINIMUP (Mupirocin 2%) and LIXOCLIN-LB (Doxycycline + Lactic Acid Bacillus).';
    }
    if (t.indexOf('guide') !== -1 || t.indexOf('insight') !== -1 || t.indexOf('library') !== -1 || t.indexOf('learn') !== -1) {
      return 'Our Therapeutic Resources hub has topic guides, clinical insights and a dermatology reference library. Closest matches:';
    }
    if (t.indexOf('contact') !== -1 || t.indexOf('doctor') !== -1 || t.indexOf('prescrib') !== -1) {
      return 'For Doctors: prescribing-information cards, the reference library and medical-information support are one click away. Closest matches:';
    }
    return 'Ryan Dermaceutics formulations are physician-prescribed dermatological treatments made under strict WHO-GMP standards. Here is what matches your question — or try the site search for everything:';
  }

  function ryanChatAddMsg(sender, html) {
    var box = document.getElementById('ryan-chat-messages');
    if (!box) return null;
    var row = document.createElement('div');
    row.className = sender === 'user' ? 'ryan-chat-msg-user' : 'ryan-chat-msg-ai';
    var b = document.createElement('div');
    b.className = 'ryan-chat-bubble';
    if (sender === 'user') b.textContent = html;
    else b.innerHTML = html;
    row.appendChild(b);
    box.appendChild(row);
    box.scrollTop = box.scrollHeight;
    return row;
  }

  function ryanChatSend(text) {
    var q = (text || '').trim();
    if (!q) return;
    ryanChatAddMsg('user', q);
    var typing = ryanChatAddMsg('ai', '<span class="ryan-chat-typing">Typing…</span>');
    setTimeout(function() {
      if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
      var links = ryanChatTopLinks(q, 3);
      var html = escHtml(ryanChatReplyText(q));
      if (links.length) {
        html += '<div class="ryan-chat-links">';
        for (var i = 0; i < links.length; i++) {
          html += '<a href="' + escHtml(links[i].url) + '">→ ' + escHtml(links[i].title) + '</a>';
        }
        html += '</div>';
      }
      ryanChatAddMsg('ai', html);
    }, 450);
  }

  function initRyanChat() {
    var root = document.getElementById('ryan-chat-root');
    var trigger = document.getElementById('ryan-chat-trigger');
    var panel = document.getElementById('ryan-chat-panel');
    var form = document.getElementById('ryan-chat-form');
    var input = document.getElementById('ryan-chat-input');
    if (!root || !trigger || !panel) return;
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var opening = panel.hidden;
      panel.hidden = !opening;
      trigger.style.display = opening ? 'none' : '';
      if (opening) {
        var box = document.getElementById('ryan-chat-messages');
        if (box && !box.hasChildNodes()) ryanChatAddMsg('ai', escHtml(RYAN_CHAT_GREETING));
        if (input) setTimeout(function() { input.focus(); }, 30);
      }
    });
    document.addEventListener('click', function(e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('[data-ryan-chat-close]')) {
        panel.hidden = true;
        trigger.style.display = '';
      }
      var chip = t.closest('[data-ryan-chat-chip]');
      if (chip && panel && !panel.hidden) {
        if (input) input.value = chip.getAttribute('data-ryan-chat-chip') || '';
        ryanChatSend(input ? input.value : '');
        if (input) input.value = '';
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        trigger.style.display = '';
      }
    });
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input) {
          ryanChatSend(input.value);
          input.value = '';
        }
      });
    }
  }

  // ── Ryan mobile hamburger menu (vanilla replacement for the Wix
  // Thunderbolt menu runtime, neutered server-side in patcher §15).
  // Overlay starts closed (data-visible="false"); toggle is explicit
  // inline display so it never depends on Wix-injected stylesheets.
  function initMobileMenu() {
    var openWrap = document.getElementById('comp-lw3c3n7z_r_comp-m8mvebvo');
    var overlay = document.getElementById('comp-lw3c3n7z_r_comp-m8mvebwf');
    var closeWrap = document.getElementById('comp-lw3c3n7z_r_comp-m8mvebwp');
    if (!openWrap || !overlay) return;
    var closeTimer = null;
    if (overlay.getAttribute('data-visible') !== 'true') {
      overlay.style.display = 'none';
    }
    function setOpen(open) {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      if (open) {
        overlay.style.display = 'block';
        // Next frame so the slide-in transition can run.
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            document.body.classList.add('obagi-menu-open');
          });
        });
      } else {
        document.body.classList.remove('obagi-menu-open');
        closeTimer = setTimeout(function() {
          overlay.style.display = 'none';
          closeTimer = null;
        }, 400);
      }
      overlay.setAttribute('data-visible', open ? 'true' : 'false');
      var btn = openWrap.querySelector('button');
      if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    openWrap.addEventListener('click', function(e) {
      // Repurposed as search trigger (patcher §1e) — menu stands down.
      if (e.target && e.target.closest && e.target.closest('[data-ryan-search-open]')) return;
      e.preventDefault();
      setOpen(true);
    });
    if (closeWrap) {
      closeWrap.addEventListener('click', function(e) {
        e.preventDefault();
        setOpen(false);
      });
    }
    var backdrop = overlay.querySelector('[data-hook="hamburger-overlay-dialog"]');
    if (backdrop) {
      backdrop.addEventListener('click', function() { setOpen(false); });
    }
    overlay.addEventListener('click', function(e) {
      var t = e.target;
      if (t && t.closest && t.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.getAttribute('data-visible') === 'true') setOpen(false);
    });
  }

  // ── Ryan mobile hamburger popup menu (§2c) ───────────────────────
  function initRyanMobileBar() {
    var toggle = document.getElementById('ryan-mobile-toggle');
    if (!toggle) return;
    var wrap = toggle.closest('.ryan-mobile-wrap');
    var popup = wrap ? wrap.querySelector('.ryan-mobile-popup') : null;
    if (!popup) return;
    function setOpen(open) {
      popup.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      setOpen(popup.hidden);
    });
    popup.addEventListener('click', function(e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('[data-ryan-mobile-close]') || t.closest('.ryan-mobile-bar a')) setOpen(false);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !popup.hidden) setOpen(false);
    });
  }

  // ── Autoplay Videos: Ensure muted native videos play smoothly across all browsers ──
  function initAutoplayVideos() {
    var vids = document.querySelectorAll('video');
    vids.forEach(function(v) {
      v.muted = true;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('autoplay', '');
      v.setAttribute('loop', '');
      var playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(function() {
          var onInteraction = function() {
            v.play().catch(function() {});
            document.removeEventListener('click', onInteraction);
            document.removeEventListener('touchstart', onInteraction);
          };
          document.addEventListener('click', onInteraction, { once: true });
          document.addEventListener('touchstart', onInteraction, { once: true });
        });
      }
    });
  }

  // ── Boot once. Single DOMContentLoaded listener; no observers, no re-apply. ──
  // Each init is isolated so one failure can never kill the others.
  function boot() {
    var inits = [initPillarsCarousel, initPartnerEnquiryInteractivity, initNavHideOnScroll, initChatPopupClose, initRyanSearch, initRyanChat, initMobileMenu, initRyanMobileBar, initAutoplayVideos];
    var args = [[3800], [], [], [], [], [], [], [], []];
    for (var i = 0; i < inits.length; i++) {
      try { inits[i].apply(null, args[i]); }
      catch (e) { if (window.console && console.warn) console.warn('[OBAGI] init failed:', e && e.message); }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
