import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import {
  Customer,
  Address,
  Nominee,
  CustomerActivity,
  UserSession,
  KYCStatus
} from '../../types/customer';
import { ICustomerService } from './customerService';

export class ApiCustomerService implements ICustomerService {
  async getProfile(): Promise<Customer> {
    const response = await apiClient.get<Customer>(ENDPOINTS.CUSTOMERS.PROFILE);
    return response.data;
  }

  async updateProfile(data: Partial<Customer>): Promise<Customer> {
    const response = await apiClient.put<Customer>(ENDPOINTS.CUSTOMERS.PROFILE, data);
    return response.data;
  }

  async getAddress(): Promise<Address> {
    const response = await apiClient.get<Address>(ENDPOINTS.CUSTOMERS.ME + '/address');
    return response.data;
  }

  async updateAddress(data: Address): Promise<Address> {
    const response = await apiClient.put<Address>(ENDPOINTS.CUSTOMERS.ME + '/address', data);
    return response.data;
  }

  async getNominees(): Promise<Nominee[]> {
    const response = await apiClient.get<Nominee[]>(ENDPOINTS.CUSTOMERS.ME + '/nominees');
    return response.data;
  }

  async addNominee(data: Omit<Nominee, 'id'>): Promise<Nominee> {
    const response = await apiClient.post<Nominee>(ENDPOINTS.CUSTOMERS.ME + '/nominees', data);
    return response.data;
  }

  async updateNominee(id: string, data: Partial<Nominee>): Promise<Nominee> {
    const response = await apiClient.put<Nominee>(`${ENDPOINTS.CUSTOMERS.ME}/nominees/${id}`, data);
    return response.data;
  }

  async deleteNominee(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.CUSTOMERS.ME}/nominees/${id}`);
  }

  async getActivity(): Promise<CustomerActivity[]> {
    const response = await apiClient.get<CustomerActivity[]>(ENDPOINTS.CUSTOMERS.ME + '/activity');
    return response.data;
  }

  async getSessions(): Promise<UserSession[]> {
    const response = await apiClient.get<UserSession[]>(ENDPOINTS.CUSTOMERS.ME + '/security/sessions');
    return response.data;
  }

  async getKYCStatus(): Promise<{ status: KYCStatus }> {
    const response = await apiClient.get<{ status: KYCStatus }>(ENDPOINTS.CUSTOMERS.ME + '/kyc');
    return response.data;
  }

  async submitKYC(data: any): Promise<void> {
    await apiClient.post(ENDPOINTS.CUSTOMERS.ME + '/kyc', data);
  }
}
