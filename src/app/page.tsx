'use client';

import { SpaceBackground } from '@/components/canvas';
import {
  AnimatedText,
  FloatingElement,
} from '@/components/ui/AnimatedText';
import {
  Smartphone, Globe, Brain, Zap, Building2,
  Code2, Cpu, GitBranch, Layers, Rocket,
  Mail, Phone, Linkedin, MapPin, Briefcase, GraduationCap,
  Award, CheckCircle2, ArrowRight, Github, ExternalLink,
  Star, Users, Clock, Sparkles, Download, MessageSquare,
  Shield, Palette, Database, Terminal
} from 'lucide-react';

// ==========================================
// DATA - Projects, Skills, Experience
// ==========================================

const PROJECTS = [
  {
    title: "Healthcare Management Platform",
    description: "Full-stack healthcare application with patient management, booking system, and real-time dashboards. Handles 500+ daily active users.",
    technologies: ["Flutter", "React.js", "Node.js", "PostgreSQL"],
    category: "Mobile + Web",
    highlights: ["Real-time sync", "Offline support", "HIPAA compliant"],
    color: "cosmic-blue",
    metrics: { users: "500+", uptime: "99.9%" }
  },
  {
    title: "AI-Powered Document Assistant",
    description: "Intelligent document analysis tool using RAG architecture and local LLMs. Processes PDFs, extracts insights, and answers questions contextually.",
    technologies: ["Python", "LangChain", "FastAPI", "ChromaDB"],
    category: "AI / ML",
    highlights: ["RAG Pipeline", "Local LLM", "Vector Search"],
    color: "cosmic-purple",
    metrics: { accuracy: "95%", speed: "2s avg" }
  },
  {
    title: "Cross-Platform E-Commerce App",
    description: "Feature-rich shopping application with payment integration, real-time inventory, and push notifications. 50K+ downloads.",
    technologies: ["React Native", "Firebase", "Stripe", "Redux"],
    category: "Mobile",
    highlights: ["Payment Gateway", "Push Notifications", "Analytics"],
    color: "cosmic-teal",
    metrics: { downloads: "50K+", rating: "4.8★" }
  },
  {
    title: "Agentic Workflow Automation",
    description: "AI agent system that automates business processes using natural language instructions. Integrates with multiple APIs and services.",
    technologies: ["Python", "LangChain", "OpenAI", "Celery"],
    category: "AI / Automation",
    highlights: ["Multi-agent", "API Integration", "Auto-scaling"],
    color: "cosmic-orange",
    metrics: { tasks: "10K+/mo", efficiency: "80% faster" }
  }
];

const SERVICES = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform iOS & Android apps with Flutter and React Native. Native performance, beautiful UI, offline-first architecture.",
    features: ["Flutter / React Native", "iOS & Android", "Offline Support", "App Store Deployment"],
    color: "cosmic-blue"
  },
  {
    icon: Code2,
    title: "Native Android Development",
    description: "High-performance native Android applications with modern architecture patterns and Material Design principles.",
    features: ["Kotlin / Java", "Jetpack Compose", "Material Design", "Play Store Ready"],
    color: "cosmic-teal"
  },
  {
    icon: Globe,
    title: "Web Application Development",
    description: "Fast, responsive web apps with React and Next.js. SEO optimized, mobile-friendly, and built for scale.",
    features: ["React / Next.js", "TypeScript", "SEO Optimized", "Responsive Design"],
    color: "cosmic-purple"
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent systems using LangChain, RAG pipelines, and local LLMs. Turn your data into actionable insights.",
    features: ["LangChain / RAG", "Local LLMs", "Custom AI Agents", "API Integration"],
    color: "cosmic-orange"
  },
  {
    icon: Zap,
    title: "Agentic AI Solutions",
    description: "Autonomous AI agents that automate complex workflows, handle multi-step tasks, and integrate with your existing systems.",
    features: ["Workflow Automation", "Multi-Agent Systems", "Business Process AI", "Custom Integrations"],
    color: "cosmic-pink"
  },
  {
    icon: Layers,
    title: "System Architecture",
    description: "Scalable, maintainable system design. Clean architecture, microservices, and best practices for long-term success.",
    features: ["Clean Architecture", "Scalable Design", "API Design", "Code Reviews"],
    color: "cosmic-cyan"
  }
];

const SKILLS = {
  mobile: {
    title: "Mobile Development",
    icon: Smartphone,
    color: "cosmic-blue",
    items: [
      { name: "Flutter", level: 95 },
      { name: "React Native", level: 90 },
      { name: "Android (Java/Kotlin)", level: 85 },
      { name: "Dart", level: 95 },
    ]
  },
  web: {
    title: "Web Development",
    icon: Globe,
    color: "cosmic-purple",
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "TypeScript", level: 85 },
    ]
  },
  ai: {
    title: "AI & Backend",
    icon: Brain,
    color: "cosmic-orange",
    items: [
      { name: "Python", level: 85 },
      { name: "LangChain", level: 80 },
      { name: "RAG Systems", level: 80 },
      { name: "FastAPI", level: 75 },
    ]
  },
  tools: {
    title: "Tools & Platforms",
    icon: Terminal,
    color: "cosmic-teal",
    items: [
      { name: "Git / GitHub", level: 95 },
      { name: "Firebase", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 70 },
    ]
  }
};

const EXPERIENCES = [
  {
    role: "Software Engineer",
    company: "Digiflux IT Solutions",
    location: "Vadodara, India",
    period: "July 2022 – Present",
    duration: "2+ years",
    type: "Full-time",
    isCurrent: true,
    description: "Leading mobile and AI development initiatives. Building cross-platform applications and integrating modern AI solutions.",
    achievements: [
      "Developed 10+ production mobile apps serving 50K+ users",
      "Implemented AI-powered features using LangChain and RAG",
      "Led Flutter team and established coding standards",
      "Reduced app load time by 40% through optimization",
      "Integrated CI/CD pipelines for automated deployments"
    ],
    technologies: ["Flutter", "React Native", "Python", "LangChain", "Next.js"]
  },
  {
    role: "Android Developer (Intern)",
    company: "MDU Santisolution Pvt Ltd",
    location: "Gujarat, India",
    period: "January – March 2022",
    duration: "3 months",
    type: "Internship",
    isCurrent: false,
    description: "Built Android applications focusing on e-commerce solutions.",
    achievements: [
      "Developed complete e-commerce Android application",
      "Implemented payment gateway integration",
      "Gained hands-on experience with Android SDK"
    ],
    technologies: ["Android", "Java", "Firebase"]
  }
];

const STATS = [
  { label: "Years Experience", value: "3+", icon: Clock },
  { label: "Projects Delivered", value: "25+", icon: Rocket },
  { label: "Happy Clients", value: "15+", icon: Users },
  { label: "App Downloads", value: "100K+", icon: Download },
];

const TESTIMONIALS = [
  {
    quote: "Gaurav delivered our app ahead of schedule with exceptional quality. His Flutter expertise and attention to detail made all the difference.",
    author: "Client Project Lead",
    role: "Healthcare Startup",
    rating: 5
  },
  {
    quote: "Excellent work on our AI integration. He understood our requirements quickly and implemented a robust solution.",
    author: "Tech Director",
    role: "Enterprise Client",
    rating: 5
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Cinematic 3D Space Background */}
      <SpaceBackground />

      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cosmic-blue focus:text-white focus:rounded">
        Skip to main content
      </a>

      {/* Main Content */}
      <main id="main-content" className="relative z-10" role="main">

        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section
          id="hero"
          className="flex min-h-screen flex-col items-center justify-center px-6 py-16"
          aria-label="Introduction"
        >
          <div className="max-w-3xl text-center">

            {/* Status Badge */}
            <AnimatedText animation="fade-in-up" delay={0}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cosmic-teal/30 bg-cosmic-teal/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cosmic-teal opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cosmic-teal"></span>
                </span>
                <p className="text-sm text-cosmic-teal font-medium">Available for new projects</p>
              </div>
            </AnimatedText>

            {/* Name - Primary H1 for SEO */}
            <AnimatedText animation="scale-in-glow" delay={0.2}>
              <h1 className="font-display mb-3 text-4xl font-bold tracking-wide text-primary md:text-6xl lg:text-7xl gradient-text animate-gradient">
                GAURAV RATHVA
              </h1>
            </AnimatedText>

            {/* Professional Title - Important for SEO */}
            <AnimatedText animation="fade-in-up" delay={0.3}>
              <p className="mb-6 text-lg text-cosmic-cyan md:text-xl lg:text-2xl font-medium">
                <span itemProp="jobTitle">Software Engineer</span> • Mobile & AI Developer
              </p>
            </AnimatedText>

            {/* Tech Stack Pills */}
            <AnimatedText animation="fade-in-up" delay={0.4}>
              <div className="mb-8 flex flex-wrap justify-center gap-2" role="list" aria-label="Technologies">
                {["Flutter", "React Native", "Android", "React.js", "Next.js", "Python", "LangChain", "AI/ML"].map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-secondary backdrop-blur-sm hover:border-cosmic-blue/30 hover:text-primary transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedText>

            {/* Professional Summary - SEO Rich */}
            <AnimatedText animation="blur-in" delay={0.5}>
              <p className="mx-auto mb-8 max-w-2xl text-base md:text-lg text-secondary leading-relaxed">
                I build <span className="text-cosmic-blue font-semibold">mobile apps</span> that users love and{' '}
                <span className="text-cosmic-purple font-semibold">AI systems</span> that solve real problems.
                With <strong>3+ years</strong> of experience, I specialize in <em>Flutter</em>, <em>React Native</em>,
                and modern <em>AI technologies</em> like LangChain and RAG pipelines.
              </p>
            </AnimatedText>

            {/* Quick Stats Bar */}
            <AnimatedText animation="fade-in-up" delay={0.55}>
              <div className="mb-8 flex flex-wrap justify-center gap-6 md:gap-10">
                {STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            {/* Contact Quick Access */}
            <AnimatedText animation="fade-in-up" delay={0.6}>
              <address className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-muted not-italic">
                <a href="tel:+919265681173" className="flex items-center gap-1.5 hover:text-cosmic-cyan transition-colors" aria-label="Call Gaurav">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +91 9265681173
                </a>
                <a href="mailto:gauravrathva8@gmail.com" className="flex items-center gap-1.5 hover:text-cosmic-cyan transition-colors" aria-label="Email Gaurav">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  gauravrathva8@gmail.com
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span itemProp="address">Vadodara, India</span>
                </span>
              </address>
            </AnimatedText>

            {/* CTA Buttons */}
            <AnimatedText animation="fade-in-up" delay={0.7}>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#contact"
                  className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-cosmic-purple/30 hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Start a Project
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </a>
                <a
                  href="#projects"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-secondary backdrop-blur-sm transition-all hover:border-white/30 hover:text-primary flex items-center justify-center gap-2"
                >
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                  View My Work
                </a>
              </div>
            </AnimatedText>

            {/* Scroll Indicator */}
            <FloatingElement speed="slow" className="mt-14">
              <a href="#services" className="flex flex-col items-center gap-2 text-muted hover:text-secondary transition-colors">
                <p className="text-xs uppercase tracking-widest">Explore</p>
                <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
              </a>
            </FloatingElement>
          </div>
        </section>

        {/* ============================================
            SERVICES / WHAT I DO
        ============================================ */}
        <section
          id="services"
          className="relative px-6 py-20"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-6xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Services</p>
              <h2 id="services-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4">
                What I Can Build For You
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                From mobile apps to AI-powered solutions, I deliver end-to-end development
                services tailored to your business needs.
              </p>
            </AnimatedText>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => (
                <AnimatedText key={service.title} animation="fade-in-up" delay={0.08 * i}>
                  <article className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 transition-all hover:border-cosmic-blue/30 card-hover h-full flex flex-col">
                    <div className={`inline-flex p-3 rounded-lg bg-${service.color}/10 mb-4 w-fit`}>
                      <service.icon className={`h-6 w-6 text-${service.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2" role="list">
                      {service.features.map((feature) => (
                        <li key={feature} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-xs text-secondary">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            PROJECTS / PORTFOLIO
        ============================================ */}
        <section
          id="projects"
          className="relative px-6 py-20"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-6xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Portfolio</p>
              <h2 id="projects-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4">
                Featured Projects
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                A selection of projects I've built that showcase my expertise in mobile development,
                web applications, and AI integration.
              </p>
            </AnimatedText>

            <div className="grid gap-6 md:grid-cols-2">
              {PROJECTS.map((project, i) => (
                <AnimatedText key={project.title} animation="fade-in-up" delay={0.1 * i}>
                  <article className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 transition-all hover:border-cosmic-purple/30 card-hover h-full">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`inline-block rounded-full bg-${project.color}/20 px-2.5 py-0.5 text-xs text-${project.color} font-medium mb-2`}>
                          {project.category}
                        </span>
                        <h3 className="text-lg font-semibold text-primary">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors" aria-label="View source code">
                          <Github className="h-4 w-4 text-muted" />
                        </button>
                        <button className="p-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors" aria-label="View live demo">
                          <ExternalLink className="h-4 w-4 text-muted" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex gap-4 mb-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className={`text-lg font-bold text-${project.color}`}>{value}</p>
                          <p className="text-xs text-muted capitalize">{key}</p>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.map((highlight) => (
                        <span key={highlight} className="flex items-center gap-1 text-xs text-cosmic-teal">
                          <CheckCircle2 className="h-3 w-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </AnimatedText>
              ))}
            </div>

            {/* View More */}
            <AnimatedText animation="fade-in-up" delay={0.5} className="mt-10 text-center">
              <a
                href="https://github.com/gaurav3000r"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cosmic-blue hover:text-cosmic-cyan transition-colors"
              >
                <Github className="h-5 w-5" />
                View more on GitHub
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedText>
          </div>
        </section>

        {/* ============================================
            SKILLS
        ============================================ */}
        <section
          id="skills"
          className="relative px-6 py-20"
          aria-labelledby="skills-heading"
        >
          <div className="mx-auto max-w-5xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Technical Skills</p>
              <h2 id="skills-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4">
                Technologies I Work With
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                My technical toolkit spans mobile development, web technologies, and AI/ML systems.
              </p>
            </AnimatedText>

            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(SKILLS).map((category, i) => (
                <AnimatedText key={category.title} animation="fade-in-up" delay={0.1 * i}>
                  <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <category.icon className={`h-5 w-5 text-${category.color}`} />
                      <h3 className={`text-base font-semibold text-${category.color}`}>{category.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {category.items.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-secondary">{skill.name}</span>
                            <span className="text-xs text-muted">{skill.level}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/60 rounded-full transition-all duration-1000`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            EXPERIENCE
        ============================================ */}
        <section
          id="experience"
          className="relative px-6 py-20"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-12 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Career</p>
              <h2 id="experience-heading" className="text-2xl font-semibold text-primary md:text-4xl mb-4">
                Professional Experience
              </h2>
              <p className="mx-auto max-w-2xl text-secondary">
                My journey building software products and leading development teams.
              </p>
            </AnimatedText>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, i) => (
                <AnimatedText key={exp.company} animation={i % 2 === 0 ? "fade-in-left" : "fade-in-right"} delay={0.1 * i}>
                  <article className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 hover:border-cosmic-cyan/30 transition-all">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-cosmic-teal/20 px-2.5 py-0.5 text-xs text-cosmic-teal font-medium mb-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-cosmic-teal animate-pulse" />
                            Current Position
                          </span>
                        )}
                        <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                        <p className="text-cosmic-cyan flex items-center gap-1.5 mt-1">
                          <Building2 className="h-4 w-4" />
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted">
                        <p className="font-medium">{exp.period}</p>
                        <p className="flex items-center gap-1 justify-end">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4" role="list">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2 text-sm text-secondary">
                          <CheckCircle2 className="h-4 w-4 text-cosmic-teal mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-cosmic-blue/20 bg-cosmic-blue/10 px-2.5 py-0.5 text-xs text-cosmic-blue">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </article>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            CURRENT FOCUS / LEARNING
        ============================================ */}
        <section
          id="learning"
          className="relative px-6 py-20"
          aria-labelledby="learning-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-pink">Growth</p>
              <h2 id="learning-heading" className="text-2xl font-semibold text-primary md:text-3xl">
                Currently Exploring
              </h2>
            </AnimatedText>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Cpu, title: "Local LLMs", desc: "Ollama, llama.cpp", color: "cosmic-blue" },
                { icon: Brain, title: "Agentic AI", desc: "Multi-agent systems", color: "cosmic-purple" },
                { icon: Rocket, title: "Next.js 15", desc: "Server components", color: "cosmic-orange" },
                { icon: Sparkles, title: "AI + UX", desc: "Intelligent interfaces", color: "cosmic-teal" }
              ].map((item, i) => (
                <AnimatedText key={item.title} animation="scale-in-glow" delay={0.1 * i}>
                  <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 text-center hover:border-cosmic-pink/30 transition-all card-hover">
                    <item.icon className={`h-6 w-6 text-${item.color} mx-auto mb-2`} />
                    <h3 className="text-sm font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            EDUCATION & CERTIFICATIONS
        ============================================ */}
        <section
          id="education"
          className="relative px-6 py-20"
          aria-labelledby="education-heading"
        >
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2">

              {/* Education */}
              <AnimatedText animation="fade-in-left">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Education</p>
                  <h2 id="education-heading" className="text-xl font-semibold text-primary mb-4">Academic Background</h2>
                  <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6">
                    <GraduationCap className="h-6 w-6 text-cosmic-purple mb-3" />
                    <h3 className="text-lg font-semibold text-primary mb-1">Bachelor of Computer Applications (BCA)</h3>
                    <p className="text-cosmic-cyan mb-1">Specialization in Information Technology</p>
                    <p className="text-secondary mb-2">MS University of Baroda</p>
                    <p className="text-sm text-muted flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      2020 – 2022
                    </p>
                  </div>
                </div>
              </AnimatedText>

              {/* Languages & Certifications */}
              <AnimatedText animation="fade-in-right" delay={0.1}>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Languages & More</p>
                  <h2 className="text-xl font-semibold text-primary mb-4">Communication</h2>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5">
                      {[
                        { lang: "English", level: "Professional Working", proficiency: 90 },
                        { lang: "Hindi", level: "Native", proficiency: 100 },
                        { lang: "Gujarati", level: "Native", proficiency: 100 }
                      ].map((l) => (
                        <div key={l.lang} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                          <span className="text-secondary font-medium">{l.lang}</span>
                          <span className="text-xs text-cosmic-cyan">{l.level}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-4 flex items-center gap-3">
                      <Award className="h-5 w-5 text-cosmic-orange" />
                      <div>
                        <p className="text-sm text-secondary font-medium">Photography Certification</p>
                        <p className="text-xs text-muted">Creative & Visual Arts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        </section>

        {/* ============================================
            TESTIMONIALS
        ============================================ */}
        <section
          id="testimonials"
          className="relative px-6 py-20"
          aria-labelledby="testimonials-heading"
        >
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-orange">Feedback</p>
              <h2 id="testimonials-heading" className="text-2xl font-semibold text-primary md:text-3xl">
                What Clients Say
              </h2>
            </AnimatedText>

            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((testimonial, i) => (
                <AnimatedText key={i} animation="fade-in-up" delay={0.1 * i}>
                  <blockquote className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-6 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-cosmic-orange fill-cosmic-orange" />
                      ))}
                    </div>
                    <p className="text-secondary italic flex-grow mb-4">"{testimonial.quote}"</p>
                    <footer className="border-t border-white/8 pt-4">
                      <p className="text-primary font-medium">{testimonial.author}</p>
                      <p className="text-xs text-muted">{testimonial.role}</p>
                    </footer>
                  </blockquote>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            PHILOSOPHY / WHY WORK WITH ME
        ============================================ */}
        <section
          id="philosophy"
          className="relative px-6 py-20"
          aria-labelledby="philosophy-heading"
        >
          <div className="mx-auto max-w-3xl text-center">

            <AnimatedText animation="scale-in-glow">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Philosophy</p>
              <h2 id="philosophy-heading" className="text-2xl font-semibold text-primary mb-6 md:text-3xl">
                Why Work With Me?
              </h2>
            </AnimatedText>

            <AnimatedText animation="blur-in" delay={0.2}>
              <blockquote className="rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-8 mb-8">
                <p className="text-lg md:text-xl text-secondary italic leading-relaxed">
                  "I build software that is{' '}
                  <span className="text-cosmic-blue font-semibold">powerful inside</span>,{' '}
                  <span className="text-cosmic-purple font-semibold">delightful outside</span>, and{' '}
                  <span className="text-cosmic-pink font-semibold">purposeful always</span>."
                </p>
              </blockquote>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.3}>
              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                {[
                  { icon: Shield, title: "Quality First", desc: "Clean code, tested thoroughly, built to last" },
                  { icon: Zap, title: "Fast Delivery", desc: "Efficient workflows, clear communication" },
                  { icon: Palette, title: "User-Centric", desc: "Beautiful UX that users actually enjoy" }
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl">
                    <item.icon className="h-5 w-5 text-cosmic-cyan mx-auto mb-2" />
                    <h3 className="text-sm font-semibold text-primary mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.4}>
              <p className="text-xl font-semibold gradient-text">
                I build systems that scale and evolve with your business.
              </p>
            </AnimatedText>
          </div>
        </section>

        {/* ============================================
            CONTACT / CTA
        ============================================ */}
        <section
          id="contact"
          className="relative px-6 py-20"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-3xl text-center">

            <AnimatedText animation="fade-in-up">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Get in Touch</p>
              <h2 id="contact-heading" className="text-2xl font-semibold text-primary mb-3 md:text-4xl">
                Let's Build Something Amazing
              </h2>
              <p className="text-secondary mb-8 max-w-xl mx-auto">
                Have a project idea? Need a mobile app or AI solution?
                I'm always excited to discuss new opportunities and challenges.
              </p>
            </AnimatedText>

            {/* Contact Cards */}
            <AnimatedText animation="fade-in-up" delay={0.2}>
              <div className="grid gap-4 sm:grid-cols-3 mb-10">
                <a
                  href="mailto:gauravrathva8@gmail.com"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-blue/30 transition-all card-hover"
                  aria-label="Send email to Gaurav"
                >
                  <Mail className="h-6 w-6 text-cosmic-blue mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Email</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">gauravrathva8@gmail.com</p>
                </a>
                <a
                  href="tel:+919265681173"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-purple/30 transition-all card-hover"
                  aria-label="Call Gaurav"
                >
                  <Phone className="h-6 w-6 text-cosmic-purple mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">Phone</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">+91 9265681173</p>
                </a>
                <a
                  href="https://www.linkedin.com/in/gauravrathva-4aa815224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/12 bg-black/40 backdrop-blur-2xl p-5 hover:border-cosmic-pink/30 transition-all card-hover"
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-cosmic-pink mx-auto mb-3" />
                  <p className="text-xs text-muted mb-1">LinkedIn</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">Let's Connect</p>
                </a>
              </div>
            </AnimatedText>

            {/* Primary CTA */}
            <AnimatedText animation="scale-in-glow" delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
                <a
                  href="mailto:gauravrathva8@gmail.com?subject=Project%20Inquiry&body=Hi%20Gaurav%2C%0A%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you.%0A%0AProject%20Type%3A%20%0ABudget%3A%20%0ATimeline%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
                  className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-8 py-4 text-base font-semibold text-white hover:shadow-xl hover:shadow-cosmic-purple/30 transition-all hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Start a Conversation
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/gauravrathva-4aa815224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-8 py-4 text-base font-medium text-secondary hover:border-white/30 hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </div>
            </AnimatedText>

            {/* Stats Reminder */}
            <AnimatedText animation="fade-in-up" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-8 mb-12 py-6 border-y border-white/8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="h-5 w-5 text-cosmic-cyan mx-auto mb-1" />
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedText>

            {/* Footer */}
            <footer className="text-center">
              <p className="text-sm text-muted mb-2">
                © {new Date().getFullYear()} Gaurav Rathva. Built with Next.js, Three.js & ❤️
              </p>
              <p className="text-xs text-muted">
                Vadodara, India • Open to remote opportunities worldwide
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
