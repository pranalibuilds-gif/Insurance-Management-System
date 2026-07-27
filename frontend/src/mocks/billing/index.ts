import { BillingDashboardVM, PremiumInstallment, PaymentReceipt } from '../../types/billing';
import { mockDelay } from '..';

export const mockInstallments: PremiumInstallment[] = [
  { id: '1', policyId: 'pol_1', policyNumber: 'IMP-HEA-201', productName: 'Health Secure Gold', dueDate: '2026-07-25', amount: 1200, status: 'PENDING' },
  { id: '2', policyId: 'pol_2', policyNumber: 'IMP-VEH-042', productName: 'Vehicle Protect Premium', dueDate: '2026-07-15', amount: 450, status: 'PAID', paymentDate: '2026-07-14', transactionId: 'TXN-101', receiptNumber: 'REC-001' },
];

export const mockReceipts: PaymentReceipt[] = [
  { id: 'r1', receiptNumber: 'REC-001', policyNumber: 'IMP-VEH-042', productName: 'Vehicle Protect Premium', amount: 450, paymentDate: '2026-07-14', paymentMethod: 'CREDIT_CARD', downloadUrl: '#' },
];

export const getBillingDashboard = async (): Promise<BillingDashboardVM> => {
  await mockDelay();
  return {
    summary: {
      totalPaid: 450,
      totalOutstanding: 1200,
      nextPaymentDate: '2026-07-25',
      nextPaymentAmount: 1200,
    },
    recentTransactions: mockInstallments,
  };
};
