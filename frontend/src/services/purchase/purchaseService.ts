import {
  PurchaseDraftVM,
  PurchaseEligibilityVM,
  PurchasePricingVM,
  PurchaseReviewVM,
  PurchaseConfirmationVM,
  PaymentRequest,
  PaymentResponse
} from '../../types/purchase';

export interface IPurchaseService {
  createDraft(productId: string): Promise<PurchaseDraftVM>;
  getDraft(id: string): Promise<PurchaseDraftVM>;
  updateDraft(id: string, data: Partial<PurchaseDraftVM>): Promise<PurchaseDraftVM>;

  validateEligibility(id: string): Promise<PurchaseEligibilityVM>;
  calculatePremium(id: string): Promise<PurchasePricingVM>;

  getReview(id: string): Promise<PurchaseReviewVM>;

  processPayment(id: string, request: PaymentRequest): Promise<PaymentResponse>;
  submitPurchase(id: string): Promise<PurchaseConfirmationVM>;

  cancelDraft(id: string): Promise<void>;
}
