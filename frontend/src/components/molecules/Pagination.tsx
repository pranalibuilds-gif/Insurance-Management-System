import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../atoms/Button';
import { cn } from '../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between py-4', className)}>
      <div className="text-sm text-neutral-500">
        Page <span className="font-semibold text-neutral-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-neutral-900">{totalPages}</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          isIconOnly
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          isIconOnly
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
