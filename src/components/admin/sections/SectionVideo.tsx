'use client';

import React, { useState, useEffect } from 'react';
import { Video } from 'lucide-react';
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

// Spec §12 — award video slot (restored genuine section [11]).
export default function SectionVideo({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.awardVideo || { videoUrl: '', posterImage: '', overlayTitle: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.awardVideo || { videoUrl: '', posterImage: '', overlayTitle: '' });
  }, [loaded.awardVideo]);

  const base = loaded.awardVideo || { videoUrl: '', posterImage: '', overlayTitle: '' };
  const dirty = JSON.stringify(local) !== JSON.stringify(base);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ awardVideo: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Award Video saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Video', 'error');
    }
  };

  return (
    <SectionShell
      icon={Video}
      title="Part 12: Award Video"
      desc="Video file, poster and accessible title for the existing player. Autoplay/mute/loop/crop untouched."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaInput
          label="Award Video File (MP4/WebM upload)"
          value={local.videoUrl || ''}
          onChange={(url) => setLocal({ ...local, videoUrl: url })}
          mediaType="video"
          placeholder="Upload MP4/WebM or paste https://..."
          helperText="Replaces ONLY the existing player source. Empty = keep original."
        />
        <ImageUploader
          label="Video Poster Image"
          value={local.posterImage || ''}
          onChange={(url) => setLocal({ ...local, posterImage: url })}
          description="Poster shown before the video plays. Empty = keep original."
        />
      </div>
      <RichColorTextEditor
        label="Video Accessible Title"
        value={local.overlayTitle || ''}
        onChange={(val) => setLocal({ ...local, overlayTitle: val })}
        description="Player aria-label text. Text only."
      />
    </SectionShell>
  );
}
