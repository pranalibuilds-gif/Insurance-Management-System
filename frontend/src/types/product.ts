export type ProductCategory = 'HEALTH' | 'VEHICLE' | 'LIFE' | 'HOME' | 'TRAVEL';
export type PremiumFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';

export type ProductStatus = 'DRAFT' | 'UNDER_REVIEW' | 'ACTIVE' | 'DEPRECATED' | 'ARCHIVED';

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

export interface ProductVersion {
  id: string;
  version: number;
  status: ProductStatus;
  createdAt: string;
  publishedAt?: string;
  publishedBy?: string;
}

export interface InsuranceProduct {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  status: ProductStatus;
  version: number;
  minCoverage: number;
  maxCoverage: number;
  basePremium: number;
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

export interface ProductWorkspace {
  summary: InsuranceProduct;
  versionHistory: ProductVersion[];
  validation: {
    isGeneralComplete: boolean;
    isCoverageComplete: boolean;
    isPremiumComplete: boolean;
    isEligibilityComplete: boolean;
    isDocsComplete: boolean;
    isExclusionsComplete: boolean;
    isValidForPublish: boolean;
  };
  actions: {
    canEdit: boolean;
    canSubmitForReview: boolean;
    canApprove: boolean;
    canDeprecate: boolean;
    canClone: boolean;
    canArchive: boolean;
  };
}
