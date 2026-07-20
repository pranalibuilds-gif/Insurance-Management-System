import { Policy } from '../../types/policy';
import { mockDelay } from '..';

export const mockPolicies: Policy[] = [
  {
    id: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    customerId: 'cust_1',
    productId: 'prod_1',
    coverageAmount: 500000,
    premiumFrequency: 'YEARLY',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'ACTIVE',
    nomineeIds: ['nom_1'],
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-01T10:00:00Z',
  },
  {
    id: 'pol_2',
    policyNumber: 'IMP-VEH-2026-042',
    customerId: 'cust_1',
    productId: 'prod_2',
    coverageAmount: 1500000,
    premiumFrequency: 'MONTHLY',
    startDate: '2026-02-15',
    endDate: '2027-02-14',
    status: 'ACTIVE',
    nomineeIds: ['nom_1'],
    createdAt: '2026-02-15T14:30:00Z',
    updatedAt: '2026-02-15T14:30:00Z',
  }
];

export const getCustomerPolicies = async (customerId: string): Promise<Policy[]> => {
  await mockDelay();
  return mockPolicies.filter(p => p.customerId === customerId);
};
