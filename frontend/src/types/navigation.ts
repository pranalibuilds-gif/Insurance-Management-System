import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  badgeCount?: number;
  children?: NavItem[];
}

export interface NavigationConfig {
  primary: NavItem[];
  footer?: NavItem[];
}
