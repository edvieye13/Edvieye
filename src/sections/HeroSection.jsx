import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles, Users } from 'lucide-react';
import CountUp from 'react-countup';
import logoReference from '../assets/edvieye-logo-reference.png';
import HeroBackdrop from '../components/hero/HeroBackdrop';
import { heroStats } from '../data/site';

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };
const statIcons = {
  schools: GraduationCap,
  students: Users,
  uptime: ShieldCheck,
};

function HeroStat({ stat, index, reducedMotion }) {
  const Icon = statIcons[stat.key];

  return (
    <motion.div
      className="relative flex min-w-0 flex-col items-center rounded-[1.35rem] border border-white/8 bg-white/[0.03] px-2 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-4 sm:py-5"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.78 + index * 0.08 }}
    >
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent" />
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-cyan/20 bg-neon-blue/10 shadow-[0_0_26px_rgba(59,130,246,0.28)] sm:h-11 sm:w-11">
        <Icon className="h-4 w-4 text-neon-cyan sm:h-5 sm:w-5" />
      </div>
      <div className="mt-3 min-w-0">
        <div className="hero-number-glow text-[clamp(1.75rem,6vw,4rem)] font-semibold leading-none tracking-[-0.06em] text-sky-300">
          <CountUp
            end={stat.end}
            duration={reducedMotion ? 0 : stat.duration}
            delay={reducedMotion ? 0 : 0.22 + index * 0.08}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix ?? ''}
            decimal="."
          />
        </div>
        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.34em] text-white/60 sm:text-xs">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden grid-bg"
      aria-label="Edvieye hero"
    >
      <div className="absolute inset-0 -z-0">
        <HeroBackdrop />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="container relative z-10 flex flex-col items-center pb-16 pt-28 text-center sm:pb-20 sm:pt-32">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
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
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.45 }}
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

        <motion.div
          className="relative mx-auto mt-12 w-full max-w-5xl"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.58 }}
        >
          <div className="relative flex min-h-[29rem] flex-col items-center justify-end px-1 pb-2 sm:min-h-[36rem] sm:px-5 lg:min-h-[40rem]">
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(56,189,248,0.2),rgba(15,23,42,0.03)_66%,transparent_72%)] sm:h-[23rem] sm:w-[23rem] lg:h-[28rem] lg:w-[28rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/10 sm:h-[30rem] sm:w-[30rem] lg:h-[35rem] lg:w-[35rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-blue/10 opacity-70 sm:h-[37rem] sm:w-[37rem] lg:h-[43rem] lg:w-[43rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[54%] h-24 w-[78%] max-w-2xl -translate-x-1/2 rounded-full bg-neon-blue/20 blur-3xl"
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10 flex w-full flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 }}
            >
              <div className="relative flex w-full items-center justify-center translate-y-5 sm:translate-y-7">
                <div
                  className="pointer-events-none absolute inset-x-10 bottom-8 h-16 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.36),rgba(56,189,248,0.18)_44%,transparent_78%)] blur-3xl"
                  aria-hidden="true"
                />
                <img
                  src={logoReference}
                  alt="EDVIEYE Logo"
                  className="relative mx-auto w-[16.5rem] animate-float object-contain drop-shadow-[0_0_36px_rgba(56,189,248,0.45)] sm:w-[25rem] lg:w-[30rem]"
                />
              </div>

              <motion.div
                className="relative mt-8 w-full max-w-4xl sm:mt-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.82 }}
              >
                <div className="glass-card relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] px-2 py-2 shadow-[0_24px_80px_rgba(2,8,23,0.55)] sm:px-4 sm:py-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_54%)]" />
                  <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />
                  <div className="relative grid grid-cols-3 gap-2 sm:gap-4">
                    {heroStats.map((stat, index) => (
                      <HeroStat
                        key={stat.key}
                        stat={stat}
                        index={index}
                        reducedMotion={reducedMotion}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
