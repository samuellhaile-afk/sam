"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.company.trim()) {
    errors.company = "Please enter your business name.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us a bit about what you'd like to automate.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please share a few more details (10+ characters).";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = React.useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setValues(INITIAL_STATE);
  };

  if (status === "success") {
    return (
      <div className="card flex h-full min-h-[480px] flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Thanks for reaching out!
        </h3>
        <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
          We&apos;ve received your message and will get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card flex h-full flex-col gap-5 p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Full name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-blue focus:ring-1 focus:ring-brand-blue dark:bg-white/5 dark:text-white",
            errors.name
              ? "border-rose-400"
              : "border-slate-200 dark:border-white/15"
          )}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1.5 text-xs text-rose-500">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Work email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-blue focus:ring-1 focus:ring-brand-blue dark:bg-white/5 dark:text-white",
            errors.email
              ? "border-rose-400"
              : "border-slate-200 dark:border-white/15"
          )}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-xs text-rose-500">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Business name
        </label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={handleChange("company")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-blue focus:ring-1 focus:ring-brand-blue dark:bg-white/5 dark:text-white",
            errors.company
              ? "border-rose-400"
              : "border-slate-200 dark:border-white/15"
          )}
        />
        {errors.company ? (
          <p id="company-error" className="mt-1.5 text-xs text-rose-500">
            {errors.company}
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col">
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          What would you like to automate?
        </label>
        <textarea
          id="message"
          rows={4}
          value={values.message}
          onChange={handleChange("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full flex-1 resize-none rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-brand-blue focus:ring-1 focus:ring-brand-blue dark:bg-white/5 dark:text-white",
            errors.message
              ? "border-rose-400"
              : "border-slate-200 dark:border-white/15"
          )}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-rose-500">
            {errors.message}
          </p>
        ) : null}
      </div>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileTap={{ scale: 0.98 }}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </form>
  );
}
