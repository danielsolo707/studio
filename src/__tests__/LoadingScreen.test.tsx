import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '@/components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders with initial count of 0', () => {
    const onComplete = vi.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Initializing Experience')).toBeInTheDocument();
  });

  it('displays the loading screen', () => {
    const onComplete = vi.fn();
    const { container } = render(<LoadingScreen onComplete={onComplete} />);
    
    // Check that the component renders
    expect(container.querySelector('.font-headline')).toBeInTheDocument();
  });
});

