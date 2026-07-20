import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand';
  size?: 'sm' | 'md';
}

export const Badge = ({
  className,
  variant = 'neutral',
  size = 'md',
  ...props
}: BadgeProps) => {
  const variants = {
    success: 'bg-success-50 text-success-700 border-success-500/10',
    warning: 'bg-warning-50 text-warning-700 border-warning-500/10',
    danger: 'bg-danger-50 text-danger-700 border-danger-500/10',
    info: 'bg-info-50 text-info-700 border-info-500/10',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    brand: 'bg-brand-50 text-brand-700 border-brand-500/10',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-semibold transition-colors tracking-wide',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

Badge.displayName = 'Badge';
