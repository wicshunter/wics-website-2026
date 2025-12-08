import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#FFAFCC",
        hotpink: "#DB2777",
        lightp: "#B8C0FF",
        lightg: "#71717A",
        grey: "#4B5563",
        background: "var(--background)",
        shadowp: "#C8B6FF",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "background-gradient": "var(--background)",
        bannerGradient: "var(--banner-background)",
        cardGradient: "var(--card-background)",
        buttonGradient: "var(--button-background)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        banner: "url('/images/sponsors/banner.jpg')",
      },
      boxShadow: {
        "officer-card":
          "-10px -10px #fef8f8, 10px 10px #fef8f8, -15px -13px #1b162980, 15px 13px #1b162980",
        card: "0 5px 10px 0 #6A515E;",
        dropdown: "0 4px 15px 0 #C8B6FF;",
        navbar: "0 4px 15px 0 #C8B6FF",
        footer: "0 -4px 15px 0 #C8B6FF;",
        img: "0 4px 15px 0 #FFAFCC;",
      },
      textShadow: {
        "officer-name": "2px 2px #6A515E",
        "officer-icon": "1px 1px #fceee9",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "scale-up-center":
          "scale-up-center 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) 0.15s both",
      },
      keyframes: {
        "scale-up-center": {
          "0%": {
            transform: "scale(1.15)",
          },
          to: {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-textshadow"),
    [require("@tailwindcss/typography")],
  ],
};

export default config;
