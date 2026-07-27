import { BillingDashboardVM, PremiumInstallment, PaymentReceipt } from '../../types/billing';
import { IBillingService } from './billingService';
import { getBillingDashboard, mockInstallments, mockReceipts } from '../../mocks/billing';

export class MockBillingService implements IBillingService {
  async getDashboard(): Promise<BillingDashboardVM> {
    return getBillingDashboard();
  }
  async getUpcomingPayments(): Promise<PremiumInstallment[]> {
    return mockInstallments.filter(i => i.status === 'PENDING');
  }
  async getPaymentHistory(): Promise<PremiumInstallment[]> {
    return mockInstallments;
  }
  async getReceipts(): Promise<PaymentReceipt[]> {
    return mockReceipts;
  }
  async payInstallment(installmentId: string, paymentData: any): Promise<void> {
    console.log('Mock Pay', installmentId);
  }
  async downloadReceipt(receiptId: string): Promise<Blob> {
    return new Blob(['mock receipt content'], { type: 'application/pdf' });
  }
}
