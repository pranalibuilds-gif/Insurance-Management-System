import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Activity,
  FileText,
  History,
  Shield,
  CreditCard,
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MessageSquare,
  Search,
  User,
  Scale,
  Gavel
} from 'lucide-react';
import { PageHeader } from '../../components/molecules/PageHeader';
import { Button } from '../../components/atoms/Button';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import { Alert } from '../../components/molecules/Alert';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getClaimWorkspace } from '../../mocks/claims';
import { cn } from '../../utils/cn';

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
    <div className="space-y-8 animate-entrance">
      <Link to="/staff/claims" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Queue
      </Link>

      {/* Summary Strip */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Activity className="h-10 w-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{summary.claimNumber}</h1>
              <Badge variant="info">{summary.status.replace('_', ' ')}</Badge>
              <Badge variant={summary.priority === 'URGENT' ? 'danger' : 'neutral'} size="sm">{summary.priority}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{summary.type} • {summary.customerName} (ID: {summary.customerId})</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Requested</p>
             <p className="text-sm font-bold text-neutral-900 mt-1">${financials.requestedAmount.toLocaleString()}</p>
          </div>
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">SLA Deadline</p>
             <p className="text-sm font-bold text-neutral-900 mt-1">{new Date(summary.slaDeadline).toLocaleDateString()}</p>
          </div>
          <div className="text-center md:text-left">
             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Incident Date</p>
             <p className="text-sm font-bold text-neutral-900 mt-1">{new Date(summary.incidentDate).toLocaleDateString()}</p>
          </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-entrance">
              {workspace.riskIndicators.map((risk, i) => (
                <Alert key={i} variant={risk.type.toLowerCase() as any} title={risk.label}>
                  System identified {risk.label.toLowerCase()} profile for this case.
                </Alert>
              ))}
              <Card>
                <Card.Header><h4 className="font-bold">Claim Description</h4></Card.Header>
                <Card.Content>
                  <p className="text-sm text-neutral-600 leading-relaxed">{summary.description}</p>
                </Card.Content>
              </Card>
              <Card>
                <Card.Header><h4 className="font-bold">Investigator Observations</h4></Card.Header>
                <Card.Content>
                  <p className="text-sm text-neutral-500 italic">{workspace.investigationNotes}</p>
                </Card.Content>
              </Card>
            </div>
          )}

          {activeTab === 'financials' && (
             <div className="space-y-6 animate-entrance">
                <Card>
                   <Card.Header><h4 className="font-bold">Financial Lifecycle</h4></Card.Header>
                   <Card.Content className="p-0">
                      <div className="divide-y divide-neutral-50">
                         <div className="p-6 flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Customer Requested Amount</span>
                            <span className="font-bold text-neutral-900">${financials.requestedAmount.toLocaleString()}</span>
                         </div>
                         <div className="p-6 flex justify-between items-center">
                            <span className="text-sm text-neutral-500">Investigator Estimated Loss</span>
                            <span className="font-bold text-neutral-900">${financials.estimatedLoss.toLocaleString()}</span>
                         </div>
                         <div className="p-6 flex justify-between items-center bg-brand-50/20">
                            <span className="text-sm font-bold text-brand-700">Recommended Approval Amount</span>
                            <span className="text-xl font-black text-brand-600">${financials.recommendedAmount.toLocaleString()}</span>
                         </div>
                      </div>
                   </Card.Content>
                </Card>

                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-neutral-400" />
                      <span className="text-sm text-neutral-600">Final approved amount will be set during manager approval.</span>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'policy' && (
            <div className="space-y-6 animate-entrance">
               <Card>
                  <Card.Header><h4 className="font-bold">Policy Validation Checklist</h4></Card.Header>
                  <Card.Content className="space-y-4">
                     {[
                       { label: 'Policy active on incident date', status: true },
                       { label: 'Waiting period completed', status: workspace.policySummary.waitingPeriodMet },
                       { label: 'Incident type covered under plan', status: true },
                       { label: 'Coverage limits sufficient', status: true },
                     ].map((item, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100">
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.status ? <CheckCircle2 className="text-success-500 h-5 w-5" /> : <AlertCircle className="text-danger-500 h-5 w-5" />}
                       </div>
                     ))}
                  </Card.Content>
               </Card>

               <Card variant="outlined">
                  <Card.Content className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-brand-600" />
                      <span className="text-sm font-bold">{workspace.policySummary.number} • {workspace.policySummary.productName}</span>
                    </div>
                    <Link to={`/staff/policies/${workspace.policySummary.id}`}>
                      <Button variant="ghost" size="sm">View Contract <ExternalLink className="h-3 w-3 ml-2" /></Button>
                    </Link>
                  </Card.Content>
               </Card>
            </div>
          )}
        </div>

        {/* Action Panel */}
        <aside className="space-y-6 lg:sticky lg:top-24">
           <Card className="border-brand-100 bg-brand-50/10">
              <Card.Header className="bg-transparent border-none">
                 <h4 className="font-bold text-neutral-900">Case Decisions</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3 pt-0">
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
              <Card.Header className="bg-transparent border-none pb-0"><h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400">Claimant</h4></Card.Header>
              <Card.Content className="p-4 space-y-4">
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
        </aside>
      </div>
    </div>
  );
};

export default ClaimWorkspaceStaff;
