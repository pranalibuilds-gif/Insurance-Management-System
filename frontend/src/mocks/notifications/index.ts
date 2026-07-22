import { Notification, NotificationWorkspace } from '../../types/notification';
import { mockDelay } from '..';

const now = new Date();
const today = now.toISOString();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
const earlier = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();

export const mockNotifications: Notification[] = [
  {
    id: 'nt_1',
    userId: '1',
    category: 'BILLING',
    title: 'Premium Payment Due',
    message: 'Your premium for Vehicle Protect Premium is due in 3 days. Please pay to avoid policy lapse.',
    type: 'WARNING',
    status: 'UNREAD',
    action: { label: 'Pay Now', href: '/portal/billing' },
    createdAt: today,
  },
  {
    id: 'nt_2',
    userId: '1',
    category: 'CLAIMS',
    title: 'Additional Evidence Requested',
    message: 'Adjuster Sarah has requested a clearer photo of the incident for claim CLM-2026-0002.',
    type: 'INFO',
    status: 'UNREAD',
    action: { label: 'Upload Evidence', href: '/portal/claims/clm_2' },
    createdAt: today,
  },
  {
    id: 'nt_3',
    userId: '1',
    category: 'POLICY',
    title: 'Policy Issued Successfully',
    message: 'Your Health Secure Gold policy (IMP-HEA-2026-001) has been issued and is now active.',
    type: 'SUCCESS',
    status: 'READ',
    action: { label: 'View Policy', href: '/portal/policies/pol_1' },
    createdAt: yesterday,
  },
  {
    id: 'nt_4',
    userId: '1',
    category: 'KYC',
    title: 'KYC Verification Complete',
    message: 'Congratulations! Your identity verification has been approved by our team.',
    type: 'SUCCESS',
    status: 'READ',
    action: { label: 'View Profile', href: '/portal/profile' },
    createdAt: earlier,
  },
  {
    id: 'nt_5',
    userId: '1',
    category: 'SECURITY',
    title: 'New Login Detected',
    message: 'A new login was detected from a Windows Chrome browser in Mumbai, India.',
    type: 'WARNING',
    status: 'ARCHIVED',
    action: { label: 'Secure Account', href: '/portal/profile/security' },
    createdAt: earlier,
  }
];

export const getNotificationWorkspace = async (): Promise<NotificationWorkspace> => {
  await mockDelay();
  return {
    unreadCount: mockNotifications.filter(n => n.status === 'UNREAD').length,
    notifications: mockNotifications,
  };
};
