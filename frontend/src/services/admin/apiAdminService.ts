import apiClient from '../../api/client';
import { UserAccount, AuditLogEntry, SystemConfig, AdminWorkspaceVM } from '../../types/admin';
import { IAdminService } from './adminService';

export class ApiAdminService implements IAdminService {
  async getWorkspace(): Promise<AdminWorkspaceVM> {
    const response = await apiClient.get<AdminWorkspaceVM>('/admin/workspace');
    return response.data;
  }
  async getUsers(): Promise<UserAccount[]> {
    const response = await apiClient.get<UserAccount[]>('/admin/users');
    return response.data;
  }
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    const response = await apiClient.get<AuditLogEntry[]>('/admin/audit-logs');
    return response.data;
  }
  async getSystemConfig(): Promise<SystemConfig> {
    const response = await apiClient.get<SystemConfig>('/admin/config');
    return response.data;
  }
  async updateSystemConfig(config: Partial<SystemConfig>): Promise<SystemConfig> {
    const response = await apiClient.put<SystemConfig>('/admin/config', config);
    return response.data;
  }
}
