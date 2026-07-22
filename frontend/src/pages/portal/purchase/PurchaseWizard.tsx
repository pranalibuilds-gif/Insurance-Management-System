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
import { DataTable, Column } from '../../../components/organisms/DataTable';
import { getProductById } from '../../../mocks/products';
import { getCustomerProfile } from '../../../mocks/customers';
import { getDocuments } from '../../../mocks/documents';
import {
  saveDraft,
  getDraft,
  calculatePremiumSnapshot,
  evaluateEligibility,
  generatePurchaseReference,
  mapNomineeToPurchase,
  buildPurchaseReview,
  clearDraft
} from '../../../features/purchase/wizardStore';
import { PurchaseDraft, StepStatus, PurchaseDocumentReference, PurchaseReview, PurchaseNominee } from '../../../types/wizard';
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
  ArrowRightCircle
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

  const { data: userDocuments } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  useEffect(() => {
    const savedDraft = getDraft();
    if (savedDraft && savedDraft.productId === productId && !savedDraft.isSubmitted) {
      setDraft(savedDraft);
      setCurrentStep(savedDraft.currentStep);
      toast('Resumed your purchase progress.', { icon: '🔄' });
    } else if (product) {
      const initialDraft: PurchaseDraft = {
        productId: product.id,
        coverageAmount: product.minCoverage,
        premiumFrequency: product.premiumFrequencies[0],
        selectedNominees: [],
        attachedDocuments: [],
        declarationsAccepted: false,
        currentStep: 1,
        stepStatuses: { 1: 'IN_PROGRESS' },
        paymentStatus: 'NOT_STARTED',
        purchaseReference: generatePurchaseReference(),
        lastSaved: new Date().toISOString(),
        isComplete: false,
        isSubmitted: false,
      };
      setDraft(initialDraft);
    }
  }, [product, productId]);

  useEffect(() => {
    if (draft && product && customer && !draft.isSubmitted) {
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
  }, [draft?.coverageAmount, draft?.premiumFrequency, draft?.selectedNominees, draft?.attachedDocuments, draft?.declarationsAccepted, product, customer]);

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

  const handlePayment = async () => {
    if (!draft) return;

    setDraft({ ...draft, paymentStatus: 'PROCESSING' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = true;
    if (success) {
      const updatedDraft: PurchaseDraft = {
        ...draft,
        paymentStatus: 'SUCCESS',
        isSubmitted: true,
        currentStep: 8,
        stepStatuses: { ...draft.stepStatuses, 7: 'COMPLETED', 8: 'IN_PROGRESS' }
      };
      setDraft(updatedDraft);
      saveDraft(updatedDraft);
      toast.success('Payment Successful!');
      setCurrentStep(8);
    } else {
      setDraft({ ...draft, paymentStatus: 'FAILED' });
      toast.error('Payment Failed. Please try again.');
    }
  };

  const finalizePurchase = () => {
    clearDraft();
    navigate('/portal/policies');
  };

  const toggleNominee = (nominee: any) => {
    if (!draft) return;
    const isSelected = draft.selectedNominees.some(n => n.id === nominee.id);
    if (isSelected) {
      setDraft({ ...draft, selectedNominees: draft.selectedNominees.filter(n => n.id !== nominee.id) });
    } else {
      setDraft({ ...draft, selectedNominees: [...draft.selectedNominees, mapNomineeToPurchase(nominee)] });
    }
  };

  const attachDocument = (doc: any, type: string) => {
    if (!draft) return;
    const newRef: PurchaseDocumentReference = {
      documentId: doc.id,
      documentType: type,
      version: doc.currentVersion,
      verificationStatus: doc.status,
      fileName: doc.versions[0].fileName,
    };
    setDraft({ ...draft, attachedDocuments: [...draft.attachedDocuments.filter(d => d.documentType !== type), newRef] });
  };

  if (isLoadingProduct || !draft || !product || !customer) return <Spinner variant="centered" />;

  const review = buildPurchaseReview(draft, product, customer);
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
                    customerAge={35}
                    isKYCVerified={customer?.kycStatus === 'VERIFIED'}
                    hasDocuments={draft.attachedDocuments.length > 0}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-entrance">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-neutral-900">Select Policy Nominees</h4>
                    <Badge variant={totalNomineeShare === 100 ? 'success' : 'warning'}>
                      Allocation: {totalNomineeShare}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {customer?.nominees.map(n => {
                      const isSelected = draft.selectedNominees.some(sn => sn.id === n.id);
                      return (
                        <div
                          key={n.id}
                          onClick={() => toggleNominee(n)}
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

                  {totalNomineeShare !== 100 && (
                    <Alert variant="warning">
                      Total nominee allocation must equal exactly 100%. Current: {totalNomineeShare}%
                    </Alert>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-8 animate-entrance">
                  <div className="space-y-2">
                    <h4 className="font-bold text-neutral-900">Required Documents</h4>
                    <p className="text-sm text-neutral-500">Attach existing documents from your vault or upload new ones.</p>
                  </div>

                  <div className="space-y-4">
                    {product.requiredDocuments.map(reqDoc => {
                      const attached = draft.attachedDocuments.find(d => d.documentType === reqDoc);
                      const available = userDocuments?.find(d => d.title.toLowerCase().includes(reqDoc.toLowerCase()) || d.category.toLowerCase().includes(reqDoc.toLowerCase()));

                      return (
                        <Card key={reqDoc} variant="outlined">
                          <Card.Content className="p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={cn("p-2.5 rounded-xl", attached ? "bg-success-50 text-success-600" : "bg-neutral-100 text-neutral-400")}>
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-bold text-neutral-900">{reqDoc}</p>
                                {attached ? (
                                  <p className="text-xs text-success-600 flex items-center gap-1 font-medium">
                                    <CheckCircle2 className="h-3 w-3" /> Attached: {attached.fileName}
                                  </p>
                                ) : (
                                  <p className="text-xs text-neutral-400">Not attached</p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {!attached && available && (
                                <Button size="sm" variant="outline" onClick={() => attachDocument(available, reqDoc)}>
                                  <Paperclip className="h-4 w-4 mr-2" /> Use Existing
                                </Button>
                              )}
                              <Button size="sm" variant={attached ? 'ghost' : 'outline'} className={attached ? 'text-neutral-400' : ''}>
                                {attached ? 'Replace' : 'Upload New'}
                              </Button>
                            </div>
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-8 animate-entrance">
                  <Alert variant="info" title="Review your Policy details">
                    Please ensure all information below is correct. Once submitted, your application will be processed.
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h5 className="font-bold text-neutral-900 uppercase tracking-widest text-[10px]">Customer & Plan</h5>
                       <div className="space-y-2">
                          <p className="text-sm"><span className="text-neutral-500">Applicant:</span> <span className="font-bold">{review.customer.fullName}</span></p>
                          <p className="text-sm"><span className="text-neutral-500">Product:</span> <span className="font-bold">{review.product.name}</span></p>
                          <p className="text-sm"><span className="text-neutral-500">Coverage:</span> <span className="font-bold">${review.coverage.amount.toLocaleString()}</span></p>
                          <p className="text-sm"><span className="text-neutral-500">Billing:</span> <span className="font-bold">{review.coverage.frequency}</span></p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h5 className="font-bold text-neutral-900 uppercase tracking-widest text-[10px]">Beneficiaries</h5>
                       <div className="space-y-2">
                          {review.nominees.map((n: PurchaseNominee) => (
                            <div key={n.id} className="flex justify-between text-sm">
                               <span className="text-neutral-500">{n.fullName} ({n.relationship})</span>
                               <span className="font-bold">{n.sharePercentage}%</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 space-y-4">
                    <h5 className="font-bold text-neutral-900 uppercase tracking-widest text-[10px]">Declarations</h5>
                    <div className="space-y-3">
                      {review.declarations.map((decl: any) => (
                        <div key={decl.id} className="flex items-start gap-3">
                           <input
                              type="checkbox"
                              checked={decl.isAccepted}
                              onChange={() => setDraft({...draft, declarationsAccepted: !draft.declarationsAccepted})}
                              className="mt-1 h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                           />
                           <label className="text-sm text-neutral-600 leading-tight">{decl.text}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-entrance">
                   {draft.paymentStatus === 'PROCESSING' ? (
                      <>
                        <div className="relative">
                          <Spinner size="lg" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-brand-600" />
                          </div>
                        </div>
                        <div className="text-center space-y-2">
                          <h4 className="text-xl font-bold text-neutral-900">Processing Payment...</h4>
                          <p className="text-sm text-neutral-500">Please do not refresh or close the browser.</p>
                        </div>
                      </>
                   ) : (
                      <>
                        <div className="h-20 w-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                          <CreditCard className="h-10 w-10" />
                        </div>
                        <div className="text-center space-y-4 max-w-sm">
                          <h4 className="text-2xl font-bold text-neutral-900">Complete Purchase</h4>
                          <p className="text-sm text-neutral-500 leading-relaxed">
                            You are about to authorize a payment of <span className="font-bold text-neutral-900">${draft.pricingSnapshot?.totalAmount.toLocaleString()}</span> for your first installment.
                          </p>
                        </div>
                        <Button size="lg" className="w-full max-w-xs" onClick={handlePayment}>
                          Pay & Authorize
                        </Button>
                      </>
                   )}
                </div>
              )}

              {currentStep === 8 && (
                <div className="py-8 space-y-10 animate-entrance">
                   <div className="flex flex-col items-center text-center space-y-4">
                      <div className="h-20 w-20 rounded-full bg-success-50 flex items-center justify-center text-success-600 border-4 border-success-100">
                         <CheckCircle2 className="h-12 w-12" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-neutral-900">Purchase Submitted!</h3>
                        <p className="text-neutral-500">Your application is being processed by our underwriting team.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card variant="outlined">
                        <Card.Content className="p-6 space-y-4">
                           <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
                              <ClipboardCheck className="h-4 w-4" /> Submission Reference
                           </div>
                           <p className="text-xl font-mono font-bold text-neutral-900">{draft.purchaseReference}</p>
                           <div className="flex justify-between items-center text-sm border-t border-neutral-50 pt-4">
                              <span className="text-neutral-500">Policy Status</span>
                              <Badge variant="info">Pending Issuance</Badge>
                           </div>
                        </Card.Content>
                      </Card>

                      <Card variant="outlined">
                        <Card.Content className="p-6 space-y-4">
                           <div className="flex items-center gap-2 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
                              <Receipt className="h-4 w-4" /> Payment Status
                           </div>
                           <p className="text-xl font-bold text-success-600">Successful</p>
                           <div className="flex justify-between items-center text-sm border-t border-neutral-50 pt-4">
                              <span className="text-neutral-500">Transaction ID</span>
                              <span className="font-mono text-neutral-900">TXN-{Math.floor(Math.random()*1000000)}</span>
                           </div>
                        </Card.Content>
                      </Card>
                   </div>

                   <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-neutral-100">
                      <Button variant="outline" onClick={() => window.print()}>
                        <FileText className="h-4 w-4 mr-2" /> Download Summary
                      </Button>
                      <Button onClick={finalizePurchase}>
                        Go to My Policies <ArrowRightCircle className="h-4 w-4 ml-2" />
                      </Button>
                   </div>
                </div>
              )}
            </Card.Content>
          </Card>

          {currentStep < 8 && (
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1 || draft.paymentStatus === 'PROCESSING'}>
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous Step
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  currentStep >= 7 ||
                  (currentStep === 4 && totalNomineeShare !== 100) ||
                  (currentStep === 5 && !draft.eligibilitySnapshot?.hasRequiredDocuments) ||
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
        {currentStep < 8 && (
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

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="space-y-2">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Eligibility</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Profile Verified</span>
                      {draft.eligibilitySnapshot?.isKYCVerified ? <CheckCircle2 className="h-3.5 w-3.5 text-success-500" /> : <AlertCircle className="h-3.5 w-3.5 text-warning-500" />}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Nominees (100%)</span>
                      {draft.eligibilitySnapshot?.hasNomineesAllocated ? <CheckCircle2 className="h-3.5 w-3.5 text-success-500" /> : <div className="h-3.5 w-3.5 rounded-full border border-neutral-700" />}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Documents</span>
                      {draft.eligibilitySnapshot?.hasRequiredDocuments ? <CheckCircle2 className="h-3.5 w-3.5 text-success-500" /> : <div className="h-3.5 w-3.5 rounded-full border border-neutral-700" />}
                    </div>
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
