"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Real Estate Agency",
    quote:
      "Within two weeks our AI assistant was answering client questions instantly and booking appointments automatically.",
  },
  {
    name: "David R.",
    role: "Accounting Firm",
    quote: "We cut our administrative workload almost in half.",
  },
  {
    name: "Emily T.",
    role: "Construction Company",
    quote:
      "Our response time improved dramatically and we never miss new leads anymore.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Testimonials" title="Loved by Business Owners" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card flex flex-col p-7"
            >
              <Quote className="h-6 w-6 text-brand-blue/50" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div
                className="mt-4 flex items-center gap-0.5 text-amber-400"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <figcaption className="mt-4 border-t border-slate-100 pt-4 dark:border-white/10">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
