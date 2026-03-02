/**
 * Cost Benchmarking Database
 * Market rates for medical procedures, treatments, and items
 */

export interface CostBenchmark {
  item: string;
  category: string;
  metroRate: [number, number]; // [min, max] for metro cities
  tier1Rate: [number, number]; // For tier 1 cities
  tier2Rate: [number, number]; // For tier 2/3 cities
  governmentRate: number; // CGHS/Ayushman rate
  nppaCeiling?: number; // If NPPA controlled
  unit: "per_item" | "per_day" | "per_procedure" | "per_test";
  notes?: string;
}

export const COST_BENCHMARKS: CostBenchmark[] = [
  // Implants and Devices
  {
    item: "Drug Eluting Stent (DES)",
    category: "Implants",
    metroRate: [28000, 35000],
    tier1Rate: [25000, 32000],
    tier2Rate: [22000, 30000],
    governmentRate: 30080,
    nppaCeiling: 30080,
    unit: "per_item",
    notes: "NPPA capped price - includes delivery system"
  },
  {
    item: "Bare Metal Stent (BMS)",
    category: "Implants",
    metroRate: [7500, 9000],
    tier1Rate: [7000, 8500],
    tier2Rate: [6500, 8000],
    governmentRate: 8261,
    nppaCeiling: 8261,
    unit: "per_item",
    notes: "NPPA capped price"
  },
  {
    item: "Knee Implant System (Complete)",
    category: "Implants",
    metroRate: [75000, 95000],
    tier1Rate: [70000, 85000],
    tier2Rate: [60000, 80000],
    governmentRate: 82100,
    nppaCeiling: 82100,
    unit: "per_item",
    notes: "NPPA capped - includes femoral, tibial, patellar components"
  },
  {
    item: "Hip Implant System",
    category: "Implants",
    metroRate: [60000, 80000],
    tier1Rate: [55000, 75000],
    tier2Rate: [50000, 70000],
    governmentRate: 70000,
    nppaCeiling: 70000,
    unit: "per_item",
    notes: "NPPA capped"
  },
  {
    item: "Cardiac Pacemaker (Single Chamber)",
    category: "Implants",
    metroRate: [80000, 150000],
    tier1Rate: [75000, 140000],
    tier2Rate: [65000, 130000],
    governmentRate: 90000,
    unit: "per_item"
  },
  {
    item: "Cardiac Pacemaker (Dual Chamber)",
    category: "Implants",
    metroRate: [150000, 250000],
    tier1Rate: [140000, 230000],
    tier2Rate: [120000, 200000],
    governmentRate: 160000,
    unit: "per_item"
  },

  // Room Charges
  {
    item: "General Ward",
    category: "Room",
    metroRate: [1500, 3000],
    tier1Rate: [1200, 2500],
    tier2Rate: [800, 2000],
    governmentRate: 1000,
    unit: "per_day"
  },
  {
    item: "Semi-Private Room",
    category: "Room",
    metroRate: [2500, 5000],
    tier1Rate: [2000, 4000],
    tier2Rate: [1500, 3000],
    governmentRate: 2000,
    unit: "per_day"
  },
  {
    item: "Private Room",
    category: "Room",
    metroRate: [5000, 10000],
    tier1Rate: [4000, 8000],
    tier2Rate: [3000, 6000],
    governmentRate: 3000,
    unit: "per_day"
  },
  {
    item: "ICU",
    category: "Room",
    metroRate: [10000, 20000],
    tier1Rate: [8000, 15000],
    tier2Rate: [6000, 12000],
    governmentRate: 6000,
    unit: "per_day"
  },
  {
    item: "CCU/ICCU",
    category: "Room",
    metroRate: [12000, 22000],
    tier1Rate: [10000, 18000],
    tier2Rate: [8000, 15000],
    governmentRate: 7000,
    unit: "per_day"
  },
  {
    item: "NICU",
    category: "Room",
    metroRate: [15000, 25000],
    tier1Rate: [12000, 20000],
    tier2Rate: [10000, 18000],
    governmentRate: 8000,
    unit: "per_day"
  },

  // Surgical Procedures
  {
    item: "CABG (Single Bypass)",
    category: "Surgery",
    metroRate: [200000, 350000],
    tier1Rate: [180000, 300000],
    tier2Rate: [150000, 250000],
    governmentRate: 175000,
    unit: "per_procedure"
  },
  {
    item: "CABG (Double/Triple Bypass)",
    category: "Surgery",
    metroRate: [300000, 500000],
    tier1Rate: [250000, 450000],
    tier2Rate: [200000, 400000],
    governmentRate: 220000,
    unit: "per_procedure"
  },
  {
    item: "Angiography",
    category: "Procedure",
    metroRate: [15000, 25000],
    tier1Rate: [12000, 22000],
    tier2Rate: [10000, 18000],
    governmentRate: 12000,
    unit: "per_procedure"
  },
  {
    item: "Angioplasty (Single Vessel)",
    category: "Procedure",
    metroRate: [150000, 250000],
    tier1Rate: [130000, 220000],
    tier2Rate: [110000, 200000],
    governmentRate: 140000,
    unit: "per_procedure"
  },
  {
    item: "Total Knee Replacement (Single)",
    category: "Surgery",
    metroRate: [250000, 450000],
    tier1Rate: [220000, 400000],
    tier2Rate: [180000, 350000],
    governmentRate: 200000,
    unit: "per_procedure"
  },
  {
    item: "Total Hip Replacement",
    category: "Surgery",
    metroRate: [200000, 400000],
    tier1Rate: [180000, 350000],
    tier2Rate: [150000, 300000],
    governmentRate: 175000,
    unit: "per_procedure"
  },
  {
    item: "Laparoscopic Cholecystectomy",
    category: "Surgery",
    metroRate: [50000, 100000],
    tier1Rate: [45000, 85000],
    tier2Rate: [35000, 70000],
    governmentRate: 40000,
    unit: "per_procedure"
  },
  {
    item: "Appendectomy",
    category: "Surgery",
    metroRate: [40000, 80000],
    tier1Rate: [35000, 70000],
    tier2Rate: [30000, 60000],
    governmentRate: 30000,
    unit: "per_procedure"
  },
  {
    item: "Hernia Repair",
    category: "Surgery",
    metroRate: [50000, 100000],
    tier1Rate: [45000, 85000],
    tier2Rate: [35000, 70000],
    governmentRate: 35000,
    unit: "per_procedure"
  },
  {
    item: "Cataract Surgery (Single Eye)",
    category: "Surgery",
    metroRate: [25000, 60000],
    tier1Rate: [20000, 50000],
    tier2Rate: [15000, 40000],
    governmentRate: 15000,
    unit: "per_procedure"
  },
  {
    item: "Hysterectomy",
    category: "Surgery",
    metroRate: [80000, 150000],
    tier1Rate: [70000, 130000],
    tier2Rate: [50000, 100000],
    governmentRate: 55000,
    unit: "per_procedure"
  },
  {
    item: "Cesarean Section",
    category: "Surgery",
    metroRate: [60000, 120000],
    tier1Rate: [50000, 100000],
    tier2Rate: [40000, 80000],
    governmentRate: 45000,
    unit: "per_procedure"
  },
  {
    item: "Normal Delivery",
    category: "Surgery",
    metroRate: [30000, 60000],
    tier1Rate: [25000, 50000],
    tier2Rate: [20000, 40000],
    governmentRate: 20000,
    unit: "per_procedure"
  },

  // Diagnostic Tests
  {
    item: "MRI Brain",
    category: "Diagnostic",
    metroRate: [4000, 8000],
    tier1Rate: [3500, 7000],
    tier2Rate: [3000, 6000],
    governmentRate: 3000,
    unit: "per_test"
  },
  {
    item: "MRI Spine",
    category: "Diagnostic",
    metroRate: [5000, 10000],
    tier1Rate: [4500, 8500],
    tier2Rate: [3500, 7000],
    governmentRate: 3500,
    unit: "per_test"
  },
  {
    item: "CT Scan (Plain)",
    category: "Diagnostic",
    metroRate: [2000, 5000],
    tier1Rate: [1800, 4000],
    tier2Rate: [1500, 3500],
    governmentRate: 1500,
    unit: "per_test"
  },
  {
    item: "CT Scan (Contrast)",
    category: "Diagnostic",
    metroRate: [4000, 8000],
    tier1Rate: [3500, 7000],
    tier2Rate: [3000, 6000],
    governmentRate: 2500,
    unit: "per_test"
  },
  {
    item: "2D Echo",
    category: "Diagnostic",
    metroRate: [1500, 3000],
    tier1Rate: [1200, 2500],
    tier2Rate: [1000, 2000],
    governmentRate: 1000,
    unit: "per_test"
  },
  {
    item: "ECG",
    category: "Diagnostic",
    metroRate: [300, 800],
    tier1Rate: [250, 600],
    tier2Rate: [200, 500],
    governmentRate: 200,
    unit: "per_test"
  },
  {
    item: "X-Ray (Chest)",
    category: "Diagnostic",
    metroRate: [300, 800],
    tier1Rate: [250, 600],
    tier2Rate: [200, 500],
    governmentRate: 150,
    unit: "per_test"
  },
  {
    item: "Ultrasound (Abdomen)",
    category: "Diagnostic",
    metroRate: [800, 2000],
    tier1Rate: [700, 1500],
    tier2Rate: [500, 1200],
    governmentRate: 500,
    unit: "per_test"
  },
  {
    item: "Endoscopy",
    category: "Diagnostic",
    metroRate: [3000, 7000],
    tier1Rate: [2500, 6000],
    tier2Rate: [2000, 5000],
    governmentRate: 2000,
    unit: "per_test"
  },
  {
    item: "Colonoscopy",
    category: "Diagnostic",
    metroRate: [4000, 8000],
    tier1Rate: [3500, 7000],
    tier2Rate: [3000, 6000],
    governmentRate: 2500,
    unit: "per_test"
  },

  // Lab Tests
  {
    item: "Complete Blood Count (CBC)",
    category: "Laboratory",
    metroRate: [200, 500],
    tier1Rate: [150, 400],
    tier2Rate: [100, 300],
    governmentRate: 100,
    unit: "per_test"
  },
  {
    item: "Lipid Profile",
    category: "Laboratory",
    metroRate: [400, 800],
    tier1Rate: [350, 700],
    tier2Rate: [300, 600],
    governmentRate: 250,
    unit: "per_test"
  },
  {
    item: "Liver Function Test (LFT)",
    category: "Laboratory",
    metroRate: [400, 800],
    tier1Rate: [350, 700],
    tier2Rate: [300, 600],
    governmentRate: 250,
    unit: "per_test"
  },
  {
    item: "Kidney Function Test (KFT)",
    category: "Laboratory",
    metroRate: [400, 800],
    tier1Rate: [350, 700],
    tier2Rate: [300, 600],
    governmentRate: 250,
    unit: "per_test"
  },
  {
    item: "Thyroid Profile",
    category: "Laboratory",
    metroRate: [500, 1000],
    tier1Rate: [400, 800],
    tier2Rate: [300, 700],
    governmentRate: 300,
    unit: "per_test"
  },
  {
    item: "HbA1c",
    category: "Laboratory",
    metroRate: [400, 800],
    tier1Rate: [350, 700],
    tier2Rate: [300, 600],
    governmentRate: 250,
    unit: "per_test"
  },
  {
    item: "Troponin I/T",
    category: "Laboratory",
    metroRate: [800, 1500],
    tier1Rate: [700, 1200],
    tier2Rate: [600, 1000],
    governmentRate: 500,
    unit: "per_test"
  },
  {
    item: "BNP (B-type Natriuretic Peptide)",
    category: "Laboratory",
    metroRate: [1500, 2500],
    tier1Rate: [1200, 2000],
    tier2Rate: [1000, 1800],
    governmentRate: 1000,
    unit: "per_test"
  },

  // Professional Fees
  {
    item: "Consultation (General Physician)",
    category: "Professional",
    metroRate: [500, 1500],
    tier1Rate: [400, 1200],
    tier2Rate: [300, 1000],
    governmentRate: 300,
    unit: "per_day"
  },
  {
    item: "Consultation (Specialist)",
    category: "Professional",
    metroRate: [1000, 2500],
    tier1Rate: [800, 2000],
    tier2Rate: [600, 1500],
    governmentRate: 500,
    unit: "per_day"
  },
  {
    item: "Surgeon Fee (Major Surgery)",
    category: "Professional",
    metroRate: [50000, 150000],
    tier1Rate: [40000, 120000],
    tier2Rate: [30000, 100000],
    governmentRate: 35000,
    unit: "per_procedure"
  },
  {
    item: "Anesthetist Fee (Major Surgery)",
    category: "Professional",
    metroRate: [20000, 50000],
    tier1Rate: [15000, 40000],
    tier2Rate: [12000, 30000],
    governmentRate: 15000,
    unit: "per_procedure"
  },
  {
    item: "Cardiologist Fee (Angioplasty)",
    category: "Professional",
    metroRate: [50000, 100000],
    tier1Rate: [40000, 85000],
    tier2Rate: [30000, 70000],
    governmentRate: 40000,
    unit: "per_procedure"
  },

  // Consumables
  {
    item: "IV Cannula",
    category: "Consumables",
    metroRate: [50, 150],
    tier1Rate: [40, 120],
    tier2Rate: [30, 100],
    governmentRate: 30,
    unit: "per_item"
  },
  {
    item: "Syringe 5ml",
    category: "Consumables",
    metroRate: [10, 30],
    tier1Rate: [8, 25],
    tier2Rate: [6, 20],
    governmentRate: 5,
    unit: "per_item"
  },
  {
    item: "Surgical Gloves (Pair)",
    category: "Consumables",
    metroRate: [50, 150],
    tier1Rate: [40, 120],
    tier2Rate: [30, 100],
    governmentRate: 25,
    unit: "per_item"
  },
  {
    item: "Blood Bag",
    category: "Consumables",
    metroRate: [1500, 3000],
    tier1Rate: [1200, 2500],
    tier2Rate: [1000, 2000],
    governmentRate: 1000,
    unit: "per_item"
  },
  {
    item: "Nebulizer Kit",
    category: "Consumables",
    metroRate: [100, 300],
    tier1Rate: [80, 250],
    tier2Rate: [60, 200],
    governmentRate: 50,
    unit: "per_item"
  }
];

/**
 * Get benchmark for a specific item
 */
export function getBenchmark(itemName: string, cityType: "metro" | "tier1" | "tier2" = "metro"): CostBenchmark | undefined {
  const normalizedName = itemName.toLowerCase().trim();
  
  return COST_BENCHMARKS.find(b => {
    const benchName = b.item.toLowerCase();
    return benchName.includes(normalizedName) || normalizedName.includes(benchName);
  });
}

/**
 * Compare charged amount with benchmark
 */
export function compareWithBenchmark(
  itemName: string,
  chargedAmount: number,
  cityType: "metro" | "tier1" | "tier2" = "metro"
): {
  benchmark: CostBenchmark | null;
  variance: number;
  variancePercentage: number;
  status: "within_range" | "above_range" | "below_range" | "nppa_violation";
  recommendedAmount: number;
  potentialSaving: number;
  note: string;
} {
  const benchmark = getBenchmark(itemName, cityType);
  
  if (!benchmark) {
    return {
      benchmark: null,
      variance: 0,
      variancePercentage: 0,
      status: "within_range",
      recommendedAmount: chargedAmount,
      potentialSaving: 0,
      note: "No benchmark available for this item"
    };
  }
  
  const rateKey = cityType === "metro" ? "metroRate" : cityType === "tier1" ? "tier1Rate" : "tier2Rate";
  const [minRate, maxRate] = benchmark[rateKey];
  const recommendedAmount = Math.round((minRate + maxRate) / 2);
  
  const variance = chargedAmount - maxRate;
  const variancePercentage = ((chargedAmount - maxRate) / maxRate) * 100;
  
  // Check NPPA violation first
  if (benchmark.nppaCeiling && chargedAmount > benchmark.nppaCeiling) {
    return {
      benchmark,
      variance,
      variancePercentage,
      status: "nppa_violation",
      recommendedAmount: benchmark.nppaCeiling,
      potentialSaving: chargedAmount - benchmark.nppaCeiling,
      note: `NPPA VIOLATION: ${itemName} capped at ₹${benchmark.nppaCeiling.toLocaleString()}. Overcharge: ₹${(chargedAmount - benchmark.nppaCeiling).toLocaleString()}`
    };
  }
  
  if (chargedAmount <= maxRate && chargedAmount >= minRate) {
    return {
      benchmark,
      variance: 0,
      variancePercentage: 0,
      status: "within_range",
      recommendedAmount: chargedAmount,
      potentialSaving: 0,
      note: `${itemName} pricing within market range (₹${minRate.toLocaleString()} - ₹${maxRate.toLocaleString()})`
    };
  }
  
  if (chargedAmount > maxRate) {
    return {
      benchmark,
      variance,
      variancePercentage,
      status: "above_range",
      recommendedAmount,
      potentialSaving: variance,
      note: `ABOVE MARKET: ${itemName} charged ₹${chargedAmount.toLocaleString()} vs max ₹${maxRate.toLocaleString()} (${Math.round(variancePercentage)}% excess)`
    };
  }
  
  return {
    benchmark,
    variance,
    variancePercentage,
    status: "below_range",
    recommendedAmount: chargedAmount,
    potentialSaving: 0,
    note: `${itemName} charged below market rate - acceptable`
  };
}

/**
 * Generate cost analysis report
 */
export function generateCostAnalysisReport(
  items: Array<{ name: string; amount: number }>,
  cityType: "metro" | "tier1" | "tier2" = "metro"
): {
  totalCharged: number;
  totalRecommended: number;
  totalPotentialSaving: number;
  itemAnalysis: Array<{
    item: string;
    charged: number;
    recommended: number;
    variance: number;
    status: string;
    note: string;
  }>;
  nppaViolations: Array<{ item: string; charged: number; ceiling: number; excess: number }>;
  summary: string;
} {
  let totalCharged = 0;
  let totalRecommended = 0;
  let totalPotentialSaving = 0;
  const itemAnalysis: any[] = [];
  const nppaViolations: any[] = [];
  
  for (const item of items) {
    const comparison = compareWithBenchmark(item.name, item.amount, cityType);
    
    totalCharged += item.amount;
    totalRecommended += comparison.recommendedAmount;
    totalPotentialSaving += comparison.potentialSaving;
    
    itemAnalysis.push({
      item: item.name,
      charged: item.amount,
      recommended: comparison.recommendedAmount,
      variance: comparison.variance,
      status: comparison.status,
      note: comparison.note
    });
    
    if (comparison.status === "nppa_violation" && comparison.benchmark?.nppaCeiling) {
      nppaViolations.push({
        item: item.name,
        charged: item.amount,
        ceiling: comparison.benchmark.nppaCeiling,
        excess: item.amount - comparison.benchmark.nppaCeiling
      });
    }
  }
  
  const summary = `COST ANALYSIS SUMMARY

Total Billed Amount: ₹${totalCharged.toLocaleString()}
Recommended Amount: ₹${totalRecommended.toLocaleString()}
Potential Savings: ₹${totalPotentialSaving.toLocaleString()} (${((totalPotentialSaving / totalCharged) * 100).toFixed(1)}%)

${nppaViolations.length > 0 ? `⚠️ NPPA VIOLATIONS DETECTED (${nppaViolations.length} items):
${nppaViolations.map(v => `• ${v.item}: Charged ₹${v.charged.toLocaleString()}, Ceiling ₹${v.ceiling.toLocaleString()}, Excess ₹${v.excess.toLocaleString()}`).join('\n')}` : '✅ No NPPA violations detected'}

Items above market rate: ${itemAnalysis.filter(i => i.status === "above_range").length}
Items within range: ${itemAnalysis.filter(i => i.status === "within_range").length}
Items without benchmark: ${itemAnalysis.filter(i => i.status === "within_range" && !i.benchmark).length}`;

  return {
    totalCharged,
    totalRecommended,
    totalPotentialSaving,
    itemAnalysis,
    nppaViolations,
    summary
  };
}
