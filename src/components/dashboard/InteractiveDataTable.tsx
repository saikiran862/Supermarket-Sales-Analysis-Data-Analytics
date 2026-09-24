import React, { useState, useMemo } from 'react';
import { SalesRecord } from '../../types/sales';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Eye,
  Search,
} from 'lucide-react';
import { exportToCsv } from '../../utils/dataProcessor';

interface InteractiveDataTableProps {
  records: SalesRecord[];
}

type SortField = keyof SalesRecord;

export const InteractiveDataTable: React.FC<InteractiveDataTableProps> = ({ records }) => {
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField>('rowIndex');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    rowIndex: true,
    invoiceId: true,
    date: true,
    branch: true,
    city: true,
    customerType: true,
    product: true,
    category: true,
    quantity: true,
    unitPrice: true,
    payment: true,
    rating: true,
    calculatedSales: true,
  });

  const [showColMenu, setShowColMenu] = useState(false);

  // Filtered & Sorted
  const filteredData = useMemo(() => {
    let result = records;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.invoiceId.toLowerCase().includes(q) ||
          r.product.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.branch.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.customerType.toLowerCase().includes(q) ||
          r.payment.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA || '');
      const strB = String(valB || '');
      return sortDirection === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [records, search, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportTable = () => {
    const exportable = filteredData.map((r) => ({
      'Invoice ID': r.invoiceId,
      Date: r.date,
      Branch: r.branch,
      City: r.city,
      'Customer Type': r.customerType,
      Gender: r.gender,
      Product: r.product,
      Category: r.category,
      Quantity: r.quantity,
      'Unit Price': r.unitPrice,
      Payment: r.payment,
      Rating: r.rating,
      'Recorded Sales': r.originalSales,
      'Calculated Sales (Qty x UnitPrice)': r.calculatedSales,
    }));
    exportToCsv(exportable, 'supermarket_sales_cleaned.csv');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Top Controls */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search in table..."
              className="text-xs pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-56 sm:w-64"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {filteredData.length} records
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Column Visibility Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowColMenu((p) => !p)}
              className="flex items-center gap-1.5 text-xs text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Columns
            </button>
            {showColMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-20 space-y-1">
                <div className="text-[11px] font-semibold text-slate-500 px-2 py-1 uppercase">
                  Toggle Columns
                </div>
                {Object.keys(visibleColumns).map((col) => (
                  <label
                    key={col}
                    className="flex items-center gap-2 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 rounded cursor-pointer capitalize"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col]}
                      onChange={(e) =>
                        setVisibleColumns((prev) => ({ ...prev, [col]: e.target.checked }))
                      }
                      className="accent-blue-600 rounded"
                    />
                    <span>{col.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Export CSV button */}
          <button
            onClick={handleExportTable}
            className="flex items-center gap-1.5 text-xs text-white bg-slate-900 hover:bg-slate-800 font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
            <tr>
              {visibleColumns.rowIndex && (
                <th className="py-2.5 px-3 w-12 text-center">#</th>
              )}
              {visibleColumns.invoiceId && (
                <th
                  onClick={() => handleSort('invoiceId')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    Invoice ID <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}
              {visibleColumns.date && (
                <th
                  onClick={() => handleSort('date')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1">
                    Date <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}
              {visibleColumns.branch && (
                <th
                  onClick={() => handleSort('branch')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  Branch
                </th>
              )}
              {visibleColumns.city && (
                <th
                  onClick={() => handleSort('city')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  City
                </th>
              )}
              {visibleColumns.customerType && (
                <th
                  onClick={() => handleSort('customerType')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  Type
                </th>
              )}
              {visibleColumns.product && (
                <th
                  onClick={() => handleSort('product')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  Product
                </th>
              )}
              {visibleColumns.category && (
                <th
                  onClick={() => handleSort('category')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  Category
                </th>
              )}
              {visibleColumns.quantity && (
                <th
                  onClick={() => handleSort('quantity')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  Qty
                </th>
              )}
              {visibleColumns.unitPrice && (
                <th
                  onClick={() => handleSort('unitPrice')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  Unit Price
                </th>
              )}
              {visibleColumns.payment && (
                <th
                  onClick={() => handleSort('payment')}
                  className="py-2.5 px-3 cursor-pointer hover:text-blue-600"
                >
                  Payment
                </th>
              )}
              {visibleColumns.rating && (
                <th
                  onClick={() => handleSort('rating')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-blue-600"
                >
                  Rating
                </th>
              )}
              {visibleColumns.calculatedSales && (
                <th
                  onClick={() => handleSort('calculatedSales')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:text-blue-600 whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    Sales (Qty × Price) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={13} className="py-8 text-center text-slate-400">
                  No matching transaction records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr key={row.invoiceId + row.rowIndex} className="hover:bg-slate-50/80 transition-colors">
                  {visibleColumns.rowIndex && (
                    <td className="py-2 px-3 text-center font-mono text-[11px] text-slate-600 font-semibold">
                      {row.rowIndex}
                    </td>
                  )}
                  {visibleColumns.invoiceId && (
                    <td className="py-2 px-3 font-mono font-medium text-slate-900 whitespace-nowrap">
                      {row.invoiceId}
                    </td>
                  )}
                  {visibleColumns.date && (
                    <td className="py-2 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {row.date}
                    </td>
                  )}
                  {visibleColumns.branch && (
                    <td className="py-2 px-3 font-semibold text-slate-800">
                      {row.branch}
                    </td>
                  )}
                  {visibleColumns.city && (
                    <td className="py-2 px-3 text-slate-700">{row.city}</td>
                  )}
                  {visibleColumns.customerType && (
                    <td className="py-2 px-3">
                      <span
                        className={`text-[11px] font-medium ${
                          row.customerType === 'Member'
                            ? 'text-indigo-600'
                            : 'text-slate-600'
                        }`}
                      >
                        {row.customerType}
                      </span>
                    </td>
                  )}
                  {visibleColumns.product && (
                    <td className="py-2 px-3 font-medium text-slate-900 whitespace-nowrap">
                      {row.product}
                    </td>
                  )}
                  {visibleColumns.category && (
                    <td className="py-2 px-3 text-slate-600">{row.category}</td>
                  )}
                  {visibleColumns.quantity && (
                    <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {row.quantity}
                    </td>
                  )}
                  {visibleColumns.unitPrice && (
                    <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                      ₹{row.unitPrice.toFixed(2)}
                    </td>
                  )}
                  {visibleColumns.payment && (
                    <td className="py-2 px-3 text-slate-600">{row.payment}</td>
                  )}
                  {visibleColumns.rating && (
                    <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-amber-600">
                      {row.rating.toFixed(1)} ★
                    </td>
                  )}
                  {visibleColumns.calculatedSales && (
                    <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-900 whitespace-nowrap">
                      ₹{row.calculatedSales.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1 px-2 border border-slate-200 rounded bg-white text-xs font-mono"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="font-mono tabular-nums text-slate-500 ml-2">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-mono font-medium">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
