'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Video } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import ImageUploader from '../ImageUploader';
import MediaInput from '../MediaInput';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

export default function SectionCareersPress({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [localCareers, setLocalCareers] = useState(loaded.careers);
  const [localPress, setLocalPress] = useState(loaded.press);
  const [localQuote, setLocalQuote] = useState(loaded.quote);
  const [localVideo, setLocalVideo] = useState(loaded.awardVideo || { videoUrl: '', posterImage: '', overlayTitle: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalCareers(loaded.careers);
    setLocalPress(loaded.press);
    setLocalQuote(loaded.quote);
    setLocalVideo(loaded.awardVideo || { videoUrl: '', posterImage: '', overlayTitle: '' });
  }, [loaded.careers, loaded.press, loaded.quote, loaded.awardVideo]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({
      careers: localCareers,
      press: localPress,
      quote: localQuote,
      awardVideo: localVideo
    });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Careers, Press & Video saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Careers & Press', 'error');
    }
  };

  return (
    <SectionShell
      icon={Briefcase}
      title="Part 7: Beauty Award Video, Careers, Press & Quote"
      desc="Configure the Beauty Award video, open job listings, press mentions, and executive quote."
      saving={saving}
      onSave={save}
    >
      {/* Annotation 13: Beauty Award Video */}
      <div className="space-y-4 p-4 rounded-xl bg-slate-900/60 border border-teal-900/40">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider flex items-center gap-2">
          <Video className="w-3.5 h-3.5 text-teal-400" />
          <span>Beauty Award Video (Annotation 13)</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MediaInput
            label="Award Video File (MP4/WebM upload)"
            value={localVideo.videoUrl || ''}
            onChange={(url) => setLocalVideo({ ...localVideo, videoUrl: url })}
            mediaType="video"
            placeholder="Upload MP4/WebM or paste https://..."
            helperText="Replaces ONLY the existing player source (comp-mlau0bjm_video). Empty = keep original. Autoplay/mute/loop untouched."
          />
          <ImageUploader
            label="Video Poster Image"
            value={localVideo.posterImage || ''}
            onChange={(url) => setLocalVideo({ ...localVideo, posterImage: url })}
            description="Poster image displayed before the video plays."
          />
        </div>
        <RichColorTextEditor
          label="Video Accessibility Title"
          value={localVideo.overlayTitle || ''}
          onChange={(val) => setLocalVideo({ ...localVideo, overlayTitle: val })}
          description="Player aria-label text (e.g. New Beauty Award 2024 Winner). Text only."
        />
      </div>

      {/* Careers Section */}
      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">Careers Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RichColorTextEditor
            label="Careers Title"
            value={localCareers.title}
            onChange={(val) => setLocalCareers({ ...localCareers, title: val })}
            color={localCareers.titleColor}
            onColorChange={(col) => setLocalCareers({ ...localCareers, titleColor: col })}
          />
          <RichColorTextEditor
            label="Careers Subtitle"
            value={localCareers.subtitle}
            onChange={(val) => setLocalCareers({ ...localCareers, subtitle: val })}
            color={localCareers.subtitleColor}
            onColorChange={(col) => setLocalCareers({ ...localCareers, subtitleColor: col })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {localCareers.jobs.map((job, idx) => (
            <div key={job.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                Job #{idx + 1}
              </span>
              <RichColorTextEditor
                label="Position"
                value={job.title}
                onChange={(val) => {
                  const updated = [...localCareers.jobs];
                  updated[idx] = { ...updated[idx], title: val };
                  setLocalCareers({ ...localCareers, jobs: updated });
                }}
                color={job.titleColor}
                onColorChange={(col) => {
                  const updated = [...localCareers.jobs];
                  updated[idx] = { ...updated[idx], titleColor: col };
                  setLocalCareers({ ...localCareers, jobs: updated });
                }}
              />
              <RichColorTextEditor
                label="Location"
                value={job.location}
                onChange={(val) => {
                  const updated = [...localCareers.jobs];
                  updated[idx] = { ...updated[idx], location: val };
                  setLocalCareers({ ...localCareers, jobs: updated });
                }}
                color={job.locationColor}
                onColorChange={(col) => {
                  const updated = [...localCareers.jobs];
                  updated[idx] = { ...updated[idx], locationColor: col };
                  setLocalCareers({ ...localCareers, jobs: updated });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Press Section */}
      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">Press Publications</h4>
        <RichColorTextEditor
          label="Press Section Title"
          value={localPress.title}
          onChange={(val) => setLocalPress({ ...localPress, title: val })}
          color={localPress.titleColor}
          onColorChange={(col) => setLocalPress({ ...localPress, titleColor: col })}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {localPress.items.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                Article #{idx + 1}
              </span>
              <RichColorTextEditor
                label="Headline"
                multiline
                rows={2}
                value={item.headline}
                onChange={(val) => {
                  const updated = [...localPress.items];
                  updated[idx] = { ...updated[idx], headline: val };
                  setLocalPress({ ...localPress, items: updated });
                }}
                color={item.headlineColor}
                onColorChange={(col) => {
                  const updated = [...localPress.items];
                  updated[idx] = { ...updated[idx], headlineColor: col };
                  setLocalPress({ ...localPress, items: updated });
                }}
              />
              <RichColorTextEditor
                label="Source"
                value={item.source}
                onChange={(val) => {
                  const updated = [...localPress.items];
                  updated[idx] = { ...updated[idx], source: val };
                  setLocalPress({ ...localPress, items: updated });
                }}
                color={item.sourceColor}
                onColorChange={(col) => {
                  const updated = [...localPress.items];
                  updated[idx] = { ...updated[idx], sourceColor: col };
                  setLocalPress({ ...localPress, items: updated });
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Executive Quote */}
      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">Executive Quote</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RichColorTextEditor
            label="Author Name"
            value={localQuote.author}
            onChange={(val) => setLocalQuote({ ...localQuote, author: val })}
            color={localQuote.authorColor}
            onColorChange={(col) => setLocalQuote({ ...localQuote, authorColor: col })}
          />
          <RichColorTextEditor
            label="Author Role"
            value={localQuote.role}
            onChange={(val) => setLocalQuote({ ...localQuote, role: val })}
            color={localQuote.roleColor}
            onColorChange={(col) => setLocalQuote({ ...localQuote, roleColor: col })}
          />
        </div>
        <ImageUploader
          label="Author Photo"
          value={localQuote.image}
          onChange={(url) => setLocalQuote({ ...localQuote, image: url })}
        />
      </div>
    </SectionShell>
  );
}
