export type InstallmentStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'WAIVED';

export interface PremiumInstallment {
  id: string;
  scheduleId: string;
  dueDate: string;
  amount: number;
  status: InstallmentStatus;
  paymentDate?: string;
  transactionId?: string;
  receiptNumber?: string;
}

export interface PremiumSchedule {
  id: string;
  policyId: string;
  totalPremium: number;
  installments: PremiumInstallment[];
  createdAt: string;
}

export interface PaymentReceipt {
  id: string;
  installmentId: string;
  receiptNumber: string;
  issuedAt: string;
  amount: number;
  customerName: string;
  policyNumber: string;
}
