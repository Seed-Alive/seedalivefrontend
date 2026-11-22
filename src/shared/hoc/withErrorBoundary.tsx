import { Component } from 'react';
import type { ComponentType, ErrorInfo, ReactNode } from 'react';
import { named } from './compose';

export interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

interface BoundaryProps {
  fallback: ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, info: ErrorInfo) => void;
  children: ReactNode;
}

interface BoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  override state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  private readonly reset = () => this.setState({ error: null });

  override render(): ReactNode {
    const { error } = this.state;
    if (error) {
      const Fallback = this.props.fallback;
      return <Fallback error={error} reset={this.reset} />;
    }
    return this.props.children;
  }
}

// Catches a crash in one screen so the rest of the app keeps working.
export function withErrorBoundary<P extends object>(
  fallback: ComponentType<ErrorFallbackProps>,
  onError?: (error: Error, info: ErrorInfo) => void
) {
  return (Inner: ComponentType<P>): ComponentType<P> => {
    const Wrapped = (props: P) => (
      <ErrorBoundary fallback={fallback} {...(onError ? { onError } : {})}>
        <Inner {...props} />
      </ErrorBoundary>
    );
    return named(Wrapped, 'withErrorBoundary', Inner);
  };
}
