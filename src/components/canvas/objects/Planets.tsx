'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Planets - 2-3 distant planets
 * 
 * Features:
 * - Extremely slow orbital movement
 * - PBR materials with rim lighting
 * - Soft atmospheric glow
 * - No fast orbits, no exaggerated scale
 */
export default function Planets() {
    return (
        <group>
            <Planet
                position={[-100, 35, -350]}
                radius={22}
                color="#4a5a70"
                emissive="#1a2028"
                orbitSpeed={0.000008}
                orbitRadius={20}
            />
            <Planet
                position={[120, -50, -280]}
                radius={15}
                color="#5a4a48"
                emissive="#201818"
                orbitSpeed={0.000012}
                orbitRadius={15}
            />
            <Planet
                position={[60, 70, -420]}
                radius={18}
                color="#5a6878"
                emissive="#181f28"
                orbitSpeed={0.000005}
                orbitRadius={12}
            />
        </group>
    );
}

interface PlanetProps {
    position: [number, number, number];
    radius: number;
    color: string;
    emissive: string;
    orbitSpeed: number;
    orbitRadius: number;
}

function Planet({ position, radius, color, emissive, orbitSpeed, orbitRadius }: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (groupRef.current) {
            // Extremely slow orbital drift
            groupRef.current.position.x = position[0] + Math.cos(time * orbitSpeed) * orbitRadius;
            groupRef.current.position.y = position[1] + Math.sin(time * orbitSpeed * 0.7) * orbitRadius * 0.4;
            
            // Gentle Z-depth with scroll
            groupRef.current.position.z = position[2] + scrollProgress * 25;
        }

        if (planetRef.current) {
            // Very slow self-rotation
            planetRef.current.rotation.y += 0.00005;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Sphere ref={planetRef} args={[radius, 48, 48]}>
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.12}
                    roughness={0.88}
                    metalness={0.12}
                />
            </Sphere>

            {/* Soft rim light */}
            <pointLight
                position={[radius * 1.5, 0, radius]}
                intensity={0.15}
                distance={radius * 4}
                color={emissive}
                decay={2}
            />

            {/* Atmospheric glow */}
            <Sphere args={[radius * 1.06, 32, 32]}>
                <meshBasicMaterial
                    color={emissive}
                    transparent
                    opacity={0.025}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
}
