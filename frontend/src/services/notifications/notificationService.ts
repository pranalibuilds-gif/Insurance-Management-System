import { Notification, NotificationWorkspace } from '../../types/notification';

export interface INotificationService {
  getWorkspace(): Promise<NotificationWorkspace>;
  markRead(id: string): Promise<void>;
  markAllRead(): Promise<void>;
  archive(id: string): Promise<void>;
}
