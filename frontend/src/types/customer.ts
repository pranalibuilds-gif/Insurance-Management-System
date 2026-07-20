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
  createdAt: string;
  updatedAt: string;
}
