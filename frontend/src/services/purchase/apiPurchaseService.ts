import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
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

export class ApiPurchaseService implements IPurchaseService {
  async createDraft(productId: string): Promise<PurchaseDraftVM> {
    const response = await apiClient.post<PurchaseDraftVM>(ENDPOINTS.PURCHASE.DRAFTS, { productId });
    return response.data;
  }

  async getDraft(id: string): Promise<PurchaseDraftVM> {
    const response = await apiClient.get<PurchaseDraftVM>(ENDPOINTS.PURCHASE.DRAFT_DETAIL(id));
    return response.data;
  }

  async updateDraft(id: string, data: Partial<PurchaseDraftVM>): Promise<PurchaseDraftVM> {
    const response = await apiClient.put<PurchaseDraftVM>(ENDPOINTS.PURCHASE.DRAFT_DETAIL(id), data);
    return response.data;
  }

  async validateEligibility(id: string): Promise<PurchaseEligibilityVM> {
    const response = await apiClient.post<PurchaseEligibilityVM>(ENDPOINTS.PURCHASE.VALIDATE(id));
    return response.data;
  }

  async calculatePremium(id: string): Promise<PurchasePricingVM> {
    const response = await apiClient.post<PurchasePricingVM>(`${ENDPOINTS.PURCHASE.DRAFT_DETAIL(id)}/calculate-premium`);
    return response.data;
  }

  async getReview(id: string): Promise<PurchaseReviewVM> {
    const response = await apiClient.get<PurchaseReviewVM>(`${ENDPOINTS.PURCHASE.DRAFT_DETAIL(id)}/review`);
    return response.data;
  }

  async processPayment(id: string, request: PaymentRequest): Promise<PaymentResponse> {
    const response = await apiClient.post<PaymentResponse>(ENDPOINTS.PURCHASE.PAYMENT(id), request);
    return response.data;
  }

  async submitPurchase(id: string): Promise<PurchaseConfirmationVM> {
    const response = await apiClient.post<PurchaseConfirmationVM>(ENDPOINTS.PURCHASE.SUBMIT(id));
    return response.data;
  }

  async cancelDraft(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.PURCHASE.DRAFT_DETAIL(id));
  }
}
