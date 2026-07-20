import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  History,
  CreditCard,
  Bell,
  User,
  Search
} from 'lucide-react';
import { NavigationConfig } from '../../types/navigation';

export const customerNavigation: NavigationConfig = {
  primary: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, href: '/portal/dashboard' },
    { id: 'products', title: 'Insurance Products', icon: Search, href: '/portal/products' },
    { id: 'policies', title: 'My Policies', icon: ShieldCheck, href: '/portal/policies' },
    { id: 'claims', title: 'My Claims', icon: FileText, href: '/portal/claims' },
    { id: 'billing', title: 'Payments', icon: CreditCard, href: '/portal/billing' },
    { id: 'documents', title: 'My Documents', icon: History, href: '/portal/documents' },
    { id: 'notifications', title: 'Notifications', icon: Bell, href: '/portal/notifications', badgeCount: 3 },
  ],
  footer: [
    { id: 'profile', title: 'Profile Settings', icon: User, href: '/portal/profile' },
  ]
};
