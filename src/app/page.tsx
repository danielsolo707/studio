"use client"

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { MotionSphereCanvas } from '@/components/MotionSphere';
import { TypographicHero } from '@/components/TypographicHero';
import { ProjectList } from '@/components/ProjectList';
import { ProjectOverlay } from '@/components/ProjectOverlay';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.5]);

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
    <main className="relative min-h-[500vh] bg-black overflow-x-hidden">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      
      {loaded && (
        <>
          <motion.div 
            style={{ opacity: backgroundOpacity }}
            className="fixed inset-0 z-0"
          >
            <MotionSphereCanvas mousePos={mousePos} />
          </motion.div>

          <TypographicHero />

          {/* About Section from Image */}
          <section className="relative z-20 min-h-screen flex items-center px-12 md:px-24 py-32">
            <div className="max-w-4xl">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                className="font-headline text-[10px] tracking-[0.5em] mb-12"
              >
                ABOUT
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-headline text-5xl md:text-8xl mb-12 leading-[1.1] tracking-tighter"
              >
                CRAFTING DIGITAL MOVEMENT
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-2xl font-body max-w-2xl mb-16 leading-relaxed"
              >
                I transform static ideas into dynamic visual narratives. 
                Specializing in high-end motion graphics and 3D experiences.
              </motion.p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 font-headline text-[10px] tracking-[0.3em] opacity-40">
                <span>AFTER EFFECTS</span>
                <span>/</span>
                <span>CINEMA 4D</span>
                <span>/</span>
                <span>BLENDER</span>
                <span>/</span>
                <span>UNREAL ENGINE</span>
              </div>
            </div>
          </section>

          <div className="relative z-20">
            <ProjectList 
              onHover={() => {}}
              onProjectClick={(p) => setSelectedProject(p)}
            />
          </div>

          {/* Final "Let's Talk" Section */}
          <section className="relative h-screen flex flex-col items-center justify-center z-20 bg-black">
            <div className="text-center space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                className="font-headline text-[10px] tracking-[0.5em] uppercase"
              >
                GET IN TOUCH
              </motion.p>
              
              <motion.a 
                href="mailto:hello@daniel.design"
                className="group relative block"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <h2 className="font-headline text-6xl md:text-[12vw] tracking-tighter italic text-white group-hover:text-[#7DF9FF] group-hover:electric-glow transition-all duration-500">
                  LET&apos;S TALK
                </h2>
              </motion.a>
            </div>

            <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[8px] font-headline tracking-[0.5em] text-muted-foreground uppercase">
              <div className="opacity-40">© 2026 DANIEL STUDIO</div>
              <div className="flex gap-12">
                <a href="#" className="hover:text-[#7DF9FF] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#7DF9FF] transition-colors">Vimeo</a>
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