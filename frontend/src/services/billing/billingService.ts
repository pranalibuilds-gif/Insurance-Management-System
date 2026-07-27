import { BillingDashboardVM, PremiumInstallment, PaymentReceipt } from '../../types/billing';

export interface IBillingService {
  getDashboard(): Promise<BillingDashboardVM>;
  getUpcomingPayments(): Promise<PremiumInstallment[]>;
  getPaymentHistory(): Promise<PremiumInstallment[]>;
  getReceipts(): Promise<PaymentReceipt[]>;
  payInstallment(installmentId: string, paymentData: any): Promise<void>;
  downloadReceipt(receiptId: string): Promise<Blob>;
}
