'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NebulaGlow - Soft ambient nebula lighting
 * 
 * Features:
 * - Desaturated colors (purple, blue, teal)
 * - Slow sinusoidal breathing
 * - No sharp edges
 */
export default function NebulaGlow() {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);
    const light3Ref = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Blue nebula - very slow breathing
        if (light1Ref.current) {
            light1Ref.current.intensity = 0.1 + Math.sin(time * 0.03) * 0.03;
            light1Ref.current.position.x = Math.cos(time * 0.005) * 40;
            light1Ref.current.position.y = Math.sin(time * 0.004) * 30;
        }

        // Purple nebula
        if (light2Ref.current) {
            light2Ref.current.intensity = 0.08 + Math.cos(time * 0.025) * 0.025;
            light2Ref.current.position.x = Math.sin(time * 0.004) * 50;
        }

        // Teal nebula
        if (light3Ref.current) {
            light3Ref.current.intensity = 0.06 + Math.sin(time * 0.035) * 0.02;
        }
    });

    return (
        <group>
            <pointLight
                ref={light1Ref}
                color="#4a6080"
                intensity={0.1}
                distance={180}
                decay={2}
                position={[0, 25, -80]}
            />
            <pointLight
                ref={light2Ref}
                color="#5a4a70"
                intensity={0.08}
                distance={160}
                decay={2}
                position={[-40, -15, -100]}
            />
            <pointLight
                ref={light3Ref}
                color="#4a6068"
                intensity={0.06}
                distance={140}
                decay={2}
                position={[50, 10, -120]}
            />
            <directionalLight position={[40, 60, 40]} intensity={0.04} color="#ffffff" />
        </group>
    );
}
