import React from 'react';

export interface ComparisonGroup {
  groupName: string;
  metric1: { label: string; value: number; formatted?: string };
  metric2: { label: string; value: number; formatted?: string };
}

interface ComparisonBarChartProps {
  title?: string;
  subtitle?: string;
  data: ComparisonGroup[];
  metric1Color?: string;
  metric2Color?: string;
  metric1Name: string;
  metric2Name: string;
}

export const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  title,
  subtitle,
  data,
  metric1Color = '#2563eb',
  metric2Color = '#0d9488',
  metric1Name,
  metric2Name,
}) => {
  // Max for metric1 & metric2 separately or unified
  const max1 = Math.max(...data.map((d) => d.metric1.value), 1);
  const max2 = Math.max(...data.map((d) => d.metric2.value), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: metric1Color }} />
            <span className="text-slate-600 font-medium">{metric1Name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: metric2Color }} />
            <span className="text-slate-600 font-medium">{metric2Name}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {data.map((group) => {
          const pct1 = Math.max(3, (group.metric1.value / max1) * 100);
          const pct2 = Math.max(3, (group.metric2.value / max2) * 100);

          return (
            <div key={group.groupName} className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
                <span>{group.groupName}</span>
              </div>

              {/* Metric 1 */}
              <div className="space-y-1 mb-2">
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>{group.metric1.label}</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {group.metric1.formatted || group.metric1.value}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct1}%`, backgroundColor: metric1Color }}
                  />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>{group.metric2.label}</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    {group.metric2.formatted || group.metric2.value}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct2}%`, backgroundColor: metric2Color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
