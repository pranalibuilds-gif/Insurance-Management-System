import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Shield,
  CreditCard,
  FileText,
  Activity,
  History,
  Settings,
  MessageSquare,
  AlertTriangle,
  Download,
  Calendar,
  Zap,
  Ban,
  FileCheck,
  User
} from 'lucide-react';
import { WorkspaceShell } from '../../components/organisms/WorkspaceShell';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { DataTable } from '../../components/organisms/DataTable';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getPolicyWorkspace } from '../../mocks/policies';
import { cn } from '../../utils/cn';

const PolicyWorkspaceStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'billing' | 'claims' | 'documents' | 'timeline' | 'history' | 'notes'>('overview');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['staff-policy-workspace', id],
    queryFn: () => getPolicyWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;
  if (!workspace) return <div>Policy not found</div>;

  const { summary, customerSummary, billingSummary, coverage } = workspace;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'coverage', label: 'Coverage', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'claims', label: 'Claims', icon: Activity },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'history', label: 'Change History', icon: Settings },
    { id: 'notes', label: 'Notes', icon: MessageSquare },
  ] as const;

  const statusVariants: Record<string, any> = {
    ACTIVE: 'success',
    LAPSED: 'warning',
    CANCELLED: 'danger',
    EXPIRED: 'neutral',
  };

  return (
    <WorkspaceShell
      title={summary.policyNumber}
      id={summary.id}
      status={summary.status}
      statusVariant={statusVariants[summary.status]}
      backLink={{ label: 'Back to Global Policies', href: '/staff/policies' }}
      icon={Shield}
      subtitle={summary.productName}
      summaryItems={[
        { label: 'Customer', value: customerSummary.name },
        { label: 'Coverage', value: `$${summary.coverageAmount.toLocaleString()}` },
        { label: 'Premium Balance', value: `$${billingSummary.outstandingBalance}`, highlight: billingSummary.outstandingBalance > 0 },
        { label: 'Next Payment', value: new Date(billingSummary.nextInstallmentDate).toLocaleDateString() },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      riskIndicators={workspace.riskIndicators}
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> PDF Contract
          </Button>
        </>
      }
      rightSidebar={
        <>
          <Card className="border-brand-100 bg-brand-50/10">
            <Card.Header className="bg-transparent border-none">
              <h4 className="font-bold text-neutral-900">Policy Actions</h4>
            </Card.Header>
            <Card.Content className="p-4 space-y-3 pt-0">
               {workspace.actions.canRenew && (
                 <Button className="w-full justify-start" variant="primary">
                   <History className="h-4 w-4 mr-3" /> Manually Renew
                 </Button>
               )}
               {workspace.actions.canModify && (
                 <Button className="w-full justify-start" variant="outline">
                   <Settings className="h-4 w-4 mr-3" /> Modify Coverage
                 </Button>
               )}
               {workspace.actions.canCancel && (
                 <Button className="w-full justify-start text-danger-600 border-danger-100 hover:bg-danger-50" variant="outline">
                   <Ban className="h-4 w-4 mr-3" /> Force Cancel
                 </Button>
               )}
               <Button className="w-full justify-start" variant="ghost">
                  <Download className="h-4 w-4 mr-3" /> Regenerate Docs
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
                     <p className="text-sm font-bold text-neutral-900">{customerSummary.name}</p>
                     <Link to={`/staff/customers/${customerSummary.id}`} className="text-[10px] text-brand-600 font-bold hover:underline uppercase">View Profile</Link>
                  </div>
               </div>
            </Card.Content>
          </Card>
        </>
      }
    >
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-entrance">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="outlined">
                <Card.Header><h4 className="font-bold">Term Information</h4></Card.Header>
                <Card.Content className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Effective Date</span>
                      <span className="font-bold text-neutral-900">{new Date(summary.startDate).toLocaleDateString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Expiry Date</span>
                      <span className="font-bold text-neutral-900">{new Date(summary.endDate).toLocaleDateString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Renewal Eligibility</span>
                      <Badge variant={billingSummary.isRenewalEligible ? 'success' : 'neutral'}>
                        {billingSummary.isRenewalEligible ? 'Eligible' : 'Ineligible'}
                      </Badge>
                   </div>
                </Card.Content>
              </Card>

              <Card variant="outlined">
                <Card.Header><h4 className="font-bold">Financial Status</h4></Card.Header>
                <Card.Content className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Total Premium</span>
                      <span className="font-bold text-neutral-900">${coverage.basePremium.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Outstanding</span>
                      <span className="font-bold text-danger-600">${billingSummary.outstandingBalance}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Frequency</span>
                      <span className="font-bold text-neutral-900">{summary.premiumFrequency}</span>
                   </div>
                </Card.Content>
              </Card>
           </div>
        </div>
      )}

      {activeTab === 'coverage' && (
        <div className="space-y-6 animate-entrance">
           <Card>
              <Card.Header><h4 className="font-bold">Endorsements & Modifications</h4></Card.Header>
              <Card.Content className="p-0">
                <DataTable
                  columns={[
                    { header: 'Effective Date', accessor: 'effectiveDate' },
                    { header: 'Type', accessor: 'type' },
                    { header: 'Description', accessor: 'description' },
                    { header: 'Status', accessor: (e: any) => <Badge variant="success">{e.status}</Badge> },
                  ]}
                  data={coverage.endorsements}
                  emptyTitle="No Endorsements"
                  emptyDescription="No modifications have been made to this policy."
                />
              </Card.Content>
           </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <Card className="animate-entrance">
           <Card.Content className="p-0">
              <DataTable
                columns={[
                  { header: 'Date', accessor: (h: any) => new Date(h.changedAt).toLocaleString() },
                  { header: 'Field', accessor: 'field' },
                  { header: 'Old Value', accessor: 'oldValue' },
                  { header: 'New Value', accessor: 'newValue' },
                  { header: 'By', accessor: 'changedBy' },
                ]}
                data={workspace.changeHistory}
              />
           </Card.Content>
        </Card>
      )}
    </WorkspaceShell>
  );
};

export default PolicyWorkspaceStaff;
