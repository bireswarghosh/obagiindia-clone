'use client';

import React from 'react';
import { Palette, Type } from 'lucide-react';

interface RichColorTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  color?: string;
  onColorChange?: (color: string) => void;
  multiline?: boolean;
  rows?: number;
  description?: string;
}

const PRESET_COLORS = [
  { name: 'Ryan Deep', value: '#003d4d' },
  { name: 'Ryan Teal', value: '#00768a' },
  { name: 'Cyan Glow', value: '#06b6d4' },
  { name: 'Gold / Amber', value: '#d97706' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose Red', value: '#e11d48' },
  { name: 'White', value: '#ffffff' },
  { name: 'Dark Slate', value: '#0f172a' }
];

export default function RichColorTextEditor({
  label,
  value,
  onChange,
  color,
  onColorChange,
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
        {onColorChange && (
          <div className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Color:</span>
            <div className="flex items-center gap-1">
              {PRESET_COLORS.map((pc) => (
                <button
                  key={pc.value}
                  type="button"
                  title={pc.name}
                  onClick={() => onColorChange(pc.value)}
                  className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 ${
                    color === pc.value ? 'ring-2 ring-teal-400 scale-110 border-white' : 'border-slate-600'
                  }`}
                  style={{ backgroundColor: pc.value }}
                />
              ))}
              <input
                type="color"
                value={color || '#ffffff'}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer border border-slate-700 bg-transparent ml-1"
                title="Custom Color"
              />
            </div>
          </div>
        )}
      </div>

      {description && <p className="text-[11px] text-slate-400">{description}</p>}

      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={color ? { color } : undefined}
          className="w-full text-xs p-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-teal-400 leading-relaxed font-sans"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={color ? { color } : undefined}
          className="w-full text-xs py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:border-teal-400 font-sans"
        />
      )}

      {/* Live Visual Preview */}
      <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs flex items-center justify-between">
        <span className="text-[10px] text-slate-500 uppercase font-mono">Live Preview:</span>
        <div
          className="font-medium text-right truncate max-w-[80%]"
          style={{ color: color || '#ffffff' }}
        >
          {value || <span className="text-slate-600 italic">Empty text</span>}
        </div>
      </div>
    </div>
  );
}
