'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  BookOpen,
  FileText,
  Book,
  Pill,
  Library,
  Download,
  Search,
  ArrowRight,
  ChevronRight,
  X,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
  Info,
  Stethoscope,
  Microscope,
  FileDown
} from 'lucide-react';

// ==========================================
// DATA DEFINITIONS & PORTFOLIO MAPPING
// ==========================================

interface GuideItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  topics: string[];
  classification: string;
  clinicalPresentation: string;
  treatmentApproaches: string;
  topicalOptions: string[];
  systemicOptions: string[];
  considerations: string;
  maintenance: string;
  patientCounselling: string;
  relatedPortfolio: {
    primary: string[];
    secondary?: string[];
    ctaText: string;
  };
}

const THERAPEUTIC_GUIDES: GuideItem[] = [
  {
    id: 'acne',
    slug: 'acne-and-acne-management',
    title: 'Acne & Acne Management',
    subtitle: 'Clinical overview, management options and treatment considerations.',
    image: '/ryan/guide-acne.jpg',
    description: 'Comprehensive guidelines for classifying comedonal and inflammatory acne, individualized topical/systemic escalation, and long-term barrier maintenance.',
    topics: ['Acne Classification', 'Common Presentations', 'Topical Options', 'Systemic Options', 'Maintenance', 'Patient Counselling'],
    classification: 'Mild (predominantly comedonal), Moderate (papulopustular with localized inflammation), Severe (nodulocystic, conglobate, high scarring risk).',
    clinicalPresentation: 'Closed and open comedones, erythematous inflammatory papules, pustules, deep painful nodules, post-inflammatory erythema (PIE), and hyperpigmentation (PIH).',
    treatmentApproaches: 'Multi-targeted regimen: normalising keratinocyte desquamation, suppressing Cutibacterium acnes colonization, reducing sebum production, and mitigating inflammatory cascades.',
    topicalOptions: [
      'Topical Retinoids (Adapalene 0.1%, Tretinoin): First-line comedolytic and anti-inflammatory agent.',
      'Benzoyl Peroxide (BPO 2.5% - 5%): Potent bactericidal agent without risk of bacterial resistance.',
      'Fixed-Dose Combinations: Adapalene + BPO, Clindamycin + BPO, Clindamycin + Nicotinamide.',
      'Topical Antibiotics: Clindamycin 1% (always combine with BPO to prevent resistance).'
    ],
    systemicOptions: [
      'Oral Antibiotics: Doxycycline (100mg/day), Minocycline, Azithromycin for inflammatory flares.',
      'Oral Retinoids: Isotretinoin (0.5–1.0 mg/kg/day) for severe nodulocystic or refractory acne.',
      'Hormonal Therapy: Anti-androgens or combined oral contraceptives for adult female acne.'
    ],
    considerations: 'Evaluate skin barrier integrity; manage retinoid dermatitis by gradual acclimatization and lipid-replenishing moisturizers.',
    maintenance: 'Continue topical retinoid therapy alone or in combination with azelaic acid for long-term remission prevention.',
    patientCounselling: 'Advise on non-comedogenic cleansers, sun protection, adherence expectations (6-8 weeks minimum for visible results), and avoiding picking.',
    relatedPortfolio: {
      primary: ['CLIXODIN-NT', 'CLIXODIN-AD', 'CLIXODIN-BPO', 'RYAN BPO', 'TACNOID', 'I-TACNOID 20'],
      secondary: ['LIXOCLIN-LB'],
      ctaText: 'VIEW RYAN ACNE PORTFOLIO →'
    }
  },
  {
    id: 'fungal',
    slug: 'fungal-skin-conditions',
    title: 'Fungal Skin Conditions',
    subtitle: 'Types, clinical features, treatment approaches and prevention.',
    image: '/ryan/guide-fungal.jpg',
    description: 'Evidence-based framework for superficial dermatophytosis (Tinea corporis, cruris, pedis), recurrent dermatophytosis, candidal intertrigo, and onychomycosis.',
    topics: ['Superficial Dermatophytosis', 'Tinea Corporis & Cruris', 'Tinea Pedis', 'Candidal Infections', 'Onychomycosis', 'Treatment Duration & Resistance'],
    classification: 'Superficial dermatophytoses (Trichophyton rubrum, T. mentagrophytes), superficial candidiasis (Candida albicans), and Malassezia infections.',
    clinicalPresentation: 'Annular erythematous plaques with raised, active scaling borders and central clearing; macerated interdigital webs; dystrophic nails.',
    treatmentApproaches: 'Confirm mycological status where appropriate. Stratify between topical localized therapy vs oral systemic intervention based on BSA and anatomical extent.',
    topicalOptions: [
      'Allylamines: Terbinafine 1% cream/solution (fungicidal).',
      'Imidazoles: Luliconazole 1%, Ketoconazole 2%, Sertaconazole.',
      'Keratolytics: Salicylic acid combinations for hyperkeratotic presentations.'
    ],
    systemicOptions: [
      'Itraconazole: 100-200 mg daily with fatty meals or SB formulation for superior bioavailability.',
      'Terbinafine: 250 mg daily for dermatophytosis and onychomycosis.',
      'Fluconazole: Weekly or pulse regimens where indicated.'
    ],
    considerations: 'Strictly avoid topical steroid-antifungal cocktails (Tinea Incognito hazard). Treat minimum 1-2 weeks beyond complete clinical clearance.',
    maintenance: 'Barrier hygiene, antifungal dusting powders in moisture-prone body folds, patient clothing disinfection.',
    patientCounselling: 'Wear loose breathable cotton apparel; wash clothes in warm water with thorough drying; do not share towels or personal footwear.',
    relatedPortfolio: {
      primary: ['KEFIN', 'LULIPRIX', 'NIZFIN', 'KEFIN-Z SOAP', 'KEFIN-Z SHAMPOO', 'ITFIN-100', 'ITFIN-200', 'ITFIN SB-130', 'FLUCORION 150', 'T-FIN 250'],
      ctaText: 'VIEW RYAN ANTIFUNGAL PORTFOLIO →'
    }
  },
  {
    id: 'inflammatory',
    slug: 'inflammatory-dermatoses',
    title: 'Inflammatory Dermatoses',
    subtitle: 'Overview, therapeutic approaches and treatment considerations.',
    image: '/ryan/guide-inflammatory.jpg',
    description: 'Diagnostic and therapeutic pathways for Atopic Dermatitis, Contact Dermatitis, Seborrhoeic Dermatitis, and Plaque Psoriasis.',
    topics: ['Atopic Dermatitis', 'Contact Dermatitis', 'Seborrhoeic Dermatitis', 'Psoriasis', 'Steroid Potency Selection', 'Steroid-Sparing Agents'],
    classification: 'Eczematous disorders (Atopic, Allergic, Irritant, Seborrhoeic) and Papulosquamous disorders (Psoriasis vulgaris).',
    clinicalPresentation: 'Pruritic, poorly demarcated erythematous patches with lichenification, xerosis, excoriation, or well-demarcated silvery-white scaled plaques on extensor surfaces.',
    treatmentApproaches: 'Barrier restoration, anti-inflammatory intervention, identification of contact triggers, and structured step-down strategies.',
    topicalOptions: [
      'Topical Corticosteroids: Potency ladder (Clobetasol > Mometasone / Fluticasone > Hydrocortisone).',
      'Topical Calcineurin Inhibitors (TCIs): Tacrolimus 0.03%/0.1% for facial, intertriginous, and pediatric maintenance.',
      'Keratolytics: Salicylic acid, urea for thick hyperkeratotic psoriatic plaques.'
    ],
    systemicOptions: [
      'Targeted Oral Immunomodulators: Tofacitinib, Cyclosporine, Methotrexate.',
      'Short-course systemic corticosteroids only when strictly indicated in acute disabling flares.'
    ],
    considerations: 'Observe Fingertip Unit (FTU) rules; limit superpotent steroids to <2-3 consecutive weeks to prevent atrophy and telangiectasia.',
    maintenance: 'Liberal twice-daily emollient application within 3 minutes of bathing ("Soak & Seal"); proactive weekend TCI therapy.',
    patientCounselling: 'Identify triggers; avoid harsh chemical detergents; use lukewarm water; trim fingernails to avoid excoriation infections.',
    relatedPortfolio: {
      primary: ['TENORIUM', 'TENORIUM-S', 'TENORIUM-S6', 'FLUTIRIUM', 'MOMERIUM', 'TRILOFAZ-B'],
      secondary: ['CINIMUP', 'SUPICID-B', 'ROLITAS 0.1', 'TOFAPLAST'],
      ctaText: 'VIEW INFLAMMATORY DERMATOLOGY PORTFOLIO →'
    }
  },
  {
    id: 'allergy',
    slug: 'allergy-and-pruritus',
    title: 'Allergy & Pruritus',
    subtitle: 'Common conditions, management strategies and patient counselling.',
    image: '/ryan/guide-allergy.jpg',
    description: 'Systematic approach to managing acute and chronic urticaria, pruritus sine materia, contact allergies, and second-generation H1 antihistamine titration.',
    topics: ['Acute & Chronic Urticaria', 'Pruritus Sine Materia', 'Contact Allergens', 'Antihistamine Optimization', 'Patient Counselling'],
    classification: 'Acute Urticaria (<6 weeks), Chronic Spontaneous Urticaria (>6 weeks), Inducible Urticaria (dermographism, cold, cholinergic), and Systemic Pruritus.',
    clinicalPresentation: 'Transient erythematous, edematous wheals with intense pruritus, resolving within 24 hours without residual hyperpigmentation; associated angioedema in up to 40%.',
    treatmentApproaches: 'Exclude underlying systemic, infectious, or autoimmune triggers; step-up guidelines-based nonsedating antihistamines.',
    topicalOptions: [
      'Soothing Emollients with Pramoxine or Menthol.',
      'Mild topical corticosteroids only when secondary eczematous excoriations develop.'
    ],
    systemicOptions: [
      'Second-Generation H1 Antihistamines: Bilastine 20mg, Levocetirizine 5mg, Fexofenadine 180mg.',
      'Dose Up-titration: Escalating modern non-sedating H1 antihistamines up to 4x standard dose.',
      'Leukotriene Receptor Antagonists: Montelukast combination where indicated.'
    ],
    considerations: 'Distinguish between dermatological vs neurogenic, nephrogenic, and cholestatic pruritus. Monitor for anaphylaxis signs.',
    maintenance: 'Continuous daily dosing rather than on-demand symptom dosing to stabilize mast cell degranulation.',
    patientCounselling: 'Maintain a symptom food/activity diary; avoid tight friction clothing; avoid NSAIDs and alcohol which can exacerbate mast cell activation.',
    relatedPortfolio: {
      primary: ['BLISMIN 20', 'BLISMIN M', 'HIVOZIN 5', 'HIVOZIN-M', 'DINOFEX 180'],
      ctaText: 'VIEW ALLERGY & PRURITUS PORTFOLIO →'
    }
  },
  {
    id: 'hair',
    slug: 'hair-and-scalp-disorders',
    title: 'Hair & Scalp Disorders',
    subtitle: 'Treatment approaches, nutritional support and scalp care.',
    image: '/ryan/guide-hair.jpg',
    description: 'Evidence-based algorithms for Androgenetic Alopecia (AGA), Telogen Effluvium, Alopecia Areata, and recalcitrant Seborrhoeic Dermatitis of the scalp.',
    topics: ['Androgenetic Alopecia', 'Telogen Effluvium', 'Alopecia Areata', 'Minoxidil Mechanisms', 'Finasteride Considerations', 'Scalp Barrier & Dandruff'],
    classification: 'Non-scarring alopecias (Male Pattern AGA, Female Pattern FPHL, Telogen Effluvium, Alopecia Areata) and Inflammatory Scalp Dermatoses.',
    clinicalPresentation: 'Bitemporal hairline recession, vertex thinning, widened central scalp part, diffuse telogen shedding with positive pull test, or scalp scaling and erythema.',
    treatmentApproaches: 'Dermoscopic trichoscopy evaluation; combined follicular stimulation, 5-alpha reductase inhibition, and anti-inflammatory scalp treatments.',
    topicalOptions: [
      'Topical Minoxidil (2% & 5% solutions/foams): Vasodilation, potassium channel opening, anagen phase prolongation.',
      'Topical Finasteride + Minoxidil combinations.',
      'Medicated Shampoos: Ketoconazole 2% + Zinc Pyrithione (ZPTO) for Malassezia reduction and anti-DHT scalp benefits.'
    ],
    systemicOptions: [
      'Oral Finasteride: 1mg/day for post-pubertal male AGA.',
      'Nutritional & Peptide Support: Biotin, amino acids, zinc, and micronutrient supplementation.',
      'Low-dose oral minoxidil under close clinical oversight.'
    ],
    considerations: 'Inform patients about expected initial telogen shedding (first 2-6 weeks) when initiating minoxidil; emphasize uninterrupted continuation.',
    maintenance: 'Lifelong topical/systemic regimen for AGA; discontinuation leads to reversal of gained follicular density within 3-6 months.',
    patientCounselling: 'Gentle hair grooming practices; avoid traction hairstyles; scalp sun protection; set realistic regrowth timeframes (4-6 months).',
    relatedPortfolio: {
      primary: ['TRESSICLE 2.5', 'TRESSICLE 5', 'TRESSICLE FORTE', 'TRESSICLE F'],
      secondary: ['BIOSICLE PLUS', 'KEFIN-Z SHAMPOO'],
      ctaText: 'VIEW HAIR & SCALP PORTFOLIO →'
    }
  },
  {
    id: 'pigmentation',
    slug: 'pigmentation-and-skin-renewal',
    title: 'Pigmentation & Skin Renewal',
    subtitle: 'Assessment, treatment approaches and maintenance.',
    image: '/ryan/guide-pigmentation.jpg',
    description: 'Clinical evaluation and multimodality management of Melasma, Post-Inflammatory Hyperpigmentation (PIH), and photoaging.',
    topics: ['Melasma Pathways', 'Post-Inflammatory Hyperpigmentation', 'Topical Depigmentation', 'Retinoids & Cellular Renewal', 'Broad-Spectrum Photoprotection'],
    classification: 'Epidermal, Dermal, and Mixed pigmentary disorders; primary metabolic hypermelanosis vs reactive post-inflammatory hypermelanosis.',
    clinicalPresentation: 'Reticular or confluent light-to-dark brown macules across sun-exposed areas (centrofacial, malar, mandibular) and localized post-lesional pigment deposits.',
    treatmentApproaches: 'Triple-combination or dual-agent depigmenting therapies, tyrosinase inhibition, melanocyte transfer blockade, and strict UV/visible light photoprotection.',
    topicalOptions: [
      'Tyrosinase Inhibitors: Hydroquinone (short-course), Kojic acid, Arbutin, Tranexamic acid.',
      'Cellular Renewal Accelerators: Topical Retinoids (Adapalene, Tretinoin) to enhance epidermal turnover.',
      'Anti-inflammatory agents: Mild topical steroids in monitored short courses.',
      'Broad-Spectrum Sunscreens: Zinc Oxide / Titanium Dioxide with HEV (Blue Light) protection.'
    ],
    systemicOptions: [
      'Oral Tranexamic Acid: 250mg twice daily as second-line adjuvant in refractory melasma (screen for thrombotic risks).',
      'Systemic Antioxidants: Polypodium leucotomos, Glutathione.'
    ],
    considerations: 'Prevent exogenous ochronosis by cycling non-hydroquinone agents; avoid aggressive abrasive procedures in Fitzpatrick skin types IV-VI.',
    maintenance: 'Year-round proactive mineral photoprotection; nightly maintenance retinoid and barrier-fortifying niacinamide.',
    patientCounselling: 'Reapply sunscreen every 2-3 hours outdoors; wear wide-brimmed hats; avoid thermal sauna triggers that provoke vascular melasma flares.',
    relatedPortfolio: {
      primary: ['TACNOID', 'RYOCLIN'],
      secondary: ['CLIXODIN-AD', 'HYDRELIS ALOE'],
      ctaText: 'VIEW PIGMENTATION & SKIN RENEWAL PORTFOLIO →'
    }
  }
];

// ==========================================
// CLINICAL INSIGHTS ARTICLES
// ==========================================

interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readingTime: string;
  summary: string;
  content: {
    overview: string;
    presentation: string;
    differentials: string;
    management: string;
    considerations: string;
    references: string[];
  };
}

const CLINICAL_INSIGHTS: InsightArticle[] = [
  {
    id: 'insight-acne',
    slug: 'understanding-acne',
    title: 'Understanding Acne: From Presentation to Management',
    date: '12 Aug 2026',
    category: 'Clinical Insights',
    image: '/ryan/insight-acne.jpg',
    author: 'Ryan Medical Affairs Dermatology Panel',
    readingTime: '5 min read',
    summary: 'A structured clinical review on classifying comedonal vs inflammatory acne lesions, tailored treatment algorithms, and maintaining long-term skin barrier health.',
    content: {
      overview: 'Acne vulgaris is a multifactorial chronic inflammatory disease of the pilosebaceous unit. Its pathogenesis involves follicular epidermal hyperproliferation, sebum production driven by androgens, proliferation of Cutibacterium acnes, and complex immune cascades.',
      presentation: 'Presents as open/closed comedones (non-inflammatory), followed by erythematous papules, pustules, and deep suppurative cysts or nodules in severe phenotypes.',
      differentials: 'Rosacea, folliculitis (bacterial or Malassezia), perioral dermatitis, drug-induced acneiform eruptions (steroids, EGFR inhibitors).',
      management: 'Mild: Topical retinoid + benzoyl peroxide. Moderate: Fixed-dose topical combination + oral doxycycline/minocycline. Severe: Early initiation of oral isotretinoin to arrest permanent cicatricial scarring.',
      considerations: 'Avoid monotherapy with topical or systemic macrolide/lincosamide antibiotics. Combine with BPO to prevent resistant C. acnes clones.',
      references: [
        'Zaenglein AL, et al. Guidelines of care for the management of acne vulgaris. J Am Acad Dermatol. 2016;74(5):945-973.',
        'Thiboutot D, et al. Practical management of acne for clinicians. J Clin Aesthet Dermatol. 2018;11(2):21-29.'
      ]
    }
  },
  {
    id: 'insight-fungal',
    slug: 'superficial-fungal',
    title: 'Approach to Superficial Fungal Infections',
    date: '05 Aug 2026',
    category: 'Therapeutic Update',
    image: '/ryan/insight-fungal.jpg',
    author: 'Ryan Clinical Research Division',
    readingTime: '6 min read',
    summary: 'Clinical diagnosis, differentiating dermatophytosis from mimicking dermatoses, and evidence-based therapeutic regimens in an era of recalcitrant fungal strains.',
    content: {
      overview: 'Superficial dermatophytoses have witnessed escalating incidence and therapeutic refractoriness across tropical and sub-tropical regions, largely driven by resilient Trichophyton indotineae and misuse of fixed-dose corticosteroid combinations.',
      presentation: 'Tinea corporis and cruris classically present as annular, polycyclic plaques with centrifugally spreading borders, scaling, and central clearing, accompanied by marked pruritus.',
      differentials: 'Nummular eczema, annular erythema, pityriasis rosea, psoriasis, subacute cutaneous lupus erythematosus.',
      management: 'Localized disease: Allylamines (Terbinafine) or novel imidazoles (Luliconazole, Sertaconazole) applied 1-2 cm beyond the active lesion border. Extensive or recurrent: Oral Itraconazole or Terbinafine.',
      considerations: 'Culture and susceptibility where available. Educate against irrational OTC steroid creams which induce Tinea Incognito and dermatophyte invasion into deeper follicular structures.',
      references: [
        'Verma SB, et al. The emergence of recalcitrant dermatophytosis: an international perspective. Int J Dermatol. 2021;60(4):450-459.',
        'Gupta AK, et al. Antifungal agents: an updated review. Br J Dermatol. 2022;186(2):230-244.'
      ]
    }
  },
  {
    id: 'insight-steroids',
    slug: 'corticosteroid-potency',
    title: 'Topical Corticosteroids: Potency and Safe Use',
    date: '28 Jul 2026',
    category: 'Clinical Practice',
    image: '/ryan/insight-steroids.jpg',
    author: 'Ryan Pharmacovigilance & Therapeutics Board',
    readingTime: '4 min read',
    summary: 'Understanding the 7-class potency ranking of topical corticosteroids, the fingertip unit (FTU) method, minimizing cutaneous atrophy, and implementing steroid-free step-downs.',
    content: {
      overview: 'Topical corticosteroids (TCS) remain the bedrock of inflammatory dermatology. Understanding their pharmacodynamics, vehicle influence, and risk-benefit profile ensures maximum therapeutic efficacy without adverse cutaneous sequelae.',
      presentation: 'Indicated across acute and chronic inflammatory dermatoses including atopic dermatitis, contact eczema, lichen planus, and psoriasis plaques.',
      differentials: 'Differentiate steroid-responsive dermatoses from infectious conditions that can be catastrophically masked or worsened by steroids.',
      management: 'Select lowest effective potency. Superpotent (Class I: Clobetasol) reserved for thick acral/scalp plaques; Class II/III (Mometasone, Fluticasone) for trunk/limbs; Class VI/VII (Hydrocortisone) for face and flexures.',
      considerations: 'Educate on the Fingertip Unit (1 FTU = ~0.5g covering two adult palms). Limit continuous ultra-potent application to 2-3 weeks before pulsing or tapering to topical calcineurin inhibitors.',
      references: [
        'Ference JD, Last AR. Choosing topical corticosteroids. Am Fam Physician. 2009;79(2):135-140.',
        'Eichenfield LF, et al. Consensus guidelines for the safe use of topical corticosteroids. J Am Acad Dermatol. 2014;71(1):116-132.'
      ]
    }
  },
  {
    id: 'insight-hair',
    slug: 'hair-loss-patterns',
    title: 'Common Patterns of Hair Loss and Management Approaches',
    date: '20 Jul 2026',
    category: 'Hair & Scalp',
    image: '/ryan/insight-hair.jpg',
    author: 'Ryan Trichology & Scalp Medicine Division',
    readingTime: '6 min read',
    summary: 'Trichoscopic evaluation of androgenetic alopecia vs telogen effluvium, optimizing topical minoxidil compliance, and managing concomitant seborrhoeic scalp inflammation.',
    content: {
      overview: 'Hair loss represents a high-impact psychosomatic dermatological complaint. A rigorous diagnostic approach distinguishes non-cicatricial diffuse shedding from patterned follicular miniaturization.',
      presentation: 'Hamilton-Norwood pattern (male AGA) with frontal and bitemporal recession; Ludwig/Olsen pattern (female AGA) with midline preservation of frontal fringe; diffuse shedding with bulb retention (telogen effluvium).',
      differentials: 'Alopecia areata (incipient diffuse), chronic telogen effluvium, frontal fibrosing alopecia, lichen planopilaris.',
      management: 'Topical Minoxidil (5% for men, 2% or 5% foam for women); oral 5-alpha reductase inhibitors (Finasteride); peptide and nutrient co-factors; anti-inflammatory ketoconazole shampoo.',
      considerations: 'Manage expectations regarding the transient shedding phase at week 3-6. Continuous use is essential to maintain acquired follicular caliber.',
      references: [
        'Blume-Peytavi U, et al. S3 guideline for the treatment of androgenetic alopecia. J Dtsch Dermatol Ges. 2018;16(6):798-812.',
        'Kanti V, et al. Evidence-based (S3) guideline for the management of hair disorders. J Eur Acad Dermatol Venereol. 2020;34(11):2466-2488.'
      ]
    }
  },
  {
    id: 'insight-pruritus',
    slug: 'chronic-pruritus',
    title: 'Approach to Chronic Pruritus: Diagnostic & Therapeutic Pathways',
    date: '10 Jul 2026',
    category: 'Allergy & Pruritus',
    image: '/ryan/guide-allergy.jpg',
    author: 'Ryan Neurodermatology Group',
    readingTime: '5 min read',
    summary: 'Stepwise algorithmic approach to chronic itch without primary skin lesions vs inflammatory dermatoses, mast cell stabilization, and targeted second-generation antihistamines.',
    content: {
      overview: 'Chronic pruritus lasting >6 weeks poses diagnostic complexity requiring differentiation between dermatological, systemic, neuropathic, and psychogenic etiologies.',
      presentation: 'Diffuse or localized pruritus with or without secondary excoriations, lichen simplex chronicus, and prurigo nodules.',
      differentials: 'Scabies, atopic diathesis, renal or cholestatic itch, thyroid dysfunction, hematologic malignancy.',
      management: 'First-line non-sedating H1 antihistamines (Bilastine, Levocetirizine up to 4x standard dose), barrier repair emollients, topical counter-irritants.',
      considerations: 'Screen renal, hepatic, and thyroid panel in recalcitrant generalized pruritus sine materia.',
      references: [
        'Stander S, et al. IFSI guideline on chronic pruritus. Acta Derm Venereol. 2020;100(7):adv00085.'
      ]
    }
  },
  {
    id: 'insight-systemic',
    slug: 'topical-vs-systemic',
    title: 'Topical vs Systemic Dermatological Therapy: Decision Frameworks',
    date: '02 Jul 2026',
    category: 'Therapeutics',
    image: '/ryan/safety-shield.jpg',
    author: 'Ryan Clinical Pharmacology Board',
    readingTime: '7 min read',
    summary: 'Evidence-based criteria for escalating from localized topical treatments to oral targeted therapies across acne, psoriasis, and superficial fungal infections.',
    content: {
      overview: 'Balancing efficacy against systemic exposure and adverse events defines optimal dermatological pharmacology.',
      presentation: 'Extensive body surface area (>10% BSA), scarring potential, anatomical limitations, and quality of life impairment dictate systemic escalation.',
      differentials: 'Localized disease responsive to topical monotherapy vs refractory multi-site pathology.',
      management: 'Stepwise protocol: Optimize vehicle and adherence before declaring topical failure. Initiate oral antimycotics, retinoids, or JAK inhibitors with appropriate monitoring.',
      considerations: 'Evaluate baseline hepatic and metabolic parameters before systemic therapy initiation.',
      references: [
        'Nast A, et al. European Dermatology Forum S3-Guideline. J Eur Acad Dermatol Venereol. 2021;35(4):812-828.'
      ]
    }
  }
];

// ==========================================
// REFERENCE LIBRARY DATA
// ==========================================

interface LibraryArea {
  id: string;
  slug: string;
  name: string;
  count: number;
  highlightTopics: string[];
}

const LIBRARY_AREAS: LibraryArea[] = [
  { id: 'acne', slug: 'acne', name: 'Acne', count: 12, highlightTopics: ['Acne Vulgaris', 'Comedonal Acne', 'Inflammatory Acne', 'Nodulocystic Acne', 'Topical Retinoids', 'Benzoyl Peroxide', 'Isotretinoin'] },
  { id: 'fungal', slug: 'fungal-infections', name: 'Fungal Infections', count: 14, highlightTopics: ['Dermatophytosis', 'Tinea Corporis', 'Tinea Cruris', 'Tinea Pedis', 'Onychomycosis', 'Topical Antifungals', 'Systemic Antifungals'] },
  { id: 'bacterial', slug: 'bacterial-infections', name: 'Bacterial Infections', count: 10, highlightTopics: ['Impetigo', 'Folliculitis', 'Furunculosis', 'Ecthyma', 'Topical Antibiotics', 'Antimicrobial Stewardship'] },
  { id: 'inflammatory', slug: 'inflammatory-dermatoses', name: 'Inflammatory Dermatoses', count: 11, highlightTopics: ['Atopic Dermatitis', 'Contact Dermatitis', 'Seborrhoeic Dermatitis', 'Psoriasis', 'Steroid Potency', 'Calcineurin Inhibitors'] },
  { id: 'allergy', slug: 'allergy-and-pruritus', name: 'Allergy & Pruritus', count: 10, highlightTopics: ['Urticaria', 'Chronic Urticaria', 'Dermatographism', 'Generalised Pruritus', 'Antihistamines', 'Chronic Itch Approach'] },
  { id: 'hair', slug: 'hair-and-scalp', name: 'Hair & Scalp', count: 11, highlightTopics: ['Androgenetic Alopecia', 'Telogen Effluvium', 'Alopecia Areata', 'Dandruff', 'Minoxidil', 'Finasteride'] },
  { id: 'pigmentation', slug: 'pigmentation', name: 'Pigmentation', count: 10, highlightTopics: ['Melasma', 'PIH', 'Facial Hypermelanosis', 'Vitiligo Overview', 'Hydroquinone', 'Photoprotection'] },
  { id: 'immunomodulatory', slug: 'immunomodulatory-dermatology', name: 'Immunomodulatory Dermatology', count: 8, highlightTopics: ['Topical Tacrolimus', 'Calcineurin Inhibitors', 'JAK Inhibitors', 'Tofacitinib Reference', 'Monitoring'] },
  { id: 'parasitic', slug: 'parasitic-conditions', name: 'Parasitic Conditions', count: 7, highlightTopics: ['Classical Scabies', 'Crusted Scabies', 'Pediculosis', 'Permethrin', 'Contact Management', 'Reinfection Prevention'] },
  { id: 'skincare', slug: 'skin-care', name: 'Skin Care', count: 12, highlightTopics: ['Skin Barrier', 'Xerosis', 'Emollients', 'Sensitive Skin', 'Sunscreen Photoprotection', 'Ceramides'] }
];

export default function TherapeuticResourcesPage() {
  const [activeGuideModal, setActiveGuideModal] = useState<GuideItem | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<InsightArticle | null>(null);
  const [activeLibraryModal, setActiveLibraryModal] = useState<LibraryArea | null>(null);
  const [libraryFilterTab, setLibraryFilterTab] = useState<'condition' | 'therapeutic' | 'ingredient' | 'anatomy'>('condition');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered reference topics
  const filteredAreas = LIBRARY_AREAS.filter(area => 
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.highlightTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION & TOP BANNER */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12 lg:pt-8 lg:pb-16">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="#" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Therapeutic Resources</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#00768a]" />
                FOR DOCTORS
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight leading-tight">
                THERAPEUTIC <br className="hidden sm:inline" />
                <span className="text-[#00768a]">RESOURCES</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Access dermatology-focused therapeutic guides, clinical education, product monographs, prescribing information and professional resources to support your clinical practice.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#guides"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/10 active:scale-95 transition-all"
                >
                  Explore Therapeutic Guides
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#reference-library"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                >
                  Reference Library
                </a>
              </div>
            </div>

            {/* Right Graphic Banner (Authentic Client Artwork) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white group">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src="/ryan/hero-therapeutic-doc.jpg"
                    alt="Knowledge for Better Skin Health - Ryan Dermaceutics"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <div className="font-serif italic text-lg sm:text-xl text-teal-100 font-medium">
                        "Knowledge for Better Skin Health"
                      </div>
                      <div className="text-[11px] text-teal-200/80 font-medium tracking-wide mt-0.5">
                        Scientific excellence across dermatology care
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TOP JUMP ANCHOR NAVIGATION BAR */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-teal-100 shadow-xs sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-4 overflow-x-auto py-3 no-scrollbar text-xs font-semibold text-slate-700">
            <a
              href="#guides"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-50 hover:bg-teal-100/70 text-[#006070] border border-teal-100 whitespace-nowrap transition"
            >
              <BookOpen className="w-4 h-4 text-[#00768a]" />
              Therapeutic Guides
            </a>
            <a
              href="#insights"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-[#006070] whitespace-nowrap transition"
            >
              <FileText className="w-4 h-4 text-[#00768a]" />
              Clinical Insights
            </a>
            <a
              href="#monographs"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-[#006070] whitespace-nowrap transition"
            >
              <Book className="w-4 h-4 text-[#00768a]" />
              Product Monographs
            </a>
            <a
              href="#prescribing"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-[#006070] whitespace-nowrap transition"
            >
              <Pill className="w-4 h-4 text-[#00768a]" />
              Prescribing Information
            </a>
            <a
              href="#reference-library"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-[#006070] whitespace-nowrap transition"
            >
              <Library className="w-4 h-4 text-[#00768a]" />
              Reference Library
            </a>
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-[#006070] whitespace-nowrap transition"
            >
              <Download className="w-4 h-4 text-[#00768a]" />
              Download Centre
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: DERMATOLOGY THERAPEUTIC GUIDES */}
      {/* ========================================================= */}
      <section id="guides" className="py-14 lg:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              Dermatology Therapeutic Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Comprehensive overviews of common dermatological conditions with treatment approaches, clinical considerations and patient counselling points.
            </p>
          </div>
          <a 
            href={`/for-doctors/therapeutic-resources/guides/${THERAPEUTIC_GUIDES[0].slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00768a] hover:text-[#004f5e] group"
          >
            View All Guides
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Grid Cards Matching Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {THERAPEUTIC_GUIDES.map((guide) => (
            <a
              key={guide.id}
              href={`/for-doctors/therapeutic-resources/guides/${guide.slug}`}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Card Thumbnail */}
              <div className="relative h-32 w-full overflow-hidden bg-slate-100">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/40 backdrop-blur-xs">
                  Clinical Guide
                </span>
              </div>

              {/* Card Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00768a] transition-colors leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00768a] group-hover:text-[#004f5e]">
                    VIEW GUIDE
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: CLINICAL INSIGHTS */}
      {/* ========================================================= */}
      <section id="insights" className="py-14 bg-gradient-to-b from-white via-teal-50/20 to-white border-y border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#003d4d] tracking-tight uppercase">
                Clinical Insights
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Stay updated with educational articles and expert insights on modern dermatology practice.
              </p>
            </div>
            <a 
              href={`/for-doctors/therapeutic-resources/insights/${CLINICAL_INSIGHTS[0].slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00768a] hover:text-[#004f5e] group"
            >
              View All Articles
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* 6 Article Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLINICAL_INSIGHTS.map((article) => (
              <a
                key={article.id}
                href={`/for-doctors/therapeutic-resources/insights/${article.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-semibold bg-white/95 text-[#006070] px-2 py-0.5 rounded-full shadow-xs">
                      {article.readingTime}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-teal-700 mb-1.5">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00768a] transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00768a] group-hover:text-[#004f5e]">
                      READ ARTICLE
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: 4 RESOURCE CARDS (Mandated by Client Docx)     */}
      {/* ========================================================= */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#00768a] uppercase tracking-widest">DOCTORS REPOSITORY</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase mt-1">
            Essential Professional Resources
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access compliant product documentation, prescribing guidelines, and clinical reference modules.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Product Monographs */}
          <div id="monographs" className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 text-[#00768a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors">
                PRODUCT MONOGRAPHS
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Download detailed product monographs with composition, indications, dosage and safety information.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href="/for-doctors/prescribing-information"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
              >
                SEARCH MONOGRAPHS
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Prescribing Information */}
          <div id="prescribing" className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-cyan-50 border border-cyan-100 text-[#00768a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors">
                PRESCRIBING INFORMATION
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Access prescribing information for our dermatology products including key safety and regulatory details.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href="/for-doctors/prescribing-information"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
              >
                VIEW PRESCRIBING INFO
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Dermatology Reference Library (Client Special Addition) */}
          <div className="bg-gradient-to-br from-teal-900 to-[#004f5e] rounded-xl p-5 text-white shadow-md hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-white/10 border border-white/20 text-teal-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Library className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">NEW MODULE</span>
              <h3 className="font-bold text-sm text-white mt-2">
                REFERENCE LIBRARY
              </h3>
              <p className="text-xs text-teal-100/80 mt-2 leading-relaxed">
                Explore structured professional references covering common dermatological conditions and therapeutic classes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10">
              <a
                href="/for-doctors/reference-library"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-200 hover:text-white"
              >
                EXPLORE LIBRARY
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Download Centre */}
          <div id="download" className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                DOWNLOAD CENTRE
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Download product literature, clinical visual aids, brochures and educational materials for your practice.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href="#download"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
              >
                VISIT DOWNLOAD CENTRE
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: DERMATOLOGY REFERENCE LIBRARY (Detailed)      */}
      {/* ========================================================= */}
      <section id="reference-library" className="py-16 bg-[#eef7f9]/60 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              Dermatology Reference Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              A structured professional reference covering common dermatological conditions, clinical presentations, diagnostic considerations and management principles across key areas of skin, hair and scalp health.
            </p>

            {/* Search Bar */}
            <div className="mt-6 relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search conditions, therapeutic classes or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-teal-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00768a] shadow-sm transition"
              />
              <Search className="w-4 h-4 text-teal-600 absolute left-4 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-xs font-semibold">
              <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider font-bold">Browse By:</span>
              <button
                onClick={() => setLibraryFilterTab('condition')}
                className={`px-3 py-1.5 rounded-full transition ${
                  libraryFilterTab === 'condition'
                    ? 'bg-[#00768a] text-white'
                    : 'bg-white text-slate-600 hover:bg-teal-50 border border-teal-100'
                }`}
              >
                By Condition
              </button>
              <button
                onClick={() => setLibraryFilterTab('therapeutic')}
                className={`px-3 py-1.5 rounded-full transition ${
                  libraryFilterTab === 'therapeutic'
                    ? 'bg-[#00768a] text-white'
                    : 'bg-white text-slate-600 hover:bg-teal-50 border border-teal-100'
                }`}
              >
                By Therapeutic Class
              </button>
              <button
                onClick={() => setLibraryFilterTab('ingredient')}
                className={`px-3 py-1.5 rounded-full transition ${
                  libraryFilterTab === 'ingredient'
                    ? 'bg-[#00768a] text-white'
                    : 'bg-white text-slate-600 hover:bg-teal-50 border border-teal-100'
                }`}
              >
                By Active Ingredient
              </button>
              <button
                onClick={() => setLibraryFilterTab('anatomy')}
                className={`px-3 py-1.5 rounded-full transition ${
                  libraryFilterTab === 'anatomy'
                    ? 'bg-[#00768a] text-white'
                    : 'bg-white text-slate-600 hover:bg-teal-50 border border-teal-100'
                }`}
              >
                By Anatomical Area
              </button>
            </div>
          </div>

          {/* 10 Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {filteredAreas.map((area) => (
              <a
                key={area.id}
                href={`/for-doctors/reference-library/${area.slug}`}
                className="bg-white rounded-xl p-4 border border-teal-100/90 shadow-2xs hover:shadow-md hover:border-[#00768a] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {area.count} References
                    </span>
                    <Sparkles className="w-3 h-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#00768a] transition-colors leading-tight">
                    {area.name}
                  </h3>
                  <div className="text-[10.5px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {area.highlightTopics.slice(0, 3).join(' • ')}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#00768a]">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>

          {/* Quick Cross-Reference Filters Bar */}
          <div className="mt-10 p-5 rounded-2xl bg-white border border-teal-100 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#006070] block uppercase tracking-wider text-[11px] mb-1">BY CONDITION</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Acne, Psoriasis, Melasma, Tinea, Alopecia, Urticaria...</p>
              </div>
              <div>
                <span className="font-bold text-[#006070] block uppercase tracking-wider text-[11px] mb-1">BY THERAPEUTIC CLASS</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Antifungals, Corticosteroids, Antihistamines, Retinoids...</p>
              </div>
              <div>
                <span className="font-bold text-[#006070] block uppercase tracking-wider text-[11px] mb-1">BY ACTIVE INGREDIENT</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Ketoconazole, Luliconazole, Clobetasol, Adapalene, Tacrolimus...</p>
              </div>
              <div>
                <span className="font-bold text-[#006070] block uppercase tracking-wider text-[11px] mb-1">BY ANATOMICAL AREA</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Face | Scalp | Hair | Body | Intertriginous | Nails</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. MODALS: INTERACTIVE DEEP DIVE READERS                  */}
      {/* ========================================================= */}

      {/* A. THERAPEUTIC GUIDE MODAL (8 On-page clinical points + Portfolio) */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-teal-100">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#004f5e] to-[#00768a] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-teal-200 uppercase">
                  CLINICAL PRACTICE GUIDE • RYAN DERMACEUTICS
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold">{activeGuideModal.title}</h3>
                <p className="text-xs text-teal-100/90 max-w-2xl">{activeGuideModal.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
              {/* On-Page Navigation Bar as specified in Client Docx */}
              <div className="bg-teal-50/70 p-2.5 rounded-xl border border-teal-100 flex items-center gap-2 overflow-x-auto text-[11px] font-semibold text-[#006070]">
                <span>Classification</span> •
                <span>Presentation</span> •
                <span>Treatment</span> •
                <span>Topical</span> •
                <span>Systemic</span> •
                <span>Considerations</span> •
                <span>Maintenance</span> •
                <span>Counselling</span>
              </div>

              {/* Classification & Presentation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-[#004f5e] uppercase tracking-wider text-xs mb-1.5">
                    01 | Classification & Types
                  </h4>
                  <p className="leading-relaxed text-slate-600">{activeGuideModal.classification}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-[#004f5e] uppercase tracking-wider text-xs mb-1.5">
                    02 | Common Clinical Presentations
                  </h4>
                  <p className="leading-relaxed text-slate-600">{activeGuideModal.clinicalPresentation}</p>
                </div>
              </div>

              {/* Treatment Approaches */}
              <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100">
                <h4 className="font-bold text-[#004f5e] uppercase tracking-wider text-xs mb-1.5">
                  03 | Treatment Principles
                </h4>
                <p className="leading-relaxed text-slate-700">{activeGuideModal.treatmentApproaches}</p>
              </div>

              {/* Topical & Systemic Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#00768a]" />
                    Topical Options
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeGuideModal.topicalOptions.map((opt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-[#00768a]" />
                    Systemic Options
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeGuideModal.systemicOptions.map((opt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Maintenance & Patient Counselling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-800 text-xs mb-1">Treatment Considerations & Maintenance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeGuideModal.maintenance}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-800 text-xs mb-1">Patient Counselling Points</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{activeGuideModal.patientCounselling}</p>
                </div>
              </div>

              {/* RELATED RYAN THERAPEUTIC PORTFOLIO (Explicitly mandated in docx) */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <span className="text-xs font-bold text-[#004f5e] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00768a]" />
                    RELATED RYAN THERAPEUTIC PORTFOLIO
                  </span>
                  <span className="text-[11px] text-teal-700 font-semibold">{activeGuideModal.relatedPortfolio.ctaText}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {activeGuideModal.relatedPortfolio.primary.map((p, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-white border border-teal-200 text-[#004f5e] font-bold text-xs shadow-2xs">
                        {p}
                      </span>
                    ))}
                    {activeGuideModal.relatedPortfolio.secondary?.map((p, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-white/70 border border-dashed border-teal-300 text-slate-600 text-xs">
                        {p} (Secondary)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">For Registered Medical Practitioners Only</span>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="px-4 py-2 rounded-lg bg-[#00768a] text-white font-semibold hover:bg-[#005f70] transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. CLINICAL INSIGHT ARTICLE MODAL */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-teal-100">
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#003d4d] to-[#006070] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-teal-200">
                  <span>{activeArticleModal.date}</span>
                  <span>•</span>
                  <span>{activeArticleModal.category}</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold">{activeArticleModal.title}</h3>
                <p className="text-xs text-teal-100">{activeArticleModal.author} • {activeArticleModal.readingTime}</p>
              </div>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="border-l-4 border-teal-500 pl-4 py-1 italic text-slate-600 font-medium">
                {activeArticleModal.summary}
              </div>

              <div>
                <h4 className="font-bold text-[#004f5e] uppercase text-xs tracking-wider mb-1">Clinical Overview</h4>
                <p className="text-slate-600">{activeArticleModal.content.overview}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#004f5e] uppercase text-xs tracking-wider mb-1">Clinical Presentation</h4>
                <p className="text-slate-600">{activeArticleModal.content.presentation}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#004f5e] uppercase text-xs tracking-wider mb-1">Differential Considerations</h4>
                <p className="text-slate-600">{activeArticleModal.content.differentials}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#004f5e] uppercase text-xs tracking-wider mb-1">Management Principles</h4>
                <p className="text-slate-600">{activeArticleModal.content.management}</p>
              </div>

              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                <h4 className="font-bold text-[#004f5e] uppercase text-xs tracking-wider mb-1">Safety & Treatment Considerations</h4>
                <p className="text-slate-700">{activeArticleModal.content.considerations}</p>
              </div>

              <div className="pt-2">
                <h4 className="font-bold text-slate-900 text-xs mb-2">Professional References</h4>
                <ul className="space-y-1 text-[11px] text-slate-500">
                  {activeArticleModal.content.references.map((ref, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span>[{idx + 1}]</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ryan Clinical Insights Series</span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-4 py-2 rounded-lg bg-[#00768a] text-white font-semibold hover:bg-[#005f70] transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. REFERENCE LIBRARY TOPIC MODAL (11-Point Structure) */}
      {activeLibraryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-teal-100">
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#003d4d] to-[#006070] text-white flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-teal-200 uppercase">
                  DERMATOLOGY REFERENCE LIBRARY • {activeLibraryModal.count} TOPICS
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold">{activeLibraryModal.name}</h3>
              </div>
              <button
                onClick={() => setActiveLibraryModal(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100">
                <h4 className="font-bold text-[#004f5e] uppercase text-xs mb-2">11-Point Standard Clinical Reference Structure</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div>01 | Overview</div>
                  <div>02 | Clinical Presentation</div>
                  <div>03 | Common Causative Organisms</div>
                  <div>04 | Risk Factors</div>
                  <div>05 | Diagnostic Considerations</div>
                  <div>06 | Differential Diagnosis</div>
                  <div>07 | Management Principles</div>
                  <div>08 | Topical Therapy</div>
                  <div>09 | Systemic Therapy</div>
                  <div>10 | Recurrence & Prevention</div>
                  <div className="sm:col-span-2">11 | Professional References & Guidelines</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase mb-2">Available Condition References in this Module:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeLibraryModal.highlightTopics.map((topic, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-[#00768a] border border-slate-200 text-xs font-semibold cursor-pointer transition">
                      {topic} →
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Ryan Dermatology Reference Repository</span>
              <button
                onClick={() => setActiveLibraryModal(null)}
                className="px-4 py-2 rounded-lg bg-[#00768a] text-white font-semibold hover:bg-[#005f70] transition"
              >
                Close Library View
              </button>
            </div>
          </div>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
