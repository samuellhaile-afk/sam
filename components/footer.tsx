import Link from "next/link";
import { Sparkles, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { Container } from "@/components/ui/container";

const FOOTER_LINKS = [
  { label: "About", href: "#" },
  { label: "Services", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const SOCIALS = [
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02]">
      <Container className="py-14">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Link
              href="#top"
              className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              AutomateAI
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              AI automation systems for small businesses—chatbots, workflow
              automation, and CRM integrations that save you 10+ hours every
              week.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:text-slate-400 dark:hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-1">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-white/10 dark:text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} AutomateAI. All rights reserved.</p>
          <p>Built for businesses that value their time.</p>
        </div>
      </Container>
    </footer>
  );
}
