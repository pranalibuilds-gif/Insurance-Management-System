import {
  ExecutiveDashboardVM,
  FinancialReportVM,
  ClaimsAnalyticsVM,
  CustomerAnalyticsVM,
  ProductAnalyticsVM,
  OperationalReportVM
} from '../../types/reports';
import { mockDelay } from '..';

export const getExecutiveMetrics = async (): Promise<ExecutiveDashboardVM> => {
  await mockDelay();
  return {
    topMetrics: [
      { label: 'Total Premium', value: '$2.4M', trend: { value: 12, isPositive: true } },
      { label: 'Claims Paid', value: '$840k', trend: { value: 5, isPositive: false } },
      { label: 'Loss Ratio', value: '35%', trend: { value: 2, isPositive: true } },
      { label: 'Active Policies', value: '1,248', trend: { value: 8, isPositive: true } },
    ],
    revenueTrend: [
      { month: 'Jan', amount: 180000 },
      { month: 'Feb', amount: 220000 },
      { month: 'Mar', amount: 210000 },
      { month: 'Apr', amount: 250000 },
    ],
    claimsTrend: [
      { month: 'Jan', submitted: 45, settled: 38 },
      { month: 'Feb', submitted: 52, settled: 42 },
      { month: 'Mar', submitted: 48, settled: 45 },
      { month: 'Apr', submitted: 60, settled: 50 },
    ],
    operationalHealth: [
      { label: 'Avg KYC Time', value: '4.2 hrs' },
      { label: 'Avg Claim Time', value: '3.5 days' },
      { label: 'SLA Breaches', value: '2', description: 'Past 24 hours' },
    ]
  };
};

export const getFinancialReport = async (): Promise<FinancialReportVM> => {
  await mockDelay();
  return {
    summary: [
      { label: 'Collected', value: '$1.8M' },
      { label: 'Outstanding', value: '$420k' },
      { label: 'Refunds', value: '$12k' },
      { label: 'Waived', value: '$4.5k' },
    ],
    revenueByProduct: [
      { name: 'Health', value: 45 },
      { name: 'Vehicle', value: 30 },
      { name: 'Life', value: 25 },
    ],
    outstandingByAge: [
      { range: '0-30 days', amount: 250000 },
      { range: '31-60 days', amount: 120000 },
      { range: '60+ days', amount: 50000 },
    ]
  };
};

export const getClaimsAnalytics = async (): Promise<ClaimsAnalyticsVM> => {
  await mockDelay();
  return {
    summary: [
      { label: 'Submitted', value: '425' },
      { label: 'Approved', value: '312' },
      { label: 'Rejected', value: '48' },
      { label: 'Pending', value: '65' },
    ],
    claimsByStatus: [
      { name: 'Paid', value: 280 },
      { name: 'Review', value: 85 },
      { name: 'Info Needed', value: 40 },
      { name: 'Rejected', value: 20 },
    ],
    claimsByCategory: [
      { name: 'Hospitalization', value: 150 },
      { name: 'Accident', value: 120 },
      { name: 'Theft', value: 80 },
      { name: 'Other', value: 75 },
    ]
  };
};

export const getOperationalReport = async (): Promise<OperationalReportVM> => {
  await mockDelay();
  return {
    summary: [
      { label: 'Avg KYC Review', value: '4.2h', trend: { value: 15, isPositive: true } },
      { label: 'Avg Claim Settlement', value: '3.5d', trend: { value: 5, isPositive: true } },
      { label: 'Active Adjusters', value: '12' },
      { label: 'Open Tasks', value: '84' },
    ],
    processingTimes: [
      { stage: 'Submission', hours: 1 },
      { stage: 'Investigation', hours: 48 },
      { stage: 'Manager Approval', hours: 24 },
      { stage: 'Settlement', hours: 12 },
    ]
  };
};

export const getCustomerAnalytics = async (): Promise<CustomerAnalyticsVM> => {
  await mockDelay();
  return {
    summary: [
      { label: 'Total Customers', value: '1,450', trend: { value: 8, isPositive: true } },
      { label: 'Verified (KYC)', value: '1,120' },
      { label: 'Retention Rate', value: '94%' },
      { label: 'High Risk', value: '12' },
    ],
    customerGrowth: [
      { month: 'Jan', count: 1200 },
      { month: 'Feb', count: 1280 },
      { month: 'Mar', count: 1350 },
      { month: 'Apr', count: 1450 },
    ],
    kycDistribution: [
      { name: 'Verified', value: 80 },
      { name: 'Pending', value: 15 },
      { name: 'Rejected', value: 5 },
    ]
  };
};

export const getProductAnalytics = async (): Promise<ProductAnalyticsVM> => {
  await mockDelay();
  return {
    summary: [
      { label: 'Top Product', value: 'Health Secure' },
      { label: 'Total Revenue', value: '$2.4M' },
      { label: 'Avg Policy Value', value: '$1,920' },
      { label: 'Renewal Rate', value: '88%' },
    ],
    performanceByProduct: [
      { name: 'Health Secure', sales: 450, lossRatio: 32 },
      { name: 'Vehicle Protect', sales: 320, lossRatio: 45 },
      { name: 'Life Essential', sales: 180, lossRatio: 12 },
    ]
  };
};
