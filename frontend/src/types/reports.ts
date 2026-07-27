export interface MetricCardData {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export interface ExecutiveDashboardVM {
  topMetrics: MetricCardData[];
  revenueTrend: { month: string; amount: number }[];
  claimsTrend: { month: string; submitted: number; settled: number }[];
  operationalHealth: MetricCardData[];
}

export interface FinancialReportVM {
  summary: MetricCardData[];
  revenueByProduct: { name: string; value: number }[];
  outstandingByAge: { range: string; amount: number }[];
}

export interface ClaimsAnalyticsVM {
  summary: MetricCardData[];
  claimsByStatus: { name: string; value: number }[];
  claimsByCategory: { name: string; value: number }[];
}

export interface OperationalReportVM {
  summary: MetricCardData[];
  processingTimes: { stage: string; hours: number }[];
}

export interface CustomerAnalyticsVM {
  summary: MetricCardData[];
  customerGrowth: { month: string; count: number }[];
  kycDistribution: { name: string; value: number }[];
}

export interface ProductAnalyticsVM {
  summary: MetricCardData[];
  performanceByProduct: { name: string; sales: number; lossRatio: number }[];
}
