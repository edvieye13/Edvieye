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
      className="relative flex min-w-0 flex-col items-center justify-center px-1 py-3 text-center sm:px-4 sm:py-4"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.78 + index * 0.08 }}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:h-9 sm:w-9">
        <Icon className="h-3.5 w-3.5 text-sky-300/90 sm:h-4 sm:w-4" />
      </div>
      <div className="mt-2.5 min-w-0">
        <div className="hero-number-glow font-display tabular-nums text-[clamp(1.2rem,3.7vw,2.85rem)] font-semibold leading-none tracking-[-0.05em] text-white">
          <CountUp
            end={stat.end}
            duration={reducedMotion ? 0 : stat.duration}
            delay={reducedMotion ? 0 : 0.22 + index * 0.08}
            decimals={stat.decimals ?? 0}
            suffix={stat.suffix ?? ''}
            decimal="."
          />
        </div>
        <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
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
          className="relative mx-auto mt-12 w-full max-w-4xl"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...transition, delay: 0.58 }}
        >
          <div className="relative flex min-h-[24rem] flex-col items-center justify-end px-1 pb-2 sm:min-h-[30rem] sm:px-4 lg:min-h-[33rem]">
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] bg-[radial-gradient(circle,rgba(96,165,250,0.15),rgba(15,23,42,0.02)_66%,transparent_74%)] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:h-[25rem] sm:w-[25rem] lg:h-[30rem] lg:w-[30rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] opacity-60 sm:h-[31rem] sm:w-[31rem] lg:h-[36rem] lg:w-[36rem]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[52%] h-16 w-[72%] max-w-xl -translate-x-1/2 rounded-full bg-neon-blue/[0.12] blur-3xl"
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10 flex w-full flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 }}
            >
              <div className="relative flex w-full items-center justify-center translate-y-3 sm:translate-y-4">
                <div
                  className="pointer-events-none absolute inset-x-16 bottom-7 h-12 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),rgba(56,189,248,0.12)_42%,transparent_78%)] blur-3xl"
                  aria-hidden="true"
                />
                <img
                  src={logoReference}
                  alt="EDVIEYE Logo"
                  className="relative mx-auto w-[12.75rem] animate-float object-contain drop-shadow-[0_0_22px_rgba(96,165,250,0.24)] sm:w-[18.5rem] lg:w-[21.5rem]"
                />
              </div>

              <motion.div
                className="relative mt-5 w-full max-w-3xl sm:mt-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.82 }}
              >
                <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-950/[0.28] px-1.5 py-1.5 shadow-[0_16px_46px_rgba(2,8,23,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:px-3 sm:py-2">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.09),transparent_52%)]" />
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
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
