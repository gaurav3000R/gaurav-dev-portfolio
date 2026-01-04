'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Starfield Component
 * 
 * Multi-layer starfield with:
 * - Parallax depth via Z-position variation
 * - Noise-based twinkling (not random blinking)
 * - Wave distortion from mouse interaction
 * - Scroll-based parallax
 * - Performance-optimized with BufferGeometry
 */
export default function Starfield() {
    return (
        <>
            {/* Near layer - larger, brighter stars */}
            <StarLayer
                count={600}
                depth={80}
                size={1.0}
                brightness={1.0}
                speed={0.04}
                parallaxFactor={1.0}
            />

            {/* Mid layer - medium stars */}
            <StarLayer
                count={1200}
                depth={150}
                size={0.6}
                brightness={0.75}
                speed={0.025}
                parallaxFactor={0.6}
            />

            {/* Far layer - distant, subtle stars */}
            <StarLayer
                count={1800}
                depth={250}
                size={0.4}
                brightness={0.5}
                speed={0.01}
                parallaxFactor={0.3}
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
    parallaxFactor: number;
}

function StarLayer({
    count,
    depth,
    size,
    brightness,
    speed,
    parallaxFactor
}: StarLayerProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Get interaction state
    const waveIntensity = useSpaceStore((state) => state.waveIntensity);
    const mousePosition = useSpaceStore((state) => state.mousePosition);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

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
            const z = -radius * Math.cos(phi) - 100;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;
        }

        return { positions, originalPositions };
    }, [count, depth]);

    // Animate stars: noise-based twinkle + wave distortion + scroll parallax
    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];

            // Noise-based twinkling using multiple sine waves
            const twinkle =
                Math.sin(time * 0.4 + i * 0.1) * 0.25 +
                Math.sin(time * 0.25 + i * 0.05) * 0.15 +
                Math.cos(time * 0.3 + i * 0.08) * 0.1;

            // Wave distortion from mouse movement
            const distanceToMouse = Math.sqrt(
                Math.pow((x / 100) - mousePosition.x, 2) +
                Math.pow((y / 100) - mousePosition.y, 2)
            );
            const wave = Math.sin(distanceToMouse * 2.5 - time * 2.5) * waveIntensity * 4;

            // Scroll parallax
            const scrollOffset = scrollProgress * depth * parallaxFactor * 0.1;

            // Apply all effects
            posArray[i3] = x + twinkle * 0.08 + wave;
            posArray[i3 + 1] = y + twinkle * 0.08 + wave;
            posArray[i3 + 2] = z + twinkle * 0.04 + scrollOffset;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slow rotation for depth perception
        pointsRef.current.rotation.y += speed * 0.0001;
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={size}
                sizeAttenuation
                transparent
                opacity={brightness}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
