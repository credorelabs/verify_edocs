import React, { Component, FunctionComponent, ReactNode } from "react";
import { getLogger } from "../../utils/logger";

const { stack } = getLogger("component:errorBoundary");

export interface FallbackComponentProps {
  error?: Error;
  recover: () => void;
}

export type FallbackComponentType = FunctionComponent<FallbackComponentProps>;

export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  FallbackComponent: FallbackComponentType;
  onRecover: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if the error is a "call revert exception" and ignore it
    console.log(error)
    if (error.message.includes('call revert exception')) {
      return { hasError: false, error: undefined };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    // Log the error unless it's a "call revert exception"
    if (!error.message.includes('call revert exception')) {
      stack(error);
    }
  }

  componentDidMount(): void {
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  componentWillUnmount(): void {
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  /**
   * Global promise unhandled rejection to trigger error boundary
   */
  onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    event.preventDefault();
    event.promise.catch((error) => {
      if (!error.message.includes('call revert exception')) {
        this.setState(ErrorBoundary.getDerivedStateFromError(error));
      }
    });
  };

  /**
   * Attempts to recover from error.
   */
  recover = (): void => {
    const { onRecover } = this.props;

    this.setState(
      {
        hasError: false,
        error: undefined,
      },
      () => {
        onRecover();
      }
    );
  };

  render(): ReactNode {
    const { recover } = this;
    const { hasError, error } = this.state;
    const { children, FallbackComponent } = this.props;

    if (hasError) {
      return <FallbackComponent error={error} recover={recover} />;
    }

    return children;
  }
}
