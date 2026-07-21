import { PremiumFrequency } from './product';
import { Nominee } from './customer';

export type StepStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export interface PricingSnapshot {
  baseAmount: number;
  taxes: number;
  totalAmount: number;
  frequency: PremiumFrequency;
}

export interface EligibilitySnapshot {
  isAgeEligible: boolean;
  isKYCVerified: boolean;
  hasRequiredDocuments: boolean;
  hasNomineesAllocated: boolean;
  isCoverageValid: boolean;
  overallStatus: boolean;
}

export interface PurchaseNominee {
  id: string;
  fullName: string;
  relationship: string;
  dob: string;
  sharePercentage: number;
  isMinor: boolean;
  guardianName?: string;
}

export interface PurchaseDocumentReference {
  documentId: string;
  documentType: string;
  version: number;
  verificationStatus: string;
  fileName: string;
}

export interface PurchaseDraft {
  productId: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;

  // Snapshots (Copied from master data)
  selectedNominees: PurchaseNominee[];
  attachedDocuments: PurchaseDocumentReference[];

  pricingSnapshot?: PricingSnapshot;
  eligibilitySnapshot?: EligibilitySnapshot;

  currentStep: number;
  stepStatuses: Record<number, StepStatus>;

  purchaseReference: string;
  lastSaved: string;
  isComplete: boolean;
}
