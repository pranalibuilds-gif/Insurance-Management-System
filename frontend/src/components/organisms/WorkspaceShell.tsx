import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Card } from '../atoms/Card';
import { Alert } from '../molecules/Alert';
import { cn } from '../../utils/cn';

interface SummaryItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

interface WorkspaceTab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface RiskIndicator {
  type: 'INFO' | 'WARNING' | 'DANGER';
  label: string;
  description: string;
}

interface WorkspaceShellProps {
  title: string;
  id: string;
  status: string;
  statusVariant?: any;
  backLink: { label: string; href: string };
  icon: LucideIcon;
  subtitle?: string;
  summaryItems: SummaryItem[];
  tabs: readonly WorkspaceTab[];
  activeTab: string;
  onTabChange: (id: any) => void;
  riskIndicators?: RiskIndicator[];
  actions?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const WorkspaceShell: React.FC<WorkspaceShellProps> = ({
  title,
  id,
  status,
  statusVariant = 'neutral',
  backLink,
  icon: Icon,
  subtitle,
  summaryItems,
  tabs,
  activeTab,
  onTabChange,
  riskIndicators,
  actions,
  rightSidebar,
  children,
}) => {
  return (
    <div className="space-y-8 animate-entrance">
      <Link
        to={backLink.href}
        className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> {backLink.label}
      </Link>

      {/* Header & Summary Strip */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
            <Icon className="h-10 w-10" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
              <Badge variant={statusVariant}>{status}</Badge>
            </div>
            <p className="text-sm text-neutral-500">ID: {id} {subtitle && `• ${subtitle}`}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {summaryItems.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</p>
              <p className={cn("text-sm font-bold", item.highlight ? "text-brand-600 font-black" : "text-neutral-900")}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {actions && (
          <div className="flex gap-3 pt-4 xl:pt-0 border-t xl:border-none border-neutral-50">
            {actions}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-100 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap',
              activeTab === tab.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-neutral-400 hover:text-neutral-600'
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 min-h-[500px] space-y-6">
          {riskIndicators && riskIndicators.length > 0 && (
            <div className="space-y-3">
              {riskIndicators.map((risk, i) => (
                <Alert key={i} variant={risk.type.toLowerCase() as any} title={risk.label}>
                  {risk.description}
                </Alert>
              ))}
            </div>
          )}
          {children}
        </div>

        {rightSidebar && (
          <aside className="space-y-6 lg:sticky lg:top-24">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
};
