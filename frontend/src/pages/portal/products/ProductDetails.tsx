import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { Alert } from '../../../components/molecules/Alert';
import { EligibilitySummary } from '../../../components/molecules/EligibilitySummary';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getProductById } from '../../../mocks/products';
import { cn } from '../../../utils/cn';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'coverage' | 'eligibility' | 'exclusions'>('overview');

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton variant="list" count={8} />;
  if (!product) return <div>Product not found</div>;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'coverage', label: 'Coverage & Features' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'exclusions', label: 'Exclusions' },
  ] as const;

  return (
    <div className="space-y-8 animate-entrance">
      <Link to="/portal/products" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Plans
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 space-y-8 min-w-0">
          <div className="flex items-start gap-6">
            <div className="h-20 w-20 rounded-3xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
              <Shield className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-neutral-900">{product.name}</h1>
                <Badge variant={product.isRecommended ? 'brand' : 'neutral'}>{product.category}</Badge>
              </div>
              <p className="text-lg text-neutral-500 max-w-2xl">{product.shortDescription}</p>
            </div>
          </div>

          <div className="flex border-b border-neutral-100 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-entrance">
                <div className="prose prose-slate max-w-none text-neutral-600 leading-relaxed">
                  <p>{product.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card variant="outlined">
                    <Card.Content className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-brand-600 font-bold">
                        <Clock className="h-5 w-5" />
                        <span>Policy Terms</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-500">Waiting Period</span>
                          <span className="font-bold text-neutral-900">{product.waitingPeriodDays} Days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-500">Available Frequencies</span>
                          <span className="font-bold text-neutral-900">{product.premiumFrequencies.join(', ')}</span>
                        </div>
                      </div>
                    </Card.Content>
                  </Card>

                  <Card variant="outlined">
                    <Card.Content className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-brand-600 font-bold">
                        <FileText className="h-5 w-5" />
                        <span>Required Documents</span>
                      </div>
                      <ul className="space-y-1">
                        {product.requiredDocuments.map((doc) => (
                          <li key={doc} className="text-sm flex items-center gap-2 text-neutral-600">
                            <CheckCircle2 className="h-4 w-4 text-success-500" /> {doc}
                          </li>
                        ))}
                      </ul>
                    </Card.Content>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'coverage' && (
              <div className="space-y-6 animate-entrance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, i) => (
                    <Card key={i} variant={feature.isIncluded ? 'default' : 'outlined'} className={cn(!feature.isIncluded && 'opacity-60')}>
                      <Card.Content className="p-6 flex gap-4">
                        {feature.isIncluded ? (
                          <CheckCircle2 className="h-6 w-6 text-success-500 shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-danger-500 shrink-0" />
                        )}
                        <div className="space-y-1">
                          <p className="font-bold text-neutral-900">{feature.title}</p>
                          <p className="text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="max-w-xl animate-entrance">
                <EligibilitySummary eligibility={product.eligibility} />
              </div>
            )}

            {activeTab === 'exclusions' && (
              <div className="space-y-4 animate-entrance">
                <Alert variant="warning" title="What's not covered">
                  Please review the policy exclusions carefully before purchasing to ensure this plan meets your expectations.
                </Alert>
                <div className="grid grid-cols-1 gap-3">
                  {product.exclusions.map((exclusion, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-neutral-100 bg-white">
                      <AlertCircle className="h-5 w-5 text-danger-400" />
                      <span className="text-sm font-medium text-neutral-700">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Sidebar */}
        <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24">
          <Card className="ring-4 ring-brand-50 border-brand-100">
            <Card.Header>
              <h4 className="font-bold text-neutral-900">Purchase Summary</h4>
            </Card.Header>
            <Card.Content className="p-8 space-y-8">
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Premium Starts At</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-brand-600">${product.basePremium}</span>
                  <span className="text-neutral-400 font-bold">/mo</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-neutral-50 text-sm">
                  <span className="text-neutral-500">Coverage Limit</span>
                  <span className="font-bold text-neutral-900">Up to ${ (product.maxCoverage / 1000000).toFixed(1) }M</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-50 text-sm">
                  <span className="text-neutral-500">Category</span>
                  <span className="font-bold text-neutral-900">{product.category}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-50 text-sm">
                  <span className="text-neutral-500">Waiting Period</span>
                  <span className="font-bold text-neutral-900">{product.waitingPeriodDays} Days</span>
                </div>
              </div>

              <Link to={`/portal/products/${product.id}/purchase`}>
                <Button className="w-full h-14 text-lg">
                  Buy This Plan <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <div className="bg-neutral-50 p-4 rounded-xl flex gap-3">
                <Info className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Final premium may vary based on your age, location, and specific medical conditions.
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
