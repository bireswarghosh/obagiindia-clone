'use client';

import React, { useState } from 'react';
import { NewsletterSettings, ThemeColors } from '@/types/content';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterProps {
  newsletter?: any;
  theme: ThemeColors;
}

export default function NewsletterSection({ newsletter, theme }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const titleText = newsletter?.title || newsletter?.heading || 'STAY INFORMED ON DERMATOLOGY DEVELOPMENTS';
  const subtitleText = newsletter?.subtitle || newsletter?.description || 'Receive product updates, scientific monographs, and clinical practice insights from Ryan Dermaceutics.';
  const placeholderText = newsletter?.placeholder || 'Enter your professional email address';
  const buttonText = newsletter?.buttonText || 'Subscribe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to Ryan Dermaceutics clinical bulletin.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Failed to connect to server.');
    }
  };

  return (
    <section id="newsletter" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#002530] text-white relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/10 text-teal-300 border border-white/15">
          <Mail className="w-3.5 h-3.5 text-teal-300" />
          <span>Clinical & Formulation Bulletin</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight max-w-3xl mx-auto leading-tight">
          {titleText}
        </h2>

        <p className="text-teal-100/80 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitleText}
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderText}
            required
            className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-teal-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 bg-teal-400 text-slate-950 shrink-0"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>Joined</span>
              </>
            ) : (
              <span>{buttonText}</span>
            )}
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`text-xs mt-3 flex items-center justify-center gap-2 animate-fade-in ${
              status === 'success' ? 'text-teal-300' : 'text-rose-300'
            }`}
          >
            {status === 'success' ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
}
