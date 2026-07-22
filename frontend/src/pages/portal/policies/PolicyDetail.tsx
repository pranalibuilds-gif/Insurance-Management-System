import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Shield,
  Calendar,
  FileText,
  CreditCard,
  History,
  Activity,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { Alert } from '../../../components/molecules/Alert';
import { getPolicyWorkspace } from '../../../mocks/policies';
import { cn } from '../../../utils/cn';
import { PremiumInstallment } from '../../../types/billing';
import { Claim } from '../../../types/claim';

const PolicyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'documents' | 'claims' | 'timeline'>('overview');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['policy-workspace', id],
    queryFn: () => getPolicyWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={8} />;
  if (!workspace) return <div>Policy not found</div>;

  const { summary: policy } = workspace;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'schedule', label: 'Premium Schedule', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'claims', label: 'Claims History', icon: Activity },
    { id: 'timeline', label: 'Timeline', icon: History },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <Link to="/portal/policies" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Policies
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{policy.policyNumber}</h1>
              <Badge variant={policy.status === 'ACTIVE' ? 'success' : 'neutral'}>{policy.status}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{policy.productName} • {policy.category}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {workspace.actions.canDownload && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Policy PDF
            </Button>
          )}
          {workspace.actions.canRenew && (
            <Button size="sm">Renew Policy</Button>
          )}
        </div>
      </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-entrance">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <Card.Header>
                  <h4 className="font-bold text-neutral-900">Coverage Summary</h4>
                </Card.Header>
                <Card.Content className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Total Coverage</p>
                    <p className="text-2xl font-black text-neutral-900">${policy.coverageAmount.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Premium Frequency</p>
                    <p className="text-lg font-bold text-neutral-900">{policy.premiumFrequency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Start Date</p>
                    <p className="text-lg font-bold text-neutral-900">{new Date(policy.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">End Date</p>
                    <p className="text-lg font-bold text-neutral-900">{new Date(policy.endDate).toLocaleDateString()}</p>
                  </div>
                </Card.Content>
              </Card>

              {policy.premiumStatus !== 'PAID' && (
                <Alert variant={policy.premiumStatus === 'OVERDUE' ? 'danger' : 'warning'} title="Payment Required">
                  A premium payment of <span className="font-bold">$1,200</span> is {policy.premiumStatus === 'OVERDUE' ? 'overdue since' : 'due on'} {new Date(policy.nextPremiumDate!).toLocaleDateString()}.
                  <div className="mt-4">
                    <Button size="sm">Pay Now</Button>
                  </div>
                </Alert>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <h4 className="font-bold text-neutral-900">Nominees</h4>
                </Card.Header>
                <Card.Content className="p-0">
                  <div className="divide-y divide-neutral-50">
                    <div className="p-4 flex items-center justify-between text-sm">
                      <span className="font-bold text-neutral-900">Jane Doe (Spouse)</span>
                      <Badge variant="brand" size="sm">100%</Badge>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card className="bg-brand-900 text-white border-none shadow-xl shadow-brand-900/10">
                <Card.Content className="p-6 text-center space-y-4">
                  <Clock className="h-10 w-10 mx-auto text-brand-300" />
                  <div>
                    <h5 className="font-bold text-lg leading-tight">Renew Coverage</h5>
                    <p className="text-xs text-brand-200 mt-1">Don't lose your coverage benefits.</p>
                  </div>
                  <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
                    Configure Renewal
                  </Button>
                </Card.Content>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <Card className="animate-entrance">
            <Card.Content className="p-0">
              <DataTable
                columns={[
                  { header: 'Installment', accessor: (_: PremiumInstallment, i: number) => `#${i + 1}` },
                  { header: 'Due Date', accessor: (inst: PremiumInstallment) => new Date(inst.dueDate).toLocaleDateString() },
                  { header: 'Amount', accessor: (inst: PremiumInstallment) => `$${inst.amount.toLocaleString()}` },
                  {
                    header: 'Status',
                    accessor: (inst: PremiumInstallment) => {
                      const variants: Record<string, any> = { PAID: 'success', PENDING: 'neutral', OVERDUE: 'danger' };
                      return <Badge variant={variants[inst.status]}>{inst.status}</Badge>;
                    }
                  },
                  {
                    header: 'Action',
                    accessor: (inst: PremiumInstallment) => inst.status === 'PAID' ? (
                      <Button variant="ghost" size="sm" className="text-brand-600">
                        <Download className="h-4 w-4 mr-2" /> Receipt
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">Pay Now</Button>
                    ),
                    className: 'text-right'
                  }
                ]}
                data={workspace.premiumSchedule}
              />
            </Card.Content>
          </Card>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-entrance">
            {workspace.documents.map((doc) => (
              <Card key={doc.id} className="relative group">
                <Card.Content className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-neutral-400 group-hover:text-brand-600 transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{doc.title}</p>
                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{doc.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" isIconOnly>
                    <Download className="h-4 w-4" />
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'claims' && (
          <Card className="animate-entrance">
            <Card.Content className="p-0">
              <DataTable<Claim>
                columns={[
                  { header: 'Claim Number', accessor: 'claimNumber' },
                  { header: 'Type', accessor: 'type' },
                  { header: 'Date', accessor: (c) => new Date(c.incidentDate).toLocaleDateString() },
                  { header: 'Amount', accessor: (c) => `$${c.approvedAmount.toLocaleString()}` },
                  {
                    header: 'Status',
                    accessor: (c) => <Badge variant="info">{c.status.replace('_', ' ')}</Badge>
                  }
                ]}
                data={workspace.claims}
                emptyTitle="No Claims Found"
                emptyDescription="No claims have been filed against this policy yet."
              />
              <div className="p-6 border-t border-neutral-50 flex justify-end">
                <Button size="sm">File New Claim</Button>
              </div>
            </Card.Content>
          </Card>
        )}

        {activeTab === 'timeline' && (
          <Card className="animate-entrance">
            <Card.Content className="p-8">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-neutral-100">
                {workspace.timeline.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-8 group">
                    <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-neutral-100 shadow-sm z-10">
                      <div className="h-2 w-2 rounded-full bg-brand-500" />
                    </div>
                    <div className="ml-12 pt-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-neutral-900">{event.type}</span>
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

export default PolicyDetail;
