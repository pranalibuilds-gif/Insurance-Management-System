import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  CreditCard,
  History,
  FileText,
  Activity,
  ArrowRight,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { Alert } from '../../../components/molecules/Alert';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getBillingWorkspace } from '../../../mocks/billing';
import { cn } from '../../../utils/cn';
import { PremiumInstallment, PaymentReceipt } from '../../../types/billing';

const BillingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'receipts' | 'timeline'>('upcoming');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['billing-workspace'],
    queryFn: getBillingWorkspace,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={8} />;
  if (!workspace) return <div>Failed to load billing data.</div>;

  const tabs = [
    { id: 'upcoming', label: 'Upcoming Payments', icon: Clock },
    { id: 'history', label: 'Payment History', icon: History },
    { id: 'receipts', label: 'My Receipts', icon: FileText },
    { id: 'timeline', label: 'Financial Activity', icon: Activity },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <PageHeader
        title="Billing & Payments"
        description="Manage your premiums, view payment history, and download receipts."
      />

      {/* Alerts Section */}
      <div className="space-y-3">
        {workspace.alerts.map((alert, idx) => (
          <Alert key={idx} variant={alert.type.toLowerCase() as any}>
            {alert.message}
          </Alert>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-brand-600 text-white border-none shadow-lg">
          <Card.Content className="p-6 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-100">Outstanding Balance</p>
            <h4 className="text-3xl font-black">${workspace.summary.outstandingBalance.toLocaleString()}</h4>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-6 space-y-2">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Next 30 Days</p>
            <h4 className="text-3xl font-bold text-neutral-900">${workspace.summary.upcomingTotal.toLocaleString()}</h4>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content className="p-6 space-y-2">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Paid (Term)</p>
            <h4 className="text-3xl font-bold text-neutral-900">${workspace.summary.totalPaidCurrentTerm.toLocaleString()}</h4>
          </Card.Content>
        </Card>
        <Card className={cn(workspace.summary.overdueCount > 0 ? "border-danger-100 bg-danger-50/20" : "")}>
          <Card.Content className="p-6 space-y-2 text-center sm:text-left">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Overdue Items</p>
            <div className="flex items-center gap-3">
               <h4 className={cn("text-3xl font-bold", workspace.summary.overdueCount > 0 ? "text-danger-600" : "text-neutral-900")}>
                {workspace.summary.overdueCount}
               </h4>
               {workspace.summary.overdueCount > 0 && <Badge variant="danger">Action Required</Badge>}
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

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'upcoming' && (
          <Card className="animate-entrance">
            <Card.Content className="p-0">
              <DataTable<PremiumInstallment>
                columns={[
                  {
                    header: 'Policy / Product',
                    accessor: (inst) => (
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral-900">{inst.policyNumber}</span>
                        <span className="text-xs text-neutral-500">{inst.productName}</span>
                      </div>
                    )
                  },
                  { header: 'Due Date', accessor: (inst) => new Date(inst.dueDate).toLocaleDateString() },
                  { header: 'Amount', accessor: (inst) => <span className="font-semibold">${inst.amount.toLocaleString()}</span> },
                  {
                    header: 'Status',
                    accessor: (inst) => <Badge variant={inst.status === 'OVERDUE' ? 'danger' : 'warning'}>{inst.status}</Badge>
                  },
                  {
                    header: '',
                    accessor: () => (
                      <div className="flex justify-end gap-2">
                        <Button size="sm">Pay Now</Button>
                      </div>
                    ),
                    className: 'text-right'
                  }
                ]}
                data={workspace.upcomingPayments}
              />
            </Card.Content>
          </Card>
        )}

        {activeTab === 'history' && (
          <Card className="animate-entrance">
            <Card.Content className="p-0">
              <DataTable<PremiumInstallment>
                columns={[
                  { header: 'Receipt #', accessor: (inst) => <span className="font-mono text-xs">{inst.receiptNumber}</span> },
                  { header: 'Policy', accessor: 'policyNumber' },
                  { header: 'Paid Date', accessor: (inst) => inst.paymentDate ? new Date(inst.paymentDate).toLocaleDateString() : '-' },
                  { header: 'Amount', accessor: (inst) => `$${inst.amount.toLocaleString()}` },
                  { header: 'Status', accessor: () => <Badge variant="success">PAID</Badge> },
                  {
                    header: '',
                    accessor: () => (
                      <Button variant="ghost" size="sm" isIconOnly>
                        <Download className="h-4 w-4" />
                      </Button>
                    ),
                    className: 'text-right'
                  }
                ]}
                data={workspace.paymentHistory}
              />
            </Card.Content>
          </Card>
        )}

        {activeTab === 'receipts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-entrance">
             {workspace.receipts.map(receipt => (
               <Card key={receipt.id} variant="outlined" className="hover:border-brand-200 transition-colors group">
                 <Card.Content className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                       <div className="p-3 bg-neutral-100 rounded-xl text-neutral-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          <FileText className="h-6 w-6" />
                       </div>
                       <Badge variant="success" size="sm">{receipt.status}</Badge>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Receipt Number</p>
                       <p className="font-mono font-bold text-neutral-900">{receipt.receiptNumber}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-sm font-bold text-neutral-900">{receipt.productName}</p>
                       <p className="text-xs text-neutral-500">Policy: {receipt.policyNumber}</p>
                    </div>
                    <div className="pt-4 border-t border-neutral-50 flex items-center justify-between">
                       <span className="text-lg font-black text-neutral-900">${receipt.amount.toLocaleString()}</span>
                       <Button variant="ghost" size="sm" isIconOnly>
                          <Download className="h-4 w-4" />
                       </Button>
                    </div>
                 </Card.Content>
               </Card>
             ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card className="animate-entrance">
            <Card.Content className="p-8">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-neutral-100">
                {workspace.timeline.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-8 group">
                    <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-neutral-100 shadow-sm z-10">
                      <Activity className="h-4 w-4 text-neutral-400" />
                    </div>
                    <div className="ml-12 pt-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-neutral-900">{event.type.replace('_', ' ')}</span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-neutral-500">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BillingDashboard;
