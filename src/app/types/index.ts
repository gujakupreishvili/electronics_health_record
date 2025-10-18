export interface AnalysisRequest {
  symptoms: string;
  age: string | number;
  medicalHistory: string[];
  medications: string[];
}
export interface DifferentialDiagnosis {
  condition: string;
  likelihood: string;
  reasoning: string;
}
export interface AnalysisResponse {
  differentialDiagnosis: DifferentialDiagnosis[];
  suggestedTests: string[];
  redFlags: string[];
  clarifyingQuestions: string[];
  urgencyLevel: "low" | "moderate" | "urgent";
}
export interface Analysis {
  differentialDiagnosis: Array<{
    condition: string;
    likelihood: string;
    reasoning: string;
  }>;
  suggestedTests: string[];
  redFlags: string[];
  clarifyingQuestions: string[];
  urgencyLevel: "low" | "moderate" | "urgent";
}
