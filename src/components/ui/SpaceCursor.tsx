'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * SpaceCursor - Custom space-themed cursor (Optimized for zero delay)
 * 
 * Uses direct DOM manipulation for instant response
 */
export default function SpaceCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const isPointer = useRef(false);
    const isVisible = useRef(false);

    const updateCursor = useCallback(() => {
        if (!cursorRef.current || !ringRef.current || !dotRef.current) return;

        // Dot follows mouse instantly
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`;

        // Ring follows with slight smoothing for fluid feel
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

        const scale = isPointer.current ? 1.3 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;

        requestRef.current = requestAnimationFrame(updateCursor);
    }, []);

    useEffect(() => {
        // Start animation loop
        requestRef.current = requestAnimationFrame(updateCursor);

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            if (!isVisible.current && cursorRef.current) {
                cursorRef.current.style.opacity = '1';
                isVisible.current = true;
            }

            // Check for interactive elements
            const target = e.target as HTMLElement;
            const interactive = Boolean(
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer'
            );

            if (interactive !== isPointer.current) {
                isPointer.current = interactive;
                if (dotRef.current && ringRef.current) {
                    if (interactive) {
                        dotRef.current.style.background = 'radial-gradient(circle, #a78bfa 0%, rgba(167, 139, 250, 0.8) 50%, transparent 70%)';
                        dotRef.current.style.boxShadow = '0 0 12px #a78bfa, 0 0 24px rgba(167, 139, 250, 0.5)';
                        dotRef.current.style.width = '10px';
                        dotRef.current.style.height = '10px';
                        ringRef.current.style.borderColor = 'rgba(167, 139, 250, 0.5)';
                        ringRef.current.style.boxShadow = '0 0 20px rgba(167, 139, 250, 0.3)';
                    } else {
                        dotRef.current.style.background = 'radial-gradient(circle, #60a5fa 0%, rgba(96, 165, 250, 0.8) 50%, transparent 70%)';
                        dotRef.current.style.boxShadow = '0 0 8px #60a5fa, 0 0 16px rgba(96, 165, 250, 0.4)';
                        dotRef.current.style.width = '6px';
                        dotRef.current.style.height = '6px';
                        ringRef.current.style.borderColor = 'rgba(96, 165, 250, 0.3)';
                        ringRef.current.style.boxShadow = '0 0 15px rgba(96, 165, 250, 0.2)';
                    }
                }
            }
        };

        const handleMouseDown = () => {
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(0.8)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%) scale(1.5)`;
            }
        };

        const handleMouseUp = () => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%) scale(1)`;
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0';
                isVisible.current = false;
            }
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '1';
                isVisible.current = true;
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mousedown', handleMouseDown, { passive: true });
        document.addEventListener('mouseup', handleMouseUp, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

        return () => {
            cancelAnimationFrame(requestRef.current);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [updateCursor]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed inset-0 z-[9999]"
            style={{ opacity: 0 }}
        >
            {/* Outer ring - follows with slight delay for fluid feel */}
            <div
                ref={ringRef}
                className="absolute top-0 left-0 rounded-full"
                style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    boxShadow: '0 0 15px rgba(96, 165, 250, 0.2)',
                    transition: 'width 0.15s, height 0.15s, border-color 0.15s, box-shadow 0.15s',
                    willChange: 'transform',
                }}
            />

            {/* Inner dot - instant follow */}
            <div
                ref={dotRef}
                className="absolute top-0 left-0 rounded-full"
                style={{
                    width: '6px',
                    height: '6px',
                    background: 'radial-gradient(circle, #60a5fa 0%, rgba(96, 165, 250, 0.8) 50%, transparent 70%)',
                    boxShadow: '0 0 8px #60a5fa, 0 0 16px rgba(96, 165, 250, 0.4)',
                    transition: 'width 0.1s, height 0.1s, background 0.15s, box-shadow 0.15s',
                    willChange: 'transform',
                }}
            />
        </div>
    );
}
