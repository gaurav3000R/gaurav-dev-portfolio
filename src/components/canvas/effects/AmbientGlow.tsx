'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * AmbientGlow Component
 * 
 * Volumetric ambient light with:
 * - Slow-moving light streaks
 * - Breathing intensity (sinusoidal variation)
 * - Careful additive blending to avoid bloom overload
 * - Creates depth and atmosphere without stealing focus
 */
export default function AmbientGlow() {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);
    const light3Ref = useRef<THREE.PointLight>(null);

    // Animate lights: slow movement and breathing intensity
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Light 1: Blue-tinted, moves in circular pattern
        if (light1Ref.current) {
            light1Ref.current.position.x = Math.cos(time * 0.05) * 80;
            light1Ref.current.position.y = Math.sin(time * 0.03) * 60;
            light1Ref.current.position.z = -100 + Math.sin(time * 0.04) * 30;

            // Breathing intensity
            light1Ref.current.intensity = 0.3 + Math.sin(time * 0.2) * 0.15;
        }

        // Light 2: Purple-tinted, figure-8 pattern
        if (light2Ref.current) {
            light2Ref.current.position.x = Math.sin(time * 0.04) * 100;
            light2Ref.current.position.y = Math.sin(time * 0.08) * 40;
            light2Ref.current.position.z = -150 + Math.cos(time * 0.03) * 40;

            light2Ref.current.intensity = 0.25 + Math.cos(time * 0.15) * 0.12;
        }

        // Light 3: Warm-tinted, slow drift
        if (light3Ref.current) {
            light3Ref.current.position.x = Math.cos(time * 0.06) * 70;
            light3Ref.current.position.y = Math.cos(time * 0.05) * 50;
            light3Ref.current.position.z = -80 + Math.sin(time * 0.02) * 25;

            light3Ref.current.intensity = 0.2 + Math.sin(time * 0.18) * 0.1;
        }
    });

    return (
        <group>
            {/* Blue ambient streak */}
            <pointLight
                ref={light1Ref}
                color="#4a6fa5"
                intensity={0.3}
                distance={200}
                decay={2}
            />

            {/* Purple ambient streak */}
            <pointLight
                ref={light2Ref}
                color="#6a5a8e"
                intensity={0.25}
                distance={180}
                decay={2}
            />

            {/* Warm ambient streak */}
            <pointLight
                ref={light3Ref}
                color="#8a6a5a"
                intensity={0.2}
                distance={150}
                decay={2}
            />

            {/* Subtle directional fill light */}
            <directionalLight
                position={[50, 100, 50]}
                intensity={0.1}
                color="#ffffff"
            />
        </group>
    );
}
