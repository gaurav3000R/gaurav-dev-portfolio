import { useEffect, useRef } from 'react';
import { Vector2 } from 'three';
import { useSpaceStore } from '@/store/spaceStore';

/**
 * useMouseInteraction Hook
 * 
 * Tracks mouse movement and calculates:
 * - Normalized position for camera parallax
 * - Velocity for wave effects
 * - Smooth interpolation for cinematic feel
 */
export function useMouseInteraction() {
    const lastMousePos = useRef(new Vector2(0, 0));
    const targetPos = useRef(new Vector2(0, 0));
    const currentPos = useRef(new Vector2(0, 0));

    const setMousePosition = useSpaceStore((state) => state.setMousePosition);
    const setMouseVelocity = useSpaceStore((state) => state.setMouseVelocity);
    const setWaveIntensity = useSpaceStore((state) => state.setWaveIntensity);

    useEffect(() => {
        let animationFrame: number;
        let decayInterval: NodeJS.Timeout;

        const handleMouseMove = (event: MouseEvent) => {
            // Normalize to [-1, 1]
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            targetPos.current.set(x, y);

            // Calculate velocity for wave effect
            const currentMouse = new Vector2(x, y);
            const velocity = currentMouse.distanceTo(lastMousePos.current);
            lastMousePos.current.copy(currentMouse);

            setMouseVelocity(velocity);

            // Trigger wave based on velocity (capped for subtlety)
            if (velocity > 0.01) {
                setWaveIntensity(Math.min(velocity * 1.5, 0.25));
            }
        };

        // Smooth interpolation loop
        const animate = () => {
            // Lerp for smooth camera movement
            currentPos.current.lerp(targetPos.current, 0.08);

            setMousePosition(currentPos.current.x, currentPos.current.y);

            animationFrame = requestAnimationFrame(animate);
        };

        // Decay wave intensity over time
        decayInterval = setInterval(() => {
            setWaveIntensity((prev) => Math.max(prev * 0.94, 0));
        }, 50);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
            clearInterval(decayInterval);
        };
    }, [setMousePosition, setMouseVelocity, setWaveIntensity]);
}
