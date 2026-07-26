import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  User,
  ShieldCheck,
  FileText,
  CreditCard,
  Activity,
  History,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  UserCheck,
  ShieldAlert,
  Plus,
  Bell
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { Alert } from '../../components/molecules/Alert';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getCustomerWorkspace } from '../../mocks/customers';
import { cn } from '../../utils/cn';
import { DataTable } from '../../components/organisms/DataTable';

const CustomerWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'policies' | 'claims' | 'documents' | 'billing' | 'timeline' | 'notes'>('overview');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['staff-customer-workspace', id],
    queryFn: () => getCustomerWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;
  if (!workspace) return <div>Customer not found</div>;

  const { summary } = workspace;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'kyc', label: 'KYC Review', icon: UserCheck },
    { id: 'policies', label: 'Policies', icon: ShieldCheck },
    { id: 'claims', label: 'Claims', icon: Activity },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'notes', label: 'Internal Notes', icon: MessageSquare },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <Link to="/staff/customers" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customers
      </Link>

      {/* Summary Strip */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400">
            <User className="h-10 w-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{summary.fullName}</h1>
              <Badge variant={summary.accountStatus === 'ACTIVE' ? 'success' : 'neutral'}>{summary.accountStatus}</Badge>
            </div>
            <p className="text-sm text-neutral-500">ID: {summary.id} • Customer since {new Date(summary.customerSince).getFullYear()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">KYC Status</p>
             <Badge variant={summary.kycStatus === 'VERIFIED' ? 'success' : 'warning'} size="sm" className="mt-1">
               {summary.kycStatus}
             </Badge>
          </div>
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Risk Profile</p>
             <Badge variant={summary.riskFlag === 'NORMAL' ? 'neutral' : 'danger'} size="sm" className="mt-1">
               {summary.riskFlag}
             </Badge>
          </div>
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Policies / Claims</p>
             <p className="text-sm font-bold text-neutral-900 mt-1">{summary.activePolicyCount} / {summary.openClaimCount}</p>
          </div>
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Balance</p>
             <p className="text-sm font-black text-neutral-900 mt-1">${summary.outstandingBalance.toLocaleString()}</p>
          </div>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 min-h-[500px]">
          {activeTab === 'overview' && (
             <div className="space-y-6 animate-entrance">
                {workspace.riskIndicators.map((risk, i) => (
                  <Alert key={i} variant={risk.type.toLowerCase() as any} title={risk.label}>
                    {risk.description}
                  </Alert>
                ))}
                <Card>
                  <Card.Header><h4 className="font-bold text-neutral-900">Account Overview</h4></Card.Header>
                  <Card.Content>
                    <p className="text-sm text-neutral-500">Summary content goes here...</p>
                  </Card.Content>
                </Card>
             </div>
          )}

          {activeTab === 'kyc' && (
            <div className="space-y-6 animate-entrance">
               <Card>
                  <Card.Header><h4 className="font-bold text-neutral-900">KYC Validation Checklist</h4></Card.Header>
                  <Card.Content className="space-y-4">
                    {workspace.kycDetails.checklist.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100">
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.completed ? <CheckCircle2 className="text-success-500 h-5 w-5" /> : <XCircle className="text-neutral-300 h-5 w-5" />}
                      </div>
                    ))}
                  </Card.Content>
               </Card>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6 animate-entrance">
               <div className="flex justify-between items-center px-2">
                 <h4 className="font-bold text-neutral-900 text-lg">Internal Remarks</h4>
                 <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Note</Button>
               </div>
               <div className="space-y-4">
                 {workspace.notes.map(note => (
                   <Card key={note.id} variant="outlined">
                     <Card.Content className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-brand-600">{note.author}</span>
                           <span className="text-[10px] text-neutral-400 font-bold uppercase">{new Date(note.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-neutral-700 leading-relaxed">{note.text}</p>
                        <Badge variant="neutral" size="sm">{note.category}</Badge>
                     </Card.Content>
                   </Card>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <Card className="animate-entrance">
               <Card.Content className="p-8">
                  <p className="text-sm text-neutral-500 italic text-center">Comprehensive Operational History Feed...</p>
               </Card.Content>
            </Card>
          )}
        </div>

        {/* Action Panel */}
        <aside className="space-y-6 lg:sticky lg:top-24">
           <Card className="border-brand-100 bg-brand-50/10">
              <Card.Header className="bg-transparent border-none">
                 <h4 className="font-bold text-neutral-900">Available Actions</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3 pt-0">
                 {activeTab === 'kyc' && (
                   <>
                     <Button className="w-full justify-start" variant="primary">
                       <CheckCircle2 className="h-4 w-4 mr-3" /> Approve KYC
                     </Button>
                     <Button className="w-full justify-start" variant="danger">
                       <XCircle className="h-4 w-4 mr-3" /> Reject KYC
                     </Button>
                     <Button className="w-full justify-start" variant="outline">
                       <MessageSquare className="h-4 w-4 mr-3" /> Request Info
                     </Button>
                   </>
                 )}
                 {activeTab === 'overview' && (
                   <>
                     <Button className="w-full justify-start text-danger-600 border-danger-100 hover:bg-danger-50" variant="outline">
                       <ShieldAlert className="h-4 w-4 mr-3" /> Suspend Account
                     </Button>
                     <Button className="w-full justify-start" variant="outline">
                       <Bell className="h-4 w-4 mr-3" /> Send Notification
                     </Button>
                   </>
                 )}
              </Card.Content>
           </Card>

           <Card>
              <Card.Header className="bg-transparent border-none pb-0"><h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400">Assigned To</h4></Card.Header>
              <Card.Content className="p-4 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold border border-neutral-200">SA</div>
                 <span className="text-sm font-medium text-neutral-700">{summary.assignedAgent || 'Unassigned'}</span>
              </Card.Content>
           </Card>
        </aside>
      </div>
    </div>
  );
};

export default CustomerWorkspacePage;
