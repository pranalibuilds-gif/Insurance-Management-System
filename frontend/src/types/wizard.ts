import { PremiumFrequency } from './product';
import { Nominee } from './customer';

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

export type PaymentStatus = 'NOT_STARTED' | 'INITIATED' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export interface PurchaseReview {
  purchaseReference: string;
  product: {
    name: string;
    category: string;
  };
  customer: {
    fullName: string;
    email: string;
  };
  coverage: {
    amount: number;
    frequency: PremiumFrequency;
  };
  nominees: PurchaseNominee[];
  documents: PurchaseDocumentReference[];
  pricing: PricingSnapshot;
  eligibility: EligibilitySnapshot;
  declarations: {
    id: string;
    text: string;
    isAccepted: boolean;
  }[];
}

export interface PurchaseSubmissionResult {
  purchaseReference: string;
  paymentStatus: 'SUCCESS';
  policyStatus: 'PENDING_ISSUANCE';
  submittedAt: string;
}

export interface PurchaseDraft {
  productId: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;

  // Snapshots (Copied from master data)
  selectedNominees: PurchaseNominee[];
  attachedDocuments: PurchaseDocumentReference[];

  // Declarations
  declarationsAccepted: boolean;

  pricingSnapshot?: PricingSnapshot;
  eligibilitySnapshot?: EligibilitySnapshot;

  currentStep: number;
  stepStatuses: Record<number, StepStatus>;
  paymentStatus: PaymentStatus;

  purchaseReference: string;
  lastSaved: string;
  isComplete: boolean;
  isSubmitted: boolean;
}
