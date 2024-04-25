import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0093ff",
        "base-100": "#334155",
        "base-light": "#D5D4D8",
      },
      height: {
        'custom': '576px',
      }
    },
  },

  plugins: [],
};
export default config;
