import React from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  error,
  isRequired,
  children,
  className,
}) => {
  const id = React.useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-neutral-700 flex items-center"
        >
          {label}
          {isRequired && <span className="ml-1 text-danger-500">*</span>}
        </label>
      )}

      <div className="relative">
        {React.cloneElement(children as React.ReactElement, {
          id: (children as React.ReactElement).props.id || id,
          'aria-invalid': !!error,
          'aria-describedby': cn(
            error ? errorId : undefined,
            helperText ? helperId : undefined
          ),
        })}
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
};

FormField.displayName = 'FormField';
