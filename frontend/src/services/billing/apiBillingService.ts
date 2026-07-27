import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { BillingDashboardVM, PremiumInstallment, PaymentReceipt } from '../../types/billing';
import { IBillingService } from './billingService';

export class ApiBillingService implements IBillingService {
  async getDashboard(): Promise<BillingDashboardVM> {
    const response = await apiClient.get<BillingDashboardVM>(ENDPOINTS.BILLING.SUMMARY);
    return response.data;
  }
  async getUpcomingPayments(): Promise<PremiumInstallment[]> {
    const response = await apiClient.get<PremiumInstallment[]>(ENDPOINTS.BILLING.HISTORY + '?status=PENDING');
    return response.data;
  }
  async getPaymentHistory(): Promise<PremiumInstallment[]> {
    const response = await apiClient.get<PremiumInstallment[]>(ENDPOINTS.BILLING.HISTORY);
    return response.data;
  }
  async getReceipts(): Promise<PaymentReceipt[]> {
    const response = await apiClient.get<PaymentReceipt[]>('/billing/receipts');
    return response.data;
  }
  async payInstallment(installmentId: string, paymentData: any): Promise<void> {
    await apiClient.post(ENDPOINTS.BILLING.PAY, { installmentId, ...paymentData });
  }
  async downloadReceipt(receiptId: string): Promise<Blob> {
    const response = await apiClient.get(`/billing/receipts/${receiptId}/download`, { responseType: 'blob' });
    return response.data;
  }
}
