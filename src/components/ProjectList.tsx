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
    color: '#FFFFFF', 
    video: PlaceHolderImages[0].imageUrl,
    description: 'A deep dive into high-viscosity liquid metal simulations.'
  },
  { 
    id: '2', 
    name: 'SILVER SHIFT', 
    year: '2024', 
    color: '#A0A0A0', 
    video: PlaceHolderImages[1].imageUrl,
    description: 'Exploring light dispersion on brushed aluminum surfaces.'
  },
  { 
    id: '3', 
    name: 'DARK MERCURY', 
    year: '2023', 
    color: '#333333', 
    video: PlaceHolderImages[2].imageUrl,
    description: 'Minimalist fluid dynamics in low-gravity environments.'
  },
  { 
    id: '4', 
    name: 'VOID GEOMETRY', 
    year: '2023', 
    color: '#FFFFFF', 
    video: PlaceHolderImages[3].imageUrl,
    description: 'Synchronized movement of architectural monoliths.'
  }
];

export function ProjectList({ 
  onHover, 
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
      className="relative z-20 min-h-screen pt-[40vh] pb-[20vh] px-6 md:px-24"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto space-y-2">
        <h2 className="font-headline text-[10px] tracking-[0.8em] text-muted-foreground mb-32 uppercase opacity-40">
          FEATURED PROJECTS
        </h2>
        
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => {
              setActiveProject(project);
              onHover(project.color);
            }}
            onMouseLeave={() => {
              setActiveProject(null);
              onHover(undefined);
            }}
            onClick={() => onProjectClick(project)}
            className="group py-12 border-b border-white/5 flex items-baseline justify-between cursor-none transition-all duration-700 hover:pl-8"
          >
            <h3 className="font-headline text-5xl md:text-8xl group-hover:text-white transition-colors duration-500">
              {project.name}
            </h3>
            <span className="font-headline text-xs tracking-widest text-muted-foreground group-hover:text-white">
              {project.year}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            style={{ 
              position: 'fixed',
              left: mousePos.x + 30,
              top: mousePos.y + 30,
              pointerEvents: 'none',
              zIndex: 100
            }}
            className="w-96 h-56 overflow-hidden rounded-sm shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10 bg-black"
          >
            <Image 
              src={activeProject.video} 
              alt={activeProject.name}
              fill
              className="object-cover grayscale"
              data-ai-hint="chrome motion"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}