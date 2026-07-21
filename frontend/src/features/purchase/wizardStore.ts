import { PurchaseDraft, PricingSnapshot, EligibilitySnapshot } from '../../types/wizard';
import { InsuranceProduct } from '../../types/product';
import { Customer } from '../../types/customer';

const STORAGE_KEY = 'imp_purchase_draft';

export const saveDraft = (draft: PurchaseDraft) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const getDraft = (): PurchaseDraft | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const calculatePremiumSnapshot = (amount: number, frequency: string): PricingSnapshot => {
  const baseRate = 0.001; // 0.1% of coverage
  let freqMultiplier = 1;

  switch(frequency) {
    case 'MONTHLY': freqMultiplier = 1/12; break;
    case 'QUARTERLY': freqMultiplier = 1/4; break;
    case 'HALF_YEARLY': freqMultiplier = 1/2; break;
    case 'YEARLY': freqMultiplier = 1; break;
  }

  const baseAmount = amount * baseRate * freqMultiplier;
  const taxes = baseAmount * 0.18; // 18% tax

  return {
    baseAmount: Math.round(baseAmount),
    taxes: Math.round(taxes),
    totalAmount: Math.round(baseAmount + taxes),
    frequency: frequency as any
  };
};

export const evaluateEligibility = (
  product: InsuranceProduct,
  customer: Customer,
  draft: PurchaseDraft
): EligibilitySnapshot => {
  const customerAge = new Date().getFullYear() - new Date(customer.dob).getFullYear();

  const isAgeEligible = customerAge >= product.eligibility.minAge && customerAge <= product.eligibility.maxAge;
  const isKYCVerified = customer.kycStatus === 'VERIFIED';

  const totalNomineeShare = draft.selectedNominees.reduce((acc, n) => acc + n.sharePercentage, 0);
  const hasNomineesAllocated = totalNomineeShare === 100;

  const isCoverageValid = draft.coverageAmount >= product.minCoverage && draft.coverageAmount <= product.maxCoverage;

  // Placeholder for document check logic
  const hasRequiredDocuments = Object.keys(draft.selectedDocumentIds).length >= product.requiredDocuments.length;

  return {
    isAgeEligible,
    isKYCVerified,
    hasRequiredDocuments,
    hasNomineesAllocated,
    isCoverageValid,
    overallStatus: isAgeEligible && isKYCVerified && hasRequiredDocuments && hasNomineesAllocated && isCoverageValid
  };
};

export const generatePurchaseReference = () => {
  return `PUR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
};
