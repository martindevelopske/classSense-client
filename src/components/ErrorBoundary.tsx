// ErrorBoundary.tsx
import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      console.log("error found in component");

      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
