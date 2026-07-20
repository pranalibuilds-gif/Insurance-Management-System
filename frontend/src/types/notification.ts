export type NotificationStatus = 'PENDING' | 'SENT' | 'READ' | 'ARCHIVED';
export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  actionUrl?: string;
  createdAt: string;
}
