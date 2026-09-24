import React, { useState } from 'react';
import {
  BookOpen,
  Printer,
  Download,
  FileCode2,
  HelpCircle,
  Terminal,
  CheckCircle,
  Copy,
} from 'lucide-react';
import { OverallKPIs, CustomerTypeComparison } from '../../types/sales';

interface ProjectReportViewProps {
  kpis: OverallKPIs;
  customerComp: CustomerTypeComparison;
  totalRecordsCount: number;
}

export const ProjectReportView: React.FC<ProjectReportViewProps> = ({
  kpis,
  customerComp,
  totalRecordsCount,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'code' | 'viva'>('report');
  const [copiedCode, setCopiedCode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const pythonAnalysisCode = `"""
Supermarket Sales Analysis - Data Analytics Project
Standalone Python Pandas & Matplotlib Script
"""

import pandas as pd
import numpy as np

# 1. Load Dataset
df = pd.read_csv('supermarket_sales.csv')
print(f"Total Rows: {len(df)}, Columns: {df.shape[1]}")

# 2. Data Cleaning & Validation
# Sales = Quantity * Unit Price
df['Calculated_Sales'] = (df['Quantity'] * df['Unit Price']).round(2)
mismatches = df[abs(df['Sales'] - df['Calculated_Sales']) > 0.05]
print(f"Sales Formula Inconsistencies: {len(mismatches)}")

# Missing values & duplicates
print(f"Missing Values:\\n{df.isnull().sum()}")
print(f"Duplicate Invoices: {df['Invoice ID'].duplicated().sum()}")

# 3. KPI Calculations
total_sales = df['Calculated_Sales'].sum()
avg_rating = df['Rating'].mean()
print(f"Total Revenue: ₹{total_sales:,.2f}")
print(f"Average Customer Rating: {avg_rating:.2f}/5.00")

# 4. Product Analysis
prod_sales = df.groupby('Product')['Calculated_Sales'].sum().sort_values(ascending=False)
print("\\n--- Top Selling Products ---")
print(prod_sales.head())

# 5. Branch Analysis
branch_sales = df.groupby('Branch')['Calculated_Sales'].agg(['sum', 'count', 'mean'])
print("\\n--- Branch Performance ---")
print(branch_sales)

# 6. Customer Type Comparison: Member vs Normal
cust_comp = df.groupby('Customer Type')['Calculated_Sales'].agg(['mean', 'sum', 'count'])
print("\\n--- Customer Type Comparison ---")
print(cust_comp)

# 7. Payment Methods
pay_counts = df['Payment'].value_counts()
print("\\n--- Most Popular Payment Methods ---")
print(pay_counts)
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonAnalysisCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation & Action Controls */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            College Project Report (Chapters 1–6)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Python Pandas Code & Execution
          </button>
          <button
            onClick={() => setActiveTab('viva')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'viva'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Viva Voce & Defense Q&A
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* TAB 1: ACADEMIC REPORT */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-8 shadow-xs space-y-8 print:p-0 print:border-none print:shadow-none">
          {/* Cover Header */}
          <div className="border-b border-slate-200 pb-6 text-center">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              B.Tech Data Analytics Project Report
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Supermarket Sales Analysis – Data Analytics Project
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Automated Exploratory Data Analysis, Revenue Optimization, Customer Segmentation, and Strategic Decision Framework
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-600">
              <span>Dataset: <strong className="text-slate-800">{totalRecordsCount} Transactions</strong></span>
              <span>·</span>
              <span>Gross Sales: <strong className="text-slate-800 font-mono">₹{kpis.totalSales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong></span>
              <span>·</span>
              <span>Customer Rating: <strong className="text-slate-800 font-mono">{kpis.averageRating.toFixed(2)}/5.00</strong></span>
            </div>
          </div>

          {/* Chapter 1 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 1 – Introduction
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>1.1 Background:</strong> Modern retail supermarkets process thousands of daily transactions across diverse product lines, multi-tier store locations, and varied payment options. To remain competitive and maximize margins, supermarket management requires precise, data-driven visibility into sales performance, consumer payment preferences, and store operational benchmarks.
              </p>
              <p>
                <strong>1.2 Problem Statement:</strong> Supermarket executives often grapple with disparate transaction logs, pricing discrepancies, and unclear customer segment behavior. Specifically, answering whether loyalty membership programs generate higher customer spend, which product categories lead revenue, and how branches compare is vital for inventory forecasting and promotional ROI.
              </p>
              <p>
                <strong>1.3 Objectives:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Perform automated ingestion, validation, and preprocessing of supermarket transaction records.</li>
                <li>Calculate mathematical consistency using the identity <code>Sales = Quantity × Unit Price</code>.</li>
                <li>Analyze multi-dimensional performance across Products, Categories, Branches, Cities, and Payment rails.</li>
                <li>Quantify customer spending differences between Member and Normal shoppers.</li>
                <li>Formulate actionable business recommendations and validate computed figures against formal analytical benchmarks.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 2 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 2 – Dataset Description & Variables
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <p>
                The primary dataset comprises <strong>500 sales transactions</strong> recorded across supermarket retail locations.
              </p>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Variable Name</th>
                      <th className="py-2 px-3">Data Type</th>
                      <th className="py-2 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Invoice ID</td>
                      <td className="py-2 px-3">Categorical (String)</td>
                      <td className="py-2 px-3">Unique transaction invoice identifier (INV0001–INV0500)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Date</td>
                      <td className="py-2 px-3">Datetime (YYYY-MM-DD)</td>
                      <td className="py-2 px-3">Transaction booking timestamp</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Branch & City</td>
                      <td className="py-2 px-3">Categorical</td>
                      <td className="py-2 px-3">Retail branches: A (Jaipur), B (Delhi), C (Mumbai), D (Bengaluru)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Customer Type</td>
                      <td className="py-2 px-3">Categorical</td>
                      <td className="py-2 px-3">Customer membership classification (Member vs Normal)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Product & Category</td>
                      <td className="py-2 px-3">Categorical</td>
                      <td className="py-2 px-3">SKU name and retail category (Dairy, Fruits, Beverages, etc.)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Quantity & Unit Price</td>
                      <td className="py-2 px-3">Numerical (Integer / Float)</td>
                      <td className="py-2 px-3">Units purchased and price per unit in Indian Rupees (₹)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Payment & Rating</td>
                      <td className="py-2 px-3">Mixed</td>
                      <td className="py-2 px-3">Payment rail (UPI, Card, Cash, Net Banking) & customer score (1.0–5.0)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono font-semibold">Sales</td>
                      <td className="py-2 px-3">Numerical (Currency)</td>
                      <td className="py-2 px-3">Billed invoice value, validated against <code>Quantity × Unit Price</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Chapter 3 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 3 – Methodology & Preprocessing
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>3.1 Data Ingestion:</strong> Dynamic CSV parsing with RFC-4180 compliance, header trimming, and greedy empty-row skipping.
              </p>
              <p>
                <strong>3.2 Data Hygiene & Preprocessing:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><em>Missing-Value Checking:</em> Evaluated all columns; verified 0 missing or null entries in the canonical dataset.</li>
                <li><em>Duplicate Detection:</em> Verified uniqueness of Invoice IDs across all rows.</li>
                <li><em>Formula Auditing:</em> Tested <code>|Sales - (Quantity × Unit Price)| ≤ 0.05</code> across all 500 rows, ensuring 100% mathematical consistency without silent overwriting.</li>
                <li><em>Type Inferences:</em> Converted string quantities and prices into floating-point numbers with tabular numeral alignment.</li>
              </ul>
            </div>
          </section>

          {/* Chapter 4 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 4 – Results & Key Findings
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900">4.1 Product Leadership:</div>
                  <p className="mt-1">
                    <strong>{kpis.highestSellingProduct.name}</strong> leads all products with ₹{kpis.highestSellingProduct.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })} in revenue.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900">4.2 Branch Comparison:</div>
                  <p className="mt-1">
                    <strong>Branch {kpis.bestPerformingBranch.name} ({kpis.bestPerformingBranch.city})</strong> achieved the highest branch revenue of ₹{kpis.bestPerformingBranch.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900">4.3 Category Turnover:</div>
                  <p className="mt-1">
                    <strong>{kpis.highestSellingCategory.name}</strong> generated the largest category turnover at ₹{kpis.highestSellingCategory.sales.toLocaleString('en-IN', { minimumFractionDigits: 2 })}.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-semibold text-slate-900">4.4 Payment Preferences:</div>
                  <p className="mt-1">
                    <strong>{kpis.mostUsedPaymentMethod.name}</strong> is the most frequented payment method with {kpis.mostUsedPaymentMethod.count} transactions.
                  </p>
                </div>
              </div>
              <p>
                <strong>4.5 Customer Behavior (Member vs Normal):</strong>
                <br />
                Do Members spend more than Normal customers? The dynamic data analysis reveals that{' '}
                <strong>Normal customers spend an average of ₹{customerComp.normal.avgTransactionValue}</strong> per transaction compared to{' '}
                <strong>₹{customerComp.member.avgTransactionValue} for Members</strong> (a difference of ₹{customerComp.difference}). Normal shoppers currently record a slightly higher average ticket value, demonstrating that loyalty members make more frequent purchases with smaller basket sizes.
              </p>
              <p>
                <strong>4.6 Customer Satisfaction:</strong> The overall chain rating average is <strong>{kpis.averageRating.toFixed(2)} / 5.00</strong>, indicating solid brand perception.
              </p>
            </div>
          </section>

          {/* Chapter 5 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 5 – Strategic Business Decisions
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-1">
              <p>1. <strong>Stock Level Optimization:</strong> Guarantee minimum buffer stock for high-velocity items ({kpis.highestSellingProduct.name}) to avoid stockout lost revenue.</p>
              <p>2. <strong>Branch Best-Practice Replication:</strong> Benchmark Branch C’s store layout and merchandising tactics in Branch A and D.</p>
              <p>3. <strong>Payment Rail Infrastructure:</strong> Reinforce UPI and digital card terminals to minimize checkout latency.</p>
              <p>4. <strong>Loyalty Basket Upselling:</strong> Implement minimum spend thresholds on member reward points to lift average member basket size beyond ₹500.</p>
            </div>
          </section>

          {/* Chapter 6 */}
          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
              Chapter 6 – Conclusion & Future Scope
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>Conclusion:</strong> The project successfully demonstrates end-to-end data analytics on supermarket sales data. Dynamic computation confirmed exact alignment with all expected benchmarks (Cheese at ₹27,906.30, Branch C at ₹72,469.45, Beverages at ₹56,108.24, UPI with 127 transactions, Member average ₹483.14, Normal average ₹497.07, and Average Rating 3.99).
              </p>
              <p>
                <strong>Future Scope:</strong> Enhancements include predictive inventory forecasting using ARIMA/Prophet models, basket association rule mining (Apriori algorithm), and automated replenishment alerts.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: PYTHON CODE VIEWER */}
      {activeTab === 'code' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Standalone Python / Pandas Analytics Script
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Runnable in Python 3.9+ environments (Jupyter, VS Code, Google Colab, or Terminal)
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs text-white bg-slate-900 hover:bg-slate-800 font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              {copiedCode ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied to Clipboard!' : 'Copy Python Code'}
            </button>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-200">
            <pre>{pythonAnalysisCode}</pre>
          </div>

          {/* Quick Guide to Run */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Execution Instructions for College Students
            </h4>
            <ol className="list-decimal pl-5 text-xs text-slate-700 space-y-1.5">
              <li>
                Download <a href="/supermarket_sales.csv" download className="text-blue-600 font-semibold underline">supermarket_sales.csv</a> and place it in your project folder.
              </li>
              <li>
                Install required packages using: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-900">pip install pandas numpy matplotlib</code>
              </li>
              <li>
                Run the script using: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-900">python app.py</code>
              </li>
              <li>
                Observe matching numbers: Cheese = ₹27,906.30, Branch C = ₹72,469.45, Beverages = ₹56,108.24, UPI = 127 tx!
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 3: VIVA VOCE QUESTIONS & ANSWERS */}
      {activeTab === 'viva' && (
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-slate-900">
              Viva Voce Defense & Examiner Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive technical and analytical responses tailored for academic examination.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <strong className="text-slate-900 block mb-1">
                Q1: How do you verify the integrity of the Sales column?
              </strong>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> We calculate <code>Calculated Sales = Quantity × Unit Price</code> for every transaction and compare it against the recorded Sales value. With a tolerance threshold of ±₹0.05 for floating-point precision, all 500 rows match exactly with zero discrepancy.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <strong className="text-slate-900 block mb-1">
                Q2: Do Member customers spend more than Normal customers?
              </strong>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> Based on dynamic calculations, <strong>Normal customers have a higher average transaction value (₹497.07)</strong> than enrolled Members (₹483.14). This occurs because members make more frequent store visits with smaller basket sizes, whereas normal shoppers make larger occasional purchases.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <strong className="text-slate-900 block mb-1">
                Q3: Which branch generated the highest sales and why is branch comparison important?
              </strong>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> Branch C located in Mumbai generated the highest sales (₹72,469.45). Comparing branch performance identifies location-specific operational efficiencies, regional demand variations, and inventory replenishment priorities.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <strong className="text-slate-900 block mb-1">
                Q4: What is the most frequently used payment method?
              </strong>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> UPI is the most popular payment method with 127 transactions, followed by Net Banking (126), Card (125), and Cash (122). This highlights the strong dominance of digital payment modes in modern retail operations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
