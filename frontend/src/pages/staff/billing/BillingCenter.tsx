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
  Filter,
  DownloadCloud,
  FileText,
  DollarSign
} from 'lucide-react';
import { WorkspaceShell } from '../../../components/organisms/WorkspaceShell';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Badge } from '../../../components/atoms/Badge';
import { MetricGrid } from '../../../features/reports/components/MetricGrid';
import { DataTable } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';

const BillingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'collections' | 'refunds' | 'disbursements'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'collections', label: 'Collections', icon: ArrowDownLeft },
    { id: 'refunds', label: 'Refunds', icon: ArrowUpRight },
    { id: 'disbursements', label: 'Disbursements', icon: CreditCard },
  ] as const;

  const mockCollections = [
    { id: '1', customer: 'John Doe', policy: 'IMP-HEA-201', amount: 1200, date: '2026-07-21', status: 'PAID', method: 'CREDIT_CARD' },
    { id: '2', customer: 'Alice Smith', policy: 'IMP-VEH-042', amount: 450, date: '2026-07-20', status: 'PENDING', method: 'BANK_TRANSFER' },
  ];

  return (
    <WorkspaceShell
      title="Billing & Finance"
      id="FIN-2026"
      status="ACTIVE"
      statusVariant="success"
      backLink={{ label: 'Back to Dashboard', href: '/staff/dashboard' }}
      icon={DollarSign}
      subtitle="Operational financial management"
      summaryItems={[
        { label: 'Today\'s Revenue', value: '$45,200', highlight: true },
        { label: 'Pending Refunds', value: '12' },
        { label: 'Avg Collection Time', value: '45 mins' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadCloud className="h-4 w-4 mr-2" /> Reconciliation Report
          </Button>
        </div>
      }
    >
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-entrance">
           <MetricGrid metrics={[
             { label: 'Gross Premium', value: '$2.4M', trend: { value: 5, isPositive: true } },
             { label: 'Net Revenue', value: '$1.56M', trend: { value: 3.2, isPositive: true } },
             { label: 'Outstanding', value: '$420k', trend: { value: 1.5, isPositive: false } },
             { label: 'Settlements', value: '$840k' },
           ]} />

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <Card.Header><h4 className="font-bold">Recent Collections</h4></Card.Header>
                <Card.Content className="p-0">
                  <DataTable
                    columns={[
                      { header: 'Customer', accessor: 'customer' },
                      { header: 'Amount', accessor: (i: any) => `$${i.amount}` },
                      { header: 'Status', accessor: (i: any) => <Badge variant={i.status === 'PAID' ? 'success' : 'warning'}>{i.status}</Badge> },
                    ]}
                    data={mockCollections}
                  />
                </Card.Content>
              </Card>

              <Card>
                <Card.Header><h4 className="font-bold">Financial Health</h4></Card.Header>
                <Card.Content className="h-64 flex items-center justify-center text-neutral-400 italic">
                   Financial trend visualization...
                </Card.Content>
              </Card>
           </div>
        </div>
      )}

      {activeTab === 'collections' && (
        <Card className="animate-entrance">
           <Card.Header className="flex justify-between items-center">
              <h4 className="font-bold">Collection Queue</h4>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filter by Method</Button>
           </Card.Header>
           <Card.Content className="p-0">
              <DataTable
                columns={[
                  { header: 'Date', accessor: 'date' },
                  { header: 'Customer', accessor: 'customer' },
                  { header: 'Policy #', accessor: 'policy' },
                  { header: 'Method', accessor: 'method' },
                  { header: 'Amount', accessor: (i: any) => <strong>${i.amount}</strong> },
                  { header: 'Status', accessor: (i: any) => <Badge variant={i.status === 'PAID' ? 'success' : 'warning'}>{i.status}</Badge> },
                ]}
                data={mockCollections}
              />
           </Card.Content>
        </Card>
      )}

      {['refunds', 'disbursements'].includes(activeTab) && (
        <div className="p-20 text-center space-y-4">
           <div className="h-16 w-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
              <CreditCard className="h-8 w-8" />
           </div>
           <h4 className="font-bold text-neutral-900">{tabs.find(t => t.id === activeTab)?.label} Queue Coming Soon</h4>
           <p className="text-sm text-neutral-500 max-w-xs mx-auto">This module is being integrated with our payment gateway provider.</p>
        </div>
      )}
    </WorkspaceShell>
  );
};

export default BillingCenter;
