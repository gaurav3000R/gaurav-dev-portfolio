'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import SpaceScene from './SpaceScene';
import { useMouseInteraction } from '@/lib/hooks/useMouseInteraction';
import { useScrollIntegration } from '@/lib/hooks/useScrollIntegration';

/**
 * SpaceBackground Component
 * 
 * Cinematic 3D space background with:
 * - Deep space gradient (near-black to deep-blue)
 * - Subtle fog for depth falloff
 * - 60 FPS target performance
 */
export default function SpaceBackground() {
    useMouseInteraction();
    useScrollIntegration();

    return (
        <div
            className="fixed inset-0"
            style={{
                zIndex: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(180deg, #020810 0%, #000205 50%, #000000 100%)',
            }}
        >
            <Canvas
                frameloop="always"
                camera={{
                    position: [0, 0, 60],
                    fov: 50,
                    near: 0.1,
                    far: 2000,
                }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }}
            >
                {/* Deep fog for infinite depth feel */}
                <fog attach="fog" args={['#020810', 80, 800]} />

                <Suspense fallback={null}>
                    <SpaceScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
