import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ClipboardList,
  Zap,
  CreditCard,
  Users,
  FileText,
  ShieldAlert,
  History,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Send,
  Save,
  Trash2,
  Copy,
  Plus,
  ExternalLink
} from 'lucide-react';
import { WorkspaceShell } from '../../components/organisms/WorkspaceShell';
import { Card } from '../../components/atoms/Card';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { Alert } from '../../components/molecules/Alert';
import { LoadingSkeleton } from '../../components/molecules/LoadingSkeleton';
import { getProductWorkspace } from '../../mocks/products';
import { cn } from '../../utils/cn';

const ProductBuilderStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'general' | 'coverage' | 'premium' | 'eligibility' | 'docs' | 'exclusions' | 'versions' | 'preview'>('general');

  const { data: workspace, isLoading } = useQuery({
    queryKey: ['staff-product-workspace', id],
    queryFn: () => getProductWorkspace(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={10} />;
  if (!workspace) return <div>Product not found</div>;

  const { summary } = workspace;

  const tabs = [
    { id: 'general', label: 'General', icon: ClipboardList },
    { id: 'coverage', label: 'Coverage', icon: Zap },
    { id: 'premium', label: 'Premium Rules', icon: CreditCard },
    { id: 'eligibility', label: 'Eligibility', icon: Users },
    { id: 'docs', label: 'Required Documents', icon: FileText },
    { id: 'exclusions', label: 'Exclusions', icon: ShieldAlert },
    { id: 'versions', label: 'History', icon: History },
    { id: 'preview', label: 'Preview', icon: Eye },
  ] as const;

  const statusVariants: Record<string, any> = {
    ACTIVE: 'success',
    DRAFT: 'brand',
    UNDER_REVIEW: 'warning',
    DEPRECATED: 'neutral',
  };

  return (
    <WorkspaceShell
      title={summary.name}
      id={summary.id}
      status={summary.status}
      statusVariant={statusVariants[summary.status]}
      backLink={{ label: 'Back to Catalog', href: '/staff/products' }}
      icon={ClipboardList}
      subtitle={`Version ${summary.version}.0 • ${summary.category}`}
      summaryItems={[
        { label: 'Category', value: summary.category },
        { label: 'Base Premium', value: `$${summary.basePremium}` },
        { label: 'Max Coverage', value: `$${(summary.maxCoverage / 1000000).toFixed(1)}M` },
        { label: 'Waiting Period', value: `${summary.waitingPeriodDays} Days` },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      actions={
        <>
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
        </>
      }
      rightSidebar={
        <div className="space-y-6">
           <Card className="border-brand-100 bg-brand-50/10">
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-neutral-900">Product Lifecycle</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3">
                 {workspace.actions.canSubmitForReview && (
                   <Button className="w-full justify-start" variant="primary">
                     <Send className="h-4 w-4 mr-3" /> Submit for Review
                   </Button>
                 )}
                 {workspace.actions.canApprove && (
                   <Button className="w-full justify-start bg-success-600 hover:bg-success-700 text-white border-none shadow-sm">
                     <CheckCircle2 className="h-4 w-4 mr-3" /> Approve & Publish
                   </Button>
                 )}
                 {workspace.actions.canClone && (
                   <Button className="w-full justify-start" variant="outline">
                     <Copy className="h-4 w-4 mr-3" /> Create New Version
                   </Button>
                 )}
                 {workspace.actions.canArchive && (
                   <Button className="w-full justify-start text-danger-600 border-danger-100 hover:bg-danger-50" variant="outline">
                     <Trash2 className="h-4 w-4 mr-3" /> Archive Product
                   </Button>
                 )}
              </Card.Content>
           </Card>

           <Card>
              <Card.Header className="bg-transparent border-none pb-0">
                 <h4 className="font-bold text-xs uppercase tracking-widest text-neutral-400">Publish Validation</h4>
              </Card.Header>
              <Card.Content className="p-4 space-y-3">
                 {[
                   { label: 'General Info', ok: workspace.validation.isGeneralComplete },
                   { label: 'Coverage Limits', ok: workspace.validation.isCoverageComplete },
                   { label: 'Premium Rates', ok: workspace.validation.isPremiumComplete },
                   { label: 'Eligibility Info', ok: workspace.validation.isEligibilityComplete },
                 ].map(v => (
                   <div key={v.label} className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">{v.label}</span>
                      {v.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-success-500" /> : <AlertTriangle className="h-3.5 w-3.5 text-warning-400" />}
                   </div>
                 ))}
              </Card.Content>
           </Card>
        </div>
      }
    >
      {activeTab === 'general' && (
        <div className="space-y-6 animate-entrance">
           <Card variant="outlined">
              <Card.Header><h4 className="font-bold">Marketing & Identity</h4></Card.Header>
              <Card.Content className="space-y-4">
                 <p className="text-sm text-neutral-600 leading-relaxed">{summary.description}</p>
                 <div className="pt-4 border-t border-neutral-50 grid grid-cols-2 gap-4">
                    <div>
                       <p className="text-[10px] font-bold text-neutral-400 uppercase">Short Description</p>
                       <p className="text-sm text-neutral-700 mt-1">{summary.shortDescription}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-neutral-400 uppercase">Product Category</p>
                       <Badge variant="neutral" className="mt-1">{summary.category}</Badge>
                    </div>
                 </div>
              </Card.Content>
           </Card>
        </div>
      )}

      {activeTab === 'premium' && (
        <div className="space-y-6 animate-entrance">
           <Card variant="outlined">
              <Card.Header><h4 className="font-bold">Billing Configuration</h4></Card.Header>
              <Card.Content className="space-y-6">
                 <div className="flex justify-between items-center py-2 border-b border-neutral-50">
                    <span className="text-sm text-neutral-500">Base Premium (Monthly)</span>
                    <span className="text-lg font-bold text-neutral-900">${summary.basePremium}</span>
                 </div>
                 <div className="space-y-3">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Enabled Frequencies</p>
                    <div className="flex flex-wrap gap-2">
                       {summary.premiumFrequencies.map(f => (
                         <Badge key={f} variant="brand">{f}</Badge>
                       ))}
                    </div>
                 </div>
              </Card.Content>
           </Card>
        </div>
      )}

      {activeTab === 'exclusions' && (
        <div className="space-y-4 animate-entrance">
           <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-neutral-900 text-lg">Product Exclusions</h4>
              <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Exclusion</Button>
           </div>
           <div className="grid grid-cols-1 gap-3">
              {summary.exclusions.map((ex, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 bg-white">
                   <span className="text-sm text-neutral-700">{ex}</span>
                   <Button variant="ghost" size="sm" isIconOnly className="text-neutral-400"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="p-12 border-2 border-dashed border-neutral-100 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
           <div className="h-16 w-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-300">
              <Eye className="h-8 w-8" />
           </div>
           <div>
              <h4 className="font-bold text-neutral-900">Customer Preview Mode</h4>
              <p className="text-sm text-neutral-500 max-w-xs mx-auto">This will show exactly what the customer sees in the product catalog.</p>
           </div>
           <Link to={`/portal/products/${summary.id}`}>
             <Button variant="outline" size="sm">Open Public View <ExternalLink className="h-4 w-4 ml-2" /></Button>
           </Link>
        </div>
      )}
    </WorkspaceShell>
  );
};

export default ProductBuilderStaff;
