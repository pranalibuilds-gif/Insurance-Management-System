import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NavItem } from '../../types/navigation';
import { Badge } from '../atoms/Badge';

interface SidebarProps {
  items: NavItem[];
  footerItems?: NavItem[];
  collapsed: boolean;
  onToggle: () => void;
  onLogout?: () => void;
  className?: string;
  brandName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  footerItems,
  collapsed,
  onToggle,
  onLogout,
  className,
  brandName = 'IMP',
}) => {
  return (
    <aside
      className={cn(
        'flex flex-col bg-neutral-900 text-white transition-all duration-normal ease-standard',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
        {!collapsed && <span className="text-xl font-bold tracking-tight">{brandName}</span>}
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 hover:bg-white/10 transition-colors text-neutral-400"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-white/10 space-y-1">
        {footerItems?.map((item) => (
          <SidebarItem key={item.id} item={item} collapsed={collapsed} />
        ))}
        {onLogout && (
          <button
            onClick={onLogout}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-danger-400 hover:bg-danger-500/10 transition-all group',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        )}
      </div>
    </aside>
  );
};

const SidebarItem = ({ item, collapsed }: { item: NavItem; collapsed: boolean }) => {
  const Icon = item.icon;
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren && !collapsed) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group text-neutral-400 hover:bg-white/5 hover:text-white"
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{item.title}</span>
          <ChevronRight className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-90')} />
        </button>
        {isOpen && (
          <div className="pl-10 space-y-1">
            {item.children?.map((child) => (
              <NavLink
                key={child.id}
                to={child.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group',
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white'
                  )
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group relative',
          isActive
            ? 'bg-brand-600 text-white'
            : 'text-neutral-400 hover:bg-white/5 hover:text-white',
          collapsed && 'justify-center'
        )
      }
      title={collapsed ? item.title : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!collapsed && (
        <span className="flex-1 truncate">{item.title}</span>
      )}
      {!collapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
        <Badge variant="brand" size="sm" className="bg-brand-500/20 text-brand-300 border-none">
          {item.badgeCount}
        </Badge>
      )}
      {collapsed && item.badgeCount !== undefined && item.badgeCount > 0 && (
        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-500 border border-neutral-900" />
      )}
    </NavLink>
  );
};
