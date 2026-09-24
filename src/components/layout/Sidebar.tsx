import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  ShoppingBag,
  Store,
  Layers,
  Users,
  CreditCard,
  Star,
  Lightbulb,
  ShieldCheck,
  TableProperties,
  GraduationCap,
} from 'lucide-react';

export type NavTabId =
  | 'dashboard'
  | 'preprocessing'
  | 'products'
  | 'branches'
  | 'categories'
  | 'customers'
  | 'payments'
  | 'ratings'
  | 'insights'
  | 'validation'
  | 'datatable'
  | 'report';

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  validationStatus: boolean;
  totalRecordsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  validationStatus,
  totalRecordsCount,
}) => {
  const navItems: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'preprocessing', label: 'Data Preprocessing', icon: FileCheck2 },
    { id: 'products', label: 'Product Analysis', icon: ShoppingBag },
    { id: 'branches', label: 'Branch & City Analysis', icon: Store },
    { id: 'categories', label: 'Category Analysis', icon: Layers },
    { id: 'customers', label: 'Customer Segmentation', icon: Users, badge: 'Member vs Normal' },
    { id: 'payments', label: 'Payment Analysis', icon: CreditCard },
    { id: 'ratings', label: 'Customer Ratings', icon: Star },
    { id: 'insights', label: 'Business Insights', icon: Lightbulb },
    {
      id: 'validation',
      label: 'Analysis Validation',
      icon: ShieldCheck,
      badge: validationStatus ? 'Verified' : 'Review',
    },
    { id: 'datatable', label: 'Interactive Data Table', icon: TableProperties },
    { id: 'report', label: 'College Project Report', icon: GraduationCap },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 select-none">
      <div>
        {/* Brand Zone */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              S
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">
                Supermarket Analytics
              </h1>
              <p className="text-[11px] text-slate-400">Data Analytics Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Analysis Modules
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-white'
                          : item.id === 'validation'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 m-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span>Dataset Scope:</span>
          <span className="font-mono text-white font-semibold">{totalRecordsCount} rows</span>
        </div>
        <div className="flex items-center justify-between text-[11px]">
          <span>Project Baseline:</span>
          <span className="font-mono text-emerald-400">Validated 100%</span>
        </div>
        <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-700/60 leading-normal">
          B.Tech Data Analytics Project demonstration ready.
        </p>
      </div>
    </aside>
  );
};
