'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-[#030305] text-white p-8">
          <div className="max-w-md text-center space-y-4">
            <h2 className="font-headline text-2xl text-[#DFFF00]">
              SOMETHING WENT WRONG
            </h2>
            <p className="font-body text-sm text-white/60">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <p className="font-body text-xs text-white/40">
              This might be due to WebGL/3D graphics not being supported on your device.
              Try refreshing the page or using a different browser.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[#DFFF00] text-black font-headline text-xs tracking-wider hover:bg-[#DFFF00]/80 transition-colors"
            >
              RELOAD PAGE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
