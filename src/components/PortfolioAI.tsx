
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPortfolioImprovementSuggestions, type PortfolioImprovementOutput } from '@/ai/flows/portfolio-improvement-suggestions';

export function PortfolioAI() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PortfolioImprovementOutput | null>(null);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const suggestions = await getPortfolioImprovementSuggestions({
        portfolioDescription: description
      });
      setResult(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 py-32 px-6 bg-gradient-to-b from-transparent to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-3xl md:text-5xl">ELEVATE YOUR VISION</h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Use our AI-powered consultant to refine your portfolio impact and SEO visibility.
          </p>
        </div>

        <Card className="bg-card/50 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-sm tracking-widest">
              <Sparkles className="text-accent" size={16} /> PORTFOLIO ANALYZER
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Describe your current work</p>
              <Textarea 
                placeholder="e.g. My portfolio focuses on 3D liquid simulations and neon lighting effects. I want to highlight technical precision..."
                className="bg-black/50 border-white/10 min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !description}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/80 font-headline text-xs tracking-widest"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={16} />}
              GENERATE SUGGESTIONS
            </Button>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 space-y-8"
              >
                <div className="space-y-4">
                  <h4 className="font-headline text-xs text-accent tracking-widest">ACTIONABLE STEPS</h4>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-4 text-sm font-body border-l-2 border-accent pl-4 py-1">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-headline text-xs text-accent tracking-widest">SEO KEYWORDS</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.seoKeywords.map((k, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-body">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
