export type KYCStatus = 'NOT_SUBMITTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
export type CustomerStatus = 'REGISTERED' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Address {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Nominee {
  id: string;
  fullName: string;
  dob: string;
  relationship: string;
  sharePercentage: number;
  contactNumber?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CustomerActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface Customer {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  kycStatus: KYCStatus;
  status: CustomerStatus;
  address: Address;
  nominees: Nominee[];
  activities: CustomerActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface InternalNote {
  id: string;
  author: string;
  category: 'GENERAL' | 'KYC' | 'CLAIMS' | 'BILLING';
  text: string;
  timestamp: string;
}

export interface RiskIndicator {
  type: 'INFO' | 'WARNING' | 'DANGER';
  label: string;
  description: string;
}

export interface CustomerWorkspace {
  summary: {
    id: string;
    fullName: string;
    kycStatus: KYCStatus;
    accountStatus: CustomerStatus;
    assignedAgent?: string;
    customerSince: string;
    riskFlag: 'NORMAL' | 'REVIEW' | 'HIGH_RISK';
    activePolicyCount: number;
    openClaimCount: number;
    outstandingBalance: number;
  };
  kycDetails: {
    checklist: { id: string; label: string; completed: boolean }[];
    history: any[];
  };
  notes: InternalNote[];
  riskIndicators: RiskIndicator[];
  actions: string[];
}
