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

export interface PurchaseDraft {
  productId: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;

  // Snapshots (Copied from master data)
  selectedNominees: Nominee[];
  selectedDocumentIds: Record<string, string>; // Maps document category/type to doc ID

  pricingSnapshot?: PricingSnapshot;
  eligibilitySnapshot?: EligibilitySnapshot;

  currentStep: number;
  stepStatuses: Record<number, StepStatus>;

  purchaseReference: string;
  lastSaved: string;
  isComplete: boolean;
}
