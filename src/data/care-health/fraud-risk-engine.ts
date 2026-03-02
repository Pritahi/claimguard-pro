/**
 * Fraud Risk Scoring Engine
 * Multi-factor analysis for claim fraud detection
 */

export interface FraudRiskFactor {
  id: string;
  name: string;
  description: string;
  weight: number; // 1-10
  checkFunction: (data: any) => { triggered: boolean; score: number; evidence: string };
}

export interface FraudRiskReport {
  overallRiskScore: number; // 0-100
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  triggeredFactors: Array<{
    factor: string;
    score: number;
    evidence: string;
    recommendation: string;
  }>;
  requiresSIUReferral: boolean;
  justificationNote: string;
}

// Fraud Risk Factors
export const FRAUD_RISK_FACTORS: FraudRiskFactor[] = [
  {
    id: "FR-001",
    name: "Admission Date Anomaly",
    description: "Admission date before discharge date or illogical date sequence",
    weight: 8,
    checkFunction: (data) => {
      const admissionDate = new Date(data.admissionDate);
      const dischargeDate = new Date(data.dischargeDate);
      
      if (dischargeDate < admissionDate) {
        return {
          triggered: true,
          score: 40,
          evidence: `Discharge date (${data.dischargeDate}) is before admission date (${data.admissionDate})`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-002",
    name: "Excessive Hospital Stay",
    description: "Hospital stay duration significantly exceeds typical for diagnosis",
    weight: 6,
    checkFunction: (data) => {
      const days = data.totalDays || 0;
      const avgStay = data.avgStayForDiagnosis || 5;
      
      if (days > avgStay * 2) {
        return {
          triggered: true,
          score: Math.min(30, (days / avgStay) * 10),
          evidence: `Stay of ${days} days vs typical ${avgStay} days for diagnosis - ${Math.round((days / avgStay) * 100 - 100)}% excess`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-003",
    name: "Weekend Admission Pattern",
    description: "Elective admission on weekend without medical emergency",
    weight: 4,
    checkFunction: (data) => {
      if (!data.admissionDate) return { triggered: false, score: 0, evidence: "" };
      
      const admissionDate = new Date(data.admissionDate);
      const dayOfWeek = admissionDate.getDay();
      
      if ((dayOfWeek === 0 || dayOfWeek === 6) && !data.isEmergency) {
        return {
          triggered: true,
          score: 15,
          evidence: `Planned admission on ${dayOfWeek === 0 ? "Sunday" : "Saturday"} without emergency indication`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-004",
    name: "Unbundling of Services",
    description: "Services billed separately that should be bundled",
    weight: 7,
    checkFunction: (data) => {
      const billItems = data.billItems || [];
      const suspiciousPatterns: string[] = [];
      
      // Check for commonly unbundled items
      const bundledItems = [
        ["consultation", "visit"],
        ["surgery", "anesthesia", "ot charges"],
        ["room", "nursing", "boarding"]
      ];
      
      for (const pattern of bundledItems) {
        const matches = billItems.filter((item: string) => 
          pattern.some(p => item.toLowerCase().includes(p))
        );
        if (matches.length > 2) {
          suspiciousPatterns.push(matches.join(", "));
        }
      }
      
      if (suspiciousPatterns.length > 0) {
        return {
          triggered: true,
          score: 25,
          evidence: `Potential unbundling detected: ${suspiciousPatterns.join("; ")}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-005",
    name: "Price Inflation",
    description: "Charges significantly above market rates",
    weight: 8,
    checkFunction: (data) => {
      const billedAmount = data.totalAmount || 0;
      const marketRate = data.marketRate || billedAmount;
      const inflation = ((billedAmount - marketRate) / marketRate) * 100;
      
      if (inflation > 50) {
        return {
          triggered: true,
          score: Math.min(35, inflation * 0.5),
          evidence: `Billed amount ₹${billedAmount.toLocaleString()} is ${Math.round(inflation)}% above market rate of ₹${marketRate.toLocaleString()}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-006",
    name: "Duplicate Billing",
    description: "Same item billed multiple times",
    weight: 9,
    checkFunction: (data) => {
      const billItems = data.billItems || [];
      const itemMap = new Map<string, number>();
      
      for (const item of billItems) {
        const normalized = item.toLowerCase().trim();
        itemMap.set(normalized, (itemMap.get(normalized) || 0) + 1);
      }
      
      const duplicates = Array.from(itemMap.entries())
        .filter(([_, count]) => count > 1)
        .map(([item, count]) => `${item} (${count}x)`);
      
      if (duplicates.length > 0) {
        return {
          triggered: true,
          score: 30,
          evidence: `Duplicate billing detected: ${duplicates.join(", ")}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-007",
    name: "Provider-Hospital Relationship",
    description: "Multiple claims from same provider-hospital combination",
    weight: 5,
    checkFunction: (data) => {
      // This would need historical data - simplified version
      if (data.hasMultipleClaims && data.sameProviderHospital) {
        return {
          triggered: true,
          score: 20,
          evidence: "Multiple claims detected from same provider-hospital combination"
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-008",
    name: "Missing Critical Documentation",
    description: "Essential documents missing or incomplete",
    weight: 6,
    checkFunction: (data) => {
      const missing: string[] = [];
      
      if (!data.doctorSignature) missing.push("Doctor signature");
      if (!data.icdCode) missing.push("ICD code");
      if (!data.patientSignature) missing.push("Patient signature");
      if (!data.diagnosis) missing.push("Diagnosis");
      
      if (missing.length >= 2) {
        return {
          triggered: true,
          score: missing.length * 10,
          evidence: `Missing critical documentation: ${missing.join(", ")}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-009",
    name: "Treatment-Diagnosis Mismatch",
    description: "Treatment doesn't align with diagnosis",
    weight: 8,
    checkFunction: (data) => {
      if (data.treatmentDiagnosisMismatch) {
        return {
          triggered: true,
          score: 35,
          evidence: `Treatment "${data.treatment}" not typically indicated for diagnosis "${data.diagnosis}"`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-010",
    name: "Ghost Patient Indicators",
    description: "Signs of potentially non-existent patient",
    weight: 10,
    checkFunction: (data) => {
      const indicators: string[] = [];
      
      if (!data.patientPhone && !data.patientAddress) indicators.push("No contact information");
      if (!data.patientPhoto && data.requiresPhoto) indicators.push("Missing photo ID");
      if (!data.bedAllocationRecord) indicators.push("No bed allocation record");
      if (!data.attendanceRecord) indicators.push("No attendance record");
      
      if (indicators.length >= 2) {
        return {
          triggered: true,
          score: 50,
          evidence: `Ghost patient indicators: ${indicators.join(", ")}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-011",
    name: "Upcoding Indicators",
    description: "Diagnosis or procedure coded at higher severity",
    weight: 7,
    checkFunction: (data) => {
      if (data.hasUpcoding) {
        return {
          triggered: true,
          score: 30,
          evidence: `Potential upcoding: ${data.upcodingEvidence || "Higher DRG/severity code without supporting documentation"}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  },
  {
    id: "FR-012",
    name: "Phantom Services",
    description: "Services billed but not documented",
    weight: 9,
    checkFunction: (data) => {
      const phantomServices = data.phantomServices || [];
      
      if (phantomServices.length > 0) {
        return {
          triggered: true,
          score: 40,
          evidence: `Services billed without documentation: ${phantomServices.join(", ")}`
        };
      }
      return { triggered: false, score: 0, evidence: "" };
    }
  }
];

/**
 * Calculate fraud risk score for a claim
 */
export function calculateFraudRisk(claimData: any): FraudRiskReport {
  let totalScore = 0;
  const triggeredFactors: FraudRiskReport["triggeredFactors"] = [];
  
  for (const factor of FRAUD_RISK_FACTORS) {
    const result = factor.checkFunction(claimData);
    
    if (result.triggered) {
      const weightedScore = (result.score * factor.weight) / 10;
      totalScore += weightedScore;
      
      triggeredFactors.push({
        factor: `${factor.id}: ${factor.name}`,
        score: weightedScore,
        evidence: result.evidence,
        recommendation: getRecommendation(factor.id, weightedScore)
      });
    }
  }
  
  // Cap at 100
  totalScore = Math.min(100, totalScore);
  
  // Determine risk level
  let riskLevel: FraudRiskReport["riskLevel"];
  if (totalScore >= 70) {
    riskLevel = "CRITICAL";
  } else if (totalScore >= 50) {
    riskLevel = "HIGH";
  } else if (totalScore >= 30) {
    riskLevel = "MEDIUM";
  } else {
    riskLevel = "LOW";
  }
  
  // Determine SIU referral
  const requiresSIUReferral = totalScore >= 50 || 
    triggeredFactors.some(f => 
      f.factor.includes("FR-010") || // Ghost patient
      f.factor.includes("FR-006") || // Duplicate billing
      f.factor.includes("FR-012")    // Phantom services
    );
  
  // Generate justification note
  const justificationNote = generateJustificationNote(riskLevel, totalScore, triggeredFactors);
  
  return {
    overallRiskScore: Math.round(totalScore),
    riskLevel,
    triggeredFactors,
    requiresSIUReferral,
    justificationNote
  };
}

function getRecommendation(factorId: string, score: number): string {
  const recommendations: Record<string, string> = {
    "FR-001": "Verify dates with hospital; request corrected documents",
    "FR-002": "Request clinical justification for extended stay",
    "FR-003": "Confirm emergency status; review admission notes",
    "FR-004": "Review itemized bill for bundling opportunities",
    "FR-005": "Negotiate rates; apply market rate benchmarking",
    "FR-006": "Remove duplicate charges; verify services rendered",
    "FR-007": "Cross-verify with claim history database",
    "FR-008": "Request missing documents before processing",
    "FR-009": "Request specialist review; verify medical necessity",
    "FR-010": "Escalate to SIU immediately; conduct field verification",
    "FR-011": "Request operative notes; verify procedure complexity",
    "FR-012": "Remove undocumented charges; seek explanation"
  };
  
  return recommendations[factorId] || "Review and verify with hospital";
}

function generateJustificationNote(
  riskLevel: string,
  score: number,
  factors: FraudRiskReport["triggeredFactors"]
): string {
  if (riskLevel === "LOW") {
    return "Claim passes standard fraud screening. No significant risk indicators detected. Proceed with normal processing.";
  }
  
  const criticalFactors = factors.filter(f => f.score >= 20);
  
  return `FRAUD RISK ASSESSMENT REPORT

Overall Risk Score: ${score}/100 (${riskLevel} RISK)

${factors.length > 0 ? `Triggered Risk Factors:
${factors.map(f => `• ${f.factor} (Score: ${f.score})
  Evidence: ${f.evidence}
  Action: ${f.recommendation}`).join('\n\n')}` : 'No significant risk factors triggered.'}

${riskLevel === "CRITICAL" || riskLevel === "HIGH" ? 
`RECOMMENDED ACTIONS:
1. Hold claim pending investigation
2. Request additional supporting documents
3. Consider field verification if score > 70
${factors.some(f => f.factor.includes("FR-010")) ? "4. Escalate to Special Investigation Unit (SIU)" : ""}
${factors.some(f => f.factor.includes("FR-006") || f.factor.includes("FR-012")) ? "5. Conduct detailed billing audit" : ""}` : 
`This claim has been flagged for enhanced review. Standard verification procedures should be applied.`}

This assessment is based on IRDAI fraud detection guidelines and industry best practices for claim scrutiny.`;
}

/**
 * Quick fraud check for individual items
 */
export function quickFraudCheck(item: string, amount: number, marketRate: number): {
  isSuspicious: boolean;
  variance: number;
  note: string;
} {
  const variance = ((amount - marketRate) / marketRate) * 100;
  
  if (variance > 100) {
    return {
      isSuspicious: true,
      variance,
      note: `HIGH ALERT: ${item} charged at ₹${amount.toLocaleString()} vs market rate ₹${marketRate.toLocaleString()} (${Math.round(variance)}% variance). Potential overbilling.`
    };
  }
  
  if (variance > 50) {
    return {
      isSuspicious: true,
      variance,
      note: `CAUTION: ${item} charged at ₹${amount.toLocaleString()} vs market rate ₹${marketRate.toLocaleString()} (${Math.round(variance)}% variance). Review recommended.`
    };
  }
  
  return {
    isSuspicious: false,
    variance,
    note: `${item} pricing within acceptable range.`
  };
}
