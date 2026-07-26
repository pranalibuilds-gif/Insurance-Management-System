import { DocumentMetadata } from './document';

export type ClaimStatus =
  | 'SUBMITTED'
  | 'UNDER_INVESTIGATION'
  | 'AWAITING_CUSTOMER'
  | 'AWAITING_MANAGER'
  | 'VERIFIED'
  | 'APPROVED'
  | 'REJECTED'
  | 'SETTLEMENT_READY'
  | 'PAID'
  | 'CLOSED';

export interface ClaimFinancials {
  requestedAmount: number;
  estimatedLoss: number;
  recommendedAmount: number;
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
  customerId: string;
  customerName: string;
  type: string;
  incidentDate: string;
  description: string;
  status: ClaimStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  slaDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimWorkspace {
  summary: Claim;
  policySummary: {
    id: string;
    number: string;
    productName: string;
    coverageLimit: number;
    status: string;
    waitingPeriodMet: boolean;
  };
  financials: ClaimFinancials;
  evidence: DocumentMetadata[];
  investigationNotes: string;
  timeline: ClaimTimelineEvent[];
  riskIndicators: {
    type: 'INFO' | 'WARNING' | 'DANGER';
    label: string;
  }[];
  actions: {
    canApprove: boolean;
    canReject: boolean;
    canRequestInfo: boolean;
    canUploadEvidence: boolean;
    canSettle: boolean;
  };
}
