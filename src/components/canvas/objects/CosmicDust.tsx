'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * CosmicDust - Sparse particles for depth and mouse interaction
 * 
 * Features:
 * - Very low opacity
 * - Slow noise-based drift
 * - Responds to mouse wave effect
 */
export default function CosmicDust() {
    const dustRef = useRef<THREE.Points>(null);
    const count = 120;

    const scrollProgress = useSpaceStore((state) => state.scrollProgress);
    const waveIntensity = useSpaceStore((state) => state.waveIntensity);
    const mousePosition = useSpaceStore((state) => state.mousePosition);

    const { geometry, originalPositions, phases } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const phases = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * 120;
            const y = (Math.random() - 0.5) * 80;
            const z = (Math.random() - 0.5) * 60;

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;
            phases[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        return { geometry, originalPositions, phases };
    }, [count]);

    useFrame((state) => {
        if (!dustRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = dustRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = phases[i];
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];

            // Slow noise-based drift (Perlin-like)
            const driftX = Math.sin(time * 0.02 + phase) * 0.8;
            const driftY = Math.cos(time * 0.015 + phase * 1.3) * 0.6;
            const driftZ = Math.sin(time * 0.01 + phase * 0.7) * 0.4;

            // Mouse wave effect - gentle ripple
            const distToMouse = Math.sqrt(
                Math.pow((x / 60) - mousePosition.x, 2) +
                Math.pow((y / 40) - mousePosition.y, 2)
            );
            const wave = Math.sin(distToMouse * 3 - time * 1.5) * waveIntensity * 2;
            const waveX = wave * (mousePosition.x - x / 60) * 0.1;
            const waveY = wave * (mousePosition.y - y / 40) * 0.1;

            // Scroll parallax
            const scrollZ = scrollProgress * 8;

            positions[i3] = x + driftX + waveX;
            positions[i3 + 1] = y + driftY + waveY;
            positions[i3 + 2] = z + driftZ + scrollZ;
        }

        dustRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={dustRef} geometry={geometry} frustumCulled={false}>
            <pointsMaterial
                color="#7888aa"
                size={0.2}
                sizeAttenuation
                transparent
                opacity={0.08}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
