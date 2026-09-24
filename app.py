"""
Supermarket Sales Analysis – Python Terminal & Web Application
File: app.py
B.Tech Data Analytics Project
"""

import sys
from analysis.data_analysis import load_and_preprocess_data, compute_kpis, print_validation_matrix

def main():
    print("\n" + "=" * 65)
    print("SUPERMARKET SALES ANALYSIS – DATA ANALYTICS PROJECT")
    print("=" * 65)
    
    try:
        df, audit = load_and_preprocess_data('data/supermarket_sales.csv')
    except Exception as e:
        print(f"Error loading dataset: {e}")
        sys.exit(1)
        
    print(f"Dataset successfully loaded: {audit['total_rows']} rows, {audit['total_columns']} columns.")
    print(f"Duplicates detected: {audit['duplicates_count']}")
    print(f"Sales formula discrepancies: {audit['formula_mismatches_count']}\n")
    
    kpis = compute_kpis(df)
    
    print("--- EXECUTIVE KEY PERFORMANCE INDICATORS ---")
    print(f"• Total Gross Revenue:        ₹{kpis['total_sales']:,.2f}")
    print(f"• Total Transactions:         {kpis['total_transactions']:,}")
    print(f"• Total Units Sold:           {kpis['total_quantity']:,}")
    print(f"• Average Basket Spend:       ₹{kpis['average_transaction_value']:,.2f}")
    print(f"• Average Customer Rating:    {kpis['average_rating']:.2f} / 5.00")
    print(f"• Highest Sales Product:      {kpis['top_product'][0]} (₹{kpis['top_product'][1]:,.2f})")
    print(f"• Best-Performing Branch:     Branch {kpis['top_branch'][0]} (₹{kpis['top_branch'][1]:,.2f})")
    print(f"• Top Merchandise Category:   {kpis['top_category'][0]} (₹{kpis['top_category'][1]:,.2f})")
    print(f"• Most Popular Payment Mode:  {kpis['top_payment'][0]} ({kpis['top_payment'][1]} tx)")
    print(f"• Member Average Basket:      ₹{kpis['member_avg']:,.2f}")
    print(f"• Normal Customer Average:    ₹{kpis['normal_avg']:,.2f}\n")
    
    print_validation_matrix(kpis)
    print("\nProject execution completed successfully.")

if __name__ == '__main__':
    main()
