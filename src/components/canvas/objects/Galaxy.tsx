'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Galaxy Component
 * 
 * Distant spiral galaxy with:
 * - Nearly imperceptible rotation
 * - Infinite, distant feel
 * - Spiral arm structure
 * - Low contrast, faded into space
 * - Custom shader for realistic dust/gas appearance
 * - Scroll-based depth adjustment
 */
export default function Galaxy() {
    const galaxyRef = useRef<THREE.Points>(null);
    const particleCount = 10000;

    // Get scroll progress
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);

    // Generate spiral galaxy geometry
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const arms = 3; // Number of spiral arms
    const spread = 0.25; // How spread out the arms are

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Spiral arm calculation
        const radius = Math.random() * 220 + 120;
        const spinAngle = radius * 0.018;
        const branchAngle = ((i % arms) / arms) * Math.PI * 2;

        // Random offset for natural look
        const randomX = (Math.random() - 0.5) * spread * radius * 0.25;
        const randomY = (Math.random() - 0.5) * spread * radius * 0.08;
        const randomZ = (Math.random() - 0.5) * spread * radius * 0.25;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ - 700; // Very far back

        // Color gradient: desaturated blue/purple core to faint orange edges
        const colorMix = radius / 340;
        const coreColor = new THREE.Color('#3a4f7e');
        const edgeColor = new THREE.Color('#6a5f5a');
        const color = coreColor.lerp(edgeColor, colorMix);

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Size variation: smaller at edges, low contrast
        sizes[i] = (1 - colorMix) * 1.8 + 0.4;
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
        
        // Very subtle size pulsing
        float pulse = sin(time * 0.3 + position.x * 0.008) * 0.08 + 1.0;
        gl_PointSize = size * pulse * (350.0 / -mvPosition.z);
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
        alpha = pow(alpha, 2.5); // Softer falloff
        
        // Very low opacity for distant feel
        gl_FragColor = vec4(vColor, alpha * 0.35);
      }
    `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    // Nearly imperceptible rotation + scroll drift
    useFrame((state) => {
        if (galaxyRef.current) {
            const time = state.clock.getElapsedTime();

            // Extremely slow rotation
            galaxyRef.current.rotation.y = time * 0.000015;
            galaxyRef.current.rotation.x = Math.sin(time * 0.000008) * 0.03;

            // Subtle scroll-based depth
            galaxyRef.current.position.z = -700 + scrollProgress * 30;

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
