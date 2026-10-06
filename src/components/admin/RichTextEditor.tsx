'use client';

import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Palette, Code, Eye, Link as LinkIcon, RotateCcw, Type } from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const BRAND_COLORS = [
  { name: 'Ryan Teal', hex: '#00768a' },
  { name: 'Deep Cyan', hex: '#003d4d' },
  { name: 'Soft Teal', hex: '#00a896' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Sky Blue', hex: '#0284c7' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Slate Gray', hex: '#334155' },
  { name: 'Pure White', hex: '#ffffff' },
];

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = ''
}: RichTextEditorProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2B328C');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to wrap selected text in textarea
  const wrapSelection = (openTag: string, closeTag: string) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentVal = value || '';

    let selected = currentVal.substring(start, end);
    if (!selected) {
      selected = 'text';
    }

    const replacement = `${openTag}${selected}${closeTag}`;
    const nextVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);
    onChange(nextVal);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + openTag.length, start + openTag.length + selected.length);
    }, 10);
  };

  const applyColor = (hex: string) => {
    setSelectedColor(hex);
    wrapSelection(`<span style="color: ${hex}">`, '</span>');
    setShowColorPicker(false);
  };

  const applyFontSize = (size: string) => {
    wrapSelection(`<span style="font-size: ${size}">`, '</span>');
  };

  const applyLink = () => {
    const url = prompt('Enter link destination URL:', 'https://');
    if (url) {
      wrapSelection(`<a href="${url}" target="_blank" rel="noopener noreferrer">`, '</a>');
    }
  };

  const clearFormatting = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentVal = value || '';

    if (start === end) {
      // Clear entire text tags
      const stripped = currentVal.replace(/<[^>]*>/g, '');
      onChange(stripped);
    } else {
      const selected = currentVal.substring(start, end);
      const stripped = selected.replace(/<[^>]*>/g, '');
      const nextVal = currentVal.substring(0, start) + stripped + currentVal.substring(end);
      onChange(nextVal);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 block">{label}</label>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Rich Editor</span>
          </div>
        </div>
      )}

      <div className="border border-slate-700/80 rounded-xl overflow-hidden bg-slate-950 focus-within:border-indigo-500/80 transition-all shadow-inner">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-900 border-b border-slate-800 text-slate-300">
          <button
            type="button"
            title="Bold"
            onClick={() => wrapSelection('<b>', '</b>')}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Italic"
            onClick={() => wrapSelection('<i>', '</i>')}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Underline"
            onClick={() => wrapSelection('<u>', '</u>')}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <div className="h-3.5 w-px bg-slate-700 mx-0.5" />

          {/* Color Picker Toggle */}
          <div className="relative">
            <button
              type="button"
              title="Text Color"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-800 text-xs text-slate-300"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: selectedColor }} />
              <div className="w-2.5 h-2.5 rounded-full border border-slate-600" style={{ backgroundColor: selectedColor }} />
            </button>

            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 z-50 p-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-wrap gap-1.5 w-44 animate-in fade-in zoom-in-95">
                {BRAND_COLORS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => applyColor(c.hex)}
                    className="w-5 h-5 rounded-md border border-slate-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.hex }}
                    title={`${c.name} (${c.hex})`}
                  />
                ))}
                <div className="w-full pt-1 border-t border-slate-800 flex items-center gap-1">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => applyColor(e.target.value)}
                    className="w-5 h-5 cursor-pointer rounded bg-transparent"
                    title="Custom Color"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">Custom Hex</span>
                </div>
              </div>
            )}
          </div>

          <div className="h-3.5 w-px bg-slate-700 mx-0.5" />

          {/* Font Sizes */}
          <button
            type="button"
            title="Small Font"
            onClick={() => applyFontSize('0.85em')}
            className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-[10px] text-slate-400 font-semibold"
          >
            S
          </button>
          <button
            type="button"
            title="Medium / Normal Font"
            onClick={() => applyFontSize('1.1em')}
            className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-xs text-slate-300 font-bold"
          >
            M
          </button>
          <button
            type="button"
            title="Large Font"
            onClick={() => applyFontSize('1.35em')}
            className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-sm text-white font-black"
          >
            L
          </button>

          <div className="h-3.5 w-px bg-slate-700 mx-0.5" />

          <button
            type="button"
            title="Insert Link"
            onClick={applyLink}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title="Clear Tag / Formatting"
            onClick={clearFormatting}
            className="p-1 rounded hover:bg-slate-800 hover:text-white transition-colors text-slate-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex-1" />

          <button
            type="button"
            title={showHtmlCode ? "Show Formatted Preview" : "Show HTML Code"}
            onClick={() => setShowHtmlCode(!showHtmlCode)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
              showHtmlCode ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            {showHtmlCode ? <Eye className="w-3 h-3" /> : <Code className="w-3 h-3" />}
            <span>{showHtmlCode ? 'Visual' : 'HTML'}</span>
          </button>
        </div>

        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          rows={rows}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Enter text with rich tags or formatting...'}
          className="w-full px-3 py-2 bg-transparent text-xs text-slate-200 focus:outline-none resize-y font-mono leading-relaxed"
        />

        {/* Real-time Visual Output Preview */}
        {value && (
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Live Formatted Output Preview:
            </span>
            <div
              className="text-slate-200 prose prose-invert max-w-none text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
