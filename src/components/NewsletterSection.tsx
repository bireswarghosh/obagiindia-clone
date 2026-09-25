'use client';

import React, { useState } from 'react';
import { NewsletterSettings, ThemeColors } from '@/types/content';
import { Mail, Check, AlertCircle, Loader2 } from 'lucide-react';

interface NewsletterProps {
  newsletter: NewsletterSettings;
  theme: ThemeColors;
}

export default function NewsletterSection({ newsletter, theme }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
        setMessage(data.message || newsletter.successMessage);
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
    <section id="newsletter" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-white border border-white/20">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Exclusive Medical Bulletin</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight">
          {newsletter.title}
        </h2>

        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          {newsletter.subtitle}
        </p>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            required
            className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            style={{
              backgroundColor: '#ffffff',
              color: theme.deepNavy,
            }}
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Joined</span>
              </>
            ) : (
              <span>{newsletter.buttonText}</span>
            )}
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`text-xs mt-3 flex items-center justify-center gap-2 animate-fade-in ${
              status === 'success' ? 'text-emerald-400' : 'text-rose-400'
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
