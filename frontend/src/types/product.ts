export type ProductCategory = 'HEALTH' | 'VEHICLE' | 'LIFE' | 'HOME' | 'TRAVEL';
export type PremiumFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';

export interface InsuranceProduct {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  minCoverage: number;
  maxCoverage: number;
  waitingPeriodDays: number;
  requiredDocuments: string[];
  premiumFrequencies: PremiumFrequency[];
  exclusions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
