'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Starfield Component
 * 
 * Multi-layer starfield with:
 * - Parallax depth via Z-position variation
 * - Subtle twinkling using Perlin-like noise (not random)
 * - Wave distortion from mouse interaction
 * - Performance-optimized with BufferGeometry
 * 
 * @param waveIntensity - Current wave effect strength from mouse movement
 */
interface StarfieldProps {
    waveIntensity: number;
}

export default function Starfield({ waveIntensity }: StarfieldProps) {
    return (
        <>
            {/* Near layer - larger, brighter stars */}
            <StarLayer
                count={800}
                depth={100}
                size={0.8}
                brightness={1.0}
                speed={0.05}
                waveIntensity={waveIntensity}
            />

            {/* Mid layer - medium stars */}
            <StarLayer
                count={1500}
                depth={200}
                size={0.5}
                brightness={0.7}
                speed={0.03}
                waveIntensity={waveIntensity * 0.7}
            />

            {/* Far layer - distant, subtle stars */}
            <StarLayer
                count={2000}
                depth={300}
                size={0.3}
                brightness={0.4}
                speed={0.01}
                waveIntensity={waveIntensity * 0.4}
            />
        </>
    );
}

/**
 * StarLayer - Individual star layer with depth
 */
interface StarLayerProps {
    count: number;
    depth: number;
    size: number;
    brightness: number;
    speed: number;
    waveIntensity: number;
}

function StarLayer({ count, depth, size, brightness, speed, waveIntensity }: StarLayerProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate star positions with depth variation
    const { positions, originalPositions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Distribute stars in a sphere
            const radius = Math.random() * depth + 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = -radius * Math.cos(phi) - 100; // Push back in Z

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;
        }

        return { positions, originalPositions };
    }, [count, depth]);

    // Animate stars: subtle twinkle + wave distortion
    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];

            // Perlin-like noise for smooth twinkling
            // Using multiple sine waves at different frequencies
            const twinkle =
                Math.sin(time * 0.5 + i * 0.1) * 0.3 +
                Math.sin(time * 0.3 + i * 0.05) * 0.2;

            // Wave distortion from mouse movement
            const distance = Math.sqrt(x * x + y * y);
            const wave = Math.sin(distance * 0.02 - time * 2) * waveIntensity * 5;

            // Apply subtle movement
            posArray[i3] = x + twinkle * 0.1 + wave;
            posArray[i3 + 1] = y + twinkle * 0.1 + wave;
            posArray[i3 + 2] = z + twinkle * 0.05;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slow rotation for depth perception
        pointsRef.current.rotation.y += speed * 0.0001;
    });

    return (
        <Points
            ref={pointsRef}
            positions={positions}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                color="#ffffff"
                size={size}
                sizeAttenuation
                opacity={brightness}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}
