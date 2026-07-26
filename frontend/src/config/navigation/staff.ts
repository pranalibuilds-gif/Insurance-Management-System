import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  Bell,
  BarChart3,
  ShieldAlert,
  ClipboardList,
  CreditCard,
  UserCog
} from 'lucide-react';
import { NavigationConfig } from '../../types/navigation';

export const staffNavigation: NavigationConfig = {
  primary: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/staff/dashboard',
      roles: ['AGENT', 'MANAGER', 'ADMIN']
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: Users,
      href: '/staff/customers',
      roles: ['AGENT', 'MANAGER']
    },
    {
      id: 'policies',
      title: 'Policies',
      icon: ShieldCheck,
      href: '/staff/policies',
      roles: ['AGENT', 'MANAGER']
    },
    {
      id: 'claims',
      title: 'Claims Queue',
      icon: FileText,
      href: '/staff/claims',
      roles: ['AGENT', 'MANAGER']
    },
    {
      id: 'products',
      title: 'Products Builder',
      icon: ClipboardList,
      href: '/staff/products',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      id: 'billing',
      title: 'Billing & Finance',
      icon: CreditCard,
      href: '/staff/billing',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: BarChart3,
      href: '/staff/reports',
      roles: ['MANAGER', 'ADMIN']
    },
    {
      id: 'users',
      title: 'Users & Roles',
      icon: UserCog,
      href: '/staff/users',
      roles: ['ADMIN']
    },
    {
      id: 'audit',
      title: 'Audit Center',
      icon: ShieldAlert,
      href: '/staff/audit',
      roles: ['ADMIN']
    },
  ],
  footer: [
    {
      id: 'notifications',
      title: 'Staff Alerts',
      icon: Bell,
      href: '/staff/notifications',
      badgeCount: 5,
      roles: ['AGENT', 'MANAGER', 'ADMIN']
    },
    {
      id: 'settings',
      title: 'System Settings',
      icon: Settings,
      href: '/staff/settings',
      roles: ['ADMIN']
    },
  ]
};
