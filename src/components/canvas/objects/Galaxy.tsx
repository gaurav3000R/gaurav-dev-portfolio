'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Galaxy Component
 * 
 * Distant rotating galaxy/dust spiral with:
 * - Nearly imperceptible rotation
 * - Infinite, distant feel
 * - Spiral arm structure
 * - Additive blending for ethereal look
 * - Custom shader for realistic dust/gas appearance
 */
export default function Galaxy() {
    const galaxyRef = useRef<THREE.Points>(null);
    const particleCount = 8000;

    // Generate spiral galaxy geometry
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const arms = 3; // Number of spiral arms
    const spread = 0.3; // How spread out the arms are

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Spiral arm calculation
        const radius = Math.random() * 200 + 100;
        const spinAngle = radius * 0.02;
        const branchAngle = ((i % arms) / arms) * Math.PI * 2;

        // Random offset for natural look
        const randomX = (Math.random() - 0.5) * spread * radius * 0.3;
        const randomY = (Math.random() - 0.5) * spread * radius * 0.1;
        const randomZ = (Math.random() - 0.5) * spread * radius * 0.3;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 600; // Far back

        // Color gradient: blue/purple core to orange/red edges
        const colorMix = radius / 300;
        const coreColor = new THREE.Color('#4a5f9e');
        const edgeColor = new THREE.Color('#8a6f5f');
        const color = coreColor.lerp(edgeColor, colorMix);

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Size variation: smaller at edges
        sizes[i] = (1 - colorMix) * 2 + 0.5;
    }

    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for realistic galaxy dust
    const galaxyMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
        },
        vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float time;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Subtle size pulsing
        float pulse = sin(time * 0.5 + position.x * 0.01) * 0.1 + 1.0;
        gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
        fragmentShader: `
      varying vec3 vColor;

      void main() {
        // Soft circular particle
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = 1.0 - (dist * 2.0);
        alpha = pow(alpha, 2.0); // Softer falloff
        
        gl_FragColor = vec4(vColor, alpha * 0.6);
      }
    `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    // Nearly imperceptible rotation
    useFrame((state) => {
        if (galaxyRef.current) {
            const time = state.clock.getElapsedTime();

            // Extremely slow rotation
            galaxyRef.current.rotation.y = time * 0.00002;
            galaxyRef.current.rotation.x = Math.sin(time * 0.00001) * 0.05;

            // Update shader time for pulsing
            (galaxyRef.current.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
    });

    return (
        <points
            ref={galaxyRef}
            geometry={galaxyGeometry}
            material={galaxyMaterial}
            frustumCulled={false}
        />
    );
}
