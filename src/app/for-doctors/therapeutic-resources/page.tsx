'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { generateClinicalResourcePDF } from '@/lib/pdf-generator';
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
  FileDown,
  Eye
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

interface DownloadDocument {
  id: string;
  title: string;
  category: 'Product Monographs' | 'Visual Aids' | 'Prescribing Protocols' | 'Patient Leaflets';
  filename: string;
  format: string;
  size: string;
  date: string;
  description: string;
  details: string;
}

const DOWNLOAD_DOCUMENTS: DownloadDocument[] = [
  {
    id: 'doc-compendium',
    title: 'Ryan Dermaceutics - Master Product Monographs Compendium 2026',
    category: 'Product Monographs',
    filename: 'Ryan-Dermaceutics-Monographs-Compendium-2026.pdf',
    format: 'PDF',
    size: '8.4 MB',
    date: 'Nov 2026',
    description: 'Complete 53-product clinical monographs catalog with indications, active mechanisms, dosing regimens, contraindications, and clinical trial citations.',
    details: 'Covers Acne vulgaris, Superficial fungal infections, Corticosteroid therapies, Trichology, Immunomodulators, and Antihistamines.'
  },
  {
    id: 'doc-clixodin',
    title: 'Clixodin-AD Gel (Clindamycin Phosphate 1% + Adapalene 0.1%) Monograph',
    category: 'Product Monographs',
    filename: 'Clixodin-AD-Clinical-Monograph.pdf',
    format: 'PDF',
    size: '1.2 MB',
    date: 'Nov 2026',
    description: 'Comprehensive pharmacological monograph on microcomedolytic adapalene paired with topical antibacterial clindamycin.',
    details: 'Includes Phase III trial efficacy tables, barrier preservation protocols, and retinoid step-up regimens.'
  },
  {
    id: 'doc-kefin',
    title: 'Kefin 1% (Ketoconazole) Antifungal Cream & Shampoo Monograph',
    category: 'Product Monographs',
    filename: 'Kefin-Ketoconazole-Monograph.pdf',
    format: 'PDF',
    size: '950 KB',
    date: 'Nov 2026',
    description: 'Broad-spectrum imidazole antifungal profile covering dermatophyte inhibition, Malassezia suppression, and seborrheic dermatitis regimens.',
    details: 'Comparative MIC90 tables against Trichophyton rubrum and Malassezia furfur.'
  },
  {
    id: 'doc-tenorium',
    title: 'Tenorium (Clobetasol Propionate 0.05%) Potency & Stewardship Guide',
    category: 'Prescribing Protocols',
    filename: 'Tenorium-Clobetasol-Stewardship-Guide.pdf',
    format: 'PDF',
    size: '1.4 MB',
    date: 'Nov 2026',
    description: 'Super-potent Class I topical corticosteroid protocol: strict 2-week intermittent dosing, anatomical restrictions, and tapering schedules.',
    details: 'Includes adverse event mitigation (atrophy, telangiectasia) and steroid-sparing transition plans with Tacrolimus.'
  },
  {
    id: 'doc-tressicle',
    title: 'Tressicle-F (Minoxidil 5% + Finasteride 0.1%) Trichology Protocol',
    category: 'Product Monographs',
    filename: 'Tressicle-F-Trichology-Monograph.pdf',
    format: 'PDF',
    size: '1.8 MB',
    date: 'Nov 2026',
    description: 'Dual-action topical formulation for androgenetic alopecia: local 5-alpha reductase type II inhibition paired with follicular vasodilation.',
    details: 'Trichogram evaluation criteria, shedding phase timeline, and safety monitoring.'
  },
  {
    id: 'doc-blismin',
    title: 'Blismin 20 (Bilastine 20mg Tablets) Prescribing Monograph',
    category: 'Product Monographs',
    filename: 'Blismin-20-Bilastine-Monograph.pdf',
    format: 'PDF',
    size: '880 KB',
    date: 'Nov 2026',
    description: 'Second-generation non-sedating H1 receptor antagonist for chronic spontaneous urticaria and allergic rhinoconjunctivitis.',
    details: 'No hepatic CYP metabolism, negligible CNS H1 receptor occupancy, and rapid 1-hour onset of action.'
  },
  {
    id: 'doc-corticosteroid-ladder',
    title: 'Topical Corticosteroid Potency Ladder & Finger Tip Unit (FTU) Wallchart',
    category: 'Visual Aids',
    filename: 'Topical-Corticosteroid-Potency-Ladder-FTU.pdf',
    format: 'PDF',
    size: '2.1 MB',
    date: 'Nov 2026',
    description: 'High-resolution printable clinic wallchart classifying Class I to Class VII corticosteroids with precise FTU body area dosing guidelines.',
    details: 'Anatomical area risk zones: Face & Intertriginous (Class V-VII only), Trunk (Class II-IV), Palms & Soles (Class I-II).'
  },
  {
    id: 'doc-fungal-flowchart',
    title: 'Superficial Fungal Differentiation Flowchart (Tinea vs Eczema vs Psoriasis)',
    category: 'Visual Aids',
    filename: 'Superficial-Fungal-Differential-Flowchart.pdf',
    format: 'PDF',
    size: '1.6 MB',
    date: 'Nov 2026',
    description: 'Diagnostic algorithm for distinguishing recalcitrant dermatophytosis, Tinea Incognito, nummular eczema, and annular psoriasis.',
    details: 'KOH mount preparation tips, Wood lamp evaluation, and systemic escalation checkpoints.'
  },
  {
    id: 'doc-isotretinoin',
    title: 'Oral Isotretinoin Safety & Cumulative Dosing Protocol Guide',
    category: 'Prescribing Protocols',
    filename: 'Oral-Isotretinoin-Safety-Dosing-Protocol.pdf',
    format: 'PDF',
    size: '1.1 MB',
    date: 'Nov 2026',
    description: 'Clinical safety framework: baseline liver & lipid profiles, 120-150 mg/kg cumulative target dosing, teratogenicity contraception protocols.',
    details: 'Includes monthly monitoring schedules, mucocutaneous toxicity management, and flare mitigation.'
  },
  {
    id: 'doc-pil-retinoid',
    title: 'Patient Leaflet: Topical Retinoid Acclimatization & Skin Barrier Rules',
    category: 'Patient Leaflets',
    filename: 'Patient-Leaflet-Retinoid-Acclimatization.pdf',
    format: 'PDF',
    size: '650 KB',
    date: 'Nov 2026',
    description: 'Doctor-prescribed patient instruction sheet: alternate-night sandwich application, pea-sized rule, and broad-spectrum SPF adherence.',
    details: 'Easy to print and hand to patients during consultation.'
  },
  {
    id: 'doc-pil-scalp',
    title: 'Patient Leaflet: Proper Scalp Application Technique for Hair Solutions',
    category: 'Patient Leaflets',
    filename: 'Patient-Leaflet-Scalp-Application-Technique.pdf',
    format: 'PDF',
    size: '580 KB',
    date: 'Nov 2026',
    description: 'Clear, illustrated step-by-step patient guide for applying topical Minoxidil/Finasteride directly to dry scalp without wasting solution on hair shafts.',
    details: 'Printable clinic handout.'
  }
];

export default function TherapeuticResourcesPage() {
  const [guidesList, setGuidesList] = useState<GuideItem[]>(THERAPEUTIC_GUIDES);
  const [insightsList, setInsightsList] = useState<InsightArticle[]>(CLINICAL_INSIGHTS);
  const [activeGuideModal, setActiveGuideModal] = useState<GuideItem | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<InsightArticle | null>(null);
  const [downloadCentreOpen, setDownloadCentreOpen] = useState(false);
  const [downloadSearch, setDownloadSearch] = useState('');
  const [downloadCategory, setDownloadCategory] = useState<string>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DownloadDocument | null>(null);

  // Auto-tour: highlight guide cards one-by-one in a loop (starts after 15s)
  const [tourIdx, setTourIdx] = useState<number | null>(null);
  const [tourHold, setTourHold] = useState(false);
  React.useEffect(() => {
    if (tourHold) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setTourIdx(0);
      interval = setInterval(() => {
        setTourIdx(prev => (prev === null ? 0 : (prev + 1) % Math.max(guidesList.length, 1)));
      }, 2500);
    }, 15000);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [tourHold, guidesList.length]);

  const handleDownloadFile = async (doc: DownloadDocument) => {
    try {
      setDownloadToast(`Preparing download for: ${doc.title}...`);
      await generateClinicalResourcePDF(doc);
      setDownloadToast(`✓ Downloaded ${doc.filename}`);
      setTimeout(() => setDownloadToast(null), 3500);
    } catch (err) {
      console.error('Failed to generate resource PDF:', err);
      setDownloadToast(`Error downloading ${doc.filename}`);
      setTimeout(() => setDownloadToast(null), 3500);
    }
  };

  React.useEffect(() => {
    fetch('/api/db/guides')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.guides) && data.guides.length > 0) {
          const mapped = data.guides.map((g: any) => ({
            ...g.data,
            id: g.id,
            slug: g.slug,
            title: g.title,
            subtitle: g.subtitle || g.data?.subtitle || '',
            image: g.cover_image || g.data?.image || '/ryan/guide-acne.jpg',
          }));
          setGuidesList(mapped);
        }
      })
      .catch(() => {});

    fetch('/api/db/insights')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.insights) && data.insights.length > 0) {
          const mapped = data.insights.map((ins: any) => ({
            ...ins.data,
            id: ins.id,
            slug: ins.slug,
            title: ins.title,
            subtitle: ins.subtitle || ins.data?.subtitle || '',
            image: ins.featured_image || ins.data?.image || '/ryan/insight-acne.jpg',
          }));
          setInsightsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

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

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] relative z-10">
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
            <div className="lg:col-span-6 space-y-4">
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
                  href="/for-doctors/reference-library"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                >
                  Reference Library
                </a>
              </div>
            </div>

            {/* Right Graphic Banner (Authentic Client Artwork) */}
            <div className="lg:col-span-6 relative">
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
      <section className="bg-white/95 backdrop-blur border-y border-slate-200/80 shadow-sm sticky top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
          <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-2.5 overflow-x-auto py-3 no-scrollbar text-xs font-black">
            <a
              href="#guides"
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50/60 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <BookOpen className="w-3.5 h-3.5" />
              </span>
              Therapeutic Guides
            </a>
            <a
              href="#insights"
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/60 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <FileText className="w-3.5 h-3.5" />
              </span>
              Clinical Insights
            </a>
            <a
              href="#monographs"
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50/60 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Book className="w-3.5 h-3.5" />
              </span>
              Product Monographs
            </a>
            <a
              href="#prescribing"
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/60 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Pill className="w-3.5 h-3.5" />
              </span>
              Prescribing Information
            </a>
            <a
              href="/for-doctors/reference-library"
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-fuchsia-200 hover:bg-fuchsia-50/60 transition-all"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Library className="w-3.5 h-3.5" />
              </span>
              Reference Library
            </a>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('download-centre');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setDownloadCentreOpen(true);
              }}
              className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60 transition-all cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Download className="w-3.5 h-3.5" />
              </span>
              Download Centre
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: DERMATOLOGY THERAPEUTIC GUIDES */}
      {/* ========================================================= */}
      <section id="guides" className="py-14 lg:py-18 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full mb-2">
              <BookOpen className="w-3 h-3" />
              Clinical Guides
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
              Dermatology Therapeutic Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Comprehensive overviews of common dermatological conditions with treatment approaches, clinical considerations and patient counselling points.
            </p>
          </div>
          <a 
            href="#guides-grid"
            className="btn-fx inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200 hover:shadow-lg hover:-translate-y-0.5 group transition-all"
          >
            View All Guides
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Grid Cards Matching Mockup */}
        <div
          id="guides-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5 scroll-mt-32"
          onMouseEnter={() => { setTourHold(true); setTourIdx(null); }}
          onMouseLeave={() => setTourHold(false)}
        >
          {guidesList.map((guide, idx) => {
            const guideAccents = [
              { bar: 'from-rose-400 to-pink-500', border: 'border-rose-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(244,63,94,0.45)] hover:border-rose-300', title: 'group-hover:text-rose-600', link: 'text-rose-600' },
              { bar: 'from-amber-400 to-orange-500', border: 'border-amber-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(245,158,11,0.45)] hover:border-amber-300', title: 'group-hover:text-amber-600', link: 'text-amber-600' },
              { bar: 'from-violet-400 to-purple-500', border: 'border-violet-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(139,92,246,0.45)] hover:border-violet-300', title: 'group-hover:text-violet-600', link: 'text-violet-600' },
              { bar: 'from-sky-400 to-blue-500', border: 'border-sky-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(14,165,233,0.45)] hover:border-sky-300', title: 'group-hover:text-sky-600', link: 'text-sky-600' },
              { bar: 'from-emerald-400 to-teal-500', border: 'border-emerald-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(16,185,129,0.45)] hover:border-emerald-300', title: 'group-hover:text-emerald-600', link: 'text-emerald-600' },
              { bar: 'from-cyan-400 to-indigo-500', border: 'border-cyan-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(6,182,212,0.45)] hover:border-cyan-300', title: 'group-hover:text-cyan-600', link: 'text-cyan-600' },
            ];
            const a = guideAccents[idx % guideAccents.length];
            return (
            <a
              key={guide.id}
              href={`/for-doctors/therapeutic-resources/guides/${guide.slug}`}
              className={`guide-card bg-white rounded-xl overflow-hidden border ${a.border} shadow-sm ${a.hover} hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer ${tourIdx === idx ? 'tour-active' : ''}`}
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
              <div className={`h-1 w-full bg-gradient-to-r ${a.bar}`} />

              {/* Card Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`font-black text-xs sm:text-sm text-slate-900 ${a.title} transition-colors leading-snug`}>
                    {guide.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <span className={`tour-link inline-flex items-center gap-1 text-[11px] font-black ${a.link}`}>
                    VIEW GUIDE
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </a>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: CLINICAL INSIGHTS */}
      {/* ========================================================= */}
      <section id="insights" className="py-14 bg-gradient-to-b from-white via-teal-50/20 to-white border-y border-teal-100/60">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full mb-2">
                <FileText className="w-3 h-3" />
                Expert Insights
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                Clinical Insights
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Stay updated with educational articles and expert insights on modern dermatology practice.
              </p>
            </div>
            <a 
              href="#insights-grid"
              className="btn-fx inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5 group transition-all"
            >
              View All Articles
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* 6 Article Cards Grid */}
          <div id="insights-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 scroll-mt-32">
            {insightsList.map((article, idx) => {
              const insightAccents = [
                { bar: 'from-rose-400 to-pink-500', border: 'border-rose-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(244,63,94,0.45)] hover:border-rose-300', meta: 'text-rose-600', title: 'group-hover:text-rose-600', link: 'text-rose-600' },
                { bar: 'from-indigo-400 to-violet-500', border: 'border-indigo-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(99,102,241,0.45)] hover:border-indigo-300', meta: 'text-indigo-600', title: 'group-hover:text-indigo-600', link: 'text-indigo-600' },
                { bar: 'from-amber-400 to-orange-500', border: 'border-amber-200/80', hover: 'hover:shadow-[0_18px_38px_-14px_rgba(245,158,11,0.45)] hover:border-amber-300', meta: 'text-amber-600', title: 'group-hover:text-amber-600', link: 'text-amber-600' },
              ];
              const a = insightAccents[idx % insightAccents.length];
              return (
              <a
                key={article.id}
                href={`/for-doctors/therapeutic-resources/insights/${article.slug}`}
                className={`bg-white rounded-xl overflow-hidden border ${a.border} shadow-sm ${a.hover} hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer`}
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
                <div className={`h-1 w-full bg-gradient-to-r ${a.bar}`} />

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold ${a.meta} mb-1.5`}>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>

                    <h3 className={`font-black text-xs sm:text-sm text-slate-900 ${a.title} transition-colors line-clamp-2 leading-snug`}>
                      {article.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-black ${a.link}`}>
                      READ ARTICLE
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: 4 RESOURCE CARDS (Mandated by Client Docx)     */}
      {/* ========================================================= */}
      <section className="py-14 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-violet-700 bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 px-3 py-1 rounded-full mb-2">
            <Library className="w-3 h-3 text-violet-500" />
            Doctors Repository
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
            Essential Professional Resources
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Access compliant product documentation, prescribing guidelines, and clinical reference modules.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Product Monographs */}
          <div id="monographs" className="scroll-mt-36 rounded-xl p-5 bg-gradient-to-br from-violet-50 via-white to-purple-50 border border-violet-200/80 shadow-[0_10px_26px_-14px_rgba(139,92,246,0.5)] hover:shadow-[0_20px_40px_-16px_rgba(139,92,246,0.55)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-400 to-purple-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-black text-sm text-violet-950 group-hover:text-violet-700 transition-colors">
                PRODUCT MONOGRAPHS
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Download detailed product monographs with composition, indications, dosage and safety information.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-violet-100">
              <a
                href="/for-doctors/prescribing-information"
                className="inline-flex items-center gap-1.5 text-xs font-black text-violet-600 hover:text-violet-800"
              >
                SEARCH MONOGRAPHS
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Prescribing Information */}
          <div id="prescribing" className="scroll-mt-36 rounded-xl p-5 bg-gradient-to-br from-sky-50 via-white to-cyan-50 border border-sky-200/80 shadow-[0_10px_26px_-14px_rgba(14,165,233,0.5)] hover:shadow-[0_20px_40px_-16px_rgba(14,165,233,0.55)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-sky-400 to-cyan-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <h3 className="font-black text-sm text-sky-950 group-hover:text-sky-700 transition-colors">
                PRESCRIBING INFORMATION
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Access prescribing information for our dermatology products including key safety and regulatory details.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-sky-100">
              <a
                href="/for-doctors/prescribing-information"
                className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-sky-800"
              >
                VIEW PRESCRIBING INFO
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Dermatology Reference Library (Client Special Addition) */}
          <div className="rounded-xl p-5 text-white bg-[linear-gradient(135deg,#1e1b4b_0%,#4338ca_55%,#7c3aed_100%)] shadow-[0_16px_36px_-16px_rgba(79,70,229,0.7)] hover:shadow-[0_24px_48px_-18px_rgba(124,58,237,0.8)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-fuchsia-400/30 blur-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/25 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Library className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-fuchsia-100 uppercase tracking-widest bg-white/15 px-2 py-0.5 rounded">NEW MODULE</span>
              <h3 className="font-black text-sm text-white mt-2">
                REFERENCE LIBRARY
              </h3>
              <p className="text-xs text-violet-100/85 mt-2 leading-relaxed">
                Explore structured professional references covering common dermatological conditions and therapeutic classes.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/15">
              <a
                href="/for-doctors/reference-library"
                className="inline-flex items-center gap-1.5 text-xs font-black text-fuchsia-200 hover:text-white"
              >
                EXPLORE LIBRARY
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Download Centre */}
          <div id="download" className="rounded-xl p-5 bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200/80 shadow-[0_10px_26px_-14px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-16px_rgba(16,185,129,0.55)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="font-black text-sm text-emerald-950 group-hover:text-emerald-700 transition-colors">
                DOWNLOAD CENTRE
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Download product literature, clinical visual aids, brochures and educational materials for your practice.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-emerald-100">
              <button
                type="button"
                onClick={() => setDownloadCentreOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-800 cursor-pointer"
              >
                VISIT DOWNLOAD CENTRE
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6.5 DEDICATED DOWNLOAD CENTRE & CLINICAL MATERIALS SECTION */}
      {/* ========================================================= */}
      <section id="download-centre" className="scroll-mt-24 py-14 lg:py-18 bg-gradient-to-b from-[#f0f9fa] via-white to-[#f8fafc] border-t border-b border-teal-100/90">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                CLINICAL PRACTICE DOWNLOAD CENTRE
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003d4d] tracking-tight uppercase">
                Download Centre & Practice Materials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Immediate access to peer-reviewed product monographs, visual diagnostic charts, prescribing algorithms, and patient education sheets.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                placeholder="Search downloads..."
                value={downloadSearch}
                onChange={(e) => setDownloadSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-teal-200 text-xs text-slate-800 placeholder-slate-400 bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#00768a]"
              />
              <Search className="w-4 h-4 text-teal-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-semibold no-scrollbar">
            {['All', 'Product Monographs', 'Visual Aids', 'Prescribing Protocols', 'Patient Leaflets'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setDownloadCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full border transition whitespace-nowrap cursor-pointer ${
                  downloadCategory === cat
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOWNLOAD_DOCUMENTS.filter(d => {
              const matchesCat = downloadCategory === 'All' || d.category === downloadCategory;
              const matchesQ = !downloadSearch.trim() ||
                d.title.toLowerCase().includes(downloadSearch.toLowerCase()) ||
                d.description.toLowerCase().includes(downloadSearch.toLowerCase());
              return matchesCat && matchesQ;
            }).map((doc, idx) => {
              const docAccents = [
                { card: 'from-rose-50 via-white to-pink-50 border-rose-200/80 hover:shadow-[0_20px_40px_-16px_rgba(244,63,94,0.5)]', bar: 'from-rose-400 to-pink-500', solid: 'bg-rose-600 hover:bg-rose-700', badge: 'bg-rose-100 text-rose-700 border-rose-200', title: 'group-hover:text-rose-600' },
                { card: 'from-indigo-50 via-white to-violet-50 border-indigo-200/80 hover:shadow-[0_20px_40px_-16px_rgba(99,102,241,0.5)]', bar: 'from-indigo-400 to-violet-500', solid: 'bg-indigo-600 hover:bg-indigo-700', badge: 'bg-indigo-100 text-indigo-700 border-indigo-200', title: 'group-hover:text-indigo-600' },
                { card: 'from-amber-50 via-white to-orange-50 border-amber-200/80 hover:shadow-[0_20px_40px_-16px_rgba(245,158,11,0.5)]', bar: 'from-amber-400 to-orange-500', solid: 'bg-amber-600 hover:bg-amber-700', badge: 'bg-amber-100 text-amber-700 border-amber-200', title: 'group-hover:text-amber-600' },
                { card: 'from-emerald-50 via-white to-teal-50 border-emerald-200/80 hover:shadow-[0_20px_40px_-16px_rgba(16,185,129,0.5)]', bar: 'from-emerald-400 to-teal-500', solid: 'bg-emerald-600 hover:bg-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', title: 'group-hover:text-emerald-600' },
                { card: 'from-sky-50 via-white to-cyan-50 border-sky-200/80 hover:shadow-[0_20px_40px_-16px_rgba(14,165,233,0.5)]', bar: 'from-sky-400 to-cyan-500', solid: 'bg-sky-600 hover:bg-sky-700', badge: 'bg-sky-100 text-sky-700 border-sky-200', title: 'group-hover:text-sky-600' },
                { card: 'from-fuchsia-50 via-white to-purple-50 border-fuchsia-200/80 hover:shadow-[0_20px_40px_-16px_rgba(217,70,239,0.5)]', bar: 'from-fuchsia-400 to-purple-500', solid: 'bg-fuchsia-600 hover:bg-fuchsia-700', badge: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200', title: 'group-hover:text-fuchsia-600' },
              ];
              const a = docAccents[idx % docAccents.length];
              return (
              <div
                key={doc.id}
                className={`rounded-2xl p-5 bg-gradient-to-br ${a.card} border shadow-[0_10px_28px_-16px_rgba(0,61,77,0.5)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${a.bar}`} />
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${a.badge}`}>
                      {doc.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {doc.format} • {doc.size}
                    </span>
                  </div>
                  <h3 className={`font-black text-sm text-[#003d4d] ${a.title} transition-colors leading-snug`}>
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 font-medium">
                    Updated {doc.date}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewDoc(doc)}
                      className="btn-fx inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(doc)}
                      className={`btn-fx inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${a.solid} text-white text-xs font-bold transition shadow-md active:scale-95 cursor-pointer`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
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

      {/* C. DOWNLOAD CENTRE MODAL */}
      {downloadCentreOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-teal-100">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#003d4d] via-[#006070] to-[#00768a] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-teal-200 uppercase">
                  HEALTHCARE PROFESSIONAL DOWNLOAD CENTRE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold">Clinical Practice Downloads</h3>
                <p className="text-xs text-teal-100/90 max-w-2xl">
                  Official product monographs, prescribing protocols, and clinical visual aids for daily consultation.
                </p>
              </div>
              <button
                onClick={() => setDownloadCentreOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="Close Download Centre"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Batch-wise COA Quick Link Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00768a] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Batch-wise Certificates of Analysis (COA)</div>
                    <div className="text-[11px] text-slate-600">Access and download verified laboratory batch release reports for all formulations.</div>
                  </div>
                </div>
                <Link
                  href="/batch-analysis-report"
                  className="btn-fx inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <span>Batch COA Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search documents by name or condition..."
                    value={downloadSearch}
                    onChange={(e) => setDownloadSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-teal-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a]"
                  />
                  <Search className="w-4 h-4 text-teal-600 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-semibold no-scrollbar">
                {['All', 'Product Monographs', 'Visual Aids', 'Prescribing Protocols', 'Patient Leaflets'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDownloadCategory(cat)}
                    className={`px-3 py-1 rounded-full border text-[11px] transition whitespace-nowrap cursor-pointer ${
                      downloadCategory === cat
                        ? 'bg-[#00768a] text-white border-[#00768a] font-bold shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <Link
                  href="/batch-analysis-report"
                  className="px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] transition whitespace-nowrap font-bold inline-flex items-center gap-1 shrink-0"
                >
                  <span>Batch COA Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {DOWNLOAD_DOCUMENTS.filter(d => {
                  const matchesCat = downloadCategory === 'All' || d.category === downloadCategory;
                  const matchesQ = !downloadSearch.trim() ||
                    d.title.toLowerCase().includes(downloadSearch.toLowerCase()) ||
                    d.description.toLowerCase().includes(downloadSearch.toLowerCase());
                  return matchesCat && matchesQ;
                }).map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-teal-300 bg-white hover:bg-teal-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-100 text-[#006070]">
                          {doc.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {doc.format} • {doc.size}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#003d4d] leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        className="btn-fx inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadFile(doc)}
                        className="btn-fx inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:brightness-110 text-white text-xs font-bold transition shadow-md active:scale-95 shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium text-[11px]">
                WHO-GMP Validated Clinical Documentation
              </span>
              <button
                type="button"
                onClick={() => setDownloadCentreOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. PDF PREVIEW MODAL (View before download) */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setPreviewDoc(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-indigo-100">
            {/* Preview Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 border border-white/25 px-2.5 py-1 rounded-full">
                    {previewDoc.category}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-100">
                    {previewDoc.format} • {previewDoc.size} • {previewDoc.date}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-black leading-snug">{previewDoc.title}</h3>
                <p className="text-[11px] text-indigo-100/90 font-mono truncate">{previewDoc.filename}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition shrink-0"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF-style page preview */}
            <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 max-w-2xl mx-auto p-6 sm:p-8 space-y-5">
                <div className="text-center border-b border-slate-200 pb-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                    Ryan Dermaceutics • Clinical Practice Document
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1 leading-snug">
                    {previewDoc.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    {previewDoc.filename} • {previewDoc.format} • {previewDoc.size}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-indigo-700 mb-1.5">
                    Document Overview
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {previewDoc.description}
                  </p>
                </div>
                <div className="rounded-xl bg-indigo-50/60 border border-indigo-100 p-4">
                  <div className="text-[11px] font-black uppercase tracking-widest text-indigo-700 mb-1.5">
                    Clinical Specifications & Protocol
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {previewDoc.details}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {[
                    ['Category', previewDoc.category],
                    ['Format', previewDoc.format],
                    ['Size', previewDoc.size],
                    ['Issued', previewDoc.date],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">{k}</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{v}</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[10px] text-slate-400 font-medium">
                  Full document downloads as a PDF file • WHO-GMP validated clinical documentation
                </p>
              </div>
            </div>

            {/* Preview Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => { if (previewDoc) handleDownloadFile(previewDoc); }}
                className="btn-fx inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:brightness-110 text-white text-xs font-black transition shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOWNLOAD TOAST NOTIFICATION */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-[#003d4d] text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-400 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
