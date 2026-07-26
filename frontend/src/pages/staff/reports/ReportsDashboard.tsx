import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Package,
  ShieldCheck,
  DownloadCloud,
  FileText,
  PieChart,
  Calendar
} from 'lucide-react';
import { WorkspaceShell } from '../../../components/organisms/WorkspaceShell';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { MetricGrid } from '../../../features/reports/components/MetricGrid';
import { LoadingSkeleton } from '../../../components/molecules/LoadingSkeleton';
import { getExecutiveMetrics, getFinancialReport, getClaimsAnalytics } from '../../../mocks/reports';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RechartsPie,
  Pie
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9'];

const ReportsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'executive' | 'financial' | 'operational' | 'claims' | 'customers' | 'products'>('executive');

  const { data: execData, isLoading: isLoadingExec } = useQuery({
    queryKey: ['reports-executive'],
    queryFn: getExecutiveMetrics,
  });

  const { data: finData, isLoading: isLoadingFin } = useQuery({
    queryKey: ['reports-financial'],
    queryFn: getFinancialReport,
    enabled: activeTab === 'financial',
  });

  const { data: claimsData, isLoading: isLoadingClaims } = useQuery({
    queryKey: ['reports-claims'],
    queryFn: getClaimsAnalytics,
    enabled: activeTab === 'claims',
  });

  const isLoading = isLoadingExec || (activeTab === 'financial' && isLoadingFin) || (activeTab === 'claims' && isLoadingClaims);

  const tabs = [
    { id: 'executive', label: 'Executive', icon: BarChart3 },
    { id: 'financial', label: 'Financial', icon: TrendingUp },
    { id: 'operational', label: 'Operational', icon: Activity },
    { id: 'claims', label: 'Claims', icon: FileText },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
  ] as const;

  return (
    <WorkspaceShell
      title="Analytics & Reports"
      id="ANALYTICS-2026"
      status="LIVE"
      statusVariant="success"
      backLink={{ label: 'Back to Dashboard', href: '/staff/dashboard' }}
      icon={BarChart3}
      subtitle="Comprehensive business intelligence hub"
      summaryItems={[
        { label: 'Reporting Period', value: 'Q1 2026' },
        { label: 'Data Latency', value: 'Real-time' },
        { label: 'Currency', value: 'USD' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <DownloadCloud className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button variant="outline" size="sm" isIconOnly><Calendar className="h-4 w-4" /></Button>
        </div>
      }
    >
      {isLoading ? (
        <LoadingSkeleton variant="cards" count={3} />
      ) : (
        <div className="space-y-8 animate-entrance">
          {activeTab === 'executive' && execData && (
            <div className="space-y-8">
              <MetricGrid metrics={execData.topMetrics} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <Card.Header><h4 className="font-bold">Revenue Growth</h4></Card.Header>
                  <Card.Content className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={execData.revenueTrend}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `$${v/1000}k`} />
                        <Tooltip />
                        <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>

                <Card>
                  <Card.Header><h4 className="font-bold">Claims Performance</h4></Card.Header>
                  <Card.Content className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={execData.claimsTrend}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <Tooltip />
                        <Bar dataKey="submitted" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="settled" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Content>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {execData.operationalHealth.map((m, i) => (
                   <Card key={i} variant="outlined">
                     <Card.Content className="p-6 text-center space-y-1">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{m.label}</p>
                        <p className="text-2xl font-black text-neutral-900">{m.value}</p>
                        {m.description && <p className="text-[10px] text-neutral-400">{m.description}</p>}
                     </Card.Content>
                   </Card>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'financial' && finData && (
            <div className="space-y-8">
               <MetricGrid metrics={finData.summary} />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <Card.Header><h4 className="font-bold">Revenue by Product</h4></Card.Header>
                    <Card.Content className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                             <Pie
                                data={finData.revenueByProduct}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                             >
                                {finData.revenueByProduct.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                             </Pie>
                             <Tooltip />
                          </RechartsPie>
                       </ResponsiveContainer>
                       <div className="flex justify-center gap-6 mt-4">
                          {finData.revenueByProduct.map((p, i) => (
                            <div key={p.name} className="flex items-center gap-2">
                               <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                               <span className="text-xs font-medium text-neutral-600">{p.name}</span>
                            </div>
                          ))}
                       </div>
                    </Card.Content>
                  </Card>

                  <Card>
                    <Card.Header><h4 className="font-bold">Aging Outstanding</h4></Card.Header>
                    <Card.Content className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={finData.outstandingByAge} layout="vertical">
                             <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                             <XAxis type="number" hide />
                             <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} width={100} />
                             <Tooltip />
                             <Bar dataKey="amount" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                          </BarChart>
                       </ResponsiveContainer>
                    </Card.Content>
                  </Card>
               </div>
            </div>
          )}

          {activeTab === 'claims' && claimsData && (
            <div className="space-y-8">
               <MetricGrid metrics={claimsData.summary} />
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <Card.Header><h4 className="font-bold">Claims by Status</h4></Card.Header>
                    <Card.Content className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={claimsData.claimsByStatus}>
                             <XAxis dataKey="name" axisLine={false} tickLine={false} />
                             <YAxis hide />
                             <Tooltip cursor={{fill: 'transparent'}} />
                             <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                          </BarChart>
                       </ResponsiveContainer>
                    </Card.Content>
                  </Card>

                  <Card>
                    <Card.Header><h4 className="font-bold">Claims by Category</h4></Card.Header>
                    <Card.Content className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                             <Pie data={claimsData.claimsByCategory} dataKey="value" outerRadius={100} label>
                                {claimsData.claimsByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                             </Pie>
                             <Tooltip />
                          </RechartsPie>
                       </ResponsiveContainer>
                    </Card.Content>
                  </Card>
               </div>
            </div>
          )}

          {['operational', 'customers', 'products'].includes(activeTab) && (
            <div className="p-20 text-center space-y-4">
               <div className="h-16 w-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                  <Activity className="h-8 w-8" />
               </div>
               <h4 className="font-bold text-neutral-900">{tabs.find(t => t.id === activeTab)?.label} Module Coming Soon</h4>
               <p className="text-sm text-neutral-500 max-w-xs mx-auto">This report is being finalized with simulated historical data.</p>
            </div>
          )}
        </div>
      )}
    </WorkspaceShell>
  );
};

export default ReportsDashboard;
