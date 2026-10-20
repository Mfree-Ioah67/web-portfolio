/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red:     { DEFAULT: "#ff2020", dark: "#cc0000" },
        blue:    { DEFAULT: "#00c8ff", dark: "#0099cc" },
        green:   { DEFAULT: "#00ff41" },
        bg:      { DEFAULT: "#080808", surface: "#111111", card: "#161616" },
        border:  { DEFAULT: "#2a2a2a" },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
