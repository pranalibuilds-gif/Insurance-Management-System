import { PurchaseDraft, PricingSnapshot, EligibilitySnapshot, PurchaseReview, PurchaseSubmissionResult } from './wizard';

export interface PurchaseDraftVM extends PurchaseDraft {}
export interface PurchaseEligibilityVM extends EligibilitySnapshot {}
export interface PurchasePricingVM extends PricingSnapshot {}
export interface PurchaseReviewVM extends PurchaseReview {}
export interface PurchaseConfirmationVM extends PurchaseSubmissionResult {}

export interface PaymentRequest {
  method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'WALLET';
  amount: number;
  currency: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  message?: string;
}
