'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Galaxy - Distant spiral galaxy
 * 
 * Features:
 * - Extremely slow rotation (nearly imperceptible)
 * - Low contrast, faded colors
 * - Feels infinitely distant
 */
export default function Galaxy() {
    const galaxyRef = useRef<THREE.Points>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    const { geometry, material } = useMemo(() => {
        const particleCount = 6000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const arms = 3;
        const coreColor = new THREE.Color('#3a4a6a');
        const edgeColor = new THREE.Color('#4a4045');

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Spiral arm calculation
            const radius = 80 + Math.random() * 180;
            const spinAngle = radius * 0.015;
            const branchAngle = ((i % arms) / arms) * Math.PI * 2;

            // Spread for natural look
            const spread = 0.2;
            const randomX = (Math.random() - 0.5) * spread * radius * 0.2;
            const randomY = (Math.random() - 0.5) * spread * radius * 0.05;
            const randomZ = (Math.random() - 0.5) * spread * radius * 0.2;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 500;

            // Desaturated color gradient
            const colorMix = radius / 260;
            const color = coreColor.clone().lerp(edgeColor, colorMix);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = (1 - colorMix) * 1.2 + 0.3;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0 } },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (200.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    float alpha = 1.0 - (dist * 2.0);
                    alpha = pow(alpha, 3.0);
                    gl_FragColor = vec4(vColor, alpha * 0.2);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        });

        return { geometry, material };
    }, []);

    useFrame((state) => {
        if (!galaxyRef.current) return;

        const time = state.clock.getElapsedTime();

        // Extremely slow rotation - nearly imperceptible
        galaxyRef.current.rotation.y = time * 0.00002;
        galaxyRef.current.rotation.x = Math.sin(time * 0.00001) * 0.02;

        // Subtle scroll depth
        galaxyRef.current.position.z = -500 + scrollProgress * 15;

        (galaxyRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
    });

    return (
        <points
            ref={galaxyRef}
            geometry={geometry}
            material={material}
            frustumCulled={false}
        />
    );
}
