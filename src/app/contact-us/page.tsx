import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { getPageSections } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact Us | Ryan Dermaceutics',
  description: 'Contact Ryan Dermaceutics — medical information, product queries and partnerships.',
};

const DEFAULT_CARDS = [
  {
    icon: Mail,
    h: 'Medical Information',
    p: 'Product queries, safety reports and clinical support for healthcare professionals.',
    href: 'mailto:medinfo@ryandermaceutics.com',
    cta: 'medinfo@ryandermaceutics.com',
  },
  {
    icon: Phone,
    h: 'Phone',
    p: 'Reach our desk during business hours (Mon–Sat).',
    href: 'tel:+913324000000',
    cta: '+91 33 2400 0000',
  },
  {
    icon: MapPin,
    h: 'Offices',
    p: 'Kolkata & Mumbai, India.',
    href: '/about',
    cta: 'More about us',
  },
];

export default async function ContactPage() {
  let heroTitle = 'Contact Us';
  let heroSubtitle = 'Ryan Dermaceutics · A Specialized Division of Ethics Medinova Pvt. Ltd.';
  let eyebrow = 'Get in touch';
  let cards = DEFAULT_CARDS;

  try {
    const sections = await getPageSections('contact');
    if (sections.hero) {
      if (sections.hero.title) heroTitle = sections.hero.title;
      if (sections.hero.subtitle) heroSubtitle = sections.hero.subtitle;
      if (sections.hero.body_text) eyebrow = sections.hero.body_text;
    }
    if (sections.cards?.extra_data?.cards && Array.isArray(sections.cards.extra_data.cards)) {
      cards = sections.cards.extra_data.cards.map((c: any, i: number) => ({
        icon: i === 0 ? Mail : i === 1 ? Phone : MapPin,
        h: c.h,
        p: c.p,
        href: c.href,
        cta: c.cta,
      }));
    }
  } catch (e) {}

  return (
    <>
      <RyanHeader />
      <main className="bg-slate-50">
        <div className="bg-gradient-to-r from-[#0e4f63] via-[#006070] to-[#0e4f63] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-[11px] font-bold tracking-widest uppercase text-teal-200">{eyebrow}</p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-2">{heroTitle}</h1>
            <p className="text-sm text-teal-100 mt-2">{heroSubtitle}</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <a
              key={c.h}
              href={c.href}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition group"
            >
              <c.icon className="w-6 h-6 text-[#00768a]" />
              <h2 className="text-base font-bold text-[#004f5e] mt-3">{c.h}</h2>
              <p className="text-sm text-slate-600 mt-1.5">{c.p}</p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00768a] mt-3">
                {c.cta} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </span>
            </a>
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 text-center">
          <Link
            href="/for-doctors/medical-information"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#00768a] hover:bg-[#006070] rounded-xl shadow-sm transition"
          >
            Medical Information Service <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>
      <RyanFooter />
    </>
  );
}
