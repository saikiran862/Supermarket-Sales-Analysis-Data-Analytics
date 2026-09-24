import React from 'react';
import { CustomerTypeComparison } from '../../types/sales';
import { Users, UserCheck, User, TrendingUp, HelpCircle, Star, ArrowRight } from 'lucide-react';
import { ComparisonBarChart } from '../charts/ComparisonBarChart';

interface CustomerAnalysisViewProps {
  comparison: CustomerTypeComparison;
}

export const CustomerAnalysisView: React.FC<CustomerAnalysisViewProps> = ({
  comparison,
}) => {
  const { member, normal, difference, higherSpender } = comparison;

  const comparisonChartData = [
    {
      groupName: 'Average Basket Spend (₹)',
      metric1: {
        label: 'Member Basket',
        value: member.avgTransactionValue,
        formatted: `₹${member.avgTransactionValue}`,
      },
      metric2: {
        label: 'Normal Basket',
        value: normal.avgTransactionValue,
        formatted: `₹${normal.avgTransactionValue}`,
      },
    },
    {
      groupName: 'Total Sales Volume (₹)',
      metric1: {
        label: 'Member Sales',
        value: member.sales,
        formatted: `₹${member.sales.toLocaleString('en-IN')}`,
      },
      metric2: {
        label: 'Normal Sales',
        value: normal.sales,
        formatted: `₹${normal.sales.toLocaleString('en-IN')}`,
      },
    },
    {
      groupName: 'Transactions Recorded',
      metric1: {
        label: 'Member Orders',
        value: member.transactions,
        formatted: `${member.transactions} tx`,
      },
      metric2: {
        label: 'Normal Orders',
        value: normal.transactions,
        formatted: `${normal.transactions} tx`,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Central Question & Answer Callout Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white rounded-xl p-6 shadow-xs border border-indigo-900/50">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-indigo-400" />
          Core Research Question (Requirement #8)
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Do Members spend more than Normal customers?
        </h2>

        {/* Dynamic Analytical Answer */}
        <div className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15">
          <div className="text-sm sm:text-base font-semibold text-emerald-300 flex items-center gap-2">
            <span>Dynamic Finding:</span>
            <strong className="text-white">
              {higherSpender === 'Normal'
                ? 'No, Normal customers spend slightly more per transaction than Members.'
                : higherSpender === 'Member'
                ? 'Yes, Members spend more per transaction than Normal customers.'
                : 'Both customer segments have identical average transaction values.'}
            </strong>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <span className="text-indigo-200">Enrolled Member Average:</span>
              <div className="text-xl font-mono font-bold text-white mt-0.5">
                ₹{member.avgTransactionValue}
              </div>
              <span className="text-[11px] text-indigo-300">
                {member.transactions} total transactions (₹{member.sales.toLocaleString('en-IN')})
              </span>
            </div>
            <div className="bg-black/20 p-3 rounded-lg border border-white/10">
              <span className="text-indigo-200">Normal Walk-In Customer Average:</span>
              <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">
                ₹{normal.avgTransactionValue}
              </div>
              <span className="text-[11px] text-indigo-300">
                {normal.transactions} total transactions (₹{normal.sales.toLocaleString('en-IN')})
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-indigo-100/90 leading-relaxed">
            <strong>Analytical Interpretation:</strong> Normal shoppers spend ₹{difference} more on average per transaction ({comparison.percentageDifference}% higher). While enrolled Members frequent the store with high loyalty, their baskets tend to be smaller daily replenishment purchases. This provides a clear CRM opportunity to introduce tiered minimum basket threshold discounts.
          </p>
        </div>
      </div>

      {/* Side-by-Side Detailed Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Member Profile */}
        <div className="bg-white rounded-xl border border-indigo-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Member Customers</h3>
                <span className="text-[11px] text-slate-500">Enrolled Supermarket Loyalty Shoppers</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {member.salesShare}% Sales Share
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Total Revenue</span>
              <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                ₹{member.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Average Basket</span>
              <div className="text-lg font-mono font-bold text-indigo-600 mt-0.5">
                ₹{member.avgTransactionValue}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Transactions</span>
              <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                {member.transactions}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Average Rating</span>
              <div className="text-lg font-mono font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {member.avgRating.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Normal Profile */}
        <div className="bg-white rounded-xl border border-teal-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-teal-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Normal Customers</h3>
                <span className="text-[11px] text-slate-500">Walk-In & Occasional Shoppers</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
              {normal.salesShare}% Sales Share
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Total Revenue</span>
              <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                ₹{normal.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Average Basket</span>
              <div className="text-lg font-mono font-bold text-teal-600 mt-0.5">
                ₹{normal.avgTransactionValue}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Transactions</span>
              <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                {normal.transactions}
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-500 text-[11px]">Average Rating</span>
              <div className="text-lg font-mono font-bold text-amber-600 mt-0.5 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {normal.avgRating.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Bar Chart */}
      <ComparisonBarChart
        title="Side-by-Side Segment Comparison Matrix"
        subtitle="Comparing Member shoppers against Normal customers across key retail KPIs"
        data={comparisonChartData}
        metric1Color="#4f46e5"
        metric2Color="#0d9488"
        metric1Name="Member Shoppers"
        metric2Name="Normal Customers"
      />
    </div>
  );
};
