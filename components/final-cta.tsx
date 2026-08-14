"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CALENDLY_URL } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.25),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to Save 10+ Hours Every Week?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Stop wasting time on repetitive tasks and let AI handle the busy
              work so you can focus on growing your business.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn w-full bg-white text-brand-blue hover:bg-white/90 sm:w-auto"
              >
                Book Your Free Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="btn w-full border border-white/40 text-white hover:bg-white/10 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to an Expert
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
