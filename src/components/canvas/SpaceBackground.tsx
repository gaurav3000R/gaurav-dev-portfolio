'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import SpaceScene from './SpaceScene';
import { useMouseInteraction } from '@/lib/hooks/useMouseInteraction';
import { useScrollIntegration } from '@/lib/hooks/useScrollIntegration';

/**
 * SpaceBackground Component
 * 
 * Professional cinematic 3D space background system.
 * 
 * Features:
 * - Deep space gradient base layer
 * - Multi-layer starfield with parallax
 * - Cosmic dust particles
 * - Nebula ambient lighting
 * - Distant spiral galaxy
 * - 1-3 planets with slow drift
 * - Sparse asteroid field
 * - Mouse interaction (parallax + wave)
 * - Scroll integration
 * - Audio hooks (no autoplay)
 * 
 * Performance:
 * - 60 FPS target
 * - Adaptive DPR
 * - Instanced rendering
 * - Optimized shaders
 */
export default function SpaceBackground() {
    // Initialize interaction hooks at component level
    // This ensures they start immediately, not just on hover
    useMouseInteraction();
    useScrollIntegration();

    return (
        <div
            className="fixed inset-0 bg-gradient-to-b from-[#000510] to-[#000000]"
            style={{
                zIndex: 0,
                pointerEvents: 'none' // Allow mouse events to pass through to content
            }}
        >
            <Canvas
                frameloop="always" // Ensure continuous rendering, not demand-based
                camera={{
                    position: [0, 0, 50],
                    fov: 45,
                    near: 0.1,
                    far: 2000,
                }}
                dpr={[1, 2]}
                performance={{ min: 0.5 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none' // Canvas doesn't block mouse events
                }}
            >
                {/* Subtle fog for depth */}
                <fog attach="fog" args={['#000510', 100, 1500]} />

                <Suspense fallback={null}>
                    <SpaceScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
