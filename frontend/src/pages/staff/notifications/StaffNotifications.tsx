import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  Bell,
  ShieldCheck,
  FileText,
  CreditCard,
  AlertTriangle,
  Check,
  Archive,
  ArrowRight,
  Settings,
  UserCheck
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { cn } from '../../../utils/cn';

const StaffNotifications: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'ARCHIVED'>('ALL');

  const mockStaffNotifications = [
    { id: '1', title: 'SLA Breach Warning', message: 'Claim CLM-2026-0003 is approaching its 48h SLA deadline.', type: 'DANGER', category: 'CLAIM', status: 'UNREAD', createdAt: new Date().toISOString(), href: '/staff/claims/clm_3' },
    { id: '2', title: 'New KYC Submission', message: 'Alice Smith has uploaded identity documents for review.', type: 'INFO', category: 'KYC', status: 'UNREAD', createdAt: new Date().toISOString(), href: '/staff/customers/CUST-88292' },
    { id: '3', title: 'Payment Exception', message: 'Auto-renewal failed for policy IMP-HEA-201 due to insufficient funds.', type: 'WARNING', category: 'BILLING', status: 'READ', createdAt: new Date(Date.now() - 86400000).toISOString(), href: '/staff/policies/pol_1' },
  ];

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Staff Alerts & Operations"
        description="Stay informed about urgent tasks and platform exceptions."
        actions={<Button variant="outline" size="sm">Mark all as read</Button>}
      />

      <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl w-fit">
        {(['ALL', 'UNREAD', 'ARCHIVED'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              filter === f ? "bg-white text-brand-600 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            {f === 'ALL' ? 'All Alerts' : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {mockStaffNotifications.filter(n => filter === 'ALL' || n.status === filter).map(n => (
          <Card key={n.id} className={cn(n.status === 'UNREAD' ? 'border-brand-200 ring-1 ring-brand-100/50' : 'opacity-70')}>
             <Card.Content className="p-5 flex items-start gap-4">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                  n.type === 'DANGER' ? 'bg-danger-50 text-danger-600' :
                  n.type === 'WARNING' ? 'bg-warning-50 text-warning-600' : 'bg-brand-50 text-brand-600'
                )}>
                   {n.category === 'CLAIM' && <FileText className="h-5 w-5" />}
                   {n.category === 'KYC' && <UserCheck className="h-5 w-5" />}
                   {n.category === 'BILLING' && <CreditCard className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{n.category}</span>
                      <span className="text-[10px] text-neutral-400 font-medium">{new Date(n.createdAt).toLocaleTimeString()}</span>
                   </div>
                   <h4 className="font-bold text-neutral-900">{n.title}</h4>
                   <p className="text-sm text-neutral-500 line-clamp-1">{n.message}</p>
                   <Link to={n.href} className="inline-flex items-center text-xs font-bold text-brand-600 mt-2 hover:underline">
                      Handle Task <ArrowRight className="ml-1 h-3 w-3" />
                   </Link>
                </div>
                <div className="flex flex-col gap-2">
                   <Button variant="ghost" size="sm" isIconOnly><Check className="h-4 w-4 text-neutral-300" /></Button>
                   <Button variant="ghost" size="sm" isIconOnly><Archive className="h-4 w-4 text-neutral-300" /></Button>
                </div>
             </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaffNotifications;
