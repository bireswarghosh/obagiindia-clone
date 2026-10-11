'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Check, Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { StorageProvider } from '@/types/content';

interface MediaInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  mediaType?: 'image' | 'video' | 'any';
  activeProvider?: StorageProvider;
  placeholder?: string;
  helperText?: string;
}

export default function MediaInput({
  label,
  value,
  onChange,
  mediaType = 'any',
  activeProvider = 'local',
  placeholder = 'https://... or /uploads/...',
  helperText
}: MediaInputProps) {
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Draft preview only — published only after the section Save succeeds.
      const { uploadCmsFile } = await import('@/lib/cms-client');
      const { url } = await uploadCmsFile(file, activeProvider);
      onChange(url);
    } catch (err: any) {
      alert(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const copyToClipboard = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getProviderBadge = (provider: StorageProvider) => {
    switch (provider) {
      case 'cloudflare-r2':
        return { name: 'Cloudflare R2', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
      case 'aws-s3':
        return { name: 'AWS S3', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'cloudinary':
        return { name: 'Cloudinary', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
      case 'google-drive':
        return { name: 'Google Drive', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'public-url':
        return { name: 'Public CDN', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      default:
        return { name: 'Local Server', color: 'bg-slate-700 text-slate-300 border-slate-600' };
    }
  };

  const badge = getProviderBadge(activeProvider);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 block">{label}</label>
        <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono ${badge.color}`}>
          Active: {badge.name}
        </span>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono pr-16 focus:border-indigo-500 focus:outline-none transition-colors"
          />
          {value && (
            <div className="absolute right-1 top-1 flex items-center gap-1">
              <button
                type="button"
                onClick={copyToClipboard}
                title="Copy URL"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                title="Open Link"
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={mediaType === 'video' ? 'video/*' : mediaType === 'image' ? 'image/*' : 'image/*,video/*'}
          onChange={handleUpload}
          className="hidden"
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all disabled:opacity-50"
        >
          {uploading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Upload</span>
            </>
          )}
        </button>
      </div>

      {helperText && <p className="text-[10px] text-slate-500">{helperText}</p>}

      {/* Visual Preview */}
      {value && (
        <div className="mt-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          {mediaType === 'video' || value.endsWith('.mp4') || value.includes('video') ? (
            <div className="w-24 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 relative border border-slate-700">
              <video src={value} className="w-full h-full object-cover" muted loop autoPlay playsInline />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 relative border border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              {mediaType === 'video' || value.endsWith('.mp4') ? <Video className="w-3 h-3 text-indigo-400" /> : <ImageIcon className="w-3 h-3 text-indigo-400" />}
              <span>Media Preview</span>
            </span>
            <p className="text-xs text-slate-300 font-mono truncate mt-0.5">{value}</p>
          </div>
        </div>
      )}
    </div>
  );
}
