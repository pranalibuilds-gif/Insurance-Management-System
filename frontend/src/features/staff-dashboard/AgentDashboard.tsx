import React from 'react';
import { StatCard } from '../../components/molecules/StatCard';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import { DataTable } from '../../components/organisms/DataTable';
import {
  UserCheck,
  ClipboardList,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/atoms/Button';
import { Link } from 'react-router-dom';

export const AgentDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Pending KYC"
          value="12"
          icon={UserCheck}
          trend={{ value: 20, isPositive: false }}
          description="Awaiting verification"
        />
        <StatCard
          label="Assigned Claims"
          value="5"
          icon={ClipboardList}
          description="In investigation"
        />
        <StatCard
          label="New Leads"
          value="8"
          icon={UserPlus}
          trend={{ value: 15, isPositive: true }}
          description="Last 24 hours"
        />
        <StatCard
          label="Tasks Done"
          value="14"
          icon={CheckCircle2}
          description="Today's productivity"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <Card.Header className="flex flex-row items-center justify-between">
            <h3 className="font-bold text-neutral-900">Priority Action Queue</h3>
            <Link to="/staff/customers" className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all queue <ArrowRight className="h-4 w-4" />
            </Link>
          </Card.Header>
          <Card.Content className="p-0">
            <DataTable
              columns={[
                { header: 'Type', accessor: (item: any) => <Badge variant={item.type === 'KYC' ? 'warning' : 'info'}>{item.type}</Badge> },
                { header: 'Customer', accessor: 'customer' },
                { header: 'Status', accessor: (item: any) => <span className="text-xs font-medium text-neutral-500">{item.status}</span> },
                {
                  header: '',
                  accessor: () => (
                    <Button variant="ghost" size="sm" className="text-brand-600">Review</Button>
                  ),
                  className: 'text-right'
                }
              ]}
              data={[
                { id: 1, type: 'KYC', customer: 'Alice Johnson', status: 'Pending Review' },
                { id: 2, type: 'CLAIM', customer: 'Bob Smith', status: 'Under Investigation' },
                { id: 3, type: 'KYC', customer: 'Charlie Brown', status: 'Documents Missing' },
              ]}
            />
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="font-bold text-neutral-900">Recent Activity</h3>
          </Card.Header>
          <Card.Content className="p-0">
            <div className="divide-y divide-neutral-50">
              {[
                { id: 1, text: 'Alice uploaded PAN Card', time: '10 mins ago' },
                { id: 2, text: 'Bob submitted a new claim', time: '1 hour ago' },
                { id: 3, text: 'Dave created a new account', time: '2 hours ago' },
              ].map(activity => (
                <div key={activity.id} className="p-4 space-y-1">
                  <p className="text-sm font-medium text-neutral-900">{activity.text}</p>
                  <p className="text-xs text-neutral-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
