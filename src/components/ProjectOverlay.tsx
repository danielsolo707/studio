
"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  year: string;
  color: string;
  video: string;
  description: string;
}

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
          className="fixed inset-0 z-[100] bg-black flex flex-col"
        >
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image 
              src={project.video} 
              alt={project.name}
              fill
              className="object-cover"
              data-ai-hint="motion background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </motion.div>

          <div className="relative z-10 flex-1 flex flex-col justify-end p-8 md:p-24">
            <motion.button
              onClick={onClose}
              className="absolute top-12 left-12 flex items-center gap-2 font-headline text-xs tracking-widest text-white hover:text-accent transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft size={16} /> CLOSE
            </motion.button>

            <div className="max-w-4xl space-y-6">
              <motion.h2 
                className="font-headline text-5xl md:text-9xl tracking-tighter"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {project.name}
              </motion.h2>
              
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed animate-type-on overflow-hidden whitespace-nowrap">
                      {project.description}
                    </p>
                    <div className="flex gap-8 pt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-accent mb-1">Year</p>
                        <p className="font-headline">{project.year}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-accent mb-1">Role</p>
                        <p className="font-headline">Lead Motion</p>
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
