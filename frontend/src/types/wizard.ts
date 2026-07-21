import { PremiumFrequency } from './product';
import { Nominee } from './customer';

export interface PurchaseDraft {
  productId: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;
  selectedNomineeIds: string[];
  uploadedDocumentIds: string[];
  currentStep: number;
  lastSaved: string;
  isComplete: boolean;
}

export interface PremiumEstimate {
  baseAmount: number;
  taxes: number;
  totalAmount: number;
  frequency: PremiumFrequency;
}
