# Cinematic Space Background

A high-performance, cinematic 3D space background built with Three.js and @react-three/fiber for Next.js portfolio websites.

## 🎬 Features

- **Multi-layer Starfield** - Parallax depth with smooth Perlin-like twinkling
- **Distant Planets** - Slow orbital mechanics with physically based materials
- **Asteroid Field** - Natural drift with random rotation (40 asteroids, instanced)
- **Rotating Galaxy** - Custom shaders for realistic dust/gas appearance
- **Ambient Lighting** - Volumetric light streaks with breathing intensity
- **Mouse Interaction** - Subtle parallax camera movement and wave distortion
- **Performance Optimized** - 60 FPS target on mid-range devices
- **Audio Ready** - Hook for future ambient space sound integration

## 📦 Installation

All dependencies are already installed:

```json
{
  "three": "^0.170.0",
  "@react-three/fiber": "^9.0.0",
  "@react-three/drei": "^10.0.0",
  "gsap": "^3.12.5",
  "howler": "^2.2.4"
}
```

## 🚀 Usage

### Basic Implementation

```tsx
import { SpaceBackground } from '@/components/canvas';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black">
      <SpaceBackground />
      
      {/* Your content here */}
      <main className="relative z-10">
        <h1>Your Portfolio Content</h1>
      </main>
    </div>
  );
}
```

### With Audio (Optional)

```tsx
'use client';

import { SpaceBackground } from '@/components/canvas';
import { useSpaceAudio } from '@/lib/hooks';

export default function Page() {
  const { play, pause, isPlaying } = useSpaceAudio('/audio/space-ambient.mp3');

  return (
    <div className="relative min-h-screen bg-black">
      <SpaceBackground />
      
      <button onClick={isPlaying ? pause : play}>
        {isPlaying ? 'Pause' : 'Play'} Ambient Sound
      </button>
    </div>
  );
}
```

## 🎨 Customization

### Adjusting Star Density

Edit `src/components/canvas/objects/Starfield.tsx`:

```tsx
// Change count values for each layer
<StarLayer count={800} ... />  // Near layer
<StarLayer count={1500} ... /> // Mid layer
<StarLayer count={2000} ... /> // Far layer
```

### Modifying Planet Count/Appearance

Edit `src/components/canvas/objects/Planets.tsx`:

```tsx
// Add or remove <Planet /> components
<Planet
  position={[-120, 40, -400]}
  radius={25}
  color="#4a5f7a"
  emissive="#1a2332"
  orbitSpeed={0.00005}
  orbitRadius={30}
  rotationSpeed={0.0001}
/>
```

### Adjusting Asteroid Count

Edit `src/components/canvas/objects/AsteroidField.tsx`:

```tsx
const count = 40; // Increase or decrease (keep under 100 for performance)
```

### Changing Galaxy Appearance

Edit `src/components/canvas/objects/Galaxy.tsx`:

```tsx
const particleCount = 8000; // Adjust particle density
const arms = 3; // Number of spiral arms
const spread = 0.3; // Arm spread factor
```

### Mouse Interaction Sensitivity

Edit `src/lib/hooks/useMouseInteraction.ts`:

```tsx
// Adjust parallax strength
sceneRef.current.rotation.x = mouseOffset.y * 0.05; // Lower = less movement
sceneRef.current.rotation.y = mouseOffset.x * 0.05;

// Adjust wave intensity
setWaveIntensity(Math.min(velocity * 2, 0.3)); // Second value is max intensity
```

## 🎯 Performance Tips

1. **Reduce Particle Counts** - Lower star/galaxy particle counts on mobile
2. **Disable Effects** - Comment out AsteroidField or Galaxy for better performance
3. **Adjust Camera FOV** - Lower FOV reduces render load
4. **Use Performance Monitor** - Add `<Stats />` from @react-three/drei to monitor FPS

### Performance Monitoring

```tsx
import { Stats } from '@react-three/drei';

<Canvas>
  <Stats />
  <SpaceScene />
</Canvas>
```

## 📁 Project Structure

```
src/
├── components/
│   └── canvas/
│       ├── SpaceBackground.tsx    # Main wrapper component
│       ├── SpaceScene.tsx         # Scene orchestrator
│       ├── objects/
│       │   ├── Starfield.tsx      # Multi-layer stars
│       │   ├── Planets.tsx        # Orbital planets
│       │   ├── AsteroidField.tsx  # Drifting asteroids
│       │   └── Galaxy.tsx         # Spiral galaxy
│       ├── effects/
│       │   └── AmbientGlow.tsx    # Volumetric lighting
│       └── index.ts               # Barrel exports
└── lib/
    └── hooks/
        ├── useMouseInteraction.ts # Mouse parallax & waves
        ├── useSpaceAudio.ts       # Audio integration
        └── index.ts               # Barrel exports
```

## 🎬 Design Philosophy

This background is designed with **cinematic realism** in mind:

- ✅ Slow, natural movement (space-scale timing)
- ✅ Physically based materials
- ✅ Subtle interactions
- ✅ Atmospheric depth
- ❌ No neon colors
- ❌ No game-like effects
- ❌ No aggressive animations

**Think film VFX, not game development.**

## 🔧 Troubleshooting

### Black Screen
- Check browser console for errors
- Ensure all dependencies are installed
- Verify WebGL is supported: `chrome://gpu`

### Low FPS
- Reduce particle counts
- Disable asteroid field or galaxy
- Lower canvas DPR: `dpr={[1, 1.5]}`

### Mouse Interaction Not Working
- Ensure component is client-side: `'use client'`
- Check if mouse events are blocked by foreground content

## 📝 License

MIT - Feel free to use in your portfolio projects!

## 🙏 Credits

Built with:
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei)
- [Next.js](https://nextjs.org/)
