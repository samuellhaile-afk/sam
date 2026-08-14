"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const LOGOS = [
  "Northgate Realty",
  "Harbor & Wells Law",
  "Summit Accounting",
  "BlueRidge Contractors",
  "Vantage Health Clinic",
  "Ironclad Property Group",
];

export function TrustedBy() {
  return (
    <section className="py-14">
      <Container>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500"
        >
          Trusted by Growing Businesses
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold tracking-tight text-slate-400 grayscale transition-colors hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
