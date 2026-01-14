'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * AsteroidField - Sparse asteroid field using 3D models
 * 
 * Features:
 * - Uses actual GLTF models
 * - Slow noise-based drift and rotation
 * - No fast movement, no collisions
 */
export default function AsteroidField() {
    const { scene: asteroidModel } = useGLTF('/3d-modals/asteroid_low_poly/scene.gltf');
    const { scene: spaceRocksModel } = useGLTF('/3d-modals/space_rocks/scene.gltf');

    const configs = useMemo(() => [
        { pos: [-35, 12, -40] as [number, number, number], scale: 1.0, model: 'asteroid' },
        { pos: [40, -18, -55] as [number, number, number], scale: 1.4, model: 'rocks' },
        { pos: [-50, -25, -70] as [number, number, number], scale: 1.8, model: 'asteroid' },
        { pos: [55, 20, -45] as [number, number, number], scale: 1.2, model: 'rocks' },
        { pos: [-20, 30, -80] as [number, number, number], scale: 0.8, model: 'asteroid' },
        { pos: [30, -30, -35] as [number, number, number], scale: 1.1, model: 'rocks' },
    ], []);

    return (
        <group>
            {configs.map((config, i) => (
                <AsteroidInstance
                    key={i}
                    model={config.model === 'asteroid' ? asteroidModel : spaceRocksModel}
                    position={config.pos}
                    scale={config.scale}
                    index={i}
                />
            ))}
        </group>
    );
}

interface AsteroidInstanceProps {
    model: THREE.Object3D;
    position: [number, number, number];
    scale: number;
    index: number;
}

function AsteroidInstance({ model, position, scale, index }: AsteroidInstanceProps) {
    const ref = useRef<THREE.Group>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);
    const clonedModel = useMemo(() => model.clone(), [model]);
    const phase = useMemo(() => index * 1.3, [index]);

    useFrame((state) => {
        if (!ref.current) return;
        const time = state.clock.getElapsedTime();

        // Slow noise-based drift
        const driftX = Math.sin(time * 0.0008 + phase) * 1.5;
        const driftY = Math.cos(time * 0.0006 + phase * 0.7) * 1.0;
        const driftZ = Math.sin(time * 0.0004 + phase * 1.2) * 0.8;

        ref.current.position.x = position[0] + driftX;
        ref.current.position.y = position[1] + driftY;
        ref.current.position.z = position[2] + driftZ + scrollProgress * 10;

        // Very slow tumbling rotation
        ref.current.rotation.x += 0.0002;
        ref.current.rotation.y += 0.0003;
        ref.current.rotation.z += 0.0001;
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            <primitive object={clonedModel} />
        </group>
    );
}