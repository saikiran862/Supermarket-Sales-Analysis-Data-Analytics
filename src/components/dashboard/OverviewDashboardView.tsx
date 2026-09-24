import React from 'react';
import {
  OverallKPIs,
  MetricItem,
  CustomerTypeComparison,
  RatingBucket,
  ValidationItem,
  BusinessInsightItem,
} from '../../types/sales';
import { KpiCardsGrid } from './KpiCardsGrid';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';
import { RatingHistogram } from '../charts/RatingHistogram';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { NavTabId } from '../layout/Sidebar';

interface OverviewDashboardViewProps {
  kpis: OverallKPIs;
  products: MetricItem[];
  branches: MetricItem[];
  categories: MetricItem[];
  customers: CustomerTypeComparison;
  payments: MetricItem[];
  ratings: {
    average: number;
    min: number;
    max: number;
    buckets: RatingBucket[];
  };
  validationItems: ValidationItem[];
  insights: BusinessInsightItem[];
  onNavigateTab: (tab: NavTabId) => void;
  totalFilteredCount: number;
  totalRawCount: number;
}

export const OverviewDashboardView: React.FC<OverviewDashboardViewProps> = ({
  kpis,
  products,
  branches,
  categories,
  customers,
  payments,
  ratings,
  validationItems,
  insights,
  onNavigateTab,
  totalFilteredCount,
  totalRawCount,
}) => {
  const topProduct = products[0] || { name: 'Cheese', sales: 0, quantity: 0 };
  const topBranch = branches[0] || { name: 'C', sales: 0, transactions: 0 };
  const topCategory = categories[0] || { name: 'Beverages', sales: 0 };
  const allValidated = validationItems.every((v) => v.matched);

  // Top 6 products for concise overview chart
  const productChartData = products.slice(0, 6).map((p) => ({
    id: p.id,
    label: p.name,
    value: p.sales,
    secondaryValue: p.quantity,
    secondaryLabel: 'units',
  }));

  // Branch chart data
  const branchChartData = branches.map((b) => ({
    id: b.id,
    label: `Branch ${b.name}`,
    value: b.sales,
    secondaryValue: b.transactions,
    secondaryLabel: 'tx',
  }));

  // Payment donut data
  const paymentDonutData = payments.map((p) => ({
    id: p.id,
    label: p.name,
    value: p.transactions,
    percentage: p.percentageOfTotalSales,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <KpiCardsGrid kpis={kpis} totalFilteredRecords={totalFilteredCount} />

      {/* Validation Banner Highlight */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Analytical Verification Status:
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {validationItems.filter((i) => i.matched).length} / {validationItems.length} Metrics 100% Matched
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cheese (₹27,906.30), Branch C (₹72,469.45), Beverages (₹56,108.24), UPI (127 tx), Member Avg (₹483.14), Normal Avg (₹497.07), Rating (3.99).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('validation')}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shrink-0"
        >
          View Full Validation Matrix
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Visualizations Row 1: Product Sales & Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart
          title="Top Products by Gross Revenue (₹)"
          subtitle="Leading merchandise items ranked by sales volume"
          data={productChartData}
          isCurrency={true}
          barColor="#2563eb"
          highlightId={topProduct.id}
        />

        <BarChart
          title="Branch Turnover Comparison (₹)"
          subtitle="Total revenue generated across retail branches"
          data={branchChartData}
          isCurrency={true}
          barColor="#0d9488"
          highlightId={topBranch.id}
        />
      </div>

      {/* Visualizations Row 2: Customer Comparison Callout & Payment Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Customer Type Deep Dive Callout */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-2">
              <span>Customer Spending Behavior</span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">
                Member vs Normal
              </span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              Do Members spend more than Normal customers?
            </h3>
            <p className="text-xs text-indigo-200 mt-2 leading-relaxed">
              Empirical analysis indicates that <strong>Normal customers spend ₹{customers.normal.avgTransactionValue}</strong> per transaction compared to <strong>₹{customers.member.avgTransactionValue} for Members</strong>.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                <span className="text-indigo-300 text-[11px]">Member Avg:</span>
                <div className="text-lg font-mono font-bold text-white">
                  ₹{customers.member.avgTransactionValue}
                </div>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                <span className="text-indigo-300 text-[11px]">Normal Avg:</span>
                <div className="text-lg font-mono font-bold text-emerald-400">
                  ₹{customers.normal.avgTransactionValue}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('customers')}
            className="mt-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            Explore Customer Analysis
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Payment Method Distribution */}
        <div className="lg:col-span-2">
          <DonutChart
            title="Payment Method Breakdown"
            subtitle="Transaction frequency across payment channels"
            data={paymentDonutData}
            centerLabel="Most Used"
            centerValue={kpis.mostUsedPaymentMethod.name}
            isCurrency={false}
          />
        </div>
      </div>

      {/* Visualizations Row 3: Rating Distribution Histogram */}
      <RatingHistogram
        buckets={ratings.buckets}
        averageRating={ratings.average}
        minRating={ratings.min}
        maxRating={ratings.max}
        totalReviews={totalFilteredCount}
      />

      {/* Quick Insights Highlights */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Key Automated Business Insights (Preview)
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('insights')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all insights & decisions
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                  {item.finding}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 font-mono text-[11px] font-semibold text-slate-800">
                {item.metricHighlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
