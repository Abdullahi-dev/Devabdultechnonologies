import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    if (error.message && (error.message.includes("ResizeObserver loop completed with undelivered notifications") || error.message.includes("ResizeObserver loop limit exceeded"))) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  public componentDidMount() {
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  public componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  private handleGlobalError = (event: ErrorEvent) => {
    if (event.message && event.message.includes("WebSocket closed without opened")) {
      event.preventDefault();
      return;
    }
    if (event.message && (event.message.includes("ResizeObserver loop completed with undelivered notifications") || event.message.includes("ResizeObserver loop limit exceeded"))) {
      event.preventDefault();
      return;
    }
    this.setState({ hasError: true, error: event.error });
  };

  private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    if (error.message && error.message.includes("WebSocket closed without opened")) {
      // Ignore this error as Firestore will automatically reconnect
      event.preventDefault();
      return;
    }
    if (error.message && (error.message.includes("ResizeObserver loop completed with undelivered notifications") || error.message.includes("ResizeObserver loop limit exceeded"))) {
      event.preventDefault();
      return;
    }
    this.setState({ hasError: true, error });
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let errorDetails = "";

      if (this.state.error) {
        try {
          const parsedError = JSON.parse(this.state.error.message);
          if (parsedError.error && parsedError.error.includes("Missing or insufficient permissions")) {
            errorMessage = "You do not have permission to access this resource.";
            errorDetails = `Operation: ${parsedError.operationType} on ${parsedError.path}`;
          } else {
            errorMessage = parsedError.error || this.state.error.message;
          }
        } catch (e) {
          errorMessage = this.state.error.message;
        }
      }

      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            {errorDetails && (
              <p className="text-sm text-gray-500 mb-6 font-mono bg-gray-50 p-2 rounded">{errorDetails}</p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
