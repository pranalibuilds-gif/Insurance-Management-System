import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { Spinner } from '../../../components/atoms/Spinner';
import { Alert } from '../../../components/molecules/Alert';
import { EligibilitySummary } from '../../../components/molecules/EligibilitySummary';
import { getProductById } from '../../../mocks/products';
import { getCustomerProfile } from '../../../mocks/customers';
import {
  saveDraft,
  getDraft,
  calculatePremiumSnapshot,
  evaluateEligibility,
  generatePurchaseReference
} from '../../../features/purchase/wizardStore';
import { PurchaseDraft, StepStatus } from '../../../types/wizard';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Users,
  FileText,
  CreditCard,
  AlertCircle,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { cn } from '../../../utils/cn';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Product', icon: Shield },
  { id: 2, title: 'Coverage', icon: Zap },
  { id: 3, title: 'Eligibility', icon: ClipboardCheck },
  { id: 4, title: 'Nominees', icon: Users },
  { id: 5, title: 'Documents', icon: FileText },
  { id: 6, title: 'Review', icon: AlertCircle },
  { id: 7, title: 'Payment', icon: CreditCard },
  { id: 8, title: 'Confirm', icon: CheckCircle2 },
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
      toast('Resumed your purchase progress.', { icon: '🔄' });
    } else if (product) {
      const initialDraft: PurchaseDraft = {
        productId: product.id,
        coverageAmount: product.minCoverage,
        premiumFrequency: product.premiumFrequencies[0],
        selectedNominees: [],
        selectedDocumentIds: {},
        currentStep: 1,
        stepStatuses: { 1: 'IN_PROGRESS' },
        purchaseReference: generatePurchaseReference(),
        lastSaved: new Date().toISOString(),
        isComplete: false,
      };
      setDraft(initialDraft);
    }
  }, [product, productId]);

  // Snapshot logic whenever state changes
  useEffect(() => {
    if (draft && product && customer) {
      const pricing = calculatePremiumSnapshot(draft.coverageAmount, draft.premiumFrequency);
      const eligibility = evaluateEligibility(product, customer, draft);

      const updated = {
        ...draft,
        pricingSnapshot: pricing,
        eligibilitySnapshot: eligibility,
        lastSaved: new Date().toISOString()
      };

      if (JSON.stringify(updated) !== JSON.stringify(draft)) {
        setDraft(updated);
        saveDraft(updated);
      }
    }
  }, [draft?.coverageAmount, draft?.premiumFrequency, draft?.selectedNominees.length, product, customer]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      const updatedStatuses = { ...draft?.stepStatuses, [currentStep]: 'COMPLETED' as StepStatus, [nextStep]: 'IN_PROGRESS' as StepStatus };
      setCurrentStep(nextStep);
      if (draft) {
        setDraft({ ...draft, currentStep: nextStep, stepStatuses: updatedStatuses });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isLoadingProduct || !draft || !product) return <Spinner variant="centered" />;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-entrance pb-20">
      <PageHeader
        title={product.name}
        description={`Reference: ${draft.purchaseReference}`}
      />

      {/* Modern Stepper */}
      <div className="flex items-center justify-between px-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const status = draft.stepStatuses[step.id] || 'NOT_STARTED';
          const isActive = currentStep === step.id;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center transition-all border-2',
                  isActive ? 'bg-brand-600 border-brand-600 text-white ring-4 ring-brand-100' :
                  status === 'COMPLETED' ? 'bg-success-500 border-success-500 text-white' :
                  'bg-white border-neutral-200 text-neutral-400'
                )}>
                  {status === 'COMPLETED' ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={cn(
                  'text-[10px] font-bold uppercase tracking-widest',
                  isActive ? 'text-brand-600' : status === 'COMPLETED' ? 'text-success-600' : 'text-neutral-400'
                )}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 min-w-[15px] mx-2 -mt-6',
                  draft.stepStatuses[step.id] === 'COMPLETED' ? 'bg-success-500' : 'bg-neutral-100'
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          <Card className="min-h-[450px]">
            <Card.Header className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-neutral-900">{steps[currentStep-1].title}</h3>
              <Badge variant="info">Step {currentStep} of {steps.length}</Badge>
            </Card.Header>
            <Card.Content>
              {currentStep === 1 && (
                <div className="space-y-6 animate-entrance">
                   <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 flex gap-4">
                      <Shield className="h-10 w-10 text-brand-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-neutral-900">{product.name}</h4>
                        <p className="text-sm text-neutral-600">{product.shortDescription}</p>
                      </div>
                    </div>
                    <Alert variant="info">
                      You are currently configuring this plan. You can change your product selection back in the catalogue.
                    </Alert>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-10 animate-entrance">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Coverage Amount</label>
                      <span className="text-2xl font-black text-brand-600">${draft.coverageAmount.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={product.minCoverage}
                      max={product.maxCoverage}
                      step={50000}
                      value={draft.coverageAmount}
                      onChange={(e) => setDraft({...draft, coverageAmount: Number(e.target.value)})}
                      className="w-full h-3 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Payment Frequency</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {product.premiumFrequencies.map(freq => (
                        <button
                          key={freq}
                          onClick={() => setDraft({...draft, premiumFrequency: freq})}
                          className={cn(
                            "px-4 py-4 rounded-xl border-2 text-xs font-bold transition-all",
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

              {currentStep === 3 && (
                <div className="space-y-6 animate-entrance">
                  <Alert variant="info" title="Pre-Purchase Validation">
                    Our system is verifying your eligibility for the {product.name} based on your profile and selected coverage.
                  </Alert>
                  <EligibilitySummary
                    eligibility={product.eligibility}
                    customerAge={35} // Mock age from customer profile
                    isKYCVerified={customer?.kycStatus === 'VERIFIED'}
                    hasDocuments={Object.keys(draft.selectedDocumentIds).length > 0}
                  />
                  {!draft.eligibilitySnapshot?.overallStatus && (
                    <Alert variant="warning">
                      Please ensure all eligibility requirements are met before proceeding to payment.
                    </Alert>
                  )}
                </div>
              )}

              {currentStep > 3 && (
                <div className="py-20 text-center space-y-4">
                   <div className="h-20 w-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                      <Spinner size="lg" />
                   </div>
                   <p className="text-neutral-500 font-medium italic">Building Step: {steps[currentStep-1].title}...</p>
                </div>
              )}
            </Card.Content>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous Step
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length}>
              {currentStep === 6 ? 'Proceed to Payment' : currentStep === 7 ? 'Authorize' : 'Save & Continue'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Dynamic Pricing Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="bg-neutral-900 text-white border-none shadow-xl">
            <Card.Header className="border-white/10 bg-white/5">
              <h4 className="font-bold uppercase tracking-widest text-[10px] text-neutral-400">Policy Snapshot</h4>
            </Card.Header>
            <Card.Content className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Estimated Premium</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-black text-white">
                    ${draft.pricingSnapshot?.totalAmount.toLocaleString()}
                  </span>
                  <span className="text-neutral-500 text-xs font-bold">/{draft.premiumFrequency.toLowerCase()}</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500">Coverage</span>
                  <span>${draft.coverageAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500">Frequency</span>
                  <span>{draft.premiumFrequency}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500">Tax (18%)</span>
                  <span>${draft.pricingSnapshot?.taxes.toLocaleString()}</span>
                </div>
              </div>
            </Card.Content>
            <Card.Footer className="border-white/10 bg-white/5 text-center">
               <p className="text-[10px] text-neutral-500 italic">Values are based on your current selection.</p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseWizard;
