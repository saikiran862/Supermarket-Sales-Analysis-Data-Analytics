import React from 'react';
import { OverallKPIs } from '../../types/sales';
import {
  IndianRupee,
  ReceiptText,
  ShoppingBag,
  TrendingUp,
  Star,
  Award,
  Store,
  Layers,
  CreditCard,
} from 'lucide-react';

interface KpiCardsGridProps {
  kpis: OverallKPIs;
  totalFilteredRecords: number;
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({ kpis }) => {
  const cards = [
    {
      id: 'total-sales',
      title: 'Total Gross Sales',
      value: `₹${kpis.totalSales.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      subtitle: `${kpis.totalTransactions} transactions recorded`,
      icon: IndianRupee,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-200',
    },
    {
      id: 'total-transactions',
      title: 'Total Transactions',
      value: kpis.totalTransactions.toLocaleString('en-IN'),
      subtitle: `Invoice volume across branches`,
      icon: ReceiptText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderColor: 'hover:border-blue-200',
    },
    {
      id: 'total-quantity',
      title: 'Total Quantity Sold',
      value: kpis.totalQuantity.toLocaleString('en-IN'),
      subtitle: `Units across all product lines`,
      icon: ShoppingBag,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      borderColor: 'hover:border-purple-200',
    },
    {
      id: 'avg-ticket',
      title: 'Avg Transaction Value',
      value: `₹${kpis.averageTransactionValue.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      subtitle: `Mean checkout basket spend`,
      icon: TrendingUp,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      borderColor: 'hover:border-indigo-200',
    },
    {
      id: 'avg-rating',
      title: 'Avg Customer Rating',
      value: `${kpis.averageRating.toFixed(2)} / 5.00`,
      subtitle: `Customer satisfaction score`,
      icon: Star,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      borderColor: 'hover:border-amber-200',
    },
    {
      id: 'top-product',
      title: 'Highest-Selling Product',
      value: kpis.highestSellingProduct.name,
      subtitle: `₹${kpis.highestSellingProduct.sales.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })} (${kpis.highestSellingProduct.quantity} units)`,
      icon: Award,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      borderColor: 'hover:border-rose-200',
    },
    {
      id: 'top-branch',
      title: 'Best-Performing Branch',
      value: `Branch ${kpis.bestPerformingBranch.name}`,
      subtitle: `${kpis.bestPerformingBranch.city} · ₹${kpis.bestPerformingBranch.sales.toLocaleString(
        'en-IN',
        { minimumFractionDigits: 2 }
      )}`,
      icon: Store,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      borderColor: 'hover:border-teal-200',
    },
    {
      id: 'top-category',
      title: 'Highest-Selling Category',
      value: kpis.highestSellingCategory.name,
      subtitle: `₹${kpis.highestSellingCategory.sales.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
      })} (${kpis.highestSellingCategory.quantity} units)`,
      icon: Layers,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      borderColor: 'hover:border-amber-200',
    },
    {
      id: 'top-payment',
      title: 'Most Used Payment',
      value: kpis.mostUsedPaymentMethod.name,
      subtitle: `${kpis.mostUsedPaymentMethod.count} transactions · ₹${kpis.mostUsedPaymentMethod.sales.toLocaleString(
        'en-IN',
        { maximumFractionDigits: 0 }
      )}`,
      icon: CreditCard,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50',
      borderColor: 'hover:border-cyan-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white rounded-xl border border-slate-200/90 p-4 transition-all duration-200 hover:shadow-xs ${card.borderColor}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 tracking-tight">
                  {card.title}
                </span>
                <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
                  {card.value}
                </div>
                <p className="text-xs text-slate-600 truncate max-w-[210px]" title={card.subtitle}>
                  {card.subtitle}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
