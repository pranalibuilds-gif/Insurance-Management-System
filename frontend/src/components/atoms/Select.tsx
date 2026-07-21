import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, error, placeholder, id, ...props }, ref) => {
    const selectId = id || React.useId();

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-semibold text-neutral-700"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all duration-normal ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
              error && 'border-danger-500 focus-visible:ring-danger-500',
              !props.value && 'text-neutral-400',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 group-hover:text-neutral-600 transition-colors">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs font-medium text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
