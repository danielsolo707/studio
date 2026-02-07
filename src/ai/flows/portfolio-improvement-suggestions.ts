'use server';

/**
 * @fileOverview AI-powered portfolio improvement suggestions flow.
 *
 * - getPortfolioImprovementSuggestions - A function that generates suggestions for improving a portfolio.
 * - PortfolioImprovementInput - The input type for the getPortfolioImprovementSuggestions function.
 * - PortfolioImprovementOutput - The return type for the getPortfolioImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioImprovementInputSchema = z.object({
  portfolioDescription: z
    .string()
    .describe('A detailed description of the existing portfolio, including its strengths and weaknesses.'),
});
export type PortfolioImprovementInput = z.infer<typeof PortfolioImprovementInputSchema>;

const PortfolioImprovementOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of actionable suggestions to improve the portfolio and highlight its strengths.'),
  seoKeywords: z
    .array(z.string())
    .describe('A list of SEO keywords to incorporate into the portfolio to improve its search engine visibility.'),
});
export type PortfolioImprovementOutput = z.infer<typeof PortfolioImprovementOutputSchema>;

export async function getPortfolioImprovementSuggestions(
  input: PortfolioImprovementInput
): Promise<PortfolioImprovementOutput> {
  return portfolioImprovementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioImprovementPrompt',
  input: {schema: PortfolioImprovementInputSchema},
  output: {schema: PortfolioImprovementOutputSchema},
  prompt: `You are an expert portfolio consultant specializing in providing improvement suggestions and SEO optimization.

  Based on the description of the existing portfolio, provide actionable suggestions to improve it and highlight its strengths.
  Also, identify relevant SEO keywords that can be incorporated into the portfolio to improve its search engine visibility.

  Portfolio Description: {{{portfolioDescription}}}
  `,
});

const portfolioImprovementFlow = ai.defineFlow(
  {
    name: 'portfolioImprovementFlow',
    inputSchema: PortfolioImprovementInputSchema,
    outputSchema: PortfolioImprovementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
