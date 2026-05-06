import { motion } from 'framer-motion';
import { Award, ClipboardCheck, TriangleAlert, UsersRound } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import {
  dashboardMonths,
  dashboardRanges,
  dashboardSeries,
  dashboardStats,
} from '../data/site';

const iconMap = {
  students: UsersRound,
  grade: Award,
  attendance: ClipboardCheck,
  risk: TriangleAlert,
};

function DemoSection() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden py-32"
      aria-labelledby="demo-heading"
    >
      <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

      <div className="container">
        <SectionHeading
          id="demo-heading"
          eyebrow="Live Preview"
          title={
            <>
              Your school&apos;s <span className="text-gradient">command center</span>
            </>
          }
          className="mb-16"
        />

        <motion.div
          className="relative mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-neon-cyan/30 via-neon-blue/30 to-neon-purple/30 opacity-50 blur-3xl" />

          {/* Mock dashboard mirrors the static preview block from the reference site. */}
          <div className="glass-card animate-float p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold">Principal Dashboard</h3>
                <p className="mt-1 text-xs text-muted-foreground">Live · Updated now</p>
              </div>

              <div className="flex gap-2">
                {dashboardRanges.map((range, index) => (
                  <button
                    key={range}
                    type="button"
                    className={`rounded-md px-3 py-1 text-xs ${
                      index === 2
                        ? 'border border-neon-cyan/40 bg-neon-cyan/20 text-neon-cyan'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {dashboardStats.map((item) => {
                const Icon = iconMap[item.key];

                return (
                  <motion.div
                    key={item.label}
                    className="rounded-xl border border-border/50 bg-secondary/40 p-4"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <Icon className="h-4 w-4 text-neon-cyan" />
                      <span className="text-[10px] text-emerald-400">{item.trend}</span>
                    </div>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-[11px] text-muted-foreground">{item.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="rounded-xl border border-border/50 bg-secondary/30 p-6">
              <div className="flex h-40 items-end gap-2">
                {dashboardSeries.map((value, index) => (
                  <motion.div
                    key={`${dashboardMonths[index]}-${value}`}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-neon-blue to-neon-cyan opacity-80 transition-all hover:opacity-100"
                    initial={{ height: 0, opacity: 0.3 }}
                    whileInView={{ height: `${value}%`, opacity: 0.8 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </div>

              <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
                {dashboardMonths.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DemoSection;

