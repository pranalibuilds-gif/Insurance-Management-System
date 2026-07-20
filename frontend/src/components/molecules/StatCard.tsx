import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  description,
  className,
}) => {
  return (
    <Card className={cn('relative transition-all duration-normal hover:border-brand-100 hover:shadow-soft', className)}>
      <Card.Content className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-brand-50 rounded-xl text-brand-600">
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <Badge
              variant={trend.isPositive ? 'success' : 'danger'}
              size="sm"
              className="flex items-center gap-0.5"
            >
              {trend.isPositive ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {trend.value}%
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-2xl font-bold text-neutral-900 md:text-3xl">
              {value}
            </h4>
          </div>
          {description && (
            <p className="text-xs text-neutral-400 mt-2">{description}</p>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};

StatCard.displayName = 'StatCard';
