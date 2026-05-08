import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ORBS = [
  {
    className: 'left-[41%] top-[28%] h-4 w-4 sm:h-5 sm:w-5',
    colorClass: 'bg-sky-300/70',
    duration: 4.6,
    delay: 0,
    x: 10,
    y: -16,
  },
  {
    className: 'left-[65%] top-[57%] h-7 w-7 sm:h-9 sm:w-9',
    colorClass: 'bg-sky-300/65',
    duration: 6,
    delay: 0.45,
    x: -14,
    y: 18,
  },
  {
    className: 'left-[42%] top-[77%] h-10 w-10 sm:h-12 sm:w-12',
    colorClass: 'bg-sky-400/45',
    duration: 7.2,
    delay: 0.9,
    x: 8,
    y: -14,
  },
];

const GLOW_PARTICLES = [
  {
    className: 'left-[12%] top-[18%] h-16 w-16 sm:h-24 sm:w-24',
    colorClass: 'bg-sky-300/[0.12]',
    duration: 12,
    delay: 0.4,
    x: 24,
    y: -16,
  },
  {
    className: 'left-[18%] top-[64%] h-12 w-12 sm:h-16 sm:w-16',
    colorClass: 'bg-blue-400/[0.12]',
    duration: 11.5,
    delay: 1.1,
    x: -20,
    y: 24,
  },
  {
    className: 'left-[32%] top-[82%] h-14 w-14 sm:h-20 sm:w-20',
    colorClass: 'bg-sky-300/[0.10]',
    duration: 13,
    delay: 0.8,
    x: 18,
    y: -20,
  },
  {
    className: 'left-[74%] top-[20%] h-14 w-14 sm:h-20 sm:w-20',
    colorClass: 'bg-blue-400/[0.12]',
    duration: 10.5,
    delay: 0.3,
    x: -18,
    y: 18,
  },
  {
    className: 'left-[86%] top-[56%] h-10 w-10 sm:h-14 sm:w-14',
    colorClass: 'bg-sky-300/[0.10]',
    duration: 12.4,
    delay: 1.4,
    x: 16,
    y: -22,
  },
  {
    className: 'left-[68%] top-[84%] h-16 w-16 sm:h-24 sm:w-24',
    colorClass: 'bg-blue-400/[0.10]',
    duration: 13.6,
    delay: 1.8,
    x: -24,
    y: 14,
  },
];

function HeroBackdrop() {
  const stars = useMemo(
    () =>
      Array.from({ length: 130 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: index % 11 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
        duration: `${3 + Math.random() * 5}s`,
        delay: `${Math.random() * 4}s`,
        opacity: 0.2 + Math.random() * 0.8,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Decorative layers approximate the glowing mesh and star field from the reference hero. */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star-dot absolute rounded-full bg-white/80 animate-twinkle"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {GLOW_PARTICLES.map((particle) => (
        <motion.div
          key={particle.className}
          className={`absolute rounded-full ${particle.className} ${particle.colorClass} blur-3xl`}
          animate={{
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
            scale: [1, 1.1, 1],
            opacity: [0.28, 0.52, 0.28],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      <div className="absolute left-1/2 top-[51%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/10 blur-[120px]" />
      <div className="absolute left-1/2 top-[51%] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.13] blur-[94px]" />

      <div
        className="absolute left-1/2 top-[51%] h-[23rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-[47%_53%_61%_39%/52%_37%_63%_48%] opacity-70 sm:h-[30rem] sm:w-[30rem] lg:h-[34rem] lg:w-[34rem]"
        style={{
          background:
            'radial-gradient(circle at 40% 34%, rgba(125,240,255,0.96), rgba(53,214,240,0.74) 34%, rgba(16,151,173,0.48) 64%, transparent 84%)',
        }}
      />

      {ORBS.map((orb) => (
        <motion.div
          key={orb.className}
          className={`absolute rounded-full ${orb.className} ${orb.colorClass} shadow-[0_0_18px_rgba(96,165,250,0.28)]`}
          animate={{
            x: [0, orb.x, 0],
            y: [0, orb.y, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

export default HeroBackdrop;
