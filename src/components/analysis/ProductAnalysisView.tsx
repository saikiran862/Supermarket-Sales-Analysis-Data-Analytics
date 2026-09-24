import React, { useState } from 'react';
import { MetricItem, SalesRecord } from '../../types/sales';
import { BarChart } from '../charts/BarChart';
import { Award, ShoppingBag, ArrowUpDown } from 'lucide-react';

interface ProductAnalysisViewProps {
  products: MetricItem[];
  records: SalesRecord[];
}

export const ProductAnalysisView: React.FC<ProductAnalysisViewProps> = ({
  products,
}) => {
  const [sortField, setSortField] = useState<'sales' | 'quantity' | 'transactions' | 'avgTransactionValue'>('sales');
  const [sortAsc, setSortAsc] = useState(false);

  const topProduct = products[0] || { name: 'N/A', sales: 0, quantity: 0, transactions: 0 };

  const sortedProducts = [...products].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Prepare chart data
  const salesBarData = products.map((p) => ({
    id: p.id,
    label: p.name,
    value: p.sales,
    secondaryValue: p.quantity,
    secondaryLabel: 'units',
  }));

  const quantityBarData = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .map((p) => ({
      id: p.id,
      label: p.name,
      value: p.quantity,
      secondaryValue: p.sales,
      secondaryLabel: '₹',
      formattedValue: `${p.quantity} units`,
      color: '#0d9488',
    }));

  return (
    <div className="space-y-6">
      {/* Product Highlight Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Highest Revenue Product (Dynamic Finding)
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">
            {topProduct.name} generated the highest sales: ₹{topProduct.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            Sold {topProduct.quantity} units across {topProduct.transactions} transactions, averaging ₹{topProduct.avgTransactionValue} per order.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center shrink-0">
          <div className="text-[11px] text-blue-200 uppercase">Share of Sales</div>
          <div className="text-xl font-mono font-bold text-white">
            {topProduct.percentageOfTotalSales}%
          </div>
        </div>
      </div>

      {/* Visualizations Grid: Sales vs Quantity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart
          title="Total Sales by Product (₹)"
          subtitle="Ranked in descending order of gross revenue"
          data={salesBarData}
          isCurrency={true}
          barColor="#2563eb"
          highlightId={topProduct.id}
        />

        <BarChart
          title="Quantity Sold by Product (Units)"
          subtitle="Ranked in descending order of volume sold"
          data={quantityBarData}
          isCurrency={false}
          barColor="#0d9488"
        />
      </div>

      {/* Product Performance Ranking Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-semibold text-slate-900">
              Product Performance & Metrics Ranking ({products.length} SKUs)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Click headers to sort</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Rank</th>
                <th className="py-2.5 px-4">Product Name</th>
                <th
                  onClick={() => handleSort('sales')}
                  className="py-2.5 px-4 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="flex items-center justify-end gap-1">
                    Total Sales <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('quantity')}
                  className="py-2.5 px-4 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="flex items-center justify-end gap-1">
                    Units Sold <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('transactions')}
                  className="py-2.5 px-4 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="flex items-center justify-end gap-1">
                    Transactions <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('avgTransactionValue')}
                  className="py-2.5 px-4 text-right cursor-pointer hover:text-blue-600"
                >
                  <div className="flex items-center justify-end gap-1">
                    Avg / Order <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-4 text-right">Avg Rating</th>
                <th className="py-2.5 px-4 text-right">Revenue Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {sortedProducts.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    p.id === topProduct.id ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 text-slate-400 font-semibold font-sans">
                    #{idx + 1}
                  </td>
                  <td className="py-2.5 px-4 font-sans font-semibold text-slate-900">
                    {p.name}
                    {p.id === topProduct.id && (
                      <span className="ml-2 text-[10px] font-sans text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                        Top Seller
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                    ₹{p.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    {p.quantity.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    {p.transactions}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-700">
                    ₹{p.avgTransactionValue.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-4 text-right text-amber-600 font-semibold">
                    {p.avgRating?.toFixed(2)} ★
                  </td>
                  <td className="py-2.5 px-4 text-right text-blue-600 font-semibold">
                    {p.percentageOfTotalSales}%
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
