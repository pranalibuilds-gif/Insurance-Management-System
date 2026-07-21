import { PurchaseDraft } from '../../types/wizard';

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

export const calculatePremium = (amount: number, frequency: string) => {
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
    frequency
  };
};
