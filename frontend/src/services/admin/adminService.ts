import { UserAccount, AuditLogEntry, SystemConfig, AdminWorkspaceVM } from '../../types/admin';

export interface IAdminService {
  getWorkspace(): Promise<AdminWorkspaceVM>;
  getUsers(): Promise<UserAccount[]>;
  getAuditLogs(): Promise<AuditLogEntry[]>;
  getSystemConfig(): Promise<SystemConfig>;
  updateSystemConfig(config: Partial<SystemConfig>): Promise<SystemConfig>;
}
