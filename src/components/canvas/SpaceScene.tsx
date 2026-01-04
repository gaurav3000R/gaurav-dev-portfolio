'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useSpaceStore } from '@/store/spaceStore';

// Scene components
import Starfield from './objects/Starfield';
import CosmicDust from './objects/CosmicDust';
import Planets from './objects/Planets';
import AsteroidField from './objects/AsteroidField';
import Galaxy from './objects/Galaxy';
import NebulaGlow from './effects/NebulaGlow';

/**
 * SpaceScene - Main scene orchestrator
 * 
 * Manages all space elements and coordinates their interactions.
 * Integrates mouse parallax and scroll effects.
 * All animations are time-based for consistent performance.
 */
export default function SpaceScene() {
    const sceneRef = useRef<Group>(null);

    // Get interaction state from Zustand
    const mousePosition = useSpaceStore((state) => state.mousePosition);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Apply subtle camera parallax based on mouse and scroll
    useFrame((state) => {
        if (sceneRef.current) {
            // Mouse parallax (very subtle)
            const targetRotationX = mousePosition.y * 0.03;
            const targetRotationY = mousePosition.x * 0.03;

            // Smooth interpolation
            sceneRef.current.rotation.x += (targetRotationX - sceneRef.current.rotation.x) * 0.05;
            sceneRef.current.rotation.y += (targetRotationY - sceneRef.current.rotation.y) * 0.05;

            // Scroll-based depth adjustment (very subtle)
            const targetZ = scrollProgress * 5;
            sceneRef.current.position.z += (targetZ - sceneRef.current.position.z) * 0.02;
        }
    });

    return (
        <group ref={sceneRef}>
            {/* Base ambient lighting - extremely subtle */}
            <ambientLight intensity={0.08} color="#0a0a1a" />

            {/* Nebula ambient glow with breathing effect */}
            <NebulaGlow />

            {/* Multi-layer starfield with depth and parallax */}
            <Starfield />

            {/* Cosmic dust particles for depth */}
            <CosmicDust />

            {/* Distant rotating galaxy */}
            <Galaxy />

            {/* Slow-drifting planets */}
            <Planets />

            {/* Sparse asteroid field */}
            <AsteroidField />
        </group>
    );
}
