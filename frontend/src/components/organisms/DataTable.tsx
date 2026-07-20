import React from 'react';
import { cn } from '../../utils/cn';
import { LoadingSkeleton } from '../molecules/LoadingSkeleton';
import { EmptyState } from '../molecules/EmptyState';
import { Pagination } from '../molecules/Pagination';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyTitle = 'No records found',
  emptyDescription = 'There is no data to display at the moment.',
  pagination,
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingSkeleton variant="table" count={5} />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className="my-8" />;
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="overflow-x-auto rounded-xl border border-neutral-100 bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-neutral-50/50 border-b border-neutral-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider',
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'transition-colors hover:bg-neutral-50/50',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={cn('px-6 py-4 text-sm text-neutral-900', column.className)}
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
