"use client"

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RefractiveGlass({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const shards = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.8 + Math.random() * 2,
      speed: 0.05 + Math.random() * 0.15
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mousePos.x * 0.2, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mousePos.y * 0.2, 0.05);

    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      child.rotation.x += 0.001 * shard.speed;
      child.rotation.y += 0.001 * shard.speed;
      child.position.y += Math.sin(time * shard.speed + i) * 0.0015;
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
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            transmission={0.9}
            thickness={1.5}
            roughness={0.02}
            envMapIntensity={1}
            clearcoat={1}
            reflectivity={0.8}
            color="#ffffff"
            metalness={0.1}
            ior={1.45}
            transparent
            opacity={0.3}
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
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <RefractiveGlass mousePos={mousePos} />
      </Canvas>
    </div>
  );
}