export type UserAccountStatus = 'ACTIVE' | 'LOCKED' | 'DISABLED';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: UserAccountStatus;
  lastLogin: string;
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermissions {
  roleId: string;
  roleName: string;
  permissions: string[]; // List of permission IDs
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'APPROVED' | 'REJECTED' | 'FAILED' | 'LOGIN';
  category: 'SECURITY' | 'BUSINESS' | 'SYSTEM';
  entityType: 'POLICY' | 'CLAIM' | 'CUSTOMER' | 'USER' | 'PRODUCT';
  entityId: string;
  details: {
    before?: any;
    after?: any;
    message: string;
  };
  ipAddress: string;
}

export interface SystemConfig {
  general: {
    companyName: string;
    supportEmail: string;
    currency: string;
    timezone: string;
  };
  operations: {
    slaDeadlineHrs: number;
    maxUploadSizeMb: number;
    autoRenewalWindowDays: number;
    claimLimitPerAgent: number;
  };
  security: {
    sessionTimeoutMins: number;
    maxLoginRetries: number;
    mfaRequired: boolean;
    passwordComplexity: 'LOW' | 'MEDIUM' | 'HIGH';
  };
}

export interface AdminWorkspaceVM {
  userSummary: {
    total: number;
    active: number;
    locked: number;
  };
  recentAuditLogs: AuditLogEntry[];
  systemStatus: {
    api: 'OPERATIONAL' | 'DEGRADED' | 'DOWN';
    db: 'OPERATIONAL' | 'DEGRADED' | 'DOWN';
    storage: 'OPERATIONAL' | 'DEGRADED' | 'DOWN';
  };
}
