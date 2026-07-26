import { Claim, ClaimWorkspace } from '../../types/claim';
import { mockDelay } from '..';
import { mockDocuments } from '../documents';

const now = new Date();
const deadline = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();

export const mockClaims: Claim[] = [
  {
    id: 'clm_1',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    customerId: 'cust_1',
    customerName: 'John Doe',
    claimNumber: 'CLM-2026-0001',
    type: 'Hospitalization',
    incidentDate: '2026-03-10',
    description: 'Emergency appendectomy at City Hospital',
    status: 'PAID',
    priority: 'MEDIUM',
    slaDeadline: deadline,
    createdAt: '2026-03-11T09:00:00Z',
    updatedAt: '2026-03-20T16:00:00Z',
  },
  {
    id: 'clm_2',
    policyId: 'pol_1',
    policyNumber: 'IMP-HEA-2026-001',
    customerId: 'cust_1',
    customerName: 'John Doe',
    claimNumber: 'CLM-2026-0002',
    type: 'Diagnostic Test',
    incidentDate: '2026-04-05',
    description: 'Follow-up CT scan and blood work',
    status: 'AWAITING_CUSTOMER',
    priority: 'HIGH',
    slaDeadline: deadline,
    createdAt: '2026-04-06T10:00:00Z',
    updatedAt: '2026-04-07T14:30:00Z',
  },
  {
    id: 'clm_3',
    policyId: 'pol_2',
    policyNumber: 'IMP-VEH-2026-042',
    customerId: 'cust_2',
    customerName: 'Alice Smith',
    claimNumber: 'CLM-2026-0003',
    type: 'Accident',
    incidentDate: '2026-07-20',
    description: 'Minor fender bender at intersection',
    status: 'UNDER_INVESTIGATION',
    priority: 'URGENT',
    slaDeadline: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // SLA Overdue
    createdAt: '2026-07-21T09:00:00Z',
    updatedAt: '2026-07-21T10:00:00Z',
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
    policySummary: {
      id: claim.policyId,
      number: claim.policyNumber,
      productName: 'Health Secure Gold',
      coverageLimit: 500000,
      status: 'ACTIVE',
      waitingPeriodMet: true,
    },
    financials: {
      requestedAmount: 45000,
      estimatedLoss: 45000,
      recommendedAmount: 42000,
      approvedAmount: claim.status === 'PAID' ? 42000 : 0,
      settlementAmount: claim.status === 'PAID' ? 42000 : 0,
      settlementStatus: claim.status === 'PAID' ? 'PAID' : 'PENDING'
    },
    evidence: mockDocuments.filter(d => d.id === 'doc_2'),
    investigationNotes: 'Witness statements collected. Hospital records match incident date.',
    timeline: [
      { id: 'ev_1', type: 'SUBMITTED', description: 'Claim submitted by customer', timestamp: claim.createdAt, actor: claim.customerName },
      { id: 'ev_2', type: 'ASSIGNED', description: 'Assigned to Sarah Adjuster', timestamp: '2026-07-21T10:00:00Z', actor: 'System' },
    ],
    riskIndicators: [
      { type: 'INFO', label: 'First Claim', description: 'This is the first claim submitted by this customer.' }
    ],
    actions: {
      canApprove: claim.status === 'AWAITING_MANAGER',
      canReject: !['PAID', 'REJECTED', 'CLOSED'].includes(claim.status),
      canRequestInfo: ['SUBMITTED', 'UNDER_INVESTIGATION'].includes(claim.status),
      canUploadEvidence: ['SUBMITTED', 'AWAITING_CUSTOMER'].includes(claim.status),
      canSettle: claim.status === 'APPROVED',
    }
  };
};

export const getCustomerClaims = async (policyIds: string[]): Promise<Claim[]> => {
  await mockDelay();
  return mockClaims.filter(c => policyIds.includes(c.policyId));
};
