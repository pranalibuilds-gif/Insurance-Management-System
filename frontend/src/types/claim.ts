import { DocumentMetadata } from './document';

export type ClaimStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'AWAITING_CUSTOMER'
  | 'VERIFIED'
  | 'APPROVED'
  | 'REJECTED'
  | 'SETTLEMENT_INITIATED'
  | 'PAID'
  | 'CLOSED';

export interface ClaimFinancials {
  requestedAmount: number;
  estimatedLoss: number;
  approvedAmount: number;
  settlementAmount: number;
  settlementStatus: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';
}

export interface ClaimTimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  actor: string;
}

export interface Claim {
  id: string;
  policyId: string;
  policyNumber: string;
  claimNumber: string;
  type: string;
  incidentDate: string;
  description: string;
  status: ClaimStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimWorkspace {
  summary: Claim;
  financials: ClaimFinancials;
  evidence: DocumentMetadata[];
  timeline: ClaimTimelineEvent[];
  actions: {
    canUploadEvidence: boolean;
    canEdit: boolean;
    canCancel: boolean;
  };
}
