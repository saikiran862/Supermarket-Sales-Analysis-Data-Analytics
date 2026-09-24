import React from 'react';
import { RatingBucket } from '../../types/sales';
import { Star, Award, TrendingUp } from 'lucide-react';

interface RatingHistogramProps {
  buckets: RatingBucket[];
  averageRating: number;
  minRating: number;
  maxRating: number;
  totalReviews: number;
}

export const RatingHistogram: React.FC<RatingHistogramProps> = ({
  buckets,
  averageRating,
  minRating,
  maxRating,
  totalReviews,
}) => {
  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Customer Rating Distribution
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Frequency distribution across {totalReviews} evaluated customer transactions
          </p>
        </div>

        {/* Rating KPI Pill */}
        <div className="flex items-center gap-3 bg-amber-50/80 border border-amber-200/70 px-3.5 py-1.5 rounded-lg">
          <div className="flex items-center gap-1 text-amber-600 font-bold font-mono text-lg tabular-nums">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{averageRating.toFixed(2)}</span>
          </div>
          <div className="text-[11px] text-slate-600 border-l border-amber-200 pl-2.5">
            <div>Scale: <span className="font-medium text-slate-800">1.0 – 5.0</span></div>
            <div className="text-slate-500">Range: {minRating.toFixed(1)} to {maxRating.toFixed(1)}</div>
          </div>
        </div>
      </div>

      {/* Histogram bars */}
      <div className="space-y-3.5">
        {buckets.map((b) => {
          const widthPct = Math.max(3, (b.count / maxCount) * 100);

          return (
            <div key={b.range} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 w-16">{b.range}</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(b.max) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono tabular-nums text-xs">
                  <span className="text-slate-500">
                    ₹{b.totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })} sales
                  </span>
                  <span className="font-semibold text-slate-900 w-14 text-right">
                    {b.count} ({b.percentage}%)
                  </span>
                </div>
              </div>

              {/* Bar track */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-amber-400 to-amber-500 group-hover:brightness-110"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary note */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Positive Sentiment ({'>'} 3.0 Stars):</span>
          <span className="font-mono font-semibold text-slate-900">
            {(
              buckets
                .filter((b) => b.min >= 3.0)
                .reduce((sum, b) => sum + b.percentage, 0)
            ).toFixed(1)}
            % of transactions
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Expected benchmark: <strong className="font-mono text-slate-700">3.99 / 5.00</strong></span>
        </div>
      </div>
    </div>
  );
};
