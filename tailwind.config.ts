import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { cream: "#FDFBFC", plum: "#3A1167", ink: "#1E2026", blush: "#F17494", sun: "#F7BD0D" },
    fontFamily: { display: ["var(--font-display)", "Georgia", "serif"], sans: ["var(--font-body)", "system-ui", "sans-serif"] },
    boxShadow: { soft: "0 12px 40px -16px rgba(58,17,103,0.28)" },
  } },
  plugins: [],
};
export default config;
