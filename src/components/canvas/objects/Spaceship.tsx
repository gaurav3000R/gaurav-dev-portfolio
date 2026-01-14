'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Spaceship - Featured 3D model
 * Positioned prominently with slow cinematic animation
 */
export default function Spaceship() {
  const { scene } = useGLTF('/3d-modals/spaceship/scene.gltf');
  const modelRef = useRef<THREE.Group>(null);
  const scrollProgress = useSpaceStore((state) => state.scrollProgress);

  // Clone and fix materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        // Remove background planes (pure white without texture)
        if (mat.color && mat.color.getHex() === 0xffffff && !mat.map) {
          child.visible = false;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;
    const time = state.clock.getElapsedTime();

    // Very slow rotation
    modelRef.current.rotation.y = -0.3 + time * 0.02;

    // Gentle floating bob
    modelRef.current.position.y = -5 + Math.sin(time * 0.15) * 0.8;

    // Subtle scroll parallax
    modelRef.current.position.z = 15 + scrollProgress * 8;
  });

  return (
    <primitive 
      object={clonedScene} 
      ref={modelRef} 
      scale={2} 
      position={[25, -5, 15]} 
      rotation={[0.05, -0.3, 0]}
    />
  );
}
