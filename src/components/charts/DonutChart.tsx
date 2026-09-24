import React, { useState } from 'react';

export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  percentage?: number;
  color?: string;
  secondaryInfo?: string;
}

interface DonutChartProps {
  data: DonutSegment[];
  title?: string;
  subtitle?: string;
  centerLabel?: string;
  centerValue?: string;
  height?: number;
  isCurrency?: boolean;
}

const DEFAULT_PALETTE = [
  '#2563eb', // Blue
  '#0d9488', // Teal
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
];

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  subtitle,
  centerLabel = 'Total',
  centerValue,
  height = 260,
  isCurrency = false,
}) => {
  const [activeSegment, setActiveSegment] = useState<DonutSegment | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[240px] text-center">
        {title && <h4 className="text-sm font-semibold text-slate-800 mb-1">{title}</h4>}
        <p className="text-sm text-slate-400">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;

  // Compute SVG arcs
  let accumulatedAngle = 0;
  const radius = 80;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  const segmentsWithAngles = data.map((item, index) => {
    const fraction = item.value / total;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += fraction;
    const color = item.color || DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];
    const pct = (fraction * 100).toFixed(1);

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      color,
      pct,
    };
  });

  const displayCenterValue =
    centerValue || (isCurrency ? `₹${total.toLocaleString('en-IN')}` : total.toLocaleString('en-IN'));

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 transition-all">
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6" style={{ minHeight: height }}>
        {/* SVG Donut */}
        <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />
            {segmentsWithAngles.map((seg) => (
              <circle
                key={seg.id}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={activeSegment?.id === seg.id ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                className="transition-all duration-300 cursor-pointer hover:opacity-90"
                onMouseEnter={() => setActiveSegment(seg)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            ))}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              {activeSegment ? activeSegment.label : centerLabel}
            </span>
            <span className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5 truncate max-w-[120px]">
              {activeSegment
                ? isCurrency
                  ? `₹${activeSegment.value.toLocaleString('en-IN')}`
                  : activeSegment.value
                : displayCenterValue}
            </span>
            {activeSegment && (
              <span className="text-[11px] font-mono text-blue-600 font-semibold mt-0.5">
                {activeSegment.percentage ?? `${((activeSegment.value / total) * 100).toFixed(1)}%`}
              </span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {segmentsWithAngles.map((seg) => {
            const isHovered = activeSegment?.id === seg.id;
            return (
              <div
                key={seg.id}
                className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                  isHovered ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'
                }`}
                onMouseEnter={() => setActiveSegment(seg)}
                onMouseLeave={() => setActiveSegment(null)}
              >
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-slate-700 truncate">{seg.label}</span>
                </div>
                <div className="flex items-center gap-2 font-mono tabular-nums text-slate-900 shrink-0">
                  <span>
                    {isCurrency
                      ? `₹${seg.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
                      : seg.value.toLocaleString('en-IN')}
                  </span>
                  <span className="text-slate-500 font-normal">({seg.pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
