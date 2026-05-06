import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  BrainCircuit,
  LayoutDashboard,
  ScanFace,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { features } from '../data/site';

const iconMap = {
  students: UsersRound,
  analytics: BrainCircuit,
  fees: WalletCards,
  attendance: ScanFace,
  curriculum: BookOpenCheck,
  dashboards: LayoutDashboard,
};

function FeatureCard({ feature, index }) {
  const Icon = iconMap[feature.key];

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.setProperty('--x', '50%');
    event.currentTarget.style.setProperty('--y', '50%');
  };

  return (
    <motion.article
      className="group relative glass-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-neon-cyan/40"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--x': '50%', '--y': '50%' }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), hsl(var(--neon-cyan) / 0.08), transparent 40%)',
        }}
      />

      <div className="relative">
        <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 transition-shadow group-hover:neon-glow">
          <Icon className="h-5 w-5 text-neon-cyan" />
        </div>
        <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
      </div>
    </motion.article>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative py-32" aria-labelledby="features-heading">
      <div className="container">
        <SectionHeading
          id="features-heading"
          eyebrow="Platform"
          title={
            <>
              One platform. <span className="text-gradient">Every workflow.</span>
            </>
          }
          description="Edvieye unifies your entire institution under a single intelligent ERP — designed for the AI-first era of education."
          className="mb-20"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

