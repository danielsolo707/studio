"use client"

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
    
    // Rotation based on mouse
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mousePos.x * 0.5, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mousePos.y * 0.5, 0.05);

    // Deformation based on scroll
    const boilStrength = scrollProgress > 0.3 ? (scrollProgress - 0.3) * 2 : 0;
    
    // Scale deforms into a flat disk on hover
    const targetScale = hoverColor ? [1.5, 1.5, 0.1] : [1, 1, 1];
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale[0], 0.1);
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale[1], 0.1);
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale[2], 0.1);

    // Subtle wave surface movement
    const vertices = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const y = vertices.getY(i);
      const z = vertices.getZ(i);
      
      const noise = Math.sin(x * 2 + time * 2) * Math.cos(y * 2 + time * 1.5) * (0.1 + boilStrength * 0.5);
      const mouseDist = Math.sqrt(Math.pow(x - mousePos.x * 2, 2) + Math.pow(y - mousePos.y * 2, 2));
      const reactive = Math.max(0, 1 - mouseDist) * 0.2;

      const newScale = 1 + noise + reactive;
      vertices.setXYZ(i, x * newScale, y * newScale, z * newScale);
    }
    vertices.needsUpdate = true;

    // Color reflection update
    if (hoverColor) {
      materialRef.current.emissive.lerp(new THREE.Color(hoverColor), 0.1);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.5, 0.1);
    } else {
      materialRef.current.emissive.lerp(new THREE.Color(0x7DF9FF), 0.05);
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(materialRef.current.emissiveIntensity, 0.05, 0.05);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#1a1a1a"
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={1}
        emissive="#7DF9FF"
        emissiveIntensity={0.05}
        envMapIntensity={2}
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, 10]} intensity={1} color="#7DF9FF" />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#1A237E" />
        <MercurySphere scrollProgress={scrollProgress} mousePos={mousePos} hoverColor={hoverColor} />
      </Canvas>
    </div>
  );
}