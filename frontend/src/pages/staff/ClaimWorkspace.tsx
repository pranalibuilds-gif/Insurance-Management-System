import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  Shield,
  CreditCard,
  FileText,
  History,
  Search,
  Scale,
  Gavel,
  XCircle,
  MessageSquare,
  ArrowLeft,
  User,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { WorkspaceShell } from '../../components/organisms/WorkspaceShell';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getClaimWorkspace } from '../../mocks/claims';

const ClaimWorkspaceStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'investigation' | 'evidence' | 'financials' | 'policy' | 'timeline' | 'notes'>('overview');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['staff-claim-workspace', id],
    queryFn: () => getClaimWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;
  if (!workspace) return <div>Claim not found</div>;

  const { summary, financials } = workspace;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'investigation', label: 'Investigation', icon: Search },
    { id: 'evidence', label: 'Evidence', icon: FileText },
    { id: 'financials', label: 'Financial Review', icon: CreditCard },
    { id: 'policy', label: 'Policy Validation', icon: Scale },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
  ] as const;

  return (
    <WorkspaceShell
      title={summary.claimNumber}
      id={summary.id}
      status={summary.status}
      statusVariant="info"
      backLink={{ label: 'Back to Queue', href: '/staff/claims' }}
      icon={Activity}
      subtitle={`${summary.type} • ${summary.customerName}`}
      summaryItems={[
        { label: 'Requested', value: `$${financials.requestedAmount.toLocaleString()}` },
        { label: 'SLA Deadline', value: new Date(summary.slaDeadline).toLocaleDateString() },
        { label: 'Incident Date', value: new Date(summary.incidentDate).toLocaleDateString() },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      riskIndicators={workspace.riskIndicators}
      rightSidebar={
        <div className="space-y-6">
           <Card className="border-brand-100 bg-brand-50/10">
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-neutral-900">Case Decisions</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3">
                 {workspace.actions.canApprove && (
                   <Button className="w-full justify-start" variant="primary">
                     <Gavel className="h-4 w-4 mr-3" /> Approve Settlement
                   </Button>
                 )}
                 {workspace.actions.canReject && (
                   <Button className="w-full justify-start" variant="danger">
                     <XCircle className="h-4 w-4 mr-3" /> Reject Claim
                   </Button>
                 )}
                 {workspace.actions.canRequestInfo && (
                   <Button className="w-full justify-start" variant="outline">
                     <MessageSquare className="h-4 w-4 mr-3" /> Request Evidence
                   </Button>
                 )}
                 <Button className="w-full justify-start" variant="ghost">
                    <ArrowLeft className="h-4 w-4 mr-3" /> Return to Adjuster
                 </Button>
              </Card.Content>
           </Card>

           <Card>
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400">Claimant</h4>
              </Card.Header>
              <Card.Content className="p-4">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100 flex items-center justify-center">
                       <User className="h-5 w-5 text-neutral-500" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-neutral-900">{summary.customerName}</p>
                       <Link to={`/staff/customers/${summary.customerId}`} className="text-[10px] text-brand-600 font-bold hover:underline uppercase">View 360 Workspace</Link>
                    </div>
                 </div>
              </Card.Content>
           </Card>
        </div>
      }
    >
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-entrance">
          <Card variant="outlined">
            <Card.Header><h4 className="font-bold">Claim Description</h4></Card.Header>
            <Card.Content>
              <p className="text-sm text-neutral-600 leading-relaxed">{summary.description}</p>
            </Card.Content>
          </Card>
          <Card variant="outlined">
            <Card.Header><h4 className="font-bold">Investigator Observations</h4></Card.Header>
            <Card.Content>
              <p className="text-sm text-neutral-500 italic">{workspace.investigationNotes}</p>
            </Card.Content>
          </Card>
        </div>
      )}

      {activeTab === 'financials' && (
         <div className="space-y-6 animate-entrance">
            <Card variant="outlined">
               <Card.Header><h4 className="font-bold">Financial Analysis</h4></Card.Header>
               <Card.Content className="p-0">
                  <div className="divide-y divide-neutral-50">
                     <div className="p-6 flex justify-between items-center">
                        <span className="text-sm text-neutral-500">Requested Amount</span>
                        <span className="font-bold text-neutral-900">${financials.requestedAmount.toLocaleString()}</span>
                     </div>
                     <div className="p-6 flex justify-between items-center bg-brand-50/20">
                        <span className="text-sm font-bold text-brand-700">Recommended Amount</span>
                        <span className="text-xl font-black text-brand-600">${financials.recommendedAmount.toLocaleString()}</span>
                     </div>
                  </div>
               </Card.Content>
            </Card>
         </div>
      )}

      {activeTab === 'policy' && (
        <div className="space-y-6 animate-entrance">
           <Card variant="outlined">
              <Card.Header><h4 className="font-bold">Validation Status</h4></Card.Header>
              <Card.Content className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-white">
                    <span className="text-sm font-medium">Policy active on incident date</span>
                    <CheckCircle2 className="text-success-500 h-5 w-5" />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-white">
                    <span className="text-sm font-medium">Waiting period completed</span>
                    {workspace.policySummary.waitingPeriodMet ? <CheckCircle2 className="text-success-500 h-5 w-5" /> : <AlertCircle className="text-danger-500 h-5 w-5" />}
                 </div>
              </Card.Content>
           </Card>
        </div>
      )}
    </WorkspaceShell>
  );
};

export default ClaimWorkspaceStaff;
