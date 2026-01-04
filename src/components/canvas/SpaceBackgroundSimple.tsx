'use client';

import { Canvas } from '@react-three/fiber';

/**
 * Simple test version to verify Three.js is working
 */
export default function SpaceBackgroundSimple() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas
                camera={{
                    position: [0, 0, 50],
                    fov: 45,
                }}
            >
                {/* Simple test: white ambient light and a red box */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </Canvas>
        </div>
    );
}
