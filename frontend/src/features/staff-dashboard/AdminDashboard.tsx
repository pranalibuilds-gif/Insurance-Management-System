import React from 'react';
import { StatCard } from '../../components/molecules/StatCard';
import { Card } from '../../components/atoms/Card';
import { Badge } from '../../components/atoms/Badge';
import {
  Users,
  ShieldAlert,
  Database,
  Activity,
  History,
  CheckCircle2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-entrance">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Users"
          value="42"
          icon={Users}
          description="Online right now"
        />
        <StatCard
          label="Security Alerts"
          value="3"
          icon={ShieldAlert}
          trend={{ value: 2, isPositive: false }}
          description="Last 24 hours"
        />
        <StatCard
          label="System Health"
          value="99.9%"
          icon={Activity}
          description="All services operational"
        />
        <StatCard
          label="Storage"
          value="1.2 TB"
          icon={Database}
          description="Document vault usage"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <Card.Header className="flex flex-row items-center gap-2">
            <History className="h-5 w-5 text-brand-600" />
            <h3 className="font-bold text-neutral-900">Recent Audit Events</h3>
          </Card.Header>
          <Card.Content className="p-0">
            <div className="divide-y divide-neutral-50">
              {[
                { id: 1, action: 'Role Updated', target: 'sarah@imp.com', actor: 'admin@imp.com', time: '10 mins ago' },
                { id: 2, action: 'System Config Changed', target: 'Max Upload Size', actor: 'admin@imp.com', time: '1 hour ago' },
                { id: 3, action: 'User Created', target: 'mike@imp.com', actor: 'admin@imp.com', time: '2 hours ago' },
              ].map(event => (
                <div key={event.id} className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-neutral-900">{event.action}</p>
                    <p className="text-xs text-neutral-500">Target: {event.target} • By: {event.actor}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{event.time}</span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="font-bold text-neutral-900">Service Status</h3>
          </Card.Header>
          <Card.Content className="space-y-4">
            {[
              { name: 'API Server', status: 'Operational' },
              { name: 'PostgreSQL Database', status: 'Operational' },
              { name: 'Document Storage', status: 'Operational' },
              { name: 'Notification Worker', status: 'Operational' },
            ].map(service => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">{service.name}</span>
                <Badge variant="success" size="sm" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> {service.status}
                </Badge>
              </div>
            ))}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};
