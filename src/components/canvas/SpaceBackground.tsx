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
 * - Galaxy Skybox (GLTF model as background)
 * - All 3D space elements
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
                background: 'transparent',
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
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                }}
            >
                {/* No fog - let the skybox be visible */}

                <Suspense fallback={null}>
                    <SpaceScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
