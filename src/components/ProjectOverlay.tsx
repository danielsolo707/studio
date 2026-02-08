
"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/types/project';

export function ProjectOverlay({ 
  project, 
  onClose 
}: { 
  project: Project | null; 
  onClose: () => void;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (project) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#030305] flex flex-col overflow-y-auto"
        >
          <motion.div 
            className="relative w-full aspect-video md:h-[70vh] z-0 overflow-hidden"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image 
              src={project.video} 
              alt={project.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-[#DFFF00]"
               >
                 <PlayCircle size={80} strokeWidth={1} />
               </motion.div>
            </div>
          </motion.div>

          <div className="relative z-10 flex-1 flex flex-col p-8 md:p-24 bg-[#030305]">
            <motion.button
              onClick={onClose}
              className="absolute top-12 left-12 flex items-center gap-2 font-headline text-[10px] tracking-[0.4em] text-white hover:text-[#DFFF00] transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft size={16} /> BACK TO LIST
            </motion.button>

            <div className="max-w-5xl space-y-12 mt-12">
              <motion.h2 
                className="font-headline text-5xl md:text-[8vw] leading-none tracking-tighter italic text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {project.name}
              </motion.h2>
              
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                  >
                    <p className="font-body text-xl md:text-3xl text-white/60 max-w-3xl leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-16 pt-12 border-t border-white/10">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#DFFF00] mb-4">YEAR</p>
                        <p className="font-headline text-lg">{project.year}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#DFFF00] mb-4">SPECIALIZATION</p>
                        <p className="font-headline text-lg">HIGH-END MOTION</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#DFFF00] mb-4">TOOLS</p>
                        <p className="font-headline text-lg">C4D / AE / OCTANE</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
