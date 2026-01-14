'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SpaceshipFlyby - EPIC Cinematic Spaceship Pass
 * 
 * Avatar/Interstellar style dramatic flyby:
 * - Massive 3D spaceship model fills the entire screen
 * - Dramatic slow motion pass
 * - Engine glow and light streaks
 */
export default function SpaceshipFlyby() {
    const { scene } = useGLTF('/3d-modals/spaceship/scene.gltf');
    const groupRef = useRef<THREE.Group>(null);
    const [flybyProgress, setFlybyProgress] = useState(0);

    // Clone model once and fix materials - remove background planes
    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        const objectsToRemove: THREE.Object3D[] = [];
        
        clone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;
                
                // Remove planes/quads (background elements)
                if (geometry) {
                    const posAttr = geometry.getAttribute('position');
                    // Planes typically have 4 or 6 vertices
                    if (posAttr && (posAttr.count === 4 || posAttr.count === 6)) {
                        objectsToRemove.push(child);
                        return;
                    }
                }
                
                // Remove objects with names suggesting background
                const name = child.name.toLowerCase();
                if (name.includes('plane') || name.includes('background') || name.includes('floor') || name.includes('ground')) {
                    objectsToRemove.push(child);
                    return;
                }

                // Fix material - ensure proper rendering
                if (material) {
                    const mat = material as THREE.MeshStandardMaterial;
                    mat.side = THREE.FrontSide;
                    mat.transparent = false;
                    mat.depthWrite = true;
                }
            }
        });

        // Remove background objects
        objectsToRemove.forEach(obj => {
            if (obj.parent) {
                obj.parent.remove(obj);
            }
        });

        return clone;
    }, [scene]);

    useEffect(() => {
        const whatIDoSection = document.getElementById('what-i-do');
        if (!whatIDoSection) {
            console.log('SpaceshipFlyby: what-i-do section not found');
            return;
        }

        console.log('SpaceshipFlyby: ScrollTrigger initialized');

        const trigger = ScrollTrigger.create({
            trigger: whatIDoSection,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: 1,
            onUpdate: (self) => {
                setFlybyProgress(self.progress);
            },
        });

        return () => trigger.kill();
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        const time = state.clock.getElapsedTime();

        // Epic cinematic easing - slow start, dramatic middle, slow exit
        const eased = epicEase(flybyProgress);

        // MASSIVE SCALE - ship fills the screen
        // Start far away, come VERY close, exit far
        const distanceCurve = Math.sin(eased * Math.PI); // 0 -> 1 -> 0

        // Position: Dramatic diagonal sweep across entire viewport
        // Phase 1 (0-0.3): Enter from bottom-right, far away
        // Phase 2 (0.3-0.7): Pass VERY close overhead, filling screen
        // Phase 3 (0.7-1): Exit to top-left

        const x = 80 - eased * 160; // Right to left
        const y = -40 + eased * 80 + distanceCurve * 15; // Rise up with arc
        const z = -100 + distanceCurve * 140; // Come close then recede

        groupRef.current.position.set(x, y, z);

        // EPIC SCALE - gets HUGE when close
        const baseScale = 8;
        const closeScale = 25; // Massive when overhead
        const scale = baseScale + distanceCurve * closeScale;
        groupRef.current.scale.setScalar(scale);

        // Rotation: Banking turn, nose follows path
        // Ship tilts as it turns - like a real aircraft
        const bankAngle = Math.sin(eased * Math.PI * 2) * 0.2;
        const pitchAngle = (eased - 0.5) * 0.15;
        const yawAngle = -0.8 + eased * 0.4; // Turning through the frame

        groupRef.current.rotation.set(
            pitchAngle + Math.sin(time * 8) * 0.003, // Subtle vibration
            yawAngle,
            bankAngle + Math.sin(time * 12) * 0.002
        );

        // Visibility - always show when there's any progress
        groupRef.current.visible = flybyProgress > 0.02 && flybyProgress < 0.98;
    });

    return (
        <group ref={groupRef}>
            {/* The actual 3D spaceship model */}
            <primitive object={clonedScene} />

            {/* MASSIVE engine glow - multiple lights for realism */}
            <EngineGlow />

            {/* Light streaks / speed lines effect */}
            <SpeedStreaks progress={flybyProgress} />

            {/* Atmospheric entry heat glow */}
            <HeatGlow progress={flybyProgress} />
        </group>
    );
}

/**
 * Engine Glow - Intense thruster lights
 */
function EngineGlow() {
    const light1Ref = useRef<THREE.PointLight>(null);
    const light2Ref = useRef<THREE.PointLight>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Flickering engine intensity
        if (light1Ref.current) {
            light1Ref.current.intensity = 15 + Math.sin(time * 30) * 5 + Math.random() * 3;
        }
        if (light2Ref.current) {
            light2Ref.current.intensity = 10 + Math.cos(time * 25) * 4 + Math.random() * 2;
        }
    });

    return (
        <group position={[-1.5, 0, -2]}>
            {/* Main engine - bright blue/white */}
            <pointLight
                ref={light1Ref}
                color="#66aaff"
                intensity={15}
                distance={50}
                decay={1.5}
            />
            {/* Secondary glow - cyan */}
            <pointLight
                ref={light2Ref}
                color="#00ffff"
                intensity={10}
                distance={80}
                decay={2}
                position={[0, 0, -1]}
            />
            {/* Ambient engine wash */}
            <pointLight
                color="#4488ff"
                intensity={5}
                distance={100}
                decay={2}
                position={[0, 0, -3]}
            />
        </group>
    );
}

/**
 * Speed Streaks - Lines rushing past during close pass
 */
function SpeedStreaks({ progress }: { progress: number }) {
    const streaksRef = useRef<THREE.Points>(null);
    const count = 200;

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 60;
        positions[i3 + 2] = Math.random() * 50 - 25;
        velocities[i] = 0.5 + Math.random() * 1.5;
    }

    useFrame(() => {
        if (!streaksRef.current) return;

        const intensity = Math.sin(progress * Math.PI); // Peak at middle
        const posArray = streaksRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Streaks move backward as ship passes
            posArray[i3 + 2] -= velocities[i] * intensity * 2;

            // Reset streaks that go too far
            if (posArray[i3 + 2] < -30) {
                posArray[i3 + 2] = 25;
            }
        }

        streaksRef.current.geometry.attributes.position.needsUpdate = true;

        // Fade based on how close the ship is
        (streaksRef.current.material as THREE.PointsMaterial).opacity = intensity * 0.4;
    });

    return (
        <points ref={streaksRef} position={[0, 0, 10]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.08}
                sizeAttenuation
                transparent
                opacity={0}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/**
 * Heat Glow - Atmospheric friction glow on leading edges
 */
function HeatGlow({ progress }: { progress: number }) {
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!glowRef.current) return;

        // Glow intensity based on speed (middle of pass = fastest)
        const speed = Math.sin(progress * Math.PI);
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = speed * 0.15;
    });

    return (
        <mesh ref={glowRef} position={[2, 0, 1]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[8, 4]} />
            <meshBasicMaterial
                color="#ff6600"
                transparent
                opacity={0}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

/**
 * Epic easing - slow dramatic start, fast middle, slow exit
 * Like a breath - inhale, hold, exhale
 */
function epicEase(t: number): number {
    // Custom bezier-like curve for cinematic feel
    if (t < 0.2) {
        // Slow entrance
        return Math.pow(t / 0.2, 2) * 0.15;
    } else if (t < 0.8) {
        // Main pass - slightly faster
        const mid = (t - 0.2) / 0.6;
        return 0.15 + mid * 0.7;
    } else {
        // Slow exit
        const end = (t - 0.8) / 0.2;
        return 0.85 + Math.pow(end, 0.5) * 0.15;
    }
}
