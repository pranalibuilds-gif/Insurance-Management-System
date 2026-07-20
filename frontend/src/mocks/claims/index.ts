import { Claim } from '../../types/claim';
import { mockDelay } from '..';

export const mockClaims: Claim[] = [
  {
    id: 'clm_1',
    policyId: 'pol_1',
    claimNumber: 'CLM-2026-0001',
    type: 'Hospitalization',
    incidentDate: '2026-03-10',
    description: 'Emergency appendectomy',
    estimatedLoss: 45000,
    approvedAmount: 42000,
    status: 'PAID',
    adjusterNotes: 'Valid claim, all documents verified.',
    createdAt: '2026-03-11T09:00:00Z',
    updatedAt: '2026-03-20T16:00:00Z',
  }
];

export const getCustomerClaims = async (policyIds: string[]): Promise<Claim[]> => {
  await mockDelay();
  return mockClaims.filter(c => policyIds.includes(c.policyId));
};
