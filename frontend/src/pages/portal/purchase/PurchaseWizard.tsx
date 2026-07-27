import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../../../components/molecules/PageHeader';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { Badge } from '../../../components/atoms/Badge';
import { Spinner } from '../../../components/atoms/Spinner';
import { Alert } from '../../../components/molecules/Alert';
import { EligibilitySummary } from '../../../components/molecules/EligibilitySummary';
import { serviceFactory } from '../../../services/serviceFactory';
import { QUERY_KEYS } from '../../../api/queryKeys';
import {
  generatePurchaseReference,
  mapNomineeToPurchase,
} from '../../../features/purchase/wizardStore';
import { PurchaseDraft, StepStatus, PurchaseDocumentReference, PurchaseNominee } from '../../../types/wizard';
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
  Zap,
  Paperclip,
  Receipt,
  ArrowRightCircle,
  XCircle,
  Clock,
  ExternalLink
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
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [draftId, setDraftId] = useState<string | null>(null);

  const purchaseService = serviceFactory.getPurchaseService();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.DETAIL(productId!),
    queryFn: () => serviceFactory.getProductService().getProductById(productId!),
    enabled: !!productId,
  });

  const { data: customer } = useQuery({
    queryKey: QUERY_KEYS.CUSTOMERS.PROFILE,
    queryFn: () => serviceFactory.getCustomerService().getProfile(),
  });

  const { data: userDocuments } = useQuery({
    queryKey: QUERY_KEYS.DOCUMENTS.LIST,
    queryFn: () => serviceFactory.getDocumentService().listDocuments(),
  });

  const { data: draft, isLoading: isLoadingDraft } = useQuery({
    queryKey: QUERY_KEYS.PURCHASE.DRAFT(draftId!),
    queryFn: () => purchaseService.getDraft(draftId!),
    enabled: !!draftId,
  });

  const createDraftMutation = useMutation({
    mutationFn: (pid: string) => purchaseService.createDraft(pid),
    onSuccess: (newDraft) => {
      setDraftId(newDraft.purchaseReference);
    }
  });

  const updateDraftMutation = useMutation({
    mutationFn: (data: Partial<PurchaseDraft>) => purchaseService.updateDraft(draftId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PURCHASE.DRAFT(draftId!) });
    }
  });

  const validateEligibilityQuery = useQuery({
    queryKey: QUERY_KEYS.PURCHASE.ELIGIBILITY(draftId!),
    queryFn: () => purchaseService.validateEligibility(draftId!),
    enabled: !!draftId && currentStep === 3,
  });

  const calculatePremiumQuery = useQuery({
    queryKey: QUERY_KEYS.PURCHASE.PRICING(draftId!),
    queryFn: () => purchaseService.calculatePremium(draftId!),
    enabled: !!draftId && currentStep >= 2,
  });

  const reviewQuery = useQuery({
    queryKey: QUERY_KEYS.PURCHASE.REVIEW(draftId!),
    queryFn: () => purchaseService.getReview(draftId!),
    enabled: !!draftId && currentStep === 6,
  });

  useEffect(() => {
    if (productId && !draftId && !createDraftMutation.isPending) {
       createDraftMutation.mutate(productId);
    }
  }, [productId]);

  const handleNext = async () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      await updateDraftMutation.mutateAsync({
        currentStep: nextStep,
        stepStatuses: { ...draft?.stepStatuses, [currentStep]: 'COMPLETED', [nextStep]: 'IN_PROGRESS' }
      });
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    if (!draftId || !draft) return;

    try {
      await purchaseService.processPayment(draftId, {
        method: 'CREDIT_CARD',
        amount: draft.pricingSnapshot?.totalAmount || 0,
        currency: 'USD'
      });
      await purchaseService.submitPurchase(draftId);

      toast.success('Purchase Successful!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POLICIES.MY });
      setCurrentStep(8);
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    }
  };

  if (isLoadingProduct || isLoadingDraft || !draft || !product || !customer) return <Spinner variant="centered" />;

  const totalNomineeShare = draft.selectedNominees.reduce((acc, n) => acc + n.sharePercentage, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-entrance pb-20">
      <PageHeader
        title={product.name}
        description={`Reference: ${draft.purchaseReference}`}
      />

      {currentStep < 8 && (
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
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className={cn("space-y-6", currentStep === 8 ? "lg:col-span-4" : "lg:col-span-3")}>
          <Card className="min-h-[450px]">
            {currentStep < 8 && (
              <Card.Header className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-neutral-900">{steps[currentStep-1].title}</h3>
                <Badge variant="info">Step {currentStep} of {steps.length}</Badge>
              </Card.Header>
            )}
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
                      onChange={(e) => updateDraftMutation.mutate({ coverageAmount: Number(e.target.value) })}
                      className="w-full h-3 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Payment Frequency</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {product.premiumFrequencies.map(freq => (
                        <button
                          key={freq}
                          onClick={() => updateDraftMutation.mutate({ premiumFrequency: freq })}
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

              {currentStep === 3 && validateEligibilityQuery.data && (
                <div className="space-y-6 animate-entrance">
                  <EligibilitySummary
                    eligibility={product.eligibility}
                    customerAge={35} // In real app use customer dob
                    isKYCVerified={customer?.kycStatus === 'VERIFIED'}
                    hasDocuments={draft.attachedDocuments.length > 0}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-entrance">
                  <div className="grid grid-cols-1 gap-4">
                    {customer?.nominees.map(n => {
                      const isSelected = draft.selectedNominees.some(sn => sn.id === n.id);
                      return (
                        <div
                          key={n.id}
                          onClick={() => {
                            const updated = isSelected
                              ? draft.selectedNominees.filter(sn => sn.id !== n.id)
                              : [...draft.selectedNominees, mapNomineeToPurchase(n)];
                            updateDraftMutation.mutate({ selectedNominees: updated });
                          }}
                          className={cn(
                            "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between",
                            isSelected ? "border-brand-600 bg-brand-50" : "border-neutral-100 hover:border-neutral-200"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", isSelected ? "border-brand-600 bg-brand-600 text-white" : "border-neutral-300")}>
                              {isSelected && <CheckCircle2 className="h-3 w-3" />}
                            </div>
                            <div>
                              <p className="font-bold text-neutral-900">{n.fullName}</p>
                              <p className="text-xs text-neutral-500">{n.relationship} • {n.sharePercentage}% Share</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 6 && reviewQuery.data && (
                <div className="space-y-8 animate-entrance">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h5 className="font-bold text-neutral-900 uppercase tracking-widest text-[10px]">Customer & Plan</h5>
                       <div className="space-y-2">
                          <p className="text-sm"><span className="text-neutral-500">Applicant:</span> <span className="font-bold">{reviewQuery.data.customer.fullName}</span></p>
                          <p className="text-sm"><span className="text-neutral-500">Product:</span> <span className="font-bold">{reviewQuery.data.product.name}</span></p>
                       </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-neutral-100">
                    <div className="flex items-start gap-3">
                       <input
                          type="checkbox"
                          checked={draft.declarationsAccepted}
                          onChange={() => updateDraftMutation.mutate({ declarationsAccepted: !draft.declarationsAccepted })}
                          className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                       />
                       <label className="text-sm text-neutral-600">I confirm that all information provided is accurate.</label>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-entrance">
                   <div className="h-20 w-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                      <CreditCard className="h-10 w-10" />
                   </div>
                   <Button size="lg" className="w-full max-w-xs" onClick={handlePayment}>
                      Pay & Authorize
                   </Button>
                </div>
              )}

              {currentStep === 8 && (
                <div className="py-8 space-y-10 animate-entrance text-center">
                   <div className="h-20 w-20 rounded-full bg-success-50 flex items-center justify-center text-success-600 border-4 border-success-100 mx-auto">
                      <CheckCircle2 className="h-12 w-12" />
                   </div>
                   <h3 className="text-3xl font-black text-neutral-900">Purchase Submitted!</h3>
                   <Button onClick={() => navigate('/portal/policies')}>Go to My Policies</Button>
                </div>
              )}
            </Card.Content>
          </Card>

          {currentStep < 8 && (
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous Step
              </Button>
              <Button
                onClick={handleNext}
                isLoading={updateDraftMutation.isPending}
                disabled={
                  currentStep >= 7 ||
                  (currentStep === 4 && totalNomineeShare !== 100) ||
                  (currentStep === 6 && !draft.declarationsAccepted)
                }
              >
                {currentStep === 6 ? 'Proceed to Payment' : 'Save & Continue'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        {currentStep < 8 && calculatePremiumQuery.data && (
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
                      ${calculatePremiumQuery.data.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-neutral-500 text-xs font-bold">/{draft.premiumFrequency.toLowerCase()}</span>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseWizard;
