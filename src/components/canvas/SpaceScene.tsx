'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import Starfield from './objects/Starfield';
import Planets from './objects/Planets';
import AsteroidField from './objects/AsteroidField';
import Galaxy from './objects/Galaxy';
import AmbientGlow from './effects/AmbientGlow';
import { useMouseInteraction } from '@/lib/hooks/useMouseInteraction';

/**
 * SpaceScene - Main scene orchestrator
 * 
 * Manages all space elements and coordinates their interactions.
 * All animations are time-based for consistent performance.
 */
export default function SpaceScene() {
    const sceneRef = useRef<Group>(null);
    const { mouseOffset, waveIntensity } = useMouseInteraction();

    // Subtle camera parallax based on mouse movement
    useFrame((state) => {
        if (sceneRef.current) {
            // Extremely subtle rotation for parallax effect
            sceneRef.current.rotation.x = mouseOffset.y * 0.05;
            sceneRef.current.rotation.y = mouseOffset.x * 0.05;
        }
    });

    return (
        <group ref={sceneRef}>
            {/* Base ambient lighting - very subtle */}
            <ambientLight intensity={0.1} color="#0a0a1a" />

            {/* Volumetric ambient glow with breathing effect */}
            <AmbientGlow />

            {/* Multi-layer starfield with depth */}
            <Starfield waveIntensity={waveIntensity} />

            {/* Distant rotating galaxy */}
            <Galaxy />

            {/* Slow-moving planets */}
            <Planets />

            {/* Sparse asteroid field */}
            <AsteroidField />
        </group>
    );
}
