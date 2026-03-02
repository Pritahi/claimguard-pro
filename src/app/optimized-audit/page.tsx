"use client";

/**
 * ClaimGuard Pro - Optimized Audit Interface
 * 99%+ Accuracy Claim Audit System
 */

import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingDown,
  Shield,
  Clock,
  DollarSign,
  FileCheck,
  Activity
} from "lucide-react";

interface AuditResult {
  success: boolean;
  caseId: string;
  timestamp: string;
  auditScore: number;
  recommendation: "APPROVE" | "PARTIAL_APPROVE" | "REJECT" | "NEEDS_REVIEW";
  confidenceLevel: "HIGH" | "MEDIUM" | "LOW";
  criticalIssues: Array<{
    id: string;
    category: string;
    issue: string;
    severity: string;
    evidence: string;
    financialImpact: number;
    recommendedAction: string;
  }>;
  majorIssues: Array<{
    id: string;
    category: string;
    issue: string;
    severity: string;
    evidence: string;
    financialImpact: number;
    recommendedAction: string;
  }>;
  minorIssues: Array<{
    id: string;
    category: string;
    issue: string;
    severity: string;
    evidence: string;
    financialImpact: number;
  }>;
  financialSummary: {
    totalBilled: number;
    finalApprovedAmount: number;
    totalDeductions: number;
    nppaRecovery: number;
    nonPayableItems: number;
  };
  fraudAnalysis: {
    overallRiskScore: number;
    riskLevel: string;
    requiresSIUReferral: boolean;
  };
  processingTimeMs: number;
}

export default function OptimizedAuditPage() {
  const [dischargeFile, setDischargeFile] = useState<File | null>(null);
  const [billFile, setBillFile] = useState<File | null>(null);
  const [policyStartDate, setPolicyStartDate] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const [cityType, setCityType] = useState("metro");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((type: "discharge" | "bill", file: File | null) => {
    if (type === "discharge") {
      setDischargeFile(file);
    } else {
      setBillFile(file);
    }
  }, []);

  const handleSubmit = async () => {
    if (!dischargeFile || !billFile) {
      setError("Please upload both discharge summary and itemized bill");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("discharge_summary", dischargeFile);
      formData.append("itemized_bill", billFile);
      if (policyStartDate) formData.append("policy_start_date", policyStartDate);
      if (sumInsured) formData.append("sum_insured", sumInsured);
      formData.append("city_type", cityType);

      const response = await fetch("/api/audit-optimized", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Audit failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "APPROVE": return "bg-green-500";
      case "PARTIAL_APPROVE": return "bg-yellow-500";
      case "REJECT": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "APPROVE": return <CheckCircle className="w-6 h-6" />;
      case "PARTIAL_APPROVE": return <AlertCircle className="w-6 h-6" />;
      case "REJECT": return <XCircle className="w-6 h-6" />;
      default: return <AlertTriangle className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">ClaimGuard Pro</h1>
          </div>
          <p className="text-lg text-slate-600">AI-Powered TPA Claim Audit System</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              99%+ Accuracy
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              IRDAI Compliant
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Fraud Detection
            </Badge>
          </div>
        </div>

        {/* Input Form */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Upload Claim Documents
            </CardTitle>
            <CardDescription>
              Upload discharge summary and itemized bill for comprehensive audit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Discharge Summary Upload */}
              <div className="space-y-2">
                <Label htmlFor="discharge">Discharge Summary *</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    id="discharge"
                    type="file"
                    accept=".pdf,.txt"
                    className="hidden"
                    onChange={(e) => handleFileChange("discharge", e.target.files?.[0] || null)}
                  />
                  <label htmlFor="discharge" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600">
                      {dischargeFile ? dischargeFile.name : "Click to upload discharge summary"}
                    </p>
                  </label>
                </div>
              </div>

              {/* Itemized Bill Upload */}
              <div className="space-y-2">
                <Label htmlFor="bill">Itemized Bill *</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    id="bill"
                    type="file"
                    accept=".pdf,.txt"
                    className="hidden"
                    onChange={(e) => handleFileChange("bill", e.target.files?.[0] || null)}
                  />
                  <label htmlFor="bill" className="cursor-pointer">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm text-slate-600">
                      {billFile ? billFile.name : "Click to upload itemized bill"}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyDate">Policy Start Date</Label>
                <Input
                  id="policyDate"
                  type="date"
                  value={policyStartDate}
                  onChange={(e) => setPolicyStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sumInsured">Sum Insured (₹)</Label>
                <Input
                  id="sumInsured"
                  type="number"
                  placeholder="500000"
                  value={sumInsured}
                  onChange={(e) => setSumInsured(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cityType">City Type</Label>
                <Select value={cityType} onValueChange={setCityType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metro</SelectItem>
                    <SelectItem value="tier1">Tier 1</SelectItem>
                    <SelectItem value="tier2">Tier 2/3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading || !dischargeFile || !billFile}
              className="w-full h-12 text-lg"
            >
              {loading ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing Claim...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Start Audit
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Audit Results</CardTitle>
                    <CardDescription>
                      Case ID: {result.caseId} | Processed in {result.processingTimeMs}ms
                    </CardDescription>
                  </div>
                  <div className={`p-3 rounded-full text-white ${getRecommendationColor(result.recommendation)}`}>
                    {getRecommendationIcon(result.recommendation)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">Audit Score</p>
                    <p className="text-3xl font-bold text-slate-900">{result.auditScore}/100</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">Recommendation</p>
                    <p className="text-xl font-bold text-slate-900">{result.recommendation.replace("_", " ")}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">Confidence</p>
                    <p className="text-xl font-bold text-slate-900">{result.confidenceLevel}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-600 mb-1">Fraud Risk</p>
                    <p className={`text-xl font-bold ${result.fraudAnalysis.overallRiskScore > 50 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.fraudAnalysis.riskLevel}
                    </p>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Summary
                  </h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Total Billed</p>
                      <p className="text-lg font-semibold">₹{result.financialSummary.totalBilled.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total Deductions</p>
                      <p className="text-lg font-semibold text-red-600">
                        -₹{result.financialSummary.totalDeductions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Final Approved</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{result.financialSummary.finalApprovedAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Savings</p>
                      <p className="text-lg font-semibold text-blue-600">
                        {((result.financialSummary.totalDeductions / result.financialSummary.totalBilled) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Issues Section */}
                {result.criticalIssues.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Critical Issues ({result.criticalIssues.length})
                    </h4>
                    <div className="space-y-3">
                      {result.criticalIssues.map((issue) => (
                        <Alert key={issue.id} variant="destructive">
                          <AlertTitle className="flex items-center justify-between">
                            <span>{issue.issue}</span>
                            {issue.financialImpact > 0 && (
                              <span className="text-sm">Impact: ₹{issue.financialImpact.toLocaleString()}</span>
                            )}
                          </AlertTitle>
                          <AlertDescription>{issue.evidence}</AlertDescription>
                          <p className="text-sm mt-2 font-medium">Action: {issue.recommendedAction}</p>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}

                {result.majorIssues.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Major Issues ({result.majorIssues.length})
                    </h4>
                    <div className="space-y-3">
                      {result.majorIssues.map((issue) => (
                        <Alert key={issue.id} className="border-orange-300 bg-orange-50">
                          <AlertTitle className="flex items-center justify-between text-orange-900">
                            <span>{issue.issue}</span>
                            {issue.financialImpact > 0 && (
                              <span className="text-sm">Impact: ₹{issue.financialImpact.toLocaleString()}</span>
                            )}
                          </AlertTitle>
                          <AlertDescription className="text-orange-800">{issue.evidence}</AlertDescription>
                          <p className="text-sm mt-2 font-medium text-orange-900">Action: {issue.recommendedAction}</p>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}

                {result.minorIssues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Minor Issues ({result.minorIssues.length})
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {result.minorIssues.map((issue) => (
                        <div key={issue.id} className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                          <p className="font-medium text-yellow-900">{issue.issue}</p>
                          <p className="text-sm text-yellow-800">{issue.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.fraudAnalysis.requiresSIUReferral && (
                  <Alert className="mt-6 border-red-500 bg-red-50">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <AlertTitle className="text-red-900">SIU Referral Required</AlertTitle>
                    <AlertDescription className="text-red-800">
                      This claim has been flagged for Special Investigation Unit review due to high fraud risk indicators.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>ClaimGuard Pro v3.0 | IRDAI Compliant | Powered by Advanced AI</p>
          <p className="mt-1">For Hospital SaaS - Monthly Subscription Model</p>
        </div>
      </div>
    </div>
  );
}
