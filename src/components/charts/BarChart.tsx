import React, { useState } from 'react';

export interface BarChartItem {
  id: string;
  label: string;
  value: number;
  secondaryValue?: number;
  secondaryLabel?: string;
  color?: string;
  formattedValue?: string;
}

interface BarChartProps {
  data: BarChartItem[];
  title?: string;
  subtitle?: string;
  isCurrency?: boolean;
  orientation?: 'horizontal' | 'vertical';
  height?: number;
  barColor?: string;
  highlightId?: string;
  emptyMessage?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  subtitle,
  isCurrency = true,
  orientation = 'horizontal',
  height = 320,
  barColor = '#3b82f6',
  highlightId,
  emptyMessage = 'No data available for the current filter selection',
}) => {
  const [hoveredItem, setHoveredItem] = useState<BarChartItem | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[240px] text-center">
        {title && <h4 className="text-sm font-semibold text-slate-800 mb-1">{title}</h4>}
        <p className="text-sm text-slate-400 mt-2">{emptyMessage}</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const formatVal = (v: number) => {
    if (isCurrency) {
      return `₹${v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return v.toLocaleString('en-IN');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-all">
      {(title || subtitle) && (
        <div className="mb-4 flex items-start justify-between">
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {hoveredItem && (
            <div className="text-right text-xs bg-slate-900 text-white px-2.5 py-1 rounded-md shadow-sm transition-opacity">
              <span className="font-medium">{hoveredItem.label}:</span>{' '}
              <span className="font-mono tabular-nums font-semibold">
                {hoveredItem.formattedValue || formatVal(hoveredItem.value)}
              </span>
            </div>
          )}
        </div>
      )}

      {orientation === 'horizontal' ? (
        <div className="space-y-3" style={{ minHeight: height }}>
          {data.map((item, index) => {
            const pct = Math.max(2, (item.value / maxValue) * 100);
            const isHighlighted = highlightId ? item.id === highlightId : index === 0;
            const currentBarColor = item.color || (isHighlighted ? '#2563eb' : barColor);

            return (
              <div
                key={item.id}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-600 font-semibold w-5">
                      #{index + 1}
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.secondaryValue !== undefined && (
                      <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                        {item.secondaryValue} {item.secondaryLabel || 'units'}
                      </span>
                    )}
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {item.formattedValue || formatVal(item.value)}
                    </span>
                  </div>
                </div>

                {/* Bar Track */}
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out group-hover:brightness-110"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: currentBarColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Vertical Bar Chart */
        <div className="flex flex-col justify-end pt-4" style={{ height }}>
          <div className="flex items-end justify-between gap-2 h-full pb-6 border-b border-slate-200">
            {data.map((item, index) => {
              const heightPct = Math.max(4, (item.value / maxValue) * 100);
              const isHighlighted = highlightId ? item.id === highlightId : false;
              const currentBarColor = item.color || (isHighlighted ? '#2563eb' : barColor);

              return (
                <div
                  key={item.id}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow whitespace-nowrap z-10">
                    {item.formattedValue || formatVal(item.value)}
                  </div>
                  <div
                    className="w-full max-w-[40px] rounded-t-md transition-all duration-500 group-hover:brightness-110"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: currentBarColor,
                    }}
                  />
                </div>
              );
            })}
          </div>
          {/* Labels */}
          <div className="flex justify-between gap-2 pt-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex-1 text-center text-[11px] font-medium text-slate-600 truncate"
                title={item.label}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
