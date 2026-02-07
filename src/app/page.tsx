"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MotionSphereCanvas } from '@/components/MotionSphere';
import { TypographicHero } from '@/components/TypographicHero';
import { ProjectList } from '@/components/ProjectList';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverColor, setHoverColor] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const { scrollYProgress } = useScroll();
  const sphereOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 0.4]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-[300vh] bg-background overflow-x-hidden">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      
      {loaded && (
        <>
          {/* Mercury Sphere Background */}
          <motion.div style={{ opacity: sphereOpacity }}>
            <MotionSphereCanvas 
              scrollProgress={0} 
              mousePos={mousePos}
              hoverColor={hoverColor}
            />
          </motion.div>

          {/* Hero Section */}
          <TypographicHero />

          {/* Project List */}
          <ProjectList 
            onHover={(color) => setHoverColor(color)}
            onProjectClick={(p) => setSelectedProject(p)}
          />

          {/* Contact Section */}
          <section className="relative h-screen flex flex-col items-center justify-center z-20 overflow-hidden bg-black/80 backdrop-blur-sm">
            <div className="text-center space-y-12">
              <motion.h2 
                className="font-headline text-5xl md:text-8xl tracking-tighter"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
              >
                LET'S CREATE<br/>THE FUTURE
              </motion.h2>
              
              <div className="relative group">
                <Button 
                  className="bg-white text-black border-none px-16 py-10 rounded-none font-headline tracking-[0.4em] text-xs transition-all duration-500 hover:scale-110 active:scale-95"
                >
                  START A PROJECT
                </Button>
              </div>
            </div>

            <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[9px] font-headline tracking-[0.4em] text-muted-foreground uppercase">
              <div>© 2026 MOTION DESIGN STUDIO</div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Vimeo</a>
                <a href="#" className="hover:text-white transition-colors">Behance</a>
              </div>
            </footer>
          </section>

          {/* Detailed View */}
          <ProjectOverlay 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </>
      )}
    </main>
  );
}