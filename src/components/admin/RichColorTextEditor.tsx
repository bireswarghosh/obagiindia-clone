'use client';

import React from 'react';
import { Type } from 'lucide-react';

interface RichColorTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** DESIGN LOCK: color props are accepted for backward compatibility but
   *  NEVER rendered or saved to the public page. Public-page colors are frozen. */
  color?: string;
  onColorChange?: (color: string) => void;
  multiline?: boolean;
  rows?: number;
  description?: string;
}

export default function RichColorTextEditor({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  description
}: RichColorTextEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-teal-400" />
          <span>{label}</span>
        </label>
        <span className="text-[10px] text-slate-500 font-bold uppercase">Text only — design locked</span>
      </div>

      {description && <p className="text-[11px] text-slate-400">{description}</p>}

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-teal-400 leading-relaxed font-sans text-slate-100"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-teal-400 font-sans text-slate-100"
        />
      )}

      {/* Live Visual Preview */}
      <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between">
        <span className="text-[10px] text-slate-500 uppercase font-mono">Live Preview:</span>
        <div className="font-medium text-right truncate max-w-[80%] text-slate-200">
          {value || <span className="text-slate-600 italic">Empty text</span>}
        </div>
      </div>
    </div>
  );
}
