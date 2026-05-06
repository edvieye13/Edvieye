import { motion, useReducedMotion } from 'framer-motion';

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <motion.div
      className={`max-w-3xl ${alignment} ${className}`.trim()}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-cyan">{eyebrow}</div>
      <h2 id={id} className="mb-6 font-display text-4xl font-bold md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
    </motion.div>
  );
}

export default SectionHeading;

