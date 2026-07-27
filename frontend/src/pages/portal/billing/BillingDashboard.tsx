import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Filter,
  History,
  Receipt,
  Activity,
  ArrowRight
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { Alert } from '../../../components/molecules/Alert';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { serviceFactory } from '../../../services/serviceFactory';
import { QUERY_KEYS } from '../../../api/queryKeys';
import { PremiumInstallment, PaymentReceipt } from '../../../types/billing';
import { cn } from '../../../utils/cn';

const BillingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'upcoming' | 'history' | 'receipts'>('overview');

  const { data: dashboard, isLoading } = useQuery({
    queryKey: QUERY_KEYS.BILLING.SUMMARY,
    queryFn: () => serviceFactory.getBillingService().getDashboard(),
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;
  if (!dashboard) return <div>Failed to load financial data.</div>;

  const tabs = [
    { id: 'overview', label: 'Financial Overview', icon: TrendingUp },
    { id: 'upcoming', label: 'Upcoming Payments', icon: Calendar },
    { id: 'history', label: 'Transaction History', icon: History },
    { id: 'receipts', label: 'Payment Receipts', icon: Receipt },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Billing & Payments"
        description="Manage your premiums, track payments, and download tax receipts."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-brand-100 bg-brand-50/20">
          <Card.Content className="p-6 space-y-2">
            <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">Outstanding Balance</p>
            <h4 className="text-3xl font-black text-brand-900">${dashboard.summary.totalOutstanding.toLocaleString()}</h4>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-6 space-y-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Next Payment</p>
            <h4 className="text-3xl font-bold text-neutral-900">${dashboard.summary.nextPaymentAmount.toLocaleString()}</h4>
            <p className="text-xs text-neutral-500">{new Date(dashboard.summary.nextPaymentDate).toLocaleDateString()}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-6 space-y-2">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Paid (YTD)</p>
            <h4 className="text-3xl font-bold text-neutral-900">${dashboard.summary.totalPaid.toLocaleString()}</h4>
          </Card.Content>
        </Card>
        <Card className={cn(dashboard.summary.totalOutstanding > 0 ? "border-danger-100 bg-danger-50/20" : "")}>
          <Card.Content className="p-6 space-y-2 text-center lg:text-left">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</p>
            <div className="flex items-center gap-2">
               <h4 className={cn("text-2xl font-bold", dashboard.summary.totalOutstanding > 0 ? "text-danger-600" : "text-success-600")}>
                  {dashboard.summary.totalOutstanding > 0 ? 'DUE' : 'All Clear'}
               </h4>
               {dashboard.summary.totalOutstanding > 0 && <Badge variant="danger">Action Required</Badge>}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-100 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap',
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
           <div className="space-y-6 animate-entrance">
              <Card>
                <Card.Header className="flex justify-between items-center">
                   <h4 className="font-bold">Recent Transactions</h4>
                   <Button variant="ghost" size="sm" onClick={() => setActiveTab('history')}>View All</Button>
                </Card.Header>
                <Card.Content className="p-0">
                   <DataTable
                     columns={[
                        { header: 'Date', accessor: 'dueDate' },
                        { header: 'Policy', accessor: 'policyNumber' },
                        { header: 'Amount', accessor: (i: any) => `$${i.amount.toLocaleString()}` },
                        { header: 'Status', accessor: (i: any) => <Badge variant={i.status === 'PAID' ? 'success' : 'warning'}>{i.status}</Badge> }
                     ]}
                     data={dashboard.recentTransactions.slice(0, 3)}
                   />
                </Card.Content>
              </Card>
           </div>
        )}

        {activeTab === 'upcoming' && (
           <div className="space-y-6 animate-entrance">
              <Card>
                <Card.Content className="p-0">
                  <DataTable
                    columns={[
                       { header: 'Due Date', accessor: 'dueDate' },
                       { header: 'Policy', accessor: 'policyNumber' },
                       { header: 'Plan', accessor: 'productName' },
                       { header: 'Amount', accessor: (i: any) => <span className="font-bold">${i.amount.toLocaleString()}</span> },
                       {
                         header: '',
                         accessor: (i: any) => <Button size="sm">Pay Now</Button>,
                         className: 'text-right'
                       }
                    ]}
                    data={dashboard.recentTransactions.filter(i => i.status !== 'PAID')}
                  />
                </Card.Content>
              </Card>
           </div>
        )}

        {activeTab === 'receipts' && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-entrance">
              <p className="text-neutral-400 italic">No receipts available for download yet.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default BillingDashboard;
