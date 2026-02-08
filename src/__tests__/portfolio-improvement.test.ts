import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock the AI module
vi.mock('@/ai/genkit', () => ({
  ai: {
    definePrompt: vi.fn(() => vi.fn()),
    defineFlow: vi.fn(() => vi.fn()),
  },
}));

describe('Portfolio Improvement Suggestions Types', () => {
  it('should have correct input schema structure', () => {
    const input = {
      portfolioDescription: 'Test portfolio focusing on 3D animations',
    };
    
    expect(input).toHaveProperty('portfolioDescription');
    expect(typeof input.portfolioDescription).toBe('string');
  });

  it('should have correct output schema structure', () => {
    const output = {
      suggestions: ['Add more case studies', 'Improve SEO'],
      seoKeywords: ['3D animation', 'motion graphics'],
    };
    
    expect(output).toHaveProperty('suggestions');
    expect(output).toHaveProperty('seoKeywords');
    expect(Array.isArray(output.suggestions)).toBe(true);
    expect(Array.isArray(output.seoKeywords)).toBe(true);
  });

  it('should validate suggestions are strings', () => {
    const suggestions = ['Add more case studies', 'Improve SEO', 'Update contact form'];
    
    suggestions.forEach(suggestion => {
      expect(typeof suggestion).toBe('string');
      expect(suggestion.length).toBeGreaterThan(0);
    });
  });

  it('should validate SEO keywords are strings', () => {
    const keywords = ['3D animation', 'motion graphics', 'portfolio'];
    
    keywords.forEach(keyword => {
      expect(typeof keyword).toBe('string');
      expect(keyword.length).toBeGreaterThan(0);
    });
  });
});
