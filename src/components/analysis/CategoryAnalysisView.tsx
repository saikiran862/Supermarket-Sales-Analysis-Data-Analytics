import React from 'react';
import { MetricItem } from '../../types/sales';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';
import { Layers, Award, PackageCheck } from 'lucide-react';

interface CategoryAnalysisViewProps {
  categories: MetricItem[];
}

export const CategoryAnalysisView: React.FC<CategoryAnalysisViewProps> = ({
  categories,
}) => {
  const topCategory = categories[0] || { name: 'Beverages', sales: 0, quantity: 0, transactions: 0 };

  const barChartData = categories.map((c) => ({
    id: c.id,
    label: c.name,
    value: c.sales,
    secondaryValue: c.quantity,
    secondaryLabel: 'units',
  }));

  const donutChartData = categories.map((c) => ({
    id: c.id,
    label: c.name,
    value: c.sales,
    percentage: c.percentageOfTotalSales,
  }));

  return (
    <div className="space-y-6">
      {/* Category Banner */}
      <div className="bg-gradient-to-r from-amber-950 to-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Highest Sales Category (Dynamic Finding)
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">
            {topCategory.name} generated the highest sales: ₹{topCategory.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-xs text-amber-200 mt-1">
            Sold {topCategory.quantity} units across {topCategory.transactions} transactions, averaging ₹{topCategory.avgTransactionValue} per transaction.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center shrink-0">
          <div className="text-[11px] text-amber-200 uppercase">Category Share</div>
          <div className="text-xl font-mono font-bold text-white">
            {topCategory.percentageOfTotalSales}%
          </div>
        </div>
      </div>

      {/* Visualizations: Bar + Donut Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart
          title="Sales Volume by Merchandise Category (₹)"
          subtitle="Ranked performance across product categories"
          data={barChartData}
          isCurrency={true}
          barColor="#f59e0b"
          highlightId={topCategory.id}
        />

        <DonutChart
          title="Category Revenue Distribution"
          subtitle="Percentage share of supermarket turnover"
          data={donutChartData}
          centerLabel="Total Categories"
          centerValue={`${categories.length} Lines`}
          isCurrency={true}
        />
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Department Category Performance Ledger
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Sorted by Total Turnover</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Rank</th>
                <th className="py-2.5 px-4">Category Name</th>
                <th className="py-2.5 px-4 text-right">Total Revenue (₹)</th>
                <th className="py-2.5 px-4 text-right">Quantity Sold</th>
                <th className="py-2.5 px-4 text-right">Transaction Count</th>
                <th className="py-2.5 px-4 text-right">Avg / Transaction</th>
                <th className="py-2.5 px-4 text-right">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {categories.map((cat, idx) => (
                <tr
                  key={cat.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    cat.id === topCategory.id ? 'bg-amber-50/30 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-sans text-slate-400 font-semibold">
                    #{idx + 1}
                  </td>
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">
                    {cat.name}
                    {idx === 0 && (
                      <span className="ml-2 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium">
                        #1 Category
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                    ₹{cat.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    {cat.quantity.toLocaleString('en-IN')} units
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    {cat.transactions}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    ₹{cat.avgTransactionValue.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-amber-600 font-semibold">
                    {cat.percentageOfTotalSales}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
