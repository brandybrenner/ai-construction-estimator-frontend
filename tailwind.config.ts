import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { orange: "#ff6a00", black: "#111111", olive: "#6b7a40", tan: "#e8d9c7" } },
      borderRadius: { '2xl': '1rem' },
      boxShadow: { soft: "0 10px 20px rgba(0,0,0,0.08)" }
    },
  },
  plugins: [],
};
export default config;