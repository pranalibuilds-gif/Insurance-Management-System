import { PremiumFrequency } from './product';

export interface PremiumInstallment {
  id: string;
  policyId: string;
  policyNumber: string;
  productName: string;
  dueDate: string;
  amount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  paymentDate?: string;
  transactionId?: string;
  receiptNumber?: string;
}

export interface PaymentReceipt {
  id: string;
  receiptNumber: string;
  policyNumber: string;
  productName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  downloadUrl: string;
}

export interface BillingDashboardVM {
  summary: {
    totalPaid: number;
    totalOutstanding: number;
    nextPaymentDate: string;
    nextPaymentAmount: number;
  };
  recentTransactions: PremiumInstallment[];
}
