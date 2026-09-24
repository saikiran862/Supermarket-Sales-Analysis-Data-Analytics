import React from 'react';
import { MetricItem } from '../../types/sales';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';
import { CreditCard, Smartphone, Wallet, Landmark, Award } from 'lucide-react';

interface PaymentAnalysisViewProps {
  payments: MetricItem[];
}

export const PaymentAnalysisView: React.FC<PaymentAnalysisViewProps> = ({
  payments,
}) => {
  const topPayment = payments.reduce(
    (max, cur) => (cur.transactions > max.transactions ? cur : max),
    payments[0] || { name: 'UPI', transactions: 0, sales: 0, avgTransactionValue: 0 }
  );

  const barChartData = payments.map((p) => ({
    id: p.id,
    label: p.name,
    value: p.sales,
    secondaryValue: p.transactions,
    secondaryLabel: 'tx',
  }));

  const donutChartData = payments.map((p) => ({
    id: p.id,
    label: p.name,
    value: p.transactions,
    percentage: p.percentageOfTotalSales,
  }));

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'upi':
        return Smartphone;
      case 'card':
        return CreditCard;
      case 'net banking':
        return Landmark;
      default:
        return Wallet;
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Banner */}
      <div className="bg-gradient-to-r from-cyan-950 to-slate-900 text-white rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-cyan-400" />
            Most Used Payment Method (Dynamic Finding)
          </span>
          <h2 className="text-2xl font-bold mt-1 text-white tracking-tight">
            {topPayment.name} was the most used payment method with {topPayment.transactions} transactions
          </h2>
          <p className="text-xs text-cyan-200 mt-1">
            Totaled ₹{topPayment.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })} in sales with an average transaction value of ₹{topPayment.avgTransactionValue}.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-lg p-3 text-center shrink-0">
          <div className="text-[11px] text-cyan-200 uppercase">Transaction Share</div>
          <div className="text-xl font-mono font-bold text-white">
            {(
              (topPayment.transactions /
                (payments.reduce((s, p) => s + p.transactions, 0) || 1)) *
              100
            ).toFixed(1)}
            %
          </div>
        </div>
      </div>

      {/* Visualizations: Bar + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart
          title="Total Sales by Payment Channel (₹)"
          subtitle="Monetary settlement volume by payment method"
          data={barChartData}
          isCurrency={true}
          barColor="#0891b2"
          highlightId={topPayment.id}
        />

        <DonutChart
          title="Payment Method Transaction Distribution"
          subtitle="Proportional split of checkout invoice counts"
          data={donutChartData}
          centerLabel="Total Invoices"
          centerValue={`${payments.reduce((s, p) => s + p.transactions, 0)} tx`}
          isCurrency={false}
        />
      </div>

      {/* Payment Method Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {payments.map((p) => {
          const Icon = getIcon(p.name);
          const isTop = p.id === topPayment.id;
          return (
            <div
              key={p.id}
              className={`bg-white rounded-xl border p-4 shadow-xs flex flex-col justify-between transition-all ${
                isTop ? 'border-cyan-300 ring-1 ring-cyan-200' : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-4 h-4 text-cyan-700" />
                  </div>
                  {isTop && (
                    <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">
                      #1 Popular
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {p.transactions} tx
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Total Sales:</span>
                  <span className="font-mono font-medium text-slate-900">
                    ₹{p.sales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Avg Ticket:</span>
                  <span className="font-mono font-medium text-slate-900">
                    ₹{p.avgTransactionValue}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
