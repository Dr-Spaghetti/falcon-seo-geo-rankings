import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Cinzel", "Georgia", "serif"],
      },
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#0f172a",
        },
        navy: {
          50: "#f2f5f9",
          100: "#e4ebf3",
          200: "#c5d3e4",
          300: "#9bb0c9",
          400: "#7a93b0",
          500: "#3d5a80",
          600: "#2f4a6e",
          700: "#243a58",
          800: "#1b2d45",
          900: "#122033",
        },
        // Muted teal — secondary metric accents only (law-firm professional)
        accent: {
          50: "#f0f7f7",
          100: "#d9ecec",
          200: "#b3d4d4",
          600: "#2a6f6f",
          700: "#1f5555",
        },
      },
      backgroundImage: {
        "page-wash":
          "linear-gradient(165deg, #e8eef5 0%, #f2f5f9 38%, #eef2f7 72%, #e6edf4 100%)",
        "hero-navy":
          "linear-gradient(135deg, #122033 0%, #1b2d45 48%, #243a58 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
