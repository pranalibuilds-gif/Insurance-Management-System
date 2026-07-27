import apiClient from '../../api/client';
import { ENDPOINTS } from '../../api/endpoints';
import { NotificationWorkspace } from '../../types/notification';
import { INotificationService } from './notificationService';

export class ApiNotificationService implements INotificationService {
  async getWorkspace(): Promise<NotificationWorkspace> {
    const response = await apiClient.get<NotificationWorkspace>(ENDPOINTS.NOTIFICATIONS.LIST);
    return response.data;
  }
  async markRead(id: string): Promise<void> {
    await apiClient.post(ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  }
  async markAllRead(): Promise<void> {
    await apiClient.post('/notifications/mark-all-read');
  }
  async archive(id: string): Promise<void> {
    await apiClient.post(`/notifications/${id}/archive`);
  }
}
