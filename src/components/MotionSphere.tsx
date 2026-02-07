"use client"

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MercurySphere({ scrollProgress, mousePos, hoverColor }: { 
  scrollProgress: number; 
  mousePos: { x: number; y: number };
  hoverColor?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Heavier rotation movement
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.x * 0.2, 0.02);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mousePos.y * 0.2, 0.02);

    // Dynamic scale based on scroll and hover
    const baseScale = 1.8;
    const targetScale = hoverColor ? [baseScale * 1.2, baseScale * 1.2, 0.3] : [baseScale, baseScale, baseScale];
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale[0], 0.05);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale[1], 0.05);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale[2], 0.05);

    // Liquid metal surface deformation
    const vertices = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const z = vertices.getZ(i);
      
      // Heavy fluid noise
      const noise = Math.sin(x * 1.5 + time * 0.5) * Math.cos(y * 1.5 + time * 0.8) * 0.15;
      
      // Reactive "dent" from mouse
      const mouseDist = Math.sqrt(Math.pow(x - mousePos.x * 3, 2) + Math.pow(y - mousePos.y * 3, 2));
      const reactive = Math.max(0, 1.2 - mouseDist) * 0.3;

      const newScale = 1 + noise + reactive;
      vertices.setXYZ(i, x * newScale, y * newScale, z * newScale);
    }
    vertices.needsUpdate = true;

    // Monochrome chrome transitions
    if (hoverColor) {
      materialRef.current.emissive.lerp(new THREE.Color(hoverColor), 0.05);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.3, 0.05);
    } else {
      materialRef.current.emissive.lerp(new THREE.Color("#ffffff"), 0.02);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.05, 0.02);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 128, 128]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#0a0a0a"
        metalness={1}
        roughness={0.02}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={1}
        emissive="#ffffff"
        emissiveIntensity={0.05}
        envMapIntensity={5}
      />
    </mesh>
  );
}

export function MotionSphereCanvas({ scrollProgress, mousePos, hoverColor }: { 
  scrollProgress: number; 
  mousePos: { x: number; y: number };
  hoverColor?: string;
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        <pointLight position={[-10, -10, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={4} color="#ffffff" />
        <MercurySphere scrollProgress={scrollProgress} mousePos={mousePos} hoverColor={hoverColor} />
      </Canvas>
    </div>
  );
}