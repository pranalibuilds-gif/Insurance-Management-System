export type ProductCategory = 'HEALTH' | 'VEHICLE' | 'LIFE' | 'HOME' | 'TRAVEL';
export type PremiumFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';

export interface ProductEligibility {
  minAge: number;
  maxAge: number;
  requiresKYC: boolean;
  residencyType: string;
  specialConditions?: string[];
}

export interface ProductFeature {
  title: string;
  description: string;
  isIncluded: boolean;
}

export interface InsuranceProduct {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  status: 'AVAILABLE' | 'NEW' | 'RECOMMENDED' | 'INACTIVE';
  minCoverage: number;
  maxCoverage: number;
  basePremium: number; // Starting premium for mock display
  waitingPeriodDays: number;
  requiredDocuments: string[];
  premiumFrequencies: PremiumFrequency[];
  exclusions: string[];
  eligibility: ProductEligibility;
  features: ProductFeature[];
  isRecommended: boolean;
  createdAt: string;
  updatedAt: string;
}
