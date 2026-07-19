import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const Badge = ({ className, variant = 'neutral', ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-success-50 text-success-700 border-success-500/10',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/10',
    error: 'bg-error-50 text-error-700 border-error-500/10',
    info: 'bg-brand-50 text-brand-700 border-brand-500/10',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
