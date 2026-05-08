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
      className="relative flex min-w-0 flex-col items-center justify-center px-2 py-4 text-center sm:px-5 sm:py-5"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.78 + index * 0.08 }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-11 sm:w-11">
        <Icon className="h-4 w-4 text-sky-300/90 sm:h-[1.05rem] sm:w-[1.05rem]" />
      </div>
      <div className="mt-3 min-w-0">
        <div className="hero-number-glow font-display tabular-nums text-[clamp(1.55rem,5vw,3.45rem)] font-semibold leading-none tracking-[-0.055em] text-white">
          <CountUp
            end={stat.end}
            duration={reducedMotion ? 0 : stat.duration}
            delay={reducedMotion ? 0 : 0.22 + index * 0.08}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix ?? ''}
            decimal="."
          />
        </div>
        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-[11px]">
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
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
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,rgba(111,213,255,0.98),rgba(66,133,244,0.92))] px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_16px_38px_rgba(37,99,235,0.2),inset_0_1px_0_rgba(255,255,255,0.38)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(37,99,235,0.28)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/20 px-8 py-3.5 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.04]"
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
              className="pointer-events-none absolute left-1/2 top-[42%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] bg-[radial-gradient(circle,rgba(96,165,250,0.15),rgba(15,23,42,0.02)_66%,transparent_74%)] sm:h-[23rem] sm:w-[23rem] lg:h-[28rem] lg:w-[28rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-[30rem] sm:w-[30rem] lg:h-[35rem] lg:w-[35rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] opacity-60 sm:h-[37rem] sm:w-[37rem] lg:h-[43rem] lg:w-[43rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[54%] h-20 w-[78%] max-w-2xl -translate-x-1/2 rounded-full bg-neon-blue/[0.12] blur-3xl"
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10 flex w-full flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 }}
            >
              <div className="relative flex w-full items-center justify-center translate-y-5 sm:translate-y-6">
                <div
                  className="pointer-events-none absolute inset-x-12 bottom-8 h-14 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.26),rgba(56,189,248,0.14)_42%,transparent_78%)] blur-3xl"
                  aria-hidden="true"
                />
                <img
                  src={logoReference}
                  alt="EDVIEYE Logo"
                  className="relative mx-auto w-[16.25rem] animate-float object-contain drop-shadow-[0_0_26px_rgba(96,165,250,0.28)] sm:w-[24rem] lg:w-[28rem]"
                />
              </div>

              <motion.div
                className="relative mt-7 w-full max-w-4xl sm:mt-9"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.82 }}
              >
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950/[0.28] px-2 py-2 shadow-[0_20px_60px_rgba(2,8,23,0.38),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:px-4 sm:py-3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.09),transparent_52%)]" />
                  <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div className="relative grid grid-cols-3 divide-x divide-white/[0.08]">
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
