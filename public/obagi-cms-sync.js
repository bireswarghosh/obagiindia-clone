/**
 * Obagi India — public-page interactivity ONLY.
 *
 * DESIGN LOCK / NO-FLASH CONTRACT:
 * - All CMS content is painted on the SERVER (src/app/route.ts +
 *   obagi-html-patcher.ts) before first paint.
 * - This script intentionally contains ZERO CMS-apply logic: no fetching,
 *   no localStorage reads, no setText/setImg/setBg, no MutationObserver.
 *   It can never overwrite server-rendered content with stale defaults.
 * - Preserved behaviors only: brand-pillars auto-carousel + Partner→Enquiry flow.
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

  // ── Boot once. Single DOMContentLoaded listener; no observers, no re-apply. ──
  function boot() {
    initPillarsCarousel(3800);
    initPartnerEnquiryInteractivity();
    initNavHideOnScroll();
    initChatPopupClose();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
