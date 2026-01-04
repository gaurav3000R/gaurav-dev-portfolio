'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * CosmicDust Component
 * 
 * Sparse dust particles closer to camera for depth perception.
 * Features:
 * - Slow Perlin-like drift
 * - Very low opacity
 * - React to mouse waves
 * - Parallax with scroll
 * 
 * Performance: ~500 particles, optimized rendering
 */
export default function CosmicDust() {
    const dustRef = useRef<THREE.Points>(null);
    const count = 500;

    // Get wave intensity from store
    const waveIntensity = useSpaceStore((state) => state.waveIntensity);
    const mousePosition = useSpaceStore((state) => state.mousePosition);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Generate dust positions and velocities
    const { positions, originalPositions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Distribute in a volume closer to camera
            const x = (Math.random() - 0.5) * 150;
            const y = (Math.random() - 0.5) * 150;
            const z = Math.random() * 80 - 40; // Closer to camera

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            // Random drift velocities
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        return { positions, originalPositions, velocities };
    }, [count]);

    // Animate dust: drift + wave distortion
    useFrame((state) => {
        if (!dustRef.current) return;

        const time = state.clock.getElapsedTime();
        const posArray = dustRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];

            // Perlin-like drift using multiple sine waves
            const driftX = Math.sin(time * 0.1 + i * 0.01) * 2 + velocities[i3] * time;
            const driftY = Math.cos(time * 0.08 + i * 0.015) * 1.5 + velocities[i3 + 1] * time;
            const driftZ = Math.sin(time * 0.05 + i * 0.02) * 1 + velocities[i3 + 2] * time;

            // Wave distortion from mouse
            const distanceToMouse = Math.sqrt(
                Math.pow((x / 50) - mousePosition.x, 2) +
                Math.pow((y / 50) - mousePosition.y, 2)
            );
            const wave = Math.sin(distanceToMouse * 3 - time * 2) * waveIntensity * 8;

            // Scroll parallax
            const scrollOffset = scrollProgress * 10;

            posArray[i3] = x + driftX + wave;
            posArray[i3 + 1] = y + driftY + wave;
            posArray[i3 + 2] = z + driftZ + scrollOffset;

            // Wrap particles that drift too far
            if (posArray[i3] > 100) posArray[i3] = -100;
            if (posArray[i3] < -100) posArray[i3] = 100;
            if (posArray[i3 + 1] > 100) posArray[i3 + 1] = -100;
            if (posArray[i3 + 1] < -100) posArray[i3 + 1] = 100;
        }

        dustRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#6a7a9e"
                size={0.3}
                sizeAttenuation
                transparent
                opacity={0.15}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
