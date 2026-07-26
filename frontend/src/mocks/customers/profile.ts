import { Customer, UserSession, CustomerWorkspace } from '../../types/customer';
import { mockDelay } from '..';

export const mockCustomerProfile: Customer = {
  id: 'CUST-88291',
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
    addressLine2: 'Suite 400',
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
      sharePercentage: 60,
      status: 'ACTIVE',
    },
    {
      id: 'nom_2',
      fullName: 'Michael Doe',
      dob: '2015-08-20',
      relationship: 'Child',
      sharePercentage: 40,
      status: 'ACTIVE',
    }
  ],
  activities: [
    { id: 'act_1', type: 'Policy Purchased', description: 'Purchased Health Secure Gold', timestamp: '2026-03-15T10:00:00Z' },
    { id: 'act_2', type: 'KYC Approved', description: 'Identity verified by Agent Sarah', timestamp: '2026-02-10T14:30:00Z' },
    { id: 'act_3', type: 'Registered', description: 'Account created', timestamp: '2026-01-01T09:00:00Z' },
  ],
  createdAt: '2026-01-01T09:00:00Z',
  updatedAt: '2026-03-20T16:00:00Z',
};

export const mockSessions: UserSession[] = [
  { id: 'sess_1', device: 'Windows Chrome', location: 'New York, USA', lastActive: 'Active Now', isCurrent: true },
  { id: 'sess_2', device: 'iPhone 15', location: 'New York, USA', lastActive: 'Yesterday', isCurrent: false },
  { id: 'sess_3', device: 'Android Pixel', location: 'Mumbai, India', lastActive: '2 weeks ago', isCurrent: false },
];

export const getCustomerProfile = async (): Promise<Customer> => {
  await mockDelay();
  return mockCustomerProfile;
};

export const getSessions = async (): Promise<UserSession[]> => {
  await mockDelay();
  return mockSessions;
};

export const getCustomerWorkspace = async (id: string): Promise<CustomerWorkspace> => {
  await mockDelay();
  return {
    summary: {
      id: id || 'CUST-88291',
      fullName: 'John Doe',
      kycStatus: 'VERIFIED',
      accountStatus: 'ACTIVE',
      assignedAgent: 'Sarah Agent',
      customerSince: '2026-01-01',
      riskFlag: 'NORMAL',
      activePolicyCount: 2,
      openClaimCount: 1,
      outstandingBalance: 1200,
    },
    kycDetails: {
      checklist: [
        { id: '1', label: 'Identity Proof Uploaded', completed: true },
        { id: '2', label: 'Address Proof Uploaded', completed: true },
        { id: '3', label: 'Facial Match Verified', completed: true },
        { id: '4', label: 'AML Check Passed', completed: true },
      ],
      history: [
        { date: '2026-02-10', action: 'KYC Verified', actor: 'Sarah Agent' },
        { date: '2026-02-09', action: 'Documents Submitted', actor: 'John Doe' },
      ],
    },
    notes: [
      { id: '1', author: 'Sarah Agent', category: 'GENERAL', text: 'Customer requested information about premium discounts for multi-policy holders.', timestamp: '2026-03-15T10:00:00Z' },
    ],
    riskIndicators: [
      { type: 'INFO', label: 'High Value Policy', description: 'Customer holds policies worth over $1M.' },
    ],
    actions: ['KYC_APPROVE', 'KYC_REJECT', 'SUSPEND_ACCOUNT', 'SEND_NOTIFICATION'],
  };
};
