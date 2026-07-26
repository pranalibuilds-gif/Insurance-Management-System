import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  User,
  ShieldCheck,
  FileText,
  CreditCard,
  Activity,
  History,
  MessageSquare,
  CheckCircle2,
  XCircle,
  UserCheck,
  ShieldAlert,
  Plus,
  Bell,
  Search
} from 'lucide-react';
import { WorkspaceShell } from '../../components/organisms/WorkspaceShell';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getCustomerWorkspace } from '../../mocks/customers';

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

  const kycVariants: Record<string, any> = { VERIFIED: 'success', PENDING: 'warning', REJECTED: 'danger', NOT_SUBMITTED: 'neutral' };
  const riskVariants: Record<string, any> = { NORMAL: 'neutral', REVIEW: 'warning', HIGH_RISK: 'danger' };

  return (
    <WorkspaceShell
      title={summary.fullName}
      id={summary.id}
      status={summary.accountStatus}
      statusVariant={summary.accountStatus === 'ACTIVE' ? 'success' : 'neutral'}
      backLink={{ label: 'Back to Customers', href: '/staff/customers' }}
      icon={User}
      subtitle={`Customer since ${new Date(summary.customerSince).getFullYear()}`}
      summaryItems={[
        { label: 'KYC Status', value: summary.kycStatus },
        { label: 'Risk Profile', value: summary.riskFlag },
        { label: 'Policy / Claims', value: `${summary.activePolicyCount} / ${summary.openClaimCount}` },
        { label: 'Outstanding Balance', value: `$${summary.outstandingBalance.toLocaleString()}`, highlight: summary.outstandingBalance > 0 },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      riskIndicators={workspace.riskIndicators}
      rightSidebar={
        <div className="space-y-6">
           <Card className="border-brand-100 bg-brand-50/10">
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-neutral-900">Available Actions</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3">
                 {activeTab === 'kyc' && (
                   <>
                     <Button className="w-full justify-start" variant="primary">
                       <CheckCircle2 className="h-4 w-4 mr-3" /> Approve KYC
                     </Button>
                     <Button className="w-full justify-start" variant="danger">
                       <XCircle className="h-4 w-4 mr-3" /> Reject KYC
                     </Button>
                   </>
                 )}
                 <Button className="w-full justify-start" variant="outline">
                    <Bell className="h-4 w-4 mr-3" /> Send Notification
                 </Button>
                 <Button className="w-full justify-start text-danger-600 border-danger-100 hover:bg-danger-50" variant="outline">
                    <ShieldAlert className="h-4 w-4 mr-3" /> Suspend Account
                 </Button>
              </Card.Content>
           </Card>

           <Card>
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400">Assigned To</h4>
              </Card.Header>
              <Card.Content className="p-4 flex items-center gap-3">
                 <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold border border-neutral-200">SA</div>
                 <span className="text-sm font-medium text-neutral-700">{summary.assignedAgent || 'Unassigned'}</span>
              </Card.Content>
           </Card>
        </div>
      }
    >
      {activeTab === 'kyc' && (
        <div className="space-y-6 animate-entrance">
           <Card variant="outlined">
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
    </WorkspaceShell>
  );
};

export default CustomerWorkspacePage;
