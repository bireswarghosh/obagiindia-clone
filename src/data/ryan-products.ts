// Ryan Dermaceutics - Complete 53 Product Monographs Catalog
// Updated with authentic client data from Product Monograph Part 1 (32 Comprehensive Monographs)

export interface DifferentialItem {
  id: string;
  condition: string;
  clinicalClues: string[];
  typicalAppearance: string;
  diagnosticApproach: string[];
  managementApproach: string[];
  clinicalPearl: string;
}

export interface ConsiderationItem {
  title: string;
  keyPoints: string[];
  details: string[];
  practicalExample: string;
  clinicalPearl: string;
}

export interface SpecialSituationItem {
  title: string;
  keyPoints: string[];
  details?: string[];
  practicalExample?: string;
  managementApproach?: string;
  clinicalPearl?: string;
}

export interface RyanProduct {
  id: string;
  slug: string;
  brandName: string;
  genericName: string;
  tagline: string;
  therapeuticArea: 'Acne' | 'Antifungal' | 'Antibacterial' | 'Corticosteroids' | 'Allergy & Pruritus' | 'Immunomodulator' | 'Pigmentation' | 'Hair & Scalp' | 'Anti-Parasitic' | 'Supportive Care';
  route: 'Topical' | 'Oral / Systematic';
  routeSubcategory: string;
  dosageForm: 'Cream' | 'Ointment' | 'Gel' | 'Lotion' | 'Tablet' | 'Capsule' | 'Softgel' | 'Syrup' | 'Solution' | 'Soap' | 'Powder' | 'Gummy';
  strength: string;
  packSize: string;
  prescriptionStatus: string;
  clinicalSummary: string;
  composition: string[];
  therapeuticCategory: string;
  pharmacologicalClass: string;
  mechanismOfAction: { step: string; title: string; description: string }[];
  indications: string[];
  dosageAdministration: {
    recommended: string;
    howToApply: string;
    duration: string;
    missedApplication: string;
  };
  specialPopulations: {
    pregnancy: string;
    lactation: string;
    paediatric: string;
    geriatric: string;
    specialSites?: string;
  };
  contraindications: string[];
  warningsPrecautions: { title: string; detail: string }[];
  adverseEffects: {
    common: string[];
    lessCommon: string[];
    rare: string[];
  };
  drugInteractions: {
    topical: string;
    systemic: string;
  };
  storageHandling: string[];
  patientCounselling: { question: string; answer: string }[];
  clinicalPearl: string;
  relatedProducts: { name: string; generic: string; slug: string }[];
  references: string[];
  hasFullMonograph: boolean;
  differentialConsiderations?: DifferentialItem[];
  treatmentConsiderations?: ConsiderationItem[];
  specialClinicalSituations?: SpecialSituationItem[];
}

export const RYAN_PRODUCTS: RyanProduct[] = [
  {
    "id": "biosicle-plus",
    "slug": "biosicle-plus",
    "brandName": "BIOSICLE PLUS",
    "genericName": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
    "tagline": "Dermatology Nutritional Support",
    "therapeuticArea": "Hair & Scalp",
    "route": "Oral / Systematic",
    "routeSubcategory": "Hair & Scalp",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packSize": "10 × 1 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
    "composition": [
      "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
      "Formulated in a specialized pharmaceutical tablet base."
    ],
    "therapeuticCategory": "Dermatology Nutritional Supplement",
    "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Biotin 10 mg to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic hair & scalp conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of hair & scalp."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "BIOSICLE PLUS combines biotin, calcium pantothenate, N-acetylcysteine, zinc, selenium and copper to provide nutritional and antioxidant support relevant to normal hair, skin and tissue physiology. Its most appropriate clinical role is as an adjunct within a diagnosis-driven dermatological management plan. Nutritional deficiencies should be investigated when clinically suspected, while persistent or patterned hair loss should receive appropriate diagnostic evaluation and disease-specific treatment.",
    "relatedProducts": [
      {
        "name": "TRESSICLE 2.5",
        "generic": "Minoxidil 2.5 mg Tablet",
        "slug": "tressicle-2-5"
      },
      {
        "name": "TRESSICLE 5",
        "generic": "Minoxidil 5 mg Tablet",
        "slug": "tressicle-5"
      },
      {
        "name": "TRESSICLE FORTE",
        "generic": "Minoxidil 5% Solution",
        "slug": "tressicle-forte"
      }
    ],
    "references": [
      "Approved Prescribing Information – BIOSICLE PLUS.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "blismin-20",
    "slug": "blismin-20",
    "brandName": "BLISMIN-20",
    "genericName": "Bilastine 20 mg Tablet",
    "tagline": "Second-Generation H1-Antihistamine for Symptomatic Relief of Allergic Rhinoconjunctivitis and Urticaria",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "20 mg",
    "packSize": "10 × 10 Alu-Alu Tablets",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
    "composition": [
      "Each tablet contains:",
      "Bilastine 20 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Second-Generation H1-Antihistamine • Oral • Allergic Rhinoconjunctivitis • Urticaria",
    "pharmacologicalClass": "Second-generation antihistamine with selective peripheral H1-receptor antagonist activity. It has no affinity for muscarinic receptors according to current product information.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Allergen exposure Histamine release (Peripheral H1-receptor activation) Bilastine blocks peripheral H1-receptor-mediated effects (Reduced histamine-mediated symptoms)"
      }
    ],
    "indications": [
      "ALLERGIC RHINOCONJUNCTIVITIS",
      "URTICARIA"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "The treating physician should assess the clinical need and potential risk.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Accordion — ELDERLY PATIENTS",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Bilastine 20 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Bilastine is contraindicated in patients with hypersensitivity to bilastine or any relevant excipient."
      },
      {
        "title": "DRIVING & MACHINERY",
        "detail": "A clinical study found that bilastine 20 mg did not impair driving performance; however, individual responses may vary. Patients should establish their individual response before undertaking activities requiring full alertness."
      },
      {
        "title": "CARDIAC CONSIDERATIONS",
        "detail": "Current clinical development data did not demonstrate clinically significant QTc prolongation at therapeutic dosing, although QT prolongation has been reported post-marketing. Management Implications Consider the patient's overall medication and cardiovascular profile where clinically appropriate."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Particular attention should be given to medicines that may affect bilastine exposure. In patients with moderate or severe renal impairment, concomitant administration with certain P-glycoprotein inhibitors may increase bilastine plasma levels."
      }
    ],
    "adverseEffects": {
      "common": [
        "Clinical trials of bilastine 20 mg reported adverse events such as:",
        "Headache",
        "Somnolence",
        "Dizziness",
        "Fatigue",
        "The overall incidence of adverse events was comparable with placebo in the cited clinical development programme."
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD BLISMIN-20 BE TAKEN?",
        "answer": "Take the prescribed tablet once daily with water. For optimal administration: Take 1 hour before OR 2 hours after food or fruit juice. Patient Education Pearl \"One tablet once daily—with water, away from meals and fruit juice.\""
      },
      {
        "question": "WHY NOT WITH FRUIT JUICE?",
        "answer": "Fruit juice can reduce the absorption of bilastine. Patients should therefore take the tablet with water and observe the recommended timing interval."
      },
      {
        "question": "CAN IT CAUSE SLEEPINESS?",
        "answer": "Bilastine is a second-generation antihistamine with a low sedative profile. However, individual responses may vary. Patients should understand their own response before driving or operating machinery."
      },
      {
        "question": "WHAT IF I MISS A DOSE?",
        "answer": "Patients should follow the approved product information and their physician's instructions. They should not take additional tablets simply to compensate for a missed dose unless specifically instructed."
      },
      {
        "question": "HOW LONG SHOULD IT BE TAKEN?",
        "answer": "Treatment duration depends on the clinical condition. For seasonal allergic symptoms, treatment may be used during relevant allergen exposure. For persistent allergic disease or urticaria, duration should be determined by the clinical course and treating physician."
      },
      {
        "question": "WHAT IF SYMPTOMS PERSIST?",
        "answer": "Persistent symptoms should prompt assessment of: Diagnosis Trigger exposure Treatment adherence Administration timing Disease severity Need for additional or alternative therapy Patient Education Pearl Before changing treatment, check whether BLISMIN-20 is being taken correctly—particularly its timing relative to food and fruit juice."
      }
    ],
    "clinicalPearl": "BLISMIN-20 provides a once-daily 20 mg bilastine option for adults and adolescents ≥12 years with appropriate allergic rhinoconjunctivitis or urticaria. Correct administration—particularly taking the tablet away from food and fruit juice—is an important part of achieving the intended therapeutic effect.",
    "relatedProducts": [
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      },
      {
        "name": "HIVOZIN-5",
        "generic": "Levocetirizine 5 mg Tablet",
        "slug": "hivozin-5"
      }
    ],
    "references": [
      "Bilastine 20 mg Tablets — Summary of Product Characteristics. Current prescribing information covering indications, dosage, administration, interactions, precautions, pharmacology and safety.",
      "Ilaxten 20 mg Tablets — Summary of Product Characteristics. Bilastine clinical and prescribing information.",
      "Current approved BLISMIN-20 product information and package insert — to be used as the primary source for final product-specific indications, dosage, contraindications, warnings, precautions, excipients, storage and regulatory statements."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ALLERGIC RHINITIS / RHINOCONJUNCTIVITIS",
        "clinicalClues": [
          "Recurrent sneezing",
          "Nasal itching",
          "Rhinorrhoea",
          "Nasal congestion",
          "Ocular symptoms",
          "Relationship to allergen exposure"
        ],
        "typicalAppearance": "The nasal mucosa may appear pale and oedematous; ocular symptoms may include watering and conjunctival redness.",
        "diagnosticApproach": [
          "Assess:",
          "Seasonal pattern",
          "Environmental exposures",
          "Atopic history",
          "Symptom duration",
          "Associated asthma or eczema"
        ],
        "managementApproach": [
          "Consider allergen avoidance and appropriate pharmacological treatment."
        ],
        "clinicalPearl": "A consistent relationship between symptoms and allergen exposure can be an important diagnostic clue."
      },
      {
        "id": "diff-2",
        "condition": "VIRAL UPPER RESPIRATORY INFECTION",
        "clinicalClues": [
          "Acute onset",
          "Sore throat",
          "Malaise",
          "Cough",
          "Fever may occur",
          "Symptoms are not necessarily allergen-related"
        ],
        "typicalAppearance": "Nasal congestion and rhinorrhoea may resemble allergic rhinitis, but systemic features may be more prominent.",
        "diagnosticApproach": [
          "Consider:",
          "Duration",
          "Fever",
          "Sick contacts",
          "Systemic symptoms",
          "Seasonal/allergen pattern"
        ],
        "managementApproach": [
          "Antihistamine therapy should not automatically be used when symptoms are more consistent with an acute infectious process."
        ],
        "clinicalPearl": "The combination of systemic symptoms and short acute duration can help distinguish infection from allergic disease."
      },
      {
        "id": "diff-3",
        "condition": "NON-ALLERGIC RHINITIS",
        "clinicalClues": [
          "Symptoms may occur without a clear allergen trigger.",
          "Possible associations include:",
          "Environmental irritants",
          "Temperature changes",
          "Strong odours",
          "Hormonal influences",
          "Other non-allergic triggers"
        ],
        "typicalAppearance": "Predominantly nasal symptoms without a consistent allergic trigger.",
        "diagnosticApproach": [
          "Assess the relationship between symptoms and:",
          "Environment",
          "Irritants",
          "Medications",
          "Seasonal changes"
        ],
        "managementApproach": [
          "Treatment should be directed toward the underlying rhinitis phenotype."
        ],
        "clinicalPearl": "Not every runny or blocked nose is allergic in origin."
      },
      {
        "id": "diff-4",
        "condition": "URTICARIA VS OTHER PRURITIC ERUPTIONS",
        "clinicalClues": [
          "Urticaria typically presents with transient wheals and significant itching.",
          "Consider alternative diagnoses when lesions:",
          "Persist at the same site",
          "Leave residual pigmentation",
          "Become scaly",
          "Develop vesicles or crusting",
          "Are painful rather than primarily pruritic"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess lesion duration and morphology carefully."
        ],
        "managementApproach": [
          "Persistent or atypical lesions warrant diagnostic reassessment."
        ],
        "clinicalPearl": "A lesion that remains fixed for an unusually long period deserves closer examination rather than being labelled automatically as urticaria."
      },
      {
        "id": "diff-5",
        "condition": "DRUG-RELATED ALLERGIC REACTION",
        "clinicalClues": [
          "Consider medication-related disease when symptoms follow:",
          "Introduction of a new medicine",
          "Dose escalation",
          "Re-exposure",
          "Combination therapy"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Construct a medication timeline."
        ],
        "managementApproach": [
          "Suspected drug hypersensitivity requires appropriate clinical evaluation."
        ],
        "clinicalPearl": "The medication timeline can be as informative as the appearance of the rash."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "STANDARD ADULT & ADOLESCENT REGIMEN",
        "keyPoints": [
          "For adults and adolescents aged 12 years and over, current prescribing information recommends:",
          "Bilastine 20 mg once daily",
          "for symptomatic treatment of allergic rhinoconjunctivitis and urticaria."
        ],
        "details": [],
        "practicalExample": "1 BLISMIN-20 tablet once daily, according to the approved prescribing information and physician's prescription. A patient with symptomatic allergic rhinoconjunctivitis may be prescribed: BLISMIN-20 20 mg — once daily Management Implications Treatment duration should be determined by the clinical condition and symptom course.",
        "clinicalPearl": "The 20 mg presentation is designed for once-daily adult/adolescent dosing when prescribed according to approved indications."
      },
      {
        "title": "WHEN SHOULD BLISMIN-20 BE TAKEN?",
        "keyPoints": [
          "Bilastine absorption is affected by food and fruit juice.",
          "Current prescribing information recommends taking the tablet:",
          "1 hour before OR 2 hours after food or fruit juice."
        ],
        "details": [],
        "practicalExample": "Take the prescribed tablet with water while observing the recommended food/fruit-juice interval. Morning option:Take BLISMIN-20 with water and wait at least 1 hour before breakfast. Alternative:Take BLISMIN-20 at least 2 hours after a meal. Management Implications Consistent administration away from food and fruit juice helps maintain appropriate exposure.",
        "clinicalPearl": "\"Once daily\" is not the only administration instruction that matters—timing relative to food and fruit juice is clinically important with bilastine."
      },
      {
        "title": "FRUIT JUICE INTERACTION",
        "keyPoints": [
          "Fruit juice can reduce the bioavailability of bilastine.",
          "The prescribing information therefore recommends administration away from fruit juice."
        ],
        "details": [],
        "practicalExample": "Administer BLISMIN-20 with water and observe the recommended interval from fruit juice. Avoid taking the tablet together with a glass of fruit juice. Management Implications Poor administration timing may reduce systemic exposure and potentially compromise symptom control.",
        "clinicalPearl": "A simple patient instruction—\"take with water, away from food and fruit juice\"—can improve correct use."
      },
      {
        "title": "DURATION OF THERAPY",
        "keyPoints": [
          "Treatment duration depends on the clinical condition.",
          "For allergic rhinoconjunctivitis:",
          "Seasonal disease may be treated during allergen exposure.",
          "Treatment may be discontinued after symptoms resolve and restarted when symptoms recur, according to clinical assessment.",
          "Persistent disease may require continued treatment during relevant allergen exposure periods.",
          "For urticaria, duration depends on the type, duration and course of symptoms."
        ],
        "details": [],
        "practicalExample": "A patient with seasonal allergic symptoms may require treatment primarily during the relevant allergen season. Management Implications Treatment duration should be individualised rather than automatically fixed.",
        "clinicalPearl": "The clinical pattern should determine duration—not simply the number of tablets in the pack."
      },
      {
        "title": "SEDATION & DAILY FUNCTION",
        "keyPoints": [
          "Bilastine is classified as a non-sedating second-generation antihistamine, although individual responses may vary.",
          "In clinical studies, somnolence occurred at a frequency comparable to placebo."
        ],
        "details": [],
        "practicalExample": "Patients should follow the prescribed dose. A patient starting therapy should still be aware of their individual response before undertaking activities requiring full alertness. Management Implications Individual response should guide counselling regarding driving or machinery.",
        "clinicalPearl": "A low potential for sedation does not mean that individual responses can be ignored."
      },
      {
        "title": "ELDERLY PATIENTS",
        "keyPoints": [
          "Current prescribing information does not require routine dose adjustment in elderly adults.",
          "Management Implications",
          "Clinical assessment should nevertheless consider:",
          "Renal function",
          "Polypharmacy",
          "Comorbidities",
          "Overall treatment burden"
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Age alone may not require dose adjustment, but the complete patient profile still matters."
      },
      {
        "title": "RENAL IMPAIRMENT",
        "keyPoints": [
          "Current prescribing information indicates that routine dose adjustment is not required in adults with renal impairment.",
          "However, in patients with moderate or severe renal impairment, coadministration with certain P-glycoprotein inhibitors may increase bilastine exposure and should be avoided according to the cited product information. Examples include ketoconazole, erythromycin, cyclosporine, ritonavir and diltiazem.",
          "Management Implications",
          "Review renal status and concomitant medicines where clinically relevant."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Renal impairment becomes particularly important when relevant interacting medicines are also present."
      },
      {
        "title": "HEPATIC IMPAIRMENT",
        "keyPoints": [
          "Bilastine is not metabolised in humans to a clinically significant extent according to current prescribing information.",
          "No routine dose adjustment is identified for adult hepatic impairment in the cited SmPC.",
          "Management Implications",
          "Clinical assessment should remain individualised."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "The absence of a routine hepatic dose adjustment does not remove the need for overall clinical assessment."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "SEASONAL ALLERGIC RHINOCONJUNCTIVITIS",
        "keyPoints": [
          "Symptoms may correspond closely with seasonal allergen exposure.",
          "Typical Clinical Presentation",
          "Sneezing",
          "Nasal itching",
          "Rhinorrhoea",
          "Nasal congestion",
          "Watery or itchy eyes"
        ],
        "details": [],
        "practicalExample": "Identify relevant allergen exposure and use appropriate pharmacological treatment during symptomatic periods.",
        "clinicalPearl": "Seasonality can help both diagnosis and treatment planning."
      },
      {
        "title": "PERENNIAL ALLERGIC RHINOCONJUNCTIVITIS",
        "keyPoints": [
          "Symptoms may persist or recur throughout the year.",
          "Typical Clinical Presentation",
          "Persistent or recurrent nasal and ocular symptoms."
        ],
        "details": [],
        "practicalExample": "Assess ongoing exposure to relevant indoor or environmental allergens.",
        "clinicalPearl": "When symptoms are persistent, look for persistent exposure rather than assuming repeated acute infections."
      },
      {
        "title": "RECURRENT URTICARIA",
        "keyPoints": [
          "Assess:",
          "Frequency",
          "Duration",
          "Potential triggers",
          "Medication history",
          "Associated angioedema",
          "Typical Clinical Appearance",
          "Recurrent transient wheals with pruritus."
        ],
        "details": [],
        "practicalExample": "Antihistamine therapy may be used according to the clinical diagnosis and approved indication.",
        "clinicalPearl": "Document the pattern of recurrence and associated triggers to support longer-term management."
      },
      {
        "title": "ATYPICAL OR PERSISTENT WHEALS",
        "keyPoints": [
          "Reconsider the diagnosis when lesions:",
          "Persist at the same site",
          "Become painful",
          "Leave bruising or pigmentation",
          "Develop scale",
          "Show unusual morphology"
        ],
        "details": [],
        "practicalExample": "Further diagnostic evaluation may be appropriate.",
        "clinicalPearl": "Not every persistent itchy plaque is urticaria."
      }
    ]
  },
  {
    "id": "blismin-m",
    "slug": "blismin-m",
    "brandName": "BLISMIN-M",
    "genericName": "Bilastine 20 mg + Montelukast 10 mg Tablet",
    "tagline": "Dual-Pathway Antiallergic Therapy for Appropriate Allergic Rhinitis",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "Bilastine 20 mg + Montelukast 10 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Antiallergic / Leukotriene Modifier Combination",
    "composition": [
      "Each film-coated tablet contains:",
      "Bilastine IP — 20 mg",
      "Montelukast Sodium IP equivalent to Montelukast — 10 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Dual-Pathway Antiallergic Therapy • Bilastine: A second-generation selective peripheral H1-antihistamine. • Montelukast: A leukotriene receptor antagonist that blocks the cysteinyl leukotriene receptor pathway. • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological allergy & pruritus therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Dual-Pathway Model Allergen exposure Histamine release H1 receptor activation Bilastine blocks H1-receptor Leukotriene generation CysLT1 receptor activation Montelukast blocks CysLT1 receptor"
      }
    ],
    "indications": [
      "ALLERGIC RHINITIS",
      "ALLERGIC RHINOCONJUNCTIVITIS",
      "PATIENTS WITH PROMINENT NASAL CONGESTION"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Accordion — BREASTFEEDING",
      "lactation": "Accordion — RENAL IMPAIRMENT",
      "paediatric": "Accordion — ELDERLY PATIENTS",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Bilastine 20 mg + Montelukast 10 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Some patients may develop some neuropsychiatric effects like Sleep disturbances, Abnormal dreams,Agitation, Irritability, Anxiety, Depression, behavioural changes etc. due to Monteluast.",
        "Bilastine has some adverse effects like Headache, Somnolence, Dizziness, Fatigue.",
        "BLISMIN-M should not be used in patients with known hypersensitivity to: Bilastine, Montelukast or Relevant formulation components"
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD BLISMIN-M BE TAKEN?",
        "answer": "Take: One tablet once daily with water, according to the physician's prescription. Because of the bilastine component: Take 1 hour before OR 2 hours after food or fruit juice. Patient Education Pearl \"One tablet once daily, with water, away from meals and fruit juice.\""
      },
      {
        "question": "WHY SHOULD FRUIT JUICE BE AVOIDED AROUND THE DOSE?",
        "answer": "Fruit juice can reduce bilastine exposure. Patients should therefore use water for administration."
      },
      {
        "question": "WHAT SHOULD PATIENTS KNOW ABOUT MONTELUKAST?",
        "answer": "Patients should be informed about possible neuropsychiatric effects. They should promptly contact their healthcare professional if they experience new or worsening: Behavioural changes Mood changes Anxiety Depression Sleep disturbances Agitation Suicidal thoughts or behaviour The FDA recommends counselling and monitoring all patients receiving montelukast for neuropsychiatric symptoms."
      },
      {
        "question": "CAN THE PATIENT DRIVE?",
        "answer": "Bilastine has a low sedative profile, but individual responses may vary. Patients should establish their individual response before undertaking activities requiring full alertness."
      },
      {
        "question": "WHAT IF SYMPTOMS PERSIST?",
        "answer": "Reassess: Diagnosis Treatment adherence Administration timing Allergen exposure Disease severity Structural nasal disease Need for alternative/additional therapy Patient Education Pearl Persistent symptoms should be reviewed rather than prompting self-escalation of medication."
      },
      {
        "question": "SHOULD THE PATIENT STOP THE MEDICINE IF MOOD OR BEHAVIOURAL CHANGES OCCUR?",
        "answer": "Patients experiencing new or worsening neuropsychiatric symptoms should contact a healthcare professional promptly. For serious or concerning symptoms, immediate medical attention is appropriate. The FDA specifically advises patients to stop montelukast and contact a healthcare professional immediately if new neuropsychiatric symptoms or suicidal thoughts/behaviour occur."
      }
    ],
    "clinicalPearl": "BLISMIN-M combines peripheral H1-receptor blockade with leukotriene receptor antagonism for appropriately selected allergic rhinitis patients. Correct administration of bilastine—particularly away from food and fruit juice—is important, while montelukast therapy requires explicit counselling regarding potential neuropsychiatric effects.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      },
      {
        "name": "HIVOZIN-5",
        "generic": "Levocetirizine 5 mg Tablet",
        "slug": "hivozin-5"
      }
    ],
    "references": [
      "Indian Pharmacopoeia Commission. Bilastine and Montelukast Tablets. Indian Pharmacopoeia monograph, including the usual strength of bilastine 20 mg + montelukast 10 mg.",
      "Bilastine 20 mg + Montelukast 10 mg Tablets — Product Information. Clinical particulars, composition, administration and safety information.",
      "U.S. FDA. Montelukast Drug Safety Communication. Boxed warning and recommendations concerning serious neuropsychiatric events and use in allergic rhinitis.",
      "Current approved BLISMIN-M product information and package insert — primary source for final product-specific indications, dosage, contraindications, warnings, precautions, excipients, storage and regulatory statements."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "VIRAL UPPER RESPIRATORY INFECTION",
        "clinicalClues": [
          "Acute onset",
          "Sore throat",
          "Cough",
          "Malaise",
          "Possible fever",
          "Sick contacts"
        ],
        "typicalAppearance": "Nasal congestion and rhinorrhoea may resemble allergic rhinitis.",
        "diagnosticApproach": [
          "Assess:",
          "Duration",
          "Fever",
          "Systemic symptoms",
          "Exposure history",
          "Seasonal pattern"
        ],
        "managementApproach": [
          "Avoid automatically labelling every episode of rhinorrhoea or congestion as allergic rhinitis."
        ],
        "clinicalPearl": "Systemic symptoms and a short self-limited course may favour an infectious rather than allergic process."
      },
      {
        "id": "diff-2",
        "condition": "NON-ALLERGIC RHINITIS",
        "clinicalClues": [
          "Symptoms may occur without a clear allergen trigger.",
          "Potential triggers include:",
          "Strong odours",
          "Smoke",
          "Temperature changes",
          "Environmental irritants",
          "Certain medications"
        ],
        "typicalAppearance": "Predominantly nasal symptoms without a consistent allergic pattern.",
        "diagnosticApproach": [
          "Identify environmental and medication-related triggers."
        ],
        "managementApproach": [
          "Treatment should be directed toward the underlying rhinitis phenotype."
        ],
        "clinicalPearl": "A patient can have troublesome rhinitis without having an allergic mechanism."
      },
      {
        "id": "diff-3",
        "condition": "CHRONIC RHINOSINUSITIS",
        "clinicalClues": [
          "Consider when symptoms include:",
          "Persistent nasal obstruction",
          "Facial pressure",
          "Reduced smell",
          "Prolonged nasal discharge",
          "Chronic symptoms"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Clinical examination and appropriate ENT evaluation may be required."
        ],
        "managementApproach": [
          "Persistent symptoms may require disease-specific treatment rather than repeated antihistamine therapy."
        ],
        "clinicalPearl": "Chronic nasal obstruction with altered smell or facial symptoms deserves assessment beyond routine allergy management."
      },
      {
        "id": "diff-4",
        "condition": "NASAL POLYPOSIS",
        "clinicalClues": [
          "Persistent nasal obstruction",
          "Reduced or absent smell",
          "Chronic rhinitis symptoms",
          "Recurrent sinus symptoms"
        ],
        "typicalAppearance": "Pale, oedematous polypoid lesions may be visible on nasal examination.",
        "diagnosticApproach": [],
        "managementApproach": [
          "Consider appropriate ENT evaluation and disease-directed treatment."
        ],
        "clinicalPearl": "Loss of smell associated with persistent nasal obstruction should prompt consideration of structural or inflammatory nasal disease."
      },
      {
        "id": "diff-5",
        "condition": "DRUG-RELATED RHINITIS",
        "clinicalClues": [
          "Consider medication-related rhinitis where symptoms correlate with:",
          "Repeated topical nasal decongestant use",
          "Certain systemic medicines",
          "Other relevant exposures"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Take a complete medication history."
        ],
        "managementApproach": [
          "Address the responsible medication or exposure where appropriate."
        ],
        "clinicalPearl": "Medication history is an essential component of chronic rhinitis assessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "STANDARD COMBINATION REGIMEN",
        "keyPoints": [
          "Indian product information for bilastine 20 mg + montelukast 10 mg combination products describes:",
          "One tablet once daily",
          "for adults with allergic rhinitis."
        ],
        "details": [],
        "practicalExample": "BLISMIN-M — 1 tablet once daily, according to the physician's prescription and approved product information. A patient with appropriately diagnosed allergic rhinitis who is selected for combination therapy may receive: Bilastine 20 mg + Montelukast 10 mg once daily. Management Implications The need for continued combination therapy should be reassessed according to symptom control and treatment response.",
        "clinicalPearl": "Use the combination when both components are clinically justified—not simply because two agents are available in one tablet."
      },
      {
        "title": "ADMINISTRATION WITH FOOD",
        "keyPoints": [
          "Bilastine absorption is affected by food and fruit juice.",
          "Bilastine product information recommends administration 1 hour before or 2 hours after food or fruit juice."
        ],
        "details": [],
        "practicalExample": "Take BLISMIN-M with water while observing the appropriate interval from meals and fruit juice. Morning:Take the tablet with water and wait at least 1 hour before breakfast. Alternative:Take it at least 2 hours after a meal. Management Implications Consistent administration away from food and fruit juice helps avoid reduced bilastine exposure.",
        "clinicalPearl": "For BLISMIN-M, \"once daily\" should be accompanied by clear counselling about administration relative to food and fruit juice."
      },
      {
        "title": "FRUIT JUICE",
        "keyPoints": [
          "Fruit juice can reduce bilastine exposure."
        ],
        "details": [],
        "practicalExample": "Take BLISMIN-M with water rather than fruit juice. Do not take the tablet together with orange, grapefruit or other fruit juice. Management Implications Patients should understand that this is an administration issue related to the bilastine component.",
        "clinicalPearl": "A simple instruction—\"take with water, away from fruit juice\"—can prevent avoidable reduction in bilastine exposure."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Duration depends on:",
          "Seasonal vs perennial disease",
          "Symptom severity",
          "Allergen exposure",
          "Treatment response",
          "Recurrence pattern"
        ],
        "details": [],
        "practicalExample": "A patient with seasonal allergic rhinitis may require treatment during the relevant allergen exposure period. Management Implications Continued combination treatment should be periodically reassessed.",
        "clinicalPearl": "Treatment duration should follow the disease pattern rather than automatically continuing indefinitely."
      },
      {
        "title": "STEP-DOWN / REASSESSMENT",
        "keyPoints": [
          "When symptoms are adequately controlled, reassess:",
          "Continued need for combination therapy",
          "Persistent allergen exposure",
          "Adherence",
          "Disease severity",
          "Alternative treatment options",
          "Management Implications",
          "The therapeutic regimen should remain aligned with the patient's current clinical need."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Good symptom control is an opportunity to reassess treatment intensity, not simply to continue every component indefinitely."
      },
      {
        "title": "WHEN COMBINATION THERAPY MAY NOT BE NECESSARY",
        "keyPoints": [
          "Consider whether both components remain necessary when:",
          "Symptoms are mild",
          "Symptoms are controlled with simpler therapy",
          "One component provides adequate control",
          "The diagnosis is uncertain",
          "Management Implications",
          "Avoid unnecessary polypharmacy."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "A fixed-dose combination should have a clear clinical rationale."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "PROMINENT NASAL CONGESTION",
        "keyPoints": [
          "Nasal obstruction may be particularly troublesome in some allergic rhinitis phenotypes.",
          "Typical Clinical Presentation",
          "Blocked nose",
          "Mouth breathing",
          "Sleep disturbance",
          "Reduced nasal airflow"
        ],
        "details": [],
        "practicalExample": "Assess: Allergy control Nasal anatomy Structural obstruction Adherence Need for topical nasal therapy",
        "clinicalPearl": "Persistent obstruction should trigger phenotype reassessment rather than indefinite escalation of oral therapy."
      },
      {
        "title": "SEASONAL ALLERGIC RHINITIS",
        "keyPoints": [
          "Symptoms correspond with specific seasonal allergen exposure.",
          "Typical Clinical Presentation",
          "Sneezing",
          "Itching",
          "Rhinorrhoea",
          "Congestion",
          "Ocular symptoms"
        ],
        "details": [],
        "practicalExample": "Combine appropriate medication with exposure reduction where feasible.",
        "clinicalPearl": "Understanding the patient's seasonal pattern can help anticipate treatment requirements."
      },
      {
        "title": "PERENNIAL ALLERGIC RHINITIS",
        "keyPoints": [
          "Symptoms recur throughout the year.",
          "Common Associations",
          "House-dust mite exposure",
          "Indoor allergens",
          "Pet allergens",
          "Persistent environmental triggers"
        ],
        "details": [],
        "practicalExample": "Identify ongoing exposure and reassess treatment response.",
        "clinicalPearl": "Persistent symptoms should prompt a search for persistent exposure."
      },
      {
        "title": "RECURRENT SYMPTOMS DESPITE THERAPY",
        "keyPoints": [
          "Consider:",
          "Poor adherence",
          "Incorrect administration",
          "Continued allergen exposure",
          "Incorrect diagnosis",
          "Structural nasal disease",
          "Comorbid sinus disease"
        ],
        "details": [],
        "practicalExample": "Reassess before simply adding additional medication.",
        "clinicalPearl": "Treatment failure is often a reason to reassess the diagnosis, adherence and administration—not automatically to increase medication."
      }
    ]
  },
  {
    "id": "cinimup",
    "slug": "cinimup",
    "brandName": "CINIMUP",
    "genericName": "Mupirocin 2% Ointment",
    "tagline": "Topical Antibacterial Preparation — Treatment of selected susceptible superficial bacterial skin infections",
    "therapeuticArea": "Antibacterial",
    "route": "Topical",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Ointment",
    "strength": "2% w/w",
    "packSize": "5 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Clinical Use: Mupirocin is intended for selected localized bacterial skin infections; it should not be used indiscriminately for every inflamed, itchy or crusted skin lesion.",
    "composition": [
      "Each gram of ointment contains:",
      "Mupirocin — 2% w/w",
      "(Ointment base: Polyethylene Glycol Base)"
    ],
    "therapeuticCategory": "Antibacterial • Topical • superficial bacterial skin infections",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Mupirocin It binds to bacterial isoleucyl-tRNA synthetase. Interferes with incorporation of isoleucine into bacterial proteins Inhibits bacterial protein synthesis Suppresses growth of susceptible bacteria"
      }
    ],
    "indications": [
      "IMPETIGO",
      "SECONDARY BACTERIAL INFECTION OF SKIN LESIONS",
      "LOCALISED SUPERFICIAL BACTERIAL INFECTION",
      "SKIN & SOFT TISSUE INFECTION"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Mupirocin 2% Ointment or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible reactions may include: Burning Stinging Redness Itching Dryness"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Discontinue use and seek medical evaluation if a significant hypersensitivity reaction occurs. Possible warning symptoms include: Widespread rash Facial swelling Difficulty breathing Severe skin reaction"
      },
      {
        "title": "PROLONGED OR REPEATED USE",
        "detail": "Prolonged or repeated use should be avoided unless clinically justified."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY CINIMUP",
        "answer": "\"Clean and gently dry the affected area, then apply a thin layer of CINIMUP as directed by your doctor.\""
      },
      {
        "question": "HAND HYGIENE",
        "answer": "\"Wash your hands before and after application unless your hands are the area being treated.\""
      },
      {
        "question": "AVOID EYES & MUCOUS MEMBRANES",
        "answer": "\"Avoid contact with the eyes, mouth and other mucosal surfaces unless specifically directed.\""
      },
      {
        "question": "DO NOT SHARE THE OINTMENT",
        "answer": "\"Do not share the tube with another person, even if they have similar-looking skin lesions.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DOCTOR",
        "answer": "Seek medical review if: Infection spreads Pain or swelling increases Fever develops Pus increases New lesions continue appearing There is no expected improvement Severe irritation develops"
      }
    ],
    "clinicalPearl": "CINIMUP provides Mupirocin 2% w/w in a PEG-based ointment for selected superficial bacterial skin infections. Correct diagnosis, appropriate localization of therapy, proper application, limited duration and antimicrobial stewardship are central to effective topical antibacterial treatment.",
    "relatedProducts": [
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      },
      {
        "name": "ROMITIZ-500",
        "generic": "Azithromycin 500 mg Tablet",
        "slug": "romitiz-500"
      }
    ],
    "references": [
      "Current approved CINIMUP product information and package insert — primary source for indications, dosage, contraindications, warnings, precautions and adverse effects.",
      "Current mupirocin prescribing information.",
      "Current clinical guidance for impetigo and superficial bacterial skin infections.",
      "Current antimicrobial stewardship guidance.",
      "Current recommendations regarding topical antibiotic use and antimicrobial resistance."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "FUNGAL INFECTION",
        "clinicalClues": [
          "Consider fungal infection when there is:",
          "Annular morphology",
          "Peripheral scaling",
          "Central clearing",
          "Pruritus",
          "Characteristic distribution"
        ],
        "typicalAppearance": "Dermatophyte infections may show: Annular plaques Advancing scaly borders Central relative clearing",
        "diagnosticApproach": [
          "Consider:",
          "Potassium hydroxide examination",
          "Fungal culture",
          "Dermoscopy or other appropriate investigations"
        ],
        "managementApproach": [
          "Use an appropriate antifungal strategy rather than topical antibacterial therapy."
        ],
        "clinicalPearl": "Failure to respond to mupirocin should prompt reconsideration of a fungal diagnosis when morphology supports dermatophytosis."
      },
      {
        "id": "diff-2",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Pruritus",
          "Xerosis",
          "Scaling",
          "Recurrent course",
          "Exposure-related distribution"
        ],
        "typicalAppearance": "May include: Erythematous plaques Scaling Excoriations Lichenification Vesiculation in acute disease",
        "diagnosticApproach": [
          "Assess:",
          "History",
          "Distribution",
          "Chronicity",
          "Exposure",
          "Atopic background"
        ],
        "managementApproach": [
          "Treat the underlying inflammatory dermatosis. Use antibacterial therapy only when clinically supported by evidence of secondary infection."
        ],
        "clinicalPearl": "Crusting does not automatically mean bacterial infection; eczematous dermatitis may also become crusted after scratching or inflammation."
      },
      {
        "id": "diff-3",
        "condition": "HERPES SIMPLEX",
        "clinicalClues": [
          "Consider viral infection when lesions are:",
          "Painful",
          "Vesicular",
          "Grouped",
          "Recurrent at characteristic sites"
        ],
        "typicalAppearance": "Grouped vesicles may develop on an erythematous base followed by erosion or crusting.",
        "diagnosticApproach": [
          "Consider viral testing when clinically indicated."
        ],
        "managementApproach": [
          "Mupirocin does not treat herpes simplex infection."
        ],
        "clinicalPearl": "Painful grouped vesicles should prompt consideration of herpes simplex rather than assuming a bacterial infection."
      },
      {
        "id": "diff-4",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Pruritus or tenderness",
          "Hair-bearing areas"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Determine whether the process is:",
          "Bacterial",
          "Fungal",
          "Irritant",
          "Occlusion-related"
        ],
        "managementApproach": [
          "Treatment should be directed toward the identified cause."
        ],
        "clinicalPearl": "Monomorphic follicular pustules can have multiple causes; diagnosis should precede prolonged antibacterial use."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Burning or itching",
          "Clear exposure relationship",
          "Localized distribution",
          "Erythema",
          "Vesiculation"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review exposure to:",
          "Cosmetics",
          "Adhesives",
          "Dressings",
          "Topical medicines",
          "Soaps and cleansers"
        ],
        "managementApproach": [
          "Identify and remove the responsible trigger."
        ],
        "clinicalPearl": "A sharply demarcated exposure-related eruption may indicate contact dermatitis rather than bacterial infection."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "A thin layer should generally be applied to the affected area according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Apply only the amount necessary to lightly cover the affected skin. Avoid excessive application. For a small localized infected lesion, a thin film covering the affected area is generally sufficient rather than applying a thick layer over a large surrounding area. Management Implications Excessive application does not necessarily improve antibacterial efficacy and may increase local irritation.",
        "clinicalPearl": "Apply enough to cover the affected area—not enough to leave a thick visible coating."
      },
      {
        "title": "APPLICATION TECHNIQUE",
        "keyPoints": [
          "Before application:",
          "Clean the affected area appropriately",
          "Dry gently",
          "Apply a thin layer",
          "Wash hands before and after application unless the hands are the treatment site"
        ],
        "details": [],
        "practicalExample": "A patient cleans the affected area, gently dries it and applies a thin layer of CINIMUP without vigorous rubbing. Management Implications Appropriate application supports consistent topical exposure.",
        "clinicalPearl": "Good application technique is part of effective topical antibiotic therapy."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Treatment duration should follow the approved product information and indication-specific clinical guidance."
        ],
        "details": [],
        "practicalExample": "A localized bacterial infection should be reassessed if it fails to improve within the expected clinical timeframe rather than prompting indefinite extension of topical antibiotic therapy. Management Implications Persistent infection may indicate: Resistant organisms Incorrect diagnosis Inadequate application Deeper infection Re-exposure Need for systemic therapy",
        "clinicalPearl": "Failure to improve should trigger reassessment rather than automatic prolongation of topical antibiotic treatment."
      },
      {
        "title": "TOPICAL VS SYSTEMIC THERAPY",
        "keyPoints": [
          "Topical therapy may be appropriate for selected localized superficial infections.",
          "Systemic therapy may be required when there is:",
          "Extensive involvement",
          "Deep infection",
          "Significant cellulitis",
          "Systemic symptoms",
          "Rapid progression",
          "High-risk patient factors"
        ],
        "details": [],
        "practicalExample": "A small localized superficial infection may be managed topically, whereas spreading erythema with fever requires broader assessment. Management Implications Recognizing the extent of infection is critical to selecting the appropriate treatment route.",
        "clinicalPearl": "The size and depth of infection matter as much as the organism when deciding between topical and systemic treatment."
      },
      {
        "title": "OCCLUSIVE DRESSINGS",
        "keyPoints": [
          "If a dressing is considered, it should be used only when clinically appropriate."
        ],
        "details": [],
        "practicalExample": "A localized lesion may be covered with an appropriate dressing when required for wound protection. Management Implications Occlusion can alter the local environment and should not be used indiscriminately.",
        "clinicalPearl": "The decision to cover a treated lesion should consider wound characteristics, infection status and clinical need."
      },
      {
        "title": "ANTIMICROBIAL STEWARDSHIP",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "AVOID UNNECESSARY USE",
        "keyPoints": [],
        "details": [
          "Not every crusted lesion requires a topical antibiotic."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "RESISTANCE",
        "keyPoints": [],
        "details": [
          "Mupirocin should be treated as an antibiotic—not as a general-purpose wound or skin-care product."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "RECURRENT INFECTIONS",
        "keyPoints": [],
        "details": [
          "Recurrent infection is a reason to investigate the underlying cause rather than simply repeating topical antibiotic therapy."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "EXTENSIVE SKIN INVOLVEMENT",
        "keyPoints": [
          "Assess for:",
          "Widespread erythema",
          "Rapid progression",
          "Significant pain",
          "Fever",
          "Systemic symptoms"
        ],
        "details": [],
        "practicalExample": "Extensive or deeper infection may require systemic therapy and/or specialist assessment.",
        "clinicalPearl": "A topical antibiotic should not delay recognition of a potentially serious or deep bacterial infection."
      },
      {
        "title": "SUSPECTED ABSCESS",
        "keyPoints": [
          "Consider:",
          "Localized fluctuant swelling",
          "Significant tenderness",
          "Purulent collection",
          "Local warmth"
        ],
        "details": [],
        "practicalExample": "Assess whether incision and drainage or other procedural management is required.",
        "clinicalPearl": "A collection of pus may require drainage; topical antibiotic therapy alone may not adequately treat an abscess."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Assess:",
          "Extent of infection",
          "Rate of progression",
          "Systemic symptoms",
          "Underlying immunosuppression"
        ],
        "details": [],
        "practicalExample": "Use a lower threshold for clinical review and escalation when appropriate.",
        "clinicalPearl": "Host factors can alter both infection severity and the threshold for systemic treatment."
      },
      {
        "title": "RECURRENT IMPETIGO",
        "keyPoints": [
          "Consider:",
          "Repeated episodes",
          "Household contacts",
          "Nasal bacterial carriage",
          "Underlying skin disease",
          "Previous antibiotic exposure"
        ],
        "details": [],
        "practicalExample": "Reassess the diagnosis and consider appropriate microbiological evaluation and decolonization strategies when clinically indicated.",
        "clinicalPearl": "Recurrent impetigo warrants assessment of the patient, household and potential bacterial carriage rather than repeated empirical treatment alone."
      }
    ]
  },
  {
    "id": "clixodin-ad",
    "slug": "clixodin-ad",
    "brandName": "CLIXODIN-AD",
    "genericName": "Clindamycin 1% + Adapalene 0.1% Gel",
    "tagline": "Topical Anti-Acne Preparation",
    "therapeuticArea": "Acne",
    "route": "Topical",
    "routeSubcategory": "Acne",
    "dosageForm": "Gel",
    "strength": "1%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected acne presentations with both comedonal and inflammatory components",
    "composition": [
      "Each gram of gel contains:",
      "Clindamycin — 1% w/w",
      "Adapalene — 0.1% w/w",
      "Gel base: q.s."
    ],
    "therapeuticCategory": "ANTIMICROBIAL • RETINOID • TOPICAL • ANTI-ACNE",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "CLINDAMYCIN",
        "description": "Inhibits bacterial protein synthesis by binding to the bacterial 50S ribosomal subunit."
      },
      {
        "step": "02",
        "title": "ADAPALENE",
        "description": "Normalizes processes involved in follicular keratinization."
      },
      {
        "step": "03",
        "title": "COMPLEMENTARY ACTION",
        "description": "Addresses different components of acne which is useful when inflammatory and comedonal lesions coexist."
      }
    ],
    "indications": [
      "Mixed comedonal and inflammatory acne",
      "Comedonal acne with inflammatory component",
      "Papulopustular acne"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Clindamycin 1% + Adapalene 0.1% Gel or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible effects include: Dryness Scaling Burning Stinging Erythema Peeling"
      },
      {
        "title": "EYE AND MUCOUS MEMBRANE CONTACT",
        "detail": "Avoid contact with: Eyes Eyelids Lips Nasal and other mucosal surfaces If accidental contact occurs, rinse appropriately."
      },
      {
        "title": "BROKEN OR SEVERELY IRRITATED SKIN",
        "detail": "Avoid unnecessary application to severely compromised skin unless specifically directed by the treating clinician."
      },
      {
        "title": "ANTIBIOTIC-ASSOCIATED DIARRHOEA",
        "detail": "Although topical, clindamycin has been associated rarely with antibiotic-associated diarrhoea and colitis. Patients should seek medical attention for significant or persistent diarrhoea during or following treatment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Cleanse the affected area gently, allow it to dry, and apply a thin layer of CLIXODIN-AD as directed by your doctor.\""
      },
      {
        "question": "EXPECT GRADUAL IMPROVEMENT",
        "answer": "\"Acne treatment usually requires consistent use over time. Do not stop treatment prematurely simply because improvement is not immediate.\""
      },
      {
        "question": "EXPECT POSSIBLE EARLY DRYNESS",
        "answer": "\"Some dryness, scaling or mild irritation may occur when starting adapalene. Inform your doctor if irritation becomes severe or persistent.\""
      },
      {
        "question": "AVOID HARSH SKIN CARE",
        "answer": "\"Avoid excessive scrubbing, picking, harsh exfoliants and other products that may unnecessarily irritate your skin.\""
      },
      {
        "question": "SUN PROTECTION",
        "answer": "\"Limit excessive sun exposure and use appropriate daytime photoprotection, particularly if your skin becomes irritated or you are prone to pigmentation.\""
      },
      {
        "question": "DO NOT USE DURING PREGNANCY WITHOUT MEDICAL REVIEW",
        "answer": "\"Inform your doctor if you are pregnant, planning pregnancy or may become pregnant before using an adapalene-containing product.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DOCTOR",
        "answer": "Seek medical review if: Acne is rapidly worsening Deep painful nodules develop New scarring appears Severe irritation occurs Significant or persistent diarrhoea develops There is no expected improvement Acne repeatedly relapses"
      }
    ],
    "clinicalPearl": "CLIXODIN-AD combines Clindamycin 1% w/w with Adapalene 0.1% w/w to address complementary components of acne, including bacterial/inflammatory activity and abnormal follicular keratinisation. Appropriate patient selection, consistent application, management of retinoid-related irritation and responsible antibiotic use are central to effective therapy.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-BPO",
        "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
        "slug": "clixodin-bpo"
      },
      {
        "name": "CLIXODIN-NT",
        "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
        "slug": "clixodin-nt"
      },
      {
        "name": "I-TACNOID 20",
        "generic": "Isotretinoin 20 mg Softgel Capsule",
        "slug": "i-tacnoid-20"
      }
    ],
    "references": [
      "Current approved CLIXODIN-AD product information and package insert — primary source for product-specific indications, dosage, contraindications, warnings, precautions and adverse effects.",
      "Current prescribing information for topical clindamycin.",
      "Current prescribing information for adapalene.",
      "Current evidence-based clinical guidelines for acne vulgaris.",
      "Current recommendations concerning topical antibiotic use and antimicrobial stewardship in acne.",
      "Current dermatology guidance concerning acne severity, scarring risk and treatment escalation."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ROSACEA",
        "clinicalClues": [
          "Consider rosacea with:",
          "Persistent central facial erythema",
          "Flushing",
          "Telangiectasia",
          "Papules/pustules",
          "Trigger-related exacerbations"
        ],
        "typicalAppearance": "Predominantly centrofacial erythema with inflammatory papules or pustules.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Flushing",
          "Triggers",
          "Presence or absence of comedones"
        ],
        "managementApproach": [
          "Use rosacea-directed management when appropriate."
        ],
        "clinicalPearl": "Typical comedones favour acne, while persistent centrofacial erythema and flushing may point toward rosacea."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Pruritus",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "Lesions are centred around individual follicles and may be relatively monomorphic.",
        "diagnosticApproach": [
          "Consider:",
          "Bacterial folliculitis",
          "Malassezia folliculitis",
          "Occlusion",
          "Shaving-related inflammation"
        ],
        "managementApproach": [
          "Treatment should target the underlying cause."
        ],
        "clinicalPearl": "Monomorphic follicular lesions, particularly when itchy and lacking comedones, should prompt consideration of folliculitis."
      },
      {
        "id": "diff-3",
        "condition": "MALASSEZIA FOLLICULITIS",
        "clinicalClues": [
          "Itchy monomorphic papules",
          "Follicular pustules",
          "Upper trunk involvement",
          "Chest/back predominance",
          "Exacerbation with heat or occlusion"
        ],
        "typicalAppearance": "Uniform follicular papules and pustules with little or no comedonal component.",
        "diagnosticApproach": [
          "Clinical assessment may be supplemented by appropriate testing."
        ],
        "managementApproach": [
          "An antifungal strategy may be more appropriate than conventional acne treatment."
        ],
        "clinicalPearl": "Pruritus and monomorphic follicular lesions without comedones are useful clues against typical acne."
      },
      {
        "id": "diff-4",
        "condition": "PERIORIFICIAL DERMATITIS",
        "clinicalClues": [
          "Small facial papules",
          "Perioral, perinasal or periocular distribution",
          "Relative sparing immediately adjacent to the vermilion border",
          "Possible history of topical corticosteroid use"
        ],
        "typicalAppearance": "Small erythematous papules or pustules clustered around facial orifices.",
        "diagnosticApproach": [
          "Review:",
          "Topical corticosteroid exposure",
          "Cosmetics",
          "Skin-care products",
          "Distribution"
        ],
        "managementApproach": [
          "Avoid automatically treating the eruption as acne."
        ],
        "clinicalPearl": "Distribution and medication history can be more diagnostically useful than simply counting papules."
      },
      {
        "id": "diff-5",
        "condition": "STEROID-INDUCED ACNEIFORM ERUPTION",
        "clinicalClues": [
          "Sudden onset",
          "Monomorphic lesions",
          "Temporal association with corticosteroid exposure",
          "Possible truncal predominance"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review systemic and topical corticosteroid exposure."
        ],
        "managementApproach": [
          "Address the causative exposure where clinically appropriate."
        ],
        "clinicalPearl": "A sudden monomorphic eruption with a medication trigger should prompt consideration of a drug-induced acneiform eruption."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL FOLLICULITIS",
        "clinicalClues": [
          "Follicular pustules",
          "Tenderness",
          "Localized erythema",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Determine whether lesions are genuinely acneiform or primarily follicular."
        ],
        "managementApproach": [
          "Treatment should be directed toward the identified infection and underlying cause."
        ],
        "clinicalPearl": "Follicular distribution alone does not establish acne vulgaris."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a thin layer to the affected acne-prone area according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Use a small amount sufficient to form a thin film over the relevant acne-prone area. Avoid applying a thick layer. For facial acne, apply a thin layer across the affected acne-prone region rather than placing large quantities on individual pimples. Management Implications Excessive application can increase irritation without necessarily improving therapeutic benefit.",
        "clinicalPearl": "A thin, even application is generally preferable to excessive spot application."
      },
      {
        "title": "APPLICATION TECHNIQUE",
        "keyPoints": [
          "Recommended general technique:",
          "Cleanse gently.",
          "Dry the skin.",
          "Apply a thin layer.",
          "Avoid eyes, lips and mucosal surfaces.",
          "Wash hands after application."
        ],
        "details": [],
        "practicalExample": "The patient cleanses the face gently in the evening, dries the skin and applies a thin layer over the acne-prone area as instructed. Management Implications Consistent application across the acne-prone area helps address existing and developing lesions.",
        "clinicalPearl": "Topical retinoid therapy is generally used over the acne-prone area rather than only on visible lesions."
      },
      {
        "title": "EXPECTED EARLY IRRITATION",
        "keyPoints": [
          "Adapalene may initially cause:",
          "Dryness",
          "Scaling",
          "Burning",
          "Stinging",
          "Erythema"
        ],
        "details": [],
        "practicalExample": "A patient may experience mild dryness during the early phase of treatment before improved tolerance develops. Management Implications Assess severity of irritation and review the overall skin-care routine. Appropriate supportive moisturization may help maintain adherence.",
        "clinicalPearl": "Early irritation does not necessarily indicate treatment failure, but significant or persistent irritation warrants clinical review."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Acne therapy generally requires consistent treatment over time."
        ],
        "details": [],
        "practicalExample": "If improvement is not seen within the expected treatment period, reassess: Adherence Application technique Diagnosis Disease severity Concurrent skin-care products Need for treatment escalation Management Implications Avoid judging treatment efficacy solely on very early changes.",
        "clinicalPearl": "Consistent use and appropriate follow-up are important because acne lesions develop through an ongoing follicular process."
      },
      {
        "title": "TOPICAL ANTIBIOTIC STEWARDSHIP",
        "keyPoints": [
          "Clindamycin exposure can contribute to antimicrobial resistance."
        ],
        "details": [],
        "practicalExample": "Where clinically appropriate, acne management should incorporate non-antibiotic strategies rather than relying on prolonged topical antibiotic monotherapy. Management Implications Consider current acne guidance regarding: Appropriate treatment duration Combination strategies Reassessment Antibiotic stewardship",
        "clinicalPearl": "Clindamycin should have a defined therapeutic role and should not become indefinite maintenance therapy."
      },
      {
        "title": "SKIN-CARE SUPPORT",
        "keyPoints": [
          "Patients using adapalene may benefit from:",
          "Gentle cleansing",
          "Non-comedogenic moisturization",
          "Appropriate daytime photoprotection",
          "Avoidance of harsh scrubbing"
        ],
        "details": [],
        "practicalExample": "A patient experiencing dryness can simplify the skin-care routine and use a suitable moisturizer while continuing treatment as clinically appropriate. Management Implications Improved tolerability can support adherence.",
        "clinicalPearl": "An effective acne regimen is more likely to succeed when patients can tolerate and consistently follow it."
      },
      {
        "title": "PHOTOSENSITIVITY & SUN EXPOSURE",
        "keyPoints": [
          "Patients using topical retinoids should be counselled regarding excessive sun exposure and appropriate photoprotection."
        ],
        "details": [],
        "practicalExample": "Use appropriate daytime sun protection and avoid unnecessary intense sun exposure. Management Implications Photoprotection is particularly relevant in patients prone to post-inflammatory pigmentation.",
        "clinicalPearl": "Sun protection can support overall acne care, particularly when irritation or post-inflammatory pigmentation is present."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ACNE WITH SCARRING RISK",
        "keyPoints": [
          "Risk increases with:",
          "Deep inflammatory lesions",
          "Nodules",
          "Persistent disease",
          "Delayed treatment",
          "Picking or squeezing",
          "Previous scarring",
          "Typical Clinical Appearance",
          "Scarring may include:",
          "Atrophic scars",
          "Hypertrophic scars",
          "Keloidal scars",
          "Post-inflammatory erythema",
          "Post-inflammatory hyperpigmentation"
        ],
        "details": [],
        "practicalExample": "Assess early and consider escalation where appropriate.",
        "clinicalPearl": "The development of scarring is a reason to reassess treatment adequacy and disease severity."
      },
      {
        "title": "SEVERE OR NODULOCYSTIC ACNE",
        "keyPoints": [
          "Look for:",
          "Deep nodules",
          "Cysts",
          "Significant tenderness",
          "Extensive inflammation",
          "Scarring"
        ],
        "details": [],
        "practicalExample": "Consider specialist evaluation and treatment escalation.",
        "clinicalPearl": "Severe nodular or scarring acne generally requires a broader therapeutic strategy than topical therapy alone."
      },
      {
        "title": "RECURRENT ACNE",
        "keyPoints": [
          "Review:",
          "Adherence",
          "Treatment duration",
          "Skin-care routine",
          "Triggering factors",
          "Treatment tolerability",
          "Previous antibiotic exposure"
        ],
        "details": [],
        "practicalExample": "Reassess the phenotype and long-term maintenance strategy.",
        "clinicalPearl": "Repeated recurrence should prompt review of the overall management plan rather than repeated short courses of topical antibiotic therapy alone."
      },
      {
        "title": "ACNE WITH POST-INFLAMMATORY HYPERPIGMENTATION",
        "keyPoints": [
          "Inflammatory acne may leave persistent pigmentation, particularly in darker skin phototypes."
        ],
        "details": [],
        "practicalExample": "Control active inflammation while considering appropriate management of residual pigmentation.",
        "clinicalPearl": "Reducing ongoing inflammatory lesions may help limit repeated cycles of inflammation followed by pigmentation."
      },
      {
        "title": "SENSITIVE SKIN",
        "keyPoints": [
          "Assess for:",
          "Baseline sensitivity",
          "Existing dermatitis",
          "Excessive exfoliation",
          "Multiple active skin-care products"
        ],
        "details": [],
        "practicalExample": "Simplify the skin-care regimen where appropriate.",
        "clinicalPearl": "Reducing unnecessary irritants can improve tolerance to adapalene-containing acne therapy."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Treatment selection should account for pregnancy status."
        ],
        "details": [],
        "practicalExample": "Adapalene and other retinoid therapies require particular attention to pregnancy-related prescribing considerations. Review the current approved product information and applicable clinical guidance before prescribing.",
        "clinicalPearl": "Pregnancy status should be established when clinically relevant before initiating topical retinoid therapy."
      }
    ]
  },
  {
    "id": "clixodin-bpo",
    "slug": "clixodin-bpo",
    "brandName": "CLIXODIN-BPO",
    "genericName": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
    "tagline": "Topical Anti-Acne Preparation",
    "therapeuticArea": "Acne",
    "route": "Topical",
    "routeSubcategory": "Acne",
    "dosageForm": "Gel",
    "strength": "1%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected mild-to-moderate inflammatory and mixed acne presentations",
    "composition": [
      "Each gram of gel contains:",
      "Clindamycin — 1% w/w",
      "Benzoyl Peroxide — 2.5% w/w",
      "Gel base: q.s."
    ],
    "therapeuticCategory": "Antibacterial • Keratolytic • Topical • Anti-acne preparation",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "CLINDAMYCIN",
        "description": "This lincosamide antibacterial agent inhibits bacterial protein synthesis by binding to the bacterial 50S ribosomal subunit."
      },
      {
        "step": "02",
        "title": "BENZOYL PEROXIDE",
        "description": "Reduce bacterial burden and inflammatory acne lesions and support reduction of follicular plugging."
      },
      {
        "step": "03",
        "title": "COMPLEMENTARY ACTION",
        "description": "Key Clinical Points The formulation Combining benzoyl peroxide with topical clindamycin is an established strategy for reducing reliance on antibiotic activity alone."
      }
    ],
    "indications": [
      "INFLAMMATORY ACNE",
      "PAPULOPUSTULAR ACNE",
      "MIXED ACNE"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Clindamycin 1% + Benzoyl Peroxide 2.5% Gel or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible reactions include: Dryness Scaling Burning Stinging Erythema Peeling"
      },
      {
        "title": "EYE AND MUCOSAL CONTACT",
        "detail": "Avoid contact with: Eyes Eyelids Lips Other mucosal surfaces If accidental contact occurs, rinse appropriately."
      },
      {
        "title": "BROKEN OR SEVERELY IRRITATED SKIN",
        "detail": "Avoid unnecessary application to severely compromised skin unless specifically directed by the treating clinician."
      },
      {
        "title": "ANTIBIOTIC-ASSOCIATED DIARRHOEA",
        "detail": "Although administered topically, clindamycin has rarely been associated with antibiotic-associated diarrhoea and colitis. Patients should seek medical attention if significant or persistent diarrhoea occurs during or following treatment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Cleanse the affected area gently, allow the skin to dry, and apply a thin layer of CLIXODIN-BPO as directed by your doctor.\""
      },
      {
        "question": "POSSIBLE INITIAL IRRITATION",
        "answer": "\"Some dryness, redness, burning or peeling may occur, particularly when starting treatment. Inform your doctor if irritation becomes severe or persistent.\""
      },
      {
        "question": "AVOID HARSH SKIN CARE",
        "answer": "\"Avoid excessive scrubbing, picking, squeezing acne lesions and unnecessary use of irritating skin-care products.\""
      },
      {
        "question": "BENZOYL PEROXIDE & FABRICS",
        "answer": "\"Benzoyl peroxide may bleach coloured fabrics or hair. Take care to avoid unnecessary contact with clothing, towels and bedding.\""
      },
      {
        "question": "SUN PROTECTION",
        "answer": "\"Limit excessive sun exposure and use appropriate daytime photoprotection, especially if your skin becomes irritated or you are prone to pigmentation.\""
      },
      {
        "question": "CONSISTENCY MATTERS",
        "answer": "\"Use the medicine regularly as directed. Acne improvement generally requires consistent treatment rather than occasional application.\""
      },
      {
        "question": "DO NOT PICK ACNE",
        "answer": "\"Avoid squeezing or picking acne lesions because this can increase inflammation and the risk of persistent marks or scarring.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DOCTOR",
        "answer": "Seek medical review if: Acne rapidly worsens Deep painful nodules develop Scarring appears Severe irritation occurs Significant or persistent diarrhoea develops There is no expected improvement Acne repeatedly relapses"
      }
    ],
    "clinicalPearl": "CLIXODIN-BPO combines Clindamycin 1% w/w with Benzoyl Peroxide 2.5% w/w to provide complementary antibacterial, anti-inflammatory and antimicrobial activity for selected acne presentations. Appropriate patient selection, consistent application, management of irritation and responsible use of topical antibiotics are central to effective therapy.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-AD",
        "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
        "slug": "clixodin-ad"
      },
      {
        "name": "CLIXODIN-NT",
        "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
        "slug": "clixodin-nt"
      },
      {
        "name": "I-TACNOID 20",
        "generic": "Isotretinoin 20 mg Softgel Capsule",
        "slug": "i-tacnoid-20"
      }
    ],
    "references": [
      "Current approved CLIXODIN-BPO product information and package insert — primary source for product-specific indications, dosage, contraindications, warnings, precautions and adverse effects.",
      "Current prescribing information for topical clindamycin.",
      "Current prescribing information for benzoyl peroxide.",
      "Current evidence-based clinical guidelines for acne vulgaris.",
      "Current recommendations concerning topical antibiotic use and antimicrobial stewardship in acne.",
      "Current dermatology guidance concerning acne severity, scarring risk and treatment escalation."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ROSACEA",
        "clinicalClues": [
          "Consider rosacea with:",
          "Persistent centrofacial erythema",
          "Flushing",
          "Telangiectasia",
          "Papules/pustules",
          "Trigger-related exacerbation"
        ],
        "typicalAppearance": "Centrofacial erythema with inflammatory papules or pustules and possible telangiectasia.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Flushing history",
          "Triggers",
          "Presence or absence of comedones"
        ],
        "managementApproach": [
          "Use rosacea-directed management where appropriate."
        ],
        "clinicalPearl": "Typical comedones support acne, whereas persistent centrofacial erythema and flushing may point toward rosacea."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Pruritus",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "Lesions are centred around individual hair follicles and may be relatively monomorphic.",
        "diagnosticApproach": [
          "Consider:",
          "Bacterial folliculitis",
          "Malassezia folliculitis",
          "Occlusion",
          "Shaving-related follicular inflammation"
        ],
        "managementApproach": [
          "Treatment should be directed toward the underlying cause."
        ],
        "clinicalPearl": "Monomorphic follicular lesions, especially when itchy and lacking comedones, should prompt consideration of folliculitis."
      },
      {
        "id": "diff-3",
        "condition": "MALASSEZIA FOLLICULITIS",
        "clinicalClues": [
          "Monomorphic itchy papules",
          "Follicular pustules",
          "Upper trunk involvement",
          "Chest/back predominance",
          "Heat or occlusion-associated worsening"
        ],
        "typicalAppearance": "Uniform follicular papules and pustules, generally without typical comedones.",
        "diagnosticApproach": [
          "Clinical assessment may be supplemented by appropriate diagnostic testing."
        ],
        "managementApproach": [
          "An antifungal treatment strategy may be more appropriate than conventional acne treatment."
        ],
        "clinicalPearl": "Pruritus and monomorphic follicular lesions without comedones are important clues against typical acne."
      },
      {
        "id": "diff-4",
        "condition": "PERIORIFICIAL DERMATITIS",
        "clinicalClues": [
          "Small facial papules",
          "Perioral/perinasal/periocular distribution",
          "Relative vermilion sparing",
          "Possible topical corticosteroid exposure"
        ],
        "typicalAppearance": "Small erythematous papules or pustules around facial orifices.",
        "diagnosticApproach": [
          "Review:",
          "Medication history",
          "Topical corticosteroid exposure",
          "Cosmetics",
          "Skin-care products",
          "Distribution"
        ],
        "managementApproach": [
          "Do not automatically classify every facial papulopustular eruption as acne."
        ],
        "clinicalPearl": "Distribution and medication history can be key differentiators between acne and periorificial dermatitis."
      },
      {
        "id": "diff-5",
        "condition": "STEROID-INDUCED ACNEIFORM ERUPTION",
        "clinicalClues": [
          "Sudden onset",
          "Monomorphic lesions",
          "Temporal relationship to corticosteroid exposure",
          "Possible truncal predominance"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review systemic and topical corticosteroid use."
        ],
        "managementApproach": [
          "Address the causative exposure where clinically appropriate."
        ],
        "clinicalPearl": "A sudden monomorphic eruption following corticosteroid exposure should prompt consideration of a drug-induced acneiform eruption."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL FOLLICULITIS",
        "clinicalClues": [
          "Follicular pustules",
          "Localized erythema",
          "Tenderness",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Determine whether lesions are primarily follicular or represent acne vulgaris."
        ],
        "managementApproach": [
          "Management should be directed toward the identified cause."
        ],
        "clinicalPearl": "Not every pustular eruption is acne; follicular morphology can provide an important diagnostic clue."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a thin layer to the affected acne-prone area according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Use sufficient gel to form a thin, even film. Avoid excessive quantities or repeated spot application unless specifically directed. For facial acne, apply a thin layer across the affected acne-prone area rather than placing a thick amount on each individual lesion. Management Implications Excessive application may increase irritation without necessarily improving efficacy.",
        "clinicalPearl": "Thin, even application is generally preferable to applying excessive quantities to individual lesions."
      },
      {
        "title": "APPLICATION TECHNIQUE",
        "keyPoints": [
          "A practical application sequence:",
          "Cleanse gently.",
          "Dry the skin.",
          "Apply a thin layer.",
          "Avoid eyes and mucosal surfaces.",
          "Wash hands after application."
        ],
        "details": [],
        "practicalExample": "The patient gently cleanses the face, dries it and applies a thin layer over the acne-prone area as directed. Management Implications Consistent application supports treatment adherence.",
        "clinicalPearl": "Avoid aggressive rubbing, scrubbing or excessive product application."
      },
      {
        "title": "BENZOYL PEROXIDE-RELATED IRRITATION",
        "keyPoints": [
          "Possible effects include:",
          "Dryness",
          "Scaling",
          "Erythema",
          "Burning",
          "Stinging",
          "Peeling"
        ],
        "details": [],
        "practicalExample": "A patient experiencing mild dryness during the early phase of treatment may benefit from review of the skin-care routine and appropriate supportive moisturization. Management Implications Significant or persistent irritation should prompt reassessment.",
        "clinicalPearl": "Tolerability is an important determinant of adherence to benzoyl peroxide-containing acne therapy."
      },
      {
        "title": "BENZOYL PEROXIDE & TEXTILES",
        "keyPoints": [
          "Benzoyl peroxide may bleach or discolor coloured fabrics and hair."
        ],
        "details": [],
        "practicalExample": "Patients can be advised to allow the product to dry appropriately and avoid unnecessary contact with coloured towels, clothing or bedding. Management Implications Advance counselling can prevent avoidable cosmetic inconvenience.",
        "clinicalPearl": "Simple practical counselling can improve patient confidence and persistence with treatment."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Acne treatment generally requires consistent use over time."
        ],
        "details": [],
        "practicalExample": "If the response is inadequate, reassess: Diagnosis Adherence Application technique Disease severity Concurrent products Need for treatment escalation Management Implications Avoid simply extending topical antibiotic exposure without reassessing the clinical situation.",
        "clinicalPearl": "Treatment failure should prompt reassessment rather than indefinite continuation of the same antibiotic-containing regimen."
      },
      {
        "title": "TOPICAL ANTIBIOTIC STEWARDSHIP",
        "keyPoints": [
          "Prolonged antibiotic exposure can contribute to antimicrobial resistance.",
          "Benzoyl peroxide provides a non-antibiotic antimicrobial component."
        ],
        "details": [],
        "practicalExample": "Use CLIXODIN-BPO for the clinically appropriate treatment period and reassess the need for continued antibiotic-containing therapy. Management Implications Long-term maintenance may require an appropriate non-antibiotic strategy depending on the patient's acne phenotype.",
        "clinicalPearl": "A topical antibiotic should have a defined therapeutic role; ongoing acne control should not automatically depend on indefinite antibiotic exposure."
      },
      {
        "title": "COMBINATION WITH OTHER ACNE THERAPIES",
        "keyPoints": [
          "Acne may require treatment directed toward:",
          "Comedonal disease",
          "Inflammation",
          "Excess sebum",
          "Follicular hyperkeratinisation",
          "Post-inflammatory pigmentation"
        ],
        "details": [],
        "practicalExample": "A patient with persistent comedonal disease despite improvement in inflammation may require reassessment and an appropriate additional or alternative non-antibiotic strategy. Management Implications Treatment should be individualized according to phenotype and severity.",
        "clinicalPearl": "Improvement in inflammatory lesions does not necessarily mean that all components of acne have been adequately addressed."
      },
      {
        "title": "SKIN-CARE SUPPORT",
        "keyPoints": [
          "Encourage:",
          "Gentle cleansing",
          "Appropriate moisturization",
          "Non-comedogenic products",
          "Appropriate daytime photoprotection",
          "Avoidance of harsh scrubbing"
        ],
        "details": [],
        "practicalExample": "A patient experiencing dryness can simplify the skin-care routine and use a suitable moisturizer to improve treatment tolerance. Management Implications Better tolerability can support consistent treatment use.",
        "clinicalPearl": "A manageable skin-care routine can be as important for adherence as the choice of topical medication."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ACNE WITH SCARRING RISK",
        "keyPoints": [
          "Risk factors include:",
          "Deep inflammatory lesions",
          "Nodules",
          "Prolonged disease",
          "Delayed treatment",
          "Picking or squeezing",
          "Previous scarring",
          "Typical Clinical Appearance",
          "Possible residual changes include:",
          "Atrophic scars",
          "Hypertrophic scars",
          "Keloidal scars",
          "Post-inflammatory erythema",
          "Post-inflammatory hyperpigmentation"
        ],
        "details": [],
        "practicalExample": "Assess scarring risk early and consider treatment escalation when appropriate.",
        "clinicalPearl": "Scarring is a clinically important reason to reassess disease severity and treatment adequacy."
      },
      {
        "title": "SEVERE OR NODULOCYSTIC ACNE",
        "keyPoints": [
          "Look for:",
          "Deep nodules",
          "Cysts",
          "Significant tenderness",
          "Extensive inflammatory disease",
          "Scarring"
        ],
        "details": [],
        "practicalExample": "Consider specialist assessment and escalation of treatment.",
        "clinicalPearl": "Severe nodular or scarring acne generally requires a broader treatment strategy than topical therapy alone."
      },
      {
        "title": "RECURRENT ACNE",
        "keyPoints": [
          "Review:",
          "Adherence",
          "Treatment duration",
          "Skin-care routine",
          "Treatment tolerability",
          "Previous antibiotic exposure",
          "Long-term maintenance strategy"
        ],
        "details": [],
        "practicalExample": "Reassess the acne phenotype and treatment plan.",
        "clinicalPearl": "Repeated recurrence should prompt review of the overall management strategy rather than repeated short courses of topical antibiotic therapy alone."
      },
      {
        "title": "ACNE WITH POST-INFLAMMATORY HYPERPIGMENTATION",
        "keyPoints": [
          "Inflammatory acne can be followed by persistent pigmentation, particularly in darker skin phototypes."
        ],
        "details": [],
        "practicalExample": "Control active inflammatory disease and address pigmentary sequelae using an appropriate strategy.",
        "clinicalPearl": "Reducing ongoing inflammatory lesions may help reduce repeated cycles of inflammation and subsequent pigmentation."
      },
      {
        "title": "SENSITIVE OR IRRITATION-PRONE SKIN",
        "keyPoints": [
          "Review:",
          "Baseline skin sensitivity",
          "Existing dermatitis",
          "Exfoliating products",
          "Multiple active ingredients",
          "Harsh cleansers"
        ],
        "details": [],
        "practicalExample": "Simplify the skin-care routine and assess tolerability.",
        "clinicalPearl": "Unnecessary irritants can make otherwise appropriate acne therapy difficult to tolerate."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Treatment selection should take pregnancy status into account."
        ],
        "details": [],
        "practicalExample": "Review pregnancy-related prescribing considerations and current approved product information before treatment selection.",
        "clinicalPearl": "Pregnancy status should be considered whenever selecting acne therapy in patients who are pregnant or may become pregnant."
      }
    ]
  },
  {
    "id": "clixodin-nt",
    "slug": "clixodin-nt",
    "brandName": "CLIXODIN-NT",
    "genericName": "Clindamycin 1% + Nicotinamide 4% Gel",
    "tagline": "Topical Anti-Acne Preparation",
    "therapeuticArea": "Acne",
    "route": "Topical",
    "routeSubcategory": "Acne",
    "dosageForm": "Gel",
    "strength": "1%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Topical management of selected inflammatory acne presentations",
    "composition": [
      "Each gram of gel contains:",
      "Clindamycin — 1% w/w",
      "Nicotinamide — 4% w/w",
      "Gel base: q.s."
    ],
    "therapeuticCategory": "ANTIMICROBIAL • ANTI-INFLAMMATORY • TOPICAL • ANTI-ACNE",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "CLINDAMYCIN",
        "description": "This lincosamide antibacterial agent inhibits bacterial protein synthesis by binding to the bacterial 50S ribosomal subunit."
      },
      {
        "step": "02",
        "title": "NICOTINAMIDE",
        "description": "Topical nicotinamide has recognized anti-inflammatory and skin-barrier-supportive properties."
      },
      {
        "step": "03",
        "title": "COMPLEMENTARY ACTION",
        "description": "Key Clinical Points The formulation addresses different aspects of acne with antibacterial and anti-inflammatory/supportive component."
      }
    ],
    "indications": [
      "INFLAMMATORY ACNE",
      "Commonly includes erythematous papules and pustules occurring alongside comedones.",
      "PAPULOPUSTULAR ACNE",
      "MIXED COMEDONAL AND INFLAMMATORY ACNE"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Clindamycin 1% + Nicotinamide 4% Gel or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible reactions may include: Dryness Burning Stinging Erythema Peeling Itching"
      },
      {
        "title": "DIARRHOEA / COLITIS CONSIDERATION",
        "detail": "Although administered topically, clindamycin can rarely be associated with antibiotic-associated diarrhoea or colitis. Patient Counselling Patients should be advised to seek medical attention if significant or persistent diarrhoea develops during or after treatment."
      },
      {
        "title": "EYE CONTACT",
        "detail": "Avoid contact with: Eyes Eyelids Mucosal surfaces If accidental contact occurs, rinse appropriately."
      },
      {
        "title": "DAMAGED SKIN",
        "detail": "Use cautiously on severely irritated, broken or compromised skin according to medical advice."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Cleanse the skin gently, dry it, and apply a thin layer of CLIXODIN-NT to the affected acne-prone area as directed by your doctor.\""
      },
      {
        "question": "AVOID PICKING",
        "answer": "\"Avoid squeezing, scratching or picking acne lesions, as this can increase inflammation and the risk of scarring.\""
      },
      {
        "question": "SKIN-CARE ROUTINE",
        "answer": "\"Use gentle, non-irritating skin-care products and avoid unnecessary scrubbing or harsh cleansers.\""
      },
      {
        "question": "CONSISTENCY MATTERS",
        "answer": "\"Use the medicine regularly as directed. Acne improvement generally requires consistent treatment rather than occasional application.\""
      },
      {
        "question": "DO NOT SHARE",
        "answer": "\"Do not share the preparation with another person, even if they appear to have similar acne.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DOCTOR",
        "answer": "Seek medical review if: Acne is rapidly worsening Deep painful nodules develop Scarring is appearing Severe irritation develops Significant diarrhoea occurs There is no expected improvement Acne repeatedly relapses after treatment"
      }
    ],
    "clinicalPearl": "CLIXODIN-NT combines Clindamycin 1% w/w with Nicotinamide 4% w/w in a topical gel designed for selected inflammatory acne presentations. Appropriate diagnosis, consistent application, attention to tolerability and responsible use of topical antibiotics are central to effective acne management.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-AD",
        "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
        "slug": "clixodin-ad"
      },
      {
        "name": "CLIXODIN-BPO",
        "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
        "slug": "clixodin-bpo"
      },
      {
        "name": "I-TACNOID 20",
        "generic": "Isotretinoin 20 mg Softgel Capsule",
        "slug": "i-tacnoid-20"
      }
    ],
    "references": [
      "Current approved CLIXODIN-NT product information and package insert — primary source for product-specific indications, directions, contraindications, warnings, precautions and adverse effects.",
      "Current prescribing information for topical clindamycin.",
      "Current clinical guidelines for acne vulgaris.",
      "Current recommendations concerning topical antibiotic use and antimicrobial stewardship in acne.",
      "Current dermatology guidance regarding acne severity, scarring risk and treatment escalation."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ROSACEA",
        "clinicalClues": [
          "Consider rosacea with:",
          "Persistent central facial erythema",
          "Flushing",
          "Telangiectasia",
          "Papules/pustules",
          "Trigger-related exacerbations"
        ],
        "typicalAppearance": "Predominantly centrofacial erythema with papules or pustules, often without typical comedones.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Flushing history",
          "Trigger exposure",
          "Presence of comedones"
        ],
        "managementApproach": [
          "Use rosacea-directed treatment rather than assuming every facial papulopustular eruption represents acne."
        ],
        "clinicalPearl": "The presence or absence of comedones can be an important diagnostic clue when differentiating acne from rosacea."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Pruritus",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "Lesions are often centred around individual hair follicles.",
        "diagnosticApproach": [
          "Consider:",
          "Bacterial folliculitis",
          "Malassezia folliculitis",
          "Occlusion",
          "Shaving-related follicular inflammation"
        ],
        "managementApproach": [
          "Treatment should be directed at the underlying cause."
        ],
        "clinicalPearl": "Monomorphic follicular papules and pustules should prompt consideration of folliculitis rather than automatically being labelled acne."
      },
      {
        "id": "diff-3",
        "condition": "PERIORIFICIAL DERMATITIS",
        "clinicalClues": [
          "Consider:",
          "Small papules around the mouth",
          "Perinasal or periocular distribution",
          "Relative sparing immediately adjacent to the vermilion border",
          "History of topical corticosteroid use"
        ],
        "typicalAppearance": "Small erythematous papules or pustules concentrated around facial orifices.",
        "diagnosticApproach": [
          "Review:",
          "Topical corticosteroid exposure",
          "Cosmetics",
          "Skin-care products",
          "Distribution"
        ],
        "managementApproach": [
          "Avoid automatically treating the eruption as acne."
        ],
        "clinicalPearl": "A periorificial distribution and corticosteroid history may provide important diagnostic clues."
      },
      {
        "id": "diff-4",
        "condition": "MALASSEZIA FOLLICULITIS",
        "clinicalClues": [
          "Monomorphic itchy papules",
          "Follicular pustules",
          "Upper trunk involvement",
          "Chest or back predominance",
          "Worsening with heat or occlusion"
        ],
        "typicalAppearance": "Relatively uniform follicular papules and pustules without typical comedones.",
        "diagnosticApproach": [
          "Clinical assessment may be supplemented by appropriate testing where necessary."
        ],
        "managementApproach": [
          "Antifungal treatment may be required rather than conventional acne therapy."
        ],
        "clinicalPearl": "Pruritic, monomorphic follicular lesions without comedones should raise consideration of Malassezia folliculitis."
      },
      {
        "id": "diff-5",
        "condition": "STEROID-RELATED ACNEIFORM ERUPTION",
        "clinicalClues": [
          "Consider a drug-related eruption when there is:",
          "Sudden onset",
          "Monomorphic lesions",
          "Temporal relationship with corticosteroid exposure",
          "Reduced comedonal component"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Systemic medications",
          "Topical medications",
          "Corticosteroid exposure"
        ],
        "managementApproach": [
          "Address the causative medication where clinically appropriate."
        ],
        "clinicalPearl": "Medication history can substantially alter the differential diagnosis of a new acneiform eruption."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a thin layer to the affected acne-prone areas according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Use sufficient gel to lightly cover the affected area. Avoid excessive quantities. For facial acne, a thin film can be distributed gently over the affected acne-prone areas rather than applying a thick layer to individual lesions. Management Implications Excessive application does not necessarily improve efficacy and may increase irritation.",
        "clinicalPearl": "Thin, even application is generally preferable to spot-applying excessive quantities."
      },
      {
        "title": "APPLICATION TECHNIQUE",
        "keyPoints": [
          "Before application:",
          "Cleanse the skin gently",
          "Dry thoroughly",
          "Apply the gel as directed",
          "Wash hands after application",
          "Avoid unnecessary rubbing."
        ],
        "details": [],
        "practicalExample": "After gentle cleansing and drying, the patient applies a thin layer across the acne-prone area rather than aggressively rubbing individual lesions. Management Implications A consistent application routine can improve treatment adherence.",
        "clinicalPearl": "Acne therapy generally requires treating the relevant acne-prone area rather than chasing individual visible lesions."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Use for the duration recommended by the treating physician and approved product information."
        ],
        "details": [],
        "practicalExample": "If inflammatory lesions are not improving as expected, reassess: Diagnosis Adherence Application technique Disease severity Need for combination or alternative treatment Management Implications Avoid indefinite continuation of topical antibiotic therapy.",
        "clinicalPearl": "Lack of improvement should trigger reassessment rather than simply extending antibiotic exposure."
      },
      {
        "title": "TOPICAL ANTIBIOTIC STEWARDSHIP",
        "keyPoints": [
          "Topical clindamycin should be used thoughtfully because antibiotic exposure can contribute to antimicrobial resistance."
        ],
        "details": [],
        "practicalExample": "Where appropriate, topical antibiotic therapy may be integrated with a non-antibiotic acne treatment strategy rather than used as indefinite monotherapy. Management Implications Consider current acne guidelines, treatment duration and appropriate combination strategies.",
        "clinicalPearl": "Antibiotic-containing acne therapy should have a defined treatment objective and should not become an open-ended maintenance treatment."
      },
      {
        "title": "COMBINATION THERAPY",
        "keyPoints": [
          "Acne is multifactorial and may involve:",
          "Follicular hyperkeratinisation",
          "Sebum production",
          "Cutibacterium acnes-associated processes",
          "Inflammation"
        ],
        "details": [],
        "practicalExample": "A patient with both comedonal and inflammatory lesions may require treatment that addresses more than the inflammatory component. Management Implications Depending on severity and phenotype, clinicians may consider appropriate combinations involving non-antibiotic acne therapies.",
        "clinicalPearl": "A broader acne strategy may be required when multiple pathogenic pathways are clinically relevant."
      },
      {
        "title": "SENSITIVE OR IRRITATION-PRONE SKIN",
        "keyPoints": [
          "Acne therapies may produce:",
          "Dryness",
          "Burning",
          "Stinging",
          "Erythema",
          "Peeling"
        ],
        "details": [],
        "practicalExample": "A patient developing significant irritation should be assessed for application frequency, concurrent products and barrier disruption. Management Implications A simplified skin-care routine and appropriate supportive moisturization may improve tolerability.",
        "clinicalPearl": "Good tolerability supports adherence; excessive irritation can undermine otherwise appropriate acne treatment."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ACNE WITH SCARRING RISK",
        "keyPoints": [
          "Risk may increase with:",
          "Inflammatory lesions",
          "Nodules",
          "Prolonged disease",
          "Picking or squeezing",
          "Delayed treatment",
          "Typical Clinical Appearance",
          "Possible residual changes include:",
          "Atrophic scars",
          "Hypertrophic scars",
          "Post-inflammatory erythema",
          "Post-inflammatory hyperpigmentation"
        ],
        "details": [],
        "practicalExample": "Early recognition and appropriate escalation are important.",
        "clinicalPearl": "Scarring risk is a reason to reassess treatment intensity rather than continuing an inadequate topical regimen indefinitely."
      },
      {
        "title": "SEVERE OR NODULOCYSTIC ACNE",
        "keyPoints": [
          "Look for:",
          "Deep nodules",
          "Cysts",
          "Significant tenderness",
          "Extensive inflammatory involvement",
          "Scarring"
        ],
        "details": [],
        "practicalExample": "Consider specialist evaluation and treatment escalation.",
        "clinicalPearl": "Severe nodular or scarring acne generally requires a broader management strategy than topical antibiotic therapy alone."
      },
      {
        "title": "RECURRENT ACNE",
        "keyPoints": [
          "Consider:",
          "Adherence",
          "Treatment duration",
          "Product tolerability",
          "Hormonal factors where clinically relevant",
          "Skin-care practices",
          "Repeated antibiotic exposure"
        ],
        "details": [],
        "practicalExample": "Reassess the acne phenotype and long-term maintenance strategy.",
        "clinicalPearl": "Repeated recurrence should prompt review of the overall acne-management plan rather than repeated short antibiotic courses alone."
      },
      {
        "title": "ACNE IN PREGNANCY",
        "keyPoints": [
          "Treatment selection should account for pregnancy status and applicable safety information."
        ],
        "details": [],
        "practicalExample": "Review all topical and systemic treatments before prescribing.",
        "clinicalPearl": "Pregnancy status should be considered whenever selecting acne therapy in patients who may become pregnant."
      },
      {
        "title": "ACNE WITH POST-INFLAMMATORY HYPERPIGMENTATION",
        "keyPoints": [
          "Inflammatory acne may leave persistent pigmentation, particularly in darker skin phototypes."
        ],
        "details": [],
        "practicalExample": "Treat active acne while considering appropriate strategies for post-inflammatory pigmentation.",
        "clinicalPearl": "Controlling inflammation early may help reduce the ongoing cycle of acne lesions followed by pigmentary change."
      }
    ]
  },
  {
    "id": "dinofex-180",
    "slug": "dinofex-180",
    "brandName": "DINOFEX-180",
    "genericName": "Fexofenadine 180 mg Tablet",
    "tagline": "Second-Generation H1-Antihistamine for Appropriate Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "180 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selective peripheral H1-receptor antagonist",
    "composition": [
      "Each tablet contains:",
      "Fexofenadine Hydrochloride IP equivalent to Fexofenadine — 180 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Second-Generation H1-Antihistamine • Allergic rhinitis • Seasonal allergic rhinitis • Urticaria",
    "pharmacologicalClass": "Selective peripheral H1-receptor antagonist",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Histamine-Mediated Allergic Response Allergen exposure Mast-cell activation Histamine release (H1-receptor activation) Fexofenadine 180 mg blocks Peripheral H1-receptor (Reduction in histamine-mediated symptoms)"
      }
    ],
    "indications": [
      "ALLERGIC RHINITIS",
      "SEASONAL ALLERGIC RHINITIS",
      "PERENNIAL ALLERGIC RHINITIS",
      "House-dust mites, Animal dander, Indoor allergens, Persistent environmental exposures",
      "URTICARIA"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Fexofenadine 180 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion — SOMNOLENCE",
        "detail": "Clinical Consideration Fexofenadine generally has limited sedative effects compared with first-generation antihistamines, but individual patients may experience drowsiness. Patient Counselling Patients should establish their individual response before: Driving Operating machinery Performing tasks requiring sustained alertness"
      },
      {
        "title": "Accordion — OTHER SEDATING MEDICINES",
        "detail": "Clinical Consideration Review concomitant medicines that may independently cause sedation. Management Consideration Assess the overall medication profile when counselling patients about alertness."
      }
    ],
    "adverseEffects": {
      "common": [
        "Potential adverse effects include:",
        "Headache",
        "Nausea",
        "Dizziness",
        "Fatigue",
        "Somnolence in some patients"
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD DINOFEX-180 BE TAKEN?",
        "answer": "Take: One tablet once daily with water, according to the physician's prescription. Patient Education Pearl \"Take one tablet once daily with water.\""
      },
      {
        "question": "AVOID FRUIT JUICE AROUND THE DOSE",
        "answer": "Patients should be advised to take DINOFEX-180 with water rather than apple, orange or grapefruit juice. Patient Education Pearl Water is the preferred beverage for taking fexofenadine."
      },
      {
        "question": "ANTACID USE",
        "answer": "Patients taking aluminium- or magnesium-containing antacids should inform their physician or pharmacist. Patient Education Pearl Tell patients to check before taking an antacid at the same time as fexofenadine."
      },
      {
        "question": "CAN THE PATIENT DRIVE?",
        "answer": "Fexofenadine is generally associated with minimal sedation, but individual response varies. Patients should establish their own response before driving or operating machinery."
      },
      {
        "question": "WHAT IF SYMPTOMS PERSIST?",
        "answer": "Patients should consult their healthcare professional if: Symptoms remain uncontrolled Symptoms become more frequent Nasal obstruction becomes persistent New symptoms develop Wheezing or breathing difficulty occurs Recurrent urticaria continues Patient Education Pearl Persistent symptoms should prompt clinical reassessment rather than unsupervised dose escalation."
      }
    ],
    "clinicalPearl": "DINOFEX-180 provides once-daily second-generation H1-antihistamine therapy for appropriate allergic conditions. Correct administration—particularly with water and with attention to fruit-juice and antacid interactions—can help maintain predictable fexofenadine exposure.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "HIVOZIN-5",
        "generic": "Levocetirizine 5 mg Tablet",
        "slug": "hivozin-5"
      }
    ],
    "references": [
      "Current approved DINOFEX-180 product information and package insert — primary source for final product-specific indications, dosage, contraindications, warnings, precautions, excipients, storage and regulatory statements.",
      "Current approved prescribing information for fexofenadine hydrochloride — pharmacology, dosing, administration, safety and interaction information.",
      "Relevant current clinical guidance for allergic rhinitis and urticaria should be considered when developing patient-specific treatment plans."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "VIRAL UPPER RESPIRATORY INFECTION",
        "clinicalClues": [
          "Acute onset",
          "Sore throat",
          "Cough",
          "Malaise",
          "Fever may occur",
          "Sick contacts"
        ],
        "typicalAppearance": "Nasal congestion and rhinorrhoea may overlap with allergic rhinitis.",
        "diagnosticApproach": [
          "Assess:",
          "Duration",
          "Fever",
          "Systemic symptoms",
          "Exposure history",
          "Seasonal pattern"
        ],
        "managementApproach": [
          "Avoid automatically treating every episode of rhinorrhoea as allergic rhinitis."
        ],
        "clinicalPearl": "Systemic symptoms and an acute self-limited course may favour an infectious process."
      },
      {
        "id": "diff-2",
        "condition": "NON-ALLERGIC RHINITIS",
        "clinicalClues": [
          "Symptoms may be triggered by:",
          "Strong odours",
          "Smoke",
          "Temperature changes",
          "Environmental irritants",
          "Certain medications"
        ],
        "typicalAppearance": "Predominantly nasal symptoms without a consistent allergen-related pattern.",
        "diagnosticApproach": [
          "Identify environmental, occupational and medication-related triggers."
        ],
        "managementApproach": [
          "Treatment should follow the underlying rhinitis phenotype."
        ],
        "clinicalPearl": "Not every patient with chronic rhinitis has an allergic mechanism."
      },
      {
        "id": "diff-3",
        "condition": "CHRONIC RHINOSINUSITIS",
        "clinicalClues": [
          "Consider when symptoms include:",
          "Persistent nasal obstruction",
          "Facial pressure",
          "Reduced smell",
          "Chronic nasal discharge"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Clinical examination and appropriate ENT assessment may be required."
        ],
        "managementApproach": [
          "Persistent symptoms may require disease-specific management."
        ],
        "clinicalPearl": "Persistent obstruction associated with reduced smell or facial symptoms deserves further evaluation."
      },
      {
        "id": "diff-4",
        "condition": "NASAL POLYPOSIS",
        "clinicalClues": [
          "Persistent nasal obstruction",
          "Reduced or absent smell",
          "Chronic nasal symptoms",
          "Recurrent sinus symptoms"
        ],
        "typicalAppearance": "Pale, oedematous polypoid lesions may be visible during examination.",
        "diagnosticApproach": [],
        "managementApproach": [
          "Consider appropriate ENT evaluation."
        ],
        "clinicalPearl": "Persistent nasal obstruction with loss of smell should prompt consideration of structural or inflammatory nasal disease."
      },
      {
        "id": "diff-5",
        "condition": "DRUG-RELATED RHINITIS",
        "clinicalClues": [
          "Consider:",
          "Repeated topical nasal decongestant use",
          "Medication-related symptoms",
          "Temporal association with medication use"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Take a complete medication history."
        ],
        "managementApproach": [
          "Address the responsible medicine or exposure where appropriate."
        ],
        "clinicalPearl": "Medication history is an essential component of chronic rhinitis assessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "STANDARD ADULT DOSING",
        "keyPoints": [
          "The commonly recommended adult dose of fexofenadine for allergic rhinitis is:",
          "180 mg once daily."
        ],
        "details": [],
        "practicalExample": "DINOFEX-180 — One tablet once daily, according to the physician's prescription and approved product information. An adult patient with appropriately diagnosed allergic rhinitis may receive: Fexofenadine 180 mg once daily. Management Implications Treatment duration should be guided by symptom pattern and clinical response.",
        "clinicalPearl": "The 180 mg strength provides a convenient once-daily regimen for appropriate adult indications."
      },
      {
        "title": "ADMINISTRATION WITH WATER",
        "keyPoints": [
          "Fexofenadine should preferably be taken with water."
        ],
        "details": [],
        "practicalExample": "Take DINOFEX-180 with water. The patient takes one tablet with a glass of water at a consistent time each day. Management Implications Clear administration instructions can help avoid interactions that reduce fexofenadine exposure.",
        "clinicalPearl": "\"Take with water\" is a simple but useful counselling instruction for fexofenadine."
      },
      {
        "title": "FRUIT JUICE INTERACTION",
        "keyPoints": [
          "Certain fruit juices can reduce fexofenadine exposure.",
          "Particular attention should be given to:",
          "Grapefruit juice",
          "Orange juice",
          "Apple juice"
        ],
        "details": [],
        "practicalExample": "Take DINOFEX-180 with water rather than fruit juice. Preferred: Tablet + water Avoid around administration: Orange, apple or grapefruit juice. Management Implications Reduced exposure may compromise antihistamine effectiveness.",
        "clinicalPearl": "Ask patients what they use to swallow their medicine; fruit juice is not an equivalent substitute for water with fexofenadine."
      },
      {
        "title": "ANTACIDS CONTAINING ALUMINIUM OR MAGNESIUM",
        "keyPoints": [
          "Aluminium- and magnesium-containing antacids can reduce fexofenadine absorption."
        ],
        "details": [],
        "practicalExample": "Where such antacids are used, administration should be separated according to the approved product information. A patient taking an aluminium/magnesium antacid should not take it simultaneously with DINOFEX-180. Management Implications Review over-the-counter medicines when assessing apparently inadequate response.",
        "clinicalPearl": "An apparently ineffective antihistamine may sometimes reflect an administration or interaction issue rather than inadequate pharmacological activity."
      },
      {
        "title": "PREDOMINANTLY NASAL SYMPTOMS",
        "keyPoints": [
          "Fexofenadine is particularly useful for histamine-mediated symptoms such as:",
          "Sneezing",
          "Nasal itching",
          "Rhinorrhoea"
        ],
        "details": [],
        "practicalExample": "A patient with frequent sneezing and watery rhinorrhoea during allergen exposure may benefit from oral antihistamine therapy. Management Implications If severe nasal congestion remains uncontrolled, reassess the overall treatment strategy.",
        "clinicalPearl": "Oral antihistamines generally provide stronger control of sneezing, itching and rhinorrhoea than severe nasal obstruction."
      },
      {
        "title": "URTICARIA",
        "keyPoints": [
          "Second-generation H1-antihistamines are commonly used as first-line symptomatic therapy for urticaria."
        ],
        "details": [],
        "practicalExample": "A patient presenting with recurrent pruritic wheals may receive a second-generation H1-antihistamine according to the clinical diagnosis and approved prescribing information. Management Implications Persistent or recurrent urticaria requires assessment of: Disease duration Triggers Associated angioedema Treatment response",
        "clinicalPearl": "In chronic urticaria, the objective is sustained symptom control rather than treatment of individual wheals one episode at a time."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Duration depends on:",
          "Seasonal versus perennial disease",
          "Symptom frequency",
          "Severity",
          "Allergen exposure",
          "Treatment response"
        ],
        "details": [],
        "practicalExample": "A patient with predictable seasonal symptoms may require treatment during the relevant allergen period. Management Implications Reassess the continued need for treatment according to the disease pattern.",
        "clinicalPearl": "Treatment duration should be individualised rather than automatically fixed for every patient."
      },
      {
        "title": "PERSISTENT SYMPTOMS DESPITE THERAPY",
        "keyPoints": [
          "Consider:",
          "Poor adherence",
          "Incorrect administration",
          "Fruit juice interaction",
          "Antacid interaction",
          "Continued allergen exposure",
          "Incorrect diagnosis",
          "Severe nasal obstruction",
          "Comorbid sinus disease"
        ],
        "details": [],
        "practicalExample": "If symptoms persist despite apparently appropriate treatment, review administration and concurrent medicines before concluding that treatment has failed. Management Implications Reassess: Diagnosis Adherence Exposure Drug interactions Treatment strategy",
        "clinicalPearl": "Treatment failure should trigger a structured reassessment before automatically adding or changing medication."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RENAL IMPAIRMENT",
        "keyPoints": [
          "Fexofenadine is substantially eliminated through the kidneys.",
          "Renal function should therefore be considered when prescribing in patients with renal impairment.",
          "Typical Clinical Consideration",
          "Renal impairment may result in altered fexofenadine exposure."
        ],
        "details": [],
        "practicalExample": "Follow the approved product information for dose selection in patients with renal impairment.",
        "clinicalPearl": "Renal function should be considered particularly in older patients and those with known kidney disease."
      },
      {
        "title": "ELDERLY PATIENTS",
        "keyPoints": [
          "Assess:",
          "Renal function",
          "Polypharmacy",
          "Comorbidities",
          "Individual response"
        ],
        "details": [],
        "practicalExample": "Review concomitant medication and renal status where clinically appropriate.",
        "clinicalPearl": "Age alone does not determine treatment, but renal function and medication burden deserve attention."
      },
      {
        "title": "MINIMAL SEDATION PROFILE",
        "keyPoints": [
          "Fexofenadine is generally considered a non-sedating or minimally sedating second-generation antihistamine.",
          "However, individual responses may vary."
        ],
        "details": [],
        "practicalExample": "Patients should be aware of their individual response before undertaking activities requiring full alertness.",
        "clinicalPearl": "A low sedation profile does not mean that every patient will experience identical effects."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Use during pregnancy only when clinically justified."
        ],
        "details": [],
        "practicalExample": "Consider the expected therapeutic benefit and available safety information before prescribing.",
        "clinicalPearl": "Pregnancy warrants an individualised benefit-risk assessment for all medicines."
      },
      {
        "title": "BREASTFEEDING",
        "keyPoints": [
          "The treating physician should consider potential infant exposure and the clinical need for treatment."
        ],
        "details": [],
        "practicalExample": "Use available prescribing information and individual clinical assessment.",
        "clinicalPearl": "Consider both maternal symptom burden and potential infant exposure when selecting therapy during lactation."
      }
    ]
  },
  {
    "id": "flucorion-150",
    "slug": "flucorion-150",
    "brandName": "FLUCORION-150",
    "genericName": "Fluconazole 150 mg Tablets",
    "tagline": "Systemic Triazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Tablet",
    "strength": "150 mg",
    "packSize": "10 × 5 × 2 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected susceptible fungal and yeast infections",
    "composition": [
      "Each tablet contains:",
      "Fluconazole IP— 150 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Systemic Triazole Antifungal • Cutaneous candidiasis • Pityriasis versicol • Prescription Medicine",
    "pharmacologicalClass": "Triazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Fungal Cell Membrane TargetingEnters the fungal cell and targets lanosterol 14-α-demethylase (CYP51), an enzyme essential for fungal sterol synthesis. Ergosterol Synthesis InhibitionInhibition of CYP51 reduces the production of ergosterol, a key structural component of the fungal cell membrane. Membrane Disruption & Fungal Growth InhibitionReduced ergosterol alters the structure, integrity and function of the fungal cell membrane, ultimately inhibiting fungal growth and replication."
      }
    ],
    "indications": [
      "CUTANEOUS CANDIDIASIS",
      "PITYRIASIS VERSICOLOR",
      "MUCOSAL / MUCOUTANEOUS CANDIDIASIS",
      "SELECTED DERMATOPHYTE INFECTIONS",
      "Annular plaques, Peripheral scale, Advancing border, Pruritus, Multiple lesions"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Fluconazole 150 mg Tablets or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "HEPATIC SAFETY",
        "detail": "Clinically significant hepatic reactions have been reported. Management Implications Consider monitoring based on patient risk and treatment duration."
      },
      {
        "title": "RENAL SAFETY",
        "detail": "Fluconazole is predominantly eliminated through the kidneys. Management Implications Dose adjustment may be necessary in patients with reduced renal function depending on the treatment regimen."
      },
      {
        "title": "CARDIAC / QT SAFETY",
        "detail": "Fluconazole may contribute to QT prolongation, particularly in susceptible patients or in combination with other QT-prolonging medicines. Management Implications Review relevant cardiac history, electrolyte abnormalities and interacting medicines."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Fluconazole can alter the exposure of several concomitant medicines. Management Implications Review the complete medication list before treatment."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Patients with significant hypersensitivity reactions require prompt medical assessment. Management Implications Manage suspected serious hypersensitivity according to standard clinical practice and product information."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE AS PRESCRIBED",
        "answer": "\"Take FLUCORION-150 exactly as prescribed. Do not change the dose or treatment duration without consulting your doctor.\""
      },
      {
        "question": "INFORM YOUR DOCTOR ABOUT OTHER MEDICINES",
        "answer": "\"Tell your doctor about all prescription medicines, over-the-counter medicines and supplements that you are taking.\""
      },
      {
        "question": "REPORT POSSIBLE LIVER PROBLEMS",
        "answer": "\"Seek medical advice if you develop unusual tiredness, persistent nausea, loss of appetite, dark urine or yellowing of the skin or eyes.\""
      },
      {
        "question": "REPORT UNUSUAL HEART SYMPTOMS",
        "answer": "\"Seek prompt medical attention if you experience fainting, severe dizziness, palpitations or other unusual cardiac symptoms.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Do not stop treatment early simply because symptoms have improved. Follow the treatment plan provided by your doctor.\""
      },
      {
        "question": "ATTEND FOLLOW-UP",
        "answer": "\"Attend follow-up appointments when advised, particularly if treatment is prolonged or symptoms do not resolve as expected.\""
      }
    ],
    "clinicalPearl": "FLUCORION-150 provides 150 mg of systemic fluconazole for appropriately selected susceptible fungal and yeast infections. Its clinical use should be guided by accurate diagnosis, infection-specific dosing, assessment of renal function, review of drug interactions and relevant hepatic and cardiac risk factors. The 150 mg tablet strength should not be interpreted as a universal single-dose regimen for all fungal infections.",
    "relatedProducts": [
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      },
      {
        "name": "ITFIN-200",
        "generic": "Itraconazole 200 mg Capsules",
        "slug": "itfin-200"
      }
    ],
    "references": [
      "Current approved FLUCORION-150 product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for fluconazole tablets.",
      "Relevant dermatology guidelines concerning superficial fungal and Candida infections.",
      "Relevant literature concerning fluconazole pharmacology, pharmacokinetics and antifungal activity.",
      "Current prescribing information concerning fluconazole drug interactions, renal dosing, hepatic safety and QT-related precautions.",
      "Relevant dermatology literature concerning recurrent candidiasis and pityriasis versicolor."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "DERMATOPHYTOSIS VS CANDIDIASIS",
        "clinicalClues": [
          "Dermatophytosis:",
          "Annular lesions",
          "Advancing peripheral scale",
          "Central clearing may occur",
          "Candidiasis:",
          "Moist erythema",
          "Maceration",
          "Satellite papules/pustules"
        ],
        "typicalAppearance": "Morphology and distribution can provide important clues to the underlying organism.",
        "diagnosticApproach": [
          "Consider KOH microscopy and culture when the diagnosis is uncertain."
        ],
        "managementApproach": [
          "Select antifungal therapy based on the likely or confirmed pathogen."
        ],
        "clinicalPearl": "Identifying the likely organism helps guide systemic antifungal selection."
      },
      {
        "id": "diff-2",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Prominent itch",
          "Recurrent flares",
          "Exposure relationship",
          "Atopic history"
        ],
        "typicalAppearance": "Erythematous, scaly or lichenified plaques.",
        "diagnosticApproach": [
          "Assess morphology, distribution and exposure history."
        ],
        "managementApproach": [
          "Use diagnosis-specific anti-inflammatory treatment where appropriate."
        ],
        "clinicalPearl": "Pruritus and scaling are nonspecific findings and should not automatically trigger systemic antifungal treatment."
      },
      {
        "id": "diff-3",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Sharply demarcated plaques",
          "Extensor involvement",
          "Thick scale",
          "Nail changes",
          "Scalp involvement"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine characteristic psoriasis sites and nails."
        ],
        "managementApproach": [
          "Manage according to psoriasis diagnosis rather than treating empirically as fungal disease."
        ],
        "clinicalPearl": "A chronic scaly plaque requires consideration of psoriasis, particularly when the distribution is characteristic."
      },
      {
        "id": "diff-4",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when an apparent fungal lesion has been exposed to topical corticosteroids.",
          "Look for:",
          "Altered morphology",
          "Reduced border definition",
          "Progressive spread",
          "Recurrence after steroid withdrawal"
        ],
        "typicalAppearance": "Atypical, less clearly annular fungal eruption.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may help establish the diagnosis."
        ],
        "managementApproach": [
          "Reassess the diagnosis and discontinue inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroids can mask the characteristic appearance of dermatophyte infection and allow continued progression."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "New topical product",
          "Occupational exposure",
          "Burning or itching",
          "Contact-pattern distribution"
        ],
        "typicalAppearance": "Eczematous erythema with scaling, vesiculation or crusting.",
        "diagnosticApproach": [
          "Detailed exposure history is essential."
        ],
        "managementApproach": [
          "Identify and remove the suspected trigger."
        ],
        "clinicalPearl": "A detailed exposure history can distinguish contact dermatitis from an apparent fungal eruption."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL INFECTION",
        "clinicalClues": [
          "Consider when there is:",
          "Pain",
          "Purulence",
          "Rapid progression",
          "Marked warmth",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Pustules, erosions, crusting or pronounced inflammation.",
        "diagnosticApproach": [
          "Appropriate clinical and microbiological assessment."
        ],
        "managementApproach": [
          "Treatment should target the identified or suspected bacterial pathogen."
        ],
        "clinicalPearl": "Pain and purulence should broaden the differential beyond superficial fungal infection."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "WHEN TO CONSIDER SYSTEMIC FLUCONAZOLE",
        "keyPoints": [
          "Systemic fluconazole may be considered in selected patients with:",
          "Appropriate susceptible fungal infection",
          "Extensive disease",
          "Recurrent disease",
          "Selected mucocutaneous infections",
          "Failure or impracticality of topical therapy",
          "Other approved indications"
        ],
        "details": [],
        "practicalExample": "FLUCORION-150 should be administered according to the infection-specific prescribed regimen. A patient with an appropriately diagnosed susceptible Candida infection requiring systemic therapy may be prescribed an appropriate fluconazole regimen based on the infection and patient characteristics. Management Implications Before treatment, consider: Organism Site Severity Renal function Concomitant medicines Potential QT-related risk Hepatic history where relevant",
        "clinicalPearl": "The 150 mg tablet strength should not be interpreted as a universal single-dose regimen for every fungal infection."
      },
      {
        "title": "INFECTION-SPECIFIC DOSING",
        "keyPoints": [
          "Fluconazole dosing varies substantially according to:",
          "Infection",
          "Site",
          "Organism",
          "Severity",
          "Host factors",
          "Renal function"
        ],
        "details": [],
        "practicalExample": "Use FLUCORION-150 according to the current approved product information and prescribed regimen. The regimen for a superficial Candida infection may differ substantially from the regimen required for a deeper or systemic fungal infection. Management Implications Avoid transferring a regimen from one indication to another without clinical justification.",
        "clinicalPearl": "Fluconazole dosing is indication-specific—not tablet-strength-specific."
      },
      {
        "title": "RENAL FUNCTION & DOSE ADJUSTMENT",
        "keyPoints": [
          "Fluconazole is predominantly eliminated through the kidneys.",
          "Renal function becomes particularly important when repeated or prolonged dosing is required."
        ],
        "details": [],
        "practicalExample": "Assess renal function where clinically appropriate and follow the approved recommendations for dose adjustment. A patient with reduced renal function receiving a multi-dose fluconazole regimen may require an adjusted dosing strategy. Management Implications Review renal function before and during prolonged systemic therapy where clinically indicated.",
        "clinicalPearl": "For repeated fluconazole therapy, renal function can materially influence drug exposure and dosing."
      },
      {
        "title": "DRUG INTERACTIONS",
        "keyPoints": [
          "Fluconazole inhibits several CYP enzymes and can increase exposure to certain concomitant medicines.",
          "Potentially important interactions include some:",
          "Anticoagulants",
          "Sulfonylureas",
          "Antiepileptic medicines",
          "Immunosuppressants",
          "Certain cardiovascular medicines",
          "QT-prolonging medicines"
        ],
        "details": [],
        "practicalExample": "Review all prescription medicines, OTC medicines and supplements before prescribing. A patient taking multiple chronic medicines should undergo an interaction check before systemic fluconazole is initiated. Management Implications Some combinations may require: Dose adjustment Additional monitoring Alternative therapy Avoidance",
        "clinicalPearl": "A complete medication review is essential before systemic fluconazole therapy."
      },
      {
        "title": "QT PROLONGATION & CARDIAC RISK",
        "keyPoints": [
          "Fluconazole has been associated with QT prolongation and rare serious ventricular arrhythmias."
        ],
        "details": [],
        "practicalExample": "Assess patients for relevant risk factors and interacting QT-prolonging medicines. A patient with known significant QT prolongation or multiple QT-prolonging medicines requires careful assessment before treatment. Management Implications Consider: Cardiac history Electrolyte abnormalities Concomitant medicines Other risk factors",
        "clinicalPearl": "The interaction review should include not only metabolic interactions but also additive QT-prolongation risk."
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "keyPoints": [
          "Fluconazole has been associated with hepatic adverse reactions, including rare serious hepatotoxicity."
        ],
        "details": [],
        "practicalExample": "Consider hepatic history and appropriate laboratory monitoring according to clinical circumstances. A patient with underlying liver disease or prolonged systemic treatment may require closer monitoring. Management Implications Evaluate unexplained: Persistent nausea Anorexia Fatigue Dark urine Jaundice",
        "clinicalPearl": "New hepatic symptoms during systemic fluconazole treatment warrant prompt clinical assessment."
      },
      {
        "title": "TREATMENT DURATION & ADHERENCE",
        "keyPoints": [
          "Treatment duration depends on:",
          "Infection",
          "Site",
          "Severity",
          "Organism",
          "Response",
          "Host factors"
        ],
        "details": [],
        "practicalExample": "Complete the prescribed regimen and do not independently change the frequency or duration. A patient whose symptoms improve early should still follow the prescribed treatment plan. Management Implications Premature discontinuation may contribute to persistence or recurrence.",
        "clinicalPearl": "Symptomatic improvement does not always mean that the underlying fungal infection has been completely eradicated."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent disease may reflect:",
          "Incorrect diagnosis",
          "Resistant organism",
          "Poor adherence",
          "Reinfection",
          "Inadequate regimen",
          "Drug interaction",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Do not automatically repeat or extend treatment without reassessing the diagnosis. A patient with persistent lesions despite appropriate treatment should undergo diagnostic reassessment rather than automatic escalation. Management Implications Consider: KOH microscopy Culture Susceptibility testing where appropriate Adherence review Drug-interaction assessment Alternative diagnosis",
        "clinicalPearl": "Treatment failure should trigger diagnostic reassessment before simply increasing treatment exposure."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT CANDIDIASIS",
        "keyPoints": [
          "Repeated episodes",
          "Partial response",
          "Rapid recurrence",
          "Typical Clinical Appearance",
          "Depending on site, recurrent erythematous or mucosal candidal lesions may be present.",
          "Common Causes & Risk Factors",
          "Diabetes",
          "Antibiotic exposure",
          "Immunosuppression",
          "Local moisture",
          "Hormonal factors",
          "Recurrent colonisation"
        ],
        "details": [],
        "practicalExample": "Confirm the diagnosis where appropriate and investigate underlying predisposing factors.",
        "clinicalPearl": "Repeated candidiasis should prompt consideration of both the organism and the underlying reason for recurrence."
      },
      {
        "title": "EXTENSIVE CUTANEOUS CANDIDIASIS",
        "keyPoints": [
          "Multiple affected areas",
          "Extensive fold involvement",
          "Recurrent disease",
          "Inadequate topical response",
          "Typical Clinical Appearance",
          "Extensive erythematous, macerated plaques with satellite lesions.",
          "Common Causes & Risk Factors",
          "Obesity",
          "Diabetes",
          "Immunosuppression",
          "Moisture and occlusion"
        ],
        "details": [],
        "practicalExample": "Assess whether systemic treatment is appropriate and address underlying risk factors.",
        "clinicalPearl": "Treating the predisposing environment is an important part of preventing recurrence."
      },
      {
        "title": "PITYRIASIS VERSICOLOR",
        "keyPoints": [
          "Recurrent superficial infection",
          "Multiple macules",
          "Fine scale",
          "Pigmentary changes",
          "Typical Clinical Appearance",
          "Hypopigmented or hyperpigmented macules, commonly on the trunk.",
          "Common Causes & Risk Factors",
          "Warm climate",
          "Humidity",
          "Sweating",
          "Recurrence tendency"
        ],
        "details": [],
        "practicalExample": "Use topical therapy where appropriate; systemic treatment may be considered in selected recurrent or extensive disease.",
        "clinicalPearl": "Colour normalization can lag behind microbiological clearance."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Extensive infection",
          "Recurrent disease",
          "Atypical presentation",
          "Poor response",
          "Typical Clinical Appearance",
          "May be more extensive or persistent than usual.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medicines",
          "Immunodeficiency",
          "Significant systemic illness"
        ],
        "details": [],
        "practicalExample": "Consider diagnostic confirmation and closer monitoring.",
        "clinicalPearl": "Atypical or refractory fungal infection in an immunocompromised patient warrants careful evaluation."
      },
      {
        "title": "POLYPHARMACY",
        "keyPoints": [
          "Multiple medicines increase the possibility of clinically significant interactions.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Cardiovascular medicines",
          "Anticoagulants",
          "Antiepileptic medicines",
          "Immunosuppressants",
          "Multiple chronic therapies"
        ],
        "details": [],
        "practicalExample": "Conduct a complete medication review before prescribing.",
        "clinicalPearl": "For systemic fluconazole, medication reconciliation should be treated as part of the prescribing process—not an optional step."
      },
      {
        "title": "RENAL IMPAIRMENT",
        "keyPoints": [
          "Fluconazole is predominantly renally eliminated.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Chronic kidney disease",
          "Acute kidney injury",
          "Older age with reduced renal function"
        ],
        "details": [],
        "practicalExample": "Assess renal function and follow dose-adjustment recommendations where applicable.",
        "clinicalPearl": "Renal function becomes particularly important when fluconazole is prescribed repeatedly or for prolonged treatment."
      }
    ]
  },
  {
    "id": "flucorion-200",
    "slug": "flucorion-200",
    "brandName": "FLUCORION-200",
    "genericName": "Fluconazole 200 mg Tablets",
    "tagline": "Systemic Triazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Tablet",
    "strength": "200 mg",
    "packSize": "10 × 6 × 1 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected susceptible fungal and yeast infections requiring systemic therapy",
    "composition": [
      "Each tablet contains:",
      "Fluconazole IP— 200 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Systemic Triazole Antifungal • Cutaneous candidiasis • Pityriasis versicol • Prescription Medicine",
    "pharmacologicalClass": "Triazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Fungal Cell Membrane TargetingEnters the fungal cell and targets lanosterol 14-α-demethylase (CYP51), an enzyme essential for fungal sterol synthesis. Ergosterol Synthesis InhibitionInhibition of CYP51 reduces the production of ergosterol, a key structural component of the fungal cell membrane. Membrane Disruption & Fungal Growth InhibitionReduced ergosterol alters the structure, integrity and function of the fungal cell membrane, ultimately inhibiting fungal growth and replication."
      }
    ],
    "indications": [
      "CUTANEOUS CANDIDIASIS",
      "PITYRIASIS VERSICOLOR",
      "MUCOSAL / MUCOUTANEOUS CANDIDIASIS",
      "SELECTED DERMATOPHYTE INFECTIONS",
      "Annular plaques, Peripheral scale, Advancing border, Pruritus, Multiple lesions"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Fluconazole 200 mg Tablets or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "HEPATIC SAFETY",
        "detail": "Clinically significant hepatic reactions have been reported. Management Implications Consider monitoring based on treatment duration and patient risk."
      },
      {
        "title": "RENAL SAFETY",
        "detail": "Fluconazole is predominantly eliminated through the kidneys. Management Implications Dose adjustment may be required depending on renal function and treatment regimen."
      },
      {
        "title": "CARDIAC / QT SAFETY",
        "detail": "Fluconazole may contribute to QT prolongation in susceptible individuals. Management Implications Review cardiac history, electrolyte abnormalities and QT-prolonging medicines."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Fluconazole can alter the exposure of several medicines. Management Implications Review all: Prescription medicines OTC medicines Supplements"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Significant allergic reactions require prompt clinical evaluation. Management Implications Manage suspected serious hypersensitivity according to standard clinical practice and current product information."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE AS PRESCRIBED",
        "answer": "\"Take FLUCORION-200 exactly as prescribed. Do not change the dose or treatment duration without consulting your doctor.\""
      },
      {
        "question": "INFORM YOUR DOCTOR ABOUT OTHER MEDICINES",
        "answer": "\"Tell your doctor about all prescription medicines, over-the-counter medicines and supplements you are taking.\""
      },
      {
        "question": "REPORT POSSIBLE LIVER PROBLEMS",
        "answer": "\"Seek medical advice if you develop unusual tiredness, persistent nausea, loss of appetite, dark urine or yellowing of the skin or eyes.\""
      },
      {
        "question": "REPORT UNUSUAL CARDIAC SYMPTOMS",
        "answer": "\"Seek prompt medical attention if you experience fainting, severe dizziness, palpitations or other unusual cardiac symptoms.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED REGIMEN",
        "answer": "\"Do not stop treatment early simply because symptoms have improved. Follow the treatment plan provided by your doctor.\""
      },
      {
        "question": "ATTEND FOLLOW-UP",
        "answer": "\"Attend follow-up appointments when advised, particularly if treatment is prolonged or symptoms do not resolve as expected.\""
      }
    ],
    "clinicalPearl": "FLUCORION-200 provides a 200 mg strength of systemic fluconazole for appropriately selected susceptible fungal and yeast infections. Its use should be guided by accurate diagnosis, infection-specific dosing, renal-function assessment, drug-interaction screening and consideration of relevant hepatic and cardiac risk factors. The 200 mg strength should not be interpreted as a universal regimen or automatically substituted for another fluconazole strength without considering the indication and prescribed dosing schedule.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      },
      {
        "name": "ITFIN-200",
        "generic": "Itraconazole 200 mg Capsules",
        "slug": "itfin-200"
      }
    ],
    "references": [
      "Current approved FLUCORION-200 product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for fluconazole tablets.",
      "Relevant dermatology guidelines concerning superficial fungal and Candida infections.",
      "Relevant literature concerning fluconazole pharmacology, pharmacokinetics and antifungal activity.",
      "Current prescribing information concerning fluconazole drug interactions, renal dosing, hepatic safety and QT-related precautions.",
      "Relevant dermatology literature concerning recurrent candidiasis and pityriasis versicolor."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "DERMATOPHYTOSIS VS CANDIDIASIS",
        "clinicalClues": [
          "Dermatophytosis:",
          "Annular morphology",
          "Advancing border",
          "Peripheral scale",
          "Candidiasis:",
          "Moist erythema",
          "Maceration",
          "Satellite papules or pustules"
        ],
        "typicalAppearance": "Morphology and anatomical distribution can provide useful clues but are not always diagnostic.",
        "diagnosticApproach": [
          "KOH microscopy and fungal culture can be considered where appropriate."
        ],
        "managementApproach": [
          "Select systemic antifungal treatment based on the most likely or confirmed pathogen."
        ],
        "clinicalPearl": "Differentiating dermatophyte infection from candidiasis can directly influence systemic antifungal selection."
      },
      {
        "id": "diff-2",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Prominent itch",
          "Recurrent flares",
          "Exposure relationship",
          "Atopic history"
        ],
        "typicalAppearance": "Erythematous, scaly, vesicular or lichenified plaques depending on the stage.",
        "diagnosticApproach": [
          "Assess morphology, distribution, exposure history and chronicity."
        ],
        "managementApproach": [
          "Treatment should target the underlying inflammatory diagnosis."
        ],
        "clinicalPearl": "Itching and scaling are nonspecific and should not be used alone to diagnose fungal infection."
      },
      {
        "id": "diff-3",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Chronic plaques",
          "Extensor distribution",
          "Scalp involvement",
          "Nail changes",
          "Sharply demarcated borders"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine characteristic sites and assess for nail and scalp involvement."
        ],
        "managementApproach": [],
        "clinicalPearl": "Distribution and morphology can be more informative than pruritus alone when differentiating psoriasis from superficial fungal disease."
      },
      {
        "id": "diff-4",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when a presumed fungal lesion has received topical corticosteroids.",
          "Look for:",
          "Altered morphology",
          "Poorly defined borders",
          "Progressive expansion",
          "Recurrence following corticosteroid withdrawal"
        ],
        "typicalAppearance": "Atypical or less clearly annular fungal eruption.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may assist diagnosis."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroid exposure can suppress inflammatory features while allowing dermatophyte infection to continue spreading."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "New topical product",
          "Occupational exposure",
          "Burning or itching",
          "Contact-pattern distribution"
        ],
        "typicalAppearance": "Erythematous, scaly or vesicular eczematous eruption.",
        "diagnosticApproach": [
          "Detailed exposure history is important."
        ],
        "managementApproach": [
          "Identify and remove the relevant trigger."
        ],
        "clinicalPearl": "A careful exposure history can prevent inappropriate systemic antifungal treatment."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL INFECTION",
        "clinicalClues": [
          "Consider alternative infection when there is:",
          "Significant pain",
          "Purulence",
          "Rapid progression",
          "Marked warmth",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Pustules, erosions, crusting or pronounced inflammation.",
        "diagnosticApproach": [
          "Appropriate microbiological assessment where indicated."
        ],
        "managementApproach": [
          "Treatment should target the suspected or confirmed bacterial pathogen."
        ],
        "clinicalPearl": "Pain, purulence and rapid progression should broaden the differential beyond superficial fungal infection."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "WHEN TO CONSIDER SYSTEMIC FLUCONAZOLE",
        "keyPoints": [
          "Systemic fluconazole may be considered when:",
          "The diagnosis supports systemic antifungal therapy",
          "The causative organism is susceptible",
          "Disease is extensive or recurrent",
          "Topical therapy is inadequate or impractical",
          "The infection falls within the approved indication"
        ],
        "details": [],
        "practicalExample": "FLUCORION-200 should be administered according to the infection-specific prescribed regimen. A patient with an appropriately diagnosed susceptible fungal infection requiring a 200 mg fluconazole regimen may be prescribed FLUCORION-200 according to the clinician's selected schedule. Management Implications Before prescribing, assess: Infection and organism Renal function Drug interactions Relevant hepatic history QT-related risk factors",
        "clinicalPearl": "FLUCORION-200 should be viewed as a convenient 200 mg strength for appropriate regimens—not as a default dose for every fungal infection."
      },
      {
        "title": "INFECTION-SPECIFIC DOSING",
        "keyPoints": [
          "Fluconazole dosage varies according to:",
          "Infection",
          "Site",
          "Organism",
          "Severity",
          "Host factors",
          "Renal function"
        ],
        "details": [],
        "practicalExample": "Use FLUCORION-200 according to the current approved product information and prescribed regimen. The dosing schedule for a selected mucocutaneous infection may differ from that used for other systemic or deep fungal infections. Management Implications Avoid transferring a regimen from one indication to another without clinical justification.",
        "clinicalPearl": "The same fluconazole strength can be used within different therapeutic regimens; the clinical indication determines the regimen."
      },
      {
        "title": "RENAL FUNCTION & DOSE ADJUSTMENT",
        "keyPoints": [
          "Fluconazole is predominantly eliminated through the kidneys."
        ],
        "details": [],
        "practicalExample": "Assess renal function when clinically appropriate and follow the approved dose-adjustment recommendations. A patient with reduced renal function receiving repeated doses may require modification of the maintenance regimen. Management Implications Renal function should be considered particularly in: Chronic kidney disease Acute kidney injury Older patients with suspected reduced renal function Prolonged systemic therapy",
        "clinicalPearl": "For repeated or prolonged treatment, renal function can materially influence fluconazole exposure."
      },
      {
        "title": "DRUG INTERACTIONS",
        "keyPoints": [
          "Fluconazole can inhibit CYP enzymes and alter exposure to several concomitant medicines.",
          "Potentially important interactions include selected:",
          "Anticoagulants",
          "Sulfonylureas",
          "Antiepileptic medicines",
          "Immunosuppressants",
          "Cardiovascular medicines",
          "QT-prolonging medicines"
        ],
        "details": [],
        "practicalExample": "Review prescription medicines, OTC medicines and supplements before treatment. A patient receiving multiple chronic medicines should undergo an interaction review before starting systemic fluconazole. Management Implications Depending on the interacting medicine, clinicians may need to: Modify the dose Increase monitoring Select an alternative Avoid the combination",
        "clinicalPearl": "Systemic fluconazole prescribing should include a structured drug-interaction review."
      },
      {
        "title": "QT PROLONGATION & CARDIAC RISK",
        "keyPoints": [
          "Fluconazole may contribute to QT prolongation, particularly in susceptible patients and in combination with other QT-prolonging medicines."
        ],
        "details": [],
        "practicalExample": "Assess relevant: Cardiac history Concomitant medication Electrolyte abnormalities Other QT risk factors A patient receiving multiple QT-prolonging medicines requires careful assessment before systemic fluconazole treatment. Management Implications Consider the cumulative risk rather than assessing fluconazole in isolation.",
        "clinicalPearl": "Drug-interaction assessment should include pharmacodynamic QT risk as well as metabolic interactions."
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "keyPoints": [
          "Fluconazole has been associated with hepatic adverse reactions, including rare serious hepatotoxicity."
        ],
        "details": [],
        "practicalExample": "Consider baseline and follow-up assessment where clinically appropriate, particularly in patients with hepatic risk factors or prolonged treatment. A patient with known liver disease receiving extended systemic antifungal therapy may require closer clinical or laboratory monitoring. Management Implications Evaluate unexplained: Persistent nausea Anorexia Fatigue Dark urine Jaundice",
        "clinicalPearl": "New hepatic symptoms during therapy warrant prompt clinical assessment."
      },
      {
        "title": "TREATMENT DURATION & ADHERENCE",
        "keyPoints": [
          "Treatment duration depends on:",
          "Infection",
          "Site",
          "Severity",
          "Organism",
          "Clinical response",
          "Host factors"
        ],
        "details": [],
        "practicalExample": "Follow the prescribed regimen and avoid independently changing treatment frequency or duration. A patient whose symptoms improve rapidly should still follow the prescribed treatment plan. Management Implications Premature discontinuation may contribute to persistence or recurrence.",
        "clinicalPearl": "Early symptom relief does not necessarily indicate complete fungal eradication."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent infection may reflect:",
          "Incorrect diagnosis",
          "Resistant organism",
          "Poor adherence",
          "Reinfection",
          "Inadequate regimen",
          "Drug interaction",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Do not automatically repeat, extend or intensify treatment without reassessment. Persistent lesions despite an apparently appropriate regimen should prompt diagnostic review rather than automatic escalation. Management Implications Consider: KOH examination Fungal culture Susceptibility testing where appropriate Adherence review Drug-interaction review Alternative diagnosis",
        "clinicalPearl": "Treatment failure should trigger diagnostic reassessment before increasing antifungal exposure."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT CANDIDIASIS",
        "keyPoints": [
          "Recurrent episodes",
          "Partial response",
          "Rapid recurrence",
          "Typical Clinical Appearance",
          "Recurrent erythematous or mucosal candidal lesions depending on the affected site.",
          "Common Causes & Risk Factors",
          "Diabetes",
          "Antibiotic exposure",
          "Immunosuppression",
          "Local moisture",
          "Hormonal factors",
          "Recurrent colonisation"
        ],
        "details": [],
        "practicalExample": "Confirm the diagnosis where appropriate and investigate underlying risk factors.",
        "clinicalPearl": "Recurrence should prompt assessment of both the infection and the factors that may be sustaining it."
      },
      {
        "title": "EXTENSIVE CUTANEOUS CANDIDIASIS",
        "keyPoints": [
          "Multiple sites",
          "Extensive fold involvement",
          "Recurrent disease",
          "Inadequate response to topical treatment",
          "Typical Clinical Appearance",
          "Extensive erythematous, macerated plaques with satellite lesions.",
          "Common Causes & Risk Factors",
          "Obesity",
          "Diabetes",
          "Immunosuppression",
          "Moisture and occlusion"
        ],
        "details": [],
        "practicalExample": "Assess the need for systemic therapy while addressing predisposing factors.",
        "clinicalPearl": "Addressing the underlying environment can be as important as treating the fungal organism when preventing recurrence."
      },
      {
        "title": "PITYRIASIS VERSICOLOR",
        "keyPoints": [
          "Multiple macules",
          "Fine scale",
          "Pigmentary change",
          "Recurrence",
          "Typical Clinical Appearance",
          "Hypopigmented, hyperpigmented or erythematous truncal macules.",
          "Common Causes & Risk Factors",
          "Warm climate",
          "Humidity",
          "Sweating",
          "Recurrent tendency"
        ],
        "details": [],
        "practicalExample": "Use topical treatment where appropriate; systemic therapy may be considered in selected recurrent or extensive cases.",
        "clinicalPearl": "Post-treatment pigmentary change can persist after successful antifungal treatment."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Extensive disease",
          "Recurrent infection",
          "Atypical morphology",
          "Poor response",
          "Typical Clinical Appearance",
          "Disease may be unusually extensive or persistent.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medicines",
          "Immunodeficiency",
          "Significant systemic illness"
        ],
        "details": [],
        "practicalExample": "Consider diagnostic confirmation and closer monitoring.",
        "clinicalPearl": "Atypical or refractory infection in an immunocompromised patient warrants careful diagnostic evaluation."
      },
      {
        "title": "POLYPHARMACY",
        "keyPoints": [
          "Multiple medicines increase the possibility of clinically significant drug interactions.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Anticoagulants",
          "Cardiovascular medicines",
          "Antiepileptic medicines",
          "Immunosuppressants",
          "Multiple chronic therapies"
        ],
        "details": [],
        "practicalExample": "Perform a complete medication review.",
        "clinicalPearl": "For systemic fluconazole, medication reconciliation is an essential part of safe prescribing."
      },
      {
        "title": "RENAL IMPAIRMENT",
        "keyPoints": [
          "Fluconazole is predominantly eliminated through the kidneys.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Chronic kidney disease",
          "Acute kidney injury",
          "Reduced renal function with advancing age"
        ],
        "details": [],
        "practicalExample": "Assess renal function and apply dose-adjustment recommendations where applicable.",
        "clinicalPearl": "Renal function should be considered whenever repeated or prolonged fluconazole treatment is planned."
      }
    ]
  },
  {
    "id": "flutirium",
    "slug": "flutirium",
    "brandName": "FLUTIRIUM",
    "genericName": "Fluticasone Propionate 0.05% w/w Cream",
    "tagline": "Medium-Potency Topical Corticosteroid | For Dermatological Use",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Corticosteroids",
    "dosageForm": "Cream",
    "strength": "0.05% w/w",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Fluticasone Propionate 0.05% w/w"
    ],
    "therapeuticCategory": "Topical Corticosteroid • Clinical Spectrum • Inflammatory Dermatoses • Pruritic Dermatoses • Corticosteroid-Responsive Skin Conditions",
    "pharmacologicalClass": "Medium-potency corticosteroid Synthetic topical corticosteroid with anti-inflammatory and antipruritic activity.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Fluticasone propionate produces its therapeutic effects through corticosteroid-mediated modulation of inflammatory pathways within the skin. Clinical Pathway Fluticasone Propionate Corticosteroid receptor-mediated activity Modulation of inflammatory responses Reduction of inflammatory mediators Reduction in erythema, oedema and pruritus Improvement in corticosteroid-responsive inflammatory dermatoses"
      }
    ],
    "indications": [
      "Atopic dermatitis",
      "Eczematous dermatoses",
      "Contact dermatitis",
      "Other corticosteroid-responsive inflammatory dermatoses",
      "Pruritic inflammatory skin conditions",
      "CORTICOSTEROID POTENCY & CLINICAL SELECTION",
      "Accordion 01 — Why Does Potency Matter?",
      "Topical corticosteroids differ in potency.",
      "Selection should consider:",
      "Disease severity",
      "Anatomical site",
      "Thickness of the lesion",
      "Patient age",
      "Extent of disease",
      "Treatment duration",
      "Skin integrity",
      "FLUTIRIUM contains a medium-potency corticosteroid and should therefore be selected where this level of anti-inflammatory activity is clinically appropriate.",
      "Accordion 02 — Anatomical Site Matters",
      "Different areas of the body have different susceptibility to corticosteroid-related adverse effects.",
      "Greater caution is generally required when treating:",
      "Face",
      "Eyelids",
      "Genital areas",
      "Groin",
      "Flexures",
      "Thin or atrophic skin",
      "The final treatment decision should follow the approved product information and physician judgement.",
      "Accordion 03 — Severity Matters",
      "A mild inflammatory presentation may require a different potency strategy from a severe, thick or highly lichenified lesion.",
      "Clinical Pearl",
      "Use corticosteroid potency according to the clinical requirement—not simply according to the intensity of the patient's symptoms."
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — Recommended Application",
      "howToApply": "Apply a thin film of FLUTIRIUM to the affected skin and gently rub into the area.",
      "duration": "For comparable fluticasone propionate 0.05% cream prescribing information:",
      "missedApplication": "Atopic dermatitis: once or twice daily"
    },
    "specialPopulations": {
      "pregnancy": "Accordion — Lactation",
      "lactation": "Treatment site",
      "paediatric": "FLUTIRIUM-specific approved age restrictions should be confirmed from its final product information.",
      "geriatric": "Older patients may have more fragile or thinner skin."
    },
    "contraindications": [
      "FLUTIRIUM should not be used in patients with known hypersensitivity to fluticasone propionate or any component of the formulation.",
      "Comparable fluticasone propionate 0.05% cream prescribing information lists hypersensitivity to the components as a contraindication.",
      "Use should also be avoided in clinical situations specifically excluded by the approved product information, including untreated infection at the treatment site, pre-existing skin atrophy, rosacea and perioral dermatitis.",
      "WARNINGS & PRECAUTIONS",
      "Accordion 01 — Infection",
      "Fluticasone propionate cream should not be used where infection is present at the treatment site unless the infection is being appropriately addressed.",
      "If a concomitant skin infection develops, appropriate antibacterial or antifungal therapy should be considered. If the response is not prompt, corticosteroid treatment should be discontinued until the infection is adequately controlled.",
      "Accordion 02 — Skin Atrophy",
      "Topical corticosteroids can cause local skin changes, particularly with prolonged use, higher exposure, occlusion or application to susceptible sites.",
      "Potential changes include:",
      "Skin thinning",
      "Striae",
      "Telangiectasia",
      "Hypopigmentation",
      "Skin fragility",
      "Current prescribing information advises against use on pre-existing skin atrophy.",
      "Accordion 03 — Occlusion",
      "Occlusion can increase corticosteroid penetration and may increase the risk of adverse effects.",
      "Comparable fluticasone propionate 0.05% cream prescribing information specifically advises against occlusive dressings.",
      "Accordion 04 — Face, Groin & Flexures",
      "These sites may be more susceptible to corticosteroid-related adverse effects.",
      "Use on the face, underarms or groin should only occur when specifically directed by the physician and according to the approved product information.",
      "Accordion 05 — Rosacea & Perioral Dermatitis",
      "Fluticasone propionate 0.05% cream prescribing information states that it should not be used for rosacea or perioral dermatitis.",
      "Clinical Pearl",
      "A facial eruption that worsens or changes character during corticosteroid therapy should prompt diagnostic reassessment.",
      "Accordion 06 — Systemic Absorption",
      "Although administered topically, corticosteroids can be absorbed through the skin.",
      "Systemic absorption may increase with:",
      "Large treatment areas",
      "Prolonged treatment",
      "Occlusion",
      "Damaged skin",
      "Increased skin permeability",
      "Excessive exposure may result in systemic corticosteroid effects."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — Infection",
        "detail": "Accordion 01 — Infection"
      },
      {
        "title": "Fluticasone propionate cream should not ",
        "detail": "Fluticasone propionate cream should not be used where infection is present at the treatment site unless the infection is being appropriately addressed."
      },
      {
        "title": "If a concomitant skin infection develops",
        "detail": "If a concomitant skin infection develops, appropriate antibacterial or antifungal therapy should be considered. If the response is not prompt, corticosteroid treatment should be discontinued until the infection is adequately controlled."
      },
      {
        "title": "Accordion 02 — Skin Atrophy",
        "detail": "Accordion 02 — Skin Atrophy"
      },
      {
        "title": "Topical corticosteroids can cause local ",
        "detail": "Topical corticosteroids can cause local skin changes, particularly with prolonged use, higher exposure, occlusion or application to susceptible sites."
      },
      {
        "title": "Potential changes include:",
        "detail": "Potential changes include:"
      }
    ],
    "adverseEffects": {
      "common": [
        "Irritation",
        "Burning or stinging",
        "Folliculitis",
        "Acneiform eruptions",
        "Hypopigmentation",
        "Perioral dermatitis",
        "Allergic contact dermatitis",
        "Secondary infection",
        "Skin atrophy",
        "Striae",
        "Hypertrichosis",
        "Miliaria",
        "DRUG & PRODUCT INTERACTIONS",
        "Clinical considerations include concurrent use of:",
        "Other topical corticosteroids",
        "Multiple topical preparations on the same area",
        "Irritant topical products",
        "Occlusive preparations",
        "Treatments for concomitant skin infection"
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store FLUTIRIUM according to the conditions specified on the approved product label.",
      "General Handling Considerations",
      "Keep the tube properly closed when not in use.",
      "Store according to the labelled temperature requirements."
    ],
    "patientCounselling": [
      {
        "question": "What is FLUTIRIUM?",
        "answer": "FLUTIRIUM contains fluticasone propionate 0.05%, a medium-potency topical corticosteroid used to reduce inflammation and itching associated with appropriate corticosteroid-responsive skin conditions."
      },
      {
        "question": "How should it be applied?",
        "answer": "Apply a thin film to the affected skin and gently rub it in as directed by the physician. Wash hands after application unless the hands themselves are being treated."
      },
      {
        "question": "Should more cream be applied if symptoms are severe?",
        "answer": "No. Patients should not increase the quantity or frequency without medical advice. Using more cream does not necessarily provide proportionally greater benefit and may increase corticosteroid exposure."
      },
      {
        "question": "Can FLUTIRIUM be used on the face?",
        "answer": "Patients should not use FLUTIRIUM on the face unless specifically directed by the treating physician and permitted by the approved product information."
      },
      {
        "question": "Can it be covered with a bandage?",
        "answer": "Patients should not cover treated areas with occlusive dressings unless specifically instructed by the physician. Occlusion can increase corticosteroid absorption."
      },
      {
        "question": "What if the rash does not improve?",
        "answer": "The patient should consult the treating physician rather than continuing treatment indefinitely. Current prescribing information recommends reconsidering the diagnosis when there is no improvement within approximately 2 weeks."
      },
      {
        "question": "What if the skin becomes irritated?",
        "answer": "Persistent burning, irritation, worsening dermatitis or other unexpected reactions should be reported to the treating physician. Allergic contact dermatitis can sometimes present as failure to improve rather than an obvious acute worsening."
      }
    ],
    "clinicalPearl": "FLUTIRIUM provides medium-potency topical corticosteroid activity for appropriate inflammatory and pruritic dermatoses. Clinical benefit depends on selecting the appropriate potency, applying an adequate thin film, limiting treatment to the necessary duration and reassessing non-responsive or atypical lesions.",
    "relatedProducts": [
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      },
      {
        "name": "TENORIUM NM",
        "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
        "slug": "tenorium-nm"
      }
    ],
    "references": [
      "Current approved prescribing information for FLUTIRIUM should be used as the primary source for the final product-specific indications, dosage, contraindications, warnings, precautions, storage conditions and safety information.",
      "DailyMed. Fluticasone Propionate Cream 0.05% — professional prescribing information.",
      "DailyMed. Fluticasone Propionate Cream 0.05% — product description, dosage and administration.",
      "DailyMed. Fluticasone Propionate Cream USP 0.05% — current product information and packaging information."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "Could This Be a Fungal Infection?",
        "clinicalClues": [
          "Consider dermatophyte infection when there is:",
          "Annular morphology",
          "Peripheral scale",
          "Central clearing",
          "Asymmetric or expanding lesions",
          "Unusual response to corticosteroid treatment"
        ],
        "typicalAppearance": "Annular or polycyclic plaques with an active scaly border may suggest dermatophyte infection.",
        "diagnosticApproach": [
          "Where clinically indicated, consider appropriate mycological assessment."
        ],
        "managementApproach": [
          "Avoid using a topical corticosteroid alone when a fungal infection is suspected."
        ],
        "clinicalPearl": "An atypical or expanding scaly plaque that fails to respond as expected should prompt reconsideration of tinea."
      },
      {
        "id": "diff-2",
        "condition": "Could This Be Contact Dermatitis?",
        "clinicalClues": [
          "Consider contact dermatitis when symptoms correlate with:",
          "A new cosmetic",
          "Topical medication",
          "Fragrance",
          "Occupational exposure",
          "Metals",
          "Detergents",
          "Repeated environmental exposure"
        ],
        "typicalAppearance": "Erythematous, pruritic, eczematous lesions may occur at the site of exposure.",
        "diagnosticApproach": [
          "History is central. Patch testing may be appropriate in recurrent or persistent cases."
        ],
        "managementApproach": [
          "Identify and avoid the relevant trigger while treating the inflammatory component appropriately."
        ],
        "clinicalPearl": "Persistent dermatitis despite appropriate anti-inflammatory treatment should prompt consideration of continued allergen exposure or contact sensitisation."
      },
      {
        "id": "diff-3",
        "condition": "Could This Be Psoriasis?",
        "clinicalClues": [
          "Consider psoriasis when lesions are:",
          "Well demarcated",
          "Persistent",
          "Plaque-like",
          "Associated with characteristic scaling",
          "Located on extensor surfaces or scalp"
        ],
        "typicalAppearance": "Well-defined erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Diagnosis is usually clinical, supported by distribution and morphology."
        ],
        "managementApproach": [
          "Treatment should be selected according to disease extent, severity, location and psoriasis phenotype."
        ],
        "clinicalPearl": "Distribution and morphology often provide important clues when distinguishing psoriasis from eczema."
      },
      {
        "id": "diff-4",
        "condition": "Could This Be an Infection?",
        "clinicalClues": [
          "Consider infection when there is:",
          "Pustulation",
          "Crusting",
          "Rapid progression",
          "Pain",
          "Warmth",
          "Unusual discharge",
          "Poor response to corticosteroid therapy"
        ],
        "typicalAppearance": "Appearance varies according to the organism and site involved.",
        "diagnosticApproach": [
          "Use appropriate microbiological assessment where clinically indicated."
        ],
        "managementApproach": [
          "Treat the underlying infection appropriately. Do not rely on corticosteroid suppression of inflammation alone."
        ],
        "clinicalPearl": "Reduction in redness after corticosteroid treatment does not necessarily indicate eradication of infection."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "Recommended Application",
        "keyPoints": [],
        "details": [
          "Apply a thin film of FLUTIRIUM to the affected skin and gently rub into the area.",
          "For comparable fluticasone propionate 0.05% cream prescribing information:",
          "Atopic dermatitis: once or twice daily",
          "Other corticosteroid-responsive dermatoses: twice daily",
          "Treatment should be discontinued when adequate disease control is achieved.",
          "FLUTIRIUM-specific dosing should follow its approved product information."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "How Much Should Be Applied?",
        "keyPoints": [],
        "details": [
          "Apply enough to form a thin, even film over the affected skin.",
          "The quantity required depends on:",
          "Size of the treatment area",
          "Anatomical site",
          "Extent of disease",
          "The Fingertip Unit (FTU) may be used as a practical method for explaining topical treatment quantity.",
          "Practical Principle",
          "Adequate coverage is important; excessive application does not necessarily improve efficacy and may increase exposure."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "Duration of Treatment",
        "keyPoints": [],
        "details": [
          "Treatment should generally continue only for the duration required to achieve appropriate disease control.",
          "Once adequate control is achieved, treatment should be discontinued or modified according to the physician's treatment strategy.",
          "If there is no improvement within approximately 2 weeks, the diagnosis should be reassessed rather than simply continuing treatment indefinitely."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "Treatment Response",
        "keyPoints": [],
        "details": [
          "Clinical response can be assessed through changes in:",
          "Erythema",
          "Oedema",
          "Pruritus",
          "Scaling",
          "Lichenification",
          "Excoriation",
          "Overall inflammatory activity"
        ],
        "practicalExample": "",
        "clinicalPearl": "Failure to respond as expected should prompt reassessment of diagnosis, adherence, application technique and possible infection."
      }
    ]
  },
  {
    "id": "hivozin-5",
    "slug": "hivozin-5",
    "brandName": "HIVOZIN-5",
    "genericName": "Levocetirizine 5 mg Tablet",
    "tagline": "Second-Generation H1-Antihistamine for Appropriate Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
    "composition": [
      "Each tablet contains:",
      "Levocetirizine Dihydrochloride IP equivalent to Levocetirizine — 5 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Second-Generation H1-Antihistamine • Allergic rhinitis • Seasonal allergic rhinitis • Perennial allergic rhinitis • Urticaria",
    "pharmacologicalClass": "Selective peripheral H1-receptor antagonist",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Allergen exposure Mast-cell activation Histamine release H1-receptor activation Levocetirizine Selective peripheral H1-receptor antagonism (Reduction in histamine-mediated symptoms)"
      }
    ],
    "indications": [
      "ALLERGIC RHINITIS",
      "SEASONAL ALLERGIC RHINITIS",
      "PERENNIAL ALLERGIC RHINITIS",
      "URTICARIA"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Levocetirizine 5 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion — DROWSINESS",
        "detail": "Clinical Consideration Some patients may experience somnolence. Patient Counselling Patients should be cautious with: Driving Operating machinery Other activities requiring sustained alertness until they know how the medicine affects them."
      },
      {
        "title": "Accordion — ALCOHOL AND CNS DEPRESSANTS",
        "detail": "Clinical Consideration Concurrent use with alcohol or other CNS depressants may increase impairment or sedation in susceptible individuals. Management Consideration Review concurrent medications and counsel appropriately."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD HIVOZIN-5 BE TAKEN?",
        "answer": "Take: One tablet once daily with water, according to the physician's prescription. It may generally be taken with or without food. Patient Education Pearl \"Take one tablet once daily and maintain a consistent dosing routine.\""
      },
      {
        "question": "CAN THE PATIENT DRIVE?",
        "answer": "Patients should determine how HIVOZIN-5 affects their alertness before driving or operating machinery. If drowsiness occurs, activities requiring full alertness should be avoided."
      },
      {
        "question": "WHAT IF SYMPTOMS PERSIST?",
        "answer": "Patients should consult their physician if: Symptoms remain uncontrolled Symptoms become more frequent New symptoms develop Nasal obstruction becomes persistent Wheezing or breathing difficulty occurs Recurrent urticaria continues Patient Education Pearl Persistent symptoms may require reassessment rather than repeated self-medication."
      },
      {
        "question": "DO NOT DUPLICATE ANTIHISTAMINES",
        "answer": "Patients should inform their physician or pharmacist about other allergy medicines they are taking."
      }
    ],
    "clinicalPearl": "HIVOZIN-5 provides once-daily second-generation H1-antihistamine therapy for appropriate histamine-mediated allergic conditions. Its principal clinical role is symptomatic control of sneezing, itching, rhinorrhoea and urticarial pruritus, with individual assessment required for persistent congestion, recurrent symptoms and special populations.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      }
    ],
    "references": [
      "Current approved HIVOZIN-5 product information and package insert — primary source for final product-specific indications, dosage, contraindications, warnings, precautions, excipients, storage and regulatory statements.",
      "Levocetirizine prescribing information and approved product literature — for pharmacology, dosing, safety and administration information.",
      "Relevant current clinical guidance for allergic rhinitis and urticaria should be consulted when developing patient-specific treatment plans."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "VIRAL UPPER RESPIRATORY INFECTION",
        "clinicalClues": [
          "Acute onset",
          "Sore throat",
          "Cough",
          "Malaise",
          "Fever may occur",
          "Sick contacts"
        ],
        "typicalAppearance": "Nasal congestion and rhinorrhoea can overlap with allergic rhinitis.",
        "diagnosticApproach": [
          "Consider:",
          "Duration",
          "Fever",
          "Systemic symptoms",
          "Exposure history",
          "Seasonal pattern"
        ],
        "managementApproach": [
          "Avoid automatically attributing every episode of rhinorrhoea to allergy."
        ],
        "clinicalPearl": "Systemic symptoms and a short self-limited course may favour an infectious process over allergic rhinitis."
      },
      {
        "id": "diff-2",
        "condition": "NON-ALLERGIC RHINITIS",
        "clinicalClues": [
          "Symptoms may be triggered by:",
          "Strong odours",
          "Smoke",
          "Temperature changes",
          "Environmental irritants",
          "Certain medications"
        ],
        "typicalAppearance": "Predominantly nasal symptoms without a consistent allergen-related pattern.",
        "diagnosticApproach": [
          "Identify:",
          "Environmental triggers",
          "Medication history",
          "Symptom patterns"
        ],
        "managementApproach": [
          "Treatment should be directed toward the underlying rhinitis phenotype."
        ],
        "clinicalPearl": "Not all chronic rhinitis is allergic."
      },
      {
        "id": "diff-3",
        "condition": "CHRONIC RHINOSINUSITIS",
        "clinicalClues": [
          "Consider when symptoms include:",
          "Persistent nasal obstruction",
          "Facial pressure",
          "Reduced smell",
          "Prolonged nasal discharge",
          "Chronic symptoms"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Clinical examination and appropriate ENT assessment may be required."
        ],
        "managementApproach": [
          "Persistent symptoms may require disease-specific treatment rather than repeated oral antihistamine therapy."
        ],
        "clinicalPearl": "Persistent obstruction associated with reduced smell or facial symptoms deserves further evaluation."
      },
      {
        "id": "diff-4",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Localised pruritic eruption",
          "Temporal relationship to an exposure",
          "Eczematous changes",
          "Burning or itching"
        ],
        "typicalAppearance": "Erythematous, eczematous or vesicular lesions may correspond to areas of contact.",
        "diagnosticApproach": [
          "Review:",
          "Cosmetics",
          "Personal-care products",
          "Occupational exposures",
          "Topical medicines",
          "Metals and other contactants"
        ],
        "managementApproach": [
          "Identify and eliminate the relevant allergen or irritant."
        ],
        "clinicalPearl": "Antihistamines may reduce itch but do not remove the underlying cause of contact dermatitis."
      },
      {
        "id": "diff-5",
        "condition": "DRUG-RELATED ERUPTION",
        "clinicalClues": [
          "Consider when a new rash develops after introduction of a medicine."
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Establish:",
          "Medication timeline",
          "Previous exposure",
          "Rash morphology",
          "Associated systemic symptoms"
        ],
        "managementApproach": [
          "Suspected drug reactions require appropriate clinical assessment."
        ],
        "clinicalPearl": "A new widespread eruption should always prompt a medication history."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "STANDARD ADULT DOSING",
        "keyPoints": [
          "The commonly recommended adult dose of levocetirizine is:",
          "5 mg once daily."
        ],
        "details": [],
        "practicalExample": "HIVOZIN-5 — One tablet once daily, according to the physician's prescription and approved product information. For an adult with appropriately diagnosed allergic rhinitis: Levocetirizine 5 mg once daily. Management Implications Treatment duration should reflect the patient's disease pattern and clinical response.",
        "clinicalPearl": "Use the lowest effective regimen for the appropriate duration based on the clinical presentation."
      },
      {
        "title": "ADMINISTRATION",
        "keyPoints": [
          "Levocetirizine may generally be taken with or without food."
        ],
        "details": [],
        "practicalExample": "Take the prescribed tablet with water. The patient may take the tablet at a consistent time each day. Management Implications Consistency can help maintain predictable symptom control.",
        "clinicalPearl": "Simple once-daily administration can support treatment adherence."
      },
      {
        "title": "WHEN SYMPTOMS ARE PREDOMINANTLY NASAL",
        "keyPoints": [
          "Oral antihistamines are particularly useful for histamine-mediated symptoms such as:",
          "Sneezing",
          "Itching",
          "Rhinorrhoea"
        ],
        "details": [],
        "practicalExample": "A patient with recurrent sneezing, nasal itching and watery rhinorrhoea during allergen exposure may benefit from oral antihistamine therapy. Management Implications If nasal congestion remains the dominant uncontrolled symptom, reassess the treatment approach and consider whether intranasal therapy or another strategy is appropriate.",
        "clinicalPearl": "Oral antihistamines generally have a greater effect on sneezing, itching and rhinorrhoea than on severe nasal obstruction."
      },
      {
        "title": "URTICARIA",
        "keyPoints": [
          "Second-generation H1-antihistamines are commonly used as first-line pharmacological therapy for urticaria."
        ],
        "details": [],
        "practicalExample": "A patient presenting with recurrent pruritic wheals may be treated with a second-generation H1-antihistamine according to the clinical diagnosis and prescribing guidance. Management Implications Patients with persistent or recurrent urticaria require assessment of disease duration, triggers, associated angioedema and treatment response.",
        "clinicalPearl": "In chronic urticaria, treatment should focus on disease control rather than simply treating each individual wheal."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Duration depends on:",
          "Seasonal versus perennial disease",
          "Symptom frequency",
          "Severity",
          "Allergen exposure",
          "Treatment response"
        ],
        "details": [],
        "practicalExample": "A patient with predictable seasonal symptoms may require treatment during periods of allergen exposure, while recurrent disease may require a different treatment strategy. Management Implications Review ongoing treatment according to the clinical course.",
        "clinicalPearl": "Treatment duration should be individualised rather than automatically fixed for every patient."
      },
      {
        "title": "PERSISTENT SYMPTOMS DESPITE THERAPY",
        "keyPoints": [
          "Consider:",
          "Poor adherence",
          "Incorrect diagnosis",
          "Continued allergen exposure",
          "Inadequate treatment strategy",
          "Severe nasal congestion",
          "Comorbid sinus disease",
          "Structural nasal disease"
        ],
        "details": [],
        "practicalExample": "A patient continuing to experience severe obstruction despite improvement in sneezing and itching may require reassessment rather than simply continuing the same approach indefinitely. Management Implications Reconsider the diagnosis, phenotype and treatment strategy.",
        "clinicalPearl": "Treatment failure should trigger reassessment—not automatic escalation."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RENAL IMPAIRMENT",
        "keyPoints": [
          "Levocetirizine is substantially eliminated through the kidneys.",
          "Renal function should therefore be considered when determining the appropriate dose."
        ],
        "details": [],
        "practicalExample": "Assess renal function where clinically relevant and follow approved dosing recommendations for the degree of renal impairment.",
        "clinicalPearl": "Renal function is particularly important when prescribing levocetirizine in older adults or patients with known renal disease."
      },
      {
        "title": "ELDERLY PATIENTS",
        "keyPoints": [
          "Older patients may have:",
          "Reduced renal function",
          "Multiple medications",
          "Increased sensitivity to sedative effects"
        ],
        "details": [],
        "practicalExample": "Review: Renal function Concomitant medicines Fall risk Individual response",
        "clinicalPearl": "Age alone does not determine treatment, but renal function and overall medication burden deserve attention."
      },
      {
        "title": "DROWSINESS / SEDATION",
        "keyPoints": [
          "Although levocetirizine is a second-generation antihistamine, some patients may experience:",
          "Somnolence",
          "Fatigue",
          "Reduced alertness"
        ],
        "details": [],
        "practicalExample": "Assess individual response before activities requiring full alertness.",
        "clinicalPearl": "\"Second-generation\" does not mean \"zero sedation\" in every patient."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Use during pregnancy only when clinically justified."
        ],
        "details": [],
        "practicalExample": "The physician should consider the expected therapeutic benefit and available safety information before prescribing.",
        "clinicalPearl": "Pregnancy should prompt an individualised benefit-risk assessment rather than automatic continuation of routine allergy medication."
      },
      {
        "title": "BREASTFEEDING",
        "keyPoints": [
          "Levocetirizine may be present in breast milk."
        ],
        "details": [],
        "practicalExample": "The treating physician should assess clinical necessity and available safety information before use during lactation.",
        "clinicalPearl": "Consider both maternal symptom burden and potential infant exposure when selecting therapy."
      },
      {
        "title": "CHILDREN",
        "keyPoints": [
          "The appropriate formulation and strength depend on age."
        ],
        "details": [],
        "practicalExample": "Use age-appropriate formulations and doses according to approved prescribing information.",
        "clinicalPearl": "The 5 mg tablet should not automatically be used in younger children simply because the active ingredient is commonly used in paediatric allergy."
      }
    ]
  },
  {
    "id": "hivozin-m",
    "slug": "hivozin-m",
    "brandName": "HIVOZIN-M",
    "genericName": "Levocetirizine 5 mg + Montelukast 10 mg Tablet",
    "tagline": "Dual-Pathway Antiallergic Therapy for Appropriate Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "5 mg + 10 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Antiallergic / Leukotriene Modifier Combination",
    "composition": [
      "Each tablet contains:",
      "Levocetirizine Dihydrochloride IP equivalent to Levocetirizine — 5 mg",
      "Montelukast Sodium IP equivalent to Montelukast — 10 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Dual-Pathway Antiallergic Therapy • Oral • Allergic Rhinitis • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological allergy & pruritus therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "PATHWAY 01 — HISTAMINE",
        "description": "Allergen exposure Mast-cell activation Histamine release H1-receptor activation Levocetirizine blocks H1-receptor Leukotriene generation CysLT1 receptor activation Montelukast blocks CysLT1 receptor"
      }
    ],
    "indications": [
      "ALLERGIC RHINITIS",
      "SEASONAL ALLERGIC RHINITIS",
      "PERENNIAL ALLERGIC RHINITIS",
      "ALLERGIC RHINOCONJUNCTIVITIS",
      "URTICARIA"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Accordion — BREASTFEEDING",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Accordion — ELDERLY PATIENTS",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Levocetirizine 5 mg + Montelukast 10 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Some patients may develop some neuropsychiatric effects like Sleep disturbances, Abnormal dreams,Agitation, Irritability, Anxiety, Depression, behavioural changes etc. due to Monteluast.",
        "Levocetirizine has some adverse effects like Somnolence, Fatigue, Headache, Dry mouth, Dizziness.",
        "HIVOZIN-M should not be used in patients with known hypersensitivity to: Levocetirizine, Montelukast or Relevant formulation components"
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD HIVOZIN-M BE TAKEN?",
        "answer": "Take: One tablet once daily with water, according to the physician's prescription. Patient Education Pearl \"Take one tablet once daily and maintain a consistent dosing routine.\""
      },
      {
        "question": "WHAT SHOULD PATIENTS KNOW ABOUT MONTELUKAST?",
        "answer": "Patients should be informed about possible neuropsychiatric effects. Report promptly: Mood changes Behavioural changes Anxiety Depression Agitation Sleep disturbances Abnormal dreams Suicidal thoughts or behaviour The FDA advises patients to stop montelukast and contact a healthcare professional immediately if new neuropsychiatric symptoms or suicidal thoughts/behaviour occur."
      },
      {
        "question": "CAN THE PATIENT DRIVE?",
        "answer": "Levocetirizine may cause somnolence in some patients. Patients should establish their individual response before driving or operating machinery."
      },
      {
        "question": "DO NOT DUPLICATE ANTIHISTAMINES",
        "answer": "Patients should inform their physician or pharmacist about other allergy medicines they are taking."
      },
      {
        "question": "WHAT IF SYMPTOMS PERSIST?",
        "answer": "Patients should consult their healthcare professional if: Symptoms remain uncontrolled Nasal obstruction becomes persistent Symptoms recur frequently New symptoms develop Wheezing or breathing difficulty occurs Treatment appears ineffective Patient Education Pearl Persistent symptoms should trigger clinical reassessment rather than unsupervised dose escalation."
      }
    ],
    "clinicalPearl": "HIVOZIN-M combines levocetirizine-mediated peripheral H1-receptor blockade with montelukast-mediated leukotriene receptor antagonism. Its use should be guided by the patient's clinical phenotype and treatment needs, with particular attention to montelukast's neuropsychiatric safety considerations.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      }
    ],
    "references": [
      "Current approved HIVOZIN-M product information and package insert — primary source for final product-specific indications, dosage, contraindications, warnings, precautions, excipients, storage and regulatory statements.",
      "Current approved prescribing information for levocetirizine — pharmacology, dosing, safety and administration.",
      "U.S. FDA. Montelukast Drug Safety Communication / Boxed Warning — neuropsychiatric safety considerations and recommendations concerning use in allergic rhinitis.",
      "Relevant current clinical guidance for allergic rhinitis and urticaria should be considered when developing patient-specific treatment plans."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "VIRAL UPPER RESPIRATORY INFECTION",
        "clinicalClues": [
          "Acute onset",
          "Sore throat",
          "Cough",
          "Malaise",
          "Fever may occur",
          "Sick contacts"
        ],
        "typicalAppearance": "Nasal congestion and rhinorrhoea may overlap with allergic rhinitis.",
        "diagnosticApproach": [
          "Assess:",
          "Duration",
          "Fever",
          "Systemic symptoms",
          "Exposure history",
          "Seasonal pattern"
        ],
        "managementApproach": [
          "Avoid automatically interpreting every episode of rhinorrhoea as allergic rhinitis."
        ],
        "clinicalPearl": "Systemic symptoms and an acute self-limited course may favour an infectious process."
      },
      {
        "id": "diff-2",
        "condition": "NON-ALLERGIC RHINITIS",
        "clinicalClues": [
          "Symptoms may be triggered by:",
          "Strong odours",
          "Smoke",
          "Temperature changes",
          "Environmental irritants",
          "Certain medications"
        ],
        "typicalAppearance": "Predominantly nasal symptoms without a consistent allergen-related pattern.",
        "diagnosticApproach": [
          "Explore environmental and medication triggers."
        ],
        "managementApproach": [
          "Treatment should follow the underlying rhinitis phenotype."
        ],
        "clinicalPearl": "Not every patient with chronic rhinitis has an allergic mechanism."
      },
      {
        "id": "diff-3",
        "condition": "CHRONIC RHINOSINUSITIS",
        "clinicalClues": [
          "Consider when symptoms include:",
          "Persistent nasal obstruction",
          "Facial pressure",
          "Reduced smell",
          "Chronic nasal discharge"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Clinical examination and appropriate ENT assessment may be required."
        ],
        "managementApproach": [
          "Persistent symptoms may require disease-specific treatment."
        ],
        "clinicalPearl": "Persistent obstruction with altered smell or facial symptoms deserves further evaluation."
      },
      {
        "id": "diff-4",
        "condition": "NASAL POLYPOSIS",
        "clinicalClues": [
          "Persistent nasal obstruction",
          "Reduced smell",
          "Chronic nasal symptoms",
          "Recurrent sinus symptoms"
        ],
        "typicalAppearance": "Pale, oedematous polypoid lesions may be visible on examination.",
        "diagnosticApproach": [],
        "managementApproach": [
          "Consider appropriate ENT evaluation and disease-directed treatment."
        ],
        "clinicalPearl": "Persistent obstruction associated with loss of smell should prompt consideration of structural or inflammatory nasal disease."
      },
      {
        "id": "diff-5",
        "condition": "DRUG-RELATED RHINITIS",
        "clinicalClues": [
          "Consider:",
          "Repeated topical nasal decongestant use",
          "Medication-related symptoms",
          "Temporal relationship with a medicine"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Take a complete medication history."
        ],
        "managementApproach": [
          "Address the responsible medication or exposure where appropriate."
        ],
        "clinicalPearl": "A medication history is an essential part of chronic rhinitis assessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "COMBINATION REGIMEN",
        "keyPoints": [
          "HIVOZIN-M contains:",
          "Levocetirizine 5 mg + Montelukast 10 mg",
          "The combination should be used according to the physician's prescription and approved product information."
        ],
        "details": [],
        "practicalExample": "One tablet once daily, when prescribed. An appropriately selected adult patient with allergic rhinitis may be prescribed: Levocetirizine 5 mg + Montelukast 10 mg once daily. Management Implications Treatment should be periodically reassessed according to symptom control and clinical need.",
        "clinicalPearl": "Use the fixed-dose combination when both pharmacological components have a clear clinical rationale."
      },
      {
        "title": "ADMINISTRATION",
        "keyPoints": [
          "HIVOZIN-M is administered orally.",
          "Levocetirizine may generally be administered with or without food."
        ],
        "details": [],
        "practicalExample": "Take the prescribed tablet with water. The patient may take the tablet at a consistent time each day. Management Implications A simple once-daily schedule can support adherence.",
        "clinicalPearl": "Consistency of administration can improve treatment adherence."
      },
      {
        "title": "PROMINENT NASAL CONGESTION",
        "keyPoints": [
          "Oral antihistamines are particularly effective for histamine-mediated symptoms such as:",
          "Sneezing",
          "Itching",
          "Rhinorrhoea",
          "Nasal congestion may require a broader treatment strategy."
        ],
        "details": [],
        "practicalExample": "A patient whose sneezing and itching improve but who continues to have significant nasal obstruction should be reassessed. Management Implications Consider: Disease severity Intranasal treatment options Structural nasal disease Sinus disease Adherence",
        "clinicalPearl": "Persistent congestion should prompt treatment reassessment rather than automatic escalation of oral therapy."
      },
      {
        "title": "SEASONAL SYMPTOMS",
        "keyPoints": [
          "Symptoms may correlate with seasonal allergen exposure."
        ],
        "details": [],
        "practicalExample": "A patient develops recurrent sneezing, rhinorrhoea and ocular symptoms during a predictable pollen season. Management Implications Consider: Timing of therapy Trigger avoidance Environmental measures Ongoing reassessment",
        "clinicalPearl": "Understanding the patient's seasonal pattern can help guide treatment planning."
      },
      {
        "title": "TREATMENT DURATION",
        "keyPoints": [
          "Duration depends on:",
          "Seasonal versus perennial disease",
          "Symptom severity",
          "Frequency",
          "Allergen exposure",
          "Response to treatment"
        ],
        "details": [],
        "practicalExample": "A patient with seasonal symptoms may require treatment during the relevant exposure period, while persistent disease may require ongoing clinical review. Management Implications Reassess the continued need for combination therapy.",
        "clinicalPearl": "Treatment duration should be individualised according to disease pattern and response."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Incorrect administration",
          "Persistent allergen exposure",
          "Structural nasal disease",
          "Chronic rhinosinusitis",
          "Inadequate treatment strategy"
        ],
        "details": [],
        "practicalExample": "If symptoms remain uncontrolled despite appropriate use, reconsider the diagnosis and phenotype before simply adding additional medication. Management Implications Review the complete treatment strategy.",
        "clinicalPearl": "Treatment failure is a reason to reassess the diagnosis, adherence and treatment plan—not automatically to increase medication."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT ALLERGIC RHINITIS",
        "keyPoints": [
          "Assess:",
          "Seasonal pattern",
          "Perennial exposure",
          "Adherence",
          "Treatment response",
          "Environmental triggers",
          "Typical Clinical Presentation",
          "Repeated episodes of:",
          "Sneezing",
          "Rhinorrhoea",
          "Nasal itching",
          "Congestion",
          "Ocular symptoms"
        ],
        "details": [],
        "practicalExample": "Combine appropriate pharmacological management with environmental control.",
        "clinicalPearl": "Recurrent symptoms should prompt assessment of recurring exposure rather than repeated symptomatic treatment alone."
      },
      {
        "title": "PROMINENT NASAL OBSTRUCTION",
        "keyPoints": [
          "Persistent congestion may reflect:",
          "Severe allergic inflammation",
          "Structural disease",
          "Chronic rhinosinusitis",
          "Nasal polyposis",
          "Typical Clinical Presentation",
          "Persistent blocked nose",
          "Mouth breathing",
          "Sleep disturbance",
          "Reduced smell"
        ],
        "details": [],
        "practicalExample": "Reassess nasal pathology and consider appropriate local or specialist evaluation.",
        "clinicalPearl": "Persistent obstruction should not automatically be attributed to uncontrolled allergy."
      },
      {
        "title": "RECURRENT SYMPTOMS DESPITE TREATMENT",
        "keyPoints": [
          "Review:",
          "Adherence",
          "Administration",
          "Allergen exposure",
          "Diagnosis",
          "Comorbid disease",
          "Treatment intensity"
        ],
        "details": [],
        "practicalExample": "Reassess before escalating therapy.",
        "clinicalPearl": "A structured treatment-failure review often identifies a correctable factor before another medicine is added."
      }
    ]
  },
  {
    "id": "i-tacnoid-20",
    "slug": "i-tacnoid-20",
    "brandName": "I-TACNOID 20",
    "genericName": "Isotretinoin 20 mg Softgel Capsule",
    "tagline": "Systemic Retinoid Therapy for Selected Severe Acne",
    "therapeuticArea": "Acne",
    "route": "Oral / Systematic",
    "routeSubcategory": "Acne",
    "dosageForm": "Softgel",
    "strength": "20 mg",
    "packSize": "10 × 1 × 10 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected severe or treatment-resistant acne",
    "composition": [
      "Each Softgel Capsule Contains",
      "Isotretinoin — 20 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "RETINOID • Oral • Severe Inflammatory Acne • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "SEBACEOUS GLAND ACTIVITY",
        "description": "Reduced sebum availability changes the follicular environment associated with acne."
      },
      {
        "step": "02",
        "title": "FOLLICULAR KERATINISATION",
        "description": "Reduce the tendency toward follicular plugging and comedone formation."
      },
      {
        "step": "03",
        "title": "ANTIMICROBIAL ENVIRONMENT",
        "description": "Reduction of acne-associated microbial activity."
      },
      {
        "step": "04",
        "title": "INFLAMMATORY ACTIVITY",
        "description": "By influencing the pilosebaceous unit and associated inflammatory pathways, isotretinoin can substantially reduce inflammatory acne activity."
      }
    ],
    "indications": [
      "NODULOCYSTIC ACNE",
      "ACNE CONGLOBATA",
      "ACNE AT RISK OF PERMANENT SCARRING",
      "ACNE RESISTANT TO STANDARD THERAPY"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Isotretinoin 20 mg Softgel Capsule or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "PREGNANCY",
        "detail": "Contraindicated during pregnancy. Isotretinoin can cause serious fetal harm. Appropriate pregnancy-prevention and testing requirements must be followed for patients who can become pregnant."
      },
      {
        "title": "BREASTFEEDING",
        "detail": "Isotretinoin should not be used during breastfeeding unless specifically addressed by current approved prescribing information and specialist clinical guidance."
      },
      {
        "title": "PSYCHIATRIC SYMPTOMS",
        "detail": "Assess mental health before and during treatment. Concerning symptoms require prompt clinical assessment."
      },
      {
        "title": "INTRACRANIAL HYPERTENSION",
        "detail": "Avoid concomitant tetracycline therapy. Promptly investigate concerning neurological or visual symptoms."
      },
      {
        "title": "LIPID ABNORMALITIES",
        "detail": "Monitor lipid parameters according to patient risk, product information and clinical judgement."
      },
      {
        "title": "HEPATIC EFFECTS",
        "detail": "Monitor liver-related laboratory parameters where clinically indicated."
      },
      {
        "title": "SERIOUS SKIN REACTIONS",
        "detail": "Serious cutaneous reactions have been reported with isotretinoin. Patients developing severe or unusual skin reactions require prompt medical assessment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE ONLY AS PRESCRIBED",
        "answer": "\"Take I-TACNOID 20 exactly as prescribed by your dermatologist. Do not change the dose or frequency yourself.\""
      },
      {
        "question": "PREGNANCY SAFETY",
        "answer": "\"Isotretinoin can seriously harm an unborn baby. If you can become pregnant, follow all pregnancy-prevention and testing requirements given by your healthcare professional.\""
      },
      {
        "question": "DO NOT SHARE THE MEDICINE",
        "answer": "\"Never share isotretinoin capsules with another person, even if they have similar acne.\""
      },
      {
        "question": "AVOID VITAMIN A SUPPLEMENTS",
        "answer": "\"Tell your doctor about all vitamins and supplements you take. Do not take vitamin A supplements unless specifically advised.\""
      },
      {
        "question": "AVOID TETRACYCLINES",
        "answer": "\"Tell your doctor about all medicines you are taking, particularly antibiotics such as tetracyclines.\""
      },
      {
        "question": "EXPECT DRYNESS",
        "answer": "\"Dry lips and dry skin are common during treatment. Use suitable lip care and moisturization as advised by your healthcare professional.\""
      },
      {
        "question": "SUN PROTECTION",
        "answer": "\"Limit excessive sun exposure and use appropriate sun protection during treatment.\""
      },
      {
        "question": "REPORT IMPORTANT SYMPTOMS",
        "answer": "Contact the treating healthcare professional promptly if there is: Severe headache Visual disturbance Significant mood change Severe abdominal symptoms Yellowing of skin or eyes Severe skin reaction Other unusual or concerning symptoms"
      },
      {
        "question": "KEEP FOLLOW-UP APPOINTMENTS",
        "answer": "\"Attend scheduled follow-up visits and laboratory tests. Monitoring is an important part of safe isotretinoin treatment.\""
      }
    ],
    "clinicalPearl": "I-TACNOID 20 provides isotretinoin 20 mg for appropriately selected patients requiring systemic retinoid therapy for severe or treatment-resistant acne. Because isotretinoin has significant safety considerations—including teratogenicity, laboratory abnormalities, psychiatric monitoring and important drug interactions—its use should be accompanied by structured patient selection, counselling and follow-up.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-AD",
        "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
        "slug": "clixodin-ad"
      },
      {
        "name": "CLIXODIN-BPO",
        "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
        "slug": "clixodin-bpo"
      },
      {
        "name": "CLIXODIN-NT",
        "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
        "slug": "clixodin-nt"
      }
    ],
    "references": [
      "Current approved I-TACNOID 20 product information and package insert — primary source for product-specific indications, dosage, contraindications, warnings, precautions and adverse effects.",
      "American Academy of Dermatology. Acne Clinical Guideline, updated 2024.",
      "NICE. Acne vulgaris: management (NG198) — updated April 2026.",
      "American Academy of Dermatology. Isotretinoin: Patient Safety.",
      "Current approved isotretinoin prescribing information and safety information."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ROSACEA",
        "clinicalClues": [
          "Persistent centrofacial erythema",
          "Flushing",
          "Telangiectasia",
          "Papules and pustules",
          "Trigger-related exacerbations"
        ],
        "typicalAppearance": "Centrofacial inflammatory lesions with background erythema, generally without typical comedones.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Flushing",
          "Triggers",
          "Presence or absence of comedones"
        ],
        "managementApproach": [
          "Use rosacea-directed management where appropriate."
        ],
        "clinicalPearl": "Not every inflammatory facial eruption is acne; diagnosis should be confirmed before considering systemic isotretinoin."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Monomorphic follicular papules",
          "Follicular pustules",
          "Pruritus",
          "Truncal distribution"
        ],
        "typicalAppearance": "Uniform papules or pustules centred around hair follicles.",
        "diagnosticApproach": [
          "Consider bacterial and Malassezia folliculitis."
        ],
        "managementApproach": [
          "Treatment should address the underlying cause."
        ],
        "clinicalPearl": "Prominent itch and monomorphic follicular lesions without comedones should prompt reconsideration of the diagnosis."
      },
      {
        "id": "diff-3",
        "condition": "DRUG-INDUCED ACNEIFORM ERUPTION",
        "clinicalClues": [
          "Sudden onset",
          "Monomorphic lesions",
          "Temporal association with a medication",
          "Limited comedonal component"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Corticosteroids",
          "Androgens/anabolic steroids",
          "Certain other medications"
        ],
        "managementApproach": [
          "Identify and address the potential causative medication where clinically appropriate."
        ],
        "clinicalPearl": "A sudden monomorphic eruption should trigger a medication review before escalation to isotretinoin."
      },
      {
        "id": "diff-4",
        "condition": "PERIORIFICIAL DERMATITIS",
        "clinicalClues": [
          "Perioral papules",
          "Perinasal or periocular involvement",
          "Relative vermilion sparing",
          "Possible corticosteroid exposure"
        ],
        "typicalAppearance": "Small inflammatory papules around facial orifices.",
        "diagnosticApproach": [
          "Review distribution and topical medication history."
        ],
        "managementApproach": [
          "Use condition-specific management."
        ],
        "clinicalPearl": "Distribution can provide an important diagnostic clue when differentiating acne from periorificial dermatitis."
      },
      {
        "id": "diff-5",
        "condition": "ACNE FULMINANS",
        "clinicalClues": [
          "Sudden severe inflammatory eruption",
          "Painful nodules",
          "Ulceration",
          "Crusting",
          "Systemic symptoms may occur"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Urgent specialist assessment is required.",
          "NICE recommends same-day referral to an on-call hospital dermatology team for acne fulminans."
        ],
        "managementApproach": [
          "Do not treat suspected acne fulminans as routine acne."
        ],
        "clinicalPearl": "Systemic symptoms accompanying a sudden severe inflammatory acne eruption should prompt urgent specialist assessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "PATIENT SELECTION",
        "keyPoints": [
          "Consider:",
          "Acne severity",
          "Nodulocystic disease",
          "Scarring risk",
          "Previous treatment response",
          "Treatment adherence",
          "Medical history",
          "Pregnancy potential",
          "Mental health history",
          "Concomitant medications"
        ],
        "details": [],
        "practicalExample": "A patient with persistent nodulocystic acne and progressive scarring despite appropriate standard therapy may be assessed for systemic isotretinoin. Management Implications Treatment should be initiated only after an appropriate risk-benefit assessment.",
        "clinicalPearl": "The decision to prescribe isotretinoin is a clinical decision—not simply a severity-score decision."
      },
      {
        "title": "DOSE SELECTION",
        "keyPoints": [
          "Isotretinoin dosing is individualized according to:",
          "Body weight",
          "Disease severity",
          "Treatment response",
          "Adverse effects",
          "Clinical risk factors",
          "NICE provides a standard daily dosing range of 0.5-1 mg/kg/day, with consideration of lower dosing in patients at increased risk of adverse effects."
        ],
        "details": [],
        "practicalExample": "The appropriate dose should be calculated and prescribed by the treating clinician. A clinician may begin with a lower dose in a patient where tolerability is a particular concern and adjust according to response and adverse effects. Management Implications Dose should not be self-adjusted by the patient.",
        "clinicalPearl": "Individual tolerability and clinical response are important when determining the appropriate isotretinoin regimen."
      },
      {
        "title": "CUMULATIVE EXPOSURE",
        "keyPoints": [
          "Treatment planning may consider cumulative exposure as well as daily dose and clinical response.",
          "NICE describes a cumulative target of 120-150 mg/kg, while also noting that treatment may sometimes be stopped earlier when there has been an adequate response and no new lesions for 4-8 weeks."
        ],
        "details": [],
        "practicalExample": "A dermatologist may modify treatment duration according to response, adverse effects and the patient's overall clinical course. Management Implications The treatment plan should be individualized rather than treating a cumulative number as an isolated target.",
        "clinicalPearl": "Cumulative exposure is one treatment-planning parameter; clinical response and tolerability remain important."
      },
      {
        "title": "LABORATORY MONITORING",
        "keyPoints": [
          "Systemic isotretinoin can affect laboratory parameters including:",
          "Serum triglycerides",
          "Lipid profile",
          "Liver enzymes"
        ],
        "details": [],
        "practicalExample": "Baseline investigations and subsequent monitoring may be arranged according to the patient's risk profile, product information and local clinical practice. Management Implications Abnormal results may require dose adjustment, treatment interruption or further evaluation.",
        "clinicalPearl": "Laboratory monitoring should be individualized rather than treated as a one-size-fits-all schedule."
      },
      {
        "title": "PREGNANCY PREVENTION",
        "keyPoints": [
          "Isotretinoin is contraindicated during pregnancy because of the serious risk of fetal harm.",
          "Patients who can become pregnant require a structured pregnancy-prevention approach according to applicable regulatory requirements."
        ],
        "details": [],
        "practicalExample": "This is a treatment-safety requirement rather than an application instruction. Before initiating therapy, the clinician should document pregnancy status and follow the applicable pregnancy-prevention and testing requirements. Management Implications Treatment must not be initiated or continued outside the required safety framework.",
        "clinicalPearl": "Pregnancy prevention is a core component of isotretinoin prescribing—not an optional counselling point."
      },
      {
        "title": "MENTAL HEALTH ASSESSMENT",
        "keyPoints": [
          "Patients should be assessed for relevant mental-health history and monitored for clinically important changes during treatment.",
          "AAD notes that reports of depression and other psychiatric symptoms have been associated with isotretinoin use, while also noting that severe acne itself can be associated with mental-health difficulties."
        ],
        "details": [],
        "practicalExample": "Ask about previous mental-health conditions, current symptoms and clinically significant changes during follow-up. Management Implications New or concerning psychiatric symptoms require prompt clinical assessment.",
        "clinicalPearl": "Mental-health monitoring should be proactive, documented and individualized."
      },
      {
        "title": "TETRACYCLINE INTERACTION",
        "keyPoints": [
          "Concomitant use of isotretinoin with tetracycline antibiotics should be avoided because of the risk of intracranial hypertension."
        ],
        "details": [],
        "practicalExample": "Review the complete medication list before initiating isotretinoin. Management Implications Do not combine isotretinoin with tetracyclines unless specifically directed by an appropriately qualified clinician based on current prescribing information.",
        "clinicalPearl": "Medication reconciliation is essential before starting isotretinoin."
      },
      {
        "title": "VITAMIN A & SUPPLEMENTS",
        "keyPoints": [
          "Patients should disclose:",
          "Vitamin supplements",
          "Multivitamins",
          "Herbal products",
          "Other retinoid-containing medicines"
        ],
        "details": [],
        "practicalExample": "Ask specifically about over-the-counter vitamin A supplements. Management Implications Avoid unnecessary vitamin A supplementation during isotretinoin therapy.",
        "clinicalPearl": "\"Over-the-counter\" does not mean clinically irrelevant—supplements should be included in medication reconciliation."
      },
      {
        "title": "SKIN & LIP CARE",
        "keyPoints": [
          "Common mucocutaneous effects include:",
          "Dry lips",
          "Dry skin",
          "Nasal dryness",
          "Increased skin sensitivity",
          "Irritation"
        ],
        "details": [],
        "practicalExample": "Patients may require appropriate moisturizers, lip care and gentle cleansing. Management Implications Proactive skin-barrier support can improve treatment tolerability.",
        "clinicalPearl": "Anticipatory counselling about dryness can prevent avoidable discomfort and improve adherence."
      },
      {
        "title": "SUN & PHOTOPROTECTION",
        "keyPoints": [
          "Patients should be counselled regarding sun exposure and appropriate photoprotection."
        ],
        "details": [],
        "practicalExample": "Use appropriate broad-spectrum sunscreen and protective measures during significant sun exposure. Management Implications Particularly important where irritation or pigmentary changes are concerns.",
        "clinicalPearl": "Photoprotection should form part of the overall isotretinoin skin-care plan."
      },
      {
        "title": "FOLLOW-UP & TREATMENT RESPONSE",
        "keyPoints": [
          "Follow-up should assess:",
          "New acne lesions",
          "Inflammatory activity",
          "Scarring",
          "Adverse effects",
          "Laboratory parameters where indicated",
          "Mental health",
          "Pregnancy status where applicable",
          "Adherence"
        ],
        "details": [],
        "practicalExample": "At each review, compare disease activity with the previous visit and document clinically relevant adverse effects. Management Implications Dose and treatment duration may need adjustment based on the clinical course.",
        "clinicalPearl": "Successful isotretinoin therapy requires active follow-up rather than prescription alone."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "SIGNIFICANT SCARRING RISK",
        "keyPoints": [
          "Assess:",
          "Deep nodules",
          "Cysts",
          "Long disease duration",
          "Existing scars",
          "Recurrent inflammatory flares",
          "Typical Clinical Appearance",
          "Atrophic, hypertrophic or keloidal scars may develop following severe inflammatory acne."
        ],
        "details": [],
        "practicalExample": "Consider early specialist management and appropriate escalation.",
        "clinicalPearl": "Preventing additional scarring is an important therapeutic objective in severe acne."
      },
      {
        "title": "ACNE WITH PSYCHOLOGICAL DISTRESS",
        "keyPoints": [
          "Assess for:",
          "Significant distress",
          "Social withdrawal",
          "Anxiety or depressive symptoms",
          "Body-image concerns",
          "Functional impairment",
          "NICE recommends considering psychological wellbeing when isotretinoin is being considered."
        ],
        "details": [],
        "practicalExample": "Address both acne severity and psychological wellbeing.",
        "clinicalPearl": "The clinical burden of acne extends beyond lesion count; psychosocial impact should be part of the assessment."
      },
      {
        "title": "ABNORMAL LIPID PROFILE",
        "keyPoints": [
          "Review:",
          "Triglycerides",
          "Cholesterol profile",
          "Relevant metabolic risk factors",
          "Alcohol intake where clinically relevant"
        ],
        "details": [],
        "practicalExample": "Interpret results in the context of the patient's overall risk profile and current prescribing information.",
        "clinicalPearl": "Baseline risk assessment helps inform appropriate monitoring during systemic retinoid therapy."
      },
      {
        "title": "ELEVATED LIVER ENZYMES",
        "keyPoints": [
          "Review:",
          "Baseline hepatic history",
          "Current medications",
          "Alcohol intake",
          "Laboratory trend"
        ],
        "details": [],
        "practicalExample": "Interpret abnormalities clinically and consider treatment modification where appropriate.",
        "clinicalPearl": "Trend and clinical context are important when interpreting laboratory abnormalities during isotretinoin therapy."
      },
      {
        "title": "PREGNANCY POTENTIAL",
        "keyPoints": [
          "Isotretinoin carries a serious teratogenic risk."
        ],
        "details": [],
        "practicalExample": "Follow all applicable pregnancy-prevention, counselling and testing requirements before and during treatment.",
        "clinicalPearl": "No isotretinoin treatment plan is complete without a documented pregnancy-risk assessment where applicable."
      },
      {
        "title": "NEW PSYCHIATRIC SYMPTOMS",
        "keyPoints": [
          "Monitor for clinically significant:",
          "Mood changes",
          "Depression",
          "Anxiety",
          "Suicidal thoughts",
          "Behavioural changes"
        ],
        "details": [],
        "practicalExample": "Any concerning symptoms require prompt clinical evaluation. AAD recommends attention to warning signs of depression and other mental-health conditions during isotretinoin treatment.",
        "clinicalPearl": "A new or worsening psychiatric symptom should never be dismissed as a routine treatment effect."
      },
      {
        "title": "SEVERE HEADACHE OR VISUAL SYMPTOMS",
        "keyPoints": [
          "Concerning symptoms may include:",
          "Severe or persistent headache",
          "Visual disturbance",
          "Nausea/vomiting associated with headache"
        ],
        "details": [],
        "practicalExample": "Prompt medical assessment is required. Particular attention is warranted because isotretinoin is associated with a risk of intracranial hypertension, and concomitant tetracycline use should be avoided.",
        "clinicalPearl": "New severe headache with visual symptoms requires prompt assessment rather than routine reassurance."
      }
    ]
  },
  {
    "id": "itfin-100",
    "slug": "itfin-100",
    "brandName": "ITFIN-100",
    "genericName": "Itraconazole 100 mg Capsules",
    "tagline": "Systemic Triazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Capsule",
    "strength": "100 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected dermatophyte, yeast and other susceptible fungal infections",
    "composition": [
      "Each capsule contains:",
      "Itraconazole 100 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Systemic Triazole Antifungal • Dermatophytosis • Onychomycosis & Pityriasis versicolor • Prescription Medicine",
    "pharmacologicalClass": "Triazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "ITRACONAZOLEInhibits fungal CYP51 enzyme↓ERGOSTEROL SYNTHESIS ↓Fungal membrane formation is impaired↓MEMBRANE FUNCTION DISRUPTEDFungal growth & replication inhibited"
      }
    ],
    "indications": [
      "EXTENSIVE DERMATOPHYTOSIS",
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS",
      "ONYCHOMYCOSIS",
      "PITYRIASIS VERSICOLOR"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Itraconazole 100 mg Capsules or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "HEPATIC SAFETY",
        "detail": "Clinically significant liver injury has been reported with itraconazole. Management Implications Appropriate clinical and laboratory monitoring should be considered based on patient risk and treatment duration."
      },
      {
        "title": "CARDIAC SAFETY",
        "detail": "Itraconazole can have negative inotropic effects. Management Implications Patients with heart failure or relevant cardiac conditions require careful assessment."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Itraconazole has extensive interaction potential. Management Implications Check: Prescription medicines OTC medicines Supplements Herbal preparations where relevant"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Patients should seek medical attention for significant allergic reactions. Management Implications Significant suspected hypersensitivity requires appropriate clinical evaluation."
      },
      {
        "title": "SERIOUS OR UNEXPECTED SYMPTOMS",
        "detail": "Patients should report unusual or clinically significant symptoms during treatment. Management Implications Serious or persistent symptoms require appropriate medical assessment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE IT EXACTLY AS PRESCRIBED",
        "answer": "\"Take ITFIN-100 exactly as prescribed. Do not change the dose, frequency or duration without consulting your doctor.\""
      },
      {
        "question": "SWALLOW THE CAPSULE WHOLE",
        "answer": "\"Swallow the capsule whole and follow the administration instructions provided by your doctor or the approved product information.\""
      },
      {
        "question": "INFORM YOUR DOCTOR ABOUT ALL MEDICINES",
        "answer": "\"Tell your doctor about all medicines, supplements and other treatments you are currently taking.\""
      },
      {
        "question": "REPORT LIVER-RELATED SYMPTOMS",
        "answer": "\"Seek medical advice if you develop unusual tiredness, persistent nausea, loss of appetite, dark urine or yellowing of the skin or eyes.\""
      },
      {
        "question": "REPORT BREATHLESSNESS OR SWELLING",
        "answer": "\"Seek prompt medical attention if you develop unexplained breathlessness, swelling of the legs or other symptoms suggestive of worsening heart function.\""
      },
      {
        "question": "DO NOT SELF-MODIFY TREATMENT",
        "answer": "\"Do not stop, extend or modify your treatment on your own. Speak with your doctor if symptoms persist or return.\""
      },
      {
        "question": "ATTEND FOLLOW-UP",
        "answer": "\"Attend follow-up appointments when advised, particularly when treatment is prolonged or monitoring is required.\""
      }
    ],
    "clinicalPearl": "ITFIN-100 provides a 100 mg capsule strength of systemic itraconazole for appropriately selected fungal infections. The capsule strength should not be confused with a universal dosing schedule. Effective use depends on accurate diagnosis, appropriate regimen selection, consistent administration, interaction screening, assessment of hepatic and cardiac risk, adherence and clinical reassessment when treatment response is inadequate.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-200",
        "generic": "Itraconazole 200 mg Capsules",
        "slug": "itfin-200"
      }
    ],
    "references": [
      "Current approved ITFIN-100 product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for itraconazole capsules.",
      "Relevant dermatology guidelines and peer-reviewed literature concerning systemic treatment of dermatophyte infections.",
      "Relevant literature concerning itraconazole in onychomycosis and superficial fungal infections.",
      "Current prescribing information concerning itraconazole pharmacokinetics, drug interactions, hepatic safety and cardiac precautions.",
      "Relevant dermatology literature concerning recurrent dermatophytosis and tinea incognito."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Prominent pruritus",
          "Recurrent flares",
          "Atopic history",
          "Exposure-related distribution"
        ],
        "typicalAppearance": "Erythematous, scaly, eczematous or lichenified plaques.",
        "diagnosticApproach": [
          "Consider:",
          "Distribution",
          "Morphology",
          "Exposure history",
          "Chronicity"
        ],
        "managementApproach": [
          "Treat according to the underlying inflammatory diagnosis."
        ],
        "clinicalPearl": "Scale and pruritus are not specific for fungal infection; the overall morphology and distribution are essential."
      },
      {
        "id": "diff-2",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Sharply demarcated plaques",
          "Extensor distribution",
          "Thick scale",
          "Nail changes",
          "Other characteristic sites"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine the:",
          "Scalp",
          "Elbows",
          "Knees",
          "Nails",
          "Lumbosacral region"
        ],
        "managementApproach": [
          "Requires psoriasis-directed management."
        ],
        "clinicalPearl": "A chronic scaly plaque should not automatically be labelled as tinea without considering the broader differential."
      },
      {
        "id": "diff-3",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Recent topical exposure",
          "Occupational exposure",
          "Burning or itching",
          "Distribution corresponding to contact"
        ],
        "typicalAppearance": "Erythematous eczematous plaques, sometimes with vesiculation or scaling.",
        "diagnosticApproach": [
          "Take a detailed exposure history."
        ],
        "managementApproach": [
          "Identify and eliminate the suspected trigger and provide diagnosis-specific treatment."
        ],
        "clinicalPearl": "A careful history of recently introduced topical products can prevent unnecessary systemic antifungal therapy."
      },
      {
        "id": "diff-4",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Suspect when a fungal eruption has been treated with topical corticosteroids.",
          "Look for:",
          "Altered morphology",
          "Poorly defined borders",
          "Progressive spread",
          "Recurrence after corticosteroid withdrawal"
        ],
        "typicalAppearance": "Atypical or less clearly annular fungal lesions.",
        "diagnosticApproach": [
          "Consider KOH microscopy or fungal culture."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroids may suppress visible inflammation while allowing dermatophyte infection to persist or expand."
      },
      {
        "id": "diff-5",
        "condition": "BACTERIAL / OTHER INFECTIOUS CONDITIONS",
        "clinicalClues": [
          "Consider alternative infection when there is:",
          "Significant pain",
          "Purulence",
          "Rapid progression",
          "Marked crusting",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Erosions, pustules, crusting or pronounced inflammation may be present.",
        "diagnosticApproach": [
          "Perform appropriate clinical and microbiological evaluation."
        ],
        "managementApproach": [
          "Use diagnosis-specific antimicrobial treatment where indicated."
        ],
        "clinicalPearl": "Pain, purulence or systemic symptoms should broaden the diagnostic assessment beyond superficial dermatophytosis."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Systemic itraconazole may be considered in selected patients with:",
          "Extensive disease",
          "Multiple affected sites",
          "Refractory infection",
          "Recurrent disease",
          "Nail involvement",
          "Conditions where systemic treatment is specifically indicated"
        ],
        "details": [],
        "practicalExample": "ITFIN-100 is administered orally according to the specific prescribed regimen for the diagnosed condition. A patient with appropriately confirmed extensive dermatophytosis involving multiple body sites and inadequate response to appropriate topical therapy may be assessed for systemic antifungal therapy. Management Implications Before treatment, review: Diagnosis Disease extent Medication history Hepatic status Cardiac history Potential interactions",
        "clinicalPearl": "Systemic antifungal selection should integrate the infection characteristics with the patient's overall safety profile."
      },
      {
        "title": "DOSING & REGIMEN",
        "keyPoints": [
          "The appropriate itraconazole regimen varies according to:",
          "Infection",
          "Site",
          "Severity",
          "Organism",
          "Treatment strategy",
          "Patient factors"
        ],
        "details": [],
        "practicalExample": "Use ITFIN-100 according to the approved product information and dermatologist-prescribed regimen. The 100 mg capsule should not be interpreted as establishing one universal dosing schedule. Different fungal conditions may require different dosing schedules and treatment durations even when the same active ingredient is used. Management Implications Correct regimen selection is essential for both efficacy and safety.",
        "clinicalPearl": "Itraconazole capsule strength and itraconazole treatment regimen are two different concepts."
      },
      {
        "title": "HOW SHOULD ITFIN-100 BE TAKEN?",
        "keyPoints": [
          "Itraconazole capsule absorption can be influenced by gastrointestinal conditions and gastric acidity."
        ],
        "details": [],
        "practicalExample": "Swallow the capsule whole and administer it according to the approved product instructions regarding food and timing. Patients should take the capsule consistently according to the prescribed instructions rather than changing administration habits from day to day. Management Implications Inappropriate administration or certain concomitant acid-suppressive therapies can affect itraconazole exposure.",
        "clinicalPearl": "Consistent administration is important because itraconazole capsule absorption is influenced by gastric conditions."
      },
      {
        "title": "DRUG INTERACTION REVIEW",
        "keyPoints": [
          "Itraconazole is a potent inhibitor of CYP3A4 and can interact with numerous medicines.",
          "Potentially important interactions may involve:",
          "Certain cardiovascular medicines",
          "Some antiarrhythmics",
          "Selected sedatives",
          "Certain lipid-lowering agents",
          "Some gastrointestinal medicines",
          "Other CYP3A4 substrates"
        ],
        "details": [],
        "practicalExample": "Review the patient's complete medication profile before prescribing. For a patient receiving multiple chronic medicines, perform an interaction check before initiating itraconazole. Management Implications Some combinations may be contraindicated or require dose adjustment, substitution or additional monitoring.",
        "clinicalPearl": "For systemic itraconazole, medication reconciliation is an essential component of prescribing."
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole undergoes extensive hepatic metabolism and clinically significant hepatic adverse reactions have been reported."
        ],
        "details": [],
        "practicalExample": "Assess hepatic history and consider appropriate laboratory monitoring according to patient risk and treatment duration. A patient with known liver disease or previous drug-induced liver injury requires careful assessment before systemic itraconazole is considered. Management Implications Monitor clinically for symptoms suggestive of hepatic dysfunction.",
        "clinicalPearl": "Unexplained fatigue, persistent nausea, anorexia, dark urine or jaundice during treatment warrants prompt clinical assessment."
      },
      {
        "title": "CARDIAC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole may exert negative inotropic effects and can worsen heart failure in susceptible patients."
        ],
        "details": [],
        "practicalExample": "Review: History of heart failure Cardiac function Cardiovascular medications before treatment. A patient with previous congestive heart failure requires careful risk assessment before itraconazole is prescribed. Management Implications Follow current contraindications and warnings in the approved product information.",
        "clinicalPearl": "Cardiac history is an important part of the pre-prescription assessment for itraconazole."
      },
      {
        "title": "TREATMENT DURATION & ADHERENCE",
        "keyPoints": [
          "Treatment duration depends on:",
          "Infection",
          "Site",
          "Severity",
          "Treatment response",
          "Prescribed regimen"
        ],
        "details": [],
        "practicalExample": "Complete the regimen exactly as prescribed. Do not independently stop, extend or modify treatment. A patient who notices early improvement should continue according to the prescribed schedule rather than discontinuing therapy prematurely. Management Implications Poor adherence can contribute to inadequate treatment response.",
        "clinicalPearl": "Clinical improvement may occur before complete resolution of the underlying fungal infection."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent disease may be related to:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Inadequate regimen",
          "Reinfection",
          "Drug interaction",
          "Absorption issues",
          "Resistant organism",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Do not automatically increase the dose or extend therapy without reassessment. A patient with persistent lesions despite apparently appropriate therapy should undergo diagnostic and treatment review. Management Implications Consider: Mycological confirmation Adherence assessment Medication interaction review Absorption considerations Alternative diagnosis Alternative treatment strategy",
        "clinicalPearl": "Treatment failure should trigger a structured reassessment rather than automatic prolongation of systemic therapy."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ONYCHOMYCOSIS",
        "keyPoints": [
          "Chronic nail dystrophy",
          "Thickening",
          "Discoloration",
          "Subungual debris",
          "Typical Clinical Appearance",
          "Thickened, discoloured or distorted nail plates.",
          "Common Causes & Risk Factors",
          "Dermatophyte infection",
          "Recurrent tinea pedis",
          "Diabetes",
          "Older age",
          "Repeated nail trauma"
        ],
        "details": [],
        "practicalExample": "Consider mycological confirmation before systemic treatment and select the regimen according to the diagnosed infection and approved prescribing information.",
        "clinicalPearl": "A dystrophic nail is not synonymous with onychomycosis; confirmation can prevent unnecessary systemic treatment."
      },
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Multiple episodes",
          "Recurrence at similar sites",
          "Partial response",
          "Relapse after apparent clearance",
          "Typical Clinical Appearance",
          "Recurrent annular or scaly lesions.",
          "Common Causes & Risk Factors",
          "Reinfection",
          "Tinea pedis",
          "Onychomycosis",
          "Household transmission",
          "Moisture and occlusion",
          "Incomplete treatment"
        ],
        "details": [],
        "practicalExample": "Look for reservoirs and contributing factors and confirm the diagnosis when appropriate.",
        "clinicalPearl": "Repeated recurrence should prompt investigation of the source rather than repeated empirical prescribing alone."
      },
      {
        "title": "EXTENSIVE / MULTISITE DISEASE",
        "keyPoints": [
          "Numerous lesions",
          "Multiple anatomical sites",
          "Progressive spread",
          "Difficulty managing with topical therapy",
          "Typical Clinical Appearance",
          "Multiple annular or confluent scaly plaques.",
          "Common Causes & Risk Factors",
          "Delayed treatment",
          "Reinfection",
          "Inadequate previous treatment",
          "Immunosuppression"
        ],
        "details": [],
        "practicalExample": "Assess the need for systemic treatment and investigate contributing factors.",
        "clinicalPearl": "Disease extent can be a key determinant in moving from topical to systemic antifungal therapy."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Extensive infection",
          "Atypical morphology",
          "Recurrence",
          "Poor response",
          "Typical Clinical Appearance",
          "May be more extensive, persistent or atypical than usual.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medicines",
          "Immunodeficiency",
          "Significant systemic illness"
        ],
        "details": [],
        "practicalExample": "Consider earlier diagnostic confirmation and closer clinical monitoring.",
        "clinicalPearl": "Persistent or atypical fungal disease in an immunocompromised patient deserves careful diagnostic evaluation."
      },
      {
        "title": "POLYPHARMACY",
        "keyPoints": [
          "Multiple concomitant medicines increase the potential for significant drug interactions.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Multiple chronic medications",
          "Cardiovascular therapy",
          "Lipid-lowering therapy",
          "Sedatives",
          "Acid-suppressing medicines"
        ],
        "details": [],
        "practicalExample": "Perform a comprehensive medication interaction review.",
        "clinicalPearl": "With itraconazole, the patient's medication list should be reviewed as carefully as the skin examination."
      },
      {
        "title": "HISTORY OF LIVER DISEASE",
        "keyPoints": [
          "Assess for:",
          "Previous hepatic disease",
          "Abnormal liver function",
          "Previous drug-induced liver injury",
          "Hepatotoxic co-medications",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Underlying hepatic impairment and concomitant hepatotoxic medicines."
        ],
        "details": [],
        "practicalExample": "Perform appropriate risk-benefit assessment and monitoring.",
        "clinicalPearl": "A hepatic history should be established before initiating systemic itraconazole."
      },
      {
        "title": "CARDIAC DISEASE",
        "keyPoints": [
          "Pay particular attention to:",
          "Heart failure",
          "Reduced cardiac function",
          "Significant cardiovascular disease",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Pre-existing cardiac disease and interacting cardiovascular medicines."
        ],
        "details": [],
        "practicalExample": "Review the current approved contraindications and warnings before prescribing.",
        "clinicalPearl": "A history of heart failure is particularly relevant when considering itraconazole."
      }
    ]
  },
  {
    "id": "itfin-200",
    "slug": "itfin-200",
    "brandName": "ITFIN-200",
    "genericName": "Itraconazole 200 mg Capsules",
    "tagline": "Systemic Triazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Capsule",
    "strength": "200 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected dermatophyte, yeast and other susceptible fungal infections",
    "composition": [
      "Each capsule contains:",
      "Itraconazole IP 200 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Systemic Triazole Antifungal • Dermatophytosis • Onychomycosis & Pityriasis versicolor • Prescription Medicine",
    "pharmacologicalClass": "Triazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "ITRACONAZOLEInhibits fungal CYP51 enzyme↓ERGOSTEROL SYNTHESIS ↓Fungal membrane formation is impaired↓MEMBRANE FUNCTION DISRUPTEDFungal growth & replication inhibited"
      }
    ],
    "indications": [
      "EXTENSIVE DERMATOPHYTOSIS",
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS",
      "ONYCHOMYCOSIS",
      "PITYRIASIS VERSICOLOR"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Itraconazole 200 mg Capsules or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "HEPATIC SAFETY",
        "detail": "Clinically significant liver injury has been reported with itraconazole. Management Implications Appropriate clinical and laboratory monitoring should be considered based on patient risk and treatment duration."
      },
      {
        "title": "CARDIAC SAFETY",
        "detail": "Itraconazole can have negative inotropic effects. Management Implications Patients with heart failure or relevant cardiac conditions require careful assessment."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Itraconazole has extensive interaction potential. Management Implications Check: Prescription medicines OTC medicines Supplements Herbal preparations where relevant"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Patients should seek medical attention for significant allergic reactions. Management Implications Significant suspected hypersensitivity requires appropriate clinical evaluation."
      },
      {
        "title": "SERIOUS OR UNEXPECTED SYMPTOMS",
        "detail": "Patients should report unusual or clinically significant symptoms during treatment. Management Implications Serious or persistent symptoms require appropriate medical assessment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE IT EXACTLY AS PRESCRIBED",
        "answer": "\"Take ITFIN-200 exactly as prescribed. Do not change the dose, frequency or duration without consulting your doctor.\""
      },
      {
        "question": "SWALLOW THE CAPSULE WHOLE",
        "answer": "\"Swallow the capsule whole and follow the administration instructions provided by your doctor or the approved product information.\""
      },
      {
        "question": "INFORM YOUR DOCTOR ABOUT ALL MEDICINES",
        "answer": "\"Tell your doctor about all medicines, supplements and other treatments you are currently taking.\""
      },
      {
        "question": "REPORT LIVER-RELATED SYMPTOMS",
        "answer": "\"Seek medical advice if you develop unusual tiredness, persistent nausea, loss of appetite, dark urine or yellowing of the skin or eyes.\""
      },
      {
        "question": "REPORT BREATHLESSNESS OR SWELLING",
        "answer": "\"Seek prompt medical attention if you develop unexplained breathlessness, swelling of the legs or other symptoms suggestive of worsening heart function.\""
      },
      {
        "question": "DO NOT SELF-MODIFY TREATMENT",
        "answer": "\"Do not stop, extend or modify your treatment on your own. Speak with your doctor if symptoms persist or return.\""
      },
      {
        "question": "ATTEND FOLLOW-UP",
        "answer": "\"Attend follow-up appointments when advised, particularly when treatment is prolonged or monitoring is required.\""
      }
    ],
    "clinicalPearl": "ITFIN-200 provides a 200 mg capsule strength of systemic itraconazole for appropriately selected fungal infections. The capsule strength should not be confused with a universal dosing schedule. Effective use depends on accurate diagnosis, appropriate regimen selection, consistent administration, interaction screening, assessment of hepatic and cardiac risk, adherence and clinical reassessment when treatment response is inadequate.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved ITFIN-200 product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for itraconazole capsules.",
      "Relevant dermatology guidelines and peer-reviewed literature concerning systemic treatment of dermatophyte infections.",
      "Relevant literature concerning itraconazole in onychomycosis and superficial fungal infections.",
      "Current prescribing information concerning itraconazole pharmacokinetics, drug interactions, hepatic safety and cardiac precautions.",
      "Relevant dermatology literature concerning recurrent dermatophytosis and tinea incognito."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Prominent pruritus",
          "Recurrent flares",
          "Atopic history",
          "Exposure-related distribution"
        ],
        "typicalAppearance": "Erythematous, scaly, eczematous or lichenified plaques.",
        "diagnosticApproach": [
          "Consider:",
          "Distribution",
          "Morphology",
          "Exposure history",
          "Chronicity"
        ],
        "managementApproach": [
          "Treat according to the underlying inflammatory diagnosis."
        ],
        "clinicalPearl": "Scale and pruritus are not specific for fungal infection; the overall morphology and distribution are essential."
      },
      {
        "id": "diff-2",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Sharply demarcated plaques",
          "Extensor distribution",
          "Thick scale",
          "Nail changes",
          "Other characteristic sites"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine the:",
          "Scalp",
          "Elbows",
          "Knees",
          "Nails",
          "Lumbosacral region"
        ],
        "managementApproach": [
          "Requires psoriasis-directed management."
        ],
        "clinicalPearl": "A chronic scaly plaque should not automatically be labelled as tinea without considering the broader differential."
      },
      {
        "id": "diff-3",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Recent topical exposure",
          "Occupational exposure",
          "Burning or itching",
          "Distribution corresponding to contact"
        ],
        "typicalAppearance": "Erythematous eczematous plaques, sometimes with vesiculation or scaling.",
        "diagnosticApproach": [
          "Take a detailed exposure history."
        ],
        "managementApproach": [
          "Identify and eliminate the suspected trigger and provide diagnosis-specific treatment."
        ],
        "clinicalPearl": "A careful history of recently introduced topical products can prevent unnecessary systemic antifungal therapy."
      },
      {
        "id": "diff-4",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Suspect when a fungal eruption has been treated with topical corticosteroids.",
          "Look for:",
          "Altered morphology",
          "Poorly defined borders",
          "Progressive spread",
          "Recurrence after corticosteroid withdrawal"
        ],
        "typicalAppearance": "Atypical or less clearly annular fungal lesions.",
        "diagnosticApproach": [
          "Consider KOH microscopy or fungal culture."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroids may suppress visible inflammation while allowing dermatophyte infection to persist or expand."
      },
      {
        "id": "diff-5",
        "condition": "BACTERIAL / OTHER INFECTIOUS CONDITIONS",
        "clinicalClues": [
          "Consider alternative infection when there is:",
          "Significant pain",
          "Purulence",
          "Rapid progression",
          "Marked crusting",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Erosions, pustules, crusting or pronounced inflammation may be present.",
        "diagnosticApproach": [
          "Perform appropriate clinical and microbiological evaluation."
        ],
        "managementApproach": [
          "Use diagnosis-specific antimicrobial treatment where indicated."
        ],
        "clinicalPearl": "Pain, purulence or systemic symptoms should broaden the diagnostic assessment beyond superficial dermatophytosis."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Systemic itraconazole may be considered in selected patients with:",
          "Extensive disease",
          "Multiple affected sites",
          "Refractory infection",
          "Recurrent disease",
          "Nail involvement",
          "Conditions where systemic treatment is specifically indicated"
        ],
        "details": [],
        "practicalExample": "ITFIN-200 is administered orally according to the specific prescribed regimen for the diagnosed condition. A patient with appropriately confirmed extensive dermatophytosis involving multiple body sites and inadequate response to appropriate topical therapy may be assessed for systemic antifungal therapy. Management Implications Before treatment, review: Diagnosis Disease extent Medication history Hepatic status Cardiac history Potential interactions",
        "clinicalPearl": "Systemic antifungal selection should integrate the infection characteristics with the patient's overall safety profile."
      },
      {
        "title": "DOSING & REGIMEN",
        "keyPoints": [
          "The appropriate itraconazole regimen varies according to:",
          "Infection",
          "Site",
          "Severity",
          "Organism",
          "Treatment strategy",
          "Patient factors"
        ],
        "details": [],
        "practicalExample": "Use ITFIN-200 according to the approved product information and dermatologist-prescribed regimen. The 100 mg capsule should not be interpreted as establishing one universal dosing schedule. Different fungal conditions may require different dosing schedules and treatment durations even when the same active ingredient is used. Management Implications Correct regimen selection is essential for both efficacy and safety.",
        "clinicalPearl": "Itraconazole capsule strength and itraconazole treatment regimen are two different concepts."
      },
      {
        "title": "HOW SHOULD ITFIN-200 BE TAKEN?",
        "keyPoints": [
          "Itraconazole capsule absorption can be influenced by gastrointestinal conditions and gastric acidity."
        ],
        "details": [],
        "practicalExample": "Swallow the capsule whole and administer it according to the approved product instructions regarding food and timing. Patients should take the capsule consistently according to the prescribed instructions rather than changing administration habits from day to day. Management Implications Inappropriate administration or certain concomitant acid-suppressive therapies can affect itraconazole exposure.",
        "clinicalPearl": "Consistent administration is important because itraconazole capsule absorption is influenced by gastric conditions."
      },
      {
        "title": "DRUG INTERACTION REVIEW",
        "keyPoints": [
          "Itraconazole is a potent inhibitor of CYP3A4 and can interact with numerous medicines.",
          "Potentially important interactions may involve:",
          "Certain cardiovascular medicines",
          "Some antiarrhythmics",
          "Selected sedatives",
          "Certain lipid-lowering agents",
          "Some gastrointestinal medicines",
          "Other CYP3A4 substrates"
        ],
        "details": [],
        "practicalExample": "Review the patient's complete medication profile before prescribing. For a patient receiving multiple chronic medicines, perform an interaction check before initiating itraconazole. Management Implications Some combinations may be contraindicated or require dose adjustment, substitution or additional monitoring.",
        "clinicalPearl": "For systemic itraconazole, medication reconciliation is an essential component of prescribing."
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole undergoes extensive hepatic metabolism and clinically significant hepatic adverse reactions have been reported."
        ],
        "details": [],
        "practicalExample": "Assess hepatic history and consider appropriate laboratory monitoring according to patient risk and treatment duration. A patient with known liver disease or previous drug-induced liver injury requires careful assessment before systemic itraconazole is considered. Management Implications Monitor clinically for symptoms suggestive of hepatic dysfunction.",
        "clinicalPearl": "Unexplained fatigue, persistent nausea, anorexia, dark urine or jaundice during treatment warrants prompt clinical assessment."
      },
      {
        "title": "CARDIAC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole may exert negative inotropic effects and can worsen heart failure in susceptible patients."
        ],
        "details": [],
        "practicalExample": "Review: History of heart failure Cardiac function Cardiovascular medications before treatment. A patient with previous congestive heart failure requires careful risk assessment before itraconazole is prescribed. Management Implications Follow current contraindications and warnings in the approved product information.",
        "clinicalPearl": "Cardiac history is an important part of the pre-prescription assessment for itraconazole."
      },
      {
        "title": "TREATMENT DURATION & ADHERENCE",
        "keyPoints": [
          "Treatment duration depends on:",
          "Infection",
          "Site",
          "Severity",
          "Treatment response",
          "Prescribed regimen"
        ],
        "details": [],
        "practicalExample": "Complete the regimen exactly as prescribed. Do not independently stop, extend or modify treatment. A patient who notices early improvement should continue according to the prescribed schedule rather than discontinuing therapy prematurely. Management Implications Poor adherence can contribute to inadequate treatment response.",
        "clinicalPearl": "Clinical improvement may occur before complete resolution of the underlying fungal infection."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent disease may be related to:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Inadequate regimen",
          "Reinfection",
          "Drug interaction",
          "Absorption issues",
          "Resistant organism",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Do not automatically increase the dose or extend therapy without reassessment. A patient with persistent lesions despite apparently appropriate therapy should undergo diagnostic and treatment review. Management Implications Consider: Mycological confirmation Adherence assessment Medication interaction review Absorption considerations Alternative diagnosis Alternative treatment strategy",
        "clinicalPearl": "Treatment failure should trigger a structured reassessment rather than automatic prolongation of systemic therapy."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ONYCHOMYCOSIS",
        "keyPoints": [
          "Chronic nail dystrophy",
          "Thickening",
          "Discoloration",
          "Subungual debris",
          "Typical Clinical Appearance",
          "Thickened, discoloured or distorted nail plates.",
          "Common Causes & Risk Factors",
          "Dermatophyte infection",
          "Recurrent tinea pedis",
          "Diabetes",
          "Older age",
          "Repeated nail trauma"
        ],
        "details": [],
        "practicalExample": "Consider mycological confirmation before systemic treatment and select the regimen according to the diagnosed infection and approved prescribing information.",
        "clinicalPearl": "A dystrophic nail is not synonymous with onychomycosis; confirmation can prevent unnecessary systemic treatment."
      },
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Multiple episodes",
          "Recurrence at similar sites",
          "Partial response",
          "Relapse after apparent clearance",
          "Typical Clinical Appearance",
          "Recurrent annular or scaly lesions.",
          "Common Causes & Risk Factors",
          "Reinfection",
          "Tinea pedis",
          "Onychomycosis",
          "Household transmission",
          "Moisture and occlusion",
          "Incomplete treatment"
        ],
        "details": [],
        "practicalExample": "Look for reservoirs and contributing factors and confirm the diagnosis when appropriate.",
        "clinicalPearl": "Repeated recurrence should prompt investigation of the source rather than repeated empirical prescribing alone."
      },
      {
        "title": "EXTENSIVE / MULTISITE DISEASE",
        "keyPoints": [
          "Numerous lesions",
          "Multiple anatomical sites",
          "Progressive spread",
          "Difficulty managing with topical therapy",
          "Typical Clinical Appearance",
          "Multiple annular or confluent scaly plaques.",
          "Common Causes & Risk Factors",
          "Delayed treatment",
          "Reinfection",
          "Inadequate previous treatment",
          "Immunosuppression"
        ],
        "details": [],
        "practicalExample": "Assess the need for systemic treatment and investigate contributing factors.",
        "clinicalPearl": "Disease extent can be a key determinant in moving from topical to systemic antifungal therapy."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Extensive infection",
          "Atypical morphology",
          "Recurrence",
          "Poor response",
          "Typical Clinical Appearance",
          "May be more extensive, persistent or atypical than usual.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medicines",
          "Immunodeficiency",
          "Significant systemic illness"
        ],
        "details": [],
        "practicalExample": "Consider earlier diagnostic confirmation and closer clinical monitoring.",
        "clinicalPearl": "Persistent or atypical fungal disease in an immunocompromised patient deserves careful diagnostic evaluation."
      },
      {
        "title": "POLYPHARMACY",
        "keyPoints": [
          "Multiple concomitant medicines increase the potential for significant drug interactions.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Multiple chronic medications",
          "Cardiovascular therapy",
          "Lipid-lowering therapy",
          "Sedatives",
          "Acid-suppressing medicines"
        ],
        "details": [],
        "practicalExample": "Perform a comprehensive medication interaction review.",
        "clinicalPearl": "With itraconazole, the patient's medication list should be reviewed as carefully as the skin examination."
      },
      {
        "title": "HISTORY OF LIVER DISEASE",
        "keyPoints": [
          "Assess for:",
          "Previous hepatic disease",
          "Abnormal liver function",
          "Previous drug-induced liver injury",
          "Hepatotoxic co-medications",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Underlying hepatic impairment and concomitant hepatotoxic medicines."
        ],
        "details": [],
        "practicalExample": "Perform appropriate risk-benefit assessment and monitoring.",
        "clinicalPearl": "A hepatic history should be established before initiating systemic itraconazole."
      },
      {
        "title": "CARDIAC DISEASE",
        "keyPoints": [
          "Pay particular attention to:",
          "Heart failure",
          "Reduced cardiac function",
          "Significant cardiovascular disease",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Pre-existing cardiac disease and interacting cardiovascular medicines."
        ],
        "details": [],
        "practicalExample": "Review the current approved contraindications and warnings before prescribing.",
        "clinicalPearl": "A history of heart failure is particularly relevant when considering itraconazole."
      }
    ]
  },
  {
    "id": "itfin-sb-130",
    "slug": "itfin-sb-130",
    "brandName": "ITFIN-SB 130",
    "genericName": "Itraconazole Supra Bioavailable 130 mg Capsules",
    "tagline": "Systemic Triazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Capsule",
    "strength": "130 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected dermatophyte, yeast and other susceptible fungal infections",
    "composition": [
      "Each capsule contains:",
      "Itraconazole IP 130 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Systemic Triazole Antifungal • Extensive Dermatophytosis • Onychomycosis & Pityriasis versicolor • Prescription Medicine",
    "pharmacologicalClass": "Triazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "ITRACONAZOLEInhibits fungal CYP51 enzyme↓ERGOSTEROL SYNTHESIS ↓Fungal membrane formation is impaired↓MEMBRANE FUNCTION DISRUPTEDFungal growth & replication inhibited"
      }
    ],
    "indications": [
      "EXTENSIVE DERMATOPHYTOSIS",
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS",
      "ONYCHOMYCOSIS",
      "PITYRIASIS VERSICOLOR"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Warnings and precautions",
      "Monitoring requirements",
      "Age restrictions",
      "ITFIN-SB 130 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment. Its 130 mg strength and supra-bioavailable formulation should not be presented as automatically interchangeable with conventional itraconazole capsule strengths without supporting formulation-specific evidence and approved prescribing information."
    ],
    "warningsPrecautions": [
      {
        "title": "HEPATIC SAFETY",
        "detail": "Clinically significant liver injury has been reported with itraconazole. Management Implications Consider appropriate clinical and laboratory monitoring according to treatment duration and patient risk."
      },
      {
        "title": "CARDIAC SAFETY",
        "detail": "Itraconazole can have negative inotropic effects. Management Implications Patients with heart failure or relevant cardiac disease require careful assessment."
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Itraconazole has extensive interaction potential. Management Implications Review: Prescription medicines OTC medicines Supplements Relevant herbal preparations"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Significant allergic reactions require prompt medical evaluation. Management Implications Discontinue and manage suspected significant hypersensitivity appropriately."
      },
      {
        "title": "SERIOUS OR UNEXPECTED SYMPTOMS",
        "detail": "Patients should report clinically significant or unusual symptoms during treatment. Management Implications Persistent or serious symptoms warrant appropriate medical evaluation."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE IT EXACTLY AS PRESCRIBED",
        "answer": "\"Take ITFIN-SB 130 exactly as prescribed. Do not change the dose or treatment duration without consulting your doctor.\""
      },
      {
        "question": "FOLLOW THE FORMULATION-SPECIFIC INSTRUCTIONS",
        "answer": "\"Follow the specific instructions given for ITFIN-SB 130. Do not assume that instructions for another itraconazole capsule are the same.\""
      },
      {
        "question": "INFORM YOUR DOCTOR ABOUT OTHER MEDICINES",
        "answer": "\"Tell your doctor about all prescription medicines, over-the-counter medicines and supplements you are taking.\""
      },
      {
        "question": "REPORT POSSIBLE LIVER PROBLEMS",
        "answer": "\"Seek medical advice if you develop unusual tiredness, persistent nausea, loss of appetite, dark urine or yellowing of the skin or eyes.\""
      },
      {
        "question": "REPORT BREATHLESSNESS OR SWELLING",
        "answer": "\"Seek prompt medical attention if you develop unexplained breathlessness, swelling of the legs or other symptoms suggestive of worsening heart function.\""
      },
      {
        "question": "DO NOT SELF-MODIFY TREATMENT",
        "answer": "\"Do not stop, extend or change your treatment without consulting your doctor.\""
      },
      {
        "question": "ATTEND FOLLOW-UP",
        "answer": "\"Attend follow-up appointments when advised, particularly when treatment is prolonged or monitoring is required.\""
      }
    ],
    "clinicalPearl": "ITFIN-SB 130 provides a supra-bioavailable formulation of systemic itraconazole 130 mg for appropriately selected fungal infections. Its clinical use should be guided by accurate diagnosis, formulation-specific prescribing instructions, appropriate regimen selection, drug-interaction screening, hepatic and cardiac risk assessment, adherence and clinical response. Because itraconazole formulations can differ in pharmacokinetic characteristics, ITFIN-SB 130 should not be assumed to be milligram-for-milligram interchangeable with conventional itraconazole capsules.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved ITFIN-SB 130 product information and package insert — primary source for composition, approved indications, formulation-specific dosage, administration instructions, contraindications, warnings and precautions.",
      "Manufacturer's current formulation-specific pharmacokinetic and bioavailability documentation for the supra-bioavailable itraconazole formulation.",
      "Current applicable Indian regulatory/product documentation for itraconazole preparations.",
      "Relevant dermatology guidelines and peer-reviewed literature concerning systemic treatment of dermatophyte infections.",
      "Relevant literature concerning itraconazole in onychomycosis and superficial fungal infections.",
      "Current prescribing information concerning itraconazole drug interactions, hepatic safety and cardiac precautions.",
      "Relevant dermatology literature concerning recurrent dermatophytosis and corticosteroid-modified fungal infection."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Prominent pruritus",
          "Recurrent flares",
          "Atopic history",
          "Exposure-related distribution"
        ],
        "typicalAppearance": "Erythematous, scaly or lichenified plaques.",
        "diagnosticApproach": [
          "Assess:",
          "Morphology",
          "Distribution",
          "Exposure history",
          "Chronicity"
        ],
        "managementApproach": [
          "Use diagnosis-specific anti-inflammatory management rather than systemic antifungal therapy."
        ],
        "clinicalPearl": "Pruritus and scaling alone do not establish a fungal diagnosis."
      },
      {
        "id": "diff-2",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Sharply demarcated plaques",
          "Thick scale",
          "Extensor distribution",
          "Nail involvement"
        ],
        "typicalAppearance": "Well-defined erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine:",
          "Scalp",
          "Elbows",
          "Knees",
          "Nails",
          "Lumbosacral region"
        ],
        "managementApproach": [
          "Requires psoriasis-directed treatment."
        ],
        "clinicalPearl": "Characteristic distribution and morphology can help distinguish psoriasis from dermatophytosis."
      },
      {
        "id": "diff-3",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "New topical exposure",
          "Occupational exposure",
          "Burning or itching",
          "Contact-pattern distribution"
        ],
        "typicalAppearance": "Eczematous erythema with scaling and sometimes vesiculation.",
        "diagnosticApproach": [
          "Review topical, occupational and environmental exposures."
        ],
        "managementApproach": [
          "Remove the suspected trigger and manage according to the diagnosis."
        ],
        "clinicalPearl": "A careful exposure history can prevent inappropriate systemic antifungal treatment."
      },
      {
        "id": "diff-4",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when a presumed fungal lesion has been treated with corticosteroids.",
          "Look for:",
          "Altered morphology",
          "Poorly defined borders",
          "Expansion",
          "Recurrence after steroid withdrawal"
        ],
        "typicalAppearance": "Atypical or less characteristic fungal lesions.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may be useful."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid combinations."
        ],
        "clinicalPearl": "Corticosteroid exposure can alter the appearance of dermatophyte infection and delay correct diagnosis."
      },
      {
        "id": "diff-5",
        "condition": "BACTERIAL / OTHER INFECTIOUS DERMATOSES",
        "clinicalClues": [
          "Consider alternative infection with:",
          "Significant pain",
          "Purulence",
          "Rapid progression",
          "Marked crusting",
          "Systemic symptoms"
        ],
        "typicalAppearance": "May include pustules, erosions, crusting or pronounced inflammation.",
        "diagnosticApproach": [
          "Use appropriate clinical and microbiological assessment."
        ],
        "managementApproach": [
          "Treatment should target the confirmed or most likely pathogen."
        ],
        "clinicalPearl": "Pain and purulence should prompt consideration of diagnoses beyond superficial fungal infection."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Systemic itraconazole may be considered in selected patients with:",
          "Extensive fungal disease",
          "Multiple affected sites",
          "Refractory infection",
          "Recurrent infection",
          "Nail involvement",
          "Other approved indications requiring systemic treatment"
        ],
        "details": [],
        "practicalExample": "ITFIN-SB 130 is administered orally according to the specific regimen and instructions approved for this formulation. A patient with confirmed extensive dermatophytosis involving several anatomical sites and inadequate response to appropriate topical therapy may be evaluated for systemic itraconazole treatment. Management Implications Before prescribing, consider: Diagnosis Extent Liver status Cardiac history Concomitant medicines Interaction potential",
        "clinicalPearl": "Systemic antifungal therapy should be selected after assessing both the infection and the patient's safety profile."
      },
      {
        "title": "FORMULATION-SPECIFIC DOSING",
        "keyPoints": [
          "ITFIN-SB 130 should be dosed according to the approved prescribing information specific to the supra-bioavailable formulation.",
          "The 130 mg strength should not automatically be converted to an equivalent dose of conventional itraconazole capsules."
        ],
        "details": [],
        "practicalExample": "Follow the prescribed ITFIN-SB 130 regimen exactly. If a patient has previously received a conventional itraconazole capsule, the previous milligram dose should not automatically be substituted with ITFIN-SB 130 without reviewing the formulation-specific prescribing information. Management Implications Different itraconazole formulations can have different pharmacokinetic characteristics.",
        "clinicalPearl": "Do not assume milligram-for-milligram interchangeability between ITFIN-SB 130 and conventional itraconazole formulations."
      },
      {
        "title": "HOW SHOULD ITFIN-SB 130 BE TAKEN?",
        "keyPoints": [
          "Administration instructions can differ between itraconazole formulations because formulation characteristics influence absorption."
        ],
        "details": [],
        "practicalExample": "Take ITFIN-SB 130 exactly according to the current approved product instructions and the dermatologist's prescription. A patient should not independently change the relationship between the capsule and meals based on instructions previously received for another itraconazole product. Management Implications Following formulation-specific instructions helps maintain the intended drug exposure.",
        "clinicalPearl": "For ITFIN-SB 130, always follow the administration instructions for this specific formulation."
      },
      {
        "title": "DRUG INTERACTIONS",
        "keyPoints": [
          "Itraconazole is a potent CYP3A4 inhibitor and has clinically important interactions with numerous medicines.",
          "Potential interaction categories include:",
          "Certain cardiovascular medicines",
          "Some antiarrhythmics",
          "Selected sedatives",
          "Certain lipid-lowering medicines",
          "Some gastrointestinal medicines",
          "Other CYP3A4 substrates"
        ],
        "details": [],
        "practicalExample": "Review the complete medication profile before prescribing. A patient taking multiple chronic medicines should undergo an interaction review before systemic itraconazole is initiated. Management Implications Some combinations may be contraindicated or require modification or additional monitoring.",
        "clinicalPearl": "Medication reconciliation is an essential component of systemic itraconazole prescribing."
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole undergoes extensive hepatic metabolism and clinically significant hepatic reactions have been reported."
        ],
        "details": [],
        "practicalExample": "Assess hepatic history and consider appropriate monitoring according to patient risk and treatment duration. A patient with known liver disease or previous drug-induced liver injury requires careful risk assessment before treatment. Management Implications Patients should be monitored clinically for symptoms suggestive of hepatic dysfunction.",
        "clinicalPearl": "New unexplained fatigue, anorexia, persistent nausea, dark urine or jaundice warrants prompt clinical evaluation."
      },
      {
        "title": "CARDIAC CONSIDERATIONS",
        "keyPoints": [
          "Itraconazole can have negative inotropic effects and may worsen heart failure in susceptible patients."
        ],
        "details": [],
        "practicalExample": "Review: History of heart failure Cardiac function Cardiovascular medicines before treatment. A patient with previous congestive heart failure requires careful assessment before systemic itraconazole is considered. Management Implications Follow the current approved contraindications and warnings.",
        "clinicalPearl": "Cardiac history should be actively reviewed before initiating systemic itraconazole."
      },
      {
        "title": "TREATMENT DURATION & ADHERENCE",
        "keyPoints": [
          "Duration varies according to:",
          "Infection",
          "Site",
          "Severity",
          "Treatment response",
          "Approved regimen"
        ],
        "details": [],
        "practicalExample": "Complete the prescribed regimen and do not independently modify the treatment duration. Early reduction in itching should not automatically lead to premature discontinuation. Management Implications Poor adherence can contribute to inadequate treatment response.",
        "clinicalPearl": "Clinical symptom improvement may precede complete resolution of infection."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent disease may be associated with:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Inadequate regimen",
          "Reinfection",
          "Drug interactions",
          "Absorption issues",
          "Resistant organism",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Do not automatically increase the dose or extend treatment without reassessment. Persistent lesions despite an apparently appropriate regimen should prompt diagnostic and medication review. Management Implications Consider: Mycological confirmation Adherence assessment Interaction review Absorption considerations Alternative diagnosis Alternative treatment strategy",
        "clinicalPearl": "Treatment failure should trigger reassessment of diagnosis, adherence, formulation use and drug interactions before treatment escalation."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ONYCHOMYCOSIS",
        "keyPoints": [
          "Chronic nail dystrophy",
          "Thickening",
          "Discoloration",
          "Subungual debris",
          "Typical Clinical Appearance",
          "Thickened, discoloured or distorted nail plates.",
          "Common Causes & Risk Factors",
          "Dermatophytes",
          "Recurrent tinea pedis",
          "Diabetes",
          "Older age",
          "Repeated nail trauma"
        ],
        "details": [],
        "practicalExample": "Consider mycological confirmation before systemic therapy and follow the formulation-specific approved regimen.",
        "clinicalPearl": "Confirmation of fungal nail disease is particularly useful before prolonged systemic antifungal exposure."
      },
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Repeated episodes",
          "Similar anatomical sites",
          "Partial treatment response",
          "Relapse after treatment",
          "Typical Clinical Appearance",
          "Recurrent annular or scaly lesions.",
          "Common Causes & Risk Factors",
          "Reinfection",
          "Untreated tinea pedis",
          "Onychomycosis",
          "Household transmission",
          "Moisture and occlusion",
          "Incomplete treatment"
        ],
        "details": [],
        "practicalExample": "Identify reservoirs and contributing factors and confirm the diagnosis where appropriate.",
        "clinicalPearl": "Repeated recurrence should prompt investigation of why the infection is returning."
      },
      {
        "title": "EXTENSIVE / MULTISITE INFECTION",
        "keyPoints": [
          "Multiple anatomical sites",
          "Numerous lesions",
          "Progressive spread",
          "Difficulty with topical management",
          "Typical Clinical Appearance",
          "Multiple annular or confluent scaly plaques.",
          "Common Causes & Risk Factors",
          "Delayed diagnosis",
          "Reinfection",
          "Inadequate previous treatment",
          "Immunosuppression"
        ],
        "details": [],
        "practicalExample": "Evaluate the appropriateness of systemic therapy and investigate contributing factors.",
        "clinicalPearl": "The extent of infection can influence the decision to use systemic rather than topical treatment."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Extensive disease",
          "Atypical lesions",
          "Recurrence",
          "Poor response",
          "Typical Clinical Appearance",
          "May be unusually extensive or persistent.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medicines",
          "Immunodeficiency",
          "Significant systemic illness"
        ],
        "details": [],
        "practicalExample": "Consider earlier diagnostic confirmation and closer monitoring.",
        "clinicalPearl": "Atypical or persistent fungal disease in an immunocompromised patient warrants careful evaluation."
      },
      {
        "title": "POLYPHARMACY",
        "keyPoints": [
          "Multiple medications increase the possibility of significant interactions.",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Cardiovascular medicines",
          "Lipid-lowering medicines",
          "Sedatives",
          "Acid-suppressing medicines",
          "Multiple chronic therapies"
        ],
        "details": [],
        "practicalExample": "Perform a comprehensive drug-interaction review before treatment.",
        "clinicalPearl": "For systemic itraconazole, the medication list is a critical part of the pre-treatment assessment."
      },
      {
        "title": "HISTORY OF LIVER DISEASE",
        "keyPoints": [
          "Assess for:",
          "Previous hepatic disease",
          "Abnormal liver function",
          "Drug-induced liver injury",
          "Hepatotoxic co-medications",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Underlying hepatic impairment and concomitant hepatotoxic medications."
        ],
        "details": [],
        "practicalExample": "Conduct appropriate risk-benefit assessment and monitoring.",
        "clinicalPearl": "Hepatic history should be established before systemic itraconazole therapy."
      },
      {
        "title": "CARDIAC DISEASE",
        "keyPoints": [
          "Pay particular attention to:",
          "Heart failure",
          "Reduced cardiac function",
          "Significant cardiovascular disease",
          "Typical Clinical Appearance",
          "No specific dermatological appearance.",
          "Common Causes & Risk Factors",
          "Pre-existing cardiac disease and interacting cardiovascular medicines."
        ],
        "details": [],
        "practicalExample": "Review current contraindications and warnings before prescribing.",
        "clinicalPearl": "A history of heart failure is particularly relevant when considering systemic itraconazole."
      }
    ]
  },
  {
    "id": "kefin-cream",
    "slug": "kefin-cream",
    "brandName": "KEFIN Cream",
    "genericName": "Ketoconazole 2% w/w Cream",
    "tagline": "Topical Antifungal Cream",
    "therapeuticArea": "Antifungal",
    "route": "Topical",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Cream",
    "strength": "2%",
    "packSize": "30 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Superficial fungal and yeast-associated skin infections",
    "composition": [
      "Each gram of cream contains:",
      "Ketoconazole IP 2% w/w",
      "Cream base: q.s."
    ],
    "therapeuticCategory": "IMIDAZOLE ANTIFUNGAL • TOPICAL • SUPERFICIAL FUNGAL INFECTION • PRESCRIPTION MEDICINE",
    "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "KETOCONAZOLE 2%Inhibits fungal CYP51 enzyme↓ERGOSTEROL SYNTHESIS ↓Fungal membrane formation is impaired↓MEMBRANE FUNCTION DISRUPTEDFungal growth inhibited"
      }
    ],
    "indications": [
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS",
      "CUTANEOUS CANDIDIASIS",
      "PITYRIASIS VERSICOLOR",
      "SEBORRHOEIC DERMATITIS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Ketoconazole 2% w/w Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "EXTERNAL USE ONLY",
        "detail": "KEFIN Cream is intended for topical dermatological use. Management Implications Do not ingest or apply internally."
      },
      {
        "title": "EYE CONTACT",
        "detail": "Avoid contact with the eyes. Management Implications If accidental contact occurs, rinse thoroughly with clean water."
      },
      {
        "title": "IRRITATION",
        "detail": "Some patients may experience: Burning Stinging Redness Irritation Dryness Management Implications Persistent or severe irritation should prompt clinical review."
      },
      {
        "title": "ALLERGIC REACTION",
        "detail": "Seek medical evaluation if significant: Swelling Severe rash Blistering Widespread reaction Other signs of hypersensitivity occur. Management Implications Discontinue use when a significant suspected allergic reaction occurs and seek appropriate medical advice."
      },
      {
        "title": "DAMAGED OR BROKEN SKIN",
        "detail": "Use cautiously on severely eroded or damaged skin according to the approved product information. Management Implications Severe erosion may require alternative or additional management."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Clean and dry the affected area gently, then apply a thin layer of KEFIN Cream as directed by your doctor.\""
      },
      {
        "question": "WASH YOUR HANDS",
        "answer": "\"Wash your hands before and after application unless your hands are the area being treated.\""
      },
      {
        "question": "KEEP THE AREA DRY",
        "answer": "\"Keep the affected area clean and dry, particularly in skin folds and between the toes.\""
      },
      {
        "question": "DO NOT SHARE PERSONAL ITEMS",
        "answer": "\"Avoid sharing towels, clothing and other personal items when treating a potentially contagious fungal infection.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Continue the treatment for the duration advised by your doctor, even if itching improves earlier.\""
      },
      {
        "question": "AVOID UNSUPERVISED STEROID COMBINATIONS",
        "answer": "\"Do not add a steroid-containing cream to the affected area unless specifically advised by your doctor.\""
      },
      {
        "question": "WHEN TO CONSULT AGAIN",
        "answer": "\"Contact your dermatologist if the lesion spreads, changes appearance, becomes painful, or does not improve as expected.\""
      }
    ],
    "clinicalPearl": "KEFIN Cream contains Ketoconazole 2% w/w, a topical imidazole antifungal suitable for appropriately diagnosed superficial fungal and yeast-associated skin infections. Successful topical antifungal therapy depends on correct diagnosis, adequate lesion coverage, consistent application and appropriate treatment duration. Persistent, recurrent, extensive or atypical lesions should prompt diagnostic reassessment rather than repeated empirical treatment.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved KEFIN Cream product information and package insert — primary source for composition, approved indications, dosage, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for topical ketoconazole 2% preparations.",
      "Relevant dermatology literature concerning topical ketoconazole in dermatophyte infections, cutaneous candidiasis, pityriasis versicolor and seborrhoeic dermatitis.",
      "Relevant dermatology guidelines concerning diagnosis and management of superficial dermatophyte infections.",
      "Relevant peer-reviewed literature concerning tinea incognito and corticosteroid-modified dermatophyte infections."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Intense pruritus",
          "Personal or family history of atopy",
          "Exposure-related distribution",
          "Recurrent eczematous flares"
        ],
        "typicalAppearance": "Erythematous, scaly, sometimes lichenified plaques.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Exposure history",
          "Morphology",
          "Chronicity"
        ],
        "managementApproach": [
          "Inflammatory dermatitis requires diagnosis-specific management rather than antifungal treatment alone."
        ],
        "clinicalPearl": "Pruritus and scale are nonspecific findings; morphology and distribution provide the diagnostic context."
      },
      {
        "id": "diff-2",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Consider:",
          "New cosmetic products",
          "Fragrances",
          "Topical medications",
          "Occupational exposures",
          "Recent change in detergent or cleanser"
        ],
        "typicalAppearance": "Erythematous, eczematous plaques with possible vesiculation or scaling.",
        "diagnosticApproach": [
          "Review all topical exposures."
        ],
        "managementApproach": [
          "Identify and remove the relevant trigger."
        ],
        "clinicalPearl": "A new eruption following introduction of a topical product should prompt consideration of contact dermatitis."
      },
      {
        "id": "diff-3",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Well-demarcated plaques",
          "Thick scale",
          "Extensor distribution",
          "Nail changes",
          "Other characteristic sites"
        ],
        "typicalAppearance": "Sharply demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Look for lesions on:",
          "Elbows",
          "Knees",
          "Scalp",
          "Nails",
          "Lumbosacral area"
        ],
        "managementApproach": [
          "Psoriasis requires psoriasis-directed treatment."
        ],
        "clinicalPearl": "A sharply demarcated plaque with characteristic distribution should not be treated as tinea solely because it is scaly."
      },
      {
        "id": "diff-4",
        "condition": "ERYTHRASMA",
        "clinicalClues": [
          "Intertriginous involvement",
          "Minimal inflammation",
          "Chronic course",
          "Brownish-red discoloration"
        ],
        "typicalAppearance": "Well-demarcated reddish-brown patches, often in the groin or axilla.",
        "diagnosticApproach": [
          "Wood's lamp examination may demonstrate characteristic coral-red fluorescence."
        ],
        "managementApproach": [
          "Treatment differs from dermatophyte infection."
        ],
        "clinicalPearl": "When a presumed fungal intertrigo does not respond as expected, consider erythrasma."
      },
      {
        "id": "diff-5",
        "condition": "BACTERIAL INTERTRIGO",
        "clinicalClues": [
          "Odour",
          "Erosion",
          "Tenderness",
          "Oozing",
          "Acute worsening"
        ],
        "typicalAppearance": "Erythematous, macerated or eroded skin folds.",
        "diagnosticApproach": [
          "Clinical assessment with microbiological testing when indicated."
        ],
        "managementApproach": [
          "Antibacterial treatment may be required depending on the diagnosis."
        ],
        "clinicalPearl": "Rapidly painful, eroded or exudative intertrigo deserves reassessment rather than repeated empiric antifungal treatment."
      },
      {
        "id": "diff-6",
        "condition": "TINEA INCognito",
        "clinicalClues": [
          "Consider when a presumed fungal infection has been exposed to topical corticosteroids.",
          "Features may include:",
          "Altered morphology",
          "Less-defined borders",
          "Persistent or expanding lesions",
          "Recurrence after steroid withdrawal"
        ],
        "typicalAppearance": "Atypical, less characteristic fungal eruption with reduced inflammatory features.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may be particularly useful."
        ],
        "managementApproach": [
          "Avoid inappropriate corticosteroid use and institute appropriate antifungal management."
        ],
        "clinicalPearl": "Topical corticosteroids can modify the appearance of dermatophyte infection and make clinical diagnosis more difficult."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "The objective is to apply a thin, even layer over the affected skin."
        ],
        "details": [],
        "practicalExample": "Apply enough cream to cover: The visible lesion The affected surrounding skin as directed The relevant margin of infection where clinically appropriate Avoid excessive application. For a localized annular plaque on the forearm, apply a thin layer over the lesion and the surrounding affected margin according to the prescribed regimen. Management Implications Adequate coverage is more important than applying a thick layer.",
        "clinicalPearl": "Use enough cream to cover the treatment area evenly—not enough to leave a visible thick coating."
      },
      {
        "title": "HOW SHOULD KEFIN CREAM BE APPLIED?",
        "keyPoints": [
          "Proper application improves consistency of topical treatment."
        ],
        "details": [],
        "practicalExample": "Clean the affected area gently. Dry thoroughly. Apply a thin layer of KEFIN Cream. Spread gently over the affected area. Wash hands after application unless the hands themselves are being treated. For tinea corporis, gently cleanse and dry the area before applying a thin, even film over the affected lesion. Management Implications Moisture, occlusion and inconsistent application can contribute to persistent disease.",
        "clinicalPearl": "Drying the affected area before application is particularly important in intertriginous fungal infections."
      },
      {
        "title": "HOW OFTEN SHOULD IT BE USED?",
        "keyPoints": [
          "Frequency should follow:",
          "The approved product directions",
          "Clinical diagnosis",
          "Disease severity",
          "Anatomical site",
          "Dermatologist's prescription"
        ],
        "details": [],
        "practicalExample": "Do not increase frequency independently if the condition appears slow to respond. A patient who misses applications should return to the prescribed schedule rather than compensating by applying excessive quantities. Management Implications Consistency is important for successful topical therapy.",
        "clinicalPearl": "Missed doses should not generally be compensated for by excessive application."
      },
      {
        "title": "DURATION OF TREATMENT",
        "keyPoints": [
          "Treatment duration varies according to:",
          "Organism",
          "Site",
          "Extent",
          "Clinical response",
          "Approved indication"
        ],
        "details": [],
        "practicalExample": "Continue treatment for the duration advised by the dermatologist or approved product information. A patient whose itching improves rapidly should not automatically assume that the underlying infection has been completely cleared. Management Implications Premature discontinuation may contribute to persistence or recurrence.",
        "clinicalPearl": "Symptomatic improvement can occur before complete resolution of the underlying infection."
      },
      {
        "title": "INTERTRIGINOUS AREAS",
        "keyPoints": [
          "Fungal infections in skin folds are influenced by:",
          "Moisture",
          "Heat",
          "Occlusion",
          "Friction"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer to clean, thoroughly dried skin according to the prescribed regimen. After bathing, carefully dry the groin or inframammary fold before applying the cream. Management Implications Environmental control should accompany antifungal therapy.",
        "clinicalPearl": "Keeping susceptible skin folds dry can reduce conditions that favour persistent fungal growth."
      },
      {
        "title": "FEET AND RECURRENT INFECTION",
        "keyPoints": [
          "Assess:",
          "Toe webs",
          "Soles",
          "Nails",
          "Footwear",
          "Household contacts where relevant"
        ],
        "details": [],
        "practicalExample": "Apply consistently to the affected areas according to the prescribed regimen. A patient with recurrent tinea cruris should also be assessed for untreated tinea pedis. Management Implications Treating the reservoir can be important in reducing recurrence.",
        "clinicalPearl": "Recurrent groin infection should prompt examination of the feet and nails."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Inadequate application",
          "Insufficient treatment duration",
          "Reinfection",
          "Tinea incognito",
          "Resistant/unusual infection",
          "Mixed dermatosis"
        ],
        "details": [],
        "practicalExample": "Do not simply increase the amount or frequency of cream without reassessment. A lesion that continues expanding despite appropriate use should prompt diagnostic confirmation rather than indefinite continuation of empiric treatment. Management Implications Consider KOH microscopy, culture or other diagnostic evaluation where appropriate.",
        "clinicalPearl": "When a presumed fungal infection fails to respond, reconsider the diagnosis before escalating treatment."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT FUNGAL INFECTION",
        "keyPoints": [
          "Repeated episodes",
          "Similar anatomical sites",
          "Partial treatment response",
          "Recurrence after apparent clearance",
          "Typical Clinical Appearance",
          "Recurrent erythematous, scaly or pruritic lesions.",
          "Common Causes & Risk Factors",
          "Reinfection",
          "Moisture",
          "Occlusion",
          "Incomplete treatment",
          "Untreated household/foot/nail reservoir",
          "Underlying predisposition"
        ],
        "details": [],
        "practicalExample": "Confirm the diagnosis and identify potential reservoirs or predisposing factors.",
        "clinicalPearl": "Recurrent infection should trigger a search for the reason for recurrence, not simply repeated short courses of treatment."
      },
      {
        "title": "EXTENSIVE DISEASE",
        "keyPoints": [
          "Consider extensive disease when:",
          "Multiple body sites are involved",
          "Lesions are widespread",
          "There is rapid progression",
          "There is significant inflammation",
          "Typical Clinical Appearance",
          "Multiple or confluent lesions involving larger areas of skin.",
          "Common Causes & Risk Factors",
          "Delayed diagnosis",
          "Immunosuppression",
          "Reinfection",
          "Inadequate previous therapy"
        ],
        "details": [],
        "practicalExample": "Assess whether topical treatment remains appropriate or whether systemic therapy should be considered.",
        "clinicalPearl": "Extent of disease can change the treatment strategy even when the underlying organism is the same."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENT",
        "keyPoints": [
          "Consider:",
          "Extensive disease",
          "Atypical morphology",
          "Recurrent infection",
          "Poor response to standard therapy",
          "Typical Clinical Appearance",
          "May be more extensive, persistent or atypical than in immunocompetent patients.",
          "Common Causes & Risk Factors",
          "Immunosuppressive medication",
          "Immunodeficiency",
          "Significant systemic disease"
        ],
        "details": [],
        "practicalExample": "Consider earlier diagnostic confirmation and specialist evaluation.",
        "clinicalPearl": "Atypical or unusually persistent fungal disease warrants a lower threshold for diagnostic confirmation."
      },
      {
        "title": "PREGNANCY & LACTATION",
        "keyPoints": [
          "Treatment selection should consider:",
          "Site",
          "Extent",
          "Clinical necessity",
          "Current approved product information",
          "Typical Clinical Appearance",
          "The underlying fungal condition does not necessarily differ.",
          "Common Causes & Risk Factors",
          "Same as for other patients."
        ],
        "details": [],
        "practicalExample": "Use only according to appropriate medical advice and the approved product information.",
        "clinicalPearl": "Topical therapy should still be selected deliberately during pregnancy and lactation rather than assumed to be automatically appropriate."
      },
      {
        "title": "FACIAL / PERIORBITAL INVOLVEMENT",
        "keyPoints": [
          "Facial skin is more sensitive and thinner than many other body sites.",
          "Typical Clinical Appearance",
          "Erythema, scaling or annular lesions may be less typical.",
          "Common Causes & Risk Factors",
          "Superficial fungal infection, dermatitis, seborrhoeic dermatitis and other inflammatory disorders can overlap clinically."
        ],
        "details": [],
        "practicalExample": "Avoid contact with the eyes and seek appropriate diagnostic confirmation when morphology is uncertain.",
        "clinicalPearl": "Atypical facial lesions deserve diagnostic caution because several inflammatory and infectious conditions can mimic one another."
      },
      {
        "title": "TINEA INCOGNITO",
        "keyPoints": [
          "Suspect when a presumed fungal lesion has been treated with topical corticosteroids.",
          "Typical Clinical Appearance",
          "Less-defined borders, altered morphology and persistent or expanding disease.",
          "Common Causes & Risk Factors",
          "Inappropriate or prolonged topical corticosteroid use."
        ],
        "details": [],
        "practicalExample": "Reassess the diagnosis and consider fungal testing.",
        "clinicalPearl": "If a \"rash\" repeatedly worsens after corticosteroid use, reconsider dermatophyte infection."
      }
    ]
  },
  {
    "id": "kefin-z-shampoo",
    "slug": "kefin-z-shampoo",
    "brandName": "KEFIN-Z Shampoo",
    "genericName": "Ketoconazole 2% + Zinc Pyrithione 1% Shampoo",
    "tagline": "Medicated Antifungal Scalp Shampoo",
    "therapeuticArea": "Antifungal",
    "route": "Topical",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Lotion",
    "strength": "2%",
    "packSize": "100 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Ketoconazole 2% w/v + Zinc Pyrithione 1% w/v",
    "composition": [
      "Each ml of shampoo contains:",
      "Ketoconazole IP 2% w/v",
      "Zinc Pyrithione 1% w/v",
      "Shampoo base: q.s."
    ],
    "therapeuticCategory": "IMIDAZOLE ANTIFUNGAL • TOPICAL • PRESCRIPTION MEDICINE",
    "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "KETOCONAZOLE 2% + ZINC PYRITHIONE 1%Dual antifungal & antimicrobial action↓FUNGAL GROWTH & MICROBIAL PROLIFERATION ↓Ergosterol synthesis inhibited + cellular processes disrupted↓DANDRUFF & SCALING ↓Scalp symptoms controlled"
      }
    ],
    "indications": [
      "DANDRUFF",
      "SEBORRHOEIC DERMATITIS",
      "MALASSEZIA-ASSOCIATED SCALP DISEASE",
      "TINEA CAPITIS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Ketoconazole 2% + Zinc Pyrithione 1% Shampoo or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "EXTERNAL USE ONLY",
        "detail": "KEFIN-Z Shampoo is intended for topical use on the scalp. Management Implications Do not ingest or use internally."
      },
      {
        "title": "EYE CONTACT",
        "detail": "Avoid contact with the eyes. Management Implications If accidental contact occurs, rinse thoroughly with clean water."
      },
      {
        "title": "IRRITATION OR DRYNESS",
        "detail": "Some patients may experience: Dryness Burning Irritation Itching Management Implications Persistent or significant irritation warrants reassessment of use."
      },
      {
        "title": "ALLERGIC REACTION",
        "detail": "Seek medical evaluation for significant: Swelling Severe burning Extensive rash Blistering Other signs of hypersensitivity Management Implications Discontinue use when a significant suspected allergic reaction occurs and seek appropriate medical advice."
      },
      {
        "title": "CHILDREN",
        "detail": "Use in children should follow the approved product information and medical advice. Management Implications Do not automatically apply adult treatment schedules to paediatric patients."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO USE",
        "answer": "\"Wet your scalp and hair thoroughly. Apply an adequate amount of KEFIN-Z Shampoo directly to the scalp, gently massage to form a lather, leave for the recommended contact time, and rinse thoroughly.\""
      },
      {
        "question": "FOCUS ON THE SCALP",
        "answer": "\"Make sure the shampoo reaches the scalp, especially the areas affected by scaling or itching.\""
      },
      {
        "question": "AVOID THE EYES",
        "answer": "\"Avoid contact with the eyes. If it enters the eyes accidentally, rinse thoroughly with clean water.\""
      },
      {
        "question": "DO NOT SCRUB HARSHLY",
        "answer": "\"Massage gently. Vigorous scratching or scrubbing can further irritate an already inflamed scalp.\""
      },
      {
        "question": "FOLLOW THE PRESCRIBED SCHEDULE",
        "answer": "\"Use the shampoo according to your doctor's instructions. Do not increase the frequency simply because the scalp is itchy.\""
      },
      {
        "question": "RECURRENCE",
        "answer": "\"Dandruff and seborrhoeic dermatitis may recur. Your dermatologist may recommend a maintenance schedule after the initial condition is controlled.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DERMATOLOGIST",
        "answer": "\"Consult your dermatologist if symptoms persist, worsen, spread, or are associated with patchy hair loss, broken hairs, significant inflammation or pain.\""
      }
    ],
    "clinicalPearl": "KEFIN-Z Shampoo combines Ketoconazole 2% and Zinc Pyrithione 1% in a medicated scalp formulation intended to provide antifungal-focused management of dandruff and susceptible yeast-associated scalp conditions. Its clinical value depends on appropriate patient selection, adequate scalp application, sufficient contact time and adherence to the prescribed regimen. Persistent, severe, atypical or hair-loss-associated scalp disease warrants diagnostic reassessment and may require additional or alternative therapy.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved KEFIN-Z Shampoo product information and package insert — primary source for composition, approved indications, directions, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for topical ketoconazole and zinc pyrithione preparations.",
      "American Academy of Dermatology. Seborrheic dermatitis: Diagnosis and treatment.",
      "Peer-reviewed dermatology literature on topical ketoconazole in seborrhoeic dermatitis and Malassezia-associated disease.",
      "Peer-reviewed dermatology literature on zinc pyrithione-containing anti-dandruff preparations.",
      "Relevant dermatology guidelines and literature concerning diagnosis and management of superficial fungal infections and tinea capitis."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "SCALP PSORIASIS",
        "clinicalClues": [
          "Thick scale",
          "Well-demarcated plaques",
          "Extension beyond the hairline",
          "Personal/family history of psoriasis",
          "Nail changes or lesions elsewhere"
        ],
        "typicalAppearance": "Sharply demarcated erythematous plaques with thicker scale.",
        "diagnosticApproach": [
          "Examine:",
          "Hairline",
          "Ears",
          "Elbows",
          "Knees",
          "Nails",
          "Other body sites"
        ],
        "managementApproach": [
          "Requires psoriasis-directed therapy rather than antifungal treatment alone."
        ],
        "clinicalPearl": "Thick, sharply demarcated plaques extending beyond the hairline should raise suspicion for psoriasis."
      },
      {
        "id": "diff-2",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "New shampoo or hair product",
          "Burning or itching",
          "Sudden onset",
          "Symptoms corresponding to product exposure"
        ],
        "typicalAppearance": "Erythema, scaling, eczematous change or occasionally vesiculation.",
        "diagnosticApproach": [
          "Review:",
          "Hair dyes",
          "Fragrances",
          "Preservatives",
          "Shampoos",
          "Conditioners",
          "Styling products"
        ],
        "managementApproach": [
          "Identify and eliminate the causative product."
        ],
        "clinicalPearl": "A new scalp eruption after changing hair-care products should prompt consideration of contact dermatitis."
      },
      {
        "id": "diff-3",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Pustules",
          "Tenderness",
          "Crusting",
          "Localized inflammation"
        ],
        "typicalAppearance": "Follicle-centred inflammatory papules or pustules.",
        "diagnosticApproach": [
          "Clinical assessment with microbiological evaluation where indicated."
        ],
        "managementApproach": [
          "Treatment depends on the underlying organism and diagnosis."
        ],
        "clinicalPearl": "Pustular scalp disease should not automatically be attributed to dandruff or fungal infection."
      },
      {
        "id": "diff-4",
        "condition": "PEDICULOSIS CAPITIS",
        "clinicalClues": [
          "Intense itching",
          "Household/school exposure",
          "Nits attached to hair shafts",
          "Live lice"
        ],
        "typicalAppearance": "Excoriations and nits attached close to the scalp.",
        "diagnosticApproach": [
          "Direct inspection and identification of live lice or viable nits."
        ],
        "managementApproach": [
          "Requires appropriate pediculosis treatment and contact management."
        ],
        "clinicalPearl": "Persistent scalp itching with visible nits warrants evaluation for head lice rather than escalation of anti-dandruff treatment."
      },
      {
        "id": "diff-5",
        "condition": "FOLLICULITIS DECALVANS / SCARRING ALOPECIA",
        "clinicalClues": [
          "Persistent inflammation",
          "Pustules",
          "Crusting",
          "Hair loss",
          "Scalp tenderness",
          "Progressive loss of follicular openings"
        ],
        "typicalAppearance": "Inflammatory patches associated with progressive scarring hair loss.",
        "diagnosticApproach": [
          "Trichoscopy and biopsy may be required."
        ],
        "managementApproach": [
          "Prompt dermatological assessment is important because scarring alopecia can result in permanent follicular destruction."
        ],
        "clinicalPearl": "Hair loss with inflammation and loss of follicular openings should not be managed as simple dandruff."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHAMPOO SHOULD BE USED?",
        "keyPoints": [
          "The objective is to adequately cover the affected scalp rather than use an excessive quantity."
        ],
        "details": [],
        "practicalExample": "Use a sufficient amount to: Wet the scalp Produce adequate lather Cover the affected areas The exact quantity depends on scalp size and hair density. For a typical adult scalp, use enough shampoo to distribute evenly over the scalp rather than applying a large amount only to the hair. Management Implications Excess product does not necessarily provide greater antifungal efficacy and may increase dryness or irritation.",
        "clinicalPearl": "Adequate scalp coverage matters more than excessive shampoo quantity."
      },
      {
        "title": "HOW SHOULD IT BE APPLIED?",
        "keyPoints": [
          "The medication needs to reach the scalp, not simply coat the hair shafts."
        ],
        "details": [],
        "practicalExample": "Wet the hair and scalp thoroughly. Apply an appropriate amount of KEFIN-Z Shampoo. Massage gently into the scalp. Ensure coverage of affected areas. Allow the product to remain for the contact time specified in the approved directions/prescription. Rinse thoroughly. A patient with diffuse scalp scaling should massage the shampoo directly into the scalp, particularly areas with visible scale, rather than concentrating only on the hair. Management Implications Correct application improves exposure of the affected scalp to the active ingredients.",
        "clinicalPearl": "For a medicated shampoo, the target is the scalp—not merely the hair."
      },
      {
        "title": "CONTACT TIME",
        "keyPoints": [
          "Contact time should follow the approved product directions or dermatologist's prescription."
        ],
        "details": [],
        "practicalExample": "Do not immediately rinse unless the product instructions specifically direct this. After gently massaging the shampoo into the scalp, allow the recommended contact period before rinsing. Management Implications Insufficient contact may reduce exposure of the scalp to the active ingredients.",
        "clinicalPearl": "\"Apply and immediately rinse\" is not equivalent to following the prescribed medicated-shampoo regimen."
      },
      {
        "title": "FREQUENCY OF USE",
        "keyPoints": [
          "Frequency depends on:",
          "Diagnosis",
          "Severity",
          "Treatment phase",
          "Product directions",
          "Clinical response"
        ],
        "details": [],
        "practicalExample": "Follow the prescribed schedule rather than increasing frequency independently. A patient with recurrent seborrhoeic dermatitis may have a treatment phase followed by individualized maintenance use. Management Implications Overuse may contribute to dryness or irritation.",
        "clinicalPearl": "Treatment frequency should be diagnosis-driven rather than based solely on symptom severity on a particular day."
      },
      {
        "title": "MAINTENANCE THERAPY",
        "keyPoints": [
          "Seborrhoeic dermatitis and dandruff commonly recur."
        ],
        "details": [],
        "practicalExample": "Maintenance frequency should follow the approved product directions and dermatologist's advice. A patient whose scaling improves with treatment may require intermittent maintenance to reduce recurrence. Management Implications Maintenance therapy can be considered separately from active-flare treatment.",
        "clinicalPearl": "In recurrent seborrhoeic disease, maintenance is often part of long-term disease control."
      },
      {
        "title": "COMBINATION WITH OTHER TOPICAL THERAPY",
        "keyPoints": [
          "Additional therapy may be needed when there is:",
          "Significant inflammation",
          "Severe pruritus",
          "Marked erythema",
          "Thick scale",
          "Secondary infection"
        ],
        "details": [],
        "practicalExample": "Other topical products should be used according to the dermatologist's prescribed regimen. A patient with significant inflammatory seborrhoeic dermatitis may require additional short-term anti-inflammatory treatment alongside antifungal scalp care. Management Implications Treatment should address both the microbial/yeast component and inflammation where clinically indicated.",
        "clinicalPearl": "Antifungal control and anti-inflammatory control are sometimes separate treatment objectives."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Inadequate scalp contact",
          "Insufficient contact time",
          "Poor adherence",
          "Incorrect frequency",
          "Scalp psoriasis",
          "Contact dermatitis",
          "Tinea capitis",
          "Scarring alopecia"
        ],
        "details": [],
        "practicalExample": "Do not simply increase shampoo quantity or frequency. If persistent thick plaques remain despite appropriate use, reconsider psoriasis or another inflammatory scalp condition. Management Implications Reassess the diagnosis and treatment strategy.",
        "clinicalPearl": "Failure of a medicated shampoo should trigger reassessment of diagnosis and technique before simply escalating use."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT DANDRUFF",
        "keyPoints": [
          "Repeated flares",
          "Fine scalp scaling",
          "Variable pruritus",
          "Often associated with seborrhoeic skin",
          "Typical Clinical Appearance",
          "Fine white or yellowish scale with variable erythema.",
          "Common Causes & Risk Factors",
          "Seborrhoeic tendency",
          "Malassezia-associated inflammation",
          "Seasonal variation",
          "Stress",
          "Oily scalp"
        ],
        "details": [],
        "practicalExample": "Use appropriate antifungal shampoo therapy and consider maintenance treatment according to clinical response and product directions.",
        "clinicalPearl": "Recurrence is common; successful control does not necessarily mean permanent eradication."
      },
      {
        "title": "SEVERE SEBORRHOEIC DERMATITIS",
        "keyPoints": [
          "Marked erythema",
          "Thick scale",
          "Significant pruritus",
          "Facial involvement",
          "Recurrent flares",
          "Typical Clinical Appearance",
          "Inflamed scalp with adherent or greasy scale.",
          "Common Causes & Risk Factors",
          "Seborrhoeic tendency, Malassezia-associated inflammation and individual susceptibility."
        ],
        "details": [],
        "practicalExample": "Antifungal therapy may be combined with appropriate anti-inflammatory treatment when clinically indicated.",
        "clinicalPearl": "When inflammation is prominent, antifungal therapy alone may not address the complete clinical picture."
      },
      {
        "title": "TINEA CAPITIS",
        "keyPoints": [
          "Patchy alopecia",
          "Broken hairs",
          "Scale",
          "Possible lymphadenopathy",
          "Typical Clinical Appearance",
          "Scaly areas with broken hairs or inflammatory plaques.",
          "Common Causes & Risk Factors",
          "Close contact",
          "Shared combs/towels",
          "Household transmission",
          "Childhood exposure"
        ],
        "details": [],
        "practicalExample": "Systemic antifungal therapy is generally required; medicated shampoo may serve as an adjunct.",
        "clinicalPearl": "The presence of hair loss and broken hairs should prompt active consideration of tinea capitis."
      },
      {
        "title": "SCALP PSORIASIS",
        "keyPoints": [
          "Thick scale",
          "Well-defined plaques",
          "Hairline extension",
          "Possible psoriasis elsewhere",
          "Typical Clinical Appearance",
          "Thick, sharply demarcated erythematous plaques.",
          "Common Causes & Risk Factors",
          "Personal/family history of psoriasis and characteristic involvement of other sites."
        ],
        "details": [],
        "practicalExample": "Use psoriasis-directed treatment rather than relying on antifungal shampoo alone.",
        "clinicalPearl": "Scalp psoriasis and seborrhoeic dermatitis can overlap clinically; treatment response alone should not be used to establish the diagnosis."
      },
      {
        "title": "SENSITIVE OR IRRITATED SCALP",
        "keyPoints": [
          "Watch for:",
          "Burning",
          "Tightness",
          "Excessive dryness",
          "Increased scaling after washing",
          "Typical Clinical Appearance",
          "Diffuse erythema or dryness without a characteristic fungal pattern.",
          "Common Causes & Risk Factors",
          "Excessive washing",
          "Hot water",
          "Harsh hair products",
          "Multiple topical preparations"
        ],
        "details": [],
        "practicalExample": "Review cleansing frequency and concurrent products.",
        "clinicalPearl": "When irritation increases after treatment, reassess the regimen rather than automatically increasing antifungal exposure."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Persistent disease may reflect:",
          "Wrong diagnosis",
          "Poor adherence",
          "Incorrect application",
          "Insufficient contact time",
          "Resistant/unusual infection",
          "Coexisting psoriasis",
          "Contact dermatitis",
          "Typical Clinical Appearance",
          "Persistent or changing scalp lesions despite treatment.",
          "Common Causes & Risk Factors",
          "Diagnostic overlap and inappropriate treatment are important considerations."
        ],
        "details": [],
        "practicalExample": "Reassess morphology, application technique and diagnosis; investigate further where indicated.",
        "clinicalPearl": "A change in lesion morphology during treatment is a reason to reassess the diagnosis."
      }
    ]
  },
  {
    "id": "kefin-z-soap",
    "slug": "kefin-z-soap",
    "brandName": "KEFIN-Z Soap",
    "genericName": "Ketoconazole + Zinc Pyrithione + Glycerine Soap",
    "tagline": "Antifungal & Medicated Cleansing Bar",
    "therapeuticArea": "Antifungal",
    "route": "Topical",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Soap",
    "strength": "Standard Therapeutic",
    "packSize": "75 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
    "composition": [
      "Each 75 g Soap Contains:",
      "Ketoconazole IP 2% w/w",
      "Zinc Pyrithione 1% w/w",
      "Glycerine Noodle base: q.s.",
      "Perfume q.s.",
      "Approved colour used q.s."
    ],
    "therapeuticCategory": "IMIDAZOLE ANTIFUNGAL • TOPICAL • PRESCRIPTION MEDICINE",
    "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "KETOCONAZOLE 2% + ZINC PYRITHIONE 1%Dual antifungal & antimicrobial action↓FUNGAL GROWTH & MICROBIAL PROLIFERATION ↓Ergosterol synthesis inhibited + cellular processes disrupted↓DANDRUFF & SCALING ↓Scalp symptoms controlled"
      }
    ],
    "indications": [
      "SEBORRHOEIC DERMATITIS",
      "MALASSEZIA-ASSOCIATED DERMATOSES",
      "SUPERFICIAL DERMATOPHYTE INFECTION"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Ketoconazole + Zinc Pyrithione + Glycerine Soap or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "EXTERNAL USE ONLY",
        "detail": "KEFIN-Z Soap is intended for topical external use. Management Implications Avoid ingestion and inappropriate internal use."
      },
      {
        "title": "EYE CONTACT",
        "detail": "Avoid contact with the eyes. Management Implications If accidental contact occurs, rinse thoroughly with clean water."
      },
      {
        "title": "IRRITATION",
        "detail": "Temporary dryness or irritation may occur with medicated cleansing. Management Implications Persistent or significant irritation should prompt review of use and consideration of an alternative approach."
      },
      {
        "title": "DAMAGED SKIN",
        "detail": "Use caution over severely eroded, ulcerated or acutely inflamed skin. Management Implications Follow the approved product information and dermatologist's advice."
      },
      {
        "title": "ALLERGIC REACTION",
        "detail": "Discontinue use and seek medical evaluation if significant: Swelling Severe burning Extensive rash Blistering Breathing difficulty occurs."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO USE",
        "answer": "\"Wet the affected area, gently work the soap into a lather, cleanse as directed, and rinse thoroughly.\""
      },
      {
        "question": "DO NOT SCRUB AGGRESSIVELY",
        "answer": "\"Do not scrub the skin harshly. Gentle cleansing is sufficient.\""
      },
      {
        "question": "AVOID EYES",
        "answer": "\"Avoid contact with the eyes. Rinse thoroughly with clean water if accidental contact occurs.\""
      },
      {
        "question": "KEEP THE SOAP DRY",
        "answer": "\"After use, allow the soap to dry and store it appropriately to maintain product quality.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED TREATMENT",
        "answer": "\"Use the product for the duration advised by your doctor. Do not stop or increase use without medical advice.\""
      },
      {
        "question": "DO NOT SHARE PERSONAL ITEMS",
        "answer": "\"Do not share towels, combs, clothing or other personal items when managing a suspected contagious fungal infection.\""
      },
      {
        "question": "CONSULT IF THE CONDITION PERSISTS",
        "answer": "\"If the condition does not improve, spreads, becomes painful or changes in appearance, consult your dermatologist for reassessment.\""
      }
    ],
    "clinicalPearl": "KEFIN-Z Soap combines ketoconazole and zinc pyrithione in a medicated cleansing formulation, with glycerine included as a skin-conditioning humectant. It may provide useful antifungal-focused cleansing in appropriately selected dermatological conditions, particularly where yeast-associated or superficial fungal involvement is relevant. However, persistent, extensive or diagnostically uncertain disease requires appropriate clinical evaluation and, when indicated, dedicated antifungal or diagnosis-specific therapy.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved KEFIN-Z Soap product information and package insert — primary source for the exact composition, approved indication, directions, contraindications and precautions.",
      "Current applicable Indian regulatory/product documentation for topical ketoconazole and zinc pyrithione preparations.",
      "Gupta AK, et al. Literature concerning ketoconazole and the management of seborrhoeic dermatitis and Malassezia-associated dermatoses.",
      "American Academy of Dermatology. Seborrheic dermatitis: Diagnosis and treatment.",
      "Relevant peer-reviewed dermatology literature concerning superficial dermatophyte infections and topical antifungal therapy."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Pruritus",
          "Erythema",
          "Scaling",
          "History of atopy",
          "Exposure-related recurrence"
        ],
        "typicalAppearance": "Erythematous, scaly or eczematous patches and plaques.",
        "diagnosticApproach": [
          "Assess morphology, distribution, exposures and clinical history."
        ],
        "managementApproach": [
          "If fungal infection is not supported, management should focus on the appropriate inflammatory dermatosis."
        ],
        "clinicalPearl": "Not every itchy, scaly lesion is fungal."
      },
      {
        "id": "diff-2",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Well-demarcated plaques",
          "Persistent scale",
          "Extensor distribution",
          "Scalp involvement",
          "Nail changes"
        ],
        "typicalAppearance": "Sharply demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine the scalp, nails and other typical body sites."
        ],
        "managementApproach": [
          "Psoriasis requires diagnosis-specific management; antifungal cleansing should not be used as the sole treatment for psoriasis."
        ],
        "clinicalPearl": "A sharply demarcated plaque with characteristic distribution should prompt consideration of psoriasis."
      },
      {
        "id": "diff-3",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Recent change in cosmetic or cleanser",
          "Burning or itching",
          "Exposure-pattern distribution",
          "Recurrent symptoms"
        ],
        "typicalAppearance": "Eczematous erythema, scaling, vesicles or irritation.",
        "diagnosticApproach": [
          "Review:",
          "Soaps",
          "Shampoos",
          "Hair products",
          "Fragrances",
          "Preservatives",
          "Occupational exposures"
        ],
        "managementApproach": [
          "Identify and eliminate the causative exposure."
        ],
        "clinicalPearl": "When a skin problem repeatedly follows product exposure, consider contact dermatitis before escalating antifungal therapy."
      },
      {
        "id": "diff-4",
        "condition": "BACTERIAL FOLLICULITIS",
        "clinicalClues": [
          "Follicular pustules",
          "Tenderness",
          "Crusting",
          "Localized inflammation"
        ],
        "typicalAppearance": "Follicle-centred papules or pustules.",
        "diagnosticApproach": [
          "Clinical examination with microbiological assessment where appropriate."
        ],
        "managementApproach": [
          "Antibacterial treatment may be required according to the clinical diagnosis."
        ],
        "clinicalPearl": "Follicular pustules are not automatically evidence of fungal infection."
      },
      {
        "id": "diff-5",
        "condition": "TINEA VERSICOLOR VS OTHER PIGMENTARY CONDITIONS",
        "clinicalClues": [
          "Multiple macules",
          "Fine scale",
          "Truncal distribution",
          "Variable pigmentation"
        ],
        "typicalAppearance": "Hypopigmented, hyperpigmented or erythematous macules with fine scale.",
        "diagnosticApproach": [
          "KOH examination or other testing may help confirm Malassezia involvement when the diagnosis is uncertain."
        ],
        "managementApproach": [
          "Differentiate from:",
          "Vitiligo",
          "Post-inflammatory pigmentary change",
          "Pityriasis alba",
          "Other pigmentary disorders"
        ],
        "clinicalPearl": "Pigmentary change can persist after fungal clearance; persistent colour change does not necessarily mean treatment failure."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW TO USE KEFIN-Z SOAP",
        "keyPoints": [
          "Use the soap as directed by the treating physician or according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Wet the affected area. Lather the soap gently. Apply the lather to the intended area. Avoid vigorous scrubbing. Rinse thoroughly. Dry the area gently. For an affected body area, create a gentle lather and cleanse the involved skin without aggressive rubbing, followed by thorough rinsing. Management Implications Appropriate technique can reduce unnecessary irritation while maintaining the cleansing function.",
        "clinicalPearl": "Medicated cleansing does not require aggressive scrubbing; gentle application is generally preferable."
      },
      {
        "title": "SCALP / SEBORRHOEIC AREAS",
        "keyPoints": [
          "When used as part of scalp or seborrhoeic-area management, focus on the affected region rather than unnecessarily cleansing unrelated skin."
        ],
        "details": [],
        "practicalExample": "Use sufficient product to create an adequate lather over the intended area. Gently massage the lather over the affected scalp/skin and rinse thoroughly according to the prescribed regimen. Management Implications Frequency and contact time should follow the approved product directions or dermatologist's advice.",
        "clinicalPearl": "Consistency of use is generally more important than excessive product quantity."
      },
      {
        "title": "FREQUENCY OF USE",
        "keyPoints": [
          "Frequency should be determined by:",
          "Diagnosis",
          "Disease severity",
          "Anatomical site",
          "Product directions",
          "Clinical response"
        ],
        "details": [],
        "practicalExample": "Do not increase frequency independently if symptoms persist. If symptoms do not improve as expected, reassess the diagnosis and treatment strategy rather than simply increasing cleansing frequency. Management Implications Over-cleansing may aggravate dryness or irritation.",
        "clinicalPearl": "Persistent symptoms should trigger clinical reassessment—not automatically more frequent washing."
      },
      {
        "title": "COMBINATION WITH OTHER ANTIFUNGAL THERAPY",
        "keyPoints": [
          "KEFIN-Z Soap may be used as part of a broader antifungal management plan where appropriate."
        ],
        "details": [],
        "practicalExample": "A patient with established dermatophyte infection may require a therapeutic topical antifungal cream in addition to appropriate cleansing. Management Implications The soap should not be assumed to provide sufficient treatment for every superficial fungal infection.",
        "clinicalPearl": "Cleansing and treatment are related but not interchangeable concepts."
      },
      {
        "title": "MAINTENANCE CARE",
        "keyPoints": [
          "Some yeast-associated conditions such as seborrhoeic dermatitis can recur."
        ],
        "details": [],
        "practicalExample": "After successful control of a flare, the dermatologist may consider an individualized maintenance strategy based on recurrence pattern and approved product directions. Management Implications Long-term management should balance disease control with skin tolerance.",
        "clinicalPearl": "For recurrent seborrhoeic disease, prevention of relapse may require a structured maintenance strategy."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Inadequate application",
          "Poor adherence",
          "Insufficient therapeutic treatment",
          "Resistant or unusual infection",
          "Coexisting inflammatory disease",
          "Contact dermatitis"
        ],
        "details": [],
        "practicalExample": "Do not simply increase the amount of soap used. A persistent annular lesion despite appropriate cleansing should prompt consideration of dermatophyte infection and diagnostic confirmation. Management Implications Reassess the diagnosis and determine whether a dedicated antifungal or alternative treatment is required.",
        "clinicalPearl": "Failure of a medicated cleanser should prompt diagnostic reassessment rather than aggressive cleansing."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT SEBORRHOEIC DERMATITIS",
        "keyPoints": [
          "Recurrent scaling",
          "Pruritus",
          "Seborrhoeic distribution",
          "Periodic flares",
          "Typical Clinical Appearance",
          "Erythematous skin with fine to greasy scale.",
          "Common Causes & Risk Factors",
          "Sebaceous activity",
          "Malassezia-associated inflammation",
          "Stress",
          "Seasonal changes",
          "Certain neurological or systemic associations"
        ],
        "details": [],
        "practicalExample": "Use an appropriate antifungal and anti-inflammatory strategy according to disease severity, with maintenance care when clinically indicated.",
        "clinicalPearl": "Recurrence is characteristic of seborrhoeic dermatitis and does not necessarily indicate treatment failure."
      },
      {
        "title": "EXTENSIVE SUPERFICIAL FUNGAL DISEASE",
        "keyPoints": [
          "Extensive involvement, multiple body sites or rapid progression may require more than medicated cleansing.",
          "Typical Clinical Appearance",
          "Multiple or widespread lesions with variable scaling and erythema.",
          "Common Causes & Risk Factors",
          "Close contact",
          "Shared personal items",
          "Humid environments",
          "Occlusion",
          "Immunosuppression",
          "Incomplete previous treatment"
        ],
        "details": [],
        "practicalExample": "Confirm the diagnosis and select appropriate topical or systemic antifungal therapy.",
        "clinicalPearl": "The greater the extent of disease, the more important it becomes to distinguish supportive cleansing from definitive antifungal treatment."
      },
      {
        "title": "SENSITIVE / DRY SKIN",
        "keyPoints": [
          "Watch for:",
          "Tightness",
          "Burning",
          "Excessive dryness",
          "Scaling after washing",
          "Typical Clinical Appearance",
          "Dry, rough or mildly irritated skin.",
          "Common Causes & Risk Factors",
          "Frequent washing",
          "Hot water",
          "Aggressive scrubbing",
          "Concurrent irritant products"
        ],
        "details": [],
        "practicalExample": "Use gentle cleansing techniques and consider appropriate moisturization.",
        "clinicalPearl": "The treatment should control the target condition without unnecessarily compromising the skin barrier."
      },
      {
        "title": "CHILDREN",
        "keyPoints": [
          "Children may have different presentations and different treatment requirements.",
          "Typical Clinical Appearance",
          "Depends on the underlying disease.",
          "Common Causes & Risk Factors",
          "Close-contact transmission",
          "Shared towels/combs",
          "School or household exposure",
          "Atopic skin"
        ],
        "details": [],
        "practicalExample": "Confirm the diagnosis and follow age-appropriate product directions and medical advice.",
        "clinicalPearl": "Do not extrapolate adult treatment schedules to children without checking the approved age-specific guidance."
      },
      {
        "title": "PREGNANCY & LACTATION",
        "keyPoints": [
          "Review the clinical need and current product information.",
          "Typical Clinical Appearance",
          "Same underlying dermatological presentation, but treatment selection may require additional consideration.",
          "Common Causes & Risk Factors",
          "Disease-specific."
        ],
        "details": [],
        "practicalExample": "Use according to the approved product information and individualized medical advice.",
        "clinicalPearl": "Pregnancy and lactation should trigger an explicit review of product suitability rather than an assumption that every topical preparation is interchangeable."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Reconsider:",
          "Diagnosis",
          "Application technique",
          "Treatment adherence",
          "Infection type",
          "Mixed infection",
          "Contact dermatitis",
          "Psoriasis or eczema",
          "Typical Clinical Appearance",
          "Persistent, recurrent or progressively changing lesions.",
          "Common Causes & Risk Factors",
          "Incorrect diagnosis or inadequate treatment are common possibilities."
        ],
        "details": [],
        "practicalExample": "Reassess clinically and investigate where appropriate.",
        "clinicalPearl": "A changing morphology is often more important than the persistence of symptoms alone."
      }
    ]
  },
  {
    "id": "lixoclin-lb",
    "slug": "lixoclin-lb",
    "brandName": "LIXOCLIN-LB",
    "genericName": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
    "tagline": "Tetracycline-Class Antibiotic with Probiotic Support",
    "therapeuticArea": "Antibacterial",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Tablet",
    "strength": "100 mg",
    "packSize": "10 × 10 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Treatment of susceptible bacterial infections and selected inflammatory/infectious dermatological conditions, according to approved indication",
    "composition": [
      "Each dosage unit contains:",
      "Doxycycline — 100 mg",
      "Lactic Acid Bacillus — 5 Million Spores",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Tetracycline-Class Antibacterial • Oral • Additional anti-inflammatory effects • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "DOXYCYCLINE",
        "description": "Binds to the 30S bacterial ribosomal subunit. Interference with aminoacyl-tRNA attachment Inhibition of bacterial protein synthesis Suppression of susceptible bacterial growth"
      }
    ],
    "indications": [
      "INFLAMMATORY ACNE",
      "ROSACEA / INFLAMMATORY FACIAL DERMATOSES",
      "SUSCEPTIBLE BACTERIAL INFECTIONS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "GASTROINTESTINAL / OESOPHAGEAL IRRITATION",
        "detail": "Possible symptoms include: Nausea Abdominal discomfort Heartburn Pain on swallowing Oesophageal irritation"
      },
      {
        "title": "PHOTOSENSITIVITY",
        "detail": "Doxycycline may cause increased sensitivity to sunlight. Advise appropriate photoprotection."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Patients should seek medical attention for significant allergic reactions such as: Facial or throat swelling Difficulty breathing Severe widespread rash"
      },
      {
        "title": "INTRACRANIAL HYPERTENSION",
        "detail": "Rarely, tetracycline-class medicines may be associated with intracranial hypertension. Symptoms requiring medical assessment may include: Persistent or severe headache Visual disturbances Other concerning neurological symptoms"
      },
      {
        "title": "PREGNANCY & CHILDREN",
        "detail": "Tetracyclines have important age- and pregnancy-related considerations. Management Considerations Doxycycline should be prescribed according to current approved product information and clinical guidance, particularly in: Pregnancy Breastfeeding Young children"
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO TAKE LIXOCLIN-LB",
        "answer": "\"Take the medicine exactly as prescribed, with adequate water, and avoid taking it immediately before lying down.\""
      },
      {
        "question": "SUN PROTECTION",
        "answer": "\"Protect your skin from excessive sunlight while taking doxycycline, particularly if you spend substantial time outdoors.\""
      },
      {
        "question": "ANTACIDS & MINERAL SUPPLEMENTS",
        "answer": "\"Tell your doctor or pharmacist if you take iron, calcium, magnesium, aluminium-containing products or mineral supplements.\""
      },
      {
        "question": "DO NOT SELF-EXTEND ANTIBIOTIC THERAPY",
        "answer": "\"Do not continue doxycycline beyond the prescribed treatment period without medical review.\""
      },
      {
        "question": "REPORT CONCERNING SYMPTOMS",
        "answer": "Patients should seek medical attention for: Severe allergic reaction Significant or persistent diarrhoea Severe headache with visual disturbance Difficulty or pain while swallowing Severe skin reaction Significant photosensitivity reaction"
      }
    ],
    "clinicalPearl": "LIXOCLIN-LB combines doxycycline 100 mg with Lactic Acid Bacillus 5 Million Spores. Its dermatological value is centred on appropriate doxycycline use in selected bacterial and inflammatory conditions, with diagnosis, indication-specific dosing, treatment duration, administration technique and antimicrobial stewardship remaining central to safe prescribing.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      },
      {
        "name": "ROMITIZ-500",
        "generic": "Azithromycin 500 mg Tablet",
        "slug": "romitiz-500"
      }
    ],
    "references": [
      "Current approved LIXOCLIN-LB product information and package insert — primary source for indications, dosage, contraindications, warnings, precautions, interactions and adverse effects.",
      "Current doxycycline prescribing information.",
      "Current clinical guidelines for acne and other relevant dermatological conditions.",
      "Current antimicrobial stewardship guidance.",
      "Current clinical guidance regarding tetracycline-class antibacterial use."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ACNE VS ROSACEA",
        "clinicalClues": [
          "Acne:",
          "Comedones",
          "Papules",
          "Pustules",
          "Nodules",
          "Rosacea:",
          "Central facial erythema",
          "Flushing",
          "Papules and pustules",
          "Telangiectatic features in some patients"
        ],
        "typicalAppearance": "Acne commonly includes comedonal lesions, whereas rosacea typically centres on the central face and background erythema.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Presence of comedones",
          "Flushing history",
          "Trigger factors",
          "Age at onset"
        ],
        "managementApproach": [
          "Select treatment according to the underlying diagnosis."
        ],
        "clinicalPearl": "The presence or absence of comedones is often an important diagnostic clue when distinguishing acne from rosacea."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Burning or itching",
          "Possible association with shaving, occlusion or sweating"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Consider:",
          "Bacterial folliculitis",
          "Malassezia folliculitis",
          "Pseudofolliculitis",
          "Acne"
        ],
        "managementApproach": [
          "Treatment should be directed toward the identified cause."
        ],
        "clinicalPearl": "Monomorphic follicular lesions may suggest folliculitis rather than conventional acne."
      },
      {
        "id": "diff-3",
        "condition": "FUNGAL / MALASSEZIA-ASSOCIATED FOLLICULAR DISEASE",
        "clinicalClues": [
          "Monomorphic papules and pustules",
          "Pruritus",
          "Truncal or facial involvement",
          "Association with heat or occlusion"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Consider fungal causes when lesions are atypical for acne or do not respond as expected to antibacterial therapy."
        ],
        "managementApproach": [
          "Antibacterial therapy does not treat fungal organisms."
        ],
        "clinicalPearl": "Worsening or non-response during prolonged antibacterial treatment should prompt reconsideration of the diagnosis when the clinical pattern is atypical."
      },
      {
        "id": "diff-4",
        "condition": "PERIORAL DERMATITIS",
        "clinicalClues": [
          "Small inflammatory papules",
          "Perioral distribution",
          "Relative sparing immediately adjacent to the vermilion border",
          "History of topical corticosteroid exposure in some patients"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Topical steroid use",
          "Cosmetics",
          "Skin-care products",
          "Distribution"
        ],
        "managementApproach": [
          "Avoid inappropriate topical corticosteroid use and select treatment according to the clinical diagnosis."
        ],
        "clinicalPearl": "A history of facial corticosteroid use can be an important clue in steroid-associated periorificial dermatitis."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "DOSING & REGIMEN",
        "keyPoints": [
          "Doxycycline dosing varies according to:",
          "Indication",
          "Disease severity",
          "Antibacterial versus anti-inflammatory treatment objective",
          "Patient characteristics",
          "Current clinical guidance"
        ],
        "details": [],
        "practicalExample": "The prescribed dose and duration should follow the approved product information and indication-specific clinical guidance. The 100 mg strength identifies the amount of doxycycline in each dosage unit; it does not independently establish the appropriate frequency or treatment duration for every dermatological condition. Management Implications Avoid applying a single dosing regimen across unrelated indications.",
        "clinicalPearl": "The same doxycycline strength can be used within different therapeutic strategies; diagnosis determines the regimen."
      },
      {
        "title": "HOW SHOULD THE DOSAGE UNIT BE TAKEN?",
        "keyPoints": [
          "Doxycycline can cause oesophageal irritation if taken improperly."
        ],
        "details": [],
        "practicalExample": "Patients should generally: Take the medicine with an adequate amount of water. Swallow it while upright. Avoid taking it immediately before lying down. Follow the specific approved product instructions regarding food and administration. A patient takes the dose with sufficient water and remains upright rather than taking it immediately before bedtime. Management Implications Good administration technique can reduce the risk of oesophageal irritation.",
        "clinicalPearl": "Administration technique is an important part of doxycycline counselling."
      },
      {
        "title": "DURATION OF THERAPY",
        "keyPoints": [
          "Duration depends on the indication and treatment response."
        ],
        "details": [],
        "practicalExample": "Acne therapy and treatment of an acute bacterial infection may require different treatment durations. Management Implications For acne and other chronic inflammatory dermatological conditions, reassess treatment response periodically rather than continuing antibiotic therapy indefinitely.",
        "clinicalPearl": "Oral antibiotic therapy should have a defined therapeutic objective and periodic review."
      },
      {
        "title": "CONCOMITANT TOPICAL THERAPY IN ACNE",
        "keyPoints": [
          "When oral doxycycline is used for inflammatory acne, appropriate topical treatment can help:",
          "Improve overall disease control",
          "Address comedonal disease",
          "Reduce dependence on prolonged systemic antibiotic therapy",
          "Support maintenance after systemic therapy"
        ],
        "details": [],
        "practicalExample": "An oral antibiotic may be incorporated into a broader acne regimen containing suitable topical agents. Management Implications Avoid oral antibiotic monotherapy where a combination strategy is clinically appropriate.",
        "clinicalPearl": "The role of oral doxycycline in acne is usually part of a broader treatment plan rather than a standalone long-term strategy."
      },
      {
        "title": "PHOTOSENSITIVITY",
        "keyPoints": [
          "Doxycycline may increase sensitivity to sunlight in susceptible individuals."
        ],
        "details": [],
        "practicalExample": "Patients should be counselled regarding: Sun protection Avoidance of excessive direct sunlight Appropriate protective clothing Use of suitable sunscreen A patient receiving doxycycline for acne continues normal outdoor activity but adopts appropriate photoprotection. Management Implications Counselling is particularly relevant for patients with significant outdoor exposure.",
        "clinicalPearl": "Photoprotection should be part of routine doxycycline counselling."
      },
      {
        "title": "LACTIC ACID BACILLUS COMPONENT",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "FORMULATION SUPPORT",
        "keyPoints": [
          "LIXOCLIN-LB contains Lactic Acid Bacillus 5 Million Spores alongside doxycycline.",
          "Clinical Role",
          "The component is included as a supportive gastrointestinal/probiotic component.",
          "Management Implications",
          "Its presence should not be interpreted as eliminating the possibility of antibiotic-associated gastrointestinal adverse effects."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "The probiotic component is supportive; it does not replace appropriate antibiotic prescribing or patient monitoring."
      },
      {
        "title": "ANTIBIOTIC-ASSOCIATED GASTROINTESTINAL SYMPTOMS",
        "keyPoints": [
          "Patients receiving antibiotics may experience:",
          "Nausea",
          "Abdominal discomfort",
          "Loose stools",
          "Diarrhoea",
          "Management Considerations",
          "Significant, persistent or severe diarrhoea requires medical assessment."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Severe or persistent diarrhoea during or after antibiotic treatment should not automatically be attributed to a harmless medication effect."
      },
      {
        "title": "DRUG & ADMINISTRATION CONSIDERATIONS",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "MINERALS AND ANTACIDS",
        "keyPoints": [
          "Doxycycline absorption can be reduced by interaction with certain polyvalent cations.",
          "Relevant products may include preparations containing:",
          "Calcium",
          "Magnesium",
          "Aluminium",
          "Iron",
          "Management Considerations",
          "Review concomitant medicines and supplements and follow product-specific administration instructions regarding separation."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Ask specifically about antacids, iron supplements and mineral-containing products when evaluating reduced response."
      },
      {
        "title": "RETINOIDS",
        "keyPoints": [
          "Concomitant use of tetracyclines with systemic retinoids can increase the risk of intracranial hypertension.",
          "Management Considerations",
          "Review acne medications carefully before prescribing."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Medication reconciliation is particularly important in patients receiving multiple systemic acne therapies."
      },
      {
        "title": "ANTICOAGULANTS AND OTHER MEDICATIONS",
        "keyPoints": [
          "Doxycycline may interact with certain concomitant medicines.",
          "Management Considerations",
          "Review the patient's complete medication list where appropriate."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "A complete medication history should include prescription medicines, over-the-counter products and supplements."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "INFLAMMATORY ACNE WITH SCARRING RISK",
        "keyPoints": [
          "Assess:",
          "Inflammatory lesion burden",
          "Nodules",
          "Disease duration",
          "Previous treatment",
          "Existing scars",
          "Psychosocial impact"
        ],
        "details": [],
        "practicalExample": "Consider a structured acne treatment plan with appropriate topical and systemic options.",
        "clinicalPearl": "Early control of significant inflammatory acne is important when reducing the risk of permanent scarring is a treatment objective."
      },
      {
        "title": "LONG-TERM DERMATOLOGICAL USE",
        "keyPoints": [
          "Longer treatment courses require periodic reassessment."
        ],
        "details": [],
        "practicalExample": "Evaluate: Clinical response Adverse effects Ongoing indication Need for treatment modification Antibiotic stewardship considerations",
        "clinicalPearl": "Systemic antibiotic therapy should not become an open-ended maintenance strategy."
      },
      {
        "title": "PATIENTS WITH HIGH SUN EXPOSURE",
        "keyPoints": [
          "Outdoor workers, athletes and individuals with frequent sun exposure may require additional counselling."
        ],
        "details": [],
        "practicalExample": "Emphasise appropriate photoprotection.",
        "clinicalPearl": "Anticipatory counselling can improve adherence and reduce avoidable treatment-related photosensitivity problems. LIXOCLIN-LB combines doxycycline 100 mg with Lactic Acid Bacillus 5 Million Spores. Its dermatological value is centred on appropriate doxycycline use in selected bacterial and inflammatory conditions, with diagnosis, indication-specific dosing, treatment duration, administration technique and antimicrobial stewardship remaining central to safe prescribing."
      }
    ]
  },
  {
    "id": "luliprix",
    "slug": "luliprix",
    "brandName": "LULIPRIX Cream",
    "genericName": "Luliconazole 1% w/w Cream",
    "tagline": "Topical Imidazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Topical",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Cream",
    "strength": "1%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Superficial fungal infections of the skin",
    "composition": [
      "Each gram of cream contains:",
      "Luliconazole IP 1% w/w",
      "Cream base: q.s."
    ],
    "therapeuticCategory": "IMIDAZOLE ANTIFUNGAL • TOPICAL • SUPERFICIAL FUNGAL INFECTION • PRESCRIPTION MEDICINE",
    "pharmacologicalClass": "Imidazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "LULICONAZOLE 1%Inhibits fungal lanosterol demethylase (CYP51)↓ERGOSTEROL SYNTHESIS ↓Abnormal sterol accumulation + reduced membrane sterol↓FUNGAL MEMBRANE FUNCTION DISRUPTEDFungal growth inhibited"
      }
    ],
    "indications": [
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Luliconazole 1% w/w Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Topical antifungal treatment may occasionally produce local: Burning Stinging Redness Irritation Itching Management Implications Persistent or severe irritation should prompt clinical review."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Hypersensitivity reactions are uncommon but clinically important. Management Implications Discontinue and seek medical assessment if significant hypersensitivity is suspected."
      },
      {
        "title": "EXTERNAL USE",
        "detail": "LULIPRIX is intended for topical application. Management Implications Avoid contact with: Eyes Mouth Other mucosal surfaces unless specifically directed by a healthcare professional."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "CLEAN AND DRY",
        "answer": "\"Clean and gently dry the affected area before applying the cream.\""
      },
      {
        "question": "APPLY A THIN LAYER",
        "answer": "\"Apply a thin, even layer over the affected area as prescribed. Do not apply excessive amounts.\""
      },
      {
        "question": "WASH HANDS",
        "answer": "\"Wash your hands before and after applying the cream, unless your hands are the area being treated.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Use the cream for the full prescribed duration, even if itching improves earlier.\""
      },
      {
        "question": "KEEP THE AREA DRY",
        "answer": "\"Keep affected areas clean and dry, particularly skin folds and the spaces between the toes.\""
      },
      {
        "question": "AVOID SHARING PERSONAL ITEMS",
        "answer": "\"Avoid sharing towels, clothing, footwear or other personal items that may contribute to fungal transmission.\""
      },
      {
        "question": "REPORT PERSISTENT OR WORSENING LESIONS",
        "answer": "\"Contact your doctor if the infection does not improve, becomes worse, spreads or repeatedly returns.\""
      }
    ],
    "clinicalPearl": "LULIPRIX provides luliconazole 1% w/w as a topical imidazole antifungal for appropriately diagnosed superficial fungal infections. Optimal outcomes depend on accurate diagnosis, adequate application, treatment adherence and attention to reinfection factors. Persistent or atypical disease should prompt diagnostic reassessment rather than prolonged empirical treatment.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved LULIPRIX product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for luliconazole 1% w/w topical preparations.",
      "Relevant dermatology guidance concerning superficial dermatophyte infections.",
      "Relevant literature concerning luliconazole pharmacology, mechanism of action and topical antifungal activity.",
      "Current prescribing information concerning topical luliconazole safety, precautions and adverse effects."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "DERMATOPHYTOSIS VS ECZEMA",
        "clinicalClues": [
          "Dermatophytosis:",
          "Annular morphology",
          "Advancing border",
          "Peripheral scale",
          "Eczema:",
          "Diffuse inflammation",
          "Variable scaling",
          "Less characteristic peripheral border"
        ],
        "typicalAppearance": "Dermatophyte infection often demonstrates an active peripheral edge, whereas eczema can be more diffusely inflamed.",
        "diagnosticApproach": [
          "KOH microscopy may help when clinical differentiation is uncertain."
        ],
        "managementApproach": [
          "Avoid prolonged corticosteroid monotherapy when dermatophytosis remains in the differential."
        ],
        "clinicalPearl": "An expanding scaly border should raise suspicion for dermatophytosis before corticosteroid therapy is initiated."
      },
      {
        "id": "diff-2",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when a presumed fungal lesion has received topical corticosteroids.",
          "Look for:",
          "Atypical morphology",
          "Progressive spread",
          "Reduced border definition",
          "Recurrence after corticosteroid withdrawal"
        ],
        "typicalAppearance": "The typical annular morphology may become less apparent, with more diffuse inflammation.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may be useful."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Topical corticosteroids can suppress inflammation without eliminating the underlying dermatophyte infection."
      },
      {
        "id": "diff-3",
        "condition": "CANDIDIASIS",
        "clinicalClues": [
          "Consider when there is:",
          "Moist erythema",
          "Maceration",
          "Satellite papules or pustules",
          "Intertriginous involvement"
        ],
        "typicalAppearance": "Bright erythematous moist plaques, often with peripheral satellite lesions.",
        "diagnosticApproach": [
          "KOH examination can assist where the diagnosis is uncertain."
        ],
        "managementApproach": [
          "Identify predisposing factors such as moisture, occlusion and metabolic disease where clinically relevant."
        ],
        "clinicalPearl": "Satellite lesions around a moist erythematous plaque should prompt consideration of candidal infection."
      },
      {
        "id": "diff-4",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Chronic or recurrent lesions",
          "Well-demarcated plaques",
          "Scalp involvement",
          "Extensor distribution",
          "Nail changes"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine characteristic sites and consider the patient's broader dermatological history."
        ],
        "managementApproach": [
          "Antifungal treatment alone is not appropriate when psoriasis is the underlying diagnosis."
        ],
        "clinicalPearl": "Distribution, chronicity and associated nail or scalp findings can help distinguish psoriasis from superficial fungal infection."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Temporal relationship with an exposure",
          "Burning or pruritus",
          "Sharp exposure-related distribution",
          "Recurrent symptoms with re-exposure"
        ],
        "typicalAppearance": "Erythematous, eczematous or vesicular plaques depending on the phase.",
        "diagnosticApproach": [
          "Detailed exposure history is important."
        ],
        "managementApproach": [
          "Identify and avoid the causative irritant or allergen."
        ],
        "clinicalPearl": "A lesion that corresponds closely to an exposure pattern should broaden the differential beyond fungal infection."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL INTERTRIGO / INFECTION",
        "clinicalClues": [
          "Pain",
          "Purulence",
          "Marked tenderness",
          "Rapid progression",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Erosions, crusting, marked erythema or purulent discharge.",
        "diagnosticApproach": [
          "Clinical assessment with microbiological testing when indicated."
        ],
        "managementApproach": [
          "Use appropriate antibacterial treatment when bacterial infection is suspected."
        ],
        "clinicalPearl": "Rapid progression, significant pain or purulence is atypical for uncomplicated dermatophytosis and warrants reassessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW TO APPLY LULIPRIX",
        "keyPoints": [
          "Topical application should cover:",
          "The affected lesion",
          "The clinically relevant surrounding skin according to the approved instructions"
        ],
        "details": [],
        "practicalExample": "Apply a thin, even layer to clean, dry skin according to the current approved product instructions. Avoid excessive application. Wash hands before and after application unless the hands themselves are being treated. For an annular lesion on the trunk, apply the cream evenly over the affected area and the surrounding clinically relevant margin as directed. Management Implications Correct application technique can improve treatment consistency and reduce the risk of incomplete treatment.",
        "clinicalPearl": "Consistency of application is often as important as the choice of topical antifungal."
      },
      {
        "title": "TINEA CORPORIS",
        "keyPoints": [
          "Localized dermatophyte infection",
          "Annular plaques",
          "Active peripheral scaling"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer according to the approved dosing schedule and treatment duration. A patient with localized tinea corporis can apply the prescribed amount evenly across the affected area after gently cleansing and drying the skin. Management Implications Monitor for reduction in: Peripheral scale Erythema Pruritus Lesion expansion",
        "clinicalPearl": "Clinical improvement should be assessed by reduction in active fungal features rather than itch relief alone."
      },
      {
        "title": "TINEA CRURIS",
        "keyPoints": [
          "Treat affected groin skin",
          "Keep the area dry",
          "Address contributing moisture and occlusion"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer according to the approved regimen. After bathing, dry the groin thoroughly before applying the prescribed cream. Management Implications Evaluate concurrent tinea pedis or onychomycosis in recurrent disease.",
        "clinicalPearl": "Moisture control and treatment of fungal reservoirs can be important in preventing recurrence."
      },
      {
        "title": "TINEA PEDIS",
        "keyPoints": [
          "Interdigital disease may be macerated",
          "Drying the feet is important",
          "Footwear can contribute to persistence"
        ],
        "details": [],
        "practicalExample": "Apply as prescribed to the affected areas after thoroughly drying the feet. After washing the feet, carefully dry between the toes before applying the prescribed antifungal. Management Implications Consider: Foot hygiene Moisture control Appropriate footwear Concurrent nail infection",
        "clinicalPearl": "A topical antifungal is less likely to succeed when the treated environment remains persistently moist."
      },
      {
        "title": "ADHERENCE",
        "keyPoints": [
          "Treatment should be used consistently for the prescribed duration."
        ],
        "details": [],
        "practicalExample": "Do not independently increase the amount or frequency if symptoms persist. If itching improves rapidly but scaling remains, continue treatment according to the prescribed regimen rather than stopping solely because symptoms have improved. Management Implications Premature discontinuation can contribute to incomplete treatment.",
        "clinicalPearl": "Symptomatic improvement may occur before complete resolution of the underlying fungal infection."
      },
      {
        "title": "INADEQUATE RESPONSE",
        "keyPoints": [
          "If there is inadequate improvement, consider:",
          "Incorrect diagnosis",
          "Incorrect application",
          "Poor adherence",
          "Reinfection",
          "Extensive disease",
          "Alternative organism",
          "Resistant infection"
        ],
        "details": [],
        "practicalExample": "Do not automatically increase application frequency without clinical reassessment. A persistent annular plaque despite appropriate topical treatment should prompt reassessment rather than indefinite continuation of the same therapy. Management Implications Consider mycological testing and evaluation for alternative diagnoses.",
        "clinicalPearl": "Treatment failure is often a diagnostic clue rather than simply a reason to use more cream."
      },
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Consider systemic therapy when:",
          "Disease is extensive",
          "Infection involves hair",
          "Infection involves nails",
          "Topical therapy is impractical",
          "Disease is recurrent or refractory"
        ],
        "details": [],
        "practicalExample": "LULIPRIX is a topical formulation and should not be used as a substitute for systemic treatment when systemic therapy is clinically indicated. A patient with extensive tinea corporis involving multiple body sites may require assessment for systemic treatment rather than prolonged topical therapy alone. Management Implications Treatment route should be determined by site, extent and clinical response.",
        "clinicalPearl": "Topical therapy is not a substitute for systemic therapy when infection extends beyond the practical reach of topical treatment. MANAGEMENT PRINCIPLES"
      },
      {
        "title": "CONFIRM THE CLINICAL DIAGNOSIS",
        "keyPoints": [],
        "details": [
          "The more atypical or treatment-refractory the presentation, the greater the value of diagnostic confirmation."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "SELECT TOPICAL VS SYSTEMIC THERAPY",
        "keyPoints": [],
        "details": [
          "Topical - Localized and limited body surface",
          "Systemic - Disease is extensive, recurrent and infection involves hair or nails"
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "APPLY TO THE ENTIRE RELEVANT AREA",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ADDRESS REINFECTION",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "AVOID INAPPROPRIATE STEROID COMBINATIONS",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "INTERTRIGINOUS AREAS",
        "keyPoints": [
          "Moisture",
          "Occlusion",
          "Friction",
          "Increased risk of maceration",
          "Typical Clinical Appearance",
          "Erythematous plaques with scaling, maceration or fissuring."
        ],
        "details": [],
        "practicalExample": "Combine appropriate antifungal treatment with moisture and friction control.",
        "clinicalPearl": "Environmental control can be an important adjunct to antifungal therapy in intertriginous disease."
      },
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Repeated episodes should prompt evaluation for:",
          "Onychomycosis",
          "Tinea pedis",
          "Household transmission",
          "Inadequate previous treatment",
          "Reinfection",
          "Typical Clinical Appearance",
          "Repeated annular or scaly lesions at similar or different sites."
        ],
        "details": [],
        "practicalExample": "Identify and address potential reservoirs.",
        "clinicalPearl": "Recurrent infection should trigger a search for the reason it keeps returning."
      },
      {
        "title": "TINEA INCOGNITO",
        "keyPoints": [
          "Prior corticosteroid treatment can alter the morphology of dermatophytosis.",
          "Typical Clinical Appearance",
          "Less sharply demarcated or unusually extensive lesions."
        ],
        "details": [],
        "practicalExample": "Reassess diagnosis and consider mycological confirmation.",
        "clinicalPearl": "When a presumed eczema-like eruption progressively expands despite corticosteroid treatment, reconsider dermatophytosis."
      },
      {
        "title": "PEDIATRIC PATIENTS",
        "keyPoints": [
          "Consider:",
          "Age",
          "Site",
          "Extent",
          "Diagnostic certainty",
          "Approved age range of the specific product"
        ],
        "details": [],
        "practicalExample": "Use according to the current approved product information and clinical assessment.",
        "clinicalPearl": "Pediatric use should always follow the age-specific recommendations of the approved product information."
      },
      {
        "title": "PREGNANCY & LACTATION",
        "keyPoints": [
          "Consider pregnancy and breastfeeding status before prescribing."
        ],
        "details": [],
        "practicalExample": "Use only when the anticipated clinical benefit and current approved product information support treatment.",
        "clinicalPearl": "Pregnancy and lactation should be specifically documented when selecting any medicinal treatment."
      }
    ]
  },
  {
    "id": "luliprix-1",
    "slug": "luliprix-1",
    "brandName": "LULIPRIX Lotion",
    "genericName": "Luliconazole 1% Lotion",
    "tagline": "Topical Imidazole Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Topical",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Lotion",
    "strength": "1%",
    "packSize": "30 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Superficial fungal infections of the skin",
    "composition": [
      "Each ml of lotion contains:",
      "Luliconazole IP 1% w/v",
      "Lotion base: q.s."
    ],
    "therapeuticCategory": "IMIDAZOLE ANTIFUNGAL • TOPICAL • SUPERFICIAL FUNGAL INFECTION • PRESCRIPTION MEDICINE",
    "pharmacologicalClass": "Imidazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "LULICONAZOLE 1%Inhibits fungal lanosterol demethylase (CYP51)↓ERGOSTEROL SYNTHESIS ↓Abnormal sterol accumulation + reduced membrane sterol↓FUNGAL MEMBRANE FUNCTION DISRUPTEDFungal growth inhibited"
      },
      {
        "step": "02",
        "title": "WHY A LOTION VEHICLE?",
        "description": "Accordion 02 — LOTION APPLICATION ADVANTAGE Key Clinical Points A lotion vehicle may offer practical advantages when treating: Larger superficial areas Hair-bearing skin Multiple lesions Areas where a cream may feel heavy or difficult to spread Typical Clinical Application The liquid vehicle can be distributed over the skin surface without requiring the thicker rubbing associated with some cream formulations. Management Implications The formulation may improve application convenience and treatment acceptability for selected patients. Clinical Pearl Vehicle selection can influence treatment adherence; a formulation that is easy to spread over the affected area may encourage consistent use."
      }
    ],
    "indications": [
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Luliconazole 1% Lotion or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible local reactions may include: Burning Stinging Redness Irritation Itching Management Implications Persistent or severe irritation warrants clinical review."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Hypersensitivity reactions are uncommon but clinically relevant. Management Implications Significant swelling, severe rash or other symptoms suggestive of hypersensitivity require prompt assessment."
      },
      {
        "title": "EXTERNAL USE",
        "detail": "LULIPRIX Lotion is intended for topical use. Management Implications Avoid contact with: Eyes Mouth Other mucosal surfaces unless specifically directed by a healthcare professional."
      },
      {
        "title": "STORAGE & HANDLING",
        "detail": "Store and handle the product according to the approved product label. Management Implications Keep the container appropriately closed when not in use and away from conditions that may compromise product quality."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "CLEAN AND DRY",
        "answer": "\"Clean and gently dry the affected area before applying the lotion.\""
      },
      {
        "question": "APPLY A THIN LAYER",
        "answer": "\"Apply a thin, even layer over the affected area as prescribed. Avoid applying excessive amounts.\""
      },
      {
        "question": "WASH HANDS",
        "answer": "\"Wash your hands before and after applying the lotion, unless your hands are the area being treated.\""
      },
      {
        "question": "KEEP THE AREA DRY",
        "answer": "\"Keep affected areas clean and dry, particularly skin folds and the spaces between the toes.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Use the lotion for the full prescribed duration, even if itching improves earlier.\""
      },
      {
        "question": "AVOID SHARING PERSONAL ITEMS",
        "answer": "\"Avoid sharing towels, clothing, footwear or other personal items that may contribute to fungal transmission.\""
      },
      {
        "question": "REPORT PERSISTENT OR WORSENING LESIONS",
        "answer": "\"Contact your doctor if the infection does not improve, becomes worse, spreads or repeatedly returns.\""
      }
    ],
    "clinicalPearl": "LULIPRIX Lotion provides luliconazole 1% as a topical imidazole antifungal for appropriately diagnosed superficial fungal infections. Its lotion vehicle can offer practical application advantages on broader or hair-bearing skin surfaces. Successful treatment depends on accurate diagnosis, adequate coverage, consistent application and attention to reinfection factors. Persistent, atypical or refractory disease should prompt diagnostic reassessment rather than prolonged empirical treatment.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved LULIPRIX Lotion product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for luliconazole topical preparations.",
      "Relevant dermatology guidance concerning superficial dermatophyte infections.",
      "Relevant literature concerning luliconazole pharmacology, mechanism of action and topical antifungal activity.",
      "Current prescribing information concerning topical luliconazole safety, precautions and adverse effects."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "DERMATOPHYTOSIS VS ECZEMA",
        "clinicalClues": [
          "Dermatophytosis:",
          "Annular morphology",
          "Advancing border",
          "Peripheral scale",
          "Eczema:",
          "Diffuse inflammation",
          "Variable scaling",
          "Less characteristic peripheral activity"
        ],
        "typicalAppearance": "Dermatophyte lesions often have a more active scaly margin, whereas eczema can be more diffusely inflamed.",
        "diagnosticApproach": [
          "KOH microscopy can help when clinical distinction is uncertain."
        ],
        "managementApproach": [
          "Avoid prolonged corticosteroid monotherapy when fungal infection remains a possibility."
        ],
        "clinicalPearl": "An expanding scaly border should raise suspicion for dermatophytosis before treating the lesion as eczema alone."
      },
      {
        "id": "diff-2",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when a presumed fungal lesion has been treated with topical corticosteroids.",
          "Look for:",
          "Atypical morphology",
          "Progressive spread",
          "Reduced border definition",
          "Recurrence following corticosteroid withdrawal"
        ],
        "typicalAppearance": "The classic annular pattern may become less obvious and more diffuse.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may be useful."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroids can suppress inflammation without eliminating the underlying fungal infection."
      },
      {
        "id": "diff-3",
        "condition": "CANDIDIASIS",
        "clinicalClues": [
          "Moist erythema",
          "Maceration",
          "Satellite papules or pustules",
          "Intertriginous distribution"
        ],
        "typicalAppearance": "Bright erythematous moist plaques with possible satellite lesions.",
        "diagnosticApproach": [
          "KOH examination may assist when the diagnosis is uncertain."
        ],
        "managementApproach": [
          "Assess contributing factors such as moisture, occlusion and relevant underlying conditions."
        ],
        "clinicalPearl": "Satellite lesions surrounding a moist erythematous plaque should prompt consideration of candidiasis."
      },
      {
        "id": "diff-4",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Chronic or recurrent lesions",
          "Well-demarcated plaques",
          "Extensor involvement",
          "Scalp disease",
          "Nail changes"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Examine characteristic sites and consider the patient's wider dermatological history."
        ],
        "managementApproach": [
          "Antifungal therapy alone is not appropriate when psoriasis is the underlying diagnosis."
        ],
        "clinicalPearl": "Distribution and associated scalp or nail findings can help distinguish psoriasis from superficial fungal infection."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Temporal relationship with exposure",
          "Burning or pruritus",
          "Exposure-related distribution",
          "Recurrence after re-exposure"
        ],
        "typicalAppearance": "Erythematous, eczematous or vesicular lesions depending on disease phase.",
        "diagnosticApproach": [
          "Detailed exposure history."
        ],
        "managementApproach": [
          "Identify and avoid the causative irritant or allergen."
        ],
        "clinicalPearl": "A lesion closely matching an exposure pattern should broaden the differential beyond fungal infection."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL INFECTION",
        "clinicalClues": [
          "Pain",
          "Purulence",
          "Marked tenderness",
          "Rapid progression",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Erosions, crusting, marked erythema or purulent discharge.",
        "diagnosticApproach": [
          "Clinical assessment with microbiological testing where indicated."
        ],
        "managementApproach": [
          "Use appropriate antibacterial management where bacterial infection is suspected."
        ],
        "clinicalPearl": "Rapid progression, significant pain or purulence is atypical for uncomplicated dermatophytosis and warrants reassessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW TO APPLY LULIPRIX LOTION",
        "keyPoints": [
          "Topical application should provide adequate coverage of:",
          "The affected skin",
          "Clinically relevant surrounding skin according to the approved product instructions"
        ],
        "details": [],
        "practicalExample": "Apply a thin, even layer of LULIPRIX Lotion to clean, dry skin according to the current approved dosing instructions. Allow the treated area to dry before covering with clothing where practical. Wash hands before and after application unless the hands are the treatment site. For multiple superficial tinea lesions over the trunk, apply the lotion evenly across each affected area and the relevant surrounding skin as directed. Management Implications The lotion vehicle may facilitate distribution over larger or hair-bearing areas.",
        "clinicalPearl": "A thin, uniform film is generally preferable to excessive application; the goal is adequate coverage, not saturation of the skin."
      },
      {
        "title": "TINEA CORPORIS",
        "keyPoints": [
          "Annular plaques",
          "Peripheral scale",
          "Active expanding border",
          "Pruritus"
        ],
        "details": [],
        "practicalExample": "Apply the prescribed amount as a thin layer according to the approved regimen. For a localized annular lesion on the trunk, apply the lotion evenly over the lesion and surrounding clinically relevant area after cleansing and drying. Management Implications Monitor for: Reduced scaling Reduced erythema Reduced pruritus Cessation of lesion expansion",
        "clinicalPearl": "Reduction of the active scaly border is a useful clinical marker of response."
      },
      {
        "title": "TINEA CRURIS",
        "keyPoints": [
          "Treat affected groin skin",
          "Maintain dryness",
          "Reduce occlusion where practical"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer according to the prescribed regimen to clean, dry skin. After bathing, gently dry the groin area before applying the prescribed lotion. Management Implications Evaluate for concurrent tinea pedis or onychomycosis if disease repeatedly returns.",
        "clinicalPearl": "Moisture control can complement antifungal therapy in intertriginous disease."
      },
      {
        "title": "TINEA PEDIS",
        "keyPoints": [
          "Interdigital disease may be macerated",
          "Feet should be thoroughly dried",
          "Footwear can contribute to persistence"
        ],
        "details": [],
        "practicalExample": "Apply as prescribed after carefully drying the affected areas, including between the toes where appropriate. After washing the feet, dry thoroughly between the toes before applying the lotion. Management Implications Consider: Foot hygiene Moisture control Appropriate footwear Concurrent nail infection",
        "clinicalPearl": "Persistent moisture can undermine treatment success even when an appropriate antifungal is being used."
      },
      {
        "title": "HAIR-BEARING AREAS",
        "keyPoints": [
          "A lotion may be practically convenient for superficial fungal infection involving hair-bearing skin because it can be distributed without the heavier feel of some creams."
        ],
        "details": [],
        "practicalExample": "Part the hair where necessary and apply enough lotion to provide an even film over the affected skin according to the approved instructions. For superficial fungal lesions on a hair-bearing limb or trunk, separate the hair as needed and distribute the lotion directly onto the affected skin. Management Implications Ensure that the medication reaches the skin rather than remaining primarily on the hair shafts.",
        "clinicalPearl": "On hair-bearing skin, the therapeutic target is the affected skin surface—not simply coating the hair."
      },
      {
        "title": "ADHERENCE",
        "keyPoints": [
          "Consistent application is important."
        ],
        "details": [],
        "practicalExample": "Follow the prescribed frequency and duration. Do not independently increase the quantity or frequency when symptoms persist. If itching improves rapidly but scaling remains, continue treatment for the prescribed duration rather than stopping immediately. Management Implications Premature discontinuation may contribute to incomplete treatment or recurrence.",
        "clinicalPearl": "Symptom relief may precede complete resolution of fungal involvement."
      },
      {
        "title": "INADEQUATE RESPONSE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Incorrect application",
          "Reinfection",
          "Extensive disease",
          "Alternative organism",
          "Resistant infection"
        ],
        "details": [],
        "practicalExample": "Do not simply increase application frequency without reassessment. A lesion that continues to expand despite appropriate use should prompt diagnostic review. Management Implications Consider mycological testing and assessment for alternative diagnoses.",
        "clinicalPearl": "Persistent disease despite correct use should prompt diagnostic reassessment rather than indefinite escalation of topical application."
      },
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Systemic therapy may need consideration when:",
          "Disease is extensive",
          "Hair is significantly involved",
          "Nails are involved",
          "Topical treatment is impractical",
          "Disease is recurrent or refractory"
        ],
        "details": [],
        "practicalExample": "LULIPRIX Lotion is a topical formulation and should not be considered a substitute for systemic therapy when systemic treatment is clinically indicated. A patient with extensive dermatophytosis involving several body sites may require assessment for systemic antifungal therapy rather than prolonged topical treatment alone. Management Implications Treatment route should be based on infection site, extent and clinical response.",
        "clinicalPearl": "Topical therapy should not be prolonged indefinitely when the clinical pattern indicates a need for systemic treatment. MANAGEMENT PRINCIPLES"
      },
      {
        "title": "CONFIRM THE DIAGNOSIS",
        "keyPoints": [],
        "details": [
          "The more atypical or treatment-refractory the presentation, the greater the value of diagnostic confirmation.",
          "ASSESS EXTENT BEFORE CHOOSING TOPICAL THERAPY"
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ENSURE ADEQUATE COVERAGE",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ADDRESS REINFECTION",
        "keyPoints": [],
        "details": [
          "AVOID UNNECESSARY CORTICOSTEROID COMBINATIONS"
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "INTERTRIGINOUS AREAS",
        "keyPoints": [
          "Moisture",
          "Occlusion",
          "Friction",
          "Maceration",
          "Typical Clinical Appearance",
          "Erythematous plaques with scaling, maceration or fissuring."
        ],
        "details": [],
        "practicalExample": "Combine appropriate antifungal treatment with measures to reduce moisture and friction.",
        "clinicalPearl": "Environmental management can improve the conditions in which topical antifungal treatment is expected to work."
      },
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Repeated episodes should prompt evaluation for:",
          "Onychomycosis",
          "Tinea pedis",
          "Household transmission",
          "Reinfection",
          "Inadequate previous treatment",
          "Typical Clinical Appearance",
          "Recurring annular or scaly plaques."
        ],
        "details": [],
        "practicalExample": "Identify and address potential reservoirs.",
        "clinicalPearl": "Repeated recurrence should prompt investigation into why the infection is returning."
      },
      {
        "title": "TINEA INCOGNITO",
        "keyPoints": [
          "Prior corticosteroid treatment may alter the appearance of dermatophytosis.",
          "Typical Clinical Appearance",
          "Less sharply defined, more extensive or atypical lesions."
        ],
        "details": [],
        "practicalExample": "Reassess diagnosis and consider mycological confirmation.",
        "clinicalPearl": "An eczema-like eruption that progressively expands despite corticosteroid treatment should prompt reconsideration of dermatophytosis."
      },
      {
        "title": "PEDIATRIC PATIENTS",
        "keyPoints": [
          "Consider:",
          "Age",
          "Site",
          "Extent",
          "Diagnostic certainty",
          "Approved age range for the specific product"
        ],
        "details": [],
        "practicalExample": "Use only according to current approved product information and clinical assessment.",
        "clinicalPearl": "Pediatric use should follow the age-specific recommendations of the approved product information."
      },
      {
        "title": "PREGNANCY & LACTATION",
        "keyPoints": [
          "Pregnancy and breastfeeding status should be considered before treatment."
        ],
        "details": [],
        "practicalExample": "Use according to current product information and an appropriate clinical risk-benefit assessment.",
        "clinicalPearl": "Pregnancy and lactation should be specifically considered when selecting any medicinal treatment."
      }
    ]
  },
  {
    "id": "miteclin",
    "slug": "miteclin",
    "brandName": "MITECLIN",
    "genericName": "Permethrin 5% w/w Cream",
    "tagline": "Topical Scabicidal Therapy for Scabies",
    "therapeuticArea": "Anti-Parasitic",
    "route": "Topical",
    "routeSubcategory": "Anti-Parasitic",
    "dosageForm": "Cream",
    "strength": "5% w/w",
    "packSize": "50 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of anti-parasitic disorders.",
    "composition": [
      "Each 100 g contains:",
      "Permethrin — 5% w/w",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Synthetic Pyrethroid • Topical • Scabicidal Therapy • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological anti-parasitic therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Permethrin Acts on voltage-sensitive sodium channels in susceptible arthropods Prolonged neuronal depolarization (Paralysis) Death of susceptible mites"
      }
    ],
    "indications": [
      "CLASSIC SCABIES",
      "BURROWS",
      "NODULAR SCABIES",
      "CRUSTED SCABIES"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Permethrin 5% w/w Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion — EXTERNAL USE",
        "detail": "MITECLIN is intended for external topical use. Avoid: Eye contact Mucosal contact Ingestion If accidental eye exposure occurs, rinse thoroughly with water and seek appropriate medical advice if irritation persists."
      },
      {
        "title": "Accordion — SKIN IRRITATION",
        "detail": "Transient: Burning Stinging Itching Redness may occur after topical application."
      },
      {
        "title": "Accordion — ALLERGIC REACTION",
        "detail": "Discontinue use and seek medical evaluation if significant hypersensitivity or severe skin reaction develops."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "APPLY TO THE WHOLE REQUIRED AREA",
        "answer": "Patient Education \"Do not apply only to the itchy spots. Apply the cream over all areas specified in the treatment instructions.\""
      },
      {
        "question": "PAY ATTENTION TO FINGER WEBS",
        "answer": "Patient Education \"Make sure the cream reaches between the fingers, around the nails and other commonly affected areas.\""
      },
      {
        "question": "TREAT CLOSE CONTACTS",
        "answer": "Patient Education \"Tell your doctor about household members or close contacts who may have been exposed.\""
      },
      {
        "question": "DO NOT REPEAT AUTOMATICALLY FOR ITCHING",
        "answer": "Patient Education \"Itching can continue for some time after successful treatment. Contact your doctor if new burrows, new lesions or worsening symptoms appear.\""
      },
      {
        "question": "FOLLOW ENVIRONMENTAL INSTRUCTIONS",
        "answer": "Patient Education \"Follow the recommended instructions for recently used clothing, towels and bedding.\""
      },
      {
        "question": "WHEN TO SEEK MEDICAL REVIEW",
        "answer": "Seek medical review if: New burrows develop New lesions continue to appear Symptoms worsen Extensive crusting develops There is pus or increasing pain Household transmission continues Treatment appears unsuccessful"
      }
    ],
    "clinicalPearl": "Effective scabies management is a complete strategy: accurate diagnosis + correct permethrin application + appropriate contact management + appropriate environmental measures + reassessment of persistent symptoms.",
    "relatedProducts": [
      {
        "name": "MITECLIN",
        "generic": "Permethrin 1% Soap",
        "slug": "miteclin-1"
      }
    ],
    "references": [
      "Current approved MITECLIN product information and package insert — primary source for final product-specific directions, indications, contraindications, warnings, precautions and storage.",
      "Current clinical guidance on the diagnosis and management of scabies.",
      "Current dermatology and public-health guidance concerning management of household and close contacts.",
      "Relevant current guidance concerning crusted scabies and management of patients with extensive or atypical disease."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Erythema",
          "Scaling",
          "Pruritus",
          "Recurrent episodes",
          "Possible history of atopy"
        ],
        "typicalAppearance": "Eczematous plaques may show: Erythema Scaling Excoriation Lichenification",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Chronicity",
          "Contact history",
          "Household symptoms",
          "Nocturnal predominance"
        ],
        "managementApproach": [
          "Consider scabies when pruritus is intense, nocturnal or associated with affected contacts."
        ],
        "clinicalPearl": "Scabies can mimic eczema, and persistent unexplained pruritus should prompt reconsideration of the diagnosis."
      },
      {
        "id": "diff-2",
        "condition": "ALLERGIC / IRRITANT CONTACT DERMATITIS",
        "clinicalClues": [
          "Exposure-related symptoms",
          "Burning or itching",
          "Localised distribution",
          "Clear relationship to an external product or material"
        ],
        "typicalAppearance": "Erythematous, scaly or vesicular dermatitis corresponding to exposure.",
        "diagnosticApproach": [
          "Review:",
          "Cosmetics",
          "Detergents",
          "Occupational exposures",
          "Metals",
          "Topical medicines"
        ],
        "managementApproach": [
          "Identify and remove the responsible exposure."
        ],
        "clinicalPearl": "A sharply exposure-related distribution may favour contact dermatitis over scabies."
      },
      {
        "id": "diff-3",
        "condition": "ATOPIC DERMATITIS",
        "clinicalClues": [
          "Chronic or relapsing course",
          "Atopic history",
          "Xerosis",
          "Flexural involvement",
          "Family history of atopy"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess overall disease pattern rather than isolated lesions."
        ],
        "managementApproach": [
          "If scabies is suspected, examine characteristic sites and ask about affected household members."
        ],
        "clinicalPearl": "Scabies may coexist with or aggravate pre-existing eczema."
      },
      {
        "id": "diff-4",
        "condition": "PEDICULOSIS",
        "clinicalClues": [
          "Intense pruritus",
          "Visible lice or nits",
          "Site-specific distribution",
          "Household or close-contact exposure"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Look for lice or viable nits and assess characteristic anatomical distribution."
        ],
        "managementApproach": [
          "Treatment should target the identified ectoparasite."
        ],
        "clinicalPearl": "Direct identification of the causative parasite can distinguish pediculosis from scabies."
      },
      {
        "id": "diff-5",
        "condition": "PAPULAR URTICARIA / INSECT BITES",
        "clinicalClues": [
          "Discrete pruritic papules",
          "Grouped lesions",
          "Exposure to insects",
          "Lesions concentrated on exposed areas"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess environmental exposure and lesion distribution."
        ],
        "managementApproach": [
          "Environmental assessment may be important."
        ],
        "clinicalPearl": "Exposed-area clustering and an identifiable environmental source may favour insect bites over scabies."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW SHOULD MITECLIN BE APPLIED?",
        "keyPoints": [
          "Permethrin 5% cream is generally applied as a thin, even layer over the entire body surface according to the approved product instructions.",
          "For many standard adult regimens, application includes the skin from the neck downward, with particular attention to:",
          "Finger webs",
          "Under fingernails",
          "Wrists",
          "Axillae",
          "Waist",
          "Groin",
          "Buttocks",
          "Genital area",
          "Other affected or characteristic sites"
        ],
        "details": [],
        "practicalExample": "Apply enough cream to adequately cover the required skin surface. The quantity needed varies with: Age Body size Body surface area Extent of application An adult should carefully apply the cream to all required areas rather than applying it only to visible lesions. Management Implications Incomplete application is a common practical reason for apparent treatment failure.",
        "clinicalPearl": "Treat the skin surface, not just the visible rash."
      },
      {
        "title": "APPLICATION TO HANDS AND FINGER WEBS",
        "keyPoints": [
          "Scabies commonly affects:",
          "Finger webs",
          "Sides of fingers",
          "Wrists",
          "Hands"
        ],
        "details": [],
        "practicalExample": "Ensure complete coverage of the required areas, including finger webs and around the nails. A patient applying cream only to the palms or obvious itchy areas may leave untreated skin between the fingers. Management Implications Missed anatomical sites may contribute to persistent infestation.",
        "clinicalPearl": "Finger webs and periungual areas deserve deliberate attention during application."
      },
      {
        "title": "LEAVE-ON CONTACT TIME",
        "keyPoints": [
          "Permethrin treatment generally requires a defined contact period before washing off."
        ],
        "details": [],
        "practicalExample": "Follow the current approved product instructions for the required contact duration. The patient applies the cream as instructed, maintains the required contact period and then washes it off as directed. Management Implications Insufficient contact time may compromise treatment effectiveness.",
        "clinicalPearl": "Application technique and adequate contact time are as important as selecting the correct scabicide."
      },
      {
        "title": "HAND WASHING DURING THE APPLICATION PERIOD",
        "keyPoints": [
          "If treated hands are washed during the recommended contact period, the cream may need to be reapplied to the washed areas according to the product instructions."
        ],
        "details": [],
        "practicalExample": "A patient applies the cream at night and subsequently washes their hands. Management Implications The hands should not remain unintentionally untreated after washing.",
        "clinicalPearl": "Repeated hand washing can remove topical treatment from one of the common sites of infestation."
      },
      {
        "title": "REPEAT TREATMENT",
        "keyPoints": [
          "A repeat application may be recommended depending on:",
          "Product instructions",
          "Clinical response",
          "Ongoing infestation",
          "Re-exposure",
          "Household transmission"
        ],
        "details": [],
        "practicalExample": "If symptoms or clinical findings persist, reassess the diagnosis, treatment technique and exposure history before automatically repeating therapy. Management Implications Repeated treatment should be clinically justified.",
        "clinicalPearl": "Persistent symptoms alone should not automatically trigger repeated scabicide applications."
      },
      {
        "title": "POST-SCABIES PRURITUS",
        "keyPoints": [
          "Pruritus can persist after successful eradication of mites because of a continued hypersensitivity or inflammatory response."
        ],
        "details": [],
        "practicalExample": "Do not automatically reapply permethrin solely because itching persists. A patient has completed appropriate treatment and no new burrows or lesions are appearing, but itching continues. Management Implications Assess for: New lesions New burrows Active infestation Re-exposure Secondary infection Symptomatic treatment may be considered where appropriate.",
        "clinicalPearl": "Itching may outlast the infestation; the appearance of new lesions is more informative than itch alone when assessing treatment response."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Incomplete body coverage",
          "Inadequate contact time",
          "Failure to treat close contacts",
          "Re-exposure",
          "Inappropriate repeat treatment",
          "Crusted scabies",
          "Possible treatment resistance where clinically relevant"
        ],
        "details": [],
        "practicalExample": "A patient reports persistent itching after treatment but has not treated household contacts. Management Implications Reassess: Diagnosis Application technique Contact treatment Environmental measures New lesions or burrows Need for specialist assessment",
        "clinicalPearl": "Before calling treatment unsuccessful, determine whether the patient was adequately treated and whether reinfestation occurred. CONTACT MANAGEMENT"
      },
      {
        "title": "HOUSEHOLD CONTACTS",
        "keyPoints": [],
        "details": [
          "Treating one symptomatic individual while leaving untreated close contacts can contribute to recurrent infestation."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ASYMPTOMATIC CONTACTS",
        "keyPoints": [],
        "details": [
          "Absence of itching does not necessarily exclude early infestation in a close contact.",
          "ENVIRONMENTAL MANAGEMENT"
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "PERSONAL ITEMS, CLOTHING & BED LINEN",
        "keyPoints": [],
        "details": [
          "Washing",
          "Drying",
          "Heat treatment where appropriate",
          "Isolation of items that cannot be washed"
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "INFANTS AND YOUNG CHILDREN",
        "keyPoints": [
          "Scabies may involve areas that are less typical in adults, including:",
          "Scalp",
          "Face",
          "Palms",
          "Soles",
          "Typical Clinical Appearance",
          "Children may present with:",
          "Papules",
          "Vesicles",
          "Crusting",
          "Diffuse pruritus"
        ],
        "details": [],
        "practicalExample": "Use an age-appropriate treatment regimen according to approved product information and clinical guidance.",
        "clinicalPearl": "Scabies distribution can differ substantially between young children and adults."
      },
      {
        "title": "OLDER ADULTS",
        "keyPoints": [
          "Presentation may be atypical, particularly in individuals with:",
          "Frailty",
          "Institutional exposure",
          "Multiple comorbidities"
        ],
        "details": [],
        "practicalExample": "Assess contacts and living environment carefully.",
        "clinicalPearl": "In institutional or communal settings, prompt recognition and coordinated contact management are particularly important."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENTS",
        "keyPoints": [
          "Consider:",
          "Extensive disease",
          "Atypical presentation",
          "Crusting",
          "Higher mite burden"
        ],
        "details": [],
        "practicalExample": "Suspected crusted scabies requires specialist assessment and potentially more intensive treatment.",
        "clinicalPearl": "Atypical or extensive disease in an immunocompromised patient should lower the threshold for specialist evaluation."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Scabies treatment during pregnancy should be selected according to current clinical guidance and approved product information."
        ],
        "details": [],
        "practicalExample": "Assess maternal disease burden and the established safety profile of the selected treatment.",
        "clinicalPearl": "Pregnancy warrants deliberate selection of topical therapy and avoidance of unnecessary exposure."
      },
      {
        "title": "SECONDARY BACTERIAL INFECTION",
        "keyPoints": [
          "Intense scratching may result in:",
          "Excoriations",
          "Erosions",
          "Impetiginisation",
          "Cellulitis",
          "Typical Clinical Appearance",
          "Look for:",
          "Pus",
          "Honey-coloured crusting",
          "Increasing erythema",
          "Pain",
          "Warmth",
          "Swelling"
        ],
        "details": [],
        "practicalExample": "Treat the scabies infestation and evaluate the secondary infection separately.",
        "clinicalPearl": "Persistent or worsening inflammation after scabies treatment may reflect secondary bacterial infection rather than ongoing mite infestation."
      }
    ]
  },
  {
    "id": "miteclin-1",
    "slug": "miteclin-1",
    "brandName": "MITECLIN",
    "genericName": "Permethrin 1% Soap",
    "tagline": "Topical Antiparasitic Permethrin Cleansing Preparation",
    "therapeuticArea": "Anti-Parasitic",
    "route": "Topical",
    "routeSubcategory": "Anti-Parasitic",
    "dosageForm": "Soap",
    "strength": "1%",
    "packSize": "75 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Topical Antiparasitic / Ectoparasiticidal Preparation",
    "composition": [
      "Each medicated soap contains:",
      "Permethrin — 1%",
      "Soap base / Excipients: q.s."
    ],
    "therapeuticCategory": "Synthetic Pyrethroid • Topical Antiparasitic Preparation • Scabicidal Soap Formulation • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological anti-parasitic therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Permethrin Acts on voltage-sensitive sodium channels in susceptible arthropods Prolonged neuronal depolarization (Paralysis) Death of susceptible mites"
      }
    ],
    "indications": [
      "CLASSIC SCABIES",
      "SCABIES & OTHER CAUSES OF ITCH"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Permethrin 1% Soap or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion — EXTERNAL USE ONLY",
        "detail": "MITECLIN 1% Soap is intended for external topical use. Do not ingest. Avoid unnecessary contact with: Eyes Mouth Other mucosal surfaces If accidental eye exposure occurs, rinse thoroughly with water."
      },
      {
        "title": "Accordion — LOCAL IRRITATION",
        "detail": "Possible reactions may include: Burning Stinging Dryness Redness Itching"
      },
      {
        "title": "Accordion — HYPERSENSITIVITY",
        "detail": "Discontinue use and seek medical evaluation if a significant hypersensitivity reaction occurs."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW SHOULD MITECLIN SOAP BE USED?",
        "answer": "\"Use the soap exactly as directed. Wet the skin, create a lather and use according to the product instructions.\""
      },
      {
        "question": "DO NOT OVERUSE",
        "answer": "\"Using more frequently or for longer than advised will not necessarily improve the condition and may increase skin irritation.\""
      },
      {
        "question": "PERSISTENT ITCHING",
        "answer": "\"If itching continues, do not repeatedly use the product without consulting your doctor.\""
      },
      {
        "question": "WHEN TO SEEK MEDICAL REVIEW",
        "answer": "Seek medical advice if: New lesions continue to appear Symptoms worsen Severe irritation develops There is pus or increasing pain Extensive crusting occurs Treatment does not appear effective Household or close-contact transmission continues"
      }
    ],
    "clinicalPearl": "MITECLIN 1% Soap should be positioned as a product-specific topical cleansing preparation. Its concentration and dosage form should not be assumed to provide the same therapeutic regimen as permethrin 5% cream. Correct diagnosis, appropriate product selection and adherence to the approved directions are central to effective management.",
    "relatedProducts": [
      {
        "name": "MITECLIN",
        "generic": "Permethrin 5% w/w Cream",
        "slug": "miteclin"
      }
    ],
    "references": [
      "Current approved MITECLIN 1% Soap product information and package insert — primary source for the product's exact indication, directions, contraindications, warnings, precautions and storage.",
      "Current clinical guidance concerning scabies and other ectoparasitic infestations.",
      "Current dermatology guidance concerning differential diagnosis and management of pruritic dermatoses."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ECZEMA / DERMATITIS",
        "clinicalClues": [
          "Erythema",
          "Scaling",
          "Xerosis",
          "Chronic or recurrent course",
          "Atopic history"
        ],
        "typicalAppearance": "Eczematous plaques may show: Erythema Scaling Excoriation Lichenification",
        "diagnosticApproach": [
          "Assess:",
          "Chronicity",
          "Distribution",
          "Exposure history",
          "Atopic history",
          "Family history"
        ],
        "managementApproach": [
          "Treat according to the underlying diagnosis."
        ],
        "clinicalPearl": "Chronic itch with xerosis and typical eczematous morphology may favour dermatitis rather than parasitic infestation."
      },
      {
        "id": "diff-2",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Exposure-related symptoms",
          "Burning or itching",
          "Localised distribution",
          "Relationship to a new product or material"
        ],
        "typicalAppearance": "May include: Erythema Scaling Vesicles Oedema",
        "diagnosticApproach": [
          "Review:",
          "Soaps",
          "Cosmetics",
          "Detergents",
          "Occupational exposures",
          "Topical medications"
        ],
        "managementApproach": [
          "Identify and remove the responsible exposure."
        ],
        "clinicalPearl": "A sharply exposure-related distribution should prompt consideration of contact dermatitis."
      },
      {
        "id": "diff-3",
        "condition": "PEDICULOSIS",
        "clinicalClues": [
          "Intense pruritus",
          "Visible lice",
          "Nits",
          "Characteristic distribution"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Look for live lice or viable nits."
        ],
        "managementApproach": [
          "Use treatment appropriate for the identified parasite."
        ],
        "clinicalPearl": "Direct identification of the parasite can help distinguish pediculosis from other causes of pruritus."
      },
      {
        "id": "diff-4",
        "condition": "INSECT BITES",
        "clinicalClues": [
          "Grouped papules",
          "Exposed-area involvement",
          "Environmental exposure",
          "Multiple affected household members"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Sleeping environment",
          "Travel",
          "Pets",
          "Household exposure"
        ],
        "managementApproach": [
          "Environmental control may be important."
        ],
        "clinicalPearl": "Exposure pattern can be as informative as lesion morphology."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "CORRECT PRODUCT SELECTION",
        "keyPoints": [
          "Permethrin is available in different concentrations and dosage forms."
        ],
        "details": [],
        "practicalExample": "Permethrin 5% cream and permethrin 1% soap should not be treated as interchangeable products. Management Implications Select the formulation according to: Diagnosis Approved indication Patient age Site of involvement Disease severity Product instructions",
        "clinicalPearl": "Concentration, formulation and contact method are integral parts of topical therapy."
      },
      {
        "title": "SCABIES TREATMENT",
        "keyPoints": [
          "When treating confirmed scabies, use an evidence-based scabicidal regimen appropriate to the patient."
        ],
        "details": [],
        "practicalExample": "Where a 5% permethrin cream is indicated according to current clinical guidance, it should be used according to its specific application instructions rather than substituted with a 1% soap simply because both contain permethrin. Management Implications Ensure: Correct formulation Correct application Appropriate contact treatment Environmental measures Follow-up",
        "clinicalPearl": "The concentration and formulation used in clinical trials and guidelines matter when selecting a scabies treatment."
      },
      {
        "title": "PERSISTENT PRURITUS",
        "keyPoints": [
          "Itching may persist after successful treatment of some parasitic infestations."
        ],
        "details": [],
        "practicalExample": "A patient continues to experience itching but has no new burrows or lesions. Management Implications Assess: New lesions New burrows Re-exposure Treatment adherence Alternative diagnoses",
        "clinicalPearl": "Persistent itch alone does not prove persistent infestation."
      },
      {
        "title": "TREATMENT FAILURE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Incorrect product selection",
          "Inadequate application",
          "Re-exposure",
          "Untreated close contacts",
          "Reinfection",
          "Alternative diagnosis"
        ],
        "details": [],
        "practicalExample": "A patient repeatedly uses a topical antiparasitic product but develops new lesions. Management Implications Reassess the diagnosis and treatment strategy rather than simply increasing application frequency.",
        "clinicalPearl": "Repeated treatment without diagnostic reassessment can delay recognition of the actual cause of persistent pruritus."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "CHILDREN",
        "keyPoints": [
          "Children may present differently from adults depending on the underlying infestation."
        ],
        "details": [],
        "practicalExample": "Use an age-appropriate product and regimen according to approved information.",
        "clinicalPearl": "Do not extrapolate adult application instructions to children without checking the product-specific guidance."
      },
      {
        "title": "SENSITIVE OR IRRITATED SKIN",
        "keyPoints": [
          "Soap formulations may cause:",
          "Dryness",
          "Burning",
          "Stinging",
          "Irritation"
        ],
        "details": [],
        "practicalExample": "Discontinue and reassess if significant irritation develops.",
        "clinicalPearl": "Not every increase in itching after a medicated soap represents worsening infestation; irritant dermatitis should also be considered."
      },
      {
        "title": "SECONDARY BACTERIAL INFECTION",
        "keyPoints": [
          "Look for:",
          "Pus",
          "Honey-coloured crusting",
          "Increasing redness",
          "Pain",
          "Warmth",
          "Swelling"
        ],
        "details": [],
        "practicalExample": "Evaluate and manage secondary bacterial infection separately.",
        "clinicalPearl": "Secondary infection may become the immediate clinical priority when excoriated skin becomes painful, purulent or increasingly inflamed."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Treatment selection should follow current clinical guidance and approved product information."
        ],
        "details": [],
        "practicalExample": "Assess: Clinical necessity Available safety information Alternative treatment options",
        "clinicalPearl": "Pregnancy warrants deliberate selection of topical therapy and avoidance of unnecessary exposure."
      }
    ]
  },
  {
    "id": "momerium-f",
    "slug": "momerium-f",
    "brandName": "MOMERIUM-F",
    "genericName": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
    "tagline": "Topical Corticosteroid + Topical Antibacterial",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Steroid combinations",
    "dosageForm": "Cream",
    "strength": "0.1%",
    "packSize": "10 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Mometasone Furoate 0.1% + Fusidic Acid 2%",
    "composition": [
      "Each gram contains:",
      "Mometasone Furoate 0.1% w/w",
      "Fusidic Acid 2% w/w",
      "In a suitable cream base.",
      "Regulatory note: The exact active-ingredient nomenclature should match the approved MOMERIUM-F composition and package insert."
    ],
    "therapeuticCategory": "Corticosteroid + Antibacterial • Topical • Inflammatory dermatoses • Prescription Medicine",
    "pharmacologicalClass": "Mometasone Furoate Mometasone Furoate is a topical corticosteroid that reduces inflammatory manifestations and associated pruritus in corticosteroid-responsive dermatoses.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Mometasone Furoate + Fusidic Acid Corticosteroid receptor-mediated activity and antibacterial activity against susceptible organisms Modulation of inflammatory pathways & Interference with bacterial protein synthesis Reduction in inflammatory response & Inhibition of bacterial growth Reduction in erythema, oedema and pruritus"
      }
    ],
    "indications": [
      "INFLAMMATION WITH SECONDARY BACTERIAL INVOLVEMENT",
      "PRIMARY BACTERIAL INFECTION",
      "INFLAMMATION WITHOUT BACTERIAL INVOLVEMENT"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — HOW SHOULD MOMERIUM-F BE APPLIED?",
      "howToApply": "Apply a thin film to the affected area and gently rub into the skin, according to the approved product directions.",
      "duration": "The exact dosing frequency and duration for MOMERIUM-F should follow its approved product information.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Accordion — Lactation",
      "lactation": "Consider:",
      "paediatric": "Children may be more susceptible to systemic corticosteroid effects because of their larger skin-surface-area-to-body-mass ratio.",
      "geriatric": "Older patients may have more fragile or thinner skin."
    },
    "contraindications": [
      "MOMERIUM-F should not be used in patients with known hypersensitivity to Mometasone Furoate, fusidic acid or any relevant formulation component.",
      "Because the product contains a corticosteroid, particular caution is required in infectious dermatoses."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — INFECTION",
        "detail": "Accordion 01 — INFECTION"
      },
      {
        "title": "Topical corticosteroids can alter the cl",
        "detail": "Topical corticosteroids can alter the clinical appearance of infection and may allow infection to worsen or become more difficult to diagnose."
      },
      {
        "title": "If infection develops or does not respon",
        "detail": "If infection develops or does not respond appropriately, the treatment strategy should be reassessed. Current Mometasone Furoate product information specifically warns that corticosteroids may mask, activate or worsen skin infections."
      },
      {
        "title": "Accordion 02 — FUNGAL INFECTION",
        "detail": "Accordion 02 — FUNGAL INFECTION"
      },
      {
        "title": "Mometasone Furoate-containing topical pr",
        "detail": "Mometasone Furoate-containing topical preparations are contraindicated in fungal infections unless appropriate causal therapy is being administered concomitantly, according to current professional information."
      }
    ],
    "adverseEffects": {
      "common": [
        "Current product information reports skin atrophy, contact dermatitis, folliculitis, acneiform dermatitis, irritant reaction and other local reactions."
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "WHAT IS MOMERIUM-F?",
        "answer": "MOMERIUM-F contains: Mometasone Furoate — to reduce inflammation and itching. Fusidic Acid — to treat susceptible bacterial involvement. It should be used only for the condition for which it has been prescribed."
      },
      {
        "question": "HOW SHOULD IT BE APPLIED?",
        "answer": "Apply a thin layer to the affected area exactly as directed by the treating physician. Gently rub into the skin. Wash hands after application unless the hands themselves are being treated."
      },
      {
        "question": "SHOULD MORE CREAM BE USED FOR A SEVERE RASH?",
        "answer": "No. Do not independently increase: Quantity Frequency Duration More cream does not necessarily provide greater benefit and may increase corticosteroid exposure."
      },
      {
        "question": "CAN IT BE USED ON THE FACE?",
        "answer": "Patients should not apply MOMERIUM-F to the face unless specifically directed by the treating physician and permitted by the approved product information."
      },
      {
        "question": "CAN IT BE USED UNDER A BANDAGE?",
        "answer": "Patients should not routinely cover the treated area with an occlusive dressing unless specifically instructed by the physician. Occlusion can increase corticosteroid absorption."
      },
      {
        "question": "WHAT IF THE RASH GETS WORSE?",
        "answer": "The patient should contact the treating physician if: Redness increases Pain develops Pus or discharge appears The rash spreads New blisters develop Treatment produces unexpected irritation"
      },
      {
        "question": "SHOULD IT BE USED FOR EVERY ITCHY RASH?",
        "answer": "No. MOMERIUM-F is not intended for indiscriminate treatment of every itchy or inflamed skin condition. The underlying diagnosis should be established before combination treatment is selected. Patient Education Pearl An itchy rash can have many causes—including eczema, fungal infection, allergy and infection—and treatment should be matched to the cause."
      }
    ],
    "clinicalPearl": "MOMERIUM-F combines anti-inflammatory corticosteroid activity with topical antibacterial activity. Its appropriate role is in selected inflammatory dermatoses where bacterial involvement is clinically relevant. Accurate diagnosis, appropriate site selection, limited duration and antimicrobial stewardship remain central to responsible use.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      },
      {
        "name": "TENORIUM NM",
        "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
        "slug": "tenorium-nm"
      }
    ],
    "references": [
      "Current approved MOMERIUM-F product information and package insert — to be used as the primary source for final product-specific indications, dosage, contraindications, warnings, precautions, storage and safety information.",
      "Mometasone Furoate Furoate 0.1% w/w Cream — Summary of Product Characteristics, current professional prescribing information.",
      "Mometasone Furoate Furoate 0.1% w/w Cream — professional product information and clinical particulars.",
      "Fusidic Acid 20 mg/g Cream — Summary of Product Characteristics, including antibacterial indications and resistance considerations."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "COULD THIS BE A FUNGAL INFECTION?",
        "clinicalClues": [
          "Consider dermatophyte infection when there is:",
          "Annular morphology",
          "Peripheral scaling",
          "Central clearing",
          "Expanding border",
          "Asymmetrical distribution",
          "Poor response or worsening with corticosteroid treatment"
        ],
        "typicalAppearance": "Annular or polycyclic lesions with an active, scaly peripheral border may suggest dermatophyte infection.",
        "diagnosticApproach": [
          "Where clinically indicated, consider appropriate mycological evaluation."
        ],
        "managementApproach": [
          "MOMERIUM-F should not be used as treatment for a fungal infection."
        ],
        "clinicalPearl": "An expanding annular lesion with peripheral scale should prompt consideration of tinea before escalating corticosteroid therapy."
      },
      {
        "id": "diff-2",
        "condition": "COULD THIS BE A VIRAL INFECTION?",
        "clinicalClues": [
          "Consider a viral dermatosis when there are:",
          "Vesicles",
          "Grouped lesions",
          "Erosions",
          "Characteristic recurrent distribution",
          "Pain or burning disproportionate to visible inflammation"
        ],
        "typicalAppearance": "The appearance depends on the viral condition and anatomical site.",
        "diagnosticApproach": [
          "Clinical assessment and appropriate testing should be considered where indicated."
        ],
        "managementApproach": [
          "Corticosteroid-containing combinations should not be used indiscriminately when viral infection is suspected."
        ],
        "clinicalPearl": "Steroid-mediated reduction in inflammation can alter the appearance of an infection and potentially delay recognition."
      },
      {
        "id": "diff-3",
        "condition": "COULD THIS BE A NON-INFECTIOUS INFLAMMATORY DERMATOSIS?",
        "clinicalClues": [
          "Consider uncomplicated inflammatory dermatosis when there is:",
          "Typical eczema morphology",
          "Pruritus",
          "Dryness",
          "Lichenification",
          "Known trigger",
          "No convincing evidence of bacterial infection"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Use history, morphology, distribution and exposure history."
        ],
        "managementApproach": [
          "If bacterial involvement is not clinically evident, treatment should be directed toward the underlying inflammatory condition."
        ],
        "clinicalPearl": "The presence of inflammation alone is not an indication for antibacterial therapy."
      },
      {
        "id": "diff-4",
        "condition": "COULD THIS BE A RESISTANT OR NON-SUSCEPTIBLE BACTERIAL INFECTION?",
        "clinicalClues": [
          "Consider this possibility when:",
          "There is inadequate response",
          "Infection progresses despite treatment",
          "Lesions recur repeatedly",
          "Previous antibiotic exposure is substantial"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Depending on clinical circumstances, microbiological sampling and susceptibility assessment may be appropriate."
        ],
        "managementApproach": [
          "Reassess the organism, treatment choice and need for alternative therapy."
        ],
        "clinicalPearl": "Failure of an antibacterial-containing preparation should prompt reassessment rather than simply prolonging treatment."
      },
      {
        "id": "diff-5",
        "condition": "COULD THIS BE ALLERGIC CONTACT DERMATITIS?",
        "clinicalClues": [
          "Consider contact allergy when:",
          "The eruption corresponds to a topical exposure.",
          "Symptoms persist despite treatment.",
          "The distribution changes after application of a product.",
          "There is recurrent dermatitis at the same exposure sites."
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Topical products",
          "Cosmetics",
          "Dressings",
          "Preservatives",
          "Fragrances",
          "Occupational exposures"
        ],
        "managementApproach": [
          "Identify and eliminate the responsible trigger."
        ],
        "clinicalPearl": "Treatment failure may sometimes represent continued exposure rather than inadequate anti-inflammatory treatment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "CONFIRM THE CLINICAL INDICATION",
        "keyPoints": [
          "Before initiating treatment, assess:",
          "Underlying diagnosis",
          "Degree of inflammation",
          "Evidence of bacterial involvement",
          "Anatomical site",
          "Extent of disease",
          "Patient age",
          "Previous treatment"
        ],
        "details": [],
        "practicalExample": "Use a thin film over the clinically affected area. A localised eczematous lesion with clear evidence of secondary bacterial involvement may be considered for combination therapy where clinically appropriate. Management Implications Avoid routine use of the combination for uncomplicated dermatitis without evidence supporting antibacterial treatment.",
        "clinicalPearl": "Combination therapy should solve two clinically relevant problems—not simply provide two active ingredients."
      },
      {
        "title": "ASSESS THE BACTERIAL COMPONENT",
        "keyPoints": [
          "Look for:",
          "Crusting",
          "Pustules",
          "Oozing",
          "Erosion",
          "Localised tenderness",
          "Other signs of superficial bacterial involvement"
        ],
        "details": [],
        "practicalExample": "Apply only to affected areas according to the prescribed regimen. A patient with an inflammatory dermatitis that develops localised crusting and superficial bacterial involvement may require treatment addressing both components. Management Implications If the bacterial component is not clinically supported, reassess the need for an antibacterial-containing preparation.",
        "clinicalPearl": "A bacterial component should be clinically plausible before an antibacterial is added."
      },
      {
        "title": "AVOID PROLONGED ANTIBACTERIAL EXPOSURE",
        "keyPoints": [
          "Repeated or prolonged use of topical fusidic acid can contribute to selection of resistant organisms. Current fusidic acid product information specifically warns that extended or recurrent use may increase antibiotic resistance."
        ],
        "details": [],
        "practicalExample": "Use the prescribed amount and treatment duration. If the bacterial component resolves but inflammatory disease persists, reassess whether continued antibacterial exposure remains necessary. Management Implications Do not continue combination therapy indefinitely simply because the underlying inflammatory disease remains active.",
        "clinicalPearl": "Once antibacterial treatment is no longer clinically necessary, continuing an antibacterial-containing combination may add exposure without adding therapeutic value."
      },
      {
        "title": "CORTICOSTEROID POTENCY & SITE",
        "keyPoints": [
          "Mometasone Furoate is a strong/potent topical corticosteroid according to current professional product information.",
          "Consider:",
          "Anatomical site",
          "Disease severity",
          "Lesion thickness",
          "Patient age",
          "Treatment duration"
        ],
        "details": [],
        "practicalExample": "Use the minimum amount compatible with effective treatment. A regimen appropriate for a thick inflammatory plaque on the trunk should not automatically be transferred to the face or intertriginous areas. Management Implications Sensitive sites require particular caution with potent topical corticosteroids.",
        "clinicalPearl": "Potency, quantity, site and duration should always be considered together."
      },
      {
        "title": "WHEN THE LESION FAILS TO RESPOND",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Fungal infection",
          "Viral infection",
          "Resistant/non-susceptible bacteria",
          "Contact allergy",
          "Inadequate adherence",
          "Incorrect application",
          "Need for systemic treatment"
        ],
        "details": [],
        "practicalExample": "Do not simply increase quantity or treatment duration without reassessing the diagnosis. An annular lesion that continues to expand despite treatment should prompt reconsideration of dermatophyte infection. Management Implications Consider diagnostic testing, culture or alternative therapy where clinically indicated.",
        "clinicalPearl": "Treatment failure is a reason to reassess the diagnosis—not automatically to intensify combination therapy."
      },
      {
        "title": "WHEN INFLAMMATION IMPROVES",
        "keyPoints": [
          "Assess whether:",
          "Erythema has reduced",
          "Pruritus has improved",
          "Crusting has resolved",
          "Oozing has stopped",
          "Bacterial signs have cleared"
        ],
        "details": [],
        "practicalExample": "Treatment should be reviewed once adequate control is achieved. If secondary bacterial features resolve while residual eczema remains, subsequent management may focus on the underlying inflammatory dermatosis. Management Implications Avoid unnecessary continuation of antibacterial therapy.",
        "clinicalPearl": "Treat the active components of the disease—not simply the original presentation."
      },
      {
        "title": "WARNINGS & PRECAUTIONS",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "INFECTION",
        "keyPoints": [],
        "details": [
          "Topical corticosteroids can alter the clinical appearance of infection and may allow infection to worsen or become more difficult to diagnose.",
          "If infection develops or does not respond appropriately, the treatment strategy should be reassessed. Current Mometasone Furoate product information specifically warns that corticosteroids may mask, activate or worsen skin infections."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "FUNGAL INFECTION",
        "keyPoints": [],
        "details": [
          "Mometasone Furoate-containing topical preparations are contraindicated in fungal infections unless appropriate causal therapy is being administered concomitantly, according to current professional information."
        ],
        "practicalExample": "",
        "clinicalPearl": "Do not interpret steroid-mediated reduction in erythema as proof that an underlying fungal infection has been treated."
      },
      {
        "title": "VIRAL INFECTION",
        "keyPoints": [],
        "details": [
          "Mometasone Furoate topical preparations are contraindicated in several viral skin infections, including herpes simplex, herpes zoster and varicella, according to current professional product information."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "SKIN ATROPHY",
        "keyPoints": [],
        "details": [
          "Prolonged topical corticosteroid exposure can increase the risk of:",
          "Skin thinning",
          "Striae",
          "Telangiectasia",
          "Fragility",
          "Other local corticosteroid-related changes",
          "Risk is influenced by potency, duration, anatomical site and exposure."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "FACE & INTERTRIGINOUS AREAS",
        "keyPoints": [],
        "details": [
          "Particular caution is required when potent topical corticosteroids are considered for:",
          "Face",
          "Groin",
          "Axillae",
          "Flexures",
          "Current Mometasone Furoate product information places specific restrictions on facial use and advises limiting exposure in children and on the face."
        ],
        "practicalExample": "",
        "clinicalPearl": "Sensitive sites generally require a more conservative corticosteroid strategy."
      },
      {
        "title": "OCCLUSION",
        "keyPoints": [],
        "details": [
          "Occlusion can increase topical corticosteroid absorption.",
          "Avoid routine occlusive dressings unless specifically directed by the treating physician.",
          "Current professional information warns that systemic and local toxicity risk increases with occlusion."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "SYSTEMIC ABSORPTION",
        "keyPoints": [],
        "details": [
          "Systemic absorption of topical corticosteroids can occur, particularly with:",
          "Large treatment areas",
          "Prolonged treatment",
          "Damaged skin",
          "Occlusion",
          "Higher exposure",
          "Potential systemic effects include hypothalamic-pituitary-adrenal axis suppression and other corticosteroid effects."
        ],
        "practicalExample": "",
        "clinicalPearl": "Topical therapy can produce systemic corticosteroid exposure when treatment conditions increase absorption."
      },
      {
        "title": "ALLERGIC CONTACT DERMATITIS",
        "keyPoints": [],
        "details": [
          "If irritation or sensitisation develops, treatment should be withdrawn and appropriate therapy instituted according to the clinical situation.",
          "Consider allergic contact dermatitis when a treated eruption unexpectedly worsens or changes character."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ]
  },
  {
    "id": "momerium",
    "slug": "momerium",
    "brandName": "MOMERIUM",
    "genericName": "Mometasone Furoate 0.1% Cream",
    "tagline": "Topical Corticosteroid | Anti-inflammatory & Antipruritic",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Corticosteroids",
    "dosageForm": "Cream",
    "strength": "0.1% w/w",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Mometasone Furoate 0.1% w/w",
      "In a suitable cream base."
    ],
    "therapeuticCategory": "Topical Corticosteroid • Inflammation • Pruritus • Corticosteroid-Responsive Dermatoses",
    "pharmacologicalClass": "Corticosteroid",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Mometasone Furoate Glucocorticoid receptor-mediated activity Modulation of inflammatory mediator pathways Reduction in inflammatory response Reduction in erythema, oedema and pruritus Improvement in corticosteroid-responsive inflammatory dermatoses"
      }
    ],
    "indications": [
      "Eczematous dermatoses",
      "Atopic dermatitis",
      "Contact dermatitis",
      "Other corticosteroid-responsive inflammatory dermatoses",
      "Pruritic inflammatory skin conditions"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — How Should MOMERIUM Be Applied?",
      "howToApply": "Apply a thin film of MOMERIUM to the affected skin areas and gently rub into the skin.",
      "duration": "Current prescribing information for Mometasone Furoate furoate 0.1% cream recommends once-daily application.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Accordion — Lactation",
      "lactation": "Consider:",
      "paediatric": "Current U.S. prescribing information permits Mometasone Furoate furoate 0.1% cream in children 2 years of age and older; safety and efficacy below 2 years have not been established.",
      "geriatric": "Older patients may have thinner or more fragile skin."
    },
    "contraindications": [
      "MOMERIUM should not be used in patients with known hypersensitivity to Mometasone Furoate or any component of the formulation."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — SYSTEMIC ABSORPTION",
        "detail": "Accordion 01 — SYSTEMIC ABSORPTION"
      },
      {
        "title": "Topical corticosteroids can be absorbed ",
        "detail": "Topical corticosteroids can be absorbed systemically."
      },
      {
        "title": "Risk may increase with:",
        "detail": "Risk may increase with:"
      },
      {
        "title": "Large treatment areas",
        "detail": "Large treatment areas"
      },
      {
        "title": "Prolonged use",
        "detail": "Prolonged use"
      }
    ],
    "adverseEffects": {
      "common": [
        "Burning, pruritus and skin atrophy are among adverse reactions reported in current Mometasone Furoate 0.1% cream prescribing information.",
        "CLINICAL PEARL",
        "MOMERIUM provides topical corticosteroid activity for appropriate inflammatory and pruritic dermatoses. Effective use depends on accurate diagnosis, appropriate site and potency selection, thin-film application, appropriate treatment duration and reassessment of lesions that fail to respond as expected."
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is MOMERIUM?",
        "answer": "MOMERIUM contains Mometasone Furoate 0.1%, a topical corticosteroid used to reduce inflammation and itching associated with appropriate corticosteroid-responsive skin conditions."
      },
      {
        "question": "How Should It Be Applied?",
        "answer": "Apply a thin layer to the affected skin once daily or exactly as directed by the treating physician. Gently rub the cream into the affected area. Wash hands after application unless the hands themselves are being treated."
      },
      {
        "question": "Should More Cream Be Used if Symptoms Are Severe?",
        "answer": "No. Patients should not independently increase the quantity or frequency. Greater application does not necessarily produce proportionally greater benefit and may increase corticosteroid exposure."
      },
      {
        "question": "Can It Be Used on the Face?",
        "answer": "Patients should not use MOMERIUM on the face unless specifically directed by the treating physician and permitted by the approved product information."
      },
      {
        "question": "Can It Be Covered With a Bandage?",
        "answer": "Do not cover treated areas with occlusive dressings unless specifically instructed by the physician. Occlusion can increase corticosteroid absorption."
      },
      {
        "question": "What If the Rash Does Not Improve?",
        "answer": "The patient should consult the treating physician rather than continuing treatment indefinitely. Current prescribing information recommends reassessment of the diagnosis when no improvement is seen within 2 weeks."
      },
      {
        "question": "What If the Skin Becomes More Irritated?",
        "answer": "New or worsening: Burning Itching Redness Irritation Rash should be reported to the treating physician. Allergic contact dermatitis or another diagnosis may need to be considered."
      }
    ],
    "clinicalPearl": "MOMERIUM provides topical corticosteroid activity for appropriate inflammatory and pruritic dermatoses. Effective use depends on accurate diagnosis, appropriate site and potency selection, thin-film application, appropriate treatment duration and reassessment of lesions that fail to respond as expected.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "TENORIUM NM",
        "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
        "slug": "tenorium-nm"
      }
    ],
    "references": [
      "Current approved prescribing information for MOMERIUM should be used as the primary source for final product-specific indications, dosage, contraindications, warnings, precautions, storage conditions and safety information.",
      "DailyMed. Mometasone Furoate Furoate Cream 0.1% — professional prescribing information.",
      "DailyMed. Mometasone Furoate Furoate Cream — current prescribing information and dosage recommendations.",
      "DailyMed. Mometasone Furoate Furoate Cream — warnings and precautions including endocrine, ophthalmic, allergic contact dermatitis and concomitant skin infection considerations."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "COULD THIS BE A FUNGAL INFECTION?",
        "clinicalClues": [
          "Consider dermatophyte infection when there is:",
          "Annular morphology",
          "Peripheral scaling",
          "Central clearing",
          "Asymmetric expansion",
          "Poor or unusual response to corticosteroid treatment"
        ],
        "typicalAppearance": "Annular or polycyclic plaques with an active, scaly peripheral border may suggest dermatophyte infection.",
        "diagnosticApproach": [
          "Where clinically indicated, consider appropriate mycological evaluation."
        ],
        "managementApproach": [
          "A suspected fungal infection should not be managed with topical corticosteroid monotherapy."
        ],
        "clinicalPearl": "An expanding annular lesion with peripheral scale should prompt consideration of dermatophyte infection before escalating corticosteroid therapy."
      },
      {
        "id": "diff-2",
        "condition": "COULD THIS BE CONTACT DERMATITIS?",
        "clinicalClues": [
          "Consider contact dermatitis when symptoms correlate with:",
          "New cosmetics",
          "Topical medications",
          "Fragrances",
          "Occupational exposures",
          "Detergents",
          "Metals",
          "Repeated environmental exposure"
        ],
        "typicalAppearance": "Erythematous, pruritic and eczematous lesions may occur at sites corresponding to exposure.",
        "diagnosticApproach": [
          "A detailed exposure history is important. Patch testing may be appropriate in persistent or recurrent cases."
        ],
        "managementApproach": [
          "Identify and eliminate the responsible trigger while treating the inflammatory component appropriately."
        ],
        "clinicalPearl": "Persistent dermatitis despite appropriate treatment should prompt consideration of ongoing exposure or allergic contact sensitisation."
      },
      {
        "id": "diff-3",
        "condition": "COULD THIS BE PSORIASIS?",
        "clinicalClues": [
          "Consider psoriasis when lesions are:",
          "Well demarcated",
          "Persistent",
          "Plaque-like",
          "Associated with characteristic scale",
          "Located on typical extensor or scalp sites"
        ],
        "typicalAppearance": "Well-defined erythematous plaques with variable surface scale.",
        "diagnosticApproach": [
          "Diagnosis is generally clinical and supported by morphology, distribution and history."
        ],
        "managementApproach": [
          "Treatment should be selected according to disease extent, severity, location and clinical phenotype."
        ],
        "clinicalPearl": "Distribution and morphology are often more informative than pruritus alone when differentiating psoriasis from eczema."
      },
      {
        "id": "diff-4",
        "condition": "COULD THIS BE AN INFECTIOUS DERMATOSIS?",
        "clinicalClues": [
          "Consider infection when there is:",
          "Rapid progression",
          "Pustulation",
          "Crusting",
          "Pain",
          "Warmth",
          "Discharge",
          "Unexpected treatment response"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Appropriate microbiological evaluation may be required depending on the clinical presentation."
        ],
        "managementApproach": [
          "Address the underlying infection appropriately rather than relying on corticosteroid suppression of inflammation."
        ],
        "clinicalPearl": "Reduction in erythema after corticosteroid application does not necessarily indicate eradication of an underlying infection."
      },
      {
        "id": "diff-5",
        "condition": "COULD THIS BE A DRUG-RELATED ERUPTION?",
        "clinicalClues": [
          "Consider a drug-related eruption when:",
          "Symptoms began after introduction of a new medication.",
          "Multiple areas are involved.",
          "There is a temporal relationship with medication exposure.",
          "The morphology is atypical for the presumed dermatosis."
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Medication history",
          "Timing of drug exposure",
          "Previous reactions",
          "Morphology and distribution"
        ],
        "managementApproach": [
          "Suspected drug eruptions require appropriate clinical evaluation and management."
        ],
        "clinicalPearl": "A new widespread eruption should not automatically be labelled as an exacerbation of an existing inflammatory dermatosis. CORTICOSTEROID POTENCY & CLINICAL SELECTION Why Does Potency Matter? Corticosteroid selection should be driven by the clinical requirement and selection should depends upon the diagnosis, severity of inflammation, lesion thickness, anatomical site, patient age, extent of involvement, treatment duration, and patient history. Anatomical Site Matters The same corticosteroid regimen should not automatically be applied to every anatomical site. Particular caution should be taken like in face, eyelids, groin, axillae, flexures or thin skin. Disease Severity & Lesion Characteristics A treatment strategy should balance adequate inflammatory control with minimisation of unnecessary corticosteroid exposure."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "MATCH POTENCY TO THE CLINICAL SITUATION",
        "keyPoints": [
          "Consider:",
          "Disease severity",
          "Anatomical site",
          "Lesion thickness",
          "Patient age",
          "Extent of involvement",
          "Duration required"
        ],
        "details": [],
        "practicalExample": "Use a thin, uniform layer over the affected area. A localised inflammatory plaque may require targeted application rather than application over unaffected surrounding skin. Management Implications Avoid unnecessarily extending treatment to unaffected areas.",
        "clinicalPearl": "The smallest clinically appropriate treatment area should generally be targeted."
      },
      {
        "title": "ONCE-DAILY APPLICATION",
        "keyPoints": [
          "Mometasone Furoate furoate 0.1% cream is labelled for once-daily application."
        ],
        "details": [],
        "practicalExample": "Apply a thin film to the affected area and gently rub in. For a localised eczematous plaque, apply a thin layer once daily to the involved skin according to the physician's instructions. Management Implications Avoid increasing frequency independently when response is inadequate; reassess diagnosis, adherence and application technique.",
        "clinicalPearl": "Increasing application frequency is not a substitute for diagnostic reassessment."
      },
      {
        "title": "REASSESS NON-RESPONDING LESIONS",
        "keyPoints": [
          "If the expected clinical response is not achieved, consider:",
          "Incorrect diagnosis",
          "Infection",
          "Contact allergy",
          "Inadequate adherence",
          "Incorrect application",
          "Insufficient treatment of the underlying condition"
        ],
        "details": [],
        "practicalExample": "Do not simply increase the quantity or duration without reassessment. An eczematous-appearing annular plaque that remains active despite appropriate corticosteroid treatment should prompt reconsideration of dermatophyte infection. Management Implications Consider diagnostic testing or an alternative therapeutic strategy when clinically indicated.",
        "clinicalPearl": "A non-responsive lesion is a diagnostic signal—not simply a reason to use more corticosteroid."
      },
      {
        "title": "ANATOMICAL SITE",
        "keyPoints": [
          "Special care is required for:",
          "Face",
          "Eyelids",
          "Groin",
          "Axillae",
          "Flexures",
          "Thin or atrophic skin"
        ],
        "details": [],
        "practicalExample": "Use only where clinically appropriate and according to the approved product information. A patient with dermatitis involving the face should not automatically receive the same topical corticosteroid regimen used for a thicker plaque on the trunk. Management Implications Site-specific corticosteroid selection can help minimise local adverse effects.",
        "clinicalPearl": "Potency and duration should be considered together with anatomical site."
      },
      {
        "title": "OCCLUSION",
        "keyPoints": [
          "Occlusion can increase corticosteroid penetration and systemic exposure."
        ],
        "details": [],
        "practicalExample": "Do not use occlusive dressings unless specifically directed by the physician. Current Mometasone Furoate furoate 0.1% prescribing information advises against occlusive dressings unless directed by a physician. A patient should not routinely cover a treated area with plastic film or another occlusive material unless specifically instructed. Management Implications Consider the increased exposure associated with occlusion when determining treatment strategy.",
        "clinicalPearl": "Occlusion changes corticosteroid exposure and should be treated as a deliberate therapeutic decision, not a routine application method."
      },
      {
        "title": "WHEN CONTROL IS ACHIEVED",
        "keyPoints": [
          "Once adequate clinical control has been achieved, reassess the need for continued corticosteroid therapy."
        ],
        "details": [],
        "practicalExample": "Do not continue routine application indefinitely without clinical justification. If erythema and pruritus have resolved, treatment may be discontinued according to the physician's treatment plan. Management Implications Further management may involve emollient therapy, trigger avoidance or another appropriate maintenance strategy depending on the underlying dermatosis.",
        "clinicalPearl": "Control of inflammation should trigger a treatment review—not automatic continuation."
      },
      {
        "title": "WARNINGS & PRECAUTIONS",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "SYSTEMIC ABSORPTION",
        "keyPoints": [],
        "details": [
          "Topical corticosteroids can be absorbed systemically.",
          "Risk may increase with:",
          "Large treatment areas",
          "Prolonged use",
          "Occlusion",
          "Damaged skin",
          "Increased skin permeability",
          "Systemic corticosteroid effects, including reversible hypothalamic-pituitary-adrenal axis suppression, can occur with excessive exposure."
        ],
        "practicalExample": "",
        "clinicalPearl": "Topical administration does not mean zero systemic exposure."
      },
      {
        "title": "SKIN ATROPHY",
        "keyPoints": [],
        "details": [
          "Prolonged corticosteroid exposure may increase the risk of:",
          "Skin thinning",
          "Striae",
          "Telangiectasia",
          "Skin fragility",
          "Hypopigmentation",
          "Current labeling identifies skin atrophy among reported adverse reactions."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "FACE, GROIN & AXILLAE",
        "keyPoints": [],
        "details": [
          "Current prescribing information advises avoiding application of Mometasone Furoate furoate 0.1% cream to the:",
          "Face",
          "Groin",
          "Axillae",
          "unless otherwise specifically directed within appropriate clinical practice."
        ],
        "practicalExample": "",
        "clinicalPearl": "Sensitive anatomical sites generally require greater caution with topical corticosteroids."
      },
      {
        "title": "OCCLUSIVE DRESSINGS",
        "keyPoints": [],
        "details": [
          "MOMERIUM should not be used under occlusive dressings unless directed by the physician.",
          "Occlusion may increase absorption and the risk of adverse effects."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "OPHTHALMIC PRECAUTIONS",
        "keyPoints": [],
        "details": [
          "Avoid contact with the eyes.",
          "Ophthalmic adverse reactions, including potential increases in intraocular pressure, glaucoma or cataract-related concerns, have been identified in current prescribing information for topical Mometasone Furoate preparations."
        ],
        "practicalExample": "",
        "clinicalPearl": "Periocular corticosteroid use requires particular caution because of potential ocular complications."
      },
      {
        "title": "CONCOMITANT SKIN INFECTION",
        "keyPoints": [],
        "details": [
          "If a concomitant skin infection is present or develops, appropriate antimicrobial treatment should be considered.",
          "If the infection does not respond promptly, corticosteroid therapy may need to be reassessed. Current prescribing information specifically includes concomitant skin infections among warnings and precautions."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ALLERGIC CONTACT DERMATITIS",
        "keyPoints": [],
        "details": [
          "Topical corticosteroid therapy can occasionally be associated with allergic contact dermatitis, either to the active ingredient or formulation components.",
          "Consider this possibility when:",
          "Dermatitis worsens",
          "Expected improvement does not occur",
          "The clinical pattern changes",
          "Symptoms persist despite appropriate treatment",
          "Current professional labeling specifically recognises allergic contact dermatitis as a precaution."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ]
  },
  {
    "id": "nizfin",
    "slug": "nizfin",
    "brandName": "NIZFIN",
    "genericName": "Amorolfine 0.25% Cream",
    "tagline": "Topical Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Cream",
    "strength": "0.25%",
    "packSize": "30 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Superficial fungal infections of the skin, according to approved indication",
    "composition": [
      "Each gram contains:",
      "Amorolfine 0.25% w/w",
      "In a cream base q.s."
    ],
    "therapeuticCategory": "Morpholine-derived antifunal • Topical • Superficial Fungal Infection • Prescription Medicine",
    "pharmacologicalClass": "Morpholine Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "AMOROLFINE 0.25%Inhibits Δ14-reductase + Δ7-Δ8 isomerase↓ERGOSTEROL ↓ + ABNORMAL STEROLS ↑Fungal membrane composition is altered↓MEMBRANE FUNCTION DISRUPTEDFungal growth inhibited"
      }
    ],
    "indications": [
      "TINEA CORPORIS",
      "TINEA CRURIS",
      "TINEA PEDIS"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Amorolfine 0.25% Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible local reactions may include: Burning Stinging Redness Itching Irritation Management Implications Persistent or severe reactions warrant clinical review."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Hypersensitivity reactions are uncommon but clinically important. Management Implications Significant swelling, severe rash or other features suggestive of hypersensitivity require appropriate medical assessment."
      },
      {
        "title": "EXTERNAL USE",
        "detail": "NIZFIN is intended for topical use. Management Implications Avoid contact with: Eyes Mouth Other mucosal surfaces unless specifically directed by a healthcare professional."
      },
      {
        "title": "DAMAGED SKIN",
        "detail": "Use cautiously on significantly irritated or damaged skin according to the approved product information. Management Implications Marked irritation may warrant clinical reassessment."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "CLEAN AND DRY",
        "answer": "\"Clean and gently dry the affected area before applying the cream.\""
      },
      {
        "question": "APPLY A THIN LAYER",
        "answer": "\"Apply a thin, even layer over the affected area as prescribed. Do not apply excessive amounts.\""
      },
      {
        "question": "WASH HANDS",
        "answer": "\"Wash your hands before and after applying the cream, unless your hands are the area being treated.\""
      },
      {
        "question": "KEEP THE AREA DRY",
        "answer": "\"Keep affected areas clean and dry, particularly skin folds and the spaces between the toes.\""
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Use the cream for the full prescribed duration, even if itching improves earlier.\""
      },
      {
        "question": "AVOID SHARING PERSONAL ITEMS",
        "answer": "\"Avoid sharing towels, clothing, footwear or other personal items that may contribute to fungal transmission.\""
      },
      {
        "question": "REPORT PERSISTENT OR WORSENING LESIONS",
        "answer": "\"Contact your doctor if the infection does not improve, becomes worse, spreads or repeatedly returns.\""
      }
    ],
    "clinicalPearl": "NIZFIN provides Amorolfine 0.25% as a topical morpholine antifungal for appropriately diagnosed superficial fungal infections. Optimal outcomes depend on diagnostic accuracy, appropriate patient selection, adequate application, adherence and attention to reinfection factors. Persistent, atypical or refractory lesions should prompt diagnostic reassessment rather than indefinite empirical topical treatment.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Current approved NIZFIN product information and package insert — primary source for composition, approved indications, dosage, contraindications, warnings and precautions.",
      "Current applicable Indian regulatory/product documentation for amorolfine topical preparations.",
      "Relevant dermatology guidance concerning superficial dermatophyte infections.",
      "Relevant pharmacological literature concerning amorolfine and inhibition of fungal sterol biosynthesis.",
      "Current prescribing information concerning topical amorolfine safety, precautions and adverse effects."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "DERMATOPHYTOSIS VS ECZEMA",
        "clinicalClues": [
          "Dermatophytosis:",
          "Annular morphology",
          "Active peripheral border",
          "Peripheral scale",
          "Progressive outward extension",
          "Eczema:",
          "More diffuse inflammation",
          "Variable scaling",
          "Less characteristic advancing border"
        ],
        "typicalAppearance": "Dermatophyte infection often demonstrates a relatively active peripheral margin, while eczema may show more diffuse erythema and scaling.",
        "diagnosticApproach": [
          "KOH microscopy may assist when the distinction is uncertain."
        ],
        "managementApproach": [
          "Avoid prolonged corticosteroid monotherapy when dermatophytosis remains a clinical possibility."
        ],
        "clinicalPearl": "An enlarging scaly border should prompt consideration of dermatophytosis before treating the eruption as eczema alone."
      },
      {
        "id": "diff-2",
        "condition": "TINEA INCOGNITO",
        "clinicalClues": [
          "Consider when a presumed inflammatory dermatosis has been treated with topical corticosteroids.",
          "Look for:",
          "Atypical morphology",
          "Progressive extension",
          "Less distinct borders",
          "Recurrence after corticosteroid withdrawal"
        ],
        "typicalAppearance": "The classic annular appearance may become less apparent and more diffuse.",
        "diagnosticApproach": [
          "KOH microscopy or fungal culture may help establish the diagnosis."
        ],
        "managementApproach": [
          "Reassess the diagnosis and avoid inappropriate corticosteroid-containing combinations."
        ],
        "clinicalPearl": "Corticosteroids may suppress visible inflammation while allowing the underlying fungal infection to persist."
      },
      {
        "id": "diff-3",
        "condition": "CANDIDIASIS",
        "clinicalClues": [
          "Moist erythema",
          "Maceration",
          "Satellite papules or pustules",
          "Intertriginous distribution"
        ],
        "typicalAppearance": "Bright erythematous moist plaques with possible satellite lesions.",
        "diagnosticApproach": [
          "KOH examination may assist when the diagnosis is uncertain."
        ],
        "managementApproach": [
          "Consider contributing factors such as moisture, occlusion and relevant underlying conditions."
        ],
        "clinicalPearl": "Satellite lesions surrounding a moist erythematous plaque should broaden the differential toward candidiasis."
      },
      {
        "id": "diff-4",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Chronic or recurrent lesions",
          "Well-demarcated plaques",
          "Extensor involvement",
          "Scalp involvement",
          "Nail changes"
        ],
        "typicalAppearance": "Well-demarcated erythematous plaques with variable scale.",
        "diagnosticApproach": [
          "Assess distribution and examine for associated scalp, nail or other characteristic lesions."
        ],
        "managementApproach": [
          "Antifungal treatment alone is not appropriate when psoriasis is the underlying diagnosis."
        ],
        "clinicalPearl": "Distribution and associated nail or scalp findings can provide important clues when distinguishing psoriasis from superficial fungal disease."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS",
        "clinicalClues": [
          "Relationship with an exposure",
          "Burning or pruritus",
          "Exposure-related distribution",
          "Recurrence following re-exposure"
        ],
        "typicalAppearance": "Erythematous, eczematous or vesicular lesions depending on disease phase.",
        "diagnosticApproach": [
          "Detailed exposure history is important."
        ],
        "managementApproach": [
          "Identify and avoid the suspected irritant or allergen."
        ],
        "clinicalPearl": "A lesion that closely follows an exposure pattern should broaden the diagnostic assessment beyond fungal infection."
      },
      {
        "id": "diff-6",
        "condition": "BACTERIAL INFECTION",
        "clinicalClues": [
          "Pain",
          "Purulence",
          "Marked tenderness",
          "Rapid progression",
          "Systemic symptoms"
        ],
        "typicalAppearance": "Erosions, crusting, marked erythema or purulent discharge.",
        "diagnosticApproach": [
          "Clinical assessment with microbiological investigation where indicated."
        ],
        "managementApproach": [
          "Appropriate antibacterial management should be considered when bacterial infection is suspected."
        ],
        "clinicalPearl": "Rapid progression, significant pain or purulence is atypical for uncomplicated dermatophytosis and warrants reassessment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW TO APPLY NIZFIN",
        "keyPoints": [
          "Apply the cream to the affected skin according to the approved product instructions.",
          "The application should provide an even layer over the clinically relevant treatment area."
        ],
        "details": [],
        "practicalExample": "Apply a thin, even layer to clean, dry skin according to the prescribed frequency and duration. Wash hands before and after application unless the hands are the treatment site. For a localized annular lesion on the trunk, apply a thin layer evenly over the affected area and relevant surrounding skin as directed. Management Implications Correct application technique helps ensure adequate topical exposure while avoiding unnecessary over-application.",
        "clinicalPearl": "The objective is adequate and consistent coverage—not application of a thick layer."
      },
      {
        "title": "TINEA CORPORIS",
        "keyPoints": [
          "Annular plaque",
          "Active peripheral scaling",
          "Progressive expansion",
          "Pruritus"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer according to the prescribed regimen. Clean and gently dry the affected area, then apply the prescribed amount evenly over the lesion and relevant surrounding skin. Management Implications Monitor for: Reduced scaling Reduced erythema Reduced pruritus Cessation of lesion expansion",
        "clinicalPearl": "Reduction of active peripheral scaling can be a useful clinical marker of response."
      },
      {
        "title": "TINEA CRURIS",
        "keyPoints": [
          "Groin involvement",
          "Moisture and occlusion can contribute to persistence",
          "Concurrent tinea pedis should be considered"
        ],
        "details": [],
        "practicalExample": "Apply a thin layer to clean, dry skin according to the prescribed regimen. After bathing, gently dry the groin area before applying the cream. Management Implications Attention to moisture control may complement antifungal treatment.",
        "clinicalPearl": "In recurrent tinea cruris, evaluate the feet and nails rather than repeatedly treating the groin alone."
      },
      {
        "title": "TINEA PEDIS",
        "keyPoints": [
          "Interdigital scaling",
          "Maceration",
          "Fissuring",
          "Plantar scaling"
        ],
        "details": [],
        "practicalExample": "Apply the prescribed amount to the affected areas after thoroughly drying the feet. After washing the feet, carefully dry between the toes before applying the cream. Management Implications Consider: Foot hygiene Moisture control Appropriate footwear Concurrent nail infection",
        "clinicalPearl": "Moisture management is an important practical adjunct to topical treatment of tinea pedis."
      },
      {
        "title": "HAIR-BEARING AREAS",
        "keyPoints": [
          "Topical cream can be more difficult to distribute through dense hair."
        ],
        "details": [],
        "practicalExample": "Part the hair where necessary and apply the cream directly to the affected skin according to the prescribed instructions. For a superficial lesion on a hair-bearing limb, separate the hair sufficiently to ensure the cream reaches the skin. Management Implications If the extent or depth of infection makes topical treatment impractical, reassess the treatment strategy.",
        "clinicalPearl": "The medication needs to reach the affected skin surface; coating the hair alone is not adequate treatment."
      },
      {
        "title": "ADHERENCE",
        "keyPoints": [
          "Consistent treatment is essential."
        ],
        "details": [],
        "practicalExample": "Follow the prescribed frequency and treatment duration. Do not independently increase the quantity or frequency if symptoms persist. If itching improves before the skin has completely normalized, continue treatment according to the prescribed regimen. Management Implications Premature discontinuation may contribute to incomplete treatment or recurrence.",
        "clinicalPearl": "Symptomatic improvement does not necessarily indicate complete microbiological or clinical resolution."
      },
      {
        "title": "INADEQUATE RESPONSE",
        "keyPoints": [
          "Consider:",
          "Incorrect diagnosis",
          "Poor adherence",
          "Inadequate application",
          "Reinfection",
          "Extensive disease",
          "Alternative organism",
          "Resistant infection"
        ],
        "details": [],
        "practicalExample": "Do not simply increase the amount or frequency of application without clinical reassessment. A lesion that continues to enlarge despite appropriate use should prompt reassessment rather than indefinite continuation of the same approach. Management Implications Consider mycological testing and evaluation for alternative diagnoses.",
        "clinicalPearl": "Treatment failure can be a diagnostic clue and should prompt reassessment of the clinical picture."
      },
      {
        "title": "WHEN TO CONSIDER SYSTEMIC THERAPY",
        "keyPoints": [
          "Systemic therapy may be appropriate when:",
          "Infection is extensive",
          "Nails are involved",
          "Hair-bearing structures are significantly involved",
          "Topical treatment is impractical",
          "Disease is recurrent or refractory"
        ],
        "details": [],
        "practicalExample": "NIZFIN is a topical preparation and should not be used as a substitute for systemic therapy when systemic treatment is clinically indicated. A patient with extensive dermatophytosis involving several anatomical sites may require assessment for systemic antifungal therapy. Management Implications Treatment route should be reassessed according to the distribution, severity and clinical response.",
        "clinicalPearl": "Do not prolong topical treatment indefinitely when the clinical extent indicates that systemic therapy may be required. MANAGEMENT PRINCIPLES"
      },
      {
        "title": "CONFIRM THE CLINICAL DIAGNOSIS",
        "keyPoints": [],
        "details": [
          "The more atypical or treatment-refractory the presentation, the greater the value of diagnostic confirmation."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ASSESS EXTENT AND SITE",
        "keyPoints": [],
        "details": [
          "Treatment route should be determined by anatomical site, extent and depth of infection."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "OPTIMIZE TOPICAL APPLICATION",
        "keyPoints": [],
        "details": [
          "Ensure adequate coverage of the clinically affected area according to the approved product instructions."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "ADDRESS REINFECTION",
        "keyPoints": [],
        "details": [
          "Evaluate for Tinea pedis, Onychomycosis, Household transmission, Moisture, Occlusive footwear, Shared personal items."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "AVOID INAPPROPRIATE CORTICOSTEROID USE",
        "keyPoints": [],
        "details": [
          "Rapid symptomatic suppression should not replace appropriate antifungal management when dermatophytosis is suspected."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "RECURRENT DERMATOPHYTOSIS",
        "keyPoints": [
          "Evaluate for:",
          "Tinea pedis",
          "Onychomycosis",
          "Reinfection",
          "Household transmission",
          "Inadequate previous treatment",
          "Management Considerations",
          "Identify and address potential reservoirs."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Repeated recurrence should prompt investigation into the source of reinfection rather than repeated empirical treatment alone."
      },
      {
        "title": "TINEA INCOGNITO",
        "keyPoints": [
          "Prior corticosteroid use can alter the clinical appearance of dermatophytosis.",
          "Management Considerations",
          "Consider mycological confirmation when appropriate."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "An atypical eruption that expands after corticosteroid exposure should prompt reconsideration of dermatophytosis."
      },
      {
        "title": "INTERTRIGINOUS AREAS",
        "keyPoints": [
          "Moisture, friction and occlusion may contribute to persistence.",
          "Management Considerations",
          "Combine appropriate antifungal therapy with measures that reduce moisture and friction."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Optimizing the local environment can support the effectiveness of topical antifungal therapy."
      },
      {
        "title": "PEDIATRIC PATIENTS",
        "keyPoints": [
          "Consider:",
          "Age",
          "Site",
          "Extent",
          "Diagnostic certainty",
          "Approved age range for the specific product",
          "Management Considerations",
          "Use according to the current approved product information."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Pediatric use should follow the age-specific recommendations of the approved product information."
      },
      {
        "title": "PREGNANCY & LACTATION",
        "keyPoints": [
          "Pregnancy and breastfeeding status should be considered before treatment.",
          "Management Considerations",
          "Use according to current product information and appropriate clinical risk-benefit assessment."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Pregnancy and lactation should be specifically considered when selecting topical medicinal therapy."
      }
    ]
  },
  {
    "id": "poviprix-plus",
    "slug": "poviprix-plus",
    "brandName": "POVIPRIX PLUS",
    "genericName": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
    "tagline": "Topical Wound-Care & Antimicrobial Preparation",
    "therapeuticArea": "Antibacterial",
    "route": "Topical",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Ointment",
    "strength": "5%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7%",
    "composition": [
      "Each gram of ointment contains:",
      "Povidone Iodine — 5%",
      "Metronidazole — 1%",
      "Sucralfate — 7%",
      "Ointment base: q.s."
    ],
    "therapeuticCategory": "Topical wound-care • Broad-spectrum antimicrobial preparation • Protective and Barrier forming",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "BROAD-SPECTRUM ANTIMICROBIAL ACTION",
        "description": "Povidone Iodine 5% releases free iodine which penetrates microorganisms and oxidizes essential proteins, nucleotides and membrane components, causing rapid microbial inactivation."
      },
      {
        "step": "02",
        "title": "ANAEROBIC BACTERIAL CONTROL",
        "description": "After entering susceptible microbial cells, Metronidazole 1%  reduced metabolites, damage microbial DNA, leading to inhibition of DNA synthesis and cell death."
      },
      {
        "step": "03",
        "title": "WOUND PROTECTION & HEALING SUPPORT",
        "description": "Sucralfate 7% forms a protective layer over damaged tissue and may support local tissue repair and re-epithelialisation, helping create a favourable environment for wound healing."
      }
    ],
    "indications": [
      "Infected or colonized superficial wounds",
      "Malodourous wounds",
      "Superficial ulcerative lesions"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "THYROID / IODINE CONSIDERATIONS",
        "detail": "Povidone iodine contributes iodine exposure. Particular caution may be appropriate with: Thyroid disorders Extensive or prolonged application Large wound surfaces Management Considerations Use according to approved product information and clinical judgement."
      },
      {
        "title": "RENAL IMPAIRMENT / EXTENSIVE APPLICATION",
        "detail": "Systemic absorption can become more relevant with extensive application, prolonged use or significantly compromised skin. Management Considerations Exercise appropriate caution in patients with significant renal impairment or when treating extensive wounds."
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Discontinue use and seek medical evaluation if significant hypersensitivity develops. Possible symptoms include: Severe rash Facial swelling Breathing difficulty Significant worsening of local reaction"
      },
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible local reactions may include: Burning Stinging Redness Irritation Itching"
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO USE",
        "answer": "\"Clean the wound as advised, apply a thin layer of POVIPRIX PLUS to the affected area as directed, and use the recommended dressing if advised by your healthcare professional.\""
      },
      {
        "question": "DO NOT OVERAPPLY",
        "answer": "\"Using a thicker layer does not necessarily make the wound heal faster.\""
      },
      {
        "question": "KEEP THE WOUND CLEAN",
        "answer": "\"Follow the wound-cleaning and dressing instructions provided by your healthcare professional.\""
      },
      {
        "question": "DO NOT DELAY MEDICAL REVIEW",
        "answer": "Patients should seek medical attention if: Redness spreads Pain increases significantly Fever develops Pus increases The wound becomes black or rapidly deteriorates There is foul odour with worsening tissue damage The wound fails to improve"
      },
      {
        "question": "DO NOT SELF-TREAT CHRONIC WOUNDS INDEFINITELY",
        "answer": "\"If a wound is not healing as expected, return for assessment rather than continuing topical treatment indefinitely.\""
      }
    ],
    "clinicalPearl": "POVIPRIX PLUS combines Povidone Iodine 5%, Metronidazole 1% and Sucralfate 7% to provide complementary antiseptic, anaerobic antibacterial and local protective properties. Its role is best understood within a complete wound-care strategy that includes wound assessment, cleansing, appropriate dressing, infection evaluation and treatment of the underlying cause.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "ROMITIZ-500",
        "generic": "Azithromycin 500 mg Tablet",
        "slug": "romitiz-500"
      }
    ],
    "references": [
      "Current approved POVIPRIX PLUS product information and package insert — primary source for indications, directions for use, contraindications, warnings, precautions and adverse effects.",
      "Current prescribing information for topical povidone iodine.",
      "Current prescribing information for topical metronidazole.",
      "Current clinical guidance for wound assessment and management.",
      "Current guidance on antimicrobial stewardship and management of infected wounds."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "COLONIZATION VS CLINICAL INFECTION",
        "clinicalClues": [
          "Colonized wounds may contain microorganisms without clear clinical evidence of invasive infection.",
          "Clinical infection may show:",
          "Increasing pain",
          "Spreading erythema",
          "Purulent discharge",
          "Increasing warmth",
          "Tissue deterioration",
          "Systemic symptoms in more severe cases"
        ],
        "typicalAppearance": "Clinical infection generally demonstrates a change from the patient's baseline wound appearance or function.",
        "diagnosticApproach": [
          "Assess the complete clinical picture rather than relying on wound culture alone."
        ],
        "managementApproach": [],
        "clinicalPearl": "A positive wound culture does not automatically mean that systemic or topical antimicrobial therapy is required."
      },
      {
        "id": "diff-2",
        "condition": "PRESSURE INJURY",
        "clinicalClues": [
          "Consider pressure-related injury when there is:",
          "Prolonged pressure",
          "Limited mobility",
          "Typical pressure-point distribution",
          "Tissue breakdown"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess:",
          "Mobility",
          "Pressure exposure",
          "Nutrition",
          "Skin integrity",
          "Wound stage and depth"
        ],
        "managementApproach": [
          "Pressure redistribution and off-loading are fundamental."
        ],
        "clinicalPearl": "No topical preparation can compensate for ongoing unrelieved pressure."
      },
      {
        "id": "diff-3",
        "condition": "VENOUS LEG ULCER",
        "clinicalClues": [
          "Typical associated findings may include:",
          "Lower-leg oedema",
          "Venous skin changes",
          "Hyperpigmentation",
          "Varicosities",
          "Chronic ulceration around the gaiter area"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [],
        "managementApproach": [
          "Appropriate compression and management of venous disease may be central to healing when clinically suitable."
        ],
        "clinicalPearl": "Treating the wound surface alone is insufficient when venous hypertension is the underlying driver."
      },
      {
        "id": "diff-4",
        "condition": "ARTERIAL ULCER",
        "clinicalClues": [
          "Consider arterial insufficiency with:",
          "Ischaemic pain",
          "Reduced pulses",
          "Distal ulceration",
          "Cool extremity",
          "Poor perfusion"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess vascular status and obtain appropriate vascular investigations where indicated."
        ],
        "managementApproach": [
          "Significant arterial insufficiency requires appropriate vascular assessment and management."
        ],
        "clinicalPearl": "Suspected arterial insufficiency requires attention to perfusion before relying on topical wound treatment alone."
      },
      {
        "id": "diff-5",
        "condition": "FUNGAL OR OTHER NON-BACTERIAL LESIONS",
        "clinicalClues": [
          "Consider alternative diagnoses when lesions show:",
          "Characteristic scaling",
          "Annular morphology",
          "Persistent inflammation without clinical infection",
          "Atypical wound behaviour"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Use appropriate microbiological or dermatological evaluation."
        ],
        "managementApproach": [
          "POVIPRIX PLUS should not be used as a substitute for disease-specific antifungal or anti-inflammatory treatment when those are indicated."
        ],
        "clinicalPearl": "Failure to respond should prompt diagnostic reassessment rather than indefinite continuation of topical antimicrobials."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a suitable amount to provide a thin, even layer over the affected wound area, according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "The amount depends on: Wound size Surface characteristics Exudate Dressing requirements Avoid unnecessary application beyond the affected area. For a small superficial wound, a thin layer sufficient to cover the wound surface may be appropriate rather than applying a thick excess of ointment. Management Implications Excessive application does not necessarily improve wound healing.",
        "clinicalPearl": "The objective is adequate wound coverage—not a thick layer of ointment."
      },
      {
        "title": "WOUND CLEANSING BEFORE APPLICATION",
        "keyPoints": [
          "Appropriate wound cleansing is an important part of wound management."
        ],
        "details": [],
        "practicalExample": "Where clinically appropriate: Cleanse the wound gently. Remove loose contaminants or exudate. Gently dry surrounding skin. Apply the ointment as directed. Cover with an appropriate dressing if indicated. A moderately exudative superficial wound is cleansed before application so that the preparation can contact the wound surface appropriately. Management Implications Topical treatment should not be applied over substantial debris, necrotic material or foreign material without appropriate wound assessment.",
        "clinicalPearl": "A clean wound bed improves the ability to assess the wound and supports appropriate topical management."
      },
      {
        "title": "DRESSING CONSIDERATIONS",
        "keyPoints": [
          "Dressing selection should consider:",
          "Exudate level",
          "Wound depth",
          "Tissue condition",
          "Infection status",
          "Frequency of dressing changes"
        ],
        "details": [],
        "practicalExample": "A highly exudative wound may require a dressing capable of managing moisture rather than simply increasing the amount of ointment. Management Implications The ointment should form part of a complete wound-care strategy.",
        "clinicalPearl": "Wound dressings should be selected according to wound characteristics, not simply according to the antimicrobial used."
      },
      {
        "title": "DURATION OF USE",
        "keyPoints": [
          "Duration should be guided by:",
          "Clinical response",
          "Wound progression",
          "Infection status",
          "Underlying disease",
          "Approved product information"
        ],
        "details": [],
        "practicalExample": "If a wound fails to improve despite appropriate local care, reassess the diagnosis and underlying factors rather than continuing the same topical treatment indefinitely. Management Implications Persistent wounds may require: Debridement Culture where indicated Vascular assessment Pressure off-loading Systemic treatment Specialist referral",
        "clinicalPearl": "A non-healing wound is a reason to reassess the whole wound—not simply to extend topical treatment."
      },
      {
        "title": "TOPICAL VS SYSTEMIC ANTIMICROBIAL THERAPY",
        "keyPoints": [
          "Topical treatment may be suitable for selected localized superficial wound problems.",
          "Systemic therapy may be required when there is:",
          "Spreading infection",
          "Cellulitis",
          "Systemic illness",
          "Deep tissue involvement",
          "Rapid deterioration",
          "High-risk host factors"
        ],
        "details": [],
        "practicalExample": "A localized superficial infected wound without systemic features may be managed locally, while fever with spreading erythema requires prompt clinical assessment for systemic treatment. Management Implications The extent and severity of infection determine treatment intensity.",
        "clinicalPearl": "Topical antimicrobial treatment should never delay appropriate systemic treatment when invasive infection is suspected."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "DIABETIC FOOT WOUNDS",
        "keyPoints": [
          "Diabetic wounds may involve:",
          "Neuropathy",
          "Ischaemia",
          "Infection",
          "Pressure",
          "Impaired healing",
          "Typical Clinical Appearance",
          "Wounds may range from superficial ulceration to deep tissue involvement."
        ],
        "details": [],
        "practicalExample": "Assessment should include: Infection Perfusion Neuropathy Pressure/off-loading Glycaemic control Wound depth",
        "clinicalPearl": "A diabetic foot wound requires multidisciplinary risk assessment; topical treatment alone is not sufficient management."
      },
      {
        "title": "PRESSURE INJURIES",
        "keyPoints": [
          "Persistent pressure can prevent healing and cause progressive tissue damage.",
          "Typical Clinical Appearance",
          "Lesions occur over pressure-bearing areas and may range from superficial skin damage to deep tissue injury."
        ],
        "details": [],
        "practicalExample": "Consider: Pressure redistribution Appropriate support surfaces Nutritional status Wound assessment Infection management",
        "clinicalPearl": "Off-loading and pressure redistribution are central to pressure-injury management."
      },
      {
        "title": "VENOUS ULCERS",
        "keyPoints": [
          "Look for:",
          "Oedema",
          "Venous skin changes",
          "Chronic lower-leg ulceration"
        ],
        "details": [],
        "practicalExample": "Evaluate vascular status and address venous hypertension where appropriate.",
        "clinicalPearl": "A topical preparation may support local wound care but does not correct venous hypertension."
      },
      {
        "title": "ARTERIAL INSUFFICIENCY",
        "keyPoints": [
          "Suspect compromised arterial perfusion with:",
          "Severe pain",
          "Cool skin",
          "Reduced pulses",
          "Distal tissue loss",
          "Poor wound healing"
        ],
        "details": [],
        "practicalExample": "Prompt vascular assessment may be required.",
        "clinicalPearl": "Suspected ischaemic wounds require vascular evaluation before routine wound-care strategies are relied upon."
      },
      {
        "title": "NECROTIC TISSUE",
        "keyPoints": [
          "Necrotic tissue may appear:",
          "Black",
          "Brown",
          "Yellow",
          "Devitalized"
        ],
        "details": [],
        "practicalExample": "Determine whether debridement is appropriate and safe.",
        "clinicalPearl": "Topical antimicrobial treatment does not replace appropriate management of devitalized tissue."
      },
      {
        "title": "DEEP OR RAPIDLY PROGRESSIVE INFECTION",
        "keyPoints": [
          "Warning features include:",
          "Rapidly spreading erythema",
          "Severe pain",
          "Tissue necrosis",
          "Fever",
          "Systemic deterioration",
          "Crepitus",
          "Significant swelling"
        ],
        "details": [],
        "practicalExample": "Urgent medical assessment is required.",
        "clinicalPearl": "Rapid progression or systemic features should trigger escalation rather than continued topical self-management."
      }
    ]
  },
  {
    "id": "rolitas-0-1",
    "slug": "rolitas-0-1",
    "brandName": "ROLITAS 0.1%",
    "genericName": "Tacrolimus 0.1% w/w Ointment",
    "tagline": "Topical Calcineurin Inhibitor",
    "therapeuticArea": "Acne",
    "route": "Topical",
    "routeSubcategory": "Acne",
    "dosageForm": "Ointment",
    "strength": "0.1%",
    "packSize": "10 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected inflammatory dermatoses, particularly atopic dermatitis",
    "composition": [
      "Each gram of ointment contains:",
      "Tacrolimus — 0.1% w/w",
      "Ointment base: q.s."
    ],
    "therapeuticCategory": "Topical calcineurin inhibitor • Atopic dermatitis & Vitilito • Steroid-Free Anti-Inflammatory Treatment • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "CALCINEURIN INHIBITION",
        "description": "Tacrolimus inhibits calcineurin-dependent T-cell activation."
      },
      {
        "step": "02",
        "title": "ANTI-INFLAMMATORY EFFECT",
        "description": "By suppressing T-cell-mediated inflammatory signalling, tacrolimus can reduce transcription and release of several inflammatory cytokines."
      },
      {
        "step": "03",
        "title": "STEROID-SPARING ROLE",
        "description": "A steroid-sparing strategy can be particularly valuable for recurrent disease involving sensitive or delicate skin sites."
      }
    ],
    "indications": [
      "Atopic dermatitis including vitiligo",
      "Delicate or steroid-sensitive areas",
      "Recurrent atopic dermatitis"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Tacrolimus 0.1% w/w Ointment or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "AGE & APPROVED USE",
        "detail": "The approved age range and strength-specific indications should be verified against the current local product information. For example, the U.S. labeling specifies tacrolimus 0.1% for adults, while 0.03% is the pediatric strength for ages 2-15 years."
      },
      {
        "title": "IMMUNOCOMPROMISED PATIENTS",
        "detail": "Tacrolimus ointment is not intended for use in immunocompromised patients under the referenced prescribing information. Management Implications Review relevant medical history before prescribing."
      },
      {
        "title": "MALIGNANCY WARNING",
        "detail": "Rare malignancies, including lymphoma and skin malignancies, have been reported in patients treated with topical calcineurin inhibitors; a causal relationship has not been established. Management Implications Avoid continuous long-term use and follow approved prescribing recommendations."
      },
      {
        "title": "ACTIVE INFECTION",
        "detail": "Do not overlook bacterial, viral or fungal infection in an inflamed skin lesion. Management Implications Evaluate suspected infection and treat appropriately."
      },
      {
        "title": "SUN EXPOSURE",
        "detail": "Avoid excessive natural or artificial UV exposure. Management Implications Appropriate sun-protective measures should be part of patient counselling."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Apply a thin layer of ROLITAS 0.1% to the affected skin exactly as directed by your doctor.\""
      },
      {
        "question": "INITIAL BURNING OR STINGING",
        "answer": "\"You may experience temporary burning, warmth or stinging when treatment is started. Tell your doctor if the reaction is severe or persistent.\""
      },
      {
        "question": "DO NOT APPLY TO INFECTED SKIN WITHOUT MEDICAL ADVICE",
        "answer": "\"Tell your doctor if the area becomes painful, crusted, blistered or rapidly worsens, as this may indicate an infection.\""
      },
      {
        "question": "AVOID EXCESSIVE SUN EXPOSURE",
        "answer": "\"Avoid unnecessary sun exposure and tanning beds while using tacrolimus. Follow your dermatologist's advice regarding sun protection.\""
      },
      {
        "question": "USE MOISTURIZER",
        "answer": "\"Continue appropriate regular moisturization as advised by your healthcare professional to support the skin barrier.\""
      },
      {
        "question": "DO NOT USE CONTINUOUSLY WITHOUT REVIEW",
        "answer": "\"Use ROLITAS 0.1% according to your prescribed treatment plan. Do not continue long-term continuous use without medical review.\""
      },
      {
        "question": "KEEP AWAY FROM EYES AND MUCOUS MEMBRANES",
        "answer": "\"Avoid getting the ointment in the eyes or on mucous membranes. If accidental contact occurs, rinse thoroughly.\""
      },
      {
        "question": "REPORT PERSISTENT NON-RESPONSE",
        "answer": "\"If your skin does not improve as expected or becomes worse, return to your doctor for reassessment.\""
      }
    ],
    "clinicalPearl": "ROLITAS 0.1% provides Tacrolimus 0.1% w/w, a topical calcineurin inhibitor that offers steroid-sparing anti-inflammatory therapy for appropriately selected inflammatory dermatoses. Its clinical value is particularly relevant in atopic dermatitis and sensitive skin sites where repeated corticosteroid exposure may be undesirable. Correct diagnosis, targeted application, infection assessment, sun-protection counselling and appropriate follow-up are central to safe use.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-AD",
        "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
        "slug": "clixodin-ad"
      },
      {
        "name": "CLIXODIN-BPO",
        "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
        "slug": "clixodin-bpo"
      },
      {
        "name": "CLIXODIN-NT",
        "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
        "slug": "clixodin-nt"
      }
    ],
    "references": [
      "Current approved ROLITAS 0.1% product information and package insert — primary source for product-specific indication, dosing, age restrictions, contraindications, warnings and precautions.",
      "American Academy of Dermatology. Guidelines of Care for the Management of Atopic Dermatitis in Adults With Topical Therapies. AAD guideline update.",
      "American Academy of Dermatology. Pediatric Atopic Dermatitis Guidelines, including topical calcineurin inhibitor recommendations.",
      "American Academy of Dermatology. Topical Calcineurin Inhibitors for Children.",
      "Current approved prescribing information for tacrolimus ointment."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ALLERGIC CONTACT DERMATITIS",
        "clinicalClues": [
          "New topical product exposure",
          "Localized distribution",
          "Burning or itching",
          "Recurrent disease related to specific exposures"
        ],
        "typicalAppearance": "Erythematous, scaly, sometimes vesicular eczematous plaques.",
        "diagnosticApproach": [
          "Review:",
          "Cosmetics",
          "Fragrances",
          "Preservatives",
          "Topical medicines",
          "Occupational exposures",
          "Patch testing may be considered when clinically appropriate."
        ],
        "managementApproach": [
          "Identify and minimize the relevant allergen."
        ],
        "clinicalPearl": "Persistent or treatment-resistant eczema should prompt consideration of contact allergy rather than repeated escalation of anti-inflammatory therapy alone."
      },
      {
        "id": "diff-2",
        "condition": "SEBORRHEIC DERMATITIS",
        "clinicalClues": [
          "Scalp involvement",
          "Nasolabial folds",
          "Eyebrows",
          "Postauricular areas",
          "Greasy or fine scaling"
        ],
        "typicalAppearance": "Erythematous patches with characteristic scaling in seborrhoeic distribution.",
        "diagnosticApproach": [
          "Assess distribution and scale characteristics."
        ],
        "managementApproach": [
          "Antifungal-directed therapy may be required when seborrhoeic dermatitis is the primary diagnosis."
        ],
        "clinicalPearl": "Distribution is particularly useful when distinguishing seborrhoeic dermatitis from atopic dermatitis."
      },
      {
        "id": "diff-3",
        "condition": "PSORIASIS",
        "clinicalClues": [
          "Well-demarcated plaques",
          "Persistent scaling",
          "Extensor involvement",
          "Nail changes",
          "Scalp involvement"
        ],
        "typicalAppearance": "Sharply demarcated plaques with variable scale.",
        "diagnosticApproach": [
          "Assess:",
          "Plaque morphology",
          "Distribution",
          "Nails",
          "Scalp",
          "Family history",
          "Joint symptoms"
        ],
        "managementApproach": [
          "Tacrolimus may have a role in selected facial or intertriginous psoriasis, but such use may be outside the approved indication depending on jurisdiction. AAD notes topical calcineurin inhibitors can be useful for psoriasis involving delicate areas."
        ],
        "clinicalPearl": "Before using tacrolimus for psoriasis, distinguish delicate-site psoriasis from infection or eczematous disease and verify the applicable prescribing status."
      },
      {
        "id": "diff-4",
        "condition": "SUPERFICIAL FUNGAL INFECTION",
        "clinicalClues": [
          "Annular lesions",
          "Peripheral scale",
          "Advancing border",
          "Asymmetric distribution"
        ],
        "typicalAppearance": "Annular erythematous plaques with a more active scaly border.",
        "diagnosticApproach": [
          "Consider skin scraping/KOH examination where appropriate."
        ],
        "managementApproach": [
          "Do not use tacrolimus as treatment for an untreated fungal infection."
        ],
        "clinicalPearl": "A worsening or atypical eruption during immunomodulatory treatment should prompt reconsideration of infection."
      },
      {
        "id": "diff-5",
        "condition": "BACTERIAL OR VIRAL SKIN INFECTION",
        "clinicalClues": [
          "Consider infection when there is:",
          "Pustulation",
          "Crusting",
          "Pain",
          "Vesicles",
          "Rapid deterioration",
          "Fever or systemic symptoms"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Clinical examination and appropriate microbiological testing where indicated."
        ],
        "managementApproach": [
          "Active infection should be appropriately evaluated and treated."
        ],
        "clinicalPearl": "Tacrolimus should not be used as a substitute for appropriate treatment of an active skin infection."
      },
      {
        "id": "diff-6",
        "condition": "CUTANEOUS T-CELL LYMPHOMA OR OTHER MIMICS",
        "clinicalClues": [
          "Consider alternative diagnoses when lesions are:",
          "Persistent",
          "Atypical",
          "Progressive",
          "Poorly responsive to optimized treatment",
          "Associated with unusual morphology"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Dermatological reassessment and biopsy may be appropriate when clinically indicated."
        ],
        "managementApproach": [
          "Do not repeatedly treat an uncertain diagnosis without reassessment."
        ],
        "clinicalPearl": "Treatment failure is sometimes a diagnostic clue."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a thin layer to the affected areas according to the prescribed regimen and approved product information."
        ],
        "details": [],
        "practicalExample": "Use sufficient ointment to lightly cover the affected skin without excessive application. For localized eczema, apply a thin layer directly to the involved areas rather than spreading unnecessarily over unaffected skin. Management Implications Correct application helps balance efficacy and tolerability.",
        "clinicalPearl": "Apply tacrolimus to the affected areas rather than using excessive quantities over unaffected skin."
      },
      {
        "title": "APPLICATION TO CLEAN, DRY SKIN",
        "keyPoints": [
          "Apply to appropriately clean and dry affected skin."
        ],
        "details": [],
        "practicalExample": "After gentle cleansing, allow the skin to dry before applying the ointment. Management Implications Avoid application immediately after bathing if the skin remains wet unless otherwise directed.",
        "clinicalPearl": "A simple, consistent application routine can improve adherence."
      },
      {
        "title": "BURNING & STINGING",
        "keyPoints": [
          "A transient burning, warmth or stinging sensation can occur during initial treatment.",
          "AAD notes that burning and stinging are among the most common adverse effects and often lessen as the skin improves."
        ],
        "details": [],
        "practicalExample": "A patient may experience temporary burning during the first few applications, particularly when treating active eczema. Management Implications Assess severity and persistence rather than automatically interpreting mild transient burning as treatment failure.",
        "clinicalPearl": "Early transient application-site burning is a recognized feature of topical calcineurin inhibitor therapy."
      },
      {
        "title": "MOISTURIZER INTEGRATION",
        "keyPoints": [
          "Moisturization remains an important part of atopic dermatitis management.",
          "AAD strongly recommends moisturizers as part of topical treatment for atopic dermatitis."
        ],
        "details": [],
        "practicalExample": "A patient can maintain regular use of an appropriate fragrance-free moisturizer as part of the overall eczema-care routine. Management Implications Tacrolimus should be considered one component of a broader skin-barrier management plan.",
        "clinicalPearl": "Anti-inflammatory treatment and barrier care work together; neither should be viewed in isolation."
      },
      {
        "title": "FLARE MANAGEMENT",
        "keyPoints": [
          "During an active flare, treatment should address:",
          "Inflammation",
          "Pruritus",
          "Skin-barrier impairment",
          "Potential triggers",
          "Infection where present"
        ],
        "details": [],
        "practicalExample": "Tacrolimus may be incorporated into the treatment plan for appropriate inflammatory areas according to the prescribed regimen. Management Implications Treatment should be individualized according to disease severity and site.",
        "clinicalPearl": "Successful eczema management requires treatment of both the visible flare and the factors contributing to recurrence."
      },
      {
        "title": "INTERMITTENT MAINTENANCE",
        "keyPoints": [
          "For selected patients with recurrent atopic dermatitis, topical calcineurin inhibitors may be used intermittently as maintenance therapy after disease control.",
          "AAD's pediatric guidance specifically supports intermittent maintenance use of topical calcineurin inhibitors in appropriate patients."
        ],
        "details": [],
        "practicalExample": "A dermatologist may prescribe intermittent application to previously recurrent sites according to the patient's treatment plan. Management Implications The objective is to reduce the frequency and severity of subsequent flares.",
        "clinicalPearl": "Maintenance therapy changes the strategy from repeatedly treating severe flares to proactively reducing recurrence."
      },
      {
        "title": "SUN & PHOTOTHERAPY",
        "keyPoints": [
          "Patients should be counselled to minimize unnecessary UV exposure.",
          "The AAD advises sun avoidance measures during TCI treatment and does not recommend phototherapy concurrently with TCI therapy."
        ],
        "details": [],
        "practicalExample": "Advise appropriate sun-protective measures and follow the treating dermatologist's instructions regarding phototherapy. Management Implications Phototherapy decisions should be coordinated with the treating dermatologist.",
        "clinicalPearl": "Sun-protection counselling should be incorporated into the treatment plan rather than treated as an afterthought."
      },
      {
        "title": "ACTIVE SKIN INFECTION",
        "keyPoints": [
          "Evaluate for:",
          "Impetiginization",
          "Herpes simplex infection",
          "Fungal infection",
          "Other bacterial or viral infections"
        ],
        "details": [],
        "practicalExample": "A rapidly worsening, crusted or vesicular eruption should prompt clinical reassessment. Management Implications Active infection should be appropriately addressed.",
        "clinicalPearl": "Inflammatory disease and infection can coexist; worsening inflammation is not always a reason to intensify immunomodulation."
      },
      {
        "title": "TREATMENT RESPONSE",
        "keyPoints": [
          "Assess:",
          "Itch",
          "Erythema",
          "Lesion extent",
          "Frequency of flares",
          "Tolerability",
          "Adherence"
        ],
        "details": [],
        "practicalExample": "If disease fails to improve despite appropriate use, reconsider diagnosis, adherence, triggers and possible infection. Management Implications Persistent non-response warrants reassessment rather than indefinite continuation without review.",
        "clinicalPearl": "When an apparently appropriate anti-inflammatory treatment fails, reconsider the diagnosis."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "FACE & EYELID INVOLVEMENT",
        "keyPoints": [
          "Facial and periocular eczema may be particularly sensitive to prolonged corticosteroid exposure.",
          "Typical Clinical Appearance",
          "Thin, erythematous, itchy or eczematous plaques involving facial or periocular skin."
        ],
        "details": [],
        "practicalExample": "Tacrolimus may be considered as a steroid-sparing option where clinically appropriate.",
        "clinicalPearl": "Sensitive-site disease is one of the situations where a steroid-sparing strategy may be particularly valuable."
      },
      {
        "title": "RECURRENT FLEXURAL ECZEMA",
        "keyPoints": [
          "Common sites include:",
          "Neck",
          "Axillae",
          "Groin",
          "Popliteal fossae",
          "Antecubital fossae",
          "Typical Clinical Appearance",
          "Erythematous, itchy inflammatory patches or plaques."
        ],
        "details": [],
        "practicalExample": "Consider site-specific treatment and trigger management.",
        "clinicalPearl": "Flexural disease requires attention to moisture, friction, infection and the suitability of topical therapy for the site."
      },
      {
        "title": "STEROID-DEPENDENT OR FREQUENTLY TREATED AREAS",
        "keyPoints": [
          "Consider steroid-sparing treatment when repeated corticosteroid use is required."
        ],
        "details": [],
        "practicalExample": "Reassess disease control, trigger factors and long-term maintenance strategy.",
        "clinicalPearl": "Repeated flares in the same anatomical site may indicate a need for a proactive maintenance strategy."
      },
      {
        "title": "RECURRENT DISEASE",
        "keyPoints": [
          "Assess:",
          "Frequency of flares",
          "Trigger factors",
          "Adherence",
          "Moisturizer use",
          "Environmental exposures",
          "Infection"
        ],
        "details": [],
        "practicalExample": "Consider both flare treatment and maintenance planning.",
        "clinicalPearl": "Recurrent disease should be managed as a longitudinal condition rather than as isolated episodes."
      },
      {
        "title": "SUSPECTED CONTACT ALLERGY",
        "keyPoints": [
          "Consider when:",
          "Disease is localized",
          "Distribution is unusual",
          "Treatment response is incomplete",
          "New products have been introduced",
          "Eczema repeatedly returns after exposure"
        ],
        "details": [],
        "practicalExample": "Consider patch testing when clinically appropriate.",
        "clinicalPearl": "Persistent dermatitis despite optimized treatment should trigger diagnostic reassessment, including consideration of contact allergy."
      },
      {
        "title": "SUSPECTED INFECTION",
        "keyPoints": [
          "Watch for:",
          "Rapid worsening",
          "Crusting",
          "Pustules",
          "Vesicles",
          "Pain",
          "Fever",
          "Systemic symptoms"
        ],
        "details": [],
        "practicalExample": "Evaluate and treat the suspected infection appropriately.",
        "clinicalPearl": "Infection should be actively considered when an otherwise familiar inflammatory eruption changes character."
      }
    ]
  },
  {
    "id": "romitiz-500",
    "slug": "romitiz-500",
    "brandName": "ROMITIZ-500",
    "genericName": "Azithromycin 500 mg Tablet",
    "tagline": "Macrolide Antibiotic",
    "therapeuticArea": "Antibacterial",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packSize": "10 × 5 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Treatment of susceptible bacterial infections",
    "composition": [
      "Each uncoated/film-coated tablet contains:",
      "Azithromycin — 500 mg",
      "Excipients: q.s."
    ],
    "therapeuticCategory": "Macrolide Antibacterial • Oral • Susceptible Bacterial Infections • Prescription Medicine",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Azithromycin Binds to the 50S subunit of the bacterial ribosome Bacterial ribosome Inhibition of bacterial protein synthesis Suppression of susceptible bacterial growth"
      }
    ],
    "indications": [
      "Respiratory tract infections",
      "Community-acquired respiratory infections",
      "Skin & soft-tissue infections",
      "Sexually transmitted / genital infections"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Azithromycin 500 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "GASTROINTESTINAL EFFECTS",
        "detail": "Commonly reported adverse effects may include: Nausea Abdominal discomfort Diarrhoea Vomiting"
      },
      {
        "title": "HYPERSENSITIVITY",
        "detail": "Patients should seek medical attention if symptoms suggest a significant allergic reaction, including: Facial or throat swelling Difficulty breathing Severe rash Widespread blistering or skin peeling"
      },
      {
        "title": "HEPATIC CONSIDERATIONS",
        "detail": "Azithromycin is associated with potential hepatic adverse effects. Consider caution in patients with: Significant hepatic impairment Previous liver injury associated with macrolides"
      },
      {
        "title": "CARDIAC CONSIDERATIONS",
        "detail": "Azithromycin can affect cardiac repolarisation and may prolong the QT interval in susceptible patients. Consider risk factors such as: Known QT prolongation Certain cardiac conditions Electrolyte abnormalities Concomitant medicines that prolong QT"
      },
      {
        "title": "DRUG INTERACTIONS",
        "detail": "Review concomitant medications where appropriate, particularly medicines that may: Prolong QT interval Affect cardiac rhythm Interact through relevant metabolic or transporter pathways"
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "TAKE AS PRESCRIBED",
        "answer": "\"Take ROMITIZ-500 exactly as prescribed. Do not change the dose or duration without consulting your doctor.\""
      },
      {
        "question": "DO NOT USE FOR COMMON VIRAL ILLNESSES",
        "answer": "\"Antibiotics do not treat viral infections such as most common colds and influenza.\""
      },
      {
        "question": "DO NOT SHARE ANTIBIOTICS",
        "answer": "\"Do not give your tablets to another person, even if their symptoms appear similar.\""
      },
      {
        "question": "REPORT SIGNIFICANT ADVERSE EFFECTS",
        "answer": "Patients should promptly seek medical attention for: Severe allergic reaction Significant or persistent diarrhoea Severe skin reaction Fainting or significant palpitations Jaundice or other concerning hepatic symptoms"
      },
      {
        "question": "COMPLETE THE PRESCRIBED COURSE",
        "answer": "\"Follow the treatment duration prescribed by your doctor. Do not stop, extend or restart treatment on your own.\""
      }
    ],
    "clinicalPearl": "Polypharmacy can increase the importance of interaction and QT-risk assessment.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      }
    ],
    "references": [
      "Current approved ROMITIZ-500 product information and package insert — primary source for indications, dosage, contraindications, warnings, precautions, interactions and adverse effects.",
      "Current national and international antimicrobial treatment guidelines applicable to the specific infection.",
      "Current antimicrobial stewardship guidance.",
      "Current official prescribing information for azithromycin."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "VIRAL RESPIRATORY INFECTION",
        "clinicalClues": [
          "Coryzal symptoms",
          "Cough",
          "Sore throat",
          "Myalgia",
          "Self-limited course",
          "Typical Clinical Presentation",
          "Symptoms may overlap considerably with bacterial respiratory infections."
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess the overall clinical picture and use appropriate testing where indicated."
        ],
        "managementApproach": [
          "Antibiotics are not useful against viral infections."
        ],
        "clinicalPearl": "Avoid antibiotic treatment solely because respiratory symptoms are persistent without evidence supporting bacterial infection."
      },
      {
        "id": "diff-2",
        "condition": "NON-INFECTIOUS INFLAMMATORY CONDITIONS",
        "clinicalClues": [
          "Consider:",
          "Allergic conditions",
          "Inflammatory disorders",
          "Irritant conditions",
          "Autoimmune disease"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Assess history, examination and relevant investigations."
        ],
        "managementApproach": [
          "Antibacterial therapy should not replace treatment directed at the underlying non-infectious condition."
        ],
        "clinicalPearl": "Not every erythematous, painful or inflamed presentation is caused by bacteria."
      },
      {
        "id": "diff-3",
        "condition": "FUNGAL INFECTION",
        "clinicalClues": [
          "May include:",
          "Scaling",
          "Annular lesions",
          "Pruritus",
          "Characteristic distribution"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Consider fungal microscopy or other appropriate testing where indicated."
        ],
        "managementApproach": [
          "Antibacterial therapy will not treat dermatophyte or other fungal infections."
        ],
        "clinicalPearl": "Failure of an antibiotic to improve a fungal infection is not antibiotic failure—it is a diagnostic issue."
      },
      {
        "id": "diff-4",
        "condition": "DRUG-RELATED OR ALLERGIC REACTION",
        "clinicalClues": [
          "Rash",
          "Pruritus",
          "Urticaria",
          "Temporal relationship to medication exposure"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review recent medication history."
        ],
        "managementApproach": [
          "Assess for drug hypersensitivity and discontinue the suspected medicine when clinically appropriate."
        ],
        "clinicalPearl": "A new rash during antibiotic therapy should prompt consideration of both the underlying illness and a possible drug reaction."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "APPROPRIATE ANTIBIOTIC SELECTION",
        "keyPoints": [
          "Antibiotic choice should consider:",
          "Confirmed or suspected pathogen",
          "Site of infection",
          "Severity",
          "Local resistance patterns",
          "Patient-specific factors",
          "Relevant allergies",
          "Previous antibiotic exposure",
          "Management Implications",
          "Use azithromycin when it represents an appropriate option for the suspected or confirmed infection."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "The right antibiotic is determined by the infection—not simply by the presence of fever or inflammation."
      },
      {
        "title": "DOSING",
        "keyPoints": [
          "Azithromycin dosing varies according to:",
          "Indication",
          "Patient age",
          "Body weight",
          "Infection severity",
          "Organ function",
          "Local treatment recommendations"
        ],
        "details": [],
        "practicalExample": "The prescribed dose and duration should follow the approved product information and current treatment guideline applicable to the specific indication. A 500 mg tablet may be used as part of an indication-specific regimen, but the appropriate schedule should not be generalized across different infections. Management Implications Avoid self-selection of dose or duration.",
        "clinicalPearl": "\"500 mg\" identifies the tablet strength; it does not by itself define the complete treatment regimen."
      },
      {
        "title": "DURATION OF THERAPY",
        "keyPoints": [
          "Treatment duration is indication-specific.",
          "Management Implications",
          "Use the shortest effective regimen supported by current clinical guidance."
        ],
        "details": [],
        "practicalExample": "Different bacterial infections may require different dosing schedules and durations.",
        "clinicalPearl": "Longer antibiotic treatment is not automatically more effective and may increase unnecessary antimicrobial exposure."
      },
      {
        "title": "MISSED DOSE",
        "keyPoints": [
          "Patients should follow the prescribed dosing schedule."
        ],
        "details": [],
        "practicalExample": "If a dose is missed, the patient should follow the instructions provided by the treating healthcare professional or approved product information rather than independently doubling doses. Management Implications Consistent administration supports appropriate antimicrobial exposure.",
        "clinicalPearl": "Patients should not compensate for a missed dose by taking additional tablets without appropriate guidance."
      },
      {
        "title": "ANTIMICROBIAL STEWARDSHIP",
        "keyPoints": [],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "USE ONLY WHEN INDICATED",
        "keyPoints": [],
        "details": [
          "Appropriate antibiotic use protects both the individual patient and the effectiveness of antibiotics at population level."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "COMPLETE THE PRESCRIBED REGIMEN",
        "keyPoints": [],
        "details": [
          "Patients should follow the treatment plan prescribed by their healthcare professional."
        ],
        "practicalExample": "",
        "clinicalPearl": ""
      },
      {
        "title": "RESISTANCE CONSIDERATIONS",
        "keyPoints": [
          "Inappropriate antibiotic exposure can contribute to antimicrobial resistance.",
          "Management Implications",
          "Consider:",
          "Local resistance patterns",
          "Previous antibiotic exposure",
          "Culture and susceptibility results when appropriate"
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Antimicrobial stewardship is part of good clinical prescribing."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "PATIENTS WITH CARDIAC RISK FACTORS",
        "keyPoints": [
          "Assess for:",
          "QT prolongation",
          "Arrhythmia history",
          "Relevant electrolyte abnormalities",
          "Concomitant QT-prolonging medicines",
          "Management Considerations",
          "Use clinical judgement and appropriate risk assessment."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Cardiac risk assessment may be particularly relevant when multiple QT-prolonging factors are present."
      },
      {
        "title": "HEPATIC IMPAIRMENT",
        "keyPoints": [
          "Review the patient's hepatic history before treatment where relevant.",
          "Management Considerations",
          "Monitor clinically for hepatic adverse effects."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Previous drug-induced liver injury should be considered when selecting antimicrobial therapy."
      },
      {
        "title": "OLDER PATIENTS / POLYPHARMACY",
        "keyPoints": [
          "Older patients may have:",
          "Multiple medications",
          "Cardiovascular comorbidities",
          "Renal or hepatic impairment",
          "Increased interaction potential",
          "Management Considerations",
          "Perform appropriate medication reconciliation."
        ],
        "details": [],
        "practicalExample": "",
        "clinicalPearl": "Polypharmacy can increase the importance of interaction and QT-risk assessment."
      }
    ]
  },
  {
    "id": "ryan-bpo",
    "slug": "ryan-bpo",
    "brandName": "RYAN-BPO",
    "genericName": "Hydrous Benzoyl Peroxide 2.5% Gel",
    "tagline": "Topical Anti-Acne Preparation",
    "therapeuticArea": "Acne",
    "route": "Topical",
    "routeSubcategory": "Acne",
    "dosageForm": "Gel",
    "strength": "2.5%",
    "packSize": "20 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Selected mild-to-moderate inflammatory and mixed acne presentations",
    "composition": [
      "Each gram of gel contains:",
      "Hydrous Benzoyl Peroxide IP equivalent to Benzoyl Peroxide — 2.5% w/w",
      "Gel base: q.s."
    ],
    "therapeuticCategory": "Anti-acne preparation • Topical • Keratolytic & Anti-Inflammatory • Prescription medicine",
    "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Benzoyl Peroxide Decomposes on the skin and generates reactive oxygen species with antimicrobial activity. Reduce the burden of acne-associated bacteria within the follicular environment. Keratolytic activity Reduce follicular plugging. Anti-inflammatory role Reduction of inflammatory acne lesions."
      }
    ],
    "indications": [
      "INFLAMMATORY ACNE",
      "MIXED ACNE",
      "MILD ACNE WITH INFLAMMATORY COMPONENT"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Assess risk vs benefit in consultation with prescribing physician.",
      "lactation": "Caution advised; evaluate systemic absorption and clinical necessity.",
      "paediatric": "Safety and effectiveness established per indicated age groups.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to Hydrous Benzoyl Peroxide 2.5% Gel or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "LOCAL IRRITATION",
        "detail": "Possible effects include: Dryness Scaling Burning Stinging Erythema Peeling"
      },
      {
        "title": "EYE AND MUCOSAL CONTACT",
        "detail": "Avoid contact with: Eyes Eyelids Lips Other mucosal surfaces If accidental contact occurs, rinse appropriately."
      },
      {
        "title": "BROKEN OR SEVERELY IRRITATED SKIN",
        "detail": "Avoid unnecessary application to severely compromised skin unless specifically directed by the treating clinician."
      },
      {
        "title": "FABRIC AND HAIR BLEACHING",
        "detail": "Benzoyl peroxide may bleach coloured fabrics and hair. Patients should be counselled accordingly."
      }
    ],
    "adverseEffects": {
      "common": [],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "HOW TO APPLY",
        "answer": "\"Cleanse the affected area gently, allow the skin to dry, and apply a thin layer of RYAN-BPO as directed by your doctor.\""
      },
      {
        "question": "POSSIBLE EARLY IRRITATION",
        "answer": "\"Some dryness, redness, burning or peeling may occur when treatment is started. Inform your doctor if irritation becomes severe or persistent.\""
      },
      {
        "question": "AVOID HARSH SKIN CARE",
        "answer": "\"Avoid excessive scrubbing, picking, squeezing acne lesions and unnecessary use of irritating skin-care products.\""
      },
      {
        "question": "FABRIC DISCOLORATION",
        "answer": "\"Benzoyl peroxide may bleach coloured fabrics or hair. Avoid unnecessary contact with clothing, towels and bedding.\""
      },
      {
        "question": "SUN PROTECTION",
        "answer": "\"Limit excessive sun exposure and use appropriate daytime photoprotection, particularly if your skin becomes irritated or you are prone to pigmentation.\""
      },
      {
        "question": "CONSISTENCY MATTERS",
        "answer": "\"Use the medicine regularly as directed. Acne improvement generally requires consistent treatment rather than occasional application.\""
      },
      {
        "question": "DO NOT PICK ACNE",
        "answer": "\"Avoid squeezing or picking acne lesions because this can increase inflammation and the risk of persistent marks or scarring.\""
      },
      {
        "question": "WHEN TO RETURN TO THE DOCTOR",
        "answer": "Seek medical review if: Acne rapidly worsens Deep painful nodules develop New scarring appears Severe irritation occurs There is no expected improvement Acne repeatedly relapses"
      }
    ],
    "clinicalPearl": "RYAN-BPO provides Hydrous Benzoyl Peroxide 2.5% w/w as a non-antibiotic topical approach to acne management. Its antimicrobial and keratolytic properties make it relevant to selected inflammatory and mixed acne presentations, while appropriate application, irritation management, patient counselling and antimicrobial stewardship remain central to effective use.",
    "relatedProducts": [
      {
        "name": "CLIXODIN-AD",
        "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
        "slug": "clixodin-ad"
      },
      {
        "name": "CLIXODIN-BPO",
        "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
        "slug": "clixodin-bpo"
      },
      {
        "name": "CLIXODIN-NT",
        "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
        "slug": "clixodin-nt"
      }
    ],
    "references": [
      "Current approved RYAN-BPO product information and package insert — primary source for product-specific indications, dosage, contraindications, warnings, precautions and adverse effects.",
      "Current prescribing information for topical benzoyl peroxide.",
      "Current evidence-based clinical guidelines for acne vulgaris.",
      "Current dermatology guidance concerning acne severity, scarring risk and treatment escalation.",
      "Current recommendations concerning topical antibiotic use and antimicrobial stewardship in acne."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "ROSACEA",
        "clinicalClues": [
          "Consider rosacea with:",
          "Persistent centrofacial erythema",
          "Flushing",
          "Telangiectasia",
          "Papules/pustules",
          "Trigger-related exacerbations"
        ],
        "typicalAppearance": "Centrofacial erythema with inflammatory papules or pustules, often without typical comedones.",
        "diagnosticApproach": [
          "Assess:",
          "Distribution",
          "Flushing",
          "Triggers",
          "Presence or absence of comedones"
        ],
        "managementApproach": [
          "Use rosacea-directed management where appropriate."
        ],
        "clinicalPearl": "The presence of typical comedones supports acne, whereas persistent central facial erythema and flushing may suggest rosacea."
      },
      {
        "id": "diff-2",
        "condition": "FOLLICULITIS",
        "clinicalClues": [
          "Follicular papules",
          "Follicular pustules",
          "Pruritus",
          "Hair-bearing distribution"
        ],
        "typicalAppearance": "Monomorphic lesions centred around individual hair follicles.",
        "diagnosticApproach": [
          "Consider:",
          "Bacterial folliculitis",
          "Malassezia folliculitis",
          "Occlusion",
          "Shaving"
        ],
        "managementApproach": [
          "Treatment should be directed toward the underlying cause."
        ],
        "clinicalPearl": "Monomorphic follicular lesions without comedones should prompt consideration of folliculitis."
      },
      {
        "id": "diff-3",
        "condition": "MALASSEZIA FOLLICULITIS",
        "clinicalClues": [
          "Itchy monomorphic papules",
          "Follicular pustules",
          "Upper trunk involvement",
          "Chest/back predominance",
          "Heat or occlusion-associated worsening"
        ],
        "typicalAppearance": "Uniform follicular papules and pustules with little or no comedonal component.",
        "diagnosticApproach": [
          "Clinical assessment may be supplemented by appropriate testing."
        ],
        "managementApproach": [
          "Consider an antifungal-directed strategy where appropriate."
        ],
        "clinicalPearl": "Prominent itch and monomorphic follicular lesions are useful clues against typical acne vulgaris."
      },
      {
        "id": "diff-4",
        "condition": "PERIORIFICIAL DERMATITIS",
        "clinicalClues": [
          "Small facial papules",
          "Perioral/perinasal/periocular distribution",
          "Relative vermilion sparing",
          "Possible corticosteroid exposure"
        ],
        "typicalAppearance": "Small erythematous papules or pustules clustered around facial orifices.",
        "diagnosticApproach": [
          "Review:",
          "Topical corticosteroid exposure",
          "Cosmetics",
          "Skin-care products",
          "Distribution"
        ],
        "managementApproach": [
          "Do not automatically treat every facial papulopustular eruption as acne."
        ],
        "clinicalPearl": "Distribution and medication history can be more diagnostically useful than the presence of papules alone."
      },
      {
        "id": "diff-5",
        "condition": "STEROID-INDUCED ACNEIFORM ERUPTION",
        "clinicalClues": [
          "Sudden onset",
          "Monomorphic lesions",
          "Temporal relationship to corticosteroid exposure",
          "Possible truncal predominance"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review topical and systemic corticosteroid exposure."
        ],
        "managementApproach": [
          "Address the underlying trigger where clinically appropriate."
        ],
        "clinicalPearl": "A sudden monomorphic eruption following corticosteroid exposure should prompt consideration of an acneiform drug eruption."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Apply a thin layer over the affected acne-prone area according to the approved product directions."
        ],
        "details": [],
        "practicalExample": "Use sufficient gel to form a thin, even film. Avoid applying unnecessarily large quantities. For facial acne, a small amount can be spread evenly across the acne-prone region rather than applying a thick layer over each individual lesion. Management Implications Excessive application may increase irritation without providing proportionately greater benefit.",
        "clinicalPearl": "More product does not necessarily mean faster improvement; consistent, thin application is generally more practical."
      },
      {
        "title": "APPLICATION TECHNIQUE",
        "keyPoints": [
          "A practical sequence:",
          "Cleanse gently.",
          "Allow the skin to dry.",
          "Apply a thin layer.",
          "Avoid eyes and mucosal surfaces.",
          "Wash hands after application."
        ],
        "details": [],
        "practicalExample": "The patient gently cleanses the affected area, dries the skin and applies the prescribed amount of gel evenly. Management Implications Avoid vigorous rubbing or excessive product use.",
        "clinicalPearl": "Application technique can influence both tolerability and adherence."
      },
      {
        "title": "STARTING THERAPY",
        "keyPoints": [
          "Benzoyl peroxide can produce irritation, particularly when treatment is initiated.",
          "Possible effects include:",
          "Dryness",
          "Erythema",
          "Burning",
          "Stinging",
          "Scaling",
          "Peeling"
        ],
        "details": [],
        "practicalExample": "A patient with sensitive skin who develops mild dryness should have the skin-care routine reviewed and may require supportive moisturization according to clinical judgement. Management Implications Significant irritation may require modification of the treatment approach.",
        "clinicalPearl": "Early irritation should be assessed rather than interpreted automatically as treatment failure."
      },
      {
        "title": "BENZOYL PEROXIDE & FABRIC DISCOLORATION",
        "keyPoints": [
          "Benzoyl peroxide can bleach or discolor:",
          "Coloured towels",
          "Clothing",
          "Bedding",
          "Hair"
        ],
        "details": [],
        "practicalExample": "Patients can be counselled to avoid unnecessary contact between the wet product and coloured fabrics. Management Implications Advance counselling can prevent avoidable cosmetic inconvenience.",
        "clinicalPearl": "Simple practical counselling can improve patient confidence and treatment adherence."
      },
      {
        "title": "SKIN-CARE SUPPORT",
        "keyPoints": [
          "Consider a supportive routine including:",
          "Gentle cleansing",
          "Appropriate moisturization",
          "Non-comedogenic products",
          "Appropriate daytime photoprotection",
          "Avoidance of harsh scrubbing"
        ],
        "details": [],
        "practicalExample": "A patient experiencing dryness may use a suitable moisturizer and avoid unnecessary exfoliating products. Management Implications Supporting the skin barrier can improve treatment tolerability.",
        "clinicalPearl": "An acne regimen that patients can comfortably maintain is more likely to be used consistently."
      },
      {
        "title": "TREATMENT DURATION & FOLLOW-UP",
        "keyPoints": [
          "Acne treatment requires consistent use and periodic reassessment."
        ],
        "details": [],
        "practicalExample": "If the response is inadequate, review: Diagnosis Adherence Application technique Disease severity Concurrent skin-care products Need for combination or escalated therapy Management Implications Treatment should not be continued indefinitely without reassessment when the expected response is not achieved.",
        "clinicalPearl": "A structured follow-up approach helps distinguish true treatment failure from poor adherence, incorrect application or an alternative diagnosis."
      },
      {
        "title": "USE WITH TOPICAL ANTIBIOTICS",
        "keyPoints": [
          "Benzoyl peroxide can be used as part of acne regimens that include topical antibiotics."
        ],
        "details": [],
        "practicalExample": "Where a topical antibiotic is clinically indicated, benzoyl peroxide may form part of a combination strategy rather than relying on antibiotic therapy alone. Management Implications This approach is relevant to antimicrobial stewardship.",
        "clinicalPearl": "Benzoyl peroxide is an important non-antibiotic component of acne treatment and can help reduce reliance on antibiotic activity alone."
      },
      {
        "title": "MAINTENANCE STRATEGY",
        "keyPoints": [
          "Long-term acne management may require a non-antibiotic maintenance approach depending on the patient's acne phenotype."
        ],
        "details": [],
        "practicalExample": "Once acute inflammatory disease is controlled, reassess whether continued benzoyl peroxide, a topical retinoid or another maintenance approach is appropriate. Management Implications Maintenance should be individualized rather than automatically continuing an antibiotic-containing regimen.",
        "clinicalPearl": "The goal of maintenance therapy is sustained acne control with an appropriate long-term safety and stewardship profile."
      }
    ],
    "specialClinicalSituations": [
      {
        "title": "ACNE WITH SCARRING RISK",
        "keyPoints": [
          "Risk factors include:",
          "Deep inflammatory lesions",
          "Nodules",
          "Prolonged active disease",
          "Delayed treatment",
          "Picking or squeezing",
          "Previous acne scarring",
          "Typical Clinical Appearance",
          "Possible sequelae include:",
          "Atrophic scars",
          "Hypertrophic scars",
          "Keloidal scars",
          "Post-inflammatory erythema",
          "Post-inflammatory hyperpigmentation"
        ],
        "details": [],
        "practicalExample": "Assess scarring risk early and consider treatment escalation when appropriate.",
        "clinicalPearl": "Emerging scarring is a reason to reassess disease severity and treatment adequacy."
      },
      {
        "title": "SEVERE OR NODULOCYSTIC ACNE",
        "keyPoints": [
          "Look for:",
          "Deep nodules",
          "Cysts",
          "Significant tenderness",
          "Extensive inflammation",
          "Scarring"
        ],
        "details": [],
        "practicalExample": "Consider specialist assessment and treatment escalation.",
        "clinicalPearl": "Severe nodular or scarring acne generally requires a broader therapeutic strategy than topical benzoyl peroxide alone."
      },
      {
        "title": "RECURRENT ACNE",
        "keyPoints": [
          "Review:",
          "Adherence",
          "Treatment duration",
          "Application technique",
          "Skin-care routine",
          "Triggering factors",
          "Long-term maintenance plan"
        ],
        "details": [],
        "practicalExample": "Reassess the diagnosis and acne phenotype.",
        "clinicalPearl": "Repeated recurrence should prompt reassessment rather than simply increasing product quantity or frequency."
      },
      {
        "title": "ACNE WITH POST-INFLAMMATORY HYPERPIGMENTATION",
        "keyPoints": [
          "Inflammatory acne may leave persistent pigmentation, particularly in darker skin phototypes."
        ],
        "details": [],
        "practicalExample": "Control active acne and consider an appropriate strategy for pigmentary sequelae.",
        "clinicalPearl": "Reducing ongoing inflammation may help reduce repeated cycles of post-inflammatory pigmentation."
      },
      {
        "title": "SENSITIVE OR IRRITATION-PRONE SKIN",
        "keyPoints": [
          "Review:",
          "Baseline sensitivity",
          "Existing dermatitis",
          "Exfoliating products",
          "Harsh cleansers",
          "Multiple active ingredients"
        ],
        "details": [],
        "practicalExample": "Simplify the skin-care routine and assess treatment tolerability.",
        "clinicalPearl": "Unnecessary irritation can compromise adherence even when the selected acne treatment is clinically appropriate."
      },
      {
        "title": "PREGNANCY",
        "keyPoints": [
          "Treatment selection should account for pregnancy status and current clinical guidance."
        ],
        "details": [],
        "practicalExample": "Review the current approved product information before treatment selection.",
        "clinicalPearl": "Pregnancy-related treatment decisions should be individualized and based on current prescribing guidance."
      }
    ]
  },
  {
    "id": "ryoclin",
    "slug": "ryoclin",
    "brandName": "RYOCLIN",
    "genericName": "Hydroquinone 2% + Tretinoin 0.025% + Mometasone Furoate 0.1% Cream",
    "tagline": "Triple-Combination Topical Therapy for Hyperpigmentation",
    "therapeuticArea": "Antibacterial",
    "route": "Topical",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Cream",
    "strength": "2%",
    "packSize": "15 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "Hydroquinone 2% + Tretinoin 0.025% + Mometasone Furoate 0.1%",
    "composition": [
      "Each gram contains:",
      "Hydroquinone 2% w/w",
      "Tretinoin 0.025% w/w",
      "Mometasone Furoate 0.1% w/w",
      "In a suitable cream base q.s."
    ],
    "therapeuticCategory": "Triple-combination depigmenting therapy • Topical retinoid • Topical corticosteroid • Hyperpigmentation",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Mode of Action",
        "description": "Hydroquinone Reducing melanin synthesis through reversible inhibition of tyrosinase, an important enzyme in melanogenesis. Tretinoin Increased epidermal turnover Facilitates removal of pigmented keratinocytes Mometasone Furoate Topical corticosteroid with anti-inflammatory activity"
      }
    ],
    "indications": [
      "Hyperpigmentary Disorders",
      "Melasma"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Accordion — LACTATION",
      "lactation": "The prescribing clinician should assess:",
      "paediatric": "The combination of a depigmenting agent, retinoid and potent corticosteroid requires careful clinical assessment.",
      "geriatric": "Dose selection should be cautious reflecting frequency of decreased hepatic/renal function."
    },
    "contraindications": [
      "Known hypersensitivity to any component",
      "Acute skin infection",
      "Active inflammatory or irritated skin at the intended application site",
      "Certain viral, fungal or bacterial skin conditions",
      "Conditions where potent topical corticosteroid use is inappropriate",
      "Pregnancy or planned pregnancy, particularly because the formulation contains tretinoin",
      "MAINTENANCE & RECURRENCE",
      "Accordion 01 — WHY CAN PIGMENTATION RETURN?",
      "Key Clinical Points",
      "Melasma can be chronic and recurrent.",
      "Potential contributors include:",
      "UV exposure",
      "Visible light",
      "Hormonal factors",
      "Heat",
      "Ongoing triggers",
      "Inadequate maintenance",
      "Skin irritation",
      "Management Considerations",
      "Long-term management generally focuses on:",
      "Photoprotection",
      "Trigger management",
      "Appropriate maintenance therapy",
      "Periodic dermatological review",
      "Clinical Pearl",
      "Pigment control is a continuing management process rather than a one-time correction.",
      "Accordion 02 — MAINTENANCE APPROACH",
      "Key Clinical Points",
      "After achieving improvement, the dermatologist may consider a maintenance strategy appropriate to the individual patient.",
      "Management Considerations",
      "Possible approaches may include:",
      "Consistent photoprotection",
      "Gentle skincare",
      "Selected non-steroid topical agents",
      "Intermittent or alternative depigmenting approaches",
      "Periodic clinical reassessment",
      "Clinical Pearl",
      "Maintenance should preserve improvement while minimising unnecessary exposure to potent corticosteroids.",
      "WARNINGS & PRECAUTIONS",
      "Accordion 01 — FACIAL USE",
      "RYOCLIN is intended for carefully selected dermatological use.",
      "Because it contains a potent topical corticosteroid, prolonged unsupervised facial application should be avoided.",
      "Accordion 02 — EYE AREA",
      "Avoid contact with:",
      "Eyes",
      "Eyelids",
      "Periocular skin unless specifically directed",
      "Mucosal surfaces",
      "Clinical Pearl",
      "The periocular region requires particular caution because of the sensitivity of the skin and potential adverse effects from topical corticosteroids and retinoids.",
      "Accordion 03 — IRRITATED OR DAMAGED SKIN",
      "Avoid application to:",
      "Open wounds",
      "Abraded skin",
      "Severely irritated skin",
      "Actively infected lesions",
      "unless specifically directed by the treating dermatologist.",
      "Accordion 04 — SUN EXPOSURE",
      "Consistent photoprotection is essential during pigmentation treatment.",
      "Use:",
      "Broad-spectrum sunscreen",
      "Protective clothing",
      "Hats",
      "Shade",
      "Appropriate sun-avoidance measures",
      "For melasma, tinted sunscreen containing iron oxides may provide additional protection against visible light.",
      "Accordion 05 — IRRITATION & POST-INFLAMMATORY PIGMENTATION",
      "Excessive irritation may worsen pigmentation in susceptible patients.",
      "Hydroquinone and tretinoin can cause irritation, and treatment should therefore be appropriately titrated and monitored.",
      "Clinical Pearl",
      "In pigmentation disorders, unnecessary inflammation can become part of the problem."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — FACIAL USE",
        "detail": "Accordion 01 — FACIAL USE"
      },
      {
        "title": "RYOCLIN is intended for carefully select",
        "detail": "RYOCLIN is intended for carefully selected dermatological use."
      },
      {
        "title": "Because it contains a potent topical cor",
        "detail": "Because it contains a potent topical corticosteroid, prolonged unsupervised facial application should be avoided."
      },
      {
        "title": "Accordion 02 — EYE AREA",
        "detail": "Accordion 02 — EYE AREA"
      },
      {
        "title": "Avoid contact with:",
        "detail": "Avoid contact with:"
      }
    ],
    "adverseEffects": {
      "common": [
        "Redness",
        "Burning",
        "Stinging",
        "Dryness",
        "Scaling",
        "Irritation",
        "Contact dermatitis",
        "Acneiform eruptions",
        "Skin atrophy",
        "Telangiectasia",
        "Hypopigmentation",
        "Increased sensitivity"
      ],
      "lessCommon": [],
      "rare": []
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "WHAT IS RYOCLIN?",
        "answer": "RYOCLIN contains three active ingredients: HydroquinoneHelps reduce excess pigment production. TretinoinSupports epidermal turnover. Mometasone FuroateHelps control inflammation."
      },
      {
        "question": "HOW SHOULD IT BE USED?",
        "answer": "Use exactly as prescribed by the dermatologist. Apply a thin layer to the intended treatment area. Do not increase the quantity or frequency without medical advice."
      },
      {
        "question": "SHOULD IT BE USED ALL OVER THE FACE?",
        "answer": "Not unless specifically prescribed. The treatment area and duration should be determined by the treating dermatologist."
      },
      {
        "question": "IS SUNSCREEN NECESSARY?",
        "answer": "Yes. Daily photoprotection is an essential part of pigmentation management. Use broad-spectrum sunscreen and appropriate sun-protective measures. For melasma, tinted sunscreens containing iron oxides may provide additional protection from visible light."
      },
      {
        "question": "WHAT IF THE SKIN BURNS OR PEELS?",
        "answer": "Mild irritation may occur with tretinoin-containing therapy. However, significant burning, swelling, severe redness or persistent irritation should be reported to the treating dermatologist. Patient Education Pearl Do not assume that severe irritation means the treatment is working better."
      },
      {
        "question": "CAN RYOCLIN BE USED AS A DAILY SKINCARE CREAM?",
        "answer": "No. RYOCLIN is a medicated dermatological formulation, not a routine cosmetic moisturiser or permanent skin-lightening cream."
      },
      {
        "question": "CAN IT BE CONTINUED AFTER THE PIGMENTATION IMPROVES?",
        "answer": "Do not continue indefinitely without medical review. Once adequate improvement is achieved, the dermatologist may modify or transition the treatment strategy."
      },
      {
        "question": "IMPORTANT CONSIDERATIONS",
        "answer": "CORTICOSTEROID (Mometasone)"
      },
      {
        "question": "PROLONGED OR INAPPROPRIATE FACIAL USE",
        "answer": "Skin atrophy Telangiectasia Steroid acne Rosacea-like eruptions Perioral dermatitis Hypopigmentation Other local corticosteroid-related effects"
      },
      {
        "question": "HYDROQUINONE",
        "answer": ""
      },
      {
        "question": "EXCESSIVE OR PROLONGED USE",
        "answer": "Hydroquinone is an effective topical depigmenting agent but excessive or prolonged use can increase the risk of adverse effects, including exogenous ochronosis."
      },
      {
        "question": "IRRITATION",
        "answer": "Hydroquinone may cause irritant or allergic contact dermatitis in some patients."
      },
      {
        "question": "TRETINOIN",
        "answer": ""
      },
      {
        "question": "EXPECTED EARLY REACTIONS",
        "answer": "Tretinoin may produce: Dryness Scaling Erythema Burning Stinging Increased sensitivity"
      },
      {
        "question": "SUN SENSITIVITY",
        "answer": "Patients using topical retinoids should receive appropriate counselling regarding photoprotection."
      }
    ],
    "clinicalPearl": "RYOCLIN is a triple-combination topical approach designed to address pigmentation through complementary mechanisms. Its appropriate use depends on accurate diagnosis, targeted application, consistent photoprotection, irritation control and careful limitation of corticosteroid exposure.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      }
    ],
    "references": [
      "American Academy of Dermatology. Melasma: Diagnosis and Treatment.",
      "DermNet. Melasma — facial pigmentation.",
      "DermNet. Hydroquinone.",
      "American Academy of Dermatology. Melasma: Self-care.",
      "DermNet. Topical Retinoids.",
      "American Academy of Dermatology. Melasma: Signs and Symptoms.",
      "DermNet. Post-inflammatory Hyperpigmentation."
    ],
    "hasFullMonograph": true,
    "differentialConsiderations": [
      {
        "id": "diff-1",
        "condition": "POST-INFLAMMATORY HYPERPIGMENTATION",
        "clinicalClues": [
          "History of preceding inflammation",
          "Previous acne or dermatitis",
          "Pigmentation corresponding to previous lesions",
          "Often irregular distribution"
        ],
        "typicalAppearance": "Flat brown, grey-brown or darker macules corresponding to sites of previous inflammation or injury.",
        "diagnosticApproach": [
          "Establish the history of the preceding inflammatory condition and examine the distribution."
        ],
        "managementApproach": [
          "The underlying inflammatory condition should be controlled while pigment is addressed."
        ],
        "clinicalPearl": "If the inflammatory trigger continues, pigmentation may persist or recur despite depigmenting treatment."
      },
      {
        "id": "diff-2",
        "condition": "SOLAR LENTIGINES",
        "clinicalClues": [
          "Discrete lesions",
          "Sun-exposed areas",
          "Long-standing pigmentation",
          "Often sharply demarcated"
        ],
        "typicalAppearance": "Well-defined brown macules or patches, commonly occurring on chronically sun-exposed skin.",
        "diagnosticApproach": [
          "Clinical examination is usually sufficient, but atypical or changing lesions require appropriate evaluation."
        ],
        "managementApproach": [
          "Management differs from diffuse facial melasma and may include procedural approaches."
        ],
        "clinicalPearl": "A solitary or atypical pigmented lesion should not automatically be treated as melasma."
      },
      {
        "id": "diff-3",
        "condition": "LICHEN PLANUS PIGMENTOSUS / OTHER DERMAL PIGMENTARY DISORDERS",
        "clinicalClues": [
          "Consider when pigmentation is:",
          "Grey-brown",
          "Diffuse or reticular",
          "Chronic",
          "Associated with characteristic distribution"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Detailed examination and, where appropriate, dermoscopy or biopsy may be required."
        ],
        "managementApproach": [
          "Triple-combination depigmenting therapy may not be the appropriate first-line approach for every dermal pigmentary disorder."
        ],
        "clinicalPearl": "Grey-brown pigmentation with an atypical distribution should prompt reconsideration of the diagnosis."
      },
      {
        "id": "diff-4",
        "condition": "DRUG-INDUCED HYPERPIGMENTATION",
        "clinicalClues": [
          "New medication exposure",
          "Temporal relationship",
          "Diffuse or unusual distribution",
          "Previous similar reaction"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review medication history carefully."
        ],
        "managementApproach": [
          "Addressing the causative medication, where clinically appropriate, is an important part of management."
        ],
        "clinicalPearl": "A medication history can be as important as the skin examination when evaluating new pigmentation."
      },
      {
        "id": "diff-5",
        "condition": "CONTACT DERMATITIS WITH POST-INFLAMMATORY PIGMENTATION",
        "clinicalClues": [
          "Burning or itching",
          "Recurrent exposure",
          "Cosmetic or topical-product history",
          "Pigmentation following episodes of dermatitis"
        ],
        "typicalAppearance": "",
        "diagnosticApproach": [
          "Review:",
          "Cosmetics",
          "Fragrances",
          "Hair products",
          "Skin-lightening products",
          "Sunscreens",
          "Topical medications"
        ],
        "managementApproach": [
          "Identify and eliminate the trigger before escalating depigmenting treatment."
        ],
        "clinicalPearl": "Continued irritation can perpetuate pigmentation and reduce the effectiveness of treatment."
      }
    ],
    "treatmentConsiderations": [
      {
        "title": "HOW SHOULD RYOCLIN BE APPLIED?",
        "keyPoints": [
          "Application should follow the prescribed regimen.",
          "The treatment area should generally be limited to the clinically affected pigmentation rather than indiscriminate application over the entire face."
        ],
        "details": [],
        "practicalExample": "Apply a thin film to the affected area as directed by the treating dermatologist. Avoid contact with: Eyes Eyelids Lips Mucosal surfaces Broken or irritated skin For facial melasma, a dermatologist may direct application to the hyperpigmented areas as part of a structured evening treatment routine. Management Implications Correct application helps balance efficacy with the risk of irritation.",
        "clinicalPearl": "More product does not mean faster pigment clearance; excessive application may increase irritation."
      },
      {
        "title": "HOW MUCH SHOULD BE APPLIED?",
        "keyPoints": [
          "Only a small amount is generally required to produce a thin, even film over the intended treatment area."
        ],
        "details": [],
        "practicalExample": "Use the minimum amount required to cover the prescribed area evenly. For a limited facial pigmentation area, use a small quantity sufficient to produce a thin film rather than a thick visible layer. Management Implications Excessive application may increase irritation and corticosteroid exposure.",
        "clinicalPearl": "Thin and targeted application is preferable to generous application."
      },
      {
        "title": "PHOTOPROTECTION IS ESSENTIAL",
        "keyPoints": [
          "UV radiation can stimulate melanogenesis and worsen existing pigmentation.",
          "Visible light may also contribute to melasma, particularly in individuals with darker skin tones. Dermatology guidance recommends daily photoprotection, including broad-spectrum sunscreen and, for melasma, consideration of tinted sunscreen containing iron oxides."
        ],
        "details": [],
        "practicalExample": "Use a broad-spectrum sunscreen as part of the daily routine and reapply according to exposure and product instructions. A patient using RYOCLIN at night should maintain consistent daytime photoprotection rather than relying on the nighttime medication alone. Management Implications Inadequate photoprotection may reduce treatment response and increase recurrence.",
        "clinicalPearl": "A depigmenting regimen without consistent photoprotection is an incomplete treatment strategy."
      },
      {
        "title": "MANAGING IRRITATION",
        "keyPoints": [
          "Tretinoin and hydroquinone can cause irritation, particularly during treatment initiation.",
          "Watch for:",
          "Burning",
          "Redness",
          "Scaling",
          "Dryness",
          "Stinging",
          "Excessive sensitivity"
        ],
        "details": [],
        "practicalExample": "Follow the prescribed frequency and do not increase application frequency independently. If significant irritation develops, the dermatologist may modify treatment frequency or temporarily interrupt treatment depending on severity. Management Implications Inflammation itself can potentially worsen pigmentation, particularly in patients prone to post-inflammatory hyperpigmentation.",
        "clinicalPearl": "The goal is controlled treatment—not maximum irritation."
      },
      {
        "title": "CORTICOSTEROID EXPOSURE",
        "keyPoints": [
          "Mometasone furoate is a potent topical corticosteroid.",
          "Particular caution is required with:",
          "Prolonged use",
          "Facial application",
          "Large treatment areas",
          "Occlusion",
          "Frequent unsupervised application"
        ],
        "details": [],
        "practicalExample": "Use only as prescribed and for the intended treatment period. Once the prescribed treatment course is complete, the patient should not independently continue the product as a daily maintenance cream. Management Implications Prolonged or inappropriate topical corticosteroid use on facial skin can cause adverse effects including skin atrophy, telangiectasia and steroid-related acneiform or rosacea-like eruptions.",
        "clinicalPearl": "The corticosteroid component should be treated as a time-limited therapeutic component, not a permanent skincare ingredient."
      },
      {
        "title": "TREATMENT DURATION & REASSESSMENT",
        "keyPoints": [
          "Treatment duration should be individualised according to:",
          "Diagnosis",
          "Clinical response",
          "Irritation",
          "Treatment area",
          "Patient characteristics",
          "Prescribing information"
        ],
        "details": [],
        "practicalExample": "Use according to the dermatologist's prescribed schedule. A patient should be reviewed after an appropriate treatment interval rather than continuing the same triple combination indefinitely. Management Implications Reassessment allows the dermatologist to determine whether to: Continue Modify Stop Transition to maintenance therapy Introduce another treatment approach",
        "clinicalPearl": "Triple-combination therapy is generally a treatment phase—not automatically a lifelong maintenance strategy."
      },
      {
        "title": "WHAT IF THERE IS NO RESPONSE?",
        "keyPoints": [
          "Reconsider:",
          "Diagnosis",
          "Adherence",
          "Photoprotection",
          "Application technique",
          "Pigment depth",
          "Ongoing triggers",
          "Irritation",
          "Alternative diagnoses"
        ],
        "details": [],
        "practicalExample": "Do not simply increase the amount or frequency without reassessment. Persistent pigmentation despite appropriate treatment and good adherence should prompt diagnostic and therapeutic review. Management Implications Alternative or adjunctive treatment options may need consideration.",
        "clinicalPearl": "Treatment failure should trigger reassessment—not automatic escalation of topical exposure."
      }
    ]
  },
  {
    "id": "supicid-b",
    "slug": "supicid-b",
    "brandName": "SUPICID-B",
    "genericName": "Fusidic Acid 2% + Beclomethasone 0.025% Cream",
    "tagline": "Topical Antibacterial–Corticosteroid Combination",
    "therapeuticArea": "Antibacterial",
    "route": "Topical",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Cream",
    "strength": "2%",
    "packSize": "10 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
    "composition": [
      "Each gram of cream contains:",
      "Fusidic Acid — 2% w/w",
      "Beclomethasone — 0.025% w/w",
      "Cream base: q.s."
    ],
    "therapeuticCategory": "Topical Antibacterial + Corticosteroid",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Accordion 01 — FUSIDIC ACID"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Fusidic acid inhibits bacterial protein synthesis by interfering with elongation factor G (EF-G)."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "This inhibits growth of susceptible bacteria."
      }
    ],
    "indications": [
      "Management of acute and chronic antibacterial conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Fusidic Acid 2% + Beclomethasone 0.025% Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of antibacterial."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "SUPICID-B combines Fusidic Acid 2% w/w with Beclomethasone 0.025% w/w to address selected inflammatory skin conditions with a clinically relevant superficial bacterial component. Appropriate diagnosis, site-specific corticosteroid considerations, limited duration, correct application and antimicrobial stewardship are essential to responsible use.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      }
    ],
    "references": [
      "Approved Prescribing Information – SUPICID-B.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "supicid",
    "slug": "supicid",
    "brandName": "SUPICID",
    "genericName": "Fusidic Acid 2% Ointment",
    "tagline": "Topical Antibacterial Preparation",
    "therapeuticArea": "Antibacterial",
    "route": "Topical",
    "routeSubcategory": "Antibacterial",
    "dosageForm": "Ointment",
    "strength": "2% w/w",
    "packSize": "10 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
    "composition": [
      "Each gram of ointment contains:",
      "Fusidic Acid — 2% w/w",
      "Ointment base: q.s.",
      "Dosage Form"
    ],
    "therapeuticCategory": "Topical Antibacterial",
    "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Fusidic acid inhibits bacterial protein synthesis."
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "It interferes with bacterial elongation factor G (EF-G), an essential component of protein synthesis."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Interferes with bacterial protein synthesis"
      }
    ],
    "indications": [
      "Management of acute and chronic antibacterial conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Fusidic Acid 2% Ointment or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of antibacterial."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed ointment regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "SUPICID provides Fusidic Acid 2% w/w as a topical antibacterial option for selected susceptible superficial bacterial skin infections. Effective use depends on accurate diagnosis, appropriate localization, correct application, defined treatment duration and responsible antimicrobial stewardship.",
    "relatedProducts": [
      {
        "name": "CINIMUP",
        "generic": "Mupirocin 2% Ointment",
        "slug": "cinimup"
      },
      {
        "name": "LIXOCLIN-LB",
        "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
        "slug": "lixoclin-lb"
      },
      {
        "name": "POVIPRIX PLUS",
        "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
        "slug": "poviprix-plus"
      }
    ],
    "references": [
      "Approved Prescribing Information – SUPICID.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "t-fin-250",
    "slug": "t-fin-250",
    "brandName": "T-FIN 250",
    "genericName": "Terbinafine 250 mg Tablets",
    "tagline": "Systemic Allylamine Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Tablet",
    "strength": "250 mg",
    "packSize": "10 × 1 × 7 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
    "composition": [
      "Terbinafine 250 mg Tablets",
      "Formulated in a specialized pharmaceutical tablet base."
    ],
    "therapeuticCategory": "Systemic Antifungal",
    "pharmacologicalClass": "Allylamine Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Terbinafine 250 mg Tablets to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for antifungal symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic antifungal conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Adverse-effect information",
      "Special-population recommendations",
      "Monitoring requirements",
      "Age restrictions",
      "T-FIN 250 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of antifungal."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "T-FIN 250 provides oral terbinafine 250 mg, an allylamine antifungal with important activity against dermatophytes. It is particularly relevant to appropriately diagnosed dermatophyte infections requiring systemic therapy, including selected cases of onychomycosis, extensive dermatophytosis and tinea capitis. Safe prescribing requires appropriate diagnosis, consideration of hepatic status, review of concomitant medicines and awareness of clinically important adverse effects.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Approved Prescribing Information – T-FIN 250.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "t-fin-500",
    "slug": "t-fin-500",
    "brandName": "T-FIN 500",
    "genericName": "Terbinafine 500 mg Tablets",
    "tagline": "Systemic Allylamine Antifungal",
    "therapeuticArea": "Antifungal",
    "route": "Oral / Systematic",
    "routeSubcategory": "Antifungal",
    "dosageForm": "Tablet",
    "strength": "500 mg",
    "packSize": "10 × 1 × 7 Blister",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
    "composition": [
      "Terbinafine 500 mg Tablets",
      "Formulated in a specialized pharmaceutical tablet base."
    ],
    "therapeuticCategory": "Systemic Antifungal",
    "pharmacologicalClass": "Allylamine Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Terbinafine 500 mg Tablets to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for antifungal symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic antifungal conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Adverse-effect information",
      "Special-population recommendations",
      "Monitoring requirements",
      "Age restrictions",
      "T-FIN 500 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment and in accordance with the current approved product information."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of antifungal."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "T-FIN 500 provides oral terbinafine 500 mg, an allylamine antifungal with important activity against dermatophytes. Its clinical use should be based on accurate diagnosis, appropriate indication and the approved product-specific dosing regimen. Because standard oral terbinafine references commonly use 250 mg once daily in adults, the 500 mg strength should not be presented as a routine standard daily dose without product-specific regulatory support. Hepatic status, renal function, drug interactions and clinically important adverse effects should be considered during systemic therapy.",
    "relatedProducts": [
      {
        "name": "FLUCORION-150",
        "generic": "Fluconazole 150 mg Tablets",
        "slug": "flucorion-150"
      },
      {
        "name": "FLUCORION-200",
        "generic": "Fluconazole 200 mg Tablets",
        "slug": "flucorion-200"
      },
      {
        "name": "ITFIN-100",
        "generic": "Itraconazole 100 mg Capsules",
        "slug": "itfin-100"
      }
    ],
    "references": [
      "Approved Prescribing Information – T-FIN 500.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tacnoid-0-05",
    "slug": "tacnoid-0-05",
    "brandName": "TACNOID 0.05%",
    "genericName": "Tretinoin 0.05% w/w Cream",
    "tagline": "Topical Retinoid Preparation",
    "therapeuticArea": "Immunomodulator",
    "route": "Topical",
    "routeSubcategory": "Immunomodulator",
    "dosageForm": "Cream",
    "strength": "0.05%",
    "packSize": "20 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
    "composition": [
      "Each gram of cream contains:",
      "Tretinoin — 0.05% w/w",
      "Cream base: q.s.",
      "Dosage Form"
    ],
    "therapeuticCategory": "Topical Retinoid",
    "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Accordion 01 — NORMALIZATION OF FOLLICULAR KERATINISATION"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Abnormal follicular keratinisation contributes to formation of microcomedones, an early lesion in acne development."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Tretinoin helps normalize follicular epithelial differentiation."
      }
    ],
    "indications": [
      "Management of acute and chronic immunomodulator conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Tretinoin 0.05% w/w Cream or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of immunomodulator."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TACNOID 0.05% provides Tretinoin 0.05% w/w, a topical retinoid that addresses abnormal follicular keratinisation and comedone formation. Appropriate patient selection, thin field application, gradual adaptation to treatment, skin-barrier support and photoprotection are central to effective and tolerable use.",
    "relatedProducts": [
      {
        "name": "TOFAPLAST-5",
        "generic": "Tofacitinib 5 mg Tablet",
        "slug": "tofaplast-5"
      },
      {
        "name": "TOFAPLAST Cream",
        "generic": "Tofacitinib 2% Gel",
        "slug": "tofaplast-cream"
      }
    ],
    "references": [
      "Approved Prescribing Information – TACNOID 0.05%.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tenorium-nm",
    "slug": "tenorium-nm",
    "brandName": "TENORIUM NM",
    "genericName": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
    "tagline": "Potent Topical Corticosteroid + Antibacterial + Antifungal",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Steroid combinations",
    "dosageForm": "Cream",
    "strength": "0.05% w/w + 0.5% w/w + 2% w/w",
    "packSize": "As per approved product pack",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Clobetasol Propionate 0.05% w/w",
      "Neomycin Sulphate 0.5% w/w",
      "Miconazole Nitrate 2% w/w"
    ],
    "therapeuticCategory": "Corticosteroid + Antibacterial + Antifungal",
    "pharmacologicalClass": "Very potent topical corticosteroid + topical antibacterial + topical imidazole antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "TENORIUM NM provides complementary pharmacological activity through three active ingredients."
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "01 — Anti-inflammatory Component"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Clobetasol Propionate"
      }
    ],
    "indications": [
      "TENORIUM NM may be considered for selected corticosteroid-responsive inflammatory dermatoses in which secondary bacterial or fungal infection is present, suspected or clinically likely, subject to the approved product indication.",
      "Potential clinical situations may include selected:",
      "Infected eczematous dermatoses",
      "Corticosteroid-responsive inflammatory dermatoses with secondary microbial involvement",
      "Dermatoses complicated by susceptible bacterial infection",
      "Dermatoses complicated by susceptible fungal/yeast infection"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — Recommended Application",
      "howToApply": "Apply a thin layer of TENORIUM NM to the affected area and gently rub into the skin as directed by the treating physician.",
      "duration": "Application frequency and duration should be determined according to:",
      "missedApplication": "Diagnosis"
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "TENORIUM NM should not be used in patients with known hypersensitivity to:",
      "Clobetasol propionate",
      "Neomycin sulphate",
      "Miconazole nitrate",
      "Any component of the formulation"
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — Potent Corticosteroid",
        "detail": "Accordion 01 — Potent Corticosteroid"
      },
      {
        "title": "Clobetasol is a very potent topical cort",
        "detail": "Clobetasol is a very potent topical corticosteroid."
      },
      {
        "title": "Prolonged, excessive or inappropriate us",
        "detail": "Prolonged, excessive or inappropriate use may increase the risk of:"
      },
      {
        "title": "Skin atrophy",
        "detail": "Skin atrophy"
      },
      {
        "title": "Telangiectasia",
        "detail": "Telangiectasia"
      }
    ],
    "adverseEffects": {
      "common": [
        "Burning",
        "Irritation",
        "Erythema"
      ],
      "lessCommon": [
        "Folliculitis",
        "Skin atrophy",
        "Secondary infection"
      ],
      "rare": [
        "Systemic Effects",
        "Significant systemic absorption of clobetasol may result in systemic corticosteroid effects, particularly with prolonged use, large treatment areas, occlusion or application to compromised skin."
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "Accordion 01 — What is TENORIUM NM?",
        "answer": "TENORIUM NM is a topical combination containing:"
      },
      {
        "question": "Clobetasol Propionate + Neomycin Sulphate + Miconazole Nitrate",
        "answer": "It combines anti-inflammatory, antibacterial and antifungal activity for selected skin conditions where these therapeutic components are clinically appropriate."
      },
      {
        "question": "Accordion 02 — How should it be applied?",
        "answer": "Apply a thin layer to the affected area exactly as directed by the physician."
      }
    ],
    "clinicalPearl": "TENORIUM NM is a combination formulation designed for selected inflammatory dermatoses where bacterial and/or fungal involvement is clinically relevant. Its potent corticosteroid component makes diagnostic accuracy, anatomical-site selection and treatment duration particularly important.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TENORIUM NM.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tenorium-s",
    "slug": "tenorium-s",
    "brandName": "TENORIUM-S",
    "genericName": "Clobetasol Propionate 0.05% w/w + Salicylic Acid 3% w/w Ointment",
    "tagline": "Topical Corticosteroid + Keratolytic | For Dermatological Use",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Steroid combinations",
    "dosageForm": "Ointment",
    "strength": "0.05% w/w + 3% w/w",
    "packSize": "30 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Clobetasol Propionate 0.05% w/w",
      "Salicylic Acid 3% w/w",
      "In a suitable ointment base."
    ],
    "therapeuticCategory": "Corticosteroid + Keratolytic",
    "pharmacologicalClass": "Potent topical corticosteroid + keratolytic agent",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "TENORIUM-S provides complementary pharmacological activity through two active ingredients."
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Clobetasol Propionate"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Glucocorticoid receptor-mediated activity"
      }
    ],
    "indications": [
      "TENORIUM-S may be considered for the management of selected corticosteroid-responsive inflammatory dermatoses associated with dryness, scaling or hyperkeratosis, where a potent topical corticosteroid combined with a keratolytic agent is clinically appropriate.",
      "Depending on the approved product indication, such conditions may include:",
      "Psoriasis",
      "Chronic eczematous dermatoses",
      "Hyperkeratotic eczema",
      "Lichenified inflammatory dermatoses"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — Recommended Application",
      "howToApply": "Apply a thin layer of TENORIUM-S to the affected area and gently rub into the skin, as directed by the treating physician.",
      "duration": "The application frequency should be determined according to:",
      "missedApplication": "Diagnosis"
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "TENORIUM-S should not be used in patients with known hypersensitivity to clobetasol propionate, salicylic acid or any component of the formulation.",
      "It should not be used indiscriminately on undiagnosed skin lesions.",
      "Important Clinical Consideration",
      "Because TENORIUM-S contains a potent corticosteroid, the underlying diagnosis should be established before prolonged treatment is undertaken.",
      "Topical corticosteroids may mask or alter the clinical appearance of certain infections."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — Potency & Duration",
        "detail": "Accordion 01 — Potency & Duration"
      },
      {
        "title": "Clobetasol is a highly potent topical co",
        "detail": "Clobetasol is a highly potent topical corticosteroid."
      },
      {
        "title": "Unnecessary prolonged treatment or exces",
        "detail": "Unnecessary prolonged treatment or excessive application can increase the risk of corticosteroid-related local and systemic effects."
      },
      {
        "title": "Use the lowest effective exposure for th",
        "detail": "Use the lowest effective exposure for the shortest appropriate duration."
      },
      {
        "title": "Accordion 02 — Hyperkeratotic Skin",
        "detail": "Accordion 02 — Hyperkeratotic Skin"
      },
      {
        "title": "The salicylic acid component helps reduc",
        "detail": "The salicylic acid component helps reduce excessive scaling and hyperkeratosis."
      }
    ],
    "adverseEffects": {
      "common": [
        "Burning",
        "Irritation",
        "Dryness"
      ],
      "lessCommon": [
        "Skin atrophy",
        "Folliculitis",
        "Secondary infection"
      ],
      "rare": [
        "With excessive exposure to potent topical corticosteroids, systemic corticosteroid effects may occur.",
        "Patients should inform their physician about all topical and systemic medicines being used."
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store TENORIUM-S according to the conditions specified on the approved product label.",
      "General handling considerations",
      "Keep the tube properly closed when not in use.",
      "Protect from conditions specified on the product label."
    ],
    "patientCounselling": [
      {
        "question": "Accordion 01 — What is TENORIUM-S used for?",
        "answer": "TENORIUM-S combines a potent topical corticosteroid with salicylic acid."
      },
      {
        "question": "The corticosteroid helps control inflammation and itching, while salicylic acid helps soften and reduce excessive scaling and thickened skin.",
        "answer": "Accordion 02 — How should it be applied?"
      },
      {
        "question": "Apply the prescribed quantity as a thin, even layer to the affected area.",
        "answer": "Gently rub the ointment into the skin."
      }
    ],
    "clinicalPearl": "TENORIUM-S combines potent anti-inflammatory corticosteroid activity with keratolytic action. It is particularly relevant when inflammation coexists with prominent dryness, scaling or hyperkeratosis—but corticosteroid potency, anatomical site and treatment duration remain important determinants of safe use.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TENORIUM-S.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tenorium-s6",
    "slug": "tenorium-s6",
    "brandName": "TENORIUM S6",
    "genericName": "Clobetasol Propionate 0.05% w/w + Salicylic Acid 6% w/w Ointment",
    "tagline": "Potent Topical Corticosteroid + Enhanced Keratolytic | For Dermatological Use",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Steroid combinations",
    "dosageForm": "Ointment",
    "strength": "0.05% w/w + 6% w/w",
    "packSize": "As per approved product pack",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Clobetasol Propionate 0.05% w/w",
      "Salicylic Acid 6% w/w",
      "In a suitable ointment base."
    ],
    "therapeuticCategory": "Corticosteroid + Keratolytic",
    "pharmacologicalClass": "Potent topical corticosteroid + keratolytic agent",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "TENORIUM S6 provides complementary activity through two active ingredients."
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Clobetasol Propionate"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Glucocorticoid receptor-mediated activity"
      }
    ],
    "indications": [
      "TENORIUM S6 may be considered for selected corticosteroid-responsive inflammatory dermatoses associated with prominent scaling, hyperkeratosis or thickened lesions, where a potent topical corticosteroid combined with a keratolytic agent is clinically appropriate.",
      "Depending on the approved product indication, relevant conditions may include:",
      "Psoriasis",
      "Hyperkeratotic eczema",
      "Chronic eczematous dermatoses with significant scaling",
      "Lichenified inflammatory dermatoses"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — Recommended Application",
      "howToApply": "Apply a thin, even layer of TENORIUM S6 to the affected area and gently rub into the skin, according to the treating physician's instructions.",
      "duration": "Application frequency should be determined according to:",
      "missedApplication": "Diagnosis"
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "TENORIUM S6 should not be used in patients with known hypersensitivity to:",
      "Clobetasol propionate",
      "Salicylic acid",
      "Any component of the formulation",
      "It should not be used indiscriminately on undiagnosed skin lesions."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — Potent Corticosteroid",
        "detail": "Accordion 01 — Potent Corticosteroid"
      },
      {
        "title": "Clobetasol propionate is a highly potent",
        "detail": "Clobetasol propionate is a highly potent topical corticosteroid."
      },
      {
        "title": "Unnecessary prolonged treatment, excessi",
        "detail": "Unnecessary prolonged treatment, excessive quantities or inappropriate application may increase the risk of:"
      },
      {
        "title": "Skin atrophy",
        "detail": "Skin atrophy"
      },
      {
        "title": "Telangiectasia",
        "detail": "Telangiectasia"
      }
    ],
    "adverseEffects": {
      "common": [
        "Burning",
        "Irritation",
        "Dryness"
      ],
      "lessCommon": [
        "Skin atrophy",
        "Folliculitis",
        "Secondary infection"
      ],
      "rare": [
        "Systemic Effects",
        "Excessive exposure to potent topical corticosteroids may result in systemic corticosteroid effects."
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store TENORIUM S6 according to the conditions specified on the approved product label.",
      "General Handling Considerations",
      "Keep the tube properly closed when not in use.",
      "Protect from conditions specified on the product label."
    ],
    "patientCounselling": [
      {
        "question": "Accordion 01 — What is TENORIUM S6 used for?",
        "answer": "TENORIUM S6 combines a potent topical corticosteroid with salicylic acid."
      },
      {
        "question": "The corticosteroid helps control inflammation and itching, while salicylic acid helps soften and reduce excessive scaling and thickened skin.",
        "answer": "Accordion 02 — How should it be applied?"
      },
      {
        "question": "Apply the prescribed quantity as a thin, even layer to the affected area.",
        "answer": "Gently massage into the skin as directed."
      }
    ],
    "clinicalPearl": "TENORIUM S6 combines potent corticosteroid activity with 6% salicylic acid for selected inflammatory dermatoses with prominent scaling or hyperkeratosis. The key to appropriate use is matching corticosteroid potency, keratolytic intensity, anatomical site and treatment duration to the clinical situation. TENORIUM-S vs TENORIUM S6 This comparison can be presented as a visual comparison card on the monograph page. Feature TENORIUM-S TENORIUM S6 Clobetasol Propionate 0.05% w/w 0.05% w/w Salicylic Acid 3% w/w 6% w/w Keratolytic Component Salicylic Acid 3% Salicylic Acid 6% Clinical Focus Inflammatory + scaly dermatoses Inflammatory + more prominent scaling / hyperkeratosis Dosage Form Ointment Ointment Corticosteroid Potency High-potency topical corticosteroid High-potency topical corticosteroid Important Clinical Note The above comparison is intended to explain the formulation difference, not to imply that one product should automatically be selected over the other. Selection should be based on diagnosis, lesion characteristics, anatomical site and physician judgement.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TENORIUM S6.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tenorium-cream",
    "slug": "tenorium-cream",
    "brandName": "TENORIUM Cream",
    "genericName": "Clobetasol Propionate 0.05% w/w Cream",
    "tagline": "Topical Corticosteroid | For Dermatological Use",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Corticosteroids",
    "dosageForm": "Cream",
    "strength": "0.05% w/w",
    "packSize": "30 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Each gram contains:",
      "Clobetasol Propionate 0.05% w/w",
      "In a suitable cream base.",
      "Clobetasol propionate is a synthetic topical corticosteroid with potent glucocorticoid activity."
    ],
    "therapeuticCategory": "Corticosteroid",
    "pharmacologicalClass": "Very high / super-high potency topical corticosteroid",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Clobetasol propionate exerts its therapeutic effects through glucocorticoid receptor-mediated activity within target cells."
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "This results in modulation of inflammatory processes and reduction of inflammatory mediators, producing clinically relevant effects such as reduction in erythema, oedema and pruritus in corticosteroid-responsive dermatoses."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Clobetasol Propionate"
      }
    ],
    "indications": [
      "TENORIUM Cream may be considered for the management of corticosteroid-responsive inflammatory and pruritic dermatoses where a very high-potency topical corticosteroid is clinically appropriate.",
      "Depending on the approved indication for the specific product, conditions may include selected inflammatory dermatoses such as:",
      "Severe inflammatory dermatoses",
      "Severe eczematous conditions",
      "Selected corticosteroid-responsive dermatoses",
      "Selected plaque-type psoriasis"
    ],
    "dosageAdministration": {
      "recommended": "Accordion 01 — Recommended Application",
      "howToApply": "Apply a thin layer to the affected area and gently rub into the skin as directed by the treating physician.",
      "duration": "The frequency and duration of treatment should be determined according to:",
      "missedApplication": "Diagnosis"
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "TENORIUM Cream should not be used in patients with a known hypersensitivity to clobetasol propionate or any component of the formulation.",
      "Topical corticosteroids should also not be used indiscriminately for undiagnosed skin eruptions or untreated infections.",
      "Current clobetasol prescribing information lists hypersensitivity to the product components as a contraindication.",
      "Important Site Consideration",
      "Certain clobetasol 0.05% formulations specifically advise against use on the face, groin and axillae, and against use for rosacea or perioral dermatitis. The exact restrictions should be taken from the approved TENORIUM product information before publication."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — Potency & Duration",
        "detail": "Accordion 01 — Potency & Duration"
      },
      {
        "title": "Clobetasol propionate is a highly potent",
        "detail": "Clobetasol propionate is a highly potent topical corticosteroid."
      },
      {
        "title": "Unnecessary prolonged use, excessive qua",
        "detail": "Unnecessary prolonged use, excessive quantities or inappropriate application can increase the risk of local and systemic corticosteroid-related adverse effects."
      },
      {
        "title": "Accordion 02 — Large Surface Areas",
        "detail": "Accordion 02 — Large Surface Areas"
      },
      {
        "title": "Systemic absorption may increase when po",
        "detail": "Systemic absorption may increase when potent topical corticosteroids are applied over:"
      },
      {
        "title": "Large surface areas",
        "detail": "Large surface areas"
      }
    ],
    "adverseEffects": {
      "common": [
        "Burning or stinging",
        "Irritation",
        "Pruritus"
      ],
      "lessCommon": [
        "Folliculitis",
        "Skin atrophy",
        "Secondary infection"
      ],
      "rare": [
        "With substantial systemic absorption, topical corticosteroids may produce systemic corticosteroid effects, including hypothalamic-pituitary-adrenal axis suppression.",
        "Patients should inform the treating physician about other topical and systemic medicines being used."
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store TENORIUM Cream according to the storage conditions specified on the approved product label.",
      "General handling considerations",
      "Keep the container properly closed when not in use.",
      "Protect the product according to label requirements."
    ],
    "patientCounselling": [
      {
        "question": "Accordion 01 — What is TENORIUM Cream used for?",
        "answer": "TENORIUM contains clobetasol propionate, a highly potent topical corticosteroid used for appropriate corticosteroid-responsive inflammatory skin conditions."
      },
      {
        "question": "It should be used only for the condition and duration advised by the treating physician.",
        "answer": "Accordion 02 — How should it be applied?"
      },
      {
        "question": "Apply the prescribed quantity as a thin, even layer to the affected skin.",
        "answer": "Follow the recommended frequency and duration carefully."
      }
    ],
    "clinicalPearl": "Clobetasol propionate is a highly potent topical corticosteroid. Its appropriate use depends on matching potency, quantity, anatomical site and treatment duration to the clinical indication.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TENORIUM CREAM.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tofaplast-5",
    "slug": "tofaplast-5",
    "brandName": "TOFAPLAST-5",
    "genericName": "Tofacitinib 5 mg Tablet",
    "tagline": "Oral JAK Inhibitor",
    "therapeuticArea": "Immunomodulator",
    "route": "Oral / Systematic",
    "routeSubcategory": "Immunomodulator",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
    "composition": [
      "Each Tablet Contains",
      "Tofacitinib — 5 mg",
      "Excipients: q.s.",
      "Dosage Form"
    ],
    "therapeuticCategory": "JAK Inhibitor",
    "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Accordion 01 — JAK-STAT SIGNALING"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Tofacitinib inhibits JAK-dependent signalling pathways involved in cytokine-mediated immune responses."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Reduced JAK signalling can decrease downstream inflammatory activity."
      }
    ],
    "indications": [
      "Management of acute and chronic immunomodulator conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Tofacitinib 5 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of immunomodulator."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TOFAPLAST-5 contains Tofacitinib 5 mg, an oral JAK inhibitor with systemic immunomodulatory activity. Its use requires a confirmed and appropriate indication, careful patient selection, infection and TB assessment, laboratory monitoring and consideration of cardiovascular, thrombotic and malignancy risks. Dermatological use should be clearly distinguished from approved indications and from off-label clinical evidence.",
    "relatedProducts": [
      {
        "name": "TACNOID 0.05%",
        "generic": "Tretinoin 0.05% w/w Cream",
        "slug": "tacnoid-0-05"
      },
      {
        "name": "TOFAPLAST Cream",
        "generic": "Tofacitinib 2% Gel",
        "slug": "tofaplast-cream"
      }
    ],
    "references": [
      "Approved Prescribing Information – TOFAPLAST-5.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tofaplast-cream",
    "slug": "tofaplast-cream",
    "brandName": "TOFAPLAST Cream",
    "genericName": "Tofacitinib 2% Gel",
    "tagline": "Topical JAK Inhibitor",
    "therapeuticArea": "Immunomodulator",
    "route": "Topical",
    "routeSubcategory": "Immunomodulator",
    "dosageForm": "Gel",
    "strength": "2% w/w",
    "packSize": "10 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
    "composition": [
      "Each gram of gel contains:",
      "Tofacitinib — 2% w/w",
      "Gel base: q.s.",
      "Dosage Form"
    ],
    "therapeuticCategory": "Topical JAK Inhibitor",
    "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Accordion 01 — JAK-DEPENDENT SIGNALING"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Tofacitinib inhibits JAK-dependent signalling pathways involved in cytokine-mediated immune responses."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Modulation of these pathways can reduce inflammatory signalling in appropriately selected inflammatory skin disorders."
      }
    ],
    "indications": [
      "Management of acute and chronic immunomodulator conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Tofacitinib 2% Gel or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of immunomodulator."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TOFAPLAST Cream contains Tofacitinib 2% w/w in a topical gel formulation. Its clinical use should be diagnosis-driven and based on the approved indication for the specific product. Appropriate patient selection, correct application, infection assessment, monitoring of treatment response and periodic diagnostic reassessment are essential to responsible topical JAK-inhibitor therapy.",
    "relatedProducts": [
      {
        "name": "TACNOID 0.05%",
        "generic": "Tretinoin 0.05% w/w Cream",
        "slug": "tacnoid-0-05"
      },
      {
        "name": "TOFAPLAST-5",
        "generic": "Tofacitinib 5 mg Tablet",
        "slug": "tofaplast-5"
      }
    ],
    "references": [
      "Approved Prescribing Information – TOFAPLAST Cream.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tressicle-2-5",
    "slug": "tressicle-2-5",
    "brandName": "TRESSICLE 2.5",
    "genericName": "Minoxidil 2.5 mg Tablet",
    "tagline": "Oral Hair Growth Therapy",
    "therapeuticArea": "Hair & Scalp",
    "route": "Oral / Systematic",
    "routeSubcategory": "Hair & Scalp",
    "dosageForm": "Tablet",
    "strength": "2.5 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
    "composition": [
      "Minoxidil 2.5 mg Tablet",
      "Formulated in a specialized pharmaceutical tablet base."
    ],
    "therapeuticCategory": "Hair Growth Promoting Therapy",
    "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Minoxidil 2.5 mg Tablet to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic hair & scalp conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Cardiovascular precautions",
      "Blood pressure considerations",
      "Heart-rate considerations",
      "Fluid-retention precautions"
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of hair & scalp."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRESSICLE 2.5 provides Minoxidil 2.5 mg for oral administration. Unlike topical minoxidil, oral minoxidil produces systemic exposure and therefore requires careful patient selection, consideration of cardiovascular status, individualized dosing and appropriate monitoring. Its use for hair loss should follow a confirmed diagnosis, a documented risk-benefit assessment and appropriate clinical counselling.",
    "relatedProducts": [
      {
        "name": "BIOSICLE PLUS",
        "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
        "slug": "biosicle-plus"
      },
      {
        "name": "TRESSICLE 5",
        "generic": "Minoxidil 5 mg Tablet",
        "slug": "tressicle-5"
      },
      {
        "name": "TRESSICLE FORTE",
        "generic": "Minoxidil 5% Solution",
        "slug": "tressicle-forte"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRESSICLE 2.5.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tressicle-5",
    "slug": "tressicle-5",
    "brandName": "TRESSICLE 5",
    "genericName": "Minoxidil 5 mg Tablet",
    "tagline": "Oral Hair Growth Therapy",
    "therapeuticArea": "Hair & Scalp",
    "route": "Oral / Systematic",
    "routeSubcategory": "Hair & Scalp",
    "dosageForm": "Tablet",
    "strength": "5 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
    "composition": [
      "Minoxidil 5 mg Tablet",
      "Formulated in a specialized pharmaceutical tablet base."
    ],
    "therapeuticCategory": "Hair Growth Promoting Therapy",
    "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Minoxidil 5 mg Tablet to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic hair & scalp conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Cardiovascular precautions",
      "Blood-pressure considerations",
      "Heart-rate considerations",
      "Fluid-retention precautions"
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of hair & scalp."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRESSICLE 5 contains Minoxidil 5 mg for oral administration. Because oral minoxidil produces systemic exposure, appropriate use requires more than assessment of hair-loss severity. Diagnosis, cardiovascular risk assessment, individualized dosing, medication review, monitoring and patient counselling are integral to responsible clinical use.",
    "relatedProducts": [
      {
        "name": "BIOSICLE PLUS",
        "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
        "slug": "biosicle-plus"
      },
      {
        "name": "TRESSICLE 2.5",
        "generic": "Minoxidil 2.5 mg Tablet",
        "slug": "tressicle-2-5"
      },
      {
        "name": "TRESSICLE FORTE",
        "generic": "Minoxidil 5% Solution",
        "slug": "tressicle-forte"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRESSICLE 5.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tressicle-forte",
    "slug": "tressicle-forte",
    "brandName": "TRESSICLE FORTE",
    "genericName": "Minoxidil 5% Solution",
    "tagline": "Topical Hair Growth Promoting Therapy",
    "therapeuticArea": "Hair & Scalp",
    "route": "Topical",
    "routeSubcategory": "Hair & Scalp",
    "dosageForm": "Solution",
    "strength": "5%",
    "packSize": "60 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
    "composition": [
      "Minoxidil 5% Solution",
      "Formulated in a specialized pharmaceutical solution base."
    ],
    "therapeuticCategory": "Hair Growth Promoting Agent",
    "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Minoxidil 5% Solution to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic hair & scalp conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Minoxidil 5% Solution or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of hair & scalp."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed solution regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRESSICLE FORTE provides Minoxidil 5% solution for appropriately diagnosed pattern hair loss. Successful use depends on accurate diagnosis, suitable patient selection, consistent scalp-directed application and realistic expectations regarding the time course of hair growth. Rapidly progressive, patchy, inflammatory or scarring hair loss should prompt diagnostic reassessment rather than treatment escalation alone.",
    "relatedProducts": [
      {
        "name": "BIOSICLE PLUS",
        "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
        "slug": "biosicle-plus"
      },
      {
        "name": "TRESSICLE 2.5",
        "generic": "Minoxidil 2.5 mg Tablet",
        "slug": "tressicle-2-5"
      },
      {
        "name": "TRESSICLE 5",
        "generic": "Minoxidil 5 mg Tablet",
        "slug": "tressicle-5"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRESSICLE FORTE.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "tressicle-f",
    "slug": "tressicle-f",
    "brandName": "TRESSICLE-F",
    "genericName": "Minoxidil 5% + Finasteride 0.1% Solution",
    "tagline": "Topical Hair Growth Therapy for Pattern Hair Loss",
    "therapeuticArea": "Hair & Scalp",
    "route": "Oral / Systematic",
    "routeSubcategory": "Hair & Scalp",
    "dosageForm": "Solution",
    "strength": "5%",
    "packSize": "60 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
    "composition": [
      "Minoxidil 5% + Finasteride 0.1% Solution",
      "Formulated in a specialized pharmaceutical solution base."
    ],
    "therapeuticCategory": "Hair Growth Promoting Therapy",
    "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Minoxidil 5% to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic hair & scalp conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Minoxidil 5% + Finasteride 0.1% Solution or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of hair & scalp."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed solution regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRESSICLE-F combines Minoxidil 5% and Finasteride 0.1% in a topical solution for appropriately selected patients with pattern hair loss. The formulation provides complementary therapeutic approaches—supporting follicular growth while addressing DHT-mediated follicular miniaturization. Appropriate diagnosis, patient selection, consistent scalp-directed application, realistic expectations and finasteride-specific safety counselling are essential components of responsible clinical use.",
    "relatedProducts": [
      {
        "name": "BIOSICLE PLUS",
        "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
        "slug": "biosicle-plus"
      },
      {
        "name": "TRESSICLE 2.5",
        "generic": "Minoxidil 2.5 mg Tablet",
        "slug": "tressicle-2-5"
      },
      {
        "name": "TRESSICLE 5",
        "generic": "Minoxidil 5 mg Tablet",
        "slug": "tressicle-5"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRESSICLE-F.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "trilofaz-b",
    "slug": "trilofaz-b",
    "brandName": "TRILOFAZ-B",
    "genericName": "Clotrimazole 1% + Betamethasone Dipropionate 0.025% Lotion",
    "tagline": "Topical Antifungal + Corticosteroid Combination",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Steroid combinations",
    "dosageForm": "Lotion",
    "strength": "1%",
    "packSize": "30 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Clotrimazole 1% + Betamethasone Dipropionate 0.025% Lotion",
      "Formulated in a specialized pharmaceutical lotion base."
    ],
    "therapeuticCategory": "Topical Antifungal + Corticosteroid",
    "pharmacologicalClass": "Specialized dermatological corticosteroids therapeutic agent.",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Clotrimazole 1% to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for corticosteroids symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic corticosteroids conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Corticosteroid-related precautions",
      "Site-specific restrictions",
      "Use on face and intertriginous areas",
      "Pediatric use",
      "Pregnancy and lactation information"
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of corticosteroids."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed lotion regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRILOFAZ-B combines antifungal therapy with potent anti-inflammatory treatment. Its clinical value lies in appropriately selected inflammatory fungal dermatoses—not in routine treatment of every itchy or erythematous lesion. Accurate diagnosis, anatomical-site assessment, appropriate quantity, limited corticosteroid exposure and reassessment of non-responders are central to responsible use.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRILOFAZ-B.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "trilofaz",
    "slug": "trilofaz",
    "brandName": "TRILOFAZ",
    "genericName": "Clotrimazole 1% Dusting Powder",
    "tagline": "Topical Imidazole Antifungal",
    "therapeuticArea": "Corticosteroids",
    "route": "Topical",
    "routeSubcategory": "Corticosteroids",
    "dosageForm": "Cream",
    "strength": "1%",
    "packSize": "100 g",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
    "composition": [
      "Clotrimazole 1% Dusting Powder",
      "Formulated in a specialized pharmaceutical cream base."
    ],
    "therapeuticCategory": "Topical Antifungal",
    "pharmacologicalClass": "Imidazole Antifungal",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Active Site Delivery",
        "description": "Targeted delivery of Clotrimazole 1% Dusting Powder to affected dermatological tissue."
      },
      {
        "step": "02",
        "title": "Pathophysiological Control",
        "description": "Modulates pathological mediators responsible for corticosteroids symptoms."
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
      }
    ],
    "indications": [
      "Management of acute and chronic corticosteroids conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Clotrimazole 1% Dusting Powder or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "General Clinical Precaution",
        "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
      },
      {
        "title": "Treatment Duration",
        "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of corticosteroids."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "TRILOFAZ provides Clotrimazole 1% in a dusting-powder formulation for appropriately diagnosed superficial fungal infections. Its formulation offers a practical approach where moisture, sweating and skin-fold occlusion are relevant clinical considerations. Optimal outcomes depend on accurate diagnosis, adequate application, consistent treatment and attention to moisture control and reinfection factors.",
    "relatedProducts": [
      {
        "name": "FLUTIRIUM",
        "generic": "Fluticasone Propionate 0.05% w/w Cream",
        "slug": "flutirium"
      },
      {
        "name": "MOMERIUM-F",
        "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
        "slug": "momerium-f"
      },
      {
        "name": "MOMERIUM",
        "generic": "Mometasone Furoate 0.1% Cream",
        "slug": "momerium"
      }
    ],
    "references": [
      "Approved Prescribing Information – TRILOFAZ.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "zindroxin-syrup",
    "slug": "zindroxin-syrup",
    "brandName": "ZINDROXIN SYRUP",
    "genericName": "Hydroxyzine 10 mg / 5 mL Oral Liquid",
    "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Syrup",
    "strength": "10 mg",
    "packSize": "100 mL",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
    "composition": [
      "Each 5 mL contains:",
      "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 10 mg",
      "Excipients: q.s.",
      "Concentration"
    ],
    "therapeuticCategory": "Antihistamine",
    "pharmacologicalClass": "First-generation H1-antihistamine",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "H1-receptor activation"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Itching / wheal-and-flare response"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Hydroxyzine blocks H1 receptor-mediated effects"
      }
    ],
    "indications": [
      "Management of acute and chronic allergy & pruritus conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Hydroxyzine 10 mg / 5 mL Oral Liquid or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — DROWSINESS & SEDATION",
        "detail": "Accordion 01 — DROWSINESS & SEDATION"
      },
      {
        "title": "Hydroxyzine may cause drowsiness and sed",
        "detail": "Hydroxyzine may cause drowsiness and sedation."
      },
      {
        "title": "Patients and caregivers should be counse",
        "detail": "Patients and caregivers should be counselled regarding activities requiring full alertness."
      },
      {
        "title": "Accordion 02 — DRIVING & MACHINERY",
        "detail": "Accordion 02 — DRIVING & MACHINERY"
      },
      {
        "title": "Patients should understand their individ",
        "detail": "Patients should understand their individual response before driving or operating machinery."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed syrup regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "ZINDROXIN Syrup provides a liquid hydroxyzine presentation at 10 mg/5 mL for symptomatic management of appropriate allergic and histamine-mediated pruritic conditions. The liquid dosage form offers administration flexibility, but precise dose calculation, accurate volume measurement and patient-specific safety assessment remain essential.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      }
    ],
    "references": [
      "Approved Prescribing Information – ZINDROXIN SYRUP.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "zindroxin-10",
    "slug": "zindroxin-10",
    "brandName": "ZINDROXIN-10",
    "genericName": "Hydroxyzine 10 mg Tablet",
    "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "10 mg",
    "packSize": "10 × 15 Alu-Alu Tablets",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
    "composition": [
      "Each uncoated / film-coated tablet contains:",
      "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 10 mg",
      "Excipients: q.s.",
      "Regulatory note: The exact salt nomenclature and excipient declaration should match the approved ZINDROXIN-10 product artwork and package insert."
    ],
    "therapeuticCategory": "Antihistamine",
    "pharmacologicalClass": "First-generation H1-antihistamine",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "Interaction with H1 receptors"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Itching / wheal-and-flare response"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Hydroxyzine blocks H1 receptor-mediated effects"
      }
    ],
    "indications": [
      "Management of acute and chronic allergy & pruritus conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Hydroxyzine 10 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — DROWSINESS & IMPAIRED ALE",
        "detail": "Accordion 01 — DROWSINESS & IMPAIRED ALERTNESS"
      },
      {
        "title": "Hydroxyzine may cause drowsiness and sed",
        "detail": "Hydroxyzine may cause drowsiness and sedation."
      },
      {
        "title": "Patients should be counselled about acti",
        "detail": "Patients should be counselled about activities requiring mental alertness, particularly when beginning therapy or when the dose is changed."
      },
      {
        "title": "Accordion 02 — DRIVING & MACHINERY",
        "detail": "Accordion 02 — DRIVING & MACHINERY"
      },
      {
        "title": "Patients should be advised to understand",
        "detail": "Patients should be advised to understand their individual response to hydroxyzine before undertaking activities requiring full alertness."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "ZINDROXIN-10 provides an oral antihistamine option for symptomatic management of appropriate histamine-mediated pruritus. Its use should be individualised with attention to sedation, concomitant medicines, patient age, underlying disease and cardiac risk factors.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      }
    ],
    "references": [
      "Approved Prescribing Information – ZINDROXIN-10.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  },
  {
    "id": "zindroxin-25",
    "slug": "zindroxin-25",
    "brandName": "ZINDROXIN-25",
    "genericName": "Hydroxyzine 25 mg Tablet",
    "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
    "therapeuticArea": "Allergy & Pruritus",
    "route": "Oral / Systematic",
    "routeSubcategory": "Anti-Allergic / Pruritic",
    "dosageForm": "Tablet",
    "strength": "25 mg",
    "packSize": "10 × 10 Alu-Alu",
    "prescriptionStatus": "Prescription Medicine",
    "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
    "composition": [
      "Each tablet contains:",
      "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 25 mg",
      "Excipients: q.s.",
      "Regulatory note: The final salt nomenclature, excipient declaration and product description should exactly match the approved ZINDROXIN-25 product specification and package insert."
    ],
    "therapeuticCategory": "Antihistamine",
    "pharmacologicalClass": "First-generation H1-antihistamine",
    "mechanismOfAction": [
      {
        "step": "01",
        "title": "Target Binding & Cellular Action",
        "description": "H1-receptor activation"
      },
      {
        "step": "02",
        "title": "Pathway Modulation",
        "description": "Itching / wheal-and-flare response"
      },
      {
        "step": "03",
        "title": "Clinical Resolution",
        "description": "Hydroxyzine blocks H1 receptor-mediated effects"
      }
    ],
    "indications": [
      "Management of acute and chronic allergy & pruritus conditions",
      "Dermatologist-guided clinical therapy",
      "Symptomatic relief and maintenance care"
    ],
    "dosageAdministration": {
      "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
      "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
      "duration": "As directed by physician; reassess periodically for continued appropriateness.",
      "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
    },
    "specialPopulations": {
      "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
      "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
      "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
      "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
      "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
    },
    "contraindications": [
      "Known hypersensitivity to Hydroxyzine 25 mg Tablet or any excipients in the formulation.",
      "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
    ],
    "warningsPrecautions": [
      {
        "title": "Accordion 01 — DROWSINESS & SEDATION",
        "detail": "Accordion 01 — DROWSINESS & SEDATION"
      },
      {
        "title": "Hydroxyzine may cause drowsiness and sed",
        "detail": "Hydroxyzine may cause drowsiness and sedation."
      },
      {
        "title": "Patients should be counselled regarding ",
        "detail": "Patients should be counselled regarding activities requiring full alertness."
      },
      {
        "title": "Accordion 02 — DRIVING & MACHINERY",
        "detail": "Accordion 02 — DRIVING & MACHINERY"
      },
      {
        "title": "Patients should understand their individ",
        "detail": "Patients should understand their individual response before driving or operating machinery."
      }
    ],
    "adverseEffects": {
      "common": [
        "Mild transient local erythema or tingling",
        "Mild dryness at application site"
      ],
      "lessCommon": [
        "Follicular irritation",
        "Contact sensitization"
      ],
      "rare": [
        "Systemic absorption with excessive prolonged occlusive use",
        "Immediate hypersensitivity reactions"
      ]
    },
    "drugInteractions": {
      "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
      "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
    },
    "storageHandling": [
      "Store below 25°C to 30°C in a dry place.",
      "Protect from excessive heat and direct sunlight.",
      "Keep container tightly closed after use.",
      "Keep out of reach of children."
    ],
    "patientCounselling": [
      {
        "question": "What is this medicine used for?",
        "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
      },
      {
        "question": "How should it be used?",
        "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
      },
      {
        "question": "What should be avoided?",
        "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
      },
      {
        "question": "When to contact the doctor?",
        "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
      }
    ],
    "clinicalPearl": "ZINDROXIN-25 provides a 25 mg hydroxyzine presentation for symptomatic management of appropriate allergic and histamine-mediated pruritic conditions. Clinical use should be individualised with careful attention to sedation, concomitant medicines, patient age, underlying disease and cardiac risk factors.",
    "relatedProducts": [
      {
        "name": "BLISMIN-20",
        "generic": "Bilastine 20 mg Tablet",
        "slug": "blismin-20"
      },
      {
        "name": "BLISMIN-M",
        "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
        "slug": "blismin-m"
      },
      {
        "name": "DINOFEX-180",
        "generic": "Fexofenadine 180 mg Tablet",
        "slug": "dinofex-180"
      }
    ],
    "references": [
      "Approved Prescribing Information – ZINDROXIN-25.",
      "Current Indian Guidelines for Dermatological Practice.",
      "Standard Dermatological Pharmacology & Therapeutics References."
    ],
    "hasFullMonograph": false
  }
];

export const THERAPEUTIC_AREAS = [
 'Acne',
 'Antifungal',
 'Antibacterial',
 'Corticosteroids',
 'Allergy & Pruritus',
 'Immunomodulator',
 'Pigmentation',
 'Hair & Scalp',
 'Anti-Parasitic',
 'Supportive Care'
] as const;

export const ROUTES = [
 {
 name: 'Topical',
 subcategories: [
 'Corticosteroids',
 'Steroid combinations',
 'Antibacterial',
 'Acne',
 'Immunomodulator',
 'Antifungal',
 'Anti-Parasitic',
 'Cleansing / Supportive Care'
 ]
 },
 {
 name: 'Oral / Systematic',
 subcategories: [
 'Anti-Allergic / Pruritic',
 'Antibacterial',
 'Acne',
 'Immunomodulator',
 'Antifungal',
 'Hair & Scalp',
 'Gastro support'
 ]
 }
] as const;

export const DOSAGE_FORMS = [
 'Cream',
 'Ointment',
 'Gel',
 'Lotion',
 'Tablet',
 'Capsule',
 'Softgel',
 'Syrup',
 'Solution',
 'Soap',
 'Powder',
 'Gummy'
] as const;

export function getProductBySlug(slug: string): RyanProduct | undefined {
 return RYAN_PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getFeaturedProducts(): RyanProduct[] {
 const featuredSlugs = [
 'tenorium-cream',
 'clixodin-ad',
 'kefin-cream',
 'i-tacnoid-20',
 'tofaplast-5-tab',
 'tressicle-f',
 'blismin-20',
 'miteclin-cream'
 ];
 return RYAN_PRODUCTS.filter(p => featuredSlugs.some(fs => p.slug.includes(fs) || fs.includes(p.slug))).slice(0, 8);
}
