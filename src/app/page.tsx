'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroMorph from '@/components/HeroMorph';
import TrustBanner from '@/components/TrustBanner';
import HistorySection from '@/components/HistorySection';
import AboutSection from '@/components/AboutSection';
import ResearchSection from '@/components/ResearchSection';
import CardStackSection from '@/components/CardStackSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import AskAiWidget from '@/components/AskAiWidget';
import { defaultSiteData } from '@/data/default-content';
import { FullSiteData } from '@/types/content';
import Link from 'next/link';
import { 
  Stethoscope, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export default function HomePage() {
  const [siteData, setSiteData] = useState<FullSiteData>(defaultSiteData);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    organization: '',
    city: '',
    state: '',
    enquiryType: 'Product Enquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const mergeSafe = (prev: FullSiteData, incoming: any): FullSiteData => ({
      ...prev,
      ...incoming,
      history: {
        ...prev.history,
        ...(incoming.history || {}),
        galleryImages: incoming.history?.galleryImages && Array.isArray(incoming.history.galleryImages) && incoming.history.galleryImages.length > 0
          ? incoming.history.galleryImages
          : prev.history.galleryImages
      },
      research: {
        ...prev.research,
        ...(incoming.research || {}),
        items: incoming.research?.items && Array.isArray(incoming.research.items) && incoming.research.items.length > 0
          ? incoming.research.items
          : prev.research.items
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
        navItems: incoming.header?.navItems && Array.isArray(incoming.header.navItems) && incoming.header.navItems.length > 0
          ? incoming.header.navItems
          : prev.header.navItems
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
    });

    try {
      // 1. Check local storage overrides from admin
      const local = localStorage.getItem('obagi_site_data');
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setSiteData(prev => mergeSafe(prev, parsed));
        } catch (e) {}
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
    setFormSubmitted(true);
  };

  const { theme, header, hero, trustBanner, history, about, research, stickyCircle, cardsSection, newsletter, footer } = siteData;

  return (
    <main className="min-h-screen relative flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* 1. Dynamic Header with Top Mini Bar */}
      <Header header={header} theme={theme} />

      {/* 2. Hero Scroll Morph (GSAP 3D Circle Shrink Morph) */}
      <HeroMorph hero={hero} theme={theme} />

      {/* 3. Slogan & Core Pillars Banner ("SCIENCE THAT UNDERSTANDS SKIN") */}
      <TrustBanner trust={(trustBanner || defaultSiteData.trustBanner)!} theme={theme} />

      {/* 4. Our Story (From Content_Home.docx) */}
      <HistorySection history={history} theme={theme} />

      {/* 5. Scientific Philosophy & Standards */}
      <AboutSection about={about} theme={theme} />

      {/* 6. Research & Development (3 Lab Cards with Blur/Zoom Effects) */}
      <ResearchSection research={research} theme={theme} />

      {/* 7. 3D Perspective Card Stack + Expanding Background Circle + Interactive Popups */}
      <CardStackSection
        cardsSection={cardsSection}
        stickyCircle={stickyCircle || defaultSiteData.stickyCircle!}
        theme={theme}
      />

      {/* 8. Doctor Portal Quick Access Hub */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#eaf4f7] via-[#f1f9fb] to-white border-y border-teal-100/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#00768a] bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              FOR HEALTHCARE PRACTITIONERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003d4d] uppercase tracking-tight">
              Dermatology Practice & Clinical Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Empowering dermatologists with comprehensive product monographs, structured reference libraries, and official prescribing information.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/for-doctors/therapeutic-resources"
              className="p-6 rounded-2xl bg-white border border-teal-100/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-[#00768a] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Therapeutic Guides
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evidence-based diagnostic and treatment approaches across acne, hair disorders, and inflammatory dermatoses.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#00768a]">
                <span>Explore Guides</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/products"
              className="p-6 rounded-2xl bg-white border border-teal-100/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00768a] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Product Monographs (53)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Full formulations, compositions, clinical pearls, indications, and administration guidelines.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#00768a]">
                <span>View All 53</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/for-doctors/prescribing-information"
              className="p-6 rounded-2xl bg-white border border-teal-100/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Prescribing Info (PI)
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Official Schedule H / Rx prescribing documentation and safety profiles with instant PI view.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <span>View Prescribing Info</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/for-doctors/reference-library"
              className="p-6 rounded-2xl bg-gradient-to-br from-[#003d4d] to-[#005c6e] text-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-teal-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">NEW MODULE</span>
                <h3 className="font-bold text-sm text-white">
                  Reference Library
                </h3>
                <p className="text-xs text-teal-100/80 leading-relaxed">
                  Searchable dermatological reference library covering 10 therapeutic disease areas.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-1.5 text-xs font-bold text-teal-200">
                <span>Search Library</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Contact & Clinical Inquiries Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                  CONTACT & MEDICAL INQUIRIES
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-tight">
                  Connect with Ryan Dermaceutics
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Our medical affairs and partner relations desk is available to assist clinicians, dermatologists, and healthcare distributors.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Support</span>
                    <span className="font-bold text-slate-800">+91 33 2400 0000 / +91 22 6828 0000</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Medical Affairs Email</span>
                    <span className="font-bold text-slate-800">medinfo@ryandermaceutics.com</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Division Office</span>
                    <span className="font-bold text-slate-800">Ryan Dermaceutics (A Division of Ethics Medinova Pvt. Ltd.)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Working Hours</span>
                    <span className="font-bold text-slate-800">Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide mb-4">
                  Send Us a Clinical / Partner Inquiry
                </h3>

                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">Thank you for your inquiry</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Our medical affairs team has received your message and will respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-[#00768a] text-white text-xs font-bold"
                    >
                      Submit Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. / Mr. / Ms."
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="e.g. Dermatologist / Clinic Head"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Organization / Clinic *</label>
                        <input
                          type="text"
                          required
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Clinic or Hospital Name"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                          placeholder="City"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                          placeholder="State"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Enquiry Type *</label>
                        <select
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={handleInputChange}
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a] cursor-pointer"
                        >
                          <option value="Product Enquiry">Product Formulation Query</option>
                          <option value="Distributor Partnership">Distribution / Stockist Partnership</option>
                          <option value="Business Enquiry">Institutional Supply</option>
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
                        placeholder="Please write your inquiry or clinical requirement..."
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      Submit Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Functional Newsletter Subscription */}
      <NewsletterSection newsletter={newsletter} theme={theme} />

      {/* 11. Footer */}
      <Footer footer={footer} theme={theme} />

      {/* 12. Floating Interactive Ryan Clinical AI */}
      <AskAiWidget enabled={footer.askAiEnabled} theme={theme} />
    </main>
  );
}
