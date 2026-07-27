import { PurchaseDraft, PurchaseNominee } from '../../types/wizard';
import { Nominee } from '../../types/customer';

const STORAGE_KEY = 'imp_purchase_draft';

export const saveLocalDraft = (draft: PurchaseDraft) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const getLocalDraft = (): PurchaseDraft | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearLocalDraft = () => {
  localStorage.removeItem(STORAGE_KEY);
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

export const generatePurchaseReference = () => {
  return `PUR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
};
