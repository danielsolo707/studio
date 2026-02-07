
"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TypographicHero() {
  const { scrollYProgress } = useScroll();
  
  const yMove = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  return (
    <div className="relative h-[150vh] pointer-events-none z-10">
      <header className="fixed top-0 w-full flex justify-between p-10 z-50 mix-blend-difference">
        <div className="font-headline text-[10px] font-bold tracking-[0.4em]">SHARD™</div>
        <div className="font-headline text-[9px] tracking-[0.4em] opacity-40 italic">MOTION CRAFT</div>
      </header>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale, y: yMove }}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="font-headline text-[12vw] md:text-[14vw] leading-[0.8] text-white tracking-tighter text-center italic font-bold">
            BEYOND
          </h1>
          <h1 className="font-headline text-[12vw] md:text-[14vw] leading-[0.8] text-white tracking-tighter text-center">
            VISIBLE
          </h1>
          <div className="mt-8 flex gap-4">
            <div className="h-[1px] w-24 bg-white/30 self-center" />
            <p className="font-headline text-[9px] tracking-[0.8em] text-white/50">EST. 2026</p>
            <div className="h-[1px] w-24 bg-white/30 self-center" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
