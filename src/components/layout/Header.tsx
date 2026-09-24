import React from 'react';
import { NavTabId } from './Sidebar';
import { Download, Printer, UploadCloud, CheckCircle2 } from 'lucide-react';
import { exportToCsv } from '../../utils/dataProcessor';
import { SalesRecord } from '../../types/sales';

interface HeaderProps {
  activeTab: NavTabId;
  totalFiltered: number;
  totalRaw: number;
  records: SalesRecord[];
  onUploadClick: () => void;
}

const TAB_TITLES: Record<NavTabId, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Supermarket Sales Executive Dashboard',
    subtitle: 'High-level business KPIs, financial revenue overview, and visual distributions',
  },
  preprocessing: {
    title: 'Data Loading & Quality Preprocessing Pipeline',
    subtitle: 'Missing-value audits, duplicate checking, and formula verification: Sales = Quantity × Unit Price',
  },
  products: {
    title: 'Product-Level Performance Analytics',
    subtitle: 'Revenue, quantity sold, and average order value across merchandise catalog',
  },
  branches: {
    title: 'Branch & Metropolitan City Sales Analysis',
    subtitle: 'Comparative operational benchmarks across retail branches A, B, C, and D',
  },
  categories: {
    title: 'Merchandise Category Contribution Analysis',
    subtitle: 'Departmental sales volume and category revenue share breakdown',
  },
  customers: {
    title: 'Customer Segmentation & Spending Behavior',
    subtitle: 'Loyalty member dynamics: Empirical comparison of Member vs Normal shopper baskets',
  },
  payments: {
    title: 'Payment Method & Settlement Rail Distribution',
    subtitle: 'Transaction share and revenue volume across UPI, Net Banking, Cards, and Cash',
  },
  ratings: {
    title: 'Customer Satisfaction & Rating Analytics',
    subtitle: 'CSAT distribution (1.0 to 5.0 stars) and cross-correlations with products and branches',
  },
  insights: {
    title: 'Automated Business Insights & Strategic Decisions',
    subtitle: 'Data-driven managerial findings and actionable retail optimization recommendations',
  },
  validation: {
    title: 'Analysis Validation Suite (Section 22)',
    subtitle: 'Cross-verifying dynamic calculations against formal analytical benchmarks',
  },
  datatable: {
    title: 'Interactive Transaction Ledger',
    subtitle: 'Searchable, sortable, and exportable supermarket transaction records',
  },
  report: {
    title: 'College Project Academic Report & Technical Guide',
    subtitle: 'Complete 6-chapter formal report, Viva Voce defense FAQ, and Python/Pandas codebase',
  },
};

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  totalFiltered,
  totalRaw,
  records,
  onUploadClick,
}) => {
  const currentMeta = TAB_TITLES[activeTab] || {
    title: 'Supermarket Sales Analysis',
    subtitle: 'Data analytics platform',
  };

  const handleExportData = () => {
    const exportable = records.map((r) => ({
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
      'Sales (Calculated)': r.calculatedSales,
    }));
    exportToCsv(exportable, 'supermarket_sales_cleaned.csv');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30">
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
          <span>Supermarket Sales Analysis</span>
          <span>/</span>
          <span className="font-semibold text-slate-700 capitalize">{activeTab}</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {currentMeta.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
          {currentMeta.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onUploadClick}
          className="flex items-center gap-1.5 text-xs text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
          Upload Dataset
        </button>

        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 text-xs text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          Export CSV
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 font-medium px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          Print Report
        </button>
      </div>
    </header>
  );
};
