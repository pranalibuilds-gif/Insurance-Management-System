import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={cn('animate-pulse rounded bg-neutral-200', className)} />
);

interface LoadingSkeletonProps {
  variant?: 'table' | 'cards' | 'list';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'table',
  count = 5,
  className,
}) => {
  if (variant === 'table') {
    return (
      <div className={cn('space-y-4 w-full', className)}>
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-full" />
        </div>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="space-y-3 p-4 border rounded-xl bg-white shadow-soft">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
};
