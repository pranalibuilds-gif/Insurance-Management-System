import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  User,
  MapPin,
  Users,
  FileText,
  ShieldCheck,
  Activity,
  Layout
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import { PageHeader } from '../../../components/molecules/PageHeader';

const navItems = [
  { label: 'Overview', href: '/portal/profile', icon: Layout, end: true },
  { label: 'Personal Information', href: '/portal/profile/personal', icon: User },
  { label: 'Address', href: '/portal/profile/address', icon: MapPin },
  { label: 'Nominees', href: '/portal/profile/nominees', icon: Users },
  { label: 'Documents', href: '/portal/profile/documents', icon: FileText },
  { label: 'Security', href: '/portal/profile/security', icon: ShieldCheck },
  { label: 'Activity', href: '/portal/profile/activity', icon: Activity },
];

const ProfileLayout: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Account Settings"
        description="Manage your personal information, nominees, and security preferences."
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all',
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm shadow-brand-100/50'
                      : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
