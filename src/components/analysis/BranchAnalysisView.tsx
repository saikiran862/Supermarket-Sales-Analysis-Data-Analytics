import React from 'react';
import { MetricItem, SalesRecord } from '../../types/sales';
import { BarChart } from '../charts/BarChart';
import { Store, MapPin, Building2, TrendingUp } from 'lucide-react';

interface BranchAnalysisViewProps {
  branches: MetricItem[];
  cities: MetricItem[];
  records: SalesRecord[];
}

export const BranchAnalysisView: React.FC<BranchAnalysisViewProps> = ({
  branches,
  cities,
}) => {
  const topBranch = branches[0] || { name: 'C', sales: 0, transactions: 0, quantity: 0 };
  const topCity = cities[0] || { name: 'Mumbai', sales: 0, transactions: 0 };

  // City mappings
  const branchCityMap: Record<string, string> = {
    A: 'Jaipur',
    B: 'Delhi',
    C: 'Mumbai',
    D: 'Bengaluru',
  };

  const branchSalesChartData = branches.map((b) => ({
    id: b.id,
    label: `Branch ${b.name} (${branchCityMap[b.name] || b.name})`,
    value: b.sales,
    secondaryValue: b.transactions,
    secondaryLabel: 'orders',
  }));

  const branchTxChartData = [...branches]
    .sort((a, b) => b.transactions - a.transactions)
    .map((b) => ({
      id: b.id,
      label: `Branch ${b.name} (${branchCityMap[b.name] || b.name})`,
      value: b.transactions,
      formattedValue: `${b.transactions} orders`,
      color: '#0d9488',
    }));

  const citySalesChartData = cities.map((c) => ({
    id: c.id,
    label: c.name,
    value: c.sales,
    secondaryValue: c.transactions,
    secondaryLabel: 'tx',
    color: '#6366f1',
  }));

  return (
    <div className="space-y-6">
      {/* Branch Leadership Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
            <Store className="w-4 h-4 text-teal-400" />
            Top Retail Branch (Dynamic Finding)
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">
            Branch {topBranch.name} ({branchCityMap[topBranch.name] || 'Mumbai'}) generated ₹{topBranch.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })} in sales
          </h2>
          <p className="text-xs text-teal-200 mt-1">
            Achieved {topBranch.transactions} transactions with an average order value of ₹{topBranch.avgTransactionValue}.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center shrink-0">
          <div className="text-[11px] text-teal-200 uppercase">Share of Chain Sales</div>
          <div className="text-xl font-mono font-bold text-white">
            {topBranch.percentageOfTotalSales}%
          </div>
        </div>
      </div>

      {/* Visualizations: Branch Sales & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart
          title="Total Sales by Branch (₹)"
          subtitle="Comparative revenue across 4 strategic branch stores"
          data={branchSalesChartData}
          isCurrency={true}
          barColor="#2563eb"
          highlightId={topBranch.id}
        />

        <BarChart
          title="Transaction Volume by Branch"
          subtitle="Order throughput across retail branches"
          data={branchTxChartData}
          isCurrency={false}
          barColor="#0d9488"
        />
      </div>

      {/* Branch Performance Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Branch Performance Comparison Matrix
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Dynamic Branch Ranking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Branch</th>
                <th className="py-2.5 px-4">City</th>
                <th className="py-2.5 px-4 text-right">Total Revenue (₹)</th>
                <th className="py-2.5 px-4 text-right">Transaction Count</th>
                <th className="py-2.5 px-4 text-right">Avg Basket Spend</th>
                <th className="py-2.5 px-4 text-right">Quantity Sold</th>
                <th className="py-2.5 px-4 text-right">Avg Rating</th>
                <th className="py-2.5 px-4 text-right">Market Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {branches.map((b, idx) => (
                <tr
                  key={b.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    b.id === topBranch.id ? 'bg-teal-50/30 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">
                    Branch {b.name}
                    {idx === 0 && (
                      <span className="ml-2 text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded font-medium">
                        #1 Branch
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-700">
                    {branchCityMap[b.name] || 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    ₹{b.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    {b.transactions}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    ₹{b.avgTransactionValue.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-700">
                    {b.quantity}
                  </td>
                  <td className="py-3 px-4 text-right text-amber-600 font-semibold">
                    {b.avgRating?.toFixed(2)} ★
                  </td>
                  <td className="py-3 px-4 text-right text-teal-600 font-semibold">
                    {b.percentageOfTotalSales}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION: CITY ANALYSIS (Requirement #6) */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">
              City-Level Geographic Sales Analysis (Requirement #6)
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated transactions and revenue per metropolitan territory
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BarChart
            title="Total Sales by City (₹)"
            subtitle="Geographical distribution across Mumbai, Delhi, Bengaluru, Jaipur"
            data={citySalesChartData}
            isCurrency={true}
            barColor="#6366f1"
          />

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">City Revenue Contribution</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>{topCity.name}</strong> leads all cities with ₹{topCity.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({topCity.percentageOfTotalSales}% of total retail billing), followed by Delhi, Bengaluru, and Jaipur.
              </p>

              <div className="mt-4 space-y-3">
                {cities.map((c) => (
                  <div key={c.id} className="text-xs flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-semibold text-slate-800">{c.name}</span>
                    <span className="font-mono tabular-nums text-slate-900">
                      ₹{c.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({c.transactions} tx)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Highest ticket size city: <strong className="text-slate-800">{cities.slice().sort((a,b)=>b.avgTransactionValue-a.avgTransactionValue)[0]?.name}</strong> (₹{cities.slice().sort((a,b)=>b.avgTransactionValue-a.avgTransactionValue)[0]?.avgTransactionValue}/tx)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
