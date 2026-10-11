'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Inbox, RefreshCw, Loader2, Lock } from 'lucide-react';
import SectionShell from './SectionShell';
import { cmsHeaders, getCmsPin } from '@/lib/cms-client';

interface EnquiryRow {
  id: string;
  receivedAt: string;
  name?: string;
  designation?: string;
  organization?: string;
  city?: string;
  state?: string;
  enquiryType?: string;
  message?: string;
  email?: string;
  phone?: string;
  source?: string;
}

interface SectionProps {
  triggerToast: (msg: string, type: 'success' | 'error') => void;
}

export default function SectionEnquiryInbox({ triggerToast }: SectionProps) {
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/enquiry', {
        cache: 'no-store',
        headers: cmsHeaders(),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Unauthorized or load failed');
      }
      setRows(Array.isArray(json.enquiries) ? json.enquiries : []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Load failed';
      setError(msg);
      if (res401(msg)) {
        triggerToast('Enter a valid admin PIN to view enquiries.', 'error');
      } else {
        triggerToast(`Inbox load failed: ${msg}`, 'error');
      }
    }
    setLoading(false);
  }, [triggerToast]);

  function res401(msg: string) {
    return /unauthorized|pin/i.test(msg);
  }

  useEffect(() => {
    if (getCmsPin()) load();
  }, [load]);

  return (
    <SectionShell
      icon={Inbox}
      title="Distributor & Enquiry Inbox"
      desc="Saved enquiries from the distributor popup and enquiry form. GET is PIN-protected; storage is Vercel Blob + local fallback."
      saving={loading}
      onSave={load}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            {rows.length} entr{rows.length === 1 ? 'y' : 'ies'} loaded. New enquiries appear after refresh.
          </p>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5 border border-slate-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            <span>Reload</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-[11px] text-rose-200 flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {rows.length === 0 && !loading && !error && (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-700 rounded-xl">
            No enquiries yet.
          </div>
        )}

        {rows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-[11px] text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-left">Received</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Organization</th>
                  <th className="px-3 py-2 text-left">City / State</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-slate-800 hover:bg-slate-900/50 align-top">
                    <td className="px-3 py-2 whitespace-nowrap text-slate-400">
                      {r.receivedAt ? new Date(r.receivedAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-bold text-white">{r.name || '—'}</div>
                      {r.designation && <div className="text-slate-500">{r.designation}</div>}
                      {r.source && <div className="text-[10px] text-teal-400/70 mt-0.5">{r.source}</div>}
                    </td>
                    <td className="px-3 py-2">{r.organization || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{r.city || '—'}{r.state ? `, ${r.state}` : ''}</td>
                    <td className="px-3 py-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px] font-bold uppercase whitespace-nowrap">
                        {r.enquiryType || '—'}
                      </span>
                    </td>
                    <td className="px-3 py-2 max-w-xs whitespace-pre-wrap break-words text-slate-400">
                      {r.message || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
