import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '@/components/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders loading screen with percentage', () => {
    const onComplete = () => {};
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Check if percentage text is rendered
    const percentageElement = screen.getByText('0', { exact: false });
    expect(percentageElement).toBeDefined();
  });

  it('renders initializing text', () => {
    const onComplete = () => {};
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Check for the initializing text
    const initText = screen.getByText(/initializing experience/i);
    expect(initText).toBeDefined();
  });
});
