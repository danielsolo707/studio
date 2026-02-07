
"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MotionSphereCanvas } from '@/components/MotionSphere';
import { TypographicHero } from '@/components/TypographicHero';
import { ProjectList } from '@/components/ProjectList';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.3]);
  const blurValue = useTransform(smoothProgress, [0, 0.5], [0, 10]);

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
    <main className="relative min-h-[400vh] bg-black overflow-x-hidden">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      
      {loaded && (
        <>
          {/* Refractive Glass Background */}
          <motion.div 
            style={{ 
              opacity: backgroundOpacity,
              filter: `blur(${blurValue}px)`
            }}
            className="fixed inset-0 z-0"
          >
            <MotionSphereCanvas mousePos={mousePos} />
          </motion.div>

          {/* Hero Section */}
          <TypographicHero />

          {/* Project List */}
          <div className="relative z-20">
            <ProjectList 
              onHover={() => {}}
              onProjectClick={(p) => setSelectedProject(p)}
            />
          </div>

          {/* Contact Section */}
          <section className="relative h-screen flex flex-col items-center justify-center z-20 overflow-hidden bg-black/40 backdrop-blur-md border-t border-white/5">
            <div className="text-center space-y-12">
              <motion.h2 
                className="font-headline text-5xl md:text-8xl tracking-tighter italic"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
              >
                CREATE<br/>BEYOND
              </motion.h2>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-white text-black border-none px-16 py-10 rounded-full font-headline tracking-[0.4em] text-[10px] transition-all duration-500 hover:bg-white/90"
                >
                  CONTACT STUDIO
                </Button>
              </motion.div>
            </div>

            <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[8px] font-headline tracking-[0.5em] text-muted-foreground uppercase">
              <div>© 2026 DIGITAL SHARD STUDIO</div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Vimeo</a>
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
