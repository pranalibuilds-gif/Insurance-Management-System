import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Archive,
  Check,
  MoreVertical,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  Settings,
  Activity
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { getNotificationWorkspace } from '../../../mocks/notifications';
import { cn } from '../../../utils/cn';
import { Notification, NotificationCategory, NotificationStatus } from '../../../types/notification';

const categoryIcons: Record<NotificationCategory, any> = {
  POLICY: ShieldCheck,
  BILLING: CreditCard,
  CLAIMS: Activity,
  DOCUMENTS: FileText,
  KYC: UserCheck,
  SECURITY: AlertTriangle,
  SYSTEM: Settings,
};

const NotificationCenter: React.FC = () => {
  const [filter, setFilter] = useState<NotificationStatus | 'ALL'>('ALL');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotificationWorkspace,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={5} />;
  if (!workspace) return <EmptyState title="No notifications" description="We couldn't load your notifications." />;

  const filteredNotifications = workspace.notifications.filter(n =>
    filter === 'ALL' || n.status === filter
  );

  const groupNotifications = (notifications: Notification[]) => {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const groups: Record<string, Notification[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    notifications.forEach(n => {
      const date = new Date(n.createdAt);
      if (date >= today) groups.Today.push(n);
      else if (date >= yesterday) groups.Yesterday.push(n);
      else groups.Earlier.push(n);
    });

    return groups;
  };

  const grouped = groupNotifications(filteredNotifications);

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Notification Center"
        description={`You have ${workspace.unreadCount} unread notifications.`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Mark all as read</Button>
            <Button variant="ghost" size="sm" isIconOnly><Settings className="h-4 w-4" /></Button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl w-fit">
        {(['ALL', 'UNREAD', 'READ', 'ARCHIVED'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              filter === f ? "bg-white text-brand-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {f === 'ALL' ? 'All Events' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {Object.entries(grouped).map(([group, notifications]) => (
          notifications.length > 0 && (
            <div key={group} className="space-y-4">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-2">{group}</h3>
              <div className="space-y-3">
                {notifications.map(n => (
                  <NotificationItem key={n.id} notification={n} />
                ))}
              </div>
            </div>
          )
        ))}

        {filteredNotifications.length === 0 && (
          <EmptyState
            icon={Bell}
            title="All caught up!"
            description="No notifications found for the selected filter."
          />
        )}
      </div>
    </div>
  );
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const Icon = categoryIcons[notification.category] || Info;
  const isUnread = notification.status === 'UNREAD';

  const typeStyles = {
    INFO: 'bg-info-50 text-info-600 border-info-100',
    SUCCESS: 'bg-success-50 text-success-600 border-success-100',
    WARNING: 'bg-warning-50 text-warning-600 border-warning-100',
    DANGER: 'bg-danger-50 text-danger-600 border-danger-100',
  };

  return (
    <Card className={cn(
      "transition-all group",
      isUnread ? "border-brand-200 ring-1 ring-brand-100/50" : "opacity-80 grayscale-[0.5] hover:grayscale-0 hover:opacity-100"
    )}>
      <Card.Content className="p-5">
        <div className="flex items-start gap-5">
          <div className={cn(
            "h-12 w-12 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110",
            typeStyles[notification.type]
          )}>
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{notification.category}</span>
                {isUnread && <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />}
              </div>
              <span className="text-[10px] font-medium text-neutral-400">
                {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <h4 className="font-bold text-neutral-900 truncate">{notification.title}</h4>
            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">{notification.message}</p>

            {notification.action && (
              <div className="pt-3">
                <Link to={notification.action.href}>
                  <Button variant="ghost" size="sm" className="h-8 px-0 text-brand-600 hover:bg-transparent hover:text-brand-700">
                    {notification.action.label} <ArrowRight className="ml-1.5 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" isIconOnly className="text-neutral-300 hover:text-neutral-600">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" isIconOnly className="text-neutral-300 hover:text-neutral-600">
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default NotificationCenter;
