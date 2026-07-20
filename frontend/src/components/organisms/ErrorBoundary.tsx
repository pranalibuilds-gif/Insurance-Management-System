import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../atoms/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-6 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning-50 mb-6">
            <AlertTriangle className="h-10 w-10 text-warning-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-4 text-lg text-neutral-500 max-w-md mx-auto">
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="mt-10 flex gap-4">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
