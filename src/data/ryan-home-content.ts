export interface RyanPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  iconName: string;
  popupTitle: string;
  popupBadge: string;
  popupLead: string;
  popupPoints: string[];
  popupClinicalNote: string;
}

export interface RyanHomeContent {
  slogan: {
    bannerTop: string;
    mainSlogan: string;
    subSlogan1: string;
    subSlogan2: string;
    subSlogan3: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
  ourStory: {
    badge: string;
    title: string;
    leadParagraph: string;
    fullParagraph: string;
    quote: string;
  };
  pillars: RyanPillar[];
  qualitySection: {
    badge: string;
    title: string;
    description: string;
    standards: { title: string; desc: string }[];
  };
  contactInfo: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    phone: string;
    hours: string;
  };
}

export const defaultRyanHomeContent: RyanHomeContent = {
  slogan: {
    bannerTop: 'SCIENCE THAT UNDERSTANDS SKIN',
    mainSlogan: 'SCIENCE THAT UNDERSTANDS SKIN',
    subSlogan1: 'Science | Efficacy',
    subSlogan2: 'Skin Health | Quality',
    subSlogan3: 'Clinical Confidence'
  },
  hero: {
    badge: 'SPECIALIZED DERMATOLOGY PORTFOLIO',
    titleLine1: 'Focused on Dermatology.',
    titleLine2: 'Driven by Quality.',
    description: 'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas. Our portfolio is designed around the evolving needs of dermatology practice and professional healthcare.',
    primaryCtaText: 'Explore Products',
    primaryCtaLink: '/products',
    secondaryCtaText: 'Discover Ryan',
    secondaryCtaLink: '/about'
  },
  ourStory: {
    badge: 'OUR STORY',
    title: 'Advancing Dermatological Care Through Purposeful Science',
    leadParagraph: 'At Ryan Dermaceutics, our purpose extends beyond treating the visible signs of a skin disorder.',
    fullParagraph: 'We strive to understand the clinical challenges behind dermatological conditions and provide therapeutic solutions that address them with precision, consistency and purpose. Our portfolio is built around scientifically informed formulations, quality-focused manufacturing and the evolving needs of dermatology practice. We work to support physicians with dependable therapeutic choices across inflammatory, infectious, allergic, pigmentary and hair-and-scalp disorders.',
    quote: 'Dedicated to clinician partnership, pharmaceutical excellence, and patient well-being.'
  },
  pillars: [
    {
      id: 'dermatology-focus',
      number: '01',
      title: 'Dermatology Focus',
      tagline: 'Therapeutic Specialization',
      shortDescription: 'A specialized division built exclusively around the needs of dermatology and skin-health clinical practice.',
      iconName: 'Target',
      popupTitle: 'Dermatology Focus & Therapeutic Scope',
      popupBadge: 'Core Pillar 01',
      popupLead: 'Targeted therapeutic coverage designed exclusively for dermatologists and skin health specialists.',
      popupPoints: [
        'Dedicated portfolio spanning 10 key therapeutic areas: Acne, Antifungal, Antibacterial, Corticosteroids, Allergy & Pruritus, Immunomodulators, Pigmentation, Hair & Scalp, Anti-Parasitic, and Supportive Care.',
        'Continuous clinical consultation with practicing dermatologists to identify formulation gaps and unmet therapeutic challenges.',
        'Balanced dual approach offering both acute disease-control interventions and long-term maintenance regimens.',
        'Formulated to respect epidermal barrier integrity while maximizing active drug bio-delivery.'
      ],
      popupClinicalNote: 'Every molecule and vehicle in the Ryan portfolio is curated to address specific clinical endpoints in daily outpatient dermatology practice.'
    },
    {
      id: 'compounding-formulation',
      number: '02',
      title: 'Compounding & Formulation Profile',
      tagline: 'Advanced Delivery Vehicles',
      shortDescription: 'Precision vehicle engineering ensuring optimal skin penetration, sustained release, and high patient compliance.',
      iconName: 'Layers',
      popupTitle: 'Formulation Profile & Vehicle Engineering',
      popupBadge: 'Core Pillar 02',
      popupLead: 'The therapeutic vehicle is as critical as the active pharmaceutical ingredient.',
      popupPoints: [
        'Proprietary vehicle selection tailored to individual skin types: non-greasy micro-emulsions, hydrophilic vanishing creams, occlusive barrier ointments, and cooling hydrogels.',
        'Advanced solubilization technologies to prevent crystallization and optimize skin surface spreading.',
        'Hypoallergenic formulation discipline: fragrance-free, paraben-safe, non-comedogenic, and low-irritancy profiles.',
        'Oral dosage optimization: micro-encapsulated softgels, dispersible tablets, and micronized actives for rapid systemic absorption.'
      ],
      popupClinicalNote: 'Patient adherence in dermatology depends heavily on cosmetic elegance; our formulations combine high active potency with superior sensorial tolerance.'
    },
    {
      id: 'quality-achievement',
      number: '03',
      title: 'Quality-Driven Achievement',
      tagline: 'cGMP Pharmaceutical Excellence',
      shortDescription: 'Rigorous analytical standards, multi-stage stability testing, and cGMP certified manufacturing.',
      iconName: 'ShieldCheck',
      popupTitle: 'Pharmaceutical Quality & Manufacturing Standards',
      popupBadge: 'Core Pillar 03',
      popupLead: 'Uncompromising pharmaceutical rigor across every batch, formulation, and packaging unit.',
      popupPoints: [
        'Manufactured strictly within certified WHO-cGMP and ISO compliant pharmaceutical facilities.',
        'Exhaustive accelerated and real-time ICH stability profiling ensuring chemical stability across variable climates and shelf lives.',
        'Multi-point analytical validation: HPLC assay testing, viscosity mapping, pH stability, and complete microbial limit controls.',
        'Tamper-evident, protective medical-grade packaging shielding photosensitive and oxygen-sensitive actives.'
      ],
      popupClinicalNote: 'Physicians can prescribe Ryan Dermaceutics products with absolute clinical confidence regarding potency, uniformity, and batch-to-batch repeatability.'
    },
    {
      id: 'healthcare-partnership',
      number: '04',
      title: 'Professional Healthcare Partnership',
      tagline: 'Scientific Exchange & Support',
      shortDescription: 'Bridging evidence-based medicine and clinical practice with transparent monographs and medical information services.',
      iconName: 'Users',
      popupTitle: 'Professional Healthcare Partnership & Doctor Portal',
      popupBadge: 'Core Pillar 04',
      popupLead: 'A collaborative commitment to empowering clinicians with transparent scientific and clinical data.',
      popupPoints: [
        'Dedicated Doctor Portal providing immediate digital access to 53+ complete Product Monographs and official Prescribing Information.',
        'Therapeutic Reference Guides and Clinical Insights synthesized from latest peer-reviewed dermatology literature.',
        'Direct Medical Information Service for medical queries, ingredient clarifications, dosage adjustments, and adverse event reporting.',
        'Commitment to continuous medical education (CME) and collaborative clinician feedback loops.'
      ],
      popupClinicalNote: 'We operate as an ethical scientific partner to the dermatology community, prioritizing scientific accuracy and clinician trust above all else.'
    }
  ],
  qualitySection: {
    badge: 'QUALITY & COMPLIANCE FRAMEWORK',
    title: 'Engineered to Strict Pharmaceutical Standards',
    description: 'Our commitment to skin health is grounded in systematic quality control, validated formulation chemistry, and adherence to national and international pharmaceutical norms.',
    standards: [
      { title: 'WHO-cGMP Certified', desc: 'Manufactured under validated Good Manufacturing Practices ensuring batch uniformity.' },
      { title: 'ICH Stability Compliant', desc: 'Real-time and accelerated stability tested for potency across shelf lives.' },
      { title: 'Analytical Assay Verified', desc: 'High-performance liquid chromatography (HPLC) testing on every batch.' },
      { title: 'Dermatologist Evaluated', desc: 'High cutaneous tolerance, non-irritating vehicles designed for compromised skin.' }
    ]
  },
  contactInfo: {
    title: 'Healthcare Professional Enquiries',
    subtitle: 'Connect with our medical affairs, scientific liaison, or distribution teams.',
    address: 'Ryan Dermaceutics, Specialized Dermatology Division, Mumbai, Maharashtra, India',
    email: 'info@ryandermaceutics.com',
    phone: '+91 (022) 4890-7800',
    hours: 'Monday – Saturday: 9:00 AM – 6:00 PM IST'
  }
};
