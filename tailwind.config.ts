import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/utils/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: "996px",
      },
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    extend: {
      colors: {
        "site-white": "#F8F8F6",
        "site-green": "#859A93",
        "site-yellow": "#FDCB6E",
        "site-navy": "#2C3E50",
        "site-light-green": "#E7EAE7",
        graphite: "#2B2B2B",
      },
      fontFamily: {
        sans: ["var(--font-noto)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-barlow)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: "0.75rem",
        "2xs": "0.8rem",
        "sm-plus": "0.85rem",
        sm: "0.9rem",
        md: "1.1rem",
        lg: "1.25rem",
        "2xl": "1.75rem",
      },
      backgroundImage: {
        "gradient-soft": "linear-gradient(180deg, #F8F8F6 0%, #E7EAE7 100%)",
      },
      boxShadow: {
        card: "0 15px 40px rgba(44, 62, 80, 0.08)",
      },
      gridTemplateColumns: {
        "10": "repeat(10, minmax(0, 1fr))",
      },
    },
    screens: {
      mobile: { max: "800px" },
      desktop: "801px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};

export default config;

