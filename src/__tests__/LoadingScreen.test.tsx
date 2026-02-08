import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '@/components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading screen with progress', () => {
    const onComplete = () => {};
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Check if the loading screen renders
    const loadingElement = screen.getByText(/loading/i, { exact: false });
    expect(loadingElement).toBeDefined();
  });

  it('calls onComplete callback', async () => {
    let completed = false;
    const onComplete = () => {
      completed = true;
    };
    
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Wait for animation to complete (2 seconds + buffer)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    expect(completed).toBe(true);
  });
});
