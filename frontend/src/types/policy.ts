import { PremiumFrequency } from './product';
import { PremiumInstallment } from './billing';
import { DocumentMetadata } from './document';
import { Claim } from './claim';

export type PolicyStatus = 'DRAFT' | 'ACTIVE' | 'LAPSED' | 'CANCELLED' | 'EXPIRED';

export interface Policy {
  id: string;
  policyNumber: string;
  customerId: string;
  productId: string;
  productName: string;
  category: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;
  startDate: string;
  endDate: string;
  status: PolicyStatus;
  premiumStatus: 'PAID' | 'DUE' | 'OVERDUE';
  nextPremiumDate?: string;
  nomineeIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PolicyTimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface PolicyWorkspace {
  summary: Policy;
  premiumSchedule: PremiumInstallment[];
  documents: DocumentMetadata[];
  claims: Claim[];
  timeline: PolicyTimelineEvent[];
  actions: {
    canRenew: boolean;
    canClaim: boolean;
    canDownload: boolean;
  };
}
