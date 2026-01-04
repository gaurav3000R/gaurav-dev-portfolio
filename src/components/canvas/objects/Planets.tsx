'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Planets Component
 * 
 * 2-3 distant planets with:
 * - Extremely slow orbital movement (space-scale realism)
 * - Physically based materials with soft rim lighting
 * - Subtle atmospheric glow
 * - No cartoon colors or sharp textures
 */
export default function Planets() {
    return (
        <group>
            {/* Planet 1: Large gas giant in distance */}
            <Planet
                position={[-120, 40, -400]}
                radius={25}
                color="#4a5f7a"
                emissive="#1a2332"
                orbitSpeed={0.00005}
                orbitRadius={30}
                rotationSpeed={0.0001}
            />

            {/* Planet 2: Rocky planet, closer */}
            <Planet
                position={[150, -60, -300]}
                radius={15}
                color="#6b5d5a"
                emissive="#2a1f1d"
                orbitSpeed={0.00008}
                orbitRadius={20}
                rotationSpeed={0.00015}
            />

            {/* Planet 3: Ice planet, far distance */}
            <Planet
                position={[80, 80, -500]}
                radius={18}
                color="#7a8b9e"
                emissive="#1f2a35"
                orbitSpeed={0.00003}
                orbitRadius={15}
                rotationSpeed={0.00008}
            />
        </group>
    );
}

/**
 * Planet - Individual planet with orbital mechanics
 */
interface PlanetProps {
    position: [number, number, number];
    radius: number;
    color: string;
    emissive: string;
    orbitSpeed: number;
    orbitRadius: number;
    rotationSpeed: number;
}

function Planet({
    position,
    radius,
    color,
    emissive,
    orbitSpeed,
    orbitRadius,
    rotationSpeed,
}: PlanetProps) {
    const planetRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);

    // Animate orbital movement and rotation
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (orbitRef.current) {
            // Extremely slow orbital movement
            orbitRef.current.position.x = position[0] + Math.cos(time * orbitSpeed) * orbitRadius;
            orbitRef.current.position.y = position[1] + Math.sin(time * orbitSpeed * 0.7) * orbitRadius * 0.5;
        }

        if (planetRef.current) {
            // Slow rotation on own axis
            planetRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <group ref={orbitRef} position={position}>
            <Sphere ref={planetRef} args={[radius, 64, 64]}>
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={0.2}
                    roughness={0.8}
                    metalness={0.2}
                />
            </Sphere>

            {/* Soft rim light for atmospheric effect */}
            <pointLight
                position={[radius * 1.5, 0, radius]}
                intensity={0.3}
                distance={radius * 4}
                color={emissive}
                decay={2}
            />

            {/* Subtle atmospheric glow */}
            <Sphere args={[radius * 1.1, 32, 32]}>
                <meshBasicMaterial
                    color={emissive}
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
}
