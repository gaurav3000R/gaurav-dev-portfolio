'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * SpaceshipFlyby - Starts BEHIND camera (not visible), comes into view, then flies deep
 * 
 * Behavior:
 * - At start: Ship is BEHIND the camera (not visible, too far forward)
 * - As scroll: Ship comes INTO view from behind, passes by, then flies into background
 * - Ends very deep in background (large Z depth)
 */
export default function SpaceshipFlyby() {
    const { scene } = useGLTF('/3d-modals/spaceship/scene.gltf');
    const groupRef = useRef<THREE.Group>(null);

    // Use refs for smooth interpolation
    const targetProgress = useRef(0);
    const currentProgress = useRef(0);
    const currentPosition = useRef(new THREE.Vector3(-20, -5, 80));
    const currentRotation = useRef(new THREE.Euler(0.1, Math.PI * 0.6, 0));
    const currentScale = useRef(15);

    // Clone and prepare the model
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        const objectsToRemove: THREE.Object3D[] = [];

        clone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;

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

    // Listen to scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
            targetProgress.current = progress;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useFrame(() => {
        if (!groupRef.current) return;

        // Smooth interpolation
        const lerpFactor = 0.012;
        currentProgress.current += (targetProgress.current - currentProgress.current) * lerpFactor;

        const t = currentProgress.current;

        // ============================================
        // PHASE-BASED CINEMATIC ANIMATION
        // Phase 1 (0-0.25): Come from behind camera into view (BIG and CLOSE)
        // Phase 2 (0.25-0.45): Pass by camera, start turning
        // Phase 3 (0.45-0.6): DRAMATIC TURN
        // Phase 4 (0.6-1.0): Fly DEEP into background
        // ============================================

        let targetX: number, targetY: number, targetZ: number;
        let targetYaw: number, targetPitch: number, targetRoll: number;
        let targetScale: number;

        if (t < 0.25) {
            // Phase 1: Coming from BEHIND camera into view
            const phase = t / 0.25;
            const phaseEase = easeOutQuad(phase);

            targetX = -20 + 25 * phaseEase; // -20 -> 5
            targetY = -5 + 10 * phaseEase; // -5 -> 5
            targetZ = 80 - 70 * phaseEase; // 80 -> 10 (from behind to in front)

            targetYaw = Math.PI * 0.6; // Facing diagonally
            targetPitch = 0.1 - 0.1 * phaseEase;
            targetRoll = 0;

            targetScale = 15; // VERY BIG when close

        } else if (t < 0.45) {
            // Phase 2: Passing by camera, very close and big
            const phase = (t - 0.25) / 0.2;

            targetX = 5 + 20 * phase; // 5 -> 25 (continue right)
            targetY = 5 + 5 * phase; // 5 -> 10
            targetZ = 10 - 60 * phase; // 10 -> -50

            targetYaw = Math.PI * 0.6 + Math.PI * 0.15 * phase;
            targetPitch = 0;
            targetRoll = 0.05 * phase;

            targetScale = 15 - 3 * phase; // 15 -> 12 (still big)

        } else if (t < 0.6) {
            // Phase 3: DRAMATIC TURN
            const phase = (t - 0.45) / 0.15;
            const turnEase = easeInOutQuad(phase);

            targetX = 25 - 5 * phase; // 25 -> 20
            targetY = 10 + 8 * turnEase; // 10 -> 18
            targetZ = -50 - 80 * phase; // -50 -> -130

            // THE DRAMATIC BANK!
            targetYaw = Math.PI * 0.75 + Math.PI * 0.25 * turnEase;
            targetPitch = -0.15 * turnEase;
            targetRoll = 0.05 + 0.45 * Math.sin(phase * Math.PI); // Heavy bank

            targetScale = 12 - 4 * phase; // 12 -> 8

        } else {
            // Phase 4: Fly DEEP into background
            const phase = (t - 0.6) / 0.4;
            const flyEase = easeOutQuad(phase);

            targetX = 20 - 18 * flyEase; // 20 -> 2
            targetY = 18 + 15 * flyEase; // 18 -> 33
            targetZ = -130 - 500 * flyEase; // -130 -> -630 (VERY DEEP!)

            targetYaw = Math.PI; // Facing directly away
            targetPitch = -0.2;
            targetRoll = 0.05 * (1 - flyEase);

            targetScale = 8 - 5 * flyEase; // 8 -> 3 (tiny in distance)
        }

        // Smooth interpolation
        currentPosition.current.x += (targetX - currentPosition.current.x) * lerpFactor * 2;
        currentPosition.current.y += (targetY - currentPosition.current.y) * lerpFactor * 2;
        currentPosition.current.z += (targetZ - currentPosition.current.z) * lerpFactor * 2;

        groupRef.current.position.copy(currentPosition.current);

        currentRotation.current.x += (targetPitch - currentRotation.current.x) * lerpFactor * 2;
        currentRotation.current.y += (targetYaw - currentRotation.current.y) * lerpFactor * 2;
        currentRotation.current.z += (targetRoll - currentRotation.current.z) * lerpFactor * 2;

        groupRef.current.rotation.copy(currentRotation.current);

        currentScale.current += (targetScale - currentScale.current) * lerpFactor * 2;
        groupRef.current.scale.setScalar(currentScale.current);
    });

    return (
        <group ref={groupRef}>
            <primitive object={clonedScene} />
        </group>
    );
}

function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

useGLTF.preload('/3d-modals/spaceship/scene.gltf');
