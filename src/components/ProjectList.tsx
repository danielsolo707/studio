
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Project } from '@/types/project';

const PROJECTS: Project[] = [
  { 
    id: '1', 
    name: 'CHROME FLOW', 
    year: '2024', 
    color: '#DFFF00', 
    video: PlaceHolderImages[0].imageUrl,
    description: 'Experimental fluid simulation using high-viscosity liquid metal.'
  },
  { 
    id: '2', 
    name: 'SILVER SHIFT', 
    year: '2024', 
    color: '#DFFF00', 
    video: PlaceHolderImages[1].imageUrl,
    description: 'A study on light dispersion and brushed aluminum reflections.'
  },
  { 
    id: '3', 
    name: 'DARK MERCURY', 
    year: '2023', 
    color: '#DFFF00', 
    video: PlaceHolderImages[2].imageUrl,
    description: 'Minimalist motion study in a low-gravity vacuum environment.'
  },
  { 
    id: '4', 
    name: 'VOID GEOMETRY', 
    year: '2023', 
    color: '#DFFF00', 
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
        <h2 className="font-headline text-[9px] tracking-[0.8em] text-[#DFFF00] mb-24 uppercase opacity-60">
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
            <h3 className="font-headline text-2xl md:text-5xl tracking-tighter group-hover:text-[#DFFF00] group-hover:italic transition-all duration-500 text-white">
              {project.name}
            </h3>
            <span className="font-headline text-[10px] tracking-widest text-muted-foreground group-hover:text-[#DFFF00] opacity-50">
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
            className="w-80 h-48 overflow-hidden border border-[#DFFF00]/20 bg-black shadow-[0_0_50px_rgba(223,255,0,0.1)]"
          >
            <Image 
              src={activeProject.video} 
              alt={activeProject.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
