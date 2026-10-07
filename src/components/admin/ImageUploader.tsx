'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
}

export default function ImageUploader({ label, value, onChange, description }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    try {
      setUploading(true);

      // Attempt server upload
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          onChange(data.url);
          setUploading(false);
          return;
        }
      }

      // Client-side fallback to DataURL for immediate persistent preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('File upload error:', err);
      // Fallback
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-300">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL Input' : 'Paste Direct URL'}</span>
        </button>
      </div>

      {description && <p className="text-[11px] text-slate-400">{description}</p>}

      {/* Upload Zone & Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Thumbnail */}
        <div className="sm:col-span-4 h-28 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden relative flex items-center justify-center group">
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-md"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-2 text-slate-500">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-600" />
              <span className="text-[10px] uppercase font-bold tracking-wider">No Image</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="sm:col-span-8 space-y-2">
          {/* File Upload Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-teal-400 bg-teal-950/30'
                : 'border-slate-700 hover:border-teal-500/60 bg-slate-900/60'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {uploading ? (
              <div className="flex items-center justify-center gap-2 text-teal-300 py-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold">Uploading from device...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-slate-300 py-1">
                <Upload className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-xs font-bold">Upload Image from Device</span>
                <span className="text-[10px] text-slate-500">(or drag & drop)</span>
              </div>
            )}
          </div>

          {/* Optional Direct URL Input */}
          {showUrlInput && (
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="https://... or /ryan/... or data:image/..."
                className="w-full text-xs py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-400 font-mono"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
