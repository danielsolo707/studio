"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TypographicHero() {
  const { scrollYProgress } = useScroll();
  
  const xLeft = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const xRight = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <div className="relative h-[150vh] pointer-events-none z-10">
      <header className="fixed top-0 w-full flex justify-between p-8 z-50 mix-blend-difference">
        <div className="font-headline text-xs font-bold tracking-[0.2em]">DANIEL</div>
        <div className="font-headline text-[10px] tracking-[0.3em] opacity-60">STUDIO ©2026</div>
      </header>

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <motion.h1 
            style={{ x: xLeft }}
            className="font-headline text-[10vw] md:text-[11vw] leading-[0.85] text-white tracking-tighter text-center"
          >
            MOTION
          </motion.h1>
          <motion.h1 
            style={{ x: xRight }}
            className="font-headline text-[10vw] md:text-[11vw] leading-[0.85] text-white tracking-tighter text-center"
          >
            DESIGN
          </motion.h1>
          <motion.h1 
            style={{ x: xLeft }}
            className="font-headline text-[10vw] md:text-[11vw] leading-[0.85] text-white tracking-tighter text-center"
          >
            STUDIO
          </motion.h1>
        </motion.div>
      </div>
    </div>
  );
}