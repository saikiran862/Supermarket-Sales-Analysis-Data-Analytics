import React from 'react';
import { RatingBucket } from '../../types/sales';
import { RatingHistogram } from '../charts/RatingHistogram';
import { BarChart } from '../charts/BarChart';
import { Star, TrendingUp, Award, Store, ShoppingBag } from 'lucide-react';

interface RatingAnalysisViewProps {
  ratings: {
    average: number;
    min: number;
    max: number;
    buckets: RatingBucket[];
    byBranch: { branch: string; avgRating: number; sales: number; transactions: number }[];
    byProduct: { product: string; avgRating: number; sales: number; transactions: number }[];
  };
  totalReviewsCount: number;
}

export const RatingAnalysisView: React.FC<RatingAnalysisViewProps> = ({
  ratings,
  totalReviewsCount,
}) => {
  const branchRatingChartData = ratings.byBranch.map((b) => ({
    id: b.branch,
    label: b.branch,
    value: b.avgRating,
    formattedValue: `${b.avgRating.toFixed(2)} ★`,
    secondaryValue: b.transactions,
    secondaryLabel: 'tx',
    color: '#f59e0b',
  }));

  const productRatingChartData = ratings.byProduct.slice(0, 10).map((p) => ({
    id: p.product,
    label: p.product,
    value: p.avgRating,
    formattedValue: `${p.avgRating.toFixed(2)} ★`,
    secondaryValue: Math.round(p.sales),
    secondaryLabel: '₹',
    color: '#d97706',
  }));

  return (
    <div className="space-y-6">
      {/* Rating Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            Customer Satisfaction & Rating Analytics (Requirement #10)
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">
            Average Customer Rating: {ratings.average.toFixed(2)} / 5.00
          </h2>
          <p className="text-xs text-amber-200 mt-1">
            Ratings range from {ratings.min.toFixed(1)} (minimum) to {ratings.max.toFixed(1)} (maximum) across {totalReviewsCount} customer evaluations.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center shrink-0">
          <div className="text-[11px] text-amber-200 uppercase">Scale Spread</div>
          <div className="text-lg font-mono font-bold text-white">
            {ratings.min.toFixed(1)} – {ratings.max.toFixed(1)} ★
          </div>
        </div>
      </div>

      {/* Main Histogram: Rating Distribution */}
      <RatingHistogram
        buckets={ratings.buckets}
        averageRating={ratings.average}
        minRating={ratings.min}
        maxRating={ratings.max}
        totalReviews={totalReviewsCount}
      />

      {/* Correlations: Rating by Branch & Rating by Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Rating and Branch */}
        <BarChart
          title="Customer Rating by Branch"
          subtitle="Mean satisfaction score by retail location"
          data={branchRatingChartData}
          isCurrency={false}
          barColor="#f59e0b"
        />

        {/* Rating and Product */}
        <BarChart
          title="Top 10 Products by Customer Rating"
          subtitle="Customer satisfaction across leading merchandise SKUs"
          data={productRatingChartData}
          isCurrency={false}
          barColor="#d97706"
        />
      </div>

      {/* Rating & Sales Correlation Ledger */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          Relationship: Customer Rating vs Sales Volume
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Breakdown of total supermarket turnover generated across customer satisfaction tiers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ratings.buckets.map((b) => (
            <div key={b.range} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-semibold text-slate-800">{b.range} Stars</div>
              <div className="text-lg font-mono font-bold text-slate-900 mt-1">
                ₹{b.totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {b.count} invoices ({b.percentage}% of transactions)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
