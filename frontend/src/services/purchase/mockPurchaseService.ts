import {
  PurchaseDraftVM,
  PurchaseEligibilityVM,
  PurchasePricingVM,
  PurchaseReviewVM,
  PurchaseConfirmationVM,
  PaymentRequest,
  PaymentResponse
} from '../../types/purchase';
import { IPurchaseService } from './purchaseService';
import { mockDelay } from '../../mocks';

export class MockPurchaseService implements IPurchaseService {
  private drafts: Map<string, PurchaseDraftVM> = new Map();

  async createDraft(productId: string): Promise<PurchaseDraftVM> {
    await mockDelay();
    const id = `draft_${Math.random().toString(36).substr(2, 9)}`;
    const draft: PurchaseDraftVM = {
      productId,
      coverageAmount: 1000000,
      premiumFrequency: 'YEARLY',
      selectedNominees: [],
      attachedDocuments: [],
      declarationsAccepted: false,
      currentStep: 0,
      stepStatuses: { 0: 'COMPLETED' },
      paymentStatus: 'NOT_STARTED',
      workflowStatus: 'DRAFT',
      purchaseReference: id,
      lastSaved: new Date().toISOString(),
      isComplete: false,
      isSubmitted: false,
    };
    this.drafts.set(id, draft);
    return draft;
  }

  async getDraft(id: string): Promise<PurchaseDraftVM> {
    await mockDelay();
    const draft = this.drafts.get(id);
    if (!draft) throw new Error('Draft not found');
    return draft;
  }

  async updateDraft(id: string, data: Partial<PurchaseDraftVM>): Promise<PurchaseDraftVM> {
    await mockDelay();
    const draft = this.drafts.get(id);
    if (!draft) throw new Error('Draft not found');
    const updated = { ...draft, ...data, lastSaved: new Date().toISOString() };
    this.drafts.set(id, updated);
    return updated;
  }

  async validateEligibility(id: string): Promise<PurchaseEligibilityVM> {
    await mockDelay();
    return {
      isAgeEligible: true,
      isKYCVerified: true,
      hasRequiredDocuments: true,
      hasNomineesAllocated: true,
      isCoverageValid: true,
      overallStatus: true,
    };
  }

  async calculatePremium(id: string): Promise<PurchasePricingVM> {
    await mockDelay();
    return {
      baseAmount: 1200,
      taxes: 180,
      totalAmount: 1380,
      frequency: 'YEARLY',
    };
  }

  async getReview(id: string): Promise<PurchaseReviewVM> {
    await mockDelay();
    const draft = await this.getDraft(id);
    return {
      purchaseReference: id,
      product: { name: 'Mock Product', category: 'HEALTH' },
      customer: { fullName: 'Mock Customer', email: 'mock@example.com' },
      coverage: { amount: draft.coverageAmount, frequency: draft.premiumFrequency },
      nominees: draft.selectedNominees,
      documents: draft.attachedDocuments,
      pricing: { baseAmount: 1200, taxes: 180, totalAmount: 1380, frequency: 'YEARLY' },
      eligibility: { isAgeEligible: true, isKYCVerified: true, hasRequiredDocuments: true, hasNomineesAllocated: true, isCoverageValid: true, overallStatus: true },
      declarations: [{ id: '1', text: 'I declare...', isAccepted: true }],
    };
  }

  async processPayment(id: string, request: PaymentRequest): Promise<PaymentResponse> {
    await mockDelay(2000);
    return {
      transactionId: `TXN_${Math.random().toString(36).substr(2, 9)}`,
      status: 'SUCCESS',
    };
  }

  async submitPurchase(id: string): Promise<PurchaseConfirmationVM> {
    await mockDelay();
    return {
      purchaseReference: id,
      paymentStatus: 'SUCCESS',
      policyStatus: 'PENDING_ISSUANCE',
      submittedAt: new Date().toISOString(),
    };
  }

  async cancelDraft(id: string): Promise<void> {
    await mockDelay();
    this.drafts.delete(id);
  }
}
