/**
 * Policy Clause Reference Engine
 * Maps audit findings to IRDA regulations and policy sections
 */

export interface PolicyClause {
  sectionId: string;
  sectionName: string;
  irdaRegulation?: string;
  policyClause: string;
  description: string;
  applicability: string[];
  legalWeight: "mandatory" | "recommended" | "best_practice";
  penalty?: string;
}

export interface AuditViolation {
  violationType: string;
  clauseReference: PolicyClause;
  severity: "critical" | "major" | "minor";
  legalImplication: string;
  recommendedAction: string;
  documentationRequired: string[];
}

// IRDA Regulations and Standard Policy Clauses
export const POLICY_CLAUSES: PolicyClause[] = [
  // Pre-auth and Authorization
  {
    sectionId: "PRE-AUTH-001",
    sectionName: "Pre-Authorization Requirement",
    irdaRegulation: "IRDAI (Health Insurance) Regulations 2016, Regulation 27",
    policyClause: "Pre-authorization must be obtained for all planned hospitalizations at least 48 hours before admission, except in emergency cases.",
    description: "Mandatory pre-authorization for planned procedures to ensure coverage verification and network hospital coordination.",
    applicability: ["planned_surgeries", "day_care_procedures", "planned_investigations"],
    legalWeight: "mandatory",
    penalty: "Claim may be denied or reduced if pre-auth not obtained without valid reason"
  },
  {
    sectionId: "PRE-AUTH-002",
    sectionName: "Emergency Admission Protocol",
    irdaRegulation: "IRDAI Guidelines on Standardization of Exclusions 2016",
    policyClause: "In emergency admissions, intimation must be given within 24 hours of hospitalization.",
    description: "Emergency cases must be intimated to TPA within 24 hours to avail cashless facility.",
    applicability: ["emergency_admissions", "accidents", "acute_conditions"],
    legalWeight: "mandatory",
    penalty: "Delayed intimation may result in claim processing delays"
  },

  // Room Rent and Accommodation
  {
    sectionId: "ROOM-001",
    sectionName: "Room Rent Entitlement",
    irdaRegulation: "IRDAI (Health Insurance) Regulations 2016, Schedule I",
    policyClause: "Room rent is capped at 1% of Sum Insured per day for standard private room. ICU charges capped at 2% of Sum Insured per day.",
    description: "Room rent limits as per policy terms. Exceeding limits results in proportionate deduction in other charges.",
    applicability: ["room_charges", "icu_charges", "nursing_charges"],
    legalWeight: "mandatory",
    penalty: "Proportionate deduction on all associated charges including doctor fees, investigations, procedures"
  },
  {
    sectionId: "ROOM-002",
    sectionName: "Room Category Upgrade",
    policyClause: "If patient opts for higher category room, all associated charges will be proportionately reduced based on the difference in room rent.",
    description: "Upgrading room category triggers proportionate reduction in all hospital charges.",
    applicability: ["room_upgrade", "premium_rooms", "suite_rooms"],
    legalWeight: "mandatory",
    penalty: "Reduction calculated as: (Eligible room rent / Actual room rent) × Bill amount"
  },

  // Co-payment and Deductibles
  {
    sectionId: "COPAY-001",
    sectionName: "Co-payment Clause",
    irdaRegulation: "IRDAI Guidelines on Co-payment 2019",
    policyClause: "Co-payment percentage as mentioned in policy schedule applies to each and every claim.",
    description: "Fixed percentage of admissible claim amount to be borne by insured as per policy terms.",
    applicability: ["all_claims", "network_hospitals", "non_network_hospitals"],
    legalWeight: "mandatory",
    penalty: "Non-deduction of co-pay leads to overpayment"
  },
  {
    sectionId: "COPAY-002",
    sectionName: "Non-Network Co-payment",
    policyClause: "Additional co-payment of 20% applicable for treatment in non-network hospitals.",
    description: "Higher co-payment for non-network hospital treatment to encourage network utilization.",
    applicability: ["non_network_hospitals", "reimbursement_claims"],
    legalWeight: "mandatory",
    penalty: "Total co-payment may reach 30-40% in non-network hospitals"
  },

  // Pre-existing Diseases
  {
    sectionId: "PED-001",
    sectionName: "Pre-existing Disease Waiting Period",
    irdaRegulation: "IRDAI (Health Insurance) Regulations 2016, Regulation 7",
    policyClause: "Pre-existing diseases are covered only after completion of 36 months (3 years) of continuous coverage.",
    description: "Waiting period for PED coverage. Claims for PED before waiting period are excluded.",
    applicability: ["chronic_conditions", "declared_conditions", "ongoing_treatments"],
    legalWeight: "mandatory",
    penalty: "Claim denial if PED claimed within waiting period"
  },
  {
    sectionId: "PED-002",
    sectionName: "PED Disclosure",
    irdaRegulation: "IRDAI (Protection of Policyholders' Interests) Regulations 2017",
    policyClause: "Non-disclosure of pre-existing conditions at proposal stage may lead to claim rejection and policy voidance.",
    description: "Material non-disclosure gives insurer right to reject claim and cancel policy.",
    applicability: ["new_policies", "porting_cases", "fresh_proposals"],
    legalWeight: "mandatory",
    penalty: "Claim rejection and possible policy cancellation"
  },

  // Exclusions
  {
    sectionId: "EXCL-001",
    sectionName: "Standard Exclusions",
    irdaRegulation: "IRDAI Guidelines on Standardization of Exclusions 2016",
    policyClause: "Treatment expenses for conditions listed under standard exclusions are not payable.",
    description: "Standard exclusions include: cosmetic surgery, dental treatment, HIV/AIDS, self-inflicted injury, etc.",
    applicability: ["cosmetic_procedures", "dental_treatment", "experimental_treatments"],
    legalWeight: "mandatory",
    penalty: "Full denial of claim for excluded conditions"
  },
  {
    sectionId: "EXCL-002",
    sectionName: "Non-Medical Items",
    irdaRegulation: "IRDAI Guidelines on Non-Medical Expenses 2019",
    policyClause: "Items not related to medical treatment such as toiletries, baby food, attendant charges are not payable.",
    description: "Non-medical expenses to be excluded from claim as per standard list.",
    applicability: ["personal_items", "attendant_charges", "food_charges"],
    legalWeight: "mandatory",
    penalty: "Deduction of non-medical items from claim"
  },

  // NPPA Price Control
  {
    sectionId: "NPPA-001",
    sectionName: "NPPA Price Control - Coronary Stents",
    irdaRegulation: "NPPA Order No. S.O. 412(E) dated 13.02.2017",
    policyClause: "Price of Drug Eluting Stent (DES) capped at ₹30,080 and Bare Metal Stent (BMS) at ₹8,261.",
    description: "NPPA ceiling prices for coronary stents. Hospitals cannot charge above ceiling price.",
    applicability: ["angioplasty", "pci_procedures", "cardiac_interventions"],
    legalWeight: "mandatory",
    penalty: "Recovery of overcharged amount; legal action under Essential Commodities Act"
  },
  {
    sectionId: "NPPA-002",
    sectionName: "NPPA Price Control - Knee Implants",
    irdaRegulation: "NPPA Order No. S.O. 2668(E) dated 16.08.2017",
    policyClause: "Price of Knee Implant System capped at ₹82,100 for complete system.",
    description: "NPPA ceiling price for knee replacement implants.",
    applicability: ["total_knee_replacement", "partial_knee_replacement", "revision_surgery"],
    legalWeight: "mandatory",
    penalty: "Recovery of overcharged amount; penalty up to 100% of overcharge"
  },

  // Documentation Requirements
  {
    sectionId: "DOC-001",
    sectionName: "Discharge Summary Requirements",
    irdaRegulation: "IRDAI (Health Insurance) Regulations 2016, Regulation 28",
    policyClause: "Discharge summary must contain: patient details, diagnosis, treatment given, medicines prescribed, follow-up advice, and doctor's signature.",
    description: "Complete discharge summary mandatory for claim processing.",
    applicability: ["all_discharges", "day_care", "inpatient_admissions"],
    legalWeight: "mandatory",
    penalty: "Claim may be held pending complete documentation"
  },
  {
    sectionId: "DOC-002",
    sectionName: "ICD Coding Requirement",
    policyClause: "All diagnoses must be coded using ICD-10 classification for proper claim processing.",
    description: "ICD-10 coding standard ensures uniformity in diagnosis reporting.",
    applicability: ["diagnosis_reporting", "claim_forms", "discharge_summaries"],
    legalWeight: "recommended",
    penalty: "Processing delays; possible claim rejection for improper coding"
  },
  {
    sectionId: "DOC-003",
    sectionName: "Final Bill Requirements",
    policyClause: "Itemized final bill with breakup of all charges, dates of service, and relevant supporting documents is mandatory.",
    description: "Detailed billing required for claim scrutiny and settlement.",
    applicability: ["final_settlement", "claim_processing", "bill_audit"],
    legalWeight: "mandatory",
    penalty: "Claim processing withheld until complete bill submitted"
  },

  // Fraud and Misrepresentation
  {
    sectionId: "FRAUD-001",
    sectionName: "Claim Fraud Detection",
    irdaRegulation: "IRDAI (Protection of Policyholders' Interests) Regulations 2017, Chapter IV",
    policyClause: "Any fraud, misrepresentation, or suppression of material fact shall render the claim void and policy liable for cancellation.",
    description: "Fraud detection clause protecting insurer from false claims.",
    applicability: ["fake_bills", "inflated_claims", "ghost_patients", "upcoding"],
    legalWeight: "mandatory",
    penalty: "Claim rejection; policy cancellation; blacklisting; potential legal action"
  },
  {
    sectionId: "FRAUD-002",
    sectionName: "Ghost Billing",
    policyClause: "Billing for services not rendered or patients not admitted constitutes fraud and is punishable under IPC Section 420.",
    description: "Billing for non-existent treatments or patients.",
    applicability: ["ghost_patients", "phantom_billing", "services_not_rendered"],
    legalWeight: "mandatory",
    penalty: "Claim rejection; FIR under IPC; recovery proceedings"
  },

  // Treatment Protocols
  {
    sectionId: "TREAT-001",
    sectionName: "Medical Necessity",
    policyClause: "Treatment must be medically necessary and appropriate for the diagnosis. Unnecessary investigations or procedures may be excluded.",
    description: "Medical necessity criteria for treatment and investigations.",
    applicability: ["investigations", "procedures", "medications", "hospital_stay"],
    legalWeight: "mandatory",
    penalty: "Non-admissible charges deducted from claim"
  },
  {
    sectionId: "TREAT-002",
    sectionName: "Day Care Procedures",
    irdaRegulation: "IRDAI List of Day Care Procedures 2016",
    policyClause: "Procedures listed as day care do not require 24-hour hospitalization. Extended stay without medical reason may be questioned.",
    description: "Day care procedures should not be converted to unnecessary hospitalization.",
    applicability: ["cataract_surgery", "hernia_repair", "angiography"],
    legalWeight: "recommended",
    penalty: "Questioning of extended stay charges"
  },

  // Timelines
  {
    sectionId: "TIME-001",
    sectionName: "Claim Settlement Timeline",
    irdaRegulation: "IRDAI (Protection of Policyholders' Interests) Regulations 2017, Regulation 12",
    policyClause: "Claims must be settled within 30 days of receipt of all documents. Delay beyond 30 days attracts interest at 2% above bank rate.",
    description: "Mandatory timeline for claim settlement by insurer.",
    applicability: ["claim_processing", "document_verification", "settlement"],
    legalWeight: "mandatory",
    penalty: "Interest penalty for delayed settlement"
  },
  {
    sectionId: "TIME-002",
    sectionName: "Intimation Timeline",
    policyClause: "Hospitalization intimation within specified timeline is mandatory for cashless facility.",
    description: "Timely intimation ensures smooth cashless processing.",
    applicability: ["cashless_claims", "network_hospitals"],
    legalWeight: "mandatory",
    penalty: "Cashless may be denied; reimbursement route to be followed"
  }
];

/**
 * Get clause reference for a specific violation type
 */
export function getClauseForViolation(violationType: string): PolicyClause | undefined {
  const mapping: Record<string, string> = {
    "room_rent_exceeded": "ROOM-001",
    "room_upgrade": "ROOM-002",
    "copay_not_deducted": "COPAY-001",
    "non_network_copay": "COPAY-002",
    "ped_within_waiting": "PED-001",
    "ped_non_disclosure": "PED-002",
    "excluded_item": "EXCL-001",
    "non_medical_item": "EXCL-002",
    "stent_price_violation": "NPPA-001",
    "knee_implant_violation": "NPPA-002",
    "missing_discharge_summary": "DOC-001",
    "missing_icd_code": "DOC-002",
    "incomplete_bill": "DOC-003",
    "fraud_suspected": "FRAUD-001",
    "ghost_billing": "FRAUD-002",
    "medical_necessity": "TREAT-001",
    "unnecessary_hospitalization": "TREAT-002",
    "pre_auth_missing": "PRE-AUTH-001",
    "late_intimation": "TIME-002"
  };
  
  const sectionId = mapping[violationType];
  return POLICY_CLAUSES.find(c => c.sectionId === sectionId);
}

/**
 * Generate legal justification for audit finding
 */
export function generateLegalJustification(
  violationType: string,
  evidence: string,
  financialImpact: number
): string {
  const clause = getClauseForViolation(violationType);
  
  if (!clause) {
    return `The identified discrepancy requires further investigation as per standard audit procedures. Financial impact: ₹${financialImpact.toLocaleString()}.`;
  }
  
  return `As per ${clause.irdaRegulation || 'policy terms'} (${clause.sectionId}), ${clause.policyClause.toLowerCase()} 

The observed deviation: "${evidence}" constitutes a ${clause.legalWeight === 'mandatory' ? 'violation of mandatory requirement' : 'deviation from recommended practice'}.

${clause.penalty ? `Applicable penalty: ${clause.penalty}.` : ''}

Financial impact: ₹${financialImpact.toLocaleString()}.

This finding is documented and may be considered for claim adjustment as per the policy terms and applicable IRDAI regulations.`;
}

/**
 * Get TPA defensibility note
 */
export function getTPADefensibilityNote(violations: string[]): string {
  const criticalViolations = violations.filter(v => 
    ["fraud_suspected", "ghost_billing", "ped_non_disclosure"].includes(v)
  );
  
  if (criticalViolations.length > 0) {
    return `DEFENSIBILITY NOTE: This audit has identified serious compliance violations that warrant detailed investigation. The TPA is advised to:
    
1. Conduct thorough document verification
2. Request additional supporting evidence from the hospital
3. Consider independent medical assessment if required
4. Document all findings for potential legal proceedings
5. Escalate to SIU (Special Investigation Unit) if fraud indicators are strong

The audit findings are supported by IRDAI regulations and policy terms, providing legal defensibility for any claim adjustment or rejection decision.`;
  }
  
  return `DEFENSIBILITY NOTE: The audit findings are based on standard audit protocols and IRDAI regulations. The TPA is protected under:
  
1. IRDAI (Health Insurance) Regulations 2016
2. Policy terms and conditions as accepted by the insured
3. Standard exclusions and waiting period provisions
4. Documentation requirements under claim processing guidelines

All deductions and recommendations are documented with supporting evidence and legal references.`;
}
