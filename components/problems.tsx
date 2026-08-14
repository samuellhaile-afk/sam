"use client";

import { motion } from "framer-motion";
import { FileWarning, UserX, PhoneMissed, Repeat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const PROBLEMS = [
  {
    icon: FileWarning,
    title: "Manual Admin Work",
    description:
      "Too much time spent entering data, updating spreadsheets, and managing repetitive tasks.",
  },
  {
    icon: UserX,
    title: "Missed Leads",
    description:
      "Potential customers leave because nobody responds quickly enough.",
  },
  {
    icon: PhoneMissed,
    title: "Slow Customer Support",
    description:
      "Customers expect instant answers but your team can't be available 24/7.",
  },
  {
    icon: Repeat,
    title: "Repetitive Processes",
    description:
      "Employees spend valuable hours performing tasks AI can complete automatically.",
  },
];

export function Problems() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Problem"
          title="Stop Wasting Time on Repetitive Work"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
                <problem.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
