'use client';

import React, { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Site Metadata settings panel (NOT a visual section): existing home-page SEO
// text only. Canonical URLs, routes and technical metadata are not editable.
export default function SectionSeo({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.seo || { pageTitle: '', metaDescription: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.seo || { pageTitle: '', metaDescription: '' });
  }, [loaded.seo]);

  const base = loaded.seo || { pageTitle: '', metaDescription: '' };
  const dirty = JSON.stringify(local) !== JSON.stringify(base);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ seo: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('SEO Metadata saved successfully!', 'success');
    } else {
      triggerToast('Failed to save SEO', 'error');
    }
  };

  return (
    <SectionShell
      icon={Settings2}
      title="Settings: Site Metadata (SEO text)"
      desc="Browser-tab title and search-result description. Canonical URLs and link destinations are never editable."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <RichColorTextEditor
        label="Page <title>"
        value={local.pageTitle || ''}
        onChange={(val) => setLocal({ ...local, pageTitle: val })}
        description="Browser tab + search-result title."
      />
      <RichColorTextEditor
        label="Meta Description"
        multiline
        rows={2}
        value={local.metaDescription || ''}
        onChange={(val) => setLocal({ ...local, metaDescription: val })}
        description="Search-result snippet text."
      />
    </SectionShell>
  );
}
