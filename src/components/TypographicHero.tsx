
"use client"

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TypographicHero() {
  const { scrollYProgress } = useScroll();
  
  const xLeft = useTransform(scrollYProgress, [0, 0.3], [0, -500]);
  const xRight = useTransform(scrollYProgress, [0, 0.3], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  return (
    <div className="relative h-[200vh] pointer-events-none z-10">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="flex flex-col items-center justify-center w-full"
        >
          <motion.h1 
            style={{ x: xLeft }}
            className="font-headline text-[12vw] leading-none text-white tracking-tighter"
          >
            MOTION
          </motion.h1>
          <motion.h1 
            style={{ x: xRight }}
            className="font-headline text-[12vw] leading-none text-stroke tracking-tighter"
          >
            THAT
          </motion.h1>
          <motion.h1 
            style={{ x: xLeft }}
            className="font-headline text-[12vw] leading-none text-white tracking-tighter"
          >
            MATTERS
          </motion.h1>
        </motion.div>
      </div>
    </div>
  );
}
