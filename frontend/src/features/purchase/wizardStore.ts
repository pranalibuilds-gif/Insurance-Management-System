import { PurchaseDraft, PricingSnapshot, EligibilitySnapshot, PurchaseNominee } from '../../types/wizard';
import { InsuranceProduct } from '../../types/product';
import { Customer, Nominee } from '../../types/customer';

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

export const mapNomineeToPurchase = (nominee: Nominee): PurchaseNominee => {
  const age = new Date().getFullYear() - new Date(nominee.dob).getFullYear();
  return {
    id: nominee.id,
    fullName: nominee.fullName,
    relationship: nominee.relationship,
    dob: nominee.dob,
    sharePercentage: nominee.sharePercentage,
    isMinor: age < 18,
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

  // Document check: every required product document must be attached
  const hasRequiredDocuments = product.requiredDocuments.every(reqDoc =>
    draft.attachedDocuments.some(attDoc => attDoc.documentType.toLowerCase().includes(reqDoc.toLowerCase()) || attDoc.fileName.toLowerCase().includes(reqDoc.toLowerCase()))
  );

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
