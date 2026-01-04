'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import SpaceScene from './SpaceScene';

/**
 * SpaceBackground Component
 * 
 * High-performance cinematic 3D space background for portfolio.
 * Designed for emotion, not spectacle - think film VFX, not games.
 * 
 * Features:
 * - Multi-layer starfield with parallax depth
 * - Slow-moving planets with orbital mechanics
 * - Sparse asteroid field with natural drift
 * - Distant rotating galaxy
 * - Subtle mouse interaction (parallax + wave distortion)
 * - Volumetric ambient lighting
 * - 60 FPS target on mid-range devices
 */
export default function SpaceBackground() {
    return (
        <div className="fixed inset-0 bg-black" style={{ zIndex: 0 }}>
            <Canvas
                camera={{
                    position: [0, 0, 50],
                    fov: 45,
                    near: 0.1,
                    far: 2000,
                }}
                dpr={[1, 2]} // Adaptive pixel ratio for performance
                performance={{ min: 0.5 }} // Throttle if FPS drops
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <Suspense fallback={null}>
                    <SpaceScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
