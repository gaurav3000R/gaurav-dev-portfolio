import { SpaceBackground } from '@/components/canvas';
import {
  Smartphone, Globe, Brain, Zap, Building2, Target,
  Code2, Cpu, Database, GitBranch, Layers, Rocket,
  Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap,
  Award, Languages, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic 3D Space Background */}
      <SpaceBackground />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
          <div className="max-w-5xl text-center">
            {/* Greeting */}
            <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-6 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-gray-300">👋 Hi, I'm</p>
            </div>

            {/* Name */}
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-8xl lg:text-9xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gaurav Rathva
              </span>
            </h1>

            {/* Tagline */}
            <p className="mb-8 text-xl text-gray-300 md:text-2xl lg:text-3xl">
              Software Engineer × Mobile & AI Systems Builder
            </p>

            {/* Tech Stack Pills */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {["Flutter", "React Native", "Android", "React.js", "Next.js", "Python", "LangChain", "Agentic AI"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium text-gray-300 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bio */}
            <p className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-gray-400">
              Experienced Software Engineer with <span className="text-white font-semibold">3+ years</span> of expertise in
              <span className="text-blue-400"> Flutter</span>,
              <span className="text-purple-400"> React Native</span>, and
              <span className="text-pink-400"> Android development</span>.
              Currently transitioning deeper into <span className="text-white font-semibold">AI-driven systems</span>,
              <span className="text-white font-semibold"> local LLM engineering</span>, and
              <span className="text-white font-semibold"> agentic AI workflows</span>.
            </p>

            <p className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-gray-400">
              My core strength sits at the intersection of <span className="text-blue-400">mobile craftsmanship</span>,
              <span className="text-purple-400"> web development</span>, and <span className="text-pink-400">applied AI</span>.
              I specialize in building cross-platform applications with beautiful UIs, robust architectures, and seamless user experiences.
            </p>

            {/* Quick Contact */}
            <div className="mb-12 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="tel:9265681173" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                +91 9265681173
              </a>
              <a href="mailto:gauravrathva8@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                gauravrathva8@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/gauravrathva-4aa815224" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Vadodara, Gujarat, India
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-full bg-white/10 px-8 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Let's Build Together
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-20" />
              </a>

              <a
                href="#experience"
                className="rounded-full border border-white/20 px-8 py-4 text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5 flex items-center gap-2"
              >
                <Briefcase className="h-5 w-5" />
                View Experience
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 flex flex-col items-center gap-2 text-gray-500">
              <p className="text-sm uppercase tracking-wider">Scroll to Explore</p>
              <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gray-500 to-transparent" />
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-transparent via-black/30 to-transparent px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-sm font-semibold text-blue-300">
                Expertise
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                🚀 What I Do
              </h2>
              <p className="text-xl text-gray-400">
                Building the future, one system at a time
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile Excellence",
                  description: "Expert in Flutter & React Native. Built high-performance cross-platform apps with beautiful, smooth UIs.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Code2,
                  title: "Android Development",
                  description: "Proficient in Java and native Android frameworks. Developed robust Android applications from scratch.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: Globe,
                  title: "Modern Web",
                  description: "Build scalable web apps with React, Next.js, and Node.js. Focus on performance and user experience.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Brain,
                  title: "AI-Powered Systems",
                  description: "Design intelligent systems using Python, LangChain, RAG, and local LLMs. Building the AI-first future.",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Zap,
                  title: "Agentic AI Workflows",
                  description: "Experiment with on-device AI, CLI tools, and offline-first intelligence. Making AI accessible.",
                  gradient: "from-yellow-500 to-orange-500"
                },
                {
                  icon: Layers,
                  title: "Clean Architecture",
                  description: "Strong focus on clean code, system design, and real-world usability. Products that scale and evolve.",
                  gradient: "from-indigo-500 to-purple-500"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`mb-4 inline-block rounded-xl bg-gradient-to-r ${item.gradient} p-3`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative min-h-screen px-6 py-32">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1 text-sm font-semibold text-purple-300">
                <Briefcase className="inline h-4 w-4 mr-2" />
                Career Journey
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                💼 Experience
              </h2>
              <p className="text-xl text-gray-400">
                3+ years of building impactful products
              </p>
            </div>

            <div className="space-y-8">
              {/* Digiflux IT Solutions */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
                      Current
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Software Engineer</h3>
                    <p className="text-lg text-blue-400 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Digiflux IT Solutions
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-medium">July 2022 - Present</p>
                    <p className="text-sm">3 years 7 months</p>
                    <p className="text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      Vadodara, Gujarat, India
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 leading-relaxed">
                    Leading development of cross-platform mobile and web applications using Flutter, React Native, and modern web technologies.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Flutter", "React Native", "React.js", "Next.js", "TypeScript", "Python", "LangChain", "Agile"].map((skill) => (
                      <span key={skill} className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* MDU SANTISOLUTION */}
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Android Developer</h3>
                    <p className="text-lg text-purple-400 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      MDU SANTISOLUTION PVT LTD
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <p className="font-medium">January 2022 - March 2022</p>
                    <p className="text-sm">3 months</p>
                    <p className="text-sm flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      India
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">
                      Successfully completed development of a full-featured eCommerce application
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Android", "Java", "E-commerce", "Mobile Development"].map((skill) => (
                      <span key={skill} className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-transparent via-black/30 to-transparent px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-1 text-sm font-semibold text-pink-300">
                <Target className="inline h-4 w-4 mr-2" />
                Active Learning
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                🧠 Current Focus
              </h2>
              <p className="text-xl text-gray-400">
                Where I'm pushing boundaries
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  icon: Cpu,
                  title: "Local LLM Inference",
                  subtitle: "CLI + Mobile Integration",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Brain,
                  title: "Agentic AI Systems",
                  subtitle: "Intelligent Workflows & Automation",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Rocket,
                  title: "Next.js Performance",
                  subtitle: "Advanced Rendering & Optimization",
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: Zap,
                  title: "AI + UX",
                  subtitle: "Making Intelligence Feel Natural",
                  gradient: "from-green-500 to-teal-500"
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`mb-6 inline-block rounded-xl bg-gradient-to-r ${item.gradient} p-3`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`mb-4 inline-block rounded-full bg-gradient-to-r ${item.gradient} px-4 py-1 text-sm font-semibold text-white`}>
                    Active
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-400">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="relative min-h-screen px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-green-400/30 bg-green-400/10 px-4 py-1 text-sm font-semibold text-green-300">
                <Code2 className="inline h-4 w-4 mr-2" />
                Technologies
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                🧰 Tech Stack
              </h2>
              <p className="text-xl text-gray-400">
                Tools I use to build the future
              </p>
            </div>

            <div className="space-y-8">
              {/* Mobile Development */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">Mobile Development</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Flutter", "React Native", "Android (Java)", "TypeScript", "Dart"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-400/30 bg-blue-400/10 px-5 py-2 text-sm font-medium text-blue-300 transition-all hover:border-blue-400/50 hover:bg-blue-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Web Development */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-400">Web Development</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["React.js", "Next.js", "Node.js", "TypeScript", "JavaScript", "HTML/CSS"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-purple-400/30 bg-purple-400/10 px-5 py-2 text-sm font-medium text-purple-300 transition-all hover:border-purple-400/50 hover:bg-purple-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Backend */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-400">AI & Backend</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Python", "LangChain", "RAG", "Local LLMs", "Agentic AI", "MongoDB", "REST APIs"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-2 text-sm font-medium text-orange-300 transition-all hover:border-orange-400/50 hover:bg-orange-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Practices */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-green-500 to-teal-500 p-3">
                    <GitBranch className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">Tools & Practices</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Git", "Agile Development", "System Design", "Clean Architecture", "UI/UX Design", "Problem Solving", "Performance Optimization"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-green-400/30 bg-green-400/10 px-5 py-2 text-sm font-medium text-green-300 transition-all hover:border-green-400/50 hover:bg-green-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Languages Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-transparent via-black/30 to-transparent px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Education */}
              <div>
                <div className="mb-8 text-center lg:text-left">
                  <div className="mb-4 inline-block rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-1 text-sm font-semibold text-indigo-300">
                    <GraduationCap className="inline h-4 w-4 mr-2" />
                    Education
                  </div>
                  <h2 className="text-4xl font-bold text-white md:text-5xl">
                    🎓 Education
                  </h2>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className="mb-4 inline-block rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className="text-lg text-indigo-400 mb-2">
                    The Maharaja Sayajirao University of Baroda
                  </p>
                  <p className="text-gray-400 mb-4">
                    Information Technology • 2020 - 2022
                  </p>
                  <div className="rounded-lg border border-indigo-400/20 bg-indigo-400/5 p-4">
                    <p className="text-sm text-gray-300">
                      Specialized in Information Technology with focus on software development, programming languages, and system design.
                    </p>
                  </div>
                </div>
              </div>

              {/* Languages & Certifications */}
              <div>
                <div className="mb-8 text-center lg:text-left">
                  <div className="mb-4 inline-block rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1 text-sm font-semibold text-teal-300">
                    <Languages className="inline h-4 w-4 mr-2" />
                    Languages & Skills
                  </div>
                  <h2 className="text-4xl font-bold text-white md:text-5xl">
                    🌍 Languages
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Languages */}
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-4 inline-block rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 p-3">
                      <Languages className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Spoken Languages</h3>
                    <div className="space-y-3">
                      {[
                        { lang: "English", level: "Full Professional" },
                        { lang: "Hindi", level: "Native or Bilingual" },
                        { lang: "Gujarati", level: "Native or Bilingual" }
                      ].map((item) => (
                        <div key={item.lang} className="flex items-center justify-between">
                          <span className="text-gray-300 font-medium">{item.lang}</span>
                          <span className="text-sm text-teal-400">{item.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-4 inline-block rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-3">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
                    <div className="flex items-center gap-2 text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span>Photography</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="relative min-h-screen px-6 py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-1 text-sm font-semibold text-purple-300">
                Philosophy
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                🌌 My Approach
              </h2>
              <p className="text-xl text-gray-400">
                How I build software
              </p>
            </div>

            <div className="space-y-8">
              <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
                <p className="mb-6 text-2xl font-light italic leading-relaxed text-gray-300">
                  "I believe software should feel like a well-directed sci-fi scene:
                  <span className="text-blue-400"> powerful under the hood</span>,
                  <span className="text-purple-400"> smooth on the surface</span>, and
                  <span className="text-pink-400"> purposeful in motion</span>."
                </p>
              </blockquote>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
                <p className="text-2xl font-semibold text-white mb-4">
                  I don't just build features.
                </p>
                <p className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                  I build systems that think, scale, and evolve.
                </p>
                <p className="text-lg text-gray-400 leading-relaxed">
                  As a dedicated and motivated professional, I'm always eager to learn and stay up-to-date with the latest trends and technologies.
                  I thrive in collaborative environments and enjoy working in agile teams to deliver high-quality products that make a real impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen bg-gradient-to-b from-transparent to-black/50 px-6 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="mb-4 inline-block rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-sm font-semibold text-blue-300">
                <Mail className="inline h-4 w-4 mr-2" />
                Get in Touch
              </div>
              <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">
                📫 Let's Build Something Meaningful
              </h2>
              <p className="mb-12 text-xl leading-relaxed text-gray-400">
                If you're interested in <span className="text-blue-400">AI-first products</span>,
                <span className="text-purple-400"> intelligent mobile apps</span>, or
                <span className="text-pink-400"> future-ready software</span>, let's connect!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <a
                href="mailto:gauravrathva8@gmail.com"
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-400/50 hover:bg-white/10"
              >
                <Mail className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                  gauravrathva8@gmail.com
                </p>
              </a>

              <a
                href="tel:9265681173"
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-white/10"
              >
                <Phone className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                  +91 9265681173
                </p>
              </a>

              <a
                href="https://www.linkedin.com/in/gauravrathva-4aa815224"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-pink-400/50 hover:bg-white/10"
              >
                <Linkedin className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                <p className="text-white font-medium group-hover:text-pink-400 transition-colors">
                  Connect with me
                </p>
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-16">
              <a
                href="mailto:gauravrathva8@gmail.com"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-5 text-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send Me an Email
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/gauravrathva-4aa815224"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 flex items-center gap-2 justify-center"
              >
                <Linkedin className="h-5 w-5" />
                Connect on LinkedIn
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-gray-500 mb-4">
                © 2026 Gaurav Rathva. Built with Next.js, Three.js, and a passion for cinematic experiences.
              </p>
              <p className="text-xs text-gray-600">
                Vadodara, Gujarat, India • Available for exciting opportunities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
