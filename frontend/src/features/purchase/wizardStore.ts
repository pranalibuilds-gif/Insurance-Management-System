import { PurchaseDraft, PurchaseNominee } from '../../types/wizard';
import { Nominee } from '../../types/customer';

import { STORAGE_KEYS } from '../../config/constants';

export const saveLocalDraft = (draft: PurchaseDraft) => {
  localStorage.setItem(STORAGE_KEYS.PURCHASE_DRAFT, JSON.stringify(draft));
};

export const getLocalDraft = (): PurchaseDraft | null => {
  const data = localStorage.getItem(STORAGE_KEYS.PURCHASE_DRAFT);
  return data ? JSON.parse(data) : null;
};

export const clearLocalDraft = () => {
  localStorage.removeItem(STORAGE_KEYS.PURCHASE_DRAFT);
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
