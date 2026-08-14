"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn, CALENDLY_URL } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for small businesses.",
    price: "$499",
    priceNote: "starting at",
    features: ["AI Chatbot", "Email Automation", "Basic CRM Integration"],
    cta: "Get Started",
    href: CALENDLY_URL,
    featured: false,
  },
  {
    name: "Professional",
    description: "For businesses ready to scale with AI.",
    price: "$1,499",
    priceNote: "starting at",
    features: [
      "AI Chatbot",
      "Workflow Automation",
      "CRM Integration",
      "Appointment Booking",
      "Analytics Dashboard",
    ],
    cta: "Book Consultation",
    href: CALENDLY_URL,
    featured: true,
  },
  {
    name: "Enterprise",
    description: "Custom AI solutions for larger organizations.",
    price: "Custom",
    priceNote: "tailored to you",
    features: [
      "Everything in Professional",
      "Custom AI system architecture",
      "Dedicated support & optimization",
      "Multi-department rollout",
    ],
    cta: "Request Custom Quote",
    href: "#contact",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Pricing" title="Simple Pricing" />

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl p-8",
                plan.featured
                  ? "border-2 border-transparent bg-brand-gradient text-white shadow-glow lg:-translate-y-3"
                  : "card"
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-blue shadow-card">
                  Most Popular
                </span>
              ) : null}

              <h3
                className={cn(
                  "text-lg font-semibold",
                  plan.featured ? "text-white" : "text-slate-900 dark:text-white"
                )}
              >
                {plan.name}
              </h3>
              <p
                className={cn(
                  "mt-1.5 text-sm",
                  plan.featured ? "text-white/80" : "text-slate-600 dark:text-slate-400"
                )}
              >
                {plan.description}
              </p>

              <div className="mt-6">
                <span
                  className={cn(
                    "text-4xl font-semibold tracking-tight",
                    plan.featured ? "text-white" : "text-slate-900 dark:text-white"
                  )}
                >
                  {plan.price}
                </span>
                <p
                  className={cn(
                    "mt-1 text-xs uppercase tracking-wide",
                    plan.featured ? "text-white/70" : "text-slate-500 dark:text-slate-500"
                  )}
                >
                  {plan.priceNote}
                </p>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.featured ? "text-white" : "text-brand-blue"
                      )}
                    />
                    <span
                      className={
                        plan.featured ? "text-white/90" : "text-slate-700 dark:text-slate-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target={plan.href.startsWith("http") ? "_blank" : undefined}
                rel={plan.href.startsWith("http") ? "noreferrer" : undefined}
                className={cn(
                  "mt-8 w-full",
                  plan.featured ? "btn bg-white text-brand-blue hover:bg-white/90" : "btn-secondary"
                )}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
