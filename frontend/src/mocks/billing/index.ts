import { BillingWorkspace, PremiumInstallment, PaymentReceipt, FinancialTimelineEvent } from '../../types/billing';
import { mockDelay } from '..';

export const mockUpcomingPayments: PremiumInstallment[] = [
  {
    id: 'inst_101',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    productName: 'Health Secure Gold',
    dueDate: '2026-04-15',
    amount: 1200,
    status: 'PENDING'
  },
  {
    id: 'inst_102',
    policyId: 'pol_2',
    policyNumber: 'IMP-VEH-2026-042',
    productName: 'Vehicle Protect Premium',
    dueDate: '2026-04-01',
    amount: 850,
    status: 'OVERDUE'
  }
];

export const mockPaymentHistory: PremiumInstallment[] = [
  {
    id: 'inst_99',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    productName: 'Health Secure Gold',
    dueDate: '2026-03-15',
    amount: 1200,
    status: 'PAID',
    paymentDate: '2026-03-14',
    transactionId: 'TXN-998877',
    receiptNumber: 'REC-2026-001'
  },
  {
    id: 'inst_98',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    productName: 'Health Secure Gold',
    dueDate: '2026-02-15',
    amount: 1200,
    status: 'PAID',
    paymentDate: '2026-02-15',
    transactionId: 'TXN-998876',
    receiptNumber: 'REC-2026-002'
  }
];

export const mockReceipts: PaymentReceipt[] = [
  {
    id: 'rect_1',
    transactionId: 'TXN-998877',
    receiptNumber: 'REC-2026-001',
    issuedAt: '2026-03-14T15:30:00Z',
    amount: 1200,
    status: 'AVAILABLE',
    customerName: 'John Doe',
    policyNumber: 'IMP-HEA-2026-001',
    productName: 'Health Secure Gold'
  }
];

export const mockFinancialTimeline: FinancialTimelineEvent[] = [
  { id: 'fin_1', type: 'RECEIPT_ISSUED', description: 'Receipt REC-2026-001 generated', timestamp: '2026-03-14T15:35:00Z' },
  { id: 'fin_2', type: 'PAYMENT_RECEIVED', description: 'Payment of $1,200 received for Health Secure Gold', timestamp: '2026-03-14T15:30:00Z' },
  { id: 'fin_3', type: 'REMINDER_SENT', description: 'Premium due reminder sent via Email', timestamp: '2026-03-10T09:00:00Z' },
];

export const getBillingWorkspace = async (): Promise<BillingWorkspace> => {
  await mockDelay();
  return {
    summary: {
      outstandingBalance: 2050,
      upcomingTotal: 1200,
      totalPaidCurrentTerm: 2400,
      overdueCount: 1
    },
    upcomingPayments: mockUpcomingPayments,
    paymentHistory: mockPaymentHistory,
    receipts: mockReceipts,
    timeline: mockFinancialTimeline,
    alerts: [
      { type: 'DANGER', message: 'You have 1 overdue payment for Vehicle Protect Premium.' },
      { type: 'INFO', message: 'Next payment for Health Secure Gold is due in 24 days.' }
    ]
  };
};
