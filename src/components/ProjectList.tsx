
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

interface Project {
  id: string;
  name: string;
  year: string;
  color: string;
  video: string;
  description: string;
}

const PROJECTS: Project[] = [
  { 
    id: '1', 
    name: 'CHROME FLOW', 
    year: '2024', 
    color: '#7DF9FF', 
    video: PlaceHolderImages[0].imageUrl,
    description: 'Experimental fluid simulation using high-viscosity liquid metal.'
  },
  { 
    id: '2', 
    name: 'SILVER SHIFT', 
    year: '2024', 
    color: '#7DF9FF', 
    video: PlaceHolderImages[1].imageUrl,
    description: 'A study on light dispersion and brushed aluminum reflections.'
  },
  { 
    id: '3', 
    name: 'DARK MERCURY', 
    year: '2023', 
    color: '#7DF9FF', 
    video: PlaceHolderImages[2].imageUrl,
    description: 'Minimalist motion study in a low-gravity vacuum environment.'
  },
  { 
    id: '4', 
    name: 'VOID GEOMETRY', 
    year: '2023', 
    color: '#7DF9FF', 
    video: PlaceHolderImages[3].imageUrl,
    description: 'Procedural generation of monolithic architectural structures.'
  }
];

export function ProjectList({ 
  onProjectClick 
}: { 
  onHover: (color?: string) => void;
  onProjectClick: (project: Project) => void;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative z-20 min-h-screen py-[20vh] px-6 md:px-24"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto space-y-0">
        <h2 className="font-headline text-[9px] tracking-[0.8em] text-muted-foreground mb-24 uppercase opacity-40">
          SELECTED WORKS
        </h2>
        
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseEnter={() => setActiveProject(project)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => onProjectClick(project)}
            className="group py-12 border-b border-white/5 flex items-center justify-between cursor-pointer transition-all duration-700 hover:pl-6"
          >
            <h3 className="font-headline text-3xl md:text-5xl tracking-tighter group-hover:text-[#7DF9FF] group-hover:italic transition-all duration-500">
              {project.name}
            </h3>
            <span className="font-headline text-[10px] tracking-widest text-muted-foreground group-hover:text-[#7DF9FF] opacity-50">
              {project.year}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ 
              position: 'fixed',
              left: mousePos.x + 30,
              top: mousePos.y + 30,
              pointerEvents: 'none',
              zIndex: 100
            }}
            className="w-80 h-48 overflow-hidden border border-[#7DF9FF]/20 bg-black shadow-[0_0_50px_rgba(125,249,255,0.05)]"
          >
            <Image 
              src={activeProject.video} 
              alt={activeProject.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              data-ai-hint="motion design"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
