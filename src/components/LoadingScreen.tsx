
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 1000);
          }, 500);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          exit={{ 
            opacity: 0, 
            filter: 'blur(100px)',
            scale: 1.5,
            transition: { duration: 1.2, ease: "easeInOut" } 
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <span className="font-headline text-[15vw] md:text-[10vw] font-bold text-accent tracking-tighter tabular-nums leading-none">
              {Math.floor(count)}
            </span>
            <motion.div 
              className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="absolute bottom-12 left-12">
            <p className="font-headline text-xs tracking-widest text-muted-foreground uppercase">
              Initializing Experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
