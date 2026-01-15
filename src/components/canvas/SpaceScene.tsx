'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { useSpaceStore } from '@/store/spaceStore';

import Starfield from './objects/Starfield';
import CosmicDust from './objects/CosmicDust';
import AsteroidField from './objects/AsteroidField';
import Galaxy from './objects/Galaxy';
import GalaxySkybox from './objects/GalaxySkybox';
import NebulaGlow from './effects/NebulaGlow';
import SpaceshipFlyby from './effects/SpaceshipFlyby';

/**
 * SpaceScene - Main scene orchestrator
 * 
 * All 3D elements synchronized:
 * - Galaxy Skybox (GLTF: realistic_galaxy_skybox_hdri_panorama) - Background
 * - Starfield (procedural)
 * - Cosmic Dust (procedural particles)
 * - Galaxy (procedural spiral)
 * - Nebula Glow (procedural effect)
 * - Asteroid Field (GLTF: asteroid_low_poly + space_rocks)
 * - Spaceship Flyby (GLTF: spaceship)
 * 
 * All elements react to:
 * - Mouse position (parallax)
 * - Scroll position (depth movement)
 * - Time (continuous animation)
 */
export default function SpaceScene() {
    const sceneRef = useRef<Group>(null);
    const mousePosition = useSpaceStore((state) => state.mousePosition);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    useFrame((state) => {
        if (!sceneRef.current) return;

        const time = state.clock.getElapsedTime();

        // Mouse parallax - very subtle space bending effect
        const targetRotX = mousePosition.y * 0.004;
        const targetRotY = mousePosition.x * 0.004;

        // SLOWER interpolation for ultra-smooth cinematic feel
        sceneRef.current.rotation.x += (targetRotX - sceneRef.current.rotation.x) * 0.01;
        sceneRef.current.rotation.y += (targetRotY - sceneRef.current.rotation.y) * 0.01;

        // Scroll-based depth movement - slower
        const targetZ = scrollProgress * 3;
        sceneRef.current.position.z += (targetZ - sceneRef.current.position.z) * 0.008;

        // Very subtle breathing motion for entire scene
        sceneRef.current.position.y = Math.sin(time * 0.08) * 0.2;
    });

    return (
        <group ref={sceneRef}>
            {/* Scene Lighting - synchronized for all models */}

            {/* Ambient fill light */}
            <ambientLight intensity={0.15} color="#b8c5d6" />

            {/* Main directional light (sun-like) */}
            <directionalLight
                position={[50, 30, 20]}
                intensity={0.8}
                color="#ffffff"
                castShadow={false}
            />

            {/* Blue rim light from behind */}
            <directionalLight
                position={[-30, -10, -50]}
                intensity={0.4}
                color="#60a5fa"
            />

            {/* Purple accent light */}
            <pointLight
                position={[0, 50, -100]}
                intensity={0.5}
                color="#a78bfa"
                distance={200}
            />

            {/* Cyan fill from below */}
            <pointLight
                position={[0, -40, 0]}
                intensity={0.3}
                color="#22d3ee"
                distance={150}
            />

            {/* ========================================
                SKYBOX / BACKGROUND (GLTF)
            ======================================== */}

            {/* Realistic Galaxy Skybox - wraps entire scene */}
            <GalaxySkybox />

            {/* ========================================
                PROCEDURAL BACKGROUND ELEMENTS
            ======================================== */}

            {/* Distant galaxy in background */}
            <Galaxy />

            {/* Nebula color glow */}
            <NebulaGlow />

            {/* Multi-layer star field with blinking */}
            <Starfield />

            {/* Floating dust particles */}
            <CosmicDust />

            {/* ========================================
                3D MODEL ELEMENTS (GLTF)
            ======================================== */}

            {/* Asteroid field using asteroid_low_poly and space_rocks models */}
            <AsteroidField />

            {/* Main spaceship using spaceship model - continuous flyby */}
            <SpaceshipFlyby />
        </group>
    );
}
