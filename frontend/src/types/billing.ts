export type InstallmentStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'WAIVED';
export type PaymentStatus = 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
export type ReceiptStatus = 'AVAILABLE' | 'VOID' | 'REISSUED';

export interface PremiumInstallment {
  id: string;
  policyId: string;
  policyNumber: string;
  productName: string;
  dueDate: string;
  amount: number;
  status: InstallmentStatus;
  paymentDate?: string;
  transactionId?: string;
  receiptNumber?: string;
}

export interface PaymentTransaction {
  id: string;
  installmentId: string;
  policyId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  timestamp: string;
}

export interface PaymentReceipt {
  id: string;
  transactionId: string;
  receiptNumber: string;
  issuedAt: string;
  amount: number;
  status: ReceiptStatus;
  customerName: string;
  policyNumber: string;
  productName: string;
}

export interface BillingSummary {
  outstandingBalance: number;
  upcomingTotal: number;
  totalPaidCurrentTerm: number;
  overdueCount: number;
}

export interface FinancialTimelineEvent {
  id: string;
  type: 'BILLING_GENERATED' | 'REMINDER_SENT' | 'PAYMENT_RECEIVED' | 'RECEIPT_ISSUED' | 'REFUND_PROCESSED';
  description: string;
  timestamp: string;
}

export interface BillingWorkspace {
  summary: BillingSummary;
  upcomingPayments: PremiumInstallment[];
  paymentHistory: PremiumInstallment[]; // Usually historically shown as paid installments
  receipts: PaymentReceipt[];
  timeline: FinancialTimelineEvent[];
  alerts: {
    type: 'DANGER' | 'WARNING' | 'INFO';
    message: string;
  }[];
}
