
"use client"

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GlassShards({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a set of random shards
  const shards = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.4
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth rotation of the whole group based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.4, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mousePos.y * 0.4, 0.05);

    // Individual shard animation
    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      child.rotation.x += 0.002 * shard.speed;
      child.rotation.y += 0.003 * shard.speed;
      child.position.y += Math.sin(time * shard.speed) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh 
          key={i} 
          position={shard.position} 
          rotation={shard.rotation} 
          scale={shard.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            transmission={0.95}
            thickness={2}
            roughness={0.05}
            envMapIntensity={2}
            clearcoat={1}
            reflectivity={1}
            color="#ffffff"
            metalness={0.1}
            ior={1.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export function MotionSphereCanvas({ mousePos }: { 
  mousePos: { x: number; y: number };
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        <GlassShards mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
