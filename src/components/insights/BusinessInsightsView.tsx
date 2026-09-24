import React from 'react';
import { BusinessInsightItem, BusinessDecisionRecommendation } from '../../types/sales';
import {
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Compass,
  ArrowRight,
  TrendingUp,
  Tag,
  ShieldAlert,
} from 'lucide-react';

interface BusinessInsightsViewProps {
  insights: BusinessInsightItem[];
  recommendations: BusinessDecisionRecommendation[];
}

export const BusinessInsightsView: React.FC<BusinessInsightsViewProps> = ({
  insights,
  recommendations,
}) => {
  return (
    <div className="space-y-8">
      {/* SECTION 1: BUSINESS INSIGHTS */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Automated Business Insights
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Data-driven findings generated dynamically from the active transactions (no fabricated information).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 border capitalize ${
                      item.sentiment === 'positive'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : item.sentiment === 'attention'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.finding}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Key Indicator:</span>
                <span className="font-mono font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {item.metricHighlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: BUSINESS DECISIONS & RECOMMENDATIONS */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Strategic Business Decisions & Actionable Recommendations
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Practical retail managerial strategies formulated directly on the empirical results of this dataset.
        </p>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs transition-all hover:shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    0{index + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{rec.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
                    {rec.targetArea}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                      rec.priority === 'High'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : rec.priority === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="md:col-span-2 space-y-2">
                  <div>
                    <span className="font-semibold text-slate-800">Action Plan: </span>
                    <span className="text-slate-700 leading-relaxed">
                      {rec.recommendation}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500">Data Rationale: </span>
                    <span className="text-slate-600">{rec.rationale}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col justify-center">
                  <span className="text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    Targeted Impact
                  </span>
                  <p className="text-xs text-slate-800 font-medium leading-snug">
                    {rec.expectedImpact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
