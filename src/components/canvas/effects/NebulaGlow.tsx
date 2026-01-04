'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NebulaGlow Component
 * 
 * Soft, distant nebula-like ambient lighting.
 * Features:
 * - Desaturated purple, blue, teal colors
 * - Slow sinusoidal breathing
 * - No sharp edges
 * - Volumetric feel
 * 
 * Creates atmospheric depth without competing with foreground.
 */
export default function NebulaGlow() {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);
    const light3Ref = useRef<THREE.PointLight>(null);
    const light4Ref = useRef<THREE.PointLight>(null);

    // Animate lights: slow movement and breathing intensity
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Light 1: Blue nebula - slow circular drift
        if (light1Ref.current) {
            light1Ref.current.position.x = Math.cos(time * 0.03) * 100;
            light1Ref.current.position.y = Math.sin(time * 0.025) * 70;
            light1Ref.current.position.z = -150 + Math.sin(time * 0.02) * 40;

            // Breathing intensity
            light1Ref.current.intensity = 0.25 + Math.sin(time * 0.15) * 0.12;
        }

        // Light 2: Purple nebula - figure-8 pattern
        if (light2Ref.current) {
            light2Ref.current.position.x = Math.sin(time * 0.025) * 120;
            light2Ref.current.position.y = Math.sin(time * 0.05) * 50;
            light2Ref.current.position.z = -180 + Math.cos(time * 0.018) * 50;

            light2Ref.current.intensity = 0.2 + Math.cos(time * 0.12) * 0.1;
        }

        // Light 3: Teal nebula - slow vertical drift
        if (light3Ref.current) {
            light3Ref.current.position.x = Math.cos(time * 0.035) * 80;
            light3Ref.current.position.y = Math.cos(time * 0.03) * 60;
            light3Ref.current.position.z = -120 + Math.sin(time * 0.015) * 30;

            light3Ref.current.intensity = 0.18 + Math.sin(time * 0.14) * 0.09;
        }

        // Light 4: Distant blue glow - very slow
        if (light4Ref.current) {
            light4Ref.current.position.x = Math.sin(time * 0.02) * 90;
            light4Ref.current.position.y = Math.cos(time * 0.022) * 80;
            light4Ref.current.position.z = -200 + Math.cos(time * 0.012) * 35;

            light4Ref.current.intensity = 0.15 + Math.cos(time * 0.1) * 0.08;
        }
    });

    return (
        <group>
            {/* Blue nebula glow */}
            <pointLight
                ref={light1Ref}
                color="#4a6fa5"
                intensity={0.25}
                distance={250}
                decay={2}
            />

            {/* Purple nebula glow */}
            <pointLight
                ref={light2Ref}
                color="#6a5a8e"
                intensity={0.2}
                distance={220}
                decay={2}
            />

            {/* Teal nebula glow */}
            <pointLight
                ref={light3Ref}
                color="#5a7a8e"
                intensity={0.18}
                distance={200}
                decay={2}
            />

            {/* Distant blue ambient */}
            <pointLight
                ref={light4Ref}
                color="#4a5f7a"
                intensity={0.15}
                distance={180}
                decay={2}
            />

            {/* Subtle directional fill light */}
            <directionalLight
                position={[80, 120, 80]}
                intensity={0.08}
                color="#ffffff"
            />
        </group>
    );
}
