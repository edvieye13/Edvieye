import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Target } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import { aboutHighlights } from '../data/site';

const iconMap = {
  mission: Target,
  vision: Rocket,
  trust: ShieldCheck,
};

function AboutSection() {
  return (
    <section id="about" className="relative py-32" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-cyan">
                About Edvieye
              </div>
              <h2
                id="about-heading"
                className="mb-6 font-display text-4xl font-bold md:text-5xl lg:text-6xl"
              >
                Building the <span className="text-gradient">future</span> of education
                infrastructure
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Edvieye Private Limited is an AI-first technology company on a mission to give
                every educational institution the same caliber of intelligent software that
                powers the world&apos;s leading enterprises.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="leading-relaxed text-muted-foreground">
                From a single classroom to a 50-campus network, our ERP scales effortlessly —
                combining beautiful design, deep automation and cutting-edge machine learning.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {aboutHighlights.map((item, index) => {
              const Icon = iconMap[item.key];

              return (
                <motion.article
                  key={item.title}
                  className="glass-card flex gap-5 p-6 transition-colors hover:border-neon-cyan/40"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

