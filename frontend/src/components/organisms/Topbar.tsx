import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem } from '../molecules/Breadcrumb';
import { Avatar } from '../atoms/Avatar';
import { cn } from '../../utils/cn';

interface TopbarProps {
  breadcrumbs: BreadcrumbItem[];
  user: {
    name: string;
    role: string;
    avatar?: string;
  } | null;
  onMenuClick?: () => void;
  showSearch?: boolean;
  className?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  breadcrumbs,
  user,
  onMenuClick,
  showSearch = false,
  className,
}) => {
  return (
    <header
      className={cn(
        'h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30',
        className
      )}
    >
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-500"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <Breadcrumb items={breadcrumbs} className="hidden sm:flex" />
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {showSearch && (
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 group-focus-within:text-brand-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 bg-neutral-50 border-none rounded-full text-sm focus:ring-2 focus:ring-brand-500/20 w-64 transition-all"
            />
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger-500 border-2 border-white" />
          </button>

          <div className="h-8 w-px bg-neutral-200 mx-1 hidden sm:block" />

          {user && (
            <button className="flex items-center gap-3 p-1 rounded-lg hover:bg-neutral-50 transition-colors group">
              <Avatar name={user.name} src={user.avatar} size="sm" />
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-neutral-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest leading-tight">
                  {user.role}
                </p>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
