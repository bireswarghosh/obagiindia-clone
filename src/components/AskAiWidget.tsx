'use client';

import React, { useState } from 'react';
import { ThemeColors } from '@/types/content';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';

interface AskAiProps {
  enabled: boolean;
  theme: ThemeColors;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export default function AskAiWidget({ enabled, theme }: AskAiProps) {
  if (!enabled) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! I am the Obagi Skincare Assistant. How can I assist you with your skin concerns or clinical product recommendations today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Instant smart response based on Obagi product knowledge
    setTimeout(() => {
      let reply = "Thank you for asking. Obagi Medical formulations are gold-standard physician-dispensed treatments. We recommend consulting a licensed clinic for an individualized protocol.";

      const lower = userText.toLowerCase();
      if (lower.includes('pigment') || lower.includes('spot') || lower.includes('dark') || lower.includes('melasma')) {
        reply = "For hyperpigmentation, age spots, and melasma, the Obagi Nu-Derm Fx™ System with Arbutin and Vitamin C is clinically proven to accelerate cellular renewal and even out skin tone.";
      } else if (lower.includes('dry') || lower.includes('hydrate') || lower.includes('drop')) {
        reply = "Obagi Daily Hydro-Drops™ with Isoplentix® microfluidic technology deliver pure Vitamin B3, Abyssinian Oil, and Hibiscus Oil for all-day luminous barrier hydration without clogging pores.";
      } else if (lower.includes('hair') || lower.includes('lash') || lower.includes('brow') || lower.includes('nu-cil')) {
        reply = "Obagi Nu-Cil® uses proprietary NouriPlex® technology combining biotin, panthenol, and bioactive lipid compounds to noticeably improve density and fullness.";
      } else if (lower.includes('price') || lower.includes('buy') || lower.includes('order')) {
        reply = "Obagi Medical India products are distributed exclusively by authorized clinics and medical aesthetic physicians. Please use the 'Find Obagi' section to locate an official provider near you.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
          style={{ backgroundColor: theme.deepNavy }}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide">Ask Obagi AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-fade-in" style={{ borderColor: theme.borderColor }}>
          {/* Header */}
          <div className="p-4 text-white flex items-center justify-between" style={{ backgroundColor: theme.deepNavy }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Obagi Clinical AI</h4>
                <p className="text-[10px] text-white/70">Always online • Clinical Knowledge Base</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-900 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-indigo-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border shadow-sm rounded-tl-none'
                  }`}
                  style={m.sender === 'user' ? { backgroundColor: theme.primaryNavy } : { borderColor: theme.borderColor }}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2" style={{ borderColor: theme.borderColor }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Nu-Derm, Hydro-Drops..."
              className="flex-1 px-3.5 py-2 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="p-2 rounded-full text-white transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: theme.primaryNavy }}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
