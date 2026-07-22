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
  Clock,
  CheckCircle2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { Alert } from '../../../components/molecules/Alert';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getClaimWorkspace } from '../../../mocks/claims';
import { cn } from '../../../utils/cn';

const ClaimDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'timeline' | 'financials'>('overview');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['claim-workspace', id],
    queryFn: () => getClaimWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={8} />;
  if (!workspace) return <div>Claim not found</div>;

  const { summary: claim } = workspace;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'evidence', label: 'Evidence & Docs', icon: FileText },
    { id: 'financials', label: 'Financials', icon: CreditCard },
    { id: 'timeline', label: 'Case History', icon: History },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <Link to="/portal/claims" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Claims
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{claim.claimNumber}</h1>
              <Badge variant="info">{claim.status.replace('_', ' ')}</Badge>
            </div>
            <p className="text-sm text-neutral-500">{claim.type} • Policy: {claim.policyNumber}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {workspace.actions.canUploadEvidence && (
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Evidence
            </Button>
          )}
        </div>
      </div>

      {claim.status === 'AWAITING_CUSTOMER' && (
        <Alert variant="warning" title="Action Required">
          Our adjusters need more information to proceed with your claim. Please review the case history for specific document requests.
        </Alert>
      )}

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
                  <h4 className="font-bold text-neutral-900">Incident Description</h4>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {claim.description}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-neutral-50">
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Incident Date</p>
                      <p className="text-sm font-bold text-neutral-900">{new Date(claim.incidentDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Submitted On</p>
                      <p className="text-sm font-bold text-neutral-900">{new Date(claim.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <h4 className="font-bold text-neutral-900">Adjuster Notes</h4>
                </Card.Header>
                <Card.Content>
                  <p className="text-sm text-neutral-500 italic italic">
                    Investigation in progress. Initial verification of hospital records completed.
                  </p>
                </Card.Content>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <Card.Header>
                  <h4 className="font-bold text-neutral-900">Policy Context</h4>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <Shield className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{claim.policyNumber}</p>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Active Coverage</p>
                    </div>
                  </div>
                  <Link to={`/portal/policies/${claim.policyId}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2">View Policy Details</Button>
                  </Link>
                </Card.Content>
              </Card>

              <Card className="bg-brand-900 text-white border-none">
                 <Card.Content className="p-6 text-center space-y-4">
                    <CheckCircle2 className="h-10 w-10 mx-auto text-brand-300" />
                    <div>
                      <h5 className="font-bold text-lg">Need Assistance?</h5>
                      <p className="text-xs text-brand-200 mt-1">Chat with your assigned adjuster Sarah for real-time updates.</p>
                    </div>
                    <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
                      Connect with Support
                    </Button>
                 </Card.Content>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'financials' && (
          <div className="max-w-4xl space-y-6 animate-entrance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card>
                  <Card.Header>
                    <h4 className="font-bold text-neutral-900">Financial Summary</h4>
                  </Card.Header>
                  <Card.Content className="space-y-6">
                     <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                        <span className="text-sm text-neutral-500">Requested Amount</span>
                        <span className="text-lg font-bold text-neutral-900">${workspace.financials.requestedAmount.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                        <span className="text-sm text-neutral-500">Estimated Loss</span>
                        <span className="text-lg font-bold text-neutral-900">${workspace.financials.estimatedLoss.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-brand-600 font-bold">Approved Amount</span>
                        <span className="text-2xl font-black text-brand-600">${workspace.financials.approvedAmount.toLocaleString()}</span>
                     </div>
                  </Card.Content>
               </Card>

               <Card className={cn(workspace.financials.settlementStatus === 'PAID' ? "bg-success-50 border-success-100" : "bg-neutral-50")}>
                  <Card.Header className="bg-transparent border-none">
                    <h4 className="font-bold text-neutral-900">Settlement Details</h4>
                  </Card.Header>
                  <Card.Content className="flex flex-col items-center justify-center py-8 space-y-4">
                     {workspace.financials.settlementStatus === 'PAID' ? (
                        <>
                          <div className="h-16 w-16 rounded-full bg-success-100 flex items-center justify-center text-success-600">
                             <CheckCircle2 className="h-8 w-8" />
                          </div>
                          <div className="text-center">
                             <p className="text-sm font-bold text-success-700 uppercase tracking-widest">Paid & Settled</p>
                             <p className="text-xs text-success-600 mt-1">Transaction ID: TXN-009988</p>
                          </div>
                        </>
                     ) : (
                        <>
                          <div className="h-16 w-16 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                             <Clock className="h-8 w-8" />
                          </div>
                          <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Pending Approval</p>
                        </>
                     )}
                  </Card.Content>
               </Card>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-entrance">
            {workspace.evidence.map((doc) => (
              <Card key={doc.id} className="relative group">
                <Card.Content className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-neutral-400 group-hover:text-brand-600 transition-colors" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{doc.title}</p>
                      <Badge variant="neutral" size="sm" className="mt-1">{doc.status}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" isIconOnly>
                    <Download className="h-4 w-4" />
                  </Button>
                </Card.Content>
              </Card>
            ))}
            {workspace.actions.canUploadEvidence && (
              <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-neutral-100 bg-neutral-50/30 hover:border-brand-200 hover:bg-brand-50/20 transition-all group">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm text-neutral-400 group-hover:text-brand-600 transition-colors">
                   <Plus className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-neutral-500 group-hover:text-brand-700 transition-colors">Upload Additional Evidence</span>
              </button>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <Card className="animate-entrance">
            <Card.Content className="p-8">
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-neutral-100">
                {workspace.timeline.map((event) => (
                  <div key={event.id} className="relative flex items-start gap-8 group">
                    <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-white border-4 border-neutral-100 shadow-sm z-10">
                      <div className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        event.type === 'APPROVED' ? "bg-success-500" :
                        event.type === 'REJECTED' ? "bg-danger-500" :
                        event.type === 'NEED_INFO' ? "bg-warning-500" : "bg-brand-500"
                      )} />
                    </div>
                    <div className="ml-12 pt-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-neutral-900">{event.type.replace('_', ' ')}</span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                          {new Date(event.timestamp).toLocaleString()} by {event.actor}
                        </span>
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

export default ClaimDetail;
