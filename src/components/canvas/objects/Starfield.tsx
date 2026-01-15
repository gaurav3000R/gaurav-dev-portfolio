'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * Create a circular star texture with glow
 */
function createStarTexture(color: string = '#ffffff'): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    // Create radial gradient for soft circular glow
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.15, color);
    gradient.addColorStop(0.3, `${color}cc`);
    gradient.addColorStop(0.5, `${color}66`);
    gradient.addColorStop(0.7, `${color}22`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

/**
 * Space-themed star colors
 * Mix of white, blue-white, orange, and warm tones
 */
const STAR_COLORS = [
    // Cool white/blue stars
    new THREE.Color('#ffffff'),     // Pure white
    new THREE.Color('#f0f8ff'),     // Ice blue
    new THREE.Color('#e6f0ff'),     // Light blue-white
    new THREE.Color('#b8d4ff'),     // Soft blue

    // Warm white/yellow stars
    new THREE.Color('#fff8e8'),     // Warm white
    new THREE.Color('#fffacd'),     // Lemon
    new THREE.Color('#ffefd5'),     // Papaya

    // Orange/red stars (like dying stars)
    new THREE.Color('#ffb366'),     // Light orange
    new THREE.Color('#ff9933'),     // Orange
    new THREE.Color('#ff7744'),     // Red-orange
    new THREE.Color('#ff6b4a'),     // Coral

    // Rare special colors
    new THREE.Color('#ffccff'),     // Pink (rare)
    new THREE.Color('#ccffff'),     // Cyan (rare)
];

/**
 * Starfield - Multi-layer star system with circular stars
 * 
 * Features:
 * - Circular star shapes with soft glow
 * - Random blinking effect
 * - White, orange, and blue color variations
 * - Z-depth variation for parallax
 * - Scroll and mouse parallax
 */
export default function Starfield() {
    return (
        <>
            {/* Bright nearby stars - larger, more visible */}
            <StarLayer count={80} minDepth={30} maxDepth={70} size={1.8} opacity={1.0} blinkSpeed="fast" />

            {/* Medium distance stars */}
            <StarLayer count={180} minDepth={70} maxDepth={140} size={1.2} opacity={0.8} blinkSpeed="medium" />

            {/* Distant stars - smaller, dimmer */}
            <StarLayer count={350} minDepth={140} maxDepth={280} size={0.7} opacity={0.5} blinkSpeed="slow" />

            {/* Very distant faint stars */}
            <StarLayer count={500} minDepth={280} maxDepth={500} size={0.4} opacity={0.25} blinkSpeed="very-slow" />
        </>
    );
}

interface StarLayerProps {
    count: number;
    minDepth: number;
    maxDepth: number;
    size: number;
    opacity: number;
    blinkSpeed: 'fast' | 'medium' | 'slow' | 'very-slow';
}

function StarLayer({ count, minDepth, maxDepth, size, opacity, blinkSpeed }: StarLayerProps) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);
    const scrollProgress = useSpaceStore((state) => state.scrollProgress);
    const mousePosition = useSpaceStore((state) => state.mousePosition);

    // Blink speed multipliers
    const blinkMultiplier = {
        'fast': 1.5,
        'medium': 1.0,
        'slow': 0.6,
        'very-slow': 0.3
    }[blinkSpeed];

    // Create circular texture for stars
    const starTexture = useMemo(() => {
        if (typeof document === 'undefined') return null;
        return createStarTexture('#ffffff');
    }, []);

    // Pre-calculate star data
    const { geometry, originalPositions, phases, blinkPhases, blinkTypes, colorIndices } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const phases = new Float32Array(count);
        const blinkPhases = new Float32Array(count);
        const blinkTypes = new Float32Array(count); // 0 = smooth, 1 = sudden blink
        const colorIndices = new Float32Array(count);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Spherical distribution with depth variation
            const depth = minDepth + Math.random() * (maxDepth - minDepth);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = depth * Math.sin(phi) * Math.cos(theta);
            const y = depth * Math.sin(phi) * Math.sin(theta);
            const z = -depth * Math.cos(phi);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;
            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            // Weighted color selection (more white/blue, less orange/special)
            let colorIdx: number;
            const colorRoll = Math.random();
            if (colorRoll < 0.45) {
                // Cool white/blue (45%)
                colorIdx = Math.floor(Math.random() * 4);
            } else if (colorRoll < 0.75) {
                // Warm white/yellow (30%)
                colorIdx = 4 + Math.floor(Math.random() * 3);
            } else if (colorRoll < 0.95) {
                // Orange/red (20%)
                colorIdx = 7 + Math.floor(Math.random() * 4);
            } else {
                // Rare special colors (5%)
                colorIdx = 11 + Math.floor(Math.random() * 2);
            }

            colorIndices[i] = colorIdx;
            const color = STAR_COLORS[colorIdx];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            phases[i] = Math.random() * Math.PI * 2;
            blinkPhases[i] = Math.random() * Math.PI * 2;

            // 20% of stars do sudden blinks, rest do smooth twinkle
            blinkTypes[i] = Math.random() < 0.2 ? 1 : 0;

            // Random size variation
            sizes[i] = size * (0.6 + Math.random() * 0.6);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        return { geometry, originalPositions, phases, blinkPhases, blinkTypes, colorIndices };
    }, [count, minDepth, maxDepth, size]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const colors = pointsRef.current.geometry.attributes.color.array as Float32Array;
        const depthRange = maxDepth - minDepth;
        const parallaxStrength = depthRange / 300;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = phases[i];
            const blinkPhase = blinkPhases[i];
            const blinkType = blinkTypes[i];

            // Calculate brightness based on blink type
            let brightness: number;

            if (blinkType === 1) {
                // Sudden random blink (quick flash)
                const blinkCycle = (time * blinkMultiplier + blinkPhase) % (Math.PI * 4);
                if (blinkCycle < 0.15) {
                    // Quick flash off
                    brightness = 0.1 + Math.random() * 0.2;
                } else if (blinkCycle < 0.3) {
                    // Quick flash back on
                    brightness = 0.7 + Math.random() * 0.3;
                } else {
                    // Normal with subtle variation
                    brightness = 0.6 + Math.sin(time * 0.5 + phase) * 0.2;
                }
            } else {
                // Smooth twinkle
                const twinkle =
                    Math.sin(time * 0.3 * blinkMultiplier + phase) * 0.25 +
                    Math.sin(time * 0.15 * blinkMultiplier + phase * 1.3) * 0.15 +
                    Math.cos(time * 0.2 * blinkMultiplier + phase * 0.7) * 0.1;
                brightness = 0.5 + twinkle + 0.3;
            }

            // Modulate color brightness
            const colorIdx = colorIndices[i];
            const baseColor = STAR_COLORS[colorIdx];
            colors[i3] = baseColor.r * brightness;
            colors[i3 + 1] = baseColor.g * brightness;
            colors[i3 + 2] = baseColor.b * brightness;

            // Very subtle position shimmer
            const shimmer = (brightness - 0.5) * 0.02;

            // Scroll parallax (distant stars move less)
            const scrollZ = scrollProgress * depthRange * 0.05 * parallaxStrength;

            // Mouse parallax (very subtle)
            const mouseOffsetX = mousePosition.x * parallaxStrength * 0.5;
            const mouseOffsetY = mousePosition.y * parallaxStrength * 0.5;

            positions[i3] = originalPositions[i3] + shimmer + mouseOffsetX;
            positions[i3 + 1] = originalPositions[i3 + 1] + shimmer + mouseOffsetY;
            positions[i3 + 2] = originalPositions[i3 + 2] + scrollZ;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.geometry.attributes.color.needsUpdate = true;
    });

    if (!starTexture) return null;

    return (
        <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
            <pointsMaterial
                ref={materialRef}
                size={size}
                sizeAttenuation
                transparent
                opacity={opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors
                map={starTexture}
                alphaMap={starTexture}
                alphaTest={0.01}
            />
        </points>
    );
}
