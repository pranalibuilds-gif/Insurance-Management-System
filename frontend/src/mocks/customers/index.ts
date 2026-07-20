import { Customer } from '../../types/customer';
import { mockDelay } from '..';

export const mockCustomer: Customer = {
  id: 'cust_1',
  userId: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 000-0000',
  dob: '1990-01-01',
  kycStatus: 'VERIFIED',
  status: 'ACTIVE',
  address: {
    addressLine1: '123 Enterprise St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
  },
  nominees: [
    {
      id: 'nom_1',
      fullName: 'Jane Doe',
      dob: '1992-05-15',
      relationship: 'Spouse',
      sharePercentage: 100,
    }
  ],
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

export const getCustomerProfile = async (): Promise<Customer> => {
  await mockDelay();
  return mockCustomer;
};
