/**
 * Supermarket Sales Analysis – Data Analytics Web Application
 * Comprehensive B.Tech Data Analytics Project Platform
 */

import React, { useState, useMemo, useEffect } from 'react';
import { DEFAULT_SUPERMARKET_CSV } from './data/defaultCsvData';
import {
  parseAndPreprocessSalesCsv,
  filterSalesRecords,
  computeOverallKPIs,
  aggregateByDimension,
  compareCustomerTypes,
  computeRatingAnalysis,
  generateDynamicInsights,
  generateDynamicRecommendations,
  runAnalysisValidation,
} from './utils/dataProcessor';
import { FilterState } from './types/sales';
import { Sidebar, NavTabId } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { FilterBar } from './components/dashboard/FilterBar';
import { OverviewDashboardView } from './components/dashboard/OverviewDashboardView';
import { DataPreprocessingView } from './components/preprocessing/DataPreprocessingView';
import { ProductAnalysisView } from './components/analysis/ProductAnalysisView';
import { BranchAnalysisView } from './components/analysis/BranchAnalysisView';
import { CategoryAnalysisView } from './components/analysis/CategoryAnalysisView';
import { CustomerAnalysisView } from './components/analysis/CustomerAnalysisView';
import { PaymentAnalysisView } from './components/analysis/PaymentAnalysisView';
import { RatingAnalysisView } from './components/analysis/RatingAnalysisView';
import { BusinessInsightsView } from './components/insights/BusinessInsightsView';
import { AnalysisValidationView } from './components/validation/AnalysisValidationView';
import { InteractiveDataTable } from './components/dashboard/InteractiveDataTable';
import { ProjectReportView } from './components/report/ProjectReportView';

const INITIAL_FILTERS: FilterState = {
  branch: 'all',
  city: 'all',
  product: 'all',
  category: 'all',
  customerType: 'all',
  payment: 'all',
  gender: 'all',
  minRating: 1.0,
  maxRating: 5.0,
  searchQuery: '',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [rawCsvText, setRawCsvText] = useState<string>(DEFAULT_SUPERMARKET_CSV);
  const [sourceName, setSourceName] = useState<string>('supermarket_sales.csv');
  const [sourceType, setSourceType] = useState<'default' | 'uploaded'>('default');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Parse and preprocess raw CSV into validated structured records
  const { records: rawRecords, audit } = useMemo(() => {
    return parseAndPreprocessSalesCsv(rawCsvText, sourceName, sourceType);
  }, [rawCsvText, sourceName, sourceType]);

  // Apply interactive filters
  const filteredRecords = useMemo(() => {
    return filterSalesRecords(rawRecords, filters);
  }, [rawRecords, filters]);

  // Compute dynamic KPIs & aggregations
  const kpis = useMemo(() => computeOverallKPIs(filteredRecords), [filteredRecords]);
  const productAgg = useMemo(
    () => aggregateByDimension(filteredRecords, (r) => r.product, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const branchAgg = useMemo(
    () => aggregateByDimension(filteredRecords, (r) => r.branch, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const cityAgg = useMemo(
    () => aggregateByDimension(filteredRecords, (r) => r.city, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const categoryAgg = useMemo(
    () => aggregateByDimension(filteredRecords, (r) => r.category, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const paymentAgg = useMemo(
    () => aggregateByDimension(filteredRecords, (r) => r.payment, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const customerComparison = useMemo(
    () => compareCustomerTypes(filteredRecords, kpis.totalSales),
    [filteredRecords, kpis.totalSales]
  );
  const ratingAnalysis = useMemo(
    () => computeRatingAnalysis(filteredRecords),
    [filteredRecords]
  );

  // Benchmark Validation Suite against Section 22 specifications
  const validationItems = useMemo(
    () => runAnalysisValidation(rawRecords),
    [rawRecords]
  );
  const allValidated = validationItems.every((v) => v.matched);

  // Dynamic Insights & Recommendations
  const insights = useMemo(
    () =>
      generateDynamicInsights(
        kpis,
        productAgg,
        branchAgg,
        categoryAgg,
        customerComparison,
        paymentAgg,
        ratingAnalysis.average
      ),
    [kpis, productAgg, branchAgg, categoryAgg, customerComparison, paymentAgg, ratingAnalysis.average]
  );

  const recommendations = useMemo(
    () =>
      generateDynamicRecommendations(
        kpis,
        productAgg,
        branchAgg,
        categoryAgg,
        customerComparison,
        paymentAgg,
        ratingAnalysis.average
      ),
    [kpis, productAgg, branchAgg, categoryAgg, customerComparison, paymentAgg, ratingAnalysis.average]
  );

  // File Upload handler
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setRawCsvText(content);
        setSourceName(file.name);
        setSourceType('uploaded');
        setFilters(INITIAL_FILTERS);
        setActiveTab('preprocessing');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefault = () => {
    setRawCsvText(DEFAULT_SUPERMARKET_CSV);
    setSourceName('supermarket_sales.csv');
    setSourceType('default');
    setFilters(INITIAL_FILTERS);
  };

  const showFilterBar = [
    'dashboard',
    'products',
    'branches',
    'categories',
    'customers',
    'payments',
    'ratings',
    'datatable',
  ].includes(activeTab);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        validationStatus={allValidated}
        totalRecordsCount={rawRecords.length}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          totalFiltered={filteredRecords.length}
          totalRaw={rawRecords.length}
          records={filteredRecords}
          onUploadClick={() => setActiveTab('preprocessing')}
        />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Interactive Filters (mounted on analytics tabs) */}
          {showFilterBar && (
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
              records={rawRecords}
              totalFilteredCount={filteredRecords.length}
              totalRawCount={rawRecords.length}
            />
          )}

          {/* Tab Views */}
          {activeTab === 'dashboard' && (
            <OverviewDashboardView
              kpis={kpis}
              products={productAgg}
              branches={branchAgg}
              categories={categoryAgg}
              customers={customerComparison}
              payments={paymentAgg}
              ratings={ratingAnalysis}
              validationItems={validationItems}
              insights={insights}
              onNavigateTab={setActiveTab}
              totalFilteredCount={filteredRecords.length}
              totalRawCount={rawRecords.length}
            />
          )}

          {activeTab === 'preprocessing' && (
            <DataPreprocessingView
              audit={audit}
              onFileUpload={handleFileUpload}
              onResetToDefault={handleResetToDefault}
            />
          )}

          {activeTab === 'products' && (
            <ProductAnalysisView
              products={productAgg}
              records={filteredRecords}
            />
          )}

          {activeTab === 'branches' && (
            <BranchAnalysisView
              branches={branchAgg}
              cities={cityAgg}
              records={filteredRecords}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryAnalysisView categories={categoryAgg} />
          )}

          {activeTab === 'customers' && (
            <CustomerAnalysisView comparison={customerComparison} />
          )}

          {activeTab === 'payments' && (
            <PaymentAnalysisView payments={paymentAgg} />
          )}

          {activeTab === 'ratings' && (
            <RatingAnalysisView
              ratings={ratingAnalysis}
              totalReviewsCount={filteredRecords.length}
            />
          )}

          {activeTab === 'insights' && (
            <BusinessInsightsView
              insights={insights}
              recommendations={recommendations}
            />
          )}

          {activeTab === 'validation' && (
            <AnalysisValidationView
              validationItems={validationItems}
              totalRecordsCount={rawRecords.length}
            />
          )}

          {activeTab === 'datatable' && (
            <InteractiveDataTable records={filteredRecords} />
          )}

          {activeTab === 'report' && (
            <ProjectReportView
              kpis={kpis}
              customerComp={customerComparison}
              totalRecordsCount={rawRecords.length}
            />
          )}
        </main>
      </div>
    </div>
  );
}
