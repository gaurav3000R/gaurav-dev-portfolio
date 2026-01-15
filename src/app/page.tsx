'use client';

import { SpaceBackground } from '@/components/canvas';
import {
  AnimatedText,
  FloatingElement,
} from '@/components/ui/AnimatedText';
import {
  Smartphone, Globe, Brain, Zap, Building2, Target,
  Code2, Cpu, GitBranch, Layers, Rocket,
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

        {/* ============================================
            HERO SECTION
        ============================================ */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
          <div className="max-w-3xl text-center">

            {/* Greeting Badge */}
            <AnimatedText animation="fade-in-up" delay={0}>
              <div className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <p className="text-sm text-secondary">👋 Hello, I'm</p>
              </div>
            </AnimatedText>

            {/* Name - Display Font */}
            <AnimatedText animation="scale-in-glow" delay={0.2}>
              <h1 className="font-display mb-3 text-4xl font-bold tracking-wide text-primary md:text-6xl lg:text-7xl gradient-text animate-gradient">
                GAURAV RATHVA
              </h1>
            </AnimatedText>

            {/* Role */}
            <AnimatedText animation="fade-in-up" delay={0.3}>
              <p className="mb-6 text-lg text-cosmic-cyan md:text-xl font-medium">
                Software Engineer • Mobile & AI Builder
              </p>
            </AnimatedText>

            {/* Tech Pills */}
            <AnimatedText animation="fade-in-up" delay={0.4}>
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {["Flutter", "React Native", "Android", "React.js", "Next.js", "Python", "LangChain"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-secondary backdrop-blur-sm hover:border-cosmic-blue/30 hover:text-primary transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedText>

            {/* Bio - Simple & Clear */}
            <AnimatedText animation="blur-in" delay={0.5}>
              <p className="mx-auto mb-8 max-w-2xl text-base text-secondary leading-relaxed">
                I build <span className="text-cosmic-blue font-medium">mobile apps</span> and{' '}
                <span className="text-cosmic-purple font-medium">AI systems</span> that work beautifully.
                3+ years crafting cross-platform experiences with Flutter, React Native, and modern AI tools.
              </p>
            </AnimatedText>

            {/* Contact Row */}
            <AnimatedText animation="fade-in-up" delay={0.6}>
              <div className="mb-8 flex flex-wrap justify-center gap-5 text-sm text-muted">
                <a href="tel:9265681173" className="flex items-center gap-1.5 hover:text-cosmic-cyan transition-colors">
                  <Phone className="h-4 w-4" />
                  +91 9265681173
                </a>
                <a href="mailto:gauravrathva8@gmail.com" className="flex items-center gap-1.5 hover:text-cosmic-cyan transition-colors">
                  <Mail className="h-4 w-4" />
                  gauravrathva8@gmail.com
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Vadodara, India
                </span>
              </div>
            </AnimatedText>

            {/* CTA Buttons */}
            <AnimatedText animation="fade-in-up" delay={0.7}>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#contact"
                  className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-cosmic-purple/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Let's Connect
                  </span>
                </a>
                <a
                  href="#experience"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-secondary backdrop-blur-sm transition-all hover:border-white/30 hover:text-primary flex items-center justify-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  My Experience
                </a>
              </div>
            </AnimatedText>

            {/* Scroll Hint */}
            <FloatingElement speed="slow" className="mt-14">
              <div className="flex flex-col items-center gap-2 text-muted">
                <p className="text-xs uppercase tracking-widest">Explore</p>
                <div className="h-6 w-px bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </FloatingElement>
          </div>
        </section>

        {/* ============================================
            WHAT I DO
        ============================================ */}
        <section id="what-i-do" className="relative px-6 py-20">
          <div className="mx-auto max-w-5xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Expertise</p>
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                What I Build
              </h2>
            </AnimatedText>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile Apps",
                  desc: "Cross-platform apps with Flutter & React Native",
                  color: "cosmic-blue"
                },
                {
                  icon: Code2,
                  title: "Android",
                  desc: "Native Android development with Java",
                  color: "cosmic-teal"
                },
                {
                  icon: Globe,
                  title: "Web Apps",
                  desc: "Modern web with React, Next.js & Node",
                  color: "cosmic-purple"
                },
                {
                  icon: Brain,
                  title: "AI Systems",
                  desc: "LangChain, RAG, and local LLM solutions",
                  color: "cosmic-orange"
                },
                {
                  icon: Zap,
                  title: "Agentic AI",
                  desc: "Intelligent automation workflows",
                  color: "cosmic-pink"
                },
                {
                  icon: Layers,
                  title: "Architecture",
                  desc: "Clean, scalable system design",
                  color: "cosmic-cyan"
                }
              ].map((item, i) => (
                <AnimatedText key={i} animation="fade-in-up" delay={0.08 * i}>
                  <div className="group rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm transition-all hover:border-white/15 hover:bg-white/5 card-hover h-full">
                    <item.icon className={`h-5 w-5 text-${item.color} mb-3`} />
                    <h3 className="text-base font-semibold text-primary mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            EXPERIENCE
        ============================================ */}
        <section id="experience" className="relative px-6 py-20 bg-gradient-to-b from-transparent via-white/2 to-transparent">
          <div className="mx-auto max-w-3xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Career</p>
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                Work Experience
              </h2>
            </AnimatedText>

            <div className="space-y-5">

              {/* Current Job */}
              <AnimatedText animation="fade-in-left" delay={0.1}>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm hover:border-white/15 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="inline-block rounded-full bg-cosmic-blue/20 px-2 py-0.5 text-xs text-cosmic-blue font-medium mb-2">
                        Current
                      </span>
                      <h3 className="text-lg font-semibold text-primary">Software Engineer</h3>
                      <p className="text-sm text-cosmic-cyan flex items-center gap-1.5 mt-0.5">
                        <Building2 className="h-3.5 w-3.5" />
                        Digiflux IT Solutions
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted">
                      <p>Jul 2022 – Present</p>
                      <p className="text-xs">Vadodara</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary mb-3">
                    Building cross-platform mobile and web apps using Flutter, React Native, and modern AI tools.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Flutter", "React Native", "Next.js", "Python", "LangChain"].map((s) => (
                      <span key={s} className="rounded-full border border-cosmic-blue/20 bg-cosmic-blue/10 px-2 py-0.5 text-xs text-cosmic-blue">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedText>

              {/* Previous Job */}
              <AnimatedText animation="fade-in-right" delay={0.2}>
                <div className="rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm hover:border-white/15 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">Android Developer</h3>
                      <p className="text-sm text-cosmic-purple flex items-center gap-1.5 mt-0.5">
                        <Building2 className="h-3.5 w-3.5" />
                        MDU Santisolution Pvt Ltd
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted">
                      <p>Jan – Mar 2022</p>
                      <p className="text-xs">3 months</p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cosmic-teal mt-0.5 flex-shrink-0" />
                    Built a complete eCommerce Android application
                  </p>
                </div>
              </AnimatedText>
            </div>
          </div>
        </section>

        {/* ============================================
            CURRENT FOCUS
        ============================================ */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-pink">Learning</p>
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                Current Focus
              </h2>
            </AnimatedText>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Cpu, title: "Local LLMs", color: "cosmic-blue" },
                { icon: Brain, title: "Agentic AI", color: "cosmic-purple" },
                { icon: Rocket, title: "Next.js", color: "cosmic-orange" },
                { icon: Zap, title: "AI + UX", color: "cosmic-teal" }
              ].map((item, i) => (
                <AnimatedText key={i} animation="scale-in-glow" delay={0.1 * i}>
                  <div className="rounded-xl border border-white/8 bg-white/3 p-5 text-center backdrop-blur-sm hover:border-white/15 transition-all card-hover">
                    <item.icon className={`h-6 w-6 text-${item.color} mx-auto mb-2`} />
                    <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            TECH STACK
        ============================================ */}
        <section className="relative px-6 py-20 bg-gradient-to-b from-transparent via-white/2 to-transparent">
          <div className="mx-auto max-w-4xl">

            <AnimatedText animation="fade-in-up" className="mb-10 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Technologies</p>
              <h2 className="text-2xl font-semibold text-primary md:text-3xl">
                Tech Stack
              </h2>
            </AnimatedText>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Smartphone, title: "Mobile", techs: ["Flutter", "React Native", "Android", "Dart"], color: "cosmic-blue" },
                { icon: Globe, title: "Web", techs: ["React", "Next.js", "Node.js", "TypeScript"], color: "cosmic-purple" },
                { icon: Brain, title: "AI", techs: ["Python", "LangChain", "RAG", "Local LLMs"], color: "cosmic-orange" },
                { icon: GitBranch, title: "Tools", techs: ["Git", "Agile", "System Design"], color: "cosmic-teal" }
              ].map((stack, i) => (
                <AnimatedText key={i} animation="fade-in-up" delay={0.08 * i}>
                  <div className="rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <stack.icon className={`h-4 w-4 text-${stack.color}`} />
                      <h3 className={`text-sm font-semibold text-${stack.color}`}>{stack.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stack.techs.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-secondary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            EDUCATION & LANGUAGES
        ============================================ */}
        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 lg:grid-cols-2">

              {/* Education */}
              <AnimatedText animation="fade-in-left">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Education</p>
                  <h2 className="text-xl font-semibold text-primary mb-4">Background</h2>
                  <div className="rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm">
                    <GraduationCap className="h-5 w-5 text-cosmic-purple mb-3" />
                    <h3 className="text-base font-semibold text-primary mb-1">BCA in IT</h3>
                    <p className="text-sm text-cosmic-cyan mb-0.5">MS University of Baroda</p>
                    <p className="text-xs text-muted">2020 – 2022</p>
                  </div>
                </div>
              </AnimatedText>

              {/* Languages */}
              <AnimatedText animation="fade-in-right" delay={0.1}>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-teal">Languages</p>
                  <h2 className="text-xl font-semibold text-primary mb-4">I Speak</h2>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm">
                      {[
                        { lang: "English", level: "Professional" },
                        { lang: "Hindi", level: "Native" },
                        { lang: "Gujarati", level: "Native" }
                      ].map((l) => (
                        <div key={l.lang} className="flex justify-between text-sm py-1">
                          <span className="text-secondary">{l.lang}</span>
                          <span className="text-xs text-cosmic-cyan">{l.level}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm flex items-center gap-2 text-sm text-secondary">
                      <Award className="h-4 w-4 text-cosmic-orange" />
                      Photography Certification
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        </section>

        {/* ============================================
            PHILOSOPHY
        ============================================ */}
        <section className="relative px-6 py-20 bg-gradient-to-b from-transparent via-white/2 to-transparent">
          <div className="mx-auto max-w-2xl text-center">

            <AnimatedText animation="scale-in-glow">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-purple">Philosophy</p>
              <h2 className="text-2xl font-semibold text-primary mb-6 md:text-3xl">
                How I Work
              </h2>
            </AnimatedText>

            <AnimatedText animation="blur-in" delay={0.2}>
              <blockquote className="rounded-xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm mb-4">
                <p className="text-base text-secondary italic leading-relaxed">
                  "Build things that are{' '}
                  <span className="text-cosmic-blue font-medium">powerful inside</span>,{' '}
                  <span className="text-cosmic-purple font-medium">smooth outside</span>, and{' '}
                  <span className="text-cosmic-pink font-medium">purposeful always</span>."
                </p>
              </blockquote>
            </AnimatedText>

            <AnimatedText animation="fade-in-up" delay={0.3}>
              <p className="text-lg font-semibold gradient-text">
                I build systems that scale and evolve.
              </p>
            </AnimatedText>
          </div>
        </section>

        {/* ============================================
            CONTACT
        ============================================ */}
        <section id="contact" className="relative px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">

            <AnimatedText animation="fade-in-up">
              <p className="mb-2 text-xs uppercase tracking-widest text-cosmic-blue">Contact</p>
              <h2 className="text-2xl font-semibold text-primary mb-3 md:text-3xl">
                Let's Work Together
              </h2>
              <p className="text-sm text-secondary mb-8">
                Building <span className="text-cosmic-blue">AI products</span>,{' '}
                <span className="text-cosmic-purple">mobile apps</span>, or something new?
              </p>
            </AnimatedText>

            {/* Contact Cards */}
            <AnimatedText animation="fade-in-up" delay={0.2}>
              <div className="grid gap-3 sm:grid-cols-3 mb-8">
                <a href="mailto:gauravrathva8@gmail.com" className="group rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm hover:border-cosmic-blue/30 transition-all card-hover">
                  <Mail className="h-5 w-5 text-cosmic-blue mx-auto mb-2" />
                  <p className="text-xs text-muted mb-0.5">Email</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors truncate">gauravrathva8@gmail.com</p>
                </a>
                <a href="tel:9265681173" className="group rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm hover:border-cosmic-purple/30 transition-all card-hover">
                  <Phone className="h-5 w-5 text-cosmic-purple mx-auto mb-2" />
                  <p className="text-xs text-muted mb-0.5">Phone</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">+91 9265681173</p>
                </a>
                <a href="https://www.linkedin.com/in/gauravrathva-4aa815224" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/8 bg-white/3 p-4 backdrop-blur-sm hover:border-cosmic-pink/30 transition-all card-hover">
                  <Linkedin className="h-5 w-5 text-cosmic-pink mx-auto mb-2" />
                  <p className="text-xs text-muted mb-0.5">LinkedIn</p>
                  <p className="text-sm text-secondary group-hover:text-primary transition-colors">Connect</p>
                </a>
              </div>
            </AnimatedText>

            {/* CTA */}
            <AnimatedText animation="scale-in-glow" delay={0.3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-10">
                <a href="mailto:gauravrathva8@gmail.com" className="group rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-purple px-6 py-3 text-sm font-medium text-white hover:shadow-lg hover:shadow-cosmic-purple/30 transition-all">
                  <span className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/gauravrathva-4aa815224" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-secondary hover:border-white/30 hover:text-primary transition-all flex items-center justify-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </AnimatedText>

            {/* Footer */}
            <div className="border-t border-white/8 pt-6">
              <p className="text-xs text-muted">
                © 2026 Gaurav Rathva • Built with Next.js & Three.js
              </p>
              <p className="text-xs text-muted mt-1">
                Vadodara, India • Open to opportunities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
