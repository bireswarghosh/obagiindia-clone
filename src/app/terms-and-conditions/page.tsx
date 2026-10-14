import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { getPageSections } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Terms & Conditions | Ryan Dermaceutics',
  description: 'Terms and conditions for using the Ryan Dermaceutics website.',
};

const DEFAULT_SECTIONS = [
  {
    h: 'Use of this website',
    p: 'This website provides general information about Ryan Dermaceutics, a specialized dermatology division of Ethics Medinova Pvt. Ltd., and its product portfolio. Content here is intended for healthcare professionals and general visitors in India and does not replace professional medical advice, diagnosis or treatment.',
  },
  {
    h: 'Product information',
    p: 'Product descriptions, prescribing information and monographs are published for educational purposes. Availability, pack sizes and prescribing status may change. Always refer to the current package insert and consult a qualified dermatologist before use.',
  },
  {
    h: 'Intellectual property',
    p: 'All text, graphics, logos, images and data compilations on this site are the property of Ryan Dermaceutics / Ethics Medinova Pvt. Ltd. or its licensors. Reproduction without prior written permission is prohibited.',
  },
  {
    h: 'External links',
    p: 'Links to third-party websites are provided for convenience. We do not control or endorse their content and accept no responsibility for them.',
  },
  {
    h: 'Limitation of liability',
    p: 'To the fullest extent permitted by law, Ryan Dermaceutics shall not be liable for any direct or indirect loss arising from the use of, or reliance on, this website.',
  },
  {
    h: 'Governing law',
    p: 'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at Kolkata, West Bengal.',
  },
];

export default async function TermsPage() {
  let title = 'Terms & Conditions';
  let eyebrow = 'Legal';
  let sectionsList = DEFAULT_SECTIONS;

  try {
    const pageSecs = await getPageSections('terms-and-conditions');
    if (pageSecs.content) {
      if (pageSecs.content.title) title = pageSecs.content.title;
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
            Questions? <Link href="/contact-us" className="text-[#00768a] font-semibold hover:underline">Contact us</Link>.
          </p>
        </div>
      </main>
      <RyanFooter />
    </>
  );
}
