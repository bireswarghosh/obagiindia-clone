import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { getPageSections } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Accessibility Statement | Ryan Dermaceutics',
  description: 'Our commitment to an accessible website for all visitors.',
};

const DEFAULT_POINTS = [
  'Readable type scales and strong colour contrast across pages.',
  'Keyboard-navigable menus, dialogs and forms with visible focus states.',
  'Descriptive alt text on meaningful imagery and labelled form fields.',
  'Responsive layouts that work from mobile to desktop viewports.',
  'Ongoing reviews of new content and features against common accessibility practices (WCAG 2.1 AA as a guide).',
];

export default async function AccessibilityPage() {
  let title = 'Accessibility Statement';
  let eyebrow = 'Legal';
  let commitmentBody = 'Ryan Dermaceutics is committed to making this website usable by everyone, including visitors using assistive technologies. We aim to meet widely recognised accessibility practices:';
  let points = DEFAULT_POINTS;

  try {
    const pageSecs = await getPageSections('accessibility-statement');
    if (pageSecs.content) {
      if (pageSecs.content.title) title = pageSecs.content.title;
      if (pageSecs.content.body_text) commitmentBody = pageSecs.content.body_text;
      if (Array.isArray(pageSecs.content.extra_data?.points)) {
        points = pageSecs.content.extra_data.points;
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
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#004f5e]">Our commitment</h2>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              {commitmentBody}
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-slate-600">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#004f5e]">Feedback</h2>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              If you face any barrier while using this site, please{' '}
              <Link href="/contact-us" className="text-[#00768a] font-semibold hover:underline">contact us</Link>{' '}
              with the page URL and a description of the issue — we will address it promptly.
            </p>
          </section>
        </div>
      </main>
      <RyanFooter />
    </>
  );
}
