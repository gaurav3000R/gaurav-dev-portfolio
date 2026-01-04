# 🎬 Professional Cinematic Space Background System

## Architecture Overview

This is a **production-ready, high-performance 3D space background** built with professional VFX principles.

### Tech Stack
- **Next.js 16** (App Router)
- **React 19**
- **three.js r170**
- **@react-three/fiber v9**
- **@react-three/drei v10**
- **GSAP v3** (ready for ScrollTrigger)
- **Lenis** (ready for smooth scrolling)
- **Zustand** for global state
- **Howler.js** for audio hooks

---

## 📁 Project Structure

```
src/
├── components/canvas/
│   ├── SpaceBackground.tsx      # Main wrapper with Canvas
│   ├── SpaceScene.tsx           # Scene orchestrator
│   ├── objects/
│   │   ├── Starfield.tsx        # Multi-layer stars (3,600 particles)
│   │   ├── CosmicDust.tsx       # Depth particles (500)
│   │   ├── Planets.tsx          # 3 planets with orbits
│   │   ├── AsteroidField.tsx    # 35 asteroids (instanced)
│   │   └── Galaxy.tsx           # Spiral galaxy (10,000 particles)
│   ├── effects/
│   │   └── NebulaGlow.tsx       # 4 volumetric lights
│   └── index.ts                 # Barrel exports
├── lib/hooks/
│   ├── useMouseInteraction.ts   # Mouse parallax + waves
│   ├── useScrollIntegration.ts  # Scroll tracking
│   ├── useSpaceAudio.ts         # Audio hooks
│   └── index.ts                 # Barrel exports
└── store/
    └── spaceStore.ts            # Zustand global state
```

---

## 🎨 Scene Composition

### 1. **Deep Space Base Layer**
- Near-black to deep-blue gradient (`#000510` → `#000000`)
- Subtle fog for depth (`fog` from 100 to 1500 units)
- Empty, vast feeling

### 2. **Starfield System** (3 layers, 3,600 total stars)
- **Near layer**: 600 stars, size 1.0, bright
- **Mid layer**: 1,200 stars, size 0.6, medium
- **Far layer**: 1,800 stars, size 0.4, subtle
- Noise-based twinkling (not random blinking)
- Mouse wave distortion
- Scroll parallax

### 3. **Cosmic Dust** (500 particles)
- Closer to camera for depth
- Very low opacity (0.15)
- Perlin drift
- Reacts to mouse waves
- Scroll parallax

### 4. **Nebula Glow** (4 volumetric lights)
- Desaturated colors: blue (#4a6fa5), purple (#6a5a8e), teal (#5a7a8e)
- Slow sinusoidal breathing
- No sharp edges
- Creates atmospheric depth

### 5. **Distant Galaxy** (10,000 particles)
- Spiral structure with 3 arms
- Nearly imperceptible rotation
- Very low opacity (0.35)
- Scroll-based depth adjustment
- Feels infinitely far away

### 6. **Planets** (3 total)
- Gas giant, rocky planet, ice planet
- Extremely slow orbits
- Gentle Z-depth drift with scroll
- Physically based materials
- Soft rim lighting + atmospheric glow

### 7. **Asteroid Field** (35 asteroids, instanced)
- Irregular shapes
- Noise-based drift and rotation
- Scroll parallax
- No collisions

---

## 🎮 Interaction System

### Mouse Interaction
- **Parallax**: Subtle camera rotation (0.03 factor)
- **Wave Effect**: Ripples through stars and dust
- **Smooth Interpolation**: 0.08 lerp for cinematic feel
- **Velocity-based**: Wave intensity based on mouse speed

### Scroll Integration
- **Progress Tracking**: 0-1 normalized scroll position
- **Velocity Tracking**: Scroll speed for effects
- **Parallax Layers**: Different depths move at different rates
- **Camera Depth**: Subtle Z-position adjustment

### State Management (Zustand)
```typescript
{
  mousePosition: { x, y },
  mouseVelocity: number,
  waveIntensity: number,
  scrollProgress: number,
  scrollVelocity: number,
  audioEnabled: boolean,
  audioVolume: number
}
```

---

## ⚡ Performance

### Optimizations
- **Instanced Rendering**: Asteroids use InstancedMesh
- **Adaptive DPR**: `dpr={[1, 2]}` adjusts to device
- **Performance Throttling**: `performance={{ min: 0.5 }}`
- **Frustum Culling**: Disabled only where necessary
- **Depth Write**: Disabled for transparent particles
- **Additive Blending**: Used for glow effects

### Particle Counts
- Stars: 3,600
- Cosmic Dust: 500
- Galaxy: 10,000
- Asteroids: 35
- **Total**: ~14,135 particles

### Target Performance
- **60 FPS** on mid-range devices
- **Stable frame time** with scroll/mouse interaction
- **No jank** or stuttering

---

## 🎬 Style Guidelines

### Cinematic Principles
✅ **Slow, intentional movement** (space-scale timing)  
✅ **Physically based materials** (realistic roughness/metalness)  
✅ **Subtle interactions** (no snapping or jitter)  
✅ **Atmospheric depth** (fog, low opacity, layering)  
✅ **Desaturated colors** (no neon, no bright UI)  

❌ **No game-like effects**  
❌ **No excessive bloom or lens flares**  
❌ **No fast orbits or explosions**  
❌ **No cartoon aesthetics**  

### Color Palette
- **Deep blacks**: #000000, #000510, #0a0a0a
- **Cool blues**: #4a6fa5, #4a5f7a, #3a4f7e
- **Subtle purples**: #6a5a8e, #1a2332
- **Warm accents**: #6b5d5a, #6a5f5a
- **Bright whites**: #ffffff (stars only)

---

## 🔊 Audio Integration

### Howler.js Hooks
```typescript
const { play, pause, stop, setVolume, isPlaying } = useSpaceAudio('/audio/space-ambient.mp3');
```

### Features
- **No autoplay** (user must enable)
- **Smooth fade in/out** (2s fade in, 1.5s fade out)
- **Volume control** (0-1, clamped)
- **Play/pause/stop** controls
- **Loading state** tracking

---

## 📖 Usage

### Basic Implementation
```tsx
import { SpaceBackground } from '@/components/canvas';

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      
      <main className="relative z-10">
        {/* Your content */}
      </main>
    </div>
  );
}
```

### With Audio
```tsx
'use client';

import { SpaceBackground } from '@/components/canvas';
import { useSpaceAudio } from '@/lib/hooks';

export default function Page() {
  const { play, pause, isPlaying } = useSpaceAudio('/audio/ambient.mp3');

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? 'Pause' : 'Play'} Ambient Sound
      </button>
    </div>
  );
}
```

### Accessing State
```tsx
import { useSpaceStore } from '@/store/spaceStore';

function MyComponent() {
  const scrollProgress = useSpaceStore((state) => state.scrollProgress);
  const waveIntensity = useSpaceStore((state) => state.waveIntensity);
  
  // Use in your components
}
```

---

## 🛠️ Customization

### Adjust Star Density
Edit `src/components/canvas/objects/Starfield.tsx`:
```tsx
<StarLayer count={600} ... />  // Increase/decrease
```

### Change Planet Count
Edit `src/components/canvas/objects/Planets.tsx`:
```tsx
// Add or remove <Planet /> components
```

### Modify Colors
Edit individual component files:
```tsx
color="#4a6fa5"  // Change to your palette
```

### Adjust Interaction Sensitivity
Edit `src/lib/hooks/useMouseInteraction.ts`:
```tsx
currentPos.current.lerp(targetPos.current, 0.08); // Lower = slower
```

Edit `src/components/canvas/SpaceScene.tsx`:
```tsx
const targetRotationX = mousePosition.y * 0.03; // Lower = less parallax
```

---

## 🐛 Troubleshooting

### Black Screen
1. Check browser console for errors
2. Verify WebGL support: `chrome://gpu`
3. Ensure all dependencies installed: `npm install`

### Low FPS
1. Reduce particle counts in components
2. Lower canvas DPR: `dpr={[1, 1.5]}`
3. Disable asteroid field or galaxy temporarily

### Mouse Interaction Not Working
1. Ensure component is client-side: `'use client'`
2. Check if foreground content blocks pointer events
3. Verify Zustand store is initialized

### Scroll Not Affecting Scene
1. Ensure page has scrollable content
2. Check `useScrollIntegration` hook is called
3. Verify scroll progress in Zustand store

---

## 📊 Performance Monitoring

Add performance stats:
```tsx
import { Stats } from '@react-three/drei';

<Canvas>
  <Stats />
  <SpaceScene />
</Canvas>
```

---

## 🚀 Production Checklist

- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Verify 60 FPS performance
- [ ] Check scroll integration
- [ ] Test mouse interaction smoothness
- [ ] Verify audio hooks (if used)
- [ ] Test with foreground content
- [ ] Check z-index layering
- [ ] Validate color contrast for accessibility
- [ ] Test in different browsers
- [ ] Optimize particle counts if needed

---

## 📝 License

MIT - Use freely in your portfolio projects

---

## 🙏 Credits

Built with professional VFX principles using:
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [Zustand](https://github.com/pmndrs/zustand)
- [GSAP](https://greensock.com/gsap/)
- [Howler.js](https://howlerjs.com/)

**Think film VFX, not game development.** 🎬
