'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Planets Component
 * 
 * 1-3 distant planets with:
 * - Extremely slow orbital movement (space-scale realism)
 * - Gentle Z-depth drift with scroll
 * - Physically based materials with soft rim lighting
 * - Subtle atmospheric glow
 * - No cartoon colors or sharp textures
 */
export default function Planets() {
    return (
        <group>
            {/* Planet 1: Large gas giant in distance */}
            <Planet
                position={[-140, 50, -450]}
                radius={28}
                color="#4a5f7a"
                emissive="#1a2332"
                orbitSpeed={0.00004}
                orbitRadius={35}
                rotationSpeed={0.00008}
                driftSpeed={0.3}
            />

            {/* Planet 2: Rocky planet, closer */}
            <Planet
                position={[160, -70, -320]}
                radius={18}
                color="#6b5d5a"
                emissive="#2a1f1d"
                orbitSpeed={0.00006}
                orbitRadius={25}
                rotationSpeed={0.00012}
                driftSpeed={0.5}
            />

            {/* Planet 3: Ice planet, far distance */}
            <Planet
                position={[90, 90, -550]}
                radius={20}
                color="#7a8b9e"
                emissive="#1f2a35"
                orbitSpeed={0.000025}
                orbitRadius={18}
                rotationSpeed={0.00006}
                driftSpeed={0.2}
            />
        </group>
    );
}

/**
 * Planet - Individual planet with orbital mechanics and scroll drift
 */
interface PlanetProps {
    position: [number, number, number];
    radius: number;
    color: string;
    emissive: string;
    orbitSpeed: number;
    orbitRadius: number;
    rotationSpeed: number;
    driftSpeed: number;
}

function Planet({
    position,
    radius,
    color,
    emissive,
    orbitSpeed,
    orbitRadius,
    rotationSpeed,
    driftSpeed,
}: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    // Get scroll progress for depth drift
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Animate orbital movement, rotation, and scroll drift
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (orbitRef.current) {
            // Extremely slow orbital movement
            orbitRef.current.position.x = position[0] + Math.cos(time * orbitSpeed) * orbitRadius;
            orbitRef.current.position.y = position[1] + Math.sin(time * orbitSpeed * 0.7) * orbitRadius * 0.5;

            // Gentle Z-depth drift with scroll
            const scrollDrift = scrollProgress * driftSpeed * 50;
            orbitRef.current.position.z = position[2] + scrollDrift;
        }

        if (planetRef.current) {
            // Slow rotation on own axis
            planetRef.current.rotation.y += rotationSpeed;

            // Very subtle wobble
            planetRef.current.rotation.x = Math.sin(time * 0.0001) * 0.02;
        }
    });

    return (
        <group ref={orbitRef} position={position}>
            <Sphere ref={planetRef} args={[radius, 64, 64]}>
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.18}
                    roughness={0.85}
                    metalness={0.15}
                />
            </Sphere>

            {/* Soft rim light for atmospheric effect */}
            <pointLight
                position={[radius * 1.6, 0, radius * 1.2]}
                intensity={0.25}
                distance={radius * 5}
                color={emissive}
                decay={2}
            />

            {/* Subtle atmospheric glow */}
            <Sphere args={[radius * 1.08, 32, 32]}>
                <meshBasicMaterial
                    color={emissive}
                    transparent
                    opacity={0.04}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
}
