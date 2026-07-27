import {
  Customer,
  Address,
  Nominee,
  CustomerActivity,
  UserSession,
  KYCStatus
} from '../../types/customer';
import { ICustomerService } from './customerService';
import { mockCustomerProfile, mockSessions, getCustomerProfile, getSessions } from '../../mocks/customers/profile';

export class MockCustomerService implements ICustomerService {
  async getProfile(): Promise<Customer> {
    return getCustomerProfile();
  }

  async updateProfile(data: Partial<Customer>): Promise<Customer> {
    return { ...mockCustomerProfile, ...data };
  }

  async getAddress(): Promise<Address> {
    return mockCustomerProfile.address;
  }

  async updateAddress(data: Address): Promise<Address> {
    return data;
  }

  async getNominees(): Promise<Nominee[]> {
    return mockCustomerProfile.nominees;
  }

  async addNominee(data: Omit<Nominee, 'id'>): Promise<Nominee> {
    return { ...data, id: Math.random().toString() };
  }

  async updateNominee(id: string, data: Partial<Nominee>): Promise<Nominee> {
    const nominee = mockCustomerProfile.nominees.find(n => n.id === id);
    return { ...nominee!, ...data };
  }

  async deleteNominee(id: string): Promise<void> {
    return;
  }

  async getActivity(): Promise<CustomerActivity[]> {
    return mockCustomerProfile.activities;
  }

  async getSessions(): Promise<UserSession[]> {
    return getSessions();
  }

  async getKYCStatus(): Promise<{ status: KYCStatus }> {
    return { status: mockCustomerProfile.kycStatus };
  }

  async submitKYC(data: any): Promise<void> {
    return;
  }
}
