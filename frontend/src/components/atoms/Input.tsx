import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, prefixIcon, suffixIcon, isRequired, id, disabled, ...props }, ref) => {
    const inputId = id || React.useId();
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold text-neutral-700 flex items-center"
          >
            {label}
            {isRequired && <span className="ml-1 text-danger-500">*</span>}
          </label>
        )}

        <div className="relative group">
          {prefixIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-500 transition-colors">
              {prefixIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={cn(
              error ? errorId : undefined,
              helperText ? helperId : undefined
            )}
            className={cn(
              'flex h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all duration-fast ease-standard ring-offset-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-50',
              prefixIcon && 'pl-10',
              suffixIcon && 'pr-10',
              error && 'border-danger-500 focus-visible:ring-danger-500',
              className
            )}
            {...props}
          />

          {suffixIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-500 transition-colors">
              {suffixIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs font-medium text-danger-500 animate-entrance">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
