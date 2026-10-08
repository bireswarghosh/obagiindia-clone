'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroMorph from '@/components/HeroMorph';
import TrustBanner from '@/components/TrustBanner';
import HistorySection from '@/components/HistorySection';
import AboutSection from '@/components/AboutSection';
import ResearchSection from '@/components/ResearchSection';
import CardStackSection from '@/components/CardStackSection';
import DoctorPortalHub from '@/components/DoctorPortalHub';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import AskAiWidget from '@/components/AskAiWidget';
import { defaultSiteData } from '@/data/default-content';
import { FullSiteData } from '@/types/content';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function HomePage() {
  const [siteData, setSiteData] = useState<FullSiteData>(defaultSiteData);

  // Clinical inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    organization: '',
    city: '',
    state: '',
    enquiryType: 'Product Formulation Query',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const mergeSafe = (prev: FullSiteData, incoming: any): FullSiteData => {
      // Discard stale Obagi data
      if (
        incoming?.header?.logoText === 'OBAGI MEDICAL' ||
        incoming?.hero?.heading?.includes('OBAGI') ||
        incoming?.header?.broughtByText?.includes('Specra')
      ) {
        return prev;
      }

      return {
        ...prev,
        ...incoming,
        hero: {
          ...prev.hero,
          ...(incoming.hero || {}),
          heading: incoming.hero?.heading && !incoming.hero.heading.includes('OBAGI')
            ? incoming.hero.heading
            : prev.hero.heading
        },
        history: {
          ...prev.history,
          ...(incoming.history || {}),
          galleryImages: incoming.history?.galleryImages && Array.isArray(incoming.history.galleryImages) && incoming.history.galleryImages.length > 0
            ? incoming.history.galleryImages
            : prev.history.galleryImages
        },
        cardsSection: {
          ...prev.cardsSection,
          ...(incoming.cardsSection || {}),
          cards: incoming.cardsSection?.cards && Array.isArray(incoming.cardsSection.cards) && incoming.cardsSection.cards.length > 0
            ? incoming.cardsSection.cards
            : prev.cardsSection.cards
        },
        header: {
          ...prev.header,
          ...(incoming.header || {}),
          broughtByText: incoming.header?.broughtByText && !incoming.header.broughtByText.includes('Specra')
            ? incoming.header.broughtByText
            : prev.header.broughtByText
        },
        footer: {
          ...prev.footer,
          ...(incoming.footer || {}),
          quickLinks: incoming.footer?.quickLinks && Array.isArray(incoming.footer.quickLinks)
            ? incoming.footer.quickLinks
            : prev.footer.quickLinks,
          socialLinks: incoming.footer?.socialLinks && Array.isArray(incoming.footer.socialLinks)
            ? incoming.footer.socialLinks
            : prev.footer.socialLinks
        }
      };
    };

    try {
      // 1. Purge legacy obagi localStorage if corrupted
      if (typeof window !== 'undefined') {
        const legacy = localStorage.getItem('obagi_site_data');
        if (legacy && (legacy.includes('OBAGI') || legacy.includes('Specra'))) {
          localStorage.removeItem('obagi_site_data');
        }

        const localRyan = localStorage.getItem('ryan_site_data');
        if (localRyan) {
          try {
            const parsed = JSON.parse(localRyan);
            setSiteData(prev => mergeSafe(prev, parsed));
          } catch (e) {}
        }
      }

      // 2. Fetch server updates
      fetch('/api/content')
        .then(res => res.json())
        .then(data => {
          if (data && data.header) {
            setSiteData(prev => mergeSafe(prev, data));
          }
        })
        .catch(() => {});
    } catch (e) {
      console.warn('Error reading dynamic CMS data:', e);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  const {
    theme,
    header,
    hero,
    trustBanner,
    history,
    about,
    research,
    cardsSection,
    stickyCircle,
    newsletter,
    footer
  } = siteData;

  return (
    <main className="min-h-screen relative flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900 bg-white">
      {/* 1. Header with Top Mini Bar, Official Ryan Logo & Clean Navigation (Zero Admin Buttons) */}
      <Header header={header} theme={theme} />

      {/* 2. Hero Section: "SCIENCE THAT UNDERSTAND SKIN" + 3 Pillars (GSAP 3D Circle Shrink Morph) */}
      <HeroMorph hero={hero} theme={theme} />

      {/* 3. Screen 4: #1 Leading Dermatology-Recommended Formulations + 3 Checkmarks */}
      <TrustBanner trust={(trustBanner || defaultSiteData.trustBanner)!} theme={theme} />

      {/* 4. Screen 2: Our Story (Badge, Paragraph, Golden Trophy Box, Image Cards) */}
      <HistorySection history={(history || defaultSiteData.history)!} theme={theme} />

      {/* 5. Screen 3: About Ryan Dermaceutics (Title, Big Quotation Mark, Quote, Paragraph, Badge) */}
      <AboutSection about={(about || defaultSiteData.about)!} theme={theme} />

      {/* 6. Screen 5: Clinical Science & Discovery (3 Lab Cards with Hover Effects) */}
      <ResearchSection research={(research || defaultSiteData.research)!} theme={theme} />

      {/* 7. Screen 6: 3D Perspective Card Stack + Expanding Pink Serum Bubble */}
      <CardStackSection
        cardsSection={cardsSection || defaultSiteData.cardsSection!}
        stickyCircle={stickyCircle || defaultSiteData.stickyCircle!}
        theme={theme}
      />

      {/* 8. Screen 7: Dermatology Practice & Clinical Resources (4 Cards: Guides, Monographs, PI, Library) */}
      <DoctorPortalHub theme={theme} />

      {/* 9. Screen 8: Contact & Clinical Inquiries Section (#contact) */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-start">
            
            {/* Left Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  GET IN TOUCH
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-tight">
                  CONNECT WITH <span className="text-[#00768a]">RYAN DERMACEUTICS</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  We are here to support healthcare professionals, distribution partners and business associates. Get in touch for product information, business enquiries or medical support.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Phone Support</span>
                    <span className="font-bold text-slate-900">+91 33 2400 0000 / +91 22 6828 0000</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Email Support</span>
                    <span className="font-bold text-slate-900">info@ryandermaceutics.com / medinfo@ryandermaceutics.com</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Address</span>
                    <span className="font-bold text-slate-900">Ahmedabad, Gujarat / Kolkata, India</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Working Hours</span>
                    <span className="font-bold text-slate-900">Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form: "SEND US AN ENQUIRY" */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00768a]">QUICK FORM</span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#003d4d] uppercase tracking-wide">
                    SEND US AN ENQUIRY
                  </h3>
                </div>

                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">Thank you for your enquiry</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Your message has been received by our Medical & Partner Support team. We will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-5 py-2 rounded-xl bg-[#00768a] text-white text-xs font-bold hover:bg-[#005f70] transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. / Mr. / Ms."
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Designation / Role *</label>
                        <input
                          type="text"
                          required
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="Dermatologist / Pharmacist / Distributor"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Clinic / Organization *</label>
                        <input
                          type="text"
                          required
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Hospital / Clinic / Enterprise Name"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Your City"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Select State"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Enquiry Type *</label>
                        <select
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={handleInputChange}
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] cursor-pointer transition"
                        >
                          <option value="Product Formulation Query">Product Formulation Query</option>
                          <option value="Distributor Partnership">Distribution / Stockist Partnership</option>
                          <option value="Business Enquiry">Institutional / Hospital Supply</option>
                          <option value="Medical Information">Pharmacovigilance / Medical Affairs</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Message *</label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message..."
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a] transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'SUBMIT ENQUIRY'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Newsletter Subscription */}
      <NewsletterSection newsletter={newsletter} theme={theme} />

      {/* 11. Footer with Ryan Branding (Zero Admin Portal Links) */}
      <Footer footer={footer} theme={theme} />

      {/* 12. Floating Ryan Clinical AI Widget */}
      <AskAiWidget enabled={footer?.askAiEnabled} theme={theme} />
    </main>
  );
}
