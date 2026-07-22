import { Claim, ClaimWorkspace } from '../../types/claim';
import { mockDelay } from '..';
import { mockDocuments } from '../documents';

export const mockClaims: Claim[] = [
  {
    id: 'clm_1',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    claimNumber: 'CLM-2026-0001',
    type: 'Hospitalization',
    incidentDate: '2026-03-10',
    description: 'Emergency appendectomy at City Hospital',
    status: 'PAID',
    createdAt: '2026-03-11T09:00:00Z',
    updatedAt: '2026-03-20T16:00:00Z',
  },
  {
    id: 'clm_2',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    claimNumber: 'CLM-2026-0002',
    type: 'Diagnostic Test',
    incidentDate: '2026-04-05',
    description: 'Follow-up CT scan and blood work',
    status: 'AWAITING_CUSTOMER',
    createdAt: '2026-04-06T10:00:00Z',
    updatedAt: '2026-04-07T14:30:00Z',
  }
];

export const getClaims = async (): Promise<Claim[]> => {
  await mockDelay();
  return mockClaims;
};

export const getClaimWorkspace = async (id: string): Promise<ClaimWorkspace | undefined> => {
  await mockDelay();
  const claim = mockClaims.find(c => c.id === id);
  if (!claim) return undefined;

  return {
    summary: claim,
    financials: {
      requestedAmount: claim.id === 'clm_1' ? 45000 : 5000,
      estimatedLoss: claim.id === 'clm_1' ? 45000 : 4800,
      approvedAmount: claim.id === 'clm_1' ? 42000 : 0,
      settlementAmount: claim.id === 'clm_1' ? 42000 : 0,
      settlementStatus: claim.id === 'clm_1' ? 'PAID' : 'PENDING'
    },
    evidence: mockDocuments.filter(d => d.category === 'CLAIM' || d.id === 'doc_2'),
    timeline: [
      { id: 'ev_1', type: 'SUBMITTED', description: 'Claim submitted by John Doe', timestamp: claim.createdAt, actor: 'John Doe' },
      { id: 'ev_2', type: 'ASSIGNED', description: 'Assigned to Adjuster Sarah', timestamp: '2026-03-12T11:00:00Z', actor: 'System' },
      { id: 'ev_3', type: 'UNDER_REVIEW', description: 'Investigation started', timestamp: '2026-03-13T14:00:00Z', actor: 'Sarah' },
      ...(claim.status === 'PAID' ? [
        { id: 'ev_4', type: 'APPROVED', description: 'Claim approved for $42,000', timestamp: '2026-03-18T10:00:00Z', actor: 'Manager Mike' },
        { id: 'ev_5', type: 'SETTLED', description: 'Payment of $42,000 processed', timestamp: '2026-03-20T16:00:00Z', actor: 'System' }
      ] : []),
      ...(claim.status === 'AWAITING_CUSTOMER' ? [
        { id: 'ev_6', type: 'NEED_INFO', description: 'Please provide the original bill for pharmacy', timestamp: '2026-04-07T14:30:00Z', actor: 'Sarah' }
      ] : [])
    ],
    actions: {
      canUploadEvidence: claim.status === 'AWAITING_CUSTOMER' || claim.status === 'SUBMITTED',
      canEdit: claim.status === 'DRAFT',
      canCancel: claim.status === 'SUBMITTED' || claim.status === 'AWAITING_CUSTOMER'
    }
  };
};

export const getCustomerClaims = async (policyIds: string[]): Promise<Claim[]> => {
  await mockDelay();
  return mockClaims.filter(c => policyIds.includes(c.policyId));
};
