/**
 * Data contracts and types for Supermarket Sales Analysis
 */

export interface RawRecord {
  [key: string]: string | number | undefined;
}

export interface SalesRecord {
  rowIndex: number;
  invoiceId: string;
  date: string;
  branch: string;
  city: string;
  customerType: string;
  gender: string;
  product: string;
  category: string;
  quantity: number;
  unitPrice: number;
  payment: string;
  rating: number;
  originalSales: number;
  calculatedSales: number;
  salesMismatch: boolean;
  mismatchDiff: number;
}

export interface ColumnSchema {
  name: string;
  standardName: string;
  inferredType: 'string' | 'number' | 'date';
  nonNullCount: number;
  sampleValue: string;
}

export interface PreprocessingAudit {
  totalRawRows: number;
  totalValidRows: number;
  totalColumns: number;
  columns: ColumnSchema[];
  missingValuesCount: number;
  missingFieldCounts: Record<string, number>;
  duplicateRowsCount: number;
  duplicateInvoiceIds: string[];
  invalidNumericalCount: number;
  invalidRecordDetails: string[];
  salesFormulaMismatches: {
    invoiceId: string;
    product: string;
    quantity: number;
    unitPrice: number;
    recordedSales: number;
    calculatedSales: number;
    diff: number;
  }[];
  cleanedSuccessfully: boolean;
  auditTimestamp: string;
  sourceType: 'default' | 'uploaded' | 'sheet';
  sourceName: string;
}

export interface FilterState {
  branch: string;
  city: string;
  product: string;
  category: string;
  customerType: string;
  payment: string;
  gender: string;
  minRating: number;
  maxRating: number;
  searchQuery: string;
}

export interface MetricItem {
  id: string;
  name: string;
  sales: number;
  quantity: number;
  transactions: number;
  avgTransactionValue: number;
  avgRating?: number;
  percentageOfTotalSales: number;
}

export interface CustomerTypeComparison {
  member: {
    sales: number;
    transactions: number;
    avgTransactionValue: number;
    quantity: number;
    avgRating: number;
    salesShare: number;
  };
  normal: {
    sales: number;
    transactions: number;
    avgTransactionValue: number;
    quantity: number;
    avgRating: number;
    salesShare: number;
  };
  difference: number;
  higherSpender: 'Member' | 'Normal' | 'Equal';
  percentageDifference: number;
}

export interface RatingBucket {
  range: string;
  min: number;
  max: number;
  count: number;
  percentage: number;
  totalSales: number;
}

export interface ValidationItem {
  metric: string;
  expectedResult: string;
  actualCalculated: string;
  matched: boolean;
  differenceFormatted: string;
  notes: string;
}

export interface OverallKPIs {
  totalSales: number;
  totalTransactions: number;
  totalQuantity: number;
  averageTransactionValue: number;
  averageRating: number;
  highestSellingProduct: { name: string; sales: number; quantity: number };
  bestPerformingBranch: { name: string; city: string; sales: number; transactions: number };
  highestSellingCategory: { name: string; sales: number; quantity: number };
  mostUsedPaymentMethod: { name: string; count: number; sales: number };
  minRating: number;
  maxRating: number;
}

export interface BusinessInsightItem {
  id: string;
  category: 'product' | 'branch' | 'customer' | 'payment' | 'rating' | 'revenue';
  title: string;
  finding: string;
  metricHighlight: string;
  sentiment: 'positive' | 'neutral' | 'attention';
}

export interface BusinessDecisionRecommendation {
  id: string;
  title: string;
  recommendation: string;
  rationale: string;
  targetArea: string;
  priority: 'High' | 'Medium' | 'Low';
  expectedImpact: string;
}
