'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SpaceshipFlyby - Ship flies forward into the background on scroll
 * 
 * Behavior:
 * - NOT visible on hero section
 * - When scrolling to second section, ship appears and flies FORWARD into background
 * - Ship starts close to camera and flies away into the distance
 */
export default function SpaceshipFlyby() {
    const { scene } = useGLTF('/3d-modals/spaceship/scene.gltf');
    const groupRef = useRef<THREE.Group>(null);
    const [flyProgress, setFlyProgress] = useState(0);

    // Clone and prepare the model
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        const objectsToRemove: THREE.Object3D[] = [];

        clone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;

                // Remove background planes
                if (geometry) {
                    const posAttr = geometry.getAttribute('position');
                    if (posAttr && (posAttr.count === 4 || posAttr.count === 6)) {
                        objectsToRemove.push(child);
                        return;
                    }
                }

                const name = child.name.toLowerCase();
                if (name.includes('plane') || name.includes('background') || name.includes('floor')) {
                    objectsToRemove.push(child);
                    return;
                }

                if (material) {
                    const mat = material as THREE.MeshStandardMaterial;
                    mat.side = THREE.FrontSide;
                    mat.transparent = false;
                    mat.depthWrite = true;
                    mat.emissiveIntensity = 0.2;
                }
            }
        });

        objectsToRemove.forEach(obj => obj.parent?.remove(obj));
        return clone;
    }, [scene]);

    // Listen to scroll and trigger when reaching second section
    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('section');
            if (!heroSection) return;

            const heroHeight = heroSection.offsetHeight;
            const scrollY = window.scrollY;

            // Start animation when scrolled past hero section
            // Progress from 0 to 1 as we scroll through the second section
            if (scrollY < heroHeight * 0.8) {
                setFlyProgress(0);
            } else {
                const progressStart = heroHeight * 0.8;
                const progressRange = heroHeight * 1.5; // Animation plays over 1.5x hero height
                const progress = Math.min(1, (scrollY - progressStart) / progressRange);
                setFlyProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        // Hide if no progress
        if (flyProgress <= 0) {
            groupRef.current.visible = false;
            return;
        }

        groupRef.current.visible = true;

        // Eased progress for smooth cinematic feel
        const eased = easeOutCubic(flyProgress);

        // ============================================
        // SHIP FLIES FORWARD INTO THE BACKGROUND
        // ============================================

        // Start position: In front of camera, slightly to the side
        // End position: Far in the background, centered

        const startX = -15;  // Start slightly left
        const endX = 0;      // End at center
        const x = startX + (endX - startX) * eased;

        const startY = -5;   // Start below
        const endY = 10;     // End higher up
        const y = startY + (endY - startY) * eased;

        const startZ = 30;   // Start in FRONT of camera (close)
        const endZ = -300;   // End FAR in the background
        const z = startZ + (endZ - startZ) * eased;

        groupRef.current.position.set(x, y, z);

        // Rotation - ship faces away from camera (flying forward)
        // Slight tilt up as it flies into distance
        const pitch = -0.1 - eased * 0.2; // Nose slightly up
        const yaw = Math.PI; // Facing away from camera
        const roll = Math.sin(eased * Math.PI) * 0.1; // Slight roll

        groupRef.current.rotation.set(pitch, yaw, roll);

        // Scale - starts BIG (close), gets smaller as it flies away
        const startScale = 12;
        const endScale = 3;
        const scale = startScale - (startScale - endScale) * eased;
        groupRef.current.scale.setScalar(scale);

        // Subtle engine vibration
        groupRef.current.position.x += Math.sin(time * 25) * 0.03 * (1 - eased);
        groupRef.current.position.y += Math.cos(time * 20) * 0.02 * (1 - eased);
    });

    return (
        <group ref={groupRef} visible={false}>
            {/* The actual 3D spaceship model */}
            <primitive object={clonedScene} />
        </group>
    );
}

/**
 * Engine Glow - Animated thruster lights facing the camera
 */
function EngineGlow({ progress }: { progress: number }) {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);
    const glowMeshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Intensity increases when ship is visible
        const intensity = progress > 0 ? 1 : 0;

        if (light1Ref.current) {
            light1Ref.current.intensity = (25 + Math.sin(time * 30) * 10 + Math.random() * 4) * intensity;
        }
        if (light2Ref.current) {
            light2Ref.current.intensity = (18 + Math.cos(time * 25) * 6 + Math.random() * 3) * intensity;
        }

        if (glowMeshRef.current) {
            const pulse = 0.8 + Math.sin(time * 12) * 0.3;
            glowMeshRef.current.scale.setScalar(pulse);
        }
    });

    return (
        // Engine is at the BACK of the ship, facing the camera
        <group position={[0, 0, 2.5]}>
            {/* Main engine - bright blue */}
            <pointLight
                ref={light1Ref}
                color="#60a5fa"
                intensity={25}
                distance={80}
                decay={2}
            />
            {/* Secondary glow - cyan */}
            <pointLight
                ref={light2Ref}
                color="#22d3ee"
                intensity={18}
                distance={100}
                decay={2}
                position={[0, 0, 1]}
            />
            {/* Orange heat glow */}
            <pointLight
                color="#f97316"
                intensity={12}
                distance={50}
                decay={2}
                position={[0, 0, 0.5]}
            />

            {/* Engine visual glow - inner core */}
            <mesh ref={glowMeshRef}>
                <sphereGeometry args={[0.6, 16, 16]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.95}
                />
            </mesh>

            {/* Engine visual glow - blue ring */}
            <mesh>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color="#60a5fa"
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Engine visual glow - outer cyan */}
            <mesh>
                <sphereGeometry args={[1.5, 16, 16]} />
                <meshBasicMaterial
                    color="#22d3ee"
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Engine thrust trail - pointing toward camera */}
            <mesh position={[0, 0, 3]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[1, 6, 16]} />
                <meshBasicMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Larger outer trail */}
            <mesh position={[0, 0, 5]} rotation={[-Math.PI / 2, 0, 0]}>
                <coneGeometry args={[1.5, 10, 16]} />
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.2}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

/**
 * Ease out cubic - fast start, slow end
 */
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

// Preload the model
useGLTF.preload('/3d-modals/spaceship/scene.gltf');
