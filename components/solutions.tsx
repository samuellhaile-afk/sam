"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Workflow,
  Users,
  Mail,
  CalendarCheck,
  BrainCircuit,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const SOLUTIONS = [
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Answer customer questions instantly around the clock.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Connect your business systems and eliminate repetitive work.",
  },
  {
    icon: Users,
    title: "CRM Integration",
    description: "Automatically capture, qualify, and organize leads.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description: "Send personalized follow-ups without lifting a finger.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    description: "Allow AI to schedule meetings directly into your calendar.",
  },
  {
    icon: BrainCircuit,
    title: "AI Knowledge Assistant",
    description:
      "Instantly search company documents and answer employee questions.",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Solutions"
          title="AI Solutions Built Around Your Business"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((solution, i) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient-soft text-brand-blue dark:text-white">
                <solution.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">
                {solution.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
