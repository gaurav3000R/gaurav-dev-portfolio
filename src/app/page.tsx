import { SpaceBackground } from '@/components/canvas';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic 3D Space Background */}
      <SpaceBackground />

      {/* Foreground Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl text-center">
          {/* Hero Section */}
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>

          <p className="mb-8 text-xl text-gray-300 md:text-2xl">
            Creative Technologist & WebGL Engineer
          </p>

          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400">
            Building immersive digital experiences that blend art, technology, and storytelling.
            Specialized in cinematic 3D web experiences using Three.js and creative code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-white/10 px-8 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-20" />
            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5">
              Get in Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 text-gray-500">
            <p className="text-sm uppercase tracking-wider">Scroll to Explore</p>
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gray-500 to-transparent" />
          </div>
        </div>
      </main>

      {/* Additional sections can be added below */}
      <section className="relative z-10 min-h-screen bg-gradient-to-b from-transparent to-black/50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-white md:text-5xl">
            Featured Projects
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div className="mb-4 h-48 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Project {i}
                </h3>
                <p className="text-gray-400">
                  A cinematic web experience showcasing the power of WebGL and creative code.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
