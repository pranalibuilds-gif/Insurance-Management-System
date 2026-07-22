import { Policy, PolicyWorkspace } from '../../types/policy';
import { mockDelay } from '..';
import { mockDocuments } from '../documents';
import { mockClaims } from '../claims';

export const mockPolicies: Policy[] = [
  {
    id: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    customerId: 'cust_1',
    productId: 'prod_1',
    productName: 'Health Secure Gold',
    category: 'HEALTH',
    coverageAmount: 500000,
    premiumFrequency: 'YEARLY',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'ACTIVE',
    premiumStatus: 'PAID',
    nextPremiumDate: '2027-01-01',
    nomineeIds: ['nom_1'],
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'pol_2',
    policyNumber: 'IMP-VEH-2026-042',
    customerId: 'cust_1',
    productId: 'prod_2',
    productName: 'Vehicle Protect Premium',
    category: 'VEHICLE',
    coverageAmount: 1500000,
    premiumFrequency: 'MONTHLY',
    startDate: '2026-02-15',
    endDate: '2027-02-14',
    status: 'ACTIVE',
    premiumStatus: 'DUE',
    nextPremiumDate: '2026-04-15',
    nomineeIds: ['nom_1'],
    createdAt: '2026-02-15T14:30:00Z',
    updatedAt: '2026-02-15T14:30:00Z',
  }
];

export const getCustomerPolicies = async (customerId: string): Promise<Policy[]> => {
  await mockDelay();
  return mockPolicies.filter(p => p.customerId === customerId);
};

export const getPolicyWorkspace = async (id: string): Promise<PolicyWorkspace | undefined> => {
  await mockDelay();
  const policy = mockPolicies.find(p => p.id === id);
  if (!policy) return undefined;

  return {
    summary: policy,
    premiumSchedule: [
      { id: 'inst_1', scheduleId: 'sch_1', dueDate: '2026-02-15', amount: 1200, status: 'PAID', paymentDate: '2026-02-14', transactionId: 'TXN-123', receiptNumber: 'REC-001' },
      { id: 'inst_2', scheduleId: 'sch_1', dueDate: '2026-03-15', amount: 1200, status: 'PAID', paymentDate: '2026-03-14', transactionId: 'TXN-124', receiptNumber: 'REC-002' },
      { id: 'inst_3', scheduleId: 'sch_1', dueDate: '2026-04-15', amount: 1200, status: 'PENDING' },
    ],
    documents: mockDocuments.filter(d => d.id === 'doc_1'), // Simplified filter
    claims: mockClaims.filter(c => c.policyId === id),
    timeline: [
      { id: 't_1', type: 'Policy Purchased', description: 'Policy created and first premium paid', timestamp: '2026-01-01T10:00:00Z' },
      { id: 't_2', type: 'Activated', description: 'Policy coverage began', timestamp: '2026-01-01T12:00:00Z' },
    ],
    actions: {
      canRenew: policy.status === 'ACTIVE',
      canClaim: policy.status === 'ACTIVE',
      canDownload: true,
    }
  };
};
