// Data definitions and default content for the "For Doctors" landing page
// Pixel-perfect match with "Content_For Doctors.png"

export interface DoctorHeroFeature {
  id: string;
  title: string;
  iconName: 'Stethoscope' | 'FileText' | 'BookOpen' | 'Users';
}

export interface DoctorQuickAccessCard {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  image: string;
}

export interface DoctorTherapeuticCategory {
  id: string;
  name: string;
  image: string;
  link: string;
  actionText: string;
}

export interface DoctorScienceFeature {
  id: string;
  title: string;
  iconName: 'FlaskConical' | 'Network' | 'ShieldCheck' | 'Users';
}

export interface DoctorResourceCard {
  id: string;
  tag: string;
  tagColor?: string;
  title: string;
  linkText: string;
  linkUrl: string;
  image: string;
}

export interface RyanDoctorsPageContent {
  hero: {
    badge: string;
    heading: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    doctorImage: string;
    features: DoctorHeroFeature[];
  };
  quickAccess: {
    badge: string;
    heading: string;
    subheading: string;
    cards: DoctorQuickAccessCard[];
  };
  therapeuticAreas: {
    badge: string;
    heading: string;
    subheading: string;
    viewAllText: string;
    viewAllLink: string;
    categories: DoctorTherapeuticCategory[];
  };
  scientificApproach: {
    badge: string;
    heading: string;
    description: string;
    image: string;
    features: DoctorScienceFeature[];
  };
  stayUpdated: {
    badge: string;
    heading: string;
    subheading: string;
    viewAllText: string;
    viewAllLink: string;
    articles: DoctorResourceCard[];
  };
  partnerBanner: {
    badge: string;
    heading: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    image: string;
  };
}

export const DEFAULT_DOCTORS_PAGE_CONTENT: RyanDoctorsPageContent = {
  hero: {
    badge: 'PROFESSIONAL RESOURCES',
    heading: 'FOR DERMATOLOGISTS AND HEALTHCARE PROFESSIONALS',
    description:
      'Explore our dermatology portfolio, product information and professional resources through a platform designed to support your clinical practice.',
    primaryCtaText: 'EXPLORE PRODUCT PORTFOLIO',
    primaryCtaLink: '/products',
    secondaryCtaText: 'CONTACT OUR TEAM',
    secondaryCtaLink: '/for-doctors/medical-information',
    doctorImage: '/ryan/doctors/hero-doctor.png',
    features: [
      {
        id: 'feat-1',
        title: 'COMPREHENSIVE DERMATOLOGY PORTFOLIO',
        iconName: 'Stethoscope'
      },
      {
        id: 'feat-2',
        title: 'DETAILED PRODUCT INFORMATION',
        iconName: 'FileText'
      },
      {
        id: 'feat-3',
        title: 'CLINICAL RESOURCES AND UPDATES',
        iconName: 'BookOpen'
      },
      {
        id: 'feat-4',
        title: 'DEDICATED PROFESSIONAL SUPPORT',
        iconName: 'Users'
      }
    ]
  },
  quickAccess: {
    badge: 'QUICK ACCESS',
    heading: 'HOW CAN WE SUPPORT YOU?',
    subheading: 'Find product information, therapeutic insights and professional resources — all in one place.',
    cards: [
      {
        id: 'qa-1',
        title: 'PRODUCT PORTFOLIO',
        description:
          'Explore our complete dermatology portfolio across topical, oral, hair and scalp categories.',
        linkText: 'BROWSE PRODUCTS',
        linkUrl: '/products',
        image: '/ryan/doctors/qa-portfolio.png'
      },
      {
        id: 'qa-2',
        title: 'PRODUCT MONOGRAPHS',
        description:
          'Download detailed product monographs with composition, dosage and key information.',
        linkText: 'VIEW MONOGRAPHS',
        linkUrl: '/for-doctors/prescribing-information',
        image: '/ryan/doctors/qa-monographs.png'
      },
      {
        id: 'qa-3',
        title: 'THERAPEUTIC RESOURCES',
        description:
          'Access clinical insights, treatment support materials and dermatology education resources.',
        linkText: 'EXPLORE RESOURCES',
        linkUrl: '/for-doctors/therapeutic-resources',
        image: '/ryan/doctors/qa-therapeutic.png'
      },
      {
        id: 'qa-4',
        title: 'MEDICAL INFORMATION',
        description:
          'Connect with our team for product-related medical queries and scientific information.',
        linkText: 'CONTACT US',
        linkUrl: '/for-doctors/medical-information',
        image: '/ryan/doctors/qa-medical.png'
      }
    ]
  },
  therapeuticAreas: {
    badge: 'EXPLORE BY THERAPEUTIC AREA',
    heading: 'FIND PRODUCTS FOR YOUR CLINICAL NEEDS',
    subheading: 'Discover our portfolio through key dermatological therapeutic categories.',
    viewAllText: 'VIEW ALL THERAPEUTIC AREAS',
    viewAllLink: '/for-doctors/therapeutic-resources',
    categories: [
      {
        id: 'cat-acne',
        name: 'Acne & Acne Management',
        image: '/ryan/doctors/cat-acne.png',
        link: '/products?area=Acne',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-antifungal',
        name: 'Antifungal',
        image: '/ryan/doctors/cat-antifungal.png',
        link: '/products?area=Antifungal',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-antibacterial',
        name: 'Antibacterial & Anti-infective',
        image: '/ryan/doctors/cat-antibacterial.png',
        link: '/products?area=Antibacterial',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-corticosteroids',
        name: 'Corticosteroids',
        image: '/ryan/doctors/cat-corticosteroids.png',
        link: '/products?area=Corticosteroids',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-allergy',
        name: 'Allergy & Pruritus',
        image: '/ryan/doctors/cat-allergy.png',
        link: '/products?area=Allergy%20%26%20Pruritus',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-hair',
        name: 'Hair & Scalp',
        image: '/ryan/doctors/cat-hair.png',
        link: '/products?area=Hair%20%26%20Scalp',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-immuno',
        name: 'Immunomodulatory Dermatology',
        image: '/ryan/doctors/cat-immuno.png',
        link: '/products?area=Immunomodulator',
        actionText: 'EXPLORE'
      },
      {
        id: 'cat-pigmentation',
        name: 'Pigmentation & Skin Renewal',
        image: '/ryan/doctors/cat-pigmentation.png',
        link: '/products?area=Pigmentation',
        actionText: 'EXPLORE'
      }
    ]
  },
  scientificApproach: {
    badge: 'SCIENTIFIC APPROACH',
    heading: 'BUILT ON SCIENCE.<br />FOCUSED ON DERMATOLOGY.',
    description:
      'Our products are developed with a focus on clinical relevance, safety and consistent quality to support dermatologists in everyday practice.',
    image: '/ryan/doctors/science-microscope.png',
    features: [
      {
        id: 'sci-1',
        title: 'QUALITY MANUFACTURING',
        iconName: 'FlaskConical'
      },
      {
        id: 'sci-2',
        title: 'EVIDENCE-BASED PORTFOLIO',
        iconName: 'Network'
      },
      {
        id: 'sci-3',
        title: 'REGULATORY COMPLIANCE',
        iconName: 'ShieldCheck'
      },
      {
        id: 'sci-4',
        title: 'PROFESSIONAL PARTNERSHIP',
        iconName: 'Users'
      }
    ]
  },
  stayUpdated: {
    badge: 'FEATURED PROFESSIONAL RESOURCES',
    heading: 'STAY UPDATED',
    subheading: 'Access useful resources designed for dermatology practice.',
    viewAllText: 'VIEW ALL RESOURCES',
    viewAllLink: '/for-doctors/therapeutic-resources',
    articles: [
      {
        id: 'art-1',
        tag: 'CLINICAL INSIGHTS',
        tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
        title: 'Management of Common Dermatological Conditions',
        linkText: 'READ ARTICLE',
        linkUrl: '/for-doctors/therapeutic-resources/insights/understanding-acne',
        image: '/ryan/doctors/res-acne.png'
      },
      {
        id: 'art-2',
        tag: 'PATIENT EDUCATION',
        tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
        title: 'Role of Sunscreens in Skin Protection',
        linkText: 'READ ARTICLE',
        linkUrl: '/for-doctors/reference-library/pigmentation-and-melasma',
        image: '/ryan/doctors/res-sunscreen.png'
      },
      {
        id: 'art-3',
        tag: 'THERAPEUTIC FOCUS',
        tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
        title: 'Approaches to Hair and Scalp Care',
        linkText: 'READ ARTICLE',
        linkUrl: '/for-doctors/therapeutic-resources/guides/hair-and-scalp-disorders',
        image: '/ryan/doctors/res-hair.png'
      },
      {
        id: 'art-4',
        tag: 'PRODUCT UPDATES',
        tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
        title: 'Latest Additions to Our Dermatology Portfolio',
        linkText: 'READ MORE',
        linkUrl: '/products',
        image: '/ryan/doctors/res-updates.png'
      }
    ]
  },
  partnerBanner: {
    badge: "LET'S STAY CONNECTED",
    heading: 'PARTNERING FOR BETTER SKIN HEALTH',
    description:
      'For product enquiries, medical information or to connect with our team, we are here to support you.',
    primaryCtaText: 'CONTACT OUR TEAM',
    primaryCtaLink: '/for-doctors/medical-information',
    secondaryCtaText: 'EXPLORE PRODUCTS',
    secondaryCtaLink: '/products',
    image: '/ryan/doctors/partner-doctor.png'
  }
};
