import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import CountUp from 'react-countup';
import logoReference from '../assets/edvieye-logo-reference.png';
import HeroBackdrop from '../components/hero/HeroBackdrop';
import { heroStats } from '../data/site';

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

function HeroStat({ stat, index, reducedMotion }) {
  return (
    <motion.div
      className="relative flex min-w-0 flex-col items-center justify-center px-3 py-2 text-center"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.72 + index * 0.08 }}
    >
      <div className="hero-number-glow font-display tabular-nums text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-none tracking-[-0.05em] text-sky-300">
        <CountUp
          end={stat.end}
          duration={reducedMotion ? 0 : stat.duration}
          delay={reducedMotion ? 0 : 0.22 + index * 0.08}
          decimals={stat.decimals ?? 0}
          suffix={stat.suffix ?? ''}
          decimal="."
        />
      </div>
      <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/52 sm:text-[11px]">
        {stat.label}
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden grid-bg"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-0">
        <HeroBackdrop />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-center pb-24 pt-36 text-center sm:pb-28 sm:pt-40">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-slate-950/35 px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
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
          className="mx-auto mt-14 w-full max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.18 }}
        >
          <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
            {heroStats.map((stat, index) => (
              <HeroStat
                key={stat.key}
                stat={stat}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative mt-14 flex w-full justify-center"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.3 }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.24),rgba(59,130,246,0.08)_55%,transparent_76%)] blur-3xl sm:h-44 sm:w-44"
            aria-hidden="true"
          />
          <div className="relative rounded-[1.15rem] border border-white/12 bg-white/[0.96] p-2 shadow-[0_18px_40px_rgba(2,8,23,0.28)] sm:p-2.5">
            <img
              src={logoReference}
              alt="EDVIEYE Logo"
              className="w-[8.75rem] object-contain sm:w-[10.5rem] md:w-[11.5rem]"
            />
          </div>
        </motion.div>

        <motion.h1
          id="hero-heading"
          className="mt-10 max-w-6xl text-balance font-display text-[clamp(3.2rem,8vw,7.2rem)] font-bold leading-[0.94] tracking-[-0.07em]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.38 }}
        >
          <span className="text-gradient">AI Powered ERP</span>
          <br />
          <span className="text-foreground">for Smart Education</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-7 max-w-3xl text-balance text-base leading-relaxed text-slate-300/74 sm:text-lg md:text-[1.05rem] md:leading-[1.65]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.48 }}
        >
          The operating system for modern schools. Automate operations, unlock predictive
          insights, and elevate every classroom with Edvieye.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.58 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#28d6ff,#4e86ff)] px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_16px_42px_rgba(34,211,238,0.22)] transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(34,211,238,0.28)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 px-8 py-3.5 text-sm font-semibold text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-colors hover:border-white/18 hover:bg-white/[0.04]"
          >
            Watch Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
