import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          blue: "#4F7CFF",
          purple: "#9B5CFF",
          dark: "#0B0B14",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F7CFF 0%, #9B5CFF 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(79,124,255,0.12) 0%, rgba(155,92,255,0.12) 100%)",
        "radial-fade":
          "radial-gradient(60% 60% at 50% 0%, rgba(79,124,255,0.15) 0%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        glow: "0 8px 40px -8px rgba(79,124,255,0.35)",
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 24px -4px rgba(16,24,40,0.06)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        gradient: "gradient 8s ease infinite",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
