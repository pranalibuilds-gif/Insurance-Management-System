import { LucideIcon } from 'lucide-react';
import { UserRole } from '../mocks/auth';

export interface NavItem {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  badgeCount?: number;
  roles?: UserRole[];
  children?: NavItem[];
}

export interface NavigationConfig {
  primary: NavItem[];
  footer?: NavItem[];
}
