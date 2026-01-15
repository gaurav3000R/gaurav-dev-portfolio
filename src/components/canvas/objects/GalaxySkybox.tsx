'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * GalaxySkybox - Realistic Galaxy HDRI Panorama Background
 * 
 * Uses the galaxy texture directly on a large inverted sphere
 * for guaranteed visibility as a skybox background
 */
export default function GalaxySkybox() {
    const skyboxRef = useRef<THREE.Mesh>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Load the galaxy texture directly
    const texture = useLoader(
        THREE.TextureLoader,
        '/3d-modals/realistic_galaxy_skybox_hdri_panorama/textures/material_emissive.png'
    );

    useFrame((state) => {
        if (!skyboxRef.current) return;

        const time = state.clock.getElapsedTime();

        // Very slow rotation for immersive feel
        skyboxRef.current.rotation.y = time * 0.003;

        // Subtle scroll effect
        skyboxRef.current.rotation.x = scrollProgress * 0.03;
    });

    return (
        <mesh ref={skyboxRef} renderOrder={-1000}>
            {/* Large sphere that surrounds the entire scene */}
            <sphereGeometry args={[900, 64, 64]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
}
