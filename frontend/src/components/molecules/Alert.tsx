import React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface AlertProps {
  variant?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
}) => {
  const variants = {
    success: {
      container: 'bg-success-50 border-success-200 text-success-800',
      icon: <CheckCircle2 className="h-5 w-5 text-success-500" />,
    },
    warning: {
      container: 'bg-warning-50 border-warning-200 text-warning-800',
      icon: <AlertTriangle className="h-5 w-5 text-warning-500" />,
    },
    danger: {
      container: 'bg-danger-50 border-danger-200 text-danger-800',
      icon: <AlertCircle className="h-5 w-5 text-danger-500" />,
    },
    info: {
      container: 'bg-info-50 border-info-200 text-info-800',
      icon: <Info className="h-5 w-5 text-info-500" />,
    },
  };

  return (
    <div
      role="alert"
      className={cn(
        'relative flex w-full gap-3 rounded-xl border p-4 transition-all duration-normal ease-standard animate-entrance',
        variants[variant].container,
        className
      )}
    >
      <div className="flex-shrink-0">{variants[variant].icon}</div>
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
