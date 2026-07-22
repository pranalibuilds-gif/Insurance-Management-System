import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  History,
  CreditCard,
  Bell,
  User,
  Search,
  Settings,
  LifeBuoy,
  DownloadCloud
} from 'lucide-react';
import { NavigationConfig } from '../../types/navigation';

export const customerNavigation: NavigationConfig = {
  primary: [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, href: '/portal/dashboard' },
    { id: 'search', title: 'Global Search', icon: Search, href: '/portal/search' },
    { id: 'products', title: 'Insurance Products', icon: Search, href: '/portal/products' },
    { id: 'policies', title: 'My Policies', icon: ShieldCheck, href: '/portal/policies' },
    { id: 'claims', title: 'My Claims', icon: FileText, href: '/portal/claims' },
    { id: 'billing', title: 'Payments', icon: CreditCard, href: '/portal/billing' },
    { id: 'downloads', title: 'Download Center', icon: DownloadCloud, href: '/portal/downloads' },
    { id: 'notifications', title: 'Notifications', icon: Bell, href: '/portal/notifications', badgeCount: 3 },
  ],
  footer: [
    { id: 'help', title: 'Help Center', icon: LifeBuoy, href: '/portal/help' },
    { id: 'profile', title: 'Profile Workspace', icon: User, href: '/portal/profile' },
    { id: 'settings', title: 'Settings', icon: Settings, href: '/portal/settings' },
  ]
};
