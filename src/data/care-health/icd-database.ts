/**
 * ICD-10 Database for Medical Claim Audit
 * Maps ICD codes to treatments, typical costs, and medical necessity criteria
 */

export interface ICDCodeEntry {
  code: string;
  description: string;
  category: string;
  typicalTreatments: string[];
  avgHospitalStay: number; // days
  typicalCostRange: [number, number]; // INR
  medicalNecessityCriteria: string[];
  commonComplications: string[];
  ageGroup: "all" | "pediatric" | "adult" | "geriatric";
  requiresPreAuth: boolean;
}

export const ICD_DATABASE: Record<string, ICDCodeEntry> = {
  // Cardiovascular
  "I25.1": {
    code: "I25.1",
    description: "Atherosclerotic heart disease",
    category: "Cardiovascular",
    typicalTreatments: ["PCI with Stent", "CABG", "Medical Management", "Lifestyle Modification"],
    avgHospitalStay: 3,
    typicalCostRange: [150000, 400000],
    medicalNecessityCriteria: [
      "Angiography showing >70% stenosis",
      "Positive stress test",
      "Symptomatic angina not controlled by medication",
      "Troponin elevation indicating ACS"
    ],
    commonComplications: ["Heart Failure", "Arrhythmia", "Recurrent angina"],
    ageGroup: "adult",
    requiresPreAuth: true
  },
  "I21.0": {
    code: "I21.0",
    description: "Acute myocardial infarction of anterior wall",
    category: "Cardiovascular",
    typicalTreatments: ["Primary PCI", "Thrombolysis", "Medical Management"],
    avgHospitalStay: 5,
    typicalCostRange: [200000, 500000],
    medicalNecessityCriteria: [
      "Chest pain >30 minutes",
      "ST elevation on ECG",
      "Elevated cardiac enzymes",
      "Emergency presentation"
    ],
    commonComplications: ["Cardiogenic shock", "Ventricular rupture", "Arrhythmias"],
    ageGroup: "adult",
    requiresPreAuth: false
  },
  "I50.9": {
    code: "I50.9",
    description: "Heart failure, unspecified",
    category: "Cardiovascular",
    typicalTreatments: ["Medical Management", "ICU Care", "Diuretics", "ACE Inhibitors"],
    avgHospitalStay: 7,
    typicalCostRange: [100000, 300000],
    medicalNecessityCriteria: [
      "Dyspnea at rest or minimal exertion",
      "Bilateral pedal edema",
      "Elevated BNP levels",
      "Reduced ejection fraction on echo"
    ],
    commonComplications: ["Pulmonary edema", "Arrhythmias", "Renal failure"],
    ageGroup: "geriatric",
    requiresPreAuth: false
  },

  // Respiratory
  "J18.9": {
    code: "J18.9",
    description: "Pneumonia, unspecified organism",
    category: "Respiratory",
    typicalTreatments: ["Antibiotics", "Supportive Care", "Oxygen Therapy"],
    avgHospitalStay: 5,
    typicalCostRange: [50000, 150000],
    medicalNecessityCriteria: [
      "Chest X-ray showing consolidation",
      "Fever >38°C",
      "Elevated WBC count",
      "Respiratory symptoms"
    ],
    commonComplications: ["Respiratory failure", "Sepsis", "Pleural effusion"],
    ageGroup: "all",
    requiresPreAuth: false
  },
  "J44.1": {
    code: "J44.1",
    description: "Chronic obstructive pulmonary disease with acute exacerbation",
    category: "Respiratory",
    typicalTreatments: ["Bronchodilators", "Steroids", "Antibiotics", "Oxygen Therapy"],
    avgHospitalStay: 6,
    typicalCostRange: [80000, 200000],
    medicalNecessityCriteria: [
      "Known COPD history",
      "Increased dyspnea",
      "Increased sputum volume/purulence",
      "Hypoxemia on ABG"
    ],
    commonComplications: ["Respiratory failure", "Pneumonia", "Cor pulmonale"],
    ageGroup: "adult",
    requiresPreAuth: false
  },

  // Gastrointestinal
  "K35.80": {
    code: "K35.80",
    description: "Acute appendicitis without perforation",
    category: "Gastrointestinal",
    typicalTreatments: ["Appendectomy", "Antibiotics"],
    avgHospitalStay: 2,
    typicalCostRange: [40000, 100000],
    medicalNecessityCriteria: [
      "Right lower quadrant pain",
      "Elevated WBC",
      "CT/Ultrasound findings",
      "Rebound tenderness"
    ],
    commonComplications: ["Perforation", "Abscess", "Peritonitis"],
    ageGroup: "all",
    requiresPreAuth: false
  },
  "K80.2": {
    code: "K80.2",
    description: "Calculus of gallbladder without cholecystitis",
    category: "Gastrointestinal",
    typicalTreatments: ["Laparoscopic Cholecystectomy", "Medical Management"],
    avgHospitalStay: 2,
    typicalCostRange: [60000, 150000],
    medicalNecessityCriteria: [
      "Symptomatic gallstones",
      "Biliary colic episodes",
      "USG showing gallstones",
      "Failed medical management"
    ],
    commonComplications: ["Cholecystitis", "Pancreatitis", "Cholangitis"],
    ageGroup: "adult",
    requiresPreAuth: true
  },

  // Orthopedic
  "S72.001": {
    code: "S72.001",
    description: "Fracture of unspecified part of neck of right femur",
    category: "Orthopedic",
    typicalTreatments: ["Hip Replacement", "Internal Fixation", "Conservative Management"],
    avgHospitalStay: 7,
    typicalCostRange: [200000, 500000],
    medicalNecessityCriteria: [
      "Trauma history",
      "X-ray showing fracture",
      "Inability to bear weight",
      "Surgical indication based on fracture type"
    ],
    commonComplications: ["Non-union", "AVN", "Infection"],
    ageGroup: "geriatric",
    requiresPreAuth: true
  },
  "M17.0": {
    code: "M17.0",
    description: "Bilateral primary osteoarthritis of knee",
    category: "Orthopedic",
    typicalTreatments: ["Total Knee Replacement", "Physical Therapy", "Pain Management"],
    avgHospitalStay: 5,
    typicalCostRange: [300000, 600000],
    medicalNecessityCriteria: [
      "Failed conservative treatment >6 months",
      "Severe pain affecting daily activities",
      "X-ray showing advanced OA (Grade 3-4)",
      "Age >55 years typically"
    ],
    commonComplications: ["Infection", "DVT", "Loosening of prosthesis"],
    ageGroup: "geriatric",
    requiresPreAuth: true
  },

  // Neurological
  "I63.9": {
    code: "I63.9",
    description: "Cerebral infarction, unspecified",
    category: "Neurological",
    typicalTreatments: ["Thrombolysis", "Antiplatelets", "Rehabilitation"],
    avgHospitalStay: 10,
    typicalCostRange: [150000, 400000],
    medicalNecessityCriteria: [
      "Sudden onset neurological deficit",
      "CT/MRI showing infarct",
      "Within thrombolysis window if applicable",
      "NIHSS scoring"
    ],
    commonComplications: ["Hemorrhagic transformation", "Cerebral edema", "Seizures"],
    ageGroup: "adult",
    requiresPreAuth: false
  },

  // Renal
  "N17.9": {
    code: "N17.9",
    description: "Acute kidney failure, unspecified",
    category: "Renal",
    typicalTreatments: ["Dialysis", "ICU Care", "Treat underlying cause"],
    avgHospitalStay: 8,
    typicalCostRange: [200000, 500000],
    medicalNecessityCriteria: [
      "Elevated creatinine >2x baseline",
      "Decreased urine output",
      "Electrolyte abnormalities",
      "Fluid overload"
    ],
    commonComplications: ["Chronic kidney disease", "Electrolyte imbalance", "Sepsis"],
    ageGroup: "all",
    requiresPreAuth: false
  },

  // Infectious
  "A09": {
    code: "A09",
    description: "Infectious gastroenteritis and colitis, unspecified",
    category: "Infectious",
    typicalTreatments: ["IV Fluids", "Antibiotics", "Supportive Care"],
    avgHospitalStay: 3,
    typicalCostRange: [20000, 60000],
    medicalNecessityCriteria: [
      "Severe dehydration",
      "Unable to tolerate oral intake",
      "Electrolyte imbalance",
      "High fever with systemic symptoms"
    ],
    commonComplications: ["Dehydration", "Electrolyte imbalance", "Sepsis"],
    ageGroup: "all",
    requiresPreAuth: false
  },

  // Diabetes related
  "E11.65": {
    code: "E11.65",
    description: "Type 2 diabetes mellitus with hyperglycemia",
    category: "Endocrine",
    typicalTreatments: ["Insulin Therapy", "Oral Hypoglycemics", "Diet Management"],
    avgHospitalStay: 4,
    typicalCostRange: [40000, 100000],
    medicalNecessityCriteria: [
      "Blood glucose >300 mg/dL",
      "Ketoacidosis risk",
      "Infection precipitating hyperglycemia",
      "Unable to control with oral agents"
    ],
    commonComplications: ["DKA", "HHS", "Infection"],
    ageGroup: "adult",
    requiresPreAuth: false
  },

  // Surgical
  "K40.9": {
    code: "K40.9",
    description: "Inguinal hernia, without obstruction or gangrene",
    category: "Surgical",
    typicalTreatments: ["Hernioplasty", "Mesh Repair"],
    avgHospitalStay: 2,
    typicalCostRange: [50000, 120000],
    medicalNecessityCriteria: [
      "Symptomatic hernia",
      "Increasing size",
      "Risk of strangulation",
      "Interference with daily activities"
    ],
    commonComplications: ["Strangulation", "Obstruction", "Recurrence"],
    ageGroup: "all",
    requiresPreAuth: true
  },

  // Gynecological
  "N83.2": {
    code: "N83.2",
    description: "Other and unspecified ovarian cyst",
    category: "Gynecological",
    typicalTreatments: ["Cystectomy", "Oophorectomy", "Observation"],
    avgHospitalStay: 3,
    typicalCostRange: [80000, 200000],
    medicalNecessityCriteria: [
      "Large cyst >5cm",
      "Symptomatic",
      "Complex cyst on imaging",
      "Risk of torsion/rupture"
    ],
    commonComplications: ["Torsion", "Rupture", "Malignancy"],
    ageGroup: "adult",
    requiresPreAuth: true
  }
};

/**
 * Get ICD entry by code
 */
export function getICDEntry(code: string): ICDCodeEntry | undefined {
  // Try exact match first
  if (ICD_DATABASE[code]) {
    return ICD_DATABASE[code];
  }
  
  // Try partial match (e.g., I25.1 -> I25)
  const baseCode = code.split('.')[0];
  for (const key of Object.keys(ICD_DATABASE)) {
    if (key.startsWith(baseCode)) {
      return ICD_DATABASE[key];
    }
  }
  
  return undefined;
}

/**
 * Check if treatment matches ICD code
 */
export function validateTreatmentICDCorrelation(
  icdCode: string,
  treatments: string[]
): { valid: boolean; matchedTreatments: string[]; mismatchedTreatments: string[] } {
  const entry = getICDEntry(icdCode);
  
  if (!entry) {
    return { valid: false, matchedTreatments: [], mismatchedTreatments: treatments };
  }
  
  const matchedTreatments: string[] = [];
  const mismatchedTreatments: string[] = [];
  
  for (const treatment of treatments) {
    const isMatch = entry.typicalTreatments.some(typical => 
      treatment.toLowerCase().includes(typical.toLowerCase()) ||
      typical.toLowerCase().includes(treatment.toLowerCase())
    );
    
    if (isMatch) {
      matchedTreatments.push(treatment);
    } else {
      mismatchedTreatments.push(treatment);
    }
  }
  
  return {
    valid: mismatchedTreatments.length === 0,
    matchedTreatments,
    mismatchedTreatments
  };
}

/**
 * Get cost benchmark for ICD code
 */
export function getCostBenchmark(icdCode: string, city: string = "metro"): {
  min: number;
  max: number;
  recommended: number;
  variance: number;
} {
  const entry = getICDEntry(icdCode);
  
  if (!entry) {
    return { min: 0, max: 0, recommended: 0, variance: 0.3 };
  }
  
  const [min, max] = entry.typicalCostRange;
  const recommended = Math.round((min + max) / 2);
  
  // City-based adjustment
  const cityMultiplier = city === "metro" ? 1.0 : city === "tier1" ? 0.85 : 0.7;
  
  return {
    min: Math.round(min * cityMultiplier),
    max: Math.round(max * cityMultiplier),
    recommended: Math.round(recommended * cityMultiplier),
    variance: 0.25 // 25% variance acceptable
  };
}
