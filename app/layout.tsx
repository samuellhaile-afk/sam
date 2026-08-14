import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://automateai.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AutomateAI — Automate Your Business with AI",
    template: "%s | AutomateAI",
  },
  description:
    "Save 10+ hours every week by automating repetitive tasks, capturing more leads, and providing instant customer support—without hiring more staff.",
  keywords: [
    "AI automation agency",
    "business automation",
    "AI chatbot",
    "workflow automation",
    "CRM integration",
    "AI for small business",
  ],
  openGraph: {
    title: "AutomateAI — Automate Your Business with AI",
    description:
      "Save 10+ hours every week by automating repetitive tasks, capturing more leads, and providing instant customer support—without hiring more staff.",
    url: siteUrl,
    siteName: "AutomateAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutomateAI — Automate Your Business with AI",
    description:
      "Save 10+ hours every week by automating repetitive tasks, capturing more leads, and providing instant customer support—without hiring more staff.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
          >
            Skip to content
          </a>
          <div id="top" />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
