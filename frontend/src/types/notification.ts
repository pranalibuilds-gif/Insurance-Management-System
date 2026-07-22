export type NotificationStatus = 'UNREAD' | 'READ' | 'ARCHIVED';
export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
export type NotificationCategory =
  | 'POLICY'
  | 'BILLING'
  | 'CLAIMS'
  | 'DOCUMENTS'
  | 'KYC'
  | 'SECURITY'
  | 'SYSTEM';

export interface NotificationAction {
  label: string;
  href: string;
}

export interface Notification {
  id: string;
  userId: string;
  category: NotificationCategory;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  action?: NotificationAction;
  createdAt: string;
}

export interface NotificationWorkspace {
  unreadCount: number;
  notifications: Notification[];
}
