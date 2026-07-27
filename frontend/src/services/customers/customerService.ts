import {
  Customer,
  Address,
  Nominee,
  CustomerActivity,
  UserSession,
  KYCStatus
} from '../../types/customer';

export interface ICustomerService {
  getProfile(): Promise<Customer>;
  updateProfile(data: Partial<Customer>): Promise<Customer>;

  getAddress(): Promise<Address>;
  updateAddress(data: Address): Promise<Address>;

  getNominees(): Promise<Nominee[]>;
  addNominee(data: Omit<Nominee, 'id'>): Promise<Nominee>;
  updateNominee(id: string, data: Partial<Nominee>): Promise<Nominee>;
  deleteNominee(id: string): Promise<void>;

  getActivity(): Promise<CustomerActivity[]>;
  getSessions(): Promise<UserSession[]>;

  getKYCStatus(): Promise<{ status: KYCStatus; details?: string }>;
  submitKYC(data: any): Promise<void>;
}
