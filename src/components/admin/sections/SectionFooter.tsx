'use client';

import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import ImageUploader from '../ImageUploader';
import MediaInput from '../MediaInput';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §15 — Footer + newsletter copy + floating labels + social files.
// Backgrounds live in tabs 13/14 and SEO in Settings (disjoint leaves).
export default function SectionFooter({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [nl, setNl] = useState({
    title: loaded.newsletter.title,
    subtitle: loaded.newsletter.subtitle,
    emailLabel: loaded.newsletter.emailLabel || '',
    consentText: loaded.newsletter.consentText || '',
    subscribeLabel: loaded.newsletter.subscribeLabel || '',
  });
  const [copyright, setCopyright] = useState(loaded.footer.copyright);
  const [logoImage, setLogoImage] = useState(loaded.footer.logoImage || '');
  const [logoHref, setLogoHref] = useState(loaded.footer.logoHref || '');
  const [leftText, setLeftText] = useState(loaded.footer.leftText || '');
  const [links, setLinks] = useState<{ label: string; href: string }[]>(
    loaded.footer.links && loaded.footer.links.length > 0
      ? loaded.footer.links.map((l) => ({ label: l.label || '', href: l.href || '' }))
      : (defaultObagiHomeContent.footer.links || []).map((l) => ({ ...l }))
  );
  const [socials, setSocials] = useState(
    loaded.footer.socialIcons || { instagram: '', youtube: '', facebook: '', x: '' }
  );
  const [floating, setFloating] = useState(
    loaded.floating || { chatLabel: '', needHelpText: '', exploreText: '', agingText: '' }
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNl({
      title: loaded.newsletter.title,
      subtitle: loaded.newsletter.subtitle,
      emailLabel: loaded.newsletter.emailLabel || '',
      consentText: loaded.newsletter.consentText || '',
      subscribeLabel: loaded.newsletter.subscribeLabel || '',
    });
    setCopyright(loaded.footer.copyright);
    setLogoImage(loaded.footer.logoImage || '');
    setLogoHref(loaded.footer.logoHref || '');
    setLeftText(loaded.footer.leftText || '');
    setLinks(
      loaded.footer.links && loaded.footer.links.length > 0
        ? loaded.footer.links.map((l) => ({ label: l.label || '', href: l.href || '' }))
        : (defaultObagiHomeContent.footer.links || []).map((l) => ({ ...l }))
    );
    setSocials(loaded.footer.socialIcons || { instagram: '', youtube: '', facebook: '', x: '' });
    setFloating(loaded.floating || { chatLabel: '', needHelpText: '', exploreText: '', agingText: '' });
  }, [loaded.newsletter, loaded.footer, loaded.floating]);

  const dirty =
    JSON.stringify(nl) !==
      JSON.stringify({
        title: loaded.newsletter.title,
        subtitle: loaded.newsletter.subtitle,
        emailLabel: loaded.newsletter.emailLabel || '',
        consentText: loaded.newsletter.consentText || '',
        subscribeLabel: loaded.newsletter.subscribeLabel || '',
      }) ||
    copyright !== loaded.footer.copyright ||
    logoImage !== (loaded.footer.logoImage || '') ||
    logoHref !== (loaded.footer.logoHref || '') ||
    leftText !== (loaded.footer.leftText || '') ||
    JSON.stringify(links) !==
      JSON.stringify(
        loaded.footer.links && loaded.footer.links.length > 0
          ? loaded.footer.links
          : defaultObagiHomeContent.footer.links || []
      ) ||
    JSON.stringify(socials) !==
      JSON.stringify(loaded.footer.socialIcons || { instagram: '', youtube: '', facebook: '', x: '' }) ||
    JSON.stringify(floating) !==
      JSON.stringify(loaded.floating || { chatLabel: '', needHelpText: '', exploreText: '', agingText: '' });

  const setLink = (i: number, field: 'label' | 'href', val: string) => {
    setLinks((prev) => prev.map((lnk, j) => (j === i ? { ...lnk, [field]: val } : lnk)));
  };

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({
      newsletter: nl,
      footer: { copyright, socialIcons: socials, logoImage, logoHref, leftText, links },
      floating,
    } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Footer, Newsletter & Floating labels saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Footer', 'error');
    }
  };

  return (
    <SectionShell
      icon={Mail}
      title="Part 15: Footer, Newsletter & Floating Labels"
      desc="Newsletter copy, consent + button labels, legal line, footer logo & links, social icons and chat labels. Backgrounds: tabs 13/14. SEO: Settings."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RichColorTextEditor
          label="Newsletter Title"
          value={nl.title}
          onChange={(val) => setNl({ ...nl, title: val })}
          description="Default: Join The OBAGI Newsletter"
        />
        <RichColorTextEditor
          label="Newsletter Subtitle"
          value={nl.subtitle}
          onChange={(val) => setNl({ ...nl, subtitle: val })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RichColorTextEditor
          label="Email Field Label"
          value={nl.emailLabel}
          onChange={(val) => setNl({ ...nl, emailLabel: val })}
          description="Label text above the email box. Text only."
        />
        <RichColorTextEditor
          label="Consent Line"
          value={nl.consentText}
          onChange={(val) => setNl({ ...nl, consentText: val })}
          description="Default: Yes, subscribe me to your newsletter."
        />
        <RichColorTextEditor
          label="Subscribe Button Label"
          value={nl.subscribeLabel}
          onChange={(val) => setNl({ ...nl, subscribeLabel: val })}
          description="Default: SUBSCRIBE. Action untouched."
        />
      </div>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          Legal Disclaimer & Copyright
        </h4>
        <RichColorTextEditor
          label="Legal Disclaimer & Copyright Notice"
          multiline
          rows={3}
          value={copyright}
          onChange={setCopyright}
          description="Physician-dispensed warning and copyright line."
        />
      </div>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          Footer Logo & Nav Links (full footer branding)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MediaInput
            label="Footer Logo Image"
            value={logoImage}
            onChange={setLogoImage}
            mediaType="image"
            placeholder="Upload logo or paste https://..."
            helperText="Empty = keep original vector logo. Uploads go to durable Blob storage."
          />
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Logo Link Target</label>
            <input
              type="text"
              value={logoHref}
              onChange={(e) => setLogoHref(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <p className="text-[10px] text-slate-500">Where the logo click goes. Default: homepage.</p>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block">Footer Left Text (instead of logo)</label>
          <input
            type="text"
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="e.g. RYAN DERMACEUTICS"
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
          />
          <p className="text-[10px] text-slate-500">
            Brand text in footer style, shown where the logo sits. Wins over the logo image when both are set. Empty = logo/original logic.
          </p>
        </div>
        <div className="space-y-3">
          {links.map((lnk, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Link {i + 1} Label
                </label>
                <input
                  type="text"
                  value={lnk.label}
                  onChange={(e) => setLink(i, 'label', e.target.value)}
                  placeholder="TERMS & CONDITIONS"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Link {i + 1} URL
                </label>
                <input
                  type="text"
                  value={lnk.href}
                  onChange={(e) => setLink(i, 'href', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 font-mono focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
          <p className="text-[10px] text-slate-500">
            Empty label = keep that original footer link untouched. Saved to Blob — survives deploys.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          Social Icons (file swap only — profile links frozen)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            [
              ['instagram', 'Instagram Icon'],
              ['youtube', 'YouTube Icon'],
              ['facebook', 'Facebook Icon'],
              ['x', 'X Icon'],
            ] as const
          ).map(([key, label]) => (
            <ImageUploader
              key={key}
              label={label}
              value={(socials as any)[key] || ''}
              onChange={(url) => setSocials({ ...socials, [key]: url })}
              description="Empty = keep original icon."
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          Floating Chat Labels (text only)
        </h4>
        <p className="text-[11px] text-slate-400">Widget behavior and destinations stay untouched.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RichColorTextEditor
            label="Chat Button Label"
            value={floating.chatLabel || ''}
            onChange={(val) => setFloating({ ...floating, chatLabel: val })}
            description="Default: Chat with AI"
          />
          <RichColorTextEditor
            label="Help Popover Text"
            value={floating.needHelpText || ''}
            onChange={(val) => setFloating({ ...floating, needHelpText: val })}
            description="Default: Need Help?"
          />
          <RichColorTextEditor
            label="Explore Quick Reply"
            value={floating.exploreText || ''}
            onChange={(val) => setFloating({ ...floating, exploreText: val })}
            description="Default: Explore Obagi"
          />
          <RichColorTextEditor
            label="Aging Quick Reply"
            value={floating.agingText || ''}
            onChange={(val) => setFloating({ ...floating, agingText: val })}
            description="Default: Address the Signs of Aging Skin"
          />
        </div>
      </div>
    </SectionShell>
  );
}
