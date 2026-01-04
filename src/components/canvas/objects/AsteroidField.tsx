'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * AsteroidField Component
 * 
 * Sparse asteroid field with:
 * - Noise-based drift and rotation
 * - Irregular shapes for realism
 * - Scroll-based parallax
 * - Limited count for performance (35 asteroids)
 * - No fast movement, no collisions
 * - Instanced rendering
 */
export default function AsteroidField() {
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
    const count = 35;

    // Get scroll progress
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Generate asteroid data
    const asteroidData = useMemo(() => {
        const data = [];

        for (let i = 0; i < count; i++) {
            // Distribute in a loose, sparse field
            const angle = Math.random() * Math.PI * 2;
            const distance = 120 + Math.random() * 180;
            const height = (Math.random() - 0.5) * 100;

            data.push({
                position: new THREE.Vector3(
                    Math.cos(angle) * distance,
                    height,
                    Math.sin(angle) * distance - 250
                ),
                rotation: new THREE.Euler(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ),
                rotationSpeed: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.00015,
                    (Math.random() - 0.5) * 0.00015,
                    (Math.random() - 0.5) * 0.00015
                ),
                scale: 0.6 + Math.random() * 2.2,
                driftPhase: Math.random() * Math.PI * 2,
                driftSpeed: 0.00004 + Math.random() * 0.00004,
            });
        }

        return data;
    }, [count]);

    // Create irregular asteroid geometry
    const asteroidGeometry = useMemo(() => {
        const geo = new THREE.IcosahedronGeometry(1, 0);
        const positions = geo.attributes.position;

        // Randomize vertices for irregular shape
        for (let i = 0; i < positions.count; i++) {
            const vertex = new THREE.Vector3(
                positions.getX(i),
                positions.getY(i),
                positions.getZ(i)
            );

            vertex.multiplyScalar(0.75 + Math.random() * 0.5);
            positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }

        geo.computeVertexNormals();
        return geo;
    }, []);

    // Animate asteroids: noise-based drift, rotation, and scroll parallax
    useFrame((state) => {
        if (!instancedMeshRef.current) return;

        const time = state.clock.getElapsedTime();
        const matrix = new THREE.Matrix4();
        const rotation = new THREE.Euler();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();

        asteroidData.forEach((asteroid, i) => {
            // Noise-based drift using sine waves (Perlin-like)
            const driftX = Math.sin(time * asteroid.driftSpeed + asteroid.driftPhase) * 2.5;
            const driftY = Math.cos(time * asteroid.driftSpeed * 0.7 + asteroid.driftPhase) * 2;
            const driftZ = Math.sin(time * asteroid.driftSpeed * 0.5 + asteroid.driftPhase) * 1.5;

            // Scroll parallax
            const scrollOffset = scrollProgress * 40;

            position.copy(asteroid.position);
            position.x += driftX;
            position.y += driftY;
            position.z += driftZ + scrollOffset;

            // Continuous slow rotation
            rotation.set(
                asteroid.rotation.x + time * asteroid.rotationSpeed.x,
                asteroid.rotation.y + time * asteroid.rotationSpeed.y,
                asteroid.rotation.z + time * asteroid.rotationSpeed.z
            );

            scale.setScalar(asteroid.scale);

            matrix.compose(position, new THREE.Quaternion().setFromEuler(rotation), scale);
            instancedMeshRef.current!.setMatrixAt(i, matrix);
        });

        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={instancedMeshRef}
            args={[asteroidGeometry, undefined, count]}
            frustumCulled={false}
        >
            <meshStandardMaterial
                color="#3a3a3a"
                roughness={0.92}
                metalness={0.08}
                emissive="#0a0a0a"
                emissiveIntensity={0.08}
            />
        </instancedMesh>
    );
}
