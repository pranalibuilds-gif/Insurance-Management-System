import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center text-center p-8 rounded-2xl border-2 border-dashed border-neutral-100 bg-neutral-50/30',
        className
      )}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 mb-6">
        {Icon ? (
          <Icon className="h-10 w-10 text-neutral-400" />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-neutral-200" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-8">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';
