export type UrgencyLevel = 'emergency' | 'prompt' | 'routine' | 'self-care';

export interface Symptom {
  id: string;
  name: string;
  category: 'Respiratory' | 'Cardiovascular' | 'Neurological' | 'Gastrointestinal' | 'Musculoskeletal' | 'General' | 'Dermatological' | 'ENT';
  isRedFlag: boolean;
  commonWith?: string[];
  description: string;
}

export interface AnalysisInput {
  primarySymptoms: string[];
  duration: 'hours' | '1-3 days' | '4-7 days' | '1-2 weeks' | 'longer';
  severity: 'mild' | 'moderate' | 'severe';
  ageGroup: 'child' | 'young-adult' | 'adult' | 'senior';
  conditions: string[];
  notes?: string;
}

export interface PossibleExplanation {
  title: string;
  context: string;
  commonSigns: string[];
  generalAdvice: string;
}

export interface DepartmentRecommendation {
  name: string;
  description: string;
  commonSpecialists: string;
  whenToConsult: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  isEmergency: boolean;
  emergencyReason?: string;
  urgencyLevel: UrgencyLevel;
  symptomSummary: {
    symptoms: string[];
    duration: string;
    severity: string;
    ageGroup: string;
    conditions: string[];
  };
  possibleExplanations: PossibleExplanation[];
  recommendedNextStep: {
    headline: string;
    timeframe: string;
    guidance: string;
  };
  suggestedDepartment: DepartmentRecommendation;
  warningSignsToWatch: string[];
  doctorDiscussionGuide: string[];
  disclaimer: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  category: 'Multispecialty' | 'Government' | 'Emergency Care' | 'Super-Specialty';
  address: string;
  city: string;
  pin: string;
  phone: string;
  emergencyPhone: string;
  distanceKm?: number;
  rating: number;
  reviewCount: number;
  hasEmergency24x7: boolean;
  hasICU: boolean;
  hasAmbulance: boolean;
  departments: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}
