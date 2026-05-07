import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import logoReference from '../assets/edvieye-logo-reference.png';
import HeroBackdrop from '../components/hero/HeroBackdrop';
import { heroStats } from '../data/site';

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden grid-bg"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-0">
        <HeroBackdrop />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="container relative z-10 pb-20 pt-32 text-center">
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <Sparkles className="h-3.5 w-3.5 text-neon-cyan" />
          <span className="text-xs font-medium text-foreground/80">
            Introducing Edvieye AI v2.0
          </span>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.3 }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="relative mx-auto mt-10 mb-4 flex w-fit justify-center"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.42 }}
        >
          <div
            className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.5),rgba(59,130,246,0.22)_55%,transparent_78%)] blur-3xl"
            aria-hidden="true"
          />
          <img
            src={logoReference}
            alt="EDVIEYE Logo"
            className="relative w-32 animate-float object-contain drop-shadow-[0_0_25px_rgba(56,189,248,0.55)] md:w-44 lg:w-48"
          />
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="mt-6 font-display text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.55 }}
        >
          <span className="text-foreground">AI FLOW,</span>
          <br />
          <span className="text-gradient">EDUCATION GLOW.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.68 }}
        >
          The operating system for modern schools. Automate operations, unlock predictive
          insights, and elevate every classroom with Edvieye.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105 neon-glow"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-neon-cyan/50"
          >
            Watch Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
