import { PremiumFrequency } from './product';
import { PremiumInstallment } from './billing';
import { DocumentMetadata } from './document';
import { Claim } from './claim';

export type PolicyStatus = 'DRAFT' | 'ACTIVE' | 'LAPSED' | 'CANCELLED' | 'EXPIRED';

export interface Policy {
  id: string;
  policyNumber: string;
  customerId: string;
  customerName: string;
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

export interface PolicyEndorsement {
  id: string;
  type: 'COVERAGE_MODIFICATION' | 'ADDRESS_CHANGE' | 'NOMINEE_CHANGE' | 'RENEWAL';
  description: string;
  effectiveDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface PolicyChangeHistory {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedAt: string;
  changedBy: string;
}

export interface PolicyWorkspace {
  summary: Policy;
  customerSummary: {
    id: string;
    name: string;
    kycStatus: string;
  };
  billingSummary: {
    nextInstallmentDate: string;
    outstandingBalance: number;
    missedPayments: number;
    isRenewalEligible: boolean;
  };
  coverage: {
    limit: number;
    basePremium: number;
    waitingPeriodDays: number;
    endorsements: PolicyEndorsement[];
  };
  premiumSchedule: PremiumInstallment[];
  documents: DocumentMetadata[];
  claims: Claim[];
  timeline: PolicyTimelineEvent[];
  changeHistory: PolicyChangeHistory[];
  notes: any[];
  riskIndicators: {
    type: 'INFO' | 'WARNING' | 'DANGER';
    label: string;
    description: string;
  }[];
  actions: {
    canActivate: boolean;
    canRenew: boolean;
    canModify: boolean;
    canCancel: boolean;
    canDownload: boolean;
  };
}
