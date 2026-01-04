'use client';

import { useEffect, useRef, useState } from 'react';
import { Vector2 } from 'three';

/**
 * useMouseInteraction Hook
 * 
 * Tracks mouse movement and generates subtle spatial effects.
 * - mouseOffset: Normalized mouse position for camera parallax
 * - waveIntensity: Decaying wave effect for particle distortion
 * 
 * All values are smoothed and bounded for cinematic feel.
 */
export function useMouseInteraction() {
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [waveIntensity, setWaveIntensity] = useState(0);
    const lastMousePos = useRef(new Vector2(0, 0));
    const targetOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrame: number;
        let decayInterval: NodeJS.Timeout;

        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position to [-1, 1]
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Calculate mouse velocity for wave effect
            const currentPos = new Vector2(x, y);
            const velocity = currentPos.distanceTo(lastMousePos.current);
            lastMousePos.current.copy(currentPos);

            // Set target offset for smooth interpolation
            targetOffset.current = { x, y };

            // Trigger wave based on movement velocity
            // Higher velocity = stronger wave, but capped for subtlety
            if (velocity > 0.01) {
                setWaveIntensity(Math.min(velocity * 2, 0.3));
            }
        };

        // Smooth interpolation of mouse offset
        const animate = () => {
            setMouseOffset((prev) => ({
                x: prev.x + (targetOffset.current.x - prev.x) * 0.1,
                y: prev.y + (targetOffset.current.y - prev.y) * 0.1,
            }));
            animationFrame = requestAnimationFrame(animate);
        };

        // Decay wave intensity over time
        decayInterval = setInterval(() => {
            setWaveIntensity((prev) => Math.max(prev * 0.95, 0));
        }, 50);

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
            clearInterval(decayInterval);
        };
    }, []);

    return { mouseOffset, waveIntensity };
}
