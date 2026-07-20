import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  FileText,
  Settings,
  Bell,
  BarChart3,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';
import { NavigationConfig } from '../../types/navigation';

export const staffNavigation: NavigationConfig = {
  primary: [
    { id: 'dashboard', title: 'Operational Home', icon: LayoutDashboard, href: '/staff/dashboard' },
    { id: 'customers', title: 'Customers', icon: Users, href: '/staff/customers' },
    { id: 'policies', title: 'Policies', icon: ShieldCheck, href: '/staff/policies' },
    { id: 'claims', title: 'Claims Queue', icon: FileText, href: '/staff/claims' },
    { id: 'products', title: 'Products Builder', icon: ClipboardList, href: '/staff/products' },
    { id: 'reports', title: 'Reports & Analytics', icon: BarChart3, href: '/staff/reports' },
    { id: 'audit', title: 'Audit Logs', icon: ShieldAlert, href: '/staff/audit' },
  ],
  footer: [
    { id: 'notifications', title: 'Staff Alerts', icon: Bell, href: '/staff/notifications', badgeCount: 5 },
    { id: 'settings', title: 'System Settings', icon: Settings, href: '/staff/settings' },
  ]
};
