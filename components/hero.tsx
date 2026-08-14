"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Workflow,
  Users,
  BarChart3,
  Mail,
  CalendarCheck,
  Clock,
  Zap,
  TrendingUp,
  Target,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { CALENDLY_URL } from "@/lib/utils";

const METRICS = [
  {
    icon: Clock,
    label: "10+ Hours Saved Weekly",
    className: "left-[-1rem] top-10 sm:left-2",
    delay: 0,
  },
  {
    icon: Zap,
    label: "24/7 Customer Support",
    className: "right-[-1rem] top-2 sm:right-2",
    delay: 0.6,
  },
  {
    icon: TrendingUp,
    label: "40% Faster Response Times",
    className: "left-[-1.5rem] bottom-24 sm:left-[-2rem]",
    delay: 1.2,
  },
  {
    icon: Target,
    label: "3x More Qualified Leads",
    className: "right-[-1rem] bottom-8 sm:right-[-1.5rem]",
    delay: 1.8,
  },
];

const DASHBOARD_TILES = [
  { icon: MessageSquare, label: "AI Chatbot", detail: "Live conversation" },
  { icon: Workflow, label: "Workflow Automation", detail: "6 flows active" },
  { icon: Users, label: "CRM Sync", detail: "Auto-updated" },
  { icon: BarChart3, label: "Analytics", detail: "+35% conversions" },
  { icon: Mail, label: "Email Automation", detail: "Sequences running" },
  { icon: CalendarCheck, label: "Calendar Booking", detail: "3 new today" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade dark:opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.07] blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-eyebrow"
          >
            <Zap className="h-3.5 w-3.5" />
            AI Automation for Growing Businesses
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl"
          >
            Automate Your Business{" "}
            <span className="text-gradient">with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Save over 10 hours every week by automating repetitive tasks,
            capturing more leads, and providing instant customer
            support—without hiring more staff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              <PlayCircle className="h-4 w-4" />
              See How It Works
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-20 max-w-4xl"
        >
          <div className="relative rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-[0_24px_80px_-16px_rgba(79,124,255,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
            <div className="flex items-center gap-1.5 px-2 pb-3 sm:px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs font-medium text-slate-400">
                automateai.dashboard
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50/80 p-3 dark:bg-black/20 sm:grid-cols-3 sm:gap-4 sm:p-4">
              {DASHBOARD_TILES.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className="card flex flex-col gap-2.5 p-4 text-left"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue dark:text-white">
                    <tile.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {tile.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tile.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + metric.delay * 0.15 }}
              className={`glass absolute z-10 hidden items-center gap-2 rounded-full px-4 py-2.5 shadow-card animate-float sm:flex ${metric.className}`}
              style={{ animationDelay: `${metric.delay}s` }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-white">
                <metric.icon className="h-3.5 w-3.5" />
              </span>
              <span className="whitespace-nowrap text-xs font-semibold text-slate-800 dark:text-slate-100">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
