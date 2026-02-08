
"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MotionSphereCanvas } from '@/components/MotionSphere';
import { TypographicHero } from '@/components/TypographicHero';
import { ProjectList } from '@/components/ProjectList';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import type { Project } from '@/types/project';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const [currentProgress, setCurrentProgress] = useState(0);
  useEffect(() => {
    return smoothProgress.on("change", v => setCurrentProgress(v));
  }, [smoothProgress]);

  const backgroundOpacity = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [1, 0.8, 0.4, 0.2]);

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
    <main className="relative min-h-[600vh] bg-[#030305] overflow-x-hidden">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      
      {loaded && (
        <>
          <motion.div 
            style={{ opacity: backgroundOpacity }}
            className="fixed inset-0 z-0"
          >
            <MotionSphereCanvas mousePos={mousePos} scrollProgress={currentProgress} />
          </motion.div>

          <TypographicHero />

          <div className="relative z-20">
            <ProjectList 
              onHover={() => {}}
              onProjectClick={(p) => setSelectedProject(p)}
            />
          </div>

          <section className="relative z-20 min-h-screen flex items-center px-12 md:px-24 py-32 bg-black/40 backdrop-blur-sm">
            <div className="max-w-4xl">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                className="font-headline text-[10px] tracking-[0.5em] mb-12 text-[#DFFF00]"
              >
                ABOUT DANIEL
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-headline text-4xl md:text-7xl mb-12 leading-[1.1] tracking-tighter text-white"
              >
                CRAFTING <span className="text-[#DFFF00]">DIGITAL</span> MOVEMENT
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl font-body max-w-2xl mb-16 leading-relaxed text-white/80"
              >
                I transform static ideas into dynamic visual narratives. 
                Specializing in high-end motion graphics and immersive 3D experiences that bridge the gap between imagination and reality.
              </motion.p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 font-headline text-[9px] tracking-[0.3em] opacity-40">
                <span className="hover:text-[#DFFF00] transition-colors cursor-default">AFTER EFFECTS</span>
                <span>/</span>
                <span className="hover:text-[#DFFF00] transition-colors cursor-default">CINEMA 4D</span>
                <span>/</span>
                <span className="hover:text-[#DFFF00] transition-colors cursor-default">BLENDER</span>
                <span>/</span>
                <span className="hover:text-[#DFFF00] transition-colors cursor-default">UNREAL ENGINE</span>
              </div>
            </div>
          </section>

          <section className="relative h-screen flex flex-col items-center justify-center z-20">
            <div className="text-center space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                className="font-headline text-[10px] tracking-[0.5em] uppercase text-[#DFFF00]"
              >
                GET IN TOUCH
              </motion.p>
              
              <motion.a 
                href="mailto:hello@daniel.design"
                className="group relative block"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <h2 className="font-headline text-5xl md:text-[10vw] tracking-tighter italic text-white group-hover:text-[#DFFF00] group-hover:acid-glow transition-all duration-500">
                  LET&apos;S TALK
                </h2>
              </motion.a>
            </div>

            <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[8px] font-headline tracking-[0.5em] text-muted-foreground uppercase">
              <div className="opacity-40">© 2026 DANIEL PORTFOLIO</div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-[#DFFF00] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#DFFF00] transition-colors">Vimeo</a>
              </div>
            </footer>
          </section>

          <ProjectOverlay 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </>
      )}
    </main>
  );
}
