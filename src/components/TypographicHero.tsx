
"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TypographicHero() {
  const { scrollYProgress } = useScroll();
  
  const yMove = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);

  return (
    <div className="relative h-[120vh] pointer-events-none z-10">
      <header className="fixed top-0 w-full flex justify-between p-10 z-50 mix-blend-difference">
        <div className="font-headline text-[12px] font-bold tracking-[0.4em] text-white">DANIEL</div>
        <div className="font-headline text-[10px] tracking-[0.4em] text-[#DFFF00] opacity-80">MOTION DESIGN STUDIO ©2026</div>
      </header>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, y: yMove, scale }}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="font-headline text-[14vw] md:text-[16vw] leading-[0.75] text-white tracking-tighter text-center italic font-bold">
            MOTION
          </h1>
          <h1 className="font-headline text-[14vw] md:text-[16vw] leading-[0.75] text-white tracking-tighter text-center">
            DESIGNER
          </h1>
          <div className="mt-16 flex items-center gap-6">
            <div className="h-[1px] w-12 bg-[#DFFF00]/40" />
            <p className="font-headline text-[8px] tracking-[1.2em] text-[#DFFF00]">SCROLL TO EXPLORE</p>
            <div className="h-[1px] w-12 bg-[#DFFF00]/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
