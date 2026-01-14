'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useSpaceStore } from '@/store/spaceStore';

import Starfield from './objects/Starfield';
import CosmicDust from './objects/CosmicDust';
import Planets from './objects/Planets';
import AsteroidField from './objects/AsteroidField';
import Galaxy from './objects/Galaxy';
import NebulaGlow from './effects/NebulaGlow';
import SpaceshipFlyby from './effects/SpaceshipFlyby';

/**
 * SpaceScene - Main scene orchestrator
 * 
 * Cinematic space environment with:
 * - Very subtle mouse parallax (space bending feel)
 * - All animations time-based
 * - No jitter or snapping
 * - Cinematic spaceship flyby on scroll
 */
export default function SpaceScene() {
    const sceneRef = useRef<Group>(null);
    const mousePosition = useSpaceStore((state) => state.mousePosition);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    useFrame(() => {
        if (!sceneRef.current) return;

        // Very subtle mouse parallax - feels like space bending
        const targetRotX = mousePosition.y * 0.008;
        const targetRotY = mousePosition.x * 0.008;

        // Smooth interpolation for cinematic feel
        sceneRef.current.rotation.x += (targetRotX - sceneRef.current.rotation.x) * 0.015;
        sceneRef.current.rotation.y += (targetRotY - sceneRef.current.rotation.y) * 0.015;

        // Subtle scroll depth
        const targetZ = scrollProgress * 3;
        sceneRef.current.position.z += (targetZ - sceneRef.current.position.z) * 0.01;
    });

    return (
        <group ref={sceneRef}>
            {/* Minimal base lighting */}
            <ambientLight intensity={0.1} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />

            <NebulaGlow />
            <Starfield />
            <CosmicDust />
            <Galaxy />
            <Planets />
            <AsteroidField />
            
            {/* Cinematic flyby spaceship - triggers on "What I Do" section */}
            <SpaceshipFlyby />
        </group>
    );
}
