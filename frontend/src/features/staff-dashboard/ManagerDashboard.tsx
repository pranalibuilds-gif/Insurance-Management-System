import React from 'react';
import { StatCard } from '../../components/molecules/StatCard';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import {
  FileCheck,
  TrendingUp,
  ShieldAlert,
  Users,
  PieChart,
  BarChart3
} from 'lucide-react';

export const ManagerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Awaiting Approval"
          value="7"
          icon={FileCheck}
          trend={{ value: 5, isPositive: true }}
          description="High-value claims"
        />
        <StatCard
          label="Daily Revenue"
          value="$45,200"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
          description="Premiums collected today"
        />
        <StatCard
          label="SLA Violations"
          value="2"
          icon={ShieldAlert}
          trend={{ value: 1, isPositive: false }}
          description="Over 48 hours"
        />
        <StatCard
          label="Active Policies"
          value="1,248"
          icon={Users}
          description="System wide"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Card.Header className="flex flex-row items-center gap-2">
            <PieChart className="h-5 w-5 text-brand-600" />
            <h3 className="font-bold text-neutral-900">Policy Distribution</h3>
          </Card.Header>
          <Card.Content className="h-64 flex items-center justify-center text-neutral-400 italic">
            Chart visualization placeholder...
          </Card.Content>
        </Card>

        <Card>
          <Card.Header className="flex flex-row items-center gap-2">
            <BarChart3 className="h-5 w-5 text-brand-600" />
            <h3 className="font-bold text-neutral-900">Revenue Trends</h3>
          </Card.Header>
          <Card.Content className="h-64 flex items-center justify-center text-neutral-400 italic">
            Chart visualization placeholder...
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
