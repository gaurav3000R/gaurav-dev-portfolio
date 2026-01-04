'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

/**
 * useSpaceAudio Hook
 * 
 * Optional audio integration hook for ambient space sounds.
 * 
 * Features:
 * - NO autoplay (user must explicitly trigger)
 * - Smooth fade in/out
 * - Volume control
 * - Play/pause/stop controls
 * - Preload support
 * 
 * Usage:
 * const { play, pause, stop, setVolume, isPlaying } = useSpaceAudio('/audio/space-ambient.mp3');
 * 
 * @param audioSrc - Path to audio file
 * @param options - Configuration options
 */

interface UseSpaceAudioOptions {
    loop?: boolean;
    volume?: number;
    preload?: boolean;
    fadeInDuration?: number;
    fadeOutDuration?: number;
}

interface UseSpaceAudioReturn {
    play: () => void;
    pause: () => void;
    stop: () => void;
    setVolume: (volume: number) => void;
    isPlaying: boolean;
    isLoaded: boolean;
}

export function useSpaceAudio(
    audioSrc: string,
    options: UseSpaceAudioOptions = {}
): UseSpaceAudioReturn {
    const {
        loop = true,
        volume = 0.3,
        preload = true,
        fadeInDuration = 2000,
        fadeOutDuration = 1500,
    } = options;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const soundRef = useRef<Howl | null>(null);

    // Initialize Howl instance
    useEffect(() => {
        soundRef.current = new Howl({
            src: [audioSrc],
            loop,
            volume: 0, // Start at 0 for fade in
            preload,
            html5: true, // Use HTML5 Audio for streaming
            onload: () => {
                setIsLoaded(true);
            },
            onplay: () => {
                setIsPlaying(true);
            },
            onpause: () => {
                setIsPlaying(false);
            },
            onstop: () => {
                setIsPlaying(false);
            },
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
        };
    }, [audioSrc, loop, preload]);

    // Play with fade in
    const play = () => {
        if (soundRef.current && !isPlaying) {
            soundRef.current.play();
            soundRef.current.fade(0, volume, fadeInDuration);
        }
    };

    // Pause with fade out
    const pause = () => {
        if (soundRef.current && isPlaying) {
            soundRef.current.fade(volume, 0, fadeOutDuration);
            setTimeout(() => {
                soundRef.current?.pause();
            }, fadeOutDuration);
        }
    };

    // Stop immediately
    const stop = () => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.volume(0);
        }
    };

    // Set volume
    const setVolume = (newVolume: number) => {
        if (soundRef.current) {
            soundRef.current.volume(Math.max(0, Math.min(1, newVolume)));
        }
    };

    return {
        play,
        pause,
        stop,
        setVolume,
        isPlaying,
        isLoaded,
    };
}
