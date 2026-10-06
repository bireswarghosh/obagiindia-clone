"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";
import { MR_SECTIONS, RailPill } from "./RailPill";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
    toggleAccordion?: (button: HTMLElement) => void;
    expandAllSec03?: () => void;
    collapseAllSec03?: () => void;
    expandAllSec06?: () => void;
    collapseAllSec06?: () => void;
  }
}

function toggleAccordion(button: HTMLElement) {
  const content = button.nextElementSibling as HTMLElement | null;
  if (!content) return;
  // DIFFERENTIAL-style items: hidden class + arrow-icon/header-title
  if (content.classList.contains("hidden") || button.querySelector(".arrow-icon")) {
    const isOpen = !content.classList.contains("hidden");
    const arrow = button.querySelector(".arrow-icon");
    const title = button.querySelector(".header-title");
    if (isOpen) {
      content.classList.add("hidden");
      content.classList.remove("active");
      button.classList.remove("active");
      if (arrow) arrow.classList.remove("rotate-180");
      if (title) {
        title.classList.remove("text-blue-700");
        title.classList.add("text-gray-800");
      }
    } else {
      content.classList.remove("hidden");
      content.classList.add("active");
      button.classList.add("active");
      if (arrow) arrow.classList.add("rotate-180");
      if (title) {
        title.classList.add("text-blue-700");
        title.classList.remove("text-gray-800");
      }
    }
    return;
  }
  // Default style: active class with max-height
  const isActive = button.classList.contains("active");
  if (isActive) {
    button.classList.remove("active");
    content.classList.remove("active");
  } else {
    button.classList.add("active");
    content.classList.add("active");
  }
}

function setAll(listId: string, open: boolean) {
  document.querySelectorAll(`#${listId} .accordion-header`).forEach((node) => {
    const btn = node as HTMLElement;
    const content = btn.nextElementSibling as HTMLElement | null;
    if (open) {
      btn.classList.add("active");
      if (content) {
        content.classList.remove("hidden");
        content.classList.add("active");
      }
    } else {
      btn.classList.remove("active");
      if (content) {
        content.classList.add("hidden");
        content.classList.remove("active");
      }
    }
    const arrow = btn.querySelector(".arrow-icon");
    const title = btn.querySelector(".header-title");
    if (arrow) arrow.classList.toggle("rotate-180", open);
    if (title) {
      title.classList.toggle("text-blue-700", open);
      title.classList.toggle("text-gray-800", !open);
    }
  });
}

interface Props {
  html: string;
  css: string;
  heroHtml?: string;
  wrapClassName?: string;
  /** Azidin-style: one rail pill per section, aligned on the same row. */
  railRows?: boolean;
}

function splitSections(html: string): { intro: string; parts: { id: string; html: string }[]; outro: string } {
  const re = /<section id="(sec-\d+)"[\s\S]*?<\/section>/g;
  const parts: { id: string; html: string }[] = [];
  let m: RegExpExecArray | null;
  let firstIndex = -1;
  let lastEnd = 0;
  while ((m = re.exec(html)) !== null) {
    if (firstIndex === -1) firstIndex = m.index;
    parts.push({ id: m[1], html: m[0] });
    lastEnd = m.index + m[0].length;
  }
  if (firstIndex === -1) return { intro: html, parts: [], outro: "" };
  return { intro: html.slice(0, firstIndex), parts, outro: html.slice(lastEnd) };
}

export default function MedicalReferenceView({ html, css, heroHtml = "", wrapClassName = "", railRows = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("sec-01");
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());
  const [showTop, setShowTop] = useState(false);
  // Rows render client-side only so SSR and hydration output always match.
  const [mounted, setMounted] = useState(false);
  const split = useMemo(() => (railRows ? splitSections(html) : null), [html, railRows]);

  const go = (id: string) => {
    setCollapsedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const [twReady, setTwReady] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);

  const applyTailwindConfig = () => {
    const w = window as unknown as { tailwind?: { config: object } };
    w.tailwind = w.tailwind ?? { config: {} };
    w.tailwind.config = { corePlugins: { preflight: false, container: false } };
  };

  useEffect(() => {
    if (!mounted) return;
    if (!railRows && ref.current && !ref.current.hasChildNodes()) {
      ref.current.innerHTML = heroHtml + html;
    }
    applyTailwindConfig();
    window.toggleAccordion = toggleAccordion;
    window.expandAllSec03 = () => setAll("sec03-list", true);
    window.collapseAllSec03 = () => setAll("sec03-list", false);
    window.expandAllSec06 = () => setAll("sec06-list", true);
    window.collapseAllSec06 = () => setAll("sec06-list", false);
    if (window.lucide) window.lucide.createIcons();
    const first = document.querySelector(
      '#sec03-list .accordion-item[data-id="rosacea"] .accordion-header'
    ) as HTMLElement | null;
    if (first && first.nextElementSibling?.classList.contains("hidden")) {
      toggleAccordion(first);
    }
  }, [html, heroHtml, railRows, mounted, iconsReady]);

  // Scroll-spy for azidin-style rows (sections render with the markup).
  useEffect(() => {
    if (!railRows || !mounted) return;
    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        }),
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    MR_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) spy.observe(el);
    });
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [railRows, split, mounted]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Script
        src="https://cdn.tailwindcss.com"
        strategy="afterInteractive"
        onLoad={() => {
          applyTailwindConfig();
          setTwReady(true);
        }}
      />
      {twReady && (
        <Script
          src="https://unpkg.com/lucide@latest"
          strategy="afterInteractive"
          onLoad={() => {
            if (window.lucide) window.lucide.createIcons();
            setIconsReady(true);
          }}
        />
      )}
      {railRows && split && mounted ? (
        <>
          <div ref={ref} className={`medical-ref-wrap px-3 sm:px-6 lg:px-10 py-4 sm:py-6 ${wrapClassName}`}>
            <div dangerouslySetInnerHTML={{ __html: heroHtml + split.intro }} />
            {split.parts.map((part) => {
              const item = MR_SECTIONS.find((s) => s.id === part.id);
              if (!item) return <div key={part.id} dangerouslySetInnerHTML={{ __html: part.html }} />;
              return (
                <div key={part.id} className="v2-row">
                  <div className="v2-railcell">
                    <RailPill
                      item={item}
                      active={activeId === item.id}
                      onGo={go}
                      collapsible
                      collapsed={collapsedIds.has(item.id)}
                      onToggleCollapse={() => toggleCollapse(item.id)}
                    />
                  </div>
                  <div
                    className="v2-seccell"
                    style={collapsedIds.has(part.id) ? { display: "none" } : undefined}
                  >
                    <div dangerouslySetInnerHTML={{ __html: part.html }} />
                  </div>
                </div>
              );
            })}
            <div dangerouslySetInnerHTML={{ __html: split.outro }} />
          </div>
          <button
            type="button"
            onClick={() => {
              setCollapsedIds((prev) =>
                prev.size === MR_SECTIONS.length
                  ? new Set<string>()
                  : new Set(MR_SECTIONS.map((s) => s.id))
              );
            }}
            aria-label={collapsedIds.size === MR_SECTIONS.length ? "Expand all sections" : "Collapse all sections"}
            title={collapsedIds.size === MR_SECTIONS.length ? "Expand all" : "Collapse all"}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-white shadow-lg transition-shadow hover:shadow-xl"
            style={{
              position: "fixed",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 18,
              zIndex: 60,
              background: "linear-gradient(135deg, #059669, #10b981)",
              boxShadow: "0 8px 22px rgba(5,150,105,.4)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              {collapsedIds.size === MR_SECTIONS.length ? (
                <path d="M12 5v14M5 12h14" />
              ) : (
                <path d="M5 12h14" />
              )}
            </svg>
            {collapsedIds.size === MR_SECTIONS.length ? "Expand all" : "Collapse all"}
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            title="Back to top"
            tabIndex={showTop ? 0 : -1}
            className="items-center justify-center rounded-full text-white shadow-lg transition-all hover:shadow-xl"
            style={{
              position: "fixed",
              right: 18,
              bottom: 18,
              zIndex: 60,
              width: 38,
              height: 38,
              display: showTop ? "flex" : "none",
              background: "linear-gradient(135deg, #06382c, #059669)",
              boxShadow: "0 8px 22px rgba(6,56,44,.4)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </>
      ) : (
        <div ref={ref} className={`medical-ref-wrap px-3 sm:px-6 lg:px-10 py-4 sm:py-6 ${wrapClassName}`} />
      )}
    </>
  );
}
