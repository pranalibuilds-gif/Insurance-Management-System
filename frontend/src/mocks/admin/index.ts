import { UserAccount, AuditLogEntry, SystemConfig, AdminWorkspaceVM } from '../../types/admin';
import { mockDelay } from '..';

export const mockUsers: UserAccount[] = [
  { id: 'usr_1', fullName: 'Sarah Adjuster', email: 'sarah@imp.com', role: 'AGENT', status: 'ACTIVE', lastLogin: '2026-07-21T10:00:00Z', createdAt: '2026-01-01T09:00:00Z' },
  { id: 'usr_2', fullName: 'Mike Manager', email: 'mike@imp.com', role: 'MANAGER', status: 'ACTIVE', lastLogin: '2026-07-21T09:30:00Z', createdAt: '2026-01-01T09:00:00Z' },
  { id: 'usr_3', fullName: 'Admin User', email: 'admin@imp.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-07-21T11:00:00Z', createdAt: '2026-01-01T09:00:00Z' },
  { id: 'usr_4', fullName: 'Locked Agent', email: 'locked@imp.com', role: 'AGENT', status: 'LOCKED', lastLogin: '2026-07-15T14:00:00Z', createdAt: '2026-03-01T09:00:00Z' },
];

export const mockAuditLogs: AuditLogEntry[] = [
  { id: 'log_1', timestamp: '2026-07-21T11:05:00Z', actor: 'admin@imp.com', action: 'LOGIN', category: 'SECURITY', entityType: 'USER', entityId: 'usr_3', details: { message: 'Successful login' }, ipAddress: '192.168.1.1' },
  { id: 'log_2', timestamp: '2026-07-21T10:45:00Z', actor: 'mike@imp.com', action: 'APPROVED', category: 'BUSINESS', entityType: 'CLAIM', entityId: 'clm_1', details: { message: 'Claim approved for $42,000' }, ipAddress: '192.168.1.45' },
  { id: 'log_3', timestamp: '2026-07-21T10:30:00Z', actor: 'sarah@imp.com', action: 'UPDATED', category: 'BUSINESS', entityType: 'CUSTOMER', entityId: 'cust_1', details: { message: 'KYC status changed to VERIFIED' }, ipAddress: '192.168.1.12' },
];

export const mockConfig: SystemConfig = {
  general: { companyName: 'Insurance Management Platform', supportEmail: 'support@imp.com', currency: 'USD', timezone: 'UTC' },
  operations: { slaDeadlineHrs: 48, maxUploadSizeMb: 10, autoRenewalWindowDays: 30, claimLimitPerAgent: 25 },
  security: { sessionTimeoutMins: 30, maxLoginRetries: 5, mfaRequired: false, passwordComplexity: 'MEDIUM' },
};

export const getAdminWorkspace = async (): Promise<AdminWorkspaceVM> => {
  await mockDelay();
  return {
    userSummary: { total: 4, active: 3, locked: 1 },
    recentAuditLogs: mockAuditLogs,
    systemStatus: { api: 'OPERATIONAL', db: 'OPERATIONAL', storage: 'OPERATIONAL' },
  };
};

export const getUsers = async (): Promise<UserAccount[]> => {
  await mockDelay();
  return mockUsers;
};

export const getAuditLogs = async (): Promise<AuditLogEntry[]> => {
  await mockDelay();
  return mockAuditLogs;
};

export const getSystemConfig = async (): Promise<SystemConfig> => {
  await mockDelay();
  return mockConfig;
};
