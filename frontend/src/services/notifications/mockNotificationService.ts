import { NotificationWorkspace } from '../../types/notification';
import { INotificationService } from './notificationService';
import { getNotificationWorkspace } from '../../mocks/notifications';

export class MockNotificationService implements INotificationService {
  async getWorkspace(): Promise<NotificationWorkspace> {
    return getNotificationWorkspace();
  }
  async markRead(id: string): Promise<void> {
    console.log('Mock Mark Read', id);
  }
  async markAllRead(): Promise<void> {
    console.log('Mock Mark All Read');
  }
  async archive(id: string): Promise<void> {
    console.log('Mock Archive', id);
  }
}
