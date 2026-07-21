import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { Spinner } from '../../../components/atoms/Spinner';
import { getProductById } from '../../../mocks/products';
import { getCustomerProfile } from '../../../mocks/customers';
import { saveDraft, getDraft, clearDraft, calculatePremium } from '../../../features/purchase/wizardStore';
import { PurchaseDraft } from '../../../types/wizard';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Users,
  FileText,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import toast from 'react-hot-toast';

// Steps components would be imported here
// For now we will implement logic in one file and refactor if needed

const steps = [
  { id: 1, title: 'Plan', icon: Shield },
  { id: 2, title: 'Coverage', icon: CreditCard },
  { id: 3, title: 'Nominees', icon: Users },
  { id: 4, title: 'Documents', icon: FileText },
  { id: 5, title: 'Review', icon: AlertCircle },
  { id: 6, title: 'Payment', icon: CreditCard },
  { id: 7, title: 'Confirmation', icon: CheckCircle2 },
];

const PurchaseWizard: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<PurchaseDraft | null>(null);

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
  });

  const { data: customer } = useQuery({
    queryKey: ['customer-profile'],
    queryFn: getCustomerProfile,
  });

  useEffect(() => {
    const savedDraft = getDraft();
    if (savedDraft && savedDraft.productId === productId && !savedDraft.isComplete) {
      setDraft(savedDraft);
      setCurrentStep(savedDraft.currentStep);
      toast('Welcome back! We restored your progress.', { icon: '👋' });
    } else if (product) {
      const initialDraft: PurchaseDraft = {
        productId: product.id,
        coverageAmount: product.minCoverage,
        premiumFrequency: product.premiumFrequencies[0],
        selectedNomineeIds: [],
        uploadedDocumentIds: [],
        currentStep: 1,
        lastSaved: new Date().toISOString(),
        isComplete: false,
      };
      setDraft(initialDraft);
    }
  }, [product, productId]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (draft) {
        const updated = { ...draft, currentStep: nextStep, lastSaved: new Date().toISOString() };
        setDraft(updated);
        saveDraft(updated);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
    }
  };

  if (isLoadingProduct || !draft || !product) return <Spinner variant="centered" />;

  const premium = calculatePremium(draft.coverageAmount, draft.premiumFrequency);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-entrance pb-20">
      <PageHeader
        title={`Purchase: ${product.name}`}
        description="Follow the steps below to secure your insurance coverage."
      />

      {/* Stepper */}
      <div className="flex items-center justify-between px-2 overflow-x-auto scrollbar-hide">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 group min-w-[80px]">
                <div className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center transition-all border-2',
                  isActive ? 'bg-brand-600 border-brand-600 text-white ring-4 ring-brand-100' :
                  isCompleted ? 'bg-success-500 border-success-500 text-white' :
                  'bg-white border-neutral-200 text-neutral-400'
                )}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={cn(
                  'text-[10px] font-bold uppercase tracking-widest transition-colors',
                  isActive ? 'text-brand-600' : isCompleted ? 'text-success-600' : 'text-neutral-400'
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 min-w-[20px] mx-2 -mt-6 transition-colors',
                  currentStep > step.id ? 'bg-success-500' : 'bg-neutral-100'
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Step Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[400px]">
            <Card.Header>
              <h3 className="text-xl font-bold text-neutral-900">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h3>
            </Card.Header>
            <Card.Content>
              {currentStep === 1 && (
                 <div className="space-y-6 animate-entrance">
                    <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex gap-4">
                      <Shield className="h-10 w-10 text-brand-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-neutral-900">{product.name}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{product.shortDescription}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Category</p>
                        <p className="text-sm font-bold text-neutral-900">{product.category}</p>
                      </div>
                      <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Waiting Period</p>
                        <p className="text-sm font-bold text-neutral-900">{product.waitingPeriodDays} Days</p>
                      </div>
                    </div>
                 </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8 animate-entrance">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-neutral-700">Coverage Amount: ${draft.coverageAmount.toLocaleString()}</label>
                    <input
                      type="range"
                      min={product.minCoverage}
                      max={product.maxCoverage}
                      step={50000}
                      value={draft.coverageAmount}
                      onChange={(e) => setDraft({...draft, coverageAmount: Number(e.target.value)})}
                      className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                    <div className="flex justify-between text-xs text-neutral-400 font-bold">
                      <span>Min: ${product.minCoverage.toLocaleString()}</span>
                      <span>Max: ${product.maxCoverage.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-neutral-700">Premium Frequency</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {product.premiumFrequencies.map(freq => (
                        <button
                          key={freq}
                          onClick={() => setDraft({...draft, premiumFrequency: freq})}
                          className={cn(
                            "px-4 py-3 rounded-xl border-2 text-xs font-bold transition-all",
                            draft.premiumFrequency === freq
                              ? "border-brand-600 bg-brand-50 text-brand-700"
                              : "border-neutral-100 text-neutral-400 hover:border-neutral-200"
                          )}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep > 2 && (
                <div className="py-20 text-center space-y-4">
                   <div className="h-16 w-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                      <Spinner size="md" />
                   </div>
                   <p className="text-neutral-500 font-medium italic">Implementing Logic for {steps[currentStep-1].title}...</p>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || currentStep === steps.length}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length}>
              {currentStep === 5 ? 'Proceed to Payment' : currentStep === 6 ? 'Finalize' : 'Continue'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="bg-neutral-900 text-white border-none shadow-xl shadow-brand-900/10">
            <Card.Header className="border-white/10 bg-white/5">
              <h4 className="font-bold">Premium Estimate</h4>
            </Card.Header>
            <Card.Content className="p-6 space-y-6">
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-white">${premium.totalAmount.toLocaleString()}</span>
                  <span className="text-neutral-400 text-sm font-bold">/{draft.premiumFrequency.toLowerCase()}</span>
                </div>
                <p className="text-neutral-500 text-[10px] mt-1 uppercase tracking-widest font-bold italic">Inc. 18% GST</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-400">Base Premium</span>
                  <span>${premium.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-400">Taxes & Fees</span>
                  <span>${premium.taxes.toLocaleString()}</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <h4 className="font-bold text-neutral-900">Eligibility Status</h4>
            </Card.Header>
            <Card.Content className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-success-500" />
                <span className="text-xs font-medium text-neutral-600">KYC Verified</span>
              </div>
              <div className={cn(
                "flex items-center gap-3",
                currentStep >= 3 ? "text-success-600" : "text-neutral-400"
              )}>
                <div className={cn("h-2 w-2 rounded-full", currentStep >= 3 ? "bg-success-500" : "bg-neutral-200")} />
                <span className="text-xs font-medium">Nominees Assigned</span>
              </div>
              <div className={cn(
                "flex items-center gap-3",
                currentStep >= 4 ? "text-success-600" : "text-neutral-400"
              )}>
                <div className={cn("h-2 w-2 rounded-full", currentStep >= 4 ? "bg-success-500" : "bg-neutral-200")} />
                <span className="text-xs font-medium">Documents Uploaded</span>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseWizard;
