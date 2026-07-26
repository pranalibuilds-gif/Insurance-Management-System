import React from 'react';
import { StatCard } from '../../../components/molecules/StatCard';
import { LucideIcon, Activity } from 'lucide-react';
import { MetricCardData } from '../../../types/reports';

interface MetricGridProps {
  metrics: MetricCardData[];
  columns?: number;
  icon?: LucideIcon;
}

export const MetricGrid: React.FC<MetricGridProps> = ({ metrics, columns = 4, icon: DefaultIcon = Activity }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {metrics.map((m, idx) => (
        <StatCard
          key={idx}
          label={m.label}
          value={m.value}
          icon={DefaultIcon}
          trend={m.trend}
          description={m.description}
        />
      ))}
    </div>
  );
};
