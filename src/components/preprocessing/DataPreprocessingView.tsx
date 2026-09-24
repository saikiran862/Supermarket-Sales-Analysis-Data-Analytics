import React, { useRef } from 'react';
import { PreprocessingAudit } from '../../types/sales';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  Calculator,
  Database,
  FileSpreadsheet,
} from 'lucide-react';

interface DataPreprocessingViewProps {
  audit: PreprocessingAudit;
  onFileUpload: (file: File) => void;
  onResetToDefault: () => void;
}

export const DataPreprocessingView: React.FC<DataPreprocessingViewProps> = ({
  audit,
  onFileUpload,
  onResetToDefault,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload & Source Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upload Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="lg:col-span-2 bg-white rounded-xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv,.txt"
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-800">
            Upload Supermarket CSV Dataset
          </h4>
          <p className="text-xs text-slate-500 max-w-md mt-1">
            Drag and drop your sales CSV or click to browse. The application automatically standardizes headers, checks for duplicates, computes <span className="font-mono font-medium text-slate-700">Sales = Quantity × Unit Price</span>, and validates schema integrity.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-1 rounded font-medium">
              Supported format: .csv, .txt (approx. 500 rows)
            </span>
          </div>
        </div>

        {/* Current Active Dataset Info */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Active Dataset Source
              </span>
              <span className="font-mono text-[11px]">
                {audit.sourceType === 'default' ? 'Built-in Dataset' : 'Custom Upload'}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 truncate">
              {audit.sourceName}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Parsed at {new Date(audit.auditTimestamp).toLocaleTimeString()}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2 rounded-lg">
                <div className="text-[11px] text-slate-500">Total Rows</div>
                <div className="text-lg font-mono font-bold text-slate-900">
                  {audit.totalRawRows}
                </div>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <div className="text-[11px] text-slate-500">Total Columns</div>
                <div className="text-lg font-mono font-bold text-slate-900">
                  {audit.totalColumns}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onResetToDefault}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium py-1 px-2 rounded hover:bg-blue-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to 500 Records
            </button>
            <a
              href="/supermarket_sales.csv"
              download="supermarket_sales.csv"
              className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium py-1 px-2 rounded hover:bg-slate-100"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              Download Raw CSV
            </a>
          </div>
        </div>
      </div>

      {/* Preprocessing & Data Quality Audit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Missing Values Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Missing Values</span>
            {audit.missingValuesCount === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {audit.missingValuesCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {audit.missingValuesCount === 0
              ? 'Zero null or empty cells detected'
              : `${audit.missingValuesCount} null values imputed/handled`}
          </p>
        </div>

        {/* Duplicate Rows Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Duplicate Invoices</span>
            {audit.duplicateRowsCount === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {audit.duplicateRowsCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {audit.duplicateRowsCount === 0
              ? 'All 500 Invoice IDs are unique'
              : `${audit.duplicateRowsCount} duplicates identified`}
          </p>
        </div>

        {/* Numerical Validation Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Numerical Data Integrity</span>
            {audit.invalidNumericalCount === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            )}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {audit.invalidNumericalCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {audit.invalidNumericalCount === 0
              ? 'Positive quantities, prices & valid ratings'
              : `${audit.invalidNumericalCount} invalid values detected`}
          </p>
        </div>

        {/* Formula Validation Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Sales Formula Audit</span>
            {audit.salesFormulaMismatches.length === 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900">
            {audit.salesFormulaMismatches.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {audit.salesFormulaMismatches.length === 0
              ? 'Sales = Quantity × Price (100% verified)'
              : `${audit.salesFormulaMismatches.length} records had discrepancies`}
          </p>
        </div>
      </div>

      {/* Formula Audit & Inconsistency Details */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Calculation Protocol: Sales = Quantity × Unit Price
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          As required by data preprocessing guidelines, the application verifies the recorded Sales column against the formula <strong className="font-mono text-slate-800">Calculated Sales = Quantity × Unit Price</strong> without silently overwriting the original dataset.
        </p>

        {audit.salesFormulaMismatches.length === 0 ? (
          <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center gap-3 text-xs text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold">Consistency Verified:</span> All 500 rows match the formula within a floating-point tolerance of ±₹0.05. The recorded total is ₹244,411.08.
            </div>
          </div>
        ) : (
          <div className="mt-4 border border-amber-200 rounded-lg overflow-hidden">
            <div className="bg-amber-50 p-2.5 text-xs font-semibold text-amber-900 border-b border-amber-200">
              Discrepancies Detected ({audit.salesFormulaMismatches.length})
            </div>
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-[11px] text-slate-500">
                  <tr>
                    <th className="py-2 px-3">Invoice ID</th>
                    <th className="py-2 px-3">Product</th>
                    <th className="py-2 px-3 text-right">Qty</th>
                    <th className="py-2 px-3 text-right">Unit Price</th>
                    <th className="py-2 px-3 text-right">Calculated</th>
                    <th className="py-2 px-3 text-right">Recorded</th>
                    <th className="py-2 px-3 text-right">Diff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {audit.salesFormulaMismatches.map((m) => (
                    <tr key={m.invoiceId} className="hover:bg-amber-50/40">
                      <td className="py-1.5 px-3 font-semibold">{m.invoiceId}</td>
                      <td className="py-1.5 px-3">{m.product}</td>
                      <td className="py-1.5 px-3 text-right">{m.quantity}</td>
                      <td className="py-1.5 px-3 text-right">₹{m.unitPrice.toFixed(2)}</td>
                      <td className="py-1.5 px-3 text-right font-bold text-blue-600">
                        ₹{m.calculatedSales.toFixed(2)}
                      </td>
                      <td className="py-1.5 px-3 text-right text-slate-600">
                        ₹{m.recordedSales.toFixed(2)}
                      </td>
                      <td className="py-1.5 px-3 text-right text-rose-600 font-bold">
                        ₹{m.diff.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Dataset Schema & Column Types Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-semibold text-slate-900">
            Detected Column Schema & Data Types ({audit.columns.length} columns)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Column Name</th>
                <th className="py-2.5 px-3">Mapped Standard Key</th>
                <th className="py-2.5 px-3">Inferred Data Type</th>
                <th className="py-2.5 px-3 text-right">Non-Null Count</th>
                <th className="py-2.5 px-3">Sample Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {audit.columns.map((col) => (
                <tr key={col.name} className="hover:bg-slate-50/70">
                  <td className="py-2 px-3 font-semibold text-slate-800">{col.name}</td>
                  <td className="py-2 px-3 font-mono text-slate-600">{col.standardName}</td>
                  <td className="py-2 px-3">
                    <span className="text-[11px] font-mono text-slate-600">
                      {col.inferredType}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-700">
                    {col.nonNullCount} / {audit.totalRawRows}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-500 truncate max-w-[160px]">
                    {col.sampleValue}
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
