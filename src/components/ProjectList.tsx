
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
    name: 'NEON DRIFT', 
    year: '2024', 
    color: '#7DF9FF', 
    video: PlaceHolderImages[0].imageUrl,
    description: 'A deep dive into procedural neon light physics.'
  },
  { 
    id: '2', 
    name: 'LIQUID METAL', 
    year: '2023', 
    color: '#C0C0C0', 
    video: PlaceHolderImages[1].imageUrl,
    description: 'Exploring surface tension and metallic reflections.'
  },
  { 
    id: '3', 
    name: 'VOID CYCLE', 
    year: '2023', 
    color: '#1A237E', 
    video: PlaceHolderImages[2].imageUrl,
    description: 'Minimalist geometry in an infinite black space.'
  },
  { 
    id: '4', 
    name: 'CYBER FLOW', 
    year: '2022', 
    color: '#FF00FF', 
    video: PlaceHolderImages[3].imageUrl,
    description: 'Dynamic light trails synchronized to electronic beats.'
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
      className="relative z-20 min-h-screen pt-[20vh] pb-[50vh] px-6 md:px-24"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-6xl mx-auto space-y-4">
        <h2 className="font-headline text-xs tracking-[0.5em] text-muted-foreground mb-20 uppercase">
          Selected Works
        </h2>
        
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => {
              setActiveProject(project);
              onHover(project.color);
            }}
            onMouseLeave={() => {
              setActiveProject(null);
              onHover(undefined);
            }}
            onClick={() => onProjectClick(project)}
            className="group py-8 border-b border-white/10 flex items-center justify-between cursor-none"
          >
            <h3 className="font-headline text-4xl md:text-7xl group-hover:text-accent transition-colors duration-500">
              {project.name}
            </h3>
            <span className="font-body text-lg text-muted-foreground">
              {project.year}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ 
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              pointerEvents: 'none',
              zIndex: 100
            }}
            className="w-80 h-48 overflow-hidden rounded-lg shadow-2xl border border-white/20 bg-black"
          >
            <Image 
              src={activeProject.video} 
              alt={activeProject.name}
              fill
              className="object-cover"
              data-ai-hint="motion preview"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
