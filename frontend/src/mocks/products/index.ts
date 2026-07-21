import { InsuranceProduct } from '../../types/product';
import { mockDelay } from '..';

export const mockProducts: InsuranceProduct[] = [
  {
    id: 'prod_1',
    name: 'Health Secure Gold',
    category: 'HEALTH',
    shortDescription: 'Comprehensive health coverage for you and your family.',
    description: 'Our most popular health plan offering extensive coverage for hospitalization, day-care procedures, and wellness benefits.',
    status: 'RECOMMENDED',
    minCoverage: 300000,
    maxCoverage: 2500000,
    basePremium: 450,
    waitingPeriodDays: 30,
    premiumFrequencies: ['MONTHLY', 'QUARTERLY', 'YEARLY'],
    requiredDocuments: ['Identity Proof', 'Address Proof', 'Medical History Report'],
    exclusions: ['Cosmetic Surgery', 'Weight loss treatments', 'Self-inflicted injuries'],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      requiresKYC: true,
      residencyType: 'Permanent Resident',
    },
    features: [
      { title: 'In-patient Hospitalization', description: 'Covers room rent, nursing, and ICU charges.', isIncluded: true },
      { title: 'Cashless Network', description: 'Access to 5000+ hospitals across the country.', isIncluded: true },
      { title: 'Pre-existing Disease Cover', description: 'Covered after 48 months of continuous policy.', isIncluded: true },
      { title: 'Aesthetic Treatments', description: 'Cosmetic or plastic surgery.', isIncluded: false },
    ],
    isRecommended: true,
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'prod_2',
    name: 'Vehicle Protect Premium',
    category: 'VEHICLE',
    shortDescription: 'Maximum protection for your car against accidents and theft.',
    description: 'Comprehensive motor insurance including third-party liability and own-damage protection with zero depreciation add-on.',
    status: 'AVAILABLE',
    minCoverage: 100000,
    maxCoverage: 5000000,
    basePremium: 120,
    waitingPeriodDays: 0,
    premiumFrequencies: ['YEARLY'],
    requiredDocuments: ['Vehicle RC', 'Previous Policy Copy', 'Driving License'],
    exclusions: ['Driving without license', 'Consequential loss', 'Mechanical breakdown'],
    eligibility: {
      minAge: 18,
      maxAge: 80,
      requiresKYC: true,
      residencyType: 'Any',
    },
    features: [
      { title: 'Accident Damage', description: 'Repairs for damages caused by accidents.', isIncluded: true },
      { title: 'Theft Protection', description: 'Coverage for total loss in case of vehicle theft.', isIncluded: true },
      { title: 'Zero Depreciation', description: 'Full claim without deduction for part depreciation.', isIncluded: true },
      { title: 'Wear and Tear', description: 'Regular maintenance and part aging.', isIncluded: false },
    ],
    isRecommended: false,
    createdAt: '2025-11-15T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'prod_3',
    name: 'Term Life Essential',
    category: 'LIFE',
    shortDescription: 'High-value life coverage at affordable premiums.',
    description: 'Ensure your family financial future with a high sum assured term life plan. Simple and effective protection.',
    status: 'NEW',
    minCoverage: 1000000,
    maxCoverage: 100000000,
    basePremium: 800,
    waitingPeriodDays: 0,
    premiumFrequencies: ['QUARTERLY', 'HALF_YEARLY', 'YEARLY'],
    requiredDocuments: ['Identity Proof', 'Income Proof', 'Recent Photograph'],
    exclusions: ['Suicide within first year', 'Hazardous activities'],
    eligibility: {
      minAge: 18,
      maxAge: 55,
      requiresKYC: true,
      residencyType: 'Permanent Resident',
      specialConditions: ['Non-smokers preferred for best rates'],
    },
    features: [
      { title: 'Death Benefit', description: 'Lump sum payout to nominees.', isIncluded: true },
      { title: 'Terminal Illness', description: 'Early payout upon diagnosis of terminal illness.', isIncluded: true },
      { title: 'Tax Benefits', description: 'Save taxes under section 80C.', isIncluded: true },
    ],
    isRecommended: false,
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  }
];

export const getProducts = async (): Promise<InsuranceProduct[]> => {
  await mockDelay();
  return mockProducts;
};

export const getProductById = async (id: string): Promise<InsuranceProduct | undefined> => {
  await mockDelay();
  return mockProducts.find(p => p.id === id);
};
