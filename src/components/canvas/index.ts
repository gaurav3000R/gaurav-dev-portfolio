/**
 * Canvas Components - Barrel Export
 * 
 * Centralized exports for all 3D canvas components
 * 
 * GLTF Models Used:
 * - /3d-modals/spaceship/scene.gltf (SpaceshipFlyby)
 * - /3d-modals/asteroid_low_poly/scene.gltf (AsteroidField)
 * - /3d-modals/space_rocks/scene.gltf (AsteroidField)
 */

export { default as SpaceBackground } from './SpaceBackground';
export { default as SpaceScene } from './SpaceScene';

// Objects (Procedural)
export { default as Starfield } from './objects/Starfield';
export { default as CosmicDust } from './objects/CosmicDust';
export { default as Planets } from './objects/Planets';
export { default as Galaxy } from './objects/Galaxy';

// Objects (GLTF Models)
export { default as AsteroidField } from './objects/AsteroidField';

// Effects
export { default as NebulaGlow } from './effects/NebulaGlow';
export { default as SpaceshipFlyby } from './effects/SpaceshipFlyby';

