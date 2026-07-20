export type ClaimStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'NEED_INFO'
  | 'VERIFIED'
  | 'APPROVED'
  | 'REJECTED'
  | 'SETTLEMENT_INITIATED'
  | 'PAID'
  | 'CLOSED';

export interface Claim {
  id: string;
  policyId: string;
  claimNumber: string;
  type: string;
  incidentDate: string;
  description: string;
  estimatedLoss: number;
  approvedAmount: number;
  status: ClaimStatus;
  adjusterNotes?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}
