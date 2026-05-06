import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ORBS = [
  {
    className: 'left-[41%] top-[28%] h-4 w-4 sm:h-5 sm:w-5',
    colorClass: 'bg-neon-cyan',
    duration: 4.6,
    delay: 0,
    x: 10,
    y: -16,
  },
  {
    className: 'left-[65%] top-[57%] h-7 w-7 sm:h-9 sm:w-9',
    colorClass: 'bg-neon-cyan',
    duration: 6,
    delay: 0.45,
    x: -14,
    y: 18,
  },
  {
    className: 'left-[40%] top-[76%] h-10 w-10 sm:h-12 sm:w-12',
    colorClass: 'bg-teal-400/70',
    duration: 7.2,
    delay: 0.9,
    x: 8,
    y: -14,
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

      <div className="absolute left-1/2 top-[54%] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/15 blur-[120px]" />
      <div className="absolute left-1/2 top-[54%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/20 blur-[90px]" />

      <div
        className="absolute left-1/2 top-[54%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-[47%_53%_61%_39%/52%_37%_63%_48%] opacity-80 sm:h-[28rem] sm:w-[28rem] lg:h-[30rem] lg:w-[30rem]"
        style={{
          background:
            'radial-gradient(circle at 32% 30%, rgba(125, 240, 255, 0.95), rgba(34, 211, 238, 0.72) 38%, rgba(8, 145, 178, 0.42) 70%, transparent 100%)',
        }}
      />

      {ORBS.map((orb) => (
        <motion.div
          key={orb.className}
          className={`absolute rounded-full ${orb.className} ${orb.colorClass} shadow-[0_0_28px_rgba(34,211,238,0.65)]`}
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

