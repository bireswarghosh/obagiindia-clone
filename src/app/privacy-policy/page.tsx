import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { getPageSections } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Privacy Policy | Ryan Dermaceutics',
  description: 'How Ryan Dermaceutics collects, uses and protects your information.',
};

const DEFAULT_SECTIONS = [
  {
    h: 'Information we collect',
    p: 'We collect information you share directly — such as your name, email address, phone number and professional details when you submit an enquiry, subscribe to updates or contact medical information services. We also collect limited technical data (device, browser, pages visited) to operate and improve this website.',
  },
  {
    h: 'How we use it',
    p: 'Your information is used to respond to enquiries, share requested product and clinical information, improve our services and comply with legal obligations. We do not sell your personal information to third parties.',
  },
  {
    h: 'Medical and professional queries',
    p: 'Queries submitted through medical-information channels may be retained for pharmacovigilance and quality purposes as required by applicable regulation.',
  },
  {
    h: 'Data security & retention',
    p: 'We apply reasonable administrative and technical safeguards to protect your information and retain it only for as long as necessary for the purposes stated above.',
  },
  {
    h: 'Your rights',
    p: 'You may request access, correction or deletion of your personal information by writing to us (see Contact page). We will respond within a reasonable timeframe.',
  },
];

export default async function PrivacyPage() {
  let title = 'Privacy Policy';
  let eyebrow = 'Legal';
  let sectionsList = DEFAULT_SECTIONS;

  try {
    const pageSecs = await getPageSections('privacy-policy');
    if (pageSecs.content) {
      if (pageSecs.content.title) title = pageSecs.content.title;
      if (pageSecs.content.subtitle) eyebrow = 'Legal';
      if (Array.isArray(pageSecs.content.extra_data?.sections)) {
        sectionsList = pageSecs.content.extra_data.sections;
      }
    }
  } catch (e) {}

  return (
    <>
      <RyanHeader />
      <main className="bg-slate-50">
        <div className="bg-gradient-to-r from-[#0e4f63] via-[#006070] to-[#0e4f63] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <p className="text-[11px] font-bold tracking-widest uppercase text-teal-200">{eyebrow}</p>
            <h1 className="text-2xl sm:text-4xl font-bold mt-2">{title}</h1>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
          {sectionsList.map((s) => (
            <section key={s.h} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#004f5e]">{s.h}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">{s.p}</p>
            </section>
          ))}
          <p className="text-xs text-slate-500">
            Privacy questions? <Link href="/contact-us" className="text-[#00768a] font-semibold hover:underline">Contact us</Link>.
          </p>
        </div>
      </main>
      <RyanFooter />
    </>
  );
}
