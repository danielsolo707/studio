
"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MotionSphereCanvas } from '@/components/MotionSphere';
import { TypographicHero } from '@/components/TypographicHero';
import { ProjectList } from '@/components/ProjectList';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { PortfolioAI } from '@/components/PortfolioAI';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverColor, setHoverColor] = useState<string | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const { scrollYProgress } = useScroll();
  const footerShrink = useTransform(scrollYProgress, [0.95, 1], [1, 0.01]);

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
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      
      {loaded && (
        <>
          {/* Mercury Sphere Background */}
          <MotionSphereCanvas 
            scrollProgress={0} // We can derive this from useScroll if needed
            mousePos={mousePos}
            hoverColor={hoverColor}
          />

          {/* Hero Section */}
          <TypographicHero />

          {/* Project List */}
          <ProjectList 
            onHover={(color) => setHoverColor(color)}
            onProjectClick={(p) => setSelectedProject(p)}
          />

          {/* GenAI Tool */}
          <PortfolioAI />

          {/* Contact Section */}
          <section className="relative h-screen flex flex-col items-center justify-center z-20 overflow-hidden">
            <div className="text-center space-y-8">
              <motion.h2 
                className="font-headline text-4xl md:text-8xl tracking-tighter"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-100px" }}
              >
                READY TO<br/>COLLABORATE?
              </motion.h2>
              
              <div className="relative group">
                <Button 
                  className="bg-transparent border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-12 py-8 rounded-full font-headline tracking-[0.3em] transition-all duration-500"
                >
                  GET IN TOUCH
                </Button>
                
                {/* Contact Transition Mercury Point */}
                <motion.div 
                  style={{ scale: footerShrink }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent blur-md rounded-full pointer-events-none"
                />
              </div>
            </div>

            <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[10px] font-headline tracking-widest text-muted-foreground uppercase">
              <div>© 2024 MotionVerse</div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-accent transition-colors">Behance</a>
                <a href="#" className="hover:text-accent transition-colors">Vimeo</a>
                <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
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
