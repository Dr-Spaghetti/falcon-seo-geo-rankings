import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
          600: "#2f4a6e",
          700: "#243a58",
          800: "#1b2d45",
          900: "#122033",
        },
      },
    },
  },
  plugins: [],
};
export default config;
