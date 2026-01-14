'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Starfield - Multi-layer star system
 * 
 * Features:
 * - Noise-based opacity twinkle (not random blinking)
 * - Z-depth variation for parallax
 * - Very slow, imperceptible movement
 * - Scroll and mouse parallax
 */
export default function Starfield() {
    return (
        <>
            <StarLayer count={100} minDepth={40} maxDepth={80} size={1.0} opacity={0.9} />
            <StarLayer count={200} minDepth={80} maxDepth={150} size={0.6} opacity={0.6} />
            <StarLayer count={400} minDepth={150} maxDepth={300} size={0.35} opacity={0.35} />
        </>
    );
}

interface StarLayerProps {
    count: number;
    minDepth: number;
    maxDepth: number;
    size: number;
    opacity: number;
}

function StarLayer({ count, minDepth, maxDepth, size, opacity }: StarLayerProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);
    const mousePosition = useSpaceStore((state) => state.mousePosition);

    // Pre-calculate star data
    const { geometry, originalPositions, phases, baseOpacities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        const baseOpacities = new Float32Array(count);

        const starColors = [
            new THREE.Color('#ffffff'),
            new THREE.Color('#fff8f0'),
            new THREE.Color('#f0f4ff'),
            new THREE.Color('#fffae8'),
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spherical distribution with depth variation
            const depth = minDepth + Math.random() * (maxDepth - minDepth);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = depth * Math.sin(phi) * Math.cos(theta);
            const y = depth * Math.sin(phi) * Math.sin(theta);
            const z = -depth * Math.cos(phi);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            const color = starColors[Math.floor(Math.random() * starColors.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            phases[i] = Math.random() * Math.PI * 2;
            baseOpacities[i] = 0.5 + Math.random() * 0.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        return { geometry, originalPositions, phases, baseOpacities };
    }, [count, minDepth, maxDepth]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const depthRange = maxDepth - minDepth;
        const parallaxStrength = depthRange / 300;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = phases[i];

            // Noise-based twinkle using smooth sine combination
            const twinkle = 
                Math.sin(time * 0.15 + phase) * 0.3 +
                Math.sin(time * 0.08 + phase * 1.3) * 0.2 +
                Math.cos(time * 0.12 + phase * 0.7) * 0.15;

            // Very subtle position shimmer
            const shimmer = twinkle * 0.02;

            // Scroll parallax (distant stars move less)
            const scrollZ = scrollProgress * depthRange * 0.05 * parallaxStrength;

            // Mouse parallax (very subtle)
            const mouseOffsetX = mousePosition.x * parallaxStrength * 0.5;
            const mouseOffsetY = mousePosition.y * parallaxStrength * 0.5;

            positions[i3] = originalPositions[i3] + shimmer + mouseOffsetX;
            positions[i3 + 1] = originalPositions[i3 + 1] + shimmer + mouseOffsetY;
            positions[i3 + 2] = originalPositions[i3 + 2] + scrollZ;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
            <pointsMaterial
                size={size}
                sizeAttenuation
                transparent
                opacity={opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors
            />
        </points>
    );
}
