import { PremiumFrequency } from './product';

export type PolicyStatus = 'DRAFT' | 'ACTIVE' | 'LAPSED' | 'CANCELLED' | 'EXPIRED';

export interface Policy {
  id: string;
  policyNumber: string;
  customerId: string;
  productId: string;
  coverageAmount: number;
  premiumFrequency: PremiumFrequency;
  startDate: string;
  endDate: string;
  status: PolicyStatus;
  nomineeIds: string[];
  createdAt: string;
  updatedAt: string;
}
