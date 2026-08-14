"use client";

import { motion } from "framer-motion";
import { Timer, Zap, TrendingUp, ScissorsLineDashed, Infinity as InfinityIcon, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const STATS = [
  {
    icon: Timer,
    value: <><AnimatedCounter value={10} />&ndash;<AnimatedCounter value={20} /></>,
    label: "Hours Saved Every Week",
  },
  {
    icon: Zap,
    value: "Seconds",
    label: "Average Customer Response Time",
  },
  {
    icon: TrendingUp,
    value: <>+<AnimatedCounter value={35} suffix="%" /></>,
    label: "Increase in Lead Conversion",
  },
  {
    icon: ScissorsLineDashed,
    value: <><AnimatedCounter value={80} suffix="%" /></>,
    label: "Reduction in Manual Work",
  },
  {
    icon: InfinityIcon,
    value: "24/7",
    label: "Availability for Your Customers",
  },
  {
    icon: Rocket,
    value: "0 New Hires",
    label: "Needed to Scale Your Business",
  },
];

export function Results() {
  return (
    <section id="results" className="scroll-mt-20 py-20 sm:py-28">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-brand-gradient-soft" />
        <Container>
          <SectionHeading eyebrow="Real Impact" title="Real Business Results" />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue dark:text-white">
                  <stat.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
