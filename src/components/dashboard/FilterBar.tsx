import React from 'react';
import { FilterState, SalesRecord } from '../../types/sales';
import { Filter, RotateCcw, Search, X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  records: SalesRecord[];
  totalFilteredCount: number;
  totalRawCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  records,
  totalFilteredCount,
  totalRawCount,
}) => {
  // Extract unique filter options from dataset
  const branches = Array.from(new Set(records.map((r) => r.branch))).sort();
  const cities = Array.from(new Set(records.map((r) => r.city))).sort();
  const products = Array.from(new Set(records.map((r) => r.product))).sort();
  const categories = Array.from(new Set(records.map((r) => r.category))).sort();
  const customerTypes = Array.from(new Set(records.map((r) => r.customerType))).sort();
  const payments = Array.from(new Set(records.map((r) => r.payment))).sort();

  const activeFilterCount = [
    filters.branch !== 'all',
    filters.city !== 'all',
    filters.product !== 'all',
    filters.category !== 'all',
    filters.customerType !== 'all',
    filters.payment !== 'all',
    filters.minRating > 1.0 || filters.maxRating < 5.0,
    filters.searchQuery.trim().length > 0,
  ].filter(Boolean).length;

  const handleChange = (key: keyof FilterState, val: string | number) => {
    onFilterChange({
      ...filters,
      [key]: val,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 mb-6">
      {/* Top Header Row of Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900">Interactive Analytics Filters</span>
          {activeFilterCount > 0 ? (
            <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full border border-blue-200">
              {activeFilterCount} active
            </span>
          ) : (
            <span className="text-xs text-slate-600">Showing all records</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            Showing <strong className="text-slate-800">{totalFilteredCount}</strong> of{' '}
            {totalRawCount} transactions
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium hover:bg-rose-50 px-2 py-1 rounded transition-colors"
              title="Reset all filters to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Filter Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-3">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Search Keyword
          </label>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              placeholder="Invoice ID, item, branch..."
              className="w-full text-xs pl-8 pr-7 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleChange('searchQuery', '')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Branch</label>
          <select
            value={filters.branch}
            onChange={(e) => handleChange('branch', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Branches</option>
            {branches.map((b) => (
              <option key={b} value={b}>
                Branch {b}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">City</label>
          <select
            value={filters.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Type */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Customer Type</label>
          <select
            value={filters.customerType}
            onChange={(e) => handleChange('customerType', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Customer Types</option>
            {customerTypes.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>

        {/* Payment */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Payment Method</label>
          <select
            value={filters.payment}
            onChange={(e) => handleChange('payment', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Payment Methods</option>
            {payments.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Secondary row: Product dropdown & Rating Range Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 mt-2 border-t border-slate-100">
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Specific Product</label>
          <select
            value={filters.product}
            onChange={(e) => handleChange('product', e.target.value)}
            className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Products ({products.length} SKUs)</option>
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Slider */}
        <div className="sm:col-span-2 flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <div className="shrink-0 text-xs font-medium text-slate-700">
            Min Customer Rating: <span className="font-mono font-bold text-blue-600">{filters.minRating.toFixed(1)} ★</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.1"
            value={filters.minRating}
            onChange={(e) => handleChange('minRating', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="text-[11px] text-slate-600 font-mono shrink-0">1.0 to 5.0</div>
        </div>
      </div>
    </div>
  );
};
