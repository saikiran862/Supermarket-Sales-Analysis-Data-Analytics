"""
Supermarket Sales Analysis – Python Analysis Engine
Module: analysis/data_analysis.py
B.Tech Data Analytics Project

Works with pure Python standard library (csv, math, collections) as well as Pandas!
No third-party package installation required for basic execution.
"""

import csv
from collections import defaultdict, Counter

def load_and_preprocess_data(csv_path='data/supermarket_sales.csv'):
    records = []
    missing_counts = defaultdict(int)
    seen_invoices = set()
    duplicates_count = 0
    mismatches = []
    
    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        for idx, row in enumerate(reader, start=1):
            inv_id = row.get('Invoice ID', '').strip()
            
            # Missing check
            for k in fieldnames:
                v = row.get(k, '')
                if v is None or v.strip() == '':
                    missing_counts[k] += 1
            
            # Duplicate check
            if inv_id in seen_invoices:
                duplicates_count += 1
            else:
                seen_invoices.add(inv_id)
                
            qty = float(row.get('Quantity', 0))
            price = float(row.get('Unit Price', 0))
            recorded_sales = float(row.get('Sales', 0))
            calc_sales = round(qty * price, 2)
            
            diff = round(abs(recorded_sales - calc_sales), 2)
            if diff > 0.05:
                mismatches.append((inv_id, recorded_sales, calc_sales, diff))
                
            records.append({
                'Invoice ID': inv_id,
                'Date': row.get('Date', ''),
                'Branch': row.get('Branch', '').strip().upper(),
                'City': row.get('City', '').strip(),
                'Customer Type': row.get('Customer Type', '').strip(),
                'Gender': row.get('Gender', '').strip(),
                'Product': row.get('Product', '').strip(),
                'Category': row.get('Category', '').strip(),
                'Quantity': qty,
                'Unit Price': price,
                'Payment': row.get('Payment', '').strip(),
                'Rating': float(row.get('Rating', 0)),
                'Sales': recorded_sales,
                'Calculated_Sales': calc_sales,
            })
            
    audit_report = {
        'total_rows': len(records),
        'total_columns': len(fieldnames),
        'missing_values': dict(missing_counts),
        'duplicates_count': duplicates_count,
        'formula_mismatches_count': len(mismatches),
    }
    
    return records, audit_report

def compute_kpis(records):
    total_sales = sum(r['Calculated_Sales'] for r in records)
    total_tx = len(records)
    total_qty = int(sum(r['Quantity'] for r in records))
    avg_ticket = (total_sales / total_tx) if total_tx else 0.0
    avg_rating = (sum(r['Rating'] for r in records) / total_tx) if total_tx else 0.0
    
    # Product aggregation
    prod_sales = defaultdict(float)
    for r in records:
        prod_sales[r['Product']] += r['Calculated_Sales']
    top_prod = max(prod_sales.items(), key=lambda x: x[1])
    
    # Branch aggregation
    branch_sales = defaultdict(float)
    for r in records:
        branch_sales[r['Branch']] += r['Calculated_Sales']
    top_branch = max(branch_sales.items(), key=lambda x: x[1])
    
    # Category aggregation
    cat_sales = defaultdict(float)
    for r in records:
        cat_sales[r['Category']] += r['Calculated_Sales']
    top_cat = max(cat_sales.items(), key=lambda x: x[1])
    
    # Payment aggregation
    pay_counts = Counter(r['Payment'] for r in records)
    top_payment = pay_counts.most_common(1)[0]
    
    # Customer type comparison
    member_records = [r for r in records if 'member' in r['Customer Type'].lower()]
    normal_records = [r for r in records if 'normal' in r['Customer Type'].lower()]
    
    member_avg = (sum(r['Calculated_Sales'] for r in member_records) / len(member_records)) if member_records else 0.0
    normal_avg = (sum(r['Calculated_Sales'] for r in normal_records) / len(normal_records)) if normal_records else 0.0
    
    ratings = [r['Rating'] for r in records]
    
    return {
        'total_sales': round(total_sales, 2),
        'total_transactions': total_tx,
        'total_quantity': total_qty,
        'average_transaction_value': round(avg_ticket, 2),
        'average_rating': round(avg_rating, 2),
        'top_product': (top_prod[0], round(top_prod[1], 2)),
        'top_branch': (top_branch[0], round(top_branch[1], 2)),
        'top_category': (top_cat[0], round(top_cat[1], 2)),
        'top_payment': (top_payment[0], top_payment[1]),
        'member_avg': round(member_avg, 2),
        'normal_avg': round(normal_avg, 2),
        'min_rating': min(ratings) if ratings else 0.0,
        'max_rating': max(ratings) if ratings else 0.0
    }

def print_validation_matrix(kpis):
    print("=" * 70)
    print("ANALYSIS VALIDATION MATRIX (SECTION 22 BENCHMARKS)")
    print("=" * 70)
    benchmarks = [
        ("Highest Sales Product", "Cheese – ₹27,906.30", f"{kpis['top_product'][0]} – ₹{kpis['top_product'][1]:,.2f}"),
        ("Best Branch", "Branch C – ₹72,469.45", f"Branch {kpis['top_branch'][0]} – ₹{kpis['top_branch'][1]:,.2f}"),
        ("Highest Sales Category", "Beverages – ₹56,108.24", f"{kpis['top_category'][0]} – ₹{kpis['top_category'][1]:,.2f}"),
        ("Most Used Payment", "UPI – 127 transactions", f"{kpis['top_payment'][0]} – {kpis['top_payment'][1]} transactions"),
        ("Member Average", "₹483.14", f"₹{kpis['member_avg']:,.2f}"),
        ("Normal Average", "₹497.07", f"₹{kpis['normal_avg']:,.2f}"),
        ("Average Rating", "3.99", f"{kpis['average_rating']:.2f}")
    ]
    
    print(f"{'Metric':<25} | {'Expected Benchmark':<24} | {'Actual Calculated':<24}")
    print("-" * 70)
    for metric, exp, act in benchmarks:
        print(f"{metric:<25} | {exp:<24} | {act:<24}")
    print("=" * 70)
