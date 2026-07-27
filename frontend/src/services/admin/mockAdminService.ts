import { UserAccount, AuditLogEntry, SystemConfig, AdminWorkspaceVM } from '../../types/admin';
import { IAdminService } from './adminService';
import { getAdminWorkspace, getUsers, getAuditLogs, getSystemConfig, mockConfig } from '../../mocks/admin';

export class MockAdminService implements IAdminService {
  async getWorkspace(): Promise<AdminWorkspaceVM> {
    return getAdminWorkspace();
  }
  async getUsers(): Promise<UserAccount[]> {
    return getUsers();
  }
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return getAuditLogs();
  }
  async getSystemConfig(): Promise<SystemConfig> {
    return getSystemConfig();
  }
  async updateSystemConfig(config: Partial<SystemConfig>): Promise<SystemConfig> {
    return { ...mockConfig, ...config };
  }
}
