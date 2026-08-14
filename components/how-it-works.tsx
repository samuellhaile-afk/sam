"use client";

import { motion } from "framer-motion";
import { CalendarClock, Cpu, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    icon: CalendarClock,
    number: "01",
    title: "Book Your Free Consultation",
    description:
      "We'll learn about your business and identify opportunities for automation.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "We Build Your AI System",
    description:
      "Custom AI workflows are designed specifically for your processes.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Watch Your Business Scale",
    description:
      "Save time, improve customer experience, and generate more revenue.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How It Works" title="Get Started in Three Simple Steps" />

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10 sm:block"
          />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span className="relative z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <step.icon className="h-8 w-8" />
              </span>
              <span className="mt-4 text-sm font-semibold text-slate-400 dark:text-slate-500">
                Step {step.number}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
