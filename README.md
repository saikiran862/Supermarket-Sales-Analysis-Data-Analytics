# Supermarket Sales Analysis – Data Analytics Project

A professional, end-to-end Data Analytics platform developed for supermarket retail intelligence, data preprocessing, KPI performance auditing, customer segmentation, and strategic decision formulation.

---

## 1. Project Title
**Supermarket Sales Analysis – Data Analytics Project**

## 2. Problem Statement
Modern supermarket chains manage high-volume, multi-branch transaction streams. Without automated data preprocessing and analytics, retail managers face pricing discrepancies, inventory stockouts, unclear branch performance, and an inability to assess whether customer loyalty programs drive higher customer spend. This project provides automated data validation, multi-dimensional exploratory data analysis (EDA), and verifiable analytical benchmarks.

## 3. Objective
- Load and preprocess supermarket sales transactions (approximately 500 rows).
- Perform data quality audits: check missing values, duplicate invoice IDs, and mathematical consistency using the formula:
  $$\text{Sales} = \text{Quantity} \times \text{Unit Price}$$
- Compute critical retail KPIs: Total Sales, Transactions, Units Sold, Average Order Value, Customer Ratings, Top Product, Best Branch, Leading Category, and Dominant Payment Mode.
- Perform detailed dimension analyses across Products, Branches, Cities, Categories, Customer Types (Member vs Normal), and Payment rails.
- Dynamically validate computed findings against formal expected benchmarks (Section 22).
- Generate actionable business decisions and an academic college report.

## 4. Dataset Description
The dataset contains **500 transaction records** across 4 regional branches:
- **Invoice ID:** Unique transaction identifier (`INV0001` to `INV0500`).
- **Date:** Transaction date (2026-01-01 to 2026-07-01).
- **Branch:** Branch code (`A`, `B`, `C`, `D`).
- **City:** Metropolitan store location (`Jaipur`, `Delhi`, `Mumbai`, `Bengaluru`).
- **Customer Type:** Membership classification (`Member` or `Normal`).
- **Gender:** Customer gender (`Male` or `Female`).
- **Product:** Specific retail item SKU (e.g., `Cheese`, `Coffee`, `Shampoo`, `Milk`, `Bread`, `Apples`, etc.).
- **Category:** Merchandise category (`Dairy`, `Beverages`, `Personal Care`, `Grocery`, `Fruits`, `Snacks`, `Bakery`, `Vegetables`).
- **Quantity:** Quantity of items purchased (1 to 10 units).
- **Unit Price:** Price per single unit in Indian Rupees (₹).
- **Payment:** Settlement method (`UPI`, `Card`, `Cash`, `Net Banking`).
- **Rating:** Customer satisfaction score (1.0 to 5.0 stars).
- **Sales:** Recorded total invoice value in Indian Rupees (₹).

## 5. Technologies Used
- **Frontend / Web UI:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Custom Interactive SVG Visualizations.
- **Data Processing:** PapaParse (CSV streaming), JavaScript Tabular Math Engine, Python 3 / Pandas.
- **Backend / Dev Tooling:** Node.js, Express, Vite, TSX.

## 6. Data Processing Steps
1. **Data Ingestion:** Dynamic parsing supporting custom CSV uploads and the canonical 500-record dataset.
2. **Missing-Value Audit:** Scans all fields for null, empty, or whitespace-only records (0 missing values detected).
3. **Duplicate Detection:** Scans `Invoice ID` keys for duplicate records (0 duplicate rows detected).
4. **Numerical Validation:** Validates that Quantity > 0, Unit Price ≥ 0, and 1.0 ≤ Rating ≤ 5.0.
5. **Formula Verification:** Compares recorded `Sales` against $\text{Quantity} \times \text{Unit Price}$ within a tolerance of $\pm₹0.05$. Inconsistencies are flagged and displayed in the audit table without silent data mutation.

## 7. Data Analysis Methods
- **Descriptive Statistics:** Sum, mean, median, min, max, and percentage share.
- **Dimensional Aggregations:** Group-by analysis by Product, Category, Branch, City, Payment Rail, and Customer Segment.
- **Segmentation Comparative Analysis:** Basket size differences between Member and Normal customer cohorts.
- **Rating Sentiment Histograms:** Binning customer scores into satisfaction tiers (1.0–2.0, 2.1–3.0, 3.1–4.0, 4.1–5.0).

## 8. Visualizations Included
1. **Sales by Product:** Ranked horizontal bar chart with units sold and total revenue.
2. **Quantity Sold by Product:** Volume bar chart displaying SKU sales velocity.
3. **Sales by Branch:** Comparative turnover across Branch A, B, C, and D.
4. **Transaction Volume by Branch:** Store footfall and invoice count throughput.
5. **Sales by City:** Regional revenue across Mumbai, Delhi, Bengaluru, and Jaipur.
6. **Sales by Category:** Bar chart of departmental contributions.
7. **Category Revenue Distribution:** Circular donut chart showing market share.
8. **Payment Method Distribution:** Donut chart of payment frequency.
9. **Payment Sales Volume:** Bar chart of revenue settled per payment rail.
10. **Customer Type Comparison Matrix:** Side-by-side comparative bars for Member vs Normal shoppers.
11. **Customer Rating Distribution:** Histogram with 5-star ratings frequency and CSAT score.
12. **Branch vs Rating Correlation:** Cross-tabulation of branch service satisfaction.

## 9. Key Findings (Empirically Computed)
- **Top Product:** **Cheese** generated the highest sales: **₹27,906.30** across 53 orders (128 units).
- **Top Branch:** **Branch C (Mumbai)** generated **₹72,469.45** in sales across 147 transactions.
- **Top Category:** **Beverages** generated the highest sales: **₹56,108.24** across 96 transactions (503 units).
- **Most Used Payment Method:** **UPI** was the most used payment method with **127 transactions** totaling ₹62,013.78.
- **Customer Segmentation Finding:** **Normal customers spend more per transaction (₹497.07)** than **Members (₹483.14)**, a difference of ₹13.93 per visit.
- **Average Customer Rating:** **3.99 / 5.00** across all transactions.
- **Total Chain Revenue:** **₹244,411.08** across **500 transactions** (2,768 units sold).

## 10. Strategic Business Decisions & Recommendations
1. **Inventory Buffers:** Maintain 20–25% buffer stock for high-velocity items like Cheese and Beverages to avoid stockouts.
2. **Branch Best-Practice Transfer:** Benchmark Branch C's layout, customer engagement, and fast-moving displays to elevate sales in Branch A and D.
3. **Payment Experience:** Optimize POS terminals and dedicated UPI QR codes at checkout to reduce wait times.
4. **CRM Basket Upsell:** Introduce minimum spend reward thresholds (e.g., ₹50 voucher on bills above ₹600) to incentivize Members to expand their basket size beyond ₹500.
5. **Promotional Bundles:** Pair slow-moving SKUs with high-frequency staples to clear inventory without margin erosion.

## 11. Project Structure
```
supermarket-sales-analysis/
├── data/
│   └── supermarket_sales.csv         # Canonical 500-transaction dataset
├── analysis/
│   └── data_analysis.py              # Standalone Python Pandas analysis engine
├── app.py                            # Standalone Python terminal app
├── requirements.txt                  # Python dependencies
├── README.md                         # Comprehensive documentation
├── package.json                      # Web application dependencies
├── vite.config.ts                    # Vite build configuration
├── src/
│   ├── App.tsx                       # Main reactive application controller
│   ├── main.tsx                      # Web entry point
│   ├── index.css                     # Tailwind styling
│   ├── types/
│   │   └── sales.ts                  # TypeScript definitions & data contracts
│   ├── data/
│   │   └── defaultCsvData.ts         # Embedded 500-row dataset
│   ├── utils/
│   │   └── dataProcessor.ts          # Parsing, audit, KPI, and validation engine
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.tsx           # Multi-tab navigation sidebar
│       │   └── Header.tsx            # Header with export/print actions
│       ├── dashboard/
│       │   ├── FilterBar.tsx         # Interactive multi-dimensional filter bar
│       │   ├── KpiCardsGrid.tsx      # 9 critical business KPI cards
│       │   ├── OverviewDashboardView.tsx # Master executive dashboard
│       │   └── InteractiveDataTable.tsx  # Searchable, sortable, paginated data grid
│       ├── preprocessing/
│       │   └── DataPreprocessingView.tsx # Hygiene audits & formula verification
│       ├── analysis/
│       │   ├── ProductAnalysisView.tsx   # Product-level deep dive
│       │   ├── BranchAnalysisView.tsx    # Branch & City analytics
│       │   ├── CategoryAnalysisView.tsx  # Merchandise category analytics
│       │   ├── CustomerAnalysisView.tsx  # Member vs Normal segmentation
│       │   ├── PaymentAnalysisView.tsx   # Payment channel analytics
│       │   └── RatingAnalysisView.tsx    # Customer satisfaction analysis
│       ├── insights/
│       │   └── BusinessInsightsView.tsx  # Automated insights & strategic actions
│       ├── validation/
│       │   └── AnalysisValidationView.tsx # Section 22 Benchmark Verification
│       └── report/
│           └── ProjectReportView.tsx     # Academic 6-chapter report & Viva FAQ
```

## 12. Installation Instructions (Web App)
1. Clone or extract the repository folder:
   ```bash
   cd supermarket-sales-analysis
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 13. How to Run (Python Alternative)
1. Set up a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install Python requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the standalone analysis script:
   ```bash
   python app.py
   ```

## 14. Expected Output & Validation Suite
| Metric | Expected Result | Actual Calculated | Status | Difference |
| :--- | :--- | :--- | :---: | :--- |
| **Highest Sales Product** | Cheese – ₹27,906.30 | Cheese – ₹27,906.30 | **MATCH** | ₹0.00 |
| **Best Branch** | Branch C – ₹72,469.45 | Branch C – ₹72,469.45 | **MATCH** | ₹0.00 |
| **Highest Sales Category**| Beverages – ₹56,108.24| Beverages – ₹56,108.24| **MATCH** | ₹0.00 |
| **Most Used Payment** | UPI – 127 transactions | UPI – 127 transactions | **MATCH** | 0 tx |
| **Member Average** | ₹483.14 | ₹483.14 | **MATCH** | ₹0.00 |
| **Normal Average** | ₹497.07 | ₹497.07 | **MATCH** | ₹0.00 |
| **Average Rating** | 3.99 | 3.99 / 5.00 | **MATCH** | 0.00 |

## 15. Future Enhancements
- Integration of predictive machine learning models (XGBoost/Prophet) for daily inventory demand forecasting.
- Market basket association rule mining (Apriori / FP-Growth) for cross-selling recommendations.
- Direct Google Sheets live synchronization API connector.

## 16. Conclusion
The Supermarket Sales Analysis project delivers an enterprise-ready data analytics web application and Python data pipeline. It accurately preprocesses raw transactions, verifies data integrity, calculates KPIs dynamically, answers critical customer behavior questions, provides interactive charting, and validates 100% of benchmark requirements.
